import { render, screen, fireEvent } from '@testing-library/react';
import InputDate from './InputDate';
import dayjs from 'dayjs';

test('InputDate receives correct props', () => {
    const label = 'Test Label';
    const name = 'testName';
    const value = '2023-10-10';
    const onChange = jest.fn();
    const min = '2023-01-01';

    render(
        <InputDate
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            min={min}
        />
    );

    const datePickerInput = screen.getByRole('textbox', { name: label }) as HTMLInputElement;

    expect(datePickerInput).toBeInTheDocument();

    const formattedValue = dayjs(datePickerInput.value).format('YYYY-MM-DD');
    expect(formattedValue).toBe(value);

    fireEvent.change(datePickerInput, { target: { value: '2022-12-31' } });
    expect(onChange).toHaveBeenCalledWith(name, null);

    fireEvent.change(datePickerInput, { target: { value: '2023-01-02' } });
    expect(onChange).toHaveBeenCalledWith(name, '2023-01-02');
});
