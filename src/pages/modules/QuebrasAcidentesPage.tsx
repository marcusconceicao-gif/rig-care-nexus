import ModulePage from "@/components/modules/ModulePage";

export default function QuebrasAcidentesPage() {
  return (
    <ModulePage
      config={{
        module: "quebras-acidentes",
        title: "Quebras e Acidentes",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        hasFileUpload: true,
        columns: [
          { key: "placa", label: "Placa" },
          { key: "nome", label: "Motorista" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Ocorrência" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Detalhes" },
        ],
        extraFields: [
          {
            key: "nome",
            label: "Motorista",
            type: "dynamic_select",
            dynamicSourceModule: "motoristas",
            dynamicSourceField: "nome",
          },
          {
            key: "item_trocado",
            label: "Tipo",
            type: "select",
            options: ["Quebra Mecânica", "Acidente", "Pane Elétrica", "Pneu", "Outro"],
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: ["Em Andamento", "Resolvido", "Aguardando Peça", "Sinistro Aberto"],
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
