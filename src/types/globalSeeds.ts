import { Spatial3DCoordinates } from './team';

export type BiomeCategory = 
  | 'savanna_marine'
  | 'tropical_archipelago'
  | 'predatory_superforest'
  | 'thawed_tundra'
  | 'dense_black_forest'
  | 'cyclonic_steppe'
  | 'hyperborean_taiga'
  | 'mega_monsoon'
  | 'stone_bamboo'
  | 'sterile_vacuum'
  | 'insular_volcanic';

export type ProgramStatusLevel = 
  | 'prosperous' 
  | 'active' 
  | 'symbiotic' 
  | 'nomadic' 
  | 'isolated' 
  | 'critical';

export interface GlobalProgramData {
  id: string;
  region: string;
  regionShort: string;
  programName: string;
  codename: string;
  shelterEngineering: string;
  selectionCriteria: string;
  populationProfile: string[];
  biomeReconfiguration: string;
  biomeShortName: string;
  biomeCategory: BiomeCategory;
  criticalRupture: string;
  currentStatus: string;
  statusLevel: ProgramStatusLevel;
  statusLabel: string;
  coordinates: {
    lat: number;
    lng: number;
    x: number; // 0-100 on world projection SVG
    y: number; // 0-100 on world projection SVG
    locationName: string;
  };
  spatial3D: Spatial3DCoordinates;
  aiAutonomy: {
    systemName: string;
    collapsed: boolean;
    incident: string;
  };
  traditionalKnowledge: {
    domain: string;
    factor: string;
    effectivenessRating: number; // 0-100
  };
  socialOrganization: string;
  estimatedSurvivors: string;
  transoceanicConnection: string;
  color: string;
  accentColor: string;
  keySpecialties: string[];
}

export interface UniversalEcologicalLaw {
  number: number;
  title: string;
  subtitle: string;
  thesis: string;
  keyCases: {
    location: string;
    caseStudy: string;
    outcome: string;
  }[];
  philosophicalConclusion: string;
  metricComparison: {
    labelA: string;
    valueA: number;
    labelB: string;
    valueB: number;
  };
}
