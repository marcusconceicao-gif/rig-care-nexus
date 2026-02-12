import ModulePage from "@/components/modules/ModulePage";

export default function InicioFimOperacaoPage() {
  return (
    <ModulePage
      config={{
        title: "Início e Fim de Operação",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data" },
          { key: "status", label: "Tipo" },
          { key: "observacoes", label: "Observações" },
        ],
      }}
    />
  );
}
