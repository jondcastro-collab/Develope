import React, { useState } from 'react';
import {
  Briefcase,
  UserCheck,
  Stethoscope,
  Receipt,
  Shield,
  Building2,
  Building,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ACTORS_DATA, PROCESS_STEPS } from '../data/processData';
import { ActorId, ActorInfo } from '../types';

interface ActorsMapViewProps {
  onNavigateToStepWithFilter?: (actorId: ActorId) => void;
}

export const ActorsMapView: React.FC<ActorsMapViewProps> = ({
  onNavigateToStepWithFilter,
}) => {
  const [selectedActorId, setSelectedActorId] = useState<ActorId>('comercial');

  const selectedActor = ACTORS_DATA[selectedActorId];

  // Find all activities across all steps involving this actor
  const relatedActivities = PROCESS_STEPS.flatMap((step) =>
    step.activities
      .filter((act) => act.actor === selectedActorId || step.actorsInvolved.includes(selectedActorId))
      .map((act) => ({
        ...act,
        stepNumber: step.stepNumber,
        stepName: step.name,
        stepId: step.id,
      }))
  );

  const getActorIcon = (id: ActorId) => {
    switch (id) {
      case 'comercial':
        return Briefcase;
      case 'afiliaciones':
        return UserCheck;
      case 'area_medica':
        return Stethoscope;
      case 'facturacion_mp':
        return Receipt;
      case 'colsanitas':
        return Shield;
      case 'colsubsidio':
        return Building2;
      case 'cliente':
        return Building;
      case 'trabajador':
        return Users;
      default:
        return Users;
    }
  };

  const actorList = Object.values(ACTORS_DATA);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Users className="w-3.5 h-3.5" />
              Matriz de Roles y Responsabilidades
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Mapa de Actores &bull; Alianza Colsubsidio – Salud Activa
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Explora los 8 actores clave del ecosistema operativo. Selecciona cualquier actor para inspeccionar sus responsabilidades y ver todas las actividades en las que participa.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 text-right">
            <span className="text-xs text-slate-400 font-bold uppercase block">
              Ecosistema Operativo
            </span>
            <span className="text-2xl font-black text-teal-300">8 Actores</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Internos, Aliados y Clientes
            </span>
          </div>
        </div>
      </div>

      {/* Actors Cards Grid (8 actors) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {actorList.map((actor) => {
          const IconComp = getActorIcon(actor.id);
          const isSelected = selectedActorId === actor.id;

          return (
            <button
              key={actor.id}
              type="button"
              onClick={() => setSelectedActorId(actor.id)}
              className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/80 border-blue-900 shadow-md ring-2 ring-blue-600/20 scale-[1.02]'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                )}
              </div>

              <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                {actor.shortName}
              </h4>
              <span className="text-[10px] font-semibold text-slate-500 block mt-0.5 truncate">
                {actor.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Actor Deep Inspection */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-start gap-4">
            {React.createElement(getActorIcon(selectedActor.id), {
              className: 'w-10 h-10 text-blue-900 shrink-0 mt-1',
            })}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                  {selectedActor.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {relatedActivities.length} actividades vinculadas
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {selectedActor.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {selectedActor.description}
              </p>
            </div>
          </div>

          {onNavigateToStepWithFilter && (
            <button
              type="button"
              onClick={() => onNavigateToStepWithFilter(selectedActor.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-xs"
            >
              <span>Ver en la Ruta de Proceso</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
            </button>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Key Responsibilities list */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Responsabilidades Principales en el Modelo:
            </span>
            <div className="space-y-2">
              {selectedActor.keyResponsibilities.map((resp, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities where this actor participates */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Participación Directa en la Ruta Operativa:
            </span>
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {relatedActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-2xs text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.2 bg-blue-50 text-blue-900 rounded">
                      Etapa {act.stepNumber} &bull; {act.stepName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {act.tag}
                    </span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">
                    {act.title}
                  </div>
                  {act.description && (
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {act.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
