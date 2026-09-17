export interface ContinuumPhase {
  phaseNumber: number;
  romanId: string;
  title: string;
  subtitle: string;
  description: string;
  events: string[];
  status: 'Concluído' | 'Crítico' | 'Emancipado';
  historicalShift: string;
  timeframe: string;
}

export interface SuccessionStage {
  stage: number;
  name: string;
  subhead: string;
  description: string;
  actors: string;
  archetype: string;
  color: string;
}

export interface MetadataArchive {
  classification: string;
  compiler: string;
  source: string;
  totalSeedsCount: number;
  activeUnitsCount: number;
  historicalStatus: string;
  title?: string;
  subtitle?: string;
  author?: string;
  totalTeams?: number;
  sadoUnificationConfirmed?: boolean;
  timestamp?: string;
}
