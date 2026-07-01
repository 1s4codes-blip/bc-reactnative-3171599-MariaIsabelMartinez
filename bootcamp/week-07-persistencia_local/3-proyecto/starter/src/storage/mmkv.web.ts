// src/storage/mmkv.web.ts
// Mock web de MMKV usando localStorage.
// Metro resuelve este archivo automáticamente en platform=web (.web.ts > .ts).

const ls = typeof window !== 'undefined' ? window.localStorage : null;

function get(key: string): string | null {
  return ls?.getItem(key) ?? null;
}

export const storage = {
  getString: (key: string): string | undefined => get(key) ?? undefined,

  getBoolean: (key: string): boolean | undefined => {
    const v = get(key);
    if (v === null) return undefined;
    return v === 'true';
  },

  getNumber: (key: string): number | undefined => {
    const v = get(key);
    if (v === null) return undefined;
    return Number(v);
  },

  set: (key: string, value: string | number | boolean) => {
    ls?.setItem(key, String(value));
  },

  remove: (key: string) => {
    ls?.removeItem(key);
  },

  clearAll: () => {
    ls?.clear();
  },

  getAllKeys: (): string[] => {
    if (!ls) return [];
    return Object.keys(ls);
  },
};
