import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { generatePlatformContent, analyzeDmAndTriage, generateExecutiveInsights } from './src/server/geminiHandler.ts';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoints FIRST
  app.post('/api/gemini/generate-post', async (req, res) => {
    try {
      const result = await generatePlatformContent(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Server error' });
    }
  });

  app.post('/api/gemini/analyze-dm', async (req, res) => {
    try {
      const result = await analyzeDmAndTriage(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Server error' });
    }
  });

  app.post('/api/gemini/executive-insights', async (req, res) => {
    try {
      const result = await generateExecutiveInsights(req.body.metrics, req.body.strategy);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Server error' });
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite middleware for development vs static for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
