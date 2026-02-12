import ModulePage from "@/components/modules/ModulePage";

export default function TacografoPage() {
  return (
    <ModulePage
      config={{
        title: "Tacógrafo - Vencimento",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        hasAlerts: true,
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Vencimento" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
      }}
    />
  );
}
