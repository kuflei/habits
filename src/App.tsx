import { Container } from '@mui/material'
import { useEffect } from 'react'
import { useHabitStore } from '@/store/useHabitStore'
import AppRoutes from '@/routes/routeConfig'
import MainNavigation from '@/features/navigation/MainNavigation'

function App() {
    const initializeRewards = useHabitStore((state) => state.initializeRewards);

    useEffect(() => {
        initializeRewards();
    }, [initializeRewards]);
    return (
        <Container maxWidth="lg" sx={{ mb: 12 }}>
            <MainNavigation />
            <AppRoutes />
        </Container>
    )
}

export default App
