type StorageType = Storage;

interface StorageAPI {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  removeItem: (key: string) => void;
  clear: () => void;
}

export function storageFactory(storageType: StorageType): StorageAPI {
  return {
    setItem: (key: string, value: any): void => {
      storageType.setItem(key, JSON.stringify(value));
    },
    getItem: (key: string): any => {
      const item = storageType.getItem(key);
      return item ? JSON.parse(item) : null;
    },
    removeItem: (key: string): void => {
      storageType.removeItem(key);
    },
    clear: (): void => {
      storageType.clear();
    }
  };
}