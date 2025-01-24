export function useStorage(type: 'local' | 'session' = 'local') {
    const storage = type === 'local' ? localStorage : sessionStorage;

    return {
        getItem<T = any>(key: string): T | null {
            const item = storage.getItem(key);
            return item ? JSON.parse(item) : null;
        },

        setItem(key: string, value: any): void {
            storage.setItem(key, JSON.stringify(value));
        },

        removeItem(key: string): void {
            storage.removeItem(key);
        },
    };
}
