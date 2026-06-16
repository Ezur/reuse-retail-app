export type ItemType = 'stock' | 'unique';

export type ConditionTag =
  | 'Antique'
  | 'Vintage'
  | 'Salvaged'
  | 'Refurbished'
  | 'Surplus';

export interface ItemRecord {
  id: string;
  donationId?: string;
  itemType: ItemType;
  photo?: string;
  category: string;
  name: string;
  price: string;
  quantity: string;
  brand: string;
  modelStyle: string;
  colorMaterial: string;
  condition: ConditionTag[];
  units: string;
  notes: string;
  description: string;
  weight: string;
  length: string;
  width: string;
  height: string;
}

export function emptyItem(): Partial<ItemRecord> {
  return {
    itemType: 'stock',
    condition: [],
  };
}
