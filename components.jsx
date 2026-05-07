/* Components — Photoshop-style controls */

const { useState, useRef, useEffect } = React;

/* ===== Help "?" tooltip ===== */
const Help = ({ text, dir = "center", children }) => {
  const cls = dir === "left" ? "tip-left" : dir === "right" ? "tip-right" : "";
  if (children) {
    return (
      <span style={{position: "relative", display: "inline-flex", alignItems: "center"}}>
        {children}
        <span className={`help-icon ${cls}`} style={{position: "absolute", top: -4, right: -4, width: 11, height: 11, fontSize: 8}}>
          ?
          <span className="tip">{text}</span>
        </span>
      </span>
    );
  }
  return (
    <span className={`help-icon ${cls}`}>
      ?
      <span className="tip">{text}</span>
    </span>
  );
};

/* Standalone help "?" used inline next to labels */
const HelpInline = ({ text, dir = "center" }) => {
  const cls = dir === "left" ? "tip-left" : dir === "right" ? "tip-right" : "";
  return (
    <span className={`help-icon ${cls}`}>
      ?
      <span className="tip">{text}</span>
    </span>
  );
};

window.PLUGIN_HELP = { Help, HelpInline };

/* ===== Section ===== */
const Section = ({ label, help, helpDir = "center", children }) => {
  const { HelpInline } = window.PLUGIN_HELP || {};
  return (
    <div className="section">
      <div className="section-label" style={{display: "flex", alignItems: "center"}}>
        <span>{label}</span>
        {help && HelpInline && <HelpInline text={help} dir={helpDir} />}
      </div>
      {children}
    </div>
  );
};

/* ===== Console grid ===== */
const ConsoleGrid = ({ value, onChange, items }) => {
  const { ConsoleIcon } = window.PLUGIN_ICONS;
  return (
    <div className="console-grid">
      {items.map(c => (
        <div
          key={c.id}
          className={`console-cell ${value===c.id ? "active" : ""}`}
          onClick={() => onChange(c.id)}
          title={c.label}
        >
          <ConsoleIcon kind={c.icon} size={22} />
          <span className="label">{c.label}</span>
        </div>
      ))}
    </div>
  );
};

/* ===== Bit depth ===== */
const BitGrid = ({ value, onChange, items }) => (
  <div className="bit-grid">
    {items.map(b => (
      <div
        key={b.id}
        className={`bit-cell ${value===b.id ? "active" : ""}`}
        onClick={() => onChange(b.id)}
      >
        <span className="bit-num">{b.num}</span>
        <span className="bit-sub">{b.sub}</span>
      </div>
    ))}
  </div>
);

/* ===== Generic Select ===== */
const Select = ({ value, onChange, items, renderThumb, renderItem, renderSelected }) => {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const { IconChevron } = window.PLUGIN_ICONS;

  useEffect(() => {
    const onDoc = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = items.find(i => i.id === value) || items[0];

  return (
    <div className="select-wrap" ref={wrap}>
      <div className={`select ${open ? "open":""}`} onClick={() => setOpen(o=>!o)}>
        {renderThumb && renderThumb(current)}
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {renderSelected ? renderSelected(current) : current.label}
        </span>
        <span className="caret"><IconChevron size={14} /></span>
      </div>
      {open && (
        <div className="dropdown">
          {items.map(i => (
            <div
              key={i.id}
              className={`dropdown-item ${i.id===value ? "selected":""}`}
              onClick={() => { onChange(i.id); setOpen(false); }}
            >
              {renderItem ? renderItem(i) : <>
                {renderThumb && renderThumb(i)}
                <span style={{flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{i.label}</span>
              </>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ===== Algorithm select ===== */
const AlgoSelect = ({ value, onChange, items }) => {
  const { AlgoThumb } = window.PLUGIN_ICONS;
  return (
    <Select
      value={value}
      onChange={onChange}
      items={items}
      renderThumb={(i) => (
        <span className="select-thumb" style={{padding:0, display:"flex", alignItems:"center", justifyContent:"center"}}>
          <AlgoThumb kind={i.pattern} size={22} />
        </span>
      )}
    />
  );
};

/* ===== Palette select ===== */
const PaletteSelect = ({ value, onChange, items }) => (
  <Select
    value={value}
    onChange={onChange}
    items={items}
    renderThumb={(p) => (
      <span className="select-thumb" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"1fr 1fr", overflow:"hidden"}}>
        {[0,1,2,3].map(i => (
          <span key={i} style={{background: p.colors[i % p.colors.length]}} />
        ))}
      </span>
    )}
    renderItem={(p) => (
      <>
        <span className="select-thumb" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"1fr 1fr", overflow:"hidden"}}>
          {[0,1,2,3].map(i => (
            <span key={i} style={{background: p.colors[i % p.colors.length]}} />
          ))}
        </span>
        <span style={{flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{p.label}</span>
        <span className="meta">{p.colors.length}</span>
      </>
    )}
  />
);

/* ===== Swatches ===== */
const Swatches = ({ colors, max = 28 }) => {
  const list = colors.slice(0, max);
  return (
    <div className="swatches" style={{ gridTemplateColumns: `repeat(${Math.min(14, Math.max(7, Math.ceil(list.length/2)))}, 1fr)` }}>
      {list.map((c, i) => (
        <div key={i} className="swatch" style={{ background: c }} title={c} />
      ))}
    </div>
  );
};

/* ===== Checkbox ===== */
const Checkbox = ({ checked, onChange, label }) => {
  const { IconCheck } = window.PLUGIN_ICONS;
  return (
    <div className={`check-row ${checked ? "checked":""}`} onClick={() => onChange(!checked)}>
      <span className="check-box">
        <span className="check-tick"><IconCheck /></span>
      </span>
      <span>{label}</span>
    </div>
  );
};

/* ===== Toggle ===== */
const ToggleRow = ({ on, onChange, label }) => (
  <div className="toggle-row">
    <span>{label}</span>
    <span className={`toggle ${on ? "on":""}`} onClick={() => onChange(!on)} />
  </div>
);

window.PLUGIN_COMPONENTS = {
  Section, ConsoleGrid, BitGrid, AlgoSelect, PaletteSelect, Swatches, Checkbox, ToggleRow,
};
