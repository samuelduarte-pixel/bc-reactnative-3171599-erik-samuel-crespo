// App.tsx — Ejercicio 01: useQuery Basico
// Conecta React Native a JSONPlaceholder con useQuery y Axios
//
// INSTRUCCIONES: Descomenta los PASOx en orden.

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// ============================================================
// PASO 2 — Crear cliente Axios
// ============================================================

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ============================================================
// PASO 2 — Definir interfaz y hook useUsers
// ============================================================

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await apiClient.get<User[]>('/users?_limit=10');
      return data;
    },
  });
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

const queryClient = new QueryClient();

function UserListScreen(): React.JSX.Element {
  // PASO 3 — Consumir el hook (descomenta):
  const { isLoading, isError, data, refetch, isFetching, error } = useUsers();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#61DAFB" />
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error al cargar</Text>
        <Text style={styles.errorDetail}>{error?.message}</Text>
        <Pressable style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const renderItem: ListRenderItem<User> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardEmail}>{item.email}</Text>
      <Text style={styles.cardPhone}>{item.phone}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      // PASO 4 — Pull-to-refresh (descomenta):
      onRefresh={() => refetch()}
      refreshing={isFetching && !isLoading}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No hay usuarios</Text>
      }
    />
  );
}

export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ejercicio 01 — useQuery</Text>
        <UserListScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e6edf3',
    padding: 16,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  list: {
    padding: 16,
  },
  separator: {
    height: 8,
  },
  card: {
    backgroundColor: '#161b22',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#30363d',
    gap: 4,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e6edf3',
  },
  cardEmail: {
    fontSize: 13,
    color: '#61DAFB',
  },
  cardPhone: {
    fontSize: 13,
    color: '#8b949e',
  },
  loadingText: {
    color: '#8b949e',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f85149',
  },
  errorDetail: {
    fontSize: 13,
    color: '#8b949e',
  },
  retryBtn: {
    backgroundColor: '#61DAFB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#0d1117',
    fontWeight: '600',
  },
  emptyText: {
    color: '#6e7681',
    textAlign: 'center',
    marginTop: 32,
  },
});
