/**
 * JIYYAD TOOLS - BYPASS V2 (Secure Proxy)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const API_URL = 'https://api.zyvor.my.id/api/bypass/bypasslinkv2';

app.use(cors());
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/bypass', async (req, res) => {
  try {
    const { url } = req.body || {};

    if (!url || typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({
        status: false,
        message: 'URL wajib diisi'
      });
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url.trim() })
    });

    const data = await response.json();

    if (data.attribution) delete data.attribution;

    return res.status(response.status).json(data);
  } catch (err) {
    console.error('[Bypass Proxy Error]', err.message);
    return res.status(500).json({
      status: false,
      message: 'Terjadi kesalahan pada server proxy',
      error: err.message
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  ⚡ JIYYAD TOOLS — BYPASS V2`);
  console.log(`  ➜  Local:   http://localhost:${PORT}\n`);
});
