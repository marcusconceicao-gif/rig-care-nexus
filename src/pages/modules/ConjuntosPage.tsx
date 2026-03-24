import ModulePage from "@/components/modules/ModulePage";

export default function ConjuntosPage() {
  return (
    <ModulePage
      config={{
        module: "conjuntos",
        title: "Conjuntos",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa do cavalo...",
        columns: [
          { key: "nome", label: "Motorista" },
          { key: "placa", label: "Placa Cavalo" },
          { key: "numero_occ", label: "Placa Carreta" },
          { key: "responsavel", label: "Empresa" },
          { key: "data", label: "Data" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "nome",
            label: "Motorista",
            type: "text",
            placeholder: "Nome do motorista",
          },
          {
            key: "numero_occ",
            label: "Placa da Carreta",
            type: "text",
            placeholder: "ABC-1234",
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: ["Ativo", "Inativo", "Em Manutenção", "Aguardando"],
          },
          {
            key: "data_execucao_display",
            label: "Data de Registro",
            type: "readonly_date",
          },
        ],
      }}
    />
  );
}
