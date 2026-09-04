import React from 'react';
import {
  FileText,
  Calendar,
  CheckCircle2,
  Users2,
  Calculator,
  Compass,
  Building2,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface HeaderProps {
  currentView: 'proceso' | 'cronograma' | 'aprobaciones' | 'actores' | 'subsidio' | 'resumen';
  onSelectView: (view: 'proceso' | 'cronograma' | 'aprobaciones' | 'actores' | 'subsidio' | 'resumen') => void;
  onOpenSummaryModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
}) => {
  const navItems = [
    { id: 'proceso', label: 'Ruta de Proceso', icon: Compass, badge: '6 etapas' },
    { id: 'cronograma', label: 'Cronograma Operativo', icon: Calendar, badge: 'ANS & Fechas' },
    { id: 'aprobaciones', label: 'Vo. Bo. y Avales', icon: CheckCircle2, badge: 'Flujo 60 días' },
    { id: 'actores', label: 'Mapa de Actores', icon: Users2, badge: '8 roles' },
    { id: 'subsidio', label: 'Regla del Subsidio', icon: Calculator, badge: '$58.363 COP' },
    { id: 'resumen', label: 'Resumen Ejecutivo', icon: FileText, badge: 'Condiciones' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro-bar with alliance context */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 font-medium flex items-center justify-between border-b border-slate-800">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              Alianza Estratégica Colsanitas &amp; Colsubsidio
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">
              Programa Salud Activa &bull; Vigencia 2026
            </span>
          </div>
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              Colectivos Seleccionados
            </span>
            <span className="hidden md:inline text-emerald-400 font-medium">
              Subsidio Cat. A y B: $58.363 COP
            </span>
          </div>
        </div>
      </div>

      {/* Main Header navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand title */}
          <div
            onClick={() => onSelectView('proceso')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform duration-200">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                  Alianza Colsubsidio
                </span>
                <span className="text-slate-300 font-light">&ndash;</span>
                <span className="font-semibold text-teal-700 text-base sm:text-lg">
                  Salud Activa
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Modelo Operativo del Subsidio para Colectivos
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold tracking-normal transition-all duration-150 flex items-center gap-2 ${
                    isActive
                      ? 'text-blue-900 bg-blue-50/80 shadow-xs font-bold border border-blue-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-blue-700' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        isActive
                          ? 'bg-blue-200/80 text-blue-900 font-bold'
                          : 'bg-slate-200/70 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button: Resumen Ejecutivo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectView('resumen')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-xs ${
                currentView === 'resumen'
                  ? 'bg-blue-900 text-white shadow-blue-900/20 ring-2 ring-blue-600/30'
                  : 'bg-gradient-to-r from-blue-900 to-teal-800 text-white hover:from-blue-800 hover:to-teal-700 shadow-md shadow-blue-950/15'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-300" />
              <span>Ver resumen ejecutivo</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Navigation Scroll */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-100 -mx-4 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
                  isActive
                    ? 'bg-blue-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
