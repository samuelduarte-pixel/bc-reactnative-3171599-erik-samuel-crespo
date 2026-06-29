# Ejercicio 01 — useQuery Basico

## Objetivo

Conectar React Native a una API externa usando `useQuery` de TanStack Query v5 y Axios, mostrar datos en una lista con pull-to-refresh.

## Cómo ejecutar

```bash
cd starter
pnpm install
pnpm start
```

---

## Paso 1 — Configurar QueryClientProvider

El `QueryClientProvider` debe envolver toda la app. Ya esta configurado en `App.tsx`.

## Paso 2 — Crear el cliente Axios y el hook useQuery

En `App.tsx` descomenta las secciones PASO 2 y PASO 3 para crear el cliente Axios y el hook `useUsers`.

```tsx
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await apiClient.get<User[]>('/users?_limit=10');
      return data;
    },
  });
}
```

## Paso 3 — Consumir el hook en el componente

Descomenta las lineas que usan `useUsers()` en `UserListScreen`.

## Paso 4 — Pull-to-refresh

Usa `refetch` y `isFetching` para implementar pull-to-refresh en el FlatList.

---

## Validacion

- La lista muestra 10 usuarios de JSONPlaceholder
- Pull-to-refresh funciona correctamente
- Se muestra loading mientras se cargan los datos
- Se muestra error si la peticion falla con boton reintentar
