# Architecture

Nexa ERP is planned as a modular monolith backend with a React single-page application and a REST API backed by PostgreSQL.

The product is intended to become a multi-tenant SaaS. Tenant isolation and authorization must always happen server-side.

Redis and BullMQ are future infrastructure for caching and queues. A future AI layer may use tool calling over explicit backend capabilities.

This document records confirmed direction only; business-domain models and module boundaries are intentionally deferred.
