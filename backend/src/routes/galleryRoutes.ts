import express from 'express';
import type { Request, Response } from 'express';
import prisma from '../prisma.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// --- Categories ---
router.get('/categories', async (req: Request, res: Response) => {
    const cats = await prisma.galleryCategory.findMany({ include: { images: true } });
    res.json(cats);
});

router.post('/categories', protect, adminOnly, async (req: Request, res: Response) => {
    const cat = await prisma.galleryCategory.create({ data: { name: req.body.name } });
    res.status(201).json(cat);
});

// --- Images ---
router.get('/images', async (req: Request, res: Response) => {
    const images = await prisma.galleryImage.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(images);
});

// Upload single image
router.post('/images', protect, adminOnly, upload.single('image'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: 'No image uploaded' });
    return;
  }
    const { title, description, categoryId, featured } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;
    const image = await prisma.galleryImage.create({
      data: {
        imagePath,
        title: title || null,
        description: description || null,
        categoryId: Number(categoryId),
        featured: featured === 'true',
      },
    });
    res.status(201).json(image);
});

// Upload multiple images
router.post('/images/bulk', protect, adminOnly, upload.array('images', 20), async (req: Request, res: Response) => {
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    res.status(400).json({ message: 'No images uploaded' });
    return;
  }
    const { categoryId } = req.body;
    const created = await Promise.all(
      req.files.map((f) =>
        prisma.galleryImage.create({
          data: {
            imagePath: `/uploads/${f.filename}`,
            categoryId: Number(categoryId),
          },
        })
      )
    );
    res.status(201).json(created);
});

// Update image details
router.put('/images/:id', protect, adminOnly, async (req: Request, res: Response) => {
    const image = await prisma.galleryImage.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(image);
});

// Delete image
router.delete('/images/:id', protect, adminOnly, async (req: Request, res: Response) => {
    const image = await prisma.galleryImage.findUnique({ where: { id: Number(req.params.id) } });
    if (image) {
      const filePath = path.join(process.cwd(), 'public', image.imagePath);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      await prisma.galleryImage.delete({ where: { id: Number(req.params.id) } });
    }
    res.json({ message: 'Image deleted' });
});

export default router;
