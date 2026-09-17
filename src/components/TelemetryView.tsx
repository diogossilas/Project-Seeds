import React, { useState } from 'react';
import { ChevronRight, Sparkles, Activity, Radio, BarChart3, Network, GitPullRequest, Grid3X3, Code2, Gauge } from 'lucide-react';
import { TeamData } from '../types';
import { QuintupleTelemetryConsole } from './telemetry/QuintupleTelemetryConsole';
import { TelemetryGauges } from './telemetry/TelemetryGauges';
import { TelemetryTimeSeries2D } from './telemetry/TelemetryTimeSeries2D';
import { TelemetryStateCycles } from './telemetry/TelemetryStateCycles';
import { TelemetryScatter2D } from './telemetry/TelemetryScatter2D';
import { TelemetryDistribution } from './telemetry/TelemetryDistribution';
import { GlobalTelemetrySankey } from './telemetry/GlobalTelemetrySankey';
import { GlobalTelemetryHeatmap } from './telemetry/GlobalTelemetryHeatmap';
import { GlobalTelemetryRadar } from './telemetry/GlobalTelemetryRadar';
import { GlobalTelemetryScatterTrend } from './telemetry/GlobalTelemetryScatterTrend';
import { GlobalTelemetryNetwork } from './telemetry/GlobalTelemetryNetwork';
import { TransversalDiscoveriesPanel } from './telemetry/TransversalDiscoveriesPanel';
import { ArchivistPythonCodeViewer } from './telemetry/ArchivistPythonCodeViewer';
import { audioService } from '../services/audioService';

interface TelemetryViewProps {
  onSelectTeam: (team: TeamData) => void;
  onNavigateTo3D: () => void;
}

type TelemetrySection = 'quintuple' | 'briefing' | 'governance' | 'risk_matrix' | 'local_teams' | 'python_scripts';

export const TelemetryView: React.FC<TelemetryViewProps> = ({ 
  onSelectTeam,
  onNavigateTo3D
}) => {
  const [activeSection, setActiveSection] = useState<TelemetrySection>('quintuple');

  const handleSwitchSection = (section: TelemetrySection) => {
    audioService.playNodeSelect();
    setActiveSection(section);
  };

  const sections = [
    { id: 'quintuple' as const, label: 'Sistema Quíntuplo (U.C.)', shortLabel: 'Quíntuplo', icon: Gauge },
    { id: 'briefing' as const, label: 'Painel Executivo', shortLabel: 'Executivo', icon: BarChart3 },
    { id: 'governance' as const, label: 'Transição & Rede', shortLabel: 'Governança', icon: GitPullRequest },
    { id: 'risk_matrix' as const, label: 'Matriz de Risco', shortLabel: 'Matriz', icon: Grid3X3 },
    { id: 'local_teams' as const, label: 'Séries Temporais', shortLabel: 'Equipes', icon: Activity },
    { id: 'python_scripts' as const, label: 'Código Fonte (Python)', shortLabel: 'Scripts', icon: Code2 },
  ];

  return (
    <div className="space-y-5">
      {/* Executive Command Bar for Telemetry */}
      <div className="bg-[#0d1422] border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-mono-code font-bold uppercase flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                CENTRAL DE ANÁLISE ESTATÍSTICA E GRÁFICOS
              </span>
              <span className="text-xs font-mono-code text-slate-400 hidden sm:inline">
                TELEMETRIA MULTIVARIADA • RELATÓRIO DO ESTADO-MAIOR
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
              Painel Estratégico de Métricas e Comportamento
            </h2>
          </div>

          {/* 4 Instant Visual KPI Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="bg-[#090d16] border border-slate-700/80 rounded-lg p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Sobrevivência Global</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-emerald-400">82.8%</div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                29 / 35 Recrutas
              </div>
            </div>

            <div className="bg-[#090d16] border border-slate-700/80 rounded-lg p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Autonomia x Vida</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-cyan-400">+0.89 Corr</div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-cyan-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Forte Correlação
              </div>
            </div>

            <div className="bg-[#090d16] border border-slate-700/80 rounded-lg p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Ruptura de Tutela</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-rose-400">100%</div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-rose-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Guias Superados
              </div>
            </div>

            <div className="bg-[#090d16] border border-slate-700/80 rounded-lg p-2.5 sm:p-3">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Convergência Tática</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-amber-400">Total</div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Pólo Sado Operando
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`telemetry-tab-${sec.id}`}
                  onClick={() => handleSwitchSection(sec.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-slate-700 text-white font-bold border-cyan-400 shadow-sm'
                      : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="hidden sm:inline">{sec.label}</span>
                  <span className="sm:hidden">{sec.shortLabel}</span>
                </button>
              );
            })}
          </div>

          <button
            id="open-3d-from-telemetry"
            onClick={onNavigateTo3D}
            className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Ver no Espaço 3D</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SECTION 0: SISTEMA QUÍNTUPLO DE TELEMETRIA (MANUAL GEOTACTICAL U.C.) */}
      {activeSection === 'quintuple' && (
        <div className="space-y-5 animate-fade-in">
          <QuintupleTelemetryConsole />
        </div>
      )}

      {/* SECTION 1: PAINEL EXECUTIVO (BRIEFING ESTRATÉGICO) */}
      {activeSection === 'briefing' && (
        <div className="space-y-5 animate-fade-in">
          {/* As 4 Descobertas Críticas */}
          <TransversalDiscoveriesPanel />

          {/* Gráfico de Radar Adaptativo & Linha de Tendência */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-6">
              <GlobalTelemetryRadar />
            </div>
            <div className="lg:col-span-6">
              <GlobalTelemetryScatterTrend />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TRANSIÇÃO DE COMANDO & REDE DE CONECTIVIDADE */}
      {activeSection === 'governance' && (
        <div className="space-y-5 animate-fade-in">
          <GlobalTelemetrySankey />
          <GlobalTelemetryNetwork />
        </div>
      )}

      {/* SECTION 3: MATRIZ MULTIVARIADA DE VULNERABILIDADE */}
      {activeSection === 'risk_matrix' && (
        <div className="space-y-5 animate-fade-in">
          <GlobalTelemetryHeatmap />
        </div>
      )}

      {/* SECTION 4: TELEMETRIA LOCAL DAS EQUIPES (2D) */}
      {activeSection === 'local_teams' && (
        <div className="space-y-5 animate-fade-in">
          {/* 1. Instantaneous Gauges Sub-Module */}
          <TelemetryGauges />

          {/* 2. Time-Series 2D & Discrete State Cycles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8">
              <TelemetryTimeSeries2D />
            </div>
            <div className="lg:col-span-4">
              <TelemetryStateCycles />
            </div>
          </div>

          {/* 3. Multivariable 2D Scatter & Survival Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7">
              <TelemetryScatter2D onSelectTeam={onSelectTeam} />
            </div>
            <div className="lg:col-span-5">
              <TelemetryDistribution />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: CÓDIGO FONTE PYTHON */}
      {activeSection === 'python_scripts' && (
        <div className="space-y-5 animate-fade-in">
          <ArchivistPythonCodeViewer />
        </div>
      )}
    </div>
  );
};
