import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/i18n";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import MainNavigation from "./MainNavigation";
import { useAuthStore } from "@/store/authStore";

const theme = createTheme();

const withProviders = (Story: () => JSX.Element): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default {
  title: "Components/MainNavigation",
  component: MainNavigation,
  decorators: [withProviders],
};

export const LoggedIn = () => {
  useAuthStore.setState({ userId: "1" });
  return <MainNavigation />;
};

export const LoggedOut = () => {
  useAuthStore.setState({ userId: null });
  return <MainNavigation />;
};
