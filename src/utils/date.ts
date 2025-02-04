import dayjs from "dayjs";

interface dateRangeOptions {
  start: string;
  end: string;
  frequency?: number;
}
export const generateDateRange = ({
  start,
  end,
  frequency = 1,
}: dateRangeOptions) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dates = [];

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + frequency)) {
    dates.push(new Date(d).toISOString().split("T")[0]);
  }

  return dates;
};

export const today = new Date().toISOString().split("T")[0];

export const getDayOfMonth = (date: string | Date): number => {
  return dayjs(date).date();
};
