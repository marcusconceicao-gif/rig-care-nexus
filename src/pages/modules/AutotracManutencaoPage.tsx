import ModulePage from "@/components/modules/ModulePage";

export default function AutotracManutencaoPage() {
  return (
    <ModulePage
      config={{
        module: "rastreador-manutencao",
        title: "Rastreador - Manutenção",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "tipo_rastreador", label: "Tipo Rastreador" },
          { key: "item_trocado", label: "Item Trocado" },
          { key: "empresa_responsavel", label: "Empresa Responsável" },
          { key: "data", label: "Data Execução" },
          { key: "responsavel", label: "Responsável" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "item_trocado",
            label: "O que foi trocado",
            type: "text",
            placeholder: "Descreva o item trocado",
          },
          {
            key: "empresa_responsavel",
            label: "Empresa Responsável",
            type: "text",
            placeholder: "Nome da empresa responsável",
          },
          {
            key: "data_instalacao",
            label: "Data da Execução",
            type: "date",
            placeholder: "Selecione a data da execução",
          },
        ],
      }}
    />
  );
}
