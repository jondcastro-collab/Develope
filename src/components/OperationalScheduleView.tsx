import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Building2,
  Users,
  Search,
  Filter,
  ArrowRight,
  Info,
  CalendarDays,
} from 'lucide-react';
import {
  OPERATIONAL_SCHEDULE_ITEMS,
  OPERATIONAL_CALENDAR_TABLE,
} from '../data/processData';
import { ScheduleItem, OperationalCycleMonth } from '../types';

export const OperationalScheduleView: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<ScheduleItem>(
    OPERATIONAL_SCHEDULE_ITEMS[0]
  );
  const [selectedMonth, setSelectedMonth] = useState<string>('ago-26');
  const [activeTab, setActiveTab] = useState<'timeline' | 'tabla'>('timeline');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const currentMonthData =
    OPERATIONAL_CALENDAR_TABLE.find((m) => m.mesFacturar === selectedMonth) ||
    OPERATIONAL_CALENDAR_TABLE[0];

  const filteredItems = OPERATIONAL_SCHEDULE_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.timing.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Calendar className="w-3.5 h-3.5" />
              Vista Oficial de Tiempos y ANS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Cronograma Operativo Alianza Colsubsidio
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Secuencia cronológica mensual de las 9 actividades críticas de cierre, pre-cuenta, conciliación tripartita, facturación y recaudos interinstitucionales.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Timeline de Actividades (9)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tabla')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'tabla'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Calendario por Meses (2026-2027)
            </button>
          </div>
        </div>

        {/* Month Selector Pills */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <CalendarDays className="w-4 h-4 text-teal-400" />
            <span>Ciclos de Facturación Vigentes:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {OPERATIONAL_CALENDAR_TABLE.map((m) => (
              <button
                key={m.mesFacturar}
                type="button"
                onClick={() => setSelectedMonth(m.mesFacturar)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedMonth === m.mesFacturar
                    ? 'bg-teal-500 text-slate-950 shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {m.mesFacturar.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: TIMELINE DE ACTIVIDADES */}
      {activeTab === 'timeline' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Timeline Track */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Secuencia Operativa Cronológica (9 Hitos)
              </span>
              <span className="text-xs text-slate-400">
                Haz clic en cualquier actividad para inspeccionar dependencias
              </span>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-3 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {filteredItems.map((item) => {
                const isSelected = selectedActivity.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedActivity(item)}
                    className={`relative p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-blue-900 shadow-md ring-2 ring-blue-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs hover:bg-slate-50/70'
                    }`}
                  >
                    {/* Node Dot on track */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-5 w-4 h-4 rounded-full border-2 transition-all ${
                        isSelected
                          ? 'bg-blue-900 border-teal-400 ring-4 ring-teal-500/20'
                          : 'bg-white border-slate-400'
                      }`}
                    />

                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            Paso {item.order}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            {item.responsible}
                          </span>
                          {item.isSpecialCondition && (
                            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
                              Condición Especial
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {item.title}
                        </h4>
                      </div>

                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                          <Clock className="w-3 h-3" />
                          {item.ans}
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-1">
                          {item.timing}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Activity Detail Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-950 border border-blue-200">
                  Actividad #{selectedActivity.order} en Detalle
                </span>
                <span className="text-xs text-slate-400">Inspección Operativa</span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                  {selectedActivity.title}
                </h3>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 text-teal-900 border border-teal-200 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-teal-700" />
                  <span>ANS: {selectedActivity.ans}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1">
                    Área Responsable:
                  </span>
                  <span className="text-slate-900 font-extrabold text-sm block">
                    {selectedActivity.responsible}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1">
                    Momento / Periodicidad:
                  </span>
                  <span className="text-slate-900 font-bold text-sm block">
                    {selectedActivity.timing}
                  </span>
                </div>

                <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100">
                  <span className="text-blue-900 font-bold uppercase tracking-wider text-[10px] block mb-1">
                    Dependencia Previa:
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {selectedActivity.dependency}
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <span className="text-emerald-900 font-bold uppercase tracking-wider text-[10px] block mb-1">
                    Resultado / Entregable:
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {selectedActivity.result}
                  </p>
                </div>

                {selectedActivity.highlight && (
                  <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-amber-900 font-bold uppercase tracking-wider text-[10px] block mb-1">
                      Nota de Condición Especial:
                    </span>
                    <p className="text-amber-950 font-bold leading-relaxed">
                      {selectedActivity.highlight}
                    </p>
                  </div>
                )}
              </div>

              {/* Exact Dates for Selected Activity in Current Month */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl">
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300 block mb-1">
                  Fecha Oficial para {currentMonthData.mesFacturar.toUpperCase()}:
                </span>
                <div className="text-xs text-slate-200 font-medium">
                  {selectedActivity.order === 3 && (
                    <span>Envío Pre-cuenta: <strong>{currentMonthData.envioPreCuenta}</strong></span>
                  )}
                  {selectedActivity.order === 4 && (
                    <span>Validación Colsubsidio: <strong>{currentMonthData.validacionPreCuentaColsubsidio}</strong></span>
                  )}
                  {selectedActivity.order === 5 && (
                    <span>Conciliación Vo. Bo.: <strong>{currentMonthData.conciliacionVoBo}</strong></span>
                  )}
                  {selectedActivity.order === 6 && (
                    <span>Entrega Factura Cliente: <strong>{currentMonthData.entregaFacturaCliente}</strong></span>
                  )}
                  {selectedActivity.order === 7 && (
                    <span>Entrega Nota Débito: <strong>{currentMonthData.entregaNotaDebitoColsubsidio}</strong></span>
                  )}
                  {selectedActivity.order === 8 && (
                    <span>Pago Factura Cliente con Descuento: <strong>{currentMonthData.pagoFacturaClienteDescuento}</strong></span>
                  )}
                  {selectedActivity.order === 9 && (
                    <span>Pago Subsidio Colsubsidio: <strong>{currentMonthData.pagoSubsidioColsubsidio}</strong></span>
                  )}
                  {(selectedActivity.order === 1 || selectedActivity.order === 2) && (
                    <span>Cierre de novedades: <strong>15° día hábil de cada mes</strong></span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: TABLA COMPLETA MULTIMES */}
      {activeTab === 'tabla' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Matriz Completa del Cronograma Operativo (6 Ciclos Oficiales)
              </h3>
              <p className="text-xs text-slate-500">
                Fechas exactas acordadas entre Colsanitas y Colsubsidio para los contratos SALUD ACTIVA.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3 border-r border-slate-800">Mes</th>
                  <th className="p-3 border-r border-slate-800">Envío Pre-cuenta</th>
                  <th className="p-3 border-r border-slate-800">Validación Colsubsidio</th>
                  <th className="p-3 border-r border-slate-800">Conciliación Vo. Bo.</th>
                  <th className="p-3 border-r border-slate-800">Factura &amp; Nota Débito</th>
                  <th className="p-3 border-r border-slate-800">Pago Cliente (Desc. Cond.)</th>
                  <th className="p-3">Pago Subsidio Colsubsidio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {OPERATIONAL_CALENDAR_TABLE.map((row) => {
                  const isCurrent = row.mesFacturar === selectedMonth;
                  return (
                    <tr
                      key={row.mesFacturar}
                      onClick={() => setSelectedMonth(row.mesFacturar)}
                      className={`cursor-pointer transition-colors ${
                        isCurrent
                          ? 'bg-teal-50/80 font-semibold text-slate-950'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="p-3 font-black text-slate-900 bg-slate-50 border-r border-slate-200">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-950 font-extrabold uppercase">
                          {row.mesFacturar}
                        </span>
                      </td>
                      <td className="p-3 border-r border-slate-100">{row.envioPreCuenta}</td>
                      <td className="p-3 border-r border-slate-100">{row.validacionPreCuentaColsubsidio}</td>
                      <td className="p-3 border-r border-slate-100 text-teal-800 font-bold">{row.conciliacionVoBo}</td>
                      <td className="p-3 border-r border-slate-100">{row.entregaFacturaCliente}</td>
                      <td className="p-3 border-r border-slate-100 text-amber-900 font-semibold">{row.pagoFacturaClienteDescuento}</td>
                      <td className="p-3 text-emerald-800 font-bold">{row.pagoSubsidioColsubsidio}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
            <span>&bull; Fuente: Cronograma Operativo Alianza Colsubsidio - Salud Activa (Vigencia 2026).</span>
            <span className="text-teal-800 font-semibold">Todas las pre-cuentas requieren ANS estricto de 1 día hábil por etapa de validación y Vo. Bo.</span>
          </div>
        </div>
      )}
    </div>
  );
};
