import React from "react";
import { Input, InputLabel  } from '@mui/material';
interface InputDateProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    min: string;
}

const InputDate: React.FC<InputDateProps> = ({label, name, value, onChange, onBlur, min }) => {
    return (
        <>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Input
                id={name}
                type="date"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                min={min}
            />
        </>
    )
}
export default InputDate;