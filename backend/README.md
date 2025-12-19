# Backend (mock + seed)

This folder contains a small mock backend for the Learn Play Grow project and a seed script to populate a local MongoDB when available.

Files
- `server.js` — Express server with placeholder endpoints used by frontend during development.
- `seed.js` — Optional script that inserts sample documents into a MongoDB instance.
- `package.json` — npm scripts: `start`, `dev`, `seed`.

Quick start
1. Install deps (in `backend/`):

```bash
cd backend
npm install
```

2. Run the mock server:

```bash
npm start
```

Server runs on `http://localhost:4000` by default. Endpoints:
- `GET /health`
- `GET /api/students/:id/dashboard`
- `GET /api/leaderboard?limit=5`
- `GET /api/subjects`
- `GET /api/events`

3. (Optional) Seed local MongoDB
- Ensure MongoDB is running locally or set `MONGODB_URI` env var.

```bash
# from backend/
npm run seed
```

This will insert sample documents into database `learn_play_grow` by default. Set `DB_NAME` env var to change.

Notes
- The server currently returns placeholder in-memory data and does not require MongoDB. When you're ready, I can replace the placeholder arrays with real DB reads using `mongodb` or `mongoose`.
- Keep backend changes inside the `backend/` folder so frontend remains untouched.
