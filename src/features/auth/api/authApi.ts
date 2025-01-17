export const login = async (email: string, password: string) => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    const data = await response.json();
    localStorage.setItem('userId', data.userId);
    return data;
};

export const logout = async (): Promise<void> => {
    const response = await fetch('/api/logout', {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to logout');
    }

    localStorage.removeItem('userId');
};