import { motion } from "framer-motion";
import {
  Truck, Users, AlertTriangle, Gauge, Shield, Clock,
  Wrench, FileText
} from "lucide-react";

const stats = [
  { label: "Conjuntos Ativos", value: "0", icon: Truck, color: "text-accent" },
  { label: "Motoristas", value: "0", icon: Users, color: "text-info" },
  { label: "Alertas Pendentes", value: "0", icon: AlertTriangle, color: "text-destructive" },
  { label: "KM Registrados", value: "0", icon: Gauge, color: "text-success" },
  { label: "Seguros Ativos", value: "0", icon: Shield, color: "text-accent" },
  { label: "Tacógrafos Válidos", value: "0", icon: Clock, color: "text-info" },
  { label: "Manutenções Pendentes", value: "0", icon: Wrench, color: "text-warning" },
  { label: "Fichas Enviadas", value: "0", icon: FileText, color: "text-success" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral da operação</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={item}
              className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Atividade Recente</h2>
        <div className="text-sm text-muted-foreground text-center py-8">
          Nenhuma atividade registrada ainda. Comece cadastrando conjuntos e motoristas.
        </div>
      </div>
    </div>
  );
}
