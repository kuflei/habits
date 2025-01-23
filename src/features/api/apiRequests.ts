export const fetchData = async (
    url: string,
    setState: (state) => void,
    options: { onSuccess: (data: any) => void; onError: (error: string) => void }
): Promise<void> => {
    setState({ loading: true, error: null });
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }
        const data = await response.json();
        options.onSuccess(data);
        setState({ loading: false });
    } catch (error) {
        options.onError((error as Error).message);
        setState({ error: (error as Error).message, loading: false });
    }
};
export const addData = async (
    url: string,
    payload: any,
    setState: (state) => void,
    options: { onSuccess: (data: any) => void; onError?: (error: string) => void }
): Promise<void> => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to add data to ${url}`);
        }

        const data = await response.json();
        options.onSuccess(data);
    } catch (error) {
        console.error('Error adding data:', error);
        if (options.onError) {
            options.onError((error as Error).message);
        }
    }
};
export const updateData = async (
    url: string,
    payload: any,
    setState: (state) => void,
    options: { onSuccess: (data: any) => void; onError?: (error: string) => void }
): Promise<void> => {
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to update data at ${url}`);
        }

        const data = await response.json();
        options.onSuccess(data);
    } catch (error) {
        console.error('Error updating data:', error);
        if (options.onError) {
            options.onError((error as Error).message);
        }
    }
};
export const deleteData = async <T>(
    url: string,
    setState: (state: T) => void,
    options: {
        filterState: (state: T) => T;
        onError?: (error: string) => void;
    }
): Promise<void> => {
    try {
        const response = await fetch(url, { method: 'DELETE' });

        if (!response.ok) {
            throw new Error(`Failed to delete data at ${url}`);
        }
        setState((state) => options.filterState(state as T));
    } catch (error) {
        console.error('Error deleting data:', error);
        if (options.onError) {
            options.onError((error as Error).message);
        }
    }
};



