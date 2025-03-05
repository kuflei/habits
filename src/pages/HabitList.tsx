import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import HabitItem from "@/pages/HabitItem";
import { useAuthStore } from "@/store/authStore";
import { usePaginationHabits } from "@/features/habits/hooks/useHabits";
import PaginationHabits from "../components/PaginationHabits";
import React, { useState } from "react";
import { perPage } from "@/shared/constants/per-page";

const HabitList = () => {
  const userId = useAuthStore((state) => state.userId);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = usePaginationHabits(userId, currentPage, perPage);
  const habits = data?.habits || [];
  const totalPages = data?.totalPages || 0;
  const { t } = useTranslation();

  if (isLoading) return <h2>⏳ Завантаження...</h2>;
  if (error) return <h2>❌ Помилка: {error.message}</h2>;

  if (!Array.isArray(habits) || habits.length === 0) {
    return <p>{t("noHabitsAvailable")}</p>;
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box className="habit-list">
      <h1>{t("allHabits")}</h1>
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
      <PaginationHabits
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handleChangePage}
      />
    </Box>
  );
};

export default HabitList;
