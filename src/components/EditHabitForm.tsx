import React, { useState } from 'react';
import { Habit } from '../types/Habit';
import { useHabitStore } from '../store/useHabitStore';

interface EditHabitFormProps {
    habit: Habit;
    onClose: () => void;
}

const EditHabitForm: React.FC<EditHabitFormProps> = ({ habit, onClose }) => {
    const [updatedHabit, setUpdatedHabit] = useState<Habit>(habit);
    const updateHabit = useHabitStore((state) => state.updateHabit);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateHabit(updatedHabit);
        onClose();
    };

    return (
        <form onSubmit={handleSave} className="edit-habit-form">
            <h2>Редагувати звичку</h2>
            <input
                type="text"
                value={updatedHabit.name} /*TODO: винести в окремий файл*/
                onChange={(e) => setUpdatedHabit({ ...updatedHabit, name: e.target.value })}
                placeholder="Назва звички"
                required
            />
            {/*TODO: create Input component*/}
            <label>Початкова дата:</label>
            <input
                type="date"
                value={updatedHabit.startDate}
                onChange={(e) => setUpdatedHabit({ ...updatedHabit, startDate: e.target.value })}
                required
            />
            <label>Кінцева дата:</label>
            <input
                type="date"
                value={updatedHabit.endDate}
                onChange={(e) => setUpdatedHabit({ ...updatedHabit, endDate: e.target.value })}
                required
            />
            <label>Періодичність (у днях):</label>
            <input
                type="number"
                value={updatedHabit.frequency}
                onChange={(e) => setUpdatedHabit({ ...updatedHabit, frequency: Number(e.target.value) })}
                min={1}
                required
            />
            <label>Винагорода:</label>
            <input
                type="text"
                value={updatedHabit.reward}
                onChange={(e) => setUpdatedHabit({ ...updatedHabit, reward: e.target.value })}
                placeholder="Винагорода"
            />
            <button type="submit">Зберегти</button>
            <button type="button" onClick={onClose}>Скасувати</button>
        </form>
    );
};

export default EditHabitForm;
