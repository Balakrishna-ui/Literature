import express from 'express';
import type { Request, Response } from 'express';
import prisma from '../prisma.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Get all media files
router.get('/', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      res.json([]);
      return;
    }
    const files = fs.readdirSync(uploadsDir).map((filename) => {
      const filePath = path.join(uploadsDir, filename);
      const stats = fs.statSync(filePath);
      return {
        filename,
        url: `/uploads/${filename}`,
        size: stats.size,
        createdAt: stats.birthtime,
      };
    });
    res.json(files);
  } catch {
    res.status(500).json({ message: 'Error fetching media' });
  }
});

// Upload media file
router.post('/', protect, adminOnly, upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }
  res.status(201).json({
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
    size: req.file.size,
  });
});

// Delete media file
router.delete('/:filename', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'uploads', req.params.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'File deleted' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch {
    res.status(500).json({ message: 'Error deleting file' });
  }
});

export default router;
