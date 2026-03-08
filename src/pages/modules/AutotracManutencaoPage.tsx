import ModulePage from "@/components/modules/ModulePage";

export default function AutotracManutencaoPage() {
  return (
    <ModulePage
      config={{
        module: "autotrac-manutencao",
        title: "Autotrac - Manutenção",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
      }}
    />
  );
}
