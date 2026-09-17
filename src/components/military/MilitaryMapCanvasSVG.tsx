import React, { useState, useRef, useEffect } from 'react';
import { 
  McooZone, 
  OperationsFeature, 
  SoilZone, 
  CanopyZone, 
  BioticZone,
  MilitaryMapModelId,
  WargameWaypoint
} from '../../types/militaryMaps';
import { 
  MCOO_ZONES_DATA, 
  OPERATIONS_FEATURES_DATA, 
  SOIL_ZONES_DATA, 
  CANOPY_ZONES_DATA, 
  BIOTIC_ZONES_DATA 
} from '../../data/militaryMapsData';
import { 
  Crosshair, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Radio, 
  ShieldAlert, 
  Eye, 
  Droplets,
  Trees,
  Footprints,
  Activity,
  Zap,
  Target
} from 'lucide-react';
import { audioService } from '../../services/audioService';

interface MilitaryMapCanvasSVGProps {
  activeModel: MilitaryMapModelId;
  secondaryModelForSplit?: MilitaryMapModelId;
  weatherRainPct: number; // 0 (Dry) to 100 (Saturated Rasputitsa)
  flirScanActive: boolean;
  selectedFeatureId: string | null;
  onSelectFeature: (feature: { type: string; data: any } | null) => void;
  hoveredFeature: { type: string; data: any } | null;
  onHoverFeature: (feature: { type: string; data: any } | null) => void;
  activeWargameRouteWaypoints?: WargameWaypoint[];
  showGridLines: boolean;
  showRangeRings: boolean;
  splitRatio?: number; // 0 to 100 for split screen
}

export const MilitaryMapCanvasSVG: React.FC<MilitaryMapCanvasSVGProps> = ({
  activeModel,
  secondaryModelForSplit = 'operations',
  weatherRainPct,
  flirScanActive,
  selectedFeatureId,
  onSelectFeature,
  hoveredFeature,
  onHoverFeature,
  activeWargameRouteWaypoints = [],
  showGridLines,
  showRangeRings,
  splitRatio = 50
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 500, y: 350, mgrs: '54S UJ 8500 3500' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scanPulse, setScanPulse] = useState(0);

  // Radar sweep animation frame
  useEffect(() => {
    let animId: number;
    const updatePulse = () => {
      setScanPulse((prev) => (prev + 1.2) % 1000);
      animId = requestAnimationFrame(updatePulse);
    };
    animId = requestAnimationFrame(updatePulse);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleZoom = (delta: number) => {
    audioService.playNodeSelect();
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.75), 3.0));
  };

  const handleResetView = () => {
    audioService.playNodeSelect();
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    if (containerRef.current) {
      const svgElement = containerRef.current.querySelector('svg');
      if (svgElement) {
        const ctm = svgElement.getScreenCTM();
        if (ctm) {
          const point = svgElement.createSVGPoint();
          point.x = e.clientX;
          point.y = e.clientY;
          const svgPoint = point.matrixTransform(ctm.inverse());
          
          const normX = Math.round(Math.max(0, Math.min(1000, svgPoint.x)));
          const normY = Math.round(Math.max(0, Math.min(700, svgPoint.y)));
          
          const mgrsEast = (8000 + Math.floor(normX * 2)).toString().padStart(4, '0');
          const mgrsNorth = (3000 + Math.floor(normY * 2)).toString().padStart(4, '0');
          
          setCursorPos({
            x: normX,
            y: normY,
            mgrs: `54S UJ ${mgrsEast} ${mgrsNorth}`
          });
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Render feature specific layer helper
  const renderLayerGraphics = (modelId: MilitaryMapModelId, clipId?: string) => {
    switch (modelId) {
      case 'mcoo':
        return (
          <g id="layer-mcoo" clipPath={clipId ? `url(#${clipId})` : undefined}>
            {MCOO_ZONES_DATA.map((zone) => {
              const isHovered = hoveredFeature?.data?.id === zone.id;
              const isSelected = selectedFeatureId === zone.id;

              let fillColor = 'rgba(16, 185, 129, 0.22)'; // Green unrestricted
              let strokeColor = '#10b981';
              let strokeDash = 'none';

              if (zone.mobility === 'severely_restricted') {
                fillColor = 'url(#hatch-severely-restricted)';
                strokeColor = '#f43f5e';
                strokeDash = '6 3';
              } else if (zone.mobility === 'restricted') {
                fillColor = 'url(#hatch-restricted)';
                strokeColor = '#eab308';
                strokeDash = '4 2';
              }

              return (
                <g 
                  key={zone.id}
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => onHoverFeature({ type: 'mcoo', data: zone })}
                  onMouseLeave={() => onHoverFeature(null)}
                  onClick={() => {
                    audioService.playNodeSelect();
                    onSelectFeature({ type: 'mcoo', data: zone });
                  }}
                >
                  <path
                    d={zone.pathD}
                    fill={fillColor}
                    stroke={isSelected ? '#38bdf8' : strokeColor}
                    strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1.5}
                    strokeDasharray={strokeDash}
                    className="hover:opacity-90"
                  />
                  {/* Subtle Tactical Code Tag on hover/selected */}
                  {(isHovered || isSelected) && (
                    <g transform={`translate(${zone.center.x}, ${zone.center.y})`}>
                      <circle r="6" fill={strokeColor} />
                      <circle r="12" fill="none" stroke={strokeColor} strokeWidth="1.5" className="animate-ping" />
                      <rect 
                        x="10" 
                        y="-14" 
                        width="140" 
                        height="26" 
                        fill="#020617" 
                        stroke={strokeColor} 
                        strokeWidth="1"
                        rx="2"
                      />
                      <text 
                        x="16" 
                        y="4" 
                        fill="#ffffff" 
                        fontSize="10" 
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {zone.mobility === 'severely_restricted' ? '[SEV-RESTRITO]' : zone.mobility === 'restricted' ? '[RESTRITO]' : '[IRRESTRITO]'}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );

      case 'operations':
        return (
          <g id="layer-operations" clipPath={clipId ? `url(#${clipId})` : undefined}>
            {OPERATIONS_FEATURES_DATA.map((feat) => {
              const isHovered = hoveredFeature?.data?.id === feat.id;
              const isSelected = selectedFeatureId === feat.id;

              return (
                <g 
                  key={feat.id}
                  className="cursor-pointer"
                  onMouseEnter={() => onHoverFeature({ type: 'operations', data: feat })}
                  onMouseLeave={() => onHoverFeature(null)}
                  onClick={() => {
                    audioService.playNodeSelect();
                    onSelectFeature({ type: 'operations', data: feat });
                  }}
                >
                  {/* Line Vectors */}
                  {feat.pathD && (
                    <g>
                      <path
                        d={feat.pathD}
                        fill="none"
                        stroke={
                          feat.type === 'axis_main_effort' ? '#38bdf8' :
                          feat.type === 'axis_supporting_effort' ? '#818cf8' :
                          feat.type === 'fscl' ? '#f59e0b' : '#38bdf8'
                        }
                        strokeWidth={
                          feat.type === 'axis_main_effort' ? (isHovered || isSelected ? 5.5 : 4) :
                          feat.type === 'axis_supporting_effort' ? (isHovered || isSelected ? 3.5 : 2.5) : 2
                        }
                        strokeDasharray={
                          feat.type === 'line_of_departure' ? '8 4' :
                          feat.type === 'fscl' ? '12 4 3 4' : 'none'
                        }
                        markerEnd={
                          feat.type === 'axis_main_effort' ? 'url(#arrow-main-effort)' :
                          feat.type === 'axis_supporting_effort' ? 'url(#arrow-support-effort)' : undefined
                        }
                      />
                    </g>
                  )}

                  {/* Marker Points & Tactical Objective Nodes */}
                  {feat.type === 'objective' && (
                    <g transform={`translate(${feat.center.x}, ${feat.center.y})`}>
                      <circle r="18" fill="#f43f5e" fillOpacity="0.25" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
                      <circle r="6" fill="#f43f5e" />
                      <rect x="-35" y="-30" width="70" height="16" fill="#020617" stroke="#f43f5e" strokeWidth="1" rx="2" />
                      <text x="0" y="-18" fill="#fecdd3" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        {feat.unitCode}
                      </text>
                    </g>
                  )}

                  {feat.type === 'attack_position' && (
                    <g transform={`translate(${feat.center.x}, ${feat.center.y})`}>
                      <rect x="-14" y="-14" width="28" height="28" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" />
                      <circle r="4" fill="#38bdf8" />
                      <text x="0" y="24" fill="#7dd3fc" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        {feat.unitCode}
                      </text>
                    </g>
                  )}

                  {feat.type === 'hide_site' && (
                    <g transform={`translate(${feat.center.x}, ${feat.center.y})`}>
                      <polygon points="0,-16 14,12 -14,12" fill="#10b981" fillOpacity="0.3" stroke="#34d399" strokeWidth="1.5" />
                      <circle r="3" fill="#34d399" />
                      <text x="0" y="24" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        [HIDE-SITE]
                      </text>
                    </g>
                  )}

                  {feat.type === 'restricted_fire_area' && (
                    <g transform={`translate(${feat.center.x}, ${feat.center.y})`}>
                      <circle r="30" fill="#eab308" fillOpacity="0.15" stroke="#eab308" strokeWidth="1.5" strokeDasharray="4 3" />
                      <text x="0" y="4" fill="#fef08a" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        RFA (NO INCENDIARY)
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );

      case 'trafficability':
        return (
          <g id="layer-trafficability" clipPath={clipId ? `url(#${clipId})` : undefined}>
            {SOIL_ZONES_DATA.map((soil) => {
              const isHovered = hoveredFeature?.data?.id === soil.id;
              const isSelected = selectedFeatureId === soil.id;

              // Compute dynamic status based on rain moisture slider
              let dynamicStatus = soil.trafficabilityStatus;
              let effectiveCapacity = soil.baseBearingCapacityTon;

              if (weatherRainPct > 40) {
                const drop = (weatherRainPct / 100) * (soil.baseBearingCapacityTon - soil.wetBearingCapacityTon);
                effectiveCapacity = Math.max(1, Math.round(soil.baseBearingCapacityTon - drop));
                if (effectiveCapacity < 10) dynamicStatus = 'NO-GO';
                else if (effectiveCapacity < 45) dynamicStatus = 'SLOW-GO';
              }

              let fillColor = 'rgba(16, 185, 129, 0.25)'; // GO
              let strokeColor = '#10b981';

              if (dynamicStatus === 'NO-GO') {
                fillColor = 'rgba(244, 63, 94, 0.35)';
                strokeColor = '#f43f5e';
              } else if (dynamicStatus === 'SLOW-GO') {
                fillColor = 'rgba(234, 179, 8, 0.30)';
                strokeColor = '#eab308';
              }

              return (
                <g
                  key={soil.id}
                  className="cursor-pointer"
                  onMouseEnter={() => onHoverFeature({ type: 'trafficability', data: { ...soil, dynamicStatus, effectiveCapacity } })}
                  onMouseLeave={() => onHoverFeature(null)}
                  onClick={() => {
                    audioService.playNodeSelect();
                    onSelectFeature({ type: 'trafficability', data: { ...soil, dynamicStatus, effectiveCapacity } });
                  }}
                >
                  <path
                    d={soil.pathD}
                    fill={fillColor}
                    stroke={isSelected ? '#38bdf8' : strokeColor}
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                  />
                  {(isHovered || isSelected) && (
                    <g transform={`translate(${soil.center.x}, ${soil.center.y})`}>
                      <rect x="-45" y="-14" width="90" height="24" fill="#020617" stroke={strokeColor} strokeWidth="1" rx="2" />
                      <text x="0" y="2" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        {dynamicStatus} • {effectiveCapacity}t
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );

      case 'canopy':
        return (
          <g id="layer-canopy" clipPath={clipId ? `url(#${clipId})` : undefined}>
            {CANOPY_ZONES_DATA.map((canopy) => {
              const isHovered = hoveredFeature?.data?.id === canopy.id;
              const isSelected = selectedFeatureId === canopy.id;

              // Color based on canopy closure density
              const alpha = 0.15 + (canopy.canopyClosurePct / 100) * 0.45;
              const fillColor = `rgba(59, 130, 246, ${alpha})`;
              const strokeColor = canopy.canopyClosurePct > 70 ? '#38bdf8' : '#60a5fa';

              return (
                <g
                  key={canopy.id}
                  className="cursor-pointer"
                  onMouseEnter={() => onHoverFeature({ type: 'canopy', data: canopy })}
                  onMouseLeave={() => onHoverFeature(null)}
                  onClick={() => {
                    audioService.playNodeSelect();
                    onSelectFeature({ type: 'canopy', data: canopy });
                  }}
                >
                  <path
                    d={canopy.pathD}
                    fill={fillColor}
                    stroke={isSelected ? '#34d399' : strokeColor}
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                  />
                  {(isHovered || isSelected) && (
                    <g transform={`translate(${canopy.center.x}, ${canopy.center.y})`}>
                      <rect x="-55" y="-14" width="110" height="24" fill="#020617" stroke={strokeColor} strokeWidth="1" rx="2" />
                      <text x="0" y="2" fill="#e0f2fe" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        DOSEL: {canopy.canopyClosurePct}% (FLIR {Math.round(canopy.thermalConcealmentRatio * 100)}%)
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* FLIR Drone Thermal Beam Animation */}
            {flirScanActive && (
              <g className="pointer-events-none">
                <line 
                  x1="0" 
                  y1={scanPulse * 0.7} 
                  x2="1000" 
                  y2={scanPulse * 0.7} 
                  stroke="#38bdf8" 
                  strokeWidth="2" 
                  strokeDasharray="4 2" 
                />
                <rect 
                  x="0" 
                  y={scanPulse * 0.7 - 40} 
                  width="1000" 
                  height="40" 
                  fill="url(#flir-scan-gradient)" 
                />
              </g>
            )}
          </g>
        );

      case 'biotic':
        return (
          <g id="layer-biotic" clipPath={clipId ? `url(#${clipId})` : undefined}>
            {BIOTIC_ZONES_DATA.map((bio) => {
              const isHovered = hoveredFeature?.data?.id === bio.id;
              const isSelected = selectedFeatureId === bio.id;

              let fillColor = 'rgba(16, 185, 129, 0.2)';
              let strokeColor = '#10b981';

              if (bio.threatLevel === 'Crítico / Letal') {
                fillColor = 'rgba(244, 63, 94, 0.35)';
                strokeColor = '#f43f5e';
              } else if (bio.threatLevel === 'Severo') {
                fillColor = 'rgba(249, 115, 22, 0.30)';
                strokeColor = '#f97316';
              } else if (bio.threatLevel === 'Moderado') {
                fillColor = 'rgba(234, 179, 8, 0.25)';
                strokeColor = '#eab308';
              }

              return (
                <g
                  key={bio.id}
                  className="cursor-pointer"
                  onMouseEnter={() => onHoverFeature({ type: 'biotic', data: bio })}
                  onMouseLeave={() => onHoverFeature(null)}
                  onClick={() => {
                    audioService.playNodeSelect();
                    onSelectFeature({ type: 'biotic', data: bio });
                  }}
                >
                  <path
                    d={bio.pathD}
                    fill={fillColor}
                    stroke={isSelected ? '#38bdf8' : strokeColor}
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                  />

                  {/* Acoustic Sentinel Radar Scatter Ring on severe threats */}
                  {bio.threatLevel === 'Crítico / Letal' && (
                    <circle 
                      cx={bio.center.x} 
                      cy={bio.center.y} 
                      r="48" 
                      fill="none" 
                      stroke="#f43f5e" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 4" 
                      className="animate-pulse"
                    />
                  )}

                  {bio.medevacSafeLane && (
                    <g transform={`translate(${bio.center.x}, ${bio.center.y})`}>
                      <rect x="-40" y="-12" width="80" height="20" fill="#020617" stroke="#10b981" strokeWidth="1" rx="2" />
                      <text x="0" y="2" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        [MEDEVAC LANE]
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] bg-[#020617] border border-[#1e293b] overflow-hidden select-none cursor-crosshair shadow-2xl"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* HUD Telemetry Overlay: Ultra Minimal Corner Coordinate Display */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none bg-[#020617]/90 border border-[#1e293b] px-2.5 py-1 text-[11px] font-mono-code text-slate-300 flex items-center gap-3 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-bold">{cursorPos.mgrs}</span>
        </div>
        <div className="hidden sm:inline text-slate-400">
          X: {cursorPos.x} | Y: {cursorPos.y}
        </div>
        <div className="text-cyan-400">
          ZOOM: {Math.round(zoomLevel * 100)}%
        </div>
      </div>

      {/* Top Right Quick Canvas Controls */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[#020617]/90 border border-[#1e293b] p-1 backdrop-blur-sm">
        <button
          onClick={() => handleZoom(0.25)}
          className="p-1.5 hover:bg-[#1e293b] text-slate-300 hover:text-white transition-colors"
          title="Aumentar Zoom"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => handleZoom(-0.25)}
          className="p-1.5 hover:bg-[#1e293b] text-slate-300 hover:text-white transition-colors"
          title="Diminuir Zoom"
        >
          <Minimize2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleResetView}
          className="p-1.5 hover:bg-[#1e293b] text-slate-300 hover:text-white transition-colors"
          title="Centralizar Visão"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SVG Canvas Stage */}
      <svg
        viewBox="0 0 1000 700"
        className="w-full h-full"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.15s ease-out'
        }}
      >
        <defs>
          {/* MCOO Hatches */}
          <pattern id="hatch-severely-restricted" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#f43f5e" strokeWidth="2.5" />
            <rect width="10" height="10" fill="rgba(244, 63, 94, 0.25)" />
          </pattern>

          <pattern id="hatch-restricted" width="12" height="12" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#eab308" strokeWidth="1.8" />
            <rect width="12" height="12" fill="rgba(234, 179, 8, 0.20)" />
          </pattern>

          {/* FLIR Scan Gradient */}
          <linearGradient id="flir-scan-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.35" />
          </linearGradient>

          {/* NATO Standard Vector Arrow Heads */}
          <marker id="arrow-main-effort" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto">
            <polygon points="0 0, 14 7, 0 14, 4 7" fill="#38bdf8" />
          </marker>

          <marker id="arrow-support-effort" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10, 3 5" fill="#818cf8" />
          </marker>

          {/* Split Mode Clip Paths */}
          <clipPath id="split-left-clip">
            <rect x="0" y="0" width={splitRatio * 10} height="700" />
          </clipPath>
          <clipPath id="split-right-clip">
            <rect x={splitRatio * 10} y="0" width={1000 - splitRatio * 10} height="700" />
          </clipPath>
        </defs>

        {/* Base Cartography & Hillshade Elevation Map (Realistic 2D Topography) */}
        <g id="base-topography">
          {/* Background Landmass Shape */}
          <rect width="1000" height="700" fill="#050d1a" />

          {/* Contour Lines & Analytical Hillshade */}
          <path d="M 50,120 Q 240,60 480,100 T 920,80 L 950,640 Q 620,670 320,620 T 40,580 Z" fill="#091528" stroke="#1e293b" strokeWidth="1" />
          <path d="M 120,180 Q 300,140 520,160 T 880,170 L 900,580 Q 640,610 380,560 T 110,510 Z" fill="#0d1d36" stroke="#1e3a5f" strokeWidth="0.8" />
          <path d="M 220,240 Q 380,210 580,230 T 820,240 L 840,510 Q 660,530 440,490 T 200,450 Z" fill="#112544" stroke="#1d4ed8" strokeWidth="0.6" />
          <path d="M 340,110 Q 480,80 620,120 T 780,190 L 740,300 Q 560,260 400,270 Z" fill="#172e54" stroke="#2563eb" strokeWidth="0.8" />
          {/* Mountain Ridge Peaks (Hill 620 & Fuji Outskirts) */}
          <path d="M 440,130 Q 480,110 520,140 L 490,200 Z" fill="#1e3a6a" stroke="#60a5fa" strokeWidth="1" />
          <circle cx="480" cy="140" r="3" fill="#60a5fa" />
          <text x="490" y="144" fill="#93c5fd" fontSize="9" fontFamily="monospace">▲ COTA 620m</text>

          {/* River / Hydrological Drainage Network */}
          <path d="M 480,150 Q 540,240 580,330 T 720,440 T 920,530" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeOpacity="0.7" />
          <path d="M 310,210 Q 380,270 420,340 T 450,560" fill="none" stroke="#0284c7" strokeWidth="1.8" strokeOpacity="0.6" />
        </g>

        {/* Range Rings Overlay (1km, 5km, 10km) */}
        {showRangeRings && (
          <g id="range-rings" className="pointer-events-none opacity-40">
            <circle cx="500" cy="350" r="80" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="500" cy="350" r="180" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="500" cy="350" r="300" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" />
            <text x="585" y="348" fill="#38bdf8" fontSize="8" fontFamily="monospace">2.5 KM</text>
            <text x="685" y="348" fill="#38bdf8" fontSize="8" fontFamily="monospace">5.0 KM</text>
            <text x="805" y="348" fill="#38bdf8" fontSize="8" fontFamily="monospace">10.0 KM</text>
          </g>
        )}

        {/* MGRS Military Grid Lines Overlay */}
        {showGridLines && (
          <g id="mgrs-grid" className="pointer-events-none opacity-30">
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
              <line key={`gx-${x}`} x1={x} y1="0" x2={x} y2="700" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2 4" />
            ))}
            {[100, 200, 300, 400, 500, 600].map((y) => (
              <line key={`gy-${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2 4" />
            ))}
          </g>
        )}

        {/* Render Layer according to Mode (Single Model vs Split Compare) */}
        {activeModel === 'split_compare' ? (
          <g id="split-compare-view">
            {/* Left Model */}
            {renderLayerGraphics('mcoo', 'split-left-clip')}
            {/* Right Model */}
            {renderLayerGraphics(secondaryModelForSplit, 'split-right-clip')}

            {/* Split Divider Line */}
            <line 
              x1={splitRatio * 10} 
              y1="0" 
              x2={splitRatio * 10} 
              y2="700" 
              stroke="#38bdf8" 
              strokeWidth="2.5" 
              strokeDasharray="6 3" 
            />
          </g>
        ) : (
          renderLayerGraphics(activeModel)
        )}

        {/* Wargame Path / Simulated Route Trace */}
        {activeWargameRouteWaypoints.length > 0 && (
          <g id="wargame-route-trace">
            {/* Polyline Path */}
            <path
              d={activeWargameRouteWaypoints.reduce((acc, wp, idx) => {
                return idx === 0 ? `M ${wp.x},${wp.y}` : `${acc} L ${wp.x},${wp.y}`;
              }, '')}
              fill="none"
              stroke="#a855f7"
              strokeWidth="3.5"
              strokeDasharray="6 3"
              className="animate-pulse"
            />
            {activeWargameRouteWaypoints.map((wp, idx) => (
              <g key={wp.id} transform={`translate(${wp.x}, ${wp.y})`}>
                <circle r="7" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                <text x="0" y="-12" fill="#e9d5ff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {wp.label}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* Interactive Tactical Cursor Crosshair */}
        <g transform={`translate(${cursorPos.x}, ${cursorPos.y})`} className="pointer-events-none">
          <circle r="12" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="-16" y1="0" x2="-4" y2="0" stroke="#10b981" strokeWidth="1.2" />
          <line x1="4" y1="0" x2="16" y2="0" stroke="#10b981" strokeWidth="1.2" />
          <line x1="0" y1="-16" x2="0" y2="-4" stroke="#10b981" strokeWidth="1.2" />
          <line x1="0" y1="4" x2="0" y2="16" stroke="#10b981" strokeWidth="1.2" />
        </g>
      </svg>
      
      {/* Floating Tactical Tooltip */}
      {hoveredFeature && (
        <div 
          className="fixed bg-[#090e17]/95 border border-slate-700 rounded-lg p-2.5 shadow-xl text-xs font-mono-code pointer-events-none z-50 backdrop-blur-md max-w-xs transform -translate-x-1/2 -translate-y-[120%]"
          style={{ left: mousePos.x, top: mousePos.y }}
        >
          <div className="flex items-center gap-2 border-b border-slate-700/50 pb-1 mb-1">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-white uppercase">{hoveredFeature.data.name || hoveredFeature.type}</span>
          </div>
          <div className="text-[10px] text-slate-300">
            {hoveredFeature.data.threatLevel && (
              <div className="flex justify-between items-center mt-1">
                <span className="text-slate-400">AMEAÇA:</span>
                <span className={hoveredFeature.data.threatLevel === 'Crítico / Letal' ? 'text-rose-400 font-bold' : 'text-amber-400'}>{hoveredFeature.data.threatLevel}</span>
              </div>
            )}
            {hoveredFeature.data.mobility && (
              <div className="flex justify-between items-center mt-1">
                <span className="text-slate-400">MOBILIDADE:</span>
                <span className="text-cyan-400 font-bold">{hoveredFeature.data.mobility}</span>
              </div>
            )}
            {hoveredFeature.data.dynamicStatus && (
              <div className="flex justify-between items-center mt-1">
                <span className="text-slate-400">TRAFEGABILIDADE:</span>
                <span className="text-emerald-400 font-bold">{hoveredFeature.data.dynamicStatus}</span>
              </div>
            )}
            <div className="mt-1.5 pt-1 border-t border-slate-700/50 flex justify-between items-center text-[9px] text-slate-500">
              <Crosshair className="w-3 h-3" />
              <span>POS-LOCK: {cursorPos.mgrs}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
