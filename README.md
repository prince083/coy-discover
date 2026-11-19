# Coy Discover

A standalone swipe-based profile discovery application built as part of the **Coy SDE Intern Assignment**.

Coy Discover allows users to explore profiles, like or pass on people, and create matches when two users mutually like each other.

## Features

- **Profile Discovery:** Browse mock profiles one at a time.
- **Like and Pass:** Interact with profiles using Like and Pass buttons.
- **Drag Gestures:** Swipe profiles using mouse or touch gestures.
- **Persistent Swipes:** Previously swiped profiles do not appear again, even after refreshing.
- **Mutual Matching:** A match is created only when both users have liked each other.
- **Match Privacy:** Incoming likes are not revealed unless a mutual match exists.
- **Matches Screen:** View profiles that have mutually liked the demo user.
- **Empty Feed State:** Displays an appropriate message when all available profiles have been viewed.
- **Duplicate Swipe Protection:** Prevents repeated swipe requests while an operation is processing.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Frontend and API routes |
| React 19 | User interface |
| TypeScript | Type safety |
| Prisma ORM 7 | Database access |
| SQLite | Database |
| Zod 4 | Request validation |
| Tailwind CSS 4 | Styling |

## Project Structure

```text
coy-discover/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── scripts/
│   ├── test-db.ts
│   ├── verify-seed.ts
│   ├── test-constraints.ts
│   └── test-feed-filter.ts
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── feed/
│   │   │   │   └── route.ts
│   │   │   ├── matches/
│   │   │   │   └── route.ts
│   │   │   └── swipe/
│   │   │       └── route.ts
│   │   ├── components/
│   │   │   ├── BottomNavigation.tsx
│   │   │   ├── Discover.tsx
│   │   │   └── Matches.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       └── prisma.ts
├── prisma7.config.ts
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/prince083/coy-discover
cd coy-discover
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

### 4. Apply database migrations

```bash
npx prisma migrate deploy
```

### 5. Seed the database

```bash
npx tsx prisma/seed.ts
```

The seed script creates:

- One demo user (`demo-user`).
- 30 mock user profiles.
- Sample incoming likes for demonstrating mutual matching.

The seed script uses upserts, allowing it to be run repeatedly without creating duplicate seed records.

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

The application provides three REST API endpoints.

### 1. Get Discovery Feed

**GET** `/api/feed`

Returns profiles that the demo user has not already swiped on.

Example response:

```json
{
  "success": true,
  "count": 30,
  "profiles": []
}
```

The count decreases as profiles are swiped on.

### 2. Submit a Swipe

**POST** `/api/swipe`

Records a Like or Pass action.

Request body:

```json
{
  "targetUserId": "mock-user-01",
  "action": "LIKE"
}
```

Supported actions:

- `LIKE`
- `PASS`

Example response:

```json
{
  "success": true,
  "isMatch": true
}
```

`isMatch` is true only when the target user has also liked the demo user.

### 3. Get Matches

**GET** `/api/matches`

Returns profiles where both users have submitted a LIKE action.

Example response:

```json
{
  "success": true,
  "count": 0,
  "matches": []
}
```

Incoming likes alone are not included in the response.

## Database Design

The application uses three primary Prisma models:

### User

Stores user information and relationships with profiles and swipes.

### Profile

Stores discovery profile information:

- Age
- Photo
- Bio
- City
- College
- Interests

### Swipe

Stores the interaction between two users.

Each swipe contains:

- `actorId`: User who performed the swipe.
- `targetId`: User receiving the swipe.
- `action`: LIKE or PASS.
- `createdAt`: Swipe timestamp.

A composite unique constraint on `actorId` and `targetId` prevents duplicate swipes.

### Match Logic

Matches are derived from reciprocal LIKE records rather than stored in a separate Match table.

A match exists only when:

1. User A likes User B.
2. User B likes User A.

This ensures that incoming likes are not exposed as matches unless the interaction is mutual.

## Validation and Error Handling

The swipe API uses Zod to validate incoming requests.

It handles:

- Invalid request bodies.
- Unsupported swipe actions.
- Missing target users.
- Attempts to swipe on oneself.
- Duplicate swipe submissions.

Appropriate HTTP status codes are returned for invalid requests and unsuccessful operations.

## Testing and Verification

The application was manually and programmatically tested for:

- Database connectivity.
- Seed data verification.
- Database uniqueness constraints.
- Discovery feed filtering.
- Like and Pass operations.
- Mutual-match detection.
- Incoming-like privacy.
- Invalid request handling.
- Duplicate swipe prevention.
- Rapid-click protection.
- Drag gesture interactions.
- Empty feed behaviour.
- Persistence after browser refresh.
- Production build.

Run the production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

## Important Notes

- This is a standalone assignment implementation.
- The application currently uses mock profiles and a predefined demo user.
- SQLite is used as the database.
- Authentication and a production user-management system are outside the scope of this implementation.

---

**Built as part of the Coy SDE Intern Assignment.**