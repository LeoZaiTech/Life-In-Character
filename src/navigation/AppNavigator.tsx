import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  HabitsScreen,
  DailiesScreen,
  TodosScreen,
  CharacterScreen,
  RewardsScreen,
  LoginScreen,
  SignupScreen,
  ProfileScreen,
} from '../screens';
import { StatsBar } from '../components';
import { COLORS, FONT_SIZES } from '../constants/theme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { initializeAuth } from '../store/auth/authSlice';

const Tab = createMaterialTopTabNavigator();

type AuthScreen = 'login' | 'signup';

const AuthNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = React.useState<AuthScreen>('login');

  if (currentScreen === 'login') {
    return <LoginScreen onNavigateToSignup={() => setCurrentScreen('signup')} />;
  }

  return <SignupScreen onNavigateToLogin={() => setCurrentScreen('login')} />;
};

const MainNavigator: React.FC = () => {
  return (
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
        <Tab.Screen name="Rewards" component={RewardsScreen} />
        <Tab.Screen name="Character" component={CharacterScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const LoadingScreen: React.FC = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

export const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const renderContent = () => {
    if (!isInitialized || isLoading) {
      return <LoadingScreen />;
    }

    if (!isAuthenticated) {
      return <AuthNavigator />;
    }

    return <MainNavigator />;
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {renderContent()}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
