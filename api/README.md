# URL Shortener - API (Serverless Functions)

This folder contains the **serverless backend** for the URL shortener app, deployed on **Vercel**.

---

## 📂 Structure

    api/
    ├── [code].ts        # Handles redirects from short URLs to their original destinations
    ├── shorten.ts       # Creates and stores new short URLs
    └── lib/
        └── mongodb.ts   # MongoDB connection setup

---

## ⚙️ Endpoints

### POST /api/shorten
Creates a new short URL.

**Request body:**
```json
{
  "longUrl": "https://example.com"
}
```

**Response:**
```json
{
  "shortUrl": "https://your-domain.vercel.app/abc123"
}
```

## 🧩 Environment Variables
Add these in your Vercel project settings or .env file (for local testing):
```
MONGODB_URI=<your-mongo-connection-string>
MONGODB_DB=urlshortener
```

## 🧠 Notes
- Runs entirely on Vercel Serverless Functions — no dedicated backend server needed.
- Stores data in MongoDB Atlas.
- Each short link persists until manually deleted from the database.
