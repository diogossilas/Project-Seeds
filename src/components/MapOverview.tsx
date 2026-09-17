import React, { useState } from 'react';
import { Compass, BarChart3, Map as MapIcon, Grid } from 'lucide-react';
import { TEAMS_DATA } from '../data/sevenSeedsData';
import { TeamData } from '../types';
import { MapCanvasSVG } from './map/MapCanvasSVG';
import { MapLayerControls, MapLayerMode } from './map/MapLayerControls';
import { TeamDossierCard } from './map/TeamDossierCard';
import { HeroOperationalChart } from './map/HeroOperationalChart';
import { audioService } from '../services/audioService';

interface MapOverviewProps {
  onSelectTeam: (team: TeamData) => void;
  selectedTeam: TeamData | null;
  onNavigateToTab: (tab: 'table' | 'telemetry' | '3d' | 'succession') => void;
}

type LayoutFocusMode = 'all' | 'hero-chart' | 'tactical-map';

export const MapOverview: React.FC<MapOverviewProps> = ({
  onSelectTeam,
  selectedTeam,
  onNavigateToTab,
}) => {
  const [activeLayer, setActiveLayer] = useState<MapLayerMode>('all');
  const [hoveredTeam, setHoveredTeam] = useState<TeamData | null>(null);
  const [layoutMode, setLayoutMode] = useState<LayoutFocusMode>('all');

  const currentDisplayTeam = hoveredTeam || selectedTeam || TEAMS_DATA[0];

  const handleLayoutChange = (mode: LayoutFocusMode) => {
    audioService.playNodeSelect();
    setLayoutMode(mode);
  };

  return (
    <div className="space-y-6">
      {/* Tactical Executive COP Header Bar */}
      <div className="bg-[#050b14] border border-[#1e293b] p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-code font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>MAPA OPERACIONAL DE SITUAÇÃO (COP)</span>
              </span>
              <span className="text-xs font-mono-code text-slate-400 hidden sm:inline">
                ARQUIPÉLAGO JAPONÊS • VETORES DE CONVERGÊNCIA
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white mt-1">
              Disposição Territorial das Forças &amp; Eixo de Convergência
            </h2>
          </div>

          {/* 4 Instant Visual KPI Blocks - Mobile Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="bg-[#010613] border border-[#1e293b] p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Efetivo Ativo</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-emerald-400">29 Vidas</div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-300 font-semibold font-sans">
                <span className="w-1.5 h-1.5 bg-emerald-400" />
                100% Unificado
              </div>
            </div>

            <div className="bg-[#010613] border border-[#1e293b] p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Ponto de Convergência</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-cyan-400">Ilha de Sado</div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-cyan-300 font-semibold font-sans">
                <span className="w-1.5 h-1.5 bg-cyan-400" />
                8ª Arca Fuji (QG)
              </div>
            </div>

            <div className="bg-[#010613] border border-[#1e293b] p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Frentes Mapeadas</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-slate-100">7 Setores</div>
              <div className="text-[10px] text-slate-400 mt-1 font-sans">
                5 Frentes + Ryūgū + QG
              </div>
            </div>

            <div className="bg-[#010613] border border-[#1e293b] p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Status Geral</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-amber-400">Estável</div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-300 font-semibold font-sans">
                <span className="w-1.5 h-1.5 bg-amber-400" />
                Ordem Estabelecida
              </div>
            </div>
          </div>
        </div>

        {/* Quick Unit Selector Chips & Layout Toggles */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-mono-code text-slate-400 uppercase mr-1 whitespace-nowrap">
              Frentes:
            </span>
            {TEAMS_DATA.map((team) => {
              const isSelected = currentDisplayTeam.id === team.id;
              const code = 
                team.id === 'inverno' ? 'INV' :
                team.id === 'primavera' ? 'PRI' :
                team.id === 'verao-a' ? 'VR-A' :
                team.id === 'verao-b' ? 'VR-B' :
                team.id === 'outono' ? 'OUT' :
                team.id === 'ryugu' ? 'RYU' : 'QG SADO';

              return (
                <button
                  key={team.id}
                  id={`chip-select-${team.id}`}
                  onClick={() => onSelectTeam(team)}
                  className={`px-2.5 py-1 text-xs font-mono-code flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#1e293b] text-white font-bold border-emerald-400 shadow-sm'
                      : 'bg-[#010613]/60 text-slate-300 hover:text-white hover:bg-[#1e293b] border-[#1e293b]/60'
                  }`}
                >
                  <span 
                    className="w-2 h-2" 
                    style={{ backgroundColor: team.color }} 
                  />
                  <span className="font-bold">[{code}]</span>
                  <span className="hidden md:inline font-sans">{team.name}</span>
                </button>
              );
            })}
          </div>

          {/* Commander Layout Mode Selector */}
          <div className="flex items-center gap-1 self-end md:self-auto bg-[#010613] border border-[#1e293b] p-1">
            <button
              onClick={() => handleLayoutChange('all')}
              title="Visualização Completa Integrada"
              className={`px-2.5 py-1 text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer border ${
                layoutMode === 'all'
                  ? 'bg-slate-700 text-white font-bold border-[#334155]'
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Visão Integrada</span>
            </button>

            <button
              onClick={() => handleLayoutChange('hero-chart')}
              title="Focar no Gráfico Hero Estratégico"
              className={`px-2.5 py-1 text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer border ${
                layoutMode === 'hero-chart'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border-cyan-500/40'
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Foco Gráfico</span>
            </button>

            <button
              onClick={() => handleLayoutChange('tactical-map')}
              title="Focar no Mapa Tático e Dossiê"
              className={`px-2.5 py-1 text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer border ${
                layoutMode === 'tactical-map'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/40'
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Foco Mapa</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* HERO SECTION: HERO OPERATIONAL CHART (PÁGINA INICIAL) */}
      {/* ============================================================ */}
      {(layoutMode === 'all' || layoutMode === 'hero-chart') && (
        <div id="hero-chart-section">
          <HeroOperationalChart
            selectedTeam={selectedTeam}
            onSelectTeam={onSelectTeam}
            isExpanded={layoutMode === 'hero-chart'}
            onToggleExpand={() => handleLayoutChange(layoutMode === 'hero-chart' ? 'all' : 'hero-chart')}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* TACTICAL CARTOGRAPHIC MAP & EXECUTIVE DOSSIER */}
      {/* ============================================================ */}
      {(layoutMode === 'all' || layoutMode === 'tactical-map') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left / Center: Interactive SVG Map with Full Zoom System (7 cols) */}
          <div className={`${
            layoutMode === 'tactical-map' ? 'lg:col-span-8' : 'lg:col-span-7'
          } bg-[#050b14] border border-[#1e293b] p-4 sm:p-5 relative overflow-hidden shadow-xl flex flex-col`}>
            <MapLayerControls 
              activeLayer={activeLayer}
              onSelectLayer={setActiveLayer}
            />
            <MapCanvasSVG 
              activeLayer={activeLayer}
              selectedTeam={selectedTeam}
              hoveredTeam={hoveredTeam}
              onSelectTeam={onSelectTeam}
              onHoverTeam={setHoveredTeam}
            />
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-400 font-mono-code">
              <span>Use os controles (+ / - / roda do mouse / arraste) para navegar pelo mapa.</span>
              <span className="text-emerald-400 font-semibold font-sans">Teatro de Operações • Sado</span>
            </div>
          </div>

          {/* Right: Selected Node Dossiê / Inspection (5 cols) */}
          <div className={`${
            layoutMode === 'tactical-map' ? 'lg:col-span-4' : 'lg:col-span-5'
          } flex flex-col`}>
            <TeamDossierCard 
              team={currentDisplayTeam}
              onNavigateToTab={onNavigateToTab}
            />
          </div>
        </div>
      )}
    </div>
  );
};
