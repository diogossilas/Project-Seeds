import { useState, useEffect, useCallback, useRef } from 'react';

export type OperationalState = 
  | 'REGIME_OK' 
  | 'ALERTA_TERMICO' 
  | 'FALHA_REDE' 
  | 'DEFESA_ATIVA' 
  | 'RECUPERACAO';

export interface TelemetryChannelData {
  time: string;
  second: number;
  coreTemp: number;         // °C (Nominal: 65, Alert: >88)
  hydraulicPressure: number;// bar (Nominal: 210, Alert: >280)
  busVoltage: number;       // V (Nominal: 400, Alert: <360)
  vibrationG: number;       // g (Nominal: 0.15, Alert: >0.85)
}

export interface SensorNodeStatus {
  id: string;
  code: string;             // T-01 to T-12
  name: string;
  category: 'energy' | 'cryo' | 'hydraulic' | 'structure' | 'telecom';
  currentVal: number;
  unit: string;
  nominalVal: number;
  status: 'nominal' | 'warning' | 'critical';
  history: number[];        // Last 8 ticks for mini sparkline/heatmap
}

export interface StateHistorySegment {
  state: OperationalState;
  label: string;
  color: string;
  durationSeconds: number;
  percentage: number;
}

export interface SynopticNode {
  id: string;
  label: string;
  sublabel: string;
  sensorCode: string;
  x: number; // % in synoptic diagram
  y: number; // %
  iconType: 'reactor' | 'power' | 'chamber' | 'filter' | 'radiator' | 'shield' | 'seed' | 'antenna';
  status: 'nominal' | 'warning' | 'critical';
  connectedTo: string[];
}

export const INITIAL_SYNOPTIC_NODES: SynopticNode[] = [
  { id: 'node-reactor', label: 'Reator Geotérmico Primário', sublabel: 'Geração Térmica / Fissão Fria', sensorCode: 'T-01', x: 20, y: 30, iconType: 'reactor', status: 'nominal', connectedTo: ['node-bus', 'node-radiator'] },
  { id: 'node-bus', label: 'Barramento Principal 400V', sublabel: 'Distribuição Elétrica Trifásica', sensorCode: 'T-02', x: 50, y: 30, iconType: 'power', status: 'nominal', connectedTo: ['node-cryo-a', 'node-cryo-b', 'node-filter'] },
  { id: 'node-radiator', label: 'Trocador Térmico / Radiador', sublabel: 'Dissipação em Rocha Basáltica', sensorCode: 'T-06', x: 20, y: 70, iconType: 'radiator', status: 'nominal', connectedTo: ['node-reactor'] },
  { id: 'node-cryo-a', label: 'Criocâmara Alfa (Recrutas)', sublabel: 'Preservação Metabólica -196°C', sensorCode: 'T-03', x: 75, y: 20, iconType: 'chamber', status: 'nominal', connectedTo: ['node-germoplasm'] },
  { id: 'node-cryo-b', label: 'Criocâmara Beta (Sucessores)', sublabel: 'Módulos de Despertar Seletivo', sensorCode: 'T-04', x: 75, y: 45, iconType: 'chamber', status: 'nominal', connectedTo: ['node-germoplasm'] },
  { id: 'node-filter', label: 'Purificador do Aquífero SAGA', sublabel: 'Osmose Reversa e Desmineralização', sensorCode: 'T-05', x: 50, y: 70, iconType: 'filter', status: 'nominal', connectedTo: ['node-germoplasm', 'node-shield'] },
  { id: 'node-germoplasm', label: 'Banco de Germoplasma (8ª Arca)', sublabel: 'Sementes Ancestrais Criopreservadas', sensorCode: 'T-08', x: 80, y: 70, iconType: 'seed', status: 'nominal', connectedTo: ['node-antenna'] },
  { id: 'node-shield', label: 'Blindagem Tectônica Dinâmica', sublabel: 'Amortecimento Sísmico Ativo', sensorCode: 'T-07', x: 35, y: 85, iconType: 'shield', status: 'nominal', connectedTo: [] },
  { id: 'node-antenna', label: 'Transmissor VLF / Onda Curta', sublabel: 'Sinal de Baliza para o Japão e Lua', sensorCode: 'T-10', x: 92, y: 50, iconType: 'antenna', status: 'nominal', connectedTo: [] },
];

export function useLiveTelemetry() {
  const [operationalState, setOperationalState] = useState<OperationalState>('REGIME_OK');
  const [channelHistory, setChannelHistory] = useState<TelemetryChannelData[]>([]);
  const [sensors, setSensors] = useState<SensorNodeStatus[]>([]);
  const [selectedSynopticNodeId, setSelectedSynopticNodeId] = useState<string>('node-reactor');
  const [stressMode, setStressMode] = useState<string | null>(null);
  const [tickCount, setTickCount] = useState<number>(0);
  
  // State duration tracking for safe segments
  const stateDurationRef = useRef<Record<OperationalState, number>>({
    REGIME_OK: 180,
    ALERTA_TERMICO: 25,
    FALHA_REDE: 15,
    DEFESA_ATIVA: 30,
    RECUPERACAO: 20,
  });

  // Initialize sensors definitions
  useEffect(() => {
    const initialSensors: SensorNodeStatus[] = [
      { id: 's-1', code: 'T-01', name: 'Reator Criogênico Primário', category: 'energy', currentVal: 64.8, unit: '°C', nominalVal: 65.0, status: 'nominal', history: [64.2, 64.5, 64.9, 65.1, 64.7, 65.0, 64.8, 64.8] },
      { id: 's-2', code: 'T-02', name: 'Barramento de Força 400V', category: 'energy', currentVal: 401.2, unit: 'V', nominalVal: 400.0, status: 'nominal', history: [399.8, 400.5, 401.0, 402.1, 400.9, 401.4, 401.1, 401.2] },
      { id: 's-3', code: 'T-03', name: 'Criocâmara Alfa (Recrutas)', category: 'cryo', currentVal: -196.2, unit: '°C', nominalVal: -196.0, status: 'nominal', history: [-196.1, -196.3, -196.0, -196.2, -196.1, -196.4, -196.2, -196.2] },
      { id: 's-4', code: 'T-04', name: 'Criocâmara Beta (Sucessão)', category: 'cryo', currentVal: -195.8, unit: '°C', nominalVal: -196.0, status: 'nominal', history: [-195.9, -195.7, -195.8, -196.0, -195.9, -195.8, -195.8, -195.8] },
      { id: 's-5', code: 'T-05', name: 'Filtro de Aquífero Subterrâneo', category: 'hydraulic', currentVal: 212.4, unit: 'bar', nominalVal: 210.0, status: 'nominal', history: [209.5, 210.2, 211.0, 213.1, 212.0, 212.6, 212.3, 212.4] },
      { id: 's-6', code: 'T-06', name: 'Radiador Térmico de Basalto', category: 'energy', currentVal: 42.1, unit: '°C', nominalVal: 40.0, status: 'nominal', history: [41.2, 41.8, 42.0, 42.5, 42.2, 42.0, 42.1, 42.1] },
      { id: 's-7', code: 'T-07', name: 'Blindagem Tectônica Amortecida', category: 'structure', currentVal: 0.14, unit: 'g', nominalVal: 0.15, status: 'nominal', history: [0.12, 0.14, 0.15, 0.16, 0.14, 0.15, 0.14, 0.14] },
      { id: 's-8', code: 'T-08', name: 'Banco de Germoplasma (8ª Arca)', category: 'cryo', currentVal: -80.4, unit: '°C', nominalVal: -80.0, status: 'nominal', history: [-80.1, -80.2, -80.5, -80.3, -80.4, -80.3, -80.4, -80.4] },
      { id: 's-9', code: 'T-09', name: 'Bomba Geotérmica Profunda', category: 'hydraulic', currentVal: 184.2, unit: 'bar', nominalVal: 180.0, status: 'nominal', history: [181.0, 182.4, 183.1, 184.5, 183.9, 184.0, 184.1, 184.2] },
      { id: 's-10', code: 'T-10', name: 'Transmissor VLF Onda Curta', category: 'telecom', currentVal: 48.6, unit: 'dBm', nominalVal: 50.0, status: 'nominal', history: [48.2, 48.9, 49.1, 48.4, 48.7, 48.8, 48.5, 48.6] },
      { id: 's-11', code: 'T-11', name: 'Eclusa Hidrostática de Escape', category: 'structure', currentVal: 3.4, unit: 'atm', nominalVal: 3.2, status: 'nominal', history: [3.3, 3.4, 3.5, 3.4, 3.3, 3.4, 3.4, 3.4] },
      { id: 's-12', code: 'T-12', name: 'Matriz Biocêntrica de Sensores', category: 'telecom', currentVal: 98.2, unit: '%', nominalVal: 100.0, status: 'nominal', history: [97.8, 98.0, 98.4, 98.1, 98.3, 98.2, 98.1, 98.2] },
    ];
    setSensors(initialSensors);

    // Initial 20 history points to avoid empty chart
    const initialHist: TelemetryChannelData[] = [];
    const now = Date.now();
    for (let i = 20; i >= 0; i--) {
      const t = new Date(now - i * 1000);
      const timeStr = `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}:${t.getSeconds().toString().padStart(2, '0')}`;
      initialHist.push({
        time: timeStr,
        second: 20 - i,
        coreTemp: 64.5 + Math.sin(i * 0.4) * 2.2,
        hydraulicPressure: 210.0 + Math.cos(i * 0.3) * 6.5,
        busVoltage: 400.5 + Math.sin(i * 0.2) * 4.0,
        vibrationG: 0.14 + Math.abs(Math.sin(i * 0.5)) * 0.08,
      });
    }
    setChannelHistory(initialHist);
  }, []);

  // Central 1 Hz sampling loop (Prevents drift between series and sensors)
  useEffect(() => {
    const timer = setInterval(() => {
      setTickCount((prev) => prev + 1);

      const d = new Date();
      const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;

      // Calculate baseline with deterministic micro-fluctuations
      let nextTemp = 65.0 + (Math.sin(Date.now() / 3000) * 2.8) + (Math.random() * 1.2 - 0.6);
      let nextPress = 210.0 + (Math.cos(Date.now() / 4000) * 7.5) + (Math.random() * 2.0 - 1.0);
      let nextVolt = 400.0 + (Math.sin(Date.now() / 2500) * 4.5) + (Math.random() * 1.5 - 0.75);
      let nextVib = 0.14 + Math.abs(Math.sin(Date.now() / 1500) * 0.08) + (Math.random() * 0.04);

      // Apply stress mode overrides if active
      if (stressMode === 'thermal') {
        nextTemp = 93.4 + Math.random() * 3.8;
      } else if (stressMode === 'voltage') {
        nextVolt = 346.0 - Math.random() * 12.0;
      } else if (stressMode === 'seismic') {
        nextVib = 1.18 + Math.random() * 0.25;
        nextPress = 286.0 + Math.random() * 14.0;
      } else if (stressMode === 'recovery') {
        nextTemp = 68.2;
        nextVolt = 398.5;
        nextVib = 0.18;
        nextPress = 214.0;
      }

      // Determine state machine transition
      let nextState: OperationalState = 'REGIME_OK';
      if (nextTemp > 88.0) {
        nextState = 'ALERTA_TERMICO';
      } else if (nextVolt < 360.0) {
        nextState = 'FALHA_REDE';
      } else if (nextVib > 0.85 || nextPress > 280.0) {
        nextState = 'DEFESA_ATIVA';
      } else if (stressMode === 'recovery') {
        nextState = 'RECUPERACAO';
      }

      setOperationalState(nextState);
      stateDurationRef.current[nextState] = (stateDurationRef.current[nextState] || 0) + 1;

      // 1. Update Time Series History (Unified emission)
      setChannelHistory((prev) => {
        const updated = [
          ...prev,
          {
            time: timeStr,
            second: prev.length,
            coreTemp: parseFloat(nextTemp.toFixed(1)),
            hydraulicPressure: parseFloat(nextPress.toFixed(1)),
            busVoltage: parseFloat(nextVolt.toFixed(1)),
            vibrationG: parseFloat(nextVib.toFixed(2)),
          },
        ];
        return updated.slice(-40); // Maintain rolling 40 seconds window
      });

      // 2. Synchronize the 12 Sensor Nodes Deterministically
      setSensors((prevSensors) =>
        prevSensors.map((s) => {
          let updatedVal = s.currentVal;
          if (s.code === 'T-01') updatedVal = nextTemp;
          else if (s.code === 'T-02') updatedVal = nextVolt;
          else if (s.code === 'T-05') updatedVal = nextPress;
          else if (s.code === 'T-07') updatedVal = nextVib;
          else {
            // Slight coherent jitter around nominal
            const jitter = (Math.random() - 0.5) * (s.nominalVal !== 0 ? Math.abs(s.nominalVal) * 0.008 : 0.05);
            updatedVal = parseFloat((s.nominalVal + jitter).toFixed(1));
          }

          let nodeStatus: 'nominal' | 'warning' | 'critical' = 'nominal';
          if (s.code === 'T-01') {
            if (updatedVal > 88) nodeStatus = 'critical';
            else if (updatedVal > 78) nodeStatus = 'warning';
          } else if (s.code === 'T-02') {
            if (updatedVal < 360) nodeStatus = 'critical';
            else if (updatedVal < 380) nodeStatus = 'warning';
          } else if (s.code === 'T-05') {
            if (updatedVal > 280) nodeStatus = 'critical';
            else if (updatedVal > 240) nodeStatus = 'warning';
          } else if (s.code === 'T-07') {
            if (updatedVal > 0.85) nodeStatus = 'critical';
            else if (updatedVal > 0.40) nodeStatus = 'warning';
          }

          const newHist = [...s.history.slice(-7), parseFloat(updatedVal.toFixed(1))];
          return {
            ...s,
            currentVal: parseFloat(updatedVal.toFixed(1)),
            status: nodeStatus,
            history: newHist,
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [stressMode]);

  // Inject stress test event
  const injectStress = useCallback((type: 'thermal' | 'voltage' | 'seismic' | 'recovery' | 'clear') => {
    if (type === 'clear') {
      setStressMode(null);
    } else {
      setStressMode(type);
      // Auto-revert after 12 seconds if not manually cleared
      if (type !== 'recovery') {
        setTimeout(() => {
          setStressMode('recovery');
          setTimeout(() => setStressMode(null), 5000);
        }, 12000);
      }
    }
  }, []);

  // Compute safe dynamic segments for State Timeline without layout break
  const getSafeStateSegments = useCallback((): StateHistorySegment[] => {
    const total = 
      stateDurationRef.current.REGIME_OK +
      stateDurationRef.current.ALERTA_TERMICO +
      stateDurationRef.current.FALHA_REDE +
      stateDurationRef.current.DEFESA_ATIVA +
      stateDurationRef.current.RECUPERACAO;

    const safeTotal = total > 0 ? total : 1;

    const colorMap: Record<OperationalState, string> = {
      REGIME_OK: '#10b981',       // Green
      ALERTA_TERMICO: '#f59e0b',   // Amber
      FALHA_REDE: '#ef4444',       // Red
      DEFESA_ATIVA: '#a855f7',     // Purple
      RECUPERACAO: '#06b6d4',      // Cyan
    };

    const labelMap: Record<OperationalState, string> = {
      REGIME_OK: 'Regime Nominal (OK)',
      ALERTA_TERMICO: 'Alerta Térmico (>88°C)',
      FALHA_REDE: 'Falha de Tensão (<360V)',
      DEFESA_ATIVA: 'Defesa Ativa / Polarizada',
      RECUPERACAO: 'Estabilização de Parâmetros',
    };

    const states: OperationalState[] = ['REGIME_OK', 'ALERTA_TERMICO', 'FALHA_REDE', 'DEFESA_ATIVA', 'RECUPERACAO'];

    return states.map((st) => {
      const dur = stateDurationRef.current[st];
      const pct = Math.max(4, Math.round((dur / safeTotal) * 100)); // Minimum 4% to ensure visibility
      return {
        state: st,
        label: labelMap[st],
        color: colorMap[st],
        durationSeconds: dur,
        percentage: pct,
      };
    });
  }, []);

  return {
    operationalState,
    channelHistory,
    sensors,
    selectedSynopticNodeId,
    setSelectedSynopticNodeId,
    stressMode,
    tickCount,
    injectStress,
    getSafeStateSegments,
  };
}
