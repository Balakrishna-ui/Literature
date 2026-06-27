import express from 'express';
import type { Request, Response } from 'express';
import { db } from '../config/firebase.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 1. Track Visitor (Public Route)
router.post('/track', async (req: Request, res: Response) => {
  const { pageUrl, visitorIp } = req.body;
  
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const newRef = db.collection('visitors').doc();
        const visitor = {
            id: newRef.id,
            pageUrl,
            visitorIp: visitorIp || req.ip || 'Unknown',
            visitedAt: new Date().toISOString()
        };
        await newRef.set(visitor);
        res.status(201).json(visitor);
    } catch (error) {
        res.status(500).json({ message: 'Error tracking visitor' });
    }
});

// 2. Get Analytics (Admin Route)
router.get('/stats', protect, async (req: Request, res: Response) => {
    try {
        if (!db) return res.status(500).json({ message: 'Firebase not connected' });
        const snapshot = await db.collection('visitors').orderBy('visitedAt', 'desc').get();
        const visitors = snapshot.docs.map(doc => doc.data());
        
        const totalVisitors = visitors.length;
        
        // Group by page URL
        const pageCountMap: Record<string, number> = {};
        visitors.forEach(v => {
            if (v.pageUrl) {
                pageCountMap[v.pageUrl] = (pageCountMap[v.pageUrl] || 0) + 1;
            }
        });
        const pageTraffic = Object.entries(pageCountMap)
            .map(([pageUrl, count]) => ({ pageUrl, _count: { pageUrl: count } }))
            .sort((a, b) => b._count.pageUrl - a._count.pageUrl);

        const recentActivity = visitors.slice(0, 10);

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
