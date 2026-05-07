/* Icons — all original abstract glyphs, no copyrighted designs */

const Icon = ({ children, size = 18, stroke = 1.5, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

/* Brand mark — abstract dither grid */
const BrandLogo = ({ size = 38, color = "#8B5CF6" }) => (
  <svg width={size} height={size} viewBox="0 0 38 38" fill="none">
    <rect x="3" y="3" width="32" height="32" rx="4" stroke={color} strokeWidth="2" />
    {/* Dither pattern: dots in upper-left to lower-right gradient */}
    <g fill={color}>
      <rect x="8"  y="8"  width="3" height="3" rx="0.5" />
      <rect x="13" y="8"  width="3" height="3" rx="0.5" />
      <rect x="18" y="8"  width="3" height="3" rx="0.5" />
      <rect x="23" y="8"  width="3" height="3" rx="0.5" />

      <rect x="8"  y="13" width="3" height="3" rx="0.5" />
      <rect x="18" y="13" width="3" height="3" rx="0.5" />
      <rect x="23" y="13" width="3" height="3" rx="0.5" />

      <rect x="8"  y="18" width="3" height="3" rx="0.5" />
      <rect x="13" y="18" width="3" height="3" rx="0.5" />
      <rect x="23" y="18" width="3" height="3" rx="0.5" />

      <rect x="13" y="23" width="3" height="3" rx="0.5" />
      <rect x="23" y="23" width="3" height="3" rx="0.5" />

      <rect x="8"  y="28" width="3" height="3" rx="0.5" opacity="0.6" />
      <rect x="18" y="28" width="3" height="3" rx="0.5" opacity="0.6" />
    </g>
  </svg>
);

/* === Console icons (abstract, original) === */
/* Custom: sliders */
const IconCustom = ({ size = 22 }) => (
  <Icon size={size}>
    <line x1="4" y1="7"  x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
    <circle cx="9"  cy="7"  r="2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="7"  cy="17" r="2" fill="currentColor" stroke="none" />
  </Icon>
);

/* GB — vertical handheld with mono screen */
const IconHandheldMono = ({ size = 22 }) => (
  <Icon size={size} stroke={1.4}>
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <rect x="8" y="6" width="8" height="6" rx="0.5" />
    <circle cx="9.5" cy="16" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="16" r="0.9" fill="currentColor" stroke="none" />
    <line x1="8.5" y1="19" x2="11" y2="19" strokeWidth="1" />
    <line x1="13" y1="19" x2="15.5" y2="19" strokeWidth="1" />
  </Icon>
);

/* GBC — vertical handheld with color screen indicator */
const IconHandheldColor = ({ size = 22 }) => (
  <Icon size={size} stroke={1.4}>
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <rect x="8" y="6" width="8" height="6" rx="0.5" fill="currentColor" opacity="0.25" stroke="currentColor" />
    <circle cx="9" cy="15.5" r="1.2" fill="currentColor" stroke="none" opacity="0.85" />
    <rect x="13" y="14.5" width="2.5" height="2" rx="0.4" fill="currentColor" stroke="none" opacity="0.85" />
    <line x1="8.5" y1="19" x2="15.5" y2="19" strokeWidth="1" />
  </Icon>
);

/* GBA — wide handheld with side buttons */
const IconHandheldWide = ({ size = 22 }) => (
  <Icon size={size} stroke={1.4}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <rect x="8" y="8.5" width="8" height="7" rx="0.5" fill="currentColor" opacity="0.25" stroke="currentColor" />
    <line x1="4" y1="10.5" x2="4" y2="13.5" strokeWidth="1.5" />
    <line x1="2.5" y1="12" x2="5.5" y2="12" strokeWidth="1.5" />
    <circle cx="19" cy="11" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="20" cy="13.5" r="0.8" fill="currentColor" stroke="none" />
  </Icon>
);

/* NES — landscape pad with cross + 2 buttons */
const IconPadCross = ({ size = 22 }) => (
  <Icon size={size} stroke={1.4}>
    <rect x="2" y="7" width="20" height="10" rx="1.5" />
    {/* d-pad */}
    <line x1="6" y1="10" x2="6" y2="14" />
    <line x1="4" y1="12" x2="8" y2="12" />
    {/* select / start */}
    <line x1="11" y1="13.5" x2="13" y2="13.5" strokeWidth="1.4" />
    {/* buttons */}
    <circle cx="16.5" cy="12" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="0.9" fill="currentColor" stroke="none" />
  </Icon>
);

/* SNES — rounded pad with shoulder hint + dpad + 4-button cluster */
const IconPadRounded = ({ size = 22 }) => (
  <Icon size={size} stroke={1.4}>
    <path d="M3 13c0-3 2-5 5-5h8c3 0 5 2 5 5 0 2-1 4-3 4h-2.5l-2-1.6h-3l-2 1.6H6c-2 0-3-2-3-4z" />
    <line x1="6" y1="11" x2="6" y2="13.5" />
    <line x1="4.7" y1="12.25" x2="7.3" y2="12.25" />
    <circle cx="17" cy="11" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="19" cy="13" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="17" cy="15" r="0.8" fill="currentColor" stroke="none" />
  </Icon>
);

/* DS — dual screen clamshell */
const IconDualScreen = ({ size = 22 }) => (
  <Icon size={size} stroke={1.4}>
    <rect x="4" y="3" width="16" height="8" rx="1" />
    <rect x="6" y="4.5" width="12" height="5" rx="0.5" fill="currentColor" opacity="0.25" stroke="currentColor" />
    <rect x="4" y="13" width="16" height="8" rx="1" />
    <rect x="6" y="14.5" width="12" height="5" rx="0.5" fill="currentColor" opacity="0.18" stroke="currentColor" />
    <line x1="3" y1="12" x2="21" y2="12" strokeWidth="0.8" opacity="0.5" />
  </Icon>
);

/* TV / CRT */
const IconCRT = ({ size = 22 }) => (
  <Icon size={size} stroke={1.4}>
    <rect x="3" y="5" width="18" height="13" rx="1.5" />
    <rect x="5.5" y="7" width="13" height="9" rx="0.5" fill="currentColor" opacity="0.18" stroke="currentColor" />
    <line x1="8" y1="20" x2="16" y2="20" />
    <circle cx="20" cy="9" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="20" cy="11" r="0.6" fill="currentColor" stroke="none" />
  </Icon>
);

const ConsoleIcon = ({ kind, size = 22 }) => {
  switch (kind) {
    case "custom":          return <IconCustom size={size} />;
    case "handheld-mono":   return <IconHandheldMono size={size} />;
    case "handheld-color":  return <IconHandheldColor size={size} />;
    case "handheld-wide":   return <IconHandheldWide size={size} />;
    case "pad-cross":       return <IconPadCross size={size} />;
    case "pad-rounded":     return <IconPadRounded size={size} />;
    case "dual-screen":     return <IconDualScreen size={size} />;
    case "crt":             return <IconCRT size={size} />;
    default:                return <IconCustom size={size} />;
  }
};

/* === Misc icons === */
const IconChevron = ({ size = 14 }) => (
  <Icon size={size} stroke={1.8}><polyline points="6 9 12 15 18 9" /></Icon>
);
const IconSearch = ({ size = 14 }) => (
  <Icon size={size}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16" y2="16" /></Icon>
);
const IconZoom = ({ size = 14 }) => (
  <Icon size={size}><circle cx="11" cy="11" r="7" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></Icon>
);
const IconGrid = ({ size = 14 }) => (
  <Icon size={size}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></Icon>
);
const IconReset = ({ size = 14 }) => (
  <Icon size={size}><polyline points="3 3 3 9 9 9" /><path d="M3 9a9 9 0 1 0 3-6.7" /></Icon>
);
const IconEye = ({ size = 14 }) => (
  <Icon size={size}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Icon>
);
const IconInfo = ({ size = 14 }) => (
  <Icon size={size}><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><circle cx="12" cy="8" r="0.8" fill="currentColor" stroke="none" /></Icon>
);
const IconMenu = ({ size = 14 }) => (
  <Icon size={size}><line x1="4" y1="7"  x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></Icon>
);
const IconCheck = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 6.5 5 9 10 3.5" />
  </svg>
);

/* Tiny algorithm thumbnails (22x22) */
const AlgoThumb = ({ kind, color = "#8B5CF6", size = 22 }) => {
  const cells = [];
  const N = 8;
  let mat;
  if (kind === "bayer8") {
    mat = [
      [0,32,8,40,2,34,10,42],
      [48,16,56,24,50,18,58,26],
      [12,44,4,36,14,46,6,38],
      [60,28,52,20,62,30,54,22],
      [3,35,11,43,1,33,9,41],
      [51,19,59,27,49,17,57,25],
      [15,47,7,39,13,45,5,37],
      [63,31,55,23,61,29,53,21],
    ];
  } else if (kind === "bayer4") {
    mat = [
      [0,8,2,10,0,8,2,10],
      [12,4,14,6,12,4,14,6],
      [3,11,1,9,3,11,1,9],
      [15,7,13,5,15,7,13,5],
      [0,8,2,10,0,8,2,10],
      [12,4,14,6,12,4,14,6],
      [3,11,1,9,3,11,1,9],
      [15,7,13,5,15,7,13,5],
    ];
  } else if (kind === "bayer2") {
    mat = Array.from({length:8},(_,y)=>Array.from({length:8},(_,x)=>[[0,2],[3,1]][y%2][x%2]));
  } else if (kind === "halftone") {
    mat = Array.from({length:8},(_,y)=>Array.from({length:8},(_,x)=>{
      const dx=x-3.5,dy=y-3.5;return 8-Math.min(7, Math.round(Math.sqrt(dx*dx+dy*dy)));
    }));
  } else if (kind === "lines") {
    mat = Array.from({length:8},(_,y)=>Array.from({length:8},(_,x)=>((x+y)%3===0)?7:0));
  } else if (kind === "atkinson") {
    const seeds=[[1,1],[3,2],[5,1],[2,4],[6,4],[4,5],[1,6],[6,6]];
    mat=Array.from({length:8},()=>Array(8).fill(0));
    seeds.forEach(([x,y])=>{ if(mat[y]&&mat[y][x]!==undefined) mat[y][x]=7; });
  } else if (kind === "blue") {
    const r=(s)=>{ s=Math.sin(s*9301+49297)*233280; return s-Math.floor(s); };
    mat=Array.from({length:8},(_,y)=>Array.from({length:8},(_,x)=>r(x*8+y)>0.55?6:0));
  } else { /* noise */
    const r=(s)=>{ s=Math.sin(s*12.9898+78.233)*43758.5453; return s-Math.floor(s); };
    mat=Array.from({length:8},(_,y)=>Array.from({length:8},(_,x)=>r(x*7+y*3)>0.5?7:0));
  }
  const cell = size/N;
  for (let y=0;y<N;y++) for (let x=0;x<N;x++){
    const v = mat[y][x];
    const max = kind==="bayer8" ? 63 : 15;
    const norm = Math.min(1, v/max);
    if (norm > 0.05) {
      cells.push(<rect key={`${x}-${y}`} x={x*cell} y={y*cell} width={cell} height={cell} fill={color} opacity={Math.max(0.15, norm)} />);
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{borderRadius: 3, background: "#0e0e10"}}>
      {cells}
    </svg>
  );
};

window.PLUGIN_ICONS = {
  BrandLogo, ConsoleIcon, AlgoThumb,
  IconChevron, IconSearch, IconZoom, IconGrid, IconReset, IconEye, IconInfo, IconMenu, IconCheck,
};
