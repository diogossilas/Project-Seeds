import React, { useState } from 'react';
import { 
  GitBranch, 
  Cpu, 
  Sprout, 
  Users, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  BarChart3, 
  Radio, 
  FileText,
  AlertTriangle,
  Flame,
  Award
} from 'lucide-react';
import { UNIVERSAL_ECOLOGICAL_LAWS } from '../../data/globalSeedsData';
import { CONTINUUM_PHASES, SUCCESSION_STAGES } from '../../data/sevenSeedsData';
import { audioService } from '../../services/audioService';

export const GlobalSystemicPatterns: React.FC = () => {
  const [activeLawIdx, setActiveLawIdx] = useState(0);
  const [activePhaseIdx, setActivePhaseIdx] = useState(4); // Phase 5
  const [subTab, setSubTab] = useState<'universal_laws' | 'succession_continuum'>('universal_laws');

  const currentLaw = UNIVERSAL_ECOLOGICAL_LAWS[activeLawIdx];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#030914] border border-[#0e2a4a] rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono-code font-bold uppercase">
                SEÇÃO III • ANÁLISE SISTÊMICA DOS PADRÕES GLOBAIS
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                PROJEÇÃO DE ALTA PROBABILIDADE CAUSAL
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
              As Três Leis Universais da Ecologia &amp; Sociologia Pós-Impacto
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl">
              A leitura transversal das matrizes planetárias confirma os três postulados fundamentais: a falência compulsória
              da inteligência artificial autônoma, a vitória inquestionável dos saberes tradicionais e a descentralização tribal
              como único modelo sustentável de convivência humana.
            </p>
          </div>

          {/* Sub-tab switcher */}
          <div className="flex items-center gap-1.5 bg-[#020610] p-1 rounded-xl border border-[#0d223a] shrink-0 self-start sm:self-auto">
            <button
              onClick={() => {
                audioService.playNodeSelect();
                setSubTab('universal_laws');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                subTab === 'universal_laws'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>3 LEIS UNIVERSAIS</span>
            </button>
            <button
              onClick={() => {
                audioService.playNodeSelect();
                setSubTab('succession_continuum');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                subTab === 'succession_continuum'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>CADEIA SUCESSÓRIA &amp; CONTINUUM</span>
            </button>
          </div>
        </div>
      </div>

      {subTab === 'universal_laws' ? (
        /* 3 UNIVERSAL LAWS MODULE */
        <div className="space-y-6">
          {/* Law Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {UNIVERSAL_ECOLOGICAL_LAWS.map((law, idx) => {
              const isSelected = activeLawIdx === idx;
              const Icon = idx === 0 ? Cpu : idx === 1 ? Sprout : Users;
              const iconColor = idx === 0 ? 'text-rose-400' : idx === 1 ? 'text-emerald-400' : 'text-amber-400';

              return (
                <button
                  key={law.number}
                  onClick={() => {
                    audioService.playNodeSelect();
                    setActiveLawIdx(idx);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#061426] border-emerald-500/60 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/30'
                      : 'bg-[#040d1a] border-[#0e2a4a] hover:border-[#0e2a4a] hover:bg-[#071830]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono-code uppercase font-bold text-slate-400">
                      LEI UNIVERSAL 0{law.number}
                    </span>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                  </div>
                  <div className="font-bold text-sm text-white font-display mb-1">
                    {law.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2">
                    {law.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Law Deep Dive Box */}
          <div className="bg-[#030a17] border border-[#0e2a4a] rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#0e2a4a]">
              <div>
                <span className="text-xs font-mono-code text-emerald-400 font-bold uppercase">
                  POSTULADO TRANSVERSAL • LEI 0{currentLaw.number}
                </span>
                <h3 className="text-2xl font-bold font-display text-white mt-0.5">
                  {currentLaw.title}
                </h3>
                <p className="text-xs font-mono-code text-slate-400 mt-1">
                  {currentLaw.subtitle}
                </p>
              </div>

              {/* Metric Indicator Pill */}
              <div className="bg-[#020610] border border-[#0e2a4a] rounded-xl p-3 flex items-center gap-4 shrink-0">
                <div>
                  <div className="text-[10px] font-mono-code text-slate-400 uppercase">
                    {currentLaw.metricComparison.labelA}
                  </div>
                  <div className="text-lg font-bold font-mono-code text-rose-400">
                    {currentLaw.metricComparison.valueA}%
                  </div>
                </div>
                <div className="w-px h-8 bg-slate-700" />
                <div>
                  <div className="text-[10px] font-mono-code text-slate-400 uppercase">
                    {currentLaw.metricComparison.labelB}
                  </div>
                  <div className="text-lg font-bold font-mono-code text-emerald-400">
                    {currentLaw.metricComparison.valueB}%
                  </div>
                </div>
              </div>
            </div>

            {/* Central Thesis */}
            <div className="bg-slate-900/80 border border-[#0d223a] rounded-xl p-4 sm:p-5">
              <div className="text-xs font-mono-code text-cyan-400 uppercase font-bold mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>TESE FUNDAMENTAL DA ANÁLISE SISTÊMICA</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                {currentLaw.thesis}
              </p>
            </div>

            {/* Case Studies Grid */}
            <div className="space-y-3">
              <div className="text-xs font-mono-code text-slate-400 uppercase font-bold tracking-wider">
                EVIDÊNCIAS DE CAMPO EM MÚLTIPLOS CONTINENTES
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {currentLaw.keyCases.map((cs, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#020610] border border-[#0e2a4a] rounded-xl p-4 space-y-2 hover:border-[#0e2a4a] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-bold font-mono-code text-white">
                        {cs.location}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-400">Ocorrência:</strong> {cs.caseStudy}
                    </p>
                    <div className="pt-1 text-xs text-emerald-300 font-sans border-t border-[#0e2a4a]/80">
                      <strong className="text-emerald-400 font-mono-code">Resolução:</strong> {cs.outcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophical Axiom */}
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
              <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono-code text-emerald-400 font-bold uppercase block mb-1">
                  AXIOMA CONCLUSIVO DE METATRON
                </span>
                <p className="text-xs sm:text-sm text-emerald-100/90 italic leading-relaxed">
                  "{currentLaw.philosophicalConclusion}"
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SUCCESSION STAGES & CONTINUUM MODULE */
        <div className="space-y-6">
          {/* 3 Step Flow Diagram */}
          <div className="bg-[#030914] border border-[#0e2a4a] rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#0e2a4a]">
              <div>
                <span className="text-xs font-mono-code uppercase text-cyan-400 font-semibold">
                  ANÁLISE DE CADEIA SUCESSÓRIA
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-0.5">
                  Os Três Estágios da Transição de Autoridade
                </h3>
              </div>
              <span className="text-xs font-mono-code text-slate-500 hidden sm:block">
                DINÂMICA DE PODER
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SUCCESSION_STAGES.map((stage) => (
                <div
                  key={stage.stage}
                  className="bg-slate-900/80 border rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden"
                  style={{ borderColor: `${stage.color}40` }}
                >
                  <div 
                    className="absolute top-0 left-0 right-0 h-1.5" 
                    style={{ backgroundColor: stage.color }} 
                  />

                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                      <span className="font-bold text-slate-400 uppercase">ESTÁGIO 0{stage.stage}</span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{ backgroundColor: `${stage.color}20`, color: stage.color }}
                      >
                        {stage.archetype.split('/')[0]}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold font-display text-white mb-1">
                      {stage.name}
                    </h4>
                    <div className="text-xs font-mono-code mb-3" style={{ color: stage.color }}>
                      {stage.subhead}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-[#0e2a4a]/80 mb-3">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#0e2a4a]/80 text-[11px] font-mono-code text-slate-400">
                    <span className="text-slate-500">Agentes:</span> {stage.actors}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continuum Timeline */}
          <div className="bg-[#030914] border border-[#0e2a4a] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#0e2a4a]">
              <div>
                <span className="text-xs font-mono-code text-emerald-400 uppercase font-semibold">
                  HISTORIOGRAFIA EM CINCO ATOS
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-0.5">
                  Continuum Histórico: Da Tutela Estatal à Ordem Biocêntrica
                </h3>
              </div>
            </div>

            {/* Timeline Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {CONTINUUM_PHASES.map((phase, idx) => {
                const isSelected = activePhaseIdx === idx;
                return (
                  <button
                    key={phase.phaseNumber}
                    onClick={() => {
                      audioService.playNodeSelect();
                      setActivePhaseIdx(idx);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                        : 'bg-[#020610] border-[#0e2a4a] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-mono-code uppercase text-emerald-400">
                      FASE {phase.romanId}
                    </div>
                    <div className="text-xs font-semibold truncate mt-1">
                      {phase.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Phase Detail */}
            {CONTINUUM_PHASES[activePhaseIdx] && (
              <div className="bg-[#020610] border border-[#0e2a4a] rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono-code text-slate-400">
                      FASE {CONTINUUM_PHASES[activePhaseIdx].romanId} • {CONTINUUM_PHASES[activePhaseIdx].timeframe}
                    </span>
                    <h4 className="text-lg font-bold font-display text-white mt-0.5">
                      {CONTINUUM_PHASES[activePhaseIdx].title} — {CONTINUUM_PHASES[activePhaseIdx].subtitle}
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono-code font-bold">
                    {CONTINUUM_PHASES[activePhaseIdx].status}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {CONTINUUM_PHASES[activePhaseIdx].description}
                </p>

                <div className="pt-2 border-t border-[#0e2a4a]/80">
                  <span className="text-xs font-mono-code text-cyan-400 font-bold block mb-1.5">
                    EVENTOS CHAVE DESTE PERÍODO:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {CONTINUUM_PHASES[activePhaseIdx].events.map((ev, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
