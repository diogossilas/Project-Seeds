import React, { useState } from 'react';
import { 
  DOCTRINE_PANORAMA_CATEGORIES, 
  FIVE_CORE_MODELS_SUMMARY 
} from '../../data/militaryMapsData';
import { 
  BookOpen, 
  Layers, 
  Shield, 
  Compass, 
  CheckCircle2, 
  HelpCircle,
  Eye,
  Crosshair,
  AlertTriangle,
  Info
} from 'lucide-react';
import { audioService } from '../../services/audioService';

export const MilitaryDoctrineGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('cat-a');
  const [selectedModelNumber, setSelectedModelNumber] = useState<number>(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#050b14] border border-[#1e293b] p-4 sm:p-5 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-code font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>MANUAL DE DOUTRINA TÁTICA &amp; CARTOGRAFIA 2D (IPB)</span>
          </span>
          <span className="text-xs font-mono-code text-slate-400 hidden sm:inline">
            PADRÕES OTAN APP-6 &bull; MIL-STD-2525
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white mt-1">
          Fundamentos de Inteligência do Campo de Batalha (IPB)
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl font-sans leading-relaxed">
          Na doutrina militar moderna, as representações visuais bidimensionais (mapas temáticos, sobreposições/overlays e diagramas analíticos) são cruciais para a consciência situacional e a tomada de decisão rápida do Estado-Maior.
        </p>
      </div>

      {/* SEÇÃO 1: PANORAMA DOS TIPOS DE GRÁFICOS 2D */}
      <div className="bg-[#050b14] border border-[#1e293b] p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
          <h3 className="text-base sm:text-lg font-bold font-sans text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>1. Panorama dos Tipos de Gráficos 2D Militares e de Terreno</span>
          </h3>
          <span className="text-xs font-mono-code text-slate-400 hidden sm:inline">
            4 GRANDES VERTENTES OPERACIONAIS
          </span>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {DOCTRINE_PANORAMA_CATEGORIES.map((cat) => {
            const isSelected = cat.id === selectedCategory;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  audioService.playNodeSelect();
                  setSelectedCategory(cat.id);
                }}
                className={`p-3 text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#010613] text-white border-emerald-500 shadow-md'
                    : 'bg-[#020617] text-slate-400 hover:text-slate-200 border-[#1e293b]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-emerald-500/20 text-emerald-400 font-mono-code text-xs font-bold flex items-center justify-center border border-emerald-500/40">
                    {cat.letter}
                  </span>
                  <span className="text-xs font-bold font-sans line-clamp-1">{cat.title.split(' (')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Category Content */}
        {(() => {
          const cat = DOCTRINE_PANORAMA_CATEGORIES.find((c) => c.id === selectedCategory) || DOCTRINE_PANORAMA_CATEGORIES[0];
          return (
            <div className="bg-[#010613] border border-[#1e293b] p-4 space-y-3">
              <div className="flex items-center gap-2 font-mono-code text-xs text-emerald-400 font-bold uppercase">
                <span>VERTENTE {cat.letter}:</span>
                <span className="text-white font-sans">{cat.title}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {cat.subitems.map((sub, idx) => (
                  <div key={idx} className="bg-[#050b14] border border-[#1e293b] p-3 text-xs">
                    <h4 className="font-bold text-slate-100 font-sans">{sub.name}</h4>
                    <p className="text-slate-400 mt-1 font-sans leading-relaxed text-[11px]">{sub.details}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* SEÇÃO 2: DETALHAMENTO DOS 5 MODELOS PRINCIPAIS */}
      <div className="bg-[#050b14] border border-[#1e293b] p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
          <h3 className="text-base sm:text-lg font-bold font-sans text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>2. Os 5 Modelos Principais de Mapas Operacionais</span>
          </h3>
          <span className="text-xs font-mono-code text-cyan-400 hidden sm:inline">
            INTEGRAÇÃO OFENSIVA &bull; TRÂNSITO NO SOLO &bull; BIODEFESA
          </span>
        </div>

        {/* 5 Model Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FIVE_CORE_MODELS_SUMMARY.map((model) => {
            const isSelected = model.modelNumber === selectedModelNumber;
            return (
              <button
                key={model.id}
                onClick={() => {
                  audioService.playNodeSelect();
                  setSelectedModelNumber(model.modelNumber);
                }}
                className={`px-3 py-2 text-xs font-mono-code whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#010613] text-white font-bold shadow-lg'
                    : 'bg-[#020617] text-slate-400 hover:text-slate-200 border-[#1e293b]'
                }`}
                style={{
                  borderColor: isSelected ? model.color : undefined
                }}
              >
                <span 
                  className="w-2.5 h-2.5"
                  style={{ backgroundColor: model.color }}
                />
                <span>M{model.modelNumber}: {model.name.split(' (')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Model Deep Dive Dossier */}
        {(() => {
          const model = FIVE_CORE_MODELS_SUMMARY.find((m) => m.modelNumber === selectedModelNumber) || FIVE_CORE_MODELS_SUMMARY[0];
          return (
            <div className="bg-[#010613] border border-[#1e293b] p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e293b] pb-3">
                <div>
                  <span 
                    className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 border"
                    style={{ color: model.color, borderColor: `${model.color}60`, backgroundColor: `${model.color}15` }}
                  >
                    {model.badge}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold font-sans text-white mt-1">
                    Modelo {model.modelNumber}: {model.name}
                  </h4>
                  <div className="text-xs text-slate-400 font-sans">{model.shortTitle}</div>
                </div>
              </div>

              <div className="bg-[#050b14] border border-[#1e293b] p-3 text-xs text-slate-300 font-sans leading-relaxed">
                <strong className="text-white block mb-1 font-mono-code uppercase text-[10px]">Função Doutrinária:</strong>
                {model.function}
              </div>

              {/* 3 Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#050b14] border-l-2 border-emerald-500 p-3 text-xs">
                  <span className="font-bold text-emerald-400 block font-mono-code uppercase text-[10px]">1. Foco no Ataque &amp; Ofensiva:</span>
                  <p className="text-slate-300 mt-1 font-sans leading-relaxed text-[11px]">{model.attackContrib}</p>
                </div>

                <div className="bg-[#050b14] border-l-2 border-cyan-500 p-3 text-xs">
                  <span className="font-bold text-cyan-400 block font-mono-code uppercase text-[10px]">2. Movimento Terrestre &amp; Solo:</span>
                  <p className="text-slate-300 mt-1 font-sans leading-relaxed text-[11px]">{model.groundFocus}</p>
                </div>

                <div className="bg-[#050b14] border-l-2 border-amber-500 p-3 text-xs">
                  <span className="font-bold text-amber-400 block font-mono-code uppercase text-[10px]">3. Fauna &amp; Flora / Bioma:</span>
                  <p className="text-slate-300 mt-1 font-sans leading-relaxed text-[11px]">{model.faunaFloraFocus}</p>
                </div>
              </div>

              <div className="bg-[#020617] border border-[#1e293b] p-3 text-xs">
                <span className="text-purple-400 font-bold font-mono-code uppercase text-[10px] block">Exemplo Operacional de Emprego em Combate:</span>
                <p className="text-slate-200 mt-1 font-sans italic text-[11px]">&ldquo;{model.practicalExample}&rdquo;</p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SEÇÃO 3: TABELA DE RESUMO OPERACIONAL DA INTEGRAÇÃO */}
      <div className="bg-[#050b14] border border-[#1e293b] p-4 sm:p-5 shadow-lg space-y-4">
        <h3 className="text-base sm:text-lg font-bold font-sans text-white border-b border-[#1e293b] pb-3">
          3. Matriz Sintética de Integração dos 5 Modelos 2D
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-[#1e293b] bg-[#010613] text-[10px] font-mono-code text-slate-400 uppercase">
                <th className="p-3">Modelo 2D</th>
                <th className="p-3">Principal Contribuição ao Ataque</th>
                <th className="p-3">Foco no Movimento Terrestre</th>
                <th className="p-3">Foco em Fauna / Flora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b] text-slate-300">
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-bold font-mono-code text-emerald-400 whitespace-nowrap">1. MCOO</td>
                <td className="p-3">Define corredores de mobilidade e avenidas de aproximação.</td>
                <td className="p-3">Filtra o terreno em Irrestrito, Restrito ou Severamente Restrito.</td>
                <td className="p-3">Trata a vegetação compacta e mangues como barreiras à manobra.</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-bold font-mono-code text-cyan-400 whitespace-nowrap">2. Operations Overlay</td>
                <td className="p-3">Posiciona os eixos de tiro, apoio e manobra de assalto.</td>
                <td className="p-3">Organiza fluxos, postos de passagem e pontos de junção de comboios.</td>
                <td className="p-3">Demarca áreas de risco de fogo/destruição vegetal colateral (RFA).</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-bold font-mono-code text-amber-400 whitespace-nowrap">3. Trafficability Chart</td>
                <td className="p-3">Evita que o ataque mecanizado perca o ímpeto por atolamentos.</td>
                <td className="p-3">Modela resistência do solo, umidade, CBR e capacidade de carga (t).</td>
                <td className="p-3">Analisa decomposição orgânica vegetal, turfas e fragilidade do solo.</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-bold font-mono-code text-blue-400 whitespace-nowrap">4. Canopy &amp; Concealment</td>
                <td className="p-3">Guia rotas de infiltração furtivas sem detecção por drones/ISR.</td>
                <td className="p-3">Restringe mobilidade de blindados pelo espaçamento médio dos troncos.</td>
                <td className="p-3">Mapeia densidade de folhagem, estrato vegetal e sazonalidade.</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-bold font-mono-code text-rose-400 whitespace-nowrap">5. Biotic Threat Overlay</td>
                <td className="p-3">Impede ruídos/alertas causados pela fauna que denunciem a tropa.</td>
                <td className="p-3">Baliza a velocidade da marcha e estabelece precauções profiláticas.</td>
                <td className="p-3">Mapeia habitats de vetores zoonóticos, animais peçonhentos e plantas tóxicas.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
