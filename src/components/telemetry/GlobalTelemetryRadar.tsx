import React, { useState } from 'react';
import { Target, Info, Check, Eye } from 'lucide-react';
import { RADAR_DIMENSIONS, RADAR_CONTINENTAL_PROFILES } from '../../data/omegaTelemetryData';
import { RadarContinentalProfile } from '../../types';
import { audioService } from '../../services/audioService';

export const GlobalTelemetryRadar: React.FC = () => {
  const [activeProfiles, setActiveProfiles] = useState<Record<string, boolean>>({
    'america-sul': true,
    china: true,
    'colonia-lunar': true,
  });

  const [hoveredDimension, setHoveredDimension] = useState<string | null>(null);

  const toggleProfile = (id: string) => {
    audioService.playNodeSelect();
    setActiveProfiles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // SVG Radar Dimensions
  const size = 420;
  const center = size / 2;
  const radius = 150;
  const totalAxes = RADAR_DIMENSIONS.length; // 5 axes: 72 deg each

  // Angle for each axis (0 rad at top, clockwise)
  const getAxisAngle = (index: number) => {
    return (index * (2 * Math.PI)) / totalAxes - Math.PI / 2;
  };

  const getCoordinates = (angle: number, valueRatio: number) => {
    const r = radius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Concentric levels (2, 4, 6, 8, 10)
  const levels = [2, 4, 6, 8, 10];

  return (
    <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono-code font-bold uppercase flex items-center gap-1">
              <Target className="w-3 h-3 text-emerald-400" />
              MODELO 3 • RADAR MULTIDIMENSIONAL (KIVIAT DIAGRAM)
            </span>
            <span className="text-[11px] font-mono-code text-slate-400">
              5 EIXOS ADAPTATIVOS • ESCALA 0 A 10
            </span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mt-1">
            Análise Comparativa de Eficiência Adaptativa por Núcleo Geográfico
          </h3>
        </div>

        {/* Profile Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {RADAR_CONTINENTAL_PROFILES.map((profile) => {
            const isActive = activeProfiles[profile.id];
            return (
              <button
                key={profile.id}
                id={`radar-toggle-${profile.id}`}
                onClick={() => toggleProfile(profile.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono-code flex items-center gap-2 transition-all border cursor-pointer ${
                  isActive
                    ? 'text-white border-slate-600 shadow-md'
                    : 'text-slate-500 bg-slate-900/60 border-slate-800 hover:text-slate-300'
                }`}
                style={{
                  backgroundColor: isActive ? `${profile.color}25` : undefined,
                  borderColor: isActive ? profile.color : undefined,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: isActive ? profile.color : '#475569' }}
                />
                <span className="font-semibold">{profile.name.split(' (')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Contrasta o modelo biocêntrico tradicional da América do Sul com o modelo hipertecnológico centralizado da China e o modelo cibernético hermético da Colônia Lunar Shackleton.
      </p>

      {/* Main Radar Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Radar Chart */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-[420px] aspect-square bg-[#070b13] rounded-2xl border border-slate-800/80 p-2 relative flex items-center justify-center">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full select-none">
              {/* Concentric grid polygons */}
              {levels.map((level) => {
                const ratio = level / 10;
                const pointsString = RADAR_DIMENSIONS.map((_, i) => {
                  const angle = getAxisAngle(i);
                  const coords = getCoordinates(angle, ratio);
                  return `${coords.x},${coords.y}`;
                }).join(' ');

                return (
                  <g key={`level-${level}`}>
                    <polygon
                      points={pointsString}
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth={level === 10 ? 1.5 : 0.8}
                      strokeDasharray={level === 10 ? undefined : '2,2'}
                    />
                    {/* Level number on vertical axis */}
                    <text
                      x={center + 5}
                      y={center - radius * ratio + 3}
                      fill="#64748b"
                      fontSize="8"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {level}
                    </text>
                  </g>
                );
              })}

              {/* Radial axis lines and labels */}
              {RADAR_DIMENSIONS.map((dim, i) => {
                const angle = getAxisAngle(i);
                const endCoords = getCoordinates(angle, 1.0);
                const labelCoords = getCoordinates(angle, 1.22);
                const isHovered = hoveredDimension === dim.key;

                return (
                  <g key={`axis-${dim.key}`}>
                    <line
                      x1={center}
                      y1={center}
                      x2={endCoords.x}
                      y2={endCoords.y}
                      stroke={isHovered ? '#38bdf8' : '#334155'}
                      strokeWidth={isHovered ? 1.8 : 1}
                    />

                    {/* Axis Outer Label */}
                    <text
                      x={labelCoords.x}
                      y={labelCoords.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isHovered ? '#38bdf8' : '#94a3b8'}
                      fontSize="8.5"
                      fontWeight={isHovered ? 'bold' : '500'}
                      fontFamily="JetBrains Mono, monospace"
                      className="cursor-pointer transition-colors"
                      onMouseEnter={() => setHoveredDimension(dim.key)}
                      onMouseLeave={() => setHoveredDimension(null)}
                    >
                      {dim.label}
                    </text>
                  </g>
                );
              })}

              {/* Render Profiles */}
              {RADAR_CONTINENTAL_PROFILES.map((profile) => {
                if (!activeProfiles[profile.id]) return null;

                const points = RADAR_DIMENSIONS.map((dim, i) => {
                  const angle = getAxisAngle(i);
                  const val = profile.metrics[dim.key as keyof typeof profile.metrics];
                  const ratio = Math.max(0, Math.min(10, val)) / 10;
                  return getCoordinates(angle, ratio);
                });

                const pointsString = points.map((p) => `${p.x},${p.y}`).join(' ');

                return (
                  <g key={`radar-profile-${profile.id}`}>
                    {/* Fill Area */}
                    <polygon
                      points={pointsString}
                      fill={profile.fillColor}
                      stroke={profile.color}
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />

                    {/* Vertices Dots */}
                    {points.map((pt, i) => {
                      const dimKey = RADAR_DIMENSIONS[i].key;
                      const val = profile.metrics[dimKey as keyof typeof profile.metrics];
                      return (
                        <circle
                          key={`pt-${profile.id}-${i}`}
                          cx={pt.x}
                          cy={pt.y}
                          r={hoveredDimension === dimKey ? 5 : 3.5}
                          fill="#0d131f"
                          stroke={profile.color}
                          strokeWidth="2"
                          className="transition-all"
                        >
                          <title>{`${profile.name}: ${RADAR_DIMENSIONS[i].label} = ${val}/10`}</title>
                        </circle>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Narrative & Metric Breakdown Panel */}
        <div className="lg:col-span-5 space-y-3 font-mono-code text-xs">
          {RADAR_CONTINENTAL_PROFILES.map((profile) => {
            const isActive = activeProfiles[profile.id];
            return (
              <div
                key={profile.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-slate-900/80 border-slate-700 shadow-md'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: profile.color }} />
                    <span className="font-bold text-white text-xs">{profile.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{profile.subhead}</span>
                </div>

                <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                  {profile.narrativeSummary}
                </p>

                {isActive && (
                  <div className="grid grid-cols-5 gap-1.5 mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] text-center">
                    <div>
                      <div className="text-slate-400 truncate">Técnica</div>
                      <div className="font-bold text-slate-200 mt-0.5">{profile.metrics.technicalMastery}/10</div>
                    </div>
                    <div>
                      <div className="text-slate-400 truncate">Biologia</div>
                      <div className="font-bold text-slate-200 mt-0.5">{profile.metrics.bioResilience}/10</div>
                    </div>
                    <div>
                      <div className="text-slate-400 truncate">Coesão</div>
                      <div className="font-bold text-slate-200 mt-0.5">{profile.metrics.socialCohesion}/10</div>
                    </div>
                    <div>
                      <div className="text-slate-400 truncate">Adaptação</div>
                      <div className="font-bold text-slate-200 mt-0.5">{profile.metrics.faunaFloraAdaptation}/10</div>
                    </div>
                    <div>
                      <div className="text-slate-400 truncate">Psíquica</div>
                      <div className="font-bold text-slate-200 mt-0.5">{profile.metrics.psychicStability}/10</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-mono-code px-1 pt-2 border-t border-slate-800">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500" /> A Colônia Lunar exibe máxima perfeição técnica (10), mas colapso biológico imediato (1) e psíquico (2).
        </span>
        <span className="text-emerald-400 font-semibold">Fonte: Plotly Scatterpolar Specs</span>
      </div>
    </div>
  );
};
