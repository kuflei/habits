import {today} from "./dateUtils.ts";

export const validate = (values: any) => {
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
};