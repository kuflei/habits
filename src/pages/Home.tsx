import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {Button} from "@mui/material";
import HabitForm from '@/features/habits/HabitForm';
import HabitList from '@/pages/HabitList';
import Modal from '@/components/Modal';

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [hideMessage, setHideMessage] = useState(false);
    const { t } = useTranslation();

    const handleHabitAdded = () => {
        /*TODO: mui message*/
        setIsModalOpen(false);
        setShowSuccessMessage(true);

        setTimeout(() => {
            setHideMessage(true);
        }, 1000);

        setTimeout(() => {
            setShowSuccessMessage(false);
            setHideMessage(false);
        }, 2000);
    };

    return (
        <div className="home-page">
            <h1>{t("habitTracker")}</h1>
            {showSuccessMessage && (
                <p className={`success-message ${hideMessage ? 'hide' : ''}`}>✅ {t("added")}</p>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <HabitForm onClose={handleHabitAdded}/>
            </Modal>

            <HabitList/>
            <Button variant="contained" sx={{
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    ml: 'auto',
                    display: 'block',
                    '&:hover': {
                        backgroundColor: '#388e3c',
                    },
                }}
                onClick={() => setIsModalOpen(true)}>
                {t("addNewHabit")}
            </Button>
        </div>
    );
};

export default Home;
