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
    'about.title': 'Acerca de Nosotros',
    'about.subtitle': 'GO TOUR es una sociedad empresarial de servicios turísticos, con un equipo humano comprometido con el desarrollo del turismo en Santa Cruz de Lorica y el departamento de Córdoba, así como a nivel nacional.',
    'about.description.1': 'Nuestra filosofía de trabajo y de servicio se basa en el desarrollo de las potencialidades de los procesos comunitarios turísticos aliados y de la conservación ecosistémica y cultural donde desarrollamos la actividad, generando además empoderamiento y conocimiento en el ámbito empresarial comunitario.',
    'about.description.2': 'Nos encontramos convencidos que vivir experiencias directas con la naturaleza, la cultura, las costumbres diarias y formas de vidas de las poblaciones enriquecen y generan un compromiso más fuerte y sentido, tanto para la industria del turismo como para el turista.',
    'about.description.3': 'Para nosotros el turismo es una oportunidad de generar desarrollo en las diferentes regiones del país con la participación directa de las comunidades, una oportunidad de hacer turismo con propósito protegiendo nuestros ecosistemas con acciones de conservación directa, una oportunidad de generar intercambio de culturas y conocimientos y protección de la misma y una oportunidad de hacer realidad los sueños tanto del turista como del prestador.',
    'about.mission.title': 'Misión',
    'about.mission.text': 'Ofrecer y compartir experiencias enriquecedoras mediante nuestros diferentes servicios y destinos turísticos ofertados, y desarrollar procesos de planificación y gestión del sector a nivel regional y nacional, con calidad, responsabilidad y eficiencia, respondiendo tanto a las necesidades de nuestros clientes como de las comunidades vinculadas y su cultura, propendiendo por el cuidado del medio ambiente y el desarrollo de productos turísticos sostenibles.',
    'about.vision.title': 'Visión',
    'about.vision.text': 'Posicionarnos como una de las agencias con más liderazgo del caribe colombiano en la prestación de servicios turísticos y el desarrollo de experiencias turísticas con propósitos y sostenibles, soportado en la calidad, calidez y responsabilidad frente a nuestros clientes, la innovación, la tecnología, el talento humano y la adaptación al cambio, así como también la protección del patrimonio cultural y ambiental de las comunidades.',
    'about.values.title': 'Valores Corporativos',
    'about.values.1': 'Calidad y Eficiencia en el Servicio',
    'about.values.2': 'Responsabilidad',
    'about.values.3': 'Compromiso',
    'about.values.4': 'Seguridad',
    'about.values.5': 'Alegría',
    'about.values.6': 'Innovación',
    'about.values.7': 'Pasión',
    'about.values.8': 'Puntualidad',
    'about.values.9': 'Calidez',
    'about.values.10': 'Confiabilidad',

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
    'about.description.1': 'Our work and service philosophy is based on developing the potential of allied community tourism processes and ecosystem and cultural conservation where we carry out our activity, also generating empowerment and knowledge in the community business environment.',
    'about.description.2': 'We are convinced that direct experiences with nature, culture, daily customs, and ways of life of populations enrich and generate a stronger and meaningful commitment, both for the tourism industry and for tourists.',
    'about.description.3': 'For us, tourism is an opportunity to generate development in different regions of the country with the direct participation of communities, an opportunity to do tourism with purpose protecting our ecosystems with direct conservation actions, an opportunity to generate exchange of cultures and knowledge and protection of the same, and an opportunity to make dreams come true for both tourists and providers.',
    'about.mission.title': 'Mission',
    'about.mission.text': 'To offer and share enriching experiences through our different services and tourist destinations offered, and develop planning and management processes in the sector at regional and national level, with quality, responsibility and efficiency, responding to both the needs of our clients and the linked communities and their culture, aiming for environmental care and the development of sustainable tourism products.',
    'about.vision.title': 'Vision',
    'about.vision.text': 'To position ourselves as one of the leading agencies in the Colombian Caribbean in providing tourist services and developing purposeful and sustainable tourist experiences, supported by quality, warmth and responsibility towards our clients, innovation, technology, human talent and adaptation to change, as well as the protection of the cultural and environmental heritage of communities.',
    'about.values.title': 'Corporate Values',
    'about.values.1': 'Quality and Service Efficiency',
    'about.values.2': 'Responsibility',
    'about.values.3': 'Commitment',
    'about.values.4': 'Security',
    'about.values.5': 'Joy',
    'about.values.6': 'Innovation',
    'about.values.7': 'Passion',
    'about.values.8': 'Punctuality',
    'about.values.9': 'Warmth',
    'about.values.10': 'Reliability',

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
