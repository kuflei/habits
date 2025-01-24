export const createHttpClient = (baseUrl: string) => {
    const request = async <T>(
        url: string,
        method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
        payload?: any,
        headers: Record<string, string> = { 'Content-Type': 'application/json' }
    ): Promise<T> => {
        const options: RequestInit = {
            method,
            headers,
            ...(payload && { body: JSON.stringify(payload) }),
        };

        const response = await fetch(`${baseUrl}${url}`, options);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${method} ${url}: ${response.status} - ${errorText}`);
        }

        return response.json();
    };

    const get = async <T>(url: string): Promise<T> => {
        return request<T>(url, 'GET');
    };

    const post = async <T>(url: string, payload: any): Promise<T> => {
        return request<T>(url, 'POST', payload);
    };

    const patch = async <T>(url: string, payload: any): Promise<T> => {
        return request<T>(url, 'PATCH', payload);
    };

    const del = async (url: string): Promise<void> => {
        await request<void>(url, 'DELETE');
    };

    return { get, post, patch, delete: del };
};