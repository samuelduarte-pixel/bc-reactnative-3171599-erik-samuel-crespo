# 🏥 Clínica de Fertilidad — Semana 03

**Estudiante:** Erik Samuel Crespo Duarte  
**Código:** 3171599  
**Bootcamp:** bc-reactnative  
**Dominio asignado:** Clínica de Fertilidad  
**Recursos:** Patients, Treatments, Doctors, Cycles

---

## 📋 Descripción del Dominio

Mi dominio es la gestión de una clínica de fertilidad especializada en tratamientos reproductivos y seguimiento médico de pacientes. La app permite administrar los cuatro recursos principales:

- **Patients** — Pacientes registrados con información personal, edad y estado del tratamiento.
- **Treatments** — Tratamientos de fertilidad disponibles, con tipo, duración y costo en COP.
- **Doctors** — Especialistas médicos con licencia, especialidad y años de experiencia.
- **Cycles** — Ciclos reproductivos y procesos de fertilización con fechas y etapa actual.

---

## 📱 Descripción de las Pantallas

### Pantalla Principal (HomeScreen)

- **Header** con el nombre de la clínica y subtítulo.
- **Barra de búsqueda** que filtra en tiempo real por nombre y descripción.
- **Contador de resultados** que muestra cuántos items coinciden con la búsqueda.
- **Lista (FlatList)** con 12 items representando los 4 tipos de recursos (3 de cada uno).
- **Estado vacío** con emoji 🧬 y mensaje orientativo cuando no hay resultados.

### Tarjeta (ItemCard)

Cada tarjeta muestra:
- Emoji identificador por tipo: 👩‍⚕️ Doctor · 🧑‍🤝‍🧑 Paciente · 💉 Tratamiento · 🧬 Ciclo
- Nombre y descripción del elemento.
- Badge de estado con color semántico (success/warning/error/info).
- Campos específicos según el tipo:
  - **Paciente:** ID, Edad
  - **Tratamiento:** Categoría, Duración, Costo (COP)
  - **Doctor:** Especialidad, Experiencia, Licencia
  - **Ciclo:** Paciente, Etapa, Fecha de inicio
- Etiqueta de tipo al pie de la tarjeta.

---

## 💡 Decisiones de Diseño

### 1. Interfaz unificada con campo `type`
Se usa una sola interfaz `Item` con un campo discriminador `type`. Esto permite manejar los 4 recursos en un único array de `FlatList` sin duplicar lógica.

### 2. Filtrado por nombre y descripción
La búsqueda filtra tanto por `name` como por `description`, permitiendo encontrar elementos con palabras clave del dominio médico.

### 3. Badges con colores semánticos del theme
Se usan `COLORS.success`, `COLORS.warning`, `COLORS.error` e `COLORS.info` para representar visualmente el estado de cada elemento.

### 4. Emojis como iconos nativos
Sin librerías externas; los emojis representan cada tipo de recurso de forma compatible con iOS y Android.

### 5. Formato de costos en COP
Los costos se formatean con `toLocaleString('es-CO')` para mostrar pesos colombianos correctamente.

### 6. Tema oscuro
Mantiene el tema oscuro del starter con acento rosa (`#F472B6`) coherente con el dominio médico femenino/reproductivo.

---

## 🚀 Cómo ejecutar

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar Expo
pnpm start

# 3. Escanear QR con Expo Go en el celular
#    o presionar 'i' para iOS simulator / 'a' para Android emulator
```

---

## ✅ Checklist de requisitos

| Criterio | ✅ |
|---|---|
| FlatList con `keyExtractor` por ID | ✅ |
| TextInput con búsqueda funcional en tiempo real | ✅ |
| `useMemo` para filtrado | ✅ |
| `useCallback` para `renderItem` y `renderEmpty` | ✅ |
| Componente `ItemCard` con 3+ campos | ✅ |
| Estado vacío personalizado | ✅ |
| `KeyboardAvoidingView` correcto | ✅ |
| `ItemSeparatorComponent` | ✅ |
| Constantes de tema (`COLORS`, `TYPOGRAPHY`, `SPACING`) | ✅ |
| TypeScript estricto — sin `any` | ✅ |
| Mínimo 10 items en `mockData.ts` (hay 12) | ✅ |