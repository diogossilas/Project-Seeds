export type TeamId = 'inverno' | 'primavera' | 'verao-a' | 'verao-b' | 'outono' | 'ryugu' | 'arca-fuji';

export type AnomalySeverity = 'alta' | 'extrema' | 'catastrófica';
export type AnomalyType = 'Fatalidade' | 'Ruptura Psicológica' | 'Contaminação Biológica' | 'Tirania' | 'Insubordinação IA';

export interface AnomalyReport {
  title: string;
  type: AnomalyType;
  severity: AnomalySeverity;
  description: string;
}

export interface Coordinates2D {
  lat: number;
  lng: number;
  x: number; // 0-100 on cartographic map
  y: number; // 0-100 on cartographic map
  locationName: string;
  region: string;
}

export interface Spatial3DCoordinates {
  x: number; // Empatia & Adaptação Orgânica (0 - 100)
  y: number; // Biopoder & Engenharia Estatal (0 - 100)
  z: number; // Sobrevivência & Resiliência Temporal (0 - 100)
}

export interface TeamMetrics {
  resilience: number; // 0-100
  empathy: number; // 0-100
  technicalSkill: number; // 0-100
  cooperationIndex: number; // 0-100
  stateSubjugation: number; // 0-100 (high = dogmatic biopower, low = emancipated)
  survivalRate: number; // 0-100%
}

export interface TeamData {
  id: TeamId;
  name: string;
  kanji: string;
  seasonName: string;
  color: string;
  accentColor: string;
  badgeBg: string;
  coordinates: Coordinates2D;
  primaryStateFunction: string;
  preImpactLeadership: string;
  effectiveLeadership: string;
  criticalRupture: string;
  sadoConvergenceRole: string;
  epilogueDestiny: string;
  keyMembers: string[];
  survivalCount: string;
  isolationYears: number;
  threatLevel: 'Baixo' | 'Moderado' | 'Crítico' | 'Extinto';
  metrics: TeamMetrics;
  spatial3D: Spatial3DCoordinates;
  anomaliesDetected: AnomalyReport[];
}
