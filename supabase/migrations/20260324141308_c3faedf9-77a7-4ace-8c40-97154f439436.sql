ALTER TABLE public.module_records 
ADD COLUMN IF NOT EXISTS telefone text,
ADD COLUMN IF NOT EXISTS nome_patrao text,
ADD COLUMN IF NOT EXISTS telefone_patrao text;