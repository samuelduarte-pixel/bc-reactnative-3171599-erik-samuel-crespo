# Semana 07 — Persistencia Local

## 📋 Fase 2 · Core React Native · Semana 7 de 8

**Tema:** Persistencia Local
**Duración:** 8 horas
**Dominio asignado:** Clínica de Fertilidad — Erik Samuel Crespo Duarte (3171599)

---

## 🎯 Objetivos de Aprendizaje

Al finalizar esta semana, serás capaz de:

1. Distinguir cuándo usar **MMKV**, **AsyncStorage** y **Expo SecureStore**
2. Almacenar/recuperar preferencias del usuario de forma síncrona con **MMKV**
3. Persistir datos de lista (caché offline) con **AsyncStorage**
4. Almacenar datos sensibles cifrados con **Expo SecureStore**
5. Crear hooks personalizados que encapsulen la lógica de persistencia
6. Implementar un patrón básico de **offline-first** con TanStack Query + AsyncStorage

---

## 📚 Prerrequisitos

- Completar Semana 06 (Formularios y Validación)
- Conocimientos de React Hook Form + Zod
- Familiaridad con TanStack Query (useQuery, useMutation)
- React Navigation configurado

---

## 🗂️ Estructura de la Semana

| Carpeta | Contenido | Tiempo |
|---------|-----------|--------|
| `0-assets/` | Imágenes y diagramas | — |
| `1-teoria/` | Teoría | 2h |
| `2-practicas/` | Ejercicios guiados | 3h |
| `3-proyecto/` | Proyecto integrador | 3h |
| `4-recursos/` | Recursos adicionales | — |
| `5-glosario/` | Glosario de términos | — |

---

## 📖 Contenido

### Teoría

1. [Panorama de Almacenamiento](1-teoria/01-storage-overview.md) — Comparativa de AsyncStorage, MMKV y SecureStore
2. [MMKV y SecureStore](1-teoria/02-mmkv-y-securestore.md) — Patrones avanzados: hooks MMKV y cifrado con SecureStore

### Prácticas

1. [Ejercicio 01 — AsyncStorage](2-practicas/ejercicio-01-asyncstorage/README.md) — Guardar preferencias y listas con AsyncStorage (Expo Go compatible)
2. [Ejercicio 02 — MMKV + SecureStore](2-practicas/ejercicio-02-mmkv-securestore/README.md) — MMKV síncrono + SecureStore cifrado (requiere build nativo)

### Proyecto

- [Proyecto Integrador](3-proyecto/README.md) — App de Clínica de Fertilidad con persistencia completa

---

## ⏱️ Distribución del Tiempo (8h)

| Actividad | Tiempo |
|-----------|--------|
| Teoría 01 — Panorama de Almacenamiento | 1h |
| Teoría 02 — MMKV y SecureStore | 1h |
| Ejercicio 01 — AsyncStorage | 1.5h |
| Ejercicio 02 — MMKV + SecureStore | 1.5h |
| Proyecto Integrador | 3h |

---

## ✅ Entregables

1. App funcional en simulador iOS y/o Android (requiere build nativo para MMKV)
2. `usePreferences.ts` completado con mínimo 4 preferencias MMKV
3. `usePatients.ts` con caché AsyncStorage y fallback offline
4. `SettingsScreen.tsx` completado con MMKV + SecureStore
5. `HomeScreen.tsx` con ordenamiento, filtro y banner offline

---

## 🔗 Navegación

| Semana anterior | Semana actual | Semana siguiente |
|----------------|---------------|------------------|
| [Semana 06 — Formularios](../week-06-formularios_validacion/) | **Semana 07 — Persistencia Local** | [Semana 08 — Autenticación](../week-08-autenticacion/) |

---

## ⚠️ Nota Importante

**MMKV requiere build nativo** — No funciona con Expo Go. Para desarrollo usa:

```bash
npx expo run:ios       # iOS
npx expo run:android   # Android
```
