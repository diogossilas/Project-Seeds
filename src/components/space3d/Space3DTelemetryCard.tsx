import React from 'react';
import { TEAMS_DATA } from '../../data/sevenSeedsData';
import { TeamData } from '../../types';
import { audioService } from '../../services/audioService';

interface Space3DTelemetryCardProps {
  activeFocus: TeamData;
  onSelectTeam: (team: TeamData) => void;
}

export const Space3DTelemetryCard: React.FC<Space3DTelemetryCardProps> = ({
  activeFocus,
  onSelectTeam,
}) => {
  const handleSelect = (team: TeamData) => {
    audioService.playNodeSelect();
    onSelectTeam(team);
  };

  return (
    <div className="lg:col-span-4 bg-[#0d131f] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <span className="text-[10px] font-mono-code uppercase text-slate-400 block">
              VETOR ESPACIAL DO NÓ SELECIONADO
            </span>
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2 mt-0.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeFocus.color }} />
              {activeFocus.name}
            </h3>
          </div>
          <span className="text-xs font-mono-code text-slate-400">{activeFocus.kanji}</span>
        </div>

        {/* 3D Coordinates (X, Y, Z) display */}
        <div className="grid grid-cols-3 gap-2 font-mono-code text-center mb-4">
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-emerald-500/30">
            <span className="text-[10px] uppercase text-emerald-400 block font-bold">X (Empatia)</span>
            <span className="text-lg font-bold text-emerald-300">{activeFocus.spatial3D.x}</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-sky-500/30">
            <span className="text-[10px] uppercase text-sky-400 block font-bold">Y (Técnica)</span>
            <span className="text-lg font-bold text-sky-300">{activeFocus.spatial3D.y}</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-amber-500/30">
            <span className="text-[10px] uppercase text-amber-400 block font-bold">Z (Tempo)</span>
            <span className="text-lg font-bold text-amber-300">{activeFocus.spatial3D.z}</span>
          </div>
        </div>

        {/* Node Analysis Dossier */}
        <div className="space-y-3 text-xs">
          <div>
            <span className="text-[10px] font-mono-code uppercase text-slate-400 block mb-0.5">
              Significado da Posição 3D
            </span>
            <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-[11px]">
              {activeFocus.id === 'arca-fuji' ? (
                'Ponto Ômega de Convergência: Máxima empatia (95) aliada à retenção técnica (50) e longevidade sustentável (96). Local onde o autômato da IA foi desarmado.'
              ) : activeFocus.id === 'ryugu' ? (
                'Ponto de Colapso Sistêmico: Altíssimo controle burocrático (98) combinado com empatia nula (15) e extinção temporal precoce (5). A cúpula selada provocou suicídio coletivo.'
              ) : activeFocus.id === 'verao-b' ? (
                'Vértice Orgânico Humanista: Máxima sensibilidade biocêntrica (98) com aversão ao biopoder estatal (10). A intuição de Natsu guiou os sobreviventes à salvação.'
              ) : activeFocus.id === 'inverno' ? (
                'Vértice de Resiliência Máxima (Z=98): 15 anos de sobrevivência solitária de Takahiro Aramaki nas estepes de gelo, integrando-se aos cães selvagens.'
              ) : activeFocus.id === 'verao-a' ? (
                'Vértice Tecnocrático em Transição: Criados em Ryokusha com alto biopoder (82), migraram dolorosamente para a cooperação após o colapso psicótico de Ango.'
              ) : (
                activeFocus.primaryStateFunction
              )}
            </p>
          </div>

          {/* Quick Select of all nodes */}
          <div>
            <span className="text-[10px] font-mono-code uppercase text-slate-400 block mb-1.5">
              Alternar Nó no Espaço 3D
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {TEAMS_DATA.map((team) => (
                <button
                  key={team.id}
                  id={`select-3d-node-${team.id}`}
                  onClick={() => handleSelect(team)}
                  className={`px-2.5 py-1.5 rounded-lg text-left text-[11px] font-mono-code transition-all flex items-center gap-1.5 border cursor-pointer ${
                    activeFocus.id === team.id
                      ? 'bg-slate-800 border-emerald-500/50 text-white font-bold'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: team.color }} />
                  <span className="truncate">{team.name.replace('Equipe ', '')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono-code">
        <span>Dimensão Cartesiana Normalizada</span>
        <span className="text-emerald-400">Metatron 3D Engine</span>
      </div>
    </div>
  );
};
