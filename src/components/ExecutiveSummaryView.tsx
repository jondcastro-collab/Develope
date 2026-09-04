import React from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Building,
  HeartHandshake,
  Users,
  BadgePercent,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { SUBSIDY_RULES } from '../data/processData';
import { formatCOP } from '../utils/formatters';

interface ExecutiveSummaryViewProps {
  onBackToProcess?: () => void;
}

export const ExecutiveSummaryView: React.FC<ExecutiveSummaryViewProps> = ({
  onBackToProcess,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const summaryCards = [
    {
      label: 'MODALIDAD',
      value: 'Colectivos',
      desc: 'Grupos empresariales seleccionados por el área comercial.',
      tag: 'Vigente',
      tagColor: 'bg-blue-100 text-blue-900 border-blue-200',
      icon: Building,
    },
    {
      label: 'PRODUCTO',
      value: 'Salud Activa',
      desc: 'Plan de medicina prepagada de Colsanitas / Keralty con amplia cobertura asistencial.',
      tag: 'Medicina Prepagada',
      tagColor: 'bg-teal-100 text-teal-900 border-teal-200',
      icon: HeartHandshake,
    },
    {
      label: 'POBLACIÓN OBJETIVO',
      value: 'Categorías A y B',
      desc: 'Trabajadores afiliados a la Caja de Compensación Colsubsidio activos con ingresos de hasta 4 SMMLV.',
      tag: 'Colsubsidio',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      icon: Users,
    },
    {
      label: 'SUBSIDIO MÁXIMO',
      value: '1 SMDLV',
      desc: 'Tope fijado legalmente por persona mensual equivalente a un Salario Mínimo Diario Legal Vigente.',
      tag: 'Normativo',
      tagColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      icon: BadgePercent,
    },
    {
      label: 'VALOR FIJO 2026',
      value: '$58.363 COP',
      desc: 'Tarifa mensual fija por persona (titular o beneficiario) con derecho validado.',
      tag: 'Vigencia 2026',
      tagColor: 'bg-teal-100 text-teal-900 border-teal-200 font-black',
      icon: BadgePercent,
      highlight: true,
    },
    {
      label: 'BENEFICIARIOS',
      value: 'Trabajador + Máx. 1',
      desc: 'Máximo 2 usuarios subsidiados por titular (ambos deben estar afiliados a Colsubsidio). Se aceptan titulares usuarios y no usuarios.',
      tag: 'Tope Cobertura',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-200',
      icon: Users,
    },
    {
      label: 'CONDICIÓN DE EXCEDENTE',
      value: 'Descuento por Nómina',
      desc: 'Si el valor del plan supera el subsidio, la empresa es responsable de realizar el descuento por nómina al trabajador por el valor excedente.',
      tag: 'Obligación Empresa',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300 font-bold',
      icon: AlertTriangle,
    },
    {
      label: 'DISPONIBILIDAD DE RECURSOS',
      value: 'Sujeto a Recursos',
      desc: 'La asignación del subsidio está sujeta a la disponibilidad de recursos destinados por Colsubsidio para este beneficio. Es intransferible y no redimible en efectivo.',
      tag: 'Fondo Colsubsidio',
      tagColor: 'bg-slate-100 text-slate-800 border-slate-300',
      icon: ShieldCheck,
    },
    {
      label: 'PRE-AFILIACIÓN Y CONVENIO',
      value: 'Convenio Empresa-Caja',
      desc: 'Comercial debe entregar el convenio formalizado (firma entre caja y empresa afiliada a la caja). Responsable: Colsubsidio (tiempo puede variar). Contrato general y Ficha técnica en trámite.',
      tag: 'Paso 0 • Requisito Clave',
      tagColor: 'bg-teal-100 text-teal-950 border-teal-300 font-bold',
      icon: FileText,
    },
    {
      label: 'CONDICIÓN DE FACTURACIÓN',
      value: 'Plazo a 60 Días',
      desc: 'Las facturas correspondientes a estos colectivos se manejan a 60 días. Esta condición requiere contar con los respectivos avales internos.',
      tag: 'Requiere Aval Interno',
      tagColor: 'bg-rose-100 text-rose-950 border-rose-300 font-bold',
      icon: Clock,
      highlight: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm print:bg-white print:text-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Ficha Técnica Ejecutiva
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Vigencia Operativa 2026
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Resumen Ejecutivo &bull; Condiciones del Subsidio
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Consolidado de las directrices y términos rectores de la Alianza Colsubsidio – Salud Activa para presentación a directivas, Comercial, Operaciones y Facturación.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {onBackToProcess && (
              <button
                type="button"
                onClick={onBackToProcess}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Proceso</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Key Conditions (10 Corporate Criteria) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {summaryCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl p-5 border transition-all ${
                card.highlight
                  ? 'bg-gradient-to-br from-teal-50/50 to-blue-50/50 border-teal-300 shadow-xs ring-1 ring-teal-400/30'
                  : 'bg-white border-slate-200 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  {card.label}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${card.tagColor}`}
                >
                  {card.tag}
                </span>
              </div>

              <div className="flex items-start gap-3 mt-1">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <IconComp className="w-4 h-4 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {card.value}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Distinction: Current Process vs. Pending Future Evolution */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          Diferenciación de Estado: Proceso Actual vs. Proyecciones
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Process */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 inline-block mb-2">
              Proceso Actual en Operación
            </span>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Modalidad Colectivos:</strong> El beneficio aplica exclusivamente a colectivos empresariales seleccionados.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Facturación 100% con descuento:</strong> La factura se expide por el total informando el subsidio ($58.363 COP).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Plazo 60 días con avales:</strong> Sustentado en aprobaciones previas de cartera y comercial.</span>
              </li>
            </ul>
          </div>

          {/* Pending Definition */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-200 text-amber-950 border border-amber-300 inline-block mb-2">
              PENDIENTE DE DEFINICIÓN
            </span>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Evolución futura a convenio masivo abierto:</strong> Sujeto a mesas técnicas interinstitucionales entre Colsanitas y Colsubsidio.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Integración de validación automática por API:</strong> Actualmente se exige la captura manual del validador.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
