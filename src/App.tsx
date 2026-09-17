import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GlobalAtlasMap } from './components/atlas/GlobalAtlasMap';
import { ArchitecturalTable } from './components/ArchitecturalTable';
import { GlobalSystemicPatterns } from './components/patterns/GlobalSystemicPatterns';
import { TelemetryView } from './components/TelemetryView';
import { BiometricSpace3D } from './components/BiometricSpace3D';
import { QuickDossierModal } from './components/QuickDossierModal';
import { TEAMS_DATA, METADATA_ARCHIVE } from './data/sevenSeedsData';
import { GLOBAL_ARCHIVE_HEADER } from './data/globalSeedsData';
import { TeamData } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'atlas' | 'table' | 'patterns' | 'telemetry' | '3d'>('atlas');
  const [selectedTeam, setSelectedTeam] = useState<TeamData | null>(TEAMS_DATA[0]);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);

  const handleSelectTeam = (team: TeamData) => {
    setSelectedTeam(team);
  };

  return (
    <div className="min-h-screen bg-[#080d16] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickDossier={() => setIsDossierOpen(true)}
        presentationMode={presentationMode}
        onTogglePresentationMode={() => setPresentationMode((prev) => !prev)}
      />

      {/* Main Applet Content Area - Expands in Presentation Mode */}
      <main className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 transition-all ${
        presentationMode ? 'max-w-[98%]' : 'max-w-7xl'
      }`}>
        {/* Dynamic View rendering based on activeTab */}
        {activeTab === 'atlas' && (
          <GlobalAtlasMap
            selectedTeam={selectedTeam}
            onSelectTeam={handleSelectTeam}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'table' && (
          <ArchitecturalTable
            onSelectTeam={(team) => {
              setSelectedTeam(team);
              setActiveTab('atlas');
            }}
            onNavigateTo3D={() => setActiveTab('3d')}
            onNavigateToAtlas={() => setActiveTab('atlas')}
          />
        )}

        {activeTab === 'patterns' && (
          <GlobalSystemicPatterns />
        )}

        {activeTab === 'telemetry' && (
          <TelemetryView
            onSelectTeam={(team) => {
              setSelectedTeam(team);
              setActiveTab('atlas');
            }}
            onNavigateTo3D={() => setActiveTab('3d')}
          />
        )}

        {activeTab === '3d' && (
          <BiometricSpace3D
            selectedTeam={selectedTeam}
            onSelectTeam={handleSelectTeam}
          />
        )}
      </main>

      {/* Quick Dossier Modal */}
      <QuickDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060a12] py-6 px-4 text-xs font-mono-code text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>PROJETO SEEDS — REDE PLANETÁRIA DE PRESERVAÇÃO &amp; TELEMETRIA ÔMEGA</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Compilador: {GLOBAL_ARCHIVE_HEADER.compiler}</span>
            <span>•</span>
            <span className="text-emerald-400">A Vitória da Semente e dos Saberes sobre o Biopoder</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

