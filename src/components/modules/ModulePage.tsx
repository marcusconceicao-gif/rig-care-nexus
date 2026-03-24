import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Upload, Mail, AlertCircle, Trash2, Loader2, CalendarIcon, ExternalLink, AlertTriangle, Camera, Eye, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format, parse, differenceInDays, isValid } from "date-fns";
import { cn } from "@/lib/utils";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { ModuleConfig, ModuleRecord } from "@/types/modules";

interface ModulePageProps {
  config: ModuleConfig;
}

export default function ModulePage({ config }: ModulePageProps) {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<ModuleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, string[]>>({});
  const [viewRecord, setViewRecord] = useState<ModuleRecord | null>(null);
  const { toast } = useToast();
  const [form, setForm] = useState<Record<string, any>>({
    placa: "",
    nome: "",
    responsavel: "",
    observacoes: "",
    status: "Ativo",
    emailConfirmed: false,
  });

  // Fetch records on mount
  useEffect(() => {
    fetchRecords();
  }, [config.module]);

  // Fetch dynamic select options
  useEffect(() => {
    const dynamicFields = config.extraFields?.filter((f) => f.type === "dynamic_select" && f.dynamicSourceModule && f.dynamicSourceField);
    if (!dynamicFields?.length) return;

    const fetchDynamic = async () => {
      for (const field of dynamicFields) {
        const { data } = await supabase
          .from("module_records")
          .select(field.dynamicSourceField!)
          .eq("module", field.dynamicSourceModule!)
          .not(field.dynamicSourceField!, "is", null)
          .order(field.dynamicSourceField!, { ascending: true });

        if (data) {
          const unique = [...new Set(data.map((r: any) => r[field.dynamicSourceField!]).filter(Boolean))] as string[];
          setDynamicOptions((prev) => ({ ...prev, [field.key]: unique }));
        }
      }
    };
    fetchDynamic();
  }, [config.extraFields]);

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("module_records")
      .select("*")
      .eq("module", config.module)
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Erro ao carregar registros", description: error.message, variant: "destructive" });
    } else {
      setRecords(data || []);
    }
    setLoading(false);
  };

  const filtered = records.filter((r) => {
    const val = config.searchField === "placa" ? r.placa : r.nome;
    return (val || "").toLowerCase().includes(search.toLowerCase());
  });

  const handleAdd = async () => {
    setSaving(true);

    let arquivo_url: string | undefined;

    // Upload file if selected
    if (selectedFile && config.hasFileUpload) {
      const fileExt = selectedFile.name.split(".").pop();
      const filePath = `${config.module}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("module-files")
        .upload(filePath, selectedFile);

      if (uploadError) {
        toast({ title: "Erro no upload", description: uploadError.message, variant: "destructive" });
        setSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage.from("module-files").getPublicUrl(filePath);
      arquivo_url = urlData.publicUrl;
    }

    // Upload photo if selected
    let foto_url: string | undefined;
    if (selectedPhoto) {
      const fileExt = selectedPhoto.name.split(".").pop();
      const filePath = `${config.module}/fotos/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("module-files")
        .upload(filePath, selectedPhoto);

      if (uploadError) {
        toast({ title: "Erro no upload da foto", description: uploadError.message, variant: "destructive" });
        setSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage.from("module-files").getPublicUrl(filePath);
      foto_url = urlData.publicUrl;
    }

    const extraData: Record<string, any> = {};
    if (config.extraFields) {
      for (const field of config.extraFields) {
        if (field.type === "photo") continue;
        extraData[field.key] = form[field.key] || null;
      }
    }

    const newRecord = {
      module: config.module,
      placa: form.placa || null,
      nome: form.nome || null,
      data: form.data_instalacao || form.data_custom || new Date().toLocaleDateString("pt-BR"),
      responsavel: form.responsavel,
      observacoes: form.observacoes,
      status: form.status,
      arquivo_url: arquivo_url || null,
      email_confirmado: form.emailConfirmed,
      foto_url: foto_url || null,
      ...extraData,
    };

    const { error } = await supabase.from("module_records").insert([newRecord]);

    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Registro salvo com sucesso!" });

      // Auto-fill next month's km_inicial with current km_final
      if (form.km_final && form.mes_ano) {
        const [mes, ano] = form.mes_ano.split("/");
        if (mes && ano) {
          let nextMes = parseInt(mes) + 1;
          let nextAno = parseInt(ano);
          if (nextMes > 12) { nextMes = 1; nextAno++; }
          const nextMesAno = `${String(nextMes).padStart(2, "0")}/${nextAno}`;

          // Check if next month record exists for same placa
          const { data: existing } = await supabase
            .from("module_records")
            .select("id")
            .eq("module", config.module)
            .eq("placa", form.placa || "")
            .eq("mes_ano", nextMesAno)
            .maybeSingle();

          if (existing) {
            await supabase
              .from("module_records")
              .update({ km_inicial: form.km_final } as any)
              .eq("id", existing.id);
          } else {
            await supabase.from("module_records").insert([{
              module: config.module,
              placa: form.placa || null,
              data: new Date().toLocaleDateString("pt-BR"),
              responsavel: form.responsavel,
              km_inicial: form.km_final,
              mes_ano: nextMesAno,
            }] as any);
          }
          toast({ title: `KM Inicial de ${nextMesAno} preenchido automaticamente!` });
        }
      }

      setForm({ placa: "", nome: "", responsavel: "", observacoes: "", status: "Ativo", emailConfirmed: false });
      setSelectedFile(null);
      setSelectedPhoto(null);
      setPhotoPreview(null);
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
              {config.extraFields?.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label>{field.label}</Label>
                  {field.type === "select" && field.options ? (
                    <Select
                      value={form[field.key] || ""}
                      onValueChange={(val) => setForm((p) => ({ ...p, [field.key]: val }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Selecione ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "date" ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form[field.key] && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form[field.key]
                            ? format(new Date(form[field.key]), "dd/MM/yyyy")
                            : <span>{field.placeholder || "Selecione a data"}</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={form[field.key] ? new Date(form[field.key]) : undefined}
                          onSelect={(date) =>
                            setForm((p) => ({
                              ...p,
                              [field.key]: date ? format(date, "dd/MM/yyyy") : "",
                            }))
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  ) : field.type === "month_year" ? (
                    <div className="flex gap-2">
                      <Select
                        value={form[field.key + "_mes"] || ""}
                        onValueChange={(val) => setForm((p) => ({ ...p, [field.key + "_mes"]: val, [field.key]: `${val}/${p[field.key + "_ano"] || ""}` }))}
                      >
                        <SelectTrigger className="w-1/2">
                          <SelectValue placeholder="Mês" />
                        </SelectTrigger>
                        <SelectContent>
                          {["01","02","03","04","05","06","07","08","09","10","11","12"].map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={form[field.key + "_ano"] || ""}
                        onValueChange={(val) => setForm((p) => ({ ...p, [field.key + "_ano"]: val, [field.key]: `${p[field.key + "_mes"] || ""}/${val}` }))}
                      >
                        <SelectTrigger className="w-1/2">
                          <SelectValue placeholder="Ano" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() - 2 + i)).map((y) => (
                            <SelectItem key={y} value={y}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : field.type === "readonly_date" ? (
                    <Input
                      value={new Date().toLocaleDateString("pt-BR")}
                      disabled
                      className="bg-muted"
                    />
                  ) : field.type === "dynamic_select" ? (
                    <Select
                      value={form[field.key] || ""}
                      onValueChange={(val) => setForm((p) => ({ ...p, [field.key]: val }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder || `Selecione ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {(dynamicOptions[field.key] || []).length === 0 ? (
                          <SelectItem value="__empty" disabled>
                            Nenhum registro encontrado
                          </SelectItem>
                        ) : (
                          (dynamicOptions[field.key] || []).map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  ) : field.type === "photo" ? (
                    <div className="space-y-2">
                      <label className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors block">
                        {photoPreview ? (
                          <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover mx-auto mb-2" />
                        ) : (
                          <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        )}
                        <p className="text-sm text-muted-foreground">
                          {selectedPhoto ? selectedPhoto.name : "Clique para adicionar foto"}
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setSelectedPhoto(file);
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setPhotoPreview(reader.result as string);
                              reader.readAsDataURL(file);
                            } else {
                              setPhotoPreview(null);
                            }
                          }}
                        />
                      </label>
                    </div>
                  ) : (
                    <Input
                      placeholder={field.placeholder || ""}
                      value={form[field.key] || ""}
                      onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
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
                  <label className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-accent transition-colors block">
                    <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {selectedFile ? selectedFile.name : "Clique para anexar arquivo"}
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                  </label>
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
              <Button onClick={handleAdd} className="w-full" disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
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

      {/* External links */}
      {config.externalLinks && config.externalLinks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {config.externalLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline bg-primary/10 px-3 py-1.5 rounded-md"
            >
              <ExternalLink className="w-4 h-4" />
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Expiry alerts (15 days) */}
      {config.expiryField && config.alertDaysBeforeExpiry && (() => {
        const today = new Date();
        const expiringRecords = records.filter((r) => {
          const dateStr = (r as any)[config.expiryField!];
          if (!dateStr) return false;
          const parsed = parse(dateStr, "dd/MM/yyyy", new Date());
          if (!isValid(parsed)) return false;
          const diff = differenceInDays(parsed, today);
          return diff >= 0 && diff <= config.alertDaysBeforeExpiry!;
        });
        const expiredRecords = records.filter((r) => {
          const dateStr = (r as any)[config.expiryField!];
          if (!dateStr) return false;
          const parsed = parse(dateStr, "dd/MM/yyyy", new Date());
          if (!isValid(parsed)) return false;
          return differenceInDays(parsed, today) < 0;
        });
        return (
          <>
            {expiredRecords.length > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm text-destructive font-medium">
                  {expiredRecords.length} certificado(s) com vencimento expirado!
                </span>
              </div>
            )}
            {expiringRecords.length > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-700 font-medium">
                  {expiringRecords.length} certificado(s) vencendo nos próximos {config.alertDaysBeforeExpiry} dias!
                </span>
              </div>
            )}
          </>
        );
      })()}

      {/* Alert badges (legacy) */}
      {config.hasAlerts && !config.expiryField && records.some((r) => r.status === "Vencido") && (
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
              {loading ? (
                <tr>
                  <td colSpan={config.columns.length + 1} className="text-center py-12 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                    Carregando...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
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
                        {col.key === "foto_url" && (record as any)[col.key] ? (
                          <img
                            src={(record as any)[col.key]}
                            alt="Foto"
                            className="w-10 h-10 rounded-full object-cover border border-border"
                          />
                        ) : col.key === "foto_url" ? (
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <Camera className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ) : col.key === "status" ? (
                          <Badge
                            variant={
                              (record as any)[col.key] === "Vencido"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {(record as any)[col.key] || "-"}
                          </Badge>
                        ) : col.key === "arquivo_url" && (record as any)[col.key] ? (
                          <a
                            href={(record as any)[col.key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                          >
                            Ver arquivo
                          </a>
                        ) : (
                          (record as any)[col.key] || "-"
                        )}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-right flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewRecord(record)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
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
      {/* View Record Dialog */}
      <Dialog open={!!viewRecord} onOpenChange={(open) => !open && setViewRecord(null)}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Registro</DialogTitle>
          </DialogHeader>
          {viewRecord && (
            <div className="space-y-4 pt-2">
              {(viewRecord as any).foto_url && (
                <div className="flex justify-center">
                  <img
                    src={(viewRecord as any).foto_url}
                    alt="Foto"
                    className="w-24 h-24 rounded-full object-cover border-2 border-border"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {config.columns.map((col) => {
                  const value = (viewRecord as any)[col.key];
                  if (col.key === "foto_url") return null;
                  return (
                    <div key={col.key} className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{col.label}</p>
                      {col.key === "arquivo_url" && value ? (
                        <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline">
                          Ver arquivo
                        </a>
                      ) : col.key === "status" ? (
                        <Badge variant={(value === "Vencido") ? "destructive" : "secondary"}>
                          {value || "-"}
                        </Badge>
                      ) : (
                        <p className="text-sm text-foreground">{value || "-"}</p>
                      )}
                    </div>
                  );
                })}
                {/* Show extra fields not in columns */}
                {config.extraFields?.filter(f => !config.columns.find(c => c.key === f.key) && f.type !== "photo" && f.type !== "readonly_date").map((field) => {
                  const value = (viewRecord as any)[field.key];
                  if (!value) return null;
                  return (
                    <div key={field.key} className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{field.label}</p>
                      <p className="text-sm text-foreground">{value}</p>
                    </div>
                  );
                })}
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Observações</p>
                  <p className="text-sm text-foreground">{viewRecord.observacoes || "-"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Criado em</p>
                  <p className="text-sm text-foreground">
                    {viewRecord.created_at ? new Date(viewRecord.created_at).toLocaleString("pt-BR") : "-"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
