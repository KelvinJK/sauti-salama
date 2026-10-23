# Architecture (initial)
- React Native + Expo mobile application
- Next.js user/admin web application
- NestJS API for authentication/authorization boundary and business logic
- PostgreSQL database, accessed only via backend for private health data
- Prisma ORM planned, not yet configured
- Supabase optional infrastructure; no cloud project created
- Synthetic data only until privacy controls and Tanzanian legal requirements are reviewed

Pending: consent, RBAC, patient/child identity model, threat model, encryption/key handling, audit logging, retention, and safe clinical-content governance.
