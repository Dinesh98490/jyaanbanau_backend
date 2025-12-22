import express from 'express';

const router = express.Router();

// Route modules - all routes are under /api/v1
router.get('/v1/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});


export default router;