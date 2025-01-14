import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {Button, Dialog, DialogContent, DialogActions, Snackbar, Alert} from "@mui/material";
import HabitForm from '@/features/habits/HabitForm';
import HabitList from '@/pages/HabitList';

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { t } = useTranslation();
    const cssButton = {
        backgroundColor: '#4caf50',
        color: '#fff',
        ml: 'auto',
        display: 'block',
        '&:hover': {
            backgroundColor: '#388e3c',
        }
    }
    const handleHabitAdded = () => {
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }
    return (
        <div className="home-page">
            <h1>{t("habitTracker")}</h1>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="outlined"
                    sx={{ width: '100%' }}>
                    {t("added")}
                </Alert>
            </Snackbar>
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DialogContent>
                    <HabitForm onClose={() => setIsModalOpen(false)} onSubmit={handleHabitAdded}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModalOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <HabitList/>
            <Button variant="contained" sx={cssButton}
                onClick={() => setIsModalOpen(true)}>
                {t("addNewHabit")}
            </Button>
        </div>
    );
};

export default Home;
