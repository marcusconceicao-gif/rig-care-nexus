import ModulePage from "@/components/modules/ModulePage";

export default function AdvertenciasPage() {
  return (
    <ModulePage
      config={{
        module: "advertencias",
        title: "Advertências",
        searchField: "nome",
        searchPlaceholder: "Buscar por nome...",
        columns: [
          { key: "nome", label: "Nome" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data" },
          { key: "observacoes", label: "Motivo" },
        ],
      }}
    />
  );
}
