import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Typography,
  Card,
  Pagination,
} from "@mui/material";
import HabitForm from "@/features/habits/HabitForm";
import { useAuthStore } from "@/store/authStore";
import { usePaginationHabits } from "@/features/habits/hooks/useHabits";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const userId = useAuthStore((state) => state.userId);
  const perPage = 5;
  const { data: habits, error, isLoading } = usePaginationHabits(userId, currentPage, perPage);
  const cssButton = {
    backgroundColor: "#4caf50",
    color: "#fff",
    ml: "auto",
    display: "block",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  };
  const handleHabitAdded = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  if (isLoading) return <h2>⏳ Завантаження...</h2>;
  if (error) return <h2>❌ Помилка: {error.message}</h2>;

  const totalPages = Math.ceil(habits.length / perPage);

  const paginatedData = habits.slice((currentPage - 1) * perPage, currentPage * perPage);
  return (
    <div className="home-page">
      {userId ? (
        <>
          <h1>{t("habitTracker")}</h1>
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              variant="outlined"
              sx={{ width: "100%" }}
            >
              {t("added")}
            </Alert>
          </Snackbar>
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <DialogContent>
              <HabitForm onClose={() => setIsModalOpen(false)} onSubmit={handleHabitAdded} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsModalOpen(false)} color="primary">
                {t("close")}
              </Button>
            </DialogActions>
          </Dialog>
          <div className="habit-list">
            {paginatedData.length > 0 ? (
              paginatedData.map((habit) => (
                <Card key={habit.id} sx={{ mb: 3, p: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    {habit.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    🏆 {t("reward")} {habit.reward}
                  </Typography>
                </Card>
              ))
            ) : (
              <Typography sx={{ mt: 2 }} align="center" variant="body1">
                {t("noHabitsAvailable")}
              </Typography>
            )}
          </div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            sx={{ display: "flex", justifyContent: "center", mt: 3 }}
          />
          <Button variant="contained" sx={cssButton} onClick={() => setIsModalOpen(true)}>
            {t("addNewHabit")}
          </Button>
        </>
      ) : (
        <Typography sx={{ mt: 5 }} align="center" variant="h5" gutterBottom>
          {t("pleaseLogin")}
        </Typography>
      )}
    </div>
  );
};

export default Home;
