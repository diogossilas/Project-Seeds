import React, { useState } from 'react';
import { 
  Radar as RadarIcon, 
  TrendingUp, 
  BarChart2, 
  ShieldCheck, 
  Radio, 
  Maximize2,
  Minimize2,
  Layers
} from 'lucide-react';
import { TEAMS_DATA } from '../../data/sevenSeedsData';
import { TeamData } from '../../types';
import { audioService } from '../../services/audioService';

interface HeroOperationalChartProps {
  selectedTeam: TeamData | null;
  onSelectTeam: (team: TeamData) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

type HeroTab = 'radar' | 'timeline' | 'comparison';

export const HeroOperationalChart: React.FC<HeroOperationalChartProps> = ({
  selectedTeam,
  onSelectTeam,
  isExpanded = false,
  onToggleExpand,
}) => {
  const [activeTab, setActiveTab] = useState<HeroTab>('radar');
  const currentTeam = selectedTeam || TEAMS_DATA[0];

  const handleTabChange = (tab: HeroTab) => {
    audioService.playNodeSelect();
    setActiveTab(tab);
  };

  // Tactical Radar Dimensions (0-100 scale projected into polygon)
  const radarAxes = [
    { key: 'resilience', label: 'Resiliência', angle: 0 },
    { key: 'empathy', label: 'Coesão / Empatia', angle: 72 },
    { key: 'technicalSkill', label: 'Técnica & Combate', angle: 144 },
    { key: 'stateSubjugation', label: 'Autonomia', angle: 216, invert: true },
    { key: 'adaptation', label: 'Adaptação Biocêntrica', angle: 288 },
  ];

  const centerX = 150;
  const centerY = 140;
  const radius = 95;

  const getAxisPoint = (angleDeg: number, val: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    const r = (val / 100) * radius;
    return {
      x: centerX + r * Math.cos(rad),
      y: centerY + r * Math.sin(rad),
    };
  };

  // Calculate polygon points for team metrics
  const getTeamPolygon = (team: TeamData) => {
    return radarAxes
      .map((axis) => {
        let val = 70;
        if (axis.key === 'resilience') val = team.metrics.resilience;
        else if (axis.key === 'empathy') val = team.metrics.empathy;
        else if (axis.key === 'technicalSkill') val = team.metrics.technicalSkill;
        else if (axis.key === 'stateSubjugation') val = 100 - team.metrics.stateSubjugation; // Invert to show emancipation
        else if (axis.key === 'adaptation') val = team.metrics.resilience * 0.5 + team.metrics.empathy * 0.5;

        const pt = getAxisPoint(axis.angle, val);
        return `${pt.x},${pt.y}`;
      })
      .join(' ');
  };

  // Average of all teams for baseline comparison
  const getAveragePolygon = () => {
    return radarAxes
      .map((axis) => {
        const avg = Math.round(
          TEAMS_DATA.reduce((acc, t) => {
            let val = 70;
            if (axis.key === 'resilience') val = t.metrics.resilience;
            else if (axis.key === 'empathy') val = t.metrics.empathy;
            else if (axis.key === 'technicalSkill') val = t.metrics.technicalSkill;
            else if (axis.key === 'stateSubjugation') val = 100 - t.metrics.stateSubjugation;
            else if (axis.key === 'adaptation') val = t.metrics.resilience * 0.5 + t.metrics.empathy * 0.5;
            return acc + val;
          }, 0) / TEAMS_DATA.length
        );
        const pt = getAxisPoint(axis.angle, avg);
        return `${pt.x},${pt.y}`;
      })
      .join(' ');
  };

  // Timeline phases
  const timelinePhases = [
    { phase: 'Fase 1: Despertar', year: 'Ano 0', count: 35, note: '35 Recrutas em 5 Arcas' },
    { phase: 'Fase 2: Choque Inicial', year: 'Mês 3', count: 32, note: 'Primeiras Baixas e Reconhecimento' },
    { phase: 'Fase 3: Queda dos Guias', year: 'Ano 1', count: 30, note: 'Ruptura da Tutela Estatal' },
    { phase: 'Fase 4: Travessia & Ryūgū', year: 'Ano 2', count: 29, note: 'Colapso de Ryūgū e Marcha para Sado' },
    { phase: 'Fase 5: Convergência Sado', year: 'Epílogo', count: 29, note: '100% Unificados na 8ª Arca Fuji' },
  ];

  return (
    <div className="bg-[#050b14] border border-[#1e293b] p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Background Subtle Tech Accent */}
      <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -top-16 w-80 h-80 bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Header of Hero Graphic */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1e293b]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 text-xs font-mono-code font-bold uppercase flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              GRÁFICO HERO • CENTRO DE INTELIGÊNCIA OPERACIONAL
            </span>
            <span className="text-xs font-mono-code text-slate-400 hidden sm:inline">
              ANÁLISE ESTRATÉGICA EM TEMPO REAL
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-sans text-white mt-1">
            {activeTab === 'radar' && 'Radar Multidimensional de Prontidão e Desempenho Tático'}
            {activeTab === 'timeline' && 'Curva de Sobrevivência e Eixo Temporal de Convergência'}
            {activeTab === 'comparison' && 'Matriz Comparativa de Efetivo e Capacidade Operacional'}
          </h3>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex bg-[#010613] border border-[#1e293b] p-1">
            <button
              id="hero-tab-radar"
              onClick={() => handleTabChange('radar')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-code font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                activeTab === 'radar'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              <RadarIcon className="w-3.5 h-3.5" />
              <span>Radar Tático</span>
            </button>
            <button
              id="hero-tab-timeline"
              onClick={() => handleTabChange('timeline')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-code font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                activeTab === 'timeline'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Curva Temporal</span>
            </button>
            <button
              id="hero-tab-comparison"
              onClick={() => handleTabChange('comparison')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono-code font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                activeTab === 'comparison'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Matriz Setorial</span>
            </button>
          </div>

          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              title={isExpanded ? 'Visualização Dividida' : 'Expandir Gráfico Hero'}
              className="p-1.5 bg-[#010613] border border-[#1e293b] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Main Body of Hero Graphic */}
      <div className="relative z-10 pt-4">
        {/* ============================================================ */}
        {/* TAB 1: RADAR TÁTICO MULTIDIMENSIONAL */}
        {/* ============================================================ */}
        {activeTab === 'radar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Interactive Vector Radar (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                <svg viewBox="0 0 300 280" className="w-full h-full overflow-visible">
                  {/* Concentric Radar Grid Rings (20%, 40%, 60%, 80%, 100%) */}
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((step, idx) => {
                    const r = radius * step;
                    const pts = radarAxes
                      .map((axis) => {
                        const pt = getAxisPoint(axis.angle, step * 100);
                        return `${pt.x},${pt.y}`;
                      })
                      .join(' ');
                    return (
                      <polygon
                        key={idx}
                        points={pts}
                        fill="none"
                        stroke="#334155"
                        strokeWidth="0.8"
                        strokeDasharray={idx === 4 ? 'none' : '2,2'}
                        opacity={0.6}
                      />
                    );
                  })}

                  {/* Radar Axes Spoke Lines */}
                  {radarAxes.map((axis, idx) => {
                    const endPt = getAxisPoint(axis.angle, 100);
                    return (
                      <g key={idx}>
                        <line
                          x1={centerX}
                          y1={centerY}
                          x2={endPt.x}
                          y2={endPt.y}
                          stroke="#334155"
                          strokeWidth="0.8"
                        />
                        {/* Axis Labels positioned outside */}
                        {(() => {
                          const rad = ((axis.angle - 90) * Math.PI) / 180;
                          const labelR = radius + 22;
                          const lx = centerX + labelR * Math.cos(rad);
                          const ly = centerY + labelR * Math.sin(rad);
                          return (
                            <text
                              x={lx}
                              y={ly}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="#94a3b8"
                              fontSize="9.5"
                              fontFamily="system-ui, sans-serif"
                              fontWeight="600"
                              className="select-none"
                            >
                              {axis.label}
                            </text>
                          );
                        })()}
                      </g>
                    );
                  })}

                  {/* Baseline: Japanese Forces Average Polygon */}
                  <polygon
                    points={getAveragePolygon()}
                    fill="#38bdf8"
                    fillOpacity="0.08"
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                    strokeDasharray="3,3"
                  />

                  {/* Active Unit Polygon */}
                  <polygon
                    points={getTeamPolygon(currentTeam)}
                    fill={currentTeam.color}
                    fillOpacity="0.3"
                    stroke={currentTeam.color}
                    strokeWidth="2.2"
                    className="transition-all duration-300"
                  />

                  {/* Active Unit Vertex Points */}
                  {radarAxes.map((axis, idx) => {
                    let val = 70;
                    if (axis.key === 'resilience') val = currentTeam.metrics.resilience;
                    else if (axis.key === 'empathy') val = currentTeam.metrics.empathy;
                    else if (axis.key === 'technicalSkill') val = currentTeam.metrics.technicalSkill;
                    else if (axis.key === 'stateSubjugation') val = 100 - currentTeam.metrics.stateSubjugation;
                    else if (axis.key === 'adaptation') val = currentTeam.metrics.resilience * 0.5 + currentTeam.metrics.empathy * 0.5;

                    const pt = getAxisPoint(axis.angle, val);
                    return (
                      <rect
                        key={idx}
                        x={pt.x - 3.5}
                        y={pt.y - 3.5}
                        width="7"
                        height="7"
                        fill={currentTeam.color}
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Radar Legend */}
              <div className="flex items-center gap-4 mt-2 text-xs font-mono-code text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-cyan-400" />
                  <span>Média das 7 Forças</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span 
                    className="w-3 h-3" 
                    style={{ backgroundColor: currentTeam.color }} 
                  />
                  <span className="text-white font-bold">{currentTeam.name}</span>
                </span>
              </div>
            </div>

            {/* Right: Detailed Vector Scores for Selected Unit (5 cols) */}
            <div className="lg:col-span-5 bg-[#010613] border border-[#1e293b] p-4 space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3" 
                    style={{ backgroundColor: currentTeam.color }} 
                  />
                  <span className="font-bold text-white font-sans text-sm">
                    {currentTeam.name}
                  </span>
                  <span className="text-xs text-slate-400 font-mono-code">
                    [{currentTeam.coordinates.region}]
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#050b14] text-emerald-400 font-mono-code text-xs font-bold border border-[#1e293b]">
                  {currentTeam.survivalCount} Vidas
                </span>
              </div>

              {/* Progress Bars for the 5 Metrics */}
              <div className="space-y-2.5 font-mono-code text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Resiliência Operacional:</span>
                    <span className="text-white font-bold">{currentTeam.metrics.resilience}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#050b14] border border-[#1e293b] overflow-hidden">
                    <div 
                      className="h-full transition-all duration-300"
                      style={{ width: `${currentTeam.metrics.resilience}%`, backgroundColor: currentTeam.color }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Coesão &amp; Empatia do Grupo:</span>
                    <span className="text-emerald-400 font-bold">{currentTeam.metrics.empathy}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#050b14] border border-[#1e293b] overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 transition-all duration-300"
                      style={{ width: `${currentTeam.metrics.empathy}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Proficiência Técnica:</span>
                    <span className="text-cyan-400 font-bold">{currentTeam.metrics.technicalSkill}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#050b14] border border-[#1e293b] overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 transition-all duration-300"
                      style={{ width: `${currentTeam.metrics.technicalSkill}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Autonomia (Ruptura Estatal):</span>
                    <span className="text-amber-400 font-bold">{100 - currentTeam.metrics.stateSubjugation}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#050b14] border border-[#1e293b] overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 transition-all duration-300"
                      style={{ width: `${100 - currentTeam.metrics.stateSubjugation}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Unit Selector Inside Hero */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] uppercase font-mono-code text-slate-400 block mb-1.5">
                  Alternar Unidade no Gráfico:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {TEAMS_DATA.map((t) => {
                    const isSelected = t.id === currentTeam.id;
                    const code = 
                      t.id === 'inverno' ? 'INV' :
                      t.id === 'primavera' ? 'PRI' :
                      t.id === 'verao-a' ? 'VR-A' :
                      t.id === 'verao-b' ? 'VR-B' :
                      t.id === 'outono' ? 'OUT' :
                      t.id === 'ryugu' ? 'RYU' : 'SADO';
                    return (
                      <button
                        key={t.id}
                        id={`hero-select-${t.id}`}
                        onClick={() => onSelectTeam(t)}
                        className={`px-2 py-1 text-[11px] font-mono-code font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#1e293b] text-white border-cyan-400 shadow-sm'
                            : 'bg-[#010613] text-slate-400 hover:text-slate-200 border-[#1e293b]'
                        }`}
                      >
                        {code}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: CURVA DE SOBREVIVÊNCIA E TIMELINE */}
        {/* ============================================================ */}
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <div className="bg-[#010613] border border-[#1e293b] p-4">
              <div className="flex items-center justify-between mb-3 text-xs font-mono-code text-slate-400">
                <span>Evolução do Efetivo Humano (35 Recrutas Iniciais &rarr; 29 Sobreviventes Finais)</span>
                <span className="text-emerald-400 font-bold">Taxa de Preservação: 82.8%</span>
              </div>

              {/* Timeline Horizontal Stepper / Progress */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {timelinePhases.map((phase, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#050b14] border border-[#1e293b] p-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono-code text-slate-400 uppercase">{phase.year}</span>
                        <span className="text-sm font-bold font-mono-code text-emerald-400">{phase.count} vidas</span>
                      </div>
                      <h4 className="text-xs font-bold text-white font-sans mt-1">{phase.phase}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-tight">{phase.note}</p>
                    </div>
                    <div className="mt-3 w-full bg-[#010613] h-2 border border-[#1e293b] overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full" 
                        style={{ width: `${(phase.count / 35) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Insight */}
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-xs font-sans text-slate-200 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-emerald-300">Conclusão de Estado-Maior: </strong>
                A perda de 6 vidas ocorreu no choque inicial e no colapso institucional de Ryūgū. 
                A partir do momento em que as 5 equipes sazonais romperam com os guias oficiais e assumiram autogestão biocêntrica, 
                a taxa de sobrevivência atingiu 100% de estabilidade até a unificação final na Ilha de Sado.
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: MATRIZ SETORIAL COMPARATIVA */}
        {/* ============================================================ */}
        {activeTab === 'comparison' && (
          <div className="bg-[#010613] border border-[#1e293b] p-4 overflow-x-auto">
            <table className="w-full text-left font-mono-code text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="pb-2.5">Setor / Força</th>
                  <th className="pb-2.5">Região</th>
                  <th className="pb-2.5">Liderança Orgânica</th>
                  <th className="pb-2.5 text-center">Efetivo</th>
                  <th className="pb-2.5 text-center">Resiliência</th>
                  <th className="pb-2.5 text-center">Coesão</th>
                  <th className="pb-2.5 text-center">Autonomia</th>
                  <th className="pb-2.5 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {TEAMS_DATA.map((team) => {
                  const isSelected = team.id === currentTeam.id;
                  const isFuji = team.id === 'arca-fuji';
                  const isRyugu = team.id === 'ryugu';

                  return (
                    <tr 
                      key={team.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isSelected ? 'bg-slate-800/70 text-white font-semibold' : 'text-slate-300'
                      }`}
                    >
                      <td className="py-2.5 flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 shrink-0" 
                          style={{ backgroundColor: team.color }} 
                        />
                        <span className="font-sans font-bold">{team.name}</span>
                      </td>
                      <td className="py-2.5 text-slate-400">{team.coordinates.region}</td>
                      <td className="py-2.5 text-emerald-400 font-sans">{team.effectiveLeadership}</td>
                      <td className="py-2.5 text-center">
                        <span className={`px-2 py-0.5 text-[11px] font-bold border ${
                          isRyugu ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' :
                          isFuji ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        }`}>
                          {team.survivalCount}
                        </span>
                      </td>
                      <td className="py-2.5 text-center">{team.metrics.resilience}%</td>
                      <td className="py-2.5 text-center">{team.metrics.empathy}%</td>
                      <td className="py-2.5 text-center text-amber-400">
                        {100 - team.metrics.stateSubjugation}%
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => onSelectTeam(team)}
                          className="px-2 py-0.5 bg-[#050b14] hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 text-[10px] border border-[#1e293b] hover:border-cyan-500/50 transition-colors cursor-pointer"
                        >
                          Inspecionar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
