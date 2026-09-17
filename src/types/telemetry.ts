import { TeamId } from './team';

export type MetricType = 'cooperation' | 'radiation' | 'biomass';

export interface TimeSeriesPoint {
  phase: string;
  phaseIdx: number;
  inverno: number;
  primavera: number;
  veraoA: number;
  veraoB: number;
  outono: number;
  ryugu: number;
  cooperationRate: number;
  radiationLevel: number;
  bioRegeneration: number;
}

export type StateMachinePhase = 
  | 'CRIOPRESERVAÇÃO' 
  | 'DESPERTAR' 
  | 'FALHA DE COMANDO' 
  | 'TRAUMA/ISOLAMENTO' 
  | 'CISMA' 
  | 'CONVERGÊNCIA SADO' 
  | 'EMANCIPAÇÃO';

export interface DiscreteStateEvent {
  id: string;
  timestamp: string;
  teamId: TeamId;
  teamName: string;
  state: StateMachinePhase;
  color: string;
  summary: string;
  impactScore: number; // 1-10
}

export interface GaugeMetric {
  id: string;
  title: string;
  value: number;
  unit: string;
  target?: string;
  delta?: string;
  status: 'optimal' | 'warning' | 'critical';
  description: string;
}

// ------------------------------------------------------------
// GLOBAL OMEGA TELEMETRY TYPES (RELATÓRIO TRANSVERSAL METATRON)
// ------------------------------------------------------------

export interface GlobalFacilityVulnerability {
  facility: string;
  region: string;
  country: string;
  altitudeMeters: number;
  automationLevel: number; // 0-10
  bioInfiltrationRate: number; // 0-10
  paranoiaTyrannyIndex: number; // 0-10
  mutantFoodVulnerability: number; // 0-10
  lifeSupportFailure: number; // 0-10
  compositeSeverity: number; // Calculated average
  dominantOutcome: string;
}

export interface SankeyNode {
  id: number;
  label: string;
  layer: 'origem' | 'ruptura' | 'destino';
  color: string;
  description: string;
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
  label?: string;
  evidence: string;
}

export interface RadarDimension {
  key: string;
  label: string;
  description: string;
}

export interface RadarContinentalProfile {
  id: string;
  name: string;
  subhead: string;
  modelType: string;
  color: string;
  fillColor: string;
  metrics: {
    technicalMastery: number; // Domínio Técnico (0-10)
    bioResilience: number; // Resiliência Biológica (0-10)
    socialCohesion: number; // Coesão Social (0-10)
    faunaFloraAdaptation: number; // Adaptação à Fauna/Flora (0-10)
    psychicStability: number; // Estabilidade Psíquica (0-10)
  };
  narrativeSummary: string;
}

export interface AutomationScatterPoint {
  id: string;
  region: string;
  facilityName: string;
  automation: number; // 0-100%
  survival: number; // 0-100% (50 anos)
  altitudeMeters: number;
  governanceType: 'Militar' | 'IA / Tecnocracia' | 'Ancestral / Biocêntrico' | 'Misto';
  status: 'Ativo / Estabilizado' | 'Fragmentado / Nômade' | 'Extinto / Falência';
  color: string;
}

export interface LinearRegressionResult {
  slope: number; // m in y = mx + b
  intercept: number; // b
  rSquared: number; // R²
  correlationCoeff: number; // r
  predict: (x: number) => number;
}

export interface GlobalNetworkNode {
  id: string;
  label: string;
  region: string;
  x: number; // SVG % 0-100
  y: number; // SVG % 0-100
  status: 'survived' | 'collapsed';
  category: 'terrestrial_shelter' | 'lunar_colony' | 'coastal_settlement';
  description: string;
}

export interface GlobalNetworkEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type: 'radio_telemetry' | 'maritime_drift' | 'fluvial_route' | 'acoustic_signal' | 'caravan';
  frequency?: string;
  status: 'active_residual' | 'historical_exchange' | 'faint_beacon';
  description: string;
}

export interface TransversalDiscovery {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  correlationSummary: string;
  empiricalEvidence: string[];
  investigatorNotes: string;
  audioFrequencyHz?: number;
  metricsComparison?: {
    labelA: string;
    valueA: number | string;
    labelB: string;
    valueB: number | string;
    unit: string;
  };
}

