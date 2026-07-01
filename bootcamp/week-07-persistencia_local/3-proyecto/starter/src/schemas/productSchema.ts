// src/schemas/productSchema.ts
// Schema Zod para validar el formulario de creación de producto en la importadora.

import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string({ required_error: 'El nombre del producto es requerido' })
    .min(1, 'El nombre no puede estar vacío')
    .max(80, 'Máximo 80 caracteres'),
  description: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  originCountry: z
    .string({ required_error: 'El país de origen es requerido' })
    .min(1, 'El país de origen no puede estar vacío'),
  supplierName: z
    .string({ required_error: 'El proveedor es requerido' })
    .min(1, 'El proveedor no puede estar vacío'),
  category: z
    .string({ required_error: 'La categoría es requerida' })
    .min(1, 'La categoría no puede estar vacía'),
  price: z.coerce.number().positive('El precio debe ser mayor a 0'),
});

export type ProductFormData = z.infer<typeof productSchema>;
