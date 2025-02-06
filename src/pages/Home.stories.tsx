import React from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18n";
import { useAuthStore } from "@/store/authStore";
import { useHabitStore } from "@/store/useHabitStore";
import Home from "./Home";

const theme = createTheme();

const withProviders = (Story: () => JSX.Element): JSX.Element => {
  useAuthStore.setState({ userId: "1" });
  useHabitStore.setState({
    habits: [
      { id: "1", name: "Test Habit", reward: "Test Reward" },
      { id: "2", name: "Another Habit", reward: "Another Reward" },
    ],
  });

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
  title: "Pages/Home",
  component: Home,
  tags: ["autodocs"],
  decorators: [withProviders],
};

export const Default = () => {
  useAuthStore.setState({ userId: "1" });
  useHabitStore.setState({
    habits: [
      { id: "1", name: "Test Habit", reward: "Test Reward" },
      { id: "2", name: "Another Habit", reward: "Another Reward" },
    ],
  });

  return <Home />;
};

// Сценарій 2: Користувач залогінений, але немає звичок
export const WithoutHabits = () => {
  useAuthStore.setState({ userId: "1" });
  useHabitStore.setState({ habits: [] });

  return <Home />;
};

// Сценарій 3: Користувач не залогінений
export const NotLoggedIn = () => {
  useAuthStore.setState({ userId: null });
  useHabitStore.setState({ habits: [] });

  return <Home />;
};
