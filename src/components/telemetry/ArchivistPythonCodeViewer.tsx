import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, ExternalLink } from 'lucide-react';
import { PYTHON_REFERENCE_SCRIPTS } from '../../data/omegaTelemetryData';
import { audioService } from '../../services/audioService';

export const ArchivistPythonCodeViewer: React.FC = () => {
  const [activeScriptId, setActiveScriptId] = useState<string>('sankey');
  const [copied, setCopied] = useState(false);

  const activeScript =
    PYTHON_REFERENCE_SCRIPTS.find((s) => s.id === activeScriptId) || PYTHON_REFERENCE_SCRIPTS[0];

  const handleCopy = () => {
    audioService.playNodeSelect();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeScript.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#030914] border border-[#0e2a4a] rounded-2xl p-6 shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#0e2a4a]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono-code font-bold uppercase flex items-center gap-1">
              <Terminal className="w-3 h-3 text-emerald-400" />
              SCRIPTS PYTHON ORIGINAIS • METATRON SPEC
            </span>
            <span className="text-[11px] font-mono-code text-slate-400">
              REPRODUTIBILIDADE CIENTÍFICA (PLOTLY, SEABORN, NETWORKX)
            </span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mt-1">
            Código-Fonte de Referência para Análise Telemétrica Externa
          </h3>
        </div>

        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-xl bg-[#050e1c] hover:bg-[#0a1b33] text-slate-200 border border-[#0e2a4a] text-xs font-mono-code flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado para o Clipboard!' : 'Copiar Código Python'}</span>
        </button>
      </div>

      <p className="text-xs text-slate-400 mb-3">
        Os algoritmos e matrizes de dados abaixo foram concebidos pelo Arquivista Metatron para processamento estatístico em ambientes Jupyter Notebook e pipelines de dados científicos.
      </p>

      {/* Script Tabs */}
      <div className="flex flex-wrap gap-2 mb-3">
        {PYTHON_REFERENCE_SCRIPTS.map((s) => {
          const isActive = s.id === activeScriptId;
          return (
            <button
              key={s.id}
              onClick={() => {
                audioService.playNodeSelect();
                setActiveScriptId(s.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#050e1c] text-cyan-300 border-cyan-500/40 shadow-sm font-bold'
                  : 'bg-slate-900/70 text-slate-400 border-[#0e2a4a] hover:text-white'
              }`}
            >
              {s.title.split(':')[0]}
            </button>
          );
        })}
      </div>

      {/* Code Box */}
      <div className="rounded-xl border border-[#0e2a4a] bg-[#070b13] p-4 overflow-hidden flex flex-col font-mono-code text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#0e2a4a]/80 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-white">{activeScript.title}</span>
            <span className="text-slate-500">({activeScript.library})</span>
          </div>
          <span className="text-emerald-400 text-[10px]">{activeScript.target}</span>
        </div>

        <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto p-2 select-all max-h-[320px] scrollbar-thin">
          <code>{activeScript.code}</code>
        </pre>
      </div>
    </div>
  );
};
