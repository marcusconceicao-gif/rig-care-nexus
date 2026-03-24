import ModulePage from "@/components/modules/ModulePage";

export default function AutotracManutencaoPage() {
  return (
    <ModulePage
      config={{
        module: "rastreador-manutencao",
        title: "Rastreador - Manutenção",
        searchField: "placa",
        searchPlaceholder: "Buscar por placa...",
        columns: [
          { key: "placa", label: "Placa" },
          { key: "tipo_rastreador", label: "Tipo Rastreador" },
          { key: "item_trocado", label: "Item Trocado" },
          { key: "empresa_responsavel", label: "Empresa Responsável" },
          { key: "trava_quinta_roda", label: "Trava 5ª Roda" },
          { key: "usuario_rastreador", label: "Usuário Rastreador" },
          { key: "segunda_tecnologia", label: "2ª Tecnologia" },
          { key: "data", label: "Data Execução" },
          { key: "responsavel", label: "Responsável" },
          { key: "status", label: "Status" },
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
            key: "item_trocado",
            label: "O que foi trocado",
            type: "text",
            placeholder: "Descreva o item trocado",
          },
          {
            key: "empresa_responsavel",
            label: "Empresa Responsável",
            type: "text",
            placeholder: "Nome da empresa responsável",
          },
          {
            key: "data_execucao_display",
            label: "Data da Execução",
            type: "readonly_date",
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
