Proyecto Semana 01 — App de Tarjetas

Semana 01 — Fundamentos RN | Tiempo estimado: 3h

🎯 Objetivo
Construir una app de pantalla única que muestre una lista de tarjetas usando los Core Components y Flexbox. La app se adaptó al dominio de Empresa de Importación.
📋 Dominio Asignado
Dominio: Empresa de Importación 🚢
Elemento: Proveedor (Supplier)
Cada proveedor representa una empresa internacional que suministra productos a la importadora. La app muestra su información clave: nombre, país de origen, productos y estado del envío.
💡 Adaptación del Dominio
DominioElementoDatos en la tarjeta🚢 Empresa de ImportaciónProveedorNombre, país de origen, productos, estado del envío
✅ Requisitos Funcionales

Pantalla principal con ScrollView y grid de 2 columnas
4 tarjetas con datos coherentes al dominio de importación
Cada tarjeta muestra:

Una imagen representativa del proveedor (URL)
Nombre del proveedor y país de origen con estilos distintos
Productos importados y estado del envío
Acción con Pressable y feedback visual (opacity: 0.75)


Header con nombre "Import Company" y subtítulo del dominio
Estilos con StyleSheet.create (sin estilos inline)
TypeScript: interfaz Supplier definida con todos los campos del dominio

📁 Estructura del proyecto
starter/
├── App.tsx               # Punto de entrada
├── package.json          # Dependencias exactas
├── tsconfig.json         # Configuración TypeScript
├── app.json              # Configuración Expo (name: "Import Company")
└── src/
    ├── types/
    │   └── index.ts      # Interfaz Supplier del dominio
    ├── data/
    │   └── mockData.ts   # 4 proveedores de ejemplo
    ├── components/
    │   └── ItemCard.tsx  # Componente tarjeta reutilizable
    └── screens/
        └── HomeScreen.tsx # Pantalla principal con grid de tarjetas
🗂️ Proveedores de Ejemplo
#NombrePaísProductosEstado1Global Imports Ltd.ChinaElectrónica, microchipsEn tránsito2Textiles WorldIndiaTelas, ropaEn aduana3AutoParts GermanyAlemaniaRepuestos automotricesEntregado4AgroExport ColombiaColombiaCafé, sojaEn tránsito
🚀 Cómo ejecutar
bashcd starter
pnpm install
pnpm start
Luego presiona w para abrir en el navegador web, o escanea el QR con Expo Go en tu celular (requiere estar en la misma red).
🛠️ Entregables

App funcional en navegador web y/o simulador
4 tarjetas con datos del dominio de importación
Código subido al repositorio con nombre del dominio en el app.json
Screenshot de la app funcionando

📊 Criterios de Evaluación
Ver ../../rubrica-evaluacion.md
📌 Restricciones

❌ No usar position: 'absolute' (solo Flexbox esta semana)
❌ No usar ninguna librería de UI externa (solo componentes nativos de RN)
❌ No usar estilos inline (style={{ ... }} directo en JSX)
✅ Todo el código en TypeScript con tipos explícitos