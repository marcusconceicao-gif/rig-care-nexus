import ModulePage from "@/components/modules/ModulePage";

export default function FilaAgregamentoPage() {
  return (
    <ModulePage
      config={{
        module: "fila-agregamento",
        title: "Fila para Agregamento",
        searchField: "nome",
        searchPlaceholder: "Buscar por nome...",
        columns: [
          { key: "nome", label: "Nome" },
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Entrada" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "nome",
            label: "Nome do Proprietário",
            type: "text",
            placeholder: "Nome completo",
          },
          {
            key: "placa",
            label: "Placa do Veículo",
            type: "text",
            placeholder: "ABC-1234",
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: ["Na Fila", "Em Análise", "Aprovado", "Reprovado", "Agregado"],
          },
          {
            key: "data_execucao_display",
            label: "Data do Registro",
            type: "readonly_date",
          },
        ],
      }}
    />
  );
}
