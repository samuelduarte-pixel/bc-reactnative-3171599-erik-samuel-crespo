// App.tsx — Ejercicio 02: useMutation
// Crear y eliminar posts con useMutation + cache invalidation
//
// INSTRUCCIONES: Descomenta los PASOx en orden.

import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ListRenderItem,
} from 'react-native';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ============================================================
// PASO 1 — Crear cliente Axios
// ============================================================

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

// ============================================================
// PASO 1 — Interfaz y hook usePosts
// ============================================================

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

type CreatePostPayload = Omit<Post, 'id'>;

function usePosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await apiClient.get<Post[]>('/posts?_limit=10');
      return data;
    },
  });
}

// ============================================================
// PASO 2 — hook useCreatePost
// ============================================================

function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation<Post, Error, CreatePostPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<Post>('/posts', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// ============================================================
// PASO 3 — hook useDeletePost
// ============================================================

function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

const queryClient = new QueryClient();

function PostsScreen(): React.JSX.Element {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // PASO 1 — Consumir usePosts (descomenta):
  const { isLoading, data, refetch, isFetching } = usePosts();

  // PASO 2 — Consumir useCreatePost (descomenta):
  const { isPending: isCreating, mutate: createPost } = useCreatePost();

  // PASO 3 — Consumir useDeletePost (descomenta):
  const { isPending: isDeleting, mutate: deletePost } = useDeletePost();

  function handleCreate(): void {
    if (!title.trim()) return;
    createPost({ userId: 1, title: title.trim(), body: body.trim() });
    setTitle('');
    setBody('');
  }

  const canCreate = title.trim().length > 0 && !isCreating;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#61DAFB" />
        <Text style={styles.loadingText}>Cargando posts...</Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<Post> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardBody} numberOfLines={2}>{item.body}</Text>
      <Pressable
        style={[styles.deleteBtn, isDeleting && { opacity: 0.5 }]}
        onPress={() => deletePost(item.id)}
        disabled={isDeleting}
      >
        <Text style={styles.deleteText}>Eliminar</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Formulario para crear */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Titulo del post..."
          placeholderTextColor="#6e7681"
        />
        <TextInput
          style={[styles.input, styles.inputBody]}
          value={body}
          onChangeText={setBody}
          placeholder="Contenido..."
          placeholderTextColor="#6e7681"
          multiline
        />
        <Pressable
          style={[styles.createBtn, !canCreate && { opacity: 0.5 }]}
          onPress={handleCreate}
          disabled={!canCreate}
        >
          {isCreating ? (
            <ActivityIndicator size="small" color="#0d1117" />
          ) : (
            <Text style={styles.createText}>Crear post</Text>
          )}
        </Pressable>
      </View>

      {/* Lista de posts */}
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={() => refetch()}
        refreshing={isFetching && !isLoading}
      />
    </View>
  );
}

export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ejercicio 02 — useMutation</Text>
        <PostsScreen />
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
  loadingText: {
    color: '#8b949e',
  },
  container2: {
    flex: 1,
  },
  form: {
    padding: 16,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  input: {
    backgroundColor: '#161b22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#30363d',
    padding: 12,
    color: '#e6edf3',
    fontSize: 14,
  },
  inputBody: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  createBtn: {
    backgroundColor: '#61DAFB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  createText: {
    color: '#0d1117',
    fontWeight: '600',
    fontSize: 14,
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
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e6edf3',
  },
  cardBody: {
    fontSize: 13,
    color: '#8b949e',
  },
  deleteBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#f8514922',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#f85149',
  },
  deleteText: {
    color: '#f85149',
    fontSize: 12,
    fontWeight: '600',
  },
});
