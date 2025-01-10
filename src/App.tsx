import AppRoutes from './routes/routeConfig'
import MainNavigation from './features/navigation/MainNavigation'
import { Container } from '@mui/material'

function App() {
    return (
        <Container maxWidth="lg">
            <MainNavigation />
            <AppRoutes />
        </Container>


    )
}

export default App
