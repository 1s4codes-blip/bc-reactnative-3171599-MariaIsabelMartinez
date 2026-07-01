// src/hooks/useProducts.ts
// TanStack Query hooks con caché AsyncStorage para soporte offline.
// Almacena los productos localmente para mostrar datos sin conexión.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createProduct, fetchProductById, fetchProducts, updateProduct } from '../services/api';
import type { Product, ProductsWithSource } from '../types';

const PRODUCTS_QUERY_KEY = ['products'] as const;

const CACHE_KEY = '@products_cache';

export function useProducts() {
  return useQuery<ProductsWithSource>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: async (): Promise<ProductsWithSource> => {
      try {
        const data = await fetchProducts();
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
        return { products: data, source: 'network' };
      } catch {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          return { products: JSON.parse(cached) as Product[], source: 'cache' };
        }
        throw new Error('Sin red y sin caché disponible');
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductById(id: number | string | undefined) {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: () => fetchProductById(id!),
    enabled: id !== undefined,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<Product, 'id' | 'shipmentStatus'>) => createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number | string } & Partial<Omit<Product, 'id'>>) =>
      updateProduct(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...PRODUCTS_QUERY_KEY, variables.id] });
    },
  });
}
