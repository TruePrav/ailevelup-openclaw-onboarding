-- ailevelup onboarding submissions
-- Run this in Supabase SQL editor before deploying

create table public.onboarding_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),

  -- Section 1
  q1_name text,
  q2_messaging_app text,
  q2_messaging_other text,
  q3_phone text,
  q4_timezone text,
  q5_active_hours jsonb,

  -- Section 2
  q6_work text,
  q7_projects text,
  q8_weekday text,
  q9_goal1 text,
  q9_goal2 text,
  q9_goal3 text,

  -- Section 3
  q10_capabilities jsonb,
  q10_other_text text,
  q11_top_priority text,

  -- Section 4
  q12_communication text,
  q12_depends_text text,
  q13_never_do text,
  q14_tone text,
  q15_agent_name text,

  -- Section 5
  q16_integrations jsonb,
  q17_monitoring text,

  -- Section 6
  q18_private text,
  q19_access text,
  q19_other_text text,
  q20_proactive text,

  -- Section 7
  q21_word1 text,
  q21_word2 text,
  q21_word3 text,
  q22_motivation text,
  q23_time_waster text,
  q24_anything_else text,

  -- Full raw payload as backup
  raw_data jsonb
);

-- Enable RLS
alter table public.onboarding_submissions enable row level security;

-- Anyone (anon) can insert — public form
create policy "Allow public inserts"
  on public.onboarding_submissions
  for insert
  to anon
  with check (true);

-- Only authenticated (admin) can read
create policy "Only authenticated can read"
  on public.onboarding_submissions
  for select
  to authenticated
  using (true);
