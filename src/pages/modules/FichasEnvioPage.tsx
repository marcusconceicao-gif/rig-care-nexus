import ModulePage from "@/components/modules/ModulePage";

export default function FichasEnvioPage() {
  return (
    <ModulePage
      config={{
        module: "fichas-envio",
        title: "Fichas - Envio",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        hasFileUpload: true,
        hasEmailConfirm: true,
        columns: [
          { key: "placa", label: "Placa" },
          { key: "nome", label: "Motorista" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Envio" },
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
            options: ["Enviado", "Pendente", "Devolvido"],
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
