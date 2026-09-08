import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateStoryboard, regenerateShot } from '../server/aiService.js';
import { validateAndRepairStoryboard } from '../shared/schema.js';
import { GenerateReelRequest, RegenerateShotRequest } from '../shared/types.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Joy University Reel Storyboard Generator API',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/generate', async (req, res) => {
  try {
    const body: GenerateReelRequest = req.body;
    if (!body || !body.reelTitle || !body.reelTitle.trim()) {
      return res.status(400).json({ error: 'Please enter a Reel title or topic.' });
    }

    const storyboard = await generateStoryboard(body);
    return res.json({ success: true, data: storyboard });
  } catch (error: any) {
    console.error('[API /api/generate Error]:', error);
    return res.status(500).json({
      error: "We couldn't generate the storyboard. Please try again.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

app.post('/api/regenerate-shot', async (req, res) => {
  try {
    const body: RegenerateShotRequest = req.body;
    if (!body || !body.currentStoryboard || !body.shotNumber) {
      return res.status(400).json({ error: 'Missing currentStoryboard or shotNumber.' });
    }

    const updatedShot = await regenerateShot(body);
    return res.json({ success: true, data: updatedShot });
  } catch (error: any) {
    console.error('[API /api/regenerate-shot Error]:', error);
    return res.status(500).json({
      error: "We couldn't regenerate this shot. Please try again.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

app.post('/api/validate', (req, res) => {
  try {
    const { storyboard, title } = req.body;
    const result = validateAndRepairStoryboard(storyboard, title || 'Untitled Reel');
    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ valid: false, errors: [error.message] });
  }
});

export default app;
