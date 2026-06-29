# Ejercicio 02 — useMutation

## Objetivo

Crear y eliminar registros usando `useMutation` de TanStack Query v5, manejar estados de carga, y actualizar el cache con `invalidateQueries`.

## Cómo ejecutar

```bash
cd starter
pnpm install
pnpm start
```

---

## Paso 1 — useQuery para listar posts

Usa `useQuery` para obtener la lista de posts desde JSONPlaceholder.

```tsx
function usePosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await apiClient.get<Post[]>('/posts?_limit=10');
      return data;
    },
  });
}
```

## Paso 2 — useMutation para crear post

```tsx
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
```

## Paso 3 — useMutation para eliminar post

```tsx
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
```

## Paso 4 — Deshabilitar botones mientras isPending

Usa `isPending` de cada mutation para deshabilitar los botones mientras se ejecuta la accion.

---

## Validacion

- La lista muestra posts de JSONPlaceholder
- Crear post agrega uno nuevo y refresca la lista
- Eliminar post lo quita de la lista
- Los botones se deshabilitan mientras la mutation esta en curso
- Loading states funcionan correctamente
