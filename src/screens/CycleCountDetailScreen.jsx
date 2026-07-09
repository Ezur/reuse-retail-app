import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';
import UserMenu from '../components/UserMenu';
import BackButton from '../components/BackButton';

const CATEGORIES = [
  'Appliances (APP)', 'Building Material and Lumber (BML)', 'Cabinets and Built-Ins (CAB)',
  'Clothing (CLO)', 'Countertops and Tabletops (CNT)', 'Doors (DOR)',
  'Flooring and Accessories (FLR)', 'Garden and Outdoor (GDN)', 'Glass, Mirrors, and Glass Block (GLS)',
  'Hardware, Tools, Electrical and Misc (HDW)', 'Heating, Ventilation, A/C and Rads (HVA)',
  'Home, Office and Commercial Furnishings (HOF)', 'Junction Made (CJM)',
  'Lighting (LGT)', 'Lumber and Sheet Goods (LBR)', 'Paint (PNT)',
  'Plumbing (PLB)', 'Roofing (ROF)', 'Tile (TIL)', 'Windows (WIN)',
];

const LOCATIONS = [
  'Loading Dock', 'Aisle A', 'Aisle B', 'Aisle C', 'Aisle D',
  'Outdoor Lot', 'Worm World', 'Back Storage', 'Display Floor',
];

function formatTime(secs) {
  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="#000" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke="#000" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function CycleCountIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="5" rx="1" stroke="#fff" strokeWidth="1.8"/>
      <rect x="14" y="3" width="7" height="5" rx="1" stroke="#fff" strokeWidth="1.8"/>
      <rect x="3" y="11" width="7" height="5" rx="1" stroke="#fff" strokeWidth="1.8"/>
      <rect x="14" y="11" width="7" height="5" rx="1" stroke="#fff" strokeWidth="1.8"/>
      <path d="M3 19h18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export default function CycleCountDetailScreen() {
  const navigate = useNavigate();
  const { staffId } = useParams();
  const location = useLocation();
  const staffName = location.state?.name ?? staffId;
  const { maxWidth, headerHeight, px } = useLayout();

  const [locationName, setLocationName] = useState('Worm World');
  const [editingLocation, setEditingLocation] = useState(false);
  const [locationInput, setLocationInput] = useState('Worm World');
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const [category, setCategory] = useState('');
  const [barcode, setBarcode] = useState('');
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [itemLocation, setItemLocation] = useState('');
  const [description, setDescription] = useState('');
  const [count, setCount] = useState(0);

  const [countedItems, setCountedItems] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleSave = () => {
    if (!itemName) return;
    setCountedItems(prev => [...prev, { name: itemName, category, count, price }]);
    setCount(0);
    setItemName('');
    setPrice('');
    setDescription('');
    setBarcode('');
    setCategory('');
    setItemLocation('');
  };

  const handleSaveAndAdd = () => {
    handleSave();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'Helvetica Neue', sans-serif", display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ height: headerHeight, background: '#D65737', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingLeft: 26, paddingRight: 26, paddingBottom: 16, flexShrink: 0, position: 'sticky', top: 0, zIndex: 10 }}>
        <BackButton onClick={() => navigate('/cycle-count')} />
        <img src="/src/assets/construction_junction_logo_white.svg" alt="Construction Junction" style={{ height: 52, width: 'auto', objectFit: 'contain' }} />
        <div style={{ width: 120, height: 56, flexShrink: 0, position: 'relative' }}>
          <UserMenu initials="JS" onSignOut={() => navigate('/login')} />
        </div>
      </header>

      {/* Status bar */}
      <div style={{ background: '#fff', borderBottom: '0.558px solid #e5e7eb', padding: '10px 26px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#595959" strokeWidth="1.8"/><circle cx="12" cy="9" r="2.5" stroke="#595959" strokeWidth="1.8"/></svg>
          {editingLocation ? (
            <form onSubmit={e => { e.preventDefault(); setLocationName(locationInput); setEditingLocation(false); }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                autoFocus
                value={locationInput}
                onChange={e => setLocationInput(e.target.value)}
                style={{ border: 'none', borderBottom: '1px solid #D65737', outline: 'none', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#000', width: 100, background: 'transparent' }}
              />
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D65737', fontSize: 12, fontWeight: 600 }}>Done</button>
            </form>
          ) : (
            <>
              <span style={{ fontSize: 13, color: '#000' }}>Location: <strong>{locationName}</strong></span>
              <button onClick={() => { setLocationInput(locationName); setEditingLocation(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#595959" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#595959" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="5" rx="1" stroke="#595959" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="5" rx="1" stroke="#595959" strokeWidth="1.8"/><rect x="3" y="11" width="7" height="5" rx="1" stroke="#595959" strokeWidth="1.8"/><rect x="14" y="11" width="7" height="5" rx="1" stroke="#595959" strokeWidth="1.8"/><path d="M3 19h18" stroke="#595959" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span style={{ fontSize: 13, color: '#000' }}>Items Counted: <strong>{countedItems.length}</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#595959" strokeWidth="1.8"/><path d="M12 7v5l3 3" stroke="#595959" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span style={{ fontSize: 13, color: '#000' }}>Time: <strong>{formatTime(elapsed)}</strong></span>
        </div>
      </div>

      {/* Content */}
      <main style={{ flex: 1, maxWidth, width: '100%', margin: '0 auto', padding: `20px ${px}px 100px`, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Find an Item */}
        <div style={{ background: '#fff', border: '0.558px solid #e5e7eb', borderRadius: 12, padding: '20px 20px' }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#000', margin: '0 0 4px' }}>Find an Item</p>
          <p style={{ fontSize: 13, color: '#595959', margin: '0 0 16px' }}>Search for an item by category or barcode.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: '#000', width: 80, flexShrink: 0 }}>Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{ flex: 1, height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, padding: '0 12px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: category ? '#000' : '#888', background: '#fff', outline: 'none' }}
              >
                <option value="">Select or search for a category...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: '#000', width: 80, flexShrink: 0 }}>Barcode</label>
              <div style={{ flex: 1, display: 'flex', gap: 8 }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, padding: '0 12px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 3h2v18H3zM7 3h1v18H7zM10 3h2v18h-2zM14 3h1v18h-1zM17 3h2v18h-2zM21 3h1v18h-1z" fill="#595959"/></svg>
                  <input
                    type="text"
                    value={barcode}
                    onChange={e => setBarcode(e.target.value)}
                    placeholder="Enter barcode number"
                    style={{ flex: 1, border: 'none', outline: 'none', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#000', background: 'transparent' }}
                  />
                </div>
                <button style={{ height: 44, padding: '0 14px', border: '0.558px solid #d9d9d9', borderRadius: 8, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#000', whiteSpace: 'nowrap' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="#424242" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="#424242" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="#424242" strokeWidth="1.8"/><circle cx="17.5" cy="17.5" r="3.5" stroke="#424242" strokeWidth="1.8"/></svg>
                  Scan Barcode
                </button>
                <button style={{ height: 44, padding: '0 14px', border: '0.558px solid #d9d9d9', borderRadius: 8, background: '#fff', cursor: 'pointer', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#000' }}>Update</button>
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#888', margin: 0, paddingLeft: 96 }}>Scan or enter the barcode for the item you want to count.</p>
          </div>
        </div>

        {/* Item Details */}
        <div style={{ background: '#fff', border: '0.558px solid #e5e7eb', borderRadius: 12, padding: '20px 20px' }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#000', margin: '0 0 16px' }}>Item Details</p>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#000', width: 90, flexShrink: 0 }}>Item Name</label>
                <span style={{ fontSize: 14, color: itemName ? '#000' : '#888' }}>{itemName || '—'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#000', width: 90, flexShrink: 0 }}>Price</label>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, padding: '0 12px' }}>
                  <span style={{ color: '#595959', fontSize: 14 }}>$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Enter price"
                    style={{ flex: 1, border: 'none', outline: 'none', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#000', background: 'transparent' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#000', width: 90, flexShrink: 0 }}>Location</label>
                <select
                  value={itemLocation}
                  onChange={e => setItemLocation(e.target.value)}
                  style={{ flex: 1, height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, padding: '0 12px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: itemLocation ? '#000' : '#888', background: '#fff', outline: 'none' }}
                >
                  <option value="">Select a location...</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#000', width: 90, flexShrink: 0, paddingTop: 12 }}>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Enter description..."
                  style={{ flex: 1, height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, padding: '0 12px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#000', background: '#fff', outline: 'none' }}
                />
              </div>
            </div>
            {/* Image placeholder */}
            <div style={{ width: 100, height: 100, borderRadius: 8, background: '#f0f0f0', border: '0.558px solid #d9d9d9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, flexShrink: 0 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#aaa" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              <span style={{ fontSize: 10, color: '#aaa', textAlign: 'center', lineHeight: 1.3 }}>No image available</span>
            </div>
          </div>
        </div>

        {/* Your Count */}
        <div style={{ background: '#fff', border: '0.558px solid #e5e7eb', borderRadius: 12, padding: '20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#000', margin: '0 0 4px' }}>Your Count</p>
              <p style={{ fontSize: 13, color: '#595959', margin: '0 0 20px' }}>Update the quantity for this item.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <button onClick={() => setCount(c => Math.max(0, c - 1))} style={{ width: 48, height: 48, border: '0.558px solid #d9d9d9', borderRadius: '8px 0 0 8px', background: '#fff', cursor: 'pointer', fontSize: 22, color: '#424242', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <div style={{ width: 64, height: 48, border: '0.558px solid #d9d9d9', borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 500, color: '#000' }}>{count}</div>
                <button onClick={() => setCount(c => c + 1)} style={{ width: 48, height: 48, border: '0.558px solid #d9d9d9', borderRadius: '0 8px 8px 0', background: '#fff', cursor: 'pointer', fontSize: 22, color: '#424242', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button onClick={handleSave} style={{ height: 44, padding: '0 20px', border: '0.558px solid #d9d9d9', borderRadius: 8, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="#424242" strokeWidth="1.8" strokeLinejoin="round"/><polyline points="17 21 17 13 7 13 7 21" stroke="#424242" strokeWidth="1.8" strokeLinejoin="round"/><polyline points="7 3 7 8 15 8" stroke="#424242" strokeWidth="1.8" strokeLinejoin="round"/></svg>
                Save
              </button>
              <button onClick={handleSaveAndAdd} style={{ height: 44, padding: '0 20px', border: '0.558px solid #d9d9d9', borderRadius: 8, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#424242" strokeWidth="1.8"/><path d="M12 8v8M8 12h8" stroke="#424242" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Save & Add Another
              </button>
            </div>
          </div>
        </div>

        {/* Counted Items */}
        <div style={{ background: '#fff', border: '0.558px solid #e5e7eb', borderRadius: 12, padding: '20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#000', margin: 0 }}>Counted Items ({countedItems.length})</p>
            <button onClick={() => setShowList(v => !v)} style={{ height: 36, padding: '0 12px', border: '0.558px solid #d9d9d9', borderRadius: 8, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#000' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              View List
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ transform: showList ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><path d="M6 9l6 6 6-6" stroke="#424242" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
          <p style={{ fontSize: 13, color: '#595959', margin: '0 0 12px' }}>View the items you've counted in this cycle.</p>
          {countedItems.length === 0 ? (
            <div style={{ border: '0.558px solid #e5e7eb', borderRadius: 8, padding: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>No items counted yet.</p>
            </div>
          ) : showList && (
            <div style={{ border: '0.558px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
              {countedItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < countedItems.length - 1 ? '0.558px solid #f3f4f6' : 'none' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#000', margin: '0 0 2px' }}>{item.name || '(unnamed)'}</p>
                    <p style={{ fontSize: 12, color: '#595959', margin: 0 }}>{item.category}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#000', margin: '0 0 2px' }}>×{item.count}</p>
                    {item.price && <p style={{ fontSize: 12, color: '#595959', margin: 0 }}>${item.price}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '0.558px solid #d9d9d9', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 26px', margin: '0 auto', maxWidth }}>
          <button onClick={() => navigate('/mode-select')} style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: 172.5, height: 44, padding: '10px 0', border: '0.558px solid #d9d9d9', borderRadius: 10, background: '#fff', cursor: 'pointer' }}>
            <HomeIcon />
            <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap' }}>Home</span>
          </button>
          <button onClick={() => navigate('/cycle-count')} style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: 172.5, height: 44, padding: '10px 0', border: '1px solid #D65737', borderRadius: 10, background: '#D65737', cursor: 'pointer' }}>
            <CycleCountIcon />
            <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap' }}>Cycle Count</span>
          </button>
        </div>
      </div>
    </div>
  );
}
