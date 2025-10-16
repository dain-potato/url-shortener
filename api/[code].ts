import type { VercelRequest, VercelResponse } from "@vercel/node";
import clientPromise from "./lib/mongodb.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    return res.status(400).send("Missing or invalid code");
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const urls = db.collection("urls");

    const record = await urls.findOne({ shortCode: code });

    if (record && record.longUrl) {
      res.writeHead(302, { Location: record.longUrl });
      res.end();
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
