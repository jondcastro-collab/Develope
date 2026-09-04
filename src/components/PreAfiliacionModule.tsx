import React, { useState } from 'react';
import {
  FileText,
  Clock,
  AlertCircle,
  Building2,
  ShieldAlert,
  ArrowDownRight,
  Handshake,
  CheckCircle2,
  FileSignature,
  Building,
  Info,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export const PreAfiliacionModule: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<'contrato' | 'reglamento' | 'convenio'>('convenio');

  return (
    <div id="pre-afiliacion-module" className="space-y-6">
      {/* Diagram Replica Card with exact visual layout from the flow specification */}
      <div className="bg-white border-2 border-teal-200 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Top Header Pill like in the diagram */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-gradient-to-r from-teal-700 via-teal-800 to-blue-900 text-white shadow-xs">
            <Handshake className="w-4 h-4 text-teal-200" />
            <span>Pre-afiliación Colsubsidio / Colsanitas</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Condición Previa &bull; Paso 0</span>
          </div>
        </div>

        {/* Main Diagram Node Container */}
        <div className="relative border-2 border-teal-500/40 bg-gradient-to-b from-teal-50/40 via-white to-slate-50/40 rounded-3xl p-5 sm:p-7 shadow-xs">
          {/* Top Row: Circular Node 0 and the two pending institutional documents */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Circular Step Badge (Paso 0) */}
            <div className="flex flex-col items-center justify-center shrink-0 mx-auto md:mx-0">
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-teal-600 via-teal-700 to-blue-900 text-white shadow-md ring-4 ring-teal-100 font-black text-2xl sm:text-3xl">
                0
                <span className="absolute -bottom-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-900 text-teal-300 border border-teal-500/40">
                  Paso
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-500 mt-3 text-center">
                Marco Macro
              </span>
            </div>

            {/* The 2 Macro Institutional Agreements */}
            <div className="flex-1 w-full space-y-3">
              {/* Item 1: Contrato general */}
              <div
                onClick={() => setSelectedDoc('contrato')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedDoc === 'contrato'
                    ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-extrabold text-xs shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                        Contrato general entre Colsanitas y Colsubsidio.
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Convenio marco interinstitucional que formaliza la alianza, responsabilidades de compensación y aportes.
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 shrink-0">
                    <AlertCircle className="w-3 h-3 text-rose-600" />
                    Pendiente
                  </span>
                </div>
              </div>

              {/* Item 2: Reglamento / Ficha técnica */}
              <div
                onClick={() => setSelectedDoc('reglamento')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedDoc === 'reglamento'
                    ? 'bg-amber-50/80 border-amber-500 shadow-xs ring-2 ring-amber-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                        Reglamento / Ficha técnica (Colsubsidio).
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Normativa oficial expedida por Colsubsidio que estipula las condiciones, categorías A/B y valor de $58.363 COP.
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 shrink-0">
                    <AlertCircle className="w-3 h-3 text-rose-600" />
                    Pendiente
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Accent Line dividing Macro agreement from Comercial Delivery */}
          <div className="relative my-6">
            <div className="h-0.5 w-full bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-200 rounded-full" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 py-0.5 rounded-full border border-teal-200 text-[10px] font-black uppercase tracking-widest text-teal-800">
              Prerrequisito para Operación Comercial
            </div>
          </div>

          {/* Section: Comercial debe entregar */}
          <div className="bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-slate-50 border border-emerald-300 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-0.5 rounded-md text-xs font-black uppercase tracking-wider bg-emerald-700 text-white">
                Comercial debe entregar:
              </span>
              <span className="text-xs font-medium text-slate-500">
                Soporte indispensable para formalizar el colectivo
              </span>
            </div>

            {/* Convenio Card */}
            <div
              onClick={() => setSelectedDoc('convenio')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                selectedDoc === 'convenio'
                  ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white/80 border-emerald-200 hover:bg-white'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h5 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Convenio (Firma entre caja y empresa afiliada a la caja).
                    </h5>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-300">
                        <Building2 className="w-3 h-3 text-amber-700" />
                        Responsable: Colsubsidio
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                        <Clock className="w-3 h-3 text-slate-500" />
                        (Tiempo puede variar)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    Entregable Clave
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Connection to Next Step Badge */}
          <div className="mt-5 flex items-center justify-end gap-2 text-xs font-bold text-teal-800">
            <span>Conecta directamente con:</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-800 text-white">
              <span>Etapa 01: Comercial</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Detail Drawer for the Selected Element */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Detalle y Especificación Técnica del Elemento Seleccionado
            </span>
          </div>
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedDoc('contrato')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDoc === 'contrato'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Contrato General
            </button>
            <button
              type="button"
              onClick={() => setSelectedDoc('reglamento')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDoc === 'reglamento'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Reglamento / Ficha
            </button>
            <button
              type="button"
              onClick={() => setSelectedDoc('convenio')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDoc === 'convenio'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Convenio Comercial
            </button>
          </div>
        </div>

        {selectedDoc === 'contrato' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-base font-extrabold text-blue-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-700" />
                Contrato General entre Colsanitas y Colsubsidio
              </h4>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300">
                ESTADO: PENDIENTE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Es el marco jurídico superior de la alianza. Establece el vínculo formal entre la entidad aseguradora (Colsanitas Medicina Prepagada) y la Caja de Compensación (Colsubsidio). Sin este instrumento en firme, los giros y compensaciones contables operan bajo acuerdo previo preliminar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Partes Firmantes</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Colsanitas MP &bull; Colsubsidio</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Alcance Financiero</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Subsidio 1 SMDLV ($58.363 COP)</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Impacto Operativo</div>
                <div className="text-xs font-bold text-rose-700 mt-1">Requiere formalización definitiva</div>
              </div>
            </div>
          </div>
        )}

        {selectedDoc === 'reglamento' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-base font-extrabold text-amber-950 flex items-center gap-2">
                <FileSignature className="w-4 h-4 text-amber-700" />
                Reglamento / Ficha Técnica (Colsubsidio)
              </h4>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300">
                ESTADO: PENDIENTE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Constituye el documento técnico emitido por Colsubsidio donde se reglamentan los términos y condiciones de elegibilidad, requisitos para los afiliados categorías A y B, disponibilidad presupuestal del fondo de subsidio y el límite de hasta 2 usuarios por titular.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Responsable Emisión</div>
                <div className="text-xs font-bold text-amber-900 mt-1">Colsubsidio (Caja)</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Beneficiarios Válidos</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Categorías A y B exclusivamente</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Regla de Cobertura</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Titular + Máximo 1 beneficiario</div>
              </div>
            </div>
          </div>
        )}

        {selectedDoc === 'convenio' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-700" />
                Convenio Empresa &bull; Caja de Compensación Colsubsidio
              </h4>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                ENTREGA OBLIGATORIA DE COMERCIAL
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Para que los trabajadores de una empresa puedan recibir el subsidio de Salud Activa, Comercial debe gestionar y entregar el convenio debidamente firmado entre la Caja (Colsubsidio) y la empresa empleadora afiliada a la misma. Este convenio compromete a la empresa a tramitar los descuentos por nómina de los excedentes y valida el vínculo formal con la caja.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Entidad que Firma</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Colsubsidio & Empresa Cliente</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Responsable de Gestión</div>
                <div className="text-xs font-bold text-amber-900 mt-1">Colsubsidio (firma)</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Tiempos de Respuesta</div>
                <div className="text-xs font-bold text-slate-700 mt-1">Variable según empresa y caja</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
