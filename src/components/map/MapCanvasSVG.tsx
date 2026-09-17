import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Crosshair, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Move
} from 'lucide-react';
import { TEAMS_DATA } from '../../data/sevenSeedsData';
import { TeamData } from '../../types';
import { MapLayerMode } from './MapLayerControls';
import { audioService } from '../../services/audioService';

interface MapCanvasSVGProps {
  activeLayer: MapLayerMode;
  selectedTeam: TeamData | null;
  hoveredTeam: TeamData | null;
  onSelectTeam: (team: TeamData) => void;
  onHoverTeam: (team: TeamData | null) => void;
}

export const MapCanvasSVG: React.FC<MapCanvasSVGProps> = ({
  activeLayer,
  selectedTeam,
  hoveredTeam,
  onSelectTeam,
  onHoverTeam,
}) => {
  // Zoom and Pan State
  const [zoom, setZoom] = useState<number>(1.0);
  const [center, setCenter] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ clientX: number; clientY: number; startCenter: { x: number; y: number } }>({
    clientX: 0,
    clientY: 0,
    startCenter: { x: 50, y: 50 },
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom handlers
  const handleZoomIn = () => {
    audioService.playNodeSelect();
    setZoom((prev) => Math.min(Number((prev + 0.35).toFixed(2)), 3.5));
  };

  const handleZoomOut = () => {
    audioService.playNodeSelect();
    setZoom((prev) => {
      const next = Math.max(Number((prev - 0.35).toFixed(2)), 1.0);
      if (next <= 1.0) {
        setCenter({ x: 50, y: 50 });
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    audioService.playPhaseTransition();
    setZoom(1.0);
    setCenter({ x: 50, y: 50 });
  };

  // Quick Sector Focus
  const handleFocusSector = (x: number, y: number, targetZoom: number = 2.2) => {
    audioService.playNodeSelect();
    setCenter({ x, y });
    setZoom(targetZoom);
  };

  // Wheel zoom handler with smooth dampening
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(Number((prev + 0.2).toFixed(2)), 3.5));
    } else {
      setZoom((prev) => {
        const next = Math.max(Number((prev - 0.2).toFixed(2)), 1.0);
        if (next <= 1.0) {
          setCenter({ x: 50, y: 50 });
        }
        return next;
      });
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  // Drag and pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startCenter: { ...center },
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;

    const viewBoxWidth = 100 / zoom;
    const viewBoxHeight = 100 / zoom;

    const svgDx = (dx / rect.width) * viewBoxWidth;
    const svgDy = (dy / rect.height) * viewBoxHeight;

    const newCenterX = Math.max(viewBoxWidth / 2, Math.min(100 - viewBoxWidth / 2, dragStartRef.current.startCenter.x - svgDx));
    const newCenterY = Math.max(viewBoxHeight / 2, Math.min(100 - viewBoxHeight / 2, dragStartRef.current.startCenter.y - svgDy));

    setCenter({ x: newCenterX, y: newCenterY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
        startCenter: { ...center },
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current || e.touches.length !== 1) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = e.touches[0].clientX - dragStartRef.current.clientX;
    const dy = e.touches[0].clientY - dragStartRef.current.clientY;

    const viewBoxWidth = 100 / zoom;
    const viewBoxHeight = 100 / zoom;

    const svgDx = (dx / rect.width) * viewBoxWidth;
    const svgDy = (dy / rect.height) * viewBoxHeight;

    const newCenterX = Math.max(viewBoxWidth / 2, Math.min(100 - viewBoxWidth / 2, dragStartRef.current.startCenter.x - svgDx));
    const newCenterY = Math.max(viewBoxHeight / 2, Math.min(100 - viewBoxHeight / 2, dragStartRef.current.startCenter.y - svgDy));

    setCenter({ x: newCenterX, y: newCenterY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Calculate dynamic viewBox
  const vbWidth = 100 / zoom;
  const vbHeight = 100 / zoom;
  const vbX = Math.max(0, Math.min(100 - vbWidth, center.x - vbWidth / 2));
  const vbY = Math.max(0, Math.min(100 - vbHeight, center.y - vbHeight / 2));

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full aspect-[4/3] bg-[#080d16] rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center select-none ${
        zoom > 1.0 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
      }`}
    >
      {/* Grid Lines & Radar background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      {/* Floating Tactical Zoom & Pan Toolbar */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1.5 pointer-events-auto">
        {/* Zoom Level Indicator & Controls */}
        <div className="flex items-center bg-[#0a101d]/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-1 shadow-xl">
          <button
            id="map-zoom-in-btn"
            onClick={handleZoomIn}
            title="Aproximar Mapa (+)"
            className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <span className="px-2 py-0.5 text-xs font-mono-code font-bold text-cyan-400 select-none min-w-[52px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            id="map-zoom-out-btn"
            onClick={handleZoomOut}
            title="Afastar Mapa (-)"
            disabled={zoom <= 1.0}
            className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button
            id="map-zoom-reset-btn"
            onClick={handleResetZoom}
            title="Restaurar Visão Geral (100%)"
            className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Sector Focus Pills */}
        <div className="hidden sm:flex items-center gap-1 bg-[#0a101d]/85 backdrop-blur-md border border-slate-800 rounded-md p-1 shadow-lg text-[10px] font-mono-code">
          <span className="text-slate-400 px-1">Foco:</span>
          <button
            onClick={() => handleFocusSector(56, 42, 2.4)}
            className="px-1.5 py-0.5 rounded bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-500/30 transition-all cursor-pointer"
            title="Centralizar na 8ª Arca Fuji (Ilha de Sado)"
          >
            QG Sado
          </button>
          <button
            onClick={() => handleFocusSector(75, 18, 2.0)}
            className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Centralizar em Hokkaido (Equipe Inverno)"
          >
            Norte
          </button>
          <button
            onClick={() => handleFocusSector(58, 54, 2.0)}
            className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Centralizar em Honshu (Equipes Verão A / Ryūgū)"
          >
            Centro
          </button>
          <button
            onClick={() => handleFocusSector(26, 78, 2.0)}
            className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Centralizar em Kyushu / Shikoku (Primavera / Verão B)"
          >
            Sul
          </button>
        </div>
      </div>

      {/* Compass Rose */}
      <div className="absolute top-3 left-3 text-slate-600 flex flex-col items-center text-[10px] font-mono-code select-none pointer-events-none z-10">
        <span className="text-emerald-500 font-bold">N</span>
        <div className="w-5 h-5 border border-slate-700/80 rounded-full flex items-center justify-center my-0.5">
          <Crosshair className="w-3 h-3 text-slate-500" />
        </div>
        <span>S</span>
      </div>

      {/* Radar circle concentric lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-[85%] rounded-full border border-slate-800/40" />
        <div className="w-[60%] h-[60%] rounded-full border border-slate-800/30" />
        <div className="w-[35%] h-[35%] rounded-full border border-slate-800/20" />
        {/* Radar sweep beam */}
        <div className="absolute w-[85%] h-[85%] rounded-full border border-transparent border-t-emerald-500/30 animate-radar" />
      </div>

      {/* Dynamic Scaled SVG Japan Archipelago Map Outline & Trails */}
      <svg 
        viewBox={`${vbX} ${vbY} ${vbWidth} ${vbHeight}`} 
        className="w-full h-full p-2 select-none transition-[viewBox] duration-150"
      >
        <defs>
          <linearGradient id="sado-beam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stylized Post-Apocalyptic Japan Contours */}
        {/* Hokkaido (North) */}
        <path
          d="M 66 12 Q 78 10 84 15 Q 88 22 80 25 Q 70 28 64 22 Z"
          fill="#151e2e"
          stroke="#334155"
          strokeWidth="0.8"
          className="transition-colors hover:fill-[#1e293b]"
        />

        {/* Honshu Main Arc */}
        <path
          d="M 63 25 Q 67 35 62 48 Q 58 58 48 64 Q 38 68 32 72 Q 28 70 34 62 Q 45 54 52 42 Q 57 32 63 25 Z"
          fill="#151e2e"
          stroke="#334155"
          strokeWidth="0.8"
          className="transition-colors hover:fill-[#1e293b]"
        />

        {/* Shikoku */}
        <path
          d="M 38 72 Q 44 70 46 76 Q 42 79 36 77 Z"
          fill="#151e2e"
          stroke="#334155"
          strokeWidth="0.8"
        />

        {/* Kyushu */}
        <path
          d="M 24 74 Q 30 72 32 79 Q 28 86 22 84 Q 20 78 24 74 Z"
          fill="#151e2e"
          stroke="#334155"
          strokeWidth="0.8"
        />

        {/* Sado Island (The Convergence Sanctuary) */}
        <ellipse
          cx="56"
          cy="42"
          rx="3"
          ry="2.2"
          fill="#06b6d4"
          fillOpacity="0.25"
          stroke="#06b6d4"
          strokeWidth="0.8"
          className="animate-pulse"
        />

        {/* Hazard Zones (if activeLayer === 'all' or 'hazards') */}
        {(activeLayer === 'all' || activeLayer === 'hazards') && (
          <>
            {/* Hokkaido Arctic Megafauna Hazard */}
            <circle cx="75" cy="18" r="7" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1,1" />
            {/* Vale dos Insetos Toxic Hazard */}
            <circle cx="48" cy="65" r="5" fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="1,1" />
            {/* Ryūgū X-Virus Vault Hazard */}
            <circle cx="62" cy="58" r="6" fill="#a855f7" fillOpacity="0.12" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="1,1" />
          </>
        )}

        {/* Migration Trails to Sado Convergence (if activeLayer === 'all' or 'routes') */}
        {(activeLayer === 'all' || activeLayer === 'routes') && (
          <g opacity="0.6">
            {/* Inverno to Sado */}
            <path d="M 75 18 Q 66 30 56 42" stroke="#38bdf8" strokeWidth="0.7" strokeDasharray="1.5,1.5" fill="none" />
            {/* Primavera to Sado */}
            <path d="M 48 65 Q 52 52 56 42" stroke="#ec4899" strokeWidth="0.7" strokeDasharray="1.5,1.5" fill="none" />
            {/* Verão A to Sado */}
            <path d="M 58 54 Q 57 48 56 42" stroke="#eab308" strokeWidth="0.7" strokeDasharray="1.5,1.5" fill="none" />
            {/* Verão B to Sado */}
            <path d="M 24 84 Q 40 65 56 42" stroke="#10b981" strokeWidth="0.7" strokeDasharray="1.5,1.5" fill="none" />
            {/* Outono to Sado */}
            <path d="M 36 72 Q 46 56 56 42" stroke="#f97316" strokeWidth="0.7" strokeDasharray="1.5,1.5" fill="none" />
          </g>
        )}

        {/* Team Markers */}
        {TEAMS_DATA.map((team) => {
          const isSelected = selectedTeam?.id === team.id;
          const isHovered = hoveredTeam?.id === team.id;
          const isFuji = team.id === 'arca-fuji';
          const isRyugu = team.id === 'ryugu';
          
          // Tactical Military Code
          const tacticalCode = 
            team.id === 'inverno' ? 'INV' :
            team.id === 'primavera' ? 'PRI' :
            team.id === 'verao-a' ? 'VR-A' :
            team.id === 'verao-b' ? 'VR-B' :
            team.id === 'outono' ? 'OUT' :
            team.id === 'ryugu' ? 'RYU' : 'QG SADO';

          // Status Color: Green (Safe/Active), Amber (Caution/Transit), Red (Critical/Fallen), Cyan (Convergence Hub)
          const statusColor = 
            isFuji ? '#06b6d4' :
            isRyugu ? '#ef4444' :
            team.threatLevel === 'Baixo' ? '#10b981' :
            team.threatLevel === 'Moderado' ? '#38bdf8' : '#f59e0b';

          return (
            <g
              key={team.id}
              id={`map-marker-${team.id}`}
              transform={`translate(${team.coordinates.x}, ${team.coordinates.y})`}
              className="cursor-pointer group pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                onSelectTeam(team);
              }}
              onMouseEnter={() => onHoverTeam(team)}
              onMouseLeave={() => onHoverTeam(null)}
            >
              {/* Radar pulse for Selected, Hovered or Central Sado Hub */}
              {(isSelected || isHovered || isFuji) && (
                <circle
                  r={isFuji ? 7 : 5.5}
                  fill="none"
                  stroke={statusColor}
                  strokeWidth="0.8"
                  opacity="0.8"
                  className="animate-ping"
                />
              )}

              {/* Marker Base Ring */}
              <circle
                r={isFuji ? 4.5 : 3.8}
                fill="#0f172a"
                stroke={isSelected ? '#ffffff' : statusColor}
                strokeWidth={isSelected ? 1.4 : 1.0}
              />

              {/* Inner Tactical Dot */}
              <circle
                r={isFuji ? 2.2 : 1.8}
                fill={statusColor}
              />

              {/* Tactical Badge Pill with Clean Military Abbreviation */}
              <g transform={`translate(0, ${team.coordinates.y < 30 ? 6.5 : -5.5})`}>
                <rect
                  x={isFuji ? -8.5 : -6}
                  y="-2.4"
                  width={isFuji ? 17 : 12}
                  height="4.8"
                  rx="1.5"
                  fill={isSelected ? '#0284c7' : '#090e17'}
                  stroke={isSelected ? '#38bdf8' : statusColor}
                  strokeWidth="0.6"
                  opacity="0.95"
                />
                <text
                  x="0"
                  y="1.1"
                  textAnchor="middle"
                  fill={isSelected ? '#ffffff' : '#f8fafc'}
                  fontSize="2.4"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                  className="pointer-events-none tracking-tight select-none"
                >
                  {tacticalCode}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Floating Tactical HUD on Hover */}
      {hoveredTeam && (
        <div className="absolute top-12 left-4 bg-[#090e17]/95 border border-slate-700 rounded-lg p-2.5 shadow-xl text-xs font-mono-code pointer-events-none z-20 backdrop-blur-md max-w-xs">
          <div className="flex items-center gap-2">
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: hoveredTeam.color }} 
            />
            <span className="font-bold text-white uppercase font-sans">{hoveredTeam.name}</span>
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            <span className="text-slate-400">Comando: </span>
            <span className="text-emerald-400 font-semibold font-sans">{hoveredTeam.effectiveLeadership}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Efetivo: <span className="text-cyan-400 font-bold">{hoveredTeam.survivalCount} Vidas</span>
          </div>
        </div>
      )}

      {/* Bottom Status & Pan Indicator */}
      <div className="absolute bottom-3 left-3 bg-[#090e17]/95 backdrop-blur-md border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-mono-code flex flex-wrap items-center gap-2.5 text-slate-300 z-10">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <strong className="text-white">QG Sado</strong>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Ativo</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          <span>Ryūgū</span>
        </span>
        {zoom > 1.0 && (
          <span className="hidden sm:inline-flex items-center gap-1 text-cyan-400 border-l border-slate-700 pl-2 text-[10px]">
            <Move className="w-3 h-3 animate-pulse" /> Arraste p/ mover
          </span>
        )}
      </div>
    </div>
  );
};
