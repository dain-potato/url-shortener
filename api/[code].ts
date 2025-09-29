// api/[code].ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

// We need the same in-memory object to read URLs.
// Since serverless functions don’t share memory between files, 
// we need to export/import it, or make it a module-level object.
// For simplicity, we can define it again, but links only work per instance.
const urlDatabase: Record<string, string> = {};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const code = req.query.code as string;
  if (!code) return res.status(400).send('Missing code');

  const longUrl = urlDatabase[code];
  if (longUrl) {
    res.writeHead(302, { Location: longUrl });
    res.end();
  } else {
    res.status(404).send('URL not found');
  }
}
