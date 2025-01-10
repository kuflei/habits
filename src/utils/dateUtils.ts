export const generateDateRange = (startDate: string, endDate: string, frequency: number) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    for (let d = start; d <= end; d.setDate(d.getDate() + frequency)) {
        dates.push(new Date(d).toISOString().split('T')[0]);
    }

    return dates;
};

export const today = new Date().toISOString().split('T')[0];