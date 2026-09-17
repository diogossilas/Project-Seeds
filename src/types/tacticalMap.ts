export type MapEraMode = 'pre_impact' | 'post_impact' | 'comparison_slider';
export type MapDisplayRatio = 'ratio_2_3' | 'adaptive' | 'ratio_1_1';
export type MapSphereMode = 'terrestrial' | 'cislunar';

export type TacticalTargetCategory = 
  | 'etr'          // Elementos de Terras Raras (Neodímio, Praseodímio, Disprósio)
  | 'h2o'          // Grandes Aquíferos Continentais
  | 'sovereign'    // Países Soberanos e Capitais Globais
  | 'seeds_shelter'// Bunkers e Centros de Construção do Projeto Seeds
  | 'uc_base'      // Instalações Militares da Esfera U.C. (Jaburo, etc.)
  | 'orbital';     // Colônias Espaciais (Sides 1-7, L1-L5, Selene, Asteroides)

export interface TacticalAsset {
  id: string;
  name: string;
  category: TacticalTargetCategory;
  categoryLabel: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
    // Normalized 0-1000 X and 0-1500 Y in 1080x1620 tactical canvas
    canvasX: number;
    canvasY: number;
  };
  metrics: {
    labelA: string;
    valueA: string;
    labelB: string;
    valueB: string;
    reserveGrade?: string;
  };
  description: string;
  strategicImportance: string;
  color: string;
  era: 'pre' | 'post' | 'both';
  isSpaceAsset?: boolean;
}

export interface CislunarAsset {
  id: string;
  name: string;
  type: 'colony_side' | 'lagrange_point' | 'asteroid_fortress' | 'lunar_city' | 'seeds_station';
  locationLabel: string;
  orbitAngleDeg: number;
  distanceKm: number;
  status: string;
  population: string;
  description: string;
  color: string;
  canvasX: number;
  canvasY: number;
}
