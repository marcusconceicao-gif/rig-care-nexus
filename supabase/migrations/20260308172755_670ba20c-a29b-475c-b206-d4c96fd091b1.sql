
-- Create module_records table for all GestFrota modules
CREATE TABLE public.module_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module TEXT NOT NULL,
  placa TEXT,
  nome TEXT,
  data TEXT NOT NULL,
  responsavel TEXT NOT NULL,
  observacoes TEXT,
  status TEXT DEFAULT 'Ativo',
  arquivo_url TEXT,
  email_confirmado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster module filtering
CREATE INDEX idx_module_records_module ON public.module_records (module);
CREATE INDEX idx_module_records_placa ON public.module_records (placa);
CREATE INDEX idx_module_records_nome ON public.module_records (nome);

-- Enable RLS
ALTER TABLE public.module_records ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations (no auth yet)
CREATE POLICY "Allow all select" ON public.module_records FOR SELECT USING (true);
CREATE POLICY "Allow all insert" ON public.module_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.module_records FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON public.module_records FOR DELETE USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_module_records_updated_at
  BEFORE UPDATE ON public.module_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('module-files', 'module-files', true);

CREATE POLICY "Anyone can view module files" ON storage.objects FOR SELECT USING (bucket_id = 'module-files');
CREATE POLICY "Anyone can upload module files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'module-files');
CREATE POLICY "Anyone can delete module files" ON storage.objects FOR DELETE USING (bucket_id = 'module-files');
