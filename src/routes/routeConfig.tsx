import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ProtectedRoute from "@/components/ProtectedRoute";
const Wishlist = React.lazy(() => import("@/pages/Wishlist"));
const HabitList = React.lazy(() => import("@/pages/HabitList"));
const Home = React.lazy(() => import("@/pages/Home"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/habits"
          element={
            <ProtectedRoute>
              <HabitList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}
