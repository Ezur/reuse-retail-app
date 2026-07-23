import { useState } from 'react';

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { code: 'APP', name: 'Appliances' },
  { code: 'BML', name: 'Building Material and Lumber' },
  { code: 'CAB', name: 'Cabinets and Built-Ins' },
  { code: 'CJM', name: 'Junction Made' },
  { code: 'CLO', name: 'Clothing' },
  { code: 'CNT', name: 'Countertops and Tabletops' },
  { code: 'DOR', name: 'Doors' },
  { code: 'FLR', name: 'Flooring and Accessories' },
  { code: 'GDN', name: 'Garden and Outdoor' },
  { code: 'GLS', name: 'Glass, Mirrors and Glass Block' },
  { code: 'HDW', name: 'Hardware, Tools, Electrical and Misc' },
  { code: 'HVA', name: 'Heating, Ventilation, A/C and Rads' },
  { code: 'HOF', name: 'Home, Office and Commercial Furnishings' },
  { code: 'KIT', name: 'Kitchen Sets and Accessories' },
  { code: 'LIG', name: 'Lighting and Ceiling Fans' },
  { code: 'MAS', name: 'Masonry and Finished Stone' },
  { code: 'MGS', name: 'Magic Gift Shop' },
  { code: 'PLB', name: 'Plumbing and Bath' },
  { code: 'PNT', name: 'Paint' },
  { code: 'SHL', name: 'Specialty Hardware and Lighting' },
  { code: 'TIL', name: 'Tile and Accessories' },
  { code: 'WIN', name: 'Windows, Shutters and Skylights' },
  { code: 'UNK', name: 'Other / Unknown' },
];

const SUBCATEGORIES = {
  APP: ['Cooktop', 'Dishwasher', 'Freezer', 'Microwave', 'Other APP', 'Range', 'Refrigerator', 'Small Appliance', 'Smalls/Not for Erply', 'Trash Compactor', 'Wall Oven', 'Washers and Dryers'],
  BML: ['Adhesives, Powders and Mixes', 'Ceiling Tile', 'Ceiling Tin', 'Column', 'Dimensional Lumber', 'Downspouts and Gutters', 'Glass Block', 'Insulation', 'Mantel', 'Moulding and Trim', 'Other BML', 'Roofing', 'Salvaged Lumber', 'Sheet Goods', 'Siding', 'Smalls/Not for Erply', 'Stairs and Railings', 'Structural Metal', 'Urban Lumber', 'Wallpaper'],
  CAB: ['Built-In Cabinet', 'Cabinet Door', 'Commercial Cabinet', 'Kitchen Cabinet', 'Other CAB', 'Smalls/Not for Erply'],
  CJM: ['Other CJM', 'Planed Lumber'],
  CLO: ['Accessories', 'Mens', 'Other', 'Unisex', 'Womens'],
  CNT: ['Countertop', 'Other CNT', 'Smalls/Not for Erply', 'Tabletop'],
  DOR: ['Bifold Door', 'Exterior Door', 'Farmhouse Door', 'Garage Door', 'Interior Door', 'Other DOR', 'Pet Door', 'Screen Door', 'Smalls/Not for Erply'],
  FLR: ['Carpet', 'Laminate Flooring', 'Other FLR', 'Smalls/Not for Erply', 'Wood Flooring'],
  GDN: ['Fence', 'Fence Gate', 'Gardening Supplies', 'Lawn and Garden Tools', 'Other GDN', 'Outdoor Cooking Grills', 'Outdoor Furniture', 'Planter', 'Smalls/Not for Erply'],
  GLS: ['Finished Glass', 'Other GLS', 'Sheet Glass', 'Smalls/Not for Erply', 'Specialty Glass'],
  HDW: ['Appliance Parts and Accessories', 'Building Material/Parts and Accessories', 'Cabinet Hardware', 'Electrical Parts and Accessories', 'Garden Parts and Accessories', 'Home/Office Parts and Accessories', 'Other HDW', 'Painting Accessories', 'Plumbing/Bath Parts and Accessories', 'Smalls/Not for Erply', 'Tools', 'Window/Shutter Parts and Accessories'],
  HVA: ['Ductwork', 'Fan', 'Fireplace and Stoves', 'Other HVA', 'Portable Heaters', 'Radiator', 'Radiator Cover', 'Smalls/Not for Erply', 'Vent Cover'],
  HOF: ['Art and Frames, Mirror', "Baker's Rack", 'Bed Parts', 'Bench', 'Bookcase or Shelves', 'Cart or Stand', 'Chair', 'Chest (e.g. Cedar)', 'China Cabinet/Hutch/Hoosier', 'Credenza', 'Desk', 'Dining Set', 'Display Cabinet or Fixture', 'Display or Writing Board', 'Dresser or Chest of Drawers', 'File Cabinet', 'Home Decor and Art', 'Housewares', 'Other HOF', 'Podium or Lectern', 'Sewing Machine or Table', 'Smalls/Not for Erply', 'Storage and Organization', 'Table', 'Table, End Table', 'Wall Unit/Entertainment Center'],
  KIT: ['Kitchen Cabinet Set'],
  LIG: ['Ceiling Fan or Blades', 'Ceiling Light', 'Chandelier', 'Flood or Security Light', 'Globes and Shades', 'Industrial or Shop Light', 'Lamp', 'Landscape or Deck Lighting', 'Other LIG', 'Post Light', 'Recessed Lighting', 'Smalls/Not for Erply', 'Specialty or Accent Lighting', 'Track Light', 'Wall Light/Sconce'],
  MAS: ['Block', 'Brick', 'Cut Stone', 'Finished/Polished Stone', 'Formed Concrete', 'Other MAS', 'Salvaged Brick', 'Smalls/Not for Erply', 'Stone'],
  MGS: ['CJ Products', 'Consignment'],
  PLB: ['Bidet', 'Faucet', 'Medicine Cabinet', 'Other PLB', 'Pipe', 'Shower', 'Sink', 'Smalls/Not for Erply', 'Toilet', 'Tub', 'Urinal', 'Vanity'],
  PNT: ['Amazon Paint'],
  SHL: ['Cabinet Hardware', 'Collectibles', 'Door Hardware Trim Plate or Rosette', 'Door Hinge', 'Door Knob', 'Door Knob Set', 'Door Pull (Handle)', 'Lighting Fixtures', 'Other SHL', 'Plumbing Fixtures', 'Sliding/Pocket Door Hardware', 'Smalls/Not for Erply'],
  TIL: ['Ceramic Tile (DO NOT USE for Goodwill tile)', 'Other TIL', 'Smalls/Not for Erply (USE for Goodwill tile)', 'Specialty Tile', 'Tile Accessories', 'Vinyl Tile'],
  WIN: ['Awnings', 'Blinds', 'Curtain Rod', 'Leaded Glass', 'Other WIN', 'Screen', 'Shutters', 'Skylight', 'Smalls/Not for Erply', 'Stained Glass', 'Valence', 'Window'],
  UNK: ['Other UNK'],
};

// Keyed by "CODE::Subcategory name" — only entries that have sub-subcategories
const SUB_SUBCATEGORIES = {
  'APP::Microwave':          ['Built-In', 'Countertop'],
  'APP::Range':              ['Range Exhaust Hood', 'Range, Freestanding', 'Range, Slide-In'],
  'APP::Refrigerator':       ['Bottom Freezer Refrigerator', 'Side by Side Refrigerator', 'Top Freezer Refrigerator'],
  'APP::Washers and Dryers': ['Dryer', 'Washer', 'Washer and Dryer Set'],

  'BML::Dimensional Lumber': ['Dimensional Hardwood', 'Dimensional Softwood', 'Treated Lumber', 'Trial Lumber'],
  'BML::Insulation':         ['Pipe Insulation', 'Rigid Insulation', 'Roll Insulation', 'Wrap Insulation'],
  'BML::Roofing':            ['Roof Flashing', 'Roof Tile', 'Roofing Hardware and Accessories', 'Shingles'],
  'BML::Salvaged Lumber':    ['Flooring', 'Millwork'],
  'BML::Sheet Goods':        ['Drywall', 'Fiberboard', 'Lattice', 'Orientated Strand Board (OSB)', 'Pegboard', 'Plywood', 'Rigid Plastic / Polycarbonate / Acrylic', 'Sheet Metal'],
  'BML::Stairs and Railings':['Spindles and Balusters', 'Stair Handrail Metal', 'Stair Handrail Wood', 'Stair Newel Post', 'Stair Railing Set', 'Stair Stringer', 'Stair Tread', 'Staircase Assembled'],

  'CAB::Kitchen Cabinet':    ['Base Cabinet', 'Corner Cabinet', 'Pantry/Tall Cabinet', 'Wall Cabinet'],

  'CNT::Countertop':         ['Butcher Block Countertop', 'Concrete Countertop', 'Granite Countertop', 'Laminate Countertop', 'Marble Countertop', 'Quartz Countertop', 'Resin Countertop', 'Solid Surface Countertop', 'Stainless Steel Countertop'],

  'DOR::Bifold Door':        ['Bifold Flush/Slab Door', 'Bifold Louvre Door', 'Bifold Panel Door'],
  'DOR::Exterior Door':      ['Cellar', 'Entryway', 'Flush', 'Panel', 'Patio Hinged', 'Patio Sliding', 'Security', 'Storm'],
  'DOR::Interior Door':      ['Accordion', 'Bifold', 'Cafe Swing', 'Flush', 'Interior French Door', 'Interior Louvre Door', 'Interior Panel Door', 'Pocket', 'Sliding', 'Swinging Traffic'],

  'FLR::Carpet':             ['Area Rug', 'Carpet Pad', 'Carpet Roll', 'Carpet Tile/Squares'],
  'FLR::Laminate Flooring':  ['Laminate Plank Flooring', 'Laminate Roll/Sheet Flooring', 'Laminate Strip Flooring', 'Laminate Tile/Squares Flooring'],
  'FLR::Wood Flooring':      ['Engineered', 'Hardwood'],

  'GDN::Fence':              ['Chain Link Fence'],

  'HDW::Cabinet Hardware':   ['Hinges and Slides', 'Knobs and Pulls'],

  'HVA::Ductwork':           ['Flexible Ductwork', 'Rigid Ductwork', 'Stove Pipe'],
  'HVA::Fireplace and Stoves':['Fireplace Accessories', 'Fireplace Andirons', 'Fireplace Front or Screen', 'Fireplace Log Holder'],

  'HOF::Bookcase or Shelves':    ['Bookcase', 'Shelf Accessories', 'Shelves'],
  'HOF::Desk':                   ['Drafting Table'],
  'HOF::Dining Set':             ['Dining Room Buffet, Sideboard or Server Cabinet'],
  'HOF::Display or Writing Board':['Bulletin Board', 'Chalkboard', 'Dry Erase Board'],
  'HOF::File Cabinet':           ['Flat', 'Lateral', 'Vertical'],
  'HOF::Storage and Organization':['Bedroom Nightstand', 'Locker Unit', 'Sorting Cabinet', 'Wardrobe or Armoire Cabinet'],

  'LIG::Ceiling Fan or Blades':   ['Ceiling Fan'],
  'LIG::Industrial or Shop Light':['Fluorescent Industrial/Shop Light'],
  'LIG::Wall Light/Sconce':       ['Indoor Wall Light/Sconce', 'Outdoor Wall Light/Sconce'],

  'MAS::Finished/Polished Stone': ['Granite Slab', 'Marble Slab', 'Slate Slab'],

  'PLB::Pipe':   ['ABS Pipe', 'Black Steel Pipe', 'Copper Pipe', 'Drain Pipe', 'PVC Pipe'],
  'PLB::Shower': ['Shower Base', 'Shower Door', 'Shower Surround'],
  'PLB::Sink':   ['Bar Sink', 'Drop In Bath Sink', 'Farm Sink', 'Kitchen Sink', 'Pedestal Sink', 'Utility Sink', 'Vanity Sink Top', 'Wall Mount Bath Sink'],
  'PLB::Toilet': ['High Flow Toilet (3.0gpf or more)', 'Low Flow Toilet (1.6gpf or less)', 'Premium Toilet', 'Toilet Tank Lid'],
  'PLB::Tub':    ['Clawfoot Tub', 'Drop In Tub', 'Jetted', 'Skirted Tub'],
  'PLB::Vanity': ['Complete Vanity Cabinet w/ Sink', 'Vanity Base'],

  'TIL::Specialty Tile': ['Fireplace Tile', 'Glass Tile', 'Porcelain Tile', 'Stone Tile', 'Subway Tile'],

  'WIN::Window': ['Bay Window', 'Casement Window', 'Double Hung Window', 'Fixed/Picture Window', 'Vintage Wood Frame Window Sash'],
};

// Stock items are objects { name, price } so the form can pre-fill price
const STOCK_ITEMS = {
  Microwave: [
    { name: 'Countertop Microwave, Used, Small (ASIS)', price: '15.99' },
    { name: 'Countertop Microwave, Used, Med/Larger (ASIS)', price: '19.99' },
  ],
  Cooktop: [
    { name: 'Electric Cooktop, 30 in., Good (ASIS)', price: '49.99' },
    { name: 'Gas Cooktop, Stainless, Best (ASIS)', price: '79.99' },
  ],
  Refrigerator: [
    { name: 'Refrigerator, Top Freezer, White (ASIS)', price: '149.99' },
    { name: 'Refrigerator, Side by Side (ASIS)', price: '189.99' },
    { name: 'Refrigerator, French Door (ASIS)', price: '229.99' },
  ],
  'Wall Oven': [
    { name: 'Wall Oven, Single, Electric (ASIS)', price: '99.99' },
    { name: 'Wall Oven, Double, Gas (ASIS)', price: '149.99' },
  ],
};

// ── Icons ─────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchIcon({ color = '#888' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2"/>
      <path d="M16.5 16.5L21 21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CategoryIcon({ code, size = 20 }) {
  const icons = {
    APP: <path d="M3 6h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6zM3 6l2-3h14l2 3" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/>,
    BML: <><path d="M4 6l8-3 8 3v12l-8 3-8-3V6z" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/><path d="M12 3v18" stroke="#424242" strokeWidth="1.6"/></>,
    CAB: <><rect x="3" y="4" width="18" height="16" rx="1" stroke="#424242" strokeWidth="1.6"/><path d="M3 12h18M12 4v8" stroke="#424242" strokeWidth="1.6"/></>,
    CLO: <path d="M3 6l4-3 5 4 5-4 4 3-3 4v11H6V10L3 6z" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/>,
    CNT: <><rect x="2" y="10" width="20" height="4" rx="1" stroke="#424242" strokeWidth="1.6"/><path d="M6 14v4M18 14v4" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/></>,
    DOR: <><rect x="4" y="2" width="16" height="20" rx="1" stroke="#424242" strokeWidth="1.6"/><circle cx="15" cy="12" r="1" fill="#424242"/></>,
    FLR: <><path d="M2 8h20M2 14h20M8 2v20M14 2v20" stroke="#424242" strokeWidth="1.6"/></>,
    GDN: <path d="M12 22V12m0 0C12 6 6 4 3 6c3 1 6 4 6 8m3-8c0-6 6-8 9-6-3 1-6 4-6 8" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/>,
    GLS: <><rect x="5" y="3" width="14" height="18" rx="1" stroke="#424242" strokeWidth="1.6"/><path d="M8 7l3 5-3 5" stroke="#424242" strokeWidth="1.4" strokeLinecap="round"/></>,
    HDW: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3-3a6 6 0 0 1-7.5 8L5 20a2 2 0 0 1-3-3l6.7-8.2a6 6 0 0 1 8-2.5z" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/>,
    HVA: <><path d="M12 9V3M12 21v-6M3 12h6m6 0h6" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="12" r="3" stroke="#424242" strokeWidth="1.6"/></>,
    HOF: <><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" stroke="#424242" strokeWidth="1.6"/><path d="M2 10h20v10H2z" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/><path d="M6 20v2M18 20v2" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/></>,
    CJM: <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" stroke="#085420" strokeWidth="1.6" fill="none" strokeLinejoin="round"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {icons[code] || <circle cx="12" cy="12" r="9" stroke="#424242" strokeWidth="1.6"/>}
    </svg>
  );
}

// ── Modal shell ───────────────────────────────────────────────────────────────

function ModalShell({ onBack, onClose, title, subtitle, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 200,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '160px 24px 24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 16,
          width: '100%', maxWidth: 619,
          maxHeight: '80vh',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px 12px',
          borderBottom: '0.558px solid #f3f4f6',
          flexShrink: 0,
        }}>
          <button onClick={onBack} style={btnReset}>
            <BackIcon />
          </button>
          <div style={{
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center',
            height: 44,
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: '#000', margin: 0 }}>
              {title}
            </p>
            <div style={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: subtitle ? 4 : 0 }}>
              {subtitle}
            </div>
          </div>
          <button onClick={onClose} style={btnReset}>
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Step 1: Category picker ───────────────────────────────────────────────────

function CategoryStep({ onDismiss, onCancel, onSelect }) {
  const [q, setQ] = useState('');
  const filtered = CATEGORIES.filter(c =>
    `${c.name} (${c.code})`.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <ModalShell
      title="Select a Category"
      subtitle={<span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#595959' }}>Select or search for a category to begin</span>}
      onBack={onDismiss}
      onClose={onCancel}
    >
      <div style={{ padding: '12px 20px 0' }}>
        <div style={searchBar}>
          <SearchIcon />
          <input
            autoFocus
            placeholder="Search categories"
            value={q}
            onChange={e => setQ(e.target.value)}
            style={searchInput}
          />
        </div>
      </div>
      <div>
        {filtered.map(cat => (
          <button key={cat.code} onClick={() => onSelect(cat)} style={listRow}>
            <CategoryIcon code={cat.code} size={18} />
            <span style={listText}>{cat.name} ({cat.code})</span>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

// ── Step 2: Subcategory picker ────────────────────────────────────────────────

function SubcategoryStep({ category, onBack, onCancel, onSelect }) {
  const [q, setQ] = useState('');
  const subs = SUBCATEGORIES[category.code] || [];
  const filtered = subs.filter(s =>
    `${category.code} ${s}`.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <ModalShell
      title="Select a Subcategory"
      onBack={onBack}
      onClose={onCancel}
      subtitle={
        <>
          <CategoryIcon code={category.code} size={14} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#424242' }}>
            {category.name} ({category.code})
          </span>
        </>
      }
    >
      <div style={{ padding: '12px 20px 0' }}>
        <div style={searchBar}>
          <SearchIcon />
          <input
            autoFocus
            placeholder={`Search ${category.name.toLowerCase()} types`}
            value={q}
            onChange={e => setQ(e.target.value)}
            style={searchInput}
          />
        </div>
      </div>
      <div>
        {filtered.map(sub => (
          <button key={sub} onClick={() => onSelect(sub)} style={listRow}>
            <span style={listText}>{category.code} {sub}</span>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

// ── Step 2.5: Sub-subcategory picker ─────────────────────────────────────────

function SubSubcategoryStep({ category, subcategory, onBack, onCancel, onSelect, onSkip }) {
  const [q, setQ] = useState('');
  const key = `${category.code}::${subcategory}`;
  const subs = SUB_SUBCATEGORIES[key] || [];
  const filtered = subs.filter(s => s.toLowerCase().includes(q.toLowerCase()));
  return (
    <ModalShell
      title="Select a Type"
      onBack={onBack}
      onClose={onCancel}
      subtitle={
        <>
          <CategoryIcon code={category.code} size={14} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#424242' }}>
            {subcategory} · {category.name} ({category.code})
          </span>
        </>
      }
    >
      <div style={{ padding: '12px 20px 0' }}>
        <div style={searchBar}>
          <SearchIcon />
          <input
            autoFocus
            placeholder={`Search ${subcategory.toLowerCase()} types`}
            value={q}
            onChange={e => setQ(e.target.value)}
            style={searchInput}
          />
        </div>
      </div>
      <div>
        {filtered.map(sub => (
          <button key={sub} onClick={() => onSelect(sub)} style={listRow}>
            <span style={listText}>{sub}</span>
          </button>
        ))}
        <button onClick={onSkip} style={{ ...listRow, color: '#595959' }}>
          <span style={{ ...listText, color: '#595959', fontStyle: 'italic' }}>Skip — use "{subcategory}" only</span>
        </button>
      </div>
    </ModalShell>
  );
}

// ── Step 3: Stock vs. Reuse ───────────────────────────────────────────────────

function StockOrReuseStep({ category, subcategory, onBack, onCancel, onStock, onReuse }) {
  return (
    <ModalShell
      title="How would you like to continue?"
      onBack={onBack}
      onClose={onCancel}
      subtitle={
        <>
          <CategoryIcon code={category.code} size={14} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#424242' }}>
            {subcategory}, {category.name} ({category.code})
          </span>
        </>
      }
    >
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <button onClick={onReuse} style={choiceRow}>
          <div style={choiceIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <p style={choiceTitle}>Create Reuse Item</p>
            <p style={choiceDesc}>This is a special treasure that stands out from our everyday donations.</p>
          </div>
          <ChevronRight />
        </button>

        <div style={{ height: 1, background: '#f3f4f6', margin: '4px 0' }} />

        <button onClick={onStock} style={choiceRow}>
          <div style={choiceIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="1.8"/>
              <path d="M16.5 16.5L21 21" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <p style={choiceTitle}>Search Existing Stock</p>
            <p style={choiceDesc}>View and select from existing stock items to pick from.</p>
          </div>
          <ChevronRight />
        </button>
      </div>
    </ModalShell>
  );
}

// ── Step 4a: Stock item picker ────────────────────────────────────────────────

function StockItemStep({ category, subcategory, onBack, onCancel, onSelect }) {
  const [q, setQ] = useState('');
  const items = STOCK_ITEMS[subcategory] || [];
  const filtered = items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <ModalShell
      title="Select an Existing Stock Item"
      onBack={onBack}
      onClose={onCancel}
    >
      <div style={{ padding: '12px 20px 0' }}>
        <div style={searchBar}>
          <SearchIcon />
          <input
            autoFocus
            placeholder="Search for stock items"
            value={q}
            onChange={e => setQ(e.target.value)}
            style={searchInput}
          />
        </div>
      </div>
      <div>
        {filtered.length === 0 && (
          <p style={{ padding: '32px 20px', textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#595959' }}>
            No stock items found for {subcategory}.
          </p>
        )}
        {filtered.map(item => (
          <button key={item.name} onClick={() => onSelect(item)} style={listRow}>
            <span style={listText}>{item.name}</span>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function NewItemFlow({
  onDismiss,
  onCancel,
  onComplete,         // { type, category, subcategory, subSubcategory?, stockItem? }
  startStep = 'category',
  startCategory = null,
  startSubcategory = null,
}) {
  const [step, setStep] = useState(startStep);
  const [category, setCategory] = useState(startCategory);
  const [subcategory, setSubcategory] = useState(startSubcategory);
  const [subSubcategory, setSubSubcategory] = useState(null);

  const hasSubSubs = (cat, sub) => !!(SUB_SUBCATEGORIES[`${cat?.code}::${sub}`]?.length);

  const handleSubSelect = (sub) => {
    setSubcategory(sub);
    setSubSubcategory(null);
    if (hasSubSubs(category, sub)) {
      setStep('subsubcategory');
    } else {
      setStep('type');
    }
  };

  if (step === 'category') {
    return (
      <CategoryStep
        onDismiss={onDismiss}
        onCancel={onCancel}
        onSelect={cat => { setCategory(cat); setStep('subcategory'); }}
      />
    );
  }

  if (step === 'subcategory') {
    return (
      <SubcategoryStep
        category={category}
        onBack={() => setStep('category')}
        onCancel={onCancel}
        onSelect={handleSubSelect}
      />
    );
  }

  if (step === 'subsubcategory') {
    return (
      <SubSubcategoryStep
        category={category}
        subcategory={subcategory}
        onBack={() => setStep('subcategory')}
        onCancel={onCancel}
        onSelect={sub => { setSubSubcategory(sub); setStep('type'); }}
        onSkip={() => { setSubSubcategory(null); setStep('type'); }}
      />
    );
  }

  if (step === 'type') {
    return (
      <StockOrReuseStep
        category={category}
        subcategory={subSubcategory || subcategory}
        onBack={() => hasSubSubs(category, subcategory) ? setStep('subsubcategory') : setStep('subcategory')}
        onCancel={onCancel}
        onStock={() => setStep('stock')}
        onReuse={() => onComplete({ type: 'reuse', category, subcategory, subSubcategory })}
      />
    );
  }

  if (step === 'stock') {
    return (
      <StockItemStep
        category={category}
        subcategory={subSubcategory || subcategory}
        onBack={() => setStep('type')}
        onCancel={onCancel}
        onSelect={stockItem => onComplete({ type: 'stock', category, subcategory, subSubcategory, stockItem })}
      />
    );
  }

  return null;
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const btnReset = {
  background: 'transparent', border: 'none', cursor: 'pointer',
  padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0,
};

const searchBar = {
  display: 'flex', alignItems: 'center', gap: 8,
  background: '#f0f0f0', border: '0.558px solid #d9d9d9',
  borderRadius: 10, height: 44,
  paddingLeft: 12, paddingRight: 12,
  marginBottom: 8,
};

const searchInput = {
  flex: 1, border: 'none', background: 'transparent', outline: 'none',
  fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#000',
};

const listRow = {
  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
  padding: '14px 20px',
  background: 'transparent', border: 'none',
  borderBottom: '0.558px solid #f3f4f6',
  cursor: 'pointer', textAlign: 'left',
};

const listText = {
  fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#000',
};

const choiceRow = {
  width: '100%', display: 'flex', alignItems: 'center', gap: 16,
  padding: '20px 0',
  background: 'transparent', border: 'none',
  cursor: 'pointer', textAlign: 'left',
};

const choiceIcon = {
  width: 48, height: 48, borderRadius: '50%',
  background: '#1a1a1a',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0,
};

const choiceTitle = {
  fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600,
  color: '#000', margin: '0 0 4px',
};

const choiceDesc = {
  fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#595959', margin: 0,
  lineHeight: 1.4,
};
