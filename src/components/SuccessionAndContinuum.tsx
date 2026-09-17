import React, { useState } from 'react';
import { 
  GitBranch, 
  ArrowRight, 
  ShieldAlert, 
  HeartHandshake, 
  Skull, 
  Sparkles, 
  Compass, 
  FileText,
  Mail,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Radio
} from 'lucide-react';
import { 
  CONTINUUM_PHASES, 
  SUCCESSION_STAGES, 
  METADATA_ARCHIVE 
} from '../data/sevenSeedsData';

export const SuccessionAndContinuum: React.FC = () => {
  const [activePhaseIdx, setActivePhaseIdx] = useState(4); // default on Phase 5 (Nova Humanidade)
  const [showFullEpilogue, setShowFullEpilogue] = useState(true);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono-code font-semibold">
                SEÇÃO I &amp; III • HISTORIOGRAFIA CRÍTICA
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                DO BIOPODER À EMANCIPAÇÃO BIOCÊNTRICA
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mt-1">
              A Arquitetura Narrativa &amp; Análise de Cadeia Sucessória
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              A trajetória de <span className="italic">7 Seeds</span> documenta o colapso da engenharia de controle absoluto do antigo Estado japonês 
              e o nascimento de uma ordem comunitária sustentável, simbolizada pela vitória da semente sobre a máquina.
            </p>
          </div>
        </div>
      </div>

      {/* SEÇÃO III: DIAGRAMA TRIÁDICO DE CADEIA SUCESSÓRIA */}
      <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
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

        {/* 3 Step Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {SUCCESSION_STAGES.map((stage, idx) => (
            <div
              key={stage.stage}
              className="bg-slate-900/80 border rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-600 transition-all"
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
                <div className="text-xs font-mono-code text-slate-400 mb-3" style={{ color: stage.color }}>
                  {stage.subhead}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 mb-3">
                  {stage.description}
                </p>

                <div className="text-[11px] text-slate-400 font-mono-code border-t border-slate-800 pt-2.5">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Atores Principais:</span>
                  <span className="text-slate-200">{stage.actors}</span>
                </div>
              </div>

              {idx < 2 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 items-center justify-center text-slate-300 shadow-md">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 3 Pillars In-Depth Text Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <h5 className="font-bold text-rose-400 font-display text-sm mb-1.5 flex items-center gap-1.5">
              <Skull className="w-4 h-4 text-rose-400" />
              1. A Queda da Tutela Adulta
            </h5>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Os guias nomeados pelo governo foram sumariamente eliminados pela natureza hostil (como Kumai no Inverno e Yanagi na Primavera), 
              caíram em delírio de grandeza (como Ryoya no Outono) ou perderam o controle moral sobre seus tutelados (como Unami no Verão A). 
              O cordão umbilical com a República do Japão do século XXI precisou ser rompido com sangue.
            </p>
          </div>

          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <h5 className="font-bold text-amber-400 font-display text-sm mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              2. A Desconstrução da Eficiência Fria
            </h5>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              A Equipe Verão A, concebida para liderar a reconstrução por meio da superioridade eugênica, fracassou no instante do contato humano. 
              A sucessão de Ango foi marcada pela falência de seu narcisismo patológico. Sua liderança só se tornou legítima no momento em que aceitou 
              descer ao nível dos "fracos", atuando não mais como um mestre imposto, mas como um companheiro de sacrifício.
            </p>
          </div>

          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <h5 className="font-bold text-emerald-400 font-display text-sm mb-1.5 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              3. A Vitória da Resiliência Marginal
            </h5>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              A ascensão de Natsu Iwashimizu e Hana Sugurono à condição de referências morais do novo mundo sela a virada filosófica da narrativa. 
              Natsu, a jovem que a sociedade anterior descartara como disfuncional por sua fobia social, tornou-se o olho clínico capaz de ler os humores 
              da biosfera e conter os acessos autodestrutivos de guerreiros treinados.
            </p>
          </div>
        </div>
      </div>

      {/* SEÇÃO I: AS CINCO FASES DO CONTINUUM (INTERATIVO) */}
      <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-2 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono-code uppercase text-emerald-400 font-semibold">
              SEÇÃO I • ARQUITETURA HISTORIOGRÁFICA
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-0.5">
              As Cinco Fases do Continuum Narrativo
            </h3>
          </div>
          <span className="text-xs font-mono-code text-slate-500">
            ENGRENAGEM DE DESCONSTRUÇÃO
          </span>
        </div>

        {/* Phase selector tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {CONTINUUM_PHASES.map((p, idx) => (
            <button
              key={p.phaseNumber}
              id={`phase-tab-${p.phaseNumber}`}
              onClick={() => setActivePhaseIdx(idx)}
              className={`p-3 rounded-xl text-left border transition-all ${
                activePhaseIdx === idx
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-white shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] font-mono-code uppercase font-bold text-emerald-400">
                {p.romanId}
              </div>
              <div className="text-xs font-bold font-display truncate mt-0.5">
                {p.title}
              </div>
              <div className="text-[9px] font-mono-code text-slate-500 truncate mt-1">
                {p.status}
              </div>
            </button>
          ))}
        </div>

        {/* Active Phase In-Depth Box */}
        {(() => {
          const currentPhase = CONTINUUM_PHASES[activePhaseIdx];
          return (
            <div className="bg-[#080d16] border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-mono-code font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      {currentPhase.romanId}
                    </span>
                    <h4 className="text-2xl font-bold font-display text-white">
                      {currentPhase.title}
                    </h4>
                  </div>
                  <div className="text-xs text-slate-400 font-mono-code mt-1">
                    {currentPhase.subtitle} • <span className="text-cyan-400">{currentPhase.timeframe}</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 self-start md:self-auto">
                  STATUS: {currentPhase.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono-code uppercase text-slate-400 block mb-1">
                    Síntese da Fase
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    {currentPhase.description}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono-code uppercase text-emerald-400 block mb-2">
                    Eventos Chave Documentados
                  </span>
                  <div className="space-y-2">
                    {currentPhase.events.map((evt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{evt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono-code">
                  <span className="text-slate-400">Virada Histórica:</span>
                  <span className="text-amber-300 font-semibold">{currentPhase.historicalShift}</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SEÇÃO IV: EPÍLOGO HISTORIOGRÁFICO: O FECHAMENTO DO CICLO */}
      <div className="bg-gradient-to-br from-[#0e1726] via-[#090d16] to-[#0d1f1c] border border-emerald-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-500/20">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold font-display text-white">
              IV. Epílogo Historiográfico: O Fechamento do Ciclo
            </h3>
          </div>
          <span className="text-xs font-mono-code text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            A GARRAFA TRANSOCEÂNICA
          </span>
        </div>

        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            A arquitetura narrativa de <span className="italic text-white font-medium">7 Seeds</span> atinge sua resolução quando a 
            <strong className="text-cyan-300 font-semibold"> garrafa contendo mensagens transoceânicas</strong> aporta no litoral do Japão unificado, 
            atestando a sobrevivência de assentamentos correlatos nas Américas.
          </p>

          <blockquote className="p-4 rounded-xl bg-slate-900/80 border-l-4 border-emerald-500 text-slate-200 text-xs sm:text-sm font-mono-code leading-relaxed">
            "O Projeto 7 Seeds não cumpriu as diretrizes pretendidas por seus arquitetos burocratas: ele não preservou o Estado-nação, 
            não restabeleceu o capitalismo urbano e não coroou a eugenia darwinista. Ao contrário, serviu como o casulo violento através do qual 
            a humanidade se despiu de suas ilusões de supremacia sobre a natureza, renascendo como uma espécie comunitária, atenta aos ciclos da terra 
            e unida por escolhas afetivas livres. <br/><br/>
            <span className="text-emerald-400 font-bold uppercase tracking-wider">
              O continuum registra assim a vitória da semente sobre a máquina.
            </span>"
          </blockquote>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-slate-400">
            <span>Compilador Oficial: {METADATA_ARCHIVE.compiler}</span>
            <span className="text-emerald-400 font-semibold">{METADATA_ARCHIVE.classification}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
