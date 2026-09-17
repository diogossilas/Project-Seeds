import React, { useState, useRef } from 'react';
import { 
  Shield, 
  Crosshair, 
  AlertTriangle, 
  Anchor, 
  Plane, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Radio, 
  Compass, 
  Eye, 
  Sparkles, 
  Info, 
  Users, 
  Activity, 
  Cpu, 
  Skull, 
  Navigation,
  Globe,
  PenTool
} from 'lucide-react';
import { 
  GLOBAL_MILITARY_CHOKEPOINTS, 
  GLOBAL_SEEDS_GARRISONS, 
  GLOBAL_THREAT_THEATERS, 
  GLOBAL_STRATEGIC_CORRIDORS,
  LIVING_LINE_STAGES
} from '../../data/worldMilitaryData';
import { 
  GlobalMilitaryChokepoint, 
  GlobalMilitaryGarrison, 
  GlobalThreatTheater, 
  GlobalStrategicCorridor,
  LivingLineStage 
} from '../../types/worldMilitaryMap';
import { WorldMapPaths } from '../atlas/WorldMapPaths';
import { audioService } from '../../services/audioService';
import { LivingLinePedagogyModal } from '../atlas/LivingLinePedagogyModal';

interface GlobalMilitaryWorldMapProps {
  onSelectGarrison?: (garrison: GlobalMilitaryGarrison) => void;
  onSelectChokepoint?: (chokepoint: GlobalMilitaryChokepoint) => void;
}

export const GlobalMilitaryWorldMap: React.FC<GlobalMilitaryWorldMapProps> = ({
  onSelectGarrison,
  onSelectChokepoint,
}) => {
  // Navigation & Zoom
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Living Line & Pedagogical Modes
  const [livingLineStage, setLivingLineStage] = useState<LivingLineStage>('stage_4_military_seeds');
  const [isPedagogyModalOpen, setIsPedagogyModalOpen] = useState<boolean>(false);

  // Layer Toggles
  const [showChokepoints, setShowChokepoints] = useState<boolean>(true);
  const [showGarrisons, setShowGarrisons] = useState<boolean>(true);
  const [showThreatTheaters, setShowThreatTheaters] = useState<boolean>(true);
  const [showCorridors, setShowCorridors] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [flirSatelliteScan, setFlirSatelliteScan] = useState<boolean>(false);

  // Selection state
  const [selectedChokepoint, setSelectedChokepoint] = useState<GlobalMilitaryChokepoint | null>(GLOBAL_MILITARY_CHOKEPOINTS[0]);
  const [selectedGarrison, setSelectedGarrison] = useState<GlobalMilitaryGarrison | null>(null);
  const [selectedThreat, setSelectedThreat] = useState<GlobalThreatTheater | null>(null);
  const [hoveredEntity, setHoveredEntity] = useState<any | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [cursorCoordinates, setCursorCoordinates] = useState<{ x: number; y: number; mgrs: string; latLong: string }>({
    x: 500,
    y: 280,
    mgrs: '32N UK 4520 8812',
    latLong: '00°00\'N 00°00\'E'
  });

  const svgRef = useRef<SVGSVGElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    if (svgRef.current) {
      const ctm = svgRef.current.getScreenCTM();
      if (ctm) {
        const point = svgRef.current.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const svgPoint = point.matrixTransform(ctm.inverse());
        
        const normX = Math.round(Math.max(0, Math.min(1000, svgPoint.x)));
        const normY = Math.round(Math.max(0, Math.min(562.5, svgPoint.y)));

        // Robinson-like Equirectangular estimation for coordinates
        const lat = (90 - (normY / 562.5) * 180).toFixed(2);
        const lon = ((normX / 1000) * 360 - 180).toFixed(2);
        const latStr = `${Math.abs(Number(lat))}°${Number(lat) >= 0 ? 'N' : 'S'}`;
        const lonStr = `${Math.abs(Number(lon))}°${Number(lon) >= 0 ? 'E' : 'W'}`;
        
        // Accurate MGRS approximation
        const gridZone = Math.floor((Number(lon) + 180) / 6) + 1;
        const latBandIndex = Math.floor((Number(lat) + 80) / 8);
        const latBands = "CDEFGHJKLMNPQRSTUVWX";
        const mgrsBand = latBandIndex >= 0 && latBandIndex < latBands.length ? latBands[latBandIndex] : 'Z';
        
        setCursorCoordinates({
          x: normX,
          y: normY,
          mgrs: `${gridZone < 10 ? '0' + gridZone : gridZone}${mgrsBand} WK ${Math.floor(normX * 8.4) % 10000} ${Math.floor(normY * 11.2) % 10000}`,
          latLong: `${latStr} ${lonStr}`
        });
      }
    }

    if (!isDragging || zoomLevel <= 1) return;
    const maxPanX = (1000 * (zoomLevel - 1)) / 2;
    const maxPanY = (562.5 * (zoomLevel - 1)) / 2;
    setPanOffset({
      x: Math.max(-maxPanX, Math.min(maxPanX, e.clientX - dragStart.x)),
      y: Math.max(-maxPanY, Math.min(maxPanY, e.clientY - dragStart.y))
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleSelectChokepoint = (cp: GlobalMilitaryChokepoint) => {
    audioService.playNodeSelect();
    setSelectedChokepoint(cp);
    setSelectedGarrison(null);
    setSelectedThreat(null);
    if (onSelectChokepoint) onSelectChokepoint(cp);
  };

  const handleSelectGarrison = (gar: GlobalMilitaryGarrison) => {
    audioService.playNodeSelect();
    setSelectedGarrison(gar);
    setSelectedChokepoint(null);
    setSelectedThreat(null);
    if (onSelectGarrison) onSelectGarrison(gar);
  };

  const handleSelectThreat = (threat: GlobalThreatTheater) => {
    audioService.playAlert();
    setSelectedThreat(threat);
    setSelectedChokepoint(null);
    setSelectedGarrison(null);
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Top Briefing Header */}
      <div className="bg-[#050e18] border border-[#1e293b] p-4 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-sky-500/20 border border-sky-500/40 text-sky-400 text-xs font-mono-code font-bold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>TEATRO DE OPERAÇÕES MILITARES GLOBAL • PROJETO SEEDS</span>
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                PADRÃO DOUTRINÁRIO OTAN / MIL-STD-2525 • INTELIGÊNCIA PLANETÁRIA
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Mapa Mundial Estratégico: Gargantas, Guarnições &amp; Teatros de Ruptura
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl">
              Plataforma para tropas militares analisarem o mundo pós-cataclismo: controle de gargantas marítimas (Chokepoints), efetivo das 11 Frentes Globais Seeds e avaliação de rotas táticas com o conceito da <strong>Linha Viva</strong>.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsPedagogyModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 text-xs font-mono-code font-bold rounded cursor-pointer transition-all shadow"
            >
              <PenTool className="w-3.5 h-3.5 text-emerald-400" />
              <span>Aprenda a "Linha Viva"</span>
            </button>

            <button
              onClick={() => {
                audioService.playPhaseTransition();
                setFlirSatelliteScan(!flirSatelliteScan);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code font-bold rounded cursor-pointer transition-all border ${
                flirSatelliteScan
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'bg-[#020610] text-slate-400 border-[#1e293b] hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Varredura FLIR Orbital: {flirSatelliteScan ? 'LIGADA' : 'DESLIGADA'}</span>
            </button>
          </div>
        </div>

        {/* Living Line Stepper Control Bar */}
        <div className="mt-3 pt-3 border-t border-[#1e293b] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Evolução Cartográfica da Linha:</span>
            </span>
            <div className="flex items-center gap-1 bg-[#020610] p-0.5 border border-[#1e293b] rounded">
              {LIVING_LINE_STAGES.map((st) => (
                <button
                  key={st.stage}
                  onClick={() => {
                    audioService.playNodeSelect();
                    setLivingLineStage(st.stage);
                  }}
                  className={`px-2.5 py-1 text-[11px] rounded transition-colors cursor-pointer ${
                    livingLineStage === st.stage
                      ? 'bg-emerald-600 text-white font-bold shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={st.pedagogicalLesson}
                >
                  Etapa 0{st.stageNumber}: {st.title.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Tactical Layer Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setShowChokepoints(!showChokepoints)}
              className={`px-2 py-0.5 border text-[11px] cursor-pointer ${
                showChokepoints ? 'bg-sky-950/80 text-sky-300 border-sky-500/60 font-bold' : 'text-slate-400 border-[#1e293b]'
              }`}
            >
              Gargantas (10)
            </button>
            <button
              onClick={() => setShowGarrisons(!showGarrisons)}
              className={`px-2 py-0.5 border text-[11px] cursor-pointer ${
                showGarrisons ? 'bg-purple-950/80 text-purple-300 border-purple-500/60 font-bold' : 'text-slate-400 border-[#1e293b]'
              }`}
            >
              Guarnições Seeds (11)
            </button>
            <button
              onClick={() => setShowThreatTheaters(!showThreatTheaters)}
              className={`px-2 py-0.5 border text-[11px] cursor-pointer ${
                showThreatTheaters ? 'bg-rose-950/80 text-rose-300 border-rose-500/60 font-bold' : 'text-slate-400 border-[#1e293b]'
              }`}
            >
              Teatros de Ameaça (4)
            </button>
            <button
              onClick={() => setShowCorridors(!showCorridors)}
              className={`px-2 py-0.5 border text-[11px] cursor-pointer ${
                showCorridors ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 font-bold' : 'text-slate-400 border-[#1e293b]'
              }`}
            >
              Eixos Logísticos
            </button>
          </div>
        </div>
      </div>

      {/* Main Tactical Layout: Map Canvas + Inspector Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interactive World Map SVG */}
        <div className="lg:col-span-8 bg-[#020b12] border border-[#1e293b] relative overflow-hidden shadow-2xl flex flex-col justify-between select-none aspect-[16/9] min-h-[480px]">
          {/* Top Bar Telemetry Display */}
          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-2 bg-[#050e18]/90 px-3 py-1.5 border border-[#1e293b] text-[11px] font-mono-code text-slate-300 backdrop-blur-md">
            <Crosshair className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span className="text-white font-bold">{cursorCoordinates.mgrs}</span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400">{cursorCoordinates.latLong}</span>
            <span className="text-slate-500">|</span>
            <span className="text-amber-400">ZOOM: {Math.round(zoomLevel * 100)}%</span>
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1 bg-[#050e18]/90 p-1 border border-[#1e293b] backdrop-blur-md">
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded cursor-pointer"
              title="Aproximar (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded cursor-pointer"
              title="Afastar (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded cursor-pointer"
              title="Redefinir Visão"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* SVG Map Container */}
          <div
            className={`w-full h-full relative ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-crosshair'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 1000 562.5"
              className="w-full h-full object-contain"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.15s ease-out'
              }}
            >
              <defs>
                {/* Geodesic Grid */}
                <pattern id="globalMilitaryGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0ea5e9" strokeWidth="0.4" strokeOpacity="0.25" />
                </pattern>

                {/* Ocean Waves / FLIR Pattern */}
                <pattern id="oceanTacticalPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 0 10 Q 5 5, 10 10 T 20 10" fill="none" stroke="#0284c7" strokeWidth="0.5" strokeOpacity="0.3" />
                </pattern>

                {/* Threat Pulse Filter */}
                <filter id="threatGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ef4444" floodOpacity="0.9" />
                </filter>
              </defs>

              {/* 1. Ocean Background */}
              <rect width="1000" height="562.5" fill="#030d17" />
              <rect width="1000" height="562.5" fill="url(#oceanTacticalPattern)" />

              {/* 2. Geodesic Graticule */}
              {showGrid && (
                <g id="world-graticule" className="pointer-events-none">
                  <rect width="1000" height="562.5" fill="url(#globalMilitaryGrid)" />
                  {/* Equator & Prime Meridian */}
                  <line x1="0" y1="281.25" x2="1000" y2="281.25" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6,4" strokeOpacity="0.6" />
                  <line x1="500" y1="0" x2="500" y2="562.5" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6,4" strokeOpacity="0.6" />
                  <text x="15" y="277" fill="#38bdf8" fontSize="9" fontFamily="monospace" opacity="0.7">EQUADOR (00°00'N)</text>
                  <text x="505" y="20" fill="#38bdf8" fontSize="9" fontFamily="monospace" opacity="0.7">MERIDIANO ZERO</text>
                </g>
              )}

              {/* 3. FLIR Satellite Scan Overlay */}
              {flirSatelliteScan && (
                <g id="flir-orbital-sweep" className="pointer-events-none">
                  <rect width="1000" height="562.5" fill="#f59e0b" fillOpacity="0.08" />
                  <circle cx="500" cy="281.25" r="320" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="8,8" opacity="0.4" />
                  <circle cx="500" cy="281.25" r="480" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
                </g>
              )}

              {/* 4. Continental Base Shapes (Respecting Living Line Stages) */}
              {livingLineStage === 'stage_1_envelope' && (
                <g id="stage-1-geometric-envelopes" opacity="0.85">
                  {/* North America Envelope */}
                  <polygon points="60,80 340,70 320,240 180,360 80,240" fill="#e85822" fillOpacity="0.4" stroke="#e85822" strokeWidth="2" strokeDasharray="4,4" />
                  {/* South America Envelope */}
                  <polygon points="170,360 320,380 340,460 250,540 180,440" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" strokeDasharray="4,4" />
                  {/* Africa Envelope */}
                  <polygon points="460,240 600,240 580,380 500,480 430,340" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
                  {/* Eurasia Envelope */}
                  <polygon points="450,110 880,100 890,260 740,360 520,260" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
                  {/* Australia Envelope */}
                  <polygon points="820,420 950,420 940,510 830,500" fill="#eab308" fillOpacity="0.4" stroke="#eab308" strokeWidth="2" strokeDasharray="4,4" />
                </g>
              )}

              {livingLineStage !== 'stage_1_envelope' && (
                <WorldMapPaths
                  showCountryBorders={true}
                  showSubmergedZones={true}
                  showContinentLabels={true}
                  showHistoricalTerritories={false}
                />
              )}

              {/* 5. Transoceanic Strategic Military Corridors */}
              {showCorridors && (
                <g id="military-corridors">
                  {GLOBAL_STRATEGIC_CORRIDORS.map((corridor) => (
                    <g key={corridor.id} className="cursor-pointer">
                      <path
                        d={corridor.pathD}
                        fill="none"
                        stroke={corridor.color}
                        strokeWidth="2.5"
                        strokeDasharray="6,4"
                        strokeOpacity="0.8"
                      />
                    </g>
                  ))}
                </g>
              )}

              {/* 6. Global Threat Theaters */}
              {showThreatTheaters && (
                <g id="threat-theaters">
                  {GLOBAL_THREAT_THEATERS.map((th) => (
                      <g
                      key={th.id}
                      className="cursor-pointer"
                      onClick={() => handleSelectThreat(th)}
                      onMouseEnter={() => setHoveredEntity({ type: 'threat', data: th })}
                      onMouseLeave={() => setHoveredEntity(null)}
                    >
                      <circle
                        cx={th.center.x}
                        cy={th.center.y}
                        r={th.radius}
                        fill="#ef4444"
                        fillOpacity="0.15"
                        stroke="#ef4444"
                        strokeWidth="1.8"
                        strokeDasharray="4,4"
                        className="animate-pulse"
                      />
                      <circle cx={th.center.x} cy={th.center.y} r="4" fill="#ef4444" />
                      <text
                        x={th.center.x}
                        y={th.center.y - th.radius - 4}
                        textAnchor="middle"
                        fill="#f87171"
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        ⚠️ {th.name.split(' ')[0]} {th.name.split(' ')[1]}
                      </text>
                    </g>
                  ))}
                </g>
              )}

              {/* 7. Strategic Global Chokepoints */}
              {showChokepoints && (
                <g id="chokepoints-layer">
                  {GLOBAL_MILITARY_CHOKEPOINTS.map((cp) => {
                    const isSelected = selectedChokepoint?.id === cp.id;
                    return (
                      <g
                        key={cp.id}
                        transform={`translate(${cp.x}, ${cp.y})`}
                        className="cursor-pointer transition-transform hover:scale-125"
                        onClick={() => handleSelectChokepoint(cp)}
                        onMouseEnter={() => setHoveredEntity({ type: 'chokepoint', data: cp })}
                        onMouseLeave={() => setHoveredEntity(null)}
                      >
                        {isSelected && (
                          <circle r="14" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" className="animate-spin" />
                        )}
                        <rect
                          x="-6"
                          y="-6"
                          width="12"
                          height="12"
                          fill={cp.threatLevel === 'Hostil / Disputado' ? '#ef4444' : '#0284c7'}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          transform="rotate(45)"
                        />
                        <text
                          x="10"
                          y="4"
                          fill={isSelected ? '#ffffff' : '#93c5fd'}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                        >
                          {cp.name.split('(')[0]}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* 8. Seeds Global Garrisons (11 Echelons) */}
              {showGarrisons && (
                <g id="garrisons-layer">
                  {GLOBAL_SEEDS_GARRISONS.map((gar) => {
                    const isSelected = selectedGarrison?.id === gar.id;
                    return (
                      <g
                        key={gar.id}
                        transform={`translate(${gar.x}, ${gar.y})`}
                        className="cursor-pointer transition-transform hover:scale-125"
                        onClick={() => handleSelectGarrison(gar)}
                        onMouseEnter={() => setHoveredEntity({ type: 'garrison', data: gar })}
                        onMouseLeave={() => setHoveredEntity(null)}
                      >
                        {isSelected && (
                          <circle r="18" fill="none" stroke={gar.color} strokeWidth="2" className="animate-ping" />
                        )}
                        <circle
                          r="9"
                          fill={gar.color}
                          stroke="#ffffff"
                          strokeWidth="1.8"
                        />
                        <text
                          y="3"
                          textAnchor="middle"
                          fill="#000000"
                          fontSize="8"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          HQ
                        </text>
                        <text
                          x="12"
                          y="4"
                          fill={gar.color}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {gar.name.split(' ')[0]} {gar.name.split(' ')[1]} ({gar.readinessPct}%)
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>
          </div>

          {/* Floating Tooltip */}
          {hoveredEntity && (
            <div 
              className="fixed bg-[#050e18]/95 border border-[#1e293b] rounded-lg p-3 shadow-2xl text-xs font-mono-code pointer-events-none z-50 backdrop-blur-md transform -translate-x-1/2 -translate-y-[120%]"
              style={{ left: mousePos.x, top: mousePos.y }}
            >
              <div className="flex items-center gap-2 border-b border-[#1e293b] pb-2 mb-2">
                <Crosshair className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span className="font-bold text-white uppercase">{hoveredEntity.data.name}</span>
              </div>
              <div className="text-[10px] text-slate-300">
                {hoveredEntity.type === 'chokepoint' && (
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-400">AMEAÇA:</span>
                    <span className={hoveredEntity.data.threatLevel === 'Hostil / Disputado' ? 'text-rose-400 font-bold' : 'text-amber-400'}>{hoveredEntity.data.threatLevel}</span>
                  </div>
                )}
                {hoveredEntity.type === 'garrison' && (
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-400">PRONTIDÃO HQ:</span>
                    <span className="text-emerald-400 font-bold">{hoveredEntity.data.readinessPct}%</span>
                  </div>
                )}
                {hoveredEntity.type === 'threat' && (
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-400">SEVERIDADE:</span>
                    <span className="text-rose-400 font-bold">{hoveredEntity.data.severity}</span>
                  </div>
                )}
                <div className="mt-2 pt-2 border-t border-[#1e293b] flex justify-between items-center text-[9px] text-slate-500">
                  <Navigation className="w-3 h-3" />
                  <span>POS: {cursorCoordinates.latLong}</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Bar Controls & Legend */}
          <div className="bg-[#050e18] px-3 py-2 border-t border-[#1e293b] flex items-center justify-between text-xs font-mono-code text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-[#0284c7] rotate-45 inline-block" />
                <span>Gargantas Chokepoint</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block" />
                <span>Guarnições Seeds HQ</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full border border-dashed border-red-500 inline-block" />
                <span>Teatros de Ameaça</span>
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 hidden sm:inline">
              PROJEÇÃO GEOESPACIAL ROBINSON / MIL-STD-2525
            </span>
          </div>
        </div>

        {/* Right: Military Intelligence Inspector Dossier */}
        <div className="lg:col-span-4 bg-[#050e18] border border-[#1e293b] p-4 flex flex-col justify-between shadow-xl min-h-[480px]">
          {/* Selected Chokepoint Briefing */}
          {selectedChokepoint && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-2">
                <div>
                  <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 bg-sky-500/20 text-sky-400 border border-sky-500/40 rounded">
                    GARGANTA ESTRATÉGICA • {selectedChokepoint.internationalCode}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    {selectedChokepoint.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono-code text-slate-400 block">AMEAÇA</span>
                  <span className={`text-xs font-mono-code font-bold ${
                    selectedChokepoint.threatLevel === 'Hostil / Disputado' ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {selectedChokepoint.threatLevel}
                  </span>
                </div>
              </div>

              {/* Metric Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
                <div className="bg-[#020610] p-2 border border-[#1e293b] rounded">
                  <span className="text-slate-500 block text-[10px]">LARGURA DO CANAL</span>
                  <span className="text-sky-300 font-bold">{selectedChokepoint.widthKm} km</span>
                </div>
                <div className="bg-[#020610] p-2 border border-[#1e293b] rounded">
                  <span className="text-slate-500 block text-[10px]">IMPORTÂNCIA</span>
                  <span className="text-emerald-300 font-bold">{selectedChokepoint.strategicImportance}</span>
                </div>
                <div className="bg-[#020610] p-2 border border-[#1e293b] rounded col-span-2">
                  <span className="text-slate-500 block text-[10px]">CONTROLE DOUTRINÁRIO</span>
                  <span className="text-slate-200 font-bold truncate block">{selectedChokepoint.controllingFaction}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed bg-[#020610] p-2.5 border border-[#1e293b] rounded">
                {selectedChokepoint.description}
              </p>

              {/* Tactical Doctrine */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-mono-code text-slate-400 font-bold uppercase block">
                  Diretrizes Táticas de Operação:
                </span>
                <div className="space-y-1 text-slate-300">
                  <div className="bg-[#020610] p-2 border-l-2 border-sky-500 text-[11px]">
                    <strong className="text-sky-400 font-mono-code">Acesso Naval:</strong> {selectedChokepoint.tacticalDoctrine.navalAccess}
                  </div>
                  <div className="bg-[#020610] p-2 border-l-2 border-emerald-500 text-[11px]">
                    <strong className="text-emerald-400 font-mono-code">Manobra Terrestre:</strong> {selectedChokepoint.tacticalDoctrine.landManoeuvre}
                  </div>
                  <div className="bg-[#020610] p-2 border-l-2 border-purple-500 text-[11px]">
                    <strong className="text-purple-400 font-mono-code">Logística Seeds:</strong> {selectedChokepoint.tacticalDoctrine.seedsLogistics}
                  </div>
                </div>
              </div>

              {/* Recommended Force */}
              <div className="bg-amber-950/40 border border-amber-500/40 p-2.5 rounded text-xs">
                <span className="text-amber-400 font-mono-code font-bold block text-[10px] uppercase">
                  Efetivo Militar Recomendado:
                </span>
                <span className="text-slate-200">{selectedChokepoint.recommendedTroopForce}</span>
              </div>
            </div>
          )}

          {/* Selected Garrison Briefing */}
          {selectedGarrison && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-2">
                <div>
                  <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded">
                    GUARNIÇÃO MILITAR SEEDS • HQ
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    {selectedGarrison.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono-code text-slate-400 block">PRONTIDÃO</span>
                  <span className="text-xs font-mono-code font-bold text-emerald-400">
                    {selectedGarrison.readinessPct}%
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
                <div className="bg-[#020610] p-2 border border-[#1e293b] rounded">
                  <span className="text-slate-500 block text-[10px]">EFETIVO ATIVO</span>
                  <span className="text-emerald-300 font-bold">{selectedGarrison.activeTroops.toLocaleString()} soldados</span>
                </div>
                <div className="bg-[#020610] p-2 border border-[#1e293b] rounded">
                  <span className="text-slate-500 block text-[10px]">BLINDADOS / VIATURAS</span>
                  <span className="text-sky-300 font-bold">{selectedGarrison.mechanizedVehicles} unid.</span>
                </div>
                <div className="bg-[#020610] p-2 border border-[#1e293b] rounded col-span-2">
                  <span className="text-slate-500 block text-[10px]">COMANDANTE EM CHEFE</span>
                  <span className="text-slate-200 font-bold">{selectedGarrison.commander}</span>
                </div>
              </div>

              {/* Mission & Defense */}
              <div className="space-y-2 text-xs">
                <div className="bg-[#020610] p-2.5 border border-[#1e293b] rounded">
                  <span className="text-purple-400 font-mono-code font-bold block text-[10px] uppercase">
                    Escudo de Defesa Aeroespacial:
                  </span>
                  <span className="text-slate-300 text-[11px]">{selectedGarrison.airDefenseNetwork}</span>
                </div>

                <div className="bg-[#020610] p-2.5 border border-[#1e293b] rounded">
                  <span className="text-sky-400 font-mono-code font-bold block text-[10px] uppercase">
                    Missão Primária Operacional:
                  </span>
                  <span className="text-slate-300 text-[11px]">{selectedGarrison.primaryMission}</span>
                </div>
              </div>

              {/* Fortification */}
              <div className="bg-[#020610] p-2 border border-[#1e293b] rounded text-xs flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Nível de Fortificação:</span>
                <span className="text-amber-400 font-mono-code font-bold text-[11px]">{selectedGarrison.fortificationLevel}</span>
              </div>
            </div>
          )}

          {/* Selected Threat Briefing */}
          {selectedThreat && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-2">
                <div>
                  <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded">
                    TEATRO DE AMEAÇA PLANETÁRIA
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    {selectedThreat.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono-code text-slate-400 block">SEVERIDADE</span>
                  <span className="text-xs font-mono-code font-bold text-rose-400">
                    {selectedThreat.severity}
                  </span>
                </div>
              </div>

              <div className="bg-[#020610] p-2 border border-[#1e293b] rounded text-xs font-mono-code">
                <span className="text-slate-500 block text-[10px]">RAIO DE DANO COLATERAL</span>
                <span className="text-rose-300 font-bold">{selectedThreat.dangerRadiusKm} km</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-[#020610] p-2.5 border border-[#1e293b] rounded">
                {selectedThreat.description}
              </p>

              <div className="bg-rose-950/40 border border-rose-500/40 p-2.5 rounded text-xs">
                <span className="text-rose-400 font-mono-code font-bold block text-[10px] uppercase">
                  Diretriz de Engajamento de Combate:
                </span>
                <span className="text-slate-200">{selectedThreat.combatDirective}</span>
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between">
            <span className="text-[11px] font-mono-code text-slate-400">
              {GLOBAL_MILITARY_CHOKEPOINTS.length} Gargantas • {GLOBAL_SEEDS_GARRISONS.length} Guarnições
            </span>
            <button
              onClick={() => setIsPedagogyModalOpen(true)}
              className="text-xs font-mono-code text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              Guia Pedagógico da Linha Viva →
            </button>
          </div>
        </div>
      </div>

      {/* Living Line Pedagogy Modal */}
      <LivingLinePedagogyModal
        isOpen={isPedagogyModalOpen}
        onClose={() => setIsPedagogyModalOpen(false)}
        onApplyStageToMap={(stage) => setLivingLineStage(stage)}
      />
    </div>
  );
};
