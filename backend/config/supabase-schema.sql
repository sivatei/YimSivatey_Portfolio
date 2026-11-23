-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query)

-- 1. Create Projects Table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  "techStack" text[] default '{}',
  "imageUrl" text default '',
  "imageUrls" text[] default '{}',
  "videoUrl" text default '',
  "githubUrl" text default '',
  "liveUrl" text default '',
  role text default '',
  featured boolean default true,
  "order" integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Create Contacts Table (for contact form submissions)
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- 3. Enable Row Level Security (RLS) - Recommended
alter table public.projects enable row level security;
alter table public.contacts enable row level security;

-- 4. Policies (Allows public read for projects, public insert for contacts)
create policy "Allow public read access to projects"
  on public.projects for select using (true);

create policy "Allow public to submit contact messages"
  on public.contacts for insert with check (true);

-- (Backend using SUPABASE_SERVICE_ROLE_KEY automatically bypasses RLS for admin create/update/delete)
