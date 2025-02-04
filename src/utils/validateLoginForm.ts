export const validate = (values: { email: string; password: string }) => {
  const errors: { email?: string; password?: string } = {};
  if (!values.email) {
    errors.email = "Email required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }
  if (!values.password) {
    errors.password = "Password required";
  }
  return errors;
};
