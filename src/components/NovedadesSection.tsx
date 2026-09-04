import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  RotateCcw,
  UserPlus,
  UserMinus,
  AlertCircle,
  FileSpreadsheet,
  Receipt,
  Calendar,
} from 'lucide-react';

export const NovedadesSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Módulo Periódico
              </span>
              <span className="text-xs text-slate-500 font-medium">Corte Mensual</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mt-0.5">
              Gestión de Novedades (Retiros e Inclusiones)
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="hidden sm:inline">
            {isOpen ? 'Ocultar detalle' : 'Mostrar detalle'}
          </span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between text-xs bg-blue-50 border border-blue-200 rounded-xl p-3 text-blue-900">
            <span className="flex items-center gap-2 font-bold">
              <Calendar className="w-4 h-4 text-blue-700" />
              Fecha Límite Operativa:
            </span>
            <span className="font-extrabold bg-white px-2.5 py-1 rounded border border-blue-200 text-blue-950">
              15° día hábil de cada mes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Inclusiones */}
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-1.5">
                <UserPlus className="w-4 h-4 text-emerald-700" />
                Inclusiones
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nuevos trabajadores vinculados o beneficiarios postulados antes del corte. Requieren radicación con soporte de validador Colsubsidio ($58.363 COP).
              </p>
            </div>

            {/* Retiros */}
            <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm mb-1.5">
                <UserMinus className="w-4 h-4 text-rose-700" />
                Retiros
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Desvinculaciones laborales o exclusiones voluntarias del colectivo. Se desafilian del beneficio y se descuentan de la pre-cuenta del periodo.
              </p>
            </div>
          </div>

          {/* Golden Rules for Novedades */}
          <div className="bg-slate-900 text-white rounded-xl p-4 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
              Reglas de Facturación aplicables a Novedades:
            </span>
            <div className="flex items-start gap-2.5 text-xs text-slate-200">
              <span className="w-5 h-5 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                1
              </span>
              <p>
                <strong className="text-white font-bold">
                  &ldquo;Se realizará la facturación del 100% al cliente.&rdquo;
                </strong>{' '}
                El valor total de la cuota se factura íntegramente a la empresa empleadora.
              </p>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-200">
              <span className="w-5 h-5 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                2
              </span>
              <p>
                <strong className="text-white font-bold">
                  &ldquo;La factura se realiza con descuento condicionado informando el valor a pagar por el cliente.&rdquo;
                </strong>{' '}
                Se especifica el subsidio aplicado para reflejar con transparencia la deducción neta.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
