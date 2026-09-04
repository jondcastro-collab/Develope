import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HeroOverview } from './components/HeroOverview';
import { TimelineBar } from './components/TimelineBar';
import { FilterBar, FilterCategory } from './components/FilterBar';
import { StageDetailPanel } from './components/StageDetailPanel';
import { OperationalScheduleView } from './components/OperationalScheduleView';
import { ApprovalsChainView } from './components/ApprovalsChainView';
import { ActorsMapView } from './components/ActorsMapView';
import { SubsidyCalculatorModule } from './components/SubsidyCalculatorModule';
import { ExecutiveSummaryView } from './components/ExecutiveSummaryView';
import { PROCESS_STEPS, ACTORS_DATA } from './data/processData';
import { ActorId } from './types';
import {
  FileText,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowUp,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'proceso' | 'cronograma' | 'aprobaciones' | 'actores' | 'subsidio' | 'resumen'
  >('proceso');
  const [selectedStepId, setSelectedStepId] = useState<string>('preafiliacion');
  const [currentFilter, setCurrentFilter] = useState<FilterCategory>('all');

  const timelineSectionRef = useRef<HTMLDivElement>(null);

  // Filter steps according to selected category
  const filteredStepIds = React.useMemo(() => {
    if (currentFilter === 'all') return [];

    return PROCESS_STEPS.filter((step) => {
      if (currentFilter === 'comercial') {
        return step.responsibleActor === 'comercial' || step.actorsInvolved.includes('comercial');
      }
      if (currentFilter === 'afiliaciones') {
        return step.responsibleActor === 'afiliaciones' || step.actorsInvolved.includes('afiliaciones');
      }
      if (currentFilter === 'colsanitas') {
        return step.actorsInvolved.includes('colsanitas');
      }
      if (currentFilter === 'colsubsidio') {
        return step.actorsInvolved.includes('colsubsidio');
      }
      if (currentFilter === 'cliente') {
        return step.actorsInvolved.includes('cliente') || step.actorsInvolved.includes('trabajador');
      }
      if (currentFilter === 'facturacion_mp') {
        return step.responsibleActor === 'facturacion_mp' || step.actorsInvolved.includes('facturacion_mp');
      }
      if (currentFilter === 'conciliacion') {
        return step.id === 'conciliacion' || step.id === 'cierre_recaudo';
      }
      return true;
    }).map((s) => s.id);
  }, [currentFilter]);

  const currentStep =
    PROCESS_STEPS.find((s) => s.id === selectedStepId) || PROCESS_STEPS[0];

  const handleExploreClick = () => {
    setCurrentView('proceso');
    setTimeout(() => {
      timelineSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleOpenCalculator = () => {
    setCurrentView('subsidio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateNextStep = () => {
    const currentIndex = PROCESS_STEPS.findIndex((s) => s.id === selectedStepId);
    if (currentIndex < PROCESS_STEPS.length - 1) {
      setSelectedStepId(PROCESS_STEPS[currentIndex + 1].id);
      timelineSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToStepWithFilter = (actorId: ActorId) => {
    // Map actor to filter if applicable
    if (actorId === 'comercial') setCurrentFilter('comercial');
    else if (actorId === 'afiliaciones') setCurrentFilter('afiliaciones');
    else if (actorId === 'colsubsidio') setCurrentFilter('colsubsidio');
    else if (actorId === 'colsanitas') setCurrentFilter('colsanitas');
    else if (actorId === 'facturacion_mp') setCurrentFilter('facturacion_mp');
    else if (actorId === 'cliente' || actorId === 'trabajador') setCurrentFilter('cliente');
    else setCurrentFilter('all');

    setCurrentView('proceso');
    // Select first step where this actor participates
    const step = PROCESS_STEPS.find((s) => s.actorsInvolved.includes(actorId));
    if (step) {
      setSelectedStepId(step.id);
    }
    setTimeout(() => {
      timelineSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-teal-500 selection:text-white">
      {/* Primary Sticky Header */}
      <Header
        currentView={currentView}
        onSelectView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Hero Overview Banner with Indicators */}
      <HeroOverview
        onExploreClick={handleExploreClick}
        onOpenCalculator={handleOpenCalculator}
      />

      {/* Main Interactive Stage Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <AnimatePresence mode="wait">
          {/* VIEW 1: RUTA DE PROCESO (INTERACTIVE TIMELINE JOURNEY) */}
          {currentView === 'proceso' && (
            <motion.div
              key="view-proceso"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              ref={timelineSectionRef}
              className="space-y-6"
            >
              {/* Filter Bar */}
              <FilterBar
                currentFilter={currentFilter}
                onSelectFilter={(filter) => {
                  setCurrentFilter(filter);
                  // If current selected step is not in the filtered list, pick the first one
                  const matches = PROCESS_STEPS.filter((s) => {
                    if (filter === 'all') return true;
                    if (filter === 'comercial') return s.responsibleActor === 'comercial' || s.actorsInvolved.includes('comercial');
                    if (filter === 'afiliaciones') return s.responsibleActor === 'afiliaciones' || s.actorsInvolved.includes('afiliaciones');
                    if (filter === 'colsanitas') return s.actorsInvolved.includes('colsanitas');
                    if (filter === 'colsubsidio') return s.actorsInvolved.includes('colsubsidio');
                    if (filter === 'cliente') return s.actorsInvolved.includes('cliente') || s.actorsInvolved.includes('trabajador');
                    if (filter === 'facturacion_mp') return s.responsibleActor === 'facturacion_mp' || s.actorsInvolved.includes('facturacion_mp');
                    if (filter === 'conciliacion') return s.id === 'conciliacion' || s.id === 'cierre_recaudo';
                    return true;
                  });
                  if (matches.length > 0 && !matches.some((m) => m.id === selectedStepId)) {
                    setSelectedStepId(matches[0].id);
                  }
                }}
                onResetFilter={() => setCurrentFilter('all')}
              />

              {/* Central Horizontal Timeline */}
              <TimelineBar
                steps={PROCESS_STEPS}
                selectedStepId={selectedStepId}
                onSelectStep={(id) => setSelectedStepId(id)}
                filteredStepIds={filteredStepIds}
              />

              {/* Detailed Stage Panel */}
              <StageDetailPanel
                step={currentStep}
                onNavigateNext={
                  PROCESS_STEPS.findIndex((s) => s.id === selectedStepId) < PROCESS_STEPS.length - 1
                    ? handleNavigateNextStep
                    : undefined
                }
              />
            </motion.div>
          )}

          {/* VIEW 2: CRONOGRAMA OPERATIVO */}
          {currentView === 'cronograma' && (
            <motion.div
              key="view-cronograma"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <OperationalScheduleView />
            </motion.div>
          )}

          {/* VIEW 3: CADENA VO. BO. & AVALES A 60 DÍAS */}
          {currentView === 'aprobaciones' && (
            <motion.div
              key="view-aprobaciones"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ApprovalsChainView />
            </motion.div>
          )}

          {/* VIEW 4: MAPA DE ACTORES */}
          {currentView === 'actores' && (
            <motion.div
              key="view-actores"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ActorsMapView
                onNavigateToStepWithFilter={handleNavigateToStepWithFilter}
              />
            </motion.div>
          )}

          {/* VIEW 5: REGLA Y SIMULADOR DEL SUBSIDIO */}
          {currentView === 'subsidio' && (
            <motion.div
              key="view-subsidio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <SubsidyCalculatorModule />
            </motion.div>
          )}

          {/* VIEW 6: RESUMEN EJECUTIVO */}
          {currentView === 'resumen' && (
            <motion.div
              key="view-resumen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ExecutiveSummaryView
                onBackToProcess={() => {
                  setCurrentView('proceso');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Corporate Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Alianza Colsubsidio &ndash; Salud Activa</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Modelo Operativo Oficial para Colectivos Seleccionados &bull; Vigencia 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs">
            <button
              onClick={() => {
                setCurrentView('resumen');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Condiciones del Subsidio
            </button>
            <span>&bull;</span>
            <button
              onClick={() => {
                setCurrentView('cronograma');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cronograma Operativo
            </button>
            <span>&bull;</span>
            <button
              onClick={() => {
                setCurrentView('aprobaciones');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Vo. Bo. y Avales 60 Días
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-medium">
            Colsanitas Medicina Prepagada &bull; Keralty &bull; Colsubsidio
          </div>
        </div>
      </footer>
    </div>
  );
}
