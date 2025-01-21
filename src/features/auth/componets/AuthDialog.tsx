import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface AuthDialogProps {
    isOpen: boolean;
    isLoginMode: boolean;
    onClose: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = (props) => {
    const { t } = useTranslation();
    const { handleLogin, handleLogout } = useAuth();
    const [email, setEmail] = useState('john@example.com');
    const [password, setPassword] = useState('123');
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (props.isLoginMode) {
                if (!email.trim() || !password.trim()) {
                    throw new Error(t('fillAllFields') || 'Please fill all fields');
                }
                await handleLogin(email, password);
            } else {
                await handleLogout();
            }
            props.onClose();
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <Dialog open={props.isOpen} onClose={props.onClose}>
            <DialogTitle>{props.isLoginMode ? t('login') : t('logout')}</DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent>
                    {props.isLoginMode ? (
                        <>
                            <TextField
                                label={t('email')}
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label={t('password')}
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                            />
                        </>
                    ) : (
                        <p>{t('confirmLogout')}</p>
                    )}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="secondary">
                        {t('cancel')}
                    </Button>
                    <Button type="submit" color="primary">
                        {props.isLoginMode ? t('login') : t('logout')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AuthDialog;
