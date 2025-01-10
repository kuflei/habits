export const generateCalendarTiles = (startDate: string, endDate: string, frequency: number) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateTiles = [];

    for (let d = start; d <= end; d.setDate(d.getDate() + frequency)) {
        dateTiles.push(new Date(d).toISOString().split('T')[0]);
    }

    return dateTiles;
};

export const today = new Date().toISOString().split('T')[0];

// Generate array of dates
export const generateDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = [];

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d).toISOString().split('T')[0]);
    }

    return dates;
};
