import { Container } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "@/routes/routeConfig";
import MainNavigation from "@/features/navigation/MainNavigation";
import ErrorBoundary from "@/utils/ErrorBoundary";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <MainNavigation />
        <AppRoutes />
      </Container>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
