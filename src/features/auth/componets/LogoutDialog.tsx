import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import { AuthDialogProps } from "@/types/AuthDialogProps";

const LogoutDialog: React.FC<AuthDialogProps> = (props) => {
  const { handleLogout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSubmit = async () => {
    try {
      await handleLogout();
      props.onClose();
    } catch (err) {
      setError((err as Error).message);
    }
  };
  return (
    <Dialog open={props.isOpen} onClose={props.onClose}>
      <DialogTitle>{t("logout")}</DialogTitle>
      <DialogContent>
        <p>{t("confirmLogout")}</p>
        {error && <FormHelperText error>{error}</FormHelperText>}{" "}
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={props.onClose}>
          {t("cancel")}
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          {t("logout")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default LogoutDialog;
