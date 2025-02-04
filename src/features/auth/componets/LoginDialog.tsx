import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth.ts";
import { AuthDialogProps } from "@/types/AuthDialogProps.ts";
import { validate } from "@/utils/validateLoginForm";

const LoginDialog: React.FC<AuthDialogProps> = (props) => {
  const { handleLogin } = useAuth();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        await handleLogin(values.email, values.password);
        resetForm();
        props.onClose();
      } catch (err) {
        formik.setErrors({ email: (err as Error).message });
      }
    },
  });
  return (
    <Dialog open={props.isOpen} onClose={props.onClose}>
      <DialogTitle>{t("login")}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="email"
            label={t("email")}
            type="email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            margin="normal"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name="password"
            label={t("password")}
            type="password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            margin="normal"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <DialogActions>
            <Button onClick={props.onClose}>{t("cancel")}</Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              {t("login")}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
