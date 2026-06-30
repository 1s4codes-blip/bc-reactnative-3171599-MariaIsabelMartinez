# Proyecto Semana 06 — Formularios con React Hook Form + Zod

**Empresa de Importación** — Gestión de productos importados (proveedores, productos, envíos, aduanas)

## 🎯 Objetivo

Implementar formularios Create y Edit con validación Zod para el dominio de una **empresa de importación**, donde se gestionan productos con nombre, descripción, precio unitario y país de origen.

## 📋 Dominio Asignado

| Concepto | Descripción |
|----------|-------------|
| **Producto** | Bien importado (electrónica, autopartes, alimentos, textiles) |
| **Proveedor** | Empresa extranjera que suministra el producto |
| **Envío** | Logística de importación con seguimiento de estado |
| **Aduana** | Registro de despacho y estatus aduanero |

## 🗂️ Estructura del Proyecto

```
starter/
├── index.js                          — Entry point (registerRootComponent)
├── App.tsx                           — QueryClientProvider + NavigationContainer
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── data/
    │   └── mockProducts.ts           — 8 productos mock en español del dominio importación
    ├── navigation/
    │   ├── types.ts                  — RootStackParamList (Home, Create, Edit)
    │   └── RootNavigator.tsx         — Stack: Home → Create (modal) | Home → Edit
    ├── schemas/
    │   └── itemSchema.ts             — productSchema con Zod: name, description, price, originCountry
    ├── components/
    │   └── FormField.tsx             — Controller + TextInput + mensaje de error (genérico)
    ├── screens/
    │   ├── HomeScreen.tsx            — FlatList de productos con pull-to-refresh
    │   ├── CreateScreen.tsx          — Formulario crear producto con useForm + Zod + mutation
    │   └── EditScreen.tsx            — Formulario editar con reset() + useProductById
    ├── hooks/
    │   └── useItems.ts              — useProducts, useProductById, useCreateProduct, useUpdateProduct
    ├── services/
    │   └── api.ts                    — Axios instance (no utilizado actualmente)
    ├── types/
    │   └── index.ts                  — Product, CreateProductPayload, UpdateProductPayload
    └── theme/
        └── index.ts                  — Colores, tipografía, espaciado
```

## ✅ Requisitos Funcionales Cumplidos

1. **`FormField` genérico** — Componente que encapsula `Controller` + `TextInput` + mensaje de error. Reutilizado en CreateScreen y EditScreen con tipado genérico `T extends FieldValues`.
2. **`CreateScreen`** — Formulario con 4 campos (`name`, `description`, `price`, `originCountry`), validación Zod con `zodResolver`, mutation con `useCreateProduct`, navega atrás en `onSuccess`.
3. **`EditScreen`** — Mismo formulario con `defaultValues` cargados desde `useProductById`. Usa `reset()` en `useEffect` cuando llegan los datos del servidor mock.
4. **Validación activa** — Errores visibles bajo cada campo incorrecto al intentar enviar (nombre requerido, precio > 0, país requerido).
5. **Estado de carga** — Botón deshabilitado y `ActivityIndicator` durante `isSubmitting` / `isPending`.

## 📐 Schema Zod

```typescript
export const productSchema = z.object({
  name: z.string().min(1, 'El nombre del producto es requerido').max(80, 'Máx. 80 caracteres'),
  description: z.string().max(500, 'Máx. 500 caracteres').optional().or(z.literal('')),
  price: z.coerce.number({ invalid_type_error: 'El precio debe ser un número' }).positive('El precio debe ser mayor que 0'),
  originCountry: z.string().min(1, 'El país de origen es requerido').max(60, 'Máx. 60 caracteres'),
});
```

## 🚀 Cómo ejecutar

```bash
# Opción 1: Directo (requiere path sin saltos de línea)
cd starter
pnpm install
pnpm web

# Opción 2: Desde /tmp (recomendado si el path contiene caracteres especiales)
rsync -a --exclude='node_modules' ./starter/ /tmp/expo-project
cd /tmp/expo-project
pnpm install
pnpm web
```

La app se abre en `http://localhost:8081`.

## 📸 Evidencias (capturas de pantalla)

1. **HomeScreen** — Lista de 8 productos importados con nombres en español (Sensor IoT 3000, Panel Solar 450W, Café Arábica Premium, etc.)
2. **CreateScreen** — Formulario vacío con los 4 campos del dominio (Nombre, Descripción, Precio, País de origen)
3. **Validación Zod** — Mensajes de error en rojo bajo cada campo al enviar el formulario vacío
4. **EditScreen** — Formulario precargado con los datos del producto seleccionado
5. **Guardar cambios** — Redirección a la lista después de editar un producto

## 🛠️ Tecnologías

- React Native 0.79 + Expo SDK 53
- React Hook Form 7.72 + Zod 3.25
- `@hookform/resolvers` (zodResolver)
- TanStack Query 5.74
- React Navigation 7 (NativeStack)
- react-native-web 0.20 (despliegue web)

## 📊 Criterios de Evaluación

Ver [../../rubrica-evaluacion.md](../../rubrica-evaluacion.md)
