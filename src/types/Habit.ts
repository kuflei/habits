export interface Habit {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    frequency: number;
    progress: { [date: string]: boolean };
    reward: string;
}
