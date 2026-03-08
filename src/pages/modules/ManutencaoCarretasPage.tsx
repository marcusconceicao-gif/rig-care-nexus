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
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
      }}
    />
  );
}
