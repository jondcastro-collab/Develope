import React, { useState } from 'react';
import {
  ProcessStep,
  ActorId,
  ActivityTag,
} from '../types';
import { ACTORS_DATA } from '../data/processData';
import { DecisionRuleModule } from './DecisionRuleModule';
import { MedicalSubflowModule } from './MedicalSubflowModule';
import { ConciliationDiagram } from './ConciliationDiagram';
import { NovedadesSection } from './NovedadesSection';
import { PreAfiliacionModule } from './PreAfiliacionModule';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ArrowRight,
  Shield,
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Receipt,
  Building2,
  DollarSign,
  Users,
} from 'lucide-react';

interface StageDetailPanelProps {
  step: ProcessStep;
  onNavigateNext?: () => void;
}

export const StageDetailPanel: React.FC<StageDetailPanelProps> = ({
  step,
  onNavigateNext,
}) => {
  const [activeTab, setActiveTab] = useState<'actividades' | 'flujos' | 'entradas_salidas' | 'condiciones'>('actividades');

  const primaryActor = ACTORS_DATA[step.responsibleActor] || ACTORS_DATA.comercial;

  const getTagBadgeStyle = (tag: ActivityTag) => {
    switch (tag) {
      case 'RESPONSABLE':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'ACTIVIDAD':
        return 'bg-sky-100 text-sky-900 border-sky-200';
      case 'ANS':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'DECISIÓN':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'DOCUMENTO / SOPORTE':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'SALIDA':
        return 'bg-teal-100 text-teal-900 border-teal-200';
      case 'CONDICIÓN ESPECIAL':
        return 'bg-rose-100 text-rose-900 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Stage Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border-b border-slate-800">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-500 text-slate-950 uppercase tracking-wider">
                Etapa {step.stepNumber}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                Responsable Principal: {step.responsiblePrimary}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Clock className="w-3.5 h-3.5" />
                ANS: {step.ans}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {step.name}
            </h2>
            <p className="text-sm sm:text-base text-teal-100/90 font-medium">
              {step.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              <strong className="text-white font-semibold">Objetivo: </strong>
              {step.objective}
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 border border-slate-700 text-right shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Subsidio Cat. A y B
            </span>
            <span className="text-xl font-black text-teal-300">$58.363 COP</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Máx. 2 usuarios / mes
            </span>
          </div>
        </div>

        {/* Navigation Tabs inside the panel */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('actividades')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'actividades'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Actividades ({step.activities.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('flujos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'flujos'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Módulos y Reglas Especiales</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('entradas_salidas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'entradas_salidas'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Entradas &amp; Salidas
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('condiciones')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'condiciones'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Condiciones &amp; Alertas ({step.specialConditions.length})
          </button>
        </div>
      </div>

      {/* Main Panel Content Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* TAB 1: ACTIVIDADES */}
        {activeTab === 'actividades' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Actividades Operativas de la Etapa
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Desglose secuencial de tareas y soportes
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {step.activities.map((act, index) => {
                const isPending = act.isPending;
                return (
                  <div
                    key={act.id}
                    className={`rounded-2xl p-4 sm:p-5 border transition-all ${
                      isPending
                        ? 'bg-amber-50/50 border-dashed border-amber-300'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getTagBadgeStyle(
                                act.tag
                              )}`}
                            >
                              {act.tag}
                            </span>
                            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              {act.actorLabel}
                            </span>
                            {act.ans && (
                              <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                ANS: {act.ans}
                              </span>
                            )}
                            {isPending && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                                PENDIENTE DE DEFINICIÓN
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900">
                            {act.title}
                          </h4>
                          {act.description && (
                            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                              {act.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Sub-details checklist */}
                    {act.details && act.details.length > 0 && (
                      <div className="mt-3 pl-9 space-y-1.5 border-t border-slate-100 pt-3">
                        {act.details.map((detail, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start gap-2 text-xs text-slate-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Soportes y documentos */}
                    {act.soportes && act.soportes.length > 0 && (
                      <div className="mt-3 pl-9 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase text-slate-500">
                          Soporte requerido:
                        </span>
                        {act.soportes.map((sop, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200"
                          >
                            📎 {sop}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: MÓDULOS Y REGLAS ESPECIALES */}
        {activeTab === 'flujos' && (
          <div className="space-y-6">
            {/* ETAPA 0 SPECIALS */}
            {step.id === 'preafiliacion' && (
              <PreAfiliacionModule />
            )}

            {/* ETAPA 1 SPECIALS */}
            {step.id === 'comercial' && (
              <div className="space-y-4">
                <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                      Soporte Obligatorio
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Validación Comercial</span>
                  </div>
                  <h4 className="text-base font-bold text-blue-950">
                    Captura del Validador Colsubsidio ($58.363 COP)
                  </h4>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    Para formalizar la venta colectiva, Comercial debe aportar como soporte de otorgamiento la foto o captura del validador oficial de Colsubsidio, acreditando que el trabajador pertenece a la Categoría A o B y tiene derecho al valor fijo de <strong>$58.363 COP</strong>.
                  </p>
                </div>

                {/* Futuro Modelo Advertencia */}
                <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-200 text-amber-900 uppercase">
                      Proyección Futura &bull; No vigente aún
                    </span>
                    <span className="text-xs font-extrabold text-amber-900">
                      PENDIENTE DE DEFINICIÓN
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-amber-950 mt-2">
                    Posible evolución futura: Modalidad por Convenio Abierto
                  </h4>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    Actualmente, el subsidio aplica <strong>únicamente para colectivos seleccionados</strong>. El esquema de ampliación masiva a convenios generales se encuentra en estudio y pendiente de definición técnica y contractual.
                  </p>
                </div>
              </div>
            )}

            {/* ETAPA 2 SPECIALS */}
            {step.id === 'afiliaciones' && (
              <div className="space-y-6">
                {/* Decision rule widget: <=20 vs >=20 */}
                <DecisionRuleModule />

                {/* Subflujo interactivo: Evaluacion medica */}
                <MedicalSubflowModule />

                {/* Novedades Section */}
                <NovedadesSection />
              </div>
            )}

            {/* ETAPA 3 SPECIALS */}
            {step.id === 'conciliacion' && (
              <div className="space-y-6">
                <ConciliationDiagram />
              </div>
            )}

            {/* ETAPA 4 SPECIALS */}
            {step.id === 'facturacion' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-200 text-amber-950 uppercase tracking-wider">
                      Condición Especial Crítica
                    </span>
                    <span className="text-xs text-amber-900 font-bold">Financiamiento a 60 días</span>
                  </div>
                  <h4 className="text-base font-bold text-amber-950 mt-2">
                    &ldquo;Las facturas correspondientes a estos colectivos se manejan a 60 días.&rdquo;
                  </h4>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    &ldquo;Esta condición requiere contar con los respectivos <strong>avales internos</strong> debidamente soportados en el flujo para sustentar la condición de pago ante auditoría y tesorería.&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <span className="text-xs font-bold text-slate-800 block">Facturación al 100%:</span>
                    <p className="text-xs text-slate-600 mt-1">
                      Se factura el 100% al cliente con descuento condicionado informando el valor a pagar por el cliente.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <span className="text-xs font-bold text-slate-800 block">Conexión de Flujo:</span>
                    <p className="text-xs text-slate-600 mt-1">
                      Pago del cliente &rarr; Pago de Colsubsidio por el valor de los subsidios otorgados.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 5 SPECIALS */}
            {step.id === 'pago_cliente' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                  <h4 className="text-base font-bold text-blue-950">
                    Mecanismo de Pago y Descuento Condicionado
                  </h4>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    El cliente abona el valor neto a su cargo. Si realiza el pago dentro del periodo de 25 días estipulado, se aplica el descuento condicionado. La porción excedente por encima del subsidio ($58.363 COP) es retenida por nómina al trabajador por parte de la empresa.
                  </p>
                </div>
              </div>
            )}

            {/* ETAPA 6 SPECIALS */}
            {step.id === 'cierre_recaudo' && (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <h4 className="text-base font-bold text-emerald-950">
                    Pago de Colsubsidio y Cierre Contable
                  </h4>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    Colsubsidio realiza el giro de los subsidios directamente a Colsanitas (máximo el 10° de cada mes o según cronograma establecido). Al ingresar este desembolso y el pago del cliente, se cierra la cuenta del periodo y se emiten los reportes de auditoría financiera.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ENTRADAS Y SALIDAS */}
        {activeTab === 'entradas_salidas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entradas */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>Entradas / Insumos Requeridos</span>
              </div>
              <ul className="space-y-2.5">
                {step.inputs.map((inp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Salidas */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Salidas / Entregables Concretos</span>
              </div>
              <ul className="space-y-2.5">
                {step.outputs.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: CONDICIONES & ALERTAS */}
        {activeTab === 'condiciones' && (
          <div className="space-y-4">
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Condiciones Especiales y Alertas Normativas</span>
              </div>
              <ul className="space-y-2.5">
                {step.specialConditions.map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>

            {step.decisions && step.decisions.length > 0 && (
              <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-purple-950 font-bold text-sm mb-3">
                  <HelpCircle className="w-4 h-4 text-purple-700" />
                  <span>Decisiones que deben tomarse en esta etapa</span>
                </div>
                <ul className="space-y-2">
                  {step.decisions.map((dec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-purple-900">
                      <span className="font-bold">&bull;</span>
                      <span>{dec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Connection to Next Stage Footer */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3 max-w-xl">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Qué ocurre después de esta actividad:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                {step.connectionToNext}
              </p>
            </div>
          </div>

          {onNavigateNext && (
            <button
              type="button"
              onClick={onNavigateNext}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
            >
              <span>Avanzar a siguiente etapa</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
