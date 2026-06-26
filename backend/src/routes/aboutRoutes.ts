import express from 'express';
import type { Request, Response } from 'express';
import prisma from '../prisma.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get About Content
router.get('/content', async (req: Request, res: Response) => {
    const content = await prisma.aboutContent.findMany();
    res.json(content);
});

// Update About Content
router.put('/content/:section', protect, adminOnly, async (req: Request, res: Response) => {
    const { content, image } = req.body;
    const updated = await prisma.aboutContent.upsert({
      where: { sectionName: req.params.section as string },
      update: { content, image },
      create: { sectionName: req.params.section as string, content, image }
    });
    res.json(updated);
});

// Get Education
router.get('/education', async (req: Request, res: Response) => {
    const education = await prisma.education.findMany({ orderBy: { year: 'desc' } });
    res.json(education);
});

// Add Education
router.post('/education', protect, adminOnly, async (req: Request, res: Response) => {
    const education = await prisma.education.create({ data: req.body });
    res.status(201).json(education);
});

// Update Education
router.put('/education/:id', protect, adminOnly, async (req: Request, res: Response) => {
    const education = await prisma.education.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(education);
});

// Delete Education
router.delete('/education/:id', protect, adminOnly, async (req: Request, res: Response) => {
    await prisma.education.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Education deleted' });
});

// Get Career Timeline
router.get('/timeline', async (req: Request, res: Response) => {
    const timeline = await prisma.careerTimeline.findMany({ orderBy: { year: 'asc' } });
    res.json(timeline);
});

// Add Timeline Item
router.post('/timeline', protect, adminOnly, async (req: Request, res: Response) => {
    const timeline = await prisma.careerTimeline.create({ data: req.body });
    res.status(201).json(timeline);
});

// Update Timeline Item
router.put('/timeline/:id', protect, adminOnly, async (req: Request, res: Response) => {
    const timeline = await prisma.careerTimeline.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(timeline);
});

// Delete Timeline Item
router.delete('/timeline/:id', protect, adminOnly, async (req: Request, res: Response) => {
    await prisma.careerTimeline.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Timeline item deleted' });
});

export default router;
