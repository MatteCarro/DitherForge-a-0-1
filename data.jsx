/* Data: consoles, bit depths, algorithms, palettes */

const CONSOLES = [
  { id: "custom", label: "Custom", icon: "custom" },
  { id: "gb",     label: "GB",     icon: "handheld-mono" },
  { id: "gbc",    label: "GBC",    icon: "handheld-color" },
  { id: "gba",    label: "GBA",    icon: "handheld-wide" },
  { id: "nes",    label: "NES",    icon: "pad-cross" },
  { id: "snes",   label: "SNES",   icon: "pad-rounded" },
  { id: "ds",     label: "DS",     icon: "dual-screen" },
  { id: "tv",     label: "TV",     icon: "crt" },
];

const BITS = [
  { id: 1, num: "1-bit", sub: "2 colori" },
  { id: 2, num: "2-bit", sub: "4 colori" },
  { id: 4, num: "4-bit", sub: "16 colori" },
  { id: 8, num: "8-bit", sub: "256 colori" },
];

const ALGOS = [
  { id: "bayer8",       label: "Bayer 8x8",          desc: "Classico pattern Bayer 8x8.\nIdeale per gradienti morbidi.",         pattern: "bayer8" },
  { id: "bayer4",       label: "Bayer 4x4",          desc: "Pattern Bayer più stretto, look più\ngrezzo e leggibile.",            pattern: "bayer4" },
  { id: "bayer2",       label: "Bayer 2x2",          desc: "Pattern minimo a 4 celle.\nMassima nitidezza, look retro spinto.",   pattern: "bayer2" },
  { id: "fs",           label: "Floyd–Steinberg",    desc: "Diffusione errore organica.\nIl più usato per stampa retro.",         pattern: "noise" },
  { id: "atkinson",     label: "Atkinson",           desc: "Diffusione leggera, look Mac\nclassico anni '80.",                    pattern: "atkinson" },
  { id: "jjn",          label: "Jarvis–Judice–Ninke",desc: "Diffusione ampia, ottimo dettaglio\nin ombra.",                       pattern: "noise" },
  { id: "stucki",       label: "Stucki",             desc: "Variante più nitida di JJN,\nrumore controllato.",                    pattern: "noise" },
  { id: "burkes",       label: "Burkes",             desc: "Più veloce di Stucki,\nbuon compromesso.",                            pattern: "noise" },
  { id: "sierra",       label: "Sierra Lite",        desc: "Diffusione leggera 2-righe.\nVeloce, look pulito.",                   pattern: "noise" },
  { id: "halftone",     label: "Halftone",           desc: "Pattern a punti tipo stampa.\nGrana fotografica.",                    pattern: "halftone" },
  { id: "blue-noise",   label: "Blue Noise",         desc: "Rumore percettivamente uniforme.\nPiacevole all'occhio.",             pattern: "blue" },
  { id: "ordered-line", label: "Linee ordinate",     desc: "Pattern a linee diagonali.\nLook plotter / serigrafia.",              pattern: "lines" },
];

/* Palettes — colors are paint, not console branding */
const PALETTES = [
  { id: "custom",   label: "Custom (modificabile)",  colors: ["#1a1a1c","#3a3a40","#7a7a82","#cfcfd4","#8B5CF6","#22D3EE","#F472B6","#34D399"] },
  { id: "snes15",   label: "SNES (15-bit)",          colors: [
    "#c83c3c","#e57b2b","#e8a32a","#e8c734","#a89a3a","#5b6b34","#3d6b3a","#2f8a4d","#52b56a","#5fb89a","#3aa1c4","#2e7ec0","#5163b4","#6478c8"
  ] },
  { id: "gb-mono",  label: "Game Boy (4 toni)",      colors: ["#0f380f","#306230","#8bac0f","#9bbc0f"] },
  { id: "gb-pocket",label: "Game Boy Pocket",        colors: ["#1b1b1b","#5a5a5a","#9d9d9d","#dcdcdc"] },
  { id: "gbc56",    label: "Game Boy Color",         colors: [
    "#7e0000","#fe0000","#fe6a6a","#feffaa","#fec56a","#fea96a","#7e4e00","#564300","#005400","#00aa00","#aaff66","#00aaaa","#0088ff","#003277","#7800ff","#ff66ff"
  ] },
  { id: "gba",      label: "GBA (15-bit)",           colors: [
    "#2b2b3a","#3d4a6a","#5e7aa8","#9fb6dc","#e8eaff","#f4d29a","#d99464","#a25640","#6a3a4a","#3a2a3a","#4a6a4a","#7aa860","#c4d480","#7ab6c4","#3a7a8a","#2a4a5a"
  ] },
  { id: "nes",      label: "NES (54 colori)",        colors: [
    "#7c7c7c","#0000fc","#0000bc","#4428bc","#940084","#a80020","#a81000","#881400","#503000","#007800","#006800","#005800","#004058","#000000","#bcbcbc","#0078f8",
    "#0058f8","#6844fc","#d800cc","#e40058","#f83800","#e45c10","#ac7c00","#00b800","#00a800","#00a844","#008888","#f8f8f8","#3cbcfc","#6888fc","#9878f8","#f878f8",
    "#f85898","#f87858","#fca044","#f8b800","#b8f818","#58d854","#58f898","#00e8d8","#787878","#fcfcfc","#a4e4fc","#b8b8f8","#d8b8f8","#f8b8f8","#f8a4c0","#f0d0b0",
    "#fce0a8","#f8d878","#d8f878","#b8f8b8","#b8f8d8","#00fcfc"
  ] },
  { id: "ds",       label: "Nintendo DS (18-bit)",   colors: [
    "#1a1a1a","#3a3a3a","#5a5a5a","#7a7a7a","#9a9a9a","#bababa","#dadada","#ededed",
    "#3a1a5a","#5a3a8a","#7a5aba","#9a7adc","#1a3a7a","#3a5aaa","#5a8acc","#7aaadd",
    "#1a5a3a","#3a8a5a","#5aba7a","#7adc9a","#7a3a3a","#aa5a5a","#cc7a7a","#dd9a9a",
    "#7a5a3a","#aa8a5a","#ccba7a","#ddd49a"
  ] },
  { id: "cga",      label: "CGA (16 colori)",        colors: [
    "#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"
  ] },
  { id: "ega",      label: "EGA (16/64 colori)",     colors: [
    "#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"
  ] },
  { id: "c64",      label: "Commodore 64",           colors: [
    "#000000","#ffffff","#9f4e44","#6abfc6","#a057a3","#5cab5e","#50459b","#c9d487","#a1683c","#6d5412","#cb7e75","#626262","#898989","#9ae29b","#887ecb","#adadad"
  ] },
  { id: "pico8",    label: "PICO-8",                 colors: [
    "#000000","#1d2b53","#7e2553","#008751","#ab5236","#5f574f","#c2c3c7","#fff1e8","#ff004d","#ffa300","#ffec27","#00e436","#29adff","#83769c","#ff77a8","#ffccaa"
  ] },
  { id: "msx",      label: "MSX",                    colors: [
    "#000000","#cacaca","#ffffff","#b75e51","#d96459","#fe877c","#cac15e","#ddce85","#3ca042","#74cb55","#3e87c0","#7e75f0","#cccd4c","#b565b3","#ddc491","#5dac8e"
  ] },
  { id: "zx",       label: "ZX Spectrum",            colors: [
    "#000000","#0022c7","#002bfb","#d62816","#ff331c","#d433c7","#ff40fc","#00c525","#00f92f","#00c7c9","#00fbfe","#cac923","#fffd33","#cacaca","#ffffff"
  ] },
  { id: "atari",    label: "Atari 2600",             colors: [
    "#000000","#444400","#702800","#841800","#880000","#78005c","#480078","#140084","#000088","#00187c","#002c5c","#003c2c","#003c00","#143800","#2c3000","#442800",
    "#404040","#646410","#844414","#983418","#9c2020","#8c2074","#602090","#3020a0","#1838a4","#1c4c98","#1c647c","#1c684c","#206820","#345c1c","#4c5418","#5c4c20"
  ] },
  { id: "endesga", label: "Endesga 32",              colors: [
    "#be4a2f","#d77643","#ead4aa","#e4a672","#b86f50","#733e39","#3e2731","#a22633","#e43b44","#f77622","#feae34","#fee761","#63c74d","#3e8948","#265c42","#193c3e",
    "#124e89","#0099db","#2ce8f5","#ffffff","#c0cbdc","#8b9bb4","#5a6988","#3a4466","#262b44","#181425","#ff0044","#68386c","#b55088","#f6757a","#e8b796","#c28569"
  ] },
  { id: "bw",       label: "Black & White",          colors: ["#000000","#ffffff"] },
];

window.PLUGIN_DATA = { CONSOLES, BITS, ALGOS, PALETTES };
