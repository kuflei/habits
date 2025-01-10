import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface InputDateProps {
    label: string;
    name: string;
    value: string | null;
    onChange: (name: string, value: string | null) => void;
    min?: string;
}

const InputDate: React.FC<InputDateProps> = ({label, name, value, onChange, min }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker

                label={label}
                value={value ? dayjs(value) : null}
                onChange={(newValue) => {
                    onChange(name, newValue ? newValue.format("YYYY-MM-DD") : null);
                }}
                minDate={min ? dayjs(min) : undefined}
            />
        </LocalizationProvider>
    );
};

export default InputDate;
