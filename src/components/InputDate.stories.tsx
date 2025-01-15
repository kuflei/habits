import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import InputDate from './InputDate';

export default {
    title: 'Components/InputDate',
    component: InputDate,
    tags: ['autodocs'],
} as Meta<typeof InputDate>;

export const Default = () => {
    const [value, setValue] = useState<string | null>(null);

    const handleChange = (name: string, newValue: string | null) => {
        setValue(newValue);
        console.log(`Changed ${name}: ${newValue}`);
    };

    return <InputDate label="Select Date" name="date" value={value} onChange={handleChange} />;
};

export const WithInitialValue = () => {
    const [value, setValue] = useState<string | null>('2025-01-12');

    const handleChange = (name: string, newValue: string | null) => {
        setValue(newValue);
        console.log(`Changed ${name}: ${newValue}`);
    };

    return <InputDate label="Start Date" name="startDate" value={value} onChange={handleChange} />;
};

export const MinDate = () => {
    const [value, setValue] = useState<string | null>(null);

    const handleChange = (name: string, newValue: string | null) => {
        setValue(newValue);
        console.log(`Changed ${name}: ${newValue}`);
    };

    return <InputDate label="End Date" name="endDate" value={value} onChange={handleChange} min="2025-02-01" />;
};
