import {
  LivingLineStageInfo,
  GlobalMilitaryChokepoint,
  GlobalMilitaryGarrison,
  GlobalThreatTheater,
  GlobalStrategicCorridor
} from '../types/worldMilitaryMap';

// =========================================================================
// 1. PEDAGOGIA DA "LINHA VIVA": O ENSINAMENTO CARTOGRÁFICO DAS BORDAS
// =========================================================================
export const LIVING_LINE_STAGES: LivingLineStageInfo[] = [
  {
    stage: 'stage_1_envelope',
    stageNumber: 1,
    title: 'A Forma Geral (O Envelope Primordial)',
    subtitle: 'Ensinando a criança e o militar a enxergar a grande massa geométrica',
    pedagogicalLesson: 'Ensine a pensar primeiro em uma forma simples, arredondada ou poligonal. A América do Sul como um triângulo inclinado, a África como um trapézio largo com cone inferior, a Austrália como um bloco ovalado.',
    visualCharacteristics: [
      'Contornos geométricos puros e simplificados',
      'Ausência intencional de detalhes litorâneos e reentrâncias',
      'Fixação da proporção e do equilíbrio de massa no espaço do mapa'
    ],
    drawingAdviceForChildren: 'Não tente desenhar cada ilha logo de início! Desenhe primeiro uma almofada arredondada ou um triângulo suave. Sinta o peso da massa continental.',
    militarySignificance: 'Visão de Estado-Maior no Teatro Estratégico (Teatro Global de Operações). Fixação dos grandes limites marítimos e eixos planetários.'
  },
  {
    stage: 'stage_2_promontories',
    stageNumber: 2,
    title: 'Grandes Inflexões, Chifres & Golfos',
    subtitle: 'Acrescentando os marcos anatômicos maiores do relevo continental',
    pedagogicalLesson: 'Sobre a forma geral, corte os grandes golfos e estenda as grandes penínsulas: o Chifre da Somália, o Golfo da Guiné, a Península Arábica, o Golfo do México e o Cone Sul.',
    visualCharacteristics: [
      'Diferenciação clara das grandes penínsulas e bacias',
      'Definição das gargantas oceânicas e istmos estruturais',
      'Preservação da silhueta matriz definida na Etapa 1'
    ],
    drawingAdviceForChildren: 'Dê "mordidas" suaves na massa para criar golfos e "puxe" cantos para fazer penínsulas. O continente começa a ganhar sua identidade inconfundível!',
    militarySignificance: 'Mapeamento de Avenidas Estratégicas Intercontinentais e delimitação de Teatros Navais de Grande Escala.'
  },
  {
    stage: 'stage_3_living_line',
    stageNumber: 3,
    title: 'A Linha Viva (Curvas, Pontas, Reentrâncias & Tremores)',
    subtitle: 'A borda não é um contorno perfeito, mas uma linha orgânica e viva',
    pedagogicalLesson: 'A costa real é esculpida por ondas, marés, terremotos e geleiras. A mão introduz tremores calculados, pontas afiadas, deltas recortados, fiordes profundos e pequenas reentrâncias sem nunca perder o formato principal.',
    visualCharacteristics: [
      'Rugosidade fractal realista ao longo de todo o litoral',
      'Fiordes recortados na Escandinávia e Patagônia',
      'Rias, estuários e quebras tectônicas pós-impacto do meteoro'
    ],
    drawingAdviceForChildren: 'Deixe o lápis vibrar levemente na mão! A linha deve parecer respirar: faça pequenas curvas para dentro, saliências para fora e tremores controlados.',
    militarySignificance: 'Identificação de enseadas de desembarque anfíbio, baías de ancoragem abrigadas e falésias intransponíveis para forças terrestres.'
  },
  {
    stage: 'stage_4_military_seeds',
    stageNumber: 4,
    title: 'A Camada Tática Militar & Frentes Seeds',
    subtitle: 'Projeção de tropas, telemetria, búnqueres e gargantas operacionais',
    pedagogicalLesson: 'Sobre o mapa de linhas vivas, as tropas militares projetam o sistema de inteligência: 11 Frentes Globais Seeds, guarnições ativas, gargantas estratégicas (Chokepoints) e zonas de ruptura.',
    visualCharacteristics: [
      'Gargantas estratégicas mundiais (Malaca, Suez, Gibraltar, Panamá, Ormuz)',
      '11 Frentes Continentais Seeds com efetivo e prontidão militar',
      'Zonas de ameaças bióticas, remanescentes autômatos e rotas logísticas globais'
    ],
    drawingAdviceForChildren: 'Agora que o mundo está desenhado vivo, coloque as bandeiras das tropas protetoras, as rotas dos navios e os pontos onde as sementes da humanidade estão guardadas!',
    militarySignificance: 'Consciência Situacional Planetária (COP Global) integrada aos padrões doutrinários da OTAN e do Projeto Seeds.'
  }
];

// =========================================================================
// 2. GARGANTAS ESTRATÉGICAS GLOBAIS (GLOBAL MILITARY CHOKEPOINTS)
// =========================================================================
export const GLOBAL_MILITARY_CHOKEPOINTS: GlobalMilitaryChokepoint[] = [
  {
    id: 'choke-malacca',
    name: 'Estreito de Malaca (Passagem Indo-Pacífica)',
    internationalCode: 'CP-INDO-01',
    type: 'maritime_strait',
    x: 775,
    y: 350,
    latLong: '1°26\'N 102°58\'E',
    mgrsGrid: '48N VJ 3412 8901',
    strategicImportance: 'Crítica / Vital',
    widthKm: 2.8,
    depthMeters: 25,
    controllingFaction: 'Força-Tarefa Semente Sudeste Asiático (Blue Force)',
    threatLevel: 'Elevado',
    description: 'A garganta marítima mais densa do planeta. Ponto de conexão vital entre o Oceano Índico e o Mar da China Meridional/Pacífico.',
    tacticalDoctrine: {
      navalAccess: 'Restrito a calados inferiores a 20m. Risco de minagem de canal e ataques assimétricos por lanchas rápidas.',
      landManoeuvre: 'Cobertura de artilharia costeira e baterias de mísseis antibio a partir da Península Malaia e Sumatra.',
      airInterdiction: 'Zona de patrulha constante de drones ISR e aeronaves de controle aéreo antecipado.',
      seedsLogistics: 'Canal primário de comboios navais de alimentos entre a Frente Indiana e o Arquipélago Japonês.'
    },
    recommendedTroopForce: '1ª Esquadra de Patrulha Costeira + Bateria de Defesa Costeira 155mm'
  },
  {
    id: 'choke-suez',
    name: 'Canal de Suez & Estreito de Bab-el-Mandeb',
    internationalCode: 'CP-MED-RED-02',
    type: 'maritime_strait',
    x: 585,
    y: 275,
    latLong: '29°55\'N 32°33\'E',
    mgrsGrid: '36R UU 7619 4521',
    strategicImportance: 'Crítica / Vital',
    widthKm: 0.3,
    depthMeters: 24,
    controllingFaction: 'Guarnição Mediterrânea-Sahel (Seeds África/Europa)',
    threatLevel: 'Hostil / Disputado',
    description: 'Eixo estratégico unindo o Mar Mediterrâneo ao Mar Vermelho. Alvo constante de incursões de remanescentes robóticos e tempestades de areia iônicas.',
    tacticalDoctrine: {
      navalAccess: 'Canal artificial estreito suscetível a bloqueio por embarcações avariadas ou demolição controlada de margens.',
      landManoeuvre: 'Flancos desérticos de alta trafegabilidade para blindados leves, porém com alto desgaste por abrasão de silício.',
      airInterdiction: 'Supressão de defesas antiaéreas necessária para manter o corredor aéreo aberto.',
      seedsLogistics: 'Rota direta de transferência de sementes mediterrâneas para a África Oriental.'
    },
    recommendedTroopForce: '2º Batalhão de Fuzileiros Blindados + 4 Drones de Reconhecimento Contínuo'
  },
  {
    id: 'choke-gibraltar',
    name: 'Estreito de Gibraltar (Acesso Atlântico-Mediterrâneo)',
    internationalCode: 'CP-ATL-MED-03',
    type: 'maritime_strait',
    x: 480,
    y: 255,
    latLong: '35°58\'N 5°36\'W',
    mgrsGrid: '30S TF 8920 1209',
    strategicImportance: 'Crítica / Vital',
    widthKm: 14.3,
    depthMeters: 300,
    controllingFaction: 'Liga de Defesa Ibérica-Continental (Seeds Europa)',
    threatLevel: 'Moderado',
    description: 'Garganta natural de controle entre o Oceano Atlântico e o Mar Mediterrâneo. Bastião fortificado sobre o Rochedo e a costa de Ceuta.',
    tacticalDoctrine: {
      navalAccess: 'Corrente submarina profunda favorável à passagem furtiva de submarinos autônomos.',
      landManoeuvre: 'Falésias rochosas com fortificações em cavernas e postos de observação óptica de longo alcance.',
      airInterdiction: 'Domínio total do espaço aéreo pelo sistema radar da Frente Europeia.',
      seedsLogistics: 'Ponto de triagem de comboios transatlânticos vindos das Américas.'
    },
    recommendedTroopForce: 'Grupo de Artilharia de Costa + Sistema Integrado de Radares de Superfície'
  },
  {
    id: 'choke-panama',
    name: 'Istmo & Canal do Panamá (Ponte Transoceânica)',
    internationalCode: 'CP-AMER-04',
    type: 'land_isthmus',
    x: 215,
    y: 355,
    latLong: '9°04\'N 79°40\'W',
    mgrsGrid: '17P KK 2189 4432',
    strategicImportance: 'Crítica / Vital',
    widthKm: 0.15,
    depthMeters: 18,
    controllingFaction: 'Ponta de Lança Pan-Americana (Seeds América do Norte & Sul)',
    threatLevel: 'Elevado',
    description: 'Ponte terrestre que une as Américas e canal navegável entre os Oceanos Atlântico e Pacífico. Coberto por superflorestas com alta taxa de crescimento botânico.',
    tacticalDoctrine: {
      navalAccess: 'Eclusas restauradas sob guarda armada 24h. Risco de sabotagem por biomassa fúngica.',
      landManoeuvre: 'Infantaria de selva especializada em combate de emboscada e neutralização de espécimes predadores.',
      airInterdiction: 'Cobertura de radar dificultada pela refração do dossel florestal úmido.',
      seedsLogistics: 'Conexão vital para intercâmbio de germoplasma botânico entre a Amazônia e os Apalaches.'
    },
    recommendedTroopForce: 'Brigada de Selva Pan-Americana + Esquadrão Anfíbio de Resposta Rápida'
  },
  {
    id: 'choke-hormuz',
    name: 'Estreito de Ormuz (Garganta do Golfo Pérsico)',
    internationalCode: 'CP-GULF-05',
    type: 'maritime_strait',
    x: 645,
    y: 290,
    latLong: '26°34\'N 56°15\'E',
    mgrsGrid: '40R DR 7810 5621',
    strategicImportance: 'Alta Prioridade',
    widthKm: 39.0,
    depthMeters: 100,
    controllingFaction: 'Comando do Oriente Médio (Aliança Cratônica)',
    threatLevel: 'Elevado',
    description: 'Garganta que controla o acesso aos reservatórios de energia e combustíveis sintéticos das antigas bacias mesopotâmicas.',
    tacticalDoctrine: {
      navalAccess: 'Canais de navegação rasos vulneráveis a enxames de drones marinhos de superfície.',
      landManoeuvre: 'Costas rochosas escarpadas na Península de Musandam perfeitas para emboscadas de mísseis guiados.',
      airInterdiction: 'Monitoramento térmico FLIR intensivo devido à alta irradiação solar do deserto circundante.',
      seedsLogistics: 'Escolta obrigatória de petroleiros e barcaças químicas.'
    },
    recommendedTroopForce: 'Regimento de Defesa Costeira com Lançadores Múltiplos de Foguetes'
  },
  {
    id: 'choke-bosphorus',
    name: 'Estreitos de Bósforo & Dardanelos',
    internationalCode: 'CP-EURAS-06',
    type: 'maritime_strait',
    x: 565,
    y: 235,
    latLong: '41°07\'N 29°04\'E',
    mgrsGrid: '35T PF 1209 8832',
    strategicImportance: 'Alta Prioridade',
    widthKm: 0.75,
    depthMeters: 65,
    controllingFaction: 'Bastião Anatólico-Bálcãs (Seeds Eurásia)',
    threatLevel: 'Moderado',
    description: 'Garganta continental que separa a Europa da Ásia Menor e conecta o Mar Negro ao Mediterrâneo.',
    tacticalDoctrine: {
      navalAccess: 'Correntes superficiais fortes exigem pilotos navais experientes.',
      landManoeuvre: 'Zona urbana residual e pontes destruídas transformadas em posições fortificadas de tiro.',
      airInterdiction: 'Corredor aéreo protegido por redes de mísseis antiaéreos de médio alcance.',
      seedsLogistics: 'Porta de saída dos grãos e sementes das mega-estepes ucranianas e russas.'
    },
    recommendedTroopForce: '1º Batalhão Mecanizado de Guardas de Istambul + Bateria de Artilharia Fluvial'
  },
  {
    id: 'choke-bering',
    name: 'Estreito de Bering (Ponte Continental Ártica)',
    internationalCode: 'CP-POLAR-07',
    type: 'polar_corridor',
    x: 50,
    y: 110,
    latLong: '65°45\'N 168°58\'W',
    mgrsGrid: '02W QK 4519 8920',
    strategicImportance: 'Alta Prioridade',
    widthKm: 82.0,
    depthMeters: 45,
    controllingFaction: 'Comando Ártico Conjunto (Seeds América do Norte / Sibéria)',
    threatLevel: 'Moderado',
    description: 'Ponte de gelo sazonal e passagem marítima entre a Ásia Hiperbórea e o Alasca. Eixo de manobra de blindados adaptados a temperaturas de -45°C.',
    tacticalDoctrine: {
      navalAccess: 'Navegável apenas por quebra-gelos nucleares durante 4 meses do ano.',
      landManoeuvre: 'Trânsito sobre calota polar no inverno com viaturas sobre esteiras largas tipo Aerosledge.',
      airInterdiction: 'Dificuldade de sensores ópticos por nevascas e aurora boreal ionizante.',
      seedsLogistics: 'Rota de reserva hiperbórea para troca de amostras genéticas árticas.'
    },
    recommendedTroopForce: 'Brigada de Caçadores Polares + 2 Quebra-Gelos Armados'
  },
  {
    id: 'choke-drake',
    name: 'Passagem de Drake & Cabo Horn',
    internationalCode: 'CP-SOUTH-08',
    type: 'oceanic_passage',
    x: 240,
    y: 535,
    latLong: '58°34\'S 62°54\'W',
    mgrsGrid: '19F DE 3310 9921',
    strategicImportance: 'Moderada',
    widthKm: 800.0,
    depthMeters: 4000,
    controllingFaction: 'Esquadra Austral Antártica (Seeds Antártida/América do Sul)',
    threatLevel: 'Elevado',
    description: 'Águas oceânicas mais turbulentas do planeta, com ondas de 20 metros e icebergs à deriva. Rota de circunavegação para o posto lunar e antártico.',
    tacticalDoctrine: {
      navalAccess: 'Apenas navios de classe oceânica reforçada conseguem navegar sem escolta.',
      landManoeuvre: 'Postos de radar e estações meteorológicas automáticas nas Ilhas Shetland do Sul.',
      airInterdiction: 'Ventos catabáticos extremos impedem voos de aeronaves leves e drones convencionais.',
      seedsLogistics: 'Corredor marítimo para abastecimento da Cúpula Geotérmica Antártica.'
    },
    recommendedTroopForce: 'Cruzador de Patrulha Polar + Destacamento de Aviação Embarcada Antártica'
  },
  {
    id: 'choke-giuk',
    name: 'GIUK Gap (Groenlândia - Islândia - Reino Unido)',
    internationalCode: 'CP-ATL-NORTH-09',
    type: 'maritime_strait',
    x: 430,
    y: 110,
    latLong: '63°10\'N 18°20\'W',
    mgrsGrid: '27W YU 9021 7712',
    strategicImportance: 'Alta Prioridade',
    widthKm: 420.0,
    depthMeters: 600,
    controllingFaction: 'Guarda do Atlântico Norte (Seeds Escandinávia)',
    threatLevel: 'Baixo',
    description: 'Linha estratégica de hidrofones e boias sonoras que monitora todo o tráfego submarino do Atlântico Norte.',
    tacticalDoctrine: {
      navalAccess: 'Guerra anti-submarina (ASW) intensiva e rastreamento de drones de profundidade.',
      landManoeuvre: 'Bases de apoio na Islândia com fontes geotérmicas inesgotáveis de energia.',
      airInterdiction: 'Patrulha marítima de longo alcance com sensores de anomalia magnética.',
      seedsLogistics: 'Proteção dos comboios entre o Banco Mundial de Sementes de Svalbard e o continente europeu.'
    },
    recommendedTroopForce: 'Esquadrão Aeronaval ASW + Estação de Escuta Hidroacústica Subaquática'
  }
];

// =========================================================================
// 3. GUARNIÇÕES MILITARES DAS 11 FRENTES GLOBAIS SEEDS
// =========================================================================
export const GLOBAL_SEEDS_GARRISONS: GlobalMilitaryGarrison[] = [
  {
    id: 'gar-north-america',
    programId: 'north-america',
    name: '1º Corpo Expedicionário Pan-Americano',
    echelon: 'Corpo de Exército (3 Brigadas Mecanizadas)',
    commander: 'Gen. Bda. Marcus Vance',
    locationName: 'Complexo dos Grandes Lagos & Búnquer Apalaches',
    x: 180,
    y: 210,
    readinessPct: 94,
    activeTroops: 12500,
    mechanizedVehicles: 420,
    airDefenseNetwork: 'Sistema Aegis Cúpula Terrestre (Raio 180 km)',
    primaryMission: 'Defesa das estufas hiperbóreas e patrulha do corredor de mobilidade até o Golfo do México.',
    fortificationLevel: 'Búnquer de Alta Resistência',
    strategicRole: 'Ponta de lança ofensiva do hemisfério ocidental com capacidade de projeção anfíbia e blindada.',
    color: '#38bdf8'
  },
  {
    id: 'gar-south-america',
    programId: 'south-america',
    name: 'Comando Militar da Selva Amazônica & Craton Central',
    echelon: 'Divisão de Infantaria de Selva & Forças Especiais',
    commander: 'Cel. Yara Tupinambá',
    locationName: 'Fortaleza Cratônica de Carajás & Arca do Pantanal',
    x: 275,
    y: 430,
    readinessPct: 91,
    activeTroops: 9800,
    mechanizedVehicles: 180,
    airDefenseNetwork: 'Baterias Móveis de Defesa de Ponto Guiadas a Laser',
    primaryMission: 'Contenção das espécies da superfloresta predatória e guarda da maior reserva genética vegetal do globo.',
    fortificationLevel: 'Fortaleza Subterrânea',
    strategicRole: 'Bastião botânico inexpugnável; especialistas em guerra assimétrica e infiltração silenciosa.',
    color: '#10b981'
  },
  {
    id: 'gar-europe',
    programId: 'europe',
    name: 'Liga de Defesa dos Cárpatos & Bastião Báltico',
    echelon: 'Divisão Blindada Pesada',
    commander: 'Cel. Viktor Nowak',
    locationName: 'Búnquer Alpino & Reduto das Minas de Sal da Polônia',
    x: 520,
    y: 190,
    readinessPct: 88,
    activeTroops: 11200,
    mechanizedVehicles: 390,
    airDefenseNetwork: 'Rede Integrada SAMP/T com Radares de Varredura Eletrônica Ativa (AESA)',
    primaryMission: 'Garantir a segurança do Banco de Sementes e conter incursões mecanizadas hostis nas estepes europeias.',
    fortificationLevel: 'Fortaleza Subterrânea',
    strategicRole: 'Guarda da infraestrutura tecnológica e industrial pesada do continente europeu.',
    color: '#60a5fa'
  },
  {
    id: 'gar-africa-sahel',
    programId: 'africa-sahel',
    name: 'Brigada Mecanizada do Escudo do Sahel',
    echelon: 'Brigada de Reconhecimento Rápido & Cavalaria Leve',
    commander: 'Cel. Amadou Diallo',
    locationName: 'Oásis Fortificado do Chade & Búnquer Cratônico da Guiné',
    x: 505,
    y: 350,
    readinessPct: 86,
    activeTroops: 7400,
    mechanizedVehicles: 290,
    airDefenseNetwork: 'Mísseis de Curto Alcance em Viaturas Todo-Terreno 6x6',
    primaryMission: 'Controle das bacias de água fóssil subterrânea e patrulha contra tempestades de areia iônicas.',
    fortificationLevel: 'Búnquer de Alta Resistência',
    strategicRole: 'Mobilidade extrema em terrenos desérticos; sentinelas do flanco sul do Mediterrâneo.',
    color: '#f59e0b'
  },
  {
    id: 'gar-east-asia-japan',
    programId: 'east-asia',
    name: 'Guarnição do Arquipélago & 5 Frentes Sazonais (7 Seeds COP)',
    echelon: 'Comando Conjunto de Defesa Territorial (5 Equipes + Força Tarefa)',
    commander: 'Comandante Shigeru Sugurono (Ryūgū / Sado)',
    locationName: 'Abrigo Geotérmico de Ryūgū & Centro de Sado',
    x: 875,
    y: 265,
    readinessPct: 98,
    activeTroops: 8600,
    mechanizedVehicles: 150,
    airDefenseNetwork: 'Cúpula Iônica e Baterias Subterrâneas de Defesa de Costa',
    primaryMission: 'Preservação da sucessão humana japonesa e transmissão da Matriz Ômega Metatron.',
    fortificationLevel: 'Cúpula Geotérmica',
    strategicRole: 'Nó nevrálgico de convergência de dados de toda a rede Seeds global.',
    color: '#a855f7'
  },
  {
    id: 'gar-south-asia',
    programId: 'south-asia',
    name: 'Divisão de Engenharia & Montanha do Decão',
    echelon: 'Divisão de Montanha & Defesa Fluvial',
    commander: 'Gen. Brig. Rajesh Sharma',
    locationName: 'Planalto Basáltico do Decão & Arca de Ladakh',
    x: 705,
    y: 340,
    readinessPct: 84,
    activeTroops: 14000,
    mechanizedVehicles: 210,
    airDefenseNetwork: 'Defesa Integrada de Mísseis Akash-NG de Longo Alcance',
    primaryMission: 'Gestão das represas hidrelétricas do Decão e cultivo de arroz ancestral em mega-monções.',
    fortificationLevel: 'Fortaleza Subterrânea',
    strategicRole: 'Segurança alimentar massiva para as frentes do Oceano Índico.',
    color: '#ec4899'
  },
  {
    id: 'gar-siberia-eurasia',
    programId: 'siberia-eurasia',
    name: '1ª Divisão de Caçadores Árticos da Taiga Hiperbórea',
    echelon: 'Divisão Blindada Ártica com Lagartas Alargadas',
    commander: 'Cel. Elena Morozova',
    locationName: 'Complexo Subterrâneo de Norilsk & Cúpula de Yakutsk',
    x: 780,
    y: 135,
    readinessPct: 92,
    activeTroops: 9100,
    mechanizedVehicles: 340,
    airDefenseNetwork: 'S-500 Prometheus adaptado para baixas temperaturas (-60°C)',
    primaryMission: 'Monitoramento do degelo do permafrost e extração de minerais estratégicos raros.',
    fortificationLevel: 'Fortaleza Subterrânea',
    strategicRole: 'Guarda das reservas de hidrocarbonetos sintéticos e metais do grupo da platina.',
    color: '#06b6d4'
  },
  {
    id: 'gar-oceania',
    programId: 'oceania',
    name: 'Força-Tarefa Anfíbia do Craton Austral',
    echelon: 'Regimento de Reconhecimento de Longo Alcance & Frota Anfíbia',
    commander: 'Maj. Lachlan Ross',
    locationName: 'Búnquer dos Montes Flinders & Base de Mar Interior',
    x: 885,
    y: 475,
    readinessPct: 89,
    activeTroops: 5800,
    mechanizedVehicles: 160,
    airDefenseNetwork: 'Baterias Costeiras Automatizadas e Radares de Sobre-Horizonte (JORN)',
    primaryMission: 'Defesa das reservas de sementes tolerantes à salinidade e patrulha do Pacífico Sul.',
    fortificationLevel: 'Búnquer de Alta Resistência',
    strategicRole: 'Ponto de apoio naval para conexões transpacíficas entre Ásia e América do Sul.',
    color: '#eab308'
  },
  {
    id: 'gar-antarctica',
    programId: 'antarctica',
    name: 'Comando Polar da Cúpula Geotérmica Erebus',
    echelon: 'Batalhão de Operações Polares & Defesa Subglaciar',
    commander: 'Dra. Ten.-Cel. Astrid Lindqvist',
    locationName: 'Monte Erebus & Lago Subglaciar Vostok',
    x: 520,
    y: 545,
    readinessPct: 96,
    activeTroops: 2400,
    mechanizedVehicles: 80,
    airDefenseNetwork: 'Defesa Pontual com Canhões Eletromagnéticos (Railguns)',
    primaryMission: 'Manutenção do arquivo genético de criopreservação da biosfera planetária.',
    fortificationLevel: 'Fortaleza Subterrânea',
    strategicRole: 'Cofre final da humanidade protegido por 3.000m de calota de gelo.',
    color: '#f8fafc'
  },
  {
    id: 'gar-lunar-outpost',
    programId: 'lunar-outpost',
    name: 'Destacamento Espacial da Base Selenita Shackleton',
    echelon: 'Companhia de Guarda Orbital & Engenharia Selenita',
    commander: 'Cel. Astronauta Hiroshi Tanaka',
    locationName: 'Cratera Shackleton (Polo Sul Lunar)',
    x: 940,
    y: 65,
    readinessPct: 99,
    activeTroops: 420,
    mechanizedVehicles: 35,
    airDefenseNetwork: 'Laser Orbital de Energia Direcionada (DEW) e Mísseis Anti-Meteoro',
    primaryMission: 'Vigilância astronômica do espaço profundo, alerta de bólidos cósmicos e retransmissão de dados.',
    fortificationLevel: 'Base Modular Lunar',
    strategicRole: 'Sentinela extraterrestre inalcançável por cataclismos da biosfera terrestre.',
    color: '#c084fc'
  }
];

// =========================================================================
// 4. TEATROS DE AMEAÇA GLOBAL (GLOBAL THREAT THEATERS)
// =========================================================================
export const GLOBAL_THREAT_THEATERS: GlobalThreatTheater[] = [
  {
    id: 'threat-automatons-gobi',
    name: 'Zona Hostil de Autômatos Remanescentes do Gobi',
    category: 'hostile_automatons',
    severity: 'Crítica',
    center: { x: 740, y: 220 },
    radius: 42,
    dangerRadiusKm: 650,
    description: 'Enxames de drones industriais e robôs de mineração reprogramados por IA corrompida pré-impacto. Atacam qualquer veículo com motores a combustão.',
    combatDirective: 'Emprego de pulsos eletromagnéticos (EMP) e armas de micro-ondas de alta potência; proibido o avanço isolado de colunas logísticas.'
  },
  {
    id: 'threat-superforest-amazon',
    name: 'Superfloresta Mutagênica da Bacia Amazônica',
    category: 'predatory_biomass',
    severity: 'Extrema',
    center: { x: 285, y: 385 },
    radius: 55,
    dangerRadiusKm: 1200,
    description: 'Vegetação carnívora gigante, cipós constritores blindados e esporos fúngicos alucinógenos que corroem filtros de viaturas e degradam uniformes.',
    combatDirective: 'Uso obrigatório de trajes NBQR pressurizados, agentes desfolhantes enzimáticos controlados e respeito estrito a clareiras fortificadas.'
  },
  {
    id: 'threat-tsunami-sunda',
    name: 'Zona de Falha Tectônica e Megatsunamis de Sunda',
    category: 'megatsunami_fracture',
    severity: 'Extrema',
    center: { x: 810, y: 390 },
    radius: 48,
    dangerRadiusKm: 900,
    description: 'Atividade vulcânica e sismos de magnitude > 8.5 gerando ondas de até 40 metros de altura a cada 45 dias.',
    combatDirective: 'Instalação de estações hidroacústicas de alerta antecipado e ancoragem de navios apenas em águas abertas profundas (>200m).'
  },
  {
    id: 'threat-radiation-chernobyl',
    name: 'Anomalia Iônica & Fissura Residual de Pripyat',
    category: 'radiation_anomaly',
    severity: 'Moderada',
    center: { x: 550, y: 165 },
    radius: 28,
    dangerRadiusKm: 350,
    description: 'Fissura geológica que reativou isótopos antigos, criando tempestades elétricas perpétuas que cegam radares na faixa X.',
    combatDirective: 'Contorno obrigatório por comboios aéreos; blindagem de chumbo em viaturas de reconhecimento de solo.'
  }
];

// =========================================================================
// 5. CORREDORES ESTRATÉGICOS GLOBAIS DE MANOBRA & LOGÍSTICA
// =========================================================================
export const GLOBAL_STRATEGIC_CORRIDORS: GlobalStrategicCorridor[] = [
  {
    id: 'corridor-transpacific',
    name: 'Ponte Aero-Naval Transpacífica (América - Japão)',
    color: '#38bdf8',
    pathD: 'M 160,240 Q 50,300 875,265',
    fromName: 'Grandes Lagos (América do Norte)',
    toName: 'Sado / Ryūgū (Japão)',
    type: 'supply_air_bridge',
    transitSecurity: 'Sob Escolta Contínua',
    capacityTonDay: 450
  },
  {
    id: 'corridor-transatlantic',
    name: 'Eixo Logístico Transatlântico (América - Europa)',
    color: '#60a5fa',
    pathD: 'M 220,240 Q 360,180 500,200',
    fromName: 'Grandes Lagos (América do Norte)',
    toName: 'Bastião dos Cárpatos (Europa)',
    type: 'naval_convoy',
    transitSecurity: 'Seguro',
    capacityTonDay: 1200
  },
  {
    id: 'corridor-eurasian-steppe',
    name: 'Corredor Terrestre Trans-Eurasiano (Europa - Sibéria - Índia)',
    color: '#34d399',
    pathD: 'M 520,190 Q 640,160 780,135 Q 730,260 705,340',
    fromName: 'Europa Central',
    toName: 'Planalto do Decão (Índia)',
    type: 'transcontinental_land_axis',
    transitSecurity: 'Zona de Alto Risco',
    capacityTonDay: 800
  },
  {
    id: 'corridor-polar-antarctic',
    name: 'Linha Oceânica Austral (América do Sul - Antártida)',
    color: '#f472b6',
    pathD: 'M 270,470 Q 250,510 520,545',
    fromName: 'Craton Brasileiro / Patagônia',
    toName: 'Cúpula Erebus (Antártida)',
    type: 'naval_convoy',
    transitSecurity: 'Sob Escolta Contínua',
    capacityTonDay: 300
  }
];
