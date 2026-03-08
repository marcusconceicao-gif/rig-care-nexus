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
  created_at?: string;
  updated_at?: string;
}

export interface ModuleConfig {
  title: string;
  module: string; // unique key for DB filtering
  searchField: 'placa' | 'nome';
  searchPlaceholder: string;
  columns: { key: string; label: string }[];
  hasFileUpload?: boolean;
  hasEmailConfirm?: boolean;
  hasAlerts?: boolean;
}
