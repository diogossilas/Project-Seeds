import React, { useState } from 'react';
import { TEAMS_DATA } from '../../data/sevenSeedsData';
import { TeamData } from '../../types';
import { audioService } from '../../services/audioService';

interface TelemetryScatter2DProps {
  onSelectTeam: (team: TeamData) => void;
}

export const TelemetryScatter2D: React.FC<TelemetryScatter2DProps> = ({ onSelectTeam }) => {
  const [scatterHoverNode, setScatterHoverNode] = useState<TeamData | null>(null);

  const handleNodeClick = (team: TeamData) => {
    audioService.playNodeSelect();
    onSelectTeam(team);
  };

  return (
    <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono-code uppercase text-cyan-400 font-semibold">
            CORRELAÇÃO MULTIVARIÁVEL EM EIXOS 2D (X E Y)
          </span>
          <h3 className="text-lg font-bold font-display text-white">
            Espaço Bidimensional: Empatia vs. Domínio Técnico
          </h3>
        </div>
        <div className="text-[11px] font-mono-code text-slate-400">
          Raio = Resiliência Temporal
        </div>
      </div>

      {/* Scatter Chart */}
      <div className="w-full aspect-[4/3] bg-[#080d16] rounded-xl border border-slate-800/80 p-3 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full select-none">
          {/* Quadrant dividing lines */}
          <line x1="50" y1="10" x2="50" y2="90" stroke="#1e293b" strokeDasharray="1,1" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#1e293b" strokeDasharray="1,1" />

          {/* Quadrant labels */}
          <text x="12" y="16" fill="#475569" fontSize="2.5" fontFamily="JetBrains Mono">
            QUADRANTE II: Tecnocracia / Eugênica
          </text>
          <text x="52" y="16" fill="#10b981" fontSize="2.5" fontFamily="JetBrains Mono" opacity="0.8">
            QUADRANTE I: Síntese Biocêntrica Ideal
          </text>
          <text x="12" y="88" fill="#ef4444" fontSize="2.5" fontFamily="JetBrains Mono" opacity="0.6">
            QUADRANTE III: Falência Sistêmica (Ryūgū)
          </text>
          <text x="52" y="88" fill="#06b6d4" fontSize="2.5" fontFamily="JetBrains Mono" opacity="0.8">
            QUADRANTE IV: Humanismo Empático
          </text>

          {/* Main axes */}
          <line x1="10" y1="90" x2="90" y2="90" stroke="#334155" strokeWidth="0.8" />
          <line x1="10" y1="10" x2="10" y2="90" stroke="#334155" strokeWidth="0.8" />

          {/* Axis titles */}
          <text x="50" y="97" textAnchor="middle" fill="#94a3b8" fontSize="3" fontFamily="JetBrains Mono">
            Eixo X: Empatia &amp; Conexão Biocêntrica (0 → 100)
          </text>
          <text x="-50" y="5" transform="rotate(-90)" textAnchor="middle" fill="#94a3b8" fontSize="3" fontFamily="JetBrains Mono">
            Eixo Y: Domínio Técnico &amp; Eugênia (0 → 100)
          </text>

          {/* Data nodes */}
          {TEAMS_DATA.map((team) => {
            // Map X: empathy (0-100) -> 10 to 90
            const cx = 10 + (team.metrics.empathy / 100) * 80;
            // Map Y: technicalSkill (0-100) -> 90 to 10 (inverted)
            const cy = 90 - (team.metrics.technicalSkill / 100) * 80;
            // Radius according to resilience (0-100) -> 2.5 to 6
            const r = 2.5 + (team.metrics.resilience / 100) * 3.5;

            const isHovered = scatterHoverNode?.id === team.id;

            return (
              <g
                key={team.id}
                id={`scatter-node-${team.id}`}
                className="cursor-pointer transition-transform"
                onMouseEnter={() => setScatterHoverNode(team)}
                onMouseLeave={() => setScatterHoverNode(null)}
                onClick={() => handleNodeClick(team)}
              >
                {isHovered && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 3}
                    fill="none"
                    stroke={team.color}
                    strokeWidth="0.6"
                    strokeDasharray="1,1"
                    className="animate-spin"
                  />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={team.color}
                  fillOpacity={isHovered ? 0.9 : 0.65}
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 1.2 : 0.6}
                />
                <text
                  x={cx}
                  y={cy + 1}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="2.2"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                  className="pointer-events-none"
                >
                  {team.kanji.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover details badge */}
        {scatterHoverNode && (
          <div className="absolute top-4 right-4 bg-slate-900/95 border border-slate-700 p-3 rounded-xl shadow-xl font-mono-code text-xs">
            <div className="flex items-center gap-1.5 font-bold" style={{ color: scatterHoverNode.color }}>
              <span>{scatterHoverNode.name}</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1 space-y-0.5">
              <div>X (Empatia): <span className="text-emerald-400">{scatterHoverNode.metrics.empathy}%</span></div>
              <div>Y (Técnica): <span className="text-cyan-400">{scatterHoverNode.metrics.technicalSkill}%</span></div>
              <div>Raio (Resiliência): <span className="text-amber-400">{scatterHoverNode.metrics.resilience}%</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
