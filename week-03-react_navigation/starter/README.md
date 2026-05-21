# Proyecto Semana 03 — React Navigation 7

**Estudiante:** Erik Samuel Crespo Duarte — 3171599  
**Bootcamp:** bc-reactnative

---

## 🏥 Dominio: Clínica de Fertilidad

App móvil para gestión de pacientes de una clínica de fertilidad. Permite visualizar el listado completo de pacientes, ver el detalle de cada una (diagnóstico, tratamiento, médico asignado, ciclos y próximas citas), y hacer seguimiento de las pacientes prioritarias.

---

## 📱 Pantallas

| Pantalla | Descripción |
|---|---|
| **Pacientes** (HomeList) | Lista de todas las pacientes con nombre, edad, diagnóstico, tipo de tratamiento y estado del ciclo |
| **Detalle** (HomeDetail) | Ficha completa de la paciente: diagnóstico, tratamiento, médico, número de ciclo, fecha de inicio y próxima cita |
| **Seguimiento** (Favorites) | Pacientes en seguimiento prioritario con toda la información relevante |

---

## 🗂️ Estructura del Proyecto

```
starter/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx   ← Tab Navigator + Stack anidado
    │   └── types.ts            ← RootTabParamList, HomeStackParamList
    ├── screens/
    │   ├── HomeScreen.tsx      ← FlatList de pacientes
    │   ├── DetailScreen.tsx    ← Ficha de paciente con params del Stack
    │   └── FavoritesScreen.tsx ← Pacientes en seguimiento
    ├── data/
    │   └── mockData.ts         ← 8 pacientes + 3 favoritas
    ├── types/
    │   └── index.ts            ← Interface Item del dominio
    └── theme/
        └── index.ts            ← COLORS, TYPOGRAPHY, SPACING, RADIUS
```

---

## ✅ Requisitos Implementados

- **Tab Navigator** con dos pestañas: `Pacientes` y `Seguimiento`
- **Stack anidado en Home**: navegación de lista (`HomeList`) → detalle (`HomeDetail`)
- **Params tipados**: se pasan `id`, `name`, `age`, `diagnosis`, `treatmentType`, `cycleStatus`, `assignedDoctor`, `startDate`, `nextAppointment`, `cycleNumber` y `description`
- **Iconos en el Tab Bar** con Ionicons: `people` / `people-outline` y `heart` / `heart-outline`
- **Tipado completo** con `RootTabParamList` y `HomeStackParamList`, sin ningún `any`
- **`tabBarActiveTintColor`** con `#61DAFB`
- **Títulos dinámicos** en el header del detalle usando `route.params.name`

---

## 🧬 Modelo de Datos

```ts
interface Item {
  id: string;
  name: string;               // Nombre de la paciente
  description: string;        // Descripción clínica
  age: number;                // Edad
  diagnosis: string;          // Diagnóstico médico
  treatmentType: TreatmentType;   // IVF | IUI | FET | ICSI | Ovodonación | Estimulación ovárica
  cycleStatus: CycleStatus;       // Activo | En espera | Completado | Cancelado
  assignedDoctor: string;         // Médico responsable
  startDate: string;              // Fecha de inicio del ciclo
  nextAppointment: string;        // Próxima cita
  cycleNumber: number;            // Número de ciclo actual
}
```

---

## 🚀 Cómo Ejecutar

```bash
cd starter
pnpm install
pnpm start
```

Luego seleccionar simulador iOS (`i`) o Android (`a`) en el menú de Expo CLI.

---

## 📸 Capturas de Pantalla

> Agregar capturas de las 3 pantallas (HomeList, HomeDetail, Favorites) al completar la implementación en simulador.

| Pacientes | Detalle | Seguimiento |
|---|---|---|
| _(captura)_ | _(captura)_ | _(captura)_ |