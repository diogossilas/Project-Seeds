import React from 'react';
import { ChevronRight, Box, BarChart3, Users, ShieldCheck, AlertCircle } from 'lucide-react';
import { TeamData } from '../../types';
import { audioService } from '../../services/audioService';

interface TeamDossierCardProps {
  team: TeamData;
  onNavigateToTab: (tab: 'table' | 'telemetry' | '3d' | 'succession') => void;
}

export const TeamDossierCard: React.FC<TeamDossierCardProps> = ({
  team,
  onNavigateToTab,
}) => {
  const handleAction = (tab: 'table' | 'telemetry' | '3d' | 'succession') => {
    audioService.playPhaseTransition();
    onNavigateToTab(tab);
  };

  const isExtinct = team.id === 'ryugu';
  const isFuji = team.id === 'arca-fuji';

  // RAG Status determination
  const statusLabel = 
    isFuji ? 'QG DE CONVERGÊNCIA' :
    isExtinct ? 'FORÇA EXTINTA / COLAPSO' :
    team.threatLevel === 'Baixo' ? 'PRONTIDÃO ALTA' :
    team.threatLevel === 'Moderado' ? 'OPERACIONAL' : 'ALERTA TÁTICO';

  const statusBg = 
    isFuji ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' :
    isExtinct ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' :
    team.threatLevel === 'Baixo' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' :
    'bg-amber-500/20 text-amber-300 border-amber-500/50';

  const tacticalCode = 
    team.id === 'inverno' ? 'INV' :
    team.id === 'primavera' ? 'PRI' :
    team.id === 'verao-a' ? 'VR-A' :
    team.id === 'verao-b' ? 'VR-B' :
    team.id === 'outono' ? 'OUT' :
    team.id === 'ryugu' ? 'RYU' : 'QG SADO';

  return (
    <div className="bg-[#0d131f] border border-slate-800 rounded-xl p-5 shadow-xl flex-1 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header with Unit Crest and Tactical Status */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center font-mono-code font-bold text-xs text-slate-900 shadow-md"
              style={{ backgroundColor: team.color }}
            >
              {tacticalCode}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-sans leading-tight">
                {team.name}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono-code">
                {team.coordinates.locationName}
              </p>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded text-[11px] font-mono-code font-bold uppercase border ${statusBg}`}>
            {statusLabel}
          </span>
        </div>

        {/* 2-Column Quick Tactical Summary */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#080d16] p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] font-mono-code uppercase text-slate-400 block">
              Comandante de Campo
            </span>
            <span className="text-emerald-400 font-bold text-xs block mt-0.5">
              {team.effectiveLeadership}
            </span>
          </div>

          <div className="bg-[#080d16] p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] font-mono-code uppercase text-slate-400 block">
              Efetivo / Sobreviventes
            </span>
            <span className="text-cyan-400 font-bold text-xs block mt-0.5">
              {team.survivalCount}
            </span>
          </div>
        </div>

        {/* Concise Mission Role */}
        <div className="bg-[#080d16] p-3 rounded-lg border border-slate-800 text-xs">
          <span className="text-[10px] font-mono-code uppercase text-slate-400 block mb-1">
            Missão Tática &amp; Destino
          </span>
          <p className="text-slate-200 leading-relaxed text-[11px]">
            {team.sadoConvergenceRole}
          </p>
        </div>

        {/* Tactical Performance Meters (Visual Bars) */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2.5 font-mono-code text-xs">
          <span className="text-[10px] uppercase text-slate-400 block font-semibold">
            Indicadores de Prontidão Operacional
          </span>

          {/* Meter 1: Resiliência Combativa */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Resiliência Operacional</span>
              <span className="text-white font-bold">{team.metrics.resilience}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  width: `${team.metrics.resilience}%`, 
                  backgroundColor: team.metrics.resilience > 75 ? '#10b981' : '#f59e0b' 
                }}
              />
            </div>
          </div>

          {/* Meter 2: Conexão / Coesão da Tropa */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Coesão da Tropa &amp; Cooperação</span>
              <span className="text-emerald-400 font-bold">{team.metrics.empathy}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${team.metrics.empathy}%` }}
              />
            </div>
          </div>

          {/* Meter 3: Habilidade Técnica */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Proficiência Técnica</span>
              <span className="text-cyan-400 font-bold">{team.metrics.technicalSkill}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                style={{ width: `${team.metrics.technicalSkill}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons to Switch Views */}
      <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-2">
        <button
          id="btn-view-telemetry-details"
          onClick={() => handleAction('telemetry')}
          className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Ver Gráficos</span>
        </button>
        <button
          id="btn-view-3d-space"
          onClick={() => handleAction('3d')}
          className="flex-1 py-2 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Box className="w-3.5 h-3.5 text-emerald-400" />
          <span>Vetor 3D</span>
        </button>
      </div>
    </div>
  );
};
