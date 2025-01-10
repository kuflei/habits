import React from 'react';
import { useFormik } from 'formik';
import { Habit } from '../../types/Habit.ts';
import { useHabitStore } from '../../store/useHabitStore';
import { today } from '../../utils/date';
import {validate} from "../../utils/validate";
import InputDate from "../../components/InputDate.tsx";
import { Input, InputLabel, Button} from '@mui/material';
import Grid from '@mui/material/Grid2';


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

            <InputLabel>Назва звички:</InputLabel>
            <Input
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

            <InputDate label="Початкова дата:"
                       name="startDate"
                       value={formik.values.startDate}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       min={today}
            />

            {formik.touched.startDate && formik.errors.startDate && (
                <p className="error-text">{formik.errors.startDate}</p>
            )}
            <InputDate label="Кінцева дата:"
                       name="endDate"
                       value={formik.values.endDate}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       min={formik.values.startDate || today}
            />
            {formik.touched.endDate && formik.errors.endDate && (
                <p className="error-text">{formik.errors.endDate}</p>
            )}
            <InputLabel>Періодичність (у днях):</InputLabel>
            <Input
                type="number"
                name="frequency"
                value={formik.values.frequency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.frequency && formik.errors.frequency && (
                <p className="error-text">{formik.errors.frequency}</p>
            )}
            <InputLabel>Винагорода:</InputLabel>
            <Input
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
            <Grid container direction="row" columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Button variant="contained" color="primary"
                        type="submit">{habit ? 'Зберегти' : 'Додати звичку'}</Button>
                <Button variant="contained" color="secondary" type="button" onClick={onClose}>Скасувати</Button>
            </Grid>

        </form>
    );
};

export default HabitForm;
