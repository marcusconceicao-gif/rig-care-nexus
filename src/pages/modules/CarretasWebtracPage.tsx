import ModulePage from "@/components/modules/ModulePage";

export default function CarretasWebtracPage() {
  return (
    <ModulePage
      config={{
        module: "carretas-webtrac",
        title: "Carretas - Webtrac",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "numero_occ", label: "Nº Equipamento" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "numero_occ",
            label: "Nº do Equipamento",
            type: "text",
            placeholder: "Número do equipamento",
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: ["Ativo", "Inativo", "Em Manutenção"],
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
