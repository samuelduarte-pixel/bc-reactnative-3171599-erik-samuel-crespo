// src/navigation/RootNavigator.tsx
// Stack: Home → Create (modal) | Home → Settings

import React from 'react';
import { Pressable, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../theme';
import { HomeScreen } from '../screens/HomeScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const headerStyle = { backgroundColor: COLORS.background };
const headerTitleStyle = { color: COLORS.text, fontWeight: '700' as const };

export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerStyle, headerTitleStyle, headerTintColor: COLORS.accent }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Pacientes',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Create')}
              hitSlop={8}
            >
              <Text style={{ fontSize: 24, color: COLORS.accent, fontWeight: '300' }}>+</Text>
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              hitSlop={8}
              style={{ marginRight: 12 }}
            >
              <Text style={{ fontSize: 18, color: COLORS.accent }}>⚙</Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{ title: 'Nuevo paciente', presentation: 'modal' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Ajustes' }}
      />
    </Stack.Navigator>
  );
}
