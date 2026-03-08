import ModulePage from "@/components/modules/ModulePage";

export default function KmMensalPage() {
  return (
    <ModulePage
      config={{
        module: "km-mensal",
        title: "KM Mensal",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Mês/Ano" },
          { key: "observacoes", label: "KM Registrado" },
        ],
      }}
    />
  );
}
