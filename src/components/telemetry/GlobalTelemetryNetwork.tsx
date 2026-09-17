import React, { useState } from 'react';
import { Share2, Radio, Info, Compass, Anchor, Volume2 } from 'lucide-react';
import { GLOBAL_NETWORK_NODES, GLOBAL_NETWORK_EDGES } from '../../data/omegaTelemetryData';
import { GlobalNetworkNode, GlobalNetworkEdge } from '../../types';
import { audioService } from '../../services/audioService';

export const GlobalTelemetryNetwork: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GlobalNetworkNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<GlobalNetworkEdge | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isPlayingBeacon, setIsPlayingBeacon] = useState(false);

  // SVG Dimension
  const width = 800;
  const height = 480;

  // Node coordinate lookup (converting % to SVG pixels)
  const nodeMap: Record<string, { x: number; y: number; node: GlobalNetworkNode }> = {};
  GLOBAL_NETWORK_NODES.forEach((n) => {
    nodeMap[n.id] = {
      x: (n.x / 100) * (width - 120) + 60,
      y: (n.y / 100) * (height - 100) + 50,
      node: n,
    };
  });

  const handleNodeClick = (node: GlobalNetworkNode) => {
    audioService.playNodeSelect();
    setSelectedNode(selectedNode?.id === node.id ? null : node);
    setSelectedEdge(null);
  };

  const handleEdgeClick = (edge: GlobalNetworkEdge) => {
    audioService.playNodeSelect();
    setSelectedEdge(selectedEdge?.id === edge.id ? null : edge);
    setSelectedNode(null);

    // If clicking on lunar/1420 MHz link, trigger sound simulation
    if (edge.type === 'radio_telemetry') {
      setIsPlayingBeacon(true);
      audioService.playHydrogenBeacon(() => setIsPlayingBeacon(false));
    }
  };

  const filteredEdges = GLOBAL_NETWORK_EDGES.filter((edge) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'radio') return edge.type === 'radio_telemetry';
    if (activeFilter === 'maritime') return edge.type === 'maritime_drift' || edge.type === 'fluvial_route';
    if (activeFilter === 'acoustic') return edge.type === 'acoustic_signal';
    if (activeFilter === 'caravan') return edge.type === 'caravan';
    return true;
  });

  return (
    <div className="bg-[#030914] border border-[#0e2a4a] rounded-2xl p-6 shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#0e2a4a]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono-code font-bold uppercase flex items-center gap-1">
              <Share2 className="w-3 h-3 text-cyan-400" />
              MODELO 5 • GRAFO DE CONECTIVIDADE (NETWORKX &amp; MATPLOTLIB)
            </span>
            <span className="text-[11px] font-mono-code text-slate-400">
              10 INSTALAÇÕES • 8 CANAIS TRANSOCEÂNICOS E ORBITAIS
            </span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mt-1">
            Grafo de Conectividade da Terra Pós-Impacto: Rotas Materiais e Telemetria Residual
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono-code text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-[#0e2a4a]'
            }`}
          >
            Todas (8)
          </button>
          <button
            onClick={() => setActiveFilter('radio')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              activeFilter === 'radio'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-[#0e2a4a]'
            }`}
          >
            <Radio className="w-3 h-3 text-cyan-400" />
            Rádio (1420 MHz)
          </button>
          <button
            onClick={() => setActiveFilter('maritime')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              activeFilter === 'maritime'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-[#0e2a4a]'
            }`}
          >
            <Anchor className="w-3 h-3 text-blue-400" />
            Marítimo &amp; Fluvial
          </button>
          <button
            onClick={() => setActiveFilter('acoustic')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              activeFilter === 'acoustic'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-[#0e2a4a]'
            }`}
          >
            Acústica
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Visualiza as pontes materiais, garrafas à deriva no Pacífico, sinais acústicos através dos Himalaias e os pings de socorro orbitais transmitidos na frequência de 1420.405 MHz entre a Cratera Shackleton e a Terra.
      </p>

      {/* Network Canvas */}
      <div className="w-full aspect-[16/9] bg-[#070b13] rounded-xl border border-[#0e2a4a]/80 relative overflow-hidden p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none">
          <defs>
            {/* Pulsing beacon marker for lunar link */}
            <radialGradient id="lunar-pulse-grad">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
            </radialGradient>
          </defs>

          {/* Background constellation decorative grid */}
          <circle cx={nodeMap['shackleton']?.x} cy={nodeMap['shackleton']?.y} r="65" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,4" opacity="0.4" />
          <circle cx={nodeMap['shackleton']?.x} cy={nodeMap['shackleton']?.y} r="110" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3,6" opacity="0.2" />

          {/* Render Edges */}
          {filteredEdges.map((edge) => {
            const src = nodeMap[edge.source];
            const tgt = nodeMap[edge.target];
            if (!src || !tgt) return null;

            const isSelected = selectedEdge?.id === edge.id;
            const isNodeConnected =
              selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);

            const isRadio = edge.type === 'radio_telemetry';
            const strokeColor = isRadio ? '#38bdf8' : edge.type === 'acoustic_signal' ? '#f59e0b' : '#10b981';

            return (
              <g
                key={edge.id}
                id={`network-edge-${edge.id}`}
                className="cursor-pointer"
                onClick={() => handleEdgeClick(edge)}
              >
                {/* Edge line */}
                <line
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={strokeColor}
                  strokeWidth={isSelected || isNodeConnected ? 3 : 1.8}
                  strokeOpacity={isSelected || isNodeConnected ? 0.95 : 0.45}
                  strokeDasharray={isRadio ? '4,4' : undefined}
                  className="transition-all duration-300"
                />

                {/* Animated traveling packet along line */}
                {(isSelected || isRadio || isNodeConnected) && (
                  <circle
                    cx={(src.x + tgt.x) / 2}
                    cy={(src.y + tgt.y) / 2}
                    r={isSelected ? 4.5 : 3}
                    fill={strokeColor}
                    className="animate-ping"
                  />
                )}
              </g>
            );
          })}

          {/* Render Nodes */}
          {GLOBAL_NETWORK_NODES.map((node) => {
            const pos = nodeMap[node.id];
            if (!pos) return null;

            const isSelected = selectedNode?.id === node.id;
            const isConnectedToEdge =
              selectedEdge && (selectedEdge.source === node.id || selectedEdge.target === node.id);

            const isCollapsed = node.status === 'collapsed';
            const nodeColor = isCollapsed ? '#e74c3c' : '#2ecc71';

            return (
              <g
                key={node.id}
                id={`network-node-${node.id}`}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
                onClick={() => handleNodeClick(node)}
              >
                {/* Halo aura */}
                {(isSelected || isConnectedToEdge) && (
                  <circle
                    r="22"
                    fill="none"
                    stroke={nodeColor}
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                    className="animate-spin"
                  />
                )}

                {/* Node circle */}
                <circle
                  r={isCollapsed ? 12 : 10}
                  fill={nodeColor}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 2 : 1}
                  fillOpacity={isSelected ? 1 : 0.85}
                  className="shadow-lg"
                />

                {/* Node icon / indicator inside */}
                {isCollapsed && (
                  <line x1="-4" y1="-4" x2="4" y2="4" stroke="#ffffff" strokeWidth="1.5" />
                )}

                {/* Node text label */}
                <text
                  x="0"
                  y={isCollapsed ? -17 : 20}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono, monospace"
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Details Overlay */}
        {(selectedNode || selectedEdge) && (
          <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 border border-[#0d223a] rounded-xl p-3.5 shadow-2xl text-xs font-mono-code flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in backdrop-blur-md">
            <div>
              {selectedNode ? (
                <>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: selectedNode.status === 'collapsed' ? '#e74c3c' : '#2ecc71' }}
                    />
                    <span className="font-bold text-white text-sm">{selectedNode.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#050e1c] text-slate-300">
                      {selectedNode.region}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        selectedNode.status === 'collapsed' ? 'bg-rose-950/80 text-rose-300' : 'bg-emerald-950/80 text-emerald-300'
                      }`}
                    >
                      {selectedNode.status === 'collapsed' ? 'COLAPSO MECÂNICO' : 'NÚCLEO SOBREVIVENTE'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">{selectedNode.description}</p>
                </>
              ) : selectedEdge ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cyan-300 text-sm">{selectedEdge.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#050e1c] text-slate-300">
                      {nodeMap[selectedEdge.source]?.node.label} ↔ {nodeMap[selectedEdge.target]?.node.label}
                    </span>
                    {selectedEdge.frequency && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950/80 text-cyan-300 border border-cyan-500/40">
                        {selectedEdge.frequency}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">{selectedEdge.description}</p>
                </>
              ) : null}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {selectedEdge?.type === 'radio_telemetry' && (
                <button
                  onClick={() => {
                    setIsPlayingBeacon(true);
                    audioService.playHydrogenBeacon(() => setIsPlayingBeacon(false));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingBeacon ? 'animate-pulse text-cyan-200' : ''}`} />
                  <span>{isPlayingBeacon ? 'Transmitindo 1420 MHz...' : 'Sintetizar Ping 1420 MHz'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  setSelectedNode(null);
                  setSelectedEdge(null);
                }}
                className="text-slate-400 hover:text-white underline cursor-pointer text-[11px]"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 font-mono-code gap-2 px-1 pt-2 border-t border-[#0e2a4a]">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500" /> Nós em verde: refúgios terrestres integrados na Nova Terra. Nó em vermelho: Base Lunar Shackleton (extinção por asfixia).
        </span>
        <span className="text-cyan-400 font-semibold">Fonte: NetworkX Topo-Graph Specs</span>
      </div>
    </div>
  );
};
