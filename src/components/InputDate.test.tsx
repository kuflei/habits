import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { describe } from "node:test";
import InputDate, { InputDateProps } from "./InputDate";
import { DEFAULT_DATE_FORMAT } from "../shared/constants/date";

describe("InputDate", () => {
  const defaultProps: InputDateProps = {
    label: "Test Label",
    name: "testName",
    value: "2023/10/10",
    min: "2023/01/01",
    onChange: jest.fn(),
  };
  const renderComponent = (props: InputDateProps) => {
    return render(
      <InputDate
        label={props.label}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        min={props.min}
      />,
    );
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Should render", async () => {
    expect.hasAssertions();
    renderComponent(defaultProps);
    const datePickerInput = screen.getByRole("textbox", {
      name: defaultProps.label,
    });
    expect(datePickerInput).toBeInTheDocument();
    expect(datePickerInput).toHaveValue(dayjs(defaultProps.value).format(DEFAULT_DATE_FORMAT));
    expect(true).toBe(true);
  });
  it.skip("Should call onChange with the correctly formatted date", async () => {
    const mockDate = "01/02/2023";
    const mockOnChange = jest.fn();
    const props: InputDateProps = { ...defaultProps, onChange: mockOnChange };

    renderComponent(props);

    const datePickerInput = screen.getByRole("textbox", { name: props.label });
    await userEvent.type(datePickerInput, mockDate);
    expect(mockOnChange).toHaveBeenCalledWith(
      props.name,
      dayjs(mockDate).format(DEFAULT_DATE_FORMAT),
    );
  });
});
