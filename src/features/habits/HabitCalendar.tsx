import React, { useMemo } from "react";
import Grid from "@mui/material/Grid2";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Habit } from "@/types/Habit";
import { useHabitStore } from "@/store/useHabitStore";
import { useAuthStore } from "@/store/authStore";
import HabitCalendarDay from "@/features/habits/HabitCalendarDay";
import { DATE_FORMAT } from "../../shared/constants/date";
import { getHabitDateRange } from "@/utils/habitDateRange";

interface HabitCalendarProps {
  habit: Habit;
}

const HabitCalendar: React.FC<HabitCalendarProps> = (props) => {
  const toggleHabitProgress = useHabitStore((state) => state.toggleHabitProgress);
  const habit = useHabitStore((state) => state.habits.find((h) => h.id === props.habit.id));
  const progress = habit ? habit.progress : {};
  const userId = useAuthStore((state) => state.userId);

  const dateRange = useMemo(() => getHabitDateRange(props.habit), [props.habit]);

  const handleDateClick = (date: string) => {
    if (!dateRange.includes(date)) return;

    toggleHabitProgress(userId, props.habit.id, date);
  };

  return (
    <Grid container spacing={1} sx={{ mt: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          onChange={(date) => handleDateClick(date?.format(DATE_FORMAT) || "")}
          slots={{
            day: (dayProps) => (
              <HabitCalendarDay {...dayProps} progress={progress} dateRange={dateRange} />
            ),
          }}
        />
      </LocalizationProvider>
    </Grid>
  );
};

export default HabitCalendar;
