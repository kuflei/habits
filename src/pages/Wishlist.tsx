import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import { useHabitStore } from '@/store/useHabitStore';
import {useTranslation} from "react-i18next";

const rewards = [
    { id: 1, name: 'New Book' },
    { id: 2, name: 'Movie Ticket' },
    { id: 3, name: 'Spa Day' },
    { id: 4, name: 'Fancy Dinner' },
];

const Wishlist: React.FC = () => {
    const setRewardsList = useHabitStore((state) => state.setRewardsList);
    const { t } = useTranslation();

    React.useEffect(() => {
        setRewardsList(rewards);
    }, [setRewardsList]);

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 4 }}>{t("wishlist")}</Typography>
            {rewards.map((reward) => (
                <Card key={reward.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{reward.name}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Wishlist;
