import React, { useState } from 'react';
import { X, ShieldAlert, Download, Copy, Check } from 'lucide-react';
import { METADATA_ARCHIVE, TEAMS_DATA } from '../data/sevenSeedsData';
import { ExportService } from '../services/exportService';
import { audioService } from '../services/audioService';

interface QuickDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickDossierModal: React.FC<QuickDossierModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    audioService.playNodeSelect();
    ExportService.downloadDossierFile(TEAMS_DATA, METADATA_ARCHIVE);
  };

  const handleCopyJSON = async () => {
    audioService.playNodeSelect();
    const json = ExportService.generateDossierJSON(TEAMS_DATA, METADATA_ARCHIVE);
    const success = await ExportService.copyToClipboard(json);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0d131f] border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#090d16]">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Dossiê Metatron — Classe Ômega
              </h3>
              <p className="text-[11px] font-mono-code text-slate-400">
                {METADATA_ARCHIVE.compiler}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5 font-mono-code text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Classificação:</span>
              <span className="text-emerald-400 font-bold">{METADATA_ARCHIVE.classification}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fonte Material:</span>
              <span className="text-slate-200">{METADATA_ARCHIVE.source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">População Inicial Planejada:</span>
              <span className="text-slate-200">28 Sementes + Instalações de Suporte</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Sobreviventes Conhecidos:</span>
              <span className="text-cyan-400 font-bold">29 humanos unificados</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white font-mono-code uppercase text-xs mb-1.5 text-emerald-400">
              Conclusão da Matriz Arquitetural &amp; Telemetria Global
            </h4>
            <p className="text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800">
              O maquinário burocrático e eugenista planejado pelo antigo Estado colapsou em todas as frentes de superfície. 
              A unificação na Ilha de Sado (8ª Arca) e a correlação cruzada dos 10 complexos globais demonstram que quanto mais um núcleo dependeu de IA e automação militar (ex: Cheyenne, Qinling, Sado), maior foi a taxa de terminação preventiva e disfunção psíquica. A sobrevivência prosperou onde o saber empírico e a coesão horizontal foram preservados.
            </p>
          </div>

          <div className="bg-purple-950/30 p-3 rounded-xl border border-purple-800/40 font-mono-code text-[11px] text-purple-200">
            <div className="font-bold text-purple-300 mb-1">5 Modelos de Visualização Crítica Implementados:</div>
            <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
              <li>Diagrama de Sankey (Transição de Governança e Destino das Frentes)</li>
              <li>Matriz de Calor (Vulnerabilidade Sistêmica nos 10 Complexos)</li>
              <li>Gráfico de Radar (Perfil Adaptativo: América do Sul vs. China vs. Lua)</li>
              <li>Dispersão com Linha de Tendência Polyfit (Automação vs. Sobrevivência aos 50 anos)</li>
              <li>Grafo de Rede (Conectividade Global e Telemetria Orbital 1420.405 MHz)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white font-mono-code uppercase text-xs mb-1.5 text-cyan-400">
              Resumo dos 7 Núcleos
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono-code text-[11px]">
              {TEAMS_DATA.map((t) => (
                <div key={t.id} className="p-2 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                    {t.name}
                  </span>
                  <span className={t.threatLevel === 'Extinto' ? 'text-rose-400' : 'text-emerald-400'}>
                    {t.threatLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Modular Export Service Triggers */}
        <div className="p-4 border-t border-slate-800 bg-[#090d16] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono-code text-xs">
            <button
              id="export-dossier-json-btn"
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Baixar JSON</span>
            </button>
            <button
              id="copy-dossier-json-btn"
              onClick={handleCopyJSON}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copiado!' : 'Copiar JSON'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs font-mono-code transition-colors cursor-pointer"
          >
            Fechar Dossiê
          </button>
        </div>
      </div>
    </div>
  );
};
