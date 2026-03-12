import ModulePage from "@/components/modules/ModulePage";

export default function AutotracInstalacaoPage() {
  return (
    <ModulePage
      config={{
        module: "rastreador-instalacao",
        title: "Rastreador - Instalação",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Instalação" },
          { key: "observacoes", label: "Observações" },
        ],
      }}
    />
  );
}
