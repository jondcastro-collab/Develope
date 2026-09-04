import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Clock,
  Building2,
  Users,
  Lock,
  Sparkles,
} from 'lucide-react';
import { APPROVAL_CHAIN } from '../data/processData';

export const ApprovalsChainView: React.FC = () => {
  const [selectedApprovalId, setSelectedApprovalId] = useState<string>('appr-4');

  const selectedStep =
    APPROVAL_CHAIN.find((s) => s.id === selectedApprovalId) || APPROVAL_CHAIN[3];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Gobernanza y Control
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Vo. Bo. y Avales Internos Requeridos
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Mapa visual de aprobaciones obligatorias, validaciones cruzadas y sustento formal del plazo de crédito a 60 días.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 max-w-xs text-amber-200 text-xs">
            <span className="font-extrabold uppercase tracking-wider text-amber-400 block mb-1">
              Condición Especial Clave
            </span>
            <span>Facturación de colectivos a 60 días sujeta obligatoriamente a avales internos.</span>
          </div>
        </div>
      </div>

      {/* Primary Sequential Chain: Validación → Vo. Bo. → Conciliación → Facturación → Pago */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          Cadena Formal de Validación y Autorizaciones
        </div>

        {/* Horizontal Chain Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 relative">
          {[
            { id: 'c0', stepNum: 'Paso 00', label: '0. Pre-afiliación', desc: 'Convenio Empresa-Caja + Marco', color: 'teal' },
            { id: 'c1', stepNum: 'Paso 01', label: '1. Validación', desc: 'Soporte otorgamiento (foto validador)', color: 'blue' },
            { id: 'c2', stepNum: 'Paso 02', label: '2. Vo. Bo.', desc: 'Revisión pre-cuenta Colsubsidio', color: 'teal' },
            { id: 'c3', stepNum: 'Paso 03', label: '3. Conciliación', desc: 'Mesa tripartita MP-Colsubsidio', color: 'indigo' },
            { id: 'c4', stepNum: 'Paso 04', label: '4. Facturación', desc: '100% cliente + aval a 60 días', color: 'amber', isCritical: true },
            { id: 'c5', stepNum: 'Paso 05', label: '5. Pago', desc: 'Cliente (25-30 d) + Colsubsidio (día 10)', color: 'emerald' },
          ].map((node) => (
            <div
              key={node.id}
              className={`relative p-4 rounded-2xl border-2 transition-all text-center ${
                node.isCritical
                  ? 'bg-amber-50/70 border-amber-400 shadow-md ring-2 ring-amber-400/20'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                {node.stepNum}
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-1">
                {node.label}
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                {node.desc}
              </p>
              {node.isCritical && (
                <div className="mt-2 text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full inline-block">
                  Requiere Aval 60 días
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Critical Highlight Module: Condición a 60 Días y Avales Internos */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-200 text-amber-950 uppercase tracking-wider">
                Alerta Crítica &bull; Vo. Bo. Requerido
              </span>
              <span className="text-xs font-bold text-amber-900">
                Sustento de Condición de Pago
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-amber-950 leading-snug">
              &ldquo;Las facturas correspondientes a estos colectivos se manejan a 60 días.&rdquo;
            </h3>

            <p className="text-sm font-semibold text-amber-900 leading-relaxed">
              &ldquo;Esta condición requiere contar con los respectivos <strong>avales internos</strong>.&rdquo;
            </p>

            <div className="p-4 bg-white/90 border border-amber-200 rounded-2xl shadow-2xs text-xs text-amber-950 space-y-1.5">
              <span className="font-extrabold text-amber-900 uppercase tracking-wide block">
                IMPORTANTE
              </span>
              <p className="leading-relaxed">
                &ldquo;El Vo. Bo. y los avales internos deben quedar claramente definidos dentro del flujo para sustentar la condición de pago.&rdquo;
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                * Ninguna factura con término extendido a 60 días podrá ser emitida sin la firma o aprobación documentada en el expediente del colectivo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Breakdown of the 6 Approval Steps */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Catálogo de Puntos de Control y Vo. Bo.
            </h3>
            <p className="text-xs text-slate-500">
              Selecciona cada punto para ver el área responsable, ANS y entregable que habilita la siguiente etapa.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {APPROVAL_CHAIN.map((step) => {
            const isSelected = selectedApprovalId === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setSelectedApprovalId(step.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-900 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Control {step.stepNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    ANS: {step.ans}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  {step.name}
                </h4>

                <div className="mt-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Responsable: </span>
                  {step.responsible}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-700">Salida / Soporte: </span>
                  {step.output}
                </div>

                {step.is60DayCritical && (
                  <div className="mt-2 p-2 rounded-lg bg-amber-100/70 text-amber-900 text-[10px] font-bold border border-amber-200">
                    Aval interno requerido para 60 días
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
