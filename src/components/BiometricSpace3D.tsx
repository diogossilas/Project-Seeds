import React, { useState } from 'react';
import { TEAMS_DATA } from '../data/sevenSeedsData';
import { GLOBAL_PROGRAMS_DATA } from '../data/globalSeedsData';
import { TeamData } from '../types';
import { Space3DControls, CameraPreset } from './space3d/Space3DControls';
import { Space3DCanvas } from './space3d/Space3DCanvas';
import { Space3DTelemetryCard } from './space3d/Space3DTelemetryCard';
import { Globe2, Compass } from 'lucide-react';
import { audioService } from '../services/audioService';

interface BiometricSpace3DProps {
  onSelectTeam: (team: TeamData) => void;
  selectedTeam: TeamData | null;
}

export const BiometricSpace3D: React.FC<BiometricSpace3DProps> = ({
  onSelectTeam,
  selectedTeam,
}) => {
  const [scope, setScope] = useState<'global' | 'japan'>('global');
  const [autoRotate, setAutoRotate] = useState(true);
  const [cameraAngle, setCameraAngle] = useState<CameraPreset>('iso');

  const activeFocus = selectedTeam || TEAMS_DATA[0];

  const handleScopeChange = (newScope: 'global' | 'japan') => {
    audioService.playPhaseTransition();
    setScope(newScope);
  };

  return (
    <div className="space-y-6">
      {/* Top Description Banner */}
      <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono-code font-semibold">
                SISTEMA TRIDIMENSIONAL • EIXOS X, Y E Z
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                PROJEÇÃO VOLUMÉTRICA MULTIVARIÁVEL
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mt-1">
              Espaço Biométrico 3D: Trajetória para a Emancipação
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Visualização espacial com três dimensões ortogonais: 
              <span className="text-emerald-400 font-semibold"> Eixo X</span> (Empatia &amp; Conexão Biocêntrica), 
              <span className="text-sky-400 font-semibold"> Eixo Y</span> (Biopoder &amp; Dependência Técnica da IA) e 
              <span className="text-amber-400 font-semibold"> Eixo Z</span> (Resiliência &amp; Sobrevivência Temporal).
            </p>
          </div>

          {/* Controls: Scope Switcher + 3D Camera Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-1 bg-[#080d16] p-1 rounded-xl border border-slate-700/80">
              <button
                onClick={() => handleScopeChange('global')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer ${
                  scope === 'global'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>Global ({GLOBAL_PROGRAMS_DATA.length})</span>
              </button>
              <button
                onClick={() => handleScopeChange('japan')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer ${
                  scope === 'japan'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Japão ({TEAMS_DATA.length})</span>
              </button>
            </div>

            <Space3DControls
              cameraAngle={cameraAngle}
              autoRotate={autoRotate}
              onSetCameraPreset={setCameraAngle}
              onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
            />
          </div>
        </div>
      </div>

      {/* Main 3D Canvas + Side Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Space3DCanvas
          autoRotate={autoRotate}
          cameraAngle={cameraAngle}
          scope={scope}
        />
        <Space3DTelemetryCard
          activeFocus={activeFocus}
          onSelectTeam={onSelectTeam}
        />
      </div>
    </div>
  );
};

