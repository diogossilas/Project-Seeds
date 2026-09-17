import React, { useState } from 'react';
import { 
  Globe2, 
  Map as MapIcon, 
  Compass, 
  Layers, 
  Radio, 
  Sprout, 
  Filter, 
  ArrowRight,
  Sparkles,
  Shield,
  Eye,
  Activity
} from 'lucide-react';
import { GLOBAL_PROGRAMS_DATA, GLOBAL_ARCHIVE_HEADER } from '../../data/globalSeedsData';
import { GlobalProgramData } from '../../types/globalSeeds';
import { MapEraMode } from '../../types/tacticalMap';
import { WorldAtlasCanvasSVG } from './WorldAtlasCanvasSVG';
import { ContinentalDossierCard } from './ContinentalDossierCard';
import { MapOverview } from '../MapOverview';
import { TEAMS_DATA } from '../../data/sevenSeedsData';
import { TeamData } from '../../types';
import { audioService } from '../../services/audioService';

interface GlobalAtlasMapProps {
  onSelectTeam: (team: TeamData) => void;
  selectedTeam: TeamData | null;
  onNavigateToTab: (tab: 'table' | 'telemetry' | '3d' | 'patterns') => void;
}

export const GlobalAtlasMap: React.FC<GlobalAtlasMapProps> = ({
  onSelectTeam,
  selectedTeam,
  onNavigateToTab,
}) => {
  const [viewScope, setViewScope] = useState<'global' | 'japan'>('global');
  const [mapEra, setMapEra] = useState<MapEraMode>('post_impact');
  const [selectedProgram, setSelectedProgram] = useState<GlobalProgramData>(GLOBAL_PROGRAMS_DATA[0]);
  const [showBiomeOverlay, setShowBiomeOverlay] = useState(true);
  const [showTransoceanicVectors, setShowTransoceanicVectors] = useState(true);
  const [filterBiome, setFilterBiome] = useState<string>('all');

  const handleScopeChange = (scope: 'global' | 'japan') => {
    audioService.playPhaseTransition();
    setViewScope(scope);
  };

  const biomes = [
    { id: 'all', label: 'Todos os Biomas' },
    { id: 'savanna_marine', label: 'Savana Boreal / Mar Central' },
    { id: 'tropical_archipelago', label: 'Arquipélago Tropical' },
    { id: 'predatory_superforest', label: 'Superfloresta Predatória' },
    { id: 'thawed_tundra', label: 'Tundra Descongelada' },
    { id: 'dense_black_forest', label: 'Floresta Negra' },
    { id: 'cyclonic_steppe', label: 'Mega-Estepes' },
    { id: 'hyperborean_taiga', label: 'Taiga Hiperbórea' },
    { id: 'mega_monsoon', label: 'Mega-Monções' },
    { id: 'stone_bamboo', label: 'Bambu Pétreo' },
    { id: 'sterile_vacuum', label: 'Vácuo Lunar' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Tactical Briefing & Theater Switch */}
      <div className="rounded-2xl bg-[#0d1422] border border-slate-800 p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-code font-bold flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" />
                <span>ATLAS PLANETÁRIO DO PROTOCOLO SEEDS</span>
              </span>
              <span className="text-xs font-mono-code text-slate-400 hidden sm:inline">
                ARQUIVO AKÁSHICO CLASSE ÔMEGA • METATRON
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white mt-1">
              {viewScope === 'global' 
                ? 'Distribuição Planetária, Biomas de Ruptura & Frentes Continentais'
                : 'Teatro Regional de Operações: Arquipélago Japonês (7 Seeds COP)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              {viewScope === 'global'
                ? 'Mapeamento holístico dos 10 programas continentais e da frente extraterrestre lunar instituídos pelo protocolo de sobrevivência após o meteoro do Holoceno.'
                : 'Detalhamento operacional das 5 frentes sazonais japonesas (Inverno, Primavera, Verão A/B, Outono), abrigo civil de Ryūgū e polo de convergência de Sado.'}
            </p>
          </div>

          {/* Scope Toggle: Global Atlas vs Japan Archipelago Theater */}
          <div className="flex items-center gap-1.5 bg-[#080d16] p-1.5 rounded-xl border border-slate-700/80 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => handleScopeChange('global')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer ${
                viewScope === 'global'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>ATLAS PLANETÁRIO</span>
            </button>

            <button
              onClick={() => handleScopeChange('japan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer ${
                viewScope === 'japan'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>TEATRO JAPÃO (7 SEEDS)</span>
            </button>
          </div>
        </div>

        {/* Global Key Metrics Bar */}
        {viewScope === 'global' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-4 pt-4 border-t border-slate-800">
            <div className="bg-[#090d16] border border-slate-700/80 rounded-lg p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Programas Globais</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-emerald-400">11 Frentes</div>
              <div className="text-[10px] text-emerald-300 font-sans mt-0.5">10 Continentais + 1 Lunar</div>
            </div>

            <div className="bg-[#090d16] border border-slate-700/80 rounded-lg p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Falência de IAs</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-rose-400">100% Queda</div>
              <div className="text-[10px] text-rose-300 font-sans mt-0.5">Desativação / Eutanásia</div>
            </div>

            <div className="bg-[#090d16] border border-slate-700/80 rounded-lg p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Saber Tradicional</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-cyan-400">92.4% Índice</div>
              <div className="text-[10px] text-cyan-300 font-sans mt-0.5">Fator de Regeneração</div>
            </div>

            <div className="bg-[#090d16] border border-slate-700/80 rounded-lg p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Modelo Político</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-amber-400">Clãs &amp; Tribos</div>
              <div className="text-[10px] text-amber-300 font-sans mt-0.5">Descentralização Total</div>
            </div>
          </div>
        )}
      </div>

      {/* RENDER VIEW: Either Global World Map or Japanese COP Theater */}
      {viewScope === 'japan' ? (
        <MapOverview
          selectedTeam={selectedTeam}
          onSelectTeam={onSelectTeam}
          onNavigateToTab={(tab) => onNavigateToTab(tab as any)}
        />
      ) : (
        <div className="space-y-6">
          {/* Quick Filters Bar */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 uppercase text-[11px] font-bold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-emerald-400" />
                Filtrar Bioma:
              </span>
              <select
                value={filterBiome}
                onChange={(e) => setFilterBiome(e.target.value)}
                className="bg-[#070b14] text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-emerald-500"
              >
                {biomes.map((b) => (
                  <option key={b.id} value={b.id}>{b.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={showBiomeOverlay}
                  onChange={(e) => setShowBiomeOverlay(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>Biomas de Ruptura</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={showTransoceanicVectors}
                  onChange={(e) => setShowTransoceanicVectors(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Vetores Transoceânicos</span>
              </label>
            </div>
          </div>

          {/* World Canvas Map with Pre and Post Impact Eras */}
          <WorldAtlasCanvasSVG
            selectedProgram={selectedProgram}
            onSelectProgram={(program) => setSelectedProgram(program)}
            showBiomeOverlay={showBiomeOverlay}
            showTransoceanicVectors={showTransoceanicVectors}
            filterBiome={filterBiome}
            initialEra={mapEra}
          />

          {/* Quick Program Selector Chips (Row of Continental Buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-[11px] font-mono-code text-slate-400 uppercase shrink-0">
              Frentes:
            </span>
            {GLOBAL_PROGRAMS_DATA.map((prog) => {
              const isSelected = selectedProgram?.id === prog.id;
              return (
                <button
                  key={prog.id}
                  onClick={() => {
                    audioService.playNodeSelect();
                    setSelectedProgram(prog);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-code whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-800 text-white border-emerald-500 font-bold shadow-md'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                  }`}
                  style={{
                    borderColor: isSelected ? prog.color : undefined,
                  }}
                >
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: prog.color }}
                  />
                  <span>{prog.regionShort}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Continental Dossier Card of Selected Program */}
          {selectedProgram && (
            <ContinentalDossierCard
              program={selectedProgram}
              onNavigateToTable={() => onNavigateToTab('table')}
              onNavigateTo3D={() => onNavigateToTab('3d')}
            />
          )}
        </div>
      )}
    </div>
  );
};
