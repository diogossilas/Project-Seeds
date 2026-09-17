import React, { useState } from 'react';
import { GlobalProgramData } from '../../types/globalSeeds';
import { GLOBAL_PROGRAMS_DATA } from '../../data/globalSeedsData';
import { TACTICAL_ASSETS_DATA } from '../../data/tacticalGeoData';
import { TacticalAsset, MapEraMode, TacticalTargetCategory } from '../../types/tacticalMap';
import { audioService } from '../../services/audioService';
import { 
  Radio, 
  AlertTriangle, 
  Sparkles, 
  Compass, 
  Shield, 
  Wind, 
  Layers, 
  Droplet, 
  Gem, 
  Landmark, 
  Sprout,
  X,
  Maximize2,
  Calendar,
  Flame,
  Globe2
} from 'lucide-react';

interface WorldAtlasCanvasSVGProps {
  selectedProgram: GlobalProgramData | null;
  onSelectProgram: (program: GlobalProgramData) => void;
  showBiomeOverlay?: boolean;
  showTransoceanicVectors?: boolean;
  filterBiome?: string;
  initialEra?: MapEraMode;
}

export const WorldAtlasCanvasSVG: React.FC<WorldAtlasCanvasSVGProps> = ({
  selectedProgram,
  onSelectProgram,
  showBiomeOverlay = true,
  showTransoceanicVectors = true,
  filterBiome = 'all',
  initialEra = 'post_impact',
}) => {
  const [eraMode, setEraMode] = useState<MapEraMode>(initialEra);
  const [hoveredProgram, setHoveredProgram] = useState<GlobalProgramData | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<TacticalAsset | null>(null);
  const [hoveredAsset, setHoveredAsset] = useState<TacticalAsset | null>(null);

  // Layer filters
  const [layerSeeds, setLayerSeeds] = useState(true);
  const [layerETR, setLayerETR] = useState(true);
  const [layerH2O, setLayerH2O] = useState(true);
  const [layerSovereign, setLayerSovereign] = useState(true);

  const programsToDisplay = GLOBAL_PROGRAMS_DATA.filter(p => {
    if (filterBiome === 'all') return true;
    return p.biomeCategory === filterBiome;
  });

  const assetsToDisplay = TACTICAL_ASSETS_DATA.filter(a => {
    if (eraMode === 'pre_impact' && a.era === 'post') return false;
    if (eraMode === 'post_impact' && a.era === 'pre') return false;
    if (a.category === 'seeds_shelter' && !layerSeeds) return false;
    if (a.category === 'etr' && !layerETR) return false;
    if (a.category === 'h2o' && !layerH2O) return false;
    if (a.category === 'sovereign' && !layerSovereign) return false;
    return true;
  });

  const lunar = GLOBAL_PROGRAMS_DATA.find(p => p.id === 'lunar-colonies');

  const handleEraSwitch = (mode: MapEraMode) => {
    audioService.playPhaseTransition();
    setEraMode(mode);
  };

  return (
    <div className="relative w-full aspect-[16/9] min-h-[460px] max-h-[720px] bg-[#060a12] rounded-2xl border border-slate-800/90 overflow-hidden shadow-2xl flex flex-col justify-between select-none">
      {/* Top HUD Overlay: Era Selector & Status */}
      <div className="absolute top-3 left-4 z-20 flex flex-wrap items-center gap-2">
        {/* Era Switcher Toggle Buttons */}
        <div className="flex items-center bg-[#0a101d]/95 p-1 rounded-xl border border-slate-700 shadow-xl backdrop-blur-md">
          <button
            onClick={() => handleEraSwitch('pre_impact')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              eraMode === 'pre_impact'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>PRÉ-IMPACTO (HOLOCENO)</span>
          </button>

          <button
            onClick={() => handleEraSwitch('post_impact')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              eraMode === 'post_impact'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>PÓS-IMPACTO (BIOMAS SEEDS)</span>
          </button>
        </div>

        {/* Dynamic Era Tag */}
        <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-slate-300 font-mono-code text-[11px] font-semibold hidden md:flex items-center gap-1.5 shadow-md">
          <span className={`w-2 h-2 rounded-full ${eraMode === 'pre_impact' ? 'bg-amber-400' : 'bg-emerald-400'} animate-pulse`} />
          {eraMode === 'pre_impact'
            ? 'GEOGRAFIA CLÁSSICA • SOBERANIAS, ETR & AQUÍFEROS'
            : 'TERRA TRANSFORMADA • CONTINENTES FRATURADOS & ARCAS SEEDS'}
        </span>
      </div>

      {/* Lunar Orbit Inset Monitor (Top Right) */}
      <div 
        onClick={() => {
          if (lunar) {
            audioService.playNodeSelect();
            onSelectProgram(lunar);
          }
        }}
        className={`absolute top-3 right-4 z-20 p-2.5 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${
          selectedProgram?.id === 'lunar-colonies'
            ? 'bg-purple-950/80 border-purple-500 shadow-lg shadow-purple-500/20'
            : 'bg-slate-900/80 border-slate-700 hover:border-purple-500/50'
        }`}
      >
        <div className="flex items-center gap-2 text-xs font-mono-code text-purple-300 font-bold">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>ESTAÇÃO LUNAR SELENE</span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-900/60 border border-purple-500/40 text-purple-200">
            {eraMode === 'pre_impact' ? 'EM CONSTRUÇÃO' : 'CRÍTICO'}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 font-mono-code mt-0.5">
          Polo Sul Lunar (Cratera Shackleton) • 384.400 km
        </p>
      </div>

      {/* Interactive Layer Quick Filters (Top Left Under Header) */}
      <div className="absolute top-14 left-4 z-20 hidden sm:flex items-center gap-1.5 bg-[#0a101d]/90 p-1 rounded-lg border border-slate-800 text-[11px] font-mono-code backdrop-blur-sm">
        <button
          onClick={() => setLayerSeeds(!layerSeeds)}
          className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
            layerSeeds ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Sprout className="w-3 h-3 text-emerald-400" />
          <span>Arcas Seeds</span>
        </button>

        <button
          onClick={() => setLayerETR(!layerETR)}
          className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
            layerETR ? 'bg-red-500/20 text-red-300 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Gem className="w-3 h-3 text-red-400" />
          <span>Terras Raras (ETR)</span>
        </button>

        <button
          onClick={() => setLayerH2O(!layerH2O)}
          className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
            layerH2O ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Droplet className="w-3 h-3 text-cyan-400" />
          <span>Aquíferos (H2O)</span>
        </button>

        <button
          onClick={() => setLayerSovereign(!layerSovereign)}
          className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
            layerSovereign ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Landmark className="w-3 h-3 text-amber-400" />
          <span>Capitais / Bases</span>
        </button>
      </div>

      {/* Main SVG Vector Canvas */}
      <svg
        viewBox="0 0 1000 562.5"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Radial glow for selected node */}
          <radialGradient id="nodeSelectedGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>

          {/* Graticule Grid Pattern */}
          <pattern id="worldGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.3" />
          </pattern>

          {/* Post-Impact Flooded Sea Hatch Pattern */}
          <pattern id="marineHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.35" />
          </pattern>

          {/* Predatory Rainforest Hatch Pattern */}
          <pattern id="forestHatch" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#059669" fillOpacity="0.5" />
            <circle cx="7" cy="7" r="1.5" fill="#10b981" fillOpacity="0.5" />
          </pattern>

          {/* Glowing pulse marker filter */}
          <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Asteroid Crater Shockwave Gradient */}
          <radialGradient id="impactCraterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#060a12" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Deep Ocean Background */}
        <rect width="1000" height="562.5" fill="#060a12" />
        <rect width="1000" height="562.5" fill="url(#worldGrid)" />

        {/* ========================================================
            MAPA 1: MUNDO PRÉ-IMPACTO (HOLOCENO CLÁSSICO)
           ======================================================== */}
        {eraMode === 'pre_impact' && (
          <g className="transition-opacity duration-700">
            {/* Standard Pre-Impact International Maritime Routes */}
            <g opacity="0.25">
              {/* Trans-Pacific Shipping Lane */}
              <path d="M 210 210 L 820 220" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
              {/* North Atlantic Shipping Corridor */}
              <path d="M 280 200 L 460 170" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
              {/* Suez / Indian Ocean Trade Route */}
              <path d="M 480 220 L 530 250 L 680 320 L 800 270" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
              {/* Panama Canal Transit */}
              <circle cx="250" cy="275" r="3.5" fill="#eab308" />
            </g>

            {/* Classical Continental Coastlines */}
            <g>
              {/* North America (Intact Coastlines, Pre-Flooding) */}
              <path
                d="M 110 70 L 270 70 L 320 120 L 290 190 L 300 220 L 270 245 L 245 235 L 220 270 L 195 240 L 155 205 L 110 150 Z"
                fill="#121b2b"
                stroke="#334155"
                strokeWidth="1.6"
              />

              {/* Central America Isthmus (Intact) */}
              <path
                d="M 220 270 L 260 275 L 265 295 L 245 305 Z"
                fill="#142033"
                stroke="#334155"
                strokeWidth="1.4"
              />

              {/* South America (Intact, Full Amazon basin dry) */}
              <path
                d="M 265 305 L 360 320 L 390 390 L 355 490 L 310 525 L 285 430 L 260 350 Z"
                fill="#111c2e"
                stroke="#334155"
                strokeWidth="1.6"
              />

              {/* Europe & Mediterranean (Classical boundaries) */}
              <path
                d="M 440 120 L 530 110 L 550 160 L 510 220 L 450 230 L 430 170 Z"
                fill="#142236"
                stroke="#334155"
                strokeWidth="1.6"
              />

              {/* Africa (Full Continental Plate) */}
              <path
                d="M 450 240 L 550 230 L 580 300 L 550 440 L 480 440 L 440 310 Z"
                fill="#152438"
                stroke="#334155"
                strokeWidth="1.6"
              />

              {/* Eurasia / Russia / Steppes */}
              <path
                d="M 550 110 L 830 70 L 860 140 L 760 180 L 670 140 L 550 140 Z"
                fill="#121e30"
                stroke="#334155"
                strokeWidth="1.6"
              />

              {/* China & East Asia */}
              <path
                d="M 680 180 L 810 170 L 830 270 L 750 310 L 680 250 Z"
                fill="#132135"
                stroke="#334155"
                strokeWidth="1.6"
              />

              {/* Indian Subcontinent */}
              <path
                d="M 640 250 L 710 260 L 690 350 L 640 320 Z"
                fill="#142338"
                stroke="#334155"
                strokeWidth="1.6"
              />

              {/* Japan Archipelago (Full continuous 4 main islands) */}
              <path
                d="M 825 185 Q 845 200 855 230 Q 835 245 825 220 Z"
                fill="#1e3a5f"
                stroke="#38bdf8"
                strokeWidth="1.8"
              />

              {/* Australia (Classical Coastlines) */}
              <path
                d="M 770 380 L 890 370 L 920 460 L 830 480 L 760 430 Z"
                fill="#142236"
                stroke="#334155"
                strokeWidth="1.6"
              />

              {/* Antarctica (Glaciated Ice Cap, Full White-Blue Shelf) */}
              <path
                d="M 200 525 L 800 525 L 820 562 L 180 562 Z"
                fill="#1e293b"
                stroke="#94a3b8"
                strokeWidth="1.8"
              />
            </g>

            {/* Aquifers Outlines (Pré-Impacto) */}
            {layerH2O && (
              <g opacity="0.3">
                {/* SAGA Amazon Aquifer */}
                <ellipse cx="330" cy="355" rx="40" ry="25" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" />
                <text x="330" y="358" fill="#38bdf8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">SAGA (162.000 km³)</text>

                {/* Guarani Aquifer */}
                <ellipse cx="340" cy="430" rx="30" ry="20" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" />
                <text x="340" y="433" fill="#38bdf8" fontSize="7.5" fontFamily="JetBrains Mono" textAnchor="middle">GUARANI</text>

                {/* Ogallala Aquifer */}
                <ellipse cx="230" cy="195" rx="25" ry="18" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" />
                <text x="230" y="198" fill="#38bdf8" fontSize="7.5" fontFamily="JetBrains Mono" textAnchor="middle">OGALLALA</text>
              </g>
            )}
          </g>
        )}

        {/* ========================================================
            MAPA 2: MUNDO PÓS-IMPACTO (IMAGINATIVO / BIOMAS & SEEDS)
           ======================================================== */}
        {eraMode === 'post_impact' && (
          <g className="transition-opacity duration-700">
            {/* Primary Asteroid Impact Sites (Glowing Craters & Shockwaves) */}
            <g>
              {/* Primary Pacific Impact Crater */}
              <circle cx="560" cy="360" r="45" fill="url(#impactCraterGlow)" />
              <circle cx="560" cy="360" r="75" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="5 4" opacity="0.6" className="animate-ping" style={{ animationDuration: '4s' }} />
              <circle cx="560" cy="360" r="110" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
              <text x="560" y="365" fill="#fca5a5" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">CRATERA PRIMÁRIA ÔMEGA</text>

              {/* Secondary Atlantic Fracturing Plume */}
              <circle cx="390" cy="270" r="28" fill="url(#impactCraterGlow)" opacity="0.7" />
              <circle cx="390" cy="270" r="50" fill="none" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.5" />
            </g>

            {/* Post-Impact Ocean Currents (New Marine Gyres) */}
            <g opacity="0.35">
              <path d="M 220 280 Q 500 240 820 220" fill="none" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="6 4" />
              <path d="M 330 380 Q 400 280 470 180" fill="none" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="6 4" />
              <path d="M 640 380 Q 720 300 780 260" fill="none" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="6 4" />
            </g>

            {/* Dramatically Reshaped Continents & Inundations */}
            <g>
              {/* North America: Flooded Mississippi -> O NOVO MAR CENTRAL AMERICANO */}
              <path
                d="M 120 70 L 260 70 L 310 110 L 300 180 L 270 230 L 250 220 L 230 260 L 200 240 L 160 210 L 120 160 Z"
                fill="#111c2e"
                stroke="#1e293b"
                strokeWidth="1.5"
              />
              {/* Flooded Mississippi Valley / The Great Inland Sea */}
              <path
                d="M 220 170 Q 245 210 235 255 Q 210 220 220 170 Z"
                fill="url(#marineHatch)"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeOpacity="0.8"
              />
              <text x="238" y="215" fill="#38bdf8" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">NOVO MAR CENTRAL</text>

              {/* Central America & Isthmus (Partially submerged archipelago) */}
              <path
                d="M 210 260 L 250 265 L 260 290 L 245 310 L 230 295 Z"
                fill="#122030"
                stroke="#1e293b"
                strokeWidth="1.2"
              />

              {/* South America: Transformed Amazon Basin -> O MAR INTERIOR AMAZÔNICO */}
              <path
                d="M 270 310 L 350 330 L 380 400 L 350 490 L 310 520 L 280 430 L 260 360 Z"
                fill="#101d2d"
                stroke="#1e293b"
                strokeWidth="1.5"
              />
              {/* Salty Amazon Inland Gulf & Megabiome */}
              <path
                d="M 290 350 Q 340 335 365 375 Q 320 405 290 350 Z"
                fill="url(#forestHatch)"
                stroke="#059669"
                strokeWidth="1.5"
                strokeOpacity="0.85"
              />
              <text x="325" y="375" fill="#10b981" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">MAR AMAZÔNICO (SALOBRO)</text>

              {/* Europe: Flooded Northern Plain & The Great Black Forest */}
              <path
                d="M 440 120 L 520 110 L 540 160 L 500 220 L 450 230 L 430 170 Z"
                fill="#121e30"
                stroke="#1e293b"
                strokeWidth="1.5"
              />
              <ellipse cx="485" cy="165" rx="35" ry="20" fill="url(#forestHatch)" stroke="#10b981" strokeWidth="1" strokeOpacity="0.6" />
              <text x="485" y="168" fill="#10b981" fontSize="7.5" fontFamily="JetBrains Mono" textAnchor="middle">SUPERFLORESTA NEGRA</text>

              {/* Central Eurasia (Mega-Steppes & Caucasus) */}
              <path
                d="M 540 130 L 670 140 L 700 220 L 630 250 L 550 230 Z"
                fill="#142135"
                stroke="#1e293b"
                strokeWidth="1.5"
              />

              {/* Russia / Siberia (Taiga Hiperbórea) */}
              <path
                d="M 620 60 L 820 60 L 850 140 L 760 170 L 680 140 Z"
                fill="#101c2e"
                stroke="#1e293b"
                strokeWidth="1.5"
              />

              {/* Indian Subcontinent (Mega-Monsoon Zone) */}
              <path
                d="M 640 250 L 710 260 L 690 350 L 640 330 Z"
                fill="#132338"
                stroke="#1e293b"
                strokeWidth="1.5"
              />

              {/* China & East Asia (Stone Bamboo & Qinling Sanctuary) */}
              <path
                d="M 700 180 L 800 180 L 820 280 L 750 310 L 690 260 Z"
                fill="#122033"
                stroke="#1e293b"
                strokeWidth="1.5"
              />

              {/* Japan Archipelago: FRACTURED & ISOLATED VOLCANIC CHAINS */}
              {/* Sado Island (Polo de Convergência das 5 Equipes) */}
              <g>
                {/* Sunken Tokyo / Kanto Bay Water Lagoon */}
                <ellipse cx="842" cy="225" rx="14" ry="10" fill="#0284c7" fillOpacity="0.5" stroke="#38bdf8" strokeWidth="1" />
                
                {/* Honshu Fragment */}
                <path d="M 825 200 Q 840 215 848 238 Q 830 248 820 230 Z" fill="#162842" stroke="#10b981" strokeWidth="1.8" />
                
                {/* Sado Island Highlighted Pinnacle */}
                <circle cx="833" cy="204" r="5" fill="#10b981" filter="url(#glowFilter)" />
                <text x="833" y="195" fill="#10b981" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">
                  ILHA DE SADO (CONVERGÊNCIA)
                </text>
              </g>

              {/* Antarctica: DEGLACIATED GREEN COASTLINES (Terra Australis Descongelada) */}
              <path
                d="M 280 530 L 720 530 L 750 560 L 250 560 Z"
                fill="#132438"
                stroke="#06b6d4"
                strokeWidth="1.5"
              />
              <path
                d="M 460 530 Q 560 512 650 530 Z"
                fill="#10b981"
                fillOpacity="0.4"
                stroke="#10b981"
                strokeWidth="1.2"
              />
              <text x="560" y="525" fill="#10b981" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">
                TUNDRA VERDEJANTE DESCONGELADA (ANTÁRTIDA)
              </text>
            </g>

            {/* The Legendary Transoceanic Bottle: New Eden -> Sado Island */}
            {showTransoceanicVectors && (
              <g>
                <path
                  d="M 210 196 Q 500 70 833 204"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.2"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                <circle cx="510" cy="115" r="5" fill="#38bdf8" filter="url(#glowFilter)">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="510" y="105" fill="#38bdf8" fontSize="8.5" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">
                  GARRAFA TRANSOCEÂNICA: NOVO ÉDEN → SADO
                </text>

                {/* Lunar Radio Beacon Beam from Shackleton to Earth */}
                <path
                  d="M 880 67 Q 780 120 833 204"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="1.8"
                  strokeDasharray="4 6"
                />
              </g>
            )}
          </g>
        )}

        {/* ========================================================
            CAMADA COMUM DE RECURSOS TÁTICOS & PONTOS DE INTERESSE
           ======================================================== */}
        {assetsToDisplay.map((asset) => {
          const isSelected = selectedAsset?.id === asset.id;
          const isHovered = hoveredAsset?.id === asset.id;
          // Scale coords from 1000x1500 to 1000x562.5
          const cx = asset.coordinates.canvasX;
          const cy = (asset.coordinates.canvasY / 1500) * 562.5;

          return (
            <g
              key={asset.id}
              className="cursor-pointer transition-transform"
              onClick={() => {
                audioService.playNodeSelect();
                setSelectedAsset(asset);
              }}
              onMouseEnter={() => setHoveredAsset(asset)}
              onMouseLeave={() => setHoveredAsset(null)}
            >
              {isSelected && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="20"
                  fill="none"
                  stroke={asset.color}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="animate-spin"
                />
              )}

              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 14 : isHovered ? 11 : 7}
                fill={asset.color}
                fillOpacity={isSelected ? 0.4 : isHovered ? 0.3 : 0.18}
                className="transition-all"
              />

              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 5.5 : isHovered ? 4.5 : 3.5}
                fill={asset.color}
                stroke="#060a12"
                strokeWidth="1.5"
                filter="url(#glowFilter)"
              />

              {/* Short Asset Label */}
              {(isSelected || isHovered || asset.category === 'seeds_shelter') && (
                <text
                  x={cx}
                  y={cy - 9}
                  textAnchor="middle"
                  fill={isSelected ? '#ffffff' : asset.color}
                  fontSize={isSelected ? "9.5" : "8"}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight={isSelected ? "bold" : "600"}
                  className="pointer-events-none drop-shadow-md select-none"
                >
                  {asset.name.split('(')[0]}
                </text>
              )}
            </g>
          );
        })}

        {/* Global Programs Nodes (when in post_impact or both) */}
        {eraMode === 'post_impact' && programsToDisplay.map((program) => {
          const isSelected = selectedProgram?.id === program.id;
          const isHovered = hoveredProgram?.id === program.id;
          const px = (program.coordinates.x / 100) * 1000;
          const py = (program.coordinates.y / 100) * 562.5;

          return (
            <g
              key={program.id}
              className="cursor-pointer transition-transform"
              onClick={() => {
                audioService.playNodeSelect();
                onSelectProgram(program);
              }}
              onMouseEnter={() => setHoveredProgram(program)}
              onMouseLeave={() => setHoveredProgram(null)}
            >
              {isSelected && (
                <circle
                  cx={px}
                  cy={py}
                  r="24"
                  fill="none"
                  stroke={program.color}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="animate-spin"
                  style={{ animationDuration: '8s' }}
                />
              )}

              <circle
                cx={px}
                cy={py}
                r={isSelected ? 16 : isHovered ? 13 : 9}
                fill={program.color}
                fillOpacity={isSelected ? 0.35 : isHovered ? 0.25 : 0.15}
                className="transition-all duration-200"
              />

              <circle
                cx={px}
                cy={py}
                r={isSelected ? 6 : isHovered ? 5.5 : 4.5}
                fill={program.color}
                stroke="#0b0f17"
                strokeWidth="2"
                filter="url(#glowFilter)"
              />

              <text
                x={px}
                y={py - 12}
                textAnchor="middle"
                fill={isSelected ? '#ffffff' : isHovered ? '#38bdf8' : '#cbd5e1'}
                fontSize={isSelected ? "11" : "9.5"}
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight={isSelected ? "700" : "500"}
                className="pointer-events-none drop-shadow-md select-none"
              >
                {program.regionShort}
              </text>

              <text
                x={px}
                y={py + 16}
                textAnchor="middle"
                fill={program.color}
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
                className="pointer-events-none select-none opacity-80"
              >
                {program.codename.split('/')[0]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Tactical Detail Modal for Selected Asset */}
      {selectedAsset && (
        <div className="absolute bottom-14 right-4 z-30 w-80 max-w-[90%] bg-[#0c1220]/95 border border-slate-700 rounded-xl p-3.5 shadow-2xl backdrop-blur-md animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span 
              className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${selectedAsset.color}20`,
                color: selectedAsset.color,
                border: `1px solid ${selectedAsset.color}40`,
              }}
            >
              {selectedAsset.categoryLabel}
            </span>
            <button
              onClick={() => setSelectedAsset(null)}
              className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <h4 className="text-sm font-bold text-white font-display mt-2">
            {selectedAsset.name}
          </h4>
          <p className="text-[11px] font-mono-code text-slate-400 mt-0.5">
            {selectedAsset.region} • Lat: {selectedAsset.coordinates.lat}° | Lng: {selectedAsset.coordinates.lng}°
          </p>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {selectedAsset.description}
          </p>

          <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1 text-xs font-mono-code">
            <div className="flex justify-between">
              <span className="text-slate-400">{selectedAsset.metrics.labelA}:</span>
              <span className="text-white font-bold">{selectedAsset.metrics.valueA}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{selectedAsset.metrics.labelB}:</span>
              <span className="text-cyan-300 font-bold">{selectedAsset.metrics.valueB}</span>
            </div>
          </div>
        </div>
      )}

      {/* Canvas Floating Footer Controls & Legends */}
      <div className="bg-[#080d17]/95 border-t border-slate-800/90 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-code text-slate-400">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Arcas Seeds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span>Terras Raras (ETR)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Aquíferos (H2O)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Capitais Soberanas</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-cyan-400">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>
            {eraMode === 'pre_impact'
              ? 'TEATRO PRÉ-IMPACTO: MONITORAMENTO DE DEPÓSITOS E BUNKERS'
              : 'GARRAFA TRANSOCEÂNICA: NOVO ÉDEN → MAR DO JAPÃO DETECTADA'}
          </span>
        </div>
      </div>
    </div>
  );
};
