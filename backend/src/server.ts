import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load .env from the backend root directory (works both locally and in production)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.includes('localhost') || origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
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

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
