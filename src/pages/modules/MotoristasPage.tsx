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
          { key: "nome", label: "Nome" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Cadastro" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
      }}
    />
  );
}
