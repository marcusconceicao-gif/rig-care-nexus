import ModulePage from "@/components/modules/ModulePage";

export default function LavagemCarretasPage() {
  return (
    <ModulePage
      config={{
        title: "Lavagem das Carretas",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Lavagem" },
          { key: "observacoes", label: "Observações" },
        ],
      }}
    />
  );
}
