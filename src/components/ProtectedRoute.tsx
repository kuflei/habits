import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userId = useAuthStore((state) => state.userId);

  if (!userId) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
