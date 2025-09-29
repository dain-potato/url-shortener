import express from "express";
import cors from "cors";
import type { Request, Response } from "express";

const app = express();
app.use(cors());
app.use(express.json());

const urlDatabase: Record<string, string> = {};

app.post('/api/shorten', (req: Request, res: Response) => {
    const {longUrl} = req.body;

    const shortCode = Math.random().toString(36).substring(2, 8);

    urlDatabase[shortCode] = longUrl;

    res.json({
        shortUrl: `http://localhost:3000/${shortCode}`,
    });
});

app.get("/:code", (req: Request<{ code: string }>, res: Response) => {
    const code = req.params.code;
    const longUrl = urlDatabase[code];

    if (longUrl) { 
        res.redirect(longUrl);
    } else {
        res.status(404).send("URL not found");
    }
});

app.listen(3000, () => {
    console.log("Mock server running on http://localhost:3000");
});