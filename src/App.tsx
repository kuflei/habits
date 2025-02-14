import { Container } from "@mui/material";
import AppRoutes from "@/routes/routeConfig";
import MainNavigation from "@/features/navigation/MainNavigation";
import ErrorBoundary from "@/utils/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <MainNavigation />
        <AppRoutes />
      </Container>
    </ErrorBoundary>
  );
}

export default App;
