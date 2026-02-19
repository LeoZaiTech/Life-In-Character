import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAllHabits } from '../store/habits/habitsSelectors';
import { addHabit, incrementHabit, decrementHabit, deleteHabit } from '../store/habits/habitsSlice';
import { completePositiveHabit, completeNegativeHabit } from '../store/player/playerSlice';
import { HabitCard, AddButton } from '../components';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { Habit } from '../types';

export const HabitsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const habits = useAppSelector(selectAllHabits);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [positive, setPositive] = useState(true);
  const [negative, setNegative] = useState(true);

  const handleAddHabit = () => {
    if (title.trim()) {
      dispatch(addHabit({ title: title.trim(), notes: notes.trim() || undefined, positive, negative }));
      setTitle('');
      setNotes('');
      setPositive(true);
      setNegative(true);
      setModalVisible(false);
    }
  };

  const handleIncrement = (habitId: string) => {
    dispatch(incrementHabit(habitId));
    dispatch(completePositiveHabit());
  };

  const handleDecrement = (habitId: string) => {
    dispatch(decrementHabit(habitId));
    dispatch(completeNegativeHabit());
  };

  const handleDelete = (habitId: string) => {
    dispatch(deleteHabit(habitId));
  };

  const renderItem = ({ item }: { item: Habit }) => (
    <HabitCard
      habit={item}
      onIncrement={() => handleIncrement(item.id)}
      onDecrement={() => handleDecrement(item.id)}
      onPress={() => handleDelete(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <AddButton onPress={() => setModalVisible(true)} label="Add a Habit" />
      <FlatList
        data={habits}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Habit</Text>

            <TextInput
              style={styles.input}
              placeholder="Habit title"
              placeholderTextColor={COLORS.textMuted}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Notes (optional)"
              placeholderTextColor={COLORS.textMuted}
              value={notes}
              onChangeText={setNotes}
              multiline
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Positive (+)</Text>
              <Switch
                value={positive}
                onValueChange={setPositive}
                trackColor={{ false: COLORS.surfaceLight, true: COLORS.habitPositive }}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Negative (−)</Text>
              <Switch
                value={negative}
                onValueChange={setNegative}
                trackColor={{ false: COLORS.surfaceLight, true: COLORS.habitNegative }}
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleAddHabit}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingBottom: SPACING.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.md,
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  switchLabel: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.surfaceLight,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
