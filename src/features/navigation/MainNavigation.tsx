import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import AuthButton from "@/features/auth/componets/AuthButton";

export default function MainNavigation() {
  const { t, i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState("uk");
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setActiveLanguage(lng);
  };
  const userId = useAuthStore((state) => state.userId);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
        {userId ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/habits"
              sx={{ mr: 2 }}
            >
              {t("habits")}
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/wishlist"
              sx={{ mr: 2 }}
            >
              {t("wishlist")}
            </Button>
          </>
        ) : null}
        <AuthButton />
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button
            sx={{
              backgroundColor: activeLanguage === "uk" ? "#1565c0" : "#fff",
              color: activeLanguage === "uk" ? "#fff" : "#1565c0",
            }}
            onClick={() => changeLanguage("uk")}
          >
            UA
          </Button>
          <Button
            sx={{
              backgroundColor: activeLanguage === "en" ? "#1565c0" : "#fff",
              color: activeLanguage === "en" ? "#fff" : "#1565c0",
            }}
            onClick={() => changeLanguage("en")}
          >
            EN
          </Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
