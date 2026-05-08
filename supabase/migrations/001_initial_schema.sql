-- køde — Schema inicial
-- Executar no Supabase: SQL Editor → Run

CREATE TABLE IF NOT EXISTS leads (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  timestamptz DEFAULT now(),
  nome        text NOT NULL,
  empresa     text,
  segmento    text,
  whatsapp    text NOT NULL,
  pacote      text,
  objetivo    text,
  dominio     text,
  logo        text,
  referencias text,
  info        text,
  status      text DEFAULT 'novo' -- novo | em_contato | fechado | perdido
);

CREATE TABLE IF NOT EXISTS conversations (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  phone       text NOT NULL,
  role        text NOT NULL,   -- 'user' | 'assistant'
  content     text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conversations_phone
  ON conversations(phone, created_at DESC);
