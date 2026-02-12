export interface ModuleRecord {
  id: string;
  placa?: string;
  nome?: string;
  data: string;
  responsavel: string;
  observacoes: string;
  status?: string;
  arquivo?: string;
}

export interface ModuleConfig {
  title: string;
  searchField: 'placa' | 'nome';
  searchPlaceholder: string;
  columns: { key: string; label: string }[];
  hasFileUpload?: boolean;
  hasEmailConfirm?: boolean;
  hasAlerts?: boolean;
}
