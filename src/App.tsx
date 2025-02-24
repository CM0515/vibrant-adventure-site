
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente para manejar los títulos dinámicos
const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/': 'Inicio | GoTours - Descubre el Patrimonio Mágico Sinuano',
      '/tours': 'Tours y Experiencias | GoTours - Turismo en Córdoba',
      '/about': 'Sobre Nosotros | GoTours - Conoce Nuestra Historia',
      '/contact': 'Contacto | GoTours - ¿Cómo Podemos Ayudarte?'
    };

    document.title = titles[location.pathname] || 'GoTours - Descubre el Patrimonio Mágico Sinuano';
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TitleManager />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
