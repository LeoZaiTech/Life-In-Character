import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addGold } from '../store/player/playerSlice';
import {
  purchaseItem,
  equipArmor,
  equipHead,
  equipWeapon,
  setActivePet,
  SHOP_ITEMS,
  ShopItem,
} from '../store/inventory/inventorySlice';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { SPRITES } from '../assets/spriteMap';
import { FontAwesome5 } from '@expo/vector-icons';

type TabType = 'shop' | 'inventory';
type FilterType = 'all' | 'armor' | 'head' | 'weapon' | 'pet';

export const RewardsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const gold = useAppSelector((state) => state.player.stats.gold);
  const ownedItems = useAppSelector((state) => state.inventory.ownedItems);
  const equippedArmor = useAppSelector((state) => state.inventory?.equippedArmor);
  const equippedHead = useAppSelector((state) => state.inventory?.equippedHead);
  const equippedWeapon = useAppSelector((state) => state.inventory?.equippedWeapon);
  const activePet = useAppSelector((state) => state.inventory?.activePet);

  const [activeTab, setActiveTab] = useState<TabType>('shop');
  const [filter, setFilter] = useState<FilterType>('all');

  const handlePurchase = (item: ShopItem) => {
    if (ownedItems.includes(item.id)) {
      Alert.alert('Already Owned', 'You already own this item!');
      return;
    }

    if (gold < item.cost) {
      Alert.alert('Not Enough Gold', `You need ${item.cost - gold} more gold to purchase this item.`);
      return;
    }

    Alert.alert(
      'Confirm Purchase',
      `Buy ${item.name} for ${item.cost} gold?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Buy',
          onPress: () => {
            dispatch(addGold(-item.cost));
            dispatch(purchaseItem(item.id));
          },
        },
      ]
    );
  };

  const handleEquip = (item: ShopItem) => {
    if (item.type === 'armor') {
      if (equippedArmor === item.id) {
        dispatch(equipArmor(undefined));
      } else {
        dispatch(equipArmor(item.id));
      }
    } else if (item.type === 'head') {
      if (equippedHead === item.id) {
        dispatch(equipHead(undefined));
      } else {
        dispatch(equipHead(item.id));
      }
    } else if (item.type === 'weapon') {
      if (equippedWeapon === item.id) {
        dispatch(equipWeapon(undefined));
      } else {
        dispatch(equipWeapon(item.id));
      }
    } else if (item.type === 'pet') {
      if (activePet === item.id) {
        dispatch(setActivePet(undefined));
      } else {
        dispatch(setActivePet(item.id));
      }
    }
  };

  const getFilteredItems = () => {
    let items = activeTab === 'shop' 
      ? SHOP_ITEMS 
      : SHOP_ITEMS.filter((item) => ownedItems.includes(item.id));

    if (filter !== 'all') {
      items = items.filter((item) => item.type === filter);
    }

    return items;
  };

  const isEquipped = (item: ShopItem) => {
    return (item.type === 'armor' && equippedArmor === item.id) ||
           (item.type === 'head' && equippedHead === item.id) ||
           (item.type === 'weapon' && equippedWeapon === item.id) ||
           (item.type === 'pet' && activePet === item.id);
  };

  const renderItem = ({ item }: { item: ShopItem }) => {
    const owned = ownedItems.includes(item.id);
    const equipped = isEquipped(item);
    const canAfford = gold >= item.cost;
    const sprite = SPRITES[item.spriteKey];

    return (
      <TouchableOpacity
        style={[
          styles.itemCard,
          equipped && styles.equippedCard,
        ]}
        onPress={() => {
          if (activeTab === 'shop' && !owned) {
            handlePurchase(item);
          } else if (owned) {
            handleEquip(item);
          }
        }}
      >
        <View style={styles.spriteContainer}>
          {sprite ? (
            <Image source={sprite} style={styles.sprite} resizeMode="contain" />
          ) : (
            <View style={styles.placeholderSprite}>
              <Text style={styles.placeholderText}>?</Text>
            </View>
          )}
        </View>
        
        <View style={styles.itemInfo}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.itemDescription} numberOfLines={1}>
            {item.description}
          </Text>
          <View style={styles.itemMeta}>
            <View style={styles.typeTag}>
              <Text style={styles.typeText}>
                {item.type === 'armor' ? '🛡️' : item.type === 'head' ? '👑' : item.type === 'weapon' ? '⚔️' : '🐾'} {item.type}
              </Text>
            </View>
            {equipped && (
              <View style={styles.equippedTag}>
                <Text style={styles.equippedText}>EQUIPPED</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.priceContainer}>
          {activeTab === 'shop' && !owned ? (
            <View style={[styles.priceTag, !canAfford && styles.cantAfford]}>
              <FontAwesome5 name="coins" size={14} color={canAfford ? COLORS.gold : COLORS.textMuted} />
              <Text style={[styles.priceText, !canAfford && styles.cantAffordText]}>
                {item.cost}
              </Text>
            </View>
          ) : owned ? (
            <View style={styles.ownedTag}>
              <Text style={styles.ownedText}>✓ OWNED</Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.goldDisplay}>
          <FontAwesome5 name="coins" size={24} color={COLORS.gold} />
          <Text style={styles.goldText}>{gold}</Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'shop' && styles.activeTab]}
          onPress={() => setActiveTab('shop')}
        >
          <Text style={[styles.tabText, activeTab === 'shop' && styles.activeTabText]}>
            🛒 Shop
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'inventory' && styles.activeTab]}
          onPress={() => setActiveTab('inventory')}
        >
          <Text style={[styles.tabText, activeTab === 'inventory' && styles.activeTabText]}>
            🎒 Inventory
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterBar}>
        {(['all', 'armor', 'head', 'weapon', 'pet'] as FilterType[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.activeFilter]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.activeFilterText]}>
              {f === 'all' ? 'All' : f === 'armor' ? '🛡️' : f === 'head' ? '👑' : f === 'weapon' ? '⚔️' : '🐾'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={getFilteredItems()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {activeTab === 'inventory' 
                ? 'No items owned yet. Visit the shop!' 
                : 'No items available'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  goldDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  goldText: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.text,
  },
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
  activeFilterText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  listContent: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  equippedCard: {
    borderColor: COLORS.success,
  },
  spriteContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.md,
  },
  sprite: {
    width: 50,
    height: 50,
  },
  placeholderSprite: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    color: COLORS.textMuted,
  },
  itemInfo: {
    flex: 1,
    gap: 4,
  },
  itemName: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  itemDescription: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: 4,
  },
  typeTag: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  typeText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs,
    textTransform: 'capitalize',
  },
  equippedTag: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  equippedText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
  },
  priceContainer: {
    marginLeft: SPACING.sm,
  },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.xs,
  },
  cantAfford: {
    opacity: 0.5,
  },
  priceText: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  cantAffordText: {
    color: COLORS.textMuted,
  },
  ownedTag: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  ownedText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
  },
});
