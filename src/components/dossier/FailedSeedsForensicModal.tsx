import React, { useState } from 'react';
import { 
  Skull, 
  AlertTriangle, 
  Mountain, 
  Waves, 
  UtensilsCrossed, 
  Brain, 
  BarChart3, 
  X, 
  ShieldAlert, 
  ChevronRight, 
  FileSearch,
  Activity,
  Biohazard,
  Flame,
  Globe2,
  Sparkles,
  Info
} from 'lucide-react';
import { FAILED_SEEDS_FORENSICS } from '../../data/failedSeedsForensicsData';
import { FailedSeedInvestigation } from '../../types/forensics';
import { audioService } from '../../services/audioService';

interface FailedSeedsForensicModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSeedId?: string | null;
}

export const FailedSeedsForensicModal: React.FC<FailedSeedsForensicModalProps> = ({
  isOpen,
  onClose,
  initialSeedId
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialSeedId || FAILED_SEEDS_FORENSICS[0].id);
  const [activeTab, setActiveTab] = useState<'overview' | 'geography' | 'marine' | 'food' | 'psychology' | 'probabilities'>('overview');

  if (!isOpen) return null;

  const currentInvestigation: FailedSeedInvestigation = 
    FAILED_SEEDS_FORENSICS.find((f) => f.id === selectedId || f.teamId === selectedId) || FAILED_SEEDS_FORENSICS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#040915] border border-rose-500/40 rounded-xl shadow-[0_0_50px_rgba(244,63,94,0.25)] flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#071022] border-b border-rose-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-500/50 flex items-center justify-center text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]">
              <Skull className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold font-mono-code text-rose-400 uppercase tracking-wider">
                  RELATÓRIO FORENSE DE FALÊNCIA &amp; NÃO-SOBREVIVÊNCIA
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono-code bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded font-bold">
                  AKÁSHICO CLASSE ÔMEGA
                </span>
              </div>
              <p className="text-[11px] font-mono-code text-slate-400">
                Diagnóstico Causal por Fatores de Geografia, Mar, Inanição, Eugenia &amp; Probabilidade Baseada em Dados
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioService.playNodeSelect();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white bg-[#0a1832] hover:bg-[#122852] border border-[#1e293b] rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Investigation Unit Selector Bar */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2 bg-[#020612] border-b border-[#0d223a] overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono-code text-slate-400 uppercase mr-1 shrink-0">Unidades Analisadas:</span>
          {FAILED_SEEDS_FORENSICS.map((item) => {
            const isSelected = item.id === currentInvestigation.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  audioService.playNodeSelect();
                  setSelectedId(item.id);
                }}
                className={`px-3 py-1.5 text-xs font-mono-code rounded transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-rose-950/80 text-rose-200 border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)] font-bold'
                    : 'bg-[#050e1f] text-slate-400 hover:text-slate-200 border-[#0e2a4a]'
                }`}
              >
                <Skull className={`w-3 h-3 ${isSelected ? 'text-rose-400' : 'text-slate-500'}`} />
                <span>{item.name.split('(')[0].trim()}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                  item.survivalRate === 0 ? 'bg-rose-900/60 text-rose-300' : 'bg-amber-900/60 text-amber-300'
                }`}>
                  {item.survivalRate}% Sobrev.
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Main Body Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#030916]">
          
          {/* Main Dossier Summary Card */}
          <div className="bg-[#050f24] border border-rose-900/50 rounded-xl p-4 sm:p-5 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-mono-code font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded">
                    {currentInvestigation.status}
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">
                    Região: <strong className="text-slate-200">{currentInvestigation.region}</strong>
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-sans text-white mt-1">
                  {currentInvestigation.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {currentInvestigation.summary}
                </p>
              </div>

              {/* Key Vital Metrics */}
              <div className="grid grid-cols-2 gap-2 shrink-0 bg-[#020713] p-3 rounded-lg border border-[#0d2a4a] text-xs font-mono-code">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">População Inicial</span>
                  <p className="text-sm font-bold text-slate-100">{currentInvestigation.totalPopulation} indivíduos</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Sobreviventes Finais</span>
                  <p className="text-sm font-bold text-rose-400">{currentInvestigation.survivorsCount} confirmados</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Causa Primária</span>
                  <p className="text-[11px] font-bold text-amber-300 truncate">{currentInvestigation.primaryCauseCategory}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Período de Queda</span>
                  <p className="text-[11px] font-bold text-cyan-300 truncate">{currentInvestigation.estimatedTimeOfDeath}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Forensic Cause Tabs */}
          <div className="flex items-center gap-1 border-b border-[#0d2847] pb-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs font-mono-code rounded-t transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#0a1e3f] text-cyan-200 border-b-2 border-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Matriz de Probabilidade Causal</span>
            </button>
            <button
              onClick={() => setActiveTab('geography')}
              className={`px-3 py-1.5 text-xs font-mono-code rounded-t transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'geography' ? 'bg-[#0a1e3f] text-amber-200 border-b-2 border-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              <span>1. Geografia &amp; Tectônica</span>
            </button>
            <button
              onClick={() => setActiveTab('marine')}
              className={`px-3 py-1.5 text-xs font-mono-code rounded-t transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'marine' ? 'bg-[#0a1e3f] text-sky-200 border-b-2 border-sky-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-sky-400" />
              <span>2. Mar &amp; Hidrodinâmica (+80m)</span>
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-3 py-1.5 text-xs font-mono-code rounded-t transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'food' ? 'bg-[#0a1e3f] text-emerald-200 border-b-2 border-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-400" />
              <span>3. Alimentos &amp; Colapso Trófico</span>
            </button>
            <button
              onClick={() => setActiveTab('psychology')}
              className={`px-3 py-1.5 text-xs font-mono-code rounded-t transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'psychology' ? 'bg-[#0a1e3f] text-rose-200 border-b-2 border-rose-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-rose-400" />
              <span>4. Eugenia &amp; Ruptura Mental</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW & PROBABILITY BARS */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Calculated Probabilities Bar Chart */}
              <div className="md:col-span-7 bg-[#020713] border border-[#0d2a4a] rounded-xl p-4 space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#0d2847] pb-2">
                  <span className="text-xs font-mono-code font-bold text-white uppercase flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-rose-400" />
                    Probabilidades de Causa de Morte (%) Baseadas em Dados
                  </span>
                  <span className="text-[10px] font-mono-code text-cyan-400">MODELO FORENSE AKÁSHICO</span>
                </div>

                {/* Bar 1: Geography & Tectonics */}
                <div>
                  <div className="flex justify-between text-xs font-mono-code text-slate-300 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Mountain className="w-3.5 h-3.5 text-amber-400" />
                      Vulnerabilidade Geográfica &amp; Megassismos
                    </span>
                    <strong className="text-amber-300">{currentInvestigation.probabilityFactors.geographyTectonicsPct}%</strong>
                  </div>
                  <div className="w-full bg-[#051126] h-2.5 rounded-full overflow-hidden border border-[#0e2a4a]">
                    <div 
                      className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${currentInvestigation.probabilityFactors.geographyTectonicsPct}%` }}
                    />
                  </div>
                </div>

                {/* Bar 2: Marine Hydrodynamics */}
                <div>
                  <div className="flex justify-between text-xs font-mono-code text-slate-300 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Waves className="w-3.5 h-3.5 text-sky-400" />
                      Elevação do Mar (+80m) &amp; Infiltração Salina
                    </span>
                    <strong className="text-sky-300">{currentInvestigation.probabilityFactors.marineHydrodynamicsPct}%</strong>
                  </div>
                  <div className="w-full bg-[#051126] h-2.5 rounded-full overflow-hidden border border-[#0e2a4a]">
                    <div 
                      className="bg-gradient-to-r from-sky-600 to-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${currentInvestigation.probabilityFactors.marineHydrodynamicsPct}%` }}
                    />
                  </div>
                </div>

                {/* Bar 3: Food & Trophic Collapse */}
                <div>
                  <div className="flex justify-between text-xs font-mono-code text-slate-300 mb-1">
                    <span className="flex items-center gap-1.5">
                      <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-400" />
                      Inanição Calórica &amp; Colapso Hidropônico
                    </span>
                    <strong className="text-emerald-300">{currentInvestigation.probabilityFactors.foodTrophicCollapsePct}%</strong>
                  </div>
                  <div className="w-full bg-[#051126] h-2.5 rounded-full overflow-hidden border border-[#0e2a4a]">
                    <div 
                      className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${currentInvestigation.probabilityFactors.foodTrophicCollapsePct}%` }}
                    />
                  </div>
                </div>

                {/* Bar 4: Psychological & Societal */}
                <div>
                  <div className="flex justify-between text-xs font-mono-code text-slate-300 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-rose-400" />
                      Histeria Coletiva, Eugenia &amp; Eutanásia
                    </span>
                    <strong className="text-rose-300">{currentInvestigation.probabilityFactors.psychologicalSocietalPct}%</strong>
                  </div>
                  <div className="w-full bg-[#051126] h-2.5 rounded-full overflow-hidden border border-[#0e2a4a]">
                    <div 
                      className="bg-gradient-to-r from-rose-600 to-rose-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${currentInvestigation.probabilityFactors.psychologicalSocietalPct}%` }}
                    />
                  </div>
                </div>

                {/* Bar 5: Autonomous AI Failure */}
                <div>
                  <div className="flex justify-between text-xs font-mono-code text-slate-300 mb-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                      Falência de IA / Bloqueio Mecânico de Eclusas
                    </span>
                    <strong className="text-purple-300">{currentInvestigation.probabilityFactors.aiAutonomousFailurePct}%</strong>
                  </div>
                  <div className="w-full bg-[#051126] h-2.5 rounded-full overflow-hidden border border-[#0e2a4a]">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-purple-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${currentInvestigation.probabilityFactors.aiAutonomousFailurePct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Forensic Hypothesis & Empirical Data Points */}
              <div className="md:col-span-5 bg-[#020713] border border-[#0d2a4a] rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-xs font-mono-code font-bold text-amber-300 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Hipótese Forense Akáshica
                  </span>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mt-2 p-3 bg-[#040e22] rounded-lg border border-[#0d2847]">
                    "{currentInvestigation.forensicHypothesis}"
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-mono-code text-cyan-300 uppercase font-bold block mb-1.5">
                    Pontos de Telemetria Forense:
                  </span>
                  <div className="space-y-1.5">
                    {currentInvestigation.speculativeDataPoints.map((dp, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] font-mono-code bg-[#051126] px-2.5 py-1 rounded border border-[#0e2a4a]">
                        <span className="text-slate-400">{dp.label}:</span>
                        <strong className="text-cyan-300">{dp.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GEOGRAPHY & TECTONICS */}
          {activeTab === 'geography' && (
            <div className="bg-[#020713] border border-amber-900/50 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-bold font-mono-code">
                <Mountain className="w-5 h-5 text-amber-400" />
                <h4 className="text-base">{currentInvestigation.geographicalCauses.title}</h4>
              </div>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {currentInvestigation.geographicalCauses.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#0e2a4a] text-xs font-mono-code">
                <div className="bg-[#040e22] p-3 rounded border border-amber-950">
                  <span className="text-slate-400 uppercase text-[10px]">Fator de Impacto Tectônico</span>
                  <p className="text-amber-400 font-bold text-sm">{currentInvestigation.geographicalCauses.impactFactor}</p>
                </div>
                <div className="bg-[#040e22] p-3 rounded border border-amber-950">
                  <span className="text-slate-400 uppercase text-[10px]">Notas Litológicas</span>
                  <p className="text-slate-200">{currentInvestigation.geographicalCauses.geologicalNotes}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MARINE HYDRODYNAMICS */}
          {activeTab === 'marine' && (
            <div className="bg-[#020713] border border-sky-900/50 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-sky-300 font-bold font-mono-code">
                <Waves className="w-5 h-5 text-sky-400" />
                <h4 className="text-base">{currentInvestigation.marineCauses.title}</h4>
              </div>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {currentInvestigation.marineCauses.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#0e2a4a] text-xs font-mono-code">
                <div className="bg-[#040e22] p-3 rounded border border-sky-950">
                  <span className="text-slate-400 uppercase text-[10px]">Fator Hidrológico</span>
                  <p className="text-sky-400 font-bold text-sm">{currentInvestigation.marineCauses.impactFactor}</p>
                </div>
                <div className="bg-[#040e22] p-3 rounded border border-sky-950">
                  <span className="text-slate-400 uppercase text-[10px]">Notas de Dinâmica Costeira</span>
                  <p className="text-slate-200">{currentInvestigation.marineCauses.hydrologicalNotes}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FOOD & TROPHIC COLLAPSE */}
          {activeTab === 'food' && (
            <div className="bg-[#020713] border border-emerald-900/50 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-emerald-300 font-bold font-mono-code">
                <UtensilsCrossed className="w-5 h-5 text-emerald-400" />
                <h4 className="text-base">{currentInvestigation.foodAndTrophicCauses.title}</h4>
              </div>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {currentInvestigation.foodAndTrophicCauses.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#0e2a4a] text-xs font-mono-code">
                <div className="bg-[#040e22] p-3 rounded border border-emerald-950">
                  <span className="text-slate-400 uppercase text-[10px]">Severidade de Inanição</span>
                  <p className="text-emerald-400 font-bold text-sm">{currentInvestigation.foodAndTrophicCauses.impactFactor}</p>
                </div>
                <div className="bg-[#040e22] p-3 rounded border border-emerald-950">
                  <span className="text-slate-400 uppercase text-[10px]">Dinâmica de Cadeia Trófica</span>
                  <p className="text-slate-200">{currentInvestigation.foodAndTrophicCauses.trophicNotes}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PSYCHOLOGY & EUGENICS */}
          {activeTab === 'psychology' && (
            <div className="bg-[#020713] border border-rose-900/50 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-rose-300 font-bold font-mono-code">
                <Brain className="w-5 h-5 text-rose-400" />
                <h4 className="text-base">{currentInvestigation.psychologicalCauses.title}</h4>
              </div>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {currentInvestigation.psychologicalCauses.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#0e2a4a] text-xs font-mono-code">
                <div className="bg-[#040e22] p-3 rounded border border-rose-950">
                  <span className="text-slate-400 uppercase text-[10px]">Fator Psicológico / Eugênico</span>
                  <p className="text-rose-400 font-bold text-sm">{currentInvestigation.psychologicalCauses.impactFactor}</p>
                </div>
                <div className="bg-[#040e22] p-3 rounded border border-rose-950">
                  <span className="text-slate-400 uppercase text-[10px]">Diagnóstico Psiquiátrico Forense</span>
                  <p className="text-slate-200">{currentInvestigation.psychologicalCauses.psychNotes}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Footer Actions */}
        <div className="px-4 sm:px-6 py-3 bg-[#020713] border-t border-[#0d223a] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
          <div className="text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Este relatório consolida especulações e probabilidades balizadas nos registros canônicos dos 35 volumes de 7 Seeds.</span>
          </div>
          <button
            onClick={() => {
              audioService.playNodeSelect();
              onClose();
            }}
            className="px-4 py-1.5 bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-500 rounded font-bold cursor-pointer transition-colors"
          >
            Fechar Relatório Forense
          </button>
        </div>

      </div>
    </div>
  );
};
