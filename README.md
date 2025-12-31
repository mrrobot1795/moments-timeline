# Moments

A private image timeline app for couples to share memories.

## Features

- 📸 Drag & drop image uploads
- 📅 Chronological timeline view
- ✏️ Editable captions and dates
- 🔒 Secure email + password authentication
- 🌙 Beautiful dark green theme

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS 4
- MongoDB
- JWT Authentication

## Setup

1. Clone the repo
2. Install dependencies:
```bash
   npm install
```
3. Copy `.env.example` to `.env.local` and fill in your values
4. Run locally:
```bash
   npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Random string for JWT signing (64+ chars) |
| `AUTH_PASSWORD` | Shared password for login |
| `APPROVED_USERS` | Allowed users in format `email:Name,email:Name` |
