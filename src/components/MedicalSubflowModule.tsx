import React, { useState } from 'react';
import {
  Stethoscope,
  CheckCircle2,
  XCircle,
  PackageCheck,
  AlertCircle,
  HelpCircle,
  ArrowDown,
  ArrowRight,
  Shield,
  FileText,
} from 'lucide-react';

export const MedicalSubflowModule: React.FC = () => {
  const [selectedOutcome, setSelectedOutcome] = useState<'aprobado' | 'comite' | 'rechazo_emi'>('aprobado');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-start justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Subflujo Operativo
            </span>
            <span className="text-xs text-slate-500 font-medium">Etapa 02 &bull; Afiliaciones</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
            Proceso Normal de Afiliación &bull; Evaluación Médica
          </h3>
          <p className="text-xs text-slate-600">
            Compuerta de decisión técnica de asegurabilidad y alternativas de cobertura.
          </p>
        </div>
        <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
          <Stethoscope className="w-5 h-5" />
        </div>
      </div>

      {/* Visual Workflow Nodes */}
      <div className="mt-5 relative">
        {/* Node 1: Área Médica */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm bg-slate-900 text-white rounded-xl p-3 shadow-md flex items-center gap-3 border border-slate-700">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300">
                Paso 1 &bull; Asegurabilidad
              </span>
              <h4 className="text-sm font-bold text-white leading-tight">Área Médica</h4>
              <p className="text-[11px] text-slate-300">Revisión de declaración de salud</p>
            </div>
          </div>

          {/* Connector Down */}
          <div className="h-6 w-0.5 bg-slate-300 flex items-center justify-center my-1">
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Decision Diamond / Box */}
          <div className="w-full max-w-sm bg-amber-50 border-2 border-amber-300 rounded-xl p-3 text-center shadow-xs">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
              Compuerta de Decisión
            </span>
            <div className="text-sm font-extrabold text-amber-950 mt-0.5">
              ¿Afiliación aprobada?
            </div>
            <p className="text-[11px] text-amber-800 mt-0.5">
              Concepto técnico de riesgos y preexistencias
            </p>
          </div>

          {/* Connectors to Branching outcomes */}
          <div className="w-full max-w-2xl mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Branch YES: Continuar proceso -> Envio de Kit */}
            <div
              onClick={() => setSelectedOutcome('aprobado')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                selectedOutcome === 'aprobado'
                  ? 'border-emerald-500 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  SÍ: Aprobada
                </span>
                <span className="text-xs font-semibold text-emerald-800">Continuar Proceso</span>
              </div>
              <div className="mt-3 flex items-start gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">Envío de Kit de Usuario</h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Generación de credenciales activas, carné institucional y guía de servicios de Salud Activa.
                  </p>
                </div>
              </div>
            </div>

            {/* Branch NO: Rechazo / Comite / EMI */}
            <div
              onClick={() => setSelectedOutcome(selectedOutcome === 'aprobado' ? 'comite' : selectedOutcome)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                selectedOutcome !== 'aprobado'
                  ? 'border-rose-400 bg-rose-50/70 shadow-md ring-2 ring-rose-500/20'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white">
                  <XCircle className="w-3.5 h-3.5" />
                  NO: No Aprobada
                </span>
                <span className="text-xs font-semibold text-rose-800">Vías de Excepción</span>
              </div>
              <div className="mt-3 flex items-start gap-2.5">
                <div className="p-2 bg-rose-100 text-rose-800 rounded-lg shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">Comité / EMI según corresponda</h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Evaluación en Comité Médico o direccionamiento a EMI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Decision Sub-options for Branch NO */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
            Detalle de Vías de No Aprobación &bull; Regla EMI:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Comité Médico */}
            <button
              type="button"
              onClick={() => setSelectedOutcome('comite')}
              className={`p-3 rounded-xl text-left border transition-all text-xs ${
                selectedOutcome === 'comite'
                  ? 'bg-amber-50 border-amber-300 text-amber-950 font-medium'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>✓ Comité Médico</span>
                <FileText className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <p className="mt-1 text-slate-600 text-[11px] leading-relaxed">
                Estudio colegiado para excepciones, coberturas condicionadas o exclusiones particulares negociadas.
              </p>
            </button>

            {/* EMI Condition */}
            <button
              type="button"
              onClick={() => setSelectedOutcome('rechazo_emi')}
              className={`p-3 rounded-xl text-left border transition-all text-xs ${
                selectedOutcome === 'rechazo_emi'
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-950 font-medium ring-1 ring-indigo-400'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold flex items-center justify-between text-indigo-900">
                <span>✓ EMI (Rechazo EMI)</span>
                <span className="px-1.5 py-0.2 bg-indigo-200/80 rounded text-[10px] font-bold">
                  Medisanitas ≤ 50 años
                </span>
              </div>
              <p className="mt-1 text-slate-600 text-[11px] leading-relaxed">
                Opción de aseguramiento alternativo: En caso de objeción médica, aplica desvío a EMI para plan Medisanitas en usuarios de 50 años o menos.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
