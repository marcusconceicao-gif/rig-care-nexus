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
          { key: "tipo_rastreador", label: "Tipo Rastreador" },
          { key: "numero_occ", label: "Nº OCC" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Instalação" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "tipo_rastreador",
            label: "Tipo de Rastreador",
            type: "select",
            options: ["ONIXSAT", "AUTOTRAC"],
          },
          {
            key: "numero_occ",
            label: "Número OCC",
            type: "text",
            placeholder: "Digite o nº OCC do caminhão",
          },
        ],
      }}
    />
  );
}
