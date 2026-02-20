import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CharacterConfig, DEFAULT_CHARACTER } from '../types/character';
import { getSprite } from '../assets/spriteMap';

const SPRITE_SIZE = 90;

interface CharacterAvatarProps {
  config?: CharacterConfig;
  size?: number;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  config = DEFAULT_CHARACTER,
  size = 90,
}) => {
  const scale = size / SPRITE_SIZE;
  const scaledSize = SPRITE_SIZE * scale;

  const getLayers = (): string[] => {
    const layers: string[] = [];

    layers.push(`skin/skin_${config.skin}`);
    layers.push(`shirt/${config.size}_shirt_${config.shirt}`);
    layers.push('head/head_0');

    if (config.armor) {
      layers.push(`armor/${config.size}_${config.armor}`);
    }

    if (config.hairBangs && config.hairBangs > 0) {
      layers.push(`hair/hair_bangs_${config.hairBangs}_${config.hairColor}`);
    }

    layers.push(`hair/hair_base_${config.hairBase}_${config.hairColor}`);

    if (config.hairBeard && config.hairBeard > 0) {
      layers.push(`hair/hair_beard_${config.hairBeard}_${config.hairColor}`);
    }

    if (config.hairMustache && config.hairMustache > 0) {
      layers.push(`hair/hair_mustache_${config.hairMustache}_${config.hairColor}`);
    }

    if (config.head) {
      layers.push(`head/${config.head}`);
    }

    if (config.hairFlower && config.hairFlower > 0) {
      layers.push(`hair/hair_flower_${config.hairFlower}`);
    }

    return layers;
  };

  const layers = getLayers();

  return (
    <View style={[styles.container, { width: scaledSize, height: scaledSize }]}>
      {layers.map((layer, index) => {
        const sprite = getSprite(layer);
        if (!sprite) return null;
        
        return (
          <Image
            key={`${layer}-${index}`}
            source={sprite}
            style={[
              styles.sprite,
              { width: scaledSize, height: scaledSize },
            ]}
            resizeMode="contain"
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  sprite: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default CharacterAvatar;
