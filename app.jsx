/* App entry */

const { useState, useEffect } = React;
const { CONSOLES, BITS, ALGOS, PALETTES } = window.PLUGIN_DATA;
const {
  Section, ConsoleGrid, BitGrid, AlgoSelect, PaletteSelect, Swatches, Checkbox, ToggleRow,
} = window.PLUGIN_COMPONENTS;
const {
  BrandLogo, IconZoom, IconGrid, IconReset, IconEye, IconInfo, IconMenu, IconChevron,
} = window.PLUGIN_ICONS;
const { Help, HelpInline } = window.PLUGIN_HELP;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#8B5CF6",
  "density": "comfortable",
  "showBrand": true
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  "#8B5CF6", // viola
  "#22D3EE", // ciano
  "#F472B6", // rosa
  "#34D399", // verde
];

function App() {
  const t = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : { tweaks: TWEAK_DEFAULTS, setTweak: ()=>{} };
  const tweaks = t.tweaks || TWEAK_DEFAULTS;
  const setTweak = t.setTweak || (()=>{});

  const [consoleId, setConsoleId] = useState("snes");
  const [bit, setBit] = useState(8);
  const [algo, setAlgo] = useState("bayer8");
  const [palette, setPalette] = useState("snes15");
  const [forcePalette, setForcePalette] = useState(true);
  const [serpentine, setSerpentine] = useState(true);
  const [keepAlpha, setKeepAlpha] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [previewMode, setPreviewMode] = useState("eye"); // eye | grid

  // Sync accent
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent);
    const c = tweaks.accent;
    // soft rgba (approx) — keep it simple by using hex with alpha
    document.documentElement.style.setProperty("--accent-soft", c + "24");
    document.documentElement.style.setProperty("--accent-glow", c + "59");
  }, [tweaks.accent]);

  // When console changes, set sensible defaults
  useEffect(() => {
    const map = {
      custom:{ bit: 8, palette: "custom",    algo: "bayer8" },
      gb:   { bit: 2, palette: "gb-mono",   algo: "bayer4" },
      gbc:  { bit: 4, palette: "gbc56",     algo: "bayer4" },
      gba:  { bit: 8, palette: "gba",       algo: "bayer8" },
      nes:  { bit: 4, palette: "nes",       algo: "fs" },
      snes: { bit: 8, palette: "snes15",    algo: "bayer8" },
      ds:   { bit: 8, palette: "ds",        algo: "blue-noise" },
      tv:   { bit: 8, palette: "ega",       algo: "halftone" },
    };
    const cfg = map[consoleId];
    if (cfg) { setBit(cfg.bit); setPalette(cfg.palette); setAlgo(cfg.algo); }
  }, [consoleId]);

  const algoData = ALGOS.find(a => a.id === algo);
  const paletteData = PALETTES.find(p => p.id === palette);
  const consoleData = CONSOLES.find(c => c.id === consoleId);

  const colorsCount = bit === 1 ? 2 : bit === 2 ? 4 : bit === 4 ? 16 : 256;

  return (
    <div className="ps-panel">
      {/* chrome */}
      <div className="chrome">
        <span className="chrome-btn" title="Collapse">«</span>
        <span className="chrome-btn x" title="Close">×</span>
      </div>
      <div className="tabs">
        <div className="tab">DitherForge</div>
        <div className="tabs-spacer" />
        <Help text="Apri il menu del plugin: preset, import/export palette, info versione." dir="left">
          <div className="menu-btn" title="Menu"><IconMenu size={14} /></div>
        </Help>
      </div>

      <div className="body">
        {/* Brand */}
        {tweaks.showBrand && (
          <div className="brand">
            <div className="brand-logo">
              <BrandLogo size={38} color={tweaks.accent} />
            </div>
            <div>
              <div className="brand-name">
                Dither
                <span className="accent">Forge</span>
              </div>
              <div className="brand-tag">Dithering professionale<br/>per retro gaming</div>
            </div>
          </div>
        )}

        {/* Console */}
        <Section label="Console / Target" help="Scegli una console di riferimento: bit-depth, palette e algoritmo verranno preimpostati. Usa Custom per configurare tutto a mano." helpDir="right">
          <ConsoleGrid value={consoleId} onChange={setConsoleId} items={CONSOLES} />
        </Section>

        {/* Bit depth */}
        <Section label="Bit depth" help="Numero di bit per pixel della palette finale. Meno bit = meno colori e look più retrò." helpDir="right">
          <BitGrid value={bit} onChange={setBit} items={BITS} />
        </Section>

        {/* Algorithm */}
        <Section label="Algoritmo di dithering" help="Determina come l'immagine viene suddivisa nei colori della palette. Bayer = pattern regolare, Floyd-Steinberg/Atkinson = diffusione errore organica." helpDir="right">
          <AlgoSelect value={algo} onChange={setAlgo} items={ALGOS} />
          <div className="help" style={{whiteSpace:"pre-line"}}>{algoData?.desc}</div>
        </Section>

        {/* Palette */}
        <Section label="Palette" help="Set di colori utilizzato per il rendering. Le palette console-accurate riproducono i limiti hardware reali." helpDir="right">
          <PaletteSelect value={palette} onChange={setPalette} items={PALETTES} />
          <Swatches colors={paletteData?.colors || []} />
          <div style={{display:"flex", alignItems:"center", gap: 4, marginTop: 12}}>
            <Checkbox checked={forcePalette} onChange={setForcePalette} label="Forza colori palette" />
            <HelpInline text="Quando attivo, ogni pixel viene mappato esattamente al colore più vicino della palette. Disattivato = consenti colori intermedi." dir="right" />
          </div>
        </Section>

        {/* Options */}
        <Section label="Opzioni">
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <ToggleRow on={serpentine} onChange={setSerpentine} label="Dithering serpeggiante" />
            <HelpInline text="Scansione a serpentina (sinistra→destra→sinistra). Riduce i pattern verticali tipici della diffusione errore." dir="left" />
          </div>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <ToggleRow on={keepAlpha} onChange={setKeepAlpha} label="Mantieni trasparenza" />
            <HelpInline text="Conserva il canale alfa originale del livello senza applicare dithering ai pixel trasparenti." dir="left" />
          </div>
        </Section>

        {/* Preview */}
        <Section label="Anteprima">
          <div className="preview-row">
            <div className="zoom-pill" onClick={() => {
              const next = { 50: 100, 100: 200, 200: 400, 400: 50 }[zoom] || 100;
              setZoom(next);
            }}>
              <span className="ic"><IconZoom size={14} /></span>
              <span>{zoom}%</span>
              <IconChevron size={12} />
            </div>
            <div
              className={`icon-btn ${previewMode==="grid" ? "active":""}`}
              onClick={() => setPreviewMode(previewMode==="grid" ? "eye" : "grid")}
              title="Vista a griglia"
            >
              <IconGrid size={14} />
            </div>
          </div>

          <div className="info-card">
            <span className="info-ic"><IconInfo size={14} /></span>
            <div>
              <div className="top">
                {consoleData?.label === "Custom" ? "Custom" : consoleData?.label} • {bit}-bit • {colorsCount} colori
              </div>
              <div className="bottom">{algoData?.label} • Dithering {serpentine ? "On" : "Off"}</div>
            </div>
          </div>
        </Section>

        {/* Action */}
        <div className="action-bar">
          <span style={{position:"relative"}}>
            <div className="icon-btn" title="Reset"><IconReset size={14} /></div>
            <span className="help-icon tip-right" style={{position:"absolute", top:-3, right:-3, width:11, height:11, fontSize:8}}>?<span className="tip">Ripristina tutte le impostazioni ai valori predefiniti.</span></span>
          </span>
          <span style={{position:"relative"}}>
            <div
              className={`icon-btn ${previewMode==="eye" ? "active":""}`}
              title="Anteprima live"
              onClick={() => setPreviewMode(previewMode==="eye" ? "grid" : "eye")}
            ><IconEye size={14} /></div>
            <span className="help-icon" style={{position:"absolute", top:-3, right:-3, width:11, height:11, fontSize:8}}>?<span className="tip">Attiva/disattiva l'anteprima live sul livello selezionato.</span></span>
          </span>
          <div className="spacer" />
          <button className="apply">APPLICA</button>
        </div>
      </div>

      <div className="foot">
        <span>DitherForge v1.0.0</span>
        <span>by aCreami</span>
      </div>

      {/* Tweaks panel */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          {window.TweakSection && (
            <>
              <window.TweakSection title="Aspetto">
                <window.TweakColor
                  label="Accent"
                  value={tweaks.accent}
                  options={ACCENT_OPTIONS}
                  onChange={(v) => setTweak("accent", v)}
                />
                <window.TweakToggle
                  label="Mostra brand"
                  value={tweaks.showBrand}
                  onChange={(v) => setTweak("showBrand", v)}
                />
              </window.TweakSection>
            </>
          )}
        </window.TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
