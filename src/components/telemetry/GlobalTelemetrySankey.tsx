import React, { useState } from 'react';
import { GitCommit, Info, Sparkles, Filter } from 'lucide-react';
import { SANKEY_NODES, SANKEY_LINKS } from '../../data/omegaTelemetryData';
import { SankeyNode, SankeyLink } from '../../types';
import { audioService } from '../../services/audioService';

export const GlobalTelemetrySankey: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<SankeyNode | null>(null);
  const [hoveredLink, setHoveredLink] = useState<SankeyLink | null>(null);

  // Layout coordinates calculation for SVG
  const width = 720;
  const height = 400;
  const paddingY = 40;

  // Group nodes by layer
  const layer0 = SANKEY_NODES.filter((n) => n.layer === 'origem');
  const layer1 = SANKEY_NODES.filter((n) => n.layer === 'ruptura');
  const layer2 = SANKEY_NODES.filter((n) => n.layer === 'destino');

  const getLayerX = (layer: 'origem' | 'ruptura' | 'destino') => {
    if (layer === 'origem') return 70;
    if (layer === 'ruptura') return 360;
    return 650;
  };

  // Assign Y positions evenly in each column
  const nodePositions: Record<number, { x: number; y: number; height: number }> = {};

  const calculateColumnY = (nodes: SankeyNode[], colX: number) => {
    const usableHeight = height - paddingY * 2;
    const count = nodes.length;
    const nodeHeight = Math.max(26, Math.min(42, usableHeight / count - 14));
    const step = usableHeight / count;

    nodes.forEach((node, idx) => {
      const y = paddingY + idx * step + step / 2;
      nodePositions[node.id] = { x: colX, y, height: nodeHeight };
    });
  };

  calculateColumnY(layer0, getLayerX('origem'));
  calculateColumnY(layer1, getLayerX('ruptura'));
  calculateColumnY(layer2, getLayerX('destino'));

  const handleNodeClick = (node: SankeyNode) => {
    audioService.playNodeSelect();
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  return (
    <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl relative flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-mono-code font-bold uppercase">
              MODELO 1 • FLUXO DE TRANSIÇÃO HISTÓRICA
            </span>
            <span className="text-[11px] font-mono-code text-slate-400">
              ORIGEM ESTATAL → PONTO DE RUPTURA → DESTINO
            </span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mt-1">
            Diagrama de Sankey: Metamorfose do Poder Pré-Impacto à Nova Terra
          </h3>
        </div>

        {selectedNode && (
          <button
            onClick={() => setSelectedNode(null)}
            className="px-2.5 py-1 text-[11px] font-mono-code rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors self-start sm:self-auto cursor-pointer"
          >
            Limpar Filtro ({selectedNode.label})
          </button>
        )}
      </div>

      <p className="text-xs text-slate-400 mb-3">
        Mapeia a dispersão das diretrizes originais do Estado do Século XXI até a sua conversão em comunas tribais, alianças agrárias ou extinção biológica total.
      </p>

      {/* SVG Canvas */}
      <div className="w-full aspect-[18/10] bg-[#070b13] rounded-xl border border-slate-800/80 p-3 relative overflow-hidden">
        {/* Column Headings */}
        <div className="absolute top-2 left-0 right-0 px-6 flex justify-between text-[11px] font-mono-code text-slate-400 select-none pointer-events-none">
          <span className="text-indigo-400 font-semibold">1. DIRETRIZ ORIGINAL</span>
          <span className="text-amber-400 font-semibold">2. CAUSA DA RUPTURA</span>
          <span className="text-emerald-400 font-semibold">3. DESTINO HISTÓRICO</span>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none">
          <defs>
            {SANKEY_LINKS.map((link, idx) => {
              const srcNode = SANKEY_NODES[link.source];
              const tgtNode = SANKEY_NODES[link.target];
              return (
                <linearGradient key={`sankey-grad-${idx}`} id={`sankey-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={srcNode?.color || '#3b82f6'} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={tgtNode?.color || '#10b981'} stopOpacity="0.45" />
                </linearGradient>
              );
            })}
          </defs>

          {/* Links / Ribbon Flows */}
          {SANKEY_LINKS.map((link, idx) => {
            const src = nodePositions[link.source];
            const tgt = nodePositions[link.target];
            if (!src || !tgt) return null;

            const strokeWidth = Math.max(3.5, link.value * 5.5);
            const isHighlighted =
              (selectedNode && (selectedNode.id === link.source || selectedNode.id === link.target)) ||
              (hoveredLink && hoveredLink.source === link.source && hoveredLink.target === link.target);

            const isDimmed = selectedNode && selectedNode.id !== link.source && selectedNode.id !== link.target;

            // Cubic Bézier control points
            const x0 = src.x + 40;
            const y0 = src.y;
            const x1 = tgt.x - 40;
            const y1 = tgt.y;
            const dx = (x1 - x0) * 0.5;

            const pathData = `M ${x0},${y0} C ${x0 + dx},${y0} ${x1 - dx},${y1} ${x1},${y1}`;

            return (
              <g key={`link-${idx}`} className="cursor-pointer">
                <path
                  d={pathData}
                  fill="none"
                  stroke={`url(#sankey-grad-${idx})`}
                  strokeWidth={strokeWidth}
                  strokeOpacity={isHighlighted ? 0.95 : isDimmed ? 0.08 : 0.4}
                  className="transition-all duration-300"
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                />
                {/* Midpoint flow directional dot */}
                {isHighlighted && (
                  <circle
                    cx={(x0 + x1) / 2}
                    cy={(y0 + y1) / 2}
                    r={strokeWidth / 2}
                    fill="#ffffff"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {SANKEY_NODES.map((node) => {
            const pos = nodePositions[node.id];
            if (!pos) return null;

            const isSelected = selectedNode?.id === node.id;
            const isConnected =
              selectedNode &&
              SANKEY_LINKS.some(
                (l) =>
                  (l.source === selectedNode.id && l.target === node.id) ||
                  (l.target === selectedNode.id && l.source === node.id)
              );

            const isDimmed = selectedNode && !isSelected && !isConnected;

            const nodeW = 100;
            const nodeH = pos.height;

            return (
              <g
                key={`node-${node.id}`}
                id={`sankey-node-${node.id}`}
                transform={`translate(${pos.x - nodeW / 2}, ${pos.y - nodeH / 2})`}
                className="cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => handleNodeClick(node)}
              >
                <rect
                  width={nodeW}
                  height={nodeH}
                  rx="6"
                  fill={node.color}
                  fillOpacity={isSelected ? 0.95 : isDimmed ? 0.25 : 0.75}
                  stroke={isSelected ? '#ffffff' : '#0f172a'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="transition-all duration-300 shadow-lg"
                />

                {/* Node Label (split in 2 lines if long) */}
                <text
                  x={nodeW / 2}
                  y={nodeH / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  fontSize="8"
                  fontWeight="600"
                  fontFamily="JetBrains Mono, monospace"
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {node.label.length > 20 ? node.label.substring(0, 18) + '…' : node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Dynamic Detail Overlay */}
        {(hoveredLink || selectedNode) && (
          <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 border border-slate-700/80 rounded-xl p-3 shadow-2xl text-xs font-mono-code flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in backdrop-blur-md">
            <div>
              {hoveredLink ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">
                      {SANKEY_NODES[hoveredLink.source]?.label} → {SANKEY_NODES[hoveredLink.target]?.label}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      Volume: {hoveredLink.value} núcleos
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">{hoveredLink.evidence}</p>
                </>
              ) : selectedNode ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedNode.color }} />
                    <span className="font-bold text-white">{selectedNode.label}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 uppercase">
                      Camada: {selectedNode.layer}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">{selectedNode.description}</p>
                </>
              ) : null}
            </div>

            <span className="text-[10px] text-slate-400 shrink-0">
              Clique para traçar fluxo ou limpe a seleção.
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono-code px-1">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          Passe o mouse sobre os laços de transição para inspecionar os casos empíricos continentais.
        </span>
        <span className="text-emerald-400 font-semibold">Fonte: Plotly / Sankey Specs</span>
      </div>
    </div>
  );
};
