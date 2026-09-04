import React, { useState } from 'react';
import {
  Calculator,
  ArrowDown,
  Building,
  User,
  Users,
  ShieldCheck,
  AlertTriangle,
  Info,
  DollarSign,
  Receipt,
  FileCheck2,
} from 'lucide-react';
import { formatCOP } from '../utils/formatters';
import { SUBSIDY_RULES } from '../data/processData';

export const SubsidyCalculatorModule: React.FC = () => {
  // Plan price per person per month (Salud Activa reference example)
  const [planPrice, setPlanPrice] = useState<number>(115000);
  // Number of beneficiaries (1 = only worker, 2 = worker + 1 beneficiary)
  const [userCount, setUserCount] = useState<1 | 2>(2);

  const subsidyPerUser = SUBSIDY_RULES.valorFijo2026; // $58.363 COP
  const totalSubsidy = subsidyPerUser * userCount;
  const totalPlan = planPrice * userCount;
  const clientExceedingTotal = Math.max(0, totalPlan - totalSubsidy);
  const clientExceedingPerUser = Math.max(0, planPrice - subsidyPerUser);

  const presetPrices = [
    { label: 'Básico Colectivo', price: 95000 },
    { label: 'Salud Activa Estándar', price: 115000 },
    { label: 'Salud Activa Plus', price: 145000 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-blue-900 to-slate-900 text-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Calculator className="w-3.5 h-3.5" />
              Módulo Visual &bull; Vigencia 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              ¿Cómo funciona el subsidio?
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Cálculo mensual del beneficio de 1 SMDLV otorgado por Colsubsidio y determinación del saldo a cargo del cliente o trabajador.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-right">
            <span className="text-xs uppercase tracking-wider font-semibold text-teal-300 block">
              Subsidio Fijo 2026
            </span>
            <span className="text-2xl font-black text-white">
              {formatCOP(subsidyPerUser)}
            </span>
            <span className="text-[11px] text-slate-300 block">
              Por persona / mes (1 SMDLV)
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Core Mathematical Breakdown Flow */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Representación Gráfica del Flujo Financiero
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {/* Step 1: VALOR DEL PLAN */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 relative text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-0.5 rounded-full">
                1. Valor del Plan
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                VALOR DEL PLAN
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Tarifa comercial contratada por persona/mes
              </p>
              <div className="text-base font-bold text-blue-900 mt-2">
                {formatCOP(planPrice)} <span className="text-xs font-normal text-slate-500">c/u</span>
              </div>
            </div>

            {/* Step 2: SUBSIDIO COLSUBSIDIO */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 relative text-center shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                2. Subsidio Colsubsidio
              </span>
              <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-2">
                - {formatCOP(subsidyPerUser)}
              </div>
              <p className="text-xs text-emerald-800 mt-1">
                Aporte fijo por persona con derecho (Cat. A o B)
              </p>
              <div className="text-xs font-bold text-emerald-900 mt-2 bg-emerald-200/60 inline-block px-2 py-0.5 rounded">
                1 SMDLV Vigente 2026
              </div>
            </div>

            {/* Step 3: VALOR A CARGO DEL CLIENTE */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 relative text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full">
                3. Valor a Cargo del Cliente
              </span>
              <div className="text-xl sm:text-2xl font-black text-amber-950 mt-2">
                = {formatCOP(clientExceedingPerUser)}
              </div>
              <p className="text-xs text-amber-900 mt-1">
                Excedente a cargo del trabajador / empresa
              </p>
              <div className="text-xs font-bold text-amber-800 mt-2">
                Descuento por nómina
              </div>
            </div>
          </div>
        </div>

        {/* High-priority Rule Callout */}
        <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                Regla Contractual de Excedente:
              </h4>
              <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                &ldquo;Si el valor del plan supera el monto del subsidio, la empresa será responsable de realizar el descuento por nómina al trabajador por el valor excedente.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Simulator Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-teal-600" />
                Simulador Dinámico de Liquidación Colectiva
              </h3>
              <p className="text-xs text-slate-500">
                Ajusta el valor de la póliza y el número de usuarios postulados para observar el desglose
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {presetPrices.map((preset) => (
                <button
                  key={preset.price}
                  type="button"
                  onClick={() => setPlanPrice(preset.price)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium border transition-colors ${
                    planPrice === preset.price
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Valor mensual del plan por persona (COP):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    step="1000"
                    min="50000"
                    max="400000"
                    value={planPrice}
                    onChange={(e) => setPlanPrice(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <input
                  type="range"
                  min="58363"
                  max="300000"
                  step="5000"
                  value={planPrice}
                  onChange={(e) => setPlanPrice(Number(e.target.value))}
                  className="w-full mt-2 accent-teal-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Cobertura por titular (Máximo 2 usuarios):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUserCount(1)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      userCount === 1
                        ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold ring-1 ring-teal-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <User className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">1 Usuario</div>
                      <div className="text-[10px] text-slate-500">Solo Trabajador Titular</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserCount(2)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      userCount === 2
                        ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold ring-1 ring-teal-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Users className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">2 Usuarios (Máximo)</div>
                      <div className="text-[10px] text-slate-500">Trabajador + 1 Beneficiario</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Bill Output */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between pb-2 border-b border-slate-100">
                <span>Resumen de Liquidación Factura</span>
                <span className="text-teal-700 font-semibold">{userCount} usuario(s)</span>
              </div>

              <div className="space-y-2 mt-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Facturación 100% al cliente ({userCount} × {formatCOP(planPrice)}):</span>
                  <span className="font-bold text-slate-900">{formatCOP(totalPlan)}</span>
                </div>

                <div className="flex justify-between text-emerald-700 bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-100">
                  <span>- Descuento Condicionado (Subsidio Colsubsidio {userCount} × {formatCOP(subsidyPerUser)}):</span>
                  <span className="font-extrabold">- {formatCOP(totalSubsidy)}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Valor neto a pagar por el cliente:
                    </span>
                    <span className="text-[10px] text-slate-500">
                      (A cargo del cliente / Descuento nómina trabajador)
                    </span>
                  </div>
                  <span className="text-base sm:text-lg font-black text-amber-800">
                    {formatCOP(clientExceedingTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-600">
                <div className="flex items-center gap-1 font-semibold text-slate-800">
                  <Receipt className="w-3.5 h-3.5 text-blue-600" />
                  Factura Comercial:
                </div>
                <span>Se emitirá la factura al 100% ({formatCOP(totalPlan)}) informando el descuento condicionado ({formatCOP(totalSubsidy)}), dejando a pagar {formatCOP(clientExceedingTotal)}.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Operational Mandates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block">Disponibilidad Presupuestal:</span>
              <p className="text-slate-600 text-[11px] mt-0.5">
                La asignación del subsidio está sujeta a la disponibilidad de recursos destinados por Colsubsidio para este beneficio.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block">Naturaleza del Subsidio:</span>
              <p className="text-slate-600 text-[11px] mt-0.5">
                El subsidio no es transferible, canjeable ni redimible en dinero en efectivo bajo ninguna circunstancia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
