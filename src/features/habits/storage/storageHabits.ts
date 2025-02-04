import { storageFactory } from "@/utils/storageFactory";
import { Habit } from "@/types/Habit";

const localStorageAPI = storageFactory(localStorage);

export const saveHabits = (userId: string, habits: Habit[]): void => {
  localStorageAPI.setItem(`habits-${userId}`, habits);
};

export const loadHabits = (userId: string): Habit[] | null => {
  return localStorageAPI.getItem(`habits-${userId}`);
};
