import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { ActorId } from '../types';

export type FilterCategory = 'all' | 'comercial' | 'afiliaciones' | 'colsanitas' | 'colsubsidio' | 'cliente' | 'facturacion_mp' | 'conciliacion';

interface FilterBarProps {
  currentFilter: FilterCategory;
  onSelectFilter: (filter: FilterCategory) => void;
  onResetFilter: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onSelectFilter,
  onResetFilter,
}) => {
  const filterOptions: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'Todo el Proceso' },
    { id: 'comercial', label: 'Comercial' },
    { id: 'afiliaciones', label: 'Afiliaciones' },
    { id: 'colsanitas', label: 'Colsanitas' },
    { id: 'colsubsidio', label: 'Colsubsidio' },
    { id: 'cliente', label: 'Cliente / Empresa' },
    { id: 'facturacion_mp', label: 'Facturación' },
    { id: 'conciliacion', label: 'Conciliación' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 px-1">
          <Filter className="w-3.5 h-3.5 text-blue-700" />
          <span>Filtrar por Área / Responsable:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          {filterOptions.map((opt) => {
            const isActive = currentFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectFilter(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-xs font-bold ring-2 ring-blue-600/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            );
          })}

          {currentFilter !== 'all' && (
            <button
              type="button"
              onClick={onResetFilter}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Ver proceso completo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
