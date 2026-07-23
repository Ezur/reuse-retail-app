import { useState, useRef, createContext, useContext } from 'react';

const AccentContext = createContext('#085420');
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';
import CJ_LOGO from '../assets/construction_junction_logo_white.svg';
import AnonymousDonorAvatar from '../assets/AnonymousDonorAvatar.svg';
import UserMenu from '../components/UserMenu';
import BackButton from '../components/BackButton';
import NewItemFlow from '../components/NewItemFlow';
import { supabase } from '../lib/supabase';
import { Toast, useToast } from '../components/Toast';

const CATEGORY_MAP = {
  APP: 'Appliances', BML: 'Building Material and Lumber', CAB: 'Cabinets and Built-Ins',
  CLO: 'Clothing', CNT: 'Countertops and Tabletops', DOR: 'Doors',
  ELC: 'Hardware, Tools, Electrical and Misc', FLR: 'Flooring and Accessories',
  GDN: 'Garden and Outdoor', GLS: 'Glass, Mirrors, and Glass Block',
  HDW: 'Hardware, Tools, Electrical and Misc', HVA: 'Heating, Ventilation, A/C and Rads',
  HOF: 'Home, Office and Commercial Furnishings', CJM: 'Junction Made',
  LGT: 'Lighting', LBR: 'Lumber and Sheet Goods', PNT: 'Paint',
  PLB: 'Plumbing', ROF: 'Roofing', TIL: 'Tile', WIN: 'Windows',
};

const DONOR_INFO = {
  name: 'Anonymous Donor Drop-Off',
  donorNumber: '44188',
  date: '05/31/2026',
};

const BRANDS = ['N/A', 'Galanz', 'GE', 'Whirlpool', 'Samsung', 'LG', 'Bosch', 'KitchenAid', 'Maytag', 'Frigidaire'];
const COLORS = ['N/A', 'Black', 'White', 'Stainless', 'Blue', 'Red', 'Green', 'Gray', 'Brown', 'Natural'];
const UNITS = ['Each', 'Pair', 'Set', 'Lot', 'Linear Foot', 'Square Foot', 'Gaylord'];
const SPECIAL_CHARS = ['Antique', 'Vintage', 'Salvaged', 'Refurbished', 'Surplus', 'Handmade', 'Rare Find'];
const CONDITIONS = ['Like New', 'Good', 'Fair'];

// ── Icons ─────────────────────────────────────────────────────────────────────

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  );
}

function SaveIcon({ color = 'currentColor' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <polyline points="17 21 17 13 7 13 7 21" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <polyline points="7 3 7 8 15 8" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RepriceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polyline points="6 9 6 2 18 2 18 9" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
      <rect x="6" y="14" width="12" height="8" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#a2a2a2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="4" stroke="#a2a2a2" strokeWidth="1.5"/>
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.2-1.2 4.2-3 5.4V17H9v-2.6A6 6 0 0 1 6 9a6 6 0 0 1 6-6z" stroke="#424242" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDown({ color = '#424242' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#085420" strokeWidth="1.8" strokeLinejoin="round"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="#085420" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="12" y1="22.08" x2="12" y2="12" stroke="#085420" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function DonorSummaryCard({ info }) {
  return (
    <div style={{
      border: '0.558px solid #d9d9d9', borderRadius: 14,
      padding: '16px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 12, background: '#fff',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
        <img src={AnonymousDonorAvatar} alt="" width={48} height={48} style={{ borderRadius: '50%', flexShrink: 0 }} />
        <div>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: 700, color: '#000', margin: 0 }}>
            {info.name}
          </p>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#424242', margin: '3px 0 0' }}>
            D# {info.donorNumber}&nbsp;&nbsp;|&nbsp;&nbsp;{info.date}
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionBadge({ n }) {
  const accent = useContext(AccentContext);
  return (
    <div style={{
      width: 24, height: 24, borderRadius: '50%',
      background: accent, color: '#fff',
      fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>{n}</div>
  );
}

function FormCard({ children }) {
  return (
    <div style={{ border: '0.558px solid #d9d9d9', borderRadius: 14, background: '#fff', overflow: 'hidden' }}>
      {children}
    </div>
  );
}

function CardHeader({ badge, title, required, requiredNote, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '14px 20px',
      borderBottom: '0.558px solid #f3f4f6',
    }}>
      {badge && <SectionBadge n={badge} />}
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: '#000' }}>
        {title}
        {required && <span style={{ color: '#DC0000' }}>*</span>}
      </span>
      {requiredNote && (
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#DC0000', marginLeft: 0 }}>
          {requiredNote}
        </span>
      )}
      {right && <div style={{ marginLeft: 'auto' }}>{right}</div>}
    </div>
  );
}

function CardBody({ children, style }) {
  return <div style={{ padding: '16px 20px', ...style }}>{children}</div>;
}

function FieldLabel({ children, required }) {
  return (
    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#000', margin: '0 0 6px' }}>
      {children}{required && <span style={{ color: '#DC0000' }}> *</span>}
    </p>
  );
}

function InputField({ value, onChange, placeholder, readOnly, disabled, style }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly || disabled}
      disabled={disabled}
      style={{
        width: '100%', boxSizing: 'border-box',
        height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8,
        background: disabled ? '#f0f0f0' : readOnly ? '#f5f5f5' : '#fff',
        padding: '0 10px',
        fontFamily: "'Inter', sans-serif", fontSize: 16,
        color: disabled ? '#a0a0a0' : '#000',
        outline: 'none', cursor: disabled ? 'not-allowed' : undefined,
        ...style,
      }}
    />
  );
}

function SelectField({ value, onChange, options, placeholder, disabled }) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{
        width: '100%', boxSizing: 'border-box',
        height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8,
        background: disabled ? '#f0f0f0' : '#fff', padding: '0 10px',
        fontFamily: "'Inter', sans-serif", fontSize: 16, color: disabled ? '#a0a0a0' : '#000',
        outline: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23424242' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        paddingRight: 28,
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function CheckboxPill({ label, checked, onChange, disabled }) {
  const accent = useContext(AccentContext);
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 6,
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: `0.558px solid ${disabled ? '#e0e0e0' : checked ? accent : '#d9d9d9'}`,
      borderRadius: 6, padding: '5px 10px', minHeight: 44,
      background: disabled ? '#f0f0f0' : checked ? '#e8f5e9' : '#fff',
      opacity: disabled ? 0.6 : 1,
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{ width: 14, height: 14, accentColor: accent, cursor: disabled ? 'not-allowed' : 'pointer' }}
      />
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: disabled ? '#a0a0a0' : '#000', whiteSpace: 'nowrap' }}>{label}</span>
    </label>
  );
}

function RadioButton({ label, checked, onChange, disabled }) {
  const accent = useContext(AccentContext);
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 6,
      cursor: disabled ? 'not-allowed' : 'pointer',
      minHeight: 44, opacity: disabled ? 0.5 : 1,
    }}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{ width: 16, height: 16, accentColor: accent, cursor: disabled ? 'not-allowed' : 'pointer' }}
      />
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: disabled ? '#a0a0a0' : '#000' }}>{label}</span>
    </label>
  );
}

function CategoryChip({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        border: '0.558px solid #d9d9d9', borderRadius: 20,
        padding: '6px 10px 6px 14px', minHeight: 44,
        background: '#fff', cursor: 'pointer',
        fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#000',
      }}
    >
      <span style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M18 6L6 18M6 6l12 12" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
  );
}

function CollapsibleSection({ title, open, onToggle, children }) {
  return (
    <FormCard>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer',
          borderBottom: open ? '0.558px solid #f3f4f6' : 'none',
        }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: '#000' }}>{title}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M6 9l6 6 6-6" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <CardBody>{children}</CardBody>}
    </FormCard>
  );
}

// ── Auto-name logic ───────────────────────────────────────────────────────────

function buildItemName({ type, subcategory, stockItem, brand, modelStyle, color }) {
  if (type === 'empty' || !subcategory) {
    return 'Category - Subcategory - Item Type - Brand - Model - Key Details';
  }
  if (type === 'stock') {
    return stockItem?.name || subcategory;
  }
  const parts = [subcategory, brand, modelStyle, color].filter(
    p => p && p.trim() && p !== 'N/A' && p !== 'Select or enter...' && p !== 'Enter...'
  );
  return parts.length > 0
    ? parts.join(' - ')
    : `${subcategory} - Brand - Model - Key Details`;
}

// ── Cancel confirmation modal ─────────────────────────────────────────────────

function CancelConfirmModal({ onStay, onLeave }) {
  const accent = useContext(AccentContext);
  return (
    <div
      onClick={onStay}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#ffffff', borderRadius: 16,
          width: 619, maxWidth: 'calc(100vw - 48px)',
          position: 'relative',
          padding: '24px 32px 32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        {/* Icon */}
        <div style={{
          marginTop: 16, marginBottom: 24,
          width: 86, height: 86, borderRadius: '50%',
          background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 40, fontWeight: 700, color: '#595959', lineHeight: 1 }}>?</span>
        </div>

        {/* Title */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 20, fontWeight: 700, color: '#000',
          margin: '0 0 12px', textAlign: 'center',
        }}>
          Are you sure you want to cancel?
        </p>

        {/* Body */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15, fontWeight: 400, color: '#595959',
          margin: '0 0 32px', textAlign: 'center',
          lineHeight: 1.5, maxWidth: 395,
        }}>
          Any unsaved changes to this item will be lost if you go back now.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 21, justifyContent: 'center' }}>
          <button
            onClick={onStay}
            style={{
              width: 172.5, height: 52,
              background: '#ffffff',
              border: '1px solid #d9d9d9', borderRadius: 10,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14, fontWeight: 500, color: '#000',
              cursor: 'pointer',
            }}
          >
            Keep Editing
          </button>
          <button
            onClick={onLeave}
            style={{
              width: 172.5, height: 52,
              background: accent,
              border: 'none', borderRadius: 10,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14, fontWeight: 500, color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function InventoryFormScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { isMobile, maxWidth, headerHeight, px, fieldColumns } = useLayout();

  const existingItem = state?.item || null;
  const isEditing = !!existingItem;
  const isManageMode = state?.mode === 'manage';

  const initType = state?.type || (existingItem ? 'donated' : 'empty');
  const initCategory = state?.category || (existingItem?.category ? { code: existingItem.category, name: CATEGORY_MAP[existingItem.category] ?? existingItem.category } : null);
  const initSubcategory = state?.subcategory || existingItem?.subcategory || null;
  const initStockItem = state?.stockItem || null;

  // Category / type state (can change if user re-opens wizard)
  const [category, setCategory] = useState(initCategory);
  const [subcategory, setSubcategory] = useState(initSubcategory);
  const [itemType, setItemType] = useState(initType);
  const [stockItem, setStockItem] = useState(initStockItem);

  const isStock = itemType === 'stock';

  // Form fields
  const [brand, setBrand] = useState(isStock ? 'N/A' : '');
  const [modelStyle, setModelStyle] = useState(isStock ? 'N/A' : '');
  const [color, setColor] = useState(isStock ? 'N/A' : '');
  const [specialChars, setSpecialChars] = useState([]);
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState(isStock ? 'N/A' : '');
  const [price, setPrice] = useState(existingItem?.price ?? (isStock && initStockItem?.price ? initStockItem.price : ''));
  const [qty, setQty] = useState(existingItem?.qty ? String(existingItem.qty) : '1');
  const [qtyOf, setQtyOf] = useState('1');
  const [units, setUnits] = useState('Each');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [notes, setNotes] = useState('');
  const [showAdditional, setShowAdditional] = useState(true);
  const [showNotes, setShowNotes] = useState(true);

  // Wizard state
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStartStep, setWizardStartStep] = useState('category');
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Print state
  const [printState, setPrintState] = useState(null); // null | 'printing' | 'done'
  const printTimers = useRef([]);

  const { toast, show: showToast, hide: hideToast } = useToast();
  const [showCloneModal, setShowCloneModal] = useState(false);

  const handleClone = () => {
    setShowCloneModal(false);
    setPrice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Item cloned — price cleared');
  };

  const handlePrint = async () => {
    setPrintState('printing');

    // Save item to Supabase (non-blocking on error for prototype)
    const payload = {
      donor_id: id !== 'new' ? id : null,
      name: itemName,
      category: category?.code ?? null,
      subcategory: subcategory ?? null,
      condition: condition || null,
      price: price !== '' ? Number(price) : null,
      qty: qty !== '' ? Number(qty) : 1,
    };
    await supabase.from('items').insert(payload);

    const t1 = setTimeout(() => setPrintState('done'), 2000);
    const t2 = setTimeout(() => {
      setPrintState(null);
      navigate(id && id !== 'new' ? `/donor/${id}` : -1);
    }, 3500);
    printTimers.current = [t1, t2];
  };

  const itemName = buildItemName({ type: itemType, subcategory, stockItem, brand, modelStyle, color });

  const toggleSpecialChar = (char) => {
    setSpecialChars(prev =>
      prev.includes(char) ? prev.filter(c => c !== char) : [...prev, char]
    );
  };

  const handleWizardComplete = (data) => {
    setCategory(data.category);
    setSubcategory(data.subcategory);
    setItemType(data.type);
    setStockItem(data.stockItem || null);
    if (data.type === 'stock' && data.stockItem?.price) {
      setPrice(data.stockItem.price);
    }
    setShowWizard(false);
  };

  // chip 1 label: "APP, Microwave - Countertop Microwave, Used, Small (ASIS)"
  const chip1Label = () => {
    if (!category) return '';
    const base = `${category.code}, ${subcategory}`;
    if (itemType === 'stock' && stockItem) return `${base} - ${stockItem.name}`;
    return base;
  };

  const accent = isManageMode ? '#D65737' : '#085420';

  return (
    <AccentContext.Provider value={accent}>
    <div style={styles.page}>
      {/* Header */}
      <header style={{ ...styles.header, height: headerHeight, paddingLeft: px, paddingRight: px, background: isManageMode ? '#D65737' : '#085420' }}>
        <BackButton onClick={() => setShowCancelModal(true)} variant="cancel" />
        <img src={CJ_LOGO} alt="Construction Junction" style={styles.logo} />
        <div style={{ width: 120, height: 56, flexShrink: 0, position: 'relative' }}>
          <UserMenu initials="JS" onSignOut={() => navigate('/login')} />
        </div>
      </header>

      {/* Main */}
      <main style={{ ...styles.main, maxWidth, padding: `16px ${px}px 24px` }}>
        <h1 style={styles.pageTitle}>{isEditing ? 'Edit Item' : 'Inventory Form'}</h1>
        {isEditing && (
          <p style={{ fontSize: 14, color: '#595959', margin: '-8px 0 12px', fontFamily: "'Helvetica Neue', sans-serif" }}>
            {existingItem.name}
          </p>
        )}

        <DonorSummaryCard info={DONOR_INFO} />

        {/* ── 1. Category ── */}
        <FormCard>
          <CardHeader badge={1} title="Category" required />
          <CardBody>
            {itemType === 'empty' || !category ? (
              <button
                onClick={() => { setWizardStartStep('category'); setShowWizard(true); }}
                style={styles.selectCatBtn}
              >
                <span>Select a category</span>
                <ChevronDown />
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <CategoryChip
                  label={chip1Label()}
                  onClick={() => { setWizardStartStep('category'); setShowWizard(true); }}
                />
                <CategoryChip
                  label={itemType === 'stock' ? 'Stock Item' : 'Reuse Item'}
                  onClick={() => { setWizardStartStep('type'); setShowWizard(true); }}
                />
              </div>
            )}
          </CardBody>
        </FormCard>

        {/* ── 2. Item Photos ── */}
        <FormCard>
          <CardHeader
            badge={2}
            title="Item Photos"
            required
            requiredNote="At least 1 photo recommended"
            right={
              <button style={styles.photoTipsBtn} disabled={isStock}>
                <LightbulbIcon />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#424242', marginLeft: 4 }}>Photo Tips</span>
              </button>
            }
          />
          <CardBody style={{ display: 'flex', gap: 16, position: 'relative' }}>
            {/* Upload zone */}
            <div style={{ ...styles.photoUpload, background: isStock ? '#f0f0f0' : undefined, cursor: isStock ? 'not-allowed' : 'pointer', borderColor: isStock ? '#e0e0e0' : '#d9d9d9' }}>
              <CameraIcon />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: isStock ? '#a0a0a0' : '#424242', margin: '8px 0 4px' }}>
                Add Photos
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: isStock ? '#c0c0c0' : '#595959', margin: 0, textAlign: 'center' }}>
                Click to take new images to this item.
              </p>
            </div>
            {/* Tips panel */}
            <div style={{ ...styles.tipsPanel, background: isStock ? '#f0f0f0' : '#f5f5f5' }}>
              {['Use good lighting', 'Take the photo in horizontal mode', 'Capture the entire item', 'Highlight special or unique features'].map(tip => (
                <p key={tip} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: isStock ? '#c0c0c0' : '#424242', margin: '0 0 6px' }}>
                  {tip}
                </p>
              ))}
            </div>
          </CardBody>
        </FormCard>

        {/* ── 3. Item Details ── */}
        <FormCard>
          <CardHeader badge={3} title="Item Details" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Item Name (auto-generated) */}
            <div>
              <FieldLabel>Item Name</FieldLabel>
              <InputField value={itemName} readOnly />
            </div>

            {/* Brand / Model / Color */}
            <div style={{ display: 'flex', flexDirection: fieldColumns === 1 ? 'column' : 'row', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <FieldLabel required>Brand</FieldLabel>
                <SelectField value={brand} onChange={e => setBrand(e.target.value)} options={BRANDS} placeholder="Search or select..." disabled={isStock} />
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel required>Model and/or Style</FieldLabel>
                <InputField value={modelStyle} onChange={e => setModelStyle(e.target.value)} placeholder="Enter..." disabled={isStock} />
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel>Color and/or Material</FieldLabel>
                <SelectField value={color} onChange={e => setColor(e.target.value)} options={COLORS} placeholder="Search or select..." disabled={isStock} />
              </div>
            </div>

            {/* Special Characteristics */}
            <div>
              <FieldLabel>Special Characteristics</FieldLabel>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {SPECIAL_CHARS.map(char => (
                  <CheckboxPill
                    key={char}
                    label={char}
                    checked={specialChars.includes(char)}
                    onChange={() => toggleSpecialChar(char)}
                    disabled={isStock}
                  />
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#000', margin: 0 }}>Condition</p>
                {condition && !isStock && (
                  <button
                    onClick={() => setCondition('')}
                    style={{ marginLeft: 10, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#595959', textDecoration: 'underline' }}
                  >
                    Clear
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                {CONDITIONS.map(c => (
                  <RadioButton key={c} label={c} checked={condition === c} onChange={() => setCondition(c)} disabled={isStock} />
                ))}
              </div>
            </div>

            {/* Item Description */}
            <div>
              <FieldLabel>Item Description</FieldLabel>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter a description for the website."
                disabled={isStock}
                style={{ ...styles.textarea, background: isStock ? '#f0f0f0' : undefined, color: isStock ? '#a0a0a0' : '#000', cursor: isStock ? 'not-allowed' : undefined }}
              />
            </div>
          </CardBody>
        </FormCard>

        {/* ── 4. Pricing ── */}
        <FormCard>
          <CardHeader badge={4} title="Pricing" />
          <CardBody>
            <div style={{ display: 'flex', gap: 16 }}>
              {/* Price */}
              <div style={{ flex: 1 }}>
                <FieldLabel required>Price</FieldLabel>
                <div style={{ ...styles.priceRow, background: isStock ? '#f0f0f0' : undefined, cursor: isStock ? 'not-allowed' : undefined }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: isStock ? '#a0a0a0' : '#595959', paddingLeft: 10 }}>$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="0.00"
                    disabled={isStock}
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Inter', sans-serif", fontSize: 16, color: isStock ? '#a0a0a0' : '#000', cursor: isStock ? 'not-allowed' : undefined }}
                  />
                </div>
              </div>
              {/* Quantity */}
              <div style={{ flex: 'none' }}>
                <FieldLabel required>Quantity</FieldLabel>
                <div style={{ display: 'flex', alignItems: 'center', height: 44, width: 96, border: '0.558px solid #d9d9d9', borderRadius: 8, background: isStock ? '#f0f0f0' : '#fff' }}>
                  <input
                    type="number"
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                    min="1"
                    disabled={isStock}
                    style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 500, color: isStock ? '#a0a0a0' : '#000', textAlign: 'left', cursor: isStock ? 'not-allowed' : undefined, padding: '0 12px' }}
                  />
                </div>
              </div>
              {/* Units */}
              <div style={{ flex: 1 }}>
                <FieldLabel required>Units</FieldLabel>
                <SelectField value={units} onChange={e => setUnits(e.target.value)} options={UNITS} disabled={isStock} />
              </div>
            </div>
          </CardBody>
        </FormCard>

        {/* ── Additional Details (collapsible) ── */}
        <CollapsibleSection title="Additional Details" open={showAdditional} onToggle={() => setShowAdditional(p => !p)}>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              ['Weight', weight, setWeight, 'lbs', 'Enter pounds'],
              ['Length', length, setLength, 'in', 'Enter inches'],
              ['Width', width, setWidth, 'in', 'Enter inches'],
              ['Height', height, setHeight, 'in', 'Enter inches'],
            ].map(([label, val, setter, unit, placeholder]) => (
              <div key={label} style={{ flex: 1, minWidth: 0 }}>
                <FieldLabel>{label}</FieldLabel>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8,
                  background: isStock ? '#f0f0f0' : '#fff', overflow: 'hidden',
                }}>
                  <input
                    type="number"
                    value={val}
                    onChange={e => setter(e.target.value)}
                    placeholder={placeholder}
                    disabled={isStock}
                    style={{
                      flex: 1, border: 'none', outline: 'none', background: 'transparent',
                      padding: '0 8px', fontFamily: "'Inter', sans-serif", fontSize: 14,
                      color: isStock ? '#a0a0a0' : '#000', cursor: isStock ? 'not-allowed' : undefined,
                      minWidth: 0,
                    }}
                  />
                  <div style={{ width: 1, height: 24, background: '#d9d9d9', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
                    color: isStock ? '#a0a0a0' : '#424242',
                    padding: '0 7px', flexShrink: 0,
                  }}>{unit}</span>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* ── Notes (collapsible) ── */}
        <CollapsibleSection title="Notes" open={showNotes} onToggle={() => setShowNotes(p => !p)}>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Want to mention something extra to your team?"
            disabled={isStock}
            style={{ ...styles.textarea, background: isStock ? '#f0f0f0' : undefined, color: isStock ? '#a0a0a0' : '#000', cursor: isStock ? 'not-allowed' : undefined }}
          />
        </CollapsibleSection>

      </main>

      {/* Bottom nav */}
      <div style={styles.bottomNav}>
        <div style={{ ...styles.bottomNavInner, maxWidth, padding: `10px ${px}px` }}>
          {isManageMode ? (
            <>
              <button style={styles.navBtn} onClick={() => showToast('Item removed', 'error')}>
                <TrashIcon />
                <span style={styles.navBtnLabel}>Remove</span>
              </button>
              <button style={styles.navBtn} onClick={() => showToast('Reprice coming soon')}>
                <RepriceIcon />
                <span style={styles.navBtnLabel}>Reprice</span>
              </button>
              <button onClick={() => { showToast('Item saved successfully'); }} style={{ ...styles.navBtn, background: '#D65737', border: '1px solid #D65737', color: '#fff' }}>
                <SaveIcon color="#fff" />
                <span style={{ ...styles.navBtnLabel, color: '#fff' }}>Save</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/mode-select')} style={styles.navBtn}>
                <HomeIcon />
                <span style={styles.navBtnLabel}>Home</span>
              </button>
              <button style={styles.navBtn} onClick={() => setShowCloneModal(true)}>
                <CopyIcon />
                <span style={styles.navBtnLabel}>Clone</span>
              </button>
              <button style={styles.navBtn} onClick={() => showToast('Item saved successfully')}>
                <SaveIcon />
                <span style={styles.navBtnLabel}>Save</span>
              </button>
              <button onClick={handlePrint} style={{ ...styles.navBtn, background: '#085420', border: '1px solid #085420', color: '#fff' }}>
                <PrintIcon />
                <span style={{ ...styles.navBtnLabel, color: '#fff' }}>Print & Save</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Clone confirmation */}
      {showCloneModal && (
        <div
          onClick={() => setShowCloneModal(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: '#ffffff', borderRadius: 16, width: 619, maxWidth: 'calc(100vw - 48px)', padding: '24px 32px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ marginTop: 16, marginBottom: 24, width: 86, height: 86, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="#595959" strokeWidth="1.8"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="#595959" strokeWidth="1.8"/>
              </svg>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 700, color: '#000', margin: '0 0 12px', textAlign: 'center' }}>
              Clone this item?
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, color: '#595959', margin: '0 0 32px', textAlign: 'center', lineHeight: 1.5, maxWidth: 395 }}>
              All item details will be duplicated. The price will be cleared so you can enter a new one.
            </p>
            <div style={{ display: 'flex', gap: 21, justifyContent: 'center' }}>
              <button
                onClick={() => setShowCloneModal(false)}
                style={{ width: 172.5, height: 52, background: '#ffffff', border: '1px solid #d9d9d9', borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: '#000', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleClone}
                style={{ width: 172.5, height: 52, background: '#085420', border: 'none', borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: '#ffffff', cursor: 'pointer' }}
              >
                Yes, Clone
              </button>
              {/* Clone modal is only shown in intake mode, so accent is always green here */}
            </div>
          </div>
        </div>
      )}

      {/* Cancel confirmation */}
      {showCancelModal && (
        <CancelConfirmModal
          onStay={() => setShowCancelModal(false)}
          onLeave={() => navigate(-1)}
        />
      )}

      {/* Wizard overlay */}
      {showWizard && (
        <NewItemFlow
          startStep={wizardStartStep}
          startCategory={category}
          startSubcategory={subcategory}
          onDismiss={() => setShowWizard(false)}
          onCancel={() => setShowWizard(false)}
          onComplete={handleWizardComplete}
        />
      )}

      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} type={toast.type} />

      {printState && (
        <>
          <style>{`
            @keyframes cj-spin { to { transform: rotate(360deg); } }
            @keyframes cj-pop { 0% { transform: scale(0.6); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
          `}</style>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              {printState === 'printing' ? (
                <div style={{ width: 72, height: 72, borderRadius: '50%', border: '5px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', animation: 'cj-spin 0.75s linear infinite' }} />
              ) : (
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: isManageMode ? '#D65737' : '#085420', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'cj-pop 0.35s ease-out both' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: 500, color: '#fff', margin: 0 }}>
                {printState === 'printing' ? 'Printing…' : 'Label printed'}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
    </AccentContext.Provider>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: '100dvh',
    background: '#f3f4f6',
    display: 'flex', flexDirection: 'column',
    fontFamily: "'Inter', -apple-system, sans-serif",
    paddingBottom: 88,
  },
  header: {
    height: 108, background: '#085420',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    paddingLeft: 26, paddingRight: 26, paddingBottom: 16,
    flexShrink: 0, position: 'sticky', top: 0, zIndex: 10,
  },
  backBtn: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'transparent', border: 'none', cursor: 'pointer', padding: '0 8px', minHeight: 44, flexShrink: 0,
  },
  backArrow: { fontFamily: "'Helvetica Neue', sans-serif", fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1 },
  backLabel: { fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: 500, color: '#fff', lineHeight: 1 },
  logo: { height: 52, width: 'auto', objectFit: 'contain' },
  main: {
    flex: 1,
    display: 'flex', flexDirection: 'column', gap: 12,
    padding: '16px 24px 24px',
    width: '100%', maxWidth: 834, alignSelf: 'center', boxSizing: 'border-box',
  },
  pageTitle: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 18, fontWeight: 700, color: '#000', margin: 0,
  },
  selectCatBtn: {
    display: 'flex', alignItems: 'center', gap: 8,
    height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8,
    background: '#fff', padding: '0 12px', cursor: 'pointer',
    fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#000',
  },
  photoUpload: {
    flex: 1, minHeight: 120,
    border: '1.5px dashed #d9d9d9', borderRadius: 10,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: 16, cursor: 'pointer',
  },
  tipsPanel: {
    width: 200, flexShrink: 0,
    background: '#f5f5f5', borderRadius: 10,
    padding: 14,
  },
  photoTipsBtn: {
    display: 'flex', alignItems: 'center',
    background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px', minHeight: 44,
  },
  textarea: {
    width: '100%', boxSizing: 'border-box',
    minHeight: 80, border: '0.558px solid #d9d9d9', borderRadius: 8,
    padding: '10px', resize: 'vertical',
    fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#000',
    outline: 'none',
  },
  priceRow: {
    display: 'flex', alignItems: 'center', gap: 4,
    height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, background: '#fff',
    overflow: 'hidden',
  },
  qtyRow: {
    display: 'flex', alignItems: 'center',
    height: 44, border: '0.558px solid #d9d9d9', borderRadius: 8, background: '#fff',
    padding: '0 10px', gap: 2,
  },
  bottomNav: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: '#fff', borderTop: '0.558px solid #f3f4f6',
    zIndex: 10,
  },
  bottomNavInner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 24px', maxWidth: 834, margin: '0 auto', gap: 8,
  },
  navBtn: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    background: '#fff', border: '0.558px solid #d9d9d9', borderRadius: 10,
    padding: '10px 0', height: 44, cursor: 'pointer',
  },
  navBtnLabel: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap',
  },
};
