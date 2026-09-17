import React, { useState } from 'react';
import { 
  MilitaryMapModelId, 
  WargameWaypoint 
} from '../../types/militaryMaps';
import { 
  FIVE_CORE_MODELS_SUMMARY, 
  WARGAME_ROUTE_PRESETS 
} from '../../data/militaryMapsData';
import { MilitaryMapCanvasSVG } from './MilitaryMapCanvasSVG';
import { MilitaryMapInspector } from './MilitaryMapInspector';
import { MilitaryWargamePanel } from './MilitaryWargamePanel';
import { MilitaryDoctrineGuide } from './MilitaryDoctrineGuide';
import { GlobalMilitaryWorldMap } from './GlobalMilitaryWorldMap';
import { 
  Shield, 
  Crosshair, 
  Layers, 
  Compass, 
  Droplets, 
  Trees, 
  Bug, 
  Flame, 
  Radio, 
  Eye, 
  BookOpen, 
  Split,
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Activity,
  Globe,
  PenTool
} from 'lucide-react';
import { audioService } from '../../services/audioService';

export const MilitaryMapSuite: React.FC = () => {
  const [theaterScope, setTheaterScope] = useState<'regional_5models' | 'global_world_theater' | 'doctrine_guide'>('regional_5models');
  const [activeModel, setActiveModel] = useState<MilitaryMapModelId>('mcoo');
  const [secondaryModelForSplit, setSecondaryModelForSplit] = useState<MilitaryMapModelId>('operations');
  const [weatherRainPct, setWeatherRainPct] = useState<number>(10);
  const [flirScanActive, setFlirScanActive] = useState<boolean>(false);
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [showRangeRings, setShowRangeRings] = useState<boolean>(true);
  const [splitRatio, setSplitRatio] = useState<number>(50);

  const [hoveredFeature, setHoveredFeature] = useState<{ type: string; data: any } | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<{ type: string; data: any } | null>(null);

  const [isWargameOpen, setIsWargameOpen] = useState<boolean>(false);
  const [selectedRoutePresetId, setSelectedRoutePresetId] = useState<string>('route-armored-spearhead');

  const currentRoutePreset = WARGAME_ROUTE_PRESETS.find((p) => p.id === selectedRoutePresetId) || WARGAME_ROUTE_PRESETS[0];

  const handleScopeChange = (scope: 'regional_5models' | 'global_world_theater' | 'doctrine_guide') => {
    audioService.playPhaseTransition();
    setTheaterScope(scope);
    setSelectedFeature(null);
  };

  const handleModelChange = (modelId: MilitaryMapModelId) => {
    audioService.playPhaseTransition();
    setActiveModel(modelId);
    setSelectedFeature(null);
  };

  const handleToggleFlirScan = () => {
    audioService.playNodeSelect();
    setFlirScanActive((prev) => !prev);
  };

  return (
    <div className="space-y-6">
      {/* Top Military Command Bar */}
      <div className="bg-[#050b14] border border-[#1e293b] p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-code font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>SUÍTE DE CARTOGRAFIA TÁTICA &bull; 5 MODELOS 2D IPB &bull; TEATRO GLOBAL</span>
              </span>
              <span className="text-xs font-mono-code text-slate-400 hidden sm:inline">
                DOUTINA OTAN APP-6 &bull; MIL-STD-2525 &bull; PEDAGOGIA DA LINHA VIVA
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white mt-1">
              {theaterScope === 'global_world_theater'
                ? 'Teatro Estratégico Global: Análise Militar do Mundo & Gargantas Chokepoints'
                : theaterScope === 'doctrine_guide'
                ? 'Manual Doutrinário: Aprendizado, Leitura de Cores & Simbologias 2D'
                : 'Centro de Inteligência Geoespacial & Telemetria Tática Regional'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl font-sans leading-relaxed">
              {theaterScope === 'global_world_theater'
                ? 'Mapeamento das 10 gargantas navais e terrestres mundiais, prontidão das guarnições Seeds e aplicação do método da Linha Viva nas bordas continentais.'
                : theaterScope === 'doctrine_guide'
                ? 'Estudo estruturado das 4 vertentes operacionais e dos 5 modelos de gráficos 2D essenciais para ofensiva, mobilidade terrestre e biodefesa.'
                : 'Visualização de telemetria militar com alta densidade analítica e revelação detalhada sob demanda (hover/clique).'}
            </p>
          </div>

          {/* Scope Switcher: Regional 5-Models vs Global World Theater vs Doctrine Guide */}
          <div className="flex items-center gap-1.5 bg-[#010613] p-1.5 border border-[#1e293b] shrink-0 self-start sm:self-auto flex-wrap">
            <button
              onClick={() => handleScopeChange('regional_5models')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code font-bold transition-all cursor-pointer border ${
                theaterScope === 'regional_5models'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>TEATRO REGIONAL (5 IPB)</span>
            </button>

            <button
              onClick={() => handleScopeChange('global_world_theater')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code font-bold transition-all cursor-pointer border ${
                theaterScope === 'global_world_theater'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>MAPA MUNDIAL MILITAR</span>
            </button>

            <button
              onClick={() => handleScopeChange('doctrine_guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code font-bold transition-all cursor-pointer border ${
                theaterScope === 'doctrine_guide'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              <span>GUIA DE DOUTRINA</span>
            </button>
          </div>
        </div>

        {/* 5 Models Navigation Switcher Tabs (Only in Regional Mode) */}
        {theaterScope === 'regional_5models' && (
          <div className="mt-4 pt-3 border-t border-[#1e293b] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {FIVE_CORE_MODELS_SUMMARY.map((model) => {
                const isSelected = activeModel === model.id;
                return (
                  <button
                    key={model.id}
                    onClick={() => handleModelChange(model.id as MilitaryMapModelId)}
                    className={`px-3 py-1.5 text-xs font-mono-code flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#010613] text-white font-bold shadow'
                        : 'bg-[#050b14]/70 text-slate-400 hover:text-slate-200 border-[#1e293b]'
                    }`}
                    style={{
                      borderColor: isSelected ? model.color : undefined,
                    }}
                  >
                    <span 
                      className="w-2 h-2" 
                      style={{ backgroundColor: model.color }} 
                    />
                    <span className="font-bold">M{model.modelNumber}:</span>
                    <span>{model.name.split(' (')[0]}</span>
                  </button>
                );
              })}

              {/* Split Mode Button */}
              <button
                onClick={() => handleModelChange('split_compare')}
                className={`px-3 py-1.5 text-xs font-mono-code flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer border ${
                  activeModel === 'split_compare'
                    ? 'bg-purple-500/20 text-purple-300 font-bold border-purple-500/50 shadow'
                    : 'bg-[#050b14]/70 text-slate-400 hover:text-slate-200 border-[#1e293b]'
                }`}
              >
                <Split className="w-3.5 h-3.5 text-purple-400" />
                <span>COMPARADOR SPLIT</span>
              </button>
            </div>

            {/* Wargame Route Simulator Trigger */}
            <button
              onClick={() => {
                audioService.playNodeSelect();
                setIsWargameOpen(!isWargameOpen);
              }}
              className={`px-3 py-1.5 text-xs font-mono-code flex items-center gap-1.5 self-end md:self-auto cursor-pointer border ${
                isWargameOpen
                  ? 'bg-purple-500/20 text-purple-300 font-bold border-purple-500/50'
                  : 'bg-[#010613] text-slate-300 hover:text-white border-[#1e293b]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>{isWargameOpen ? 'OCULTAR WARGAMING' : 'SIMULADOR DE AVANÇO'}</span>
            </button>
          </div>
        )}
      </div>

      {/* RENDER ACTIVE SCOPE */}
      {theaterScope === 'global_world_theater' ? (
        <GlobalMilitaryWorldMap />
      ) : theaterScope === 'doctrine_guide' ? (
        <MilitaryDoctrineGuide />
      ) : (
        <div className="space-y-5">
          {/* Tactical Modifiers Bar (Simuladores & Ferramentas) */}
          <div className="bg-[#050b14] border border-[#1e293b] p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
            {/* Weather Rain Slider (Microfísica do Solo) */}
            <div className="flex items-center gap-2.5 bg-[#010613] px-3 py-1.5 border border-[#1e293b]">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400 text-[11px] uppercase">Umidade / Chuva (Rasputitsa):</span>
              <input
                type="range"
                min="0"
                max="100"
                value={weatherRainPct}
                onChange={(e) => setWeatherRainPct(Number(e.target.value))}
                className="w-24 sm:w-32 accent-cyan-500 cursor-pointer"
              />
              <span className={`font-bold ${weatherRainPct > 60 ? 'text-rose-400' : 'text-cyan-300'}`}>
                {weatherRainPct}% {weatherRainPct > 60 ? '[LAMAÇAL]' : '[SECO]'}
              </span>
            </div>

            {/* FLIR Drone ISR Thermal Scanner Toggle */}
            <button
              onClick={handleToggleFlirScan}
              className={`flex items-center gap-1.5 px-3 py-1.5 border cursor-pointer transition-all ${
                flirScanActive
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow'
                  : 'bg-[#010613] text-slate-400 hover:text-slate-200 border-[#1e293b]'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>VARREDURA FLIR TÉRMICA: {flirScanActive ? 'ATIVADA' : 'DESATIVADA'}</span>
            </button>

            {/* Split Model Secondary Selector & Divider Slider (when in Split mode) */}
            {activeModel === 'split_compare' && (
              <div className="flex flex-wrap items-center gap-3 bg-[#010613] px-3 py-1.5 border border-purple-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px]">Comparar MCOO com:</span>
                  <select
                    value={secondaryModelForSplit}
                    onChange={(e) => setSecondaryModelForSplit(e.target.value as MilitaryMapModelId)}
                    className="bg-[#020617] text-purple-300 border border-[#1e293b] px-2 py-0.5 text-xs outline-none"
                  >
                    <option value="operations">Modelo 2: Operations Overlay</option>
                    <option value="trafficability">Modelo 3: Soil Trafficability</option>
                    <option value="canopy">Modelo 4: Canopy & Concealment</option>
                    <option value="biotic">Modelo 5: Biotic Threat</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 border-l border-[#1e293b] pl-2">
                  <span className="text-slate-400 text-[11px]">Divisor:</span>
                  <input
                    type="range"
                    min="15"
                    max="85"
                    value={splitRatio}
                    onChange={(e) => setSplitRatio(Number(e.target.value))}
                    className="w-20 sm:w-24 accent-purple-500 cursor-pointer"
                  />
                  <span className="text-purple-300 font-bold">{splitRatio}%</span>
                </div>
              </div>
            )}

            {/* Grid & Range Ring Toggles */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={showGridLines}
                  onChange={(e) => setShowGridLines(e.target.checked)}
                  className="border-[#1e293b] bg-[#010613] text-emerald-500 focus:ring-0"
                />
                <span>Grade MGRS</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={showRangeRings}
                  onChange={(e) => setShowRangeRings(e.target.checked)}
                  className="border-[#1e293b] bg-[#010613] text-cyan-500 focus:ring-0"
                />
                <span>Anéis de Alcance</span>
              </label>
            </div>
          </div>

          {/* Main Map + Inspector 2-Column Deck */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left / Center (8 cols): Interactive Tactical Map Canvas */}
            <div className="lg:col-span-8 bg-[#050b14] border border-[#1e293b] p-3 sm:p-4 relative flex flex-col shadow-xl">
              <MilitaryMapCanvasSVG
                activeModel={activeModel}
                secondaryModelForSplit={secondaryModelForSplit}
                weatherRainPct={weatherRainPct}
                flirScanActive={flirScanActive}
                selectedFeatureId={selectedFeature?.data?.id || null}
                onSelectFeature={setSelectedFeature}
                hoveredFeature={hoveredFeature}
                onHoverFeature={setHoveredFeature}
                activeWargameRouteWaypoints={isWargameOpen ? currentRoutePreset.waypoints : []}
                showGridLines={showGridLines}
                showRangeRings={showRangeRings}
                splitRatio={splitRatio}
              />
              <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-400 font-mono-code">
                <span>Passe o cursor sobre os polígonos ou clique para inspecionar parâmetros táticos detalhados.</span>
                <span className="text-emerald-400 font-semibold font-sans">Setor Operacional Kanto-Fuji</span>
              </div>
            </div>

            {/* Right (4 cols): Dynamic Telemetry Inspector Dossier */}
            <div className="lg:col-span-4 flex flex-col">
              <MilitaryMapInspector
                feature={hoveredFeature || selectedFeature}
                onClear={() => {
                  setSelectedFeature(null);
                  setHoveredFeature(null);
                }}
              />
            </div>
          </div>

          {/* Wargame Simulation Panel (if toggled open) */}
          {isWargameOpen && (
            <MilitaryWargamePanel
              selectedPresetId={selectedRoutePresetId}
              onSelectPreset={setSelectedRoutePresetId}
              activeWaypoints={currentRoutePreset.waypoints}
            />
          )}
        </div>
      )}
    </div>
  );
};
