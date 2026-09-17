import React from 'react';
import { Layers } from 'lucide-react';
import { audioService } from '../../services/audioService';

export type MapLayerMode = 'all' | 'routes' | 'hazards';

interface MapLayerControlsProps {
  activeLayer: MapLayerMode;
  onSelectLayer: (layer: MapLayerMode) => void;
}

export const MapLayerControls: React.FC<MapLayerControlsProps> = ({
  activeLayer,
  onSelectLayer,
}) => {
  const handleLayerClick = (layer: MapLayerMode) => {
    audioService.playNodeSelect();
    onSelectLayer(layer);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800 text-xs">
      <div className="flex items-center gap-2 text-slate-300">
        <Layers className="w-4 h-4 text-emerald-400" />
        <span className="font-semibold">Camadas de Visualização:</span>
      </div>
      <div className="flex items-center gap-1.5 font-mono-code">
        <button
          id="layer-all-btn"
          onClick={() => handleLayerClick('all')}
          className={`px-2.5 py-1 text-xs transition-colors cursor-pointer border ${
            activeLayer === 'all'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-[#010613] text-slate-400 hover:text-slate-200 border-[#1e293b]'
          }`}
        >
          Todas as Camadas
        </button>
        <button
          id="layer-routes-btn"
          onClick={() => handleLayerClick('routes')}
          className={`px-2.5 py-1 text-xs transition-colors cursor-pointer border ${
            activeLayer === 'routes'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              : 'bg-[#010613] text-slate-400 hover:text-slate-200 border-[#1e293b]'
          }`}
        >
          Rotas para Sado
        </button>
        <button
          id="layer-hazards-btn"
          onClick={() => handleLayerClick('hazards')}
          className={`px-2.5 py-1 text-xs transition-colors cursor-pointer border ${
            activeLayer === 'hazards'
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : 'bg-[#010613] text-slate-400 hover:text-slate-200 border-[#1e293b]'
          }`}
        >
          Zonas de Risco
        </button>
      </div>
    </div>
  );
};
