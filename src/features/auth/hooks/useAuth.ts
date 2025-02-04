import { useAuthStore } from "@/store/authStore";
import { login, logout } from "../api/authApi";

export const useAuth = () => {
  const setUserId = useAuthStore((state) => state.setUserId);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogin = async (email: string, password: string) => {
    const data = await login(email, password);
    setUserId(data.userId);
  };

  const handleLogout = async () => {
    await logout();
    clearAuth();
  };

  return { handleLogin, handleLogout };
};
