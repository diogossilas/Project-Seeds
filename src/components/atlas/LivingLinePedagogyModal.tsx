import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  PenTool, 
  Eye, 
  ShieldAlert, 
  Compass, 
  Layers, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  RotateCcw,
  Palette,
  BookOpen,
  Anchor,
  Globe2,
  Crosshair
} from 'lucide-react';
import { LIVING_LINE_STAGES } from '../../data/worldMilitaryData';
import { LivingLineStage } from '../../types/worldMilitaryMap';
import { audioService } from '../../services/audioService';

interface LivingLinePedagogyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyStageToMap?: (stage: LivingLineStage) => void;
}

export const LivingLinePedagogyModal: React.FC<LivingLinePedagogyModalProps> = ({
  isOpen,
  onClose,
  onApplyStageToMap,
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [selectedContinentDemo, setSelectedContinentDemo] = useState<'africa' | 'south_america' | 'eurasia'>('africa');
  const [showGhostGuide, setShowGhostGuide] = useState<boolean>(true);
  const [animateTremor, setAnimateTremor] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentStageInfo = LIVING_LINE_STAGES[currentStageIndex];

  const handleNext = () => {
    if (currentStageIndex < LIVING_LINE_STAGES.length - 1) {
      audioService.playNodeSelect();
      const nextIndex = currentStageIndex + 1;
      setCurrentStageIndex(nextIndex);
      if (onApplyStageToMap) {
        onApplyStageToMap(LIVING_LINE_STAGES[nextIndex].stage);
      }
    }
  };

  const handlePrev = () => {
    if (currentStageIndex > 0) {
      audioService.playNodeSelect();
      const prevIndex = currentStageIndex - 1;
      setCurrentStageIndex(prevIndex);
      if (onApplyStageToMap) {
        onApplyStageToMap(LIVING_LINE_STAGES[prevIndex].stage);
      }
    }
  };

  const handleSelectStage = (index: number) => {
    audioService.playNodeSelect();
    setCurrentStageIndex(index);
    if (onApplyStageToMap) {
      onApplyStageToMap(LIVING_LINE_STAGES[index].stage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-5xl bg-[#030914] border border-[#1e293b] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#050e1c] border-b border-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 rounded text-emerald-400">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-code font-bold uppercase text-emerald-400 tracking-wider">
                  DOUTRINA CARTOGRÁFICA &amp; PEDAGOGIA DA "LINHA VIVA"
                </span>
                <span className="px-1.5 py-0.2 text-[10px] font-mono-code bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded">
                  ETAPA {currentStageInfo.stageNumber} DE 4
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {currentStageInfo.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage Stepper Tabs */}
        <div className="grid grid-cols-4 bg-[#020610] border-b border-[#1e293b] text-xs font-mono-code">
          {LIVING_LINE_STAGES.map((s, idx) => (
            <button
              key={s.stage}
              onClick={() => handleSelectStage(idx)}
              className={`py-2.5 px-2 text-center transition-all cursor-pointer flex flex-col items-center gap-1 border-r border-[#1e293b] last:border-r-0 ${
                idx === currentStageIndex
                  ? 'bg-emerald-950/60 text-emerald-300 border-b-2 border-b-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <span className="text-[10px] text-slate-500">ETAPA 0{idx + 1}</span>
              <span className="truncate max-w-full text-[11px]">{s.title.split('(')[0]}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 p-5 gap-6">
          {/* Left / Top: Interactive Demonstration Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between bg-[#050e1c] p-2 border border-[#1e293b] text-xs font-mono-code">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Continente Demonstrativo:</span>
                <select
                  value={selectedContinentDemo}
                  onChange={(e) => setSelectedContinentDemo(e.target.value as any)}
                  className="bg-[#020610] text-emerald-300 border border-[#1e293b] px-2 py-0.5 text-xs outline-none"
                >
                  <option value="africa">África (Trapézio / Cone)</option>
                  <option value="south_america">América do Sul (Triângulo Inclinado)</option>
                  <option value="eurasia">Eurásia (Bloco Expansivo)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGhostGuide(!showGhostGuide)}
                  className={`px-2 py-0.5 text-[11px] border cursor-pointer ${
                    showGhostGuide ? 'bg-sky-950/60 text-sky-300 border-sky-500/40' : 'text-slate-400 border-slate-700'
                  }`}
                >
                  {showGhostGuide ? 'Guia Fantasma: ON' : 'Guia Fantasma: OFF'}
                </button>
                <button
                  onClick={() => setAnimateTremor(!animateTremor)}
                  className={`px-2 py-0.5 text-[11px] border cursor-pointer ${
                    animateTremor ? 'bg-amber-950/60 text-amber-300 border-amber-500/40' : 'text-slate-400 border-slate-700'
                  }`}
                >
                  {animateTremor ? 'Pulso Vivo: ON' : 'Estático'}
                </button>
              </div>
            </div>

            {/* Canvas Display */}
            <div className="relative w-full aspect-[4/3] bg-[#020813] border border-[#1e293b] rounded overflow-hidden flex items-center justify-center p-4">
              {/* Geodesic Grid Background */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                <defs>
                  <pattern id="modalGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#modalGrid)" />
              </svg>

              <svg viewBox="0 0 500 400" className="w-full h-full">
                {/* 1. STAGE 1: Pure Bounding Shape (Ghost or Active) */}
                {(currentStageIndex === 0 || showGhostGuide) && (
                  <g opacity={currentStageIndex === 0 ? 1 : 0.25} className="transition-opacity duration-300">
                    {selectedContinentDemo === 'africa' && (
                      <polygon
                        points="150,90 350,90 320,240 240,360 140,220"
                        fill={currentStageIndex === 0 ? '#eab308' : 'none'}
                        fillOpacity="0.25"
                        stroke="#eab308"
                        strokeWidth={currentStageIndex === 0 ? '3' : '1.5'}
                        strokeDasharray={currentStageIndex === 0 ? 'none' : '4,4'}
                      />
                    )}

                    {selectedContinentDemo === 'south_america' && (
                      <polygon
                        points="180,90 310,120 330,220 220,360 170,260 150,160"
                        fill={currentStageIndex === 0 ? '#10b981' : 'none'}
                        fillOpacity="0.25"
                        stroke="#10b981"
                        strokeWidth={currentStageIndex === 0 ? '3' : '1.5'}
                        strokeDasharray={currentStageIndex === 0 ? 'none' : '4,4'}
                      />
                    )}

                    {selectedContinentDemo === 'eurasia' && (
                      <polygon
                        points="100,80 420,70 440,240 360,260 280,310 180,270 90,200"
                        fill={currentStageIndex === 0 ? '#38bdf8' : 'none'}
                        fillOpacity="0.25"
                        stroke="#38bdf8"
                        strokeWidth={currentStageIndex === 0 ? '3' : '1.5'}
                        strokeDasharray={currentStageIndex === 0 ? 'none' : '4,4'}
                      />
                    )}

                    {currentStageIndex === 0 && (
                      <text x="250" y="220" textAnchor="middle" fill="#fde047" fontSize="13" fontFamily="monospace" fontWeight="bold">
                        FORMA ENVELOPE BASE (MASSA ARREDONDADA / TRAPÉZIO)
                      </text>
                    )}
                  </g>
                )}

                {/* 2. STAGE 2: Promontories & Great Inflexions */}
                {(currentStageIndex === 1 || (currentStageIndex > 1 && showGhostGuide)) && (
                  <g opacity={currentStageIndex === 1 ? 1 : 0.3} className="transition-opacity duration-300">
                    {selectedContinentDemo === 'africa' && (
                      <path
                        d="M 170,95 Q 260,85 340,110 L 360,180 Q 400,210 350,240 L 310,290 L 250,370 L 200,310 Q 180,260 160,240 L 120,200 L 130,130 Z"
                        fill={currentStageIndex === 1 ? '#f59e0b' : 'none'}
                        fillOpacity="0.35"
                        stroke="#f59e0b"
                        strokeWidth={currentStageIndex === 1 ? '3' : '1.5'}
                      />
                    )}

                    {selectedContinentDemo === 'south_america' && (
                      <path
                        d="M 180,95 Q 260,85 320,130 Q 360,210 320,270 L 250,370 L 200,310 L 170,220 Q 150,150 180,95 Z"
                        fill={currentStageIndex === 1 ? '#10b981' : 'none'}
                        fillOpacity="0.35"
                        stroke="#10b981"
                        strokeWidth={currentStageIndex === 1 ? '3' : '1.5'}
                      />
                    )}

                    {selectedContinentDemo === 'eurasia' && (
                      <path
                        d="M 100,90 Q 250,70 420,80 Q 450,170 420,250 L 370,220 Q 320,330 280,310 L 250,260 Q 190,300 170,250 L 110,240 L 80,160 Z"
                        fill={currentStageIndex === 1 ? '#38bdf8' : 'none'}
                        fillOpacity="0.35"
                        stroke="#38bdf8"
                        strokeWidth={currentStageIndex === 1 ? '3' : '1.5'}
                      />
                    )}

                    {currentStageIndex === 1 && (
                      <g>
                        <circle cx="370" cy="200" r="14" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                        <text x="390" y="205" fill="#fde047" fontSize="11" fontFamily="monospace">Chifre da Somália / Protuberância</text>
                        <circle cx="160" cy="240" r="14" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                        <text x="50" y="255" fill="#fde047" fontSize="11" fontFamily="monospace">Golfo da Guiné / Reentrância</text>
                      </g>
                    )}
                  </g>
                )}

                {/* 3. STAGE 3 & 4: Living Line with Organic Tremors, Fjords, and Bays */}
                {(currentStageIndex >= 2) && (
                  <g>
                    {selectedContinentDemo === 'africa' && (
                      <path
                        d="M 170,95 C 185,92 205,98 225,93 C 245,88 270,92 290,89 C 310,87 335,102 345,115 C 352,128 348,142 355,158 C 362,172 385,185 398,198 C 405,208 395,220 380,228 C 368,235 352,242 345,258 C 338,272 328,290 320,308 C 310,325 285,348 268,362 C 255,372 245,375 238,368 C 228,355 212,335 205,315 C 198,298 185,282 175,265 C 168,252 155,248 142,242 C 128,235 118,225 115,212 C 112,198 118,185 122,170 C 128,155 125,138 132,122 C 140,108 155,98 170,95 Z"
                        fill="#d97706"
                        fillOpacity={currentStageIndex === 3 ? "0.85" : "0.6"}
                        stroke="#fef08a"
                        strokeWidth="2.2"
                        className={animateTremor ? "transition-all duration-700" : ""}
                      />
                    )}

                    {selectedContinentDemo === 'south_america' && (
                      <path
                        d="M 180,95 C 195,90 215,92 235,89 C 255,87 280,98 298,110 C 315,122 335,145 348,168 C 358,188 352,210 345,232 C 338,252 325,272 312,295 C 298,318 280,342 262,362 C 252,372 245,375 238,368 C 230,352 220,332 215,312 C 208,285 198,258 188,232 C 178,208 162,185 158,160 C 155,135 165,108 180,95 Z"
                        fill="#059669"
                        fillOpacity={currentStageIndex === 3 ? "0.85" : "0.6"}
                        stroke="#6ee7b7"
                        strokeWidth="2.2"
                      />
                    )}

                    {selectedContinentDemo === 'eurasia' && (
                      <path
                        d="M 100,90 C 120,82 150,88 180,82 C 210,75 240,78 270,72 C 300,68 335,74 365,70 C 395,68 425,75 440,92 C 452,112 445,138 438,162 C 430,188 442,215 435,238 C 428,255 410,268 392,260 C 375,252 360,238 345,248 C 330,258 318,285 305,308 C 292,325 278,332 265,320 C 252,305 245,282 235,265 C 222,248 202,242 185,248 C 168,255 150,268 135,258 C 120,248 108,228 98,208 C 88,185 82,158 85,132 C 88,110 92,98 100,90 Z"
                        fill="#0284c7"
                        fillOpacity={currentStageIndex === 3 ? "0.85" : "0.6"}
                        stroke="#7dd3fc"
                        strokeWidth="2.2"
                      />
                    )}
                  </g>
                )}

                {/* 4. STAGE 4: Military Overlay Elements */}
                {currentStageIndex === 3 && (
                  <g className="animate-fade-in">
                    {/* Garrison HQ Marker */}
                    <g transform="translate(250, 220)">
                      <circle r="18" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" className="animate-ping" />
                      <circle r="12" fill="#0284c7" stroke="#ffffff" strokeWidth="1.8" />
                      <text y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">HQ</text>
                    </g>
                    <text x="250" y="250" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      GUARNIÇÃO SEEDS CLASSE ÔMEGA
                    </text>

                    {/* Chokepoint */}
                    <g transform="translate(365, 120)">
                      <rect x="-8" y="-8" width="16" height="16" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" transform="rotate(45)" />
                      <text x="14" y="4" fill="#f87171" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        Garganta Chokepoint Alpha
                      </text>
                    </g>

                    {/* Tactical Vectors */}
                    <path
                      d="M 180,120 Q 220,160 250,220"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2.5"
                      strokeDasharray="4,4"
                    />
                    <text x="170" y="140" fill="#34d399" fontSize="10" fontFamily="monospace">Eixo Logístico 1</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Right / Bottom: Pedagogical Breakdown & Lesson */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              {/* Teaching Card */}
              <div className="bg-[#050e1c] border border-emerald-500/30 p-4 rounded">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-code font-bold uppercase mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Ensinamento da Linha Viva</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-serif italic">
                  "{currentStageInfo.pedagogicalLesson}"
                </p>
              </div>

              {/* Advice for Drawing */}
              <div className="bg-[#020610] border border-[#1e293b] p-3.5 rounded text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-mono-code font-bold">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Instrução de Desenho para a Criança e o Artista:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {currentStageInfo.drawingAdviceForChildren}
                </p>
              </div>

              {/* Military Analysis Significance */}
              <div className="bg-[#050b14] border border-sky-500/30 p-3.5 rounded text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-sky-400 font-mono-code font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Aplicação para Tropas Militares (IPB &amp; COP):</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {currentStageInfo.militarySignificance}
                </p>
              </div>

              {/* Visual Characteristics */}
              <div>
                <span className="text-[11px] font-mono-code text-slate-400 block mb-1.5 font-bold uppercase">
                  Critérios de Avaliação Visual:
                </span>
                <ul className="space-y-1 text-xs text-slate-300 font-mono-code">
                  {currentStageInfo.visualCharacteristics.map((char, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1e293b] mt-2">
              <button
                onClick={handlePrev}
                disabled={currentStageIndex === 0}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono-code bg-[#050e1c] border border-[#1e293b] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed rounded cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Etapa Anterior</span>
              </button>

              <button
                onClick={() => {
                  if (onApplyStageToMap) {
                    onApplyStageToMap(currentStageInfo.stage);
                  }
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded cursor-pointer shadow"
              >
                <Crosshair className="w-4 h-4" />
                <span>Aplicar ao Mapa Geral</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentStageIndex === LIVING_LINE_STAGES.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono-code bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 disabled:cursor-not-allowed font-bold rounded cursor-pointer"
              >
                <span>Próxima Etapa</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
