import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HabitsScreen, DailiesScreen, TodosScreen } from '../screens';
import { StatsBar } from '../components';
import { COLORS, FONT_SIZES } from '../constants/theme';

const Tab = createMaterialTopTabNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container} edges={['top']}>
          <View style={styles.header}>
            <StatsBar />
          </View>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: styles.tabBar,
              tabBarLabelStyle: styles.tabLabel,
              tabBarIndicatorStyle: styles.tabIndicator,
              tabBarActiveTintColor: COLORS.text,
              tabBarInactiveTintColor: COLORS.textMuted,
            }}
          >
            <Tab.Screen name="Habits" component={HabitsScreen} />
            <Tab.Screen name="Dailies" component={DailiesScreen} />
            <Tab.Screen name="To-Dos" component={TodosScreen} />
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.surface,
  },
  tabBar: {
    backgroundColor: COLORS.surface,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    textTransform: 'none',
  },
  tabIndicator: {
    backgroundColor: COLORS.primary,
    height: 3,
  },
});
