import React from "react";
import { PickersDay } from "@mui/x-date-pickers";
import { PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";
import { DATE_FORMAT } from "@/shared/constants/date";

const getDayStyles = (
  isCompleted: boolean,
  isMissed: boolean,
  isInRange: boolean,
  isPastOrToday: boolean,
) => ({
  backgroundColor: isCompleted
    ? "#4CAF50"
    : isMissed
      ? "#FF6B6B"
      : isInRange
        ? "#FFF5E1"
        : "transparent",
  color: isCompleted || isMissed ? "white" : "black",
  borderRadius: "4px",
  "&.Mui-selected": {
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: 500,
  },
  "&:focus.Mui-selected": {
    backgroundColor: isCompleted
      ? "#4CAF50"
      : isMissed
        ? "#FF6B6B"
        : isInRange
          ? "#FFF5E1"
          : "transparent",
    color: "#fff",
    fontWeight: 500,
  },
  "&:hover": {
    backgroundColor: isInRange && isPastOrToday ? "#81c784" : "transparent",
  },
});

interface HabitCalendarDayProps extends PickersDayProps<Dayjs> {
  progress: Record<string, boolean>;
  dateRange: string[];
}

const HabitCalendarDay: React.FC<HabitCalendarDayProps> = (props) => {
  const formattedDay = props.day.format(DATE_FORMAT);

  const isInRange = props.dateRange.includes(formattedDay);
  const isPastOrToday =
    dayjs(formattedDay).isSame(dayjs(), "day") || dayjs(formattedDay).isBefore(dayjs(), "day");
  const isCompleted = props.progress?.[formattedDay] ?? false;
  const isMissed = isInRange && !isCompleted && dayjs(formattedDay).isBefore(dayjs(), "day");
  return (
    <PickersDay
      {...props}
      day={props.day}
      disabled={!(isInRange && isPastOrToday)}
      sx={getDayStyles(isCompleted, isMissed, isInRange, isPastOrToday)}
    />
  );
};

export default HabitCalendarDay;
