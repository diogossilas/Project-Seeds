import React from 'react';
import { Globe, Orbit, Maximize2, MoveDiagonal, RotateCcw, Plus, Minus } from 'lucide-react';
import { WorldMapPaths } from '../atlas/WorldMapPaths';

export const TacticalSurfaceMap: React.FC = () => {
  return (
    <div className="w-full bg-[#030914] border border-[#1e293b] rounded-xl overflow-hidden font-mono text-slate-300 relative shadow-2xl flex flex-col min-h-[700px] select-none">
      {/* Absolute Corner Accents (HUD Style) */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-500/50 rounded-tl-xl pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-500/50 rounded-tr-xl pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-teal-500/50 rounded-bl-xl pointer-events-none z-10" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-500/50 rounded-br-xl pointer-events-none z-10" />

      {/* 1. TOP NAV TABS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-[#1e293b] bg-[#050b14] relative z-10">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900/30 border border-blue-500/50 text-blue-200 text-xs font-semibold shadow-[0_0_10px_rgba(59,130,246,0.2)]">
          <Globe className="w-4 h-4 text-blue-400" />
          Superfície Terrestre (1080x1620px)
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-500 hover:text-slate-300 text-xs font-semibold transition-colors">
          <Orbit className="w-4 h-4 text-teal-600" />
          Esfera Espacial & Cislunar (U.C.)
        </button>
      </div>

      {/* 2. SUB-HEADER CONTROLS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 border-b border-[#1e293b] bg-[#040812] text-[10px] text-slate-500 relative z-10">
        <div className="flex items-center gap-4">
          <span className="tracking-widest">MODO TELA:</span>
          <div className="flex items-center rounded border border-[#1e293b] overflow-hidden bg-[#030914]">
            <button className="px-3 py-1.5 bg-blue-600/90 text-white flex items-center gap-1.5 hover:bg-blue-500 transition-colors">
              <Maximize2 className="w-3 h-3" /> Proporcional 2:3
            </button>
            <button className="px-3 py-1.5 hover:bg-[#1e293b] transition-colors flex items-center gap-1.5 border-l border-[#1e293b]">
              <MoveDiagonal className="w-3 h-3" /> Adaptativo
            </button>
            <button className="px-3 py-1.5 hover:bg-[#1e293b] transition-colors border-l border-[#1e293b]">
              1080x1620 1:1
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="tracking-widest uppercase">GRADE TÁTICA: 1080x1620</span>
        </div>
      </div>

      {/* 3. TOP X-AXIS GRID RULER */}
      <div className="flex justify-between px-4 py-1 bg-[#02050a] text-[9px] text-slate-600 border-b border-[#1e293b] select-none relative z-10">
        <span>0px [X-COORD]</span>
        <span>270px</span>
        <span className="text-teal-500 font-bold tracking-widest">540px [MERIDIANO CENTRAL -65°]</span>
        <span>810px</span>
        <span>1080px [LIMITE CANVAS]</span>
      </div>

      {/* 4. MAIN MAP CANVAS */}
      <div className="relative flex-1 bg-[#020610] overflow-hidden flex items-center justify-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(56,189,248,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.2)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Map SVG Container */}
        {/* We use scale and translate to focus roughly on the Americas matching the screenshot */}
        <div className="absolute w-full h-full inset-0 flex items-center justify-center scale-125 opacity-70 pointer-events-none">
          <div className="w-[1000px] h-[562.5px] transform translate-x-[150px] translate-y-[0px] filter sepia-[0.8] hue-rotate-[180deg] brightness-[0.4] saturate-[2.5] contrast-[1.2]">
            <svg viewBox="0 0 1000 562.5" className="w-full h-full">
              <WorldMapPaths showCountryBorders={true} showSubmergedZones={false} showContinentLabels={false} />
            </svg>
          </div>
        </div>

        {/* Overlay Markers Layer (Manually aligned to match the image visually) */}
        <div className="absolute w-full h-full inset-0 pointer-events-none">
          {/* Target: Minaçu */}
          <div className="absolute" style={{ left: '50%', top: '55%', transform: 'translate(-50%, -50%)' }}>
            {/* Concentric rings */}
            <div className="absolute w-12 h-12 border border-rose-500/50 rounded-full animate-ping opacity-75 -left-6 -top-6" />
            <div className="absolute w-8 h-8 border border-rose-500/70 rounded-full -left-4 -top-4" />
            <div className="absolute w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,1)] -left-1 -top-1" />
            <div className="absolute text-[8px] text-rose-400 font-bold top-3 -left-3 tracking-widest bg-[#020610]/80 px-1 rounded">Minaçu</div>
          </div>

          {/* Base U.C. Jaburo (Red Diamond) */}
          <div className="absolute" style={{ left: '46%', top: '48%' }}>
            <div className="w-2.5 h-2.5 bg-rose-600 rotate-45 shadow-[0_0_5px_rgba(225,29,72,0.8)]" />
          </div>

          {/* Critical Minerals (Red Dots) */}
          <div className="absolute w-1.5 h-1.5 bg-rose-500 rounded-full" style={{ left: '32%', top: '35%' }} />
          <div className="absolute w-1.5 h-1.5 bg-rose-500 rounded-full" style={{ left: '33%', top: '48%' }} />

          {/* Water Resources (Blue Dots) */}
          <div className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full" style={{ left: '34%', top: '43%' }} />
          <div className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full" style={{ left: '43%', top: '40%' }} />
          <div className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full" style={{ left: '62%', top: '51%' }} />

          {/* Sovereigns / Capitals (Orange Diamonds) */}
          {/* South America Andes */}
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '45%', top: '43%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '44%', top: '46%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '45%', top: '51%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '47%', top: '56%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '46%', top: '63%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '48%', top: '69%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '48%', top: '74%' }} />
          {/* Brazil Coast */}
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '55%', top: '51%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '54%', top: '54%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '53%', top: '58%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '52%', top: '63%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '51%', top: '68%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '49%', top: '71%' }} />
          {/* Central America & Caribbean */}
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '36%', top: '42%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '38%', top: '44%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '40%', top: '45%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '42%', top: '46%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '41%', top: '42%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '43%', top: '43%' }} />
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rotate-45" style={{ left: '45%', top: '44%' }} />
        </div>

        {/* Floating Controls (Left) */}
        <div className="absolute left-4 top-12 flex flex-col items-center bg-[#050b14]/90 border border-[#1e293b] rounded-lg shadow-lg backdrop-blur-sm pointer-events-auto">
          <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors border-b border-[#1e293b]">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors border-b border-[#1e293b]">
            <Minus className="w-4 h-4" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Telemetry (Top Right) */}
        <div className="absolute top-4 right-4 border border-teal-500/30 bg-[#020610]/80 backdrop-blur-md px-3.5 py-2.5 rounded shadow-lg flex flex-col items-end">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-[10px] sm:text-xs mb-1.5 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_6px_rgba(20,184,166,0.8)]"></span>
            SAT-GEO: SINCRONIZADO
          </div>
          <div className="text-blue-400/80 text-[9px] sm:text-[10px] mb-1">
            AMPLIAÇÃO: 1.1x
          </div>
          <div className="text-amber-500 font-bold text-[10px] sm:text-xs">
            ALVO: Minaçu (13.53°S, 48.22°O)
          </div>
        </div>

        {/* Legend (Bottom Right) */}
        <div className="absolute bottom-4 right-4 border border-[#1e293b] bg-[#050b14]/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-2xl flex flex-col gap-2.5 text-[10px] sm:text-xs text-slate-300 pointer-events-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]"></div> 
            Mineral Crítico (ETR)
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]"></div> 
            Recurso Hídrico (H2O)
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-amber-500 rotate-45 shadow-[0_0_6px_rgba(245,158,11,0.6)] ml-[1px]"></div> 
            País Soberano / Capital
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-rose-600 rotate-45 shadow-[0_0_6px_rgba(225,29,72,0.6)] ml-[1px]"></div> 
            Base Terrestre U.C. (Jaburo)
          </div>
        </div>

        {/* Matrix Watermark (Bottom Left) */}
        <div className="absolute bottom-4 left-4 text-[9px] sm:text-[10px] font-mono text-teal-500/80 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500/80"></span>
          MATRIZ TÁTICA: 1080 × 1620 PX (RATIO 2:3)
        </div>
      </div>

      {/* 5. BOTTOM Y-AXIS GRID RULER */}
      <div className="flex justify-between px-4 py-1 bg-[#02050a] text-[9px] text-slate-600 border-t border-[#1e293b] select-none relative z-10">
        <span>0px [Y-TOPO 75°N]</span>
        <span>405px [TRÓPICO CÂNCER]</span>
        <span className="text-teal-500 font-bold tracking-widest">810px [EQUADOR 0°]</span>
        <span>1215px [TRÓPICO CAPRICÓRNIO]</span>
        <span>1620px [Y-FUNDO 55°S]</span>
      </div>
    </div>
  );
};
