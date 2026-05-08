-- køde Blog — Posts table + RLS
-- Run this in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  cover_url    TEXT,
  content      TEXT,
  excerpt      TEXT,
  tag          TEXT DEFAULT 'IA & Automação',
  status       TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS: public reads only published posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_published"
  ON posts FOR SELECT
  USING (status = 'published');

-- Supabase Storage bucket for cover images
-- Run manually in Supabase Dashboard → Storage → New bucket: "blog-images" (public)
