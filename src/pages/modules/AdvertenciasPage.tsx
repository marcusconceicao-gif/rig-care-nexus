import ModulePage from "@/components/modules/ModulePage";

export default function AdvertenciasPage() {
  return (
    <ModulePage
      config={{
        module: "advertencias",
        title: "Advertências",
        searchField: "nome",
        searchPlaceholder: "Buscar por nome...",
        columns: [
          { key: "nome", label: "Nome" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Motivo" },
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
            options: ["Aplicada", "Pendente", "Cancelada"],
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
