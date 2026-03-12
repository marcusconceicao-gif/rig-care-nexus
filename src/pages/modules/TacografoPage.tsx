import ModulePage from "@/components/modules/ModulePage";

export default function TacografoPage() {
  return (
    <ModulePage
      config={{
        module: "tacografo",
        title: "Tacógrafo - Vencimento",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        hasAlerts: true,
        alertDaysBeforeExpiry: 15,
        expiryField: "data_vencimento_certificado",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Vencimento" },
          { key: "data_vencimento_certificado", label: "Venc. Certificado" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "data_vencimento_certificado",
            label: "Data Vencimento Certificado",
            type: "date",
            placeholder: "Selecione a data de vencimento",
          },
        ],
        externalLinks: [
          {
            label: "Consultar Certificados (INMETRO)",
            url: "https://cronotacografo.rbmlq.gov.br/certificados/consultar",
          },
        ],
      }}
    />
  );
}
