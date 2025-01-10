import React, { useState } from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from './HabitList';
import Modal from '../components/Modal';

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
                <h2>Додати звичку</h2>
                <HabitForm onClose={handleHabitAdded}/>
            </Modal>

            <HabitList/>
            <button onClick={() => setIsModalOpen(true)}>Додати нову звичку</button>
        </div>
    );
};

export default Home;
