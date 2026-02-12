import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Upload, Mail, AlertCircle, Trash2 } from "lucide-react";
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
import type { ModuleConfig, ModuleRecord } from "@/types/modules";

interface ModulePageProps {
  config: ModuleConfig;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export default function ModulePage({ config }: ModulePageProps) {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<ModuleRecord[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    placa: "",
    nome: "",
    responsavel: "",
    observacoes: "",
    status: "Ativo",
    emailConfirmed: false,
  });

  const filtered = records.filter((r) => {
    const val = config.searchField === "placa" ? r.placa : r.nome;
    return (val || "").toLowerCase().includes(search.toLowerCase());
  });

  const handleAdd = () => {
    const newRecord: ModuleRecord = {
      id: generateId(),
      placa: form.placa || undefined,
      nome: form.nome || undefined,
      data: new Date().toLocaleDateString("pt-BR"),
      responsavel: form.responsavel,
      observacoes: form.observacoes,
      status: form.status,
    };
    setRecords((prev) => [newRecord, ...prev]);
    setForm({ placa: "", nome: "", responsavel: "", observacoes: "", status: "Ativo", emailConfirmed: false });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
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
          <h1 className="text-2xl font-bold text-foreground">{config.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {records.length} registro{records.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Registro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Registro - {config.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              {config.searchField === "placa" && (
                <div className="space-y-2">
                  <Label>Placa</Label>
                  <Input
                    placeholder="ABC-1234"
                    value={form.placa}
                    onChange={(e) => setForm((p) => ({ ...p, placa: e.target.value.toUpperCase() }))}
                  />
                </div>
              )}
              {config.searchField === "nome" && (
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    placeholder="Nome completo"
                    value={form.nome}
                    onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label>Responsável</Label>
                <Input
                  placeholder="Nome do responsável"
                  value={form.responsavel}
                  onChange={(e) => setForm((p) => ({ ...p, responsavel: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea
                  placeholder="Detalhes adicionais..."
                  value={form.observacoes}
                  onChange={(e) => setForm((p) => ({ ...p, observacoes: e.target.value }))}
                />
              </div>
              {config.hasFileUpload && (
                <div className="space-y-2">
                  <Label>Anexar Documento</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-accent transition-colors">
                    <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Clique para anexar arquivo</p>
                  </div>
                </div>
              )}
              {config.hasEmailConfirm && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="email"
                    checked={form.emailConfirmed}
                    onCheckedChange={(checked) =>
                      setForm((p) => ({ ...p, emailConfirmed: checked as boolean }))
                    }
                  />
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm cursor-pointer">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Confirmar envio de e-mail para o time
                  </Label>
                </div>
              )}
              <Button onClick={handleAdd} className="w-full">
                Salvar Registro
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={config.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Alert badges */}
      {config.hasAlerts && records.some((r) => r.status === "Vencido") && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive font-medium">
            Existem itens com vencimento expirado!
          </span>
        </div>
      )}

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {config.columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left py-3 px-4 font-semibold text-muted-foreground uppercase text-xs tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={config.columns.length + 1} className="text-center py-12 text-muted-foreground">
                    {search ? "Nenhum registro encontrado" : "Nenhum registro cadastrado"}
                  </td>
                </tr>
              ) : (
                filtered.map((record, i) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    {config.columns.map((col) => (
                      <td key={col.key} className="py-3 px-4">
                        {col.key === "status" ? (
                          <Badge
                            variant={
                              (record as any)[col.key] === "Vencido"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {(record as any)[col.key] || "-"}
                          </Badge>
                        ) : (
                          (record as any)[col.key] || "-"
                        )}
                      </td>
                    ))}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
