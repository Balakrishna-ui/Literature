import express from 'express';
import type { Request, Response } from 'express';
import prisma from '../prisma.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all books
router.get('/', async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: { displayOrder: 'asc' }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Create a book
router.post('/', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const newBook = await prisma.book.create({
      data: req.body
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book' });
  }
});

// Update a book
router.put('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const updatedBook = await prisma.book.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book' });
  }
});

// Delete a book
router.delete('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    await prisma.book.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
});

export default router;
