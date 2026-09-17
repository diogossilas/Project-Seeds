import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GlobalAtlasMap } from './components/atlas/GlobalAtlasMap';
import { MilitaryMapSuite } from './components/military/MilitaryMapSuite';
import { ArchitecturalTable } from './components/ArchitecturalTable';
import { GlobalSystemicPatterns } from './components/patterns/GlobalSystemicPatterns';
import { TelemetryView } from './components/TelemetryView';
import { BiometricSpace3D } from './components/BiometricSpace3D';
import { TacticalSurfaceMap } from './components/military/TacticalSurfaceMap';
import { QuickDossierModal } from './components/QuickDossierModal';
import { FailedSeedsForensicModal } from './components/dossier/FailedSeedsForensicModal';
import { SystemDocumentationModal } from './components/documentation/SystemDocumentationModal';
import { TEAMS_DATA } from './data/sevenSeedsData';
import { TeamData } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'atlas' | 'military-maps' | 'tactical-matrix' | 'table' | 'patterns' | 'telemetry' | '3d'>('atlas');
  const [selectedTeam, setSelectedTeam] = useState<TeamData | null>(TEAMS_DATA[0]);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isForensicModalOpen, setIsForensicModalOpen] = useState(false);
  const [forensicSeedId, setForensicSeedId] = useState<string | undefined>(undefined);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  const handleSelectTeam = (team: TeamData) => {
    setSelectedTeam(team);
  };

  const handleOpenForensic = (seedId?: string) => {
    setForensicSeedId(seedId);
    setIsForensicModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Top Header & Navigation - Presentation Mode is Permanently Active & Tab Order Adjusted */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickDossier={() => setIsDossierOpen(true)}
        onOpenDocumentation={() => setIsDocModalOpen(true)}
        onOpenForensicModal={() => handleOpenForensic()}
      />

      {/* Main Applet Content Area - Full-Width Presentation HUD (max-w-[98%]) */}
      <main className="flex-1 w-full mx-auto px-3 sm:px-5 lg:px-6 py-4 max-w-[98%]">
        {/* Dynamic View rendering based on activeTab */}
        {activeTab === 'atlas' && (
          <GlobalAtlasMap
            selectedTeam={selectedTeam}
            onSelectTeam={handleSelectTeam}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onOpenForensicModal={handleOpenForensic}
          />
        )}

        {activeTab === 'military-maps' && (
          <MilitaryMapSuite />
        )}

        {activeTab === 'tactical-matrix' && (
          <TacticalSurfaceMap />
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

        {activeTab === 'table' && (
          <ArchitecturalTable
            onSelectTeam={(team) => {
              setSelectedTeam(team);
              setActiveTab('atlas');
            }}
            onNavigateTo3D={() => setActiveTab('3d')}
            onNavigateToAtlas={() => setActiveTab('atlas')}
            onOpenForensicModal={handleOpenForensic}
          />
        )}

        {activeTab === 'patterns' && (
          <GlobalSystemicPatterns />
        )}

        {activeTab === '3d' && (
          <BiometricSpace3D
            selectedTeam={selectedTeam}
            onSelectTeam={handleSelectTeam}
          />
        )}
      </main>

      {/* SITREP Quick Dossier Modal */}
      <QuickDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Forensic Report for Non-Surviving Seeds (Geography, Submersion, Starvation, Probabilities) */}
      <FailedSeedsForensicModal
        isOpen={isForensicModalOpen}
        initialSeedId={forensicSeedId}
        onClose={() => setIsForensicModalOpen(false)}
      />

      {/* Interactive System Documentation & Operations Manual Modal */}
      <SystemDocumentationModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
      />
    </div>
  );
}
