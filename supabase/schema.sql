-- I Am The World — Blog CMS
-- Run this once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  type text not null check (type in ('article', 'note', 'series')),
  series_title text,
  series_part integer,
  series_total_parts integer,
  cover_image_url text,
  author_name text not null default 'Sudheendra Chaitanya',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blogs_status_idx on public.blogs(status);
create index if not exists blogs_type_idx on public.blogs(type);
create index if not exists blogs_published_at_idx on public.blogs(published_at desc);
create index if not exists blogs_series_idx on public.blogs(series_title, series_part);

create or replace function public.set_blog_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at
before update on public.blogs
for each row execute function public.set_blog_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.admin_users enable row level security;
alter table public.blogs enable row level security;

drop policy if exists "Admins can read own admin record" on public.admin_users;
create policy "Admins can read own admin record"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Anyone can read published blogs" on public.blogs;
create policy "Anyone can read published blogs"
on public.blogs for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Admins can read all blogs" on public.blogs;
create policy "Admins can read all blogs"
on public.blogs for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can create blogs" on public.blogs;
create policy "Admins can create blogs"
on public.blogs for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update blogs" on public.blogs;
create policy "Admins can update blogs"
on public.blogs for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete blogs" on public.blogs;
create policy "Admins can delete blogs"
on public.blogs for delete
to authenticated
using (public.is_admin());

-- Public image bucket. Upload/delete remains admin-only below.
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Admins can upload blog images" on storage.objects;
create policy "Admins can upload blog images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'blog-images' and public.is_admin());

drop policy if exists "Admins can update blog images" on storage.objects;
create policy "Admins can update blog images"
on storage.objects for update
to authenticated
using (bucket_id = 'blog-images' and public.is_admin())
with check (bucket_id = 'blog-images' and public.is_admin());

drop policy if exists "Admins can delete blog images" on storage.objects;
create policy "Admins can delete blog images"
on storage.objects for delete
to authenticated
using (bucket_id = 'blog-images' and public.is_admin());

-- IMPORTANT: after creating your first user in Authentication > Users,
-- run this with that user's UUID to grant admin access:
-- insert into public.admin_users (user_id) values ('YOUR-AUTH-USER-UUID');
