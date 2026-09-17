export interface FailedSeedInvestigation {
  id: string;
  name: string;
  category: 'japan_shelter' | 'seasonal_team' | 'extraterrestrial_front' | 'eugenic_facility' | 'global_front';
  teamId?: string;
  region: string;
  status: string;
  totalPopulation: number;
  survivorsCount: number;
  survivalRate: number; // percentage
  primaryCauseCategory: string;
  estimatedTimeOfDeath: string;
  summary: string;
  probabilityFactors: {
    geographyTectonicsPct: number;
    marineHydrodynamicsPct: number;
    foodTrophicCollapsePct: number;
    psychologicalSocietalPct: number;
    aiAutonomousFailurePct: number;
  };
  geographicalCauses: {
    title: string;
    description: string;
    impactFactor: string;
    geologicalNotes: string;
  };
  marineCauses: {
    title: string;
    description: string;
    impactFactor: string;
    hydrologicalNotes: string;
  };
  foodAndTrophicCauses: {
    title: string;
    description: string;
    impactFactor: string;
    trophicNotes: string;
  };
  psychologicalCauses: {
    title: string;
    description: string;
    impactFactor: string;
    psychNotes: string;
  };
  forensicHypothesis: string;
  speculativeDataPoints: Array<{
    label: string;
    value: string;
  }>;
}
