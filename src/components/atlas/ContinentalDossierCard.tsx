import React from 'react';
import { GlobalProgramData } from '../../types/globalSeeds';
import { 
  Compass, 
  Cpu, 
  Sprout, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Radio, 
  ShieldCheck, 
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface ContinentalDossierCardProps {
  program: GlobalProgramData;
  onNavigateToTable?: () => void;
  onNavigateTo3D?: () => void;
}

export const ContinentalDossierCard: React.FC<ContinentalDossierCardProps> = ({
  program,
  onNavigateToTable,
  onNavigateTo3D,
}) => {
  return (
    <div className="bg-[#0b1220] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span 
              className="px-2.5 py-0.5 rounded text-xs font-mono-code font-bold uppercase"
              style={{ backgroundColor: `${program.color}20`, color: program.color, border: `1px solid ${program.color}40` }}
            >
              {program.regionShort}
            </span>
            <span className="text-xs font-mono-code text-slate-400">
              COORD: {program.coordinates.lat}°, {program.coordinates.lng}°
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
            {program.programName}
          </h3>
          <p className="text-xs text-slate-400 font-mono-code">
            Localização Primária: {program.coordinates.locationName}
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex sm:flex-col items-center sm:items-end gap-1.5 shrink-0">
          <span className={`px-3 py-1 rounded-full text-xs font-mono-code font-bold flex items-center gap-1.5 ${
            program.statusLevel === 'prosperous' || program.statusLevel === 'symbiotic'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : program.statusLevel === 'critical'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            {program.statusLabel}
          </span>
          <span className="text-[11px] font-mono-code text-slate-400">
            Efetivo: {program.estimatedSurvivors}
          </span>
        </div>
      </div>

      {/* Grid of Key Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Engenharia de Abrigo */}
        <div className="bg-[#080d16] border border-slate-800/80 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-code font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Engenharia de Abrigo &amp; Localização</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {program.shelterEngineering}
          </p>
        </div>

        {/* 2. Critério de Seleção */}
        <div className="bg-[#080d16] border border-slate-800/80 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono-code font-bold uppercase">
            <Users className="w-4 h-4" />
            <span>Critério de Seleção &amp; Perfil</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {program.selectionCriteria}
          </p>
        </div>
      </div>

      {/* 3. Reconfiguração do Bioma Pós-Impacto */}
      <div className="bg-[#080d16] border border-slate-800/80 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-code font-bold uppercase">
            <Sprout className="w-4 h-4" />
            <span>Reconfiguração do Bioma Pós-Impacto</span>
          </div>
          <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-emerald-500/30">
            {program.biomeShortName}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {program.biomeReconfiguration}
        </p>
      </div>

      {/* 4. Ponto Crítico de Ruptura / Sucessão de Poder */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-code font-bold uppercase">
          <AlertTriangle className="w-4 h-4" />
          <span>Ponto Crítico de Ruptura &amp; Sucessão de Poder</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
          {program.criticalRupture}
        </p>
      </div>

      {/* 5. Status Histórico Atual & Cenário de Sobrevivência */}
      <div className="bg-[#080d16] border border-slate-800/80 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-mono-code font-bold uppercase">
          <Radio className="w-4 h-4" />
          <span>Status Histórico Atual &amp; Cenário de Sobrevivência</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {program.currentStatus}
        </p>
      </div>

      {/* Bottom Insights: Falência da IA vs Vitória dos Conhecimentos Tradicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Falência da IA */}
        <div className="bg-[#080d16] border border-rose-500/30 rounded-xl p-3.5 space-y-1">
          <div className="flex items-center gap-2 text-rose-400 text-[11px] font-mono-code font-bold uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>Colapso da IA: {program.aiAutonomy.systemName}</span>
          </div>
          <p className="text-xs text-slate-300">
            {program.aiAutonomy.incident}
          </p>
        </div>

        {/* Tradição & Conhecimento Ancestral */}
        <div className="bg-[#080d16] border border-emerald-500/30 rounded-xl p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-mono-code font-bold uppercase">
              <Sprout className="w-3.5 h-3.5" />
              <span>Saber Tradicional: {program.traditionalKnowledge.domain}</span>
            </div>
            <span className="text-[10px] font-mono-code text-emerald-400 font-bold">
              {program.traditionalKnowledge.effectivenessRating}% Eficácia
            </span>
          </div>
          <p className="text-xs text-slate-300">
            {program.traditionalKnowledge.factor}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono-code">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-slate-500">Conexão Interoceânica:</span>
          <span className="text-slate-300">{program.transoceanicConnection}</span>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToTable && (
            <button
              onClick={onNavigateToTable}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono-code flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Ver na Tabela</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
