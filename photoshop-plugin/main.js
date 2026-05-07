const photoshop = require("photoshop");
const { app, core, action: psAction } = photoshop;

const ACCENT = "#8B5CF6";
const FG_DIM = "#9a9aa0";

const state = {
  consoleId: "snes",
  bit: 8,
  scale: 2,
  algo: "bayer8",
  palette: "snes15",
  forcePalette: true,
  serpentine: true,
  keepAlpha: false
};

const $ = (sel) => document.querySelector(sel);

function findById(list, id) {
  return list.find((i) => i.id === id) || list[0];
}

/* ── Console SVG icons — fill/stroke esplicito su ogni elemento per UXP ── */
function consoleIcon(id, color) {
  const C = color || FG_DIM;
  const icons = {
    custom: `<svg viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>
      <circle cx="9" cy="7" r="2" fill="${C}" stroke="none"/>
      <circle cx="15" cy="12" r="2" fill="${C}" stroke="none"/>
      <circle cx="7" cy="17" r="2" fill="${C}" stroke="none"/>
    </svg>`,
    gb: `<svg viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="3" width="12" height="18" rx="2" fill="none"/>
      <rect x="8" y="6" width="8" height="6" rx="0.5" fill="none"/>
      <circle cx="9.5" cy="16" r="0.9" fill="${C}" stroke="none"/>
      <circle cx="14.5" cy="16" r="0.9" fill="${C}" stroke="none"/>
      <line x1="8.5" y1="19" x2="11" y2="19"/>
      <line x1="13" y1="19" x2="15.5" y2="19"/>
    </svg>`,
    gbc: `<svg viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="3" width="12" height="18" rx="2" fill="none"/>
      <rect x="8" y="6" width="8" height="6" rx="0.5" fill="${C}" fill-opacity="0.25"/>
      <circle cx="9" cy="15.5" r="1.2" fill="${C}" stroke="none" opacity="0.85"/>
      <rect x="13" y="14.5" width="2.5" height="2" rx="0.4" fill="${C}" stroke="none" opacity="0.85"/>
      <line x1="8.5" y1="19" x2="15.5" y2="19"/>
    </svg>`,
    gba: `<svg viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" fill="none"/>
      <rect x="8" y="8.5" width="8" height="7" rx="0.5" fill="${C}" fill-opacity="0.25"/>
      <line x1="4" y1="10.5" x2="4" y2="13.5" stroke-width="1.5"/>
      <line x1="2.5" y1="12" x2="5.5" y2="12" stroke-width="1.5"/>
      <circle cx="19" cy="11" r="0.8" fill="${C}" stroke="none"/>
      <circle cx="20" cy="13.5" r="0.8" fill="${C}" stroke="none"/>
    </svg>`,
    nes: `<svg viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="7" width="20" height="10" rx="1.5" fill="none"/>
      <line x1="6" y1="10" x2="6" y2="14"/>
      <line x1="4" y1="12" x2="8" y2="12"/>
      <line x1="11" y1="13.5" x2="13" y2="13.5" stroke-width="1.4"/>
      <circle cx="16.5" cy="12" r="0.9" fill="${C}" stroke="none"/>
      <circle cx="19" cy="12" r="0.9" fill="${C}" stroke="none"/>
    </svg>`,
    snes: `<svg viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 13c0-3 2-5 5-5h8c3 0 5 2 5 5 0 2-1 4-3 4h-2.5l-2-1.6h-3l-2 1.6H6c-2 0-3-2-3-4z" fill="none"/>
      <line x1="6" y1="11" x2="6" y2="13.5"/>
      <line x1="4.7" y1="12.25" x2="7.3" y2="12.25"/>
      <circle cx="17" cy="11" r="0.8" fill="${C}" stroke="none"/>
      <circle cx="19" cy="13" r="0.8" fill="${C}" stroke="none"/>
      <circle cx="15" cy="13" r="0.8" fill="${C}" stroke="none"/>
      <circle cx="17" cy="15" r="0.8" fill="${C}" stroke="none"/>
    </svg>`,
    ds: `<svg viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="3" width="16" height="8" rx="1" fill="none"/>
      <rect x="6" y="4.5" width="12" height="5" rx="0.5" fill="${C}" fill-opacity="0.25"/>
      <rect x="4" y="13" width="16" height="8" rx="1" fill="none"/>
      <rect x="6" y="14.5" width="12" height="5" rx="0.5" fill="${C}" fill-opacity="0.18"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke-width="0.8" opacity="0.5"/>
    </svg>`,
    tv: `<svg viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="5" width="18" height="13" rx="1.5" fill="none"/>
      <rect x="5.5" y="7" width="13" height="9" rx="0.5" fill="${C}" fill-opacity="0.18"/>
      <line x1="8" y1="20" x2="16" y2="20"/>
      <circle cx="20" cy="9" r="0.6" fill="${C}" stroke="none"/>
      <circle cx="20" cy="11" r="0.6" fill="${C}" stroke="none"/>
    </svg>`
  };
  return icons[id] || icons.custom;
}

/* ── Algorithm thumbnail SVGs ── */
function algoThumbSvg(pattern) {
  const A = ACCENT;
  const thumbs = {
    bayer8: `<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="22" rx="3" fill="#111114"/>
      <rect x="3" y="3" width="2" height="2" fill="${A}" opacity="0.9"/>
      <rect x="7" y="3" width="2" height="2" fill="${A}" opacity="0.4"/>
      <rect x="11" y="3" width="2" height="2" fill="${A}" opacity="0.7"/>
      <rect x="15" y="3" width="2" height="2" fill="${A}" opacity="0.2"/>
      <rect x="3" y="7" width="2" height="2" fill="${A}" opacity="0.6"/>
      <rect x="7" y="7" width="2" height="2" fill="${A}" opacity="1"/>
      <rect x="11" y="7" width="2" height="2" fill="${A}" opacity="0.3"/>
      <rect x="15" y="7" width="2" height="2" fill="${A}" opacity="0.8"/>
      <rect x="3" y="11" width="2" height="2" fill="${A}" opacity="0.5"/>
      <rect x="7" y="11" width="2" height="2" fill="${A}" opacity="0.2"/>
      <rect x="11" y="11" width="2" height="2" fill="${A}" opacity="0.85"/>
      <rect x="15" y="11" width="2" height="2" fill="${A}" opacity="0.45"/>
      <rect x="3" y="15" width="2" height="2" fill="${A}" opacity="0.15"/>
      <rect x="7" y="15" width="2" height="2" fill="${A}" opacity="0.7"/>
      <rect x="11" y="15" width="2" height="2" fill="${A}" opacity="0.35"/>
      <rect x="15" y="15" width="2" height="2" fill="${A}" opacity="0.95"/>
    </svg>`,
    bayer4: `<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="22" rx="3" fill="#111114"/>
      <rect x="3" y="3" width="3" height="3" fill="${A}" opacity="0.9"/>
      <rect x="9" y="3" width="3" height="3" fill="${A}" opacity="0.4"/>
      <rect x="3" y="9" width="3" height="3" fill="${A}" opacity="0.3"/>
      <rect x="9" y="9" width="3" height="3" fill="${A}" opacity="0.8"/>
      <rect x="15" y="3" width="3" height="3" fill="${A}" opacity="0.6"/>
      <rect x="15" y="9" width="3" height="3" fill="${A}" opacity="0.2"/>
      <rect x="3" y="15" width="3" height="3" fill="${A}" opacity="0.5"/>
      <rect x="9" y="15" width="3" height="3" fill="${A}" opacity="0.7"/>
      <rect x="15" y="15" width="3" height="3" fill="${A}" opacity="1"/>
    </svg>`,
    bayer2: `<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="22" rx="3" fill="#111114"/>
      <rect x="3" y="3" width="5" height="5" rx="1" fill="${A}" opacity="0.9"/>
      <rect x="10" y="3" width="5" height="5" rx="1" fill="${A}" opacity="0.3"/>
      <rect x="3" y="10" width="5" height="5" rx="1" fill="${A}" opacity="0.2"/>
      <rect x="10" y="10" width="5" height="5" rx="1" fill="${A}" opacity="0.7"/>
    </svg>`,
    noise: `<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="22" rx="3" fill="#111114"/>
      <circle cx="5" cy="5" r="1.2" fill="${A}" opacity="0.7"/>
      <circle cx="12" cy="4" r="1" fill="${A}" opacity="0.5"/>
      <circle cx="17" cy="6" r="1.3" fill="${A}" opacity="0.9"/>
      <circle cx="8" cy="9" r="1.1" fill="${A}" opacity="0.6"/>
      <circle cx="15" cy="11" r="1" fill="${A}" opacity="0.4"/>
      <circle cx="4" cy="13" r="1.2" fill="${A}" opacity="0.8"/>
      <circle cx="10" cy="14" r="1" fill="${A}" opacity="0.55"/>
      <circle cx="18" cy="15" r="1.1" fill="${A}" opacity="0.7"/>
      <circle cx="6" cy="18" r="1" fill="${A}" opacity="0.45"/>
      <circle cx="13" cy="18" r="1.3" fill="${A}" opacity="0.85"/>
    </svg>`,
    atkinson: `<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="22" rx="3" fill="#111114"/>
      <circle cx="5" cy="5" r="1" fill="${A}" opacity="0.6"/>
      <circle cx="11" cy="5" r="1.5" fill="${A}" opacity="0.8"/>
      <circle cx="17" cy="5" r="1" fill="${A}" opacity="0.4"/>
      <circle cx="8" cy="11" r="1.3" fill="${A}" opacity="0.7"/>
      <circle cx="14" cy="11" r="1" fill="${A}" opacity="0.5"/>
      <circle cx="5" cy="17" r="1.5" fill="${A}" opacity="0.9"/>
      <circle cx="11" cy="17" r="1" fill="${A}" opacity="0.35"/>
      <circle cx="17" cy="17" r="1.3" fill="${A}" opacity="0.65"/>
    </svg>`,
    halftone: `<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="22" rx="3" fill="#111114"/>
      <circle cx="6" cy="6" r="2.2" fill="${A}" opacity="0.9"/>
      <circle cx="14" cy="6" r="1.4" fill="${A}" opacity="0.5"/>
      <circle cx="6" cy="14" r="1.6" fill="${A}" opacity="0.6"/>
      <circle cx="14" cy="14" r="2.4" fill="${A}" opacity="0.85"/>
      <circle cx="10" cy="10" r="1" fill="${A}" opacity="0.35"/>
      <circle cx="18" cy="10" r="1.2" fill="${A}" opacity="0.45"/>
    </svg>`,
    blue: `<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="22" rx="3" fill="#111114"/>
      <circle cx="4" cy="4" r="0.9" fill="${A}" opacity="0.5"/>
      <circle cx="10" cy="3" r="0.8" fill="${A}" opacity="0.7"/>
      <circle cx="16" cy="5" r="0.9" fill="${A}" opacity="0.4"/>
      <circle cx="7" cy="8" r="0.8" fill="${A}" opacity="0.6"/>
      <circle cx="13" cy="7" r="0.9" fill="${A}" opacity="0.55"/>
      <circle cx="19" cy="9" r="0.8" fill="${A}" opacity="0.45"/>
      <circle cx="3" cy="12" r="0.9" fill="${A}" opacity="0.65"/>
      <circle cx="9" cy="11" r="0.8" fill="${A}" opacity="0.5"/>
      <circle cx="15" cy="13" r="0.9" fill="${A}" opacity="0.7"/>
      <circle cx="5" cy="16" r="0.8" fill="${A}" opacity="0.55"/>
      <circle cx="11" cy="15" r="0.9" fill="${A}" opacity="0.4"/>
      <circle cx="17" cy="17" r="0.8" fill="${A}" opacity="0.6"/>
      <circle cx="8" cy="19" r="0.9" fill="${A}" opacity="0.5"/>
      <circle cx="14" cy="19" r="0.8" fill="${A}" opacity="0.7"/>
    </svg>`,
    lines: `<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="22" rx="3" fill="#111114"/>
      <line x1="3" y1="6" x2="19" y2="6" stroke="${A}" stroke-width="1.2" opacity="0.8"/>
      <line x1="3" y1="10" x2="19" y2="10" stroke="${A}" stroke-width="1.2" opacity="0.5"/>
      <line x1="3" y1="14" x2="19" y2="14" stroke="${A}" stroke-width="1.2" opacity="0.9"/>
      <line x1="3" y1="18" x2="19" y2="18" stroke="${A}" stroke-width="1.2" opacity="0.35"/>
    </svg>`
  };
  return thumbs[pattern] || thumbs.noise;
}

function updateAlgoThumb() {
  const alg = findById(DITHERFORGE_DATA.algos, state.algo);
  const el = $("#algoThumb");
  if (el && alg) el.innerHTML = algoThumbSvg(alg.pattern);
}

/* ── Fallback per scales se data.js è vecchio ── */
const SCALES_FALLBACK = [
  { id: 1, num: "1×", sub: "Originale" },
  { id: 2, num: "2×", sub: "Pixel doppi" },
  { id: 4, num: "4×", sub: "Pixel grossi" },
  { id: 8, num: "8×", sub: "Lo-fi" }
];
function getScales() {
  if (typeof DITHERFORGE_DATA !== "undefined" && Array.isArray(DITHERFORGE_DATA.scales)) {
    return DITHERFORGE_DATA.scales;
  }
  return SCALES_FALLBACK;
}

/* ── Auto-injection della sezione "Scala pixel" se index.html è vecchio ── */
function ensureScaleSection() {
  if (document.getElementById("scaleGrid")) return; // Già presente nell'HTML
  const bitGrid = document.getElementById("bitGrid");
  if (!bitGrid) return;
  const bitSection = bitGrid.closest(".section");
  if (!bitSection) return;
  const scaleSection = document.createElement("div");
  scaleSection.className = "section";
  scaleSection.innerHTML =
    '<div class="section-label">Scala pixel' +
    '<span class="help-icon tip-right">?<span class="tip">Quanto grossi sono i pixel finali. L\'immagine viene rimpicciolita prima del dithering e poi riportata alle dimensioni originali con pixel quadrati. 1× mantiene la risoluzione originale.</span></span>' +
    '</div>' +
    '<div id="scaleGrid" class="bit-grid"></div>' +
    '<div class="scale-row"><span>Zoom pixel</span><div class="scale-control">' +
    '<input id="scaleSlider" type="range" min="1" max="8" step="1" value="' + state.scale + '" />' +
    '<span id="scaleValue">' + state.scale + '×</span>' +
    '</div></div>';
  bitSection.parentNode.insertBefore(scaleSection, bitSection.nextSibling);
}

/* ── Try/catch helper per evitare cascade failure ── */
function safe(fn, label) {
  try { fn(); } catch (e) { console.error("[DitherForge] " + label + ":", e); }
}

/* ── Render functions ── */
function renderConsoleGrid() {
  const grid = $("#consoleGrid");
  grid.innerHTML = "";
  DITHERFORGE_DATA.consoles.forEach((c) => {
    const el = document.createElement("div");
    const isActive = state.consoleId === c.id;
    el.className = `console-cell ${isActive ? "active" : ""}`;
    // Genero l'icona col colore corretto direttamente, niente currentColor
    el.innerHTML = `${consoleIcon(c.id, isActive ? ACCENT : FG_DIM)}<span class="label">${c.label}</span>`;
    el.addEventListener("click", () => {
      state.consoleId = c.id;
      Object.assign(state, c.defaults);
      syncAll();
    });
    grid.appendChild(el);
  });
}

function renderBitGrid() {
  const grid = $("#bitGrid");
  grid.innerHTML = "";
  DITHERFORGE_DATA.bits.forEach((b) => {
    const el = document.createElement("div");
    el.className = `bit-cell ${state.bit === b.id ? "active" : ""}`;
    el.innerHTML = `<span class="bit-num">${b.num}</span><span class="bit-sub">${b.sub}</span>`;
    el.addEventListener("click", () => { state.bit = b.id; syncAll(); });
    grid.appendChild(el);
  });
}

function renderScaleGrid() {
  const grid = $("#scaleGrid");
  if (!grid) return;
  grid.innerHTML = "";
  getScales().forEach((s) => {
    const el = document.createElement("div");
    el.className = `bit-cell ${state.scale === s.id ? "active" : ""}`;
    el.innerHTML = `<span class="bit-num">${s.num}</span><span class="bit-sub">${s.sub}</span>`;
    el.addEventListener("click", () => { state.scale = s.id; syncAll(); });
    grid.appendChild(el);
  });
}

function syncScaleControl() {
  const slider = $("#scaleSlider");
  const value = $("#scaleValue");
  if (slider) slider.value = state.scale;
  if (value) value.textContent = `${state.scale}×`;
}

function fillSelect(select, items) {
  select.innerHTML = "";
  items.forEach((i) => {
    const o = document.createElement("option");
    o.value = i.id; o.textContent = i.label;
    select.appendChild(o);
  });
}

function renderSwatches() {
  const palette = findById(DITHERFORGE_DATA.palettes, state.palette);
  const sw = $("#swatches");
  const pt = $("#paletteThumb");
  sw.innerHTML = "";
  pt.innerHTML = "";
  palette.colors.slice(0, 4).forEach((c) => {
    const s = document.createElement("span");
    s.style.background = c;
    pt.appendChild(s);
  });
  palette.colors.slice(0, 28).forEach((c) => {
    const s = document.createElement("div");
    s.className = "swatch"; s.style.background = c; s.title = c;
    sw.appendChild(s);
  });
}

function updateSummary() {
  const con = findById(DITHERFORGE_DATA.consoles, state.consoleId);
  const alg = findById(DITHERFORGE_DATA.algos, state.algo);
  const n = state.bit === 1 ? 2 : state.bit === 2 ? 4 : state.bit === 4 ? 16 : 256;
  const scaleLabel = state.scale > 1 ? ` • ${state.scale}× pixel` : "";
  $("#summaryTop").textContent = `${con.label} • ${state.bit}-bit • ${n} colori${scaleLabel}`;
  $("#summaryBottom").textContent = `${alg.label} • Dithering ${state.serpentine ? "On" : "Off"}`;
  $("#algoDescription").textContent = alg.desc;
}

function syncToggles() {
  const serp = $("#toggleSerpentine");
  const alpha = $("#toggleKeepAlpha");
  serp.className = `toggle ${state.serpentine ? "on" : ""}`;
  alpha.className = `toggle ${state.keepAlpha ? "on" : ""}`;
  const chk = $("#checkForcePalette");
  chk.className = `check-row ${state.forcePalette ? "checked" : ""}`;
}

function syncAll() {
  safe(ensureScaleSection, "ensureScaleSection");
  safe(renderConsoleGrid, "renderConsoleGrid");
  safe(renderBitGrid, "renderBitGrid");
  safe(renderScaleGrid, "renderScaleGrid");
  safe(syncScaleControl, "syncScaleControl");
  safe(() => { const a = $("#algoSelect");    if (a) a.value = state.algo; }, "algoSelect.value");
  safe(() => { const p = $("#paletteSelect"); if (p) p.value = state.palette; }, "paletteSelect.value");
  safe(syncToggles, "syncToggles");
  safe(renderSwatches, "renderSwatches");
  safe(updateAlgoThumb, "updateAlgoThumb");
  safe(updateSummary, "updateSummary");
}

function getSettings() {
  const palette = findById(DITHERFORGE_DATA.palettes, state.palette);
  return {
    algorithm: state.algo,
    bitDepth: state.bit,
    paletteColors: palette.colors,
    forcePalette: state.forcePalette,
    serpentine: state.serpentine,
    keepAlpha: state.keepAlpha
  };
}

function normalizeBounds(bounds) {
  const left = Math.round(Number(bounds.left ?? bounds._left));
  const top = Math.round(Number(bounds.top ?? bounds._top));
  const right = Math.round(Number(bounds.right ?? bounds._right));
  const bottom = Math.round(Number(bounds.bottom ?? bounds._bottom));
  if (![left, top, right, bottom].every(Number.isFinite)) {
    throw new Error("Non riesco a leggere i bordi del livello selezionato.");
  }
  return { left, top, right, bottom };
}

/* ── Resampling RGBA — nearest neighbor in entrambi i versi ── */
function downscaleNearestRGBA(srcData, srcW, srcH, dstW, dstH) {
  const out = new Uint8Array(dstW * dstH * 4);
  // Per ogni pixel di destinazione, prendiamo il pixel del centro del blocco sorgente.
  for (let y = 0; y < dstH; y += 1) {
    const sy = Math.min(srcH - 1, Math.floor((y + 0.5) * srcH / dstH));
    for (let x = 0; x < dstW; x += 1) {
      const sx = Math.min(srcW - 1, Math.floor((x + 0.5) * srcW / dstW));
      const si = (sy * srcW + sx) * 4;
      const di = (y * dstW + x) * 4;
      out[di]     = srcData[si];
      out[di + 1] = srcData[si + 1];
      out[di + 2] = srcData[si + 2];
      out[di + 3] = srcData[si + 3];
    }
  }
  return out;
}

function upscaleNearestRGBA(srcData, srcW, srcH, dstW, dstH) {
  const out = new Uint8Array(dstW * dstH * 4);
  for (let y = 0; y < dstH; y += 1) {
    const sy = Math.min(srcH - 1, Math.floor(y * srcH / dstH));
    for (let x = 0; x < dstW; x += 1) {
      const sx = Math.min(srcW - 1, Math.floor(x * srcW / dstW));
      const si = (sy * srcW + sx) * 4;
      const di = (y * dstW + x) * 4;
      out[di]     = srcData[si];
      out[di + 1] = srcData[si + 1];
      out[di + 2] = srcData[si + 2];
      out[di + 3] = srcData[si + 3];
    }
  }
  return out;
}

/* ── Photoshop interaction via batchPlay ── */
async function applyDither() {
  await core.executeAsModal(async (executionContext) => {
    const doc = app.activeDocument;
    if (!doc) throw new Error("Apri un documento prima di applicare DitherForge.");
    const layer = doc.activeLayers[0];
    if (!layer) throw new Error("Seleziona un livello prima di applicare DitherForge.");

    const batchPlay = psAction.batchPlay;
    const layerName = layer.name || "Layer";

    // Se il livello sorgente è il Background layer lo convertiamo prima in livello
    // normale: senza questo passaggio il duplicato eredita lo stato "no alpha" e
    // imaging.getPixels restituisce 3 componenti per pixel invece di 4.
    const isBackground = !!(layer.isBackgroundLayer || layer.background);
    const ops = [];
    if (isBackground) {
      ops.push({
        _obj: "set",
        _target: [{ _ref: "layer", _property: "background" }],
        to: { _obj: "layer", opacity: { _unit: "percentUnit", _value: 100 }, mode: { _enum: "blendMode", _value: "normal" } },
        _options: { dialogOptions: "dontDisplay" }
      });
    }
    ops.push(
      { _obj: "duplicate", _target: [{ _ref: "layer", _enum: "ordinal", _value: "targetEnum" }], name: layerName + " — DitherForge", _options: { dialogOptions: "dontDisplay" } },
      { _obj: "rasterizeLayer", _target: [{ _ref: "layer", _enum: "ordinal", _value: "targetEnum" }], _options: { dialogOptions: "dontDisplay" } }
    );
    await batchPlay(ops, { synchronousExecution: true });

    const target = doc.activeLayers[0];
    const b = normalizeBounds(target.bounds);
    const width = Math.max(1, b.right - b.left);
    const height = Math.max(1, b.bottom - b.top);
    const totalPixels = width * height;

    if (totalPixels > 50000000) {
      throw new Error(`Immagine troppo grande (${width}×${height}). Riduci temporaneamente sotto 50 megapixel.`);
    }

    const pixelData = await photoshop.imaging.getPixels({
      layerID: target.id,
      sourceBounds: b,
      targetSize: { width, height },
      componentSize: 8,
      colorProfile: "sRGB IEC61966-2.1",
      applyAlpha: false
    });

    const imageData = pixelData.imageData || pixelData;
    let srcData = imageData.data;
    if (!srcData && typeof imageData.getData === "function") {
      srcData = await imageData.getData();
    }
    if (!srcData) {
      throw new Error("Photoshop non ha restituito dati pixel leggibili per il livello selezionato.");
    }

    // Normalizziamo a RGBA (4 componenti) come spiegato nel fix precedente.
    const declaredComponents = imageData.components;
    const inferredComponents = Math.round(srcData.length / (width * height));
    const components = declaredComponents || inferredComponents;

    let workingData = srcData;
    if (components === 3) {
      workingData = new Uint8Array(width * height * 4);
      for (let p = 0; p < width * height; p += 1) {
        workingData[p * 4]     = srcData[p * 3];
        workingData[p * 4 + 1] = srcData[p * 3 + 1];
        workingData[p * 4 + 2] = srcData[p * 3 + 2];
        workingData[p * 4 + 3] = 255;
      }
    } else if (components !== 4) {
      throw new Error(`Formato pixel non supportato: ${components} componenti per pixel.`);
    }

    // Applichiamo il scaling: downscale → dither → upscale (in nearest-neighbor).
    const scale = Math.max(1, state.scale | 0);
    const ditherWidth  = scale > 1 ? Math.max(1, Math.floor(width / scale))  : width;
    const ditherHeight = scale > 1 ? Math.max(1, Math.floor(height / scale)) : height;

    let ditherInputData = workingData;
    if (scale > 1) {
      ditherInputData = downscaleNearestRGBA(workingData, width, height, ditherWidth, ditherHeight);
    }

    const normalizedImageData = {
      data: ditherInputData,
      width: ditherWidth,
      height: ditherHeight,
      components: 4,
      componentSize: 8,
      hasAlpha: true,
      colorProfile: "sRGB IEC61966-2.1",
      colorSpace: "RGB"
    };

    const result = ditherImageData(normalizedImageData, getSettings());

    let finalData = result.data instanceof Uint8Array ? result.data : new Uint8Array(result.data);
    if (scale > 1) {
      // Riportiamo alle dimensioni originali con nearest-neighbor (pixel quadrati netti).
      finalData = upscaleNearestRGBA(finalData, ditherWidth, ditherHeight, width, height);
    }

    const output = await photoshop.imaging.createImageDataFromBuffer(finalData, {
      width,
      height,
      components: 4,
      componentSize: 8,
      colorSpace: "RGB",
      colorProfile: "sRGB IEC61966-2.1"
    });

    await photoshop.imaging.putPixels({
      layerID: target.id,
      imageData: output,
      targetBounds: b,
      replace: true
    });

    target.name = `${layerName} — DitherForge Result`;
  }, { commandName: "DitherForge — Applica" });
}

/* ── Events ── */
function bindEvents() {
  fillSelect($("#algoSelect"), DITHERFORGE_DATA.algos);
  fillSelect($("#paletteSelect"), DITHERFORGE_DATA.palettes);

  $("#algoSelect").addEventListener("change", (e) => { state.algo = e.target.value; updateAlgoThumb(); updateSummary(); });
  $("#paletteSelect").addEventListener("change", (e) => { state.palette = e.target.value; renderSwatches(); });
  $("#scaleSlider").addEventListener("input", (e) => {
    state.scale = Math.max(1, Math.min(8, Number(e.target.value) || 1));
    syncAll();
  });

  $("#checkForcePalette").addEventListener("click", () => {
    state.forcePalette = !state.forcePalette;
    syncToggles();
  });
  $("#toggleSerpentine").addEventListener("click", () => {
    state.serpentine = !state.serpentine;
    syncToggles(); updateSummary();
  });
  $("#toggleKeepAlpha").addEventListener("click", () => {
    state.keepAlpha = !state.keepAlpha;
    syncToggles();
  });

  $("#resetButton").addEventListener("click", () => {
    Object.assign(state, {
      consoleId: "snes", bit: 8, scale: 2, algo: "bayer8", palette: "snes15",
      forcePalette: true, serpentine: true, keepAlpha: false
    });
    syncAll();
  });

  $("#applyButton").addEventListener("click", async () => {
    const btn = $("#applyButton");
    const label = btn.textContent;
    btn.textContent = "ELABORO...";
    btn.disabled = true;
    try { await applyDither(); }
    catch (err) { app.showAlert(String(err.message || err)); }
    finally {
      btn.textContent = label;
      btn.disabled = false;
    }
  });

  $("#previewButton").addEventListener("click", async () => {
    const btn = $("#applyButton");
    const label = btn.textContent;
    btn.textContent = "ELABORO...";
    btn.disabled = true;
    try { await applyDither(); }
    catch (err) { app.showAlert(String(err.message || err)); }
    finally {
      btn.textContent = label;
      btn.disabled = false;
    }
  });
}

bindEvents();
syncAll();
