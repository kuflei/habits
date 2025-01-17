import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthDialog from './AuthDialog';
import { useAuthStore } from '@/store/authStore';

const AuthButton: React.FC = () => {
    const { t } = useTranslation();
    const userId = useAuthStore((state) => state.userId);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const toggleDialog = (mode: 'login' | 'logout') => {
        setIsLoginMode(mode === 'login');
        setIsDialogOpen(true);
    };

    return (
        <>
            <Button sx={{mr: 2}}
                color="inherit"
                onClick={() => toggleDialog(userId ? 'logout' : 'login')}>
                {userId ? t('logout') : t('login')}
            </Button>
            <AuthDialog
                isOpen={isDialogOpen}
                isLoginMode={isLoginMode}
                onClose={() => setIsDialogOpen(false)}
            />
        </>
    );
};

export default AuthButton;
