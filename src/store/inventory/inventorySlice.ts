import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShopItem {
  id: string;
  name: string;
  type: 'armor' | 'head';
  spriteKey: string;
  cost: number;
  description?: string;
}

interface InventoryState {
  ownedItems: string[]; // IDs of purchased items
  equippedArmor?: string;
  equippedHead?: string;
}

const initialState: InventoryState = {
  ownedItems: [],
  equippedArmor: undefined,
  equippedHead: undefined,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    purchaseItem: (state, action: PayloadAction<string>) => {
      if (!state.ownedItems.includes(action.payload)) {
        state.ownedItems.push(action.payload);
      }
    },
    equipArmor: (state, action: PayloadAction<string | undefined>) => {
      state.equippedArmor = action.payload;
    },
    equipHead: (state, action: PayloadAction<string | undefined>) => {
      state.equippedHead = action.payload;
    },
    unequipArmor: (state) => {
      state.equippedArmor = undefined;
    },
    unequipHead: (state) => {
      state.equippedHead = undefined;
    },
  },
});

export const { purchaseItem, equipArmor, equipHead, unequipArmor, unequipHead } = inventorySlice.actions;
export default inventorySlice.reducer;

// Shop catalog
export const SHOP_ITEMS: ShopItem[] = [
  // Warrior Armor Set
  { id: 'armor_warrior_1', name: 'Warrior Armor I', type: 'armor', spriteKey: 'armor/broad_armor_warrior_1', cost: 25, description: 'Basic warrior plate' },
  { id: 'armor_warrior_2', name: 'Warrior Armor II', type: 'armor', spriteKey: 'armor/broad_armor_warrior_2', cost: 50, description: 'Reinforced plate' },
  { id: 'armor_warrior_3', name: 'Warrior Armor III', type: 'armor', spriteKey: 'armor/broad_armor_warrior_3', cost: 100, description: 'Elite warrior armor' },
  { id: 'armor_warrior_4', name: 'Warrior Armor IV', type: 'armor', spriteKey: 'armor/broad_armor_warrior_4', cost: 200, description: 'Champion plate' },
  { id: 'armor_warrior_5', name: 'Warrior Armor V', type: 'armor', spriteKey: 'armor/broad_armor_warrior_5', cost: 400, description: 'Legendary warrior armor' },
  
  // Rogue Armor Set
  { id: 'armor_rogue_1', name: 'Rogue Leather I', type: 'armor', spriteKey: 'armor/broad_armor_rogue_1', cost: 25, description: 'Light leather armor' },
  { id: 'armor_rogue_2', name: 'Rogue Leather II', type: 'armor', spriteKey: 'armor/broad_armor_rogue_2', cost: 50, description: 'Reinforced leather' },
  { id: 'armor_rogue_3', name: 'Rogue Leather III', type: 'armor', spriteKey: 'armor/broad_armor_rogue_3', cost: 100, description: 'Shadow leather' },
  { id: 'armor_rogue_4', name: 'Rogue Leather IV', type: 'armor', spriteKey: 'armor/broad_armor_rogue_4', cost: 200, description: 'Assassin garb' },
  { id: 'armor_rogue_5', name: 'Rogue Leather V', type: 'armor', spriteKey: 'armor/broad_armor_rogue_5', cost: 400, description: 'Legendary rogue armor' },
  
  // Healer Armor Set
  { id: 'armor_healer_1', name: 'Healer Robes I', type: 'armor', spriteKey: 'armor/broad_armor_healer_1', cost: 25, description: 'Acolyte robes' },
  { id: 'armor_healer_2', name: 'Healer Robes II', type: 'armor', spriteKey: 'armor/broad_armor_healer_2', cost: 50, description: 'Priest vestments' },
  { id: 'armor_healer_3', name: 'Healer Robes III', type: 'armor', spriteKey: 'armor/broad_armor_healer_3', cost: 100, description: 'Holy robes' },
  { id: 'armor_healer_4', name: 'Healer Robes IV', type: 'armor', spriteKey: 'armor/broad_armor_healer_4', cost: 200, description: 'Divine vestments' },
  { id: 'armor_healer_5', name: 'Healer Robes V', type: 'armor', spriteKey: 'armor/broad_armor_healer_5', cost: 400, description: 'Legendary healer robes' },
  
  // Wizard Armor Set
  { id: 'armor_wizard_1', name: 'Wizard Robes I', type: 'armor', spriteKey: 'armor/broad_armor_wizard_1', cost: 25, description: 'Apprentice robes' },
  { id: 'armor_wizard_2', name: 'Wizard Robes II', type: 'armor', spriteKey: 'armor/broad_armor_wizard_2', cost: 50, description: 'Mage robes' },
  { id: 'armor_wizard_3', name: 'Wizard Robes III', type: 'armor', spriteKey: 'armor/broad_armor_wizard_3', cost: 100, description: 'Archmage vestments' },
  { id: 'armor_wizard_4', name: 'Wizard Robes IV', type: 'armor', spriteKey: 'armor/broad_armor_wizard_4', cost: 200, description: 'Sorcerer robes' },
  { id: 'armor_wizard_5', name: 'Wizard Robes V', type: 'armor', spriteKey: 'armor/broad_armor_wizard_5', cost: 400, description: 'Legendary wizard robes' },
  
  // Helmets
  { id: 'head_warrior_1', name: 'Warrior Helm I', type: 'head', spriteKey: 'head/head_warrior_1', cost: 15, description: 'Basic warrior helmet' },
  { id: 'head_warrior_2', name: 'Warrior Helm II', type: 'head', spriteKey: 'head/head_warrior_2', cost: 30, description: 'Reinforced helm' },
  { id: 'head_warrior_3', name: 'Warrior Helm III', type: 'head', spriteKey: 'head/head_warrior_3', cost: 60, description: 'Champion helm' },
  { id: 'head_warrior_4', name: 'Warrior Helm IV', type: 'head', spriteKey: 'head/head_warrior_4', cost: 120, description: 'Elite helm' },
  { id: 'head_warrior_5', name: 'Warrior Helm V', type: 'head', spriteKey: 'head/head_warrior_5', cost: 250, description: 'Legendary helm' },
  
  { id: 'head_rogue_1', name: 'Rogue Hood I', type: 'head', spriteKey: 'head/head_rogue_1', cost: 15, description: 'Shadow hood' },
  { id: 'head_rogue_2', name: 'Rogue Hood II', type: 'head', spriteKey: 'head/head_rogue_2', cost: 30, description: 'Assassin cowl' },
  { id: 'head_rogue_3', name: 'Rogue Hood III', type: 'head', spriteKey: 'head/head_rogue_3', cost: 60, description: 'Nightstalker hood' },
  
  { id: 'head_healer_1', name: 'Healer Crown I', type: 'head', spriteKey: 'head/head_healer_1', cost: 15, description: 'Acolyte circlet' },
  { id: 'head_healer_2', name: 'Healer Crown II', type: 'head', spriteKey: 'head/head_healer_2', cost: 30, description: 'Priest crown' },
  { id: 'head_healer_3', name: 'Healer Crown III', type: 'head', spriteKey: 'head/head_healer_3', cost: 60, description: 'Divine halo' },
  
  { id: 'head_wizard_1', name: 'Wizard Hat I', type: 'head', spriteKey: 'head/head_wizard_1', cost: 15, description: 'Apprentice hat' },
  { id: 'head_wizard_2', name: 'Wizard Hat II', type: 'head', spriteKey: 'head/head_wizard_2', cost: 30, description: 'Mage hat' },
  { id: 'head_wizard_3', name: 'Wizard Hat III', type: 'head', spriteKey: 'head/head_wizard_3', cost: 60, description: 'Archmage hat' },
];
