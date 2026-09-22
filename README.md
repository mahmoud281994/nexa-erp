# Nexa ERP

Nexa ERP is an AI-powered lightweight ERP for small businesses. It starts as a modular monolith with a React SPA and REST API, with multi-tenancy and an AI copilot planned for later phases.

## Stack

TypeScript, NestJS, React, Vite, React Router, TanStack Query, PostgreSQL, Prisma, and pnpm workspaces.

## Structure

```text
apps/api       NestJS REST API
apps/web       React/Vite SPA
packages/shared  Shared TypeScript package
packages/config  Shared configuration package
docs            Architecture documentation
```

## Prerequisites

Node.js 22+, pnpm 9+, and Docker.

## Setup

```bash
pnpm install
copy apps\api\.env.example apps\api\.env
copy apps\web\.env.example apps\web\.env
docker compose up -d postgres
```

## Development

```bash
pnpm dev
```

The API runs on port 3000 and the web app on port 5173. Visit `http://localhost:5173`.

## Commands

`pnpm build`, `pnpm lint`, `pnpm test`, and `pnpm typecheck` run workspace checks.

## Authentication and tenancy

Authentication uses an HTTP-only, SameSite cookie containing a short-lived JWT whose payload identifies only the user. PostgreSQL is the system of record. A global User can have many Membership records, each connecting it to a Tenant with an OWNER, ADMIN, or MEMBER role. Tenant-scoped requests send `X-Tenant-Id`; the API validates the UUID and verifies membership server-side before exposing tenant context.

The current UI provides `/register`, `/login`, and `/dashboard`, including tenant selection and logout.

## Current status

The initial tenant-aware authentication foundation is implemented. Products, inventory, sales, Redis, queues, and AI features are intentionally not implemented.
