# Semana 04 — Estado Global con Zustand

## Clínica de Fertilidad — Pacientes en Seguimiento

### Dominio asignado
**Clínica de fertilidad** con entidades: patients, treatments, doctors, cycles.

### Funcionalidades implementadas

1. **Store Zustand `useSavedStore`** — Gestiona la lista de pacientes en seguimiento prioritario
   - `addItem(item)` — Agrega paciente (sin duplicados)
   - `removeItem(id)` — Elimina paciente por ID
   - `clearAll()` — Vacía todos los guardados
   - `isItemSaved(id)` — Verifica si un paciente está guardado

2. **HomeScreen** — Lista de 8 pacientes con botón ☆/★ para guardar/quitar directamente desde la tarjeta

3. **DetailScreen** — Vista completa del paciente con botón "Guardar"/"Guardado" conectado al store

4. **SavedScreen** — Pestaña que muestra pacientes guardados con opción de eliminar individualmente o limpiar todo

5. **Badge dinámico** — El tab "Guardados" muestra el conteo en tiempo real desde el store (sin prop drilling)

### Cómo ejecutar

```bash
cd starter
pnpm install
pnpm start
```

### Estructura del proyecto

```
starter/
├── App.tsx
├── src/
│   ├── navigation/
│   │   ├── RootNavigator.tsx    ← Tab + Stack anidado con badge
│   │   └── types.ts
│   ├── screens/
│   │   ├── HomeScreen.tsx       ← lista con botón Guardar
│   │   ├── DetailScreen.tsx     ← detalle + Guardar/Quitar
│   │   └── SavedScreen.tsx      ← pacientes guardados (desde store)
│   ├── stores/
│   │   └── savedStore.ts        ← store Zustand completo
│   ├── data/mockData.ts
│   ├── types/index.ts
│   └── theme/index.ts
```

### Tecnologías
- React Native 0.79 + Expo 53
- React Navigation 7 (Tab + Stack)
- Zustand 5 (estado global)
- TypeScript estricto
