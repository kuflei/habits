type StorageMethod = 'localStorage' | 'sessionStorage';

export const createStorage = (method: StorageMethod) => {
    let storage;

    if (method === 'localStorage') {
        storage = localStorage;
    } else {
        storage = sessionStorage;
    }

    return {
        setItem(key: string, value: string): void {
            storage.setItem(key, value);
        },
        getItem(key: string): string | null {
            return storage.getItem(key);
        },
        removeItem(key: string): void {
            storage.removeItem(key);
        },
    };
};

export default createStorage;

