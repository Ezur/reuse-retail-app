import { useState } from 'react';
import './App.css';
import { ItemRecord, emptyItem } from './types';
import { IntakeForm } from './components/IntakeForm';
import { PhotoModal } from './components/PhotoModal';

function App() {
  const [item, setItem] = useState<Partial<ItemRecord>>(emptyItem());
  const [photoOpen, setPhotoOpen] = useState(false);

  const patch = (p: Partial<ItemRecord>) => setItem(prev => ({ ...prev, ...p }));

  const handleSave = () => {
    const record: ItemRecord = {
      id: crypto.randomUUID(),
      donationId: 'D44188',
      itemType: item.itemType ?? 'stock',
      photo: item.photo,
      category: item.category ?? '',
      name: item.name ?? '',
      price: item.price ?? '',
      quantity: item.quantity ?? '',
      brand: item.brand ?? '',
      modelStyle: item.modelStyle ?? '',
      colorMaterial: item.colorMaterial ?? '',
      condition: item.condition ?? [],
      notes: item.notes ?? '',
      description: item.description ?? '',
      weight: item.weight ?? '',
      length: item.length ?? '',
      width: item.width ?? '',
      height: item.height ?? '',
    };
    const existing: ItemRecord[] = JSON.parse(localStorage.getItem('rr_items') ?? '[]');
    localStorage.setItem('rr_items', JSON.stringify([...existing, record]));
    setItem(emptyItem());
  };

  const handleClone = () => {
    setItem(prev => ({
      ...emptyItem(),
      itemType: prev.itemType,
      category: prev.category,
      brand: prev.brand,
      condition: prev.condition,
    }));
  };

  const handlePhotoClose = (photo?: string) => {
    if (photo) patch({ photo });
    setPhotoOpen(false);
  };

  return (
    <div style={{ height: '100dvh', overflow: 'hidden', position: 'relative' }}>
      <IntakeForm
        item={item}
        onChange={patch}
        onReset={() => setItem(emptyItem())}
        onPhotoTap={() => setPhotoOpen(true)}
        onSave={handleSave}
        onClone={handleClone}
      />
      {photoOpen && <PhotoModal onClose={handlePhotoClose} />}
    </div>
  );
}

export default App;
