import { useAuthStore } from "@/store/authStore";

export const getUserId = (): string => {
  const userId = useAuthStore.getState().userId;
  if (!userId) {
    throw new Error("User ID is required");
  }
  return userId;
};
