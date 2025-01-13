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

const InputDate: React.FC<InputDateProps> = (props) => {
    /*TODO: onChange, minDate*/
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker

                label={props.label}
                value={props.value ? dayjs(props.value) : null}
                onChange={(newValue) => {
                    props.onChange(props.name, newValue ? newValue.format("YYYY-MM-DD") : null);
                }}
                minDate={props.min ? dayjs(props.min) : undefined}
            />
        </LocalizationProvider>
    );
};

export default InputDate;
