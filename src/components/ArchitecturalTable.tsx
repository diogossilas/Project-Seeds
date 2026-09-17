import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Globe2, 
  Compass, 
  FileSpreadsheet, 
  AlertTriangle,
  Cpu,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
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
}

export const ArchitecturalTable: React.FC<ArchitecturalTableProps> = ({ 
  onSelectTeam,
  onNavigateTo3D,
  onNavigateToAtlas
}) => {
  const [tableScope, setTableScope] = useState<'global' | 'japan'>('global');
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

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

  return (
    <div className="space-y-6">
      {/* Table Master Header */}
      <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono-code font-bold uppercase">
                SEÇÃO II • TABELA MESTRA GLOBAL
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                CLASSIFICAÇÃO AKÁSHICA CLASSE ÔMEGA
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
              Programas Continentais, Abrigos de Ruptura &amp; Sucessões de Poder
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl">
              Cruzamento de todas as frentes instituídas: arquiteturas de abrigo, triagens populacionais, 
              reconfiguração dos biomas pós-impacto, pontos de ruptura contra o biopoder e cenários atuais de sobrevivência.
            </p>
          </div>

          {/* Action Export Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="export-csv-btn"
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Exportar Tabela Mestra em formato CSV (Planilha)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>CSV</span>
            </button>
            <button
              id="export-json-btn"
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Exportar Matriz em Formato JSON Completo"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>JSON</span>
            </button>
            <button
              id="copy-clipboard-btn"
              onClick={handleCopyClipboard}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>{copiedNotification ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Scope Selector: Global Programs vs Japanese 7 Seeds Matrix */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-1.5 bg-[#080d16] p-1 rounded-xl border border-slate-700/80 w-full sm:w-auto">
            <button
              onClick={() => {
                audioService.playNodeSelect();
                setTableScope('global');
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer ${
                tableScope === 'global'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200'
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
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer ${
                tableScope === 'japan'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200'
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
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                  regionFilter === 'all'
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setRegionFilter('americas')}
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                  regionFilter === 'americas'
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Américas (3)
              </button>
              <button
                onClick={() => setRegionFilter('eurasia')}
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                  regionFilter === 'eurasia'
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Europa / Eurásia / Rússia (3)
              </button>
              <button
                onClick={() => setRegionFilter('asia_pacific')}
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                  regionFilter === 'asia_pacific'
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Ásia / Índia / China / Japão (3)
              </button>
              <button
                onClick={() => setRegionFilter('polar_lunar')}
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                  regionFilter === 'polar_lunar'
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
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
            className="w-full bg-[#080d16] border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-colors"
          />
        </div>
      </div>

      {/* TABLE CONTENT */}
      {tableScope === 'global' ? (
        /* GLOBAL CONTINENTAL PROGRAMS TABLE */
        <div className="bg-[#0d131f] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#090e18] border-b border-slate-800 text-slate-400 font-mono-code uppercase tracking-wider text-[11px]">
                  <th className="p-4 min-w-[200px]">Continente / Região (Polos)</th>
                  <th className="p-4 min-w-[210px]">Nome do Programa / Projeto Local</th>
                  <th className="p-4 min-w-[240px]">Engenharia de Abrigo &amp; Localização</th>
                  <th className="p-4 min-w-[240px]">Critério de Seleção &amp; Perfil</th>
                  <th className="p-4 min-w-[260px]">Reconfiguração do Bioma Pós-Impacto</th>
                  <th className="p-4 min-w-[260px]">Ponto Crítico de Ruptura / Poder</th>
                  <th className="p-4 min-w-[240px]">Status Histórico Atual &amp; Cenário</th>
                  <th className="p-4 text-center w-16">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredGlobalPrograms.map((prog) => {
                  const isExpanded = expandedRowId === prog.id;
                  return (
                    <React.Fragment key={prog.id}>
                      <tr 
                        className={`hover:bg-slate-800/40 transition-colors ${
                          isExpanded ? 'bg-slate-800/30' : ''
                        }`}
                      >
                        {/* 1. Continente / Região */}
                        <td className="p-4 align-top">
                          <div className="flex items-start gap-2">
                            <span 
                              className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" 
                              style={{ backgroundColor: prog.color }} 
                            />
                            <div>
                              <div className="font-bold text-white text-sm font-display">
                                {prog.region}
                              </div>
                              <span className="text-[10px] font-mono-code text-slate-400 block mt-0.5">
                                Lat {prog.coordinates.lat}°, Lng {prog.coordinates.lng}°
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 2. Nome do Programa */}
                        <td className="p-4 align-top">
                          <div className="font-semibold text-cyan-300 text-xs font-mono-code">
                            {prog.programName}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            {prog.coordinates.locationName}
                          </div>
                        </td>

                        {/* 3. Engenharia de Abrigo */}
                        <td className="p-4 align-top text-slate-300 leading-relaxed">
                          {prog.shelterEngineering}
                        </td>

                        {/* 4. Critério de Seleção */}
                        <td className="p-4 align-top text-slate-300 leading-relaxed">
                          {prog.selectionCriteria}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {prog.populationProfile.map((p, idx) => (
                              <span key={idx} className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                                {p}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* 5. Reconfiguração do Bioma */}
                        <td className="p-4 align-top">
                          <div className="bg-[#080d16] p-2.5 rounded-xl border border-slate-800 text-emerald-200/90 leading-relaxed">
                            <span className="font-bold text-emerald-400 font-mono-code text-[11px] block mb-1">
                              {prog.biomeShortName}
                            </span>
                            {prog.biomeReconfiguration}
                          </div>
                        </td>

                        {/* 6. Ponto Crítico de Ruptura */}
                        <td className="p-4 align-top">
                          <div className="bg-amber-950/20 border border-amber-500/30 p-2.5 rounded-xl text-amber-100/90 leading-relaxed">
                            {prog.criticalRupture}
                          </div>
                        </td>

                        {/* 7. Status Histórico Atual */}
                        <td className="p-4 align-top">
                          <div className="space-y-1.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-bold ${
                              prog.statusLevel === 'prosperous' || prog.statusLevel === 'symbiotic'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : prog.statusLevel === 'critical'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {prog.statusLabel}
                            </span>
                            <p className="text-slate-300 leading-relaxed">
                              {prog.currentStatus}
                            </p>
                          </div>
                        </td>

                        {/* Expand Details Trigger */}
                        <td className="p-4 align-top text-center">
                          <button
                            onClick={() => setExpandedRowId(isExpanded ? null : prog.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                            title={isExpanded ? "Recolher detalhes" : "Expandir análise multissetorial"}
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded In-Depth Row for Global Program */}
                      {isExpanded && (
                        <tr className="bg-slate-900/70 border-b border-slate-800">
                          <td colSpan={8} className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* IA Collapse Incident */}
                              <div className="bg-[#080d16] border border-rose-500/30 rounded-xl p-4 space-y-1.5">
                                <div className="flex items-center gap-2 text-rose-400 font-mono-code text-xs font-bold uppercase">
                                  <Cpu className="w-4 h-4" />
                                  <span>Colapso da IA ({prog.aiAutonomy.systemName})</span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {prog.aiAutonomy.incident}
                                </p>
                              </div>

                              {/* Traditional Knowledge Factor */}
                              <div className="bg-[#080d16] border border-emerald-500/30 rounded-xl p-4 space-y-1.5">
                                <div className="flex items-center justify-between text-emerald-400 font-mono-code text-xs font-bold uppercase">
                                  <span className="flex items-center gap-1.5">
                                    <Sprout className="w-4 h-4" />
                                    <span>Saber Tradicional: {prog.traditionalKnowledge.domain}</span>
                                  </span>
                                  <span className="text-[11px] text-emerald-300">
                                    {prog.traditionalKnowledge.effectivenessRating}% Eficácia
                                  </span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {prog.traditionalKnowledge.factor}
                                </p>
                              </div>

                              {/* Social Model & Vectors */}
                              <div className="bg-[#080d16] border border-slate-800 rounded-xl p-4 space-y-1.5">
                                <div className="text-cyan-400 font-mono-code text-xs font-bold uppercase">
                                  Organização Social &amp; Conexão
                                </div>
                                <p className="text-xs text-slate-300">
                                  <strong className="text-white">Estrutura:</strong> {prog.socialOrganization}
                                </p>
                                <p className="text-xs text-slate-400">
                                  <strong className="text-slate-300">Conexão Marítima:</strong> {prog.transoceanicConnection}
                                </p>
                                <div className="pt-2 flex items-center gap-2 text-[11px] font-mono-code text-slate-400">
                                  <span>Vetor 3D:</span>
                                  <span className="text-emerald-400">X:{prog.spatial3D.x}</span>
                                  <span className="text-cyan-400">Y:{prog.spatial3D.y}</span>
                                  <span className="text-amber-400">Z:{prog.spatial3D.z}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* JAPANESE 7 SEEDS ARCHIPELAGO TABLE */
        <div className="bg-[#0d131f] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#090e18] border-b border-slate-800 text-slate-400 font-mono-code uppercase tracking-wider text-[11px]">
                  <th className="p-4 w-48">Núcleo / Equipe</th>
                  <th className="p-4 min-w-[240px]">Função Primária de Estado</th>
                  <th className="p-4 min-w-[180px]">Guia / Liderança Pré-Impacto</th>
                  <th className="p-4 min-w-[190px]">Liderança de Campo pós-Despertar</th>
                  <th className="p-4 min-w-[260px]">Ponto Crítico de Ruptura</th>
                  <th className="p-4 min-w-[220px]">Função Real na Convergência (Sado)</th>
                  <th className="p-4 min-w-[240px]">Destino e Papel no Epílogo</th>
                  <th className="p-4 text-center w-20">Detalhes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTeams.map((team) => {
                  const isExpanded = expandedRowId === team.id;
                  return (
                    <React.Fragment key={team.id}>
                      <tr 
                        className={`hover:bg-slate-800/40 transition-colors ${
                          isExpanded ? 'bg-slate-800/30' : ''
                        }`}
                      >
                        <td className="p-4 align-top">
                          <div className="flex items-start gap-2.5">
                            <span 
                              className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" 
                              style={{ backgroundColor: team.color }} 
                            />
                            <div>
                              <div className="font-bold text-white text-sm font-display flex items-center gap-1.5">
                                {team.name}
                              </div>
                              <span className="text-[10px] font-mono-code text-slate-400 block mt-0.5">
                                {team.coordinates.region}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 align-top text-slate-300 leading-relaxed">
                          {team.primaryStateFunction}
                        </td>

                        <td className="p-4 align-top text-slate-300 leading-relaxed">
                          {team.preImpactLeadership}
                        </td>

                        <td className="p-4 align-top text-slate-200 font-semibold leading-relaxed">
                          {team.effectiveLeadership}
                        </td>

                        <td className="p-4 align-top">
                          <div className="bg-amber-950/20 border border-amber-500/30 p-2.5 rounded-xl text-amber-200 leading-relaxed">
                            {team.criticalRupture}
                          </div>
                        </td>

                        <td className="p-4 align-top text-slate-300 leading-relaxed">
                          {team.sadoConvergenceRole}
                        </td>

                        <td className="p-4 align-top text-slate-300 leading-relaxed">
                          {team.epilogueDestiny}
                        </td>

                        <td className="p-4 align-top text-center">
                          <button
                            onClick={() => setExpandedRowId(isExpanded ? null : team.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-slate-900/60 border-b border-slate-800">
                          <td colSpan={8} className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-[#080d16] border border-slate-800 rounded-xl p-3.5 space-y-1">
                                <div className="text-[11px] font-mono-code text-slate-400 uppercase font-bold">Membros Notáveis</div>
                                <div className="text-xs text-slate-200">{team.keyMembers.join(', ')}</div>
                                <div className="text-[11px] text-emerald-400 mt-1 font-mono-code">Sobreviventes: {team.survivalCount}</div>
                              </div>
                              <div className="bg-[#080d16] border border-slate-800 rounded-xl p-3.5 space-y-1">
                                <div className="text-[11px] font-mono-code text-slate-400 uppercase font-bold">Métricas Ômega</div>
                                <div className="text-xs text-slate-300 flex justify-between">
                                  <span>Resiliência: {team.metrics.resilience}%</span>
                                  <span>Empatia: {team.metrics.empathy}%</span>
                                </div>
                                <div className="text-xs text-slate-300 flex justify-between">
                                  <span>Técnica: {team.metrics.technicalSkill}%</span>
                                  <span>Sobrevivência: {team.metrics.survivalRate}%</span>
                                </div>
                              </div>
                              <div className="bg-[#080d16] border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                                <div>
                                  <div className="text-[11px] font-mono-code text-slate-400 uppercase font-bold">Ação Direta</div>
                                  <p className="text-xs text-slate-300">Inspecionar nó no mapa do Japão</p>
                                </div>
                                {onSelectTeam && (
                                  <button
                                    onClick={() => onSelectTeam(team)}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono-code flex items-center gap-1"
                                  >
                                    <span>Ir ao Mapa</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
