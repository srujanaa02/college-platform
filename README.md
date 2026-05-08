# 🎓 CollegeFinder — College Discovery Platform

A production-grade college discovery and decision platform built for the Full Stack Developer Internship — Track B.

**Live Demo:** [college-platform-tau-nine.vercel.app](https://college-platform-tau-nine.vercel.app)  
**GitHub:** [github.com/srujanaA02/college-platform](https://github.com/srujanaA02/college-platform)

---

## 📌 Features Built

### 1. 🔍 College Listing + Search + Filters
- College cards showing name, location, fees, rating, placement %, and courses
- Real-time search by college name
- Filter by state (Delhi, Maharashtra, Tamil Nadu, etc.)
- Filter by maximum fees (Under ₹1L, ₹2L, ₹3.5L, ₹5L)
- Pagination (6 colleges per page)
- Empty state handling when no results found

### 2. 🏫 College Detail Page
- Dynamic routing via `/college/[id]`
- Overview, Courses, and Placements tabs
- Visual placement rate progress bar
- Stats summary (fees, placement %, total courses)

### 3. ⚖️ Compare Colleges
- Select 2–3 colleges to compare
- Side-by-side comparison table
- Compares: location, fees, rating, placement, courses, established year
- Best value highlighted in green (lowest fees, highest rating, highest placement)
- API-driven — not hardcoded

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes (Node.js) |
| ORM | Prisma |
| Database | PostgreSQL (hosted on Railway) |
| Deployment | Vercel |

---

## 🏗️ Project Structure

```
college-platform/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Seed script
│   └── seed-direct.mjs        # Direct seed with hardcoded URL
├── src/
│   └── app/
│       ├── page.tsx           # Homepage — listing + search + filters
│       ├── college/
│       │   └── [id]/
│       │       └── page.tsx   # College detail page
│       ├── compare/
│       │   └── page.tsx       # Compare colleges page
│       └── api/
│           └── colleges/
│               ├── route.ts           # GET /api/colleges
│               ├── [id]/
│               │   └── route.ts       # GET /api/colleges/:id
│               └── compare/
│                   └── route.ts       # GET /api/colleges/compare
├── .env                       # Environment variables (not committed)
├── next.config.ts
├── prisma.config.ts
└── package.json
```

---

## ⚙️ API Endpoints

### `GET /api/colleges`
Fetch colleges with optional filters.

**Query params:**
| Param | Type | Description |
|---|---|---|
| `search` | string | Filter by college name (case-insensitive) |
| `state` | string | Filter by state |
| `maxFees` | number | Filter colleges with fees ≤ this value |
| `page` | number | Page number (default: 1, 6 per page) |

**Response:**
```json
{
  "colleges": [...],
  "total": 15,
  "pages": 3
}
```

---

### `GET /api/colleges/:id`
Fetch a single college by ID.

**Response:** Full college object or `404` if not found.

---

### `GET /api/colleges/compare?ids=1,2,3`
Fetch multiple colleges for comparison.

**Query params:**
| Param | Type | Description |
|---|---|---|
| `ids` | string | Comma-separated college IDs (min 2) |

**Response:** Array of college objects.

---

## 🗄️ Database Schema

```prisma
model College {
  id          Int      @id @default(autoincrement())
  name        String
  location    String
  state       String
  fees        Int
  rating      Float
  courses     String[]
  placement   Int
  imageUrl    String?
  description String
  established Int
  createdAt   DateTime @default(now())
}
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- PostgreSQL database (Railway or local)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/srujanaA02/college-platform.git
cd college-platform
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root:
```
DATABASE_URL="your-postgresql-connection-url"
```

**4. Push schema to database**
```bash
npx prisma db push
```

**5. Seed the database**
```bash
node prisma/seed-direct.mjs
```

**6. Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment

### Frontend + Backend → Vercel
1. Push code to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add `DATABASE_URL` in Vercel Environment Variables
4. Deploy — Vercel auto-detects Next.js

### Database → Railway
1. Create a PostgreSQL instance on [railway.app](https://railway.app)
2. Copy the connection URL to your `.env` and Vercel env vars
3. Run `npx prisma db push` to sync schema
4. Run seed script to populate data

---

## 🧪 Edge Cases Handled

| Scenario | Handling |
|---|---|
| Search returns no results | Shows "No colleges found. Try different filters." |
| College ID doesn't exist | API returns 404, UI shows "College not found." |
| Compare with fewer than 2 colleges | Alert: "Select at least 2 colleges" |
| Missing filter params | Default to empty string — query still works |
| API failure | try/catch on all routes, returns `500` with error message |
| Loading state | "Loading colleges..." shown while API fetches |

---

## 🔍 Architecture Decisions

**Why Next.js API routes instead of separate Express server?**  
Simplifies deployment — frontend and backend deploy together to Vercel. No CORS configuration needed.

**Why server-side filtering?**  
All search and filter logic runs in PostgreSQL via Prisma queries — not in JavaScript on the frontend. This keeps it fast and scalable regardless of dataset size.

**Why Prisma?**  
Type-safe queries, easy schema migrations with `db push`, and clean syntax. Works well with TypeScript.

**Why Railway for PostgreSQL?**  
Free tier, easy setup, provides a persistent connection URL that works in both local `.env` and Vercel environment variables.

---

## 📊 Dataset

15 colleges seeded including IITs, NITs, BITS, and private universities across states:
- Maharashtra, Delhi, Tamil Nadu, Telangana, Rajasthan, Karnataka, West Bengal

Data fields: name, location, state, annual fees, rating, courses, placement %, description, established year.

---

## 🚧 Future Improvements

- Auth system (login + save colleges/comparisons)
- JEE rank predictor — rule-based college suggestions
- Q&A/discussion section per college
- Expand dataset to 100+ colleges
- Search inside compare selector
- Mobile PWA support

---

## 👩‍💻 Built By

**Srujana Aketi**  
Full Stack Developer Internship — Track B Submission  
Built with Next.js, Prisma, PostgreSQL, Tailwind CSS
