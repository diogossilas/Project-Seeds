import React from 'react';
import { RotateCw } from 'lucide-react';
import { audioService } from '../../services/audioService';

export type CameraPreset = 'iso' | 'xy' | 'xz' | 'yz';

interface Space3DControlsProps {
  cameraAngle: CameraPreset;
  autoRotate: boolean;
  onSetCameraPreset: (preset: CameraPreset) => void;
  onToggleAutoRotate: () => void;
}

export const Space3DControls: React.FC<Space3DControlsProps> = ({
  cameraAngle,
  autoRotate,
  onSetCameraPreset,
  onToggleAutoRotate,
}) => {
  const handlePreset = (preset: CameraPreset) => {
    audioService.playNodeSelect();
    onSetCameraPreset(preset);
  };

  const handleToggle = () => {
    audioService.playNodeSelect();
    onToggleAutoRotate();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 font-mono-code text-xs">
      <button
        id="preset-iso-btn"
        onClick={() => handlePreset('iso')}
        className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
          cameraAngle === 'iso'
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
        }`}
      >
        Isométrica 3D
      </button>
      <button
        id="preset-xy-btn"
        onClick={() => handlePreset('xy')}
        className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
          cameraAngle === 'xy'
            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
        }`}
      >
        Frontal (X-Y)
      </button>
      <button
        id="preset-xz-btn"
        onClick={() => handlePreset('xz')}
        className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
          cameraAngle === 'xz'
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
        }`}
      >
        Plano (X-Z)
      </button>
      <button
        id="toggle-rotate-btn"
        onClick={handleToggle}
        className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
          autoRotate
            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
        }`}
      >
        <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
        <span>{autoRotate ? 'Auto-Rotação: ON' : 'Auto-Rotação: OFF'}</span>
      </button>
    </div>
  );
};
