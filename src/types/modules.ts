export interface ModuleRecord {
  id: string;
  module: string;
  placa?: string;
  nome?: string;
  data: string;
  responsavel: string;
  observacoes: string;
  status?: string;
  arquivo_url?: string;
  email_confirmado?: boolean;
  tipo_rastreador?: string;
  numero_occ?: string;
  empresa_responsavel?: string;
  item_trocado?: string;
  km_inicial?: string;
  km_final?: string;
  mes_ano?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExtraField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'month_year';
  placeholder?: string;
  options?: string[];
}

export interface ModuleConfig {
  title: string;
  module: string;
  searchField: 'placa' | 'nome';
  searchPlaceholder: string;
  columns: { key: string; label: string }[];
  hasFileUpload?: boolean;
  hasEmailConfirm?: boolean;
  hasAlerts?: boolean;
  extraFields?: ExtraField[];
}
