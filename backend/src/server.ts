import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

import authRoutes from './routes/authRoutes.js';
import visitorRoutes from './routes/visitorRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/media', mediaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
