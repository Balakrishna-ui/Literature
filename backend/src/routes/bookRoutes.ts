import express from 'express';
import type { Request, Response } from 'express';
import { db } from '../config/firebase.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all books
router.get('/', async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const snapshot = await db.collection('books').orderBy('displayOrder', 'asc').get();
        const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books' });
    }
});

// Create a book
router.post('/', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        // Use a simple timestamp string as ID for consistency with the frontend UI or auto-generate
        const newRef = db.collection('books').doc();
        const newBook = { ...req.body, id: newRef.id };
        await newRef.set(newBook);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book' });
    }
});

// Update a book
router.put('/:id', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const bookRef = db.collection('books').doc(req.params.id as string);
        await bookRef.update(req.body);
        const updatedBook = (await bookRef.get()).data();
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book' });
    }
});

// Delete a book
router.delete('/:id', protect, adminOnly, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        await db.collection('books').doc(req.params.id as string).delete();
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book' });
    }
});

export default router;
