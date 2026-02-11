import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Eagerly load the main landing page
import LandingPage from "./components/home/LandingPage";

// Lazy load other routes for better performance
const SpecialsPage = lazy(() => import("./components/special/Special"));
const AboutPage = lazy(() => import("./components/aboutUs/AboutUs"));
const MenuPage = lazy(() => import("./components/menu/MenuPage"));

// Loading fallback component
const PageLoader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      bgcolor: "#0A1628",
    }}
  >
    <CircularProgress sx={{ color: "#F5A623" }} />
  </Box>
);

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/special" element={<SpecialsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/menu" element={<MenuPage />} />
            {/* 404 fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
