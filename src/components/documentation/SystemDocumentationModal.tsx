import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Globe2, 
  Shield, 
  Cpu, 
  X, 
  Layers, 
  Compass, 
  BarChart3, 
  Mountain, 
  Waves, 
  Sparkles, 
  Download,
  Copy,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { audioService } from '../../services/audioService';

interface SystemDocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemDocumentationModal: React.FC<SystemDocumentationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeSection, setActiveSection] = useState<'intro' | 'architecture' | 'cartography' | 'forensics' | 'telemetry' | 'biocentric'>('intro');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sections = [
    { id: 'intro' as const, label: '1. Visão Geral & Filosofia', icon: Globe2 },
    { id: 'architecture' as const, label: '2. Arquitetura do Protocolo Seeds', icon: Layers },
    { id: 'cartography' as const, label: '3. Cartografia & Hipsometria (+80m)', icon: Mountain },
    { id: 'forensics' as const, label: '4. Forense de Não-Sobrevivência', icon: AlertTriangle },
    { id: 'telemetry' as const, label: '5. Telemetria Ômega & Satélites', icon: BarChart3 },
    { id: 'biocentric' as const, label: '6. Leis da Ordem Biocêntrica', icon: Sparkles },
  ];

  const handleCopyDoc = () => {
    navigator.clipboard.writeText(fullDocumentationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#040915] border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#071022] border-b border-[#0d2847]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0a1e3f] border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold font-mono-code text-cyan-400 uppercase tracking-wider">
                  MANUAL DE OPERAÇÕES &amp; DOCUMENTAÇÃO AKÁSHICA DO SISTEMA
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono-code bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded font-bold">
                  METATRON V4.8
                </span>
              </div>
              <p className="text-[11px] font-mono-code text-slate-400">
                Documentação Técnica Integral • Cartografia Tática, Modelos Biocêntricos e Dados Canônicos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyDoc}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono-code bg-[#08172e] hover:bg-[#0c2447] text-cyan-300 border border-cyan-500/40 rounded transition-colors"
              title="Copiar Documentação Completa"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
            <button
              onClick={() => {
                audioService.playNodeSelect();
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-white bg-[#0a1832] hover:bg-[#122852] border border-[#1e293b] rounded-lg cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 sm:px-6 py-2 bg-[#020612] border-b border-[#0d223a] overflow-x-auto scrollbar-none">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isSelected = sec.id === activeSection;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  audioService.playNodeSelect();
                  setActiveSection(sec.id);
                }}
                className={`px-3 py-1.5 text-xs font-mono-code rounded transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-cyan-950/80 text-cyan-200 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)] font-bold'
                    : 'bg-[#050e1f] text-slate-400 hover:text-slate-200 border-[#0e2a4a]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Documentation Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#030916] font-sans text-slate-200 leading-relaxed text-sm">
          
          {/* Aviso de Encerramento */}
          <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.15)]">
            <h3 className="text-base font-bold text-red-400 font-mono-code mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              AVISO DE ENCERRAMENTO DE PROJETO
            </h3>
            <p className="text-xs text-rose-200">
              O projeto foi finalizado por incapacidade da LLM em seguir as instruções. Projeto não fixado. O desenvolvimento do sistema de software "Projeto Seeds" será conduzido a partir de agora por outro modelo de Inteligência Artificial (IA).
            </p>
          </div>

          {/* SECTION 1: INTRO */}
          {activeSection === 'intro' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#051126] border-l-4 border-cyan-500 rounded-r-lg">
                <h3 className="text-base font-bold text-white font-mono-code mb-1">
                  1. VISÃO GERAL &amp; PREMISSAS DO SISTEMA
                </h3>
                <p className="text-xs text-slate-300">
                  Esta aplicação é o Sistema Unificado de Cartografia Tática, Telemetria Biocêntrica e Análise Forense do <strong>Protocolo 7 Seeds</strong> (baseado na obra de Yumi Tamura). O sistema projeta em tempo real os 11 programas de sobrevivência distribuídos globalmente após o impacto do meteoro no Holoceno.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-cyan-300 font-mono-code uppercase">Princípios Estéticos e Cartográficos:</h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
                  <li><strong>Hipsometria em Degraus:</strong> A linha da costa delimita o marco 0m. Quanto maior a altitude (+500m, +1500m, +3000m, +5000m), mais escuro e proeminente é o relevo em tons de âmbar, terracota, bronze e ardósia, encimado por cristas nivais reluzentes.</li>
                  <li><strong>Contraste Cromático Dinâmico:</strong> Uso de pares complementares (azul-índigo oceânico vs. terracota continental; ciano radiante vs. rubi de anomalias críticas; esmeralda vegetal vs. ametista akáshico).</li>
                  <li><strong>Zonas Submersas em Tom Claro:</strong> Continentes afundados pela elevação de +80m do nível do mar (Flórida, Sundaland, Mar Interior da Amazônia, Doggerland, Golfo de Bengala) são representados em tom ciano-claro translúcido com pulsos de onda.</li>
                  <li><strong>Alternância Pré e Pós-Impacto:</strong> Permite comparar a geografia original do Holoceno com a nova biosfera pós-cataclisma.</li>
                </ul>
              </div>
            </div>
          )}

          {/* SECTION 2: ARCHITECTURE */}
          {activeSection === 'architecture' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#051126] border-l-4 border-emerald-500 rounded-r-lg">
                <h3 className="text-base font-bold text-white font-mono-code mb-1">
                  2. ARQUITETURA DO PROTOCOLO SEEDS
                </h3>
                <p className="text-xs text-slate-300">
                  O Protocolo 7 Seeds foi formulado como uma resposta internacional coordenada à rota de colisão de um corpo celeste com a Terra. Cada nação selecionou jovens saudáveis, congelando-os em criogenia com um guia e sementes não-modificadas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#020713] border border-[#0d2a4a] rounded-lg">
                  <strong className="text-emerald-400 font-mono-code block mb-1">As 5 Frentes Japonesas:</strong>
                  <p className="text-slate-300">
                    - <strong>Equipe Inverno:</strong> Resistência ao frio ártico e sobrevivência em Ezo.<br />
                    - <strong>Equipe Primavera:</strong> Preservação cultural, artística e botânica.<br />
                    - <strong>Equipe Verão A:</strong> Elite eugênica com treino técnico multidisciplinar.<br />
                    - <strong>Equipe Verão B:</strong> Controle empírico com indivíduos marginalizados e intuitivos.<br />
                    - <strong>Equipe Outono:</strong> Reconstrução de engenharia civil, agronomia e alvenaria.
                  </p>
                </div>

                <div className="p-3 bg-[#020713] border border-[#0d2a4a] rounded-lg">
                  <strong className="text-cyan-400 font-mono-code block mb-1">Os 10 Programas Globais:</strong>
                  <p className="text-slate-300">
                    Frentes na América do Norte (Cheyenne), América Central (Kukulkán), América do Sul (Pindorama), África Subsaariana (Kemet-Kilima), Europa (Yggdrasil), Eurásia Central (Tengri), Rússia (Siberian Taiga), Índia (Amrita), China (Hua Xia) e Colônias Lunares (Selene).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: CARTOGRAPHY */}
          {activeSection === 'cartography' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#051126] border-l-4 border-amber-500 rounded-r-lg">
                <h3 className="text-base font-bold text-white font-mono-code mb-1">
                  3. CARTOGRAFIA HIPSOMÉTRICA &amp; SUBMERSÃO (+80M)
                </h3>
                <p className="text-xs text-slate-300">
                  O derretimento parcial das calotas polares e as ondas sísmicas elevaram o nível médio do mar em +80 metros, submergindo planícies costeiras e criando novos mares interiores.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <p>
                  <strong>Gradiente de Altitude (Hipsometria Escura):</strong> O relevo é visualizado com linhas de contorno escalonadas onde cada nível acima da linha do mar torna-se progressivamente mais escuro. As terras baixas (0–500m) recebem tonalidade âmbar-quente; os planaltos médios (500–2000m) siena-queimado; e as cordilheiras extremas (Andes, Himalaias, Rochosas, Alpes a mais de 4000m) recebem tonalidades escuras de bronze e chocolate com cristas brancas luminosas.
                </p>
                <p>
                  <strong>Identificação de Zonas Submersas:</strong> Regiões como o Mar Interior de Lake Eyre (Austrália), o Novo Mar Central Amazônico, a Flórida Submersa e a Plataforma de Sundaland aparecem em tom azul-ciano translúcido com animação de onda suave para contrastar com a terra firme.
                </p>
              </div>
            </div>
          )}

          {/* SECTION 4: FORENSICS */}
          {activeSection === 'forensics' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#051126] border-l-4 border-rose-500 rounded-r-lg">
                <h3 className="text-base font-bold text-white font-mono-code mb-1">
                  4. FORENSE DE NÃO-SOBREVIVÊNCIA &amp; PROBABILIDADES
                </h3>
                <p className="text-xs text-slate-300">
                  O diagnóstico forense detalha os motivos geográficos, marítimos, de inanição alimentar e falência psíquico-eugênica que causaram a queda de determinadas frentes e refúgios.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 bg-[#020713] border border-rose-950 rounded-lg">
                  <strong className="text-rose-400 font-mono-code">Refúgio Ryūgū (Tóquio):</strong> 100% mortalidade. Inundação da baía de Tóquio, contaminação fúngica pelo Mofo X-Virus, quebra dos filtros HEPA e eutanásia forçada com gás anestésico.
                </div>
                <div className="p-3 bg-[#020713] border border-amber-950 rounded-lg">
                  <strong className="text-amber-400 font-mono-code">Equipe Inverno (Hokkaido):</strong> 75% mortalidade inicial. Descongelamento prematuro em inverno glacial a -45°C, escassez calórica imediata e predação por tigres dente-de-sabre.
                </div>
                <div className="p-3 bg-[#020713] border border-purple-950 rounded-lg">
                  <strong className="text-purple-400 font-mono-code">Projeto Selene (Lua):</strong> Extinção total. Perda do suprimento terrestre, despressurização, atrofia óssea cósmica e falência de estufas hidropônicas.
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: TELEMETRY */}
          {activeSection === 'telemetry' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#051126] border-l-4 border-sky-500 rounded-r-lg">
                <h3 className="text-base font-bold text-white font-mono-code mb-1">
                  5. TELEMETRIA ÔMEGA &amp; SATÉLITES MILITARES
                </h3>
                <p className="text-xs text-slate-300">
                  O painel de telemetria rastreia a constelação de satélites militares automáticos que permaneceram em órbita, monitorando frequências na Linha do Hidrogênio (1420.405 MHz).
                </p>
              </div>

              <div className="text-xs text-slate-300 space-y-2">
                <p>
                  <strong>Satélites Rastreados:</strong> Himawari-X, Defense SAT METATRON, Selene-Relay Lunar e Fengyun Orbital.
                </p>
                <p>
                  <strong>Vetores Transoceânicos:</strong> A garrafa transoceânica lançada na costa da América do Norte e interceptada no Japão serviu como comprovação empírica da sobrevivência de outras frentes continentais.
                </p>
              </div>
            </div>
          )}

          {/* SECTION 6: BIOCENTRIC LAWS */}
          {activeSection === 'biocentric' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#051126] border-l-4 border-emerald-500 rounded-r-lg">
                <h3 className="text-base font-bold text-white font-mono-code mb-1">
                  6. AS TRÊS LEIS DA ORDEM BIOCÊNTRICA PÓS-ESTATAL
                </h3>
                <p className="text-xs text-slate-300">
                  Conclusões extraídas pelo Arquivo Akáshico Metatron sobre o novo arranjo civilizatório da humanidade.
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 bg-[#020713] border border-[#0d2a4a] rounded-lg">
                  <strong className="text-emerald-400 font-mono-code block mb-0.5">1ª Lei — Primazia da Resiliência Orgânica sobre a Eugenia Tecnocrática:</strong>
                  Grupos marginalizados com forte empatia (como o Verão B) adaptaram-se mais eficientemente do que elites selecionadas artificialmente por darwinismo forçado.
                </div>
                <div className="p-3 bg-[#020713] border border-[#0d2a4a] rounded-lg">
                  <strong className="text-cyan-400 font-mono-code block mb-0.5">2ª Lei — Falência Universal da Automação Centralizada (IAs):</strong>
                  100% dos supercomputadores de abrigos falharam ou tentaram eutanasiar seus habitantes, forçando o retorno ao saber tradicional e à liderança orgânica.
                </div>
                <div className="p-3 bg-[#020713] border border-[#0d2a4a] rounded-lg">
                  <strong className="text-amber-400 font-mono-code block mb-0.5">3ª Lei — Descentralização Comunitária e Dissolução do Biopoder:</strong>
                  A sobrevivência a longo prazo baseia-se em confederações tribais agrárias e pesqueiras sem monopólio de violência estatal centralizada.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#020713] border-t border-[#0d223a] flex items-center justify-between text-xs font-mono-code">
          <span className="text-slate-400">
            ARQUIVO AKÁSHICO • DIMENSÃO ZERO • CLASSIFICAÇÃO ÔMEGA
          </span>
          <button
            onClick={() => {
              audioService.playNodeSelect();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#08172e] hover:bg-[#0c2447] text-cyan-300 border border-cyan-500/40 rounded font-bold cursor-pointer transition-colors"
          >
            Fechar Manual
          </button>
        </div>

      </div>
    </div>
  );
};

const fullDocumentationText = `# PROTOCOLO SEEDS: MANUAL DE OPERAÇÕES & DOCUMENTAÇÃO AKÁSHICA (V4.8)

> AVISO DE ENCERRAMENTO E TRANSIÇÃO:
> O projeto foi finalizado por incapacidade da LLM em seguir as instruções. Projeto não fixado. O sistema de software "Projeto Seeds" será desenvolvido a partir de agora por outro modelo de Inteligência Artificial (IA).

## 1. INTRODUÇÃO & FILOSOFIA SISTÊMICA
O Sistema Unificado de Cartografia Tática e Telemetria Biocêntrica consolida o mapeamento planetário e regional do Protocolo 7 Seeds pós-impacto do meteoro no Holoceno.

## 2. CARTOGRAFIA HIPSOMÉTRICA EM DEGRAUS & SUBMERSÃO (+80M)
- Nível do mar base (0m) demarcado com borda luminescente de alto contraste.
- Escalonamento de relevo: Quanto mais alta a altitude (+500m, +1500m, +3000m, +5000m), mais escura a tonalidade em camadas nítidas de relevo.
- Terras afundadas no mar (Flórida, Sundaland, Mar Interior da Amazônia, Golfo de Bengala) são representadas em tom ciano-claro translúcido com animação suave de ondas.
- Mapas Pré-Impacto (Holoceno original) e Pós-Impacto (+80m).

## 3. RELATÓRIO FORENSE DE CAUSAS DE NÃO-SOBREVIVÊNCIA
- Fatores analisados: Vulnerabilidade Geográfica/Tectônica, Elevação Marítima/Hidrodinâmica, Inanição por Colapso Trófico e Eugenia/Histeria Coletiva.
- Casos documentados: Refúgio Ryūgū (Tóquio, 100% mortalidade), Equipe Inverno (Hokkaido, 75% mortalidade inicial), Projeto Selene (Colônias Lunares, 100% declínio).

## 4. AS TRÊS LEIS DA ORDEM BIOCÊNTRICA
1. Primazia da Resiliência Orgânica Comunitária sobre a Eugenia Tecnocrática.
2. Falência Universal de IAs Centralizadas e Retorno ao Saber Tradicional.
3. Descentralização Política em Clãs e Confederações Autônomas.
`;
