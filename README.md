# Sauti Salama

Tanzania-first reproductive, maternal and child wellbeing product.

## Workspace
- `apps/mobile` — React Native / Expo (iOS and Android)
- `apps/api` — NestJS API
- `apps/web` — Next.js web/admin application
- `packages` — shared types, validation and utilities (planned)
- `docs` — architecture, product and security notes

## Development
Install: `pnpm install`
Run mobile: `pnpm dev:mobile`
Run API: `pnpm dev:api`
Run web: `pnpm dev:web`

## Security
Only use fictional synthetic health records during development. Never commit secrets, `.env` files, user health information or database backups. Require explicit review before enabling production services, publishing code, or deploying.

## Status
Starter scaffold only. No production authentication, medical decision-making features, or compliant data-processing architecture is implemented yet.
