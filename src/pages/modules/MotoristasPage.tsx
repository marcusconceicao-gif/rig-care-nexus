import ModulePage from "@/components/modules/ModulePage";

export default function MotoristasPage() {
  return (
    <ModulePage
      config={{
        module: "motoristas",
        title: "Motoristas",
        searchField: "nome",
        searchPlaceholder: "Buscar por nome...",
        columns: [
          { key: "foto_url", label: "Foto" },
          { key: "nome", label: "Nome" },
          { key: "cpf", label: "CPF" },
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Cadastro" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "nome",
            label: "Nome do Motorista",
            type: "text",
            placeholder: "Nome completo",
          },
          {
            key: "cpf",
            label: "CPF",
            type: "text",
            placeholder: "000.000.000-00",
          },
          {
            key: "foto_url",
            label: "Foto do Motorista",
            type: "photo",
          },
          {
            key: "placa",
            label: "Placa do Veículo",
            type: "text",
            placeholder: "ABC-1234",
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: ["Ativo", "Inativo", "Afastado", "Férias"],
          },
          {
            key: "data_execucao_display",
            label: "Data do Cadastro",
            type: "readonly_date",
          },
        ],
      }}
    />
  );
}
