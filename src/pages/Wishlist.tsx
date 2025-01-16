import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import { useHabitStore } from '@/store/useHabitStore';
import {useTranslation} from "react-i18next";

const Wishlist: React.FC = () => {
    const { t } = useTranslation();
    const rewardsList = useHabitStore((state) => state.rewardsList);

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 4 }}>{t("wishlist")}</Typography>
            {rewardsList.map((reward) => (
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
