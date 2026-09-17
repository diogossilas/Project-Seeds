import React from 'react';
import { 
  McooZone, 
  OperationsFeature, 
  SoilZone, 
  CanopyZone, 
  BioticZone 
} from '../../types/militaryMaps';
import { 
  Shield, 
  AlertTriangle, 
  Crosshair, 
  Compass, 
  Droplets, 
  Trees, 
  Bug, 
  Flame, 
  Radio, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  FileText,
  Activity,
  Maximize2
} from 'lucide-react';

interface MilitaryMapInspectorProps {
  feature: { type: string; data: any } | null;
  onClear: () => void;
}

export const MilitaryMapInspector: React.FC<MilitaryMapInspectorProps> = ({
  feature,
  onClear,
}) => {
  if (!feature || !feature.data) {
    return (
      <div className="bg-[#050b14] border border-[#1e293b] p-5 h-full flex flex-col items-center justify-center text-center shadow-lg">
        <div className="w-12 h-12 bg-[#010613] border border-[#1e293b] flex items-center justify-center mb-3">
          <Crosshair className="w-6 h-6 text-slate-500 animate-pulse" />
        </div>
        <h3 className="text-sm font-bold font-sans text-slate-300">
          TELEMETRIA TÁTICA EM ESPERA
        </h3>
        <p className="text-xs text-slate-400 max-w-xs mt-1.5 font-sans leading-relaxed">
          Passe o cursor sobre qualquer setor, polígono de solo, vetor de avanço ou área de dossel para revelar a telemetria detalhada sob demanda.
        </p>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono-code text-emerald-400/80 bg-emerald-500/5 px-2.5 py-1 border border-emerald-500/20">
          <span>PADRÃO OTAN APP-6 / MIL-STD-2525</span>
        </div>
      </div>
    );
  }

  const { type, data } = feature;

  return (
    <div className="bg-[#050b14] border border-[#1e293b] p-4 sm:p-5 flex flex-col justify-between shadow-xl space-y-4">
      {/* Header Bar */}
      <div>
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono-code font-bold uppercase border bg-[#010613] text-emerald-400 border-emerald-500/40 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              <span>MODELO {type.toUpperCase()}</span>
            </span>
            <span className="text-[11px] font-mono-code text-slate-400">
              {data.center?.mgrs || '54S UJ 8500 3500'}
            </span>
          </div>

          <button
            onClick={onClear}
            className="text-slate-400 hover:text-slate-200 text-xs font-mono-code cursor-pointer"
          >
            [FECHAR]
          </button>
        </div>

        <h3 className="text-base sm:text-lg font-bold font-sans text-white mt-2">
          {data.name}
        </h3>
        {data.description && (
          <p className="text-xs text-slate-300 mt-1 font-sans leading-relaxed">
            {data.description}
          </p>
        )}
      </div>

      {/* MODEL 1: MCOO DETAILS */}
      {type === 'mcoo' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#010613] border border-[#1e293b] p-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">Grau de Mobilidade</div>
              <div className={`text-sm font-bold font-mono-code mt-0.5 ${
                data.mobility === 'unrestricted' ? 'text-emerald-400' :
                data.mobility === 'restricted' ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {data.mobility === 'unrestricted' ? 'IRRESTRITO (GO)' :
                 data.mobility === 'restricted' ? 'RESTRITO (SLOW-GO)' : 'SEV. RESTRITO (NO-GO)'}
              </div>
            </div>

            <div className="bg-[#010613] border border-[#1e293b] p-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">Declividade / Relevo</div>
              <div className="text-sm font-bold font-mono-code text-cyan-400 mt-0.5">
                {data.slopeRange}
              </div>
            </div>
          </div>

          {data.maxFormation && (
            <div className="bg-[#010613] border border-[#1e293b] p-2.5">
              <span className="text-[10px] font-mono-code text-slate-400 uppercase block">Capacidade de Escalão</span>
              <span className="text-xs font-semibold text-slate-200">{data.maxFormation}</span>
            </div>
          )}

          <div className="space-y-1.5 pt-1 border-t border-[#1e293b]">
            <div className="bg-[#020617] p-2 border-l-2 border-emerald-500 text-[11px]">
              <span className="font-bold text-emerald-400 block font-mono-code uppercase">Ataque &amp; Manobra:</span>
              <span className="text-slate-300 font-sans">{data.operationalImpact?.attackAdvantage}</span>
            </div>
            <div className="bg-[#020617] p-2 border-l-2 border-cyan-500 text-[11px]">
              <span className="font-bold text-cyan-400 block font-mono-code uppercase">Trânsito no Solo:</span>
              <span className="text-slate-300 font-sans">{data.operationalImpact?.groundMovement}</span>
            </div>
            <div className="bg-[#020617] p-2 border-l-2 border-amber-500 text-[11px]">
              <span className="font-bold text-amber-400 block font-mono-code uppercase">Fauna &amp; Flora:</span>
              <span className="text-slate-300 font-sans">{data.operationalImpact?.faunaFloraInfluence}</span>
            </div>
          </div>
        </div>
      )}

      {/* MODEL 2: OPERATIONS OVERLAY DETAILS */}
      {type === 'operations' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#010613] border border-[#1e293b] p-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">Afiliação OTAN</div>
              <div className={`text-sm font-bold font-mono-code mt-0.5 ${
                data.affiliation === 'friendly' ? 'text-cyan-400' :
                data.affiliation === 'hostile' ? 'text-rose-400' : 'text-amber-400'
              }`}>
                {data.affiliation === 'friendly' ? 'FORÇAS AMIGAS (BLUE)' :
                 data.affiliation === 'hostile' ? 'FORÇAS INIMIGAS (RED)' : 'MEDIDA DE COORDENAÇÃO'}
              </div>
            </div>

            <div className="bg-[#010613] border border-[#1e293b] p-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">Designação Tática</div>
              <div className="text-sm font-bold font-mono-code text-white mt-0.5">
                {data.unitCode || 'LINHA TÁTICA'}
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-1 border-t border-[#1e293b]">
            <div className="bg-[#020617] p-2 border-l-2 border-cyan-500 text-[11px]">
              <span className="font-bold text-cyan-400 block font-mono-code uppercase">Regras de Engajamento:</span>
              <span className="text-slate-300 font-sans">{data.combatRules}</span>
            </div>
            <div className="bg-[#020617] p-2 border-l-2 border-amber-500 text-[11px]">
              <span className="font-bold text-amber-400 block font-mono-code uppercase">Coordenação de Fogos:</span>
              <span className="text-slate-300 font-sans">{data.fireCoordination}</span>
            </div>
            <div className="bg-[#020617] p-2 border-l-2 border-emerald-500 text-[11px]">
              <span className="font-bold text-emerald-400 block font-mono-code uppercase">Restrição Botânica:</span>
              <span className="text-slate-300 font-sans">{data.botanicalConstraint}</span>
            </div>
          </div>
        </div>
      )}

      {/* MODEL 3: SOIL TRAFFICABILITY DETAILS */}
      {type === 'trafficability' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#010613] border border-[#1e293b] p-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">Status</div>
              <div className={`text-sm font-bold font-mono-code mt-0.5 ${
                (data.dynamicStatus || data.trafficabilityStatus) === 'GO' ? 'text-emerald-400' :
                (data.dynamicStatus || data.trafficabilityStatus) === 'SLOW-GO' ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {data.dynamicStatus || data.trafficabilityStatus}
              </div>
            </div>

            <div className="bg-[#010613] border border-[#1e293b] p-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">Índice CBR</div>
              <div className="text-sm font-bold font-mono-code text-cyan-400 mt-0.5">
                {data.cbrIndex}%
              </div>
            </div>

            <div className="bg-[#010613] border border-[#1e293b] p-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">Carga Suportada</div>
              <div className="text-sm font-bold font-mono-code text-white mt-0.5">
                {data.effectiveCapacity || data.baseBearingCapacityTon} Ton
              </div>
            </div>
          </div>

          <div className="bg-[#010613] border border-[#1e293b] p-2.5">
            <span className="text-[10px] font-mono-code text-slate-400 uppercase block">Risco de Atolamento (Mud Bog-Down)</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-slate-800 h-2 overflow-hidden">
                <div 
                  className={`h-full ${data.bogDownRiskPct > 70 ? 'bg-rose-500' : data.bogDownRiskPct > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${data.bogDownRiskPct}%` }}
                />
              </div>
              <span className="font-mono-code text-xs font-bold text-slate-200">{data.bogDownRiskPct}%</span>
            </div>
          </div>

          <div className="bg-[#020617] p-2 border-l-2 border-amber-500 text-[11px]">
            <span className="font-bold text-amber-400 block font-mono-code uppercase">Parecer de Engenharia:</span>
            <span className="text-slate-300 font-sans">{data.operationalAdvisory}</span>
          </div>
        </div>
      )}

      {/* MODEL 4: CANOPY COVER DETAILS */}
      {type === 'canopy' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#010613] border border-[#1e293b] p-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">Fechamento de Copa</div>
              <div className="text-base font-bold font-mono-code text-blue-400 mt-0.5">
                {data.canopyClosurePct}%
              </div>
            </div>

            <div className="bg-[#010613] border border-[#1e293b] p-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">Ocultamento Térmico FLIR</div>
              <div className="text-base font-bold font-mono-code text-emerald-400 mt-0.5">
                {Math.round((data.thermalConcealmentRatio || 0.8) * 100)}%
              </div>
            </div>
          </div>

          <div className="bg-[#010613] border border-[#1e293b] p-2.5">
            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
              <span>Espaçamento Médio de Troncos:</span>
              <span className="font-mono-code font-bold text-cyan-400">{data.trunkSpacingMeters}m</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>Acesso Veicular:</span>
              <span className="font-mono-code text-slate-100">{data.maxVehicleAccess}</span>
            </div>
          </div>

          <div className="bg-[#020617] p-2 border-l-2 border-blue-500 text-[11px]">
            <span className="font-bold text-blue-400 block font-mono-code uppercase">Vantagem de Infiltração:</span>
            <span className="text-slate-300 font-sans">{data.infilPathAdvantage}</span>
          </div>
        </div>
      )}

      {/* MODEL 5: BIOTIC THREAT DETAILS */}
      {type === 'biotic' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#010613] border border-[#1e293b] p-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">Nível de Risco Biótico</div>
              <div className={`text-sm font-bold font-mono-code mt-0.5 ${
                data.threatLevel === 'Baixo' ? 'text-emerald-400' :
                data.threatLevel === 'Moderado' ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {data.threatLevel}
              </div>
            </div>

            <div className="bg-[#010613] border border-[#1e293b] p-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">Rota MEDEVAC</div>
              <div className={`text-sm font-bold font-mono-code mt-0.5 ${
                data.medevacSafeLane ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {data.medevacSafeLane ? 'HOMOLOGADA' : 'NÃO SEGURA'}
              </div>
            </div>
          </div>

          {data.sentinelFauna && (
            <div className="bg-[#010613] border border-[#1e293b] p-2.5">
              <span className="text-[10px] font-mono-code text-slate-400 uppercase block">Sentinelas Biológicas (Alerta de Infiltração)</span>
              <span className="text-xs font-semibold text-rose-300">{data.sentinelFauna.species}</span>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Raio de Alarme Acústico: <strong className="text-white">{data.sentinelFauna.acousticAlarmRadiusMeters}m</strong>
              </div>
            </div>
          )}

          <div className="bg-[#020617] p-2 border-l-2 border-rose-500 text-[11px]">
            <span className="font-bold text-rose-400 block font-mono-code uppercase">Diretriz Operacional &amp; Profilaxia:</span>
            <span className="text-slate-300 font-sans">{data.tacticalDirective}</span>
          </div>
        </div>
      )}

      {/* Footer System Status Tag */}
      <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-[10px] font-mono-code text-slate-400">
        <span>SENSOR: IPB COGNITIVE GRID</span>
        <span className="text-emerald-400">TELEMETRIA INTEGRADA</span>
      </div>
    </div>
  );
};
