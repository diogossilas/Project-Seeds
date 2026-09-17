import React, { useState, useRef } from 'react';
import { GlobalProgramData } from '../../types/globalSeeds';
import { GLOBAL_PROGRAMS_DATA } from '../../data/globalSeedsData';
import { TEAMS_DATA } from '../../data/sevenSeedsData';
import { TeamData } from '../../types';
import { audioService } from '../../services/audioService';
import { WorldMapPaths } from './WorldMapPaths';
import { Space3DCanvas } from '../space3d/Space3DCanvas';
import { Space3DControls, CameraPreset } from '../space3d/Space3DControls';
import { Space3DTelemetryCard } from '../space3d/Space3DTelemetryCard';
import { 
  HISTORICAL_TERRITORIES, 
  HistoricalTerritory,
  WORLD_MOUNTAIN_PEAKS,
  MountainPeak,
  MAP_TACTICAL_NODES,
  TacticalNode,
  AtlasTacticalModelId
} from './worldMapData';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  Globe2,
  BookOpen,
  Mountain,
  Radar,
  CloudRain,
  Eye,
  Crosshair,
  Trees,
  Navigation2,
  Box,
  ShieldAlert
} from 'lucide-react';

interface WorldAtlasCanvasSVGProps {
  selectedProgram: GlobalProgramData | null;
  onSelectProgram: (program: GlobalProgramData) => void;
  selectedTeam?: TeamData | null;
  onSelectTeam?: (team: TeamData) => void;
  showBiomeOverlay?: boolean;
  showTransoceanicVectors?: boolean;
  filterBiome?: string;
  initialEra?: 'pre_impact' | 'post_impact';
  onOpenForensicModal?: (seedId?: string) => void;
}

export const WorldAtlasCanvasSVG: React.FC<WorldAtlasCanvasSVGProps> = ({
  selectedProgram,
  onSelectProgram,
  selectedTeam,
  onSelectTeam,
  initialEra = 'post_impact',
  onOpenForensicModal,
}) => {
  // Map Era: Pre-Impact Holocene Earth vs Post-Impact (+80m Sea Level Rise)
  const [mapEra, setMapEra] = useState<'pre_impact' | 'post_impact'>(initialEra);

  // View Dimension: 2D Planar Surface vs 3D Space & Cislunar Sphere
  const [viewDimension, setViewDimension] = useState<'2d_surface' | '3d_space'>('2d_surface');
  
  // Screen Aspect Ratio Mode
  const [screenRatioMode, setScreenRatioMode] = useState<'proportional_2_3' | 'adaptive_16_9' | 'exact_1080_1620'>('adaptive_16_9');

  // 3D Specific State
  const [autoRotate3D, setAutoRotate3D] = useState(true);
  const [cameraAngle3D, setCameraAngle3D] = useState<CameraPreset>('iso');

  // Zoom & Pan for 2D
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Tactical Model State
  const [activeModel, setActiveModel] = useState<AtlasTacticalModelId>('relief_2d');
  const [flirThermalScan, setFlirThermalScan] = useState(false);
  const [weatherRainPct, setWeatherRainPct] = useState(35); // 0-100% Rasputitsa factor

  // Layer Toggles
  const [showGrid, setShowGrid] = useState(true);
  const [showCountryBorders, setShowCountryBorders] = useState(true);
  const [showSubmergedZones, setShowSubmergedZones] = useState(true);
  const [showContinentLabels, setShowContinentLabels] = useState(true);
  const [showHistoricalTerritories, setShowHistoricalTerritories] = useState(true);
  const [showTacticalNodes, setShowTacticalNodes] = useState(true);
  const [showRelief2D, setShowRelief2D] = useState(true);
  const [showElevationContours, setShowElevationContours] = useState(true);
  const [showMountainPeaks, setShowMountainPeaks] = useState(true);
  const [showRangeRings, setShowRangeRings] = useState(true);

  // Selected State
  const [selectedTerritory, setSelectedTerritory] = useState<HistoricalTerritory | null>(HISTORICAL_TERRITORIES[0]);
  const [selectedPeak, setSelectedPeak] = useState<MountainPeak | null>(WORLD_MOUNTAIN_PEAKS[0]);
  const [activeNode, setActiveNode] = useState<TacticalNode | null>(null);
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);

  // Cursor Telemetry & Crosshair Coordinates Tracker
  const [cursorPos, setCursorPos] = useState({ x: 500, y: 281 });
  const [cursorGeoCoords, setCursorGeoCoords] = useState({
    lat: "13°31'S",
    lng: "048°13'W",
    mgrs: "22L HJ 8920 4512",
    elevation: "~480 m ASL",
    sector: "SEC-AMERICA-SUL-01",
    targetName: "Minaçu (Cerrado Goiano / Jaburo)"
  });

  const svgRef = useRef<SVGSVGElement | null>(null);

  const calculateGeoCoordinates = (svgX: number, svgY: number) => {
    // Map bounds: x 0..1000 -> -180..+180 lng, y 0..562.5 -> +90..-90 lat
    const latNum = Math.max(-90, Math.min(90, 90 - (svgY / 562.5) * 180));
    const lngNum = Math.max(-180, Math.min(180, (svgX / 1000) * 360 - 180));

    const latDir = latNum >= 0 ? 'N' : 'S';
    const lngDir = lngNum >= 0 ? 'E' : 'W';
    const latDeg = Math.floor(Math.abs(latNum));
    const latMin = Math.floor((Math.abs(latNum) - latDeg) * 60);
    const lngDeg = Math.floor(Math.abs(lngNum));
    const lngMin = Math.floor((Math.abs(lngNum) - lngDeg) * 60);

    const mgrsZone = Math.floor((lngNum + 180) / 6) + 1;
    const mgrsBand = latNum > 0 ? 'N' : 'S';
    const sq1 = String.fromCharCode(65 + (Math.abs(Math.floor(svgX / 40)) % 24));
    const sq2 = String.fromCharCode(65 + (Math.abs(Math.floor(svgY / 40)) % 24));
    const easting = String(Math.floor((svgX * 10) % 10000)).padStart(4, '0');
    const northing = String(Math.floor((svgY * 10) % 10000)).padStart(4, '0');

    // Estimate elevation and nearest tactical landmark
    let estElev = '~320 m ASL (Planície)';
    let targetLabel = `Setor ${mgrsZone}${mgrsBand} (${latDeg}°${latDir}, ${lngDeg}°${lngDir})`;

    if (svgY < 350 && svgX > 640 && svgX < 780) {
      estElev = '+4.850 m (Planalto Tibetano / Himalaias)';
      targetLabel = "Maciço do Himalaia / K2 / Everest";
    } else if (svgX > 180 && svgX < 280 && svgY > 380 && svgY < 540) {
      estElev = '+840 m (Bacia do Prata / Minaçu / Jaburo)';
      targetLabel = "Minaçu (13.53°S, 48.22°O)";
    } else if (svgX > 60 && svgX < 140 && svgY < 350) {
      estElev = '+2.800 m (Montanhas Rochosas / Cheyenne)';
      targetLabel = "Complexo Cheyenne (38.74°N, 104.84°O)";
    } else if (svgX > 440 && svgX < 530 && svgY > 200 && svgY < 260) {
      estElev = '+2.400 m (Maciço Alpino / Boreal)';
      targetLabel = "Cordilheira dos Alpes / Mont Blanc";
    }

    return {
      lat: `${String(latDeg).padStart(2, '0')}°${String(latMin).padStart(2, '0')}'${latDir}`,
      lng: `${String(lngDeg).padStart(3, '0')}°${String(lngMin).padStart(2, '0')}'${lngDir}`,
      mgrs: `${mgrsZone}${mgrsBand} ${sq1}${sq2} ${easting} ${northing}`,
      elevation: estElev,
      sector: `SEC-${mgrsZone.toString().padStart(2, '0')}-${sq1}${sq2}`,
      targetName: targetLabel
    };
  };

  const handleZoomIn = () => {
    audioService.playNodeSelect();
    setZoomLevel((z) => Math.min(z + 0.35, 3.5));
  };

  const handleZoomOut = () => {
    audioService.playNodeSelect();
    setZoomLevel((z) => {
      const next = Math.max(z - 0.35, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetView = () => {
    audioService.playNodeSelect();
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Update SVG coordinates
    if (svgRef.current) {
      const ctm = svgRef.current.getScreenCTM();
      if (ctm) {
        const point = svgRef.current.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const svgPoint = point.matrixTransform(ctm.inverse());
        
        const unscaledX = (svgPoint.x - 500 - panOffset.x) / zoomLevel + 500;
        const unscaledY = (svgPoint.y - 281.25 - panOffset.y) / zoomLevel + 281.25;

        const clampedX = Math.max(0, Math.min(1000, unscaledX));
        const clampedY = Math.max(0, Math.min(562.5, unscaledY));

        setCursorPos({ x: clampedX, y: clampedY });
        setCursorGeoCoords(calculateGeoCoordinates(clampedX, clampedY));
      }
    }

    if (!isDragging || zoomLevel <= 1) return;
    const maxPanX = (1000 * (zoomLevel - 1)) / 2;
    const maxPanY = (562.5 * (zoomLevel - 1)) / 2;
    const newX = Math.max(-maxPanX, Math.min(maxPanX, e.clientX - dragStart.x));
    const newY = Math.max(-maxPanY, Math.min(maxPanY, e.clientY - dragStart.y));
    setPanOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleContinentClick = (id: string) => {
    audioService.playNodeSelect();
    const prog = GLOBAL_PROGRAMS_DATA.find((p) => p.id === id);
    if (prog) {
      onSelectProgram(prog);
    }
  };

  // Center coordinate for Range Rings
  const focalPoint = selectedPeak 
    ? { x: selectedPeak.x, y: selectedPeak.y * 0.5625 } 
    : (selectedTerritory ? { x: selectedTerritory.x, y: selectedTerritory.y * 0.5625 } : { x: 500, y: 281 });

  return (
    <div className="flex flex-col space-y-3 font-sans">
      {/* 1. TOP COMMAND DECK (Exact Match with Uploaded Image Spec) */}
      <div className="bg-[#030914] border border-[#0e2a4a] rounded-xl p-3 sm:p-4 shadow-2xl backdrop-blur-md">
        {/* Main Dual Dimension View Selector Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-[#020610] p-1 rounded-lg border border-[#0d223a]">
            {/* 2D Surface Map Button */}
            <button
              onClick={() => {
                audioService.playPhaseTransition();
                setViewDimension('2d_surface');
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-mono-code font-bold transition-all cursor-pointer ${
                viewDimension === '2d_surface'
                  ? 'bg-gradient-to-r from-cyan-950 to-sky-900/90 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Globe2 className="w-4 h-4 text-cyan-400" />
              <span>🌍 Superfície Terrestre (1080×1620px)</span>
            </button>

            {/* 3D Space & Cislunar Sphere Button (Integrated Inside Map) */}
            <button
              onClick={() => {
                audioService.playPhaseTransition();
                setViewDimension('3d_space');
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-mono-code font-bold transition-all cursor-pointer ${
                viewDimension === '3d_space'
                  ? 'bg-gradient-to-r from-emerald-950 to-teal-900/90 text-emerald-300 border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Box className="w-4 h-4 text-emerald-400" />
              <span>🪐🛰️ Esfera Espacial &amp; Cislunar (U.C.)</span>
            </button>
          </div>

          {/* Screen Mode & Grid Tactical Status */}
          <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap text-xs font-mono-code">
            <div className="flex items-center gap-1 bg-[#020610] px-2 py-1 rounded border border-[#0d223a]">
              <span className="text-slate-400 text-[10px] uppercase font-bold mr-1">MODO TELA:</span>
              <button
                onClick={() => setScreenRatioMode('proportional_2_3')}
                className={`px-2 py-0.5 rounded text-[11px] cursor-pointer transition-colors ${
                  screenRatioMode === 'proportional_2_3'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ⛶ Proporcional 2:3
              </button>
              <button
                onClick={() => setScreenRatioMode('adaptive_16_9')}
                className={`px-2 py-0.5 rounded text-[11px] cursor-pointer transition-colors ${
                  screenRatioMode === 'adaptive_16_9'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ⤢ Adaptativo
              </button>
              <button
                onClick={() => setScreenRatioMode('exact_1080_1620')}
                className={`px-2 py-0.5 rounded text-[11px] cursor-pointer transition-colors ${
                  screenRatioMode === 'exact_1080_1620'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1080×1620 1:1
              </button>
            </div>

            {/* Tactical Grid Live Signal */}
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono-code text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>GRADE TÁTICA: 1080×1620</span>
            </div>
          </div>
        </div>

        {/* Tactical Sub-Bar (When 2D is Active) */}
        {viewDimension === '2d_surface' && (
          <div className="mt-3 pt-3 border-t border-[#0e2a4a] flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code">
            {/* Tactical Models and Era Switcher */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
              {/* Pre vs Post Impact Era Switcher */}
              <div className="flex items-center gap-1 bg-[#020610] p-0.5 rounded border border-[#0d223a] mr-1 shrink-0">
                <button
                  onClick={() => {
                    audioService.playPhaseTransition();
                    setMapEra('pre_impact');
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono-code font-bold cursor-pointer transition-all ${
                    mapEra === 'pre_impact'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Mapa Mundi Atlas antes da queda do meteoro (Holoceno original)"
                >
                  🌐 Pré-Impacto
                </button>
                <button
                  onClick={() => {
                    audioService.playPhaseTransition();
                    setMapEra('post_impact');
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono-code font-bold cursor-pointer transition-all ${
                    mapEra === 'post_impact'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Mapa Mundi pós-impacto com elevação de +80m e continentes afundados"
                >
                  🌊 Pós-Impacto (+80m)
                </button>
              </div>

              <span className="text-slate-400 text-[10px] uppercase font-bold mr-1 shrink-0">Modelos:</span>
              <button
                onClick={() => {
                  audioService.playNodeSelect();
                  setActiveModel('relief_2d');
                }}
                className={`px-2 py-1 rounded transition-colors text-[11px] shrink-0 cursor-pointer ${
                  activeModel === 'relief_2d' ? 'bg-amber-950/90 text-amber-300 border border-amber-500 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Hipsometria Escura
              </button>
              <button
                onClick={() => {
                  audioService.playNodeSelect();
                  setActiveModel('geopolitical');
                }}
                className={`px-2 py-1 rounded transition-colors text-[11px] shrink-0 cursor-pointer ${
                  activeModel === 'geopolitical' ? 'bg-sky-950/90 text-sky-300 border border-sky-500 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Submersão (+80m)
              </button>
              <button
                onClick={() => {
                  audioService.playNodeSelect();
                  setActiveModel('operations');
                }}
                className={`px-2 py-1 rounded transition-colors text-[11px] shrink-0 cursor-pointer ${
                  activeModel === 'operations' ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                3. Operações Militares
              </button>
              <button
                onClick={() => {
                  audioService.playNodeSelect();
                  setActiveModel('soil_rasputitsa');
                }}
                className={`px-2 py-1 rounded transition-colors text-[11px] shrink-0 cursor-pointer ${
                  activeModel === 'soil_rasputitsa' ? 'bg-amber-900/90 text-amber-200 border border-amber-600 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                4. Rasputitsa ({weatherRainPct}%)
              </button>
              <button
                onClick={() => {
                  audioService.playNodeSelect();
                  setActiveModel('canopy_flir');
                }}
                className={`px-2 py-1 rounded transition-colors text-[11px] shrink-0 cursor-pointer ${
                  activeModel === 'canopy_flir' ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                5. FLIR Térmico
              </button>
              {onOpenForensicModal && (
                <button
                  onClick={() => {
                    audioService.playAlert();
                    onOpenForensicModal();
                  }}
                  className="px-2.5 py-1 rounded transition-colors text-[11px] shrink-0 cursor-pointer bg-rose-950/80 text-rose-200 border border-rose-500/60 hover:bg-rose-900 font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>Forense de Queda</span>
                </button>
              )}
            </div>

            {/* FLIR & Rain Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFlirThermalScan(!flirThermalScan)}
                className={`px-2 py-0.5 rounded border text-[11px] cursor-pointer ${
                  flirThermalScan ? 'bg-cyan-950 text-cyan-300 border-cyan-400 font-bold' : 'text-slate-400 border-slate-700'
                }`}
              >
                FLIR: {flirThermalScan ? 'ON' : 'OFF'}
              </button>
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weatherRainPct}
                  onChange={(e) => setWeatherRainPct(Number(e.target.value))}
                  className="w-16 accent-amber-400 cursor-pointer h-1.5"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. MAIN MAP VIEWPORT (2D or 3D Dimension) */}
      {viewDimension === '3d_space' ? (
        /* ================= 3D INTEGRATED SPACE & CISLUNAR VIEW ================= */
        <div className="bg-[#020713] border border-[#0d2a4a] rounded-xl p-4 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#030914] p-3 rounded-lg border border-[#0e2a4a]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono-code font-bold text-white uppercase">
                DOMÍNIO ORBITAL 3D • ESFERA CISLUNAR &amp; TRAJETÓRIA BIOMÉTRICA
              </span>
            </div>
            <Space3DControls
              cameraAngle={cameraAngle3D}
              autoRotate={autoRotate3D}
              onSetCameraPreset={setCameraAngle3D}
              onToggleAutoRotate={() => setAutoRotate3D(!autoRotate3D)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <Space3DCanvas
              autoRotate={autoRotate3D}
              cameraAngle={cameraAngle3D}
              scope="global"
            />
            <Space3DTelemetryCard
              activeFocus={selectedTeam || TEAMS_DATA[0]}
              onSelectTeam={(team) => {
                if (onSelectTeam) onSelectTeam(team);
              }}
            />
          </div>
        </div>
      ) : (
        /* ================= 2D TACTICAL PLANAR WORLD ATLAS (IMAGE ACCURATE) ================= */
        <div className="relative bg-[#020713] border border-[#0d2a4a] rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between select-none">
          
          {/* Top Coordinate Caliper Ruler */}
          <div className="w-full bg-[#030a17] border-b border-[#0d2847] px-4 py-1.5 flex items-center justify-between text-[10px] font-mono-code text-cyan-400/80 uppercase select-none">
            <span>0px [X-COORD]</span>
            <span className="hidden sm:inline">270px</span>
            <span className="text-cyan-300 font-bold">540px [MERIDIANO CENTRAL -65°]</span>
            <span className="hidden sm:inline">810px</span>
            <span>1080px [LIMITE CANVAS]</span>
          </div>

          {/* Main Visual Frame (Canvas Area) */}
          <div 
            className={`relative w-full ${
              screenRatioMode === 'proportional_2_3' 
                ? 'aspect-[2/3] min-h-[640px]' 
                : 'aspect-[16/9] min-h-[520px] max-h-[780px]'
            } bg-[#020713] overflow-hidden`}
          >
            {/* Top-Left Corner Tactical Brackets & Label */}
            <div className="absolute top-3 left-3 z-30 pointer-events-none">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M 2 24 L 2 2 L 24 2" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
                <circle cx="2" cy="2" r="1.5" fill="#00f0ff" />
              </svg>
              <span className="absolute top-1 left-3 text-[9px] font-mono-code font-bold text-cyan-400 tracking-wider">
                GRID-TAC
              </span>
            </div>

            {/* Top-Right Corner Tactical Bracket */}
            <div className="absolute top-3 right-3 z-30 pointer-events-none">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M 24 2 L 46 2 L 46 24" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
                <circle cx="46" cy="2" r="1.5" fill="#00f0ff" />
              </svg>
            </div>

            {/* Bottom-Left Corner Tactical Bracket */}
            <div className="absolute bottom-3 left-3 z-30 pointer-events-none">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M 2 24 L 2 46 L 24 46" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
                <circle cx="2" cy="46" r="1.5" fill="#00f0ff" />
              </svg>
            </div>

            {/* Bottom-Right Corner Tactical Bracket */}
            <div className="absolute bottom-3 right-3 z-30 pointer-events-none">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M 24 46 L 46 46 L 46 24" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
                <circle cx="46" cy="46" r="1.5" fill="#00f0ff" />
              </svg>
            </div>

            {/* Floating Left Tactical Controls (Zoom In, Out, Reset) */}
            <div className="absolute top-12 left-4 z-30 flex flex-col gap-1 bg-[#040d1c]/90 p-1.5 rounded-lg border border-[#0e2a4a] shadow-xl backdrop-blur-md">
              <button
                onClick={handleZoomIn}
                className="p-2 text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/60 rounded transition-colors cursor-pointer"
                title="Aumentar Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/60 rounded transition-colors cursor-pointer"
                title="Diminuir Zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetView}
                className="p-2 text-slate-300 hover:text-amber-300 hover:bg-amber-950/60 rounded transition-colors cursor-pointer"
                title="Redefinir Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Top-Right SAT-GEO Telemetry Box (Matching Screenshot) */}
            <div className="absolute top-4 right-4 z-30 bg-[#030a17]/95 border border-cyan-500/50 rounded-lg p-3 shadow-2xl backdrop-blur-md max-w-xs font-mono-code text-[11px] animate-in fade-in">
              <div className="flex items-center justify-between gap-2 border-b border-cyan-900/50 pb-1.5 mb-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>SAT-GEO: SINCRONIZADO</span>
                </div>
                <div className="text-cyan-300 font-bold">
                  AMPLIAÇÃO: <span className="text-white">{zoomLevel.toFixed(1)}x</span>
                </div>
              </div>
              <div className="text-amber-300 font-bold truncate">
                ALVO: <span className="text-slate-200 font-normal">{cursorGeoCoords.targetName}</span>
              </div>
              <div className="text-[10px] text-cyan-400/80 mt-0.5">
                POS: {cursorGeoCoords.lat}, {cursorGeoCoords.lng} | {cursorGeoCoords.elevation}
              </div>
            </div>

            {/* Floating Bottom-Left Tactical Matrix Badge */}
            <div className="absolute bottom-4 left-4 z-30 bg-[#030a17]/90 border border-[#0d2a4a] rounded px-2.5 py-1 text-[10px] font-mono-code text-cyan-400 backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>MATRIZ TÁTICA: 1080 × 1620 PX (RATIO {screenRatioMode === 'proportional_2_3' ? '2:3' : '16:9'})</span>
            </div>

            {/* Floating Bottom-Right Tactical Legend (Exact 4 Classification Indicators) */}
            <div className="absolute bottom-4 right-4 z-30 bg-[#030a17]/95 border border-[#0e2a4a] rounded-xl p-3 shadow-2xl backdrop-blur-md text-[11px] font-mono-code space-y-1.5">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <span>Mineral Crítico (ETR)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                <span>Recurso Hídrico (H2O)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-3 h-3 rounded-sm bg-amber-400 rotate-45 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <span>País Soberano / Capital</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-3 h-3 rounded-sm bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
                <span>Base Terrestre U.C. (Jaburo / Seeds)</span>
              </div>
            </div>

            {/* Main Interactive SVG Map Layer */}
            <div
              className={`w-full h-full ${zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-crosshair'}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <svg
                ref={svgRef}
                viewBox="0 0 1000 562.5"
                className="w-full h-full object-contain"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Glowing Node Filter */}
                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#ffffff" floodOpacity="0.4" />
                  </filter>

                  {/* Ocean tactical cyber pattern */}
                  <pattern id="atlasOceanGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#00f0ff" strokeWidth="0.3" strokeOpacity="0.12" />
                  </pattern>

                  {/* FLIR Thermal Gradient */}
                  <radialGradient id="flirThermalAura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                    <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.2" />
                    <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#020612" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Ocean Background */}
                <rect width="1000" height="562.5" fill="#020713" />
                <rect width="1000" height="562.5" fill="url(#atlasOceanGrid)" />

                {/* FLIR Thermal Aura if Active */}
                {flirThermalScan && (
                  <rect width="1000" height="562.5" fill="url(#flirThermalAura)" className="animate-pulse" />
                )}

                {/* Transformed Group for Zoom & Pan */}
                <g transform={`translate(${500 + panOffset.x}, ${281.25 + panOffset.y}) scale(${zoomLevel}) translate(-500, -281.25)`}>
                  
                  {/* World Map Paths: Continents with Organic Living Line, Mountain Relief 2D, Picos, Submersões, Cidades e Guarnições */}
                  <WorldMapPaths
                    mapEra={mapEra}
                    selectedFrontId={selectedProgram?.id}
                    onSelectFront={(frontId) => {
                      const prog = GLOBAL_PROGRAMS_DATA.find((p) => p.id === frontId);
                      if (prog) onSelectProgram(prog);
                    }}
                    activeModel={activeModel}
                    flirThermalScan={flirThermalScan}
                    weatherRainPct={weatherRainPct}
                    showCountryBorders={showCountryBorders}
                    showSubmergedZones={showSubmergedZones}
                    showContinentLabels={showContinentLabels}
                    showHistoricalTerritories={showHistoricalTerritories}
                    showRelief2D={showRelief2D}
                    showElevationContours={showElevationContours}
                    showMountainPeaks={showMountainPeaks}
                    showChokepoints={true}
                    selectedTerritory={selectedTerritory}
                    selectedPeak={selectedPeak}
                    hoveredContinent={hoveredContinent}
                    onSelectContinent={handleContinentClick}
                    onSelectTerritory={(t: HistoricalTerritory) => {
                      audioService.playNodeSelect();
                      setSelectedTerritory(t);
                      setSelectedPeak(null);
                      setActiveNode(null);
                    }}
                    onSelectPeak={(p: MountainPeak) => {
                      audioService.playNodeSelect();
                      setSelectedPeak(p);
                      setSelectedTerritory(null);
                      setActiveNode(null);
                    }}
                    onHoverContinent={setHoveredContinent}
                  />

                  {/* Concentric Tactical Range Rings Anchored to Focal Point */}
                  {showRangeRings && (
                    <g id="tactical-range-rings" pointerEvents="none">
                      <circle cx={focalPoint.x} cy={focalPoint.y} r="35" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                      <circle cx={focalPoint.x} cy={focalPoint.y} r="70" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="5 5" opacity="0.4" />
                      <circle cx={focalPoint.x} cy={focalPoint.y} r="120" fill="none" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="6 6" opacity="0.3" />
                      <line x1={focalPoint.x - 140} y1={focalPoint.y} x2={focalPoint.x + 140} y2={focalPoint.y} stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.35" />
                      <line x1={focalPoint.x} y1={focalPoint.y - 140} x2={focalPoint.x} y2={focalPoint.y + 140} stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.35" />
                      <text x={focalPoint.x + 38} y={focalPoint.y - 4} fill="#38bdf8" fontSize="6.5" fontFamily="monospace" opacity="0.75">500 km</text>
                      <text x={focalPoint.x + 73} y={focalPoint.y - 4} fill="#38bdf8" fontSize="6.5" fontFamily="monospace" opacity="0.75">1.000 km</text>
                      <text x={focalPoint.x + 123} y={focalPoint.y - 4} fill="#38bdf8" fontSize="6.5" fontFamily="monospace" opacity="0.75">2.000 km</text>
                    </g>
                  )}

                  {/* Dynamic Tactical Crosshair on Cursor Position */}
                  <g transform={`translate(${cursorPos.x}, ${cursorPos.y})`} pointerEvents="none">
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.8" />
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.8" />
                    <circle cx="0" cy="0" r="6" fill="none" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="2 2" />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/* Bottom Coordinate Caliper Ruler */}
          <div className="w-full bg-[#030a17] border-t border-[#0d2847] px-4 py-1.5 flex items-center justify-between text-[10px] font-mono-code text-cyan-400/80 uppercase select-none">
            <span>0px [Y-TOPO 75°N]</span>
            <span className="hidden sm:inline">405px [TRÓPICO CÂNCER]</span>
            <span className="text-cyan-300 font-bold">810px [EQUADOR 0°]</span>
            <span className="hidden sm:inline">1215px [TRÓPICO CAPRICÓRNIO]</span>
            <span>1620px [Y-FUNDO 55°S]</span>
          </div>

          {/* Selected Peak Modal Card */}
          {selectedPeak && (
            <div className="absolute bottom-12 right-6 max-w-sm z-40 bg-[#040e1c]/95 border border-amber-500/60 p-4 shadow-2xl backdrop-blur-md rounded-lg animate-in fade-in">
              <div className="flex items-start justify-between gap-2 border-b border-amber-900/50 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-amber-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedPeak.name}</h4>
                    <p className="text-[11px] font-mono-code text-amber-300">
                      {selectedPeak.elevationMeters.toLocaleString()} m ({selectedPeak.elevationFeet.toLocaleString()} ft)
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelectedPeak(null)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {selectedPeak.tacticalRole}
              </p>
            </div>
          )}

          {/* Selected Territory Modal Card */}
          {selectedTerritory && !selectedPeak && (
            <div className="absolute bottom-12 right-6 max-w-sm z-40 bg-[#040e1c]/95 border border-cyan-500/60 p-4 shadow-2xl backdrop-blur-md rounded-lg animate-in fade-in">
              <div className="flex items-start justify-between gap-2 border-b border-cyan-900/50 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedTerritory.originalFlagEmoji}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedTerritory.name}</h4>
                    <p className="text-[11px] font-mono-code text-cyan-300">
                      Submersão: {selectedTerritory.submersionPercentage}%
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelectedTerritory(null)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {selectedTerritory.postImpactTransformation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
