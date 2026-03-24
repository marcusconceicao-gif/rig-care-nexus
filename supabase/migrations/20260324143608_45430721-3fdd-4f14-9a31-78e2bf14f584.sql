ALTER TABLE public.module_records
  ADD COLUMN IF NOT EXISTS usuario_rastreador text,
  ADD COLUMN IF NOT EXISTS senha_rastreador text;