import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShopItem {
  id: string;
  name: string;
  type: 'armor' | 'head' | 'weapon' | 'pet';
  spriteKey: string;
  cost: number;
  description?: string;
}

interface InventoryState {
  ownedItems: string[]; // IDs of purchased items
  equippedArmor?: string;
  equippedHead?: string;
  equippedWeapon?: string;
  activePet?: string;
}

const initialState: InventoryState = {
  ownedItems: [],
  equippedArmor: undefined,
  equippedHead: undefined,
  equippedWeapon: undefined,
  activePet: undefined,
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
    equipWeapon: (state, action: PayloadAction<string | undefined>) => {
      state.equippedWeapon = action.payload;
    },
    setActivePet: (state, action: PayloadAction<string | undefined>) => {
      state.activePet = action.payload;
    },
    unequipArmor: (state) => {
      state.equippedArmor = undefined;
    },
    unequipHead: (state) => {
      state.equippedHead = undefined;
    },
    unequipWeapon: (state) => {
      state.equippedWeapon = undefined;
    },
    dismissPet: (state) => {
      state.activePet = undefined;
    },
  },
});

export const { 
  purchaseItem, 
  equipArmor, 
  equipHead, 
  equipWeapon,
  setActivePet,
  unequipArmor, 
  unequipHead,
  unequipWeapon,
  dismissPet,
} = inventorySlice.actions;
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

  // Weapons - Class Sets
  { id: 'weapon_warrior_1', name: 'Warrior Sword I', type: 'weapon', spriteKey: 'weapon/weapon_warrior_1', cost: 20, description: 'Basic sword' },
  { id: 'weapon_warrior_2', name: 'Warrior Sword II', type: 'weapon', spriteKey: 'weapon/weapon_warrior_2', cost: 40, description: 'Steel blade' },
  { id: 'weapon_warrior_3', name: 'Warrior Sword III', type: 'weapon', spriteKey: 'weapon/weapon_warrior_3', cost: 80, description: 'Battle sword' },
  { id: 'weapon_warrior_4', name: 'Warrior Sword IV', type: 'weapon', spriteKey: 'weapon/weapon_warrior_4', cost: 160, description: 'Champion blade' },
  { id: 'weapon_warrior_5', name: 'Warrior Sword V', type: 'weapon', spriteKey: 'weapon/weapon_warrior_5', cost: 320, description: 'Legendary sword' },
  { id: 'weapon_warrior_6', name: 'Warrior Sword VI', type: 'weapon', spriteKey: 'weapon/weapon_warrior_6', cost: 500, description: 'Mythic blade' },

  { id: 'weapon_rogue_1', name: 'Rogue Dagger I', type: 'weapon', spriteKey: 'weapon/weapon_rogue_1', cost: 20, description: 'Basic dagger' },
  { id: 'weapon_rogue_2', name: 'Rogue Dagger II', type: 'weapon', spriteKey: 'weapon/weapon_rogue_2', cost: 40, description: 'Sharp blade' },
  { id: 'weapon_rogue_3', name: 'Rogue Dagger III', type: 'weapon', spriteKey: 'weapon/weapon_rogue_3', cost: 80, description: 'Assassin blade' },
  { id: 'weapon_rogue_4', name: 'Rogue Dagger IV', type: 'weapon', spriteKey: 'weapon/weapon_rogue_4', cost: 160, description: 'Shadow dagger' },
  { id: 'weapon_rogue_5', name: 'Rogue Dagger V', type: 'weapon', spriteKey: 'weapon/weapon_rogue_5', cost: 320, description: 'Legendary blade' },
  { id: 'weapon_rogue_6', name: 'Rogue Dagger VI', type: 'weapon', spriteKey: 'weapon/weapon_rogue_6', cost: 500, description: 'Mythic dagger' },

  { id: 'weapon_healer_1', name: 'Healer Staff I', type: 'weapon', spriteKey: 'weapon/weapon_healer_1', cost: 20, description: 'Acolyte staff' },
  { id: 'weapon_healer_2', name: 'Healer Staff II', type: 'weapon', spriteKey: 'weapon/weapon_healer_2', cost: 40, description: 'Priest rod' },
  { id: 'weapon_healer_3', name: 'Healer Staff III', type: 'weapon', spriteKey: 'weapon/weapon_healer_3', cost: 80, description: 'Holy staff' },
  { id: 'weapon_healer_4', name: 'Healer Staff IV', type: 'weapon', spriteKey: 'weapon/weapon_healer_4', cost: 160, description: 'Divine rod' },
  { id: 'weapon_healer_5', name: 'Healer Staff V', type: 'weapon', spriteKey: 'weapon/weapon_healer_5', cost: 320, description: 'Legendary staff' },
  { id: 'weapon_healer_6', name: 'Healer Staff VI', type: 'weapon', spriteKey: 'weapon/weapon_healer_6', cost: 500, description: 'Mythic staff' },

  { id: 'weapon_wizard_1', name: 'Wizard Wand I', type: 'weapon', spriteKey: 'weapon/weapon_wizard_1', cost: 20, description: 'Apprentice wand' },
  { id: 'weapon_wizard_2', name: 'Wizard Wand II', type: 'weapon', spriteKey: 'weapon/weapon_wizard_2', cost: 40, description: 'Mage staff' },
  { id: 'weapon_wizard_3', name: 'Wizard Wand III', type: 'weapon', spriteKey: 'weapon/weapon_wizard_3', cost: 80, description: 'Arcane rod' },
  { id: 'weapon_wizard_4', name: 'Wizard Wand IV', type: 'weapon', spriteKey: 'weapon/weapon_wizard_4', cost: 160, description: 'Sorcerer staff' },
  { id: 'weapon_wizard_5', name: 'Wizard Wand V', type: 'weapon', spriteKey: 'weapon/weapon_wizard_5', cost: 320, description: 'Legendary wand' },
  { id: 'weapon_wizard_6', name: 'Wizard Wand VI', type: 'weapon', spriteKey: 'weapon/weapon_wizard_6', cost: 500, description: 'Mythic staff' },

  // Weapons - Special/Armoire
  { id: 'weapon_battleAxe', name: 'Battle Axe', type: 'weapon', spriteKey: 'weapon/weapon_armoire_battleAxe', cost: 150, description: 'Mighty battle axe' },
  { id: 'weapon_corsairsBlade', name: "Corsair's Blade", type: 'weapon', spriteKey: 'weapon/weapon_armoire_corsairsBlade', cost: 200, description: 'Pirate cutlass' },
  { id: 'weapon_dragonKnightsLance', name: "Dragon Knight's Lance", type: 'weapon', spriteKey: 'weapon/weapon_armoire_dragonKnightsLance', cost: 300, description: 'Legendary lance' },
  { id: 'weapon_basicCrossbow', name: 'Crossbow', type: 'weapon', spriteKey: 'weapon/weapon_armoire_basicCrossbow', cost: 100, description: 'Reliable crossbow' },
  { id: 'weapon_basicLongbow', name: 'Longbow', type: 'weapon', spriteKey: 'weapon/weapon_armoire_basicLongbow', cost: 100, description: 'Elven longbow' },
  { id: 'weapon_crystalCrescentStaff', name: 'Crystal Crescent Staff', type: 'weapon', spriteKey: 'weapon/weapon_armoire_crystalCrescentStaff', cost: 250, description: 'Moonlit staff' },
  { id: 'weapon_enchantersStaff', name: "Enchanter's Staff", type: 'weapon', spriteKey: 'weapon/weapon_armoire_enchantersStaff', cost: 200, description: 'Magical staff' },

  // Pets - Common
  { id: 'pet_cat', name: 'Cat', type: 'pet', spriteKey: 'pet/Pet-Cat-Base', cost: 50, description: 'A friendly feline companion' },
  { id: 'pet_dog', name: 'Dog', type: 'pet', spriteKey: 'pet/Pet-Dog-Base', cost: 50, description: 'A loyal canine friend' },
  { id: 'pet_bunny', name: 'Bunny', type: 'pet', spriteKey: 'pet/Pet-Bunny-Base', cost: 50, description: 'A fluffy rabbit' },
  { id: 'pet_fox', name: 'Fox', type: 'pet', spriteKey: 'pet/Pet-Fox-Base', cost: 75, description: 'A clever fox' },
  { id: 'pet_owl', name: 'Owl', type: 'pet', spriteKey: 'pet/Pet-Owl-Base', cost: 75, description: 'A wise owl' },
  { id: 'pet_frog', name: 'Frog', type: 'pet', spriteKey: 'pet/Pet-Frog-Base', cost: 50, description: 'A hopping friend' },

  // Pets - Exotic
  { id: 'pet_dragon', name: 'Dragon', type: 'pet', spriteKey: 'pet/Pet-Dragon-Base', cost: 200, description: 'A fearsome dragon' },
  { id: 'pet_gryphon', name: 'Gryphon', type: 'pet', spriteKey: 'pet/Pet-Gryphon-Base', cost: 200, description: 'A noble gryphon' },
  { id: 'pet_falcon', name: 'Falcon', type: 'pet', spriteKey: 'pet/Pet-Falcon-Base', cost: 150, description: 'A swift falcon' },
  { id: 'pet_cheetah', name: 'Cheetah', type: 'pet', spriteKey: 'pet/Pet-Cheetah-Base', cost: 175, description: 'The fastest pet' },

  // Pets - Cute
  { id: 'pet_hedgehog', name: 'Hedgehog', type: 'pet', spriteKey: 'pet/Pet-Hedgehog-Base', cost: 75, description: 'A spiky friend' },
  { id: 'pet_otter', name: 'Otter', type: 'pet', spriteKey: 'pet/Pet-Otter-Base', cost: 100, description: 'A playful otter' },
  { id: 'pet_axolotl', name: 'Axolotl', type: 'pet', spriteKey: 'pet/Pet-Axolotl-Base', cost: 100, description: 'A cute axolotl' },
  { id: 'pet_ferret', name: 'Ferret', type: 'pet', spriteKey: 'pet/Pet-Ferret-Base', cost: 75, description: 'A curious ferret' },
  { id: 'pet_bearcub', name: 'Bear Cub', type: 'pet', spriteKey: 'pet/Pet-BearCub-Base', cost: 100, description: 'An adorable cub' },
  { id: 'pet_lioncub', name: 'Lion Cub', type: 'pet', spriteKey: 'pet/Pet-LionCub-Base', cost: 125, description: 'A brave little lion' },

  // Pets - Ocean
  { id: 'pet_octopus', name: 'Octopus', type: 'pet', spriteKey: 'pet/Pet-Octopus-Base', cost: 100, description: 'An eight-armed friend' },
  { id: 'pet_dolphin', name: 'Dolphin', type: 'pet', spriteKey: 'pet/Pet-Dolphin-Base', cost: 125, description: 'A playful dolphin' },
  { id: 'pet_crab', name: 'Crab', type: 'pet', spriteKey: 'pet/Pet-Crab-Base', cost: 50, description: 'A snappy crab' },
  { id: 'pet_orca', name: 'Orca', type: 'pet', spriteKey: 'pet/Pet-Orca-Base', cost: 150, description: 'A majestic orca' },

  // Pets - Quirky
  { id: 'pet_cactus', name: 'Cactus', type: 'pet', spriteKey: 'pet/Pet-Cactus-Base', cost: 50, description: 'A prickly friend' },
  { id: 'pet_jackolantern', name: "Jack-O'-Lantern", type: 'pet', spriteKey: 'pet/Pet-JackOLantern-Base', cost: 100, description: 'A spooky pumpkin' },
  { id: 'pet_egg', name: 'Mystery Egg', type: 'pet', spriteKey: 'pet/Pet-Egg-Base', cost: 25, description: 'What will hatch?' },
  { id: 'pet_flyingpig', name: 'Flying Pig', type: 'pet', spriteKey: 'pet/Pet-FlyingPig-Base', cost: 150, description: 'When pigs fly!' },
  { id: 'pet_mammoth', name: 'Mammoth', type: 'pet', spriteKey: 'pet/Pet-Mammoth-Base', cost: 175, description: 'A woolly mammoth' },
];
