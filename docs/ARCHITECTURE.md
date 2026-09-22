# Architecture

Nexa ERP is planned as a modular monolith backend with a React single-page application and a REST API backed by PostgreSQL.

The product is intended to become a multi-tenant SaaS. Tenant isolation and authorization must always happen server-side.

Redis and BullMQ are future infrastructure for caching and queues. A future AI layer may use tool calling over explicit backend capabilities.

This document records confirmed direction only; business-domain models and module boundaries are intentionally deferred.

## Current authentication foundation

User is a global identity. Tenant membership is represented by the Membership pivot, which stores the OWNER, ADMIN, or MEMBER role; User does not contain a tenant ID. Registration creates User, Tenant, and OWNER Membership in one PostgreSQL transaction. Email and tenant slug uniqueness are database constraints.

The API uses an HTTP-only, SameSite JWT cookie. The JWT contains only the user subject. Tenant context comes from `X-Tenant-Id`, and a reusable Nest guard validates the UUID, loads the tenant, and verifies the authenticated user's membership before tenant-scoped handlers run. PostgreSQL and Prisma are the authoritative datastore.
