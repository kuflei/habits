export const generateDateRange = (start: string, end: string, frequency: number = 1) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = [];

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + frequency)) {
        dates.push(new Date(d).toISOString().split('T')[0]);
    }

    return dates;
};

export const today = new Date().toISOString().split('T')[0];
