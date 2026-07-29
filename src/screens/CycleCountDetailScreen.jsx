import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';
import UserMenu from '../components/UserMenu';
import BackButton from '../components/BackButton';
import CJ_LOGO from '../assets/construction_junction_logo_white.svg';

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
  const [category, setCategory] = useState('');
  const [barcode, setBarcode] = useState('');
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [itemLocation, setItemLocation] = useState('');
  const [description, setDescription] = useState('');
  const [count, setCount] = useState(0);

  const [countedItems, setCountedItems] = useState([]);
  const [showList, setShowList] = useState(false);

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
        <button onClick={() => navigate('/mode-select')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={CJ_LOGO} alt="Construction Junction" style={{ height: 52, width: 'auto', objectFit: 'contain' }} />
        </button>
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
      </div>

      {/* Content */}
      <main style={{ flex: 1, maxWidth, width: '100%', margin: '0 auto', padding: `20px ${px}px 100px`, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* ── Find the item ── */}
        <div style={{ background: '#fff', border: '0.558px solid #e5e7eb', borderRadius: 12, padding: '20px 20px' }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#D65737', margin: '0 0 14px' }}>Find the item</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label htmlFor="cc-location" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#000', marginBottom: 4 }}>Location</label>
              <select
                id="cc-location"
                value={itemLocation}
                onChange={e => setItemLocation(e.target.value)}
                style={{ width: '100%', height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, padding: '0 12px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: itemLocation ? '#000' : '#888', background: '#fff', outline: 'none' }}
              >
                <option value="">Select the area you are counting...</option>
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="cc-category" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#000', marginBottom: 4 }}>Category</label>
              <select
                id="cc-category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{ width: '100%', height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, padding: '0 12px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: category ? '#000' : '#888', background: '#fff', outline: 'none' }}
              >
                <option value="">Select or search for a category...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="cc-barcode" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#000', marginBottom: 4 }}>Barcode</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, padding: '0 12px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3h2v18H3zM7 3h1v18H7zM10 3h2v18h-2zM14 3h1v18h-1zM17 3h2v18h-2zM21 3h1v18h-1z" fill="#595959"/></svg>
                  <input
                    id="cc-barcode"
                    type="text"
                    value={barcode}
                    onChange={e => setBarcode(e.target.value)}
                    placeholder="Scan or enter barcode number..."
                    aria-describedby="cc-barcode-help"
                    style={{ flex: 1, border: 'none', outline: 'none', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#000', background: 'transparent' }}
                  />
                </div>
                <button style={{ height: 44, minWidth: 92, padding: '0 16px', border: '0.558px solid #d9d9d9', borderRadius: 8, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M0.75 15.75V12H2.25V14.25H4.5V15.75H0.75ZM13.5 15.75V14.25H15.75V12H17.25V15.75H13.5ZM3 13.5V4.5H4.5V13.5H3ZM5.25 13.5V4.5H6V13.5H5.25ZM7.5 13.5V4.5H9V13.5H7.5ZM9.75 13.5V4.5H12V13.5H9.75ZM12.75 13.5V4.5H13.5V13.5H12.75ZM14.25 13.5V4.5H15V13.5H14.25ZM0.75 6V2.25H4.5V3.75H2.25V6H0.75ZM15.75 6V3.75H13.5V2.25H17.25V6H15.75Z" fill="#424242"/></svg>
                  Scan
                </button>
              </div>
              <p id="cc-barcode-help" style={{ fontSize: 13, color: '#595959', margin: '6px 0 0' }}>Scan or type the barcode for the item you want to count.</p>
            </div>
          </div>

        </div>

        {/* ── Check the details ── */}
        <div style={{ background: '#fff', border: '0.558px solid #e5e7eb', borderRadius: 12, padding: '20px 20px' }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#D65737', margin: '0 0 14px' }}>Check the details</p>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#000', margin: '0 0 4px' }}>Item Name</p>
                  <p style={{ fontSize: 14, color: itemName ? '#000' : '#888', margin: 0, minHeight: 20 }}>{itemName || 'Scan an item to see its name'}</p>
                </div>
                <div>
                  <label htmlFor="cc-price" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#000', marginBottom: 4 }}>Price</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, padding: '0 12px' }}>
                    <span style={{ color: '#595959', fontSize: 14 }} aria-hidden="true">$</span>
                    <input
                      id="cc-price"
                      type="number"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      placeholder="0.00"
                      style={{ flex: 1, border: 'none', outline: 'none', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#000', background: 'transparent' }}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cc-description" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#000', marginBottom: 4 }}>Description</label>
                  <input
                    id="cc-description"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Add a short description of the item..."
                    style={{ width: '100%', boxSizing: 'border-box', height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, padding: '0 12px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#000', background: '#fff', outline: 'none' }}
                  />
                </div>
              </div>
              {/* Image placeholder */}
              <div style={{ width: 100, height: 100, borderRadius: 8, background: '#f0f0f0', border: '0.558px solid #d9d9d9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, flexShrink: 0 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#aaa" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                <span style={{ fontSize: 10, color: '#888', textAlign: 'center', lineHeight: 1.3 }}>No image available</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Enter your count ── */}
        <div style={{ background: '#fff', border: '0.558px solid #e5e7eb', borderRadius: 12, padding: '20px 20px' }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#D65737', margin: '0 0 4px' }}>Enter your count</p>
            <p style={{ fontSize: 13, color: '#595959', margin: '0 0 14px' }}>How many of this item did you count?</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <button onClick={() => setCount(c => Math.max(0, c - 1))} aria-label="Decrease count" style={{ width: 64, height: 64, border: '0.558px solid #d9d9d9', borderRadius: '10px 0 0 10px', background: '#fff', cursor: 'pointer', fontSize: 28, color: '#424242', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <div aria-live="polite" style={{ width: 88, height: 64, border: '0.558px solid #d9d9d9', borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, color: '#000' }}>{count}</div>
                <button onClick={() => setCount(c => c + 1)} aria-label="Increase count" style={{ width: 64, height: 64, border: '0.558px solid #d9d9d9', borderRadius: '0 10px 10px 0', background: '#fff', cursor: 'pointer', fontSize: 28, color: '#424242', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={handleSave} style={{ height: 48, padding: '0 20px', border: '0.558px solid #d9d9d9', borderRadius: 8, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap' }}>
                  Save
                </button>
                <button onClick={handleSaveAndAdd} style={{ height: 48, padding: '0 20px', border: '1px solid #D65737', borderRadius: 8, background: '#D65737', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                  Save and add another
                </button>
              </div>
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
