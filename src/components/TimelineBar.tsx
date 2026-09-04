import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Handshake,
  Briefcase,
  UserCheck,
  ArrowLeftRight,
  Receipt,
  CreditCard,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { ProcessStep } from '../types';

interface TimelineBarProps {
  steps: ProcessStep[];
  selectedStepId: string;
  onSelectStep: (stepId: string) => void;
  filteredStepIds?: string[];
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  steps,
  selectedStepId,
  onSelectStep,
  filteredStepIds,
}) => {
  const currentIndex = steps.findIndex((s) => s.id === selectedStepId);
  const currentStep = steps[currentIndex] || steps[0];

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectStep(steps[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      onSelectStep(steps[currentIndex + 1].id);
    }
  };

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'preafiliacion':
        return Handshake;
      case 'comercial':
        return Briefcase;
      case 'afiliaciones':
        return UserCheck;
      case 'conciliacion':
        return ArrowLeftRight;
      case 'facturacion':
        return Receipt;
      case 'pago_cliente':
        return CreditCard;
      case 'cierre_recaudo':
        return CheckCircle2;
      default:
        return CheckCircle2;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs mb-6">
      {/* Top Header & Progress Segment */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-blue-900 text-white font-extrabold text-xs rounded-lg shadow-xs tracking-wider">
            {currentStep.stepNumber === '00'
              ? 'Paso 0 • Pre-afiliación'
              : `Etapa ${currentStep.stepNumber} de 06`}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
              {currentStep.stepNumber === '00' ? 'Paso 0: ' : `${currentStep.stepNumber}. `}{currentStep.name}
            </h2>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {currentStep.subtitle}
            </p>
          </div>
        </div>

        {/* Sequential Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentIndex === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-2xs hover:text-slate-900 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === steps.length - 1}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentIndex === steps.length - 1
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-900 text-white hover:bg-blue-800 shadow-xs cursor-pointer'
            }`}
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar Connector 00 ━━━ 01 ━━━ 02 ━━━ 03 ━━━ 04 ━━━ 05 ━━━ 06 */}
      <div className="relative mb-6 px-2 sm:px-6">
        {/* Background Track line */}
        <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 -z-0 rounded-full" />
        {/* Active Progress fill line */}
        <div
          className="absolute top-5 left-6 h-1 bg-gradient-to-r from-teal-700 via-blue-900 to-emerald-500 -z-0 rounded-full transition-all duration-300"
          style={{
            width: steps.length > 1 ? `calc(${(currentIndex / (steps.length - 1)) * 100}% - 30px)` : '0%',
          }}
        />

        {/* 7 Step Nodes */}
        <div
          className="grid gap-1 relative z-10"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
        >
          {steps.map((step, idx) => {
            const isSelected = step.id === selectedStepId;
            const isCompleted = idx < currentIndex;
            const isFiltered = filteredStepIds && filteredStepIds.length > 0 && !filteredStepIds.includes(step.id);
            const IconComponent = getStepIcon(step.id);

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStep(step.id)}
                className={`group flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${
                  isFiltered ? 'opacity-35 grayscale' : isSelected ? 'opacity-100 scale-105' : 'opacity-80 hover:opacity-100'
                }`}
              >
                {/* Node circle */}
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-extrabold text-xs transition-all duration-200 border-2 ${
                    isSelected
                      ? 'bg-blue-900 text-white border-teal-400 ring-4 ring-teal-500/20 shadow-lg shadow-blue-950/20'
                      : isCompleted
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-slate-600 border-slate-300 group-hover:border-slate-400 shadow-2xs'
                  }`}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Step number and name */}
                <span
                  className={`mt-1.5 text-[10px] sm:text-xs font-bold tracking-tight block ${
                    isSelected
                      ? 'text-blue-950 font-black'
                      : 'text-slate-600 group-hover:text-slate-900'
                  }`}
                >
                  {step.stepNumber}
                </span>
                <span
                  className={`hidden sm:block text-[11px] leading-tight max-w-[85px] truncate ${
                    isSelected ? 'text-blue-900 font-extrabold' : 'text-slate-500 font-medium'
                  }`}
                  title={step.name}
                >
                  {step.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Segmented Timeline indicator pill strip */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        <span className="font-semibold text-slate-700">
          Ruta Operativa: Inicio comercial &rarr; Afiliación &rarr; Conciliación &rarr; Facturación &rarr; Pago &rarr; Cierre
        </span>
        <span className="text-teal-700 font-bold hidden md:inline">
          Haz clic en cualquier etapa para explorar su detalle operativo
        </span>
      </div>
    </div>
  );
};
