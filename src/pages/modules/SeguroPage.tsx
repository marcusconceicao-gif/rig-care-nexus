import ModulePage from "@/components/modules/ModulePage";

export default function SeguroPage() {
  return (
    <ModulePage
      config={{
        module: "seguro",
        title: "Seguro - Vencimento",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        hasAlerts: true,
        columns: [
          { key: "placa", label: "Placa" },
          { key: "empresa_responsavel", label: "Seguradora" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Vencimento" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "empresa_responsavel",
            label: "Seguradora",
            type: "text",
            placeholder: "Nome da seguradora",
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: ["Vigente", "Vencido", "Em Renovação", "Cancelado"],
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
