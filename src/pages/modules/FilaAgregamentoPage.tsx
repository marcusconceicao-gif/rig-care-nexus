import ModulePage from "@/components/modules/ModulePage";

export default function FilaAgregamentoPage() {
  return (
    <ModulePage
      config={{
        module: "fila-agregamento",
        title: "Fila para Agregamento",
        searchField: "nome",
        searchPlaceholder: "Buscar por nome...",
        columns: [
          { key: "nome", label: "Nome" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Entrada" },
          { key: "status", label: "Status" },
          { key: "observacoes", label: "Observações" },
        ],
      }}
    />
  );
}
