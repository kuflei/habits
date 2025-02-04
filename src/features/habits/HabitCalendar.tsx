import React, { useMemo, useCallback } from "react";
import Grid from "@mui/material/Grid2";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Habit } from "@/types/Habit";
import { useHabitStore } from "@/store/useHabitStore";
import { useAuthStore } from "@/store/authStore";
import { generateDateRange } from "@/utils/date";
import HabitCalendarDay from "@/features/habits/HabitCalendarDay.tsx";

interface HabitCalendarProps {
  habit: Habit;
}

const HabitCalendar: React.FC<HabitCalendarProps> = (props) => {
  const toggleHabitProgress = useHabitStore(
    (state) => state.toggleHabitProgress,
  );
  const habit = useHabitStore((state) =>
    state.habits.find((h) => h.id === props.habit.id),
  );
  const progress = habit ? habit.progress : {};
  const userId = useAuthStore((state) => state.userId);

  const dateRangeOptions = useMemo(
    () => ({
      start: props.habit.startDate,
      end: props.habit.endDate,
      frequency: props.habit.frequency,
    }),
    [props.habit.startDate, props.habit.endDate, props.habit.frequency],
  );
  const dateRange = useMemo(
    () => generateDateRange(dateRangeOptions),
    [dateRangeOptions],
  );

  const handleDateClick = useCallback(
    (date: string) => {
      if (!dateRange.includes(date)) return;

      toggleHabitProgress(userId, props.habit.id, date);
    },
    [dateRange, toggleHabitProgress, userId, props.habit.id],
  );

  return (
    <Grid container spacing={1} sx={{ mt: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          onChange={(date) => handleDateClick(date?.format("YYYY-MM-DD") || "")}
          slots={{
            day: (dayProps) => (
              <HabitCalendarDay
                {...dayProps}
                progress={progress}
                dateRange={dateRange}
              />
            ),
          }}
        />
      </LocalizationProvider>
    </Grid>
  );
};

export default HabitCalendar;
