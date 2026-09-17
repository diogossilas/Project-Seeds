import React from 'react';
import { 
  WARGAME_ROUTE_PRESETS 
} from '../../data/militaryMapsData';
import { 
  WargameWaypoint, 
  RouteEvaluationResult 
} from '../../types/militaryMaps';
import { 
  Navigation, 
  ShieldCheck, 
  AlertTriangle, 
  Eye, 
  Footprints, 
  Droplets,
  Radio,
  Play
} from 'lucide-react';
import { audioService } from '../../services/audioService';

interface MilitaryWargamePanelProps {
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  activeWaypoints: WargameWaypoint[];
}

export const MilitaryWargamePanel: React.FC<MilitaryWargamePanelProps> = ({
  selectedPresetId,
  onSelectPreset,
  activeWaypoints,
}) => {
  const currentPreset = WARGAME_ROUTE_PRESETS.find((p) => p.id === selectedPresetId) || WARGAME_ROUTE_PRESETS[0];

  // Calculate route multi-model metrics
  const evaluateRoute = (): RouteEvaluationResult => {
    let bottlenecks = 0;
    let bogRisks = 0;
    let exposureScore = 0;
    let sentinelAlerts = 0;

    activeWaypoints.forEach((wp) => {
      if (wp.mcooStatus === 'severely_restricted') bottlenecks += 1;
      if (wp.trafficStatus === 'NO-GO') bogRisks += 1;
      if (wp.droneRisk > 70) exposureScore += wp.droneRisk;
      if (wp.bioticThreat === 'Crítico / Letal' || wp.bioticThreat === 'Severo') sentinelAlerts += 1;
    });

    const isArmored = currentPreset.profile === 'armored';
    const isStealth = currentPreset.profile === 'stealth_specops';

    let feasibility = 85;
    if (bogRisks > 0 && isArmored) feasibility -= 40;
    if (bottlenecks > 0) feasibility -= 20;
    if (isStealth && exposureScore > 150) feasibility -= 30;

    return {
      totalDistanceKm: activeWaypoints.length * 2.8,
      overallFeasibilityPct: Math.max(5, Math.min(98, feasibility)),
      bottlenecksFound: bottlenecks,
      rasputitsaBogRiskPct: bogRisks > 0 ? 88 : 14,
      thermalDetectionExposureSec: Math.round(exposureScore * 1.8),
      sentinelAcousticAlertRiskPct: sentinelAlerts > 0 ? 82 : 12,
      recommendedEchelon: isArmored ? '1ª Brigada Blindada (Carros 65t)' : isStealth ? 'Destacamento Forças Especiais' : 'Patrulha Leve',
      safetyScore: Math.round(feasibility * 0.9)
    };
  };

  const evalResult = evaluateRoute();

  return (
    <div className="bg-[#050b14] border border-[#1e293b] p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e293b] pb-3">
        <div>
          <span className="text-[10px] font-mono-code text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5" />
            <span>SIMULADOR DE AVANÇO TÁTICO &amp; WARGAMING</span>
          </span>
          <h3 className="text-base sm:text-lg font-bold font-sans text-white mt-0.5">
            Avaliação Multi-Modelo de Rotas de Ataque
          </h3>
        </div>

        {/* Route Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {WARGAME_ROUTE_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  audioService.playNodeSelect();
                  onSelectPreset(preset.id);
                }}
                className={`px-3 py-1.5 text-xs font-mono-code whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 font-bold shadow'
                    : 'bg-[#010613] text-slate-400 hover:text-slate-200 border-[#1e293b]'
                }`}
              >
                {preset.name.split(' (')[0]}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-300 font-sans leading-relaxed">
        {currentPreset.description}
      </p>

      {/* 4 Multi-Model Verification KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-[#010613] border border-[#1e293b] p-2.5">
          <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Viabilidade Global</span>
          </div>
          <div className={`text-xl sm:text-2xl font-bold font-mono-code mt-0.5 ${
            evalResult.overallFeasibilityPct > 70 ? 'text-emerald-400' :
            evalResult.overallFeasibilityPct > 40 ? 'text-amber-400' : 'text-rose-400'
          }`}>
            {evalResult.overallFeasibilityPct}%
          </div>
          <div className="text-[10px] text-slate-400 font-sans mt-0.5">
            {evalResult.overallFeasibilityPct > 70 ? 'Eixo Aprovado' : 'Alto Risco de Fracasso'}
          </div>
        </div>

        <div className="bg-[#010613] border border-[#1e293b] p-2.5">
          <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center gap-1">
            <Droplets className="w-3 h-3 text-cyan-400" />
            <span>Risco Rasputitsa</span>
          </div>
          <div className={`text-xl sm:text-2xl font-bold font-mono-code mt-0.5 ${
            evalResult.rasputitsaBogRiskPct > 50 ? 'text-rose-400' : 'text-emerald-400'
          }`}>
            {evalResult.rasputitsaBogRiskPct}%
          </div>
          <div className="text-[10px] text-slate-400 font-sans mt-0.5">
            {evalResult.rasputitsaBogRiskPct > 50 ? 'Atolamento Iminente' : 'Solo Consolidado'}
          </div>
        </div>

        <div className="bg-[#010613] border border-[#1e293b] p-2.5">
          <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center gap-1">
            <Eye className="w-3 h-3 text-blue-400" />
            <span>Exposição FLIR</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono-code text-blue-400 mt-0.5">
            {evalResult.thermalDetectionExposureSec}s
          </div>
          <div className="text-[10px] text-slate-400 font-sans mt-0.5">
            Tempo em Campo Aberto
          </div>
        </div>

        <div className="bg-[#010613] border border-[#1e293b] p-2.5">
          <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>Alerta Sentinela</span>
          </div>
          <div className={`text-xl sm:text-2xl font-bold font-mono-code mt-0.5 ${
            evalResult.sentinelAcousticAlertRiskPct > 50 ? 'text-rose-400' : 'text-emerald-400'
          }`}>
            {evalResult.sentinelAcousticAlertRiskPct}%
          </div>
          <div className="text-[10px] text-slate-400 font-sans mt-0.5">
            {evalResult.sentinelAcousticAlertRiskPct > 50 ? 'Denúncia de Posição' : 'Marcha Furtiva'}
          </div>
        </div>
      </div>

      {/* Step-by-Step Waypoint Telemetry List */}
      <div className="space-y-2 pt-2 border-t border-[#1e293b]">
        <span className="text-[11px] font-mono-code text-slate-400 uppercase font-bold block">
          Pontos de Checagem ao Longo da Rota (Waypoints):
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {activeWaypoints.map((wp, idx) => (
            <div key={wp.id} className="bg-[#010613] border border-[#1e293b] p-2.5 text-xs font-mono-code">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span className="text-purple-400">{wp.label}</span>
                <span className="text-[10px] text-slate-400">{wp.mgrs}</span>
              </div>
              <div className="mt-1.5 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>MCOO:</span>
                  <span className={wp.mcooStatus === 'unrestricted' ? 'text-emerald-400' : 'text-rose-400'}>
                    {wp.mcooStatus === 'unrestricted' ? 'Irrestrito' : 'Restrito'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Trânsito:</span>
                  <span className={wp.trafficStatus === 'GO' ? 'text-emerald-400' : 'text-rose-400'}>
                    {wp.trafficStatus}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Dossel FLIR:</span>
                  <span className="text-blue-400">{wp.canopyConcealment}%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Ameaça Bio:</span>
                  <span className={wp.bioticThreat === 'Baixo' ? 'text-emerald-400' : 'text-amber-400'}>
                    {wp.bioticThreat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
