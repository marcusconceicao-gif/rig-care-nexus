import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import AuthGuard from "@/components/auth/AuthGuard";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "./pages/NotFound";
import ConjuntosPage from "@/pages/modules/ConjuntosPage";
import AlteracoesPage from "@/pages/modules/AlteracoesPage";
import FichasEnvioPage from "@/pages/modules/FichasEnvioPage";
import FichasRetornosPage from "@/pages/modules/FichasRetornosPage";
import MotoristasPage from "@/pages/modules/MotoristasPage";
import MotoristasBloqueadosPage from "@/pages/modules/MotoristasBloqueadosPage";
import AdvertenciasPage from "@/pages/modules/AdvertenciasPage";
import FilaAgregamentoPage from "@/pages/modules/FilaAgregamentoPage";
import AutotracInstalacaoPage from "@/pages/modules/AutotracInstalacaoPage";
import AutotracManutencaoPage from "@/pages/modules/AutotracManutencaoPage";

import TacografoPage from "@/pages/modules/TacografoPage";
import SeguroPage from "@/pages/modules/SeguroPage";
import QuebrasAcidentesPage from "@/pages/modules/QuebrasAcidentesPage";

import PicoVelocidadePage from "@/pages/modules/PicoVelocidadePage";
import ManutencaoCarretasPage from "@/pages/modules/ManutencaoCarretasPage";
import LavagemCarretasPage from "@/pages/modules/LavagemCarretasPage";
import CarretasWebtracPage from "@/pages/modules/CarretasWebtracPage";
import CarretasSegurosPage from "@/pages/modules/CarretasSegurosPage";
import ChecklistRastreamentoPage from "@/pages/modules/ChecklistRastreamentoPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/conjuntos" element={<ConjuntosPage />} />
            <Route path="/alteracoes" element={<AlteracoesPage />} />
            <Route path="/fichas/envio" element={<FichasEnvioPage />} />
            <Route path="/fichas/retornos" element={<FichasRetornosPage />} />
            <Route path="/motoristas" element={<MotoristasPage />} />
            <Route path="/motoristas-bloqueados" element={<MotoristasBloqueadosPage />} />
            <Route path="/advertencias" element={<AdvertenciasPage />} />
            <Route path="/fila-agregamento" element={<FilaAgregamentoPage />} />
            <Route path="/autotrac/instalacao" element={<AutotracInstalacaoPage />} />
            <Route path="/autotrac/manutencao" element={<AutotracManutencaoPage />} />
            
            <Route path="/tacografo" element={<TacografoPage />} />
            <Route path="/seguro" element={<SeguroPage />} />
            <Route path="/quebras-acidentes" element={<QuebrasAcidentesPage />} />
            
            <Route path="/pico-velocidade" element={<PicoVelocidadePage />} />
            <Route path="/manutencao-carretas" element={<ManutencaoCarretasPage />} />
            <Route path="/lavagem-carretas" element={<LavagemCarretasPage />} />
            <Route path="/carretas-webtrac" element={<CarretasWebtracPage />} />
            <Route path="/carretas-seguros" element={<CarretasSegurosPage />} />
            <Route path="/checklist-rastreamento" element={<ChecklistRastreamentoPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
