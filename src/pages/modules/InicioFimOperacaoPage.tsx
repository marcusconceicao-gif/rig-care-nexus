import ModulePage from "@/components/modules/ModulePage";

export default function InicioFimOperacaoPage() {
  return (
    <ModulePage
      config={{
        module: "inicio-fim-operacao",
        title: "Início e Fim de Operação",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "nome", label: "Motorista" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data" },
          { key: "status", label: "Tipo" },
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
            label: "Tipo",
            type: "select",
            options: ["Início de Operação", "Fim de Operação"],
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
