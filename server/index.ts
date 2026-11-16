import { requestCancellation } from './requestCancellation.js';
import { AiProviderError } from './aiErrors.js';
import { testAiGeneration } from './testAiGeneration.js';
import { OFFLINE_UNSUPPORTED, OFFLINE_CHANNEL_UNSUPPORTED } from '../shared/offline/index.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { generateStoryboard, regenerateShot } from './aiService.js';
import { validateAndRepairStoryboard } from '../shared/schema.js';
import { GenerateReelRequest, RegenerateShotRequest } from '../shared/types.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Joy University Reel Storyboard Generator API',
    timestamp: new Date().toISOString(),
  });
});

// Generate Reel Storyboard
app.post('/api/test-generation', async (req, res) => {
  const cancellation=requestCancellation(req,res);
  try {
  const result = await testAiGeneration(req.body || {},{signal:cancellation.signal});
  return res.status(result.success ? 200 : result.category === 'missing_key' || result.category === 'invalid_request' ? 400 : 502).json(result);
  } finally {cancellation.dispose();}
});

app.post('/api/generate', async (req, res) => {
  const cancellation=requestCancellation(req,res);
  try {
    const body: GenerateReelRequest = req.body;
    if (!body || !body.reelTitle || !body.reelTitle.trim()) {
      return res.status(400).json({ error: 'Please enter a Reel title or topic.' });
    }

    const storyboard = await generateStoryboard(body,{signal:cancellation.signal});
    return res.json({ success: true, data: storyboard });
  } catch (error: any) {
    if (error.message === 'INVALID_CHANNEL') return res.status(400).json({ success: false, code: 'INVALID_CHANNEL', error: 'Choose Trust, Connection, or Discovery.' });
    if (error.message === OFFLINE_CHANNEL_UNSUPPORTED) return res.status(422).json({ success: false, code: 'OFFLINE_CHANNEL_UNSUPPORTED', error: OFFLINE_CHANNEL_UNSUPPORTED });
    if (error.message === OFFLINE_UNSUPPORTED) return res.status(422).json({ success: false, code: 'OFFLINE_UNSUPPORTED', error: OFFLINE_UNSUPPORTED });
    if(error instanceof AiProviderError)return res.status(error.category==='cancelled'?499:error.category==='timeout'?504:502).json({success:false,code:error.category,error:error.message});
    console.error('[API /api/generate Error]:', error);
    return res.status(500).json({
      error: "We couldn't generate the storyboard. Please try again.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  } finally {cancellation.dispose();}
});

// Regenerate Individual Shot
app.post('/api/regenerate-shot', async (req, res) => {
  const cancellation=requestCancellation(req,res);
  try {
    const body: RegenerateShotRequest = req.body;
    if (!body || !body.currentStoryboard || !body.shotNumber) {
      return res.status(400).json({ error: 'Missing currentStoryboard or shotNumber.' });
    }

    const updatedShot = await regenerateShot(body,{signal:cancellation.signal});
    return res.json({ success: true, data: updatedShot });
  } catch (error: any) {
    if (error.message === 'INVALID_CHANNEL') return res.status(400).json({ success: false, code: 'INVALID_CHANNEL', error: 'Choose Trust, Connection, or Discovery.' });
    if (error.message?.startsWith('Offline samples are fixed')) return res.status(422).json({ success: false, code: 'AI_REQUIRED', error: 'Offline samples are fixed. Edit directly or connect AI to regenerate.' });
    if(error instanceof AiProviderError)return res.status(error.category==='cancelled'?499:error.category==='timeout'?504:502).json({success:false,code:error.category,error:error.message});
    console.error('[API /api/regenerate-shot Error]:', error);
    return res.status(500).json({
      error: "We couldn't regenerate this shot. Please try again.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  } finally {cancellation.dispose();}
});

// Validate & Repair Storyboard
app.post('/api/validate', (req, res) => {
  try {
    const { storyboard, title } = req.body;
    const result = validateAndRepairStoryboard(storyboard, title || 'Untitled Reel');
    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ valid: false, errors: [error.message] });
  }
});

// Serve frontend build if dist exists
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`🎬 Joy University Reel API & Production Server running at http://localhost:${port}`);
});
