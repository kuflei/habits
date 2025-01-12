import React from 'react';
import { useFormik } from 'formik';
import { Habit } from '../../types/Habit.ts';
import { useHabitStore } from '../../store/useHabitStore';
import { today } from '../../utils/date';
import {validate} from "../../utils/validate";
import InputDate from "../../components/InputDate.tsx";
import {Button, FormControl, FormHelperText, Typography, TextField} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface HabitFormProps {
    habit?: Habit;
    onClose: () => void;
}

const HabitForm: React.FC<HabitFormProps> = ({habit, onClose }) => {
    const addHabit = useHabitStore((state) => state.addHabit);
    const updateHabit = useHabitStore((state) => state.updateHabit);
    const { t } = useTranslation();
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
            <Typography variant="h5" sx={{ mb: 3 }}>{habit ? t("editHabit") : t("addHabit")}</Typography>
            <FormControl fullWidth={true} margin="normal">
                <TextField label={t("habitName")} variant="outlined"
                       type="text"
                       name="name"
                       placeholder={t("habitName")}
                       value={formik.values.name}
                       onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name && (
                    <FormHelperText>{formik.errors.name}</FormHelperText>
                )}
            </FormControl>
            <FormControl fullWidth={true} margin="normal">
                <InputDate
                    label={t("startDate")}
                    name="startDate"
                    value={formik.values.startDate}
                    onChange={(name, value) => formik.setFieldValue(name, value)}
                    min={today}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                    <FormHelperText>{formik.errors.startDate}</FormHelperText>
                )}
            </FormControl>
            <FormControl fullWidth={true} margin="normal">
                <InputDate
                    label={t("endDate")}
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={(name, value) => formik.setFieldValue(name, value)}
                    min={formik.values.startDate || today}
                />
                {formik.touched.endDate && formik.errors.endDate && (
                    <FormHelperText>{formik.errors.endDate}</FormHelperText>
                )}
            </FormControl>
            <FormControl fullWidth={true} margin="normal">
                <TextField label={t("frequency")} variant="outlined"
                    type="number"
                    name="frequency"
                    value={formik.values.frequency}
                    onChange={formik.handleChange}
                    inputProps={{ min: 1 }}
                />
                {formik.touched.frequency && formik.errors.frequency && (
                    <FormHelperText>{formik.errors.frequency}</FormHelperText>
                )}
            </FormControl>
            <FormControl fullWidth={true} margin="normal">
                <TextField label={t("reward")} variant="outlined"
                    type="text"
                    name="reward"
                    placeholder={t("rewardPlaceholder")}
                    value={formik.values.reward}
                    onChange={formik.handleChange}
                />
                {formik.touched.reward && formik.errors.reward && (
                    <FormHelperText>{formik.errors.reward}</FormHelperText>
                )}
            </FormControl>

            <Button variant="contained" color="primary" sx={{ mr: 2, mt: 3 }}
                    type="submit">{habit ? t("save") : t("add")}</Button>
            <Button variant="contained" color="secondary" type="button" sx={{ mt: 3 }} onClick={onClose}>{t("cancel")}</Button>
        </form>
    );
};

export default HabitForm;
