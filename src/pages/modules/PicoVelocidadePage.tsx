import ModulePage from "@/components/modules/ModulePage";

export default function PicoVelocidadePage() {
  return (
    <ModulePage
      config={{
        title: "Pico de Velocidade",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data" },
          { key: "observacoes", label: "Detalhes" },
        ],
      }}
    />
  );
}
