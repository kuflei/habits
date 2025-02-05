import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const DEFAULT_DATE_FORMAT = "MM/DD/YYYY";

export interface InputDateProps {
  label: string;
  name: string;
  value: string | null;
  onChange: (name: string, value: string | null) => void;
  min?: string;
  dateFormat?: string /*TODO: find type for 'YYYY-MM-DD'*/;
}

const InputDate: React.FC<InputDateProps> = (props) => {
  const handleChange = (newValue: dayjs.Dayjs | null) => {
    props.onChange(
      props.name,
      newValue
        ? newValue.format(props.dateFormat || DEFAULT_DATE_FORMAT)
        : null,
    );
  };
  const formattedValue = props.value ? dayjs(props.value) : null;
  const minDate = props.min ? dayjs(props.min) : undefined;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {" "}
      <DatePicker
        label={props.label}
        value={formattedValue}
        onChange={handleChange}
        minDate={minDate}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
