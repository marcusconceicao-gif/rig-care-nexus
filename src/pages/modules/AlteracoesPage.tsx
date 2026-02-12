import ModulePage from "@/components/modules/ModulePage";

export default function AlteracoesPage() {
  return (
    <ModulePage
      config={{
        title: "Alterações",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data" },
          { key: "observacoes", label: "Alteração Realizada" },
        ],
      }}
    />
  );
}
