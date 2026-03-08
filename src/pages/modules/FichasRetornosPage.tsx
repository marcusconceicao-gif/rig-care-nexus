import ModulePage from "@/components/modules/ModulePage";

export default function FichasRetornosPage() {
  return (
    <ModulePage
      config={{
        module: "fichas-retornos",
        title: "Fichas - Retornos",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        hasFileUpload: true,
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Retorno" },
          { key: "observacoes", label: "Observações" },
        ],
      }}
    />
  );
}
