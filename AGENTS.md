# Project Context

## Critical: Path contains newline character
Project root: `/home/isabel/Documentos/\nbc-reactnative/...` (literal `\n` in `Documentos/` → `bc-reactnative`)

This breaks:
- HTTP headers (`X-React-Native-Project-Root` rejects `\n`)
- Metro's internal file map (TreeFS cannot index files)

## Web testing workaround
Run from a clean path copy at `/tmp/expo-project`:
```bash
# Sync source files (no node_modules)
rsync -a --exclude='node_modules' "/home/isabel/Documentos/
bc-reactnative/bc-reactnative-3171599-MariaIsabelMartinez/bootcamp/week-04-estado_global_zustand/3-proyecto/starter/" /tmp/expo-project/

cd /tmp/expo-project
# Install deps if needed (first time or after adding packages)
pnpm install --frozen-lockfile

# Start web dev server
npx expo start --web

# Bundle URL: http://localhost:8081/index.bundle?platform=web
# App URL: http://localhost:8081/
```

The bundle builds successfully (~580 modules, ~3.3 MB).

## Key files
- `3-proyecto/starter/App.tsx` — root component
- `3-proyecto/starter/src/screens/` — HomeScreen, DetailScreen, ShipmentsScreen
- `3-proyecto/starter/src/stores/` — Zustand stores
- `3-proyecto/starter/src/types/index.ts` — domain types
- `3-proyecto/starter/src/data/mockData.ts` — mock data (8 products, 4 suppliers)
- `3-proyecto/starter/src/navigation/RootNavigator.tsx` — tab navigator

## Evidence screenshots needed
1. ProductList (HomeScreen with FlatList of products)
2. ProductDetail (with "Agregar a envío" button, supplier info)
3. ShipmentsScreen (with badge count, status flow)
4. (Optional) Status flow: Pendiente → En Aduana → En Tránsito → Entregado

## Source language
- All code in English (variables, types, functions)
- All comments in Spanish
