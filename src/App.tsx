import AppRoutes from './routes/index.tsx'
import MainNavigation from './components/ui/MainNavigation'
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
