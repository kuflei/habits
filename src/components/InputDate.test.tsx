import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputDate from "./InputDate";
import dayjs from "dayjs";

test("InputDate receives correct props", async () => {
  const label = "Test Label";
  const name = "testName";
  const value = "2023-10-10";
  const onChange = jest.fn();
  const min = "2023-01-01";

  render(
    <InputDate
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      min={min}
    />,
  );

  const datePickerInput = screen.getByRole("textbox", { name: label });

  expect(datePickerInput).toBeInTheDocument();

  expect(datePickerInput).toHaveValue(dayjs(value).format("MM/DD/YYYY"));

  await userEvent.type(datePickerInput, "01/02/2023");

  expect(onChange).toHaveBeenCalledWith(name, "2023-01-02");
});
