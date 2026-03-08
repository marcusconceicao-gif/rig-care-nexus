import ModulePage from "@/components/modules/ModulePage";

export default function MotoristasBloqueadosPage() {
  return (
    <ModulePage
      config={{
        module: "motoristas-bloqueados",
        title: "Motoristas Bloqueados",
        searchField: "nome",
        searchPlaceholder: "Buscar por nome...",
        columns: [
          { key: "nome", label: "Nome" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Bloqueio" },
          { key: "observacoes", label: "Motivo" },
        ],
      }}
    />
  );
}
