
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PQRS from "./pages/PQRS";

const queryClient = new QueryClient();

const TitleManager = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/': t('page.home'),
      '/tours': t('page.tours'),
      '/about': t('page.about'),
      '/contact': t('page.contact'),
      '/pqrs': 'PQRS'
    };

    document.title = titles[location.pathname] || t('page.home');
  }, [location, t]);

  return null;
};

const AppRoutes = () => (
  <BrowserRouter>
    <TitleManager />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pqrs" element={<PQRS />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
