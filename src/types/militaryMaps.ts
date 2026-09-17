export type MilitaryMapModelId = 
  | 'mcoo'
  | 'operations'
  | 'trafficability'
  | 'canopy'
  | 'biotic'
  | 'split_compare'
  | 'doctrine_guide';

export type TerrainMobilityClass = 'unrestricted' | 'restricted' | 'severely_restricted';

export type NatoAffiliation = 'friendly' | 'hostile' | 'neutral' | 'unknown';

export interface TacticalCoordinate {
  x: number; // 0-1000 normalized
  y: number; // 0-700 normalized
  mgrs: string; // e.g. "54S UJ 8923 4512"
  elevationMeters: number;
  slopeDeg: number;
}

// 1. MCOO Overlay Features
export interface McooZone {
  id: string;
  name: string;
  mobility: TerrainMobilityClass;
  slopeRange: string;
  vegetationObstacle: string;
  corridorType?: 'mobility_corridor' | 'avenue_of_approach' | 'chokepoint' | 'key_terrain';
  widthKm?: number;
  maxFormation?: string; // "Divisão", "Brigada Mecanizada", "Pelotão a Pé"
  pathD: string;
  center: TacticalCoordinate;
  description: string;
  operationalImpact: {
    attackAdvantage: string;
    groundMovement: string;
    faunaFloraInfluence: string;
  };
}

// 2. Operations Overlay Features
export interface OperationsFeature {
  id: string;
  name: string;
  type: 
    | 'line_of_contact'
    | 'line_of_departure'
    | 'axis_main_effort'
    | 'axis_supporting_effort'
    | 'attack_position'
    | 'objective'
    | 'fscl'
    | 'hide_site'
    | 'restricted_fire_area';
  affiliation: NatoAffiliation;
  pathD?: string;
  points?: { x: number; y: number }[];
  center: TacticalCoordinate;
  unitCode?: string; // e.g. "TF-BRAVO", "1st-ARM", "OBJ-ALPHA"
  description: string;
  combatRules: string;
  fireCoordination: string;
  botanicalConstraint: string;
}

// 3. Soil Trafficability Features
export interface SoilZone {
  id: string;
  name: string;
  soilType: 'Aluvial Fino' | 'Argila Plástica' | 'Rochoso Basáltico' | 'Turfa Orgânica / Húmus' | 'Areia Compactada';
  cbrIndex: number; // California Bearing Ratio % (1-100)
  coneIndex: number; // CI in psi (0-400)
  baseBearingCapacityTon: number; // Max vehicle mass supported dry
  wetBearingCapacityTon: number; // Max vehicle mass supported saturated (Rasputitsa)
  pathD: string;
  center: TacticalCoordinate;
  trafficabilityStatus: 'GO' | 'SLOW-GO' | 'NO-GO';
  bogDownRiskPct: number; // 0-100%
  vegetalMatIntegrity: 'Preservada' | 'Vulnerável' | 'Pântano / Instável';
  suitableUnits: string[];
  operationalAdvisory: string;
}

// 4. Canopy & Concealment Features
export interface CanopyZone {
  id: string;
  name: string;
  canopyClosurePct: number; // 0-100%
  trunkSpacingMeters: number; // Average distance between trees
  botanicalStratum: 'Herbáceo Rasteiro' | 'Arbustivo Médio' | 'Arbóreo Contínuo' | 'Dossel Triplo Pluvial';
  thermalConcealmentRatio: number; // 0.0 - 1.0 against FLIR / IR satellites
  deciduousStatus: 'Perenifólia (Ocultamento Permanente)' | 'Caducifólia (Perda de Folhas Sazonal)' | 'Mista';
  pathD: string;
  center: TacticalCoordinate;
  maxVehicleAccess: 'Sem Acesso (Apenas Forças Especiais / Infantaria)' | 'Veículos Leves 4x4' | 'Livre / Trânsito Aberto';
  droneDetectionProbability: number; // 0-100%
  infilPathAdvantage: string;
}

// 5. Fauna & Biotic Threat Features
export interface BioticZone {
  id: string;
  name: string;
  threatLevel: 'Baixo' | 'Moderado' | 'Severo' | 'Crítico / Letal';
  vectorZoonoses: {
    vector: string; // "Carrapato Amblyomma / Febre Maculosa", "Anopheles / Malária", "Flebotomíneo / Leishmaniose"
    transmissionRiskPct: number;
    prophylaxis: string;
  }[];
  sentinelFauna: {
    species: string; // "Bando de Aves Terrestres de Solo", "Macacos Sentinelas de Ruptura", "Megafauna Territorial"
    acousticAlarmRadiusMeters: number;
    radarScatterSignature: string;
    operationalEffect: string;
  };
  venomousFloraFauna: {
    toxinName: string;
    dnbiCasualtyRateEstimate: string; // Disease & Non-Battle Injuries
    treatmentRequired: string;
  };
  quarantineRequired: boolean;
  medevacSafeLane: boolean;
  pathD: string;
  center: TacticalCoordinate;
  tacticalDirective: string;
}

export interface WargameWaypoint {
  id: string;
  label: string;
  mgrs: string;
  x: number;
  y: number;
  mcooStatus: TerrainMobilityClass;
  trafficStatus: 'GO' | 'SLOW-GO' | 'NO-GO';
  canopyConcealment: number; // %
  droneRisk: number; // %
  bioticThreat: 'Baixo' | 'Moderado' | 'Severo' | 'Crítico / Letal';
}

export interface RouteEvaluationResult {
  totalDistanceKm: number;
  overallFeasibilityPct: number;
  bottlenecksFound: number;
  rasputitsaBogRiskPct: number;
  thermalDetectionExposureSec: number;
  sentinelAcousticAlertRiskPct: number;
  recommendedEchelon: string;
  safetyScore: number;
}
