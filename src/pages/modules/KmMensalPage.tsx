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
          { key: "km_inicial", label: "KM Inicial" },
          { key: "km_final", label: "KM Final" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Mês/Ano" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "km_inicial",
            label: "KM Inicial",
            type: "text",
            placeholder: "Ex: 150000",
          },
          {
            key: "km_final",
            label: "KM Final",
            type: "text",
            placeholder: "Ex: 155000",
          },
        ],
      }}
    />
  );
}
