import React from 'react';
import { 
  Shield, 
  Globe2, 
  Table, 
  BarChart3, 
  Box, 
  GitBranch, 
  Volume2, 
  VolumeX, 
  Tv,
  FileText,
  Radio,
  Sparkles
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface NavbarProps {
  activeTab: 'atlas' | 'table' | 'patterns' | 'telemetry' | '3d';
  setActiveTab: (tab: 'atlas' | 'table' | 'patterns' | 'telemetry' | '3d') => void;
  onOpenQuickDossier?: () => void;
  presentationMode: boolean;
  onTogglePresentationMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenQuickDossier,
  presentationMode,
  onTogglePresentationMode
}) => {
  const [audioActive, setAudioActive] = React.useState(audioService.isEnabled());

  const handleToggleSound = () => {
    const isEnabled = audioService.toggleSound();
    setAudioActive(isEnabled);
  };

  const navItems = [
    { id: 'atlas' as const, label: 'Atlas Planetário', shortLabel: 'Atlas', icon: Globe2 },
    { id: 'table' as const, label: 'Tabela Mestra Global', shortLabel: 'Tabela', icon: Table },
    { id: 'patterns' as const, label: 'Padrões Sistêmicos (3 Leis)', shortLabel: 'Padrões', icon: GitBranch },
    { id: 'telemetry' as const, label: 'Telemetria Ômega', shortLabel: 'Telemetria', icon: BarChart3 },
    { id: '3d' as const, label: 'Espaço Biométrico 3D', shortLabel: '3D', icon: Box },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0b111e]/98 backdrop-blur-md transition-all">
      {/* Tactical Status Line */}
      <div className="bg-[#070c16] border-b border-slate-800/80 px-4 py-1.5 text-xs overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between gap-3 min-w-max">
          <div className="flex items-center space-x-2 sm:space-x-3 text-slate-300">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono-code text-[11px] font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SITUAÇÃO: REDE PLANETÁRIA MONITORADA • PROTOCOLO SEEDS ATIVO
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 font-mono-code text-[11px] hidden md:inline">
              ARQUIVO AKÁSHICO CLASSE ÔMEGA • METATRON
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] font-mono-code text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              11 FRENTES DETECTADAS (10 CONTINENTAIS + 1 LUNAR)
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-emerald-400 font-bold">100% QUEDA DAS IAs</span>
          </div>
        </div>
      </div>

      {/* Main Command Navigation Deck */}
      <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all ${
        presentationMode ? 'max-w-[98%]' : 'max-w-7xl'
      }`}>
        <div className="flex items-center justify-between py-2 sm:py-2.5 gap-2 sm:gap-4">
          {/* Logo / Command Title */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer select-none shrink-0" 
            onClick={() => {
              audioService.playNodeSelect();
              setActiveTab('atlas');
            }}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-800/90 border border-emerald-500/40 flex items-center justify-center shadow-md">
              <Globe2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-white font-sans">
                  PROJETO SEEDS
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono-code bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold">
                  GLOBAL ÔMEGA
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono-code hidden sm:block">
                Mapeamento Planetário, Biomas de Ruptura &amp; Sucessão
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-1 scrollbar-none max-w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => {
                    audioService.playNodeSelect();
                    setActiveTab(item.id);
                  }}
                  className={`relative px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/50 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="md:hidden">{item.shortLabel}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Tactical Presentation Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Presentation Mode Button */}
            <button
              id="presentation-mode-toggle-btn"
              onClick={() => {
                audioService.playPhaseTransition();
                onTogglePresentationMode();
              }}
              title={presentationMode ? "Sair do Modo Apresentação" : "Ativar Modo Apresentação (Briefing de Comando)"}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-mono-code font-semibold transition-all cursor-pointer border ${
                presentationMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-800/80 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 border-slate-700'
              }`}
            >
              <Tv className={`w-3.5 h-3.5 ${presentationMode ? 'text-amber-400' : 'text-slate-400'}`} />
              <span className="hidden lg:inline">
                {presentationMode ? 'BRIEFING ATIVO' : 'APRESENTAÇÃO'}
              </span>
            </button>

            {/* SITREP Dossier */}
            {onOpenQuickDossier && (
              <button
                id="quick-dossier-btn"
                onClick={() => {
                  audioService.playNodeSelect();
                  onOpenQuickDossier();
                }}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-mono-code transition-colors cursor-pointer"
                title="Relatório de Situação das Forças (SITREP)"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>SITREP</span>
              </button>
            )}

            {/* Audio Toggle */}
            <button
              id="audio-telemetry-btn"
              onClick={handleToggleSound}
              title={audioActive ? "Desativar Áudio Tático" : "Ativar Áudio Tático"}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors cursor-pointer"
            >
              {audioActive ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

