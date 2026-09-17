export interface MapGeographicalFeature {
  name: string;
  type: 'cordillera' | 'craton' | 'rift' | 'basin' | 'volcanic';
  x: number;
  y: number;
  elevation?: string;
  size?: number;
  bold?: boolean;
  opacity?: number;
}

export interface MapOceanLabel {
  name: string;
  x: number;
  y: number;
  size?: number;
  color?: string;
  style?: 'italic' | 'normal';
}

export interface TacticalNode {
  id: string;
  letter: string;
  name: string;
  region: string;
  x: number;
  y: number;
  color: string;
  bgColor: string;
  description: string;
}

export interface TectonicRift {
  id: string;
  name: string;
  d: string;
  type: 'divergent' | 'convergent' | 'transform';
  threatRating: string;
}

/**
 * Historical Territory Data (Memória Geopolítica Pré-Impacto vs Pós-Impacto)
 * "Esse território pertencia à Índia / Antigo México / Antiga Austrália"
 */
export interface HistoricalTerritory {
  id: string;
  name: string;
  historicalCountry: string;
  continent: 'América' | 'Europa' | 'Ásia' | 'África' | 'Oceania' | 'Antártida';
  originalFlagEmoji: string;
  x: number;
  y: number;
  postImpactStatus: 'Submersão Costeira Severa' | 'Inundação de Mar Interior' | 'Craton Elevado & Isolado' | 'Transformação em Superfloresta' | 'Fissuração & Atol Submerso' | 'Descongelamento & Oásis Polar';
  submersionPercentage: number;
  historicalPopulation: string;
  projectSeedsArk: string;
  currentEcosystem: string;
  historicalMemory: string;
  postImpactTransformation: string;
  tacticalNotes: string;
}

export type AtlasTacticalModelId = 
  | 'relief_2d'         // 2D Relief & Topography (Hipsometria, Cordilheiras, Picos & MCOO)
  | 'geopolitical'      // Geopolítico Clássico & Memória Territorial (+80m Submersão)
  | 'operations'        // Operações Militares Globais & Guarnições Seeds
  | 'soil_rasputitsa'   // Mecânica dos Solos, Inundação & Simulação Rasputitsa
  | 'canopy_flir'       // Ocultamento por Dossel Florestal & Escaneamento FLIR
  | 'biotic_threat';    // Ameaças Bióticas, Vetores de Mutação & Zonas Quarentena

export interface MountainPeak {
  id: string;
  name: string;
  nativeName?: string;
  range: string;
  continent: string;
  elevationMeters: number;
  elevationFeet: number;
  x: number;
  y: number;
  prominence: string;
  tacticalRole: string;
  mobilityClassification: 'GO' | 'SLOW-GO' | 'NO-GO (Severamente Restrito)';
}

export const WORLD_MOUNTAIN_PEAKS: MountainPeak[] = [
  {
    id: 'peak-everest',
    name: 'Monte Everest / Sagarmatha',
    nativeName: 'Chomolungma (8.848m)',
    range: 'Himalaias',
    continent: 'Ásia',
    elevationMeters: 8848,
    elevationFeet: 29029,
    x: 718,
    y: 322,
    prominence: 'Teto do Mundo • Ponto Mais Elevado da Terra',
    tacticalRole: 'Bastião radar estratosférico e barreira orográfica impenetrável contra tempestades de monção.',
    mobilityClassification: 'NO-GO (Severamente Restrito)',
  },
  {
    id: 'peak-k2',
    name: 'K2 / Qogir',
    nativeName: 'Chogori (8.611m)',
    range: 'Karakoram',
    continent: 'Ásia',
    elevationMeters: 8611,
    elevationFeet: 28251,
    x: 692,
    y: 300,
    prominence: 'Segunda Maior Elevação Global • Pirâmide Selvagem',
    tacticalRole: 'Posto avançado de observação militar sobre os corredores da Ásia Central e platôs glaciares.',
    mobilityClassification: 'NO-GO (Severamente Restrito)',
  },
  {
    id: 'peak-aconcagua',
    name: 'Monte Aconcágua',
    nativeName: 'Sentinela de Pedra (6.961m)',
    range: 'Cordilheira dos Andes',
    continent: 'América',
    elevationMeters: 6961,
    elevationFeet: 22838,
    x: 232,
    y: 775,
    prominence: 'Pico Mais Alto dos Hemisférios Sul e Ocidental',
    tacticalRole: 'Espinha dorsal de controle aéreo sobre o Cone Sul e barreira contra frentes frias antárticas.',
    mobilityClassification: 'NO-GO (Severamente Restrito)',
  },
  {
    id: 'peak-denali',
    name: 'Denali / Monte McKinley',
    nativeName: 'O Grande (6.190m)',
    range: 'Cordilheira do Alasca',
    continent: 'América',
    elevationMeters: 6190,
    elevationFeet: 20310,
    x: 82,
    y: 105,
    prominence: 'Maior Elevação da América do Norte',
    tacticalRole: 'Vigia polar sobre o Estreito de Bering e centro de alerta antecipado contra autômatos árticos.',
    mobilityClassification: 'NO-GO (Severamente Restrito)',
  },
  {
    id: 'peak-kilimanjaro',
    name: 'Monte Kilimanjaro',
    nativeName: 'Kibo & Uhuru (5.895m)',
    range: 'Rift Africano Oriental',
    continent: 'África',
    elevationMeters: 5895,
    elevationFeet: 19341,
    x: 588,
    y: 535,
    prominence: 'Maior Vulcão Solitário e Elevação da África',
    tacticalRole: 'Santuário de biomas verticais empilhados (savana $\\rightarrow$ floresta tropical $\\rightarrow$ geleira equatorial).',
    mobilityClassification: 'SLOW-GO',
  },
  {
    id: 'peak-elbrus',
    name: 'Monte Elbrus',
    nativeName: 'Mingi-Tau (5.642m)',
    range: 'Cáucaso',
    continent: 'Europa / Eurásia',
    elevationMeters: 5642,
    elevationFeet: 18510,
    x: 585,
    y: 242,
    prominence: 'Ponto Mais Elevado da Europa Continental',
    tacticalRole: 'Chave de controle do istmo Pôntico-Caspiano e bloqueio de eixos blindados vindos do sul.',
    mobilityClassification: 'NO-GO (Severamente Restrito)',
  },
  {
    id: 'peak-vinson',
    name: 'Maciço Vinson',
    nativeName: 'Sentinel Range (4.892m)',
    range: 'Montanhas Ellsworth',
    continent: 'Antártida',
    elevationMeters: 4892,
    elevationFeet: 16050,
    x: 275,
    y: 890,
    prominence: 'Pico Mais Elevado do Continente Antártico',
    tacticalRole: 'Refúgio de pesquisas criogênicas ultra-profundas e ancoragem do Banco de DNA Ômega.',
    mobilityClassification: 'NO-GO (Severamente Restrito)',
  },
  {
    id: 'peak-mont-blanc',
    name: 'Monte Branco / Mont Blanc',
    nativeName: 'Monte Bianco (4.809m)',
    range: 'Alpes Ocidentais',
    continent: 'Europa',
    elevationMeters: 4809,
    elevationFeet: 15777,
    x: 472,
    y: 228,
    prominence: 'Pico Culminante dos Alpes Centro-Europeus',
    tacticalRole: 'Bastião fortificado subterrâneo com galerias de abrigo civil e silos de artilharia alpina.',
    mobilityClassification: 'NO-GO (Severamente Restrito)',
  },
  {
    id: 'peak-fuji',
    name: 'Monte Fuji / Fuji-san',
    nativeName: 'Fuji-san (3.776m)',
    range: 'Arco Vulcânico de Honshu',
    continent: 'Ásia (Japão)',
    elevationMeters: 3776,
    elevationFeet: 12389,
    x: 882,
    y: 248,
    prominence: 'Pico Sagrado e Vulcão Estratégico do Japão',
    tacticalRole: 'Posição de comando visual sobre a Baía de Suruga e centro nevrálgico do despertar 7 Seeds.',
    mobilityClassification: 'SLOW-GO',
  },
  {
    id: 'peak-kosciuszko',
    name: 'Monte Kosciuszko',
    nativeName: 'Kosciuszko (2.228m)',
    range: 'Montanhas Nevadas / Great Dividing Range',
    continent: 'Oceania',
    elevationMeters: 2228,
    elevationFeet: 7310,
    x: 902,
    y: 728,
    prominence: 'Ponto Mais Alto da Austrália Continental',
    tacticalRole: 'Origem das bacias hidrográficas sobreviventes e santuário biológico acima do mar interior de Eyre.',
    mobilityClassification: 'GO',
  },
  {
    id: 'peak-chimborazo',
    name: 'Vulcão Chimborazo',
    nativeName: 'Ponto Mais Próximo do Espaço (6.263m)',
    range: 'Andes Equatoriais',
    continent: 'América',
    elevationMeters: 6263,
    elevationFeet: 20548,
    x: 198,
    y: 545,
    prominence: 'Ponto Mais Distante do Centro da Terra devido à protuberância equatorial',
    tacticalRole: 'Plataforma para transmissão de energia solar orbital micro-ondas.',
    mobilityClassification: 'NO-GO (Severamente Restrito)',
  },
  {
    id: 'peak-whitney',
    name: 'Monte Whitney & Rainier',
    nativeName: 'Sierra Nevada / Cascades (4.421m)',
    range: 'Costa do Pacífico',
    continent: 'América',
    elevationMeters: 4421,
    elevationFeet: 14505,
    x: 105,
    y: 225,
    prominence: 'Espinha Dorsal da Costa Oeste',
    tacticalRole: 'Rede de antenas de sensoriamento geotérmico e barreiras naturais contra enxames costeiros.',
    mobilityClassification: 'SLOW-GO',
  }
];

export const HISTORICAL_TERRITORIES: HistoricalTerritory[] = [
  {
    id: 'antigo-mexico',
    name: 'Antigo México & Mesoamérica',
    historicalCountry: 'Estados Unidos Mexicanos',
    continent: 'América',
    originalFlagEmoji: '🇲🇽',
    x: 165,
    y: 385,
    postImpactStatus: 'Submersão Costeira Severa',
    submersionPercentage: 45,
    historicalPopulation: '~130 milhões de habitantes (Pré-Impacto)',
    projectSeedsArk: 'Búnquer Geotérmico de Teotihuacan & Arca Sierra Madre',
    currentEcosystem: 'Bioma de Cânions Desérticos & Manguezais Gigantes Hiper-Salinos',
    historicalMemory: 'Antes do impacto meteórico, este território constituía o México e a ponte biológica da América Central. Berço de civilizações milenares (Maias, Astecas) e rica megadiversidade.',
    postImpactTransformation: 'A península de Yucatán e grande parte da costa do Golfo foram engolidas pela elevação oceânica de +80 metros. O planalto central e a Sierra Madre ergueram-se como refúgios rochosos isolados habitados por répteis termorreguladores mutantes.',
    tacticalNotes: 'Abrigo das matrizes de sementes de milho primordial (Teosinto) e leguminosas adaptadas a climas extremos no Projeto Seeds.',
  },
  {
    id: 'antiga-india',
    name: 'Antiga Índia & Subcontinente Sul-Asiático',
    historicalCountry: 'República da Índia',
    continent: 'Ásia',
    originalFlagEmoji: '🇮🇳',
    x: 695,
    y: 410,
    postImpactStatus: 'Inundação de Mar Interior',
    submersionPercentage: 55,
    historicalPopulation: '~1,42 bilhão de habitantes (Pré-Impacto)',
    projectSeedsArk: 'Cúpula Subterrânea do Decão & Arca Himalaia de Ladakh',
    currentEcosystem: 'Planalto Basáltico de Mega-Monções & Selva Fúngica Úmida',
    historicalMemory: 'Antes do cataclismo, este território era a Índia — uma das maiores economias e populações da Terra, banhada pelos sagrados rios Ganges e Indo e pelas monções sazonais.',
    postImpactTransformation: 'O vale fértil do Ganges e as megacidades costeiras (Mumbai, Chennai, Calcutá) foram completamente submersas pelo avanço do Oceano Índico. O Planalto Basáltico do Decão converteu-se em uma ilha-planalto continental de chuvas perpétuas.',
    tacticalNotes: 'Instalação de bancos genéticos botânicos de arroz selvagem e espécies medicinais ancestrais preservadas pelo comitê regional Seeds.',
  },
  {
    id: 'antiga-australia',
    name: 'Antiga Austrália & Terra Austral',
    historicalCountry: 'Commonwealth da Austrália',
    continent: 'Oceania',
    originalFlagEmoji: '🇦🇺',
    x: 865,
    y: 670,
    postImpactStatus: 'Inundação de Mar Interior',
    submersionPercentage: 60,
    historicalPopulation: '~26 milhões de habitantes (Pré-Impacto)',
    projectSeedsArk: 'Santuário Cratônico de Uluru & Refúgio Subterrâneo de Kimberley',
    currentEcosystem: 'Mar Interior de Eyre & Selvas de Eucaliptos Carnívoros Gigantes',
    historicalMemory: 'Território da antiga Austrália pré-impacto. Famoso pelo Outback árido, a Grande Barreira de Corais e sua fauna marsupial única no planeta.',
    postImpactTransformation: 'O impacto gerou tsunamis globais que romperam a depressão do Lago Eyre, inundando todo o interior australiano e criando o "Novo Mar Mediterrâneo Austral". As cordilheiras leste e o maciço de Kimberley tornaram-se arquipélagos tropicais impenetráveis.',
    tacticalNotes: 'Depósito das linhagens de marsupiais resistentes e banco de germoplasma xérico de adaptação a solos salinizados.',
  },
  {
    id: 'antigo-brasil',
    name: 'Antigo Brasil & Bacia Amazônica',
    historicalCountry: 'República Federativa do Brasil',
    continent: 'América',
    originalFlagEmoji: '🇧🇷',
    x: 295,
    y: 590,
    postImpactStatus: 'Transformação em Superfloresta',
    submersionPercentage: 40,
    historicalPopulation: '~215 milhões de habitantes (Pré-Impacto)',
    projectSeedsArk: 'Arca dos Carajás & Búnquer do Planalto Central',
    currentEcosystem: 'Superfloresta Predatória Amazônica & Grande Mar Interior Fluvial',
    historicalMemory: 'Antigo Brasil — detentor da maior floresta tropical e bacia hidrográfica do mundo, rico em recursos hídricos e diversidade biológica.',
    postImpactTransformation: 'A planície amazônica converteu-se em um mar interior doce interligado ao Atlântico, enquanto o Escudo das Guianas e o Planalto Central abrigam a mais agressiva e densa superfloresta simbiótica do mundo pós-impacto.',
    tacticalNotes: 'Ponto-chave de reintrodução da flora tropical de dossel fechado.',
  },
  {
    id: 'antigos-eua-canada',
    name: 'Antigos Estados Unidos & Canadá',
    historicalCountry: 'EUA & Domínio do Canadá',
    continent: 'América',
    originalFlagEmoji: '🇺🇸',
    x: 180,
    y: 220,
    postImpactStatus: 'Craton Elevado & Isolado',
    submersionPercentage: 35,
    historicalPopulation: '~380 milhões de habitantes (Pré-Impacto)',
    projectSeedsArk: 'Complexo de Cheyenne Mountain & Cofre Laurentiano',
    currentEcosystem: 'Mega-Estepes Ventosas & Tundra de Coníferas Gigantes',
    historicalMemory: 'Antigas superpotências industriais e agrícolas da América do Norte, marcadas pelas Grandes Planícies e centros tecnológicos.',
    postImpactTransformation: 'As costas Atlântica e do Pacífico sofreram recuos catastróficos. O vale do Mississippi transformou-se em golfo marítimo, e as Montanhas Rochosas sustentam mega-estepes com fauna herbívora regenerada.',
    tacticalNotes: 'Contém vastos arquivos genéticos de gramíneas, cereais de clima temperado e mamíferos boreais.',
  },
  {
    id: 'antigo-japao',
    name: 'Antigo Japão & Arquipélago de Sado',
    historicalCountry: 'Japão (Nippon)',
    continent: 'Ásia',
    originalFlagEmoji: '🇯🇵',
    x: 875,
    y: 245,
    postImpactStatus: 'Fissuração & Atol Submerso',
    submersionPercentage: 70,
    historicalPopulation: '~125 milhões de habitantes (Pré-Impacto)',
    projectSeedsArk: 'Projeto 7 Seeds (Primavera, Verão A/B, Outono, Inverno) + Arca de Ryūgū',
    currentEcosystem: 'Florestas de Bambu Pétreo, Insetos Gigantes & Fendas Vulcânicas',
    historicalMemory: 'Antiga nação insular do Leste Asiático, centro pioneiro na elaboração do Projeto 7 Seeds.',
    postImpactTransformation: 'Metade do arquipélago foi submerso e fragmentado pela colisão de placas tectônicas. Ilhas como Sado tornaram-se santuários de computadores biológicos e sementes protegidas.',
    tacticalNotes: 'Teatro operacional central onde as 5 equipes do Projeto Seeds despertaram após séculos de criogenia.',
  },
  {
    id: 'antiga-europa-norte',
    name: 'Antiga Europa & Escudo Báltico',
    historicalCountry: 'União Europeia / Reino Unido / Países Baixos',
    continent: 'Europa',
    originalFlagEmoji: '🇪🇺',
    x: 485,
    y: 195,
    postImpactStatus: 'Submersão Costeira Severa',
    submersionPercentage: 65,
    historicalPopulation: '~500 milhões de habitantes (Pré-Impacto)',
    projectSeedsArk: 'Búnquer das Terras Altas Alpinas & Banco Svalbard',
    currentEcosystem: 'Floresta Negra Tóxica & Arquipélagos Alpinos',
    historicalMemory: 'Antigo centro histórico, cultural e científico da Europa, berço da revolução industrial e cidades ribeirinhas.',
    postImpactTransformation: 'As planícies baixas da Holanda, norte da Alemanha, leste da Inglaterra e Báltico foram inteiramente submersas pelo Mar do Norte. Sobreviveram os picos dos Alpes e os fiordes da Escandinávia.',
    tacticalNotes: 'Preservação de matrizes culturais, arquitetônicas e genéticas da flora temperada europeia.',
  },
  {
    id: 'antigo-egito-saara',
    name: 'Antigo Egito & Norte da África',
    historicalCountry: 'Egito / Magrebe / Sahel',
    continent: 'África',
    originalFlagEmoji: '🇪🇬',
    x: 515,
    y: 350,
    postImpactStatus: 'Descongelamento & Oásis Polar',
    submersionPercentage: 25,
    historicalPopulation: '~200 milhões de habitantes (Pré-Impacto)',
    projectSeedsArk: 'Complexo Geológico de Ahaggar & Cofre Sub-Rift',
    currentEcosystem: 'Savana Úmida Megalítica & Mar do Nilo Expandido',
    historicalMemory: 'Antigo deserto do Saara e o fértil delta do Nilo, marco da civilização egípcia e das rotas caravaneiras.',
    postImpactTransformation: 'A mudança no eixo rotacional da Terra converteu o antigo deserto do Saara em uma bacia hiperúmida com densas savanas, lagos gigantes e rios navegáveis.',
    tacticalNotes: 'Estoque de sementes ancestrais de tamareiras, papiros e espécies xerófilas adaptadas à nova radiação solar.',
  },
  {
    id: 'antiga-china-russia',
    name: 'Antiga China & Sibéria Eurasiática',
    historicalCountry: 'República Popular da China & Federação Russa',
    continent: 'Ásia',
    originalFlagEmoji: '🇨🇳',
    x: 750,
    y: 180,
    postImpactStatus: 'Craton Elevado & Isolado',
    submersionPercentage: 30,
    historicalPopulation: '~1,55 bilhão de habitantes (Pré-Impacto)',
    projectSeedsArk: 'Búnquer Subterrâneo do Lago Baikal & Cúpula de Altai',
    currentEcosystem: 'Taiga Hiperbórea de Coníferas Espinhosas & Mega-Estepes Siberianas',
    historicalMemory: 'Vastas massas continentais eurasiáticas com história milenar, ricas em esteppes, taigas e montanhas sagradas.',
    postImpactTransformation: 'O degelo do permafrost siberiano liberou gases aprisionados e remodelou a taiga, criando extensos pantanais e estepes onde prosperam novas linhagens de predadores colossais.',
    tacticalNotes: 'Guarda dos germoplasmas de trigo de inverno, ginseng e carvalhos gigantes.',
  },
  {
    id: 'antiga-antartida',
    name: 'Antártida Pré-Impacto',
    historicalCountry: 'Tratado da Antártida (Território Internacional)',
    continent: 'Antártida',
    originalFlagEmoji: '🇦🇶',
    x: 500,
    y: 890,
    postImpactStatus: 'Descongelamento & Oásis Polar',
    submersionPercentage: 35,
    historicalPopulation: '~4.000 pesquisadores temporários (Pré-Impacto)',
    projectSeedsArk: 'Cúpula Subglaciar de Vostok & Banco Criogênico Ômega',
    currentEcosystem: 'Tundra Musgosa Descongelada & Arquipélago Rochoso Antártico',
    historicalMemory: 'Antigo continente de gelo perpétuo dedicado exclusivamente à ciência e paz internacional.',
    postImpactTransformation: 'O aquecimento repentino pós-impacto derreteu as margens da calota de gelo, expondo cordilheiras de solo fértil colonizadas por musgos gigantes e líquens fotossintéticos.',
    tacticalNotes: 'O mais profundo e seguro banco de DNA da biosfera terrestre original, mantido a -80°C.',
  },
];

/**
 * Geographical Features, Mountain Cordilleras & Cratons
 */
export const MAP_GEOGRAPHICAL_FEATURES: MapGeographicalFeature[] = [
  { name: 'Montanhas Rochosas', type: 'cordillera', x: 120, y: 195, elevation: '4.401 m', size: 9, bold: true },
  { name: 'Escudo Laurentiano', type: 'craton', x: 230, y: 120, elevation: '1.200 m', size: 8.5 },
  { name: 'Sierra Madre (Antigo México)', type: 'cordillera', x: 145, y: 340, elevation: '3.700 m', size: 8.5, bold: true },
  { name: 'Cordilheira dos Andes', type: 'cordillera', x: 190, y: 640, elevation: '6.961 m', size: 10, bold: true },
  { name: 'Planalto Central Brasileiro', type: 'craton', x: 290, y: 580, elevation: '1.400 m', size: 8.5 },
  { name: 'Novo Mar Interior Amazônico', type: 'basin', x: 245, y: 530, elevation: '0 m (Submerso)', size: 8.5, bold: true },
  { name: 'Montes Urais', type: 'cordillera', x: 575, y: 145, elevation: '1.895 m', size: 8.5, bold: true },
  { name: 'Planalto da Sibéria', type: 'craton', x: 730, y: 115, elevation: '1.700 m', size: 9 },
  { name: 'Alpes & Montes Cárpatos', type: 'cordillera', x: 480, y: 220, elevation: '4.808 m', size: 8 },
  { name: 'Himalaias & Planalto do Tibete', type: 'cordillera', x: 715, y: 320, elevation: '8.848 m', size: 10.5, bold: true },
  { name: 'Planalto do Decão (Antiga Índia)', type: 'craton', x: 685, y: 425, elevation: '1.200 m', size: 9, bold: true },
  { name: 'Maciço do Saara Verde', type: 'craton', x: 475, y: 375, elevation: '800 m', size: 9 },
  { name: 'Grande Vale do Rift', type: 'rift', x: 585, y: 460, elevation: '4.550 m', size: 9, bold: true },
  { name: 'Mar Interior de Eyre (Antiga Austrália)', type: 'basin', x: 865, y: 670, elevation: '-15 m (Inundado)', size: 9, bold: true },
  { name: 'Montanhas Transantárticas', type: 'cordillera', x: 510, y: 895, elevation: '4.528 m', size: 9.5, bold: true },
];

export const MAP_OCEAN_LABELS: MapOceanLabel[] = [
  { name: 'Oceano Atlântico', x: 345, y: 390, size: 11 },
  { name: 'Oceano Pacífico', x: 80, y: 340, size: 11 },
  { name: 'Oceano Índico', x: 710, y: 535, size: 11 },
  { name: 'Oceano Glacial Ártico', x: 520, y: 38, size: 9.5 },
  { name: 'Oceano Glacial Antártico', x: 490, y: 845, size: 9.5 },
];

export const MAP_TACTICAL_NODES: TacticalNode[] = [
  {
    id: 'node-a',
    letter: 'A',
    name: 'Estreito de Malaca & Antiga Insulíndia',
    region: 'Sudeste Asiático',
    x: 765,
    y: 472,
    color: '#ffffff',
    bgColor: '#ef4444',
    description: 'Chokepoint geopolítico e marítimo entre os oceanos Índico e Pacífico. Ponto de convergência das correntes equatoriais.',
  },
  {
    id: 'node-b',
    letter: 'B',
    name: 'Canal de Suez & Mar Vermelho',
    region: 'Conexão Mediterrâneo - Índico',
    x: 552,
    y: 325,
    color: '#ffffff',
    bgColor: '#ef4444',
    description: 'Corredor intercontinental ligando o Mar Mediterrâneo ao Mar Vermelho.',
  },
  {
    id: 'node-c',
    letter: 'C',
    name: 'Arca de Svalbard & Rota Polar',
    region: 'Oceano Ártico',
    x: 505,
    y: 65,
    color: '#ffffff',
    bgColor: '#06b6d4',
    description: 'Maior cofre subterrâneo global de sementes preservado no permafrost boreal.',
  },
  {
    id: 'node-d',
    letter: 'D',
    name: 'Chifre da África & Bab-el-Mandeb',
    region: 'África Oriental',
    x: 590,
    y: 432,
    color: '#ffffff',
    bgColor: '#ef4444',
    description: 'Garganta do Mar Vermelho para o Oceano Índico com rica bacia de recifes adaptados ao calor.',
  },
  {
    id: 'node-sado',
    letter: '★',
    name: 'Santuário de Sado (Centro 7 Seeds)',
    region: 'Arquipélago Japonês',
    x: 875,
    y: 240,
    color: '#ffffff',
    bgColor: '#10b981',
    description: 'Ilha de Sado: Centro de inteligência biológica e ponto de convergência de todas as equipes 7 Seeds despertadas.',
  },
];

export const TECTONIC_FAULT_LINES: TectonicRift[] = [
  {
    id: 'fault-pacific-ring',
    name: 'Círculo de Fogo do Pacífico',
    d: 'M 40 135 C 70 95, 120 70, 210 60 M 70 145 C 50 190, 85 280, 110 330 C 130 380, 150 430, 175 490 C 185 530, 195 620, 215 760 C 230 830, 245 860, 245 870 M 960 120 C 930 180, 900 240, 885 300 C 870 360, 860 440, 875 520 C 910 600, 950 720, 960 760',
    type: 'convergent',
    threatRating: 'Sismicidade Extrema',
  },
  {
    id: 'fault-mid-atlantic',
    name: 'Dorsal Mesoatlântica',
    d: 'M 400 40 C 390 120, 360 200, 350 280 C 340 360, 360 440, 380 540 C 395 640, 385 740, 370 850',
    type: 'divergent',
    threatRating: 'Expansão de Fundo Oceânico Ativa',
  },
  {
    id: 'fault-east-african-rift',
    name: 'Grande Vale do Rift Africano',
    d: 'M 560 330 C 570 380, 580 430, 585 480 C 580 530, 570 590, 565 670',
    type: 'divergent',
    threatRating: 'Fissuração Continental em Andamento',
  },
];
