import { 
  McooZone, 
  OperationsFeature, 
  SoilZone, 
  CanopyZone, 
  BioticZone,
  WargameWaypoint 
} from '../types/militaryMaps';

// ==========================================
// 1. MCOO - MODIFIED COMBINED OBSTACLE OVERLAY
// ==========================================
export const MCOO_ZONES_DATA: McooZone[] = [
  {
    id: 'mcoo-z1',
    name: 'Planície Central de Aluvião (Corredor de Mobilidade Alpha)',
    mobility: 'unrestricted',
    slopeRange: '0° - 4° (Declive Suave)',
    vegetationObstacle: 'Vegetação rasteira e campos abertos',
    corridorType: 'mobility_corridor',
    widthKm: 4.2,
    maxFormation: 'Brigada Mecanizada / Blindada (Carros de Combate 65t)',
    pathD: 'M 180,260 Q 280,220 420,270 T 640,290 L 680,420 Q 520,440 360,400 T 170,360 Z',
    center: {
      x: 390,
      y: 330,
      mgrs: '54S UJ 8421 3918',
      elevationMeters: 45,
      slopeDeg: 2.1
    },
    description: 'Terreno plano de excelente trafegabilidade. Eixo de manobra prioritário para avanço rápido de veículos blindados pesados.',
    operationalImpact: {
      attackAdvantage: 'Acelera o ímpeto da ponta de lança e permite dispersão tática de blindados em linha de combate.',
      groundMovement: 'Velocidade máxima de comboios terrestres (>55 km/h) com desgaste mecânico nulo.',
      faunaFloraInfluence: 'Camada de solo resistente com mínima interferência de raízes ou vegetação de grande porte.'
    }
  },
  {
    id: 'mcoo-z2',
    name: 'Garganta do Desfiladeiro Fuji-Norte (Garganta de Estrangulamento / Chokepoint)',
    mobility: 'severely_restricted',
    slopeRange: '32° - 48° (Paredões Rochosos e Ravinas)',
    vegetationObstacle: 'Rochas basálticas fragmentadas e abismos fluviais',
    corridorType: 'chokepoint',
    widthKm: 0.45,
    maxFormation: 'Coluna de Marcha Única / Apenas Infantaria Leve e Drones',
    pathD: 'M 410,130 Q 480,110 530,150 L 510,240 Q 460,210 420,230 Z',
    center: {
      x: 465,
      y: 175,
      mgrs: '54S UJ 8812 4910',
      elevationMeters: 620,
      slopeDeg: 38.4
    },
    description: 'Ponto crítico de afunilamento tático. Risco extremo de emboscadas, bloqueios artificiais e aniquilamento por artilharia concentrada.',
    operationalImpact: {
      attackAdvantage: 'Ponto decisivo para fixação defensiva ou contenção de contrataques inimigos com forças mínimas.',
      groundMovement: 'Severamente Restrito. Proibida a passagem simultânea de mais de um veículo blindado.',
      faunaFloraInfluence: 'Erosão de encosta severa; presença de colônias de aves rupestres sentinelas.'
    }
  },
  {
    id: 'mcoo-z3',
    name: 'Setor Florestal Densamente Arbóreo (Mata de Transição)',
    mobility: 'restricted',
    slopeRange: '8° - 18° (Colinas Onduladas)',
    vegetationObstacle: 'Troncos com espaçamento médio de 4.2m e solo com raízes',
    corridorType: 'avenue_of_approach',
    widthKm: 2.1,
    maxFormation: 'Pelotão sobre Lagartas Leves / Infantaria Motorizada',
    pathD: 'M 540,160 Q 720,130 840,210 L 810,340 Q 690,290 560,300 Z',
    center: {
      x: 680,
      y: 230,
      mgrs: '54S UJ 9534 4321',
      elevationMeters: 210,
      slopeDeg: 12.6
    },
    description: 'Terreno restrito que exige redução de velocidade operacional para 15-25 km/h. Oferece boa cobertura contra vigilância aérea.',
    operationalImpact: {
      attackAdvantage: 'Excelente para eixos de apoio secundário e manobras envolventes de flanco sob camuflagem.',
      groundMovement: 'Movimento moderadamente lento; risco de avarias em suspensões de veículos de rodas.',
      faunaFloraInfluence: 'Folhagem densa com moderado ruído acústico de deslocamento por quebra de galhos.'
    }
  },
  {
    id: 'mcoo-z4',
    name: 'Bacia Pantanosa e Manguezal do Delta Sul',
    mobility: 'severely_restricted',
    slopeRange: '0° - 2° (Solo Alagado e Sedimentos Finos)',
    vegetationObstacle: 'Lamaçal profundo, raízes pneumatóforas e canais sem fundo firme',
    corridorType: 'chokepoint',
    widthKm: 5.6,
    maxFormation: 'Apenas Embarcações Anfíbias Leves e Patrulha a Pé com Pranchas',
    pathD: 'M 140,410 Q 300,430 430,460 L 460,620 Q 260,640 100,580 Z',
    center: {
      x: 270,
      y: 520,
      mgrs: '54S UJ 7943 2765',
      elevationMeters: 4,
      slopeDeg: 0.8
    },
    description: 'Obstáculo natural severo intransponível para carros de combate e caminhões. Atolamento imediato de viaturas terrestres.',
    operationalImpact: {
      attackAdvantage: 'Protege o flanco sudoeste contra investidas mecanizadas do adversário.',
      groundMovement: 'Proibido trânsito de forças terrestres convencionais (No-Go absoluto).',
      faunaFloraInfluence: 'Hiperconcentração de vetores zoonóticos e solo de turfa instável.'
    }
  },
  {
    id: 'mcoo-z5',
    name: 'Avenida de Aproximação Oriental (Eixo Vale dos Rios)',
    mobility: 'unrestricted',
    slopeRange: '2° - 6° (Terraço Aluvial Firme)',
    vegetationObstacle: 'Capim alto e bosques isolados',
    corridorType: 'avenue_of_approach',
    widthKm: 3.5,
    maxFormation: 'Batalhão Mecanizado / Artilharia Autopropulsada',
    pathD: 'M 620,380 Q 780,360 920,430 L 890,590 Q 720,570 590,530 Z',
    center: {
      x: 750,
      y: 470,
      mgrs: '54S UJ 9811 3419',
      elevationMeters: 88,
      slopeDeg: 3.4
    },
    description: 'Corredor secundário de alta velocidade com ligação direta aos objetivos táticos do leste.',
    operationalImpact: {
      attackAdvantage: 'Possibilita ataques concêntricos convergindo com o Eixo Principal.',
      groundMovement: 'Tráfego livre para todas as classes de veículos operacionais.',
      faunaFloraInfluence: 'Baixo impacto biótico; solo consolidado com excelente drenagem natural.'
    }
  }
];

// ==========================================
// 2. OPERATIONS OVERLAY - MANOBRA OFENSIVA
// ==========================================
export const OPERATIONS_FEATURES_DATA: OperationsFeature[] = [
  {
    id: 'op-ld-lc',
    name: 'Linha de Partida / Contato (LD/LC - Line of Departure & Contact)',
    type: 'line_of_departure',
    affiliation: 'friendly',
    pathD: 'M 120,180 L 140,360 L 160,540',
    center: {
      x: 140,
      y: 360,
      mgrs: '54S UJ 7210 4010',
      elevationMeters: 30,
      slopeDeg: 1.5
    },
    unitCode: 'LD/LC EAGLE',
    description: 'Linha de coordenação que demarca o início formal da fase de assalto e transição para o contato com o inimigo.',
    combatRules: 'Tropas cruzam a linha em formação de combate dispersa sob velocidade de cruzeiro sincronizada.',
    fireCoordination: 'Fogos de preparação de artilharia cessam 90 segundos antes da travessia pela infantaria de choque.',
    botanicalConstraint: 'Respeitar zonas de camuflagem perimetral para evitar revelar o vetor de surpresa.'
  },
  {
    id: 'op-axis-main',
    name: 'Eixo de Esforço Principal (Axis TITAN - Ataque Blindado Pesado)',
    type: 'axis_main_effort',
    affiliation: 'friendly',
    pathD: 'M 160,330 C 280,310 420,330 550,320 S 720,290 820,310',
    center: {
      x: 480,
      y: 320,
      mgrs: '54S UJ 8720 3840',
      elevationMeters: 55,
      slopeDeg: 2.0
    },
    unitCode: 'AXIS TITAN (1st ARM-BDE)',
    description: 'Vetor principal de assalto ofensivo concentrando 70% do poder de choque e blindados pesados.',
    combatRules: 'Avanço contínuo com sobreposição de fogos diretos; destruir posições defensivas inimigas na marcha.',
    fireCoordination: 'Apoio aéreo aproximado (CAS) dedicado em rota prioritária ao longo do eixo.',
    botanicalConstraint: 'Proibido o uso de munições incendiárias que possam inflamar as matas adjacentes ao eixo de avanço.'
  },
  {
    id: 'op-axis-support',
    name: 'Eixo de Esforço Secundário (Axis FALCON - Infiltração & Flanqueamento)',
    type: 'axis_supporting_effort',
    affiliation: 'friendly',
    pathD: 'M 170,250 C 310,180 500,160 660,190 S 780,240 830,280',
    center: {
      x: 490,
      y: 190,
      mgrs: '54S UJ 8910 4720',
      elevationMeters: 140,
      slopeDeg: 6.8
    },
    unitCode: 'AXIS FALCON (SPEC-OPS / MECH)',
    description: 'Manobra envolvente pelo flanco norte através de matas e terreno ondulado para isolar o comando inimigo.',
    combatRules: 'Infiltração silenciosa; engajar apenas para fixar reservas inimigas e proteger o flanco de TITAN.',
    fireCoordination: 'Fogos a pedido por canais criptografados de baixa probabilidade de interceptação.',
    botanicalConstraint: 'Utilização máxima do dossel contínuo para bloquear visão de satélites ISR e drones inimigos.'
  },
  {
    id: 'op-atk-pos-alpha',
    name: 'Posição de Ataque Alfa (Atk Pos Alpha)',
    type: 'attack_position',
    affiliation: 'friendly',
    center: {
      x: 230,
      y: 310,
      mgrs: '54S UJ 7730 4050',
      elevationMeters: 38,
      slopeDeg: 1.2
    },
    unitCode: 'ATK-POS ALPHA',
    description: 'Última posição coberta ocupada antes da investida final através da Linha de Partida.',
    combatRules: 'Revisão final de rádios em silêncio eletromagnético e abastecimento de emergência.',
    fireCoordination: 'Defesa antiaérea de curto alcance desdobrada para proteção da concentração de forças.',
    botanicalConstraint: 'Camuflagem artificial integrada à vegetação local para evitar assinaturas térmicas.'
  },
  {
    id: 'op-obj-iron',
    name: 'Objetivo Tático Primário: Complexo Sado-Iron (OBJ IRON)',
    type: 'objective',
    affiliation: 'hostile',
    center: {
      x: 840,
      y: 310,
      mgrs: '54S UJ 9940 3950',
      elevationMeters: 110,
      slopeDeg: 4.1
    },
    unitCode: 'OBJ IRON (CENTRAL COMMAND)',
    description: 'Centro nevrálgico de comando e comunicação adversário com baterias de defesa de área.',
    combatRules: 'Conquista, limpeza de bunkers subterrâneos e estabelecimento de perímetro de segurança 360°.',
    fireCoordination: 'Alvo principal do pacote de fogos conjuntos e ataques de precisão guiados por laser.',
    botanicalConstraint: 'Preservar estruturas de arquivo e sementes biológicas localizadas nos subsolos.'
  },
  {
    id: 'op-obj-delta',
    name: 'Objetivo Tático Secundário: Depósito Logístico Delta (OBJ DELTA)',
    type: 'objective',
    affiliation: 'hostile',
    center: {
      x: 770,
      y: 490,
      mgrs: '54S UJ 9710 2930',
      elevationMeters: 75,
      slopeDeg: 2.8
    },
    unitCode: 'OBJ DELTA (LOGISTICS DEPOT)',
    description: 'Pólo de distribuição de suprimentos, combustíveis e oficina de blindados inimiga.',
    combatRules: 'Interdição rápida das saídas para captura de material intacto.',
    fireCoordination: 'Interdição por fogos indiretos nas vias de escape a leste.',
    botanicalConstraint: 'Isolamento de tanques de combustível para evitar contaminação da bacia hidrográfica adjacente.'
  },
  {
    id: 'op-fscl',
    name: 'Linha de Coordenação de Apoio de Fogo (FSCL - Fire Support Coordination Line)',
    type: 'fscl',
    affiliation: 'neutral',
    pathD: 'M 710,100 L 730,350 L 700,620',
    center: {
      x: 720,
      y: 350,
      mgrs: '54S UJ 9450 3780',
      elevationMeters: 95,
      slopeDeg: 3.0
    },
    unitCode: 'FSCL VIPER',
    description: 'Linha além da qual alvos aéreos e de mísseis podem ser engajados sem perigo para forças amigas terrestres.',
    combatRules: 'Ataques além da FSCL requerem apenas coordenação de espaço aéreo, sem controle terminal terrestre estrito.',
    fireCoordination: 'Artilharia e aeronaves de ataque operam com máxima autonomia além desta demarcação.',
    botanicalConstraint: 'Delimita a transição para zonas de fogo livre.'
  },
  {
    id: 'op-hide-site',
    name: 'Área de Reunião Coberta (Hide Site - Esquadrão Silencioso)',
    type: 'hide_site',
    affiliation: 'friendly',
    center: {
      x: 610,
      y: 210,
      mgrs: '54S UJ 9140 4520',
      elevationMeters: 195,
      slopeDeg: 8.5
    },
    unitCode: 'HIDE-SITE SHADOW',
    description: 'Ponto de espera em mata fechada para recarga de baterias de drones e descanso de operadores.',
    combatRules: 'Disciplina de luz e ruído de nível zero; proibido tráfego veicular nas imediações.',
    fireCoordination: 'Apenas auto-defesa de emergência com armas suprimidas.',
    botanicalConstraint: 'Preservação de 100% da integridade da cobertura vegetal ao redor das tendas táticas.'
  },
  {
    id: 'op-rfa',
    name: 'Zona de Restrição de Fogo e Proibição Incendiária (RFA - Flora Protegida)',
    type: 'restricted_fire_area',
    affiliation: 'neutral',
    center: {
      x: 580,
      y: 430,
      mgrs: '54S UJ 9010 3210',
      elevationMeters: 62,
      slopeDeg: 1.8
    },
    unitCode: 'RFA BIOMA-VITAL',
    description: 'Área onde o uso de fósforo branco, napalm ou submunições de fragmentação é estritamente banido.',
    combatRules: 'Apenas munições de precisão guiadas com raio de dano colateral circunscrito a 15 metros.',
    fireCoordination: 'Autorização expressa do Estado-Maior Conjunto exigida para qualquer engajamento.',
    botanicalConstraint: 'Habitat de espécies botânicas raras cruciais para o Protocolo de Restauração Global Seeds.'
  }
];

// ==========================================
// 3. SOIL TRAFFICABILITY & GO/SLOW-GO/NO-GO
// ==========================================
export const SOIL_ZONES_DATA: SoilZone[] = [
  {
    id: 'soil-z1',
    name: 'Setor Aluvial Consolidado (Planície Central)',
    soilType: 'Aluvial Fino',
    cbrIndex: 28,
    coneIndex: 290,
    baseBearingCapacityTon: 75,
    wetBearingCapacityTon: 42,
    trafficabilityStatus: 'GO',
    bogDownRiskPct: 12,
    vegetalMatIntegrity: 'Preservada',
    pathD: 'M 160,240 Q 320,200 480,260 L 640,310 L 620,440 Q 400,430 200,380 Z',
    center: {
      x: 390,
      y: 320,
      mgrs: '54S UJ 8420 3950',
      elevationMeters: 40,
      slopeDeg: 1.9
    },
    suitableUnits: [
      'Carros de Combate Principais (MBT 65-70t)',
      'Blindados de Transporte de Tropas (APC / IFV)',
      'Veículos Leves Multiproprósito (4x4)',
      'Infantaria Desmontada'
    ],
    operationalAdvisory: 'Excelente suporte de solo em tempo seco. Em caso de chuva intensa (>35mm/h), a capacidade cai para 42t, desacelerando comboios pesados.'
  },
  {
    id: 'soil-z2',
    name: 'Setor de Turfas Orgânicas e Brejos do Sul (Pântano Mud-Trap)',
    soilType: 'Turfa Orgânica / Húmus',
    cbrIndex: 3,
    coneIndex: 45,
    baseBearingCapacityTon: 8,
    wetBearingCapacityTon: 1.5,
    trafficabilityStatus: 'NO-GO',
    bogDownRiskPct: 94,
    vegetalMatIntegrity: 'Pântano / Instável',
    pathD: 'M 120,420 Q 310,430 460,480 L 480,630 Q 240,650 80,590 Z',
    center: {
      x: 260,
      y: 530,
      mgrs: '54S UJ 7890 2680',
      elevationMeters: 5,
      slopeDeg: 0.6
    },
    suitableUnits: [
      'Veículos Anfíbios Leves sobre Colchão de Ar (Hovercraft)',
      'Infantaria Leve com Calçados Especiais de Neve/Lama'
    ],
    operationalAdvisory: 'Zona de atolamento catastrófico (Rasputitsa perpétua). Qualquer blindado de mais de 10 toneladas sofrerá afundamento de esteira até o chassi.'
  },
  {
    id: 'soil-z3',
    name: 'Planalto Basáltico e Cascalho Vulcânico (Elevação Norte)',
    soilType: 'Rochoso Basáltico',
    cbrIndex: 82,
    coneIndex: 390,
    baseBearingCapacityTon: 120,
    wetBearingCapacityTon: 110,
    trafficabilityStatus: 'GO',
    bogDownRiskPct: 4,
    vegetalMatIntegrity: 'Preservada',
    pathD: 'M 400,90 Q 560,70 690,120 L 660,220 Q 520,180 380,190 Z',
    center: {
      x: 520,
      y: 140,
      mgrs: '54S UJ 9010 5230',
      elevationMeters: 510,
      slopeDeg: 14.2
    },
    suitableUnits: [
      'Veículos sobre Lagartas Pesadas',
      'Caminhões Militares com Pneus de Rocha',
      'Artilharia Pesada Remocada'
    ],
    operationalAdvisory: 'Capacidade de carga inabalável sob qualquer clima. Alerta apenas para desgaste rápido de sapatas de borracha de blindados nas arestas cortantes.'
  },
  {
    id: 'soil-z4',
    name: 'Colinas de Argila Plástica Vermelha (Mata Intermediária)',
    soilType: 'Argila Plástica',
    cbrIndex: 14,
    coneIndex: 160,
    baseBearingCapacityTon: 35,
    wetBearingCapacityTon: 9,
    trafficabilityStatus: 'SLOW-GO',
    bogDownRiskPct: 62,
    vegetalMatIntegrity: 'Vulnerável',
    pathD: 'M 520,180 Q 740,150 860,230 L 830,370 Q 670,330 510,320 Z',
    center: {
      x: 690,
      y: 240,
      mgrs: '54S UJ 9580 4290',
      elevationMeters: 175,
      slopeDeg: 9.8
    },
    suitableUnits: [
      'Blindados Médios sobre Lagartas com Pressão de Solo Reduzida (<0.6 kg/cm²)',
      'Patrulhas Motorizadas Leves',
      'Tropa a Pé'
    ],
    operationalAdvisory: 'Solo traiçoeiro. Seco permite marcha rápida; sob chuva, converte-se em lama adesiva com alta taxa de derrapagem e atolamento lateral.'
  },
  {
    id: 'soil-z5',
    name: 'Terraço de Areia Compactada e Silte Oriental',
    soilType: 'Areia Compactada',
    cbrIndex: 22,
    coneIndex: 230,
    baseBearingCapacityTon: 55,
    wetBearingCapacityTon: 30,
    trafficabilityStatus: 'GO',
    bogDownRiskPct: 24,
    vegetalMatIntegrity: 'Preservada',
    pathD: 'M 620,360 Q 800,340 940,410 L 910,580 Q 750,560 590,510 Z',
    center: {
      x: 770,
      y: 460,
      mgrs: '54S UJ 9850 3480',
      elevationMeters: 70,
      slopeDeg: 3.1
    },
    suitableUnits: [
      'Blindados de Rodas 8x8 (com sistema central de enchimento de pneus CTIS)',
      'Blindados sobre Lagartas',
      'Caminhões de Suprimento'
    ],
    operationalAdvisory: 'Boa tração contínua. Recomenda-se reduzir a pressão dos pneus para 2.2 bar ao atravessar bolsões de silte solto.'
  }
];

// ==========================================
// 4. CANOPY COVER & CONCEALMENT OVERLAY
// ==========================================
export const CANOPY_ZONES_DATA: CanopyZone[] = [
  {
    id: 'canopy-z1',
    name: 'Superfloresta de Dossel Triplo (Mata Negra Predatória)',
    canopyClosurePct: 92,
    trunkSpacingMeters: 2.8,
    botanicalStratum: 'Dossel Triplo Pluvial',
    thermalConcealmentRatio: 0.94,
    deciduousStatus: 'Perenifólia (Ocultamento Permanente)',
    pathD: 'M 530,140 Q 760,110 880,210 L 850,380 Q 660,330 500,320 Z',
    center: {
      x: 690,
      y: 220,
      mgrs: '54S UJ 9590 4350',
      elevationMeters: 220,
      slopeDeg: 11.5
    },
    maxVehicleAccess: 'Sem Acesso (Apenas Forças Especiais / Infantaria)',
    droneDetectionProbability: 6,
    infilPathAdvantage: 'Infiltração furtiva de classe mestre. A copa contínua dissipa 94% da radiação térmica humana e dos motores elétricos, anulando câmeras FLIR aéreas.'
  },
  {
    id: 'canopy-z2',
    name: 'Clareiras e Savana Boreal (Campos Abertos Descobertos)',
    canopyClosurePct: 8,
    trunkSpacingMeters: 18.5,
    botanicalStratum: 'Herbáceo Rasteiro',
    thermalConcealmentRatio: 0.12,
    deciduousStatus: 'Perenifólia (Ocultamento Permanente)',
    pathD: 'M 170,240 Q 340,210 490,260 L 640,300 L 620,440 Q 380,430 180,370 Z',
    center: {
      x: 400,
      y: 330,
      mgrs: '54S UJ 8450 3980',
      elevationMeters: 42,
      slopeDeg: 2.0
    },
    maxVehicleAccess: 'Livre / Trânsito Aberto',
    droneDetectionProbability: 95,
    infilPathAdvantage: 'Exposição total à vigilância aérea de satélites e drones ISR. Qualquer coluna em movimento é detectada em tempo real por radares SAR e sensores ópticos.'
  },
  {
    id: 'canopy-z3',
    name: 'Bosque de Bambuzal Gigante e Caducifólias (Setor Nordeste)',
    canopyClosurePct: 65,
    trunkSpacingMeters: 3.9,
    botanicalStratum: 'Arbóreo Contínuo',
    thermalConcealmentRatio: 0.68,
    deciduousStatus: 'Caducifólia (Perda de Folhas Sazonal)',
    pathD: 'M 720,80 Q 880,90 960,180 L 890,300 Q 780,220 690,190 Z',
    center: {
      x: 820,
      y: 180,
      mgrs: '54S UJ 9920 4680',
      elevationMeters: 310,
      slopeDeg: 14.8
    },
    maxVehicleAccess: 'Veículos Leves 4x4',
    droneDetectionProbability: 38,
    infilPathAdvantage: 'Bom ocultamento no verão e primavera. No outono/inverno, a queda foliar reduz o bloqueio para 35%, expondo posições estáticas antes ocultas.'
  },
  {
    id: 'canopy-z4',
    name: 'Floresta Galeria Fluvial (Corredor Ripário Ribeirinho)',
    canopyClosurePct: 84,
    trunkSpacingMeters: 4.5,
    botanicalStratum: 'Arbóreo Contínuo',
    thermalConcealmentRatio: 0.88,
    deciduousStatus: 'Perenifólia (Ocultamento Permanente)',
    pathD: 'M 590,340 Q 750,330 890,390 L 870,490 Q 720,450 580,430 Z',
    center: {
      x: 730,
      y: 400,
      mgrs: '54S UJ 9710 3620',
      elevationMeters: 65,
      slopeDeg: 2.9
    },
    maxVehicleAccess: 'Veículos Leves 4x4',
    droneDetectionProbability: 14,
    infilPathAdvantage: 'Corredor natural de infiltração tática ao longo da água. Árvores arqueadas sobre o leito formam um túnel verde que mascara assinaturas térmicas e acústicas.'
  },
  {
    id: 'canopy-z5',
    name: 'Matagais Arbustivos Espinhosos do Sul',
    canopyClosurePct: 35,
    trunkSpacingMeters: 6.2,
    botanicalStratum: 'Arbustivo Médio',
    thermalConcealmentRatio: 0.40,
    deciduousStatus: 'Mista',
    pathD: 'M 130,410 Q 310,420 450,470 L 460,610 Q 240,630 90,570 Z',
    center: {
      x: 270,
      y: 520,
      mgrs: '54S UJ 7920 2710',
      elevationMeters: 6,
      slopeDeg: 0.7
    },
    maxVehicleAccess: 'Veículos Leves 4x4',
    droneDetectionProbability: 68,
    infilPathAdvantage: 'Ocultamento moderado para soldados agachados, porém ineficaz para veículos parados.'
  }
];

// ==========================================
// 5. FAUNA & BIOTIC THREAT OVERLAY
// ==========================================
export const BIOTIC_ZONES_DATA: BioticZone[] = [
  {
    id: 'bio-z1',
    name: 'Pântano Endêmico de Vetores Zoonóticos (Bacia do Delta Sul)',
    threatLevel: 'Crítico / Letal',
    vectorZoonoses: [
      {
        vector: 'Enxames de Mosquitos Culicidae / Malária Ômega',
        transmissionRiskPct: 88,
        prophylaxis: 'Profilaxia com Doxiciclina + repelente DEET militar 100% e mosquiteiros térmicos herméticos.'
      },
      {
        vector: 'Carrapatos Rickettsia / Febre Maculosa de Ruptura',
        transmissionRiskPct: 74,
        prophylaxis: 'Impregnação de uniformes com permetrina e inspeção corporal a cada 4 horas de marcha.'
      }
    ],
    sentinelFauna: {
      species: 'Aves de Brejo Sentinelas (Garças-Trovão)',
      acousticAlarmRadiusMeters: 1800,
      radarScatterSignature: 'Dispersão maciça em nuvem com reflexão Doppler detectável por radares de vigilância aérea.',
      operationalEffect: 'A aproximação de patrulhas a menos de 800m provoca debandada ruidosa em massa, entregando a posição das tropas ao inimigo.'
    },
    venomousFloraFauna: {
      toxinName: 'Serpentes Aquáticas Viperidae (Peçonha Hemotóxica) + Urtiga Gigante Tóxica',
      dnbiCasualtyRateEstimate: '22% de baixas não-bélicas em patrulhas sem traje estanque em 48 horas.',
      treatmentRequired: 'Kit de soro antiofídico polivalente criopreservado e anti-histamínicos injetáveis.'
    },
    quarantineRequired: true,
    medevacSafeLane: false,
    pathD: 'M 110,400 Q 300,410 440,460 L 460,620 Q 230,640 70,580 Z',
    center: {
      x: 250,
      y: 520,
      mgrs: '54S UJ 7850 2690',
      elevationMeters: 4,
      slopeDeg: 0.5
    },
    tacticalDirective: 'Desvio obrigatório para todas as tropas terrestres convencionais. Proibido consumo de água local sem esterilização química tripla.'
  },
  {
    id: 'bio-z2',
    name: 'Refúgio de Primatas Sentinelas de Ruptura (Mata Intermediária Norte)',
    threatLevel: 'Severo',
    vectorZoonoses: [
      {
        vector: 'Parasitas Hemáticos de Roedores Silvestres',
        transmissionRiskPct: 42,
        prophylaxis: 'Luvas de proteção biológica e proibição estrita de contato com carcaças animais.'
      }
    ],
    sentinelFauna: {
      species: 'Colônias de Macacos-Sentinela da Floresta Negra',
      acousticAlarmRadiusMeters: 2500,
      radarScatterSignature: 'Gritos agudos ultrassônicos em cadeia que alertam qualquer posto de guarda inimigo em 5 km.',
      operationalEffect: 'Anula qualquer tentativa de infiltração noturna surpresa caso os galhos de topo sejam agitados.'
    },
    venomousFloraFauna: {
      toxinName: 'Aranhas Armadeiras de Ruptura (Phoneutria Ômega)',
      dnbiCasualtyRateEstimate: '11% de baixas por choque neurotóxico em acampamentos em solo.',
      treatmentRequired: 'Soro antiaracnídico e redes suspensas a mais de 2m do solo.'
    },
    quarantineRequired: false,
    medevacSafeLane: false,
    pathD: 'M 540,150 Q 750,120 870,210 L 840,360 Q 670,310 520,300 Z',
    center: {
      x: 690,
      y: 230,
      mgrs: '54S UJ 9600 4320',
      elevationMeters: 210,
      slopeDeg: 12.0
    },
    tacticalDirective: 'Marcha silenciosa apenas nas horas mais frias (madrugada), quando os primatas e aracnídeos reduzem sua atividade metabólica.'
  },
  {
    id: 'bio-z3',
    name: 'Corredor Bio-Seguro e Rota de Evacuação Aeromédica (MEDEVAC Corridor)',
    threatLevel: 'Baixo',
    vectorZoonoses: [
      {
        vector: 'Microflora Comum não-patogênica',
        transmissionRiskPct: 3,
        prophylaxis: 'Higiene básica padrão militar.'
      }
    ],
    sentinelFauna: {
      species: 'Mamíferos Herbívoros Dóceis',
      acousticAlarmRadiusMeters: 150,
      radarScatterSignature: 'Assinatura nula / dispersão isolada sem eco Doppler coordenado.',
      operationalEffect: 'Não denunciam movimentos humanos ordenados.'
    },
    venomousFloraFauna: {
      toxinName: 'Nenhuma espécie perigosa registrada na rota',
      dnbiCasualtyRateEstimate: '< 0.5% de baixas não-bélicas.',
      treatmentRequired: 'Kit de primeiros socorros padrão de combate (IFAK).'
    },
    quarantineRequired: false,
    medevacSafeLane: true,
    pathD: 'M 170,250 Q 330,220 480,270 L 630,310 L 610,430 Q 390,420 190,370 Z',
    center: {
      x: 400,
      y: 330,
      mgrs: '54S UJ 8480 3990',
      elevationMeters: 45,
      slopeDeg: 2.1
    },
    tacticalDirective: 'Eixo prioritário para transporte de feridos, comboios médicos e evacuação rápida de civis em segurança.'
  },
  {
    id: 'bio-z4',
    name: 'Bambu Pétreo Tóxico e Espécies Invasoras (Setor Leste)',
    threatLevel: 'Moderado',
    vectorZoonoses: [
      {
        vector: 'Fungos Esporogênicos Pulmonares de Bambu',
        transmissionRiskPct: 35,
        prophylaxis: 'Uso obrigatório de respiradores N95 / máscaras táticas com filtro biológico.'
      }
    ],
    sentinelFauna: {
      species: 'Insetos Zumbidores Gigantes',
      acousticAlarmRadiusMeters: 600,
      radarScatterSignature: 'Ruído acústico constante em 12 kHz que mascara passos humanos.',
      operationalEffect: 'Vantajoso para mascarar ruído de passos de infantaria leve.'
    },
    venomousFloraFauna: {
      toxinName: 'Bambu com cerdas siliciosas perfurantes que liberam alcalóides vesicantes',
      dnbiCasualtyRateEstimate: '8% de irritações cutâneas e microperfurações em uniformes comuns.',
      treatmentRequired: 'Trajes de nylon balístico reforçado com kevlar nas pernas.'
    },
    quarantineRequired: false,
    medevacSafeLane: false,
    pathD: 'M 630,370 Q 790,350 930,420 L 900,580 Q 730,560 580,520 Z',
    center: {
      x: 760,
      y: 470,
      mgrs: '54S UJ 9820 3450',
      elevationMeters: 80,
      slopeDeg: 3.3
    },
    tacticalDirective: 'Autorizado corte de trilha apenas com facões revestidos de cerâmica para evitar dispersão de pó de sílica.'
  }
];

// ==========================================
// WARGAME SAMPLE ROUTE WAYPOINTS
// ==========================================
export const WARGAME_ROUTE_PRESETS: {
  id: string;
  name: string;
  description: string;
  profile: 'armored' | 'stealth_specops' | 'dismounted_infantry';
  waypoints: WargameWaypoint[];
}[] = [
  {
    id: 'route-armored-spearhead',
    name: 'Rota Blindada 1 (Eixo Titan - Vale Central)',
    description: 'Avanço de blindados pesados (65t) pelo corredor de planície central com máxima velocidade.',
    profile: 'armored',
    waypoints: [
      {
        id: 'wp-1',
        label: 'WP-1 (Partida Alfa)',
        mgrs: '54S UJ 7730 4050',
        x: 230,
        y: 310,
        mcooStatus: 'unrestricted',
        trafficStatus: 'GO',
        canopyConcealment: 10,
        droneRisk: 90,
        bioticThreat: 'Baixo'
      },
      {
        id: 'wp-2',
        label: 'WP-2 (Ponto Médio Planície)',
        mgrs: '54S UJ 8420 3950',
        x: 410,
        y: 325,
        mcooStatus: 'unrestricted',
        trafficStatus: 'GO',
        canopyConcealment: 12,
        droneRisk: 88,
        bioticThreat: 'Baixo'
      },
      {
        id: 'wp-3',
        label: 'WP-3 (Transição Leste FSCL)',
        mgrs: '54S UJ 9210 3800',
        x: 620,
        y: 310,
        mcooStatus: 'unrestricted',
        trafficStatus: 'GO',
        canopyConcealment: 25,
        droneRisk: 75,
        bioticThreat: 'Baixo'
      },
      {
        id: 'wp-4',
        label: 'WP-4 (Assalto Final OBJ IRON)',
        mgrs: '54S UJ 9940 3950',
        x: 840,
        y: 310,
        mcooStatus: 'unrestricted',
        trafficStatus: 'GO',
        canopyConcealment: 15,
        droneRisk: 85,
        bioticThreat: 'Moderado'
      }
    ]
  },
  {
    id: 'route-stealth-canopy',
    name: 'Rota Furtiva Forças Especiais (Dossel Oculto Norte)',
    description: 'Infiltração a pé sob proteção de 92% de fechamento de copa contra drones térmicos e satélites.',
    profile: 'stealth_specops',
    waypoints: [
      {
        id: 'wp-s1',
        label: 'WP-S1 (Infiltração Norte)',
        mgrs: '54S UJ 7520 4600',
        x: 200,
        y: 210,
        mcooStatus: 'restricted',
        trafficStatus: 'SLOW-GO',
        canopyConcealment: 75,
        droneRisk: 25,
        bioticThreat: 'Moderado'
      },
      {
        id: 'wp-s2',
        label: 'WP-S2 (Garganta de Sombra)',
        mgrs: '54S UJ 8610 4920',
        x: 430,
        y: 180,
        mcooStatus: 'severely_restricted',
        trafficStatus: 'SLOW-GO',
        canopyConcealment: 88,
        droneRisk: 12,
        bioticThreat: 'Severo'
      },
      {
        id: 'wp-s3',
        label: 'WP-S3 (Hide Site Shadow)',
        mgrs: '54S UJ 9140 4520',
        x: 610,
        y: 210,
        mcooStatus: 'restricted',
        trafficStatus: 'SLOW-GO',
        canopyConcealment: 94,
        droneRisk: 5,
        bioticThreat: 'Severo'
      },
      {
        id: 'wp-s4',
        label: 'WP-S4 (Flanqueamento OBJ IRON)',
        mgrs: '54S UJ 9850 4200',
        x: 820,
        y: 280,
        mcooStatus: 'restricted',
        trafficStatus: 'SLOW-GO',
        canopyConcealment: 70,
        droneRisk: 30,
        bioticThreat: 'Moderado'
      }
    ]
  },
  {
    id: 'route-perilous-swamp',
    name: 'Rota de Risco Extremo (Pântano Sul - Armadilha)',
    description: 'Tentativa de atravessar o manguezal do sul: demonstra falha catastrófica de atolamento e ameaça biótica.',
    profile: 'dismounted_infantry',
    waypoints: [
      {
        id: 'wp-p1',
        label: 'WP-P1 (Margem do Delta)',
        mgrs: '54S UJ 7400 3200',
        x: 180,
        y: 430,
        mcooStatus: 'restricted',
        trafficStatus: 'SLOW-GO',
        canopyConcealment: 40,
        droneRisk: 60,
        bioticThreat: 'Moderado'
      },
      {
        id: 'wp-p2',
        label: 'WP-P2 (Centro do Lamaçal)',
        mgrs: '54S UJ 7890 2680',
        x: 260,
        y: 530,
        mcooStatus: 'severely_restricted',
        trafficStatus: 'NO-GO',
        canopyConcealment: 35,
        droneRisk: 65,
        bioticThreat: 'Crítico / Letal'
      },
      {
        id: 'wp-p3',
        label: 'WP-P3 (Ninho de Aves Sentinela)',
        mgrs: '54S UJ 8300 2500',
        x: 370,
        y: 560,
        mcooStatus: 'severely_restricted',
        trafficStatus: 'NO-GO',
        canopyConcealment: 28,
        droneRisk: 72,
        bioticThreat: 'Crítico / Letal'
      },
      {
        id: 'wp-p4',
        label: 'WP-P4 (Chegada Exaurida OBJ DELTA)',
        mgrs: '54S UJ 9710 2930',
        x: 770,
        y: 490,
        mcooStatus: 'unrestricted',
        trafficStatus: 'GO',
        canopyConcealment: 30,
        droneRisk: 70,
        bioticThreat: 'Moderado'
      }
    ]
  }
];

// ==========================================
// MILITARY DOCTRINE KNOWLEDGE REPOSITORY (IPB)
// ==========================================
export const DOCTRINE_PANORAMA_CATEGORIES = [
  {
    id: 'cat-a',
    letter: 'A',
    title: 'Gráficos Táticos e de Situação Operacional (COP)',
    subitems: [
      {
        name: 'Mapas de Situação (SITMAP) & Overlays Táticos',
        details: 'Símbolos padronizados OTAN APP-6 / MIL-STD-2525. Retângulos com cores padronizadas (Azul = Amigo, Vermelho = Inimigo, Verde = Neutro/Ambiente, Amarelo = Desconhecido) delimitando Linhas de Contato, limites de Área de Operações (AO) e Postos de Comando.'
      },
      {
        name: 'Matrizes Gráficas de Sincronização',
        details: 'Diagramas de barras 2D tempo-espaço sincronizando artilharia, apoio aéreo aproximado (CAS) e manobras de infantaria/blindados no decorrer das horas da missão.'
      },
      {
        name: 'Linhas de Operação e Eixos de Avanço',
        details: 'Setas vetoriais táticas (eixo principal com ponta dupla/tripla vs eixos secundários de apoio) definindo direção de ataque e manobras de flanqueamento e cerco.'
      }
    ]
  },
  {
    id: 'cat-b',
    letter: 'B',
    title: 'Gráficos de Análise Geoespacial de Terreno (ACOO / MCOO)',
    subitems: [
      {
        name: 'Mapas de Relevo e Curvas de Nível',
        details: 'Isolinhas de altimetria e sombreado analítico (hillshade) para calcular ângulos de tiro e cristas de proteção contra fogos diretos.'
      },
      {
        name: 'Mapas de Declividade (Slope Maps)',
        details: 'Faixas percentuais/graus de inclinação indicando limites de tombamento ou restrição física (<15% livre, 15-30% restrito, >30% intransponível para blindados).'
      },
      {
        name: 'Campo de Visada e Linha de Visada (Viewshed / LOS)',
        details: 'Diagramas 2D calculando zonas visíveis por sensores e postos de observação, expondo pontos cegos causados pela orografia do terreno.'
      }
    ]
  },
  {
    id: 'cat-c',
    letter: 'C',
    title: 'Gráficos Hidrológicos e de Solo (Mobilidade Terrestre)',
    subitems: [
      {
        name: 'Mapas de Trafegabilidade & Classificação de Solos',
        details: 'Cruzamento de umidade, tipo de solo (argila, turfa, aluvião, rocha) e índice CBR/Cone Index para prever atolamento (mud / bog-down).'
      },
      {
        name: 'Diagramas de Drenagem e Vaus',
        details: 'Mapeamento de bacias hidrográficas com profundidade e correnteza em m/s para pontes móveis e blindados anfíbios.'
      }
    ]
  },
  {
    id: 'cat-d',
    letter: 'D',
    title: 'Gráficos de Cobertura Vegetal e Bioma (Fauna e Flora)',
    subitems: [
      {
        name: 'Densidade Florestal e Dossel (NDVI / Canopy Density)',
        details: 'Avaliação de camuflagem natural contra vigilância aérea (FLIR/satélite) e espaçamento entre troncos como barreira à manobra mecânica.'
      },
      {
        name: 'Vetores Biológicos e Risco Zoonótico',
        details: 'Cartografia médico-militar apontando zonas endêmicas de vetores (febre maculosa, malária), animais sentinelas e reservas de proteção estrita sob convenções.'
      }
    ]
  }
];

export const FIVE_CORE_MODELS_SUMMARY = [
  {
    modelNumber: 1,
    id: 'mcoo',
    name: 'MCOO (Modified Combined Obstacle Overlay)',
    shortTitle: 'Sobreposição Modificada de Obstáculos Combinados',
    color: '#10b981', // Emerald
    badge: 'BASE IPB TERRESTRE',
    function: 'Gráfico 2D definidor da análise de terreno militar no processo IPB. Sintetiza todas as restrições físicas do ambiente operacional.',
    attackContrib: 'Revela corredores de mobilidade (mobility corridors) e avenidas de aproximação viáveis até o objetivo inimigo.',
    groundFocus: 'Categoriza todo o solo em 3 graus: Severamente Restrito (vermelho/hachurado), Restrito (amarelo) e Irrestrito (verde/aberto).',
    faunaFloraFocus: 'Incorpora florestas densas como barreiras físicas intransponíveis para viaturas pesadas e margens alagadas/manguezais.',
    practicalExample: 'Identificar que a melhor rota de avanço para uma coluna mecanizada precisa contornar uma área de pântano denso para evitar afunilamento vigiado pelo inimigo.'
  },
  {
    modelNumber: 2,
    id: 'operations',
    name: 'Operations Overlay (Mapa Tático de Operações)',
    shortTitle: 'Sobreposição de Manobra Ofensiva',
    color: '#06b6d4', // Cyan
    badge: 'ESQUEMA DE MANOBRA',
    function: 'Gráfico padronizado sobreposto à carta topográfica contendo todo o esquema de manobra de ataque e coordenação de fogo.',
    attackContrib: 'Linhas de Partida (LD/LC), eixos de esforço principal e secundário, posições de ataque (Atk Pos), objetivos táticos (OBJ Iron/Delta) e FSCL.',
    groundFocus: 'Pontos de checagem ao longo das rotas terrestres, áreas de espera e pontos de passagem de linhas amigas.',
    faunaFloraFocus: 'Delimitação de zonas onde o uso de munições incendiárias ou artilharia de fósforo branco é restrito (RFA) e hide sites em matas.',
    practicalExample: 'O comandante desenha uma seta curva (envolvimento) contornando a linha defensiva por dentro de uma mata de transição, definindo o assalto final.'
  },
  {
    modelNumber: 3,
    id: 'trafficability',
    name: 'Soil Trafficability Chart (Gráfico de Trânsito do Solo)',
    shortTitle: 'Aderência & Matriz Go / Slow-Go / No-Go',
    color: '#eab308', // Amber
    badge: 'MICROFÍSICA DO SOLO',
    function: 'Avaliar a microfísica do solo cruzada com as especificações das viaturas (pressão sobre o solo em kg/cm²) e condições meteorológicas recentes.',
    attackContrib: 'Determina se os eixos suportam Carros de Combate (60-70t) ou se apenas infantaria a pé / blindados leves conseguem avançar.',
    groundFocus: 'Mapas coropléticos destacando índice de cone / CBR. Aponta risco imediato de atolamento (mud/bog down) em épocas de chuva/degelo (Rasputitsa).',
    faunaFloraFocus: 'Mapeia a presença de solos orgânicos (turfas, húmus de floresta pluvial) e raízes superficiais que causam perda severa de tração.',
    practicalExample: 'Uma força verifica antes de um ataque noturno se um vale de solo aluvial suporta a passagem de obuseiros autopropulsados sem que fiquem retidos no barro.'
  },
  {
    modelNumber: 4,
    id: 'canopy',
    name: 'Canopy Cover & Concealment Overlay',
    shortTitle: 'Cobertura de Dossel Florestal & Ocultamento Térmico',
    color: '#3b82f6', // Blue
    badge: 'CAMUFLAGEM ANTI-ISR',
    function: 'Mapear a estrutura 3D da vegetação projetada em 2D para estimar ocultamento visual e térmico contra sensores aéreos (drones, FLIR e satélites).',
    attackContrib: 'Áreas de montagem e eixos de infiltração a pé onde pelotões de assalto podem se aproximar sem detecção por drones de vigilância ou câmeras infravermelho.',
    groundFocus: 'Mapeia espaçamento médio de troncos (<3m impede caminhões e blindados, forçando movimento a pé ou em motos de reconhecimento).',
    faunaFloraFocus: 'Classificação botânica estratificada (herbáceo, arbustivo, arbóreo), espécies caducifólias (perda foliar sazonal) e biomassa.',
    practicalExample: 'Planejamento de infiltração de forças especiais utilizando corredores de floresta contínua (>80% de fechamento de copa) para anular varredura térmica inimiga.'
  },
  {
    modelNumber: 5,
    id: 'biotic',
    name: 'Fauna & Biotic Threat Overlay',
    shortTitle: 'Riscos Bióticos, Vetores & Atributos de Fauna',
    color: '#f43f5e', // Rose
    badge: 'BIODEFESA & SENTINELAS',
    function: 'Gráfico médico-operacional e biológico destinado a prever impactos das espécies animais e microbiológicas na capacidade de combate.',
    attackContrib: 'Avaliação de rotas de ataque noturno que cruzam habitats de animais sentinelas (aves gregárias que debandam em pânico e denunciam a tropa).',
    groundFocus: 'Zonas alagadas habitadas por vetores de transmissão severa (febre maculosa, malária, dengue), exigindo vestimentas e profilaxia.',
    faunaFloraFocus: 'Demarcação de colônias de fauna venenosa (ofídios, escorpiões) e plantas tóxicas que causam baixas não-bélicas (DNBI).',
    practicalExample: 'O oficial de saúde e logística traça zonas de quarentena de água/solo e rotas de evacuação aeromédica alternativas desviando de brejos parasitários.'
  }
];
