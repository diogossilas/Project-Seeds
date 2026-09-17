import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { DISCRETE_STATE_EVENTS } from '../../data/sevenSeedsData';
import { audioService } from '../../services/audioService';

export const TelemetryStateCycles: React.FC = () => {
  const [selectedStateEvent, setSelectedStateEvent] = useState<string | null>(null);

  const handleSelectEvent = (id: string) => {
    setSelectedStateEvent(selectedStateEvent === id ? null : id);
    audioService.playNodeSelect();
  };

  return (
    <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold font-mono-code uppercase text-cyan-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyan-400" />
            Ciclos e Estados Discretos
          </h3>
          <span className="text-[10px] font-mono-code text-slate-500">MÁQUINA DE ESTADOS</span>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Transições operacionais críticas: registros temporais de falhas de tutela, cismas, convergência e emancipação.
        </p>

        <div className="space-y-2.5 max-h-[310px] overflow-y-auto pr-1">
          {DISCRETE_STATE_EVENTS.map((evt) => {
            const isSelected = selectedStateEvent === evt.id;
            return (
              <div
                key={evt.id}
                id={`state-event-${evt.id}`}
                onClick={() => handleSelectEvent(evt.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer text-xs ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500/50 shadow-md'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono-code text-[10px] text-slate-400">
                    {evt.timestamp}
                  </span>
                  <span
                    className="px-1.5 py-0.2 rounded text-[9px] font-mono-code font-bold uppercase"
                    style={{
                      backgroundColor: `${evt.color}20`,
                      color: evt.color,
                      border: `1px solid ${evt.color}40`,
                    }}
                  >
                    {evt.state}
                  </span>
                </div>

                <div className="font-semibold text-slate-200">
                  {evt.teamName}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  {evt.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono-code text-center">
        Clique no evento para inspeção cronológica.
      </div>
    </div>
  );
};
