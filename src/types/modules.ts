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
  data_vencimento_certificado?: string;
  cpf?: string;
  foto_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExtraField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'month_year' | 'readonly_date' | 'dynamic_select';
  placeholder?: string;
  options?: string[];
  /** For dynamic_select: module to fetch names from */
  dynamicSourceModule?: string;
  /** For dynamic_select: field to read from source records */
  dynamicSourceField?: string;
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
  externalLinks?: { label: string; url: string }[];
  alertDaysBeforeExpiry?: number;
  expiryField?: string;
}
