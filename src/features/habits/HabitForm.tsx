import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {Button, FormControl, FormHelperText, Typography, TextField, MenuItem} from '@mui/material';
import { Habit } from '@/types/Habit.ts';
import { useHabitStore } from '@/store/useHabitStore';
import { today } from '@/utils/date';
import {validate} from "@/utils/validate";
import InputDate from "@/components/InputDate";
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import {useAuthStore} from "@/store/authStore";

interface HabitFormProps {
    habit?: Habit;
    onClose: () => void;
    onSubmit?: () => void;
}

const HabitForm: React.FC<HabitFormProps> = (props) => {
    const userId = useAuthStore((state) => state.userId);
    const { wishlist } = useWishlist();
    const addHabit = useHabitStore((state) => state.addHabit);
    const updateHabit = useHabitStore((state) => state.updateHabit);
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            name: props.habit?.name || '',
            startDate: props.habit?.startDate || '',
            endDate: props.habit?.endDate || '',
            frequency: props.habit?.frequency || 1,
            reward: props.habit?.reward || (wishlist.length > 0 ? wishlist[0].name : ''),
        },
        validate,
        onSubmit: async (values) => {
            if (props.habit) {
                updateHabit(userId, { ...props.habit, ...values });
            } else {
                const newHabit = {
                    id: Date.now().toString(),
                    ...values,
                    progress: {},
                };
                addHabit(userId, newHabit);
            }
            if (props.onSubmit) {
                props.onSubmit();
            }
            props.onClose();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Typography variant="h5" sx={{ mb: 3 }}>{props.habit ? t("editHabit") : t("addHabit")}</Typography>
            <FormControl fullWidth margin="normal">
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
            <FormControl fullWidth margin="normal">
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
            <FormControl fullWidth margin="normal">
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
            <FormControl fullWidth margin="normal">
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
            <FormControl fullWidth margin="normal">
                <TextField
                    select
                    label={t("reward")}
                    name="reward"
                    value={formik.values.reward || ""}
                    onChange={(event) => formik.setFieldValue("reward", event.target.value)}
                >
                    {wishlist.length > 0 ? (
                        wishlist.map((reward) => (
                            <MenuItem key={reward.id} value={reward.name}>
                                {reward.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem value="">
                            {t("noOptionsAvailable")}
                        </MenuItem>
                    )}
                </TextField>
                {formik.touched.reward && formik.errors.reward && (
                    <FormHelperText>{formik.errors.reward}</FormHelperText>
                )}
            </FormControl>

            <Button variant="contained" color="primary" sx={{ mr: 2, mt: 3 }}
                    type="submit">{props.habit ? t("save") : t("add")}</Button>
            <Button variant="contained" color="secondary" type="button" sx={{ mt: 3 }} onClick={props.onClose}>{t("cancel")}</Button>
        </form>
    );
};

export default HabitForm;
