import React from 'react';
import {
  ArrowLeftRight,
  Shield,
  Building2,
  FileCheck2,
  Receipt,
  CheckCircle2,
  ArrowDown,
  Clock,
} from 'lucide-react';

export const ConciliationDiagram: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
            Conexión Interinstitucional
          </span>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
            Proceso de Conciliación Bilateral del Subsidio
          </h4>
        </div>
        <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
          <ArrowLeftRight className="w-5 h-5" />
        </div>
      </div>

      {/* Visual Diagram: COLSANITAS ↔ CONCILIACIÓN ↔ COLSUBSIDIO */}
      <div className="bg-gradient-to-r from-sky-50 via-teal-50 to-amber-50 rounded-2xl p-5 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Actor 1: Colsanitas */}
          <div className="bg-white border-2 border-sky-300 rounded-xl p-4 text-center shadow-xs">
            <div className="w-10 h-10 mx-auto rounded-xl bg-sky-600 text-white flex items-center justify-center mb-2 shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <h5 className="font-extrabold text-slate-900 text-sm">COLSANITAS</h5>
            <span className="text-[11px] font-semibold text-sky-700 block">
              Facturación MP &amp; Comercial
            </span>
            <p className="text-[11px] text-slate-500 mt-1">
              Emite pre-cuenta con censo de colectivos al corte mensual
            </p>
          </div>

          {/* Center: Conciliación Vo. Bo. */}
          <div className="bg-teal-900 text-white rounded-xl p-4 text-center shadow-md relative border border-teal-700">
            <div className="w-10 h-10 mx-auto rounded-full bg-teal-500 text-slate-950 flex items-center justify-center mb-2 shadow-sm font-bold">
              <ArrowLeftRight className="w-5 h-5 text-slate-900" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
              Eje Central
            </span>
            <h5 className="font-black text-white text-base leading-tight">
              CONCILIACIÓN
            </h5>
            <div className="text-[11px] text-teal-200 mt-0.5 font-medium">
              Visto Bueno (Vo. Bo.)
            </div>
            <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold bg-teal-800/80 px-2 py-0.5 rounded text-teal-200 border border-teal-600">
              <Clock className="w-3 h-3" /> ANS: 1 día hábil
            </div>
          </div>

          {/* Actor 2: Colsubsidio */}
          <div className="bg-white border-2 border-amber-300 rounded-xl p-4 text-center shadow-xs">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-600 text-white flex items-center justify-center mb-2 shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <h5 className="font-extrabold text-slate-900 text-sm">COLSUBSIDIO</h5>
            <span className="text-[11px] font-semibold text-amber-800 block">
              Caja de Compensación
            </span>
            <p className="text-[11px] text-slate-500 mt-1">
              Valida derechos y confirma subsidio ($58.363 COP/usuario)
            </p>
          </div>
        </div>

        {/* Core explanation callout */}
        <div className="mt-4 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-900 font-bold">Regla Operativa Obligatoria:</strong> &ldquo;Previo a la generación de la facturación al cliente, Colsanitas y Colsubsidio conciliarán los usuarios que tienen derecho al subsidio.&rdquo;
          </p>
        </div>

        {/* Consequent Action: Nota Débito */}
        <div className="mt-3 flex items-center justify-center">
          <ArrowDown className="w-4 h-4 text-teal-700" />
        </div>

        <div className="mt-2 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teal-300 shrink-0 border border-white/10">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-teal-300">
              Resultado Contable
            </span>
            <h6 className="text-sm font-bold text-white">
              Emisión de Nota Débito Contable a Colsubsidio
            </h6>
            <p className="text-xs text-slate-300 mt-0.5">
              &ldquo;Se genera Nota Débito contable a Colsubsidio con el total de los subsidios otorgados y conciliados.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
