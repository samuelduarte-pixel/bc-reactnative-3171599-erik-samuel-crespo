# Zustand — Fundamentos y Selectores

## Objetivos

- Entender qué problema resuelve Zustand y cuándo usarlo
- Crear un store básico con estado y acciones tipadas
- Consumir el store en componentes usando selectores optimizados

---

## 1. ¿Qué es Zustand y por qué usarlo?

En React Native, el estado puede vivir en tres lugares:

| Nivel | Herramienta | Cuándo usar |
|---|---|---|
| Local (1 componente) | `useState` | Formularios, UI temporal |
| Global (toda la app) | Zustand | Carrito, sesión de usuario, favoritos |
| Servidor | TanStack Query (semana 05) | Datos de una API |

**Zustand** es una librería de estado global minimalista. No necesita `Provider`, no usa reducers ni actions al estilo Redux, y funciona con un simple hook.

---

## 2. Crear un store básico

```tsx
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

---

## 3. Consumir el store con selectores

```tsx
const count = useCounterStore((state) => state.count);
const increment = useCounterStore((state) => state.increment);
```

---

## 4. Store con TypeScript completo

```tsx
interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}
```

---

## 5. Usar `get` para leer el store dentro de acciones

```tsx
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const { items } = get();
    const exists = items.find((i) => i.id === item.id);
    if (exists) return;
    set((state) => ({ items: [...state.items, item] }));
  },
}));
```

---

## 6. Middleware `devtools`

```tsx
import { devtools } from 'zustand/middleware';
export const useCartStore = create<CartStore>()(
  devtools((set) => ({ ... }), { name: 'CartStore' })
);
```

---

## Checklist de Verificación

- [ ] El store exporta un hook que empieza con `use`
- [ ] Todas las acciones usan `set`
- [ ] Cada componente lee solo la parte del store que necesita (selector)
- [ ] La interface TypeScript define todos los campos y acciones
- [ ] No se usa `as any`
