import { Container } from "@mui/material";
import AppRoutes from "@/routes/routeConfig";
import MainNavigation from "@/features/navigation/MainNavigation";

function App() {
  return (
    <Container maxWidth="lg" sx={{ mb: 12 }}>
      <MainNavigation />
      <AppRoutes />
    </Container>
  );
}

export default App;
