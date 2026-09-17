export type LivingLineStage = 'stage_1_envelope' | 'stage_2_promontories' | 'stage_3_living_line' | 'stage_4_military_seeds';

export interface LivingLineStageInfo {
  stage: LivingLineStage;
  stageNumber: number;
  title: string;
  subtitle: string;
  pedagogicalLesson: string;
  visualCharacteristics: string[];
  drawingAdviceForChildren: string;
  militarySignificance: string;
}

export type GlobalChokepointType = 'maritime_strait' | 'land_isthmus' | 'oceanic_passage' | 'polar_corridor' | 'orbital_gateway';

export interface GlobalMilitaryChokepoint {
  id: string;
  name: string;
  internationalCode: string;
  type: GlobalChokepointType;
  x: number; // 0-1000 SVG coordinates
  y: number; // 0-562.5 SVG coordinates
  latLong: string;
  mgrsGrid: string;
  strategicImportance: 'Crítica / Vital' | 'Alta Prioridade' | 'Moderada';
  widthKm: number;
  depthMeters?: number;
  controllingFaction: string;
  threatLevel: 'Baixo' | 'Moderado' | 'Elevado' | 'Hostil / Disputado';
  description: string;
  tacticalDoctrine: {
    navalAccess: string;
    landManoeuvre: string;
    airInterdiction: string;
    seedsLogistics: string;
  };
  recommendedTroopForce: string;
}

export interface GlobalMilitaryGarrison {
  id: string;
  programId: string;
  name: string;
  echelon: string;
  commander: string;
  locationName: string;
  x: number;
  y: number;
  readinessPct: number;
  activeTroops: number;
  mechanizedVehicles: number;
  airDefenseNetwork: string;
  primaryMission: string;
  fortificationLevel: 'Búnquer de Alta Resistência' | 'Cúpula Geotérmica' | 'Fortaleza Subterrânea' | 'Base Modular Lunar';
  strategicRole: string;
  color: string;
}

export interface GlobalThreatTheater {
  id: string;
  name: string;
  category: 'hostile_automatons' | 'predatory_biomass' | 'megatsunami_fracture' | 'radiation_anomaly';
  severity: 'Extrema' | 'Crítica' | 'Moderada';
  center: { x: number; y: number };
  radius: number;
  dangerRadiusKm: number;
  description: string;
  combatDirective: string;
}

export interface GlobalStrategicCorridor {
  id: string;
  name: string;
  color: string;
  pathD: string;
  fromName: string;
  toName: string;
  type: 'supply_air_bridge' | 'naval_convoy' | 'transcontinental_land_axis';
  transitSecurity: 'Seguro' | 'Sob Escolta Contínua' | 'Zona de Alto Risco';
  capacityTonDay: number;
}
