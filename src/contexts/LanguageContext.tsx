
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

    // Página de Contacto
    'contact.title': 'Contacto',
    'contact.subtitle': 'Estamos aquí para ayudarte a planear tu próxima aventura',
    'contact.info.title': 'Información de Contacto',
    'contact.address.title': 'Dirección',
    'contact.address.value': 'Calle Principal #123, Montería, Córdoba',
    'contact.phone.title': 'Teléfono',
    'contact.phone.value': '+57 (123) 456-7890',
    'contact.email.title': 'Email',
    'contact.email.value': 'info@gotour.com.co',
    'contact.hours.title': 'Horario de Atención',
    'contact.hours.weekdays': 'Lunes a Viernes: 8:00 AM - 6:00 PM',
    'contact.hours.weekends': 'Sábados: 9:00 AM - 2:00 PM',
    'contact.form.title': 'Envíanos un Mensaje',
    'contact.form.name': 'Nombre Completo',
    'contact.form.email': 'Correo Electrónico',
    'contact.form.subject': 'Asunto',
    'contact.form.message': 'Mensaje',
    'contact.form.submit': 'Enviar Mensaje',
    'contact.form.submitting': 'Enviando...',
    'contact.form.success': 'Mensaje enviado',
    'contact.form.success.description': 'Nos pondremos en contacto contigo pronto.',

    // Página Sobre Nosotros
    'about.title': 'Sobre Nosotros',
    'about.subtitle': 'Descubre nuestra pasión por compartir la riqueza cultural y natural de Córdoba',
    'about.mission.title': 'Nuestra Misión',
    'about.mission.text': 'En Patrimonio Mágico Sinuano, nos dedicamos a crear experiencias turísticas únicas y memorables que celebran la rica herencia cultural y natural de Córdoba. Nos comprometemos a promover un turismo sostenible que beneficie a las comunidades locales mientras preservamos nuestras tradiciones y recursos naturales para las generaciones futuras.',
    'about.vision.title': 'Nuestra Visión',
    'about.vision.text': 'Aspiramos a ser líderes en el turismo experiencial en Córdoba, reconocidos por nuestra excelencia en el servicio, compromiso con la sostenibilidad y capacidad para crear conexiones significativas entre visitantes y nuestra cultura local. Buscamos posicionar a Córdoba como un destino turístico de clase mundial que preserve y celebre su patrimonio único.',
    'about.values.title': 'Nuestros Valores',
    'about.values.authenticity': 'Autenticidad',
    'about.values.authenticity.text': 'Preservamos y compartimos las tradiciones genuinas de nuestra región',
    'about.values.sustainability': 'Sostenibilidad',
    'about.values.sustainability.text': 'Protegemos nuestro entorno natural y cultural para el futuro',
    'about.values.community': 'Comunidad',
    'about.values.community.text': 'Trabajamos junto a las comunidades locales para un desarrollo inclusivo',

    // Página de Tours
    'tours.title': 'Nuestros Tours',
    'tours.subtitle': 'Experiencias únicas en el corazón del Sinú',
    'tours.tourDetails': 'Detalles del Tour',
    'tours.included': 'Incluye',
    'tours.itinerary': 'Itinerario',
    'tours.book': 'Reservar Ahora',
    'tours.recommendations': 'Recomendaciones',
    'tours.recommendations.text': 'Usar ropa liviana y cómoda, gorra o sombreros de sol, protector solar, zapatos cómodos, buena disposición.',
    'tours.price.from': 'Desde',
    'tours.price.person': 'Por persona',
    'tours.price.group': 'Grupo',
    'tours.duration': 'Duración',
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

    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'We are here to help you plan your next adventure',
    'contact.info.title': 'Contact Information',
    'contact.address.title': 'Address',
    'contact.address.value': 'Main Street #123, Montería, Córdoba',
    'contact.phone.title': 'Phone',
    'contact.phone.value': '+57 (123) 456-7890',
    'contact.email.title': 'Email',
    'contact.email.value': 'info@gotour.com.co',
    'contact.hours.title': 'Business Hours',
    'contact.hours.weekdays': 'Monday to Friday: 8:00 AM - 6:00 PM',
    'contact.hours.weekends': 'Saturday: 9:00 AM - 2:00 PM',
    'contact.form.title': 'Send us a Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.submitting': 'Sending...',
    'contact.form.success': 'Message sent',
    'contact.form.success.description': 'We will contact you soon.',

    // About Page
    'about.title': 'About Us',
    'about.subtitle': 'Discover our passion for sharing the cultural and natural richness of Córdoba',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'At Patrimonio Mágico Sinuano, we are dedicated to creating unique and memorable tourist experiences that celebrate the rich cultural and natural heritage of Córdoba. We are committed to promoting sustainable tourism that benefits local communities while preserving our traditions and natural resources for future generations.',
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'We aspire to be leaders in experiential tourism in Córdoba, recognized for our service excellence, commitment to sustainability, and ability to create meaningful connections between visitors and our local culture. We seek to position Córdoba as a world-class tourist destination that preserves and celebrates its unique heritage.',
    'about.values.title': 'Our Values',
    'about.values.authenticity': 'Authenticity',
    'about.values.authenticity.text': 'We preserve and share the genuine traditions of our region',
    'about.values.sustainability': 'Sustainability',
    'about.values.sustainability.text': 'We protect our natural and cultural environment for the future',
    'about.values.community': 'Community',
    'about.values.community.text': 'We work alongside local communities for inclusive development',

    // Tours Page
    'tours.title': 'Our Tours',
    'tours.subtitle': 'Unique experiences in the heart of Sinú',
    'tours.tourDetails': 'Tour Details',
    'tours.included': 'Included',
    'tours.itinerary': 'Itinerary',
    'tours.book': 'Book Now',
    'tours.recommendations': 'Recommendations',
    'tours.recommendations.text': 'Wear light and comfortable clothing, cap or sun hats, sunscreen, comfortable shoes, good disposition.',
    'tours.price.from': 'From',
    'tours.price.person': 'Per person',
    'tours.price.group': 'Group',
    'tours.duration': 'Duration',
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
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
