import React, { useState } from 'react';
import { 
  Globe2, 
  Table, 
  BarChart3, 
  Box, 
  GitBranch, 
  Volume2, 
  VolumeX, 
  FileText, 
  Menu, 
  X, 
  Shield, 
  LayoutGrid,
  BookOpen,
  Skull,
  Crosshair
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface NavbarProps {
  activeTab: 'atlas' | 'military-maps' | 'tactical-matrix' | 'table' | 'patterns' | 'telemetry' | '3d';
  setActiveTab: (tab: 'atlas' | 'military-maps' | 'tactical-matrix' | 'table' | 'patterns' | 'telemetry' | '3d') => void;
  onOpenQuickDossier?: () => void;
  onOpenDocumentation?: () => void;
  onOpenForensicModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenQuickDossier,
  onOpenDocumentation,
  onOpenForensicModal,
}) => {
  const [audioActive, setAudioActive] = useState(audioService.isEnabled());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const isEnabled = audioService.toggleSound();
    setAudioActive(isEnabled);
  };

  // User requested: "Mova a página 'Telemetria' para o lado do botão 'Militar'."
  const navItems = [
    { id: 'atlas' as const, label: 'Atlas Planetário', shortLabel: 'Atlas 2D/3D', icon: Globe2 },
    { id: 'military-maps' as const, label: 'Mapas Militares', shortLabel: 'Militar', icon: Shield },
    { id: 'tactical-matrix' as const, label: 'Matriz Tática U.C.', shortLabel: 'Matriz', icon: Crosshair },
    { id: 'telemetry' as const, label: 'Telemetria Ômega', shortLabel: 'Telemetria', icon: BarChart3 },
    { id: 'table' as const, label: 'Cartões & Matriz', shortLabel: 'Cartões', icon: LayoutGrid },
    { id: 'patterns' as const, label: 'Padrões Sistêmicos', shortLabel: 'Padrões', icon: GitBranch },
    { id: '3d' as const, label: 'Espaço 3D Orbital', shortLabel: 'Espaço 3D', icon: Box },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#0e2a4a] bg-[#020713]/95 backdrop-blur-md transition-all font-sans">
      {/* Top Caliper Line */}
      <div className="w-full bg-[#030914] border-b border-[#0d223a] px-4 py-0.5 flex items-center justify-between text-[9px] font-mono-code text-cyan-500/70 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SISTEMA DE CARTOGRAFIA TÁTICA FUTURISTA • HUD V4.8 • MODO APRESENTAÇÃO PERMANENTE</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>SINC-ORBITAL: ATIVO</span>
          <span>DEFCON 2</span>
          <span>MGRS: 22L HJ 8920 4512</span>
        </div>
      </div>

      {/* Main Command Navigation Deck (Permanently in Presentation Screen Width) */}
      <div className="w-full mx-auto px-3 sm:px-5 lg:px-6 max-w-[98%]">
        <div className="flex items-center justify-between py-2 sm:py-2.5 gap-2 sm:gap-4">
          
          {/* Logo / Command Title */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer select-none shrink-0 group" 
            onClick={() => {
              audioService.playNodeSelect();
              setActiveTab('atlas');
            }}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#030a17] border border-cyan-500/50 flex items-center justify-center rounded-lg shadow-[0_0_12px_rgba(6,182,212,0.25)] group-hover:border-cyan-400 transition-colors">
              <Globe2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-white font-sans">
                  PROJETO SEEDS
                </span>
                <span className="px-1.5 py-0.2 text-[10px] font-mono-code bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 rounded font-bold">
                  GLOBAL ÔMEGA
                </span>
              </div>
              <p className="text-[10px] font-mono-code text-slate-400 hidden sm:block">
                CENTRAL DE COMANDO &amp; TELEMETRIA AKÁSHICA
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-1 scrollbar-none max-w-full">
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
                  className={`relative px-2.5 sm:px-3 py-1.5 text-xs font-mono-code font-bold transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer rounded-lg border ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950 to-sky-900/90 text-cyan-200 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#061426] border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="hidden lg:inline">{item.label}</span>
                  <span className="hidden md:inline lg:hidden">{item.shortLabel}</span>
                  {isActive && (
                    <span className="absolute -bottom-[2px] left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Tactical Action Triggers: Forensic Modal, Documentation, SITREP & Audio */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Forensic Seeds Failure Investigation Modal Button */}
            {onOpenForensicModal && (
              <button
                onClick={() => {
                  audioService.playAlert();
                  onOpenForensicModal();
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono-code font-bold bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.2)] cursor-pointer transition-colors"
                title="Abrir Relatório Forense de Causas de Não-Sobrevivência & Probabilidade"
              >
                <Skull className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden xl:inline">RELATÓRIO FORENSE</span>
              </button>
            )}

            {/* System Documentation Modal Button */}
            {onOpenDocumentation && (
              <button
                onClick={() => {
                  audioService.playNodeSelect();
                  onOpenDocumentation();
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#030914] hover:bg-[#07172e] text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-mono-code transition-colors cursor-pointer"
                title="Abrir Manual de Operações e Documentação Akáshica"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden xl:inline">DOCUMENTAÇÃO</span>
              </button>
            )}

            {/* SITREP Quick Dossier */}
            {onOpenQuickDossier && (
              <button
                id="quick-dossier-btn"
                onClick={() => {
                  audioService.playNodeSelect();
                  onOpenQuickDossier();
                }}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#030914] hover:bg-[#07172e] text-slate-300 border border-[#0e2a4a] rounded-lg text-xs font-mono-code transition-colors cursor-pointer"
                title="Relatório de Situação das Forças (SITREP)"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>SITREP</span>
              </button>
            )}

            {/* Audio Feedback Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 bg-[#030914] hover:bg-[#07172e] border border-[#0e2a4a] text-slate-300 rounded-lg cursor-pointer transition-colors"
              title={audioActive ? 'Desativar Sons Táticos' : 'Ativar Sons Táticos'}
            >
              {audioActive ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button 
              className="md:hidden p-2 bg-[#030914] border border-[#0e2a4a] text-cyan-400 rounded-lg cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Hamburger Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#0e2a4a] space-y-3 animate-in fade-in">
            <nav className="flex flex-col space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={`mobile-${item.id}`}
                    onClick={() => {
                      audioService.playNodeSelect();
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2.5 text-xs font-mono-code font-bold flex items-center justify-between rounded-lg border transition-colors ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-400'
                        : 'text-slate-300 bg-[#030914] border-[#0e2a4a] hover:bg-[#081b36]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 flex flex-col space-y-2">
              {onOpenForensicModal && (
                <button
                  onClick={() => {
                    audioService.playAlert();
                    onOpenForensicModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex justify-center items-center gap-2 px-4 py-2.5 bg-rose-950/80 text-rose-200 border border-rose-500/50 text-xs font-mono-code font-bold rounded-lg"
                >
                  <Skull className="w-4 h-4 text-rose-400" />
                  <span>RELATÓRIO FORENSE DE QUEDA</span>
                </button>
              )}

              {onOpenDocumentation && (
                <button
                  onClick={() => {
                    audioService.playNodeSelect();
                    onOpenDocumentation();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex justify-center items-center gap-2 px-4 py-2.5 bg-[#030914] text-cyan-300 border border-cyan-500/40 text-xs font-mono-code font-bold rounded-lg"
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>DOCUMENTAÇÃO DO SISTEMA</span>
                </button>
              )}

              {onOpenQuickDossier && (
                <button
                  onClick={() => {
                    audioService.playNodeSelect();
                    onOpenQuickDossier();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex justify-center items-center gap-2 px-4 py-2.5 bg-[#030914] text-slate-300 border border-[#0e2a4a] text-xs font-mono-code rounded-lg"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>SITREP DOSSIER</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
