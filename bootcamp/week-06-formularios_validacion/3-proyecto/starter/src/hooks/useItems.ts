// src/hooks/useProducts.ts
// Custom hooks para CRUD de productos usando TanStack Query + datos mock locales
// Dominio: Empresa de Importación

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createProduct,
  fetchProductById,
  fetchProducts,
  updateProduct,
} from '../data/mockProducts';
import type { CreateProductPayload, Product, UpdateProductPayload } from '../types';

export const PRODUCTS_QUERY_KEY = ['products'] as const;

// ─────────────────────────────────────────
// READ — lista de productos
// ─────────────────────────────────────────

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: fetchProducts,
  });
}

// ─────────────────────────────────────────
// READ — producto individual (para formulario Edit)
// ─────────────────────────────────────────

export function useProductById(id: number) {
  return useQuery<Product | undefined>({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}

// ─────────────────────────────────────────
// CREATE
// ─────────────────────────────────────────

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, CreateProductPayload>({
    mutationFn: (payload) =>
      createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
}

// ─────────────────────────────────────────
// UPDATE — para el formulario Edit
// ─────────────────────────────────────────

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, UpdateProductPayload>({
    mutationFn: (payload) =>
      updateProduct(payload as Product),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...PRODUCTS_QUERY_KEY, variables.id] });
    },
  });
}
