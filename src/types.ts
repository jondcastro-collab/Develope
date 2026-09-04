export type ActorId =
  | 'comercial'
  | 'afiliaciones'
  | 'area_medica'
  | 'facturacion_mp'
  | 'colsanitas'
  | 'colsubsidio'
  | 'cliente'
  | 'trabajador';

export type ActivityTag =
  | 'ACTIVIDAD'
  | 'DECISIÓN'
  | 'DOCUMENTO / SOPORTE'
  | 'SALIDA'
  | 'CONDICIÓN ESPECIAL'
  | 'ANS'
  | 'RESPONSABLE';

export interface ProcessActivity {
  id: string;
  title: string;
  description?: string;
  actor: ActorId;
  actorLabel: string;
  tag: ActivityTag;
  details?: string[];
  isPending?: boolean;
  ans?: string;
  soportes?: string[];
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  numericIndex: number;
  name: string;
  shortName: string;
  subtitle: string;
  objective: string;
  responsiblePrimary: string;
  responsibleActor: ActorId;
  actorsInvolved: ActorId[];
  ans: string;
  activities: ProcessActivity[];
  inputs: string[];
  outputs: string[];
  decisions: string[];
  specialConditions: string[];
  connectionToNext: string;
  futureNotes?: string[];
}

export interface ActorInfo {
  id: ActorId;
  name: string;
  shortName: string;
  category: 'Interno MP / Colsanitas' | 'Colsubsidio' | 'Cliente / Usuario';
  description: string;
  colorClass: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    glow: string;
    solidBg: string;
  };
  icon: string;
  keyResponsibilities: string[];
}

export interface ScheduleItem {
  id: string;
  order: number;
  title: string;
  timing: string;
  ans: string;
  responsible: string;
  actors: ActorId[];
  dependency: string;
  result: string;
  isSpecialCondition?: boolean;
  highlight?: string;
}

export interface OperationalCycleMonth {
  mesFacturar: string;
  grupoContratos: string;
  conPrecuenta: string;
  envioPreCuenta: string;
  validacionPreCuentaColsubsidio: string;
  conciliacionVoBo: string;
  entregaFacturaCliente: string;
  entregaNotaDebitoColsubsidio: string;
  pagoFacturaColsubsidio: string;
  pagoFacturaClienteDescuento: string;
  pagoSubsidioColsubsidio: string;
}

export interface ApprovalChainStep {
  id: string;
  stepNumber: string;
  name: string;
  responsible: string;
  actor: ActorId;
  objective: string;
  ans: string;
  output: string;
  is60DayCritical?: boolean;
  avalRequirement?: string;
}
