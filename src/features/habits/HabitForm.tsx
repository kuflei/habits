import React from 'react';
import { useFormik } from 'formik';
import { Habit } from '../../types/Habit.ts';
import { useHabitStore } from '../../store/useHabitStore.ts';
import { today } from '../../utils/dateUtils.ts';
import {validate} from "../../utils/validateUtils.ts";

interface HabitFormProps {
    habit?: Habit;
    onClose: () => void;
}

const HabitForm: React.FC<HabitFormProps> = ({habit, onClose }) => {
    const addHabit = useHabitStore((state) => state.addHabit);
    const updateHabit = useHabitStore((state) => state.updateHabit);

    const formik = useFormik({
        initialValues: {
            name: habit?.name || '',
            startDate: habit?.startDate || '',
            endDate: habit?.endDate || '',
            frequency: habit?.frequency || 1,
            reward: habit?.reward || '',
        },
        validate,
        onSubmit: (values) => {
            if (habit) {
                updateHabit({ ...habit, ...values });
            } else {
                const newHabit = {
                    id: Date.now().toString(),
                    ...values,
                    progress: {},
                };
                addHabit(newHabit);
            }
            onClose();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>{habit ? 'Редагувати звичку' : 'Додати звичку'}</h2>

            <label>Назва звички:</label>
            <input
                type="text"
                name="name"
                placeholder="Назва звички"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
                <p className="error-text">{formik.errors.name}</p>
            )}
            <label>Початкова дата:</label>
            <input
                type="date"
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min={today}
            />
            {formik.touched.startDate && formik.errors.startDate && (
                <p className="error-text">{formik.errors.startDate}</p>
            )}
            <label>Кінцева дата:</label>
            <input
                type="date"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min={formik.values.startDate || today}
            />
            {formik.touched.endDate && formik.errors.endDate && (
                <p className="error-text">{formik.errors.endDate}</p>
            )}
            <label>Періодичність (у днях):</label>
            <input
                type="number"
                name="frequency"
                value={formik.values.frequency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min={1}
            />
            {formik.touched.frequency && formik.errors.frequency && (
                <p className="error-text">{formik.errors.frequency}</p>
            )}
            <label>Винагорода:</label>
            <input
                type="text"
                name="reward"
                placeholder="Що ви отримаєте за досягнення звички?"
                value={formik.values.reward}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.reward && formik.errors.reward && (
                <p className="error-text">{formik.errors.reward}</p>
            )}
            <button type="submit">{habit ? 'Зберегти' : 'Додати звичку'}</button>
            <button type="button" onClick={onClose}>Скасувати</button>

        </form>
    );
};

export default HabitForm;
