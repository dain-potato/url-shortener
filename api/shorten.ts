import type { VercelRequest, VercelResponse } from "@vercel/node";
import clientPromise from "./lib/mongodb";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { longUrl } = req.body;
    if (!longUrl) {
      return res.status(400).json({ error: "Missing longUrl" });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const urls = db.collection("urls");

    // Create a short code
    const shortCode = Math.random().toString(36).substring(2, 8);

    // Insert into database
    await urls.insertOne({
      shortCode,
      longUrl,
      createdAt: new Date(),
    });

    res.status(200).json({
      shortUrl: `${req.headers.origin}/${shortCode}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
}
