import ModulePage from "@/components/modules/ModulePage";

export default function FichasEnvioPage() {
  return (
    <ModulePage
      config={{
        module: "fichas-envio",
        title: "Fichas - Envio",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        hasFileUpload: true,
        hasEmailConfirm: true,
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Envio" },
          { key: "observacoes", label: "Observações" },
        ],
      }}
    />
  );
}
