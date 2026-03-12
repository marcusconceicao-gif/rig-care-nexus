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
          { key: "mes_ano", label: "Mês/Ano" },
          { key: "km_inicial", label: "KM Inicial" },
          { key: "km_final", label: "KM Final" },
          { key: "responsavel", label: "Responsável" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "mes_ano",
            label: "Mês/Ano",
            type: "month_year",
          },
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
