// src/hooks/useProducts.ts
// Custom hooks que encapsulan la lógica de fetching del dominio de importación.
// Los componentes consumen estos hooks, no llaman a apiClient directamente.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateProductPayload, Product } from '../types';

// ============================================================
// QUERY KEY
// ============================================================
// Centralizar la queryKey evita errores de typo al invalidar.
export const PRODUCTS_QUERY_KEY = ['products'] as const;

// ============================================================
// useProducts — obtener lista de productos importados
// ============================================================

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: async () => {
      // Reemplazar por el endpoint real de productos importados:
      // ej. https://miapi.com/products
      const { data } = await apiClient.get<Product[]>('/products?_limit=15');
      return data;
    },
  });
}

// ============================================================
// useProductById — obtener un producto individual por ID
// ============================================================
// Usado en DetailScreen para obtener los detalles completos.

export function useProductById(id: string | number) {
  return useQuery<Product>({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<Product>(`/products/${id}`);
      return data;
    },
    // La query solo corre si hay un id válido
    enabled: !!id,
  });
}

// ============================================================
// useCreateProduct — crear un nuevo producto en el catálogo
// ============================================================

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, CreateProductPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<Product>('/products', payload);
      return data;
    },
    onSuccess: () => {
      // Invalida el caché → TanStack Query refetch la lista automáticamente
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Error al crear producto:', error.message);
    },
  });
}

// ============================================================
// useDeleteProduct — eliminar un producto por ID
// ============================================================

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string | number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
}
