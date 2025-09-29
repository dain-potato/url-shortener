// api/shorten.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const urlDatabase: Record<string, string> = {};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ error: 'Missing longUrl' });
    }

    const shortCode = Math.random().toString(36).substring(2, 8);
    urlDatabase[shortCode] = longUrl;

    return res.status(200).json({
      shortUrl: `https://url-shortener-eta-self.vercel.app/${shortCode}`,
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
