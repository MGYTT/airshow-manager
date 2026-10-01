# AirShow Manager — Supabase Auth & Cloud Save setup

## 1. Create a Supabase project
Create a project in Supabase and keep the project URL and public anon/publishable key.

Do **not** expose the service role key in this application.

## 2. Apply the database migration
Open Supabase SQL Editor and run:

`supabase/migrations/001_game_saves.sql`

This creates `public.game_saves`, enables Row Level Security and adds policies so an authenticated user can only read, create, update, or delete their own save.

## 3. Configure authentication
In **Authentication → Providers → Email**:
- enable Email/Password,
- keep email confirmation enabled for production.

In **Authentication → URL Configuration** set:
- Site URL: your production AirShow Manager URL,
- Redirect URLs:
  - `https://YOUR-DOMAIN/konto`
  - `https://YOUR-DOMAIN/konto?reset=1`
  - `http://localhost:3000/konto`
  - `http://localhost:3000/konto?reset=1`

## 4. Add Vercel environment variables
Add these for Production, Preview, and Development:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_OR_PUBLISHABLE_KEY
```

The same names are documented in `.env.example`.

## 5. Redeploy
Trigger one Vercel deployment after the environment variables are saved.

## How saves work
- Supabase is the authoritative cloud copy.
- Each account has a separate save protected by RLS.
- A timestamped per-user local cache provides fast/offline recovery.
- When both copies exist, the newer timestamp wins.
- A legacy pre-account local save can only be claimed by the first account on that browser.
- Saves are automatically migrated to the current SaveGame version before use.

## Security model
The browser only receives the public Supabase key. Authorization is enforced in PostgreSQL by `auth.uid() = user_id`. Never add `SUPABASE_SERVICE_ROLE_KEY` to a `NEXT_PUBLIC_*` variable.
