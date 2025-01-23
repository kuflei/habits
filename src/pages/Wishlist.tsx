import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, FormControl, Dialog, DialogContent, DialogActions, TextField } from '@mui/material';
import {useTranslation} from "react-i18next";
import {useAuthStore} from "@/store/authStore.ts";
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';

const Wishlist = () => {
    const { wishlist, loading, error, addItem, removeItem } = useWishlist();
    const [newItem, setNewItem] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = useAuthStore((state) => state.userId);
    const { t } = useTranslation();

    const handleAdd = () => {
        if (newItem.trim()) {
            addItem(userId, { id: Date.now().toString(), name: newItem });
            setNewItem('');
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <h1>{t('wishlist')}</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {wishlist.map((item) => (
                <div key={item.id}>
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{item.name}</Typography>
                        </CardContent>
                    </Card>
                    <Button
                        sx={{ mb: 4 }}
                        variant="contained"
                        onClick={() => removeItem(userId, item.id)}
                    >
                        {t("delete")}
                    </Button>
                </div>
            ))}
            <Button
                variant="contained"
                sx={{ ml: 'auto', display: 'block' }}
                onClick={() => setIsModalOpen(true)}
            >
                {t('newWishlistItem')}
            </Button>
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label={t('newWishlistItem')}
                            variant="outlined"
                            type="text"
                            name="name"
                            placeholder={t('newWishlistItem')}
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                        />
                    </FormControl>
                    <Button variant="contained" onClick={handleAdd}>
                        {t("addNewWishlistItem")}
                    </Button>
                    <DialogActions>
                        <Button onClick={() => setIsModalOpen(false)} color="primary">
                            {t("close")}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Wishlist;