import React, { useState } from 'react';
import HabitForm from '../features/habits/HabitForm';
import HabitList from './HabitList';
import Modal from '../components/Modal';
import {Button} from "@mui/material";

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [hideMessage, setHideMessage] = useState(false);

    const handleHabitAdded = () => {
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
            <h1>Трекер звичок</h1>


            {showSuccessMessage && (
                <p className={`success-message ${hideMessage ? 'hide' : ''}`}>✅ Додано!</p>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <HabitForm onClose={handleHabitAdded}/>
            </Modal>

            <HabitList/>
            <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>Додати нову звичку</Button>
        </div>
    );
};

export default Home;
