// api/shorten.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const urlDatabase: Record<string, string> = {};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: 'Missing longUrl' });

  const shortCode = Math.random().toString(36).substring(2, 8);
  urlDatabase[shortCode] = longUrl;

  res.status(200).json({
    shortUrl: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''}/api/${shortCode}`,
    code: shortCode,
  });
}
