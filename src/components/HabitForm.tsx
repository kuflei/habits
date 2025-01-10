import React from 'react';
import { useFormik } from 'formik';
import { useHabitStore } from '../store/useHabitStore';

interface HabitFormProps {
    onClose: () => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ onClose }) => {
    const addHabit = useHabitStore((state) => state.addHabit);

    const today = new Date().toISOString().split('T')[0];

    const formik = useFormik({
        initialValues: {
            name: '',
            startDate: '',
            endDate: '',
            frequency: 1,
            reward: '',
        }, /*TODO: винести в окремий файл*/
        validate: (values) => {
            const errors: { [key: string]: string } = {};

            if (!values.name.trim()) {
                errors.name = 'Назва звички є обов’язковою.';
            }

            if (!values.startDate) {
                errors.startDate = 'Початкова дата є обов’язковою.';
            } else if (values.startDate < today) {
                errors.startDate = 'Початкова дата не може бути у минулому.';
            }

            if (!values.endDate) {
                errors.endDate = 'Кінцева дата є обов’язковою.';
            } else if (values.startDate && values.endDate < values.startDate) {
                errors.endDate = 'Кінцева дата не може бути раніше початкової дати.';
            }

            if (values.frequency < 1) {
                errors.frequency = 'Періодичність повинна бути щонайменше 1 день.';
            }

            if (!values.reward.trim()) {
                errors.reward = 'Винагорода є обов’язковою.';
            }

            return errors;
        },
        onSubmit: (values) => {
            const newHabit = {
                id: Date.now().toString(),
                ...values,
                progress: {},
            };
            addHabit(newHabit);
            onClose();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
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
            <button type="submit">Додати звичку</button>
        </form>
    );
};

export default HabitForm;
