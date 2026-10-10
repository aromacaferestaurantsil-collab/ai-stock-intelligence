# AI Stock Intelligence

Starter monorepo for an AI-assisted market research app focused on Indian and US markets.

## Current scope
- Next.js web dashboard starter
- Expo / React Native mobile starter
- Shared TypeScript scoring package with tests
- Supabase/PostgreSQL schema with Row Level Security
- GitHub Actions CI workflow

## Important status
This is an MVP starter, not a production financial product. Demo market values are illustrative. No live data provider is configured and no live trading or personalized buy/sell recommendations are implemented.

## Setup
1. Install Node.js LTS and pnpm.
2. Copy `.env.example` to `.env.local` and add the Supabase project URL and publishable key.
3. Install dependencies with `pnpm install`.
4. Run `pnpm dev:web` for the web app or `pnpm dev:mobile` for the Expo app.
5. Run tests with `pnpm test`.

## Supabase
Project ref: `lojayufyloocragfwzhd`
Region: Mumbai (`ap-south-1`)

The connected Supabase project already has the initial schema applied. See `supabase/migrations` for the schema source.

## Security
- Never commit service-role keys or provider secrets.
- Use only publishable/anon keys in client apps.
- Keep data-provider and AI keys on a trusted server.
- Review Supabase RLS policies before adding new tables or endpoints.
- Check market-data provider licensing and applicable Indian regulatory requirements before public release.
