import express from 'express';
import type { Request, Response } from 'express';
import { db } from '../config/firebase.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// --- Categories ---
router.get('/categories', async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const snapshot = await db.collection('galleryCategories').get();
        const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(cats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
});

router.post('/categories', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const newRef = db.collection('galleryCategories').doc();
        const cat = { name: req.body.name, id: newRef.id };
        await newRef.set(cat);
        res.status(201).json(cat);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category' });
    }
});

// --- Images ---
router.get('/images', async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const snapshot = await db.collection('galleryImages').orderBy('createdAt', 'desc').get();
        const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images' });
    }
});

// Upload single image
router.post('/images', protect, adminOnly, upload.single('image'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: 'No image uploaded' });
    return;
  }
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const { title, description, categoryId, featured } = req.body;
        const imagePath = `/uploads/${req.file.filename}`;
        const newRef = db.collection('galleryImages').doc();
        const image = {
            id: newRef.id,
            imagePath,
            title: title || null,
            description: description || null,
            categoryId: categoryId || null,
            featured: featured === 'true',
            createdAt: new Date().toISOString()
        };
        await newRef.set(image);
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Error creating image record' });
    }
});

// Upload multiple images
router.post('/images/bulk', protect, adminOnly, upload.array('images', 20), async (req: Request, res: Response) => {
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    res.status(400).json({ message: 'No images uploaded' });
    return;
  }
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const { categoryId } = req.body;
        const batch = db!.batch();
        const created = req.files.map((f) => {
            const newRef = db.collection('galleryImages').doc();
            const img = {
                id: newRef.id,
                imagePath: `/uploads/${f.filename}`,
                categoryId: categoryId || null,
                createdAt: new Date().toISOString()
            };
            batch.set(newRef, img);
            return img;
        });
        await batch.commit();
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ message: 'Error creating bulk images' });
    }
});

// Update image details
router.put('/images/:id', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const imageRef = db.collection('galleryImages').doc(req.params.id as string);
        await imageRef.update(req.body);
        const updatedImage = (await imageRef.get()).data();
        res.json(updatedImage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating image' });
    }
});

// Delete image
router.delete('/images/:id', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const imageRef = db.collection('galleryImages').doc(req.params.id as string);
        const doc = await imageRef.get();
        if (doc.exists) {
            const image = doc.data();
            if (image && image.imagePath) {
                const filePath = path.join(process.cwd(), 'public', image.imagePath);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
            await imageRef.delete();
        }
        res.json({ message: 'Image deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting image' });
    }
});

export default router;
