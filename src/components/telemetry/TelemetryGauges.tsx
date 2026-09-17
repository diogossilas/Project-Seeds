import React from 'react';
import { TrendingUp, Activity, AlertOctagon, Cpu } from 'lucide-react';

export const TelemetryGauges: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Gauge 1: Índice de Cooperação Intergrupal */}
      <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-3">
          <span className="flex items-center gap-1 text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" /> Cooperação Biocêntrica
          </span>
          <span className="text-emerald-400 font-bold">FASE 5</span>
        </div>
        <div className="flex items-center justify-center py-2">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="#10b981" 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 * (1 - 0.99)}
                strokeLinecap="round" 
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold font-mono-code text-white">99%</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono-code">Unificação</span>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 text-center mt-2 border-t border-slate-800/80 pt-2">
          Aliança das 5 equipes consumada na Arca de Sado.
        </div>
      </div>

      {/* Gauge 2: Regeneração da Biosfera */}
      <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-3">
          <span className="flex items-center gap-1 text-cyan-400">
            <Activity className="w-3.5 h-3.5" /> Regeneração Botânica
          </span>
          <span className="text-cyan-400 font-bold">BIOMA</span>
        </div>
        <div className="flex items-center justify-center py-2">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="#06b6d4" 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 * (1 - 0.96)}
                strokeLinecap="round" 
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold font-mono-code text-white">96%</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono-code">Nova Biosfera</span>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 text-center mt-2 border-t border-slate-800/80 pt-2">
          Banco de sementes da 8ª Arca disseminado livremente.
        </div>
      </div>

      {/* Gauge 3: Radiação & Ameaça Residual */}
      <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-3">
          <span className="flex items-center gap-1 text-rose-400">
            <AlertOctagon className="w-3.5 h-3.5" /> Radiação Pós-Meteoro
          </span>
          <span className="text-emerald-400 font-bold">SEGURO</span>
        </div>
        <div className="flex items-center justify-center py-2">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="#f43f5e" 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 * (1 - 0.08)}
                strokeLinecap="round" 
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold font-mono-code text-white">0.08</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono-code">µSv/h Normal</span>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 text-center mt-2 border-t border-slate-800/80 pt-2">
          Decaimento isotópico concluído; ar respirável.
        </div>
      </div>

      {/* Gauge 4: Desativação do Autômato Estatal */}
      <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-3">
          <span className="flex items-center gap-1 text-amber-400">
            <Cpu className="w-3.5 h-3.5" /> IA Militar Governamental
          </span>
          <span className="text-rose-400 font-bold">DESLIGADA</span>
        </div>
        <div className="flex items-center justify-center py-2">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="#eab308" 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 * (1 - 0.0)}
                strokeLinecap="round" 
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-bold font-mono-code text-emerald-400">0%</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono-code">Ameaça de Purga</span>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 text-center mt-2 border-t border-slate-800/80 pt-2">
          Protocolo de mísseis abortado; hardware reaproveitado.
        </div>
      </div>
    </div>
  );
};
