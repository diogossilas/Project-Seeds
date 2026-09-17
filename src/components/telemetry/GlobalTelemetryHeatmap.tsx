import React, { useState, useMemo } from 'react';
import { Flame, ArrowUpDown, Info, ShieldAlert, Mountain } from 'lucide-react';
import { GLOBAL_HEATMAP_DATA, HEATMAP_METRIC_KEYS } from '../../data/omegaTelemetryData';
import { GlobalFacilityVulnerability } from '../../types';
import { audioService } from '../../services/audioService';

export const GlobalTelemetryHeatmap: React.FC = () => {
  const [sortKey, setSortKey] = useState<keyof GlobalFacilityVulnerability | 'compositeSeverity'>('compositeSeverity');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<GlobalFacilityVulnerability | null>(null);

  const sortedData = useMemo(() => {
    return [...GLOBAL_HEATMAP_DATA].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return 0;
    });
  }, [sortKey, sortAsc]);

  const handleSort = (key: keyof GlobalFacilityVulnerability | 'compositeSeverity') => {
    audioService.playNodeSelect();
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  /**
   * Seaborn YlOrRd color interpolation for severity 0 to 10.
   */
  const getSeverityBgColor = (val: number) => {
    if (val <= 2) return 'bg-yellow-300 text-slate-900';
    if (val <= 4) return 'bg-amber-400 text-slate-950';
    if (val <= 6) return 'bg-orange-500 text-white';
    if (val <= 8) return 'bg-rose-600 text-white';
    return 'bg-red-800 text-rose-100 font-extrabold';
  };

  const getSeverityHex = (val: number) => {
    if (val <= 2) return '#fde047'; // yellow-300
    if (val <= 4) return '#fbbf24'; // amber-400
    if (val <= 6) return '#f97316'; // orange-500
    if (val <= 8) return '#e11d48'; // rose-600
    return '#991b1b'; // red-800
  };

  return (
    <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono-code font-bold uppercase flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              MODELO 2 • MATRIZ DE CALOR (HEATMAP SEABORN)
            </span>
            <span className="text-[11px] font-mono-code text-slate-400">
              ESCALA DE SEVERIDADE DE IMPACTO (0 A 10)
            </span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mt-1">
            Matriz de Vulnerabilidade Sistêmica nos Complexos Seeds Globais
          </h3>
        </div>

        {/* Color Legend Bar */}
        <div className="flex items-center gap-2 font-mono-code text-[11px] text-slate-400 self-start sm:self-auto">
          <span>0 (Baixo)</span>
          <div className="flex h-3 w-32 rounded overflow-hidden border border-slate-700">
            <div className="flex-1 bg-yellow-300" />
            <div className="flex-1 bg-amber-400" />
            <div className="flex-1 bg-orange-500" />
            <div className="flex-1 bg-rose-600" />
            <div className="flex-1 bg-red-800" />
          </div>
          <span>10 (Crítico)</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Evidencia a correlação cruzada entre o perfil estrutural do refúgio (altitude e autonomia) e as falhas catastróficas registradas nos relatórios continentais e lunares.
      </p>

      {/* Heatmap Interactive Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-[#080d16]">
        <table className="w-full text-left font-mono-code text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
              <th className="p-3 font-semibold">
                <button
                  onClick={() => handleSort('facility')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Instalação / Região</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </button>
              </th>
              <th className="p-3 text-center">
                <button
                  onClick={() => handleSort('altitudeMeters')}
                  className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                  title="Altitude em relação ao nível do mar"
                >
                  <Mountain className="w-3 h-3 text-slate-400" />
                  <span>Altitude</span>
                </button>
              </th>
              {HEATMAP_METRIC_KEYS.map((m) => (
                <th key={m.key} className="p-3 text-center">
                  <button
                    onClick={() => handleSort(m.key as keyof GlobalFacilityVulnerability)}
                    className="inline-flex flex-col items-center hover:text-white transition-colors cursor-pointer"
                    title={m.desc}
                  >
                    <span>{m.label}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500 mt-0.5" />
                  </button>
                </th>
              ))}
              <th className="p-3 text-center">
                <button
                  onClick={() => handleSort('compositeSeverity')}
                  className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer font-bold"
                >
                  <span>Média (0-10)</span>
                  <ArrowUpDown className="w-3 h-3 text-rose-400" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sortedData.map((item) => {
              const isSelected = selectedFacility?.facility === item.facility;
              return (
                <tr
                  key={item.facility}
                  id={`heatmap-row-${item.facility.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`transition-colors cursor-pointer ${
                    isSelected ? 'bg-slate-800/90' : 'hover:bg-slate-900/60'
                  }`}
                  onClick={() => {
                    audioService.playNodeSelect();
                    setSelectedFacility(isSelected ? null : item);
                  }}
                >
                  <td className="p-3">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {item.facility}
                    </div>
                    <div className="text-[10px] text-slate-400">{item.region}</div>
                  </td>

                  <td className="p-3 text-center text-[11px] text-slate-400">
                    <span className={item.altitudeMeters >= 2500 ? 'text-emerald-400 font-bold' : item.altitudeMeters <= 0 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                      {item.altitudeMeters > 0 ? `+${item.altitudeMeters}m` : `${item.altitudeMeters}m`}
                    </span>
                  </td>

                  {HEATMAP_METRIC_KEYS.map((m) => {
                    const val = item[m.key as keyof GlobalFacilityVulnerability] as number;
                    return (
                      <td key={m.key} className="p-2 text-center">
                        <span
                          className={`inline-block w-8 py-1 rounded text-center font-bold text-[11px] shadow-sm transition-transform hover:scale-110 ${getSeverityBgColor(
                            val
                          )}`}
                        >
                          {val}
                        </span>
                      </td>
                    );
                  })}

                  <td className="p-3 text-center font-bold text-rose-300">
                    <span
                      className="px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${getSeverityHex(item.compositeSeverity)}25` }}
                    >
                      {item.compositeSeverity.toFixed(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Facility Deep Dive */}
      {selectedFacility && (
        <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-700/80 animate-fade-in font-mono-code text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white text-sm">{selectedFacility.facility}</span>
              <span className="text-slate-400 text-[11px]">({selectedFacility.country})</span>
            </div>
            <span className="text-emerald-400 font-semibold text-[11px]">
              Resultado: {selectedFacility.dominantOutcome}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] mt-2">
            {HEATMAP_METRIC_KEYS.map((m) => {
              const val = selectedFacility[m.key as keyof GlobalFacilityVulnerability] as number;
              return (
                <div key={m.key} className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] truncate">{m.label}</div>
                  <div className="text-lg font-bold mt-0.5" style={{ color: getSeverityHex(val) }}>
                    {val} / 10
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2 text-[11px] text-slate-300 flex items-center justify-between">
            <span>
              Altitude do Refúgio: <strong className="text-cyan-400">{selectedFacility.altitudeMeters} metros</strong>{' '}
              {selectedFacility.altitudeMeters >= 2500 ? '(Barreira Baroclimática Ativa — Alta Esterilidade)' : '(Zona Cárstica de Vulnerabilidade a Fungos)'}
            </span>
            <button
              onClick={() => setSelectedFacility(null)}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              Fechar detalhe
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono-code px-1">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500" /> Clique nas colunas para reordenar por severidade. Note a correlação entre altitude &gt; 2.500m e menor infiltração biológica.
        </span>
        <span className="text-amber-400 font-semibold">Fonte: Seaborn / Matplotlib Specs</span>
      </div>
    </div>
  );
};
