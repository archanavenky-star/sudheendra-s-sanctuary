# I Am The World — Blog CMS setup

This project now supports a free-tier Supabase-backed blog CMS without requiring a custom server.

## 1. Create Supabase project

Create a free Supabase project at https://supabase.com/.

In **SQL Editor**, run the complete contents of:

`supabase/schema.sql`

## 2. Create your admin account

In Supabase:

1. Open **Authentication → Users**.
2. Create the email/password account you will use for `/admin/login`.
3. Copy that user's UUID.
4. In SQL Editor run:

```sql
insert into public.admin_users (user_id)
values ('YOUR-AUTH-USER-UUID');
```

Only users listed in `admin_users` can manage blog content.

## 3. Configure the frontend

Copy `.env.example` to `.env.local` and fill in:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

The publishable/anon key is safe to use in the browser when the RLS policies in `supabase/schema.sql` are enabled.

## 4. Migrate the existing writings

The original hard-coded writings are preserved in `src/data/content.ts` and exported as `scripts/seed-content.json`.

For the one-time migration, add your **service role key** only as `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Then run:

```bash
npm install
npm run migrate:content
```

Remove the service-role key from `.env.local` after migration if you do not need it again. **Never use it as a `VITE_*` variable and never commit it.**

## 5. Run locally

```bash
npm run dev
```

Public site:

- `/`
- `/articles`
- `/notes`
- `/series`
- `/read/:slug`

Admin:

- `/admin/login`
- `/admin/blogs`
- `/admin/blogs/new`
- `/admin/blogs/:id/edit`

## Blog editor

The editor stores Markdown in Supabase. The toolbar supports headings, quotes, links and lists. Images can be uploaded directly from the admin UI into the `blog-images` Supabase Storage bucket.

The public reader safely renders the supported Markdown constructs without injecting arbitrary HTML.

## Draft / publish workflow

- **Save draft** stores `status = draft` and does not expose the writing publicly.
- **Publish** stores `status = published` and sets `published_at`.
- Public pages only query published rows.
- Admin pages can see drafts and published writings.

## Deployment

The frontend can be deployed as a static Vite app to Cloudflare Pages, Netlify, Vercel, or GitHub Pages-compatible hosting. For the recommended free setup, use Cloudflare Pages and point your purchased domain at it.

Set the same two `VITE_*` variables in the hosting provider's environment settings. Do not put the service-role key into the frontend build environment.

## Important security notes

- RLS is enabled on both the blog table and admin table.
- Public visitors can only read published blogs.
- Only UUIDs in `admin_users` can create/edit/delete blogs.
- Only admins can upload/update/delete files in the blog image bucket.
- The Supabase publishable/anon key is intentionally used by the browser; the service-role key is not.