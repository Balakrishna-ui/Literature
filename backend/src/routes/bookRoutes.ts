import express from 'express';
import type { Request, Response } from 'express';
import prisma from '../prisma.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all books
router.get('/', async (req: Request, res: Response) => {
    const books = await prisma.book.findMany({
      orderBy: { displayOrder: 'asc' }
    });
    res.json(books);
});

// Create a book
router.post('/', protect, adminOnly, async (req: Request, res: Response) => {
    const newBook = await prisma.book.create({
      data: req.body
    });
    res.status(201).json(newBook);
});

// Update a book
router.put('/:id', protect, adminOnly, async (req: Request, res: Response) => {
    const updatedBook = await prisma.book.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(updatedBook);
});

// Delete a book
router.delete('/:id', protect, adminOnly, async (req: Request, res: Response) => {
    await prisma.book.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: 'Book deleted' });
});

export default router;
