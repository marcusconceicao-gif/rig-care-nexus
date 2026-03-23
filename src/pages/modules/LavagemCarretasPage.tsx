import ModulePage from "@/components/modules/ModulePage";

export default function LavagemCarretasPage() {
  return (
    <ModulePage
      config={{
        module: "lavagem-carretas",
        title: "Lavagem das Carretas",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "nome", label: "Motorista" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Lavagem" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
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
            key: "status",
            label: "Status",
            type: "select",
            options: ["Realizada", "Pendente", "Agendada"],
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
