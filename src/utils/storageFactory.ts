interface StorageAPI {
  setItem: <T = unknown>(key: string, value: T) => void;
  getItem: <T = unknown>(key: string) => T | null;
  removeItem: (key: string) => void;
  clear: () => void;
}

type StorageType = Storage;

export function storageFactory(storageType: StorageType): StorageAPI {
  return {
    setItem: <T = unknown>(key: string, value: T): void => {
      storageType.setItem(key, JSON.stringify(value));
    },
    getItem: <T = unknown>(key: string): T | null => {
      const item = storageType.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    },
    removeItem: (key: string): void => {
      storageType.removeItem(key);
    },
    clear: (): void => {
      storageType.clear();
    },
  };
}
