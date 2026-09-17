import React, { useState } from 'react';
import { TELEMETRY_TIME_SERIES } from '../../data/sevenSeedsData';
import { MetricType } from '../../types';
import { 
  computeTimeSeriesPoints, 
  buildLinePathString, 
  buildAreaPathString 
} from '../../services/telemetryMath';
import { audioService } from '../../services/audioService';

export const TelemetryTimeSeries2D: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<MetricType>('cooperation');

  // Chart configuration
  const chartWidth = 600;
  const chartHeight = 260;
  const dim = {
    width: chartWidth,
    height: chartHeight,
    padding: { top: 20, right: 30, bottom: 40, left: 45 },
  };

  const graphWidth = dim.width - dim.padding.left - dim.padding.right;
  const graphHeight = dim.height - dim.padding.top - dim.padding.bottom;

  // Pure mathematical mapping from service
  const points = computeTimeSeriesPoints(TELEMETRY_TIME_SERIES, activeMetric, dim);
  const pathD = buildLinePathString(points);
  const areaD = buildAreaPathString(points, dim);

  // Metric color representation
  const metricColor = 
    activeMetric === 'cooperation' ? '#10b981' : 
    activeMetric === 'radiation' ? '#f43f5e' : '#06b6d4';

  const handleMetricChange = (metric: MetricType) => {
    setActiveMetric(metric);
    audioService.playNodeSelect();
  };

  return (
    <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code uppercase text-emerald-400 font-semibold">
              EIXO X: FASES TEMPORAIS (1 A 5) • EIXO Y: INTENSIDADE (0-100%)
            </span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mt-0.5">
            Séries Temporais e Tendências do Continuum
          </h3>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1.5 font-mono-code text-xs">
          <button
            id="metric-cooperation-btn"
            onClick={() => handleMetricChange('cooperation')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeMetric === 'cooperation'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Cooperação (%)
          </button>
          <button
            id="metric-radiation-btn"
            onClick={() => handleMetricChange('radiation')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeMetric === 'radiation'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Radiação (%)
          </button>
          <button
            id="metric-biomass-btn"
            onClick={() => handleMetricChange('biomass')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeMetric === 'biomass'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Biomassa (%)
          </button>
        </div>
      </div>

      {/* SVG 2D Line Chart with Axes */}
      <div className="w-full aspect-[2/1] relative bg-[#080d16] rounded-xl border border-slate-800/80 p-2">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full select-none">
          <defs>
            <linearGradient id="metric-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={metricColor} stopOpacity="0.35" />
              <stop offset="100%" stopColor={metricColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines (Y-axis intervals) */}
          {[0, 25, 50, 75, 100].map((level) => {
            const yPos = dim.padding.top + graphHeight - (level / 100) * graphHeight;
            return (
              <g key={level}>
                <line
                  x1={dim.padding.left}
                  y1={yPos}
                  x2={chartWidth - dim.padding.right}
                  y2={yPos}
                  stroke="#1e293b"
                  strokeDasharray="2,2"
                />
                <text
                  x={dim.padding.left - 8}
                  y={yPos + 3}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {level}%
                </text>
              </g>
            );
          })}

          {/* Y Axis line */}
          <line
            x1={dim.padding.left}
            y1={dim.padding.top}
            x2={dim.padding.left}
            y2={dim.padding.top + graphHeight}
            stroke="#334155"
            strokeWidth="1.2"
          />

          {/* X Axis line */}
          <line
            x1={dim.padding.left}
            y1={dim.padding.top + graphHeight}
            x2={chartWidth - dim.padding.right}
            y2={dim.padding.top + graphHeight}
            stroke="#334155"
            strokeWidth="1.2"
          />

          {/* Area Fill under curve */}
          <path d={areaD} fill="url(#metric-gradient)" />

          {/* Line path */}
          <path
            d={pathD}
            fill="none"
            stroke={metricColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points & X labels */}
          {points.map((pt, i) => (
            <g key={i}>
              {/* Vertical guideline */}
              <line
                x1={pt.x}
                y1={dim.padding.top}
                x2={pt.x}
                y2={dim.padding.top + graphHeight}
                stroke="#1e293b"
                strokeDasharray="1,2"
              />
              {/* Point Circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#0b0f17"
                stroke={metricColor}
                strokeWidth="2"
              />
              {/* Tooltip value */}
              <text
                x={pt.x}
                y={pt.y - 8}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontWeight="bold"
                fontFamily="JetBrains Mono, monospace"
              >
                {pt.val}%
              </text>
              {/* X Axis label */}
              <text
                x={pt.x}
                y={dim.padding.top + graphHeight + 16}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
              >
                {pt.phase.split(' ')[0]}
              </text>
              <text
                x={pt.x}
                y={dim.padding.top + graphHeight + 28}
                textAnchor="middle"
                fill="#475569"
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
              >
                {pt.phase.includes('(') ? pt.phase.substring(pt.phase.indexOf('(')) : ''}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono-code">
        <span>Progressão das 5 Fases do Continuum: Da triagem estatal à autonomia libertada.</span>
        <span className="text-emerald-400 font-semibold">Fonte: Arquivo Metatron</span>
      </div>
    </div>
  );
};
