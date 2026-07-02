# Proyecto Semana 07 — Persistencia Local

## 🎯 Objetivo

Agregar una **capa de persistencia completa** a la app de la Clínica de Fertilidad:

1. **MMKV** — preferencias del usuario (orden de lista, modo compacto, filtro por tratamiento, pacientes por página)
2. **AsyncStorage** — caché offline de la lista de pacientes (mostrar datos sin red)
3. **Expo SecureStore** — almacenar un token de sesión simulado (dato sensible)

---

## 📋 Dominio Asignado

**Clínica de Fertilidad** — Erik Samuel Crespo Duarte (3171599)

Entidades:
- **Pacientes**: nombre, edad, diagnóstico, tratamiento, ciclo, médico asignado
- **Tratamientos**: IVF, IUI, FET, ICSI, Ovodonación, Estimulación ovárica
- **Estados de ciclo**: Activo, En espera, Completado, Cancelado
- **Médicos**: Dra. María Andrade, Dr. Carlos Méndez, Dra. Lucía Vega, Dr. Felipe Rojas

---

## 🗂️ Estructura del Starter

```
starter/
├── App.tsx                      # Entry point — QueryClient + Navigation
├── app.json                     # Config Expo
├── package.json                 # Dependencias (MMKV, AsyncStorage, SecureStore)
├── tsconfig.json
└── src/
    ├── storage/
    │   └── mmkv.ts              # ✅ Instancia MMKV global
    ├── types/
    │   └── index.ts             # Tipos del dominio (Patient, TreatmentType, CycleStatus)
    ├── theme/
    │   └── index.ts             # Colores, espaciado
    ├── data/
    │   └── patientData.ts       # Datos mock de pacientes
    ├── services/
    │   └── api.ts               # Axios + funciones API
    ├── schemas/
    │   └── patientSchema.ts     # Zod schema para formularios
    ├── components/
    │   └── FormField.tsx        # Componente reutilizable
    ├── hooks/
    │   ├── usePatients.ts       # TanStack Query + caché AsyncStorage ✅
    │   └── usePreferences.ts    # MMKV hooks ✅
    ├── navigation/
    │   ├── types.ts
    │   └── RootNavigator.tsx   # Home / Create / Settings
    └── screens/
        ├── HomeScreen.tsx       # Lista + banner offline + preferencias ✅
        ├── CreateScreen.tsx     # Formulario de creación ✅
        └── SettingsScreen.tsx   # MMKV + SecureStore ✅
```

---

## 🚀 Cómo ejecutar

```bash
cd starter
pnpm install

# Requiere build nativo (MMKV)
npx expo start
```

---

## ✅ Requisitos Funcionales Implementados

### 1. Hook `usePreferences` (MMKV)

- ✅ Exporta 4 preferencias: `sortOrder`, `compactMode`, `itemsPerPage`, `filterTreatment`
- ✅ Usa `useMMKVString`, `useMMKVBoolean`, `useMMKVNumber` (reactivos)
- ✅ Las preferencias persisten sin `async/await` y sin reiniciar la app

### 2. Caché offline en `usePatients` (AsyncStorage)

- ✅ Guarda los pacientes en caché cuando hay red exitosa
- ✅ Carga desde caché cuando la llamada de red falla
- ✅ `HomeScreen` muestra un banner "⚠️ Sin red" cuando se usa caché

### 3. `SettingsScreen` (MMKV + SecureStore)

- ✅ Muestra switches/pickers para cada preferencia de `usePreferences`
- ✅ Persiste los cambios en tiempo real (sin botón de "Guardar")
- ✅ Incluye sección "Token de sesión": botón para guardar/leer/eliminar con SecureStore
- ✅ El token sensible NO aparece en texto plano (solo enmascarado)

### 4. `HomeScreen` actualizado

- ✅ Aplica `sortOrder` de `usePreferences` para ordenar la lista (A→Z / Z→A)
- ✅ Aplica `compactMode` para cambiar la UI (menos info en modo compacto)
- ✅ Aplica `filterTreatment` para filtrar por tipo de tratamiento
- ✅ Muestra pacientes cacheados con banner visible cuando offline
- ✅ Muestra contador y estado actual de preferencias

---

## 📊 Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| `usePreferences` con MMKV (mín. 3 preferencias) | 25 |
| Caché offline con AsyncStorage + banner | 25 |
| `SettingsScreen` con MMKV + SecureStore | 25 |
| `HomeScreen` con preferencias aplicadas | 15 |
| Código limpio, tipos correctos, sin `any` | 10 |
| **Total** | **100** |
