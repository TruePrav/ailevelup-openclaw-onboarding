# ailevelup Onboarding Form

Multi-step client onboarding form for [ailevelup.ca](https://ailevelup.ca) Personal AI service.

Clients fill this out after signing up. 7 sections, 24 questions. Submissions saved to Supabase.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- React Hook Form v7
- Supabase (submissions storage)

## Setup

```bash
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Run the SQL in `supabase/schema.sql` in your Supabase SQL editor first.

```bash
npm run dev   # http://localhost:4001
npm run build
```

## Structure

```
/app/api/submit     — POST handler (saves to Supabase + JSON backup)
/components/sections — 7 form sections
/data/submissions   — local JSON backups (gitignored)
/supabase/schema.sql — DB schema + RLS policies
```
