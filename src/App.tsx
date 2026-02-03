import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

// Eagerly load the main landing page
import LandingPage from "./components/home/landingPage-static";

// Lazy load other routes for better performance
const Special = lazy(() => import("./components/special/Special"));
const About = lazy(() => import("./components/aboutUs/AboutUs"));
const MenuNew = lazy(() => import("./components/menu/menuNew"));

// Loading fallback component
const PageLoader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      bgcolor: "#001e36",
    }}
  >
    <CircularProgress sx={{ color: "#FF8C00" }} />
  </Box>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/special" element={<Special />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MenuNew />} />
          {/* Redirect old menu-new route to new menu route */}
          <Route path="/menu-new" element={<MenuNew />} />
          {/* 404 fallback - redirect to home */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
