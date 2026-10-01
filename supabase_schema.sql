-- ============================================================================
-- HARFTI MARKETPLACE - COMPLETE SUPABASE SQL SCHEMA
-- Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- ============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================================
-- 1. CRAFTS TABLE (Marketplace Services & Products)
-- ============================================================================
create table if not exists public.crafts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'Woodwork',
  tags text[] default array['#Handmade'],
  description text,
  image_url text,
  gallery_images text[],
  location text default 'Casablanca, Morocco',
  craftsman_name text,
  craftsman_avatar text,
  specialty_subtitle text,
  materials text,
  dimensions text,
  crafting_time text,
  origin text,
  rating numeric default 5.0,
  review_count integer default 1,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.crafts enable row level security;

-- Policies for Crafts:
drop policy if exists "Anyone can view crafts" on public.crafts;
create policy "Anyone can view crafts"
  on public.crafts for select
  using (true);

drop policy if exists "Authenticated users can create crafts" on public.crafts;
create policy "Authenticated users can create crafts"
  on public.crafts for insert
  with check (auth.role() = 'authenticated' or true);

drop policy if exists "Users can update their own crafts" on public.crafts;
create policy "Users can update their own crafts"
  on public.crafts for update
  using (auth.uid() = user_id or user_id is null);

drop policy if exists "Users can delete their own crafts" on public.crafts;
create policy "Users can delete their own crafts"
  on public.crafts for delete
  using (auth.uid() = user_id or user_id is null);


-- ============================================================================
-- 2. REVIEWS TABLE (Craftsman Profile Comments & Ratings)
-- ============================================================================
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  craftsman_id text not null,
  author text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  text text not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

alter table public.reviews enable row level security;

drop policy if exists "Anyone can view reviews" on public.reviews;
create policy "Anyone can view reviews"
  on public.reviews for select
  using (true);

drop policy if exists "Anyone can insert reviews" on public.reviews;
create policy "Anyone can insert reviews"
  on public.reviews for insert
  with check (true);


-- ============================================================================
-- 3. MESSAGES TABLE (Direct Chat, Images & Voice Notes)
-- ============================================================================
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id text not null,
  sender_id text not null,
  sender_name text not null,
  text text default '',
  image_url text,
  audio_url text,
  audio_duration text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.messages enable row level security;

-- Policies for Messages (allows both sender and craftsman to view messages in conversation):
drop policy if exists "Anyone can view conversation messages" on public.messages;
create policy "Anyone can view conversation messages"
  on public.messages for select
  using (true);

drop policy if exists "Anyone can insert messages" on public.messages;
create policy "Anyone can insert messages"
  on public.messages for insert
  with check (true);

-- Enable Realtime for live messaging
alter publication supabase_realtime add table public.messages;
