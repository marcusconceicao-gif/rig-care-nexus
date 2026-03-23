import ModulePage from "@/components/modules/ModulePage";

export default function FichasRetornosPage() {
  return (
    <ModulePage
      config={{
        module: "fichas-retornos",
        title: "Fichas - Retornos",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        hasFileUpload: true,
        columns: [
          { key: "placa", label: "Placa" },
          { key: "nome", label: "Motorista" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Retorno" },
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
            options: ["Recebido", "Pendente", "Conferido"],
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
