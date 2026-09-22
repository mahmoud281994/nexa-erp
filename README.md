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

## Current status

Bootstrap only: health integration, Prisma foundation, and local PostgreSQL. Business modules, authentication, tenants, Redis, queues, and AI features are intentionally not implemented.
