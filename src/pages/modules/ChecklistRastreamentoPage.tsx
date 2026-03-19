import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Trash2, Loader2, CheckCircle2, XCircle, ClipboardCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ChecklistItem {
  key: string;
  label: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { key: "rastreador_instalado", label: "Rastreador Instalado" },
  { key: "rastreador_funcionando", label: "Rastreador Funcionando" },
  { key: "sensor_porta", label: "Sensor de Porta" },
  { key: "sensor_bau", label: "Sensor de Baú" },
  { key: "teclado_funcionando", label: "Teclado Funcionando" },
  { key: "antena_ok", label: "Antena OK" },
  { key: "fiacao_ok", label: "Fiação OK" },
  { key: "teste_comunicacao", label: "Teste de Comunicação" },
  { key: "sirene_panico", label: "Sirene/Pânico" },
  { key: "bloqueio_funcionando", label: "Bloqueio Funcionando" },
];

interface ChecklistRecord {
  id: string;
  placa: string | null;
  nome: string | null;
  tipo_rastreador: string | null;
  numero_occ: string | null;
  responsavel: string;
  data: string;
  observacoes: string | null;
  checklist_data: Record<string, boolean> | null;
  created_at: string;
}

export default function ChecklistRastreamentoPage() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<ChecklistRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    placa: "",
    nome: "",
    tipo_rastreador: "",
    numero_occ: "",
    responsavel: "",
    observacoes: "",
    checklist: {} as Record<string, boolean>,
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("module_records")
      .select("*")
      .eq("module", "checklist-rastreamento")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Erro ao carregar registros", description: error.message, variant: "destructive" });
    } else {
      setRecords(
        (data || []).map((d: any) => ({
          ...d,
          checklist_data: typeof d.checklist_data === "string" ? JSON.parse(d.checklist_data) : d.checklist_data,
        }))
      );
    }
    setLoading(false);
  };

  const filtered = records.filter((r) =>
    (r.placa || "").toLowerCase().includes(search.toLowerCase()) ||
    (r.nome || "").toLowerCase().includes(search.toLowerCase())
  );

  const toggleCheck = (key: string) => {
    setForm((p) => ({
      ...p,
      checklist: { ...p.checklist, [key]: !p.checklist[key] },
    }));
  };

  const getChecklistScore = (data: Record<string, boolean> | null) => {
    if (!data) return { checked: 0, total: CHECKLIST_ITEMS.length };
    const checked = CHECKLIST_ITEMS.filter((item) => data[item.key]).length;
    return { checked, total: CHECKLIST_ITEMS.length };
  };

  const handleAdd = async () => {
    if (!form.placa && !form.nome) {
      toast({ title: "Preencha a placa ou nome do motorista", variant: "destructive" });
      return;
    }
    if (!form.responsavel) {
      toast({ title: "Preencha o responsável", variant: "destructive" });
      return;
    }

    setSaving(true);

    const newRecord = {
      module: "checklist-rastreamento",
      placa: form.placa || null,
      nome: form.nome || null,
      tipo_rastreador: form.tipo_rastreador || null,
      numero_occ: form.numero_occ || null,
      data: new Date().toLocaleDateString("pt-BR"),
      responsavel: form.responsavel,
      observacoes: form.observacoes || null,
      checklist_data: form.checklist,
    };

    const { error } = await supabase.from("module_records").insert([newRecord]);

    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Checklist salvo com sucesso!" });
      setForm({ placa: "", nome: "", tipo_rastreador: "", numero_occ: "", responsavel: "", observacoes: "", checklist: {} });
      setDialogOpen(false);
      fetchRecords();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("module_records").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      setRecords((prev) => prev.filter((r) => r.id !== id));
      toast({ title: "Registro excluído" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6" />
            Checklist Rastreamento
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {records.length} checklist{records.length !== 1 ? "s" : ""} registrado{records.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Checklist
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Checklist de Rastreamento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              {/* Dados do Cavalo */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dados do Cavalo</p>
                <div className="h-px bg-border" />
              </div>
              <div className="space-y-2">
                <Label>Placa do Cavalo</Label>
                <Input
                  placeholder="ABC-1234"
                  value={form.placa}
                  onChange={(e) => setForm((p) => ({ ...p, placa: e.target.value.toUpperCase() }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Tipo Rastreador</Label>
                  <Select
                    value={form.tipo_rastreador}
                    onValueChange={(val) => setForm((p) => ({ ...p, tipo_rastreador: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ONIXSAT">ONIXSAT</SelectItem>
                      <SelectItem value="AUTOTRAC">AUTOTRAC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Nº OCC</Label>
                  <Input
                    placeholder="Número OCC"
                    value={form.numero_occ}
                    onChange={(e) => setForm((p) => ({ ...p, numero_occ: e.target.value }))}
                  />
                </div>
              </div>

              {/* Dados do Motorista */}
              <div className="space-y-1 pt-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dados do Motorista</p>
                <div className="h-px bg-border" />
              </div>
              <div className="space-y-2">
                <Label>Nome do Motorista</Label>
                <Input
                  placeholder="Nome completo"
                  value={form.nome}
                  onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
                />
              </div>

              {/* Responsável */}
              <div className="space-y-2">
                <Label>Responsável pela Inspeção</Label>
                <Input
                  placeholder="Nome do responsável"
                  value={form.responsavel}
                  onChange={(e) => setForm((p) => ({ ...p, responsavel: e.target.value }))}
                />
              </div>

              {/* Checklist Items */}
              <div className="space-y-1 pt-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Itens do Checklist</p>
                <div className="h-px bg-border" />
              </div>
              <div className="grid grid-cols-1 gap-2">
                {CHECKLIST_ITEMS.map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center gap-3 p-2.5 rounded-md border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <Checkbox
                      checked={!!form.checklist[item.key]}
                      onCheckedChange={() => toggleCheck(item.key)}
                    />
                    <span className="text-sm">{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Observações */}
              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea
                  placeholder="Detalhes adicionais..."
                  value={form.observacoes}
                  onChange={(e) => setForm((p) => ({ ...p, observacoes: e.target.value }))}
                />
              </div>

              <Button onClick={handleAdd} className="w-full" disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Salvar Checklist
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por placa ou motorista..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Placa</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Motorista</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Rastreador</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Nº OCC</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Responsável</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Data</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Observações</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                    Carregando...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-muted-foreground">
                    {search ? "Nenhum registro encontrado" : "Nenhum checklist cadastrado"}
                  </td>
                </tr>
              ) : (
                filtered.map((record, i) => {
                  const score = getChecklistScore(record.checklist_data);
                  const allGood = score.checked === score.total;
                  return (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium">{record.placa || "-"}</td>
                      <td className="py-3 px-4">{record.nome || "-"}</td>
                      <td className="py-3 px-4">{record.tipo_rastreador || "-"}</td>
                      <td className="py-3 px-4">{record.numero_occ || "-"}</td>
                      <td className="py-3 px-4">{record.responsavel}</td>
                      <td className="py-3 px-4">{record.data}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={allGood ? "default" : "destructive"}
                          className="gap-1"
                        >
                          {allGood ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {score.checked}/{score.total}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 max-w-[200px] truncate">{record.observacoes || "-"}</td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(record.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
