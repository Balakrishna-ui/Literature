import express from 'express';
import type { Request, Response } from 'express';
import { db } from '../config/firebase.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get About Content
router.get('/content', async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const snapshot = await db.collection('aboutContent').get();
        const content = snapshot.docs.map(doc => ({ sectionName: doc.id, ...doc.data() }));
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching about content' });
    }
});

// Update About Content
router.put('/content/:section', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const { content, image } = req.body;
        const sectionRef = db.collection('aboutContent').doc(req.params.section);
        await sectionRef.set({ content, image }, { merge: true });
        const updated = (await sectionRef.get()).data();
        res.json({ sectionName: req.params.section, ...updated });
    } catch (error) {
        res.status(500).json({ message: 'Error updating about content' });
    }
});

// Get Education
router.get('/education', async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const snapshot = await db.collection('education').orderBy('year', 'desc').get();
        const education = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching education' });
    }
});

// Add Education
router.post('/education', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const newRef = db.collection('education').doc();
        const education = { ...req.body, id: newRef.id };
        await newRef.set(education);
        res.status(201).json(education);
    } catch (error) {
        res.status(500).json({ message: 'Error adding education' });
    }
});

// Update Education
router.put('/education/:id', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const eduRef = db.collection('education').doc(req.params.id);
        await eduRef.update(req.body);
        const updated = (await eduRef.get()).data();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error updating education' });
    }
});

// Delete Education
router.delete('/education/:id', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        await db.collection('education').doc(req.params.id).delete();
        res.json({ message: 'Education deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting education' });
    }
});

// Get Career Timeline
router.get('/timeline', async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const snapshot = await db.collection('careerTimeline').orderBy('year', 'asc').get();
        const timeline = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(timeline);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching timeline' });
    }
});

// Add Timeline Item
router.post('/timeline', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const newRef = db.collection('careerTimeline').doc();
        const timeline = { ...req.body, id: newRef.id };
        await newRef.set(timeline);
        res.status(201).json(timeline);
    } catch (error) {
        res.status(500).json({ message: 'Error adding timeline' });
    }
});

// Update Timeline Item
router.put('/timeline/:id', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const timeRef = db.collection('careerTimeline').doc(req.params.id);
        await timeRef.update(req.body);
        const updated = (await timeRef.get()).data();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error updating timeline' });
    }
});

// Delete Timeline Item
router.delete('/timeline/:id', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        await db.collection('careerTimeline').doc(req.params.id).delete();
        res.json({ message: 'Timeline item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting timeline' });
    }
});

export default router;
