# Semana 05 — Networking con TanStack Query

## Clínica de Fertilidad — Pacientes desde API

### Dominio asignado
**Clínica de fertilidad** con entidades: patients, treatments, doctors, cycles.

### Funcionalidades implementadas

1. **Cliente Axios** (`api.ts`) — Configuracion base con baseURL, headers, interceptors y timeout

2. **Hooks TanStack Query** (`usePatients.ts`):
   - `usePatients()` — useQuery para listar pacientes
   - `usePatientById(id)` — useQuery para detalle de un paciente
   - `useCreatePatient()` — useMutation para crear paciente con invalidacion de cache
   - `useDeletePatient()` — useMutation para eliminar paciente

3. **HomeScreen** — Lista de pacientes con pull-to-refresh, loading, error y empty states

4. **DetailScreen** — Detalle del paciente consumido desde la API

5. **CreateScreen** — Formulario para crear paciente con useMutation

### Prácticas completadas

- **Ejercicio 01 — useQuery básico**: App que conecta a JSONPlaceholder con useQuery, muestra lista de usuarios con loading, error y pull-to-refresh
- **Ejercicio 02 — useMutation**: App con creación y eliminación de posts usando useMutation + invalidación de caché

### Cómo ejecutar

**Ejercicios:**
```bash
cd 2-practicas/ejercicio-01-usequery/starter
pnpm install
pnpm start
```

**Proyecto principal:**
```bash
cd starter
pnpm install
pnpm start
```

### Estructura del proyecto

```
week-05-networking_tanstack_query/
├── README.md
├── 2-practicas/
│   ├── ejercicio-01-usequery/
│   │   └── starter/App.tsx          ← useQuery + Axios + pull-to-refresh
│   └── ejercicio-02-usemutation/
│       └── starter/App.tsx          ← useMutation + cache invalidation
└── starter/
    ├── App.tsx
    ├── src/
    │   ├── hooks/
    │   │   └── usePatients.ts       ← useQuery + useMutation
    │   ├── navigation/
    │   │   ├── RootNavigator.tsx    ← Stack Navigator
    │   │   └── types.ts
    │   ├── screens/
    │   │   ├── HomeScreen.tsx       ← lista con pull-to-refresh
    │   │   ├── DetailScreen.tsx     ← detalle desde API
    │   │   └── CreateScreen.tsx     ← crear con useMutation
    │   ├── services/
    │   │   └── api.ts               ← cliente Axios
    │   ├── types/
    │   │   └── index.ts
    │   └── theme/
    │       └── index.ts
```

### Tecnologías
- React Native 0.79 + Expo 53
- TanStack Query v5 (useQuery, useMutation, invalidateQueries)
- Axios (cliente HTTP)
- React Navigation 7 (Stack Navigator)
- TypeScript estricto
