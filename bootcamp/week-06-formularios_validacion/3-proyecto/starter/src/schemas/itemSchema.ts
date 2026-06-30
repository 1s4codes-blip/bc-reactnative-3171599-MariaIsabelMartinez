// src/schemas/productSchema.ts
// Schema Zod para el formulario de producto de importación.
// Valida nombre, descripción, precio y país de origen.

import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del producto es requerido')
    .max(80, 'Máx. 80 caracteres'),

  description: z
    .string()
    .max(500, 'Máx. 500 caracteres')
    .optional()
    .or(z.literal('')),

  price: z.coerce
    .number({ invalid_type_error: 'El precio debe ser un número' })
    .positive('El precio debe ser mayor que 0'),

  originCountry: z
    .string()
    .min(1, 'El país de origen es requerido')
    .max(60, 'Máx. 60 caracteres'),
});

// El tipo TypeScript se infiere automáticamente
export type ProductFormData = z.infer<typeof productSchema>;
