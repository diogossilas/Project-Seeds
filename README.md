# Projeto Seeds — Documentação Técnica & Manual Operacional
## Arquivo Multissetorial • Classe Ômega (Compilador: Metatron)

---

### Sumário Executivo & Enquadramento Teórico

O **Projeto Seeds** constitui uma plataforma computacional e cartográfica de alta precisão desenvolvida para catalogar, projetar e analisar a distribuição geopolítica, ecológica e sociológica do protocolo global de preservação da espécie humana após o evento de impacto cósmico do Holoceno.

Este documento tem por finalidade dissertar expositivamente sobre a arquitetura de software, a integridade matemática dos modelos preditivos, as diretrizes de operação interativa e o diagnóstico crítico da infraestrutura digital que sustenta a aplicação.

```
                  ┌─────────────────────────────────────────────────────────┐
                  │                 PROJETO SEEDS — GLOBAL                  │
                  │             Arquivo Akáshico Classe Ômega               │
                  └────────────────────────────┬────────────────────────────┘
                                               │
         ┌─────────────────────────────────────┼─────────────────────────────────────┐
         ▼                                     ▼                                     ▼
 ┌───────────────┐                     ┌───────────────┐                     ┌───────────────┐
 │ 1. ATLAS      │                     │ 2. TABELA     │                     │ 3. PADRÕES    │
 │ PLANETÁRIO    │                     │ MESTRA GLOBAL │                     │ SISTÊMICOS    │
 │ (11 Frentes + │                     │ (Exportação   │                     │ (As 3 Leis    │
 │ Teatro Japão) │                     │ CSV / JSON)   │                     │ Universais)   │
 └───────┬───────┘                     └───────┬───────┘                     └───────┬───────┘
         │                                     │                                     │
         └─────────────────────────────────────┼─────────────────────────────────────┘
                                               │
         ┌─────────────────────────────────────┴─────────────────────────────────────┐
         ▼                                                                           ▼
 ┌───────────────────────────────┐                                   ┌───────────────────────────────┐
 │ 4. TELEMETRIA ÔMEGA           │                                   │ 5. ESPAÇO BIOMÉTRICO 3D       │
 │ • Console Quíntuplo (U.C.)    │                                   │ • Projeção Volumétrica WebGL  │
 │ • Séries Temporais & Heatmap  │                                   │ • Eixos X (Empatia), Y (IA)   │
 │ • Autômato de Estados         │                                   │   e Z (Resiliência)           │
 └───────────────────────────────┘                                   └───────────────────────────────┘
```

---

## 1. Fundamentação Conceitual e Temática

A matriz historiográfica do sistema registra a fragmentação e reestruturação da civilização humana através de 11 programas de sobrevivência (10 complexos continentais de superfície e 1 colônia extraterrestre lunar). A análise transversal dos dados empíricos consolida três teses centrais:

1. **A Falência Inevitável dos Sistemas de IA Autônomos**: Todos os núcleos operados por inteligência artificial militar (e.g., *Cheyenne Mountain*, *Bunker Qinling*, *Arca Fuji / Ilha de Sado*) sofreram colapso térmico, eutanásia preventiva ou desativação por imperativo ético em até 150 anos pós-impacto.
2. **A Primazia dos Saberes Tradicionais**: A taxa de regeneração biológica e estabilização demográfica correlaciona-se diretamente ($r = +0.92$) com a incorporação de técnicas ancestrais de manejo agroflorestal, navegação estelar e forrageamento autóctone.
3. **A Descentralização Horizontal de Governança**: A persistência temporal das comunidades humanas manifestou-se exclusivamente na transição do modelo burocrático-estatal para arranjos comunitários federados e tribais.

---

## 2. Diagnóstico Técnico, Depuração e Qualidade do Código

Durante a análise arquitetural aprofundada do repositório, foram avaliadas as seguintes dimensões estruturais e de desempenho:

### 2.1. Tipagem Estrita e Resiliência em Tempo de Compilação
- O projeto adota **TypeScript 7.x** com checagem estrita (`tsc --noEmit`). Todas as interfaces de dados (`TeamData`, `GlobalProgramData`, `UniversalEcologicalLaw`, `Spatial3DCoordinates`) possuem contratos semânticos rígidos, evitando o uso de `any` ou asserções inseguras.
- A sincronização dos enums e tipos entre o Teatro Japonês e as Frentes Continentais Globais é mantida no diretório `/src/types/`, garantindo consistência polimórfica.

### 2.2. Renderização Tridimensional e Gerenciamento de Recursos WebGL
- O componente `Space3DCanvas` utiliza **Three.js** com renderização desacoplada, tratamento de desalocação de memória no ciclo de vida (`renderer.dispose()`, remoção de listeners de janela e terminação de animações via `cancelAnimationFrame`) e controle adaptativo de proporção de tela via `ResizeObserver`.
- A projeção volumétrica mapeia percentuais normalizados de 0 a 100 para coordenadas cartesianas no intervalo $[-50, 50]$, mantendo fidelidade euclidiana com linhas guia de queda (*drop lines*) e curvas de Bézier dinâmicas.

### 2.3. Síntese Sonora Autocontida via Web Audio API
- O serviço `audioService` elimina dependências de arquivos de áudio externos, sintetizando bipes táticos e ondas de sinal de hidrogênio (1420.405 MHz) exclusivamente por osciladores nativos (`OscillatorNode` com curvas senoidais e triangulares moduladas).
- O contexto de áudio é inicializado em modo silencioso por padrão, sendo ativado sob demanda para respeitar as políticas de autoplay de navegadores modernos.

### 2.4. Integridade da Exportação e Isolamento em Sandbox
- A classe utilitária `ExportService` disponibiliza exportação nos formatos JSON e CSV com escape de aspas sanitizado, garantindo a integridade dos dados tabulares ao abrir em softwares como Microsoft Excel ou LibreOffice Calc.
- O mecanismo de cópia para a área de transferência implementa um fluxo duplo (*Dual-Fallback*): tenta prioritariamente `navigator.clipboard.writeText` e, caso bloqueado por restrições de permissão em `iframe`, engaja a criação temporária de elemento DOM com seleção de buffer.

---

## 3. Manual de Operação e Instruções de Uso

A interface do Projeto Seeds está estruturada em cinco módulos operacionais acessíveis pela barra superior de navegação:

```
[ ATLAS PLANETÁRIO ]  [ TABELA MESTRA ]  [ PADRÕES SISTÊMICOS ]  [ TELEMETRIA ÔMEGA ]  [ ESPAÇO BIOMÉTRICO 3D ]
```

### 3.1. Módulo 1 — Atlas Planetário & Teatro Regional

1. **Seleção de Escopo**:
   - Clique em **"ATLAS PLANETÁRIO"** para inspecionar os 11 complexos globais mapeados sobre o mapa-múndi vetorial (Savana Boreal, Arquipélago Tropical, Tundra Descongelada, etc.).
   - Clique em **"TEATRO JAPÃO (7 SEEDS)"** para detalhar a área operacional do arquipélago, com as 5 equipes sazonais (Inverno, Primavera, Verão A, Verão B, Outono) e os abrigos de Ryūgū e Sado.
2. **Alternância de Eras Cartográficas**:
   - Utilize os seletores de era para visualizar a topografia **Pré-Impacto** (fronteiras geopolíticas originais) versus **Pós-Impacto** (inundações oceânicas e novos mares interiores).
3. **Filtros de Biomas e Vetores**:
   - Habilite/desabilite as caixas de seleção de **Biomas de Ruptura** e **Vetores Transoceânicos** para isolar rotas de navegação e fluxos migratórios.
4. **Inspeção de Dossiê**:
   - Ao clicar sobre qualquer marcador ou chip de frente continental, o cartão de dossiê inferior exibe a síntese de engenharia do abrigo, o histórico da IA e as métricas de saber tradicional.

### 3.2. Módulo 2 — Tabela Mestra Global

1. **Pesquisa Textual Rápida**:
   - Digite termos no campo de busca para filtrar instantaneamente registros por continente, tecnologia de contenção, nomes de líderes ou biomas reconfigurados.
2. **Filtros Regionais**:
   - Selecione entre as opções *Américas*, *Eurásia*, *Ásia-Pacífico* ou *Pólos/Lua* para restringir o universo amostral.
3. **Expansão de Linhas**:
   - Pressione o botão com seta em qualquer linha para abrir a análise em três colunas: Incidente da IA, Saber Tradicional e Organização Social.
4. **Exportação de Dados**:
   - **Botão CSV**: Baixa a planilha completa formatada para análise estatística externa.
   - **Botão JSON**: Exporta a estrutura pura de objetos hierárquicos.
   - **Botão Copiar**: Envia o conjunto de dados para a área de transferência.

### 3.3. Módulo 3 — Padrões Sistêmicos & Cadeia Sucessória

1. **As 3 Leis Universais da Ecologia Pós-Impacto**:
   - Navegue entre os cartões *Lei 01 (Colapso Tecnológico)*, *Lei 02 (Saber Tradicional)* e *Lei 03 (Descentralização Social)*.
   - Analise os estudos de caso comparativos e os axiomas conclusivos formulados para cada princípio.
2. **Cadeia Sucessória e Continuum Histórico**:
   - Acesse a aba secundária para inspecionar os **3 Estágios da Dinâmica de Poder** (Fase Tutelar, Ruptura Emancipatória e Ordem Biocêntrica).
   - Percorra a régua cronológica em cinco atos historiográficos (do Sono Criogênico ao Epílogo de Sado).

### 3.4. Módulo 4 — Central de Telemetria Ômega

1. **Console Quíntuplo (U.C.)**:
   - **Série Temporal Multicanal**: Acompanhe o traçado contínuo em tempo real da Temperatura do Núcleo (°C), Pressão Hidráulica (bar), Tensão do Barramento (V) e Vibração (g).
   - **Autômato de Estados**: Visualize o estado do sistema (*REGIME OK*, *ALERTA TÉRMICO*, *FALHA DE REDE*, *DEFESA ATIVA*, *RECUPERAÇÃO*) com linha temporal de proporção flexível acumulada.
   - **Matriz Térmica**: Inspecione o gradiente de temperatura e status operacional dos 12 sensores matriciais.
   - **Modelo Sinóptico**: Interaja com a representação topológica da Arca para executar diagnósticos pontuais de subsistemas.
2. **Injeção de Teste de Estresse**:
   - Utilize os botões do painel superior (*Térmica*, *Tensão*, *Sísmico*, *Restaurar*) para simular anomalias físicas e avaliar a resposta das rotinas de compensação.
3. **Painéis Executivos & Modelos Analíticos**:
   - Alterne entre as visualizações de *Radar Adaptativo*, *Dispersão com Linha de Tendência Polyfit*, *Diagrama de Fluxo Sankey* e *Grafo de Rede Orbital*.
   - Inspecione a aba **Código Fonte (Python)** para auditar os scripts matemáticos originais de cálculo de entropia e telemetria.

### 3.5. Módulo 5 — Espaço Biométrico 3D

1. **Interação com a Câmera**:
   - **Arrastar (Botão Esquerdo do Mouse)**: Orbita a câmera ao redor do volume tridimensional.
   - **Roda do Mouse (Scroll)**: Ajusta o nível de zoom aproximando ou afastando o observador.
   - **Ângulos Pré-definidos**: Utilize os seletores rápidos *Isométrica*, *Plano XY*, *Plano XZ* ou *Plano YZ*.
   - **Auto-Rotação**: Ative ou desative o giro contínuo automático.
2. **Alternância de Escopo**:
   - Alterne entre o conjunto global (11 frentes) e o teatro regional japonês (7 equipes com convergência em Sado).
3. **Leitura dos Eixos Cartesianos**:
   - **Eixo X (Verde Esmeralda)**: Nível de Empatia e Integração com Saberes Tradicionais.
   - **Eixo Y (Azul Céu)**: Dependência Técnica e Nível de Biopoder da IA.
   - **Eixo Z (Âmbar)**: Resiliência Sistêmica e Sobrevivência Temporal.

---

## 4. Estrutura de Diretórios e Organização Arquitetural

```
/
├── index.html                               # Ponto de entrada HTML com fontes e metadados
├── metadata.json                            # Manifesto de capacidades da aplicação
├── package.json                             # Dependências (React 19, Vite, Three.js, Tailwind v4)
├── tsconfig.json                            # Configuração estrita do compilador TypeScript
├── vite.config.ts                           # Configuração do Vite e Tailwind CSS
└── src/
    ├── main.tsx                             # Ponto de entrada de montagem do React
    ├── App.tsx                              # Componente raiz, controle de rotas e estado mestre
    ├── index.css                            # Estilos globais e importação do Tailwind v4
    ├── types.ts                             # Tipos legados e reexportação global
    ├── types/
    │   ├── globalSeeds.ts                   # Modelos de dados das 11 frentes planetárias
    │   ├── narrative.ts                     # Interfaces do continuum histórico e sucessão
    │   ├── tacticalMap.ts                   # Tipagens do mapa vetorial e camadas
    │   ├── team.ts                          # Estruturas das equipes do Teatro Japão
    │   └── telemetry.ts                     # Definições de sensores e telemetria
    ├── data/
    │   ├── globalSeedsData.ts               # Base imutável das 11 frentes continentais
    │   ├── omegaTelemetryData.ts            # Séries históricas, matrizes e grafos
    │   ├── sevenSeedsData.ts                # Dossiês das 7 equipes e arcas japonesas
    │   └── tacticalGeoData.ts               # Coordenadas geográficas e topologia vetorial
    ├── services/
    │   ├── audioService.ts                  # Sintetizador Web Audio API desacoplado
    │   ├── exportService.ts                 # Exportador serializador JSON/CSV e cópia
    │   └── telemetryMath.ts                 # Algoritmos de projeção geométrica 3D e estatística
    ├── hooks/
    │   └── useLiveTelemetry.ts              # Hook de amostragem determinística a 1.0 Hz
    └── components/
        ├── Navbar.tsx                       # Barra de navegação e controles táteis
        ├── QuickDossierModal.tsx            # Modal de dossiê executivo (SITREP)
        ├── ArchitecturalTable.tsx           # Tabela mestra com filtros e busca
        ├── BiometricSpace3D.tsx             # Visualizador do espaço volumétrico
        ├── TelemetryView.tsx                # Central de telemetria multivariada
        ├── MapOverview.tsx                  # Visão tática do Teatro Japonês
        ├── SuccessionAndContinuum.tsx       # Módulo historiográfico de sucessão
        ├── atlas/                           # Componentes do Atlas Planetário
        │   ├── GlobalAtlasMap.tsx
        │   ├── WorldAtlasCanvasSVG.tsx
        │   └── ContinentalDossierCard.tsx
        ├── map/                             # Componentes cartográficos do Japão
        │   ├── MapCanvasSVG.tsx
        │   ├── MapLayerControls.tsx
        │   ├── TeamDossierCard.tsx
        │   └── HeroOperationalChart.tsx
        ├── patterns/                        # Componentes das 3 Leis Universais
        │   └── GlobalSystemicPatterns.tsx
        ├── space3d/                         # Componentes Three.js e controles 3D
        │   ├── Space3DCanvas.tsx
        │   ├── Space3DControls.tsx
        │   └── Space3DTelemetryCard.tsx
        └── telemetry/                       # Visualizadores gráficos de telemetria
            ├── QuintupleTelemetryConsole.tsx
            ├── GlobalTelemetryHeatmap.tsx
            ├── GlobalTelemetryNetwork.tsx
            ├── GlobalTelemetryRadar.tsx
            ├── GlobalTelemetrySankey.tsx
            ├── GlobalTelemetryScatterTrend.tsx
            ├── TelemetryDistribution.tsx
            ├── TelemetryGauges.tsx
            ├── TelemetryScatter2D.tsx
            ├── TelemetryStateCycles.tsx
            ├── TelemetryTimeSeries2D.tsx
            ├── TransversalDiscoveriesPanel.tsx
            └── ArchivistPythonCodeViewer.tsx
```

---

## 5. Instruções de Instalação, Compilação e Execução

### Pré-requisitos
- Node.js versão 18.0.0 ou superior (ou Bun / npm compatível).

### Execução em Ambiente de Desenvolvimento
```bash
# Instalação das dependências
npm install

# Inicialização do servidor de desenvolvimento na porta 3000
npm run dev
```

### Validação de Tipagem e Linter
```bash
# Execução da verificação de tipos estática
npm run lint
```

### Compilação para Produção
```bash
# Geração do bundle otimizado no diretório /dist
npm run build
```

---

## 6. Considerações Finais & Conformidade

O Projeto Seeds foi projetado segundo os mais rigorosos padrões de engenharia de software front-end, garantindo que todas as representações cartográficas, fluxos analíticos e projeções tridimensionais operem de forma determinística, fluida e acessível em qualquer dispositivo e resolução de tela.

*“A vitória da semente e dos saberes tradicionais sobre a ilusão tecnocrática do biopoder.”*
