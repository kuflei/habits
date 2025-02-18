import { useTranslation } from "react-i18next";
import HabitItem from "@/pages/HabitItem";
import { useAuthStore } from "@/store/authStore";
import { useHabits } from "@/features/habits/hooks/useHabits";
import { useState } from "react";

const HabitList = () => {
  const userId = useAuthStore((state) => state.userId);
  const currentPage = 1;
  const perPage = 5;
  const { data: habits, isLoading, error } = useHabits(userId, currentPage, perPage);

  const { t } = useTranslation();

  if (isLoading) return <h2>⏳ Завантаження...</h2>;
  if (error) return <h2>❌ Помилка: {error.message}</h2>;

  if (!Array.isArray(habits) || habits.length === 0) {
    return <p>{t("noHabitsAvailable")}</p>;
  }

  return (
    <div className="habit-list">
      <h1>{t("allHabits")}</h1>
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

export default HabitList;
