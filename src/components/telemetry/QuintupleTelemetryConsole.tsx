import React, { useState } from 'react';
import { 
  Activity, 
  Flame, 
  Zap, 
  Gauge, 
  Radio, 
  ShieldAlert, 
  RefreshCw, 
  Layers, 
  Cpu, 
  Workflow,
  AlertTriangle,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { useLiveTelemetry, OperationalState, INITIAL_SYNOPTIC_NODES, SynopticNode } from '../../hooks/useLiveTelemetry';
import { audioService } from '../../services/audioService';

export const QuintupleTelemetryConsole: React.FC = () => {
  const {
    operationalState,
    channelHistory,
    sensors,
    selectedSynopticNodeId,
    setSelectedSynopticNodeId,
    stressMode,
    tickCount,
    injectStress,
    getSafeStateSegments,
  } = useLiveTelemetry();

  const [activeChannel, setActiveChannel] = useState<'all' | 'temp' | 'pressure' | 'voltage' | 'vibration'>('all');
  const [activeSubTab, setActiveSubTab] = useState<'multichannel' | 'states' | 'heatmap' | 'synoptic'>('multichannel');

  const safeSegments = getSafeStateSegments();
  const selectedSynopticNode = INITIAL_SYNOPTIC_NODES.find(n => n.id === selectedSynopticNodeId) || INITIAL_SYNOPTIC_NODES[0];
  const matchingSensor = sensors.find(s => s.code === selectedSynopticNode.sensorCode);

  // Status badge styling
  const stateBadges: Record<OperationalState, { bg: string; text: string; border: string; label: string }> = {
    REGIME_OK: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/40', label: 'REGIME OK • OPERAÇÃO NOMINAL' },
    ALERTA_TERMICO: { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/50', label: 'ALERTA TÉRMICO • SOBREAQUECIMENTO (>88°C)' },
    FALHA_REDE: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50', label: 'FALHA DE REDE • SUBTENSÃO CRÍTICA (<360V)' },
    DEFESA_ATIVA: { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/50', label: 'DEFESA ATIVA • CONTRAMEDIDAS POLARIZADAS' },
    RECUPERACAO: { bg: 'bg-cyan-500/20', text: 'text-cyan-300', border: 'border-cyan-500/50', label: 'RECUPERAÇÃO • ESTABILIZAÇÃO SISTÊMICA' },
  };

  const currentBadge = stateBadges[operationalState];

  // Current physical values
  const lastSample = channelHistory[channelHistory.length - 1] || {
    coreTemp: 65.0,
    hydraulicPressure: 210.0,
    busVoltage: 400.0,
    vibrationG: 0.15,
  };

  const prevSample = channelHistory[channelHistory.length - 2] || lastSample;

  const deltaTemp = (lastSample.coreTemp - prevSample.coreTemp).toFixed(1);
  const deltaPress = (lastSample.hydraulicPressure - prevSample.hydraulicPressure).toFixed(1);
  const deltaVolt = (lastSample.busVoltage - prevSample.busVoltage).toFixed(1);
  const deltaVib = (lastSample.vibrationG - prevSample.vibrationG).toFixed(2);

  // SVG Chart Dimensions
  const svgWidth = 740;
  const svgHeight = 240;
  const pad = { top: 20, right: 30, bottom: 35, left: 50 };
  const graphW = svgWidth - pad.left - pad.right;
  const graphH = svgHeight - pad.top - pad.bottom;

  // Compute normalized points for each channel
  const totalSamples = channelHistory.length;
  const divisor = totalSamples > 1 ? totalSamples - 1 : 1;

  const tempPoints = channelHistory.map((d, i) => ({
    x: pad.left + (i / divisor) * graphW,
    y: pad.top + graphH - ((Math.min(110, Math.max(30, d.coreTemp)) - 30) / 80) * graphH,
  }));

  const pressPoints = channelHistory.map((d, i) => ({
    x: pad.left + (i / divisor) * graphW,
    y: pad.top + graphH - ((Math.min(320, Math.max(150, d.hydraulicPressure)) - 150) / 170) * graphH,
  }));

  const voltPoints = channelHistory.map((d, i) => ({
    x: pad.left + (i / divisor) * graphW,
    y: pad.top + graphH - ((Math.min(430, Math.max(330, d.busVoltage)) - 330) / 100) * graphH,
  }));

  const vibPoints = channelHistory.map((d, i) => ({
    x: pad.left + (i / divisor) * graphW,
    y: pad.top + graphH - (Math.min(1.5, Math.max(0, d.vibrationG)) / 1.5) * graphH,
  }));

  const buildPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    return pts.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`), '');
  };

  return (
    <div className="bg-[#0b101c] border border-[#0e2a4a] rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Console Top Header with DEFCON & Live Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#0e2a4a]">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono-code font-bold uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SISTEMA QUÍNTUPLO DE TELEMETRIA • GEOTACTICAL U.C.
            </span>
            <span className={`px-2 py-0.5 rounded border text-[11px] font-mono-code font-bold ${currentBadge.bg} ${currentBadge.text} ${currentBadge.border}`}>
              {currentBadge.label}
            </span>
            <span className="text-[11px] font-mono-code text-slate-400">
              AMOSTRAGEM DETERMINÍSTICA: 1.0 Hz • CICLO #{tickCount}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1.5 flex items-center gap-2">
            Console Operacional de Monitoramento Físico &amp; Arca Seeds
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl mt-0.5">
            Cinco camadas analíticas integradas: Série Temporal Multicanal, Autômato de Estados Operacionais, 
            Indicadores de Variação Rápida com Sparklines, Matriz Térmica dos 12 Transdutores e Modelo Sinóptico Interativo.
          </p>
        </div>

        {/* Stress Testing Action Suite */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#070b13] p-2 rounded-xl border border-[#0e2a4a] shrink-0">
          <span className="text-[10px] font-mono-code text-slate-400 uppercase font-bold px-1 hidden sm:inline">
            INJEÇÃO DE TESTE:
          </span>
          <div className="grid grid-cols-2 sm:flex items-center gap-1.5">
            <button
              onClick={() => injectStress('thermal')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono-code font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border ${
                stressMode === 'thermal'
                  ? 'bg-amber-500/30 text-amber-300 border-amber-500'
                  : 'bg-[#050e1c] text-slate-300 hover:text-amber-400 border-[#0e2a4a]'
              }`}
              title="Simular Sobrecarga Térmica (>88°C)"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Térmica</span>
            </button>

            <button
              onClick={() => injectStress('voltage')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono-code font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border ${
                stressMode === 'voltage'
                  ? 'bg-red-500/30 text-red-300 border-red-500'
                  : 'bg-[#050e1c] text-slate-300 hover:text-red-400 border-[#0e2a4a]'
              }`}
              title="Simular Falha de Subtensão (<360V)"
            >
              <Zap className="w-3.5 h-3.5 text-red-400" />
              <span>Tensão</span>
            </button>

            <button
              onClick={() => injectStress('seismic')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono-code font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border ${
                stressMode === 'seismic'
                  ? 'bg-purple-500/30 text-purple-300 border-purple-500'
                  : 'bg-[#050e1c] text-slate-300 hover:text-purple-400 border-[#0e2a4a]'
              }`}
              title="Simular Abalo Sísmico e Pico Hidráulico"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              <span>Sísmico</span>
            </button>

            <button
              onClick={() => injectStress('recovery')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono-code font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border ${
                stressMode === 'recovery'
                  ? 'bg-cyan-500/30 text-cyan-300 border-cyan-500'
                  : 'bg-[#050e1c] text-emerald-400 hover:bg-[#0a1b33] border-[#0e2a4a]'
              }`}
              title="Normalizar Parâmetros e Restaurar Regime OK"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${stressMode ? 'animate-spin' : ''}`} />
              <span>Restaurar</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. INDICADORES DE VARIAÇÃO RÁPIDA (4 BLOCOS MODULARES COM SPARKLINES SVG) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Bloco 1: Temperatura do Núcleo */}
        <div className="bg-[#0e1424] border border-[#0e2a4a]/90 rounded-xl p-3.5 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Flame className="w-3.5 h-3.5" /> TEMP. NÚCLEO
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              lastSample.coreTemp > 88 ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              {lastSample.coreTemp > 88 ? 'ALERTA' : 'NOMINAL'}
            </span>
          </div>

          <div className="flex items-baseline justify-between my-1">
            <span className="text-2xl font-bold font-mono-code text-white">
              {lastSample.coreTemp.toFixed(1)} <span className="text-sm font-normal text-slate-400">°C</span>
            </span>
            <span className={`text-xs font-mono-code font-bold ${
              parseFloat(deltaTemp) > 0 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {parseFloat(deltaTemp) >= 0 ? `+${deltaTemp}` : deltaTemp} °C/s
            </span>
          </div>

          {/* Sparkline SVG */}
          <div className="w-full h-8 mt-1">
            <svg viewBox="0 0 160 30" className="w-full h-full">
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={channelHistory.slice(-16).map((d, idx) => {
                  const x = (idx / 15) * 160;
                  const y = 28 - ((Math.min(100, Math.max(50, d.coreTemp)) - 50) / 50) * 26;
                  return `${x},${y}`;
                }).join(' ')}
              />
            </svg>
          </div>
          <div className="text-[10px] font-mono-code text-slate-500 mt-1 flex justify-between">
            <span>Nominal: 65°C</span>
            <span>Tolerância: &lt;88°C</span>
          </div>
        </div>

        {/* Bloco 2: Pressão Hidráulica */}
        <div className="bg-[#0e1424] border border-[#0e2a4a]/90 rounded-xl p-3.5 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Gauge className="w-3.5 h-3.5" /> PRESSÃO HIDRÁULICA
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              lastSample.hydraulicPressure > 280 ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              {lastSample.hydraulicPressure > 280 ? 'SOBREPRESSÃO' : 'NOMINAL'}
            </span>
          </div>

          <div className="flex items-baseline justify-between my-1">
            <span className="text-2xl font-bold font-mono-code text-white">
              {lastSample.hydraulicPressure.toFixed(1)} <span className="text-sm font-normal text-slate-400">bar</span>
            </span>
            <span className={`text-xs font-mono-code font-bold ${
              parseFloat(deltaPress) > 0 ? 'text-cyan-400' : 'text-slate-400'
            }`}>
              {parseFloat(deltaPress) >= 0 ? `+${deltaPress}` : deltaPress} bar/s
            </span>
          </div>

          <div className="w-full h-8 mt-1">
            <svg viewBox="0 0 160 30" className="w-full h-full">
              <polyline
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={channelHistory.slice(-16).map((d, idx) => {
                  const x = (idx / 15) * 160;
                  const y = 28 - ((Math.min(300, Math.max(180, d.hydraulicPressure)) - 180) / 120) * 26;
                  return `${x},${y}`;
                }).join(' ')}
              />
            </svg>
          </div>
          <div className="text-[10px] font-mono-code text-slate-500 mt-1 flex justify-between">
            <span>Nominal: 210 bar</span>
            <span>Limite: 280 bar</span>
          </div>
        </div>

        {/* Bloco 3: Tensão Elétrica */}
        <div className="bg-[#0e1424] border border-[#0e2a4a]/90 rounded-xl p-3.5 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 text-yellow-400 font-semibold">
              <Zap className="w-3.5 h-3.5" /> BARRAMENTO 400V
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              lastSample.busVoltage < 360 ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              {lastSample.busVoltage < 360 ? 'FALHA REDE' : 'ESTÁVEL'}
            </span>
          </div>

          <div className="flex items-baseline justify-between my-1">
            <span className="text-2xl font-bold font-mono-code text-white">
              {lastSample.busVoltage.toFixed(1)} <span className="text-sm font-normal text-slate-400">V</span>
            </span>
            <span className={`text-xs font-mono-code font-bold ${
              parseFloat(deltaVolt) < 0 ? 'text-red-400' : 'text-emerald-400'
            }`}>
              {parseFloat(deltaVolt) >= 0 ? `+${deltaVolt}` : deltaVolt} V/s
            </span>
          </div>

          <div className="w-full h-8 mt-1">
            <svg viewBox="0 0 160 30" className="w-full h-full">
              <polyline
                fill="none"
                stroke="#eab308"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={channelHistory.slice(-16).map((d, idx) => {
                  const x = (idx / 15) * 160;
                  const y = 28 - ((Math.min(420, Math.max(340, d.busVoltage)) - 340) / 80) * 26;
                  return `${x},${y}`;
                }).join(' ')}
              />
            </svg>
          </div>
          <div className="text-[10px] font-mono-code text-slate-500 mt-1 flex justify-between">
            <span>Nominal: 400 V</span>
            <span>Mínimo: 360 V</span>
          </div>
        </div>

        {/* Bloco 4: Vibração Mecânica */}
        <div className="bg-[#0e1424] border border-[#0e2a4a]/90 rounded-xl p-3.5 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
              <Activity className="w-3.5 h-3.5" /> VIBRAÇÃO MECÂNICA
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              lastSample.vibrationG > 0.85 ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              {lastSample.vibrationG > 0.85 ? 'ALTA VIBRAÇÃO' : 'AMORTECIDO'}
            </span>
          </div>

          <div className="flex items-baseline justify-between my-1">
            <span className="text-2xl font-bold font-mono-code text-white">
              {lastSample.vibrationG.toFixed(2)} <span className="text-sm font-normal text-slate-400">g</span>
            </span>
            <span className={`text-xs font-mono-code font-bold ${
              parseFloat(deltaVib) > 0 ? 'text-purple-400' : 'text-slate-400'
            }`}>
              {parseFloat(deltaVib) >= 0 ? `+${deltaVib}` : deltaVib} g/s
            </span>
          </div>

          <div className="w-full h-8 mt-1">
            <svg viewBox="0 0 160 30" className="w-full h-full">
              <polyline
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={channelHistory.slice(-16).map((d, idx) => {
                  const x = (idx / 15) * 160;
                  const y = 28 - (Math.min(1.2, Math.max(0, d.vibrationG)) / 1.2) * 26;
                  return `${x},${y}`;
                }).join(' ')}
              />
            </svg>
          </div>
          <div className="text-[10px] font-mono-code text-slate-500 mt-1 flex justify-between">
            <span>Nominal: 0.15 g</span>
            <span>Alerta: &gt;0.85 g</span>
          </div>
        </div>
      </div>

      {/* Primary Sub-Views Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-[#0e2a4a] pb-2">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => {
              audioService.playNodeSelect();
              setActiveSubTab('multichannel');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'multichannel'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#020610]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>1. Série Multicanal</span>
          </button>

          <button
            onClick={() => {
              audioService.playNodeSelect();
              setActiveSubTab('states');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'states'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#020610]'
            }`}
          >
            <Workflow className="w-3.5 h-3.5 text-cyan-400" />
            <span>2. Autômato &amp; Estados</span>
          </button>

          <button
            onClick={() => {
              audioService.playNodeSelect();
              setActiveSubTab('heatmap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'heatmap'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#020610]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>4. Matriz Térmica (12 Sensores)</span>
          </button>

          <button
            onClick={() => {
              audioService.playNodeSelect();
              setActiveSubTab('synoptic');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'synoptic'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#020610]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>5. Modelo Sinóptico Interativo</span>
          </button>
        </div>

        <span className="text-[11px] font-mono-code text-slate-500 hidden md:inline">
          BUFFER HISTÓRICO: 40 SEGUNDOS (SEM PERDA DE DADOS)
        </span>
      </div>

      {/* ========================================================
          1. SÉRIE TEMPORAL MULTICANAL
         ======================================================== */}
      {activeSubTab === 'multichannel' && (
        <div className="bg-[#080d17] border border-[#0e2a4a]/80 rounded-xl p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono-code text-emerald-400 font-bold uppercase tracking-wider">
                CAMADA 1 • FORMAS DE ONDA CONTÍNUAS
              </span>
              <h3 className="text-base font-bold font-display text-white">
                Traçador Dinâmico das 4 Variáveis de Engenharia
              </h3>
            </div>

            {/* Channel Filters */}
            <div className="flex items-center gap-1 font-mono-code text-xs">
              <button
                onClick={() => setActiveChannel('all')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeChannel === 'all'
                    ? 'bg-slate-700 text-white font-bold border border-slate-600'
                    : 'bg-[#050e1c]/70 text-slate-400 hover:text-slate-200'
                }`}
              >
                Todos (Multicanal)
              </button>
              <button
                onClick={() => setActiveChannel('temp')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeChannel === 'temp'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/50'
                    : 'bg-[#050e1c]/70 text-slate-400 hover:text-amber-300'
                }`}
              >
                Temp (°C)
              </button>
              <button
                onClick={() => setActiveChannel('pressure')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeChannel === 'pressure'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50'
                    : 'bg-[#050e1c]/70 text-slate-400 hover:text-cyan-300'
                }`}
              >
                Pressão (bar)
              </button>
              <button
                onClick={() => setActiveChannel('voltage')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeChannel === 'voltage'
                    ? 'bg-yellow-500/20 text-yellow-300 font-bold border border-yellow-500/50'
                    : 'bg-[#050e1c]/70 text-slate-400 hover:text-yellow-300'
                }`}
              >
                Tensão (V)
              </button>
              <button
                onClick={() => setActiveChannel('vibration')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeChannel === 'vibration'
                    ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/50'
                    : 'bg-[#050e1c]/70 text-slate-400 hover:text-purple-300'
                }`}
              >
                Vibração (g)
              </button>
            </div>
          </div>

          {/* SVG Multi-trace Canvas */}
          <div className="w-full aspect-[21/9] max-h-[340px] bg-[#05080f] rounded-xl border border-[#0e2a4a]/90 p-2 relative overflow-hidden">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full select-none">
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((frac, i) => {
                const y = pad.top + graphH * (1 - frac);
                return (
                  <g key={`grid-h-${i}`}>
                    <line
                      x1={pad.left}
                      y1={y}
                      x2={svgWidth - pad.right}
                      y2={y}
                      stroke="#1e293b"
                      strokeDasharray="3,3"
                      strokeWidth="0.8"
                    />
                    <text
                      x={pad.left - 8}
                      y={y + 3}
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="end"
                    >
                      {Math.round(frac * 100)}%
                    </text>
                  </g>
                );
              })}

              {/* Threshold Alarm Lines (Nominal / Alert) */}
              <line
                x1={pad.left}
                y1={pad.top + graphH * (1 - 0.725)} // 88°C in 30-110 range
                x2={svgWidth - pad.right}
                y2={pad.top + graphH * (1 - 0.725)}
                stroke="#ef4444"
                strokeDasharray="4,4"
                strokeWidth="1.2"
                opacity="0.8"
              />
              <text
                x={svgWidth - pad.right - 5}
                y={pad.top + graphH * (1 - 0.725) - 4}
                fill="#ef4444"
                fontSize="8.5"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="end"
              >
                LIMITE TÉRMICO ALARME (88°C)
              </text>

              {/* Channel Traces */}
              {(activeChannel === 'all' || activeChannel === 'temp') && (
                <path
                  d={buildPath(tempPoints)}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {(activeChannel === 'all' || activeChannel === 'pressure') && (
                <path
                  d={buildPath(pressPoints)}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {(activeChannel === 'all' || activeChannel === 'voltage') && (
                <path
                  d={buildPath(voltPoints)}
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {(activeChannel === 'all' || activeChannel === 'vibration') && (
                <path
                  d={buildPath(vibPoints)}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Current value tracking nodes at end of line */}
              {tempPoints.length > 0 && (activeChannel === 'all' || activeChannel === 'temp') && (
                <circle
                  cx={tempPoints[tempPoints.length - 1].x}
                  cy={tempPoints[tempPoints.length - 1].y}
                  r="4.5"
                  fill="#f59e0b"
                  stroke="#080d17"
                  strokeWidth="2"
                />
              )}

              {pressPoints.length > 0 && (activeChannel === 'all' || activeChannel === 'pressure') && (
                <circle
                  cx={pressPoints[pressPoints.length - 1].x}
                  cy={pressPoints[pressPoints.length - 1].y}
                  r="4.5"
                  fill="#06b6d4"
                  stroke="#080d17"
                  strokeWidth="2"
                />
              )}

              {/* Time stamps on bottom axis */}
              {channelHistory.filter((_, idx) => idx % 8 === 0).map((pt, idx) => {
                const sampleIdx = channelHistory.findIndex(p => p.time === pt.time);
                const x = pad.left + (sampleIdx / divisor) * graphW;
                return (
                  <text
                    key={`time-${idx}`}
                    x={x}
                    y={svgHeight - 12}
                    fill="#64748b"
                    fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace"
                    textAnchor="middle"
                  >
                    {pt.time}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Trace Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code pt-2 border-t border-[#0e2a4a]/80">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-3 h-0.5 bg-amber-400" /> Temperatura (°C)
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-3 h-0.5 bg-cyan-400" /> Pressão (bar)
              </span>
              <span className="flex items-center gap-1.5 text-yellow-400">
                <span className="w-3 h-0.5 bg-yellow-400" /> Tensão (V)
              </span>
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="w-3 h-0.5 bg-purple-400" /> Vibração Mecânica (g)
              </span>
            </div>

            <span className="text-slate-400 text-[11px]">
              Sincronização: Sem drift temporal entre transdutores
            </span>
          </div>
        </div>
      )}

      {/* ========================================================
          2. LINHA TEMPORAL DE ESTADOS & AUTÔMATO FINITO
         ======================================================== */}
      {activeSubTab === 'states' && (
        <div className="bg-[#080d17] border border-[#0e2a4a]/80 rounded-xl p-4 sm:p-5 space-y-5">
          <div>
            <span className="text-[10px] font-mono-code text-cyan-400 font-bold uppercase tracking-wider">
              CAMADA 2 • AUTÔMATO FINITO DO CICLO OPERACIONAL
            </span>
            <h3 className="text-base font-bold font-display text-white mt-0.5">
              Máquina de Estados e Linha Temporal de Proporção Flexível (safeSegments)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Representação do regime operacional. O arranjo proporcional flexível impede transbordamentos visuais 
              ou quebras de layout em sessões prolongadas.
            </p>
          </div>

          {/* Safe Segments Horizontal Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
              <span>HISTÓRICO ACUMULADO POR REGIME:</span>
              <span className="text-emerald-400 font-bold">ESTADO ATUAL: {operationalState}</span>
            </div>

            <div className="w-full h-8 rounded-lg overflow-hidden flex border border-[#0e2a4a] bg-slate-900 p-0.5 gap-0.5">
              {safeSegments.map((seg) => (
                <div
                  key={seg.state}
                  style={{
                    flexGrow: seg.percentage,
                    backgroundColor: seg.color,
                    opacity: operationalState === seg.state ? 1.0 : 0.65,
                  }}
                  className="h-full rounded transition-all duration-300 relative group flex items-center justify-center overflow-hidden cursor-pointer"
                  title={`${seg.label}: ${seg.durationSeconds}s (${seg.percentage}%)`}
                >
                  <span className="text-[10px] font-mono-code font-bold text-slate-950 px-1 truncate select-none">
                    {seg.state.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>

            {/* Segments Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {safeSegments.map((seg) => (
                <div key={`legend-${seg.state}`} className="p-2 rounded bg-[#0e1424] border border-[#0e2a4a] text-xs font-mono-code">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="font-bold text-slate-200 truncate">{seg.state}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {seg.durationSeconds}s • {seg.percentage}% do tempo
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Finite State Machine Diagram (SVG Interativo) */}
          <div className="bg-[#05080f] rounded-xl border border-[#0e2a4a] p-4">
            <div className="text-xs font-mono-code text-slate-400 mb-3 flex items-center justify-between">
              <span className="text-cyan-400 font-bold">TOPOLOGIA DE TRANSIÇÕES DO AUTÔMATO:</span>
              <span>ESTADO ATIVO ILUMINADO EM TEMPO REAL</span>
            </div>

            <div className="w-full aspect-[24/9] max-h-[220px]">
              <svg viewBox="0 0 700 180" className="w-full h-full select-none">
                {/* State Transition Connecting Lines */}
                <line x1="100" y1="90" x2="260" y2="40" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="100" y1="90" x2="260" y2="140" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="260" y1="40" x2="440" y2="90" stroke="#a855f7" strokeWidth="2" />
                <line x1="260" y1="140" x2="580" y2="90" stroke="#06b6d4" strokeWidth="2" />
                <line x1="440" y1="90" x2="580" y2="90" stroke="#06b6d4" strokeWidth="2" />
                <path d="M 580,90 Q 340,175 100,90" fill="none" stroke="#10b981" strokeWidth="2.5" />

                {/* State 1: REGIME OK */}
                <g transform="translate(100, 90)">
                  <circle
                    r="32"
                    fill={operationalState === 'REGIME_OK' ? '#10b98130' : '#0e1726'}
                    stroke="#10b981"
                    strokeWidth={operationalState === 'REGIME_OK' ? 3.5 : 1.5}
                    className="transition-all"
                  />
                  {operationalState === 'REGIME_OK' && (
                    <circle r="38" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4,4" className="animate-spin" />
                  )}
                  <text y="-5" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">REGIME OK</text>
                  <text y="10" fill="#10b981" fontSize="8.5" fontFamily="JetBrains Mono" textAnchor="middle">Nominal</text>
                </g>

                {/* State 2: ALERTA TÉRMICO */}
                <g transform="translate(260, 40)">
                  <circle
                    r="28"
                    fill={operationalState === 'ALERTA_TERMICO' ? '#f59e0b30' : '#0e1726'}
                    stroke="#f59e0b"
                    strokeWidth={operationalState === 'ALERTA_TERMICO' ? 3.5 : 1.5}
                  />
                  <text y="-4" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">ALERTA</text>
                  <text y="9" fill="#f59e0b" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Temp &gt; 88°C</text>
                </g>

                {/* State 3: FALHA DE REDE */}
                <g transform="translate(260, 140)">
                  <circle
                    r="28"
                    fill={operationalState === 'FALHA_REDE' ? '#ef444430' : '#0e1726'}
                    stroke="#ef4444"
                    strokeWidth={operationalState === 'FALHA_REDE' ? 3.5 : 1.5}
                  />
                  <text y="-4" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">FALHA REDE</text>
                  <text y="9" fill="#ef4444" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">V &lt; 360V</text>
                </g>

                {/* State 4: DEFESA ATIVA */}
                <g transform="translate(440, 90)">
                  <circle
                    r="28"
                    fill={operationalState === 'DEFESA_ATIVA' ? '#a855f730' : '#0e1726'}
                    stroke="#a855f7"
                    strokeWidth={operationalState === 'DEFESA_ATIVA' ? 3.5 : 1.5}
                  />
                  <text y="-4" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">DEFESA ATIVA</text>
                  <text y="9" fill="#a855f7" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Polarizada</text>
                </g>

                {/* State 5: RECUPERAÇÃO */}
                <g transform="translate(580, 90)">
                  <circle
                    r="28"
                    fill={operationalState === 'RECUPERACAO' ? '#06b6d430' : '#0e1726'}
                    stroke="#06b6d4"
                    strokeWidth={operationalState === 'RECUPERACAO' ? 3.5 : 1.5}
                  />
                  <text y="-4" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">RECUPERAÇÃO</text>
                  <text y="9" fill="#06b6d4" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Restabelecimento</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          4. MATRIZ TÉRMICA (HEATMAP) DOS 12 SENSORES
         ======================================================== */}
      {activeSubTab === 'heatmap' && (
        <div className="bg-[#080d17] border border-[#0e2a4a]/80 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                CAMADA 4 • MATRIZ TÉRMICA INTEGRADA (12 TRANSDUTORES)
              </span>
              <h3 className="text-base font-bold font-display text-white mt-0.5">
                Monitoramento Matricial do Sistema com Resposta Espacial e Histórico
              </h3>
            </div>
            <span className="text-xs font-mono-code text-slate-400">
              NÓS ATIVOS: 12/12 • POLARIZAÇÃO TÉRMICA AUTOMÁTICA
            </span>
          </div>

          {/* 12-Sensor Grid (4x3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {sensors.map((s) => {
              const isWarning = s.status === 'warning';
              const isCritical = s.status === 'critical';

              return (
                <div
                  key={s.code}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isCritical
                      ? 'bg-red-500/15 border-red-500/60 shadow-lg shadow-red-500/10'
                      : isWarning
                      ? 'bg-amber-500/15 border-amber-500/60'
                      : 'bg-[#0d1322] border-[#0e2a4a] hover:border-[#0e2a4a]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-code mb-1">
                    <span className="font-bold text-slate-200">{s.code}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        isCritical
                          ? 'bg-red-500/30 text-red-300'
                          : isWarning
                          ? 'bg-amber-500/30 text-amber-300'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>

                  <p className="text-xs font-sans text-slate-300 font-medium truncate" title={s.name}>
                    {s.name}
                  </p>

                  <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-[#0e2a4a]/80">
                    <span className="text-lg font-bold font-mono-code text-white">
                      {s.currentVal} <span className="text-xs font-normal text-slate-400">{s.unit}</span>
                    </span>
                    <span className="text-[10px] font-mono-code text-slate-500">
                      Ref: {s.nominalVal}
                    </span>
                  </div>

                  {/* Heat gradient bar representation */}
                  <div className="w-full h-1.5 rounded-full bg-[#050e1c] mt-2 overflow-hidden flex">
                    {s.history.map((val, idx) => {
                      let barColor = '#10b981';
                      if (s.code === 'T-01' && val > 85) barColor = '#ef4444';
                      else if (s.code === 'T-01' && val > 75) barColor = '#f59e0b';
                      return (
                        <div
                          key={`hist-bar-${idx}`}
                          className="flex-1 h-full"
                          style={{ backgroundColor: barColor }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          5. MODELO SINÓPTICO INTERATIVO
         ======================================================== */}
      {activeSubTab === 'synoptic' && (
        <div className="bg-[#080d17] border border-[#0e2a4a]/80 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono-code text-purple-400 font-bold uppercase tracking-wider">
                CAMADA 5 • MODELO SINÓPTICO TOPOLÓGICO DA ARCA SEEDS
              </span>
              <h3 className="text-base font-bold font-display text-white mt-0.5">
                Diagrama Esquemático dos Subsistemas Subterrâneos &amp; Conexões
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Clique nos nós do diagrama para isolar e inspecionar a telemetria pontual do subsistema.
              </p>
            </div>

            <span className="text-xs font-mono-code text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
              NÓ SELECIONADO: {selectedSynopticNode.label} ({selectedSynopticNode.sensorCode})
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Interactive SVG Synoptic Schematic */}
            <div className="lg:col-span-8 bg-[#05080f] rounded-xl border border-[#0e2a4a] p-3 relative aspect-[16/10] overflow-hidden">
              <svg viewBox="0 0 600 360" className="w-full h-full select-none">
                {/* Background bus conduit paths */}
                <path d="M 120,110 L 300,110 L 300,250 L 120,250 Z" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M 300,110 L 450,75 L 450,165 L 480,250 L 300,250" fill="none" stroke="#1e293b" strokeWidth="2" />
                <path d="M 480,250 L 550,180" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" />

                {/* Render Nodes */}
                {INITIAL_SYNOPTIC_NODES.map((node) => {
                  const isSelected = selectedSynopticNodeId === node.id;
                  const cx = (node.x / 100) * 600;
                  const cy = (node.y / 100) * 360;

                  return (
                    <g
                      key={node.id}
                      onClick={() => {
                        audioService.playNodeSelect();
                        setSelectedSynopticNodeId(node.id);
                      }}
                      className="cursor-pointer group"
                    >
                      {isSelected && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="28"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          strokeDasharray="4,4"
                          className="animate-spin"
                        />
                      )}

                      <circle
                        cx={cx}
                        cy={cy}
                        r="20"
                        fill={isSelected ? '#0369a1' : '#0f172a'}
                        stroke={isSelected ? '#38bdf8' : '#334155'}
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        className="transition-all duration-200 group-hover:stroke-emerald-400"
                      />

                      <text
                        x={cx}
                        y={cy + 4}
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="JetBrains Mono"
                        textAnchor="middle"
                      >
                        {node.sensorCode}
                      </text>

                      {/* Node Label underneath */}
                      <text
                        x={cx}
                        y={cy + 32}
                        fill={isSelected ? '#38bdf8' : '#94a3b8'}
                        fontSize="8"
                        fontFamily="JetBrains Mono"
                        textAnchor="middle"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {node.label.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Focused Diagnostic Panel */}
            <div className="lg:col-span-4 bg-[#0e1424] rounded-xl border border-[#0e2a4a] p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#0e2a4a]">
                  <span className="text-xs font-mono-code text-cyan-400 font-bold">
                    DIAGNÓSTICO PONTUAL: {selectedSynopticNode.sensorCode}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                    {matchingSensor?.status.toUpperCase() || 'OPERACIONAL'}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-base font-bold text-white font-display">
                    {selectedSynopticNode.label}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {selectedSynopticNode.sublabel}
                  </p>
                </div>

                {matchingSensor && (
                  <div className="mt-4 space-y-2 bg-[#070b13] p-3 rounded-lg border border-[#0e2a4a] text-xs font-mono-code">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Leitura Instantânea:</span>
                      <span className="text-white font-bold">{matchingSensor.currentVal} {matchingSensor.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Padrão Nominal:</span>
                      <span className="text-emerald-400">{matchingSensor.nominalVal} {matchingSensor.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Categoria:</span>
                      <span className="text-cyan-400 capitalize">{matchingSensor.category}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#0e2a4a]">
                <button
                  onClick={() => {
                    audioService.playPhaseTransition();
                    injectStress('thermal');
                  }}
                  className="w-full py-2 rounded-lg bg-[#050e1c] hover:bg-[#0a1b33] text-slate-200 text-xs font-mono-code font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Testar Transdutor {selectedSynopticNode.sensorCode}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
