import React from 'react';
import { 
  HISTORICAL_TERRITORIES, 
  HistoricalTerritory,
  WORLD_MOUNTAIN_PEAKS,
  MountainPeak,
  AtlasTacticalModelId
} from './worldMapData';
import { GLOBAL_MILITARY_CHOKEPOINTS, GLOBAL_SEEDS_GARRISONS, GLOBAL_THREAT_THEATERS } from '../../data/worldMilitaryData';
import { GLOBAL_PROGRAMS_DATA } from '../../data/globalSeedsData';

interface WorldMapPathsProps {
  onSelectContinent?: (id: string) => void;
  hoveredContinent?: string | null;
  onHoverContinent?: (id: string | null) => void;
  selectedTerritory?: HistoricalTerritory | null;
  onSelectTerritory?: (territory: HistoricalTerritory) => void;
  selectedPeak?: MountainPeak | null;
  onSelectPeak?: (peak: MountainPeak) => void;
  showCountryBorders?: boolean;
  showSubmergedZones?: boolean;
  showContinentLabels?: boolean;
  showHistoricalTerritories?: boolean;
  showRelief2D?: boolean;
  showElevationContours?: boolean;
  showMountainPeaks?: boolean;
  showMilitaryGarrisons?: boolean;
  showChokepoints?: boolean;
  activeModel?: AtlasTacticalModelId;
  weatherRainPct?: number; // 0 to 100 for Rasputitsa simulation
  flirThermalScan?: boolean;
  mapEra?: 'pre_impact' | 'post_impact';
  selectedFrontId?: string | null;
  onSelectFront?: (frontId: string) => void;
}

export const WorldMapPaths: React.FC<WorldMapPathsProps> = ({
  onSelectContinent,
  hoveredContinent,
  onHoverContinent,
  selectedTerritory,
  onSelectTerritory,
  selectedPeak,
  onSelectPeak,
  showCountryBorders = true,
  showSubmergedZones = true,
  showContinentLabels = true,
  showHistoricalTerritories = true,
  showRelief2D = true,
  showElevationContours = true,
  showMountainPeaks = true,
  showMilitaryGarrisons = true,
  showChokepoints = true,
  activeModel = 'relief_2d',
  weatherRainPct = 35,
  flirThermalScan = false,
  mapEra = 'post_impact',
  selectedFrontId,
  onSelectFront,
}) => {
  const isPreImpact = mapEra === 'pre_impact';

  return (
    <g id="robinson-world-map-paths" className="transition-all duration-300">
      <defs>
        {/* Submerged Water Pattern (Lighter, Shimmering Sea-Foam Cyan Tone) */}
        <pattern
          id="submergedWaterPattern"
          width="10"
          height="10"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <rect width="10" height="10" fill="#38bdf8" fillOpacity="0.38" />
          <line x1="0" y1="0" x2="0" y2="10" stroke="#00f0ff" strokeWidth="1.2" strokeOpacity="0.8" />
          <circle cx="5" cy="5" r="1.5" fill="#e0f2fe" fillOpacity="0.7" />
        </pattern>

        {/* Rasputitsa Mud Saturated Pattern */}
        <pattern
          id="rasputitsaMudPattern"
          width="12"
          height="12"
          patternTransform="rotate(30 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 0 6 Q 3 2, 6 6 T 12 6" fill="none" stroke="#78350f" strokeWidth="1.2" opacity="0.8" />
          <circle cx="3" cy="9" r="1" fill="#451a03" />
          <circle cx="9" cy="3" r="1.2" fill="#451a03" />
        </pattern>

        {/* Canopy Infrared Foliage Pattern */}
        <pattern
          id="canopyInfraredPattern"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect width="10" height="10" fill="#064e3b" fillOpacity="0.4" />
          <circle cx="5" cy="5" r="3" fill="#10b981" fillOpacity="0.35" />
        </pattern>

        {/* Impact Fracture Glow */}
        <filter id="craterGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ef4444" floodOpacity="0.85" />
        </filter>

        {/* Mountain Peak Glow */}
        <filter id="peakGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.2" floodColor="#ffffff" floodOpacity="0.95" />
        </filter>

        {/* Active Front Pulsing Beacon Filter */}
        <filter id="activeFrontGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00f0ff" floodOpacity="1" />
        </filter>

        {/* Hypsometric Elevation Relief Gradients (Higher Altitude = Progressively Darker) */}
        {/* Tier 1 Lowlands to Tier 4 Extreme Highlands */}
        <linearGradient id="hypsometricAndes" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1c0a02" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#451a03" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#78350f" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="hypsometricHimalaya" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#1a0802" stopOpacity="0.98" />
          <stop offset="40%" stopColor="#3d1504" stopOpacity="0.92" />
          <stop offset="75%" stopColor="#78350f" stopOpacity="0.85" />
          <stop offset="92%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="hypsometricRockies" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2e1004" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#5a2206" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#9a3412" stopOpacity="0.7" />
        </linearGradient>

        {/* Pre-Impact Lush Holocene Gradient */}
        <linearGradient id="preImpactHoloceneLand" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d6a4f" />
          <stop offset="40%" stopColor="#52b788" />
          <stop offset="75%" stopColor="#d4a373" />
          <stop offset="100%" stopColor="#2d6a4f" />
        </linearGradient>
      </defs>

      {/* ========================================================================= */}
      {/* 1. CONTINENTAL LANDMASSES WITH HYPSOMETRIC RELIEF & NATURAL LIVING LINES */}
      {/* ========================================================================= */}
      <g id="map-paths-scaled-wrapper" transform="scale(1, 0.5625)">
        <g id="continents-layer">
        {/* 1. AMÉRICA */}
        <g 
          id="continent-america"
          className="cursor-pointer transition-transform duration-200"
          onClick={() => onSelectContinent && onSelectContinent('north-america')}
          onMouseEnter={() => onHoverContinent && onHoverContinent('América')}
          onMouseLeave={() => onHoverContinent && onHoverContinent(null)}
        >
          {/* North America Landmass */}
          <path
            id="land-north-america"
            d={`
              M 42 118
              Q 48 110, 54 114 T 62 104 T 74 98 T 88 88 T 102 82 T 116 80 T 132 74 T 146 76
              Q 154 70, 162 76 T 174 82 T 188 84 T 202 78 T 214 72 T 228 75 T 242 70 T 256 74
              Q 268 76, 276 84 T 288 88 T 300 96 T 312 106 T 322 118 T 328 132 T 324 146
              Q 318 156, 314 164 T 304 168 T 292 172 T 282 176 T 270 178
              Q 256 168, 248 180 T 236 192 T 242 204 T 232 216 T 222 222 T 212 228
              Q 204 234, 196 244 T 188 256 T 180 268 T 172 284 T 164 298 T 156 312 T 152 328
              Q 156 338, 162 348 T 170 358 T 178 368 T 184 378
              Q 192 388, 198 396 T 192 404 T 182 408 T 172 414 T 162 424 T 154 436 T 148 448
              Q 142 454, 138 446 T 130 434 T 124 418 T 116 400 T 110 382 T 102 364 T 96 346
              Q 90 330, 84 312 T 78 292 T 72 272 T 66 250 T 60 228 T 54 204 T 48 180 T 44 156 T 40 138
              Z
            `}
            fill={
              flirThermalScan ? '#1e1b4b' : (
                isPreImpact ? 'url(#preImpactHoloceneLand)' : (activeModel === 'relief_2d' ? '#ea580c' : '#c2410c')
              )
            }
            stroke={flirThermalScan ? '#38bdf8' : (isPreImpact ? '#166534' : '#451a03')}
            strokeWidth={isPreImpact ? "1.4" : "1.2"}
            className="hover:brightness-105"
          />

          {/* Greenland (Groenlândia) */}
          <path
            id="land-greenland"
            d={`
              M 338 34
              Q 348 26, 360 28 T 374 24 T 388 28 T 402 34 T 414 44 T 424 58 T 428 72
              Q 430 86, 426 98 T 418 112 T 408 124 T 396 134 T 384 140 T 370 142
              Q 358 138, 350 128 T 344 114 T 346 98 T 342 82 T 336 66 T 334 50
              Z
            `}
            fill={
              flirThermalScan ? '#0f172a' : (
                isPreImpact ? '#93c5fd' : (activeModel === 'relief_2d' ? '#b45309' : '#c2410c')
              )
            }
            stroke={flirThermalScan ? '#38bdf8' : (isPreImpact ? '#1e3a8a' : '#451a03')}
            strokeWidth="1.1"
          />

          {/* Caribbean Islands & Arctic Archipelago */}
          <path d="M 44 116 Q 34 122, 24 130 T 14 142 Q 18 148, 26 142 T 38 132 T 48 122 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.8" />
          <path d="M 208 44 Q 222 38, 236 44 T 252 42 T 266 50 Q 262 58, 248 64 T 228 58 T 208 44 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.8" />
          <path d="M 276 46 Q 288 42, 300 48 T 308 58 T 294 66 T 280 58 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.7" />
          <path d="M 174 366 Q 186 360, 198 366 T 190 374 T 176 372 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.6" />
          <path d="M 212 376 Q 224 372, 234 380 T 224 388 T 212 382 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.6" />

          {/* South America (América do Sul) */}
          <path
            id="land-south-america"
            d={`
              M 178 506
              Q 188 496, 202 488 T 218 482 T 234 478 T 250 476 T 266 478 T 282 484 T 298 494
              Q 312 506, 328 518 T 344 534 T 358 552 T 370 572 T 378 594 T 374 614 T 366 632
              Q 356 648, 346 666 T 334 686 T 322 708 T 310 730 T 298 754 T 286 778 T 274 804
              Q 262 826, 252 846 T 242 862 T 234 868 T 224 862 T 218 848
              Q 220 832, 216 812 T 222 790 T 218 768 T 222 744 T 216 720 T 212 696 T 206 672
              Q 198 648, 192 624 T 186 600 T 182 576 T 178 552 T 176 528 T 178 506
              Z
            `}
            fill={
              flirThermalScan ? '#1e1b4b' : (
                isPreImpact ? 'url(#preImpactHoloceneLand)' : (activeModel === 'relief_2d' ? '#ea580c' : '#c2410c')
              )
            }
            stroke={flirThermalScan ? '#38bdf8' : (isPreImpact ? '#166534' : '#451a03')}
            strokeWidth={isPreImpact ? "1.4" : "1.2"}
            className="hover:brightness-105"
          />
        </g>

        {/* 2. ÁFRICA (Amber / Ochre #d97706) */}
        <g 
          id="continent-africa"
          className="cursor-pointer transition-transform duration-200"
          onClick={() => onSelectContinent && onSelectContinent('sub-saharan-africa')}
          onMouseEnter={() => onHoverContinent && onHoverContinent('África')}
          onMouseLeave={() => onHoverContinent && onHoverContinent(null)}
        >
          <path
            id="land-africa"
            d={`
              M 414 300
              Q 424 290, 436 292 T 450 290 T 466 296 T 482 298 T 498 304 T 514 308 T 528 316
              Q 538 326, 544 338 T 546 354 T 552 368 T 558 382 T 568 396 T 580 408 T 596 420
              Q 610 432, 622 444 T 630 458 T 626 472 T 616 484 T 604 496 T 594 510 T 586 526
              Q 580 544, 578 562 T 574 582 T 570 604 T 564 626 T 558 648 T 550 670 T 540 692
              Q 532 710, 520 726 T 506 740 T 490 748 T 476 740 T 464 724 T 456 704
              Q 452 682, 452 660 T 454 636 T 458 612 T 462 588 T 464 564 T 462 540
              Q 456 518, 444 500 T 430 484 T 414 472 T 396 462 T 380 454 T 368 444
              Q 360 432, 362 418 T 370 402 T 380 384 T 388 366 T 394 348 T 402 330 T 408 314
              Z
            `}
            fill={
              flirThermalScan ? '#1e1b4b' : (
                isPreImpact ? 'url(#preImpactHoloceneLand)' : (activeModel === 'relief_2d' ? '#d97706' : '#b45309')
              )
            }
            stroke={flirThermalScan ? '#38bdf8' : (isPreImpact ? '#166534' : '#451a03')}
            strokeWidth="1.2"
            className="hover:brightness-105"
          />

          {/* Madagascar */}
          <path
            id="land-madagascar"
            d="M 618 570 Q 628 554, 638 564 T 642 594 T 638 626 T 626 654 T 614 666 Q 606 654, 610 634 T 616 602 Z"
            fill={isPreImpact ? '#52b788' : '#b45309'}
            stroke="#451a03"
            strokeWidth="1"
          />
        </g>

        {/* 3. EURÁSIA (Europa & Ásia) */}
        <g 
          id="continent-eurasia"
          className="cursor-pointer transition-transform duration-200"
          onClick={() => onSelectContinent && onSelectContinent('europe')}
          onMouseEnter={() => onHoverContinent && onHoverContinent('Eurásia')}
          onMouseLeave={() => onHoverContinent && onHoverContinent(null)}
        >
          {/* British Isles & Ireland */}
          <path d="M 432 176 Q 442 164, 450 172 T 444 192 T 434 204 T 426 194 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.9" />
          <path d="M 418 184 Q 426 176, 430 184 T 426 196 T 416 194 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.8" />

          {/* Scandinavian Peninsula */}
          <path
            d="M 474 130 Q 484 98, 502 84 T 526 80 T 546 94 T 538 126 T 518 144 T 496 150 Z"
            fill={isPreImpact ? '#52b788' : '#ea580c'}
            stroke="#451a03"
            strokeWidth="1"
          />

          {/* Massive Eurasian Core */}
          <path
            id="land-eurasia-main"
            d={`
              M 432 232
              /* Iberian Peninsula & Mediterranean Coast */
              Q 438 222, 448 226 T 462 232 T 474 238 T 488 240 T 504 236 T 518 244 T 534 246
              /* Black Sea, Anatolia & Levant */
              Q 548 248, 564 246 T 580 252 T 594 262 T 604 274 T 600 286 T 588 296
              /* Arabian Peninsula */
              Q 584 310, 592 326 T 608 344 T 626 358 T 642 364 T 654 354 T 646 338 T 632 324
              /* Persian Gulf & Indian Subcontinent Triangle */
              Q 638 312, 650 310 T 662 320 T 672 334 T 680 354 T 688 376 T 696 400 T 706 424
              Q 716 438, 726 422 T 734 402 T 740 380 T 746 358 T 758 340 T 772 332
              /* Indochina, Sundaland & Malay Peninsula */
              Q 786 338, 798 354 T 808 376 T 814 402 T 822 428 T 816 444 T 806 430 T 798 406
              /* East Asian Coast (China, Yellow Sea, Bohai) */
              Q 804 380, 814 356 T 826 334 T 838 314 T 848 296 T 854 276 T 846 258 T 834 246
              /* Sea of Okhotsk, Kamchatka & Chukotka Peninsula */
              Q 842 232, 856 216 T 874 200 T 892 186 T 906 170 T 918 152 T 912 136 T 898 128
              /* Arctic Siberian Coastline (Laptev, Kara, Barents) */
              Q 880 126, 858 128 T 832 124 T 804 122 T 776 118 T 748 116 T 718 114 T 688 116
              Q 658 118, 628 120 T 598 124 T 568 126 T 538 132 T 510 142 T 484 156 T 460 174
              /* European Atlantic Coastline (France, Biscay, Iberia) */
              Q 444 190, 436 206 T 432 232
              Z
            `}
            fill={
              flirThermalScan ? '#1e1b4b' : (
                isPreImpact ? 'url(#preImpactHoloceneLand)' : (activeModel === 'relief_2d' ? '#ea580c' : '#c2410c')
              )
            }
            stroke={flirThermalScan ? '#38bdf8' : (isPreImpact ? '#166534' : '#451a03')}
            strokeWidth="1.2"
            className="hover:brightness-105"
          />

          {/* Japanese Archipelago (Teatro das 7 Seeds) */}
          <g id="land-japan-islands">
            {/* Honshu Arc */}
            <path d="M 866 230 Q 878 240, 882 254 T 874 270 T 860 280 T 852 272 Z" fill={isPreImpact ? '#22c55e' : '#f59e0b'} stroke="#b45309" strokeWidth="1" />
            {/* Hokkaido */}
            <path d="M 876 212 Q 888 206, 894 216 T 888 226 T 876 222 Z" fill={isPreImpact ? '#22c55e' : '#38bdf8'} stroke="#0284c7" strokeWidth="0.9" />
            {/* Kyushu & Shikoku */}
            <path d="M 848 276 Q 856 272, 858 280 T 850 288 Z" fill={isPreImpact ? '#22c55e' : '#ea580c'} stroke="#451a03" strokeWidth="0.8" />
            <path d="M 856 268 Q 864 266, 866 272 T 858 276 Z" fill={isPreImpact ? '#22c55e' : '#ea580c'} stroke="#451a03" strokeWidth="0.8" />
          </g>

          {/* Indonesian Archipelago & Philippines */}
          <path d="M 764 456 Q 784 466, 804 474 T 824 480 Q 816 488, 796 482 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.8" />
          <path d="M 818 440 Q 830 430, 842 444 T 832 462 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.8" />
          <path d="M 834 380 Q 842 370, 848 382 T 842 398 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.8" />
        </g>

        {/* 4. OCEANIA (Australia & New Zealand #65a30d / #ca8a04) */}
        <g 
          id="continent-oceania"
          className="cursor-pointer transition-transform duration-200"
          onClick={() => onSelectContinent && onSelectContinent('australia')}
          onMouseEnter={() => onHoverContinent && onHoverContinent('Oceania')}
          onMouseLeave={() => onHoverContinent && onHoverContinent(null)}
        >
          {/* Australia Main Continental Landmass */}
          <path
            id="land-australia"
            d={`
              M 812 590
              Q 826 572, 844 578 T 866 580 T 888 574 T 908 584 T 922 602 T 926 624
              Q 928 648, 924 670 T 916 694 T 904 716 T 886 732 T 866 738 T 844 734
              Q 826 726, 814 710 T 806 688 T 802 664 T 800 638 T 804 614 T 812 590
              Z
            `}
            fill={
              flirThermalScan ? '#1e1b4b' : (
                isPreImpact ? 'url(#preImpactHoloceneLand)' : (activeModel === 'relief_2d' ? '#d97706' : '#b45309')
              )
            }
            stroke={flirThermalScan ? '#38bdf8' : (isPreImpact ? '#166534' : '#451a03')}
            strokeWidth="1.2"
            className="hover:brightness-105"
          />

          {/* New Guinea & New Zealand */}
          <path d="M 844 518 Q 872 506, 902 524 T 886 544 T 852 538 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.8" />
          <path d="M 942 748 Q 952 734, 960 748 T 948 776 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.8" />
          <path d="M 932 780 Q 940 770, 946 782 T 938 804 Z" fill={isPreImpact ? '#52b788' : '#c2410c'} stroke="#451a03" strokeWidth="0.8" />
        </g>

        {/* 5. ANTÁRTIDA (White / Glacial Ice Cap) */}
        <g 
          id="continent-antarctica"
          className="cursor-pointer transition-transform duration-200"
          onClick={() => onSelectContinent && onSelectContinent('antarctica')}
          onMouseEnter={() => onHoverContinent && onHoverContinent('Antártida')}
          onMouseLeave={() => onHoverContinent && onHoverContinent(null)}
        >
          <path
            id="land-antarctica"
            d={`
              M 180 870
              Q 260 854, 340 858 T 420 854 T 500 850 T 580 852 T 660 850 T 740 854 T 820 864 T 900 878
              L 900 950 L 100 950 L 100 878
              Z
            `}
            fill={flirThermalScan ? '#020617' : (isPreImpact ? '#e0f2fe' : '#f8fafc')}
            stroke={flirThermalScan ? '#38bdf8' : (isPreImpact ? '#38bdf8' : '#94a3b8')}
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* ========================================================================= */}
      {/* 2. HYPSOMETRIC RELIEF TIERS (HIGHER ELEVATION = PROGRESSIVELY DARKER)      */}
      {/* ========================================================================= */}
      {showRelief2D && (
        <g id="hypsometric-stepped-relief-layer">
          {/* 1. Andes Cordillera (+3000m to +6961m Aconcagua) */}
          <g id="relief-andes-spine">
            {/* Stepped Base Contour (+1500m) */}
            <path
              d="M 180 510 Q 190 544, 196 580 T 208 634 T 220 700 T 226 766 T 232 830 T 222 846 T 212 790 T 202 720 T 192 650 T 182 580 T 176 530 Z"
              fill="#78350f"
              fillOpacity="0.75"
              stroke="#451a03"
              strokeWidth="0.8"
            />
            {/* Stepped Darker Mid-Tier (+3500m) */}
            <path
              d="M 184 516 Q 192 548, 198 584 T 210 638 T 222 702 T 228 768 T 234 832 T 224 848 T 214 792 T 204 722 T 194 652 T 184 582 T 178 534 Z"
              fill="url(#hypsometricAndes)"
              stroke="#2e1004"
              strokeWidth="1"
            />
            {/* High Altiplano Peak (+5000m) */}
            <ellipse cx="214" cy="672" rx="14" ry="32" fill="#1c0a02" fillOpacity="0.9" stroke="#000000" strokeWidth="0.8" />
            <ellipse cx="214" cy="672" rx="7" ry="18" fill="#ffffff" fillOpacity="0.85" filter="url(#peakGlow)" />
            {/* Snow Crest Ridge Line */}
            <path
              d="M 182 524 Q 190 554, 196 592 T 208 654 T 220 724 T 226 798 T 230 844"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
              filter="url(#peakGlow)"
            />
          </g>

          {/* 2. Himalayas & Tibetan High Plateau (Everest 8,848m / K2 8,611m) */}
          <g id="relief-himalayas-tibet">
            {/* Tibetan High Plateau Base (+4000m) */}
            <path
              d="M 662 312 Q 692 296, 734 300 T 770 318 T 762 344 T 720 348 T 678 340 Z"
              fill="#522402"
              fillOpacity="0.9"
              stroke="#2e1004"
              strokeWidth="1"
            />
            {/* High Peak Ridge Deep Dark Chocolate (+6000m to +8848m) */}
            <path
              d="M 664 340 Q 690 334, 718 330 T 748 336 T 772 348"
              fill="none"
              stroke="#1a0802"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {/* Gleaming Alpine Crest Line */}
            <path
              d="M 664 340 Q 690 334, 718 330 T 748 336 T 772 348"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.4"
              strokeLinecap="round"
              filter="url(#peakGlow)"
            />
          </g>

          {/* 3. Rocky Mountains & North American Cordillera */}
          <g id="relief-rockies-north-america">
            <path
              d="M 68 152 Q 88 178, 102 216 T 116 270 T 124 322 T 132 370 T 120 376 T 110 326 T 98 274 T 84 220 T 64 168 Z"
              fill="url(#hypsometricRockies)"
              stroke="#3d1504"
              strokeWidth="0.8"
            />
            <path
              d="M 72 162 Q 92 186, 104 224 T 118 278 T 126 330"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinecap="round"
              filter="url(#peakGlow)"
            />
          </g>

          {/* 4. Alps & Caucasus (Europe) */}
          <g id="relief-alps-caucasus">
            <path d="M 458 236 Q 472 222, 492 226 T 512 234" fill="none" stroke="#2e1004" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 458 236 Q 472 222, 492 226 T 512 234" fill="none" stroke="#ffffff" strokeWidth="1.6" filter="url(#peakGlow)" />
            <path d="M 572 246 Q 588 240, 604 244" fill="none" stroke="#2e1004" strokeWidth="4" strokeLinecap="round" />
            <path d="M 572 246 Q 588 240, 604 244" fill="none" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        </g>
      )}

      {/* ========================================================================= */}
      {/* 3. POST-IMPACT SUBMERGED CONTINENTAL SHELVES (+80M SEA LEVEL RISE)        */}
      {/*    (Rendered in Lighter, Translucent Cyan Tone with Shimmering Waves)     */}
      {/* ========================================================================= */}
      {!isPreImpact && showSubmergedZones && (
        <g id="submerged-continents-layer">
          {/* Submerged Florida & Gulf Lowlands */}
          <path
            d="M 185 320 C 210 330, 230 355, 215 385 C 195 405, 170 380, 185 320 Z"
            fill="url(#submergedWaterPattern)"
            stroke="#00f0ff"
            strokeWidth="1.4"
            className="animate-pulse"
          />

          {/* Submerged Amazonian Great Inland Sea */}
          <path
            d="M 220 510 C 265 490, 310 520, 295 565 C 260 595, 215 560, 220 510 Z"
            fill="url(#submergedWaterPattern)"
            stroke="#00f0ff"
            strokeWidth="1.5"
            className="animate-pulse"
          />

          {/* Submerged Ganges Plain & Indian Delta */}
          <path
            d="M 660 360 C 690 350, 725 365, 720 400 C 705 440, 675 420, 660 360 Z"
            fill="url(#submergedWaterPattern)"
            stroke="#00f0ff"
            strokeWidth="1.4"
            className="animate-pulse"
          />

          {/* Flooded Inland Sea of Lake Eyre (Austrália Central) */}
          <path
            d="M 845 650 C 870 635, 895 655, 885 685 C 865 705, 840 680, 845 650 Z"
            fill="url(#submergedWaterPattern)"
            stroke="#00f0ff"
            strokeWidth="1.5"
            className="animate-pulse"
          />

          {/* Submerged North Sea / Doggerland Shelf */}
          <path
            d="M 445 180 C 465 170, 485 185, 475 205 C 455 215, 440 200, 445 180 Z"
            fill="url(#submergedWaterPattern)"
            stroke="#00f0ff"
            strokeWidth="1.3"
            className="animate-pulse"
          />

          {/* Submerged Sundaland Archipelago Shelf */}
          <path
            d="M 760 480 C 795 470, 835 500, 825 545 C 795 565, 755 530, 760 480 Z"
            fill="url(#submergedWaterPattern)"
            stroke="#00f0ff"
            strokeWidth="1.4"
            className="animate-pulse"
          />

          {/* Meteor Impact Mega-Crater in the Pacific */}
          <g transform="translate(110, 460)" filter="url(#craterGlow)">
            <circle cx="0" cy="0" r="16" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 3" className="animate-spin" />
            <circle cx="0" cy="0" r="8" fill="#ef4444" fillOpacity="0.65" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>
        </g>
      )}

      {/* ========================================================================= */}
      {/* 4. COUNTRY SUBDIVISION BORDERS & CONTINENT LABELS                          */}
      {/* ========================================================================= */}
      {showCountryBorders && (
        <g id="country-borders-layer" stroke={isPreImpact ? "#1e3a8a" : "#1a1a1a"} strokeWidth="0.65" fill="none" opacity={isPreImpact ? 0.7 : 0.45}>
          <path d="M 85 140 L 180 140 L 260 145" />
          <path d="M 130 290 L 175 320 L 205 345" />
          <path d="M 148 400 L 165 410" />
          <path d="M 215 520 L 245 540 L 280 535" />
          <path d="M 200 580 L 230 600 L 260 630" />
          <path d="M 230 680 L 270 700 L 310 670" />
          <path d="M 420 340 L 480 345 L 530 330" />
          <path d="M 570 170 L 680 175 L 820 160" />
          <path d="M 640 290 L 710 310 L 780 320" />
          <path d="M 850 620 L 850 725" />
        </g>
      )}

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE SEEDS & CONTINENTAL FRONTS (WITH PULSING BEACON WHEN ACTIVE)*/}
      {/* ========================================================================= */}
      </g>
      <g id="seeds-global-fronts-layer">
        {GLOBAL_PROGRAMS_DATA.map((prog) => {
          const isSelected = selectedFrontId === prog.id;
          // Scale coordinates from percentage/data to SVG viewBox 1000x562.5
          const posX = prog.coordinates.x * 10;
          const posY = prog.coordinates.y * 5.625;

          return (
            <g
              key={prog.id}
              id={`front-node-${prog.id}`}
              transform={`translate(${posX}, ${posY})`}
              className="cursor-pointer transition-transform duration-200 hover:scale-125"
              onClick={(e) => {
                e.stopPropagation();
                onSelectFront && onSelectFront(prog.id);
              }}
            >
              {/* Pulsing Radar Ring on Selected Front */}
              {isSelected && (
                <g filter="url(#activeFrontGlow)">
                  <circle cx="0" cy="0" r="26" fill="none" stroke="#00f0ff" strokeWidth="2" strokeDasharray="4 3" className="animate-ping" />
                  <circle cx="0" cy="0" r="18" fill={prog.color} fillOpacity="0.25" stroke="#00f0ff" strokeWidth="1.8" />
                  {/* Rotating Crosshair Calipers */}
                  <line x1="-22" y1="0" x2="22" y2="0" stroke="#00f0ff" strokeWidth="1.5" />
                  <line x1="0" y1="-22" x2="0" y2="22" stroke="#00f0ff" strokeWidth="1.5" />
                </g>
              )}

              {/* Base Marker Node */}
              <circle
                cx="0"
                cy="0"
                r={isSelected ? 9 : 6.5}
                fill={prog.color}
                fillOpacity={isSelected ? 1 : 0.85}
                stroke={isSelected ? '#ffffff' : '#030712'}
                strokeWidth={isSelected ? 2.2 : 1.2}
              />
              <circle cx="0" cy="0" r={isSelected ? 3.5 : 2} fill="#ffffff" />

              {/* Front Label Pill */}
              <g transform="translate(0, -11)">
                <rect
                  x={-((prog.regionShort.length * 3.4) + 8) / 2}
                  y="-10"
                  width={(prog.regionShort.length * 3.4) + 8}
                  height="12"
                  rx="2"
                  fill={isSelected ? '#051126' : '#040915'}
                  fillOpacity="0.95"
                  stroke={isSelected ? '#00f0ff' : '#1e293b'}
                  strokeWidth={isSelected ? 1.2 : 0.75}
                />
                <text
                  x="0"
                  y="-2"
                  textAnchor="middle"
                  fontSize="6.5"
                  fill={isSelected ? '#00f0ff' : '#f1f5f9'}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {prog.regionShort}
                </text>
              </g>
            </g>
          );
        })}
      </g>

      {/* ========================================================================= */}
      {/* 6. CONTINENT LABELS                                                       */}
      {/* ========================================================================= */}
      {showContinentLabels && (
        <g id="continent-labels-layer" fontFamily="serif, ui-serif, Georgia, sans-serif" fontWeight="900">
          <text x="320" y="307" textAnchor="middle" fontSize="28" fill={isPreImpact ? "#1e3a8a" : "#381303"} letterSpacing="0.5" className="select-none pointer-events-none drop-shadow-sm">
            América
          </text>
          <text x="535" y="121" textAnchor="middle" fontSize="24" fill={isPreImpact ? "#1e3a8a" : "#451e02"} letterSpacing="0.5" className="select-none pointer-events-none drop-shadow-sm">
            Europa
          </text>
          <text x="705" y="132" textAnchor="middle" fontSize="28" fill={isPreImpact ? "#1e3a8a" : "#473002"} letterSpacing="0.5" className="select-none pointer-events-none drop-shadow-sm">
            Ásia
          </text>
          <text x="525" y="245" textAnchor="middle" fontSize="27" fill={isPreImpact ? "#1e3a8a" : "#1e3802"} letterSpacing="0.5" className="select-none pointer-events-none drop-shadow-sm">
            África
          </text>
          <text x="815" y="363" textAnchor="middle" fontSize="25" fill={isPreImpact ? "#1e3a8a" : "#112904"} letterSpacing="0.5" className="select-none pointer-events-none drop-shadow-sm">
            Oceania
          </text>
          <text x="480" y="520" textAnchor="middle" fontSize="24" fill={isPreImpact ? "#0369a1" : "#061a10"} letterSpacing="0.5" className="select-none pointer-events-none drop-shadow-sm">
            Antártida
          </text>
        </g>
      )}

      {/* ========================================================================= */}
      {/* 7. MOUNTAIN SUMMITS                                                       */}
      {/* ========================================================================= */}
      {showMountainPeaks && (
        <g id="mountain-peaks-layer">
          {WORLD_MOUNTAIN_PEAKS.map((peak) => {
            const isSelected = selectedPeak?.id === peak.id;
            return (
              <g
                key={peak.id}
                transform={`translate(${peak.x}, ${peak.y})`}
                className="cursor-pointer transition-transform duration-200 hover:scale-125"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPeak && onSelectPeak(peak);
                }}
              >
                <path
                  d="M 0 -8 L 8 0 L 0 8 L -8 0 Z"
                  fill={isSelected ? '#f59e0b' : '#0f172a'}
                  fillOpacity="0.85"
                  stroke={isSelected ? '#ffffff' : '#f59e0b'}
                  strokeWidth={isSelected ? 1.8 : 1}
                  filter="url(#peakGlow)"
                />
                <path d="M 0 -5 L 4 3 L -4 3 Z" fill={isSelected ? '#ffffff' : '#fbbf24'} />
              </g>
            );
          })}
        </g>
      )}
    </g>
  );
};
