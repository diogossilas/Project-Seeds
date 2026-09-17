import React, { useState, useMemo } from 'react';
import { TrendingDown, Info, Calculator, Award } from 'lucide-react';
import { AUTOMATION_SCATTER_DATA, calculateLinearRegression } from '../../data/omegaTelemetryData';
import { AutomationScatterPoint } from '../../types';
import { audioService } from '../../services/audioService';

export const GlobalTelemetryScatterTrend: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<AutomationScatterPoint | null>(null);

  // Calculate ordinary least squares regression
  const regression = useMemo(() => {
    return calculateLinearRegression(AUTOMATION_SCATTER_DATA);
  }, []);

  // SVG Chart Dimensions
  const width = 640;
  const height = 360;
  const padding = { top: 25, right: 35, bottom: 45, left: 55 };
  const graphW = width - padding.left - padding.right;
  const graphH = height - padding.top - padding.bottom;

  // Coordinate Mapping
  const mapX = (val: number) => padding.left + (val / 100) * graphW;
  const mapY = (val: number) => padding.top + graphH - (val / 100) * graphH;

  // Trendline Coordinates
  const trendX1 = 10;
  const trendY1 = regression.predict(trendX1);
  const trendX2 = 100;
  const trendY2 = regression.predict(trendX2);

  const lineSvgX1 = mapX(trendX1);
  const lineSvgY1 = mapY(trendY1);
  const lineSvgX2 = mapX(trendX2);
  const lineSvgY2 = mapY(trendY2);

  return (
    <div className="bg-[#030914] border border-[#0e2a4a] rounded-2xl p-6 shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#0e2a4a]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-mono-code font-bold uppercase flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-rose-400" />
              MODELO 4 • DISPERSÃO COM LINHA DE TENDÊNCIA (POLYFIT LINEAR)
            </span>
            <span className="text-[11px] font-mono-code text-slate-400">
              REGRESSÃO: Y = {regression.slope.toFixed(2)}X + {regression.intercept.toFixed(1)}
            </span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mt-1">
            Correlação entre Automação de Bunkers e Sucesso Populacional aos 50 Anos
          </h3>
        </div>

        {/* Regression Metric Pills */}
        <div className="flex items-center gap-2 font-mono-code text-[11px] self-start sm:self-auto">
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-[#0e2a4a] text-cyan-300">
            Declive (m): <span className="font-bold text-rose-400">{regression.slope.toFixed(3)}</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-[#0e2a4a] text-cyan-300">
            R²: <span className="font-bold text-amber-400">{(regression.rSquared * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Comprova empiricamente que quanto maior a dependência de sistemas automatizados, algoritmos de suporte de vida e inteligência artificial governativa, menor foi a taxa de sobrevivência biológica após meio século.
      </p>

      {/* SVG Scatter Plot */}
      <div className="w-full aspect-[16/9] bg-[#070b13] rounded-xl border border-[#0e2a4a]/80 p-2 relative overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none">
          {/* Grid lines */}
          {[0, 20, 40, 60, 80, 100].map((val) => {
            const y = mapY(val);
            const x = mapX(val);
            return (
              <g key={`grid-${val}`}>
                {/* Horizontal line */}
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="2,2"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {val}%
                </text>

                {/* Vertical line */}
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke="#1e293b"
                  strokeDasharray="2,2"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 16}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="#475569"
            strokeWidth="1.2"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke="#475569"
            strokeWidth="1.2"
          />

          {/* Axis Labels */}
          <text
            x={(padding.left + width - padding.right) / 2}
            y={height - 10}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
          >
            Grau de Dependência de IA e Sistemas Fechados (%)
          </text>
          <text
            x={-(padding.top + graphH / 2)}
            y={16}
            transform="rotate(-90)"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
          >
            Taxa de Sobrevivência Efetiva aos 50 Anos (%)
          </text>

          {/* Polyfit Linear Regression Trendline */}
          <line
            x1={lineSvgX1}
            y1={lineSvgY1}
            x2={lineSvgX2}
            y2={lineSvgY2}
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="4,4"
          />

          {/* Trendline equation label floating */}
          <text
            x={lineSvgX1 + 25}
            y={lineSvgY1 - 10}
            fill="#38bdf8"
            fontSize="9.5"
            fontWeight="bold"
            fontFamily="JetBrains Mono, monospace"
          >
            Linha de Tendência Linear (R² = {(regression.rSquared * 100).toFixed(1)}%)
          </text>

          {/* Data Points */}
          {AUTOMATION_SCATTER_DATA.map((pt) => {
            const cx = mapX(pt.automation);
            const cy = mapY(pt.survival);
            const isHovered = hoveredPoint?.id === pt.id;

            return (
              <g
                key={pt.id}
                id={`scatter-dot-${pt.id}`}
                className="cursor-pointer transition-all"
                onMouseEnter={() => {
                  audioService.playNodeSelect();
                  setHoveredPoint(pt);
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Outer focus ring */}
                {isHovered && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="12"
                    fill="none"
                    stroke={pt.color}
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                    className="animate-spin"
                  />
                )}

                {/* Primary Circle Dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 7 : 5.5}
                  fill={pt.color}
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-transform duration-200"
                />

                {/* Regional Text Annotation (Matplotlib plt.annotate reproduction) */}
                <text
                  x={cx + 8}
                  y={cy + 3}
                  fill={isHovered ? '#ffffff' : '#cbd5e1'}
                  fontSize={isHovered ? '10' : '8.5'}
                  fontWeight={isHovered ? 'bold' : 'normal'}
                  fontFamily="JetBrains Mono, monospace"
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                >
                  {pt.region}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Information Floating Card */}
        {hoveredPoint && (
          <div className="absolute top-3 right-3 bg-slate-900/95 border border-[#0e2a4a] p-3 rounded-xl shadow-2xl font-mono-code text-xs backdrop-blur-md animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-white">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hoveredPoint.color }} />
              <span>{hoveredPoint.facilityName}</span>
            </div>
            <div className="mt-1 text-[11px] text-slate-300 space-y-0.5">
              <div>Automação Estatal: <strong className="text-cyan-400">{hoveredPoint.automation}%</strong></div>
              <div>Sobrevivência aos 50 Anos: <strong className="text-emerald-400">{hoveredPoint.survival}%</strong></div>
              <div>Altitude do Refúgio: <strong className="text-amber-400">{hoveredPoint.altitudeMeters}m</strong></div>
              <div>Governança: <span className="text-slate-200">{hoveredPoint.governanceType}</span></div>
              <div>Status: <span className="text-rose-300">{hoveredPoint.status}</span></div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 font-mono-code gap-2 px-1 pt-2 border-t border-[#0e2a4a]">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500" /> Declive acentuadamente negativo ({regression.slope.toFixed(2)}): cada 10% de dependência tecnológica adicional resultou em perda de ~8.5% na taxa de sobrevivência aos 50 anos.
        </span>
        <span className="text-rose-400 font-semibold">Fonte: Matplotlib &amp; NumPy Polyfit Specs</span>
      </div>
    </div>
  );
};
