import React from 'react';
import {
  Users,
  Target,
  BadgePercent,
  Clock,
  HeartHandshake,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Building,
} from 'lucide-react';

interface HeroOverviewProps {
  onExploreClick: () => void;
  onOpenCalculator: () => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({
  onExploreClick,
  onOpenCalculator,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Subtle architectural background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Vigencia Modelo 2026
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-500/30">
            <Layers className="w-3.5 h-3.5" />
            7 etapas (Paso 0 al 6)
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-200 border border-amber-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            Facturación a 60 días con avales
          </span>
        </div>

        {/* Titles */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Modelo Operativo
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-200 to-white">
              Alianza Colsubsidio – Salud Activa
            </span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
            Ruta operativa del subsidio para colectivos seleccionados. Navegación integral paso a paso desde la pre-afiliación y convenios hasta la conciliación, facturación, pago y cierre contable.
          </p>
        </div>

        {/* 6 Key Indicadores Cards Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Card 1: Modalidad */}
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-xl p-3.5 hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Modalidad</span>
              <Building className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-white">Colectivos</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Grupos empresariales seleccionados
            </p>
          </div>

          {/* Card 2: Público objetivo */}
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-xl p-3.5 hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Público Objetivo</span>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-emerald-300">Cat. A y B</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Afiliados activos a Colsubsidio
            </p>
          </div>

          {/* Card 3: Producto */}
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-xl p-3.5 hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Producto</span>
              <HeartHandshake className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-white">Salud Activa</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Medicina Prepagada Colsanitas
            </p>
          </div>

          {/* Card 4: Subsidio Máximo */}
          <div className="bg-gradient-to-br from-teal-900/60 to-slate-800 border border-teal-500/40 rounded-xl p-3.5 shadow-lg shadow-teal-950/30">
            <div className="flex items-center justify-between text-teal-300 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Subsidio Máximo</span>
              <BadgePercent className="w-4 h-4 text-teal-300" />
            </div>
            <div className="text-sm sm:text-base font-extrabold text-teal-200">$58.363 COP</div>
            <p className="text-[11px] text-teal-300/80 mt-1">
              Por persona / mes (1 SMDLV)
            </p>
          </div>

          {/* Card 5: Cobertura */}
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-xl p-3.5 hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Cobertura</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-white">Máx. 2 Usuarios</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Trabajador + 1 beneficiario
            </p>
          </div>

          {/* Card 6: Facturación */}
          <div className="bg-slate-800/80 backdrop-blur-sm border border-amber-500/40 rounded-xl p-3.5 hover:border-amber-400/60 transition-colors">
            <div className="flex items-center justify-between text-amber-300 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Facturación</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-amber-200">Plazo 60 días</div>
            <p className="text-[11px] text-amber-300/80 mt-1">
              Condición especial con avales
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explorar proceso</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-slate-800/90 text-slate-200 hover:bg-slate-700/90 border border-slate-700 transition-colors"
            >
              <BadgePercent className="w-4 h-4 text-teal-400" />
              <span>Simulador del Subsidio ($58.363 COP)</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>Navega interactivamente entre las 6 etapas o consulta el cronograma operativo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
