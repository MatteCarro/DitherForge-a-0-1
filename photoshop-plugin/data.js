const DITHERFORGE_DATA = {
  consoles: [
    { id: "custom", label: "Custom", defaults: { bit: 8, palette: "custom", algo: "bayer8", scale: 1 } },
    { id: "gb", label: "GB", defaults: { bit: 2, palette: "gb-mono", algo: "bayer4", scale: 4 } },
    { id: "gbc", label: "GBC", defaults: { bit: 4, palette: "gbc56", algo: "bayer4", scale: 4 } },
    { id: "gba", label: "GBA", defaults: { bit: 8, palette: "gba", algo: "bayer8", scale: 4 } },
    { id: "nes", label: "NES", defaults: { bit: 4, palette: "nes", algo: "fs", scale: 4 } },
    { id: "snes", label: "SNES", defaults: { bit: 8, palette: "snes15", algo: "bayer8", scale: 2 } },
    { id: "ds", label: "DS", defaults: { bit: 8, palette: "ds", algo: "blue-noise", scale: 2 } },
    { id: "tv", label: "TV", defaults: { bit: 8, palette: "ega", algo: "halftone", scale: 1 } }
  ],
  bits: [
    { id: 1, num: "1-bit", sub: "2 colori" },
    { id: 2, num: "2-bit", sub: "4 colori" },
    { id: 4, num: "4-bit", sub: "16 colori" },
    { id: 8, num: "8-bit", sub: "256 colori" }
  ],
  scales: [
    { id: 1, num: "1×", sub: "Originale" },
    { id: 2, num: "2×", sub: "Pixel doppi" },
    { id: 4, num: "4×", sub: "Pixel grossi" },
    { id: 8, num: "8×", sub: "Lo-fi" }
  ],
  algos: [
    { id: "bayer8", label: "Bayer 8x8", desc: "Classico pattern Bayer 8x8. Ideale per gradienti morbidi.", pattern: "bayer8" },
    { id: "bayer4", label: "Bayer 4x4", desc: "Pattern Bayer più stretto, look più grezzo e leggibile.", pattern: "bayer4" },
    { id: "bayer2", label: "Bayer 2x2", desc: "Pattern minimo a 4 celle. Massima nitidezza, look retro spinto.", pattern: "bayer2" },
    { id: "fs", label: "Floyd–Steinberg", desc: "Diffusione errore organica. Il più usato per stampa retro.", pattern: "noise" },
    { id: "atkinson", label: "Atkinson", desc: "Diffusione leggera, look Mac classico anni '80.", pattern: "atkinson" },
    { id: "jjn", label: "Jarvis–Judice–Ninke", desc: "Diffusione ampia, ottimo dettaglio in ombra.", pattern: "noise" },
    { id: "stucki", label: "Stucki", desc: "Variante più nitida di JJN, rumore controllato.", pattern: "noise" },
    { id: "burkes", label: "Burkes", desc: "Più veloce di Stucki, buon compromesso.", pattern: "noise" },
    { id: "sierra", label: "Sierra Lite", desc: "Diffusione leggera 2-righe. Veloce, look pulito.", pattern: "noise" },
    { id: "halftone", label: "Halftone", desc: "Pattern a punti tipo stampa. Grana fotografica.", pattern: "halftone" },
    { id: "blue-noise", label: "Blue Noise", desc: "Rumore percettivamente uniforme. Piacevole all'occhio.", pattern: "blue" },
    { id: "ordered-line", label: "Linee ordinate", desc: "Pattern a linee diagonali. Look plotter / serigrafia.", pattern: "lines" }
  ],
  palettes: [
    { id: "custom", label: "Custom", colors: ["#1a1a1c", "#3a3a40", "#7a7a82", "#cfcfd4", "#8B5CF6", "#22D3EE", "#F472B6", "#34D399"] },
    { id: "snes15", label: "SNES (15-bit)", colors: ["#c83c3c", "#e57b2b", "#e8a32a", "#e8c734", "#a89a3a", "#5b6b34", "#3d6b3a", "#2f8a4d", "#52b56a", "#5fb89a", "#3aa1c4", "#2e7ec0", "#5163b4", "#6478c8"] },
    { id: "gb-mono", label: "Game Boy (4 toni)", colors: ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"] },
    { id: "gbc56", label: "Game Boy Color", colors: ["#7e0000", "#fe0000", "#fe6a6a", "#feffaa", "#fec56a", "#fea96a", "#005400", "#00aa00", "#aaff66", "#00aaaa", "#0088ff", "#003277", "#7800ff", "#ff66ff"] },
    { id: "gba", label: "GBA (15-bit)", colors: ["#2b2b3a", "#3d4a6a", "#5e7aa8", "#9fb6dc", "#e8eaff", "#f4d29a", "#d99464", "#a25640", "#4a6a4a", "#7aa860", "#c4d480", "#7ab6c4", "#3a7a8a", "#2a4a5a"] },
    { id: "nes", label: "NES (54 colori)", colors: ["#7c7c7c", "#0000fc", "#0000bc", "#4428bc", "#940084", "#a80020", "#a81000", "#881400", "#503000", "#007800", "#006800", "#005800", "#004058", "#bcbcbc", "#0078f8", "#f8f8f8"] },
    { id: "ds", label: "Nintendo DS (18-bit)", colors: ["#1a1a1a", "#3a3a3a", "#5a5a5a", "#7a7a7a", "#9a9a9a", "#bababa", "#dadada", "#ededed", "#3a1a5a", "#5a3a8a", "#7a5aba", "#9a7adc", "#1a3a7a", "#3a5aaa", "#5a8acc", "#7aaadd"] },
    { id: "ega", label: "EGA (16 colori)", colors: ["#000000", "#0000aa", "#00aa00", "#00aaaa", "#aa0000", "#aa00aa", "#aa5500", "#aaaaaa", "#555555", "#5555ff", "#55ff55", "#55ffff", "#ff5555", "#ff55ff", "#ffff55", "#ffffff"] },
    { id: "bw", label: "Black & White", colors: ["#000000", "#ffffff"] }
  ]
};
