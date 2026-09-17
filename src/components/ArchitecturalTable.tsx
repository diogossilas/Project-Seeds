import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Copy, 
  Globe2, 
  Compass, 
  FileSpreadsheet, 
  AlertTriangle,
  Cpu,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  X,
  Layers,
  LayoutGrid,
  Table as TableIcon,
  Activity,
  Box,
  MapPin,
  ChevronRight,
  Shield,
  Radio,
  FileText,
  Flame,
  Maximize2
} from 'lucide-react';
import { TEAMS_DATA } from '../data/sevenSeedsData';
import { GLOBAL_PROGRAMS_DATA } from '../data/globalSeedsData';
import { TeamData } from '../types';
import { GlobalProgramData } from '../types/globalSeeds';
import { audioService } from '../services/audioService';
import { ExportService } from '../services/exportService';

interface ArchitecturalTableProps {
  onSelectTeam?: (team: TeamData) => void;
  onNavigateTo3D?: () => void;
  onNavigateToAtlas?: () => void;
  onOpenForensicModal?: (seedId?: string) => void;
}

export const ArchitecturalTable: React.FC<ArchitecturalTableProps> = ({ 
  onSelectTeam,
  onNavigateTo3D,
  onNavigateToAtlas,
  onOpenForensicModal
}) => {
  const [tableScope, setTableScope] = useState<'global' | 'japan'>('global');
  const [viewLayout, setViewLayout] = useState<'cards' | 'matrix'>('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Selected Program or Team for Full Detail Modal Dossier
  const [selectedGlobalProgram, setSelectedGlobalProgram] = useState<GlobalProgramData | null>(null);
  const [selectedJapanTeam, setSelectedJapanTeam] = useState<TeamData | null>(null);
  const [dossierTab, setDossierTab] = useState<'architecture' | 'genetics' | 'ecology' | 'rupture' | 'telemetry'>('architecture');

  // Filter Global Programs
  const filteredGlobalPrograms = GLOBAL_PROGRAMS_DATA.filter((prog) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      prog.region.toLowerCase().includes(term) ||
      prog.programName.toLowerCase().includes(term) ||
      prog.shelterEngineering.toLowerCase().includes(term) ||
      prog.selectionCriteria.toLowerCase().includes(term) ||
      prog.biomeReconfiguration.toLowerCase().includes(term) ||
      prog.criticalRupture.toLowerCase().includes(term) ||
      prog.currentStatus.toLowerCase().includes(term) ||
      prog.populationProfile.some(p => p.toLowerCase().includes(term));

    if (!matchesSearch) return false;

    if (regionFilter === 'americas') {
      return ['north-america', 'central-america', 'south-america'].includes(prog.id);
    }
    if (regionFilter === 'eurasia') {
      return ['europe', 'central-eurasia', 'russia'].includes(prog.id);
    }
    if (regionFilter === 'asia_pacific') {
      return ['india', 'china', 'japan-archipelago'].includes(prog.id);
    }
    if (regionFilter === 'polar_lunar') {
      return ['antarctica', 'lunar-colonies'].includes(prog.id);
    }

    return true;
  });

  // Filter Japanese Teams
  const filteredTeams = TEAMS_DATA.filter((team) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      team.name.toLowerCase().includes(term) ||
      team.effectiveLeadership.toLowerCase().includes(term) ||
      team.preImpactLeadership.toLowerCase().includes(term) ||
      team.primaryStateFunction.toLowerCase().includes(term) ||
      team.criticalRupture.toLowerCase().includes(term) ||
      team.epilogueDestiny.toLowerCase().includes(term) ||
      team.keyMembers.some(m => m.toLowerCase().includes(term));

    return matchesSearch;
  });

  // Export JSON (Global + Japan)
  const handleExportJSON = () => {
    audioService.playNodeSelect();
    const exportPayload = {
      classification: "Arquivo Akáshico Multissetorial Classe Ômega",
      title: "PROJETO SEEDS — TABELA MESTRA GLOBAL",
      extractedAt: new Date().toISOString(),
      globalProgramsCount: GLOBAL_PROGRAMS_DATA.length,
      globalPrograms: GLOBAL_PROGRAMS_DATA,
      japanTeamsCount: TEAMS_DATA.length,
      japanTeams: TEAMS_DATA,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "projeto_seeds_tabela_mestra_global.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export CSV of Global Table
  const handleExportCSV = () => {
    audioService.playNodeSelect();
    const headers = [
      "Continente / Regiao",
      "Nome do Programa",
      "Engenharia de Abrigo e Localizacao",
      "Criterio de Selecao e Perfil",
      "Reconfiguracao do Bioma Pos-Impacto",
      "Ponto Critico de Ruptura / Sucessao",
      "Status Historico Atual e Sobrevivencia"
    ];

    const rows = GLOBAL_PROGRAMS_DATA.map(p => [
      `"${p.region.replace(/"/g, '""')}"`,
      `"${p.programName.replace(/"/g, '""')}"`,
      `"${p.shelterEngineering.replace(/"/g, '""')}"`,
      `"${p.selectionCriteria.replace(/"/g, '""')}"`,
      `"${p.biomeReconfiguration.replace(/"/g, '""')}"`,
      `"${p.criticalRupture.replace(/"/g, '""')}"`,
      `"${p.currentStatus.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", "tabela_mestra_global_projeto_seeds.csv");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyClipboard = async () => {
    audioService.playNodeSelect();
    const textToCopy = tableScope === 'global' 
      ? JSON.stringify(GLOBAL_PROGRAMS_DATA, null, 2)
      : JSON.stringify(TEAMS_DATA, null, 2);
    const success = await ExportService.copyToClipboard(textToCopy);
    if (success) {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  const openProgramModal = (prog: GlobalProgramData) => {
    audioService.playNodeSelect();
    setSelectedGlobalProgram(prog);
    setSelectedJapanTeam(null);
    setDossierTab('architecture');
  };

  const openTeamModal = (team: TeamData) => {
    audioService.playNodeSelect();
    setSelectedJapanTeam(team);
    setSelectedGlobalProgram(null);
    setDossierTab('architecture');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Table Master Header */}
      <div className="bg-[#030914] border border-[#0e2a4a] rounded-xl p-4 sm:p-6 shadow-2xl space-y-4 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono-code font-bold uppercase">
                SEÇÃO II • CARTÕES &amp; TABELA MESTRA GLOBAL
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                CLASSIFICAÇÃO AKÁSHICA CLASSE ÔMEGA
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-white mt-1 tracking-tight">
              Programas Continentais, Cartões de Ruptura &amp; Sucessões de Poder
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl">
              Clique em qualquer cartão para abrir o <strong>Dossiê Akáshico Completo</strong> com todas as informações de engenharia de abrigos, triagem genética, biomas pós-impacto e pontos de ruptura do biopoder.
            </p>
          </div>

          {/* Action Export Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Toggle: Cards vs Matrix */}
            <div className="flex items-center bg-[#020610] p-1 rounded-lg border border-[#0d223a]">
              <button
                onClick={() => {
                  audioService.playNodeSelect();
                  setViewLayout('cards');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono-code font-bold cursor-pointer transition-all ${
                  viewLayout === 'cards'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-sky-400" />
                <span>Modo Cartões</span>
              </button>
              <button
                onClick={() => {
                  audioService.playNodeSelect();
                  setViewLayout('matrix');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono-code font-bold cursor-pointer transition-all ${
                  viewLayout === 'matrix'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>Modo Matriz</span>
              </button>
            </div>

            <button
              id="export-csv-btn"
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-lg bg-[#050e1c] hover:bg-[#0b1b33] text-slate-200 border border-[#0e2a4a] text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Exportar Tabela Mestra em formato CSV (Planilha)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>CSV</span>
            </button>
            <button
              id="export-json-btn"
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-lg bg-[#050e1c] hover:bg-[#0b1b33] text-slate-200 border border-[#0e2a4a] text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Exportar Matriz em Formato JSON Completo"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>JSON</span>
            </button>
            <button
              id="copy-clipboard-btn"
              onClick={handleCopyClipboard}
              className="px-3 py-2 rounded-lg bg-[#050e1c] hover:bg-[#0b1b33] text-slate-200 border border-[#0e2a4a] text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>{copiedNotification ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Scope Selector: Global Programs vs Japanese 7 Seeds Matrix */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#0e2a4a]">
          <div className="flex items-center gap-1.5 bg-[#020610] p-1 rounded-lg border border-[#0d223a] w-full sm:w-auto">
            <button
              onClick={() => {
                audioService.playNodeSelect();
                setTableScope('global');
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono-code font-bold transition-all cursor-pointer ${
                tableScope === 'global'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Frentes Globais &amp; Extraterrestres ({GLOBAL_PROGRAMS_DATA.length})</span>
            </button>

            <button
              onClick={() => {
                audioService.playNodeSelect();
                setTableScope('japan');
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono-code font-bold transition-all cursor-pointer ${
                tableScope === 'japan'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Teatro Japão (7 Seeds) ({TEAMS_DATA.length})</span>
            </button>
          </div>

          {/* Region Filters (for Global mode) */}
          {tableScope === 'global' && (
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs font-mono-code">
              <button
                onClick={() => setRegionFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  regionFilter === 'all'
                    ? 'bg-sky-950 text-sky-300 border border-sky-500 font-bold'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setRegionFilter('americas')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  regionFilter === 'americas'
                    ? 'bg-sky-950 text-sky-300 border border-sky-500 font-bold'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Américas (3)
              </button>
              <button
                onClick={() => setRegionFilter('eurasia')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  regionFilter === 'eurasia'
                    ? 'bg-sky-950 text-sky-300 border border-sky-500 font-bold'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Europa / Eurásia / Rússia (3)
              </button>
              <button
                onClick={() => setRegionFilter('asia_pacific')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  regionFilter === 'asia_pacific'
                    ? 'bg-sky-950 text-sky-300 border border-sky-500 font-bold'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Ásia / Índia / China / Japão (3)
              </button>
              <button
                onClick={() => setRegionFilter('polar_lunar')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  regionFilter === 'polar_lunar'
                    ? 'bg-sky-950 text-sky-300 border border-sky-500 font-bold'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Antártica &amp; Lua (2)
              </button>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="search-table-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={tableScope === 'global' 
              ? "Filtrar por continente, bioma (Savana, Amazônia, Tundra), ruptura, IA, tecnologia ou sobrevivência..."
              : "Filtrar por equipe japonesa, líder (Aramaki, Hana, Ango), função de estado, ruptura ou epílogo..."}
            className="w-full bg-[#020610] border border-[#0e2a4a] rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* ================= 1. CARD-BASED LAYOUT (REQUESTED AS PRIMARY) ================= */}
      {viewLayout === 'cards' ? (
        tableScope === 'global' ? (
          /* GLOBAL PROGRAMS TACTICAL CARDS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGlobalPrograms.map((prog) => (
              <div
                key={prog.id}
                onClick={() => openProgramModal(prog)}
                className="group relative bg-[#030914] border border-[#0e2a4a] hover:border-cyan-400/80 rounded-xl p-4 sm:p-5 shadow-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] cursor-pointer flex flex-col justify-between"
              >
                {/* Tactical Corner Accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-500/50 pointer-events-none" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500/50 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500/50 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-500/50 pointer-events-none" />

                {/* Card Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: prog.color }} />
                      <div>
                        <span className="text-[10px] font-mono-code font-bold uppercase text-cyan-400 tracking-wider block">
                          {prog.region}
                        </span>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                          {prog.programName}
                        </h3>
                      </div>
                    </div>
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase border shrink-0"
                      style={{ 
                        backgroundColor: `${prog.color}15`, 
                        borderColor: `${prog.color}60`,
                        color: prog.color 
                      }}
                    >
                      {prog.biomeShortName}
                    </span>
                  </div>

                  {/* Badges / Metrics Row */}
                  <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono-code pt-1 border-t border-[#0e2a4a]">
                    <span className="px-1.5 py-0.2 bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 rounded">
                      Status: {prog.statusLabel}
                    </span>
                    <span className="px-1.5 py-0.2 bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 rounded">
                      IA: {prog.aiAutonomy.systemName}
                    </span>
                  </div>

                  {/* Content Synopsis */}
                  <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                    <div className="bg-[#020610] p-2.5 rounded-lg border border-[#0d223a]">
                      <span className="text-[10px] font-mono-code font-bold uppercase text-amber-400 flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Engenharia de Abrigo:
                      </span>
                      <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                        {prog.shelterEngineering}
                      </p>
                    </div>

                    <div className="bg-[#020610] p-2.5 rounded-lg border border-[#0d223a]">
                      <span className="text-[10px] font-mono-code font-bold uppercase text-emerald-400 flex items-center gap-1">
                        <Sprout className="w-3 h-3" />
                        Bioma Pós-Impacto:
                      </span>
                      <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                        {prog.biomeReconfiguration}
                      </p>
                    </div>

                    <div className="bg-[#020610] p-2.5 rounded-lg border border-[#0d223a]">
                      <span className="text-[10px] font-mono-code font-bold uppercase text-rose-400 flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        Ponto Crítico de Ruptura:
                      </span>
                      <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                        {prog.criticalRupture}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-4 pt-3 border-t border-[#0e2a4a] flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono-code text-cyan-400 group-hover:underline flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    Abrir Dossiê Akáshico
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-mono-code">
                    <span>{prog.coordinates.locationName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* JAPANESE SEVEN SEEDS TEAMS CARDS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeams.map((team) => (
              <div
                key={team.id}
                onClick={() => openTeamModal(team)}
                className="group relative bg-[#030914] border border-[#0e2a4a] hover:border-cyan-400/80 rounded-xl p-4 sm:p-5 shadow-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] cursor-pointer flex flex-col justify-between"
              >
                {/* Tactical Corner Accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-500/50 pointer-events-none" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500/50 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500/50 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-500/50 pointer-events-none" />

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: team.color }} />
                      <div>
                        <span className="text-[10px] font-mono-code font-bold uppercase text-cyan-400 tracking-wider block">
                          TEATRO ARQUIPÉLAGO (JAPÃO)
                        </span>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                          {team.name}
                        </h3>
                      </div>
                    </div>
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase border shrink-0"
                      style={{ 
                        backgroundColor: `${team.color}15`, 
                        borderColor: `${team.color}60`,
                        color: team.color 
                      }}
                    >
                      {team.kanji}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono-code pt-1 border-t border-[#0e2a4a]">
                    <span className="px-1.5 py-0.2 bg-sky-950/60 text-sky-300 border border-sky-500/40 rounded">
                      Líder: {team.effectiveLeadership}
                    </span>
                    <span className="px-1.5 py-0.2 bg-purple-950/60 text-purple-300 border border-purple-500/40 rounded">
                      Local: {team.coordinates.locationName}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                    <div className="bg-[#020610] p-2.5 rounded-lg border border-[#0d223a]">
                      <span className="text-[10px] font-mono-code font-bold uppercase text-cyan-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Função Primária de Estado:
                      </span>
                      <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                        {team.primaryStateFunction}
                      </p>
                    </div>

                    <div className="bg-[#020610] p-2.5 rounded-lg border border-[#0d223a]">
                      <span className="text-[10px] font-mono-code font-bold uppercase text-amber-400 flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        Ruptura Crítica:
                      </span>
                      <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                        {team.criticalRupture}
                      </p>
                    </div>

                    <div className="bg-[#020610] p-2.5 rounded-lg border border-[#0d223a]">
                      <span className="text-[10px] font-mono-code font-bold uppercase text-emerald-400 flex items-center gap-1">
                        <Sprout className="w-3 h-3" />
                        Epílogo &amp; Reconstrução:
                      </span>
                      <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                        {team.epilogueDestiny}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#0e2a4a] flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono-code text-cyan-400 group-hover:underline flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    Abrir Dossiê da Equipe
                  </span>
                  <span className="text-[10px] font-mono-code text-slate-400">
                    {team.keyMembers.length} Membros Registrados
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* ================= 2. MATRIX / SPREADSHEET TABLE LAYOUT ================= */
        <div className="bg-[#030914] border border-[#0e2a4a] rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#020610] border-b border-[#0e2a4a] text-cyan-400/80 font-mono-code uppercase tracking-wider text-[11px]">
                  <th className="p-3.5 min-w-[200px]">Continente / Região</th>
                  <th className="p-3.5 min-w-[200px]">Nome do Programa</th>
                  <th className="p-3.5 min-w-[240px]">Engenharia de Abrigo</th>
                  <th className="p-3.5 min-w-[240px]">Bioma Pós-Impacto</th>
                  <th className="p-3.5 min-w-[240px]">Ponto de Ruptura</th>
                  <th className="p-3.5 text-center w-24">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0e2a4a]/60">
                {filteredGlobalPrograms.map((prog) => (
                  <tr 
                    key={prog.id}
                    onClick={() => openProgramModal(prog)}
                    className="hover:bg-[#0b1d33] transition-colors cursor-pointer"
                  >
                    <td className="p-3.5 font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: prog.color }} />
                      <span>{prog.region}</span>
                    </td>
                    <td className="p-3.5 font-mono-code text-cyan-300">
                      {prog.programName}
                    </td>
                    <td className="p-3.5 text-slate-300 line-clamp-2">
                      {prog.shelterEngineering}
                    </td>
                    <td className="p-3.5 text-emerald-300">
                      {prog.biomeReconfiguration}
                    </td>
                    <td className="p-3.5 text-rose-300">
                      {prog.criticalRupture}
                    </td>
                    <td className="p-3.5 text-center">
                      <button className="px-2 py-1 bg-cyan-950 text-cyan-300 border border-cyan-400 rounded text-[10px] font-mono-code">
                        Dossiê
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 3. COMPREHENSIVE DETAIL MODAL (WHEN A CARD IS CLICKED) ================= */}
      {selectedGlobalProgram && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-[#020713] border border-cyan-500/60 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[0_0_40px_rgba(6,182,212,0.3)] flex flex-col justify-between">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#030a17]/98 border-b border-[#0e2a4a] p-4 sm:p-5 flex items-start justify-between gap-3 z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full" style={{ backgroundColor: selectedGlobalProgram.color }} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-code font-bold uppercase text-cyan-400 tracking-wider">
                      {selectedGlobalProgram.region} • COORD: {selectedGlobalProgram.coordinates.locationName}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono-code rounded">
                      Status: {selectedGlobalProgram.statusLabel}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white font-sans mt-0.5">
                    {selectedGlobalProgram.programName}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedGlobalProgram(null)}
                className="p-1.5 text-slate-400 hover:text-white bg-[#050e1c] border border-[#0e2a4a] rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Sub-Tabs */}
            <div className="px-4 sm:px-5 pt-3 border-b border-[#0e2a4a] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-mono-code bg-[#020713]">
              <button
                onClick={() => setDossierTab('architecture')}
                className={`px-3 py-2 border-b-2 font-bold transition-all cursor-pointer ${
                  dossierTab === 'architecture'
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                🏛️ Engenharia Estrutural
              </button>
              <button
                onClick={() => setDossierTab('genetics')}
                className={`px-3 py-2 border-b-2 font-bold transition-all cursor-pointer ${
                  dossierTab === 'genetics'
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                👥 Triagem Genética &amp; Clãs
              </button>
              <button
                onClick={() => setDossierTab('ecology')}
                className={`px-3 py-2 border-b-2 font-bold transition-all cursor-pointer ${
                  dossierTab === 'ecology'
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                🌿 Ecologia &amp; Bioma
              </button>
              <button
                onClick={() => setDossierTab('rupture')}
                className={`px-3 py-2 border-b-2 font-bold transition-all cursor-pointer ${
                  dossierTab === 'rupture'
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                ⚡ Ruptura do Biopoder
              </button>
              <button
                onClick={() => setDossierTab('telemetry')}
                className={`px-3 py-2 border-b-2 font-bold transition-all cursor-pointer ${
                  dossierTab === 'telemetry'
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                📊 Telemetria Ômega
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-4 sm:p-6 space-y-4 text-xs text-slate-200 font-sans leading-relaxed">
              {dossierTab === 'architecture' && (
                <div className="space-y-4">
                  <div className="bg-[#030a17] border border-[#0e2a4a] rounded-xl p-4 space-y-2">
                    <h4 className="text-sm font-bold text-amber-300 font-mono-code uppercase flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Especificações do Abrigo &amp; Subsolo
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedGlobalProgram.shelterEngineering}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-code text-[11px]">
                    <div className="bg-[#030a17] p-3 rounded-lg border border-[#0e2a4a]">
                      <span className="text-slate-400 block">Classificação de Bioma:</span>
                      <span className="text-white font-bold">{selectedGlobalProgram.biomeShortName}</span>
                    </div>
                    <div className="bg-[#030a17] p-3 rounded-lg border border-[#0e2a4a]">
                      <span className="text-slate-400 block">Status Operacional:</span>
                      <span className="text-emerald-400 font-bold">{selectedGlobalProgram.currentStatus}</span>
                    </div>
                  </div>
                </div>
              )}

              {dossierTab === 'genetics' && (
                <div className="space-y-4">
                  <div className="bg-[#030a17] border border-[#0e2a4a] rounded-xl p-4 space-y-2">
                    <h4 className="text-sm font-bold text-cyan-300 font-mono-code uppercase flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      Critérios de Seleção &amp; Diretriz Genética
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedGlobalProgram.selectionCriteria}
                    </p>
                  </div>
                  <div className="bg-[#030a17] border border-[#0e2a4a] rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 font-mono-code uppercase">
                      Perfis Populacionais Preservados:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedGlobalProgram.populationProfile.map((prof, i) => (
                        <span key={i} className="px-2 py-1 bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 rounded text-[11px] font-mono-code">
                          {prof}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {dossierTab === 'ecology' && (
                <div className="space-y-4">
                  <div className="bg-[#030a17] border border-[#0e2a4a] rounded-xl p-4 space-y-2">
                    <h4 className="text-sm font-bold text-emerald-300 font-mono-code uppercase flex items-center gap-2">
                      <Sprout className="w-4 h-4" />
                      Metamorfose Ecológica &amp; Bioma Pós-Impacto
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedGlobalProgram.biomeReconfiguration}
                    </p>
                  </div>
                </div>
              )}

              {dossierTab === 'rupture' && (
                <div className="space-y-4">
                  <div className="bg-[#030a17] border border-rose-900/60 rounded-xl p-4 space-y-2">
                    <h4 className="text-sm font-bold text-rose-300 font-mono-code uppercase flex items-center gap-2">
                      <Flame className="w-4 h-4" />
                      Colapso Sistêmico &amp; Ruptura do Biopoder
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedGlobalProgram.criticalRupture}
                    </p>
                  </div>
                </div>
              )}

              {dossierTab === 'telemetry' && (
                <div className="space-y-3 font-mono-code">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="bg-[#030a17] p-3 rounded-lg border border-[#0e2a4a]">
                      <span className="text-slate-400 text-[10px] block">Organização Social</span>
                      <span className="text-xs font-bold text-emerald-400">{selectedGlobalProgram.socialOrganization}</span>
                    </div>
                    <div className="bg-[#030a17] p-3 rounded-lg border border-[#0e2a4a]">
                      <span className="text-slate-400 text-[10px] block">Sistema de IA</span>
                      <span className="text-xs font-bold text-cyan-400">{selectedGlobalProgram.aiAutonomy.systemName}</span>
                    </div>
                    <div className="bg-[#030a17] p-3 rounded-lg border border-[#0e2a4a]">
                      <span className="text-slate-400 text-[10px] block">Sobreviventes</span>
                      <span className="text-xs font-bold text-amber-400">{selectedGlobalProgram.estimatedSurvivors}</span>
                    </div>
                    <div className="bg-[#030a17] p-3 rounded-lg border border-[#0e2a4a]">
                      <span className="text-slate-400 text-[10px] block">Status Geral</span>
                      <span className="text-xs font-bold text-white">{selectedGlobalProgram.currentStatus}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer with Direct Actions */}
            <div className="sticky bottom-0 bg-[#030a17]/98 border-t border-[#0e2a4a] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
              <div className="flex items-center gap-2">
                {onNavigateToAtlas && (
                  <button
                    onClick={() => {
                      audioService.playPhaseTransition();
                      onNavigateToAtlas();
                      setSelectedGlobalProgram(null);
                    }}
                    className="px-3 py-2 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-400 text-xs font-mono-code font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Globe2 className="w-4 h-4" />
                    <span>Ver no Atlas 2D</span>
                  </button>
                )}
                {onNavigateTo3D && (
                  <button
                    onClick={() => {
                      audioService.playPhaseTransition();
                      onNavigateTo3D();
                      setSelectedGlobalProgram(null);
                    }}
                    className="px-3 py-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-400 text-xs font-mono-code font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Box className="w-4 h-4" />
                    <span>Ver no Domínio 3D</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedGlobalProgram(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono-code cursor-pointer"
              >
                Fechar Dossiê
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JAPANESE TEAM DETAIL MODAL */}
      {selectedJapanTeam && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-[#020713] border border-cyan-500/60 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[0_0_40px_rgba(6,182,212,0.3)] flex flex-col justify-between">
            <div className="sticky top-0 bg-[#030a17]/98 border-b border-[#0e2a4a] p-4 sm:p-5 flex items-start justify-between gap-3 z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full" style={{ backgroundColor: selectedJapanTeam.color }} />
                <div>
                  <span className="text-xs font-mono-code font-bold uppercase text-cyan-400 tracking-wider">
                    TEATRO ARQUIPÉLAGO • LÍDER: {selectedJapanTeam.effectiveLeadership}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-white font-sans mt-0.5">
                    {selectedJapanTeam.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedJapanTeam(null)}
                className="p-1.5 text-slate-400 hover:text-white bg-[#050e1c] border border-[#0e2a4a] rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 text-xs text-slate-200 font-sans leading-relaxed">
              <div className="bg-[#030a17] border border-[#0e2a4a] rounded-xl p-4 space-y-2">
                <h4 className="text-sm font-bold text-cyan-300 font-mono-code uppercase">
                  Função Primária de Estado &amp; Missão
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedJapanTeam.primaryStateFunction}
                </p>
              </div>

              <div className="bg-[#030a17] border border-[#0e2a4a] rounded-xl p-4 space-y-2">
                <h4 className="text-sm font-bold text-amber-300 font-mono-code uppercase">
                  Ponto de Ruptura &amp; Trauma do Biopoder
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedJapanTeam.criticalRupture}
                </p>
              </div>

              <div className="bg-[#030a17] border border-[#0e2a4a] rounded-xl p-4 space-y-2">
                <h4 className="text-sm font-bold text-emerald-300 font-mono-code uppercase">
                  Epílogo &amp; Destino Histórico
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedJapanTeam.epilogueDestiny}
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#030a17]/98 border-t border-[#0e2a4a] p-4 sm:p-5 flex items-center justify-end gap-3 backdrop-blur-md">
              <button
                onClick={() => setSelectedJapanTeam(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono-code cursor-pointer"
              >
                Fechar Dossiê
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
