import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

interface TaskOptionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskOptionsMenu: React.FC<TaskOptionsMenuProps> = ({
  onEdit,
  onDelete,
}) => {
  const [visible, setVisible] = useState(false);

  const handleEdit = () => {
    setVisible(false);
    onEdit();
  };

  const handleDelete = () => {
    setVisible(false);
    onDelete();
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.menuIcon}>⋮</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleEdit}
            >
              <Text style={styles.menuItemIcon}>✏️</Text>
              <Text style={styles.menuItemText}>Edit</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleDelete}
            >
              <Text style={styles.menuItemIcon}>🗑️</Text>
              <Text style={[styles.menuItemText, styles.deleteText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.sm,
  },
  menuIcon: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    minWidth: 200,
    paddingVertical: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  menuItemIcon: {
    fontSize: FONT_SIZES.lg,
  },
  menuItemText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  deleteText: {
    color: COLORS.health,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
});

export default TaskOptionsMenu;
