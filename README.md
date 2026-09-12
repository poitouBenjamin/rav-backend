# rav-backend
Personal budget tracker POC — track income, recurring expenses and savings, and know your real available balance daily.

# rav — API

Backend API for **rav**, a personal budget tracking POC. The app lets you track, month by month, the day and amount of your income, the list of recurring expenses (name, amount, debit day) and your savings goal, then check off day by day what has actually been debited so you always know how much is left to live on.

> This repo only contains the backend. The frontend (React) lives in a separate repo: [`rav-front`](#) *(link to add)*.

## Table of contents

- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Available scripts](#available-scripts)
- [Data model](#data-model)
- [Roadmap](#roadmap)

## Tech stack

| Layer | Choice |
|---|---|
| Runtime | Node.js 22.18+ (native TypeScript execution, no ts-node/tsx) |
| HTTP framework | Express |
| Language | TypeScript (native ESM, `moduleResolution: NodeNext`) |
| Database | PostgreSQL, raw SQL queries via `pg` (no ORM) |
| Validation | Zod |
| Containerization | Docker + Docker Compose |
| Frontend *(separate repo)* | React + Tailwind CSS |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- Node.js 22.18+ or 23.6+ locally if you want to run the API outside the container (`node -v` to check)

## Getting started

```bash
git clone https://github.com/poitouBenjamin/rav-backend.git
cd rav-api
cp .env.example .env
docker compose up --build
```

`docker compose up` starts three services:

| Service | Role | Default port |
|---|---|---|
| `api` | Express server | `3000` |
| `db` | PostgreSQL | `5432` |
| `adminer` | Database admin UI | `8080` |

The API is then available at `http://localhost:3000`.

## Environment variables

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:password@db:5432/rav` |
| `PORT` | Express server listening port | `3000` |
| `NODE_ENV` | Runtime environment | `development` |

## Project structure

```
src/
  routes/        # Endpoint declarations
  controllers/   # HTTP request/response handling
  services/      # Business logic
  repositories/  # Data access (raw SQL queries via pg)
  schemas/       # Zod validation schemas
  db/            # Connection and SQL migrations
```

Layered architecture: `routes → controller → service → repository`.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Run the API locally with hot reload (`node --watch`) |
| `npm run typecheck` | Type-check without compiling (`tsc --noEmit`) |
| `npm test` | Run tests |

## Data model

The model separates **recurring definitions** (`profiles`, `expenses`) from **monthly occurrences** (`expense_occurrences`, `income_occurrences`, `savings_occurrences`), automatically generated when entering a new month. This split keeps a reliable history even if an expense's amount changes or it gets deactivated later.

Full detail: see the project's spec document.

## Roadmap

- [ ] Onboarding + first-month generation + read-only dashboard
- [ ] Checking off expenses with live recalculation
- [ ] Expense management (CRUD) + history navigation
- [ ] *(out of POC scope)* Bank connection, notifications, advanced multi-month view

