import ModulePage from "@/components/modules/ModulePage";

export default function AutotracInstalacaoPage() {
  return (
    <ModulePage
      config={{
        module: "rastreador-instalacao",
        title: "Rastreador - Instalação",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "tipo_rastreador", label: "Tipo Rastreador" },
          { key: "numero_occ", label: "Nº OCC" },
          { key: "empresa_responsavel", label: "Empresa Responsável" },
          { key: "trava_quinta_roda", label: "Trava 5ª Roda" },
          { key: "usuario_rastreador", label: "Usuário Rastreador" },
          { key: "segunda_tecnologia", label: "2ª Tecnologia" },
          { key: "responsavel", label: "Responsável" },
          { key: "data", label: "Data Instalação" },
          { key: "observacoes", label: "Observações" },
        ],
        extraFields: [
          {
            key: "tipo_rastreador",
            label: "Tipo de Rastreador",
            type: "select",
            options: ["ONIXSAT", "AUTOTRAC"],
          },
          {
            key: "numero_occ",
            label: "Número OCC",
            type: "text",
            placeholder: "Digite o nº OCC do caminhão",
          },
          {
            key: "empresa_responsavel",
            label: "Empresa Responsável",
            type: "text",
            placeholder: "Nome da empresa responsável",
          },
          {
            key: "data_instalacao",
            label: "Data da Instalação",
            type: "date",
            placeholder: "Selecione a data da instalação",
          },
          {
            key: "trava_quinta_roda",
            label: "Trava de Quinta Roda",
            type: "select",
            options: ["SIM", "NÃO"],
          },
          {
            key: "usuario_rastreador",
            label: "Usuário do Rastreador",
            type: "text",
            placeholder: "Usuário de acesso ao rastreador",
          },
          {
            key: "senha_rastreador",
            label: "Senha do Rastreador",
            type: "text",
            placeholder: "Senha de acesso ao rastreador",
          },
          {
            key: "segunda_tecnologia",
            label: "Segunda Tecnologia",
            type: "select",
            options: ["T4S", "3S"],
          },
          {
            key: "segunda_tec_usuario",
            label: "Usuário (2ª Tecnologia)",
            type: "text",
            placeholder: "Usuário de acesso",
          },
          {
            key: "segunda_tec_senha",
            label: "Senha (2ª Tecnologia)",
            type: "text",
            placeholder: "Senha de acesso",
          },
        ],
      }}
    />
  );
}
