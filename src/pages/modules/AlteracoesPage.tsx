import ModulePage from "@/components/modules/ModulePage";

export default function AlteracoesPage() {
  return (
    <ModulePage
      config={{
        module: "alteracoes",
        title: "Alterações",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "nome", label: "Motorista" },
          { key: "item_trocado", label: "Tipo de Alteração" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Detalhes" },
        ],
        extraFields: [
          {
            key: "nome",
            label: "Motorista",
            type: "text",
            placeholder: "Nome do motorista",
          },
          {
            key: "item_trocado",
            label: "Tipo de Alteração",
            type: "select",
            options: [
              "Troca de Cavalo",
              "Troca de Carreta",
              "Troca de Motorista",
              "Alteração de Rota",
              "Troca de Conjunto",
              "Outro",
            ],
          },
          {
            key: "numero_occ",
            label: "Placa Anterior / Referência",
            type: "text",
            placeholder: "Placa ou referência anterior",
          },
          {
            key: "empresa_responsavel",
            label: "Placa Nova / Referência",
            type: "text",
            placeholder: "Placa ou referência nova",
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: ["Concluído", "Pendente", "Em Andamento", "Cancelado"],
          },
          {
            key: "data_execucao_display",
            label: "Data da Alteração",
            type: "readonly_date",
          },
        ],
      }}
    />
  );
}
