# Semana 04 — Estado Global con Zustand

> **Fase 2 — Core RN** | Semana 4 de 18 | ⏱️ 8 horas
> **Dominio**: Empresa de Importación (suppliers, products, shipments, customs)

## 🎯 Objetivos de aprendizaje

Al finalizar esta semana, el estudiante será capaz de:

- ✅ Crear stores Zustand con estado y acciones tipadas en TypeScript
- ✅ Consumir stores en componentes usando selectores para optimizar re-renders
- ✅ Aplicar el patrón de slices para escalar stores complejos
- ✅ Persistir estado entre sesiones con el middleware `persist` y AsyncStorage
- ✅ Distinguir qué estado va en Zustand vs `useState` local
- ✅ Combinar Zustand con React Navigation (badge dinámico, estado compartido)

## 📚 Requisitos previos

- Semana 03 completada (React Navigation — Stack, Tab, navegación tipada)
- Conocimiento de hooks `useState` y `useEffect`
- TypeScript básico (interfaces, genéricos, tipos de unión)

## 🗂️ Estructura de la semana

| Carpeta | Contenido | Tiempo |
|---|---|---|
| `1-teoria/` | Zustand fundamentos + slices y persist | 2h |
| `2-practicas/` | Store básico · Persist middleware | 3h |
| `3-proyecto/` | App de importación usando Zustand | 3h |

## 📝 Contenidos

### Teoría

| Archivo | Tema |
|---|---|
| [01-zustand-fundamentos.md](1-teoria/01-zustand-fundamentos.md) | `create()`, estado, acciones, selectores, TypeScript |
| [02-zustand-slices-persist.md](1-teoria/02-zustand-slices-persist.md) | Patrón slices, múltiples stores, middleware `persist` |

### Diagramas

| Archivo | Descripción |
|---|---|
| [01-zustand-store-flow.svg](0-assets/01-zustand-store-flow.svg) | Flujo de datos: componentes ↔ store ↔ acciones |
| [02-zustand-vs-context.svg](0-assets/02-zustand-vs-context.svg) | Comparativa Zustand vs Context API |

### Prácticas

| Ejercicio | Tema |
|---|---|
| [ejercicio-01-store-basico](2-practicas/ejercicio-01-store-basico/) | Crear store, acciones y selectores (Supplier + ShipmentItem) |
| [ejercicio-02-persist-middleware](2-practicas/ejercicio-02-persist-middleware/) | Persistir trámites aduaneros con AsyncStorage |

### Proyecto

| Archivo | Descripción |
|---|---|
| [3-proyecto/README.md](3-proyecto/README.md) | App de importación con productos, envíos y aduanas (Zustand) |
| [3-proyecto/starter/](3-proyecto/starter/) | Código inicial con TODOs |

## ⏱️ Distribución del tiempo (8 horas)

| Actividad | Tiempo | Descripción |
|---|---|---|
| Teoría 01 | 1h | Zustand fundamentos y selectores |
| Teoría 02 | 1h | Slices y persist middleware |
| Ejercicio 01 | 1.5h | Store básico: proveedores + productos en vivo |
| Ejercicio 02 | 1.5h | Persist con AsyncStorage (trámites aduaneros) |
| Proyecto | 3h | App importación con Zustand completo |

## 📌 Entregables

- [ ] Ejercicio 01: store con calificación de proveedores y lista de productos funcionando
- [ ] Ejercicio 02: store que persiste trámites aduaneros entre reinicios de la app
- [ ] Proyecto: app con Tab Navigator + Zustand store adaptado al dominio de importación
- [ ] App corriendo en simulador iOS y/o Android sin errores TypeScript

## 🔗 Navegación

[← Semana 03 — React Navigation 7](../week-03-react_navigation/README.md) | [Semana 05 — Networking y TanStack Query v5 →](../week-05-networking_tanstack_query/README.md)
