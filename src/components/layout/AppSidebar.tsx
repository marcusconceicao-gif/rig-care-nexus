import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck, FileText, Users, Radio, Gauge, Clock, Shield,
  AlertTriangle, Ban, FileWarning, PlayCircle, Zap,
  ListOrdered, Wrench, Droplets, Satellite, ShieldCheck,
  ChevronDown, LayoutDashboard, Menu, X, ClipboardCheck
} from "lucide-react";

const menuGroups = [
  {
    label: "Principal",
    items: [
      { path: "/", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Conjuntos",
    items: [
      { path: "/conjuntos", label: "Conjuntos", icon: Truck },
      { path: "/alteracoes", label: "Alterações", icon: FileText },
    ],
  },
  {
    label: "Fichas",
    items: [
      { path: "/fichas/envio", label: "Envio", icon: FileText },
      { path: "/fichas/retornos", label: "Retornos", icon: FileText },
    ],
  },
  {
    label: "Gestão",
    items: [
      { path: "/motoristas", label: "Motoristas", icon: Users },
      { path: "/motoristas-bloqueados", label: "Mot. Bloqueados", icon: Ban },
      { path: "/advertencias", label: "Advertências", icon: FileWarning },
      { path: "/fila-agregamento", label: "Fila Agregamento", icon: ListOrdered },
    ],
  },
  {
    label: "Rastreador",
    items: [
      { path: "/autotrac/instalacao", label: "Instalação", icon: Radio },
      { path: "/autotrac/manutencao", label: "Manutenção", icon: Wrench },
      { path: "/checklist-rastreamento", label: "Checklist", icon: ClipboardCheck },
    ],
  },
  {
    label: "Controles",
    items: [
      
      { path: "/tacografo", label: "Tacógrafo", icon: Clock },
      { path: "/seguro", label: "Seguro", icon: Shield },
      { path: "/inicio-fim-operacao", label: "Início/Fim Op.", icon: PlayCircle },
      { path: "/pico-velocidade", label: "Pico Velocidade", icon: Zap },
    ],
  },
  {
    label: "Ocorrências",
    items: [
      { path: "/quebras-acidentes", label: "Quebras/Acidentes", icon: AlertTriangle },
    ],
  },
  {
    label: "Carretas",
    items: [
      { path: "/manutencao-carretas", label: "Manutenção", icon: Wrench },
      { path: "/lavagem-carretas", label: "Lavagem", icon: Droplets },
      { path: "/carretas-webtrac", label: "Webtrac", icon: Satellite },
      { path: "/carretas-seguros", label: "Seguros", icon: ShieldCheck },
    ],
  },
];

export default function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (label: string) =>
    setCollapsed((p) => ({ ...p, [label]: !p[label] }));

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <Truck className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold text-sidebar-accent-foreground tracking-wide truncate">
            GestFrota
          </h1>
          <p className="text-[10px] text-sidebar-foreground opacity-60 uppercase tracking-widest">
            Gestão de Frotas
          </p>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden text-sidebar-foreground hover:text-sidebar-accent-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-3 space-y-1">
        {menuGroups.map((group) => (
          <div key={group.label}>
            {group.label !== "Principal" ? (
              <button
                onClick={() => toggle(group.label)}
                className="flex items-center justify-between w-full px-2 py-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground opacity-50 hover:opacity-80 transition-opacity"
              >
                {group.label}
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    collapsed[group.label] ? "-rotate-90" : ""
                  }`}
                />
              </button>
            ) : null}

            <AnimatePresence initial={false}>
              {!collapsed[group.label] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-sidebar-primary" : ""}`} />
                        <span className="truncate">{item.label}</span>
                      </NavLink>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-primary-foreground p-2 rounded-lg shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-[260px] bg-sidebar z-50 lg:hidden shadow-2xl"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[260px] bg-sidebar border-r border-sidebar-border flex-col flex-shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>
    </>
  );
}
