import React, { useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/authStore";
import LogoutDialog from "./LogoutDialog.tsx";
import LoginDialog from "./LoginDialog.tsx";

const AuthButton: React.FC = () => {
  const { t } = useTranslation();
  const isAuthenticated = useAuthStore((state) => !!state.userId);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen((prev) => !prev);

  const DialogComponent = isAuthenticated ? LogoutDialog : LoginDialog;

  return (
    <>
      <Button sx={{ mr: 2 }} color="inherit" onClick={toggleDialog}>
        {t(isAuthenticated ? "logout" : "login")}
      </Button>
      <DialogComponent isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default AuthButton;
