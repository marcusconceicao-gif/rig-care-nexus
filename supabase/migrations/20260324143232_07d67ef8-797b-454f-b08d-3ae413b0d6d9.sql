ALTER TABLE public.module_records
  ADD COLUMN IF NOT EXISTS trava_quinta_roda text,
  ADD COLUMN IF NOT EXISTS segunda_tecnologia text,
  ADD COLUMN IF NOT EXISTS segunda_tec_usuario text,
  ADD COLUMN IF NOT EXISTS segunda_tec_senha text;