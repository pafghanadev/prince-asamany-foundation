import React from 'react';
import {
  GHANA_OUTLINE_PATH,
  LAKE_VOLTA_PATH,
  ASHANTI_REGION_PATH,
} from './ghanaMapData';

// Authentic Ghana national silhouette with Lake Volta and Ashanti Region
export function GhanaMapSilhouette() {
  return (
    <svg
      viewBox="0 0 964 1304"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full select-none"
    >
      {/* Ghana National Silhouette */}
      <path
        d={GHANA_OUTLINE_PATH}
        className="fill-brand-gold stroke-brand-gold"
        fillOpacity="0.15"
        strokeWidth="4"
        strokeOpacity="0.45"
      />
      {/* Lake Volta */}
      <path
        d={LAKE_VOLTA_PATH}
        className="fill-brand-gold stroke-brand-gold"
        fillOpacity="0.3"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
      {/* Ashanti Region */}
      <path
        d={ASHANTI_REGION_PATH}
        className="fill-brand-gold stroke-brand-gold"
        fillOpacity="0.5"
        strokeWidth="5"
        strokeOpacity="0.9"
      />
      {/* Ejisu Focal Pin */}
      <circle cx="395" cy="870" r="16" className="fill-brand-red" />
      <circle cx="395" cy="870" r="8" className="fill-white" />
      <circle className="pulse-ring stroke-brand-red" cx="395" cy="870" r="28" strokeWidth="3" strokeOpacity="0.6" fill="none" />
      <text x="425" y="878" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="28" className="fill-brand-gold" fontWeight="700">
        Ejisu
      </text>
    </svg>
  );
}

export interface MapHotspot {
  id: string;
  name: string;
  area: string;
  tag: string;
  tagColor: string;
  x: number;
  y: number;
  impact: string;
}

export const MAP_HOTSPOTS: MapHotspot[] = [
  {
    id: 'akyawkrom',
    name: 'Akyawkrom',
    area: 'Ejisu Municipal Assembly',
    tag: 'Foundation HQ & Agriculture',
    tagColor: 'bg-brand-green text-white',
    x: 425,
    y: 905,
    impact: 'Foundation headquarters, farmers’ cooperative empowerment, and youth workshops.',
  },
  {
    id: 'ejisu',
    name: 'Ejisu Town',
    area: 'Mansa Memorial Hospital',
    tag: 'Preventive Healthcare',
    tagColor: 'bg-brand-red text-white',
    x: 395,
    y: 870,
    impact: 'Annual free cervical cancer screenings and preventive health education.',
  },
  {
    id: 'kumasi',
    name: 'Kumasi Metro',
    area: 'Amakom, Asafo & WAEC',
    tag: 'Social Welfare',
    tagColor: 'bg-brand-navy text-white',
    x: 345,
    y: 890,
    impact: 'The "Joy to the Street" relief campaign supports street children and vulnerable families.',
  },
  {
    id: 'forestry',
    name: 'Forestry Commission Centre',
    area: 'Akyawkrom Corridor',
    tag: 'Student Wellness',
    tagColor: 'bg-brand-gold text-brand-navy',
    x: 445,
    y: 845,
    impact: 'Free deworming medication and hygiene training for 84 Natural Resources students.',
  },
];

// Authentic Ghana National Map with Ashanti Region & Lake Volta
export function AshantiMap({
  activeId = 'akyawkrom',
  onSelect,
}: {
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <svg
      viewBox="0 0 964 1304"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm sm:max-w-md mx-auto select-none"
      aria-label="Interactive map of Ghana highlighting Prince Asamany Foundation community programs in the Ashanti Region"
      role="img"
    >
      {/* Full Ghana Landmass */}
      <path
        d={GHANA_OUTLINE_PATH}
        className="fill-brand-gold/10 stroke-brand-navy/35"
        strokeWidth="3.5"
      />

      {/* Lake Volta */}
      <path
        d={LAKE_VOLTA_PATH}
        className="fill-sky-100 stroke-sky-400/50"
        strokeWidth="2"
      />

      {/* Lake Volta Label */}
      <text
        x="660"
        y="780"
        className="fill-sky-600/70 text-[26px] font-body font-semibold italic pointer-events-none select-none"
      >
        Lake Volta
      </text>


      {/* Ashanti Region Highlight (Warm gold tinted beacon) */}
      <path
        d={ASHANTI_REGION_PATH}
        className="fill-brand-gold/30 stroke-brand-navy/40"
        strokeWidth="3"
      />

      {/* Ashanti Region subtle label */}
      <text
        x="370"
        y="760"
        className="fill-brand-navy/55 text-[24px] font-display font-bold italic pointer-events-none select-none"
      >
        Ashanti Region
      </text>

      {/* Regional Connection Lines (Ejisu Corridor) */}
      <path
        d="M 345 890 L 395 870 L 425 905 L 445 845"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="6 6"
        className="text-brand-gold/60"
      />

      {/* Interactive Community Pins */}
      {MAP_HOTSPOTS.map((spot) => {
        const isActive = activeId === spot.id;
        return (
          <g
            key={spot.id}
            onClick={() => onSelect?.(spot.id)}
            className="cursor-pointer group"
            role="button"
            tabIndex={0}
            aria-label={`${spot.name}: ${spot.tag}`}
            aria-pressed={isActive}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect?.(spot.id);
              }
            }}
          >
            <circle cx={spot.x} cy={spot.y} r="32" fill="transparent" />

            {/* Pulsing ring for active or hovered community pin */}
            <circle
              className={
                isActive
                  ? 'pulse-ring stroke-brand-red'
                  : 'transition-opacity duration-300 stroke-brand-gold opacity-0 group-hover:opacity-75'
              }
              cx={spot.x}
              cy={spot.y}
              r={isActive ? '26' : '20'}
              strokeWidth="3"
              fill="none"
            />

            {/* Pin circle */}
            <circle
              cx={spot.x}
              cy={spot.y}
              r={isActive ? '15' : '11'}
              className={`transition-all duration-200 ${
                isActive ? 'fill-brand-red' : 'fill-brand-navy group-hover:fill-brand-red'
              }`}
            />
            <circle
              cx={spot.x}
              cy={spot.y}
              r={isActive ? '7' : '5'}
              className="fill-white transition-all duration-200"
            />

            {/* Community pin label */}
            <text
              x={spot.x}
              y={spot.y + (spot.y > 880 ? 34 : -22)}
              textAnchor="middle"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize={isActive ? '20' : '18'}
              fontWeight={isActive ? '800' : '700'}
              className={`transition-colors duration-200 pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] ${
                isActive
                  ? 'fill-brand-red font-bold'
                  : 'fill-brand-navy group-hover:fill-brand-red'
              }`}
            >
              {spot.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
