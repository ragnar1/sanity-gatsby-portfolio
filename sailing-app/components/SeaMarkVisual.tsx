import React from 'react';
import Svg, {
  Rect,
  Polygon,
  Circle,
  Line,
  Path,
  G,
  Defs,
  ClipPath,
} from 'react-native-svg';
import { SeaMarkType } from '../data/seamarks';

interface SeaMarkVisualProps {
  type: SeaMarkType;
  size?: number;
}

const C = {
  red: '#CC0000',
  green: '#006633',
  yellow: '#E8B400',
  black: '#1A1A1A',
  white: '#F5F5F5',
  water: '#1A6BA3',
  waterLight: '#4A9CC8',
  pole: '#444444',
};

// Viewbox is 100 × 200 for all marks
const VW = 100;
const VH = 200;

// Shared waterline and mast geometry
const WATER_Y = 155;
const MAST_X = 50;
const MAST_TOP = 58;  // Where topmark sits

function WaterBase() {
  return (
    <>
      <Rect x={0} y={WATER_Y} width={VW} height={VH - WATER_Y} fill={C.water} />
      {/* Simple wave highlight */}
      <Path
        d={`M0,${WATER_Y} Q12.5,${WATER_Y - 6} 25,${WATER_Y} Q37.5,${WATER_Y + 6} 50,${WATER_Y} Q62.5,${WATER_Y - 6} 75,${WATER_Y} Q87.5,${WATER_Y + 6} 100,${WATER_Y}`}
        fill="none"
        stroke={C.waterLight}
        strokeWidth={2}
      />
    </>
  );
}

// Two upward cones (North) or two downward cones (South)
function DoubleCones({ pointUp }: { pointUp: boolean }) {
  if (pointUp) {
    // ▲ ▲ stacked
    return (
      <G>
        <Polygon points="50,20 36,40 64,40" fill={C.black} />
        <Polygon points="50,42 36,62 64,62" fill={C.black} />
      </G>
    );
  }
  // ▼ ▼ stacked
  return (
    <G>
      <Polygon points="36,22 64,22 50,42" fill={C.black} />
      <Polygon points="36,44 64,44 50,64" fill={C.black} />
    </G>
  );
}

// Diamond = base-to-base (East)
function DiamondCones() {
  return (
    <G>
      <Polygon points="36,20 64,20 50,40" fill={C.black} />
      <Polygon points="50,42 36,62 64,62" fill={C.black} />
    </G>
  );
}

// Hourglass = tip-to-tip (West)
function HourglassCones() {
  return (
    <G>
      <Polygon points="50,20 36,40 64,40" fill={C.black} />
      <Polygon points="36,42 64,42 50,62" fill={C.black} />
    </G>
  );
}

function TwoBalls() {
  return (
    <G>
      <Circle cx={50} cy={22} r={12} fill={C.black} />
      <Circle cx={50} cy={46} r={12} fill={C.black} />
    </G>
  );
}

function OneBall({ color }: { color: string }) {
  return <Circle cx={50} cy={26} r={14} fill={color} />;
}

function XTopmark() {
  return (
    <G>
      <Line x1={38} y1={16} x2={62} y2={40} stroke={C.yellow} strokeWidth={6} strokeLinecap="round" />
      <Line x1={62} y1={16} x2={38} y2={40} stroke={C.yellow} strokeWidth={6} strokeLinecap="round" />
    </G>
  );
}

// Pillar body with 2 or 3 horizontal bands
function PillarBody({ bands, bodyTop, bodyBottom }: { bands: string[]; bodyTop: number; bodyBottom: number }) {
  const bodyHeight = bodyBottom - bodyTop;
  const bandHeight = bodyHeight / bands.length;
  return (
    <>
      {bands.map((color, i) => (
        <Rect
          key={i}
          x={35}
          y={bodyTop + i * bandHeight}
          width={30}
          height={bandHeight + 0.5} // slight overlap to avoid hairlines
          fill={color}
        />
      ))}
      {/* Outline */}
      <Rect x={35} y={bodyTop} width={30} height={bodyHeight} fill="none" stroke={C.black} strokeWidth={1} />
    </>
  );
}

// Vertical stripe body (safe water)
function StripedPillarBody({ bodyTop, bodyBottom }: { bodyTop: number; bodyBottom: number }) {
  const bodyHeight = bodyBottom - bodyTop;
  const stripes = [C.red, C.white, C.red, C.white, C.red];
  const sw = 30 / stripes.length;
  return (
    <G>
      <Defs>
        <ClipPath id="pillarClip">
          <Rect x={35} y={bodyTop} width={30} height={bodyHeight} />
        </ClipPath>
      </Defs>
      {stripes.map((color, i) => (
        <Rect
          key={i}
          x={35 + i * sw}
          y={bodyTop}
          width={sw + 0.5}
          height={bodyHeight}
          fill={color}
          clipPath="url(#pillarClip)"
        />
      ))}
      <Rect x={35} y={bodyTop} width={30} height={bodyHeight} fill="none" stroke={C.black} strokeWidth={1} />
    </G>
  );
}

export function SeaMarkVisual({ type, size = 120 }: SeaMarkVisualProps) {
  const viewBox = `0 0 ${VW} ${VH}`;
  const BODY_TOP = 68;
  const BODY_BOTTOM = WATER_Y;

  switch (type) {
    case 'port': {
      // Can buoy – flat top red cylinder
      return (
        <Svg width={size} height={size * 1.6} viewBox={viewBox} accessibilityLabel="Rød sylinderformet babordmerke">
          <WaterBase />
          {/* Topmark cylinder */}
          <Rect x={38} y={50} width={24} height={18} rx={2} fill={C.red} />
          {/* Body */}
          <Rect x={28} y={68} width={44} height={BODY_BOTTOM - 68} rx={4} fill={C.red} />
          <Rect x={28} y={68} width={44} height={BODY_BOTTOM - 68} rx={4} fill="none" stroke="#880000" strokeWidth={1.5} />
          {/* Chain */}
          <Line x1={MAST_X} y1={WATER_Y} x2={MAST_X} y2={VH} stroke={C.pole} strokeWidth={2.5} />
        </Svg>
      );
    }

    case 'starboard': {
      // Conical buoy – green cone
      return (
        <Svg width={size} height={size * 1.6} viewBox={viewBox} accessibilityLabel="Grønn kjegleformet styrbordmerke">
          <WaterBase />
          {/* Topmark cone */}
          <Polygon points="50,48 40,66 60,66" fill={C.green} />
          {/* Body cone */}
          <Polygon points={`50,${BODY_TOP} 25,${BODY_BOTTOM} 75,${BODY_BOTTOM}`} fill={C.green} />
          <Polygon points={`50,${BODY_TOP} 25,${BODY_BOTTOM} 75,${BODY_BOTTOM}`} fill="none" stroke="#004422" strokeWidth={1.5} />
          {/* Chain */}
          <Line x1={MAST_X} y1={WATER_Y} x2={MAST_X} y2={VH} stroke={C.pole} strokeWidth={2.5} />
        </Svg>
      );
    }

    case 'north': {
      return (
        <Svg width={size} height={size * 1.6} viewBox={viewBox} accessibilityLabel="Nord kardinalmerke, svart over gul, kjegler peker opp">
          <WaterBase />
          <DoubleCones pointUp={true} />
          <Line x1={MAST_X} y1={62} x2={MAST_X} y2={WATER_Y} stroke={C.pole} strokeWidth={3} />
          <PillarBody bands={[C.black, C.yellow]} bodyTop={BODY_TOP} bodyBottom={BODY_BOTTOM} />
          <Line x1={MAST_X} y1={WATER_Y} x2={MAST_X} y2={VH} stroke={C.pole} strokeWidth={2.5} />
        </Svg>
      );
    }

    case 'south': {
      return (
        <Svg width={size} height={size * 1.6} viewBox={viewBox} accessibilityLabel="Sør kardinalmerke, gul over svart, kjegler peker ned">
          <WaterBase />
          <DoubleCones pointUp={false} />
          <Line x1={MAST_X} y1={64} x2={MAST_X} y2={WATER_Y} stroke={C.pole} strokeWidth={3} />
          <PillarBody bands={[C.yellow, C.black]} bodyTop={BODY_TOP} bodyBottom={BODY_BOTTOM} />
          <Line x1={MAST_X} y1={WATER_Y} x2={MAST_X} y2={VH} stroke={C.pole} strokeWidth={2.5} />
        </Svg>
      );
    }

    case 'east': {
      return (
        <Svg width={size} height={size * 1.6} viewBox={viewBox} accessibilityLabel="Øst kardinalmerke, svart gul svart, kjegler base mot base">
          <WaterBase />
          <DiamondCones />
          <Line x1={MAST_X} y1={62} x2={MAST_X} y2={WATER_Y} stroke={C.pole} strokeWidth={3} />
          <PillarBody bands={[C.black, C.yellow, C.black]} bodyTop={BODY_TOP} bodyBottom={BODY_BOTTOM} />
          <Line x1={MAST_X} y1={WATER_Y} x2={MAST_X} y2={VH} stroke={C.pole} strokeWidth={2.5} />
        </Svg>
      );
    }

    case 'west': {
      return (
        <Svg width={size} height={size * 1.6} viewBox={viewBox} accessibilityLabel="Vest kardinalmerke, gul svart gul, kjegler topp mot topp">
          <WaterBase />
          <HourglassCones />
          <Line x1={MAST_X} y1={62} x2={MAST_X} y2={WATER_Y} stroke={C.pole} strokeWidth={3} />
          <PillarBody bands={[C.yellow, C.black, C.yellow]} bodyTop={BODY_TOP} bodyBottom={BODY_BOTTOM} />
          <Line x1={MAST_X} y1={WATER_Y} x2={MAST_X} y2={VH} stroke={C.pole} strokeWidth={2.5} />
        </Svg>
      );
    }

    case 'danger': {
      return (
        <Svg width={size} height={size * 1.6} viewBox={viewBox} accessibilityLabel="Isolert faremerke, svart rød svart, to kuler på topp">
          <WaterBase />
          <TwoBalls />
          <Line x1={MAST_X} y1={58} x2={MAST_X} y2={WATER_Y} stroke={C.pole} strokeWidth={3} />
          <PillarBody bands={[C.black, C.red, C.black]} bodyTop={BODY_TOP} bodyBottom={BODY_BOTTOM} />
          <Line x1={MAST_X} y1={WATER_Y} x2={MAST_X} y2={VH} stroke={C.pole} strokeWidth={2.5} />
        </Svg>
      );
    }

    case 'safewater': {
      return (
        <Svg width={size} height={size * 1.6} viewBox={viewBox} accessibilityLabel="Sikkert vann merke, røde og hvite vertikale striper, rød kule">
          <WaterBase />
          <OneBall color={C.red} />
          <Line x1={MAST_X} y1={40} x2={MAST_X} y2={WATER_Y} stroke={C.pole} strokeWidth={3} />
          <StripedPillarBody bodyTop={BODY_TOP} bodyBottom={BODY_BOTTOM} />
          <Line x1={MAST_X} y1={WATER_Y} x2={MAST_X} y2={VH} stroke={C.pole} strokeWidth={2.5} />
        </Svg>
      );
    }

    case 'special': {
      return (
        <Svg width={size} height={size * 1.6} viewBox={viewBox} accessibilityLabel="Spesialmerke, gul med X på topp">
          <WaterBase />
          <XTopmark />
          <Line x1={MAST_X} y1={40} x2={MAST_X} y2={WATER_Y} stroke={C.pole} strokeWidth={3} />
          <PillarBody bands={[C.yellow]} bodyTop={BODY_TOP} bodyBottom={BODY_BOTTOM} />
          <Line x1={MAST_X} y1={WATER_Y} x2={MAST_X} y2={VH} stroke={C.pole} strokeWidth={2.5} />
        </Svg>
      );
    }

    default:
      return null;
  }
}
