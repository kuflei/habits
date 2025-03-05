import React, { useMemo } from "react";
import Grid from "@mui/material/Grid2";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Habit } from "@/types/Habit";
import { useAuthStore } from "@/store/authStore";
import HabitCalendarDay from "@/features/habits/HabitCalendarDay";
import { DATE_FORMAT } from "@/shared/constants/date";
import { getHabitDateRange } from "@/utils/habitDateRange";
import { useToggleHabit, useHabits } from "./hooks/useHabits.ts";

interface HabitCalendarProps {
  habit: Habit;
}

const HabitCalendar: React.FC<HabitCalendarProps> = (props) => {
  const toggleHabitProgress = useToggleHabit();
  const userId = useAuthStore((state) => state.userId);
  const { data } = useHabits(userId);
  const habitsArray = data?.habits || [];
  const habit = habitsArray.find((h) => h.id === props.habit.id);
  const progress = habit ? habit.progress : {};

  const dateRange = useMemo(() => getHabitDateRange(props.habit), [props.habit]);

  const handleDateClick = (date: string) => {
    if (!dateRange.includes(date)) return;

    const newProgress = { ...progress, [date]: !progress[date] };

    toggleHabitProgress.mutate([userId, props.habit.id, newProgress]);
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
