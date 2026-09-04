import React, { useState } from 'react';
import {
  Users,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  FileCheck,
  Zap,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface DecisionRuleModuleProps {
  onSelectedPathChange?: (path: 'masivo' | 'ae') => void;
}

export const DecisionRuleModule: React.FC<DecisionRuleModuleProps> = () => {
  const [userCountOption, setUserCountOption] = useState<'menor' | 'mayor'>('menor');
  const [customCount, setCustomCount] = useState<number>(15);

  const isAE = userCountOption === 'mayor' || customCount >= 20;

  const handleOptionChange = (option: 'menor' | 'mayor') => {
    setUserCountOption(option);
    if (option === 'menor' && customCount >= 20) {
      setCustomCount(15);
    } else if (option === 'mayor' && customCount < 20) {
      setCustomCount(25);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCustomCount(val);
    setUserCountOption(val >= 20 ? 'mayor' : 'menor');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
              Regla de Decisión Operativa
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Radicación de Afiliaciones
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            ¿Cuántos usuarios tiene el colectivo?
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            El canal de procesamiento interno se define estrictamente por el umbral de 20 usuarios.
          </p>
        </div>
        <div className="p-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
      </div>

      {/* Interactive Selection Buttons */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Option 1: ≤ 20 Masivo */}
        <button
          type="button"
          onClick={() => handleOptionChange('menor')}
          className={`relative p-4 rounded-xl text-left border-2 transition-all cursor-pointer ${
            !isAE
              ? 'border-blue-600 bg-blue-50/50 shadow-md shadow-blue-600/10 ring-2 ring-blue-500/20'
              : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-100/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Menor o igual a 20
            </span>
            {!isAE && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                ✓
              </span>
            )}
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-1.5">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Colectivos ≤ 20 usuarios</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">Canal de Radicación:</span>
            <span className="font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
              Canal MASIVO
            </span>
          </div>
        </button>

        {/* Option 2: ≥ 20 AE */}
        <button
          type="button"
          onClick={() => handleOptionChange('mayor')}
          className={`relative p-4 rounded-xl text-left border-2 transition-all cursor-pointer ${
            isAE
              ? 'border-teal-600 bg-teal-50/50 shadow-md shadow-teal-600/10 ring-2 ring-teal-500/20'
              : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-100/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Mayor o igual a 20
            </span>
            {isAE && (
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
                ✓
              </span>
            )}
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-1.5">
            <Users className="w-5 h-5 text-teal-600" />
            <span>Colectivos ≥ 20 usuarios</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">Canal de Radicación:</span>
            <span className="font-black px-2 py-0.5 rounded bg-teal-100 text-teal-900 border border-teal-200">
              Canal AE (Atención Especializada)
            </span>
          </div>
        </button>
      </div>

      {/* Interactive slider for testing volume */}
      <div className="mt-4 bg-slate-50 rounded-xl p-3 border border-slate-200/80">
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
          <span>Probar con número específico de usuarios:</span>
          <span className="font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
            {customCount} usuarios
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={customCount}
          onChange={handleSliderChange}
          className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>1 usuario (Masivo)</span>
          <span className="font-bold text-slate-700">Umbral: 20</span>
          <span>100+ usuarios (AE)</span>
        </div>
      </div>

      {/* Dynamic Visual Route Outcome Card */}
      <div
        className={`mt-4 rounded-xl p-4 border transition-all ${
          isAE
            ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200 text-teal-950'
            : 'bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200 text-blue-950'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
              isAE ? 'bg-teal-600 text-white' : 'bg-blue-600 text-white'
            }`}
          >
            {isAE ? <Zap className="w-5 h-5" /> : <FileCheck className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider">
                {isAE ? 'Ruta Asignada: CANAL AE' : 'Ruta Asignada: CANAL MASIVO'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 font-bold border border-current/20">
                {isAE ? '≥ 20 Usuarios' : '≤ 20 Usuarios'}
              </span>
            </div>
            <p className="text-xs mt-1 text-slate-700 leading-relaxed">
              {isAE
                ? 'El expediente colectivo se gestiona a través de la Célula de Atención Especializada (AE), con gestor dedicado para cargue por lotes, seguimiento preferencial de asegurabilidad y radicación centralizada.'
                : 'El colectivo ingresa por el circuito operativo Masivo estándar con radicación individual/agrupada de formularios y verificación unitaria de soportes.'}
            </p>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 bg-white/90 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-700">
                  Responsable: Postulación y radicación con subsidio
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium text-slate-700">
                  Soporte: Foto validador ($58.363 COP Cat. A y B)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Conditions Footnote */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        <span className="flex items-center gap-1">
          <span className="font-semibold text-slate-700">&bull; Titulares:</span> Se aceptan Titulares usuarios y Titulares no usuarios.
        </span>
        <span className="flex items-center gap-1">
          <span className="font-semibold text-slate-700">&bull; Límite:</span> Máximo 2 usuarios con subsidio por titular.
        </span>
        <span className="flex items-center gap-1 text-emerald-700 font-bold">
          Subsidio: $58.363 COP/mes
        </span>
      </div>
    </div>
  );
};
