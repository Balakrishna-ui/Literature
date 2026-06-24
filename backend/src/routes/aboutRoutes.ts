import express from 'express';
import type { Request, Response } from 'express';
import prisma from '../prisma.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get About Content
router.get('/content', async (req: Request, res: Response) => {
  try {
    const content = await prisma.aboutContent.findMany();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching about content' });
  }
});

// Update About Content
router.put('/content/:section', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const { content, image } = req.body;
    const updated = await prisma.aboutContent.upsert({
      where: { sectionName: req.params.section },
      update: { content, image },
      create: { sectionName: req.params.section, content, image }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating about content' });
  }
});

// Get Education
router.get('/education', async (req: Request, res: Response) => {
  try {
    const education = await prisma.education.findMany({ orderBy: { year: 'desc' } });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education' });
  }
});

// Add Education
router.post('/education', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const education = await prisma.education.create({ data: req.body });
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error adding education' });
  }
});

// Update Education
router.put('/education/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const education = await prisma.education.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error updating education' });
  }
});

// Delete Education
router.delete('/education/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    await prisma.education.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting education' });
  }
});

// Get Career Timeline
router.get('/timeline', async (req: Request, res: Response) => {
  try {
    const timeline = await prisma.careerTimeline.findMany({ orderBy: { year: 'asc' } });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timeline' });
  }
});

// Add Timeline Item
router.post('/timeline', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const timeline = await prisma.careerTimeline.create({ data: req.body });
    res.status(201).json(timeline);
  } catch (error) {
    res.status(500).json({ message: 'Error adding timeline' });
  }
});

// Update Timeline Item
router.put('/timeline/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const timeline = await prisma.careerTimeline.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: 'Error updating timeline' });
  }
});

// Delete Timeline Item
router.delete('/timeline/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    await prisma.careerTimeline.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Timeline item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting timeline' });
  }
});

export default router;
