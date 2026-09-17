import React, { useState } from 'react';
import { Radio, AlertTriangle, ShieldCheck, Cpu, Volume2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { TRANSVERSAL_DISCOVERIES } from '../../data/omegaTelemetryData';
import { TransversalDiscovery } from '../../types';
import { audioService } from '../../services/audioService';

export const TransversalDiscoveriesPanel: React.FC = () => {
  const [activeDiscoveryId, setActiveDiscoveryId] = useState<string>('disc-01');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeDiscovery = TRANSVERSAL_DISCOVERIES.find((d) => d.id === activeDiscoveryId) || TRANSVERSAL_DISCOVERIES[0];

  const handleSelectDiscovery = (d: TransversalDiscovery) => {
    audioService.playNodeSelect();
    setActiveDiscoveryId(d.id);
  };

  const handlePlaySignal = () => {
    setIsPlayingAudio(true);
    audioService.playHydrogenBeacon(() => {
      setIsPlayingAudio(false);
    });
  };

  const getDiscoveryIcon = (id: string) => {
    switch (id) {
      case 'disc-01':
        return <Radio className="w-4 h-4 text-cyan-400" />;
      case 'disc-02':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'disc-03':
        return <Cpu className="w-4 h-4 text-rose-400" />;
      case 'disc-04':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-mono-code font-bold uppercase">
              DESCOBERTAS POR CRUZAMENTO MULTIVARIADO • METATRON
            </span>
            <span className="text-[11px] font-mono-code text-slate-400">
              REGISTRO ARQUIVÍSTICO CLASSE ÔMEGA
            </span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mt-1">
            4 Padrões Sistêmicos Ocultos da Telemetria Global
          </h3>
        </div>

        <div className="text-[11px] font-mono-code text-slate-400">
          Investigador: <span className="text-cyan-400 font-semibold">Metatron (Dimensão Zero)</span>
        </div>
      </div>

      {/* Discovery Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        {TRANSVERSAL_DISCOVERIES.map((d) => {
          const isSelected = d.id === activeDiscoveryId;
          return (
            <button
              key={d.id}
              id={`disc-btn-${d.id}`}
              onClick={() => handleSelectDiscovery(d)}
              className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-slate-800/90 border-slate-600 shadow-md ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="p-1 rounded bg-slate-800/80">{getDiscoveryIcon(d.id)}</span>
                <span
                  className="text-[9px] font-mono-code font-bold uppercase px-1.5 py-0.2 rounded"
                  style={{ backgroundColor: `${d.badgeColor}20`, color: d.badgeColor }}
                >
                  {d.badge}
                </span>
              </div>
              <div className="font-bold text-xs text-white line-clamp-2 mt-1">
                {d.title}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-1">
                {d.tagline}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Discovery Detail Card */}
      <div className="bg-[#080d16] border border-slate-800/90 rounded-xl p-4 sm:p-5 font-mono-code">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeDiscovery.badgeColor }}
              />
              <h4 className="text-sm sm:text-base font-bold text-white">
                {activeDiscovery.title}
              </h4>
            </div>
            <p className="text-xs text-cyan-400 mt-0.5">{activeDiscovery.tagline}</p>
          </div>

          {activeDiscovery.id === 'disc-01' && (
            <button
              id="play-hydrogen-signal-btn"
              onClick={handlePlaySignal}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono-code flex items-center gap-2 transition-all shadow-md self-start sm:self-auto cursor-pointer"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse text-cyan-200' : ''}`} />
              <span>{isPlayingAudio ? 'Sintetizando 1420.405 MHz...' : 'Ouvir Portadora 1420.405 MHz'}</span>
            </button>
          )}
        </div>

        {/* Core Summary */}
        <div className="my-4 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-200 leading-relaxed">
          {activeDiscovery.correlationSummary}
        </div>

        {/* Empirical Evidence Checklist & Metric Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-3">
          <div className="lg:col-span-8 space-y-2 text-xs">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">
              Evidências Empíricas Catalogadas:
            </div>
            {activeDiscovery.empiricalEvidence.map((ev, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{ev}</span>
              </div>
            ))}
          </div>

          {/* Metric Comparison Box */}
          {activeDiscovery.metricsComparison && (
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex flex-col justify-between">
              <div className="text-[10px] text-slate-400 uppercase font-bold text-center border-b border-slate-800 pb-1 mb-2">
                {activeDiscovery.metricsComparison.unit}
              </div>
              <div className="space-y-2 text-center">
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 truncate">
                    {activeDiscovery.metricsComparison.labelA}
                  </div>
                  <div className="text-sm font-bold text-rose-400 mt-0.5">
                    {activeDiscovery.metricsComparison.valueA}
                  </div>
                </div>
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 truncate">
                    {activeDiscovery.metricsComparison.labelB}
                  </div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">
                    {activeDiscovery.metricsComparison.valueB}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Investigator Note */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed italic bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
          <strong className="text-cyan-300 not-italic">Nota do Arquivista Metatron:</strong> "{activeDiscovery.investigatorNotes}"
        </div>
      </div>
    </div>
  );
};
