import React from 'react';
import { BarChart2, AlertOctagon } from 'lucide-react';
import { TEAMS_DATA } from '../../data/sevenSeedsData';

export const TelemetryDistribution: React.FC = () => {
  return (
    <div className="bg-[#030914] border border-[#0e2a4a] rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#0e2a4a]">
          <span className="text-xs font-mono-code uppercase text-amber-400 font-semibold flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-amber-400" />
            Distribuição e Frequência de Sobrevivência
          </span>
          <span className="text-[10px] font-mono-code text-slate-500">HISTOGRAMA</span>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Comparativo percentual de sobrevivência biológica efetiva pós-descongelamento:
        </p>

        {/* Horizontal Bar Distribution */}
        <div className="space-y-3 font-mono-code text-xs">
          {TEAMS_DATA.map((team) => (
            <div key={team.id} className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: team.color }} />
                  {team.name}
                </span>
                <span className="font-bold" style={{ color: team.color }}>
                  {team.metrics.survivalRate}% ({team.survivalCount.split(' ')[0]})
                </span>
              </div>
              <div className="w-full h-2 bg-[#050e1c] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${team.metrics.survivalRate}%`,
                    backgroundColor: team.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Critical Anomaly Log Box */}
        <div className="mt-6 pt-4 border-t border-[#0e2a4a]">
          <div className="text-xs font-mono-code uppercase text-rose-400 font-semibold mb-2 flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            Matriz de Anomalias Frequentes
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-code">
            <div className="bg-slate-900/60 p-2 rounded-lg border border-[#0e2a4a]">
              <div className="text-slate-400">Falha dos Guias</div>
              <div className="text-rose-400 font-bold">5 de 5 núcleos</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-[#0e2a4a]">
              <div className="text-slate-400">Ruptura Psicológica</div>
              <div className="text-amber-400 font-bold">Verão A &amp; Inverno</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-[#0e2a4a]">
              <div className="text-slate-400">Contaminação X-Virus</div>
              <div className="text-purple-400 font-bold">Refúgio Ryūgū</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-[#0e2a4a]">
              <div className="text-slate-400">Insubordinação IA</div>
              <div className="text-cyan-400 font-bold">8ª Arca Fuji</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#0e2a4a] flex items-center justify-between text-xs text-slate-400 font-mono-code">
        <span>Análise estatística Classe Ômega</span>
        <span className="text-emerald-400 font-semibold">Consistência: 100%</span>
      </div>
    </div>
  );
};
