# Zustand — Slices, Múltiples Stores y Persist

## Objetivos

- Aplicar el patrón de slices para organizar stores grandes
- Separar el estado en múltiples stores independientes
- Persistir estado entre sesiones con el middleware `persist`

---

## 1. Múltiples stores independientes

```tsx
export const useAuthStore = create<AuthStore>()((set) => ({ ... }));
export const useCartStore = create<CartStore>()((set) => ({ ... }));
```

---

## 2. Patrón de slices

```tsx
const createAuthSlice: StateCreator<AuthSlice & CartSlice, [], [], AuthSlice> =
  (set) => ({ user: null, setUser: (name) => set({ user: name }) });
```

---

## 3. Middleware `persist` con AsyncStorage

```tsx
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      ids: [],
      addFavorite: (id) => set((state) => ({ ids: [...state.ids, id] })),
      removeFavorite: (id) => set((state) => ({ ids: state.ids.filter((i) => i !== id) })),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## 4. `partialize` y `onRehydrateStorage`

- `partialize`: persiste solo ciertos campos
- `onRehydrateStorage`: callback cuando los datos se cargan desde AsyncStorage

---

## Checklist de Verificación

- [ ] Los stores están separados por dominio
- [ ] `persist` usa `createJSONStorage(() => AsyncStorage)`
- [ ] `partialize` excluye estados volátiles
- [ ] `onRehydrateStorage` maneja el estado de carga inicial
- [ ] El `name` de persist es único para cada store
