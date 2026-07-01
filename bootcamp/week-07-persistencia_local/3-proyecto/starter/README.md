# Proyecto Semana 07 — Persistencia Local

**Dominio**: Importaciones — Gestión de productos de importación con seguimiento de envíos.

## Descripción

App para registrar y visualizar productos importados, con persistencia local mediante tres estrategias de almacenamiento:

1. **MMKV** — Preferencias del usuario (orden de lista, modo compacto, items por página)
2. **AsyncStorage** — Caché offline de productos (muestra datos guardados sin conexión)
3. **Expo SecureStore** — Almacenamiento cifrado del código de aduana (dato sensible)

## Funcionalidades

- Lista de productos importados con ordenamiento dinámico (nombre, precio, origen, estado)
- Vista compacta que muestra menos información por producto
- Banner offline cuando se muestran datos cacheados sin conexión
- Formulario de registro de nuevos productos con validación (React Hook Form + Zod)
- Pantalla de ajustes con preferencias persistentes en tiempo real
- Almacenamiento seguro de código de acceso aduanal con SecureStore (valor enmascarado en pantalla)

## Tecnologías

| Librería | Uso |
|----------|-----|
| React Native 0.79 + Expo 53 | Framework |
| react-native-mmkv | Almacenamiento síncrono de preferencias |
| @react-native-async-storage/async-storage | Caché offline de productos |
| expo-secure-store | Almacenamiento cifrado de datos sensibles |
| @tanstack/react-query | Data fetching con caché y revalidación |
| react-hook-form + zod | Formularios con validación tipada |
| @react-navigation/native-stack | Navegación por pilas |
| axios | Cliente HTTP contra JSONPlaceholder |

## Compatibilidad Web

El proyecto incluye polyfills para ejecutarse en navegador:

- `src/storage/mmkv.web.ts` — mock de MMKV usando localStorage
- `src/hooks/usePreferences.web.ts` — hooks reactivos para web
- SecureStore con fallback a localStorage en web

## Cómo ejecutar

```bash
# Instalar dependencias
pnpm install

# Build nativo (MMKV requiere compilación nativa)
npx expo run:ios
npx expo run:android

# Web (con polyfills)
npx expo start --web
```

## Estructura del proyecto

```
starter/
├── App.tsx                          # Entry point
├── src/
│   ├── storage/
│   │   ├── mmkv.ts                  # Instancia MMKV global
│   │   └── mmkv.web.ts              # Polyfill web (localStorage)
│   ├── types/
│   │   └── index.ts                 # Product, ShipmentStatus, SortBy
│   ├── theme/
│   │   └── index.ts                 # Colores oscuros, espaciado, tipografía
│   ├── services/
│   │   └── api.ts                   # Axios + mapeo a datos en español
│   ├── schemas/
│   │   └── productSchema.ts         # Zod schema para formulario
│   ├── components/
│   │   └── FormField.tsx            # Input reutilizable con RHF
│   ├── hooks/
│   │   ├── useProducts.ts           # TanStack Query + AsyncStorage caché
│   │   ├── usePreferences.ts        # MMKV hooks reactivos
│   │   └── usePreferences.web.ts    # Polyfill web
│   ├── navigation/
│   │   ├── types.ts                 # RootStackParamList
│   │   └── RootNavigator.tsx        # Stack navigator (Home/Create/Settings)
│   └── screens/
│       ├── HomeScreen.tsx           # Lista con orden, modo compacto, banner offline
│       ├── CreateScreen.tsx         # Formulario de registro
│       └── SettingsScreen.tsx       # Preferencias MMKV + SecureStore
```

## Evidencias

1. HomeScreen con lista de productos y estado de envío visible
2. Modo compacto activado desde Settings
3. Banner offline mostrando datos cacheados sin conexión
4. SettingsScreen con preferencias MMKV (orden, dirección, compacto, items por página)
5. SecureStore: guardar/leer código de aduana con valor enmascarado
6. Formulario CreateScreen con validación
