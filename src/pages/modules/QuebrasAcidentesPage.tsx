import ModulePage from "@/components/modules/ModulePage";

export default function QuebrasAcidentesPage() {
  return (
    <ModulePage
      config={{
        module: "quebras-acidentes",
        title: "Quebras e Acidentes",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        hasFileUpload: true,
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Ocorrência" },
          { key: "observacoes", label: "Detalhes" },
        ],
      }}
    />
  );
}
