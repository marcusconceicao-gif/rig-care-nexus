import ModulePage from "@/components/modules/ModulePage";

export default function ManutencaoCarretasPage() {
  return (
    <ModulePage
      config={{
        module: "manutencao-carretas",
        title: "Manutenção das Carretas",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "item_trocado", label: "Serviço" },
          { key: "empresa_responsavel", label: "Oficina" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "item_trocado",
            label: "Serviço Realizado",
            type: "text",
            placeholder: "Descreva o serviço",
          },
          {
            key: "empresa_responsavel",
            label: "Oficina / Empresa",
            type: "text",
            placeholder: "Nome da oficina",
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: ["Concluído", "Em Andamento", "Aguardando Peça", "Agendado"],
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
