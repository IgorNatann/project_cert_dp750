// Stub mínimo de localStorage para importar a store (Zustand persist) em ambiente node.
if (typeof globalThis.localStorage === 'undefined') {
  const mem = new Map<string, string>()
  const storage: Storage = {
    getItem: (k) => (mem.has(k) ? mem.get(k)! : null),
    setItem: (k, v) => {
      mem.set(k, String(v))
    },
    removeItem: (k) => {
      mem.delete(k)
    },
    clear: () => {
      mem.clear()
    },
    key: (i) => Array.from(mem.keys())[i] ?? null,
    get length() {
      return mem.size
    },
  }
  globalThis.localStorage = storage
}
