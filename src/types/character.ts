export type BodySize = 'slim' | 'broad';
export type HairColor = 'white' | 'brown' | 'blond' | 'red' | 'black';

export interface CharacterConfig {
  skin: string;
  size: BodySize;
  shirt: string;
  hairBase: number;
  hairBangs: number;
  hairColor: HairColor;
  hairBeard?: number;
  hairMustache?: number;
  hairFlower?: number;
  armor?: string;
  head?: string;
}

export const DEFAULT_CHARACTER: CharacterConfig = {
  skin: '915533',
  size: 'slim',
  shirt: 'blue',
  hairBase: 3,
  hairBangs: 1,
  hairColor: 'brown',
  hairBeard: 0,
  hairMustache: 0,
  hairFlower: 0,
  armor: undefined,
  head: undefined,
};

export const SKIN_OPTIONS = {
  natural: ['ddc994', 'f5a76e', 'ea8349', 'c06534', '98461a', '915533', 'c3e1dc', '6bd049'],
  rainbow: ['eb052b', 'f69922', 'f5d70f', '0ff591', '2b43f6', 'd7a9f7', '800ed0', 'rainbow'],
  animal: ['bear', 'fox', 'lion', 'panda', 'tiger', 'wolf'],
  special: ['zombie', 'skeleton', 'ghost', 'shadow', 'merblue', 'snowy', 'sugar', 'aurora'],
};

export const HAIR_COLORS: HairColor[] = ['white', 'brown', 'blond', 'red', 'black'];

export const SHIRT_COLORS = [
  'black', 'blue', 'convict', 'cross', 'fire', 'green', 'horizon',
  'ocean', 'pink', 'purple', 'rainbow', 'redblue', 'thunder',
  'tropical', 'white', 'yellow', 'zombie',
];
