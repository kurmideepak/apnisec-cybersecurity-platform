# ApniSec - Security Assessment Dashboard

ApniSec is a modern, full-stack Next.js application designed for managing security assessments (VAPT, Cloud Security, Reteam). It features secure OOP-based backend architecture, JWT authentication, and a responsive Tailwind CSS UI.

## 🚀 Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Database**: SQLite (Dev) / Postgres (Prod recommended)
-   **ORM**: Prisma (v5)
-   **Styling**: Tailwind CSS
-   **Auth**: JWT (HttpOnly Cookies), Bcrypt
-   **Email**: Resend API

---

## 🛠️ Setup Instructions

### 1. Clone & Install
```bash
git clone <repo-url>
cd my-next-app
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root based on `.env.example`:
```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secure-secret"
RESEND_API_KEY="re_123..."
EMAIL_FROM="onboarding@resend.dev"
```

### 3. Database Setup (Local)
Initialize the SQLite database:
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```
Access the app at `http://localhost:3000`.

---

## 🏗️ Architecture

The backend follows a strict **Object-Oriented Programming (OOP)** layered architecture to ensure maintainability and separation of concerns.

### Layers
1.  **API Routes (Next.js)**: Thin entry points (`src/app/api/...`) that forward requests to handlers.
2.  **Handlers**: Controllers (`AuthHandler`, `IssueHandler`) that manage request parsing, validation, and response formatting.
3.  **Services**: Business logic layer (`AuthService`, `IssueService`) that handles core operations and dependency coordination.
4.  **Repositories**: Data access layer (`UserRepository`, `IssueRepository`) interacting directly with Prisma.
5.  **DI Container**: Centralized Dependency Injection (`src/server/container.ts`) wiring all components together.

### Key Directories
-   `src/server/handlers`: Request controllers.
-   `src/server/services`: Business logic.
-   `src/server/repositories`: DB interactions.
-   `src/server/validators`: Input validation logic.
-   `src/server/middleware`: Rate limiting and Auth checks.

---

## 🚢 Production Deployment (Vercel)

### Prerequisites
-   A Vercel account.
-   A PostgreSQL database (e.g., Vercel Postgres, Supabase, Neon) since SQLite is not recommended for serverless.

### Steps

1.  **Database Migration**:
    -   Update `prisma/schema.prisma`:
        ```prisma
        datasource db {
          provider = "postgresql"
          url      = env("DATABASE_URL")
        }
        ```
    -   Update your `.env` with the Postgres connection string.
    -   Run `npx prisma db push` to sync the schema.

2.  **Push to GitHub**:
    -   Push your code to a GitHub repository.

3.  **Deploy on Vercel**:
    -   Import the repository in Vercel.
    -   **Environment Variables**: Add `DATABASE_URL`, `JWT_SECRET`, and `RESEND_API_KEY` in the Vercel dashboard.
    -   **Build Command**: `npx prisma generate && next build`.
    -   Deploy!

---

## 🔌 API Documentation

### Authentication
-   `POST /api/auth/register`: Create a new account.
-   `POST /api/auth/login`: Sign in (returns HttpOnly cookie).
-   `POST /api/auth/logout`: Sign out.
-   `GET /api/auth/me`: Get current user session.
-   `PUT /api/auth/profile`: Update user profile.

### Issues
-   `GET /api/issues`: List all issues (supports `?type=VAPT` filter).
-   `POST /api/issues`: Create a new issue.
-   `GET /api/issues/:id`: Get issue details.
-   `PUT /api/issues/:id`: Update an issue.
-   `DELETE /api/issues/:id`: Delete an issue.

---

## 🔒 Security Features
-   **Rate Limiting**: Custom middleware limits requests (e.g., 100 req/15min).
-   **HttpOnly Cookies**: Prevents XSS attacks on auth tokens.
-   **Input Validation**: Strict creation/update validation.
