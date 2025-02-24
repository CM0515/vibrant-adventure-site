
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navegación
    'nav.home': 'Inicio',
    'nav.tours': 'Tours',
    'nav.about': 'Sobre Nosotros',
    'nav.contact': 'Contacto',
    'nav.book': 'Reserva Ahora',
    
    // Footer
    'footer.contact': 'Contacto',
    'footer.address': 'Dirección',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.followUs': 'Síguenos',
    'footer.newsletter': 'Boletín Informativo',
    'footer.subscribe': 'Suscríbete para recibir noticias y ofertas especiales',
    'footer.subscribeButton': 'Suscribirse',
    'footer.rights': 'Todos los derechos reservados',

    // Títulos de páginas
    'page.home': 'GoTours',
    'page.tours': 'Tours | GoTours',
    'page.about': 'Sobre Nosotros | GoTours',
    'page.contact': 'Contacto | GoTours',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.tours': 'Tours',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.book': 'Book Now',
    
    // Footer
    'footer.contact': 'Contact',
    'footer.address': 'Address',
    'footer.quickLinks': 'Quick Links',
    'footer.followUs': 'Follow Us',
    'footer.newsletter': 'Newsletter',
    'footer.subscribe': 'Subscribe to receive news and special offers',
    'footer.subscribeButton': 'Subscribe',
    'footer.rights': 'All rights reserved',

    // Page titles
    'page.home': 'GoTours',
    'page.tours': 'Tours | GoTours',
    'page.about': 'About Us | GoTours',
    'page.contact': 'Contact | GoTours',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageProvider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
