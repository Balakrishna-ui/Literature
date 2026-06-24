import express from 'express';
import type { Request, Response } from 'express';
import prisma from '../prisma.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 1. Track Visitor (Public Route)
router.post('/track', async (req: Request, res: Response) => {
  const { pageUrl, visitorIp, deviceType, browser, country } = req.body;
  
  try {
    const visitor = await prisma.visitor.create({
      data: {
        pageUrl,
        visitorIp: visitorIp || req.ip || 'Unknown',
        // In the future, we could add deviceType, browser to schema, 
        // for now they are not in schema so we skip them or log them.
      }
    });
    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({ message: 'Error tracking visitor' });
  }
});

// 2. Get Analytics (Admin Route)
router.get('/stats', protect, async (req: Request, res: Response) => {
  try {
    const totalVisitors = await prisma.visitor.count();
    
    // Group by page URL
    const pageTraffic = await prisma.visitor.groupBy({
      by: ['pageUrl'],
      _count: {
        pageUrl: true
      },
      orderBy: {
        _count: { pageUrl: 'desc' }
      }
    });

    const recentActivity = await prisma.visitor.findMany({
      take: 10,
      orderBy: { visitedAt: 'desc' }
    });

    res.json({
      totalVisitors,
      pageTraffic,
      recentActivity
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

export default router;
