import ModulePage from "@/components/modules/ModulePage";

export default function MotoristasBloqueadosPage() {
  return (
    <ModulePage
      config={{
        module: "motoristas-bloqueados",
        title: "Motoristas Bloqueados",
        searchField: "nome",
        searchPlaceholder: "Buscar por nome...",
        columns: [
          { key: "nome", label: "Nome" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Bloqueio" },
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
            options: ["Bloqueado", "Desbloqueado", "Em Análise"],
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
