import { Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import LanguageSelector from "../components/LanguageSelector";
import { useLanguage } from "../contexts/LanguageContext";
import { TourBookingButton } from "@/components/TourBookingButton";

type ItineraryItem = {
  hora: string;
  actividad: string;
  lugar?: string;
};

const Tours = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itinerarioNaturaleza: ItineraryItem[] = [
    { hora: "06:45 am", actividad: "Bienvenida e indicaciones (Puerto de embarque Centro Histórico de Lorica)" },
    { hora: "07:00 am", actividad: "Recorrido náutico biocultural por el río Sinú Lorica-Cotocá Arriba" },
    { hora: "08:00 am", actividad: "Recepción en Centro ecoturístico 'Econbiba' y desayuno campesino" },
    { hora: "08:45 am", actividad: "Recorrido ambiental por el Distrito de Conservación de Suelos 'Ciénaga de Bañó' en canoa con guianza nativa – observación de aves." },
    { hora: "11:00 am", actividad: "Refrigerio" },
    { hora: "11:30 am", actividad: "Experiencia 'turismo con propósito, adopta una tortuga'" },
    { hora: "12:30 pm", actividad: "Recorrido náutico bio cultural por el río Sinú Cotocá Arriba-Lorica" },
    { hora: "13:30 pm", actividad: "Almuerzo tradicional sinuano en el mercado público de Lorica" },
    { hora: "3:00 pm", actividad: "Recorrido guiado (City Tour) centro histórico Santa Cruz de Lorica" },
    { hora: "5:00 pm", actividad: "Muestra folklórica bajo sinuana (Pitos y tambores) con hidratación" },
    { hora: "5:30 pm", actividad: "Finalización de la jornada" }
  ];

  const serviciosIncluidos = [
    { servicio: "Transporte náutico por el río Sinú", detalle: "Recorrido en lancha a motor fuera de borda" },
    { servicio: "Acompañamiento", detalle: "Equipo Go Tour" },
    { servicio: "Recorrido por el centro histórico", detalle: "Recorrido guiado" },
    { servicio: "Transporte acuático por Ciénaga", detalle: "Canoas, chalecos, binoculares, guía" },
    { servicio: "Alimentación", detalle: "Almuerzo sinuano" },
    { servicio: "Refrigerio e hidratación", detalle: "" },
    { servicio: "Guianza profesional", detalle: "En todos los recorridos" },
    { servicio: "Seguro médico", detalle: "Seguro de asistencia médica" }
  ];

  const itinerarioDia1: ItineraryItem[] = [
    { hora: "8:00 - 8:30 am", actividad: "Bienvenida en el aeropuerto y entrega de un delantal de cocina vueltioo marcado." },
    { hora: "8:30 - 9:30 am", actividad: "Traslado aeropuerto de Montería a Santa Cruz de Lorica" },
    { hora: "9:30 -10:30 am", actividad: "Recibimiento con muestra folklórica y desayuno tradicional en el mercado público" },
    { hora: "10:30 - 11:00 am", actividad: "Instalación en hotel Onoma" },
    { hora: "11:00 - 1:00 pm", actividad: "Visita dentro artesanal Marcial Alegría, Experiencia 'Pintando el Pensamiento'" },
    { hora: "1:00 - 3:00 pm", actividad: "Almuerzo tradicional sinuano en el restaurante La Mula" },
    { hora: "3:00 - 4:00 pm", actividad: "Tiempo de descanso" },
    { hora: "4:00 - 6:30 pm", actividad: "City tour cultural en el centro histórico de Santa Cruz de Lorica" },
    { hora: "6:30 - 8:00 pm", actividad: "Cena romántica en Las Delicias de la abuela" },
    { hora: "8:00 - 9:00 pm", actividad: "Coctel y tertulia 'Viaje en la memoria histórica del Sinú'" }
  ];

  const itinerarioMonteria: ItineraryItem[] = [
    { hora: "7:00 am", actividad: "Inicio de actividad (Transporte terrestre Montería-Hacienda la Quinta)", lugar: "Montería" },
    { hora: "8:00 am", actividad: "Experiencia sostenible de ganadería personalizada (Incluye cabalgata, desayuno, almuerzo y refrigerio)", lugar: "La Quinta" },
    { hora: "2:00 pm", actividad: "Traslado La Quinta – Ronda del Sinú, Montería", lugar: "Montería" },
    { hora: "2:30 pm", actividad: "Tour ronda del Sinú (experiencia sensorial e histórica en la ronda del Sinú", lugar: "Ronda del Sinú" },
    { hora: "3:30 pm", actividad: "Refrigerio (frutos tropicales)", lugar: "Ronda del Sinú" },
    { hora: "4:00 pm", actividad: "Tour Río Sinú 'La Majestuosidad Biocultural del Sinú' con hidratación", lugar: "Río Sinú" },
    { hora: "6:00 pm", actividad: "Alojamiento hotel Florida Sinú", lugar: "Hotel Florida Sinú" },
    { hora: "7:00 am", actividad: "Desayuno tradicional sabanero", lugar: "Hotel Florida Sinú" },
    { hora: "8:00 am", actividad: "Traslado de Montería a Ciénaga de Betancí", lugar: "Montería" },
    { hora: "9:00 am", actividad: "Experiencia cultural de arqueología indígena", lugar: "Betancí" },
    { hora: "9:30 am", actividad: "Tour comunitario en ciénaga de Betancí (Observación de aves y navegación en lancha)", lugar: "Ciénaga de Betancí" },
    { hora: "12:00 pm", actividad: "Actividad 'Turismo con propósito Siembra vida, siembro un árbol'", lugar: "Ciénaga de Betancí" },
    { hora: "12:30 pm", actividad: "Almuerzo tradicional costero (Bocachico frito y sancocho de Bocachico)", lugar: "Ciénaga de Betancí" },
    { hora: "2:30 pm", actividad: "Fin de la actividad", lugar: "Ciénaga de Betancí" }
  ];

  const serviciosMonteria = [
    { servicio: "Transporte Montería", detalle: "Hacienda la quitan - ciénaga de Betancí" },
    { servicio: "Alimentación (Almuerzo)", detalle: "Almuerzo en la granja de Paul - ciénaga de Betancí" },
    { servicio: "Refrigerio - hidratación", detalle: "Ronda del Sinú- hacienda la quinta" },
    { servicio: "Guía profesional en todo el recorrido", detalle: "Guía para el recorrido" },
    { servicio: "Lancha por el río Sinú", detalle: "Recorrido por el río Sinú" },
    { servicio: "Seguro de turismo", detalle: "Seguro de asistencia médica" }
  ];

  const tours = [
    {
      id: "tour-1",
      name: "Detalles del Tour",
      location: "Córdoba - \"El otro caribe, el caribe de los sentidos\"",
      duration: "2 Noches, 3 Días",
      price: 1670000,
      priceInfo: "Por persona (Grupo 5 personas)",
      description: null,
      itinerary: itinerarioDia1,
      services: null,
      recommendations: "Usar ropa liviana y cómoda, gorra o sombreros de sol, protector solar, zapatos cómodos, buena disposición."
    },
    {
      id: "tour-2",
      name: "Naturaleza y Patrimonio",
      location: "Santa Cruz de Lorica - Río Sinú",
      duration: "1 Día completo",
      price: 365000,
      priceInfo: "Por persona (Grupo 6 personas)",
      description: "Santa Cruz de Lorica – Río Sinú: El pueblo patrimonio con huellas Sirio-Libanesas en el Golfo de Morrosquillo es el escenario perfecto para vivir una experiencia turística inolvidable. Navegar por el majestuoso río Sinú y adentrarse en la Ciénaga de Bañó para observar y disfrutar de la variedad de aves, participar del programa 'Tortugas del Sinú' para conservar la hermosa Tortuga de Rio, endémica de Colombia en compañía de comunidades ribereñas de pescadores, llegar a descubrir la arquitectura y riqueza artesanal de Lorica acompañado de muestras folklóricas, una gastronomía rica y con sabor caribe entre chichas y bocachicos, es una experiencia que pondrá a prueba todos tus sentidos.",
      itinerary: itinerarioNaturaleza,
      services: serviciosIncluidos
    },
    {
      id: "tour-3",
      name: "TRADICIÓN GANADERA, CULTURA Y NATURALEZA EN \"LA PERLA DEL SINÚ\"",
      location: "Montería - \"Donde la tradición ganadera y la naturaleza elevan tus sentidos\"",
      duration: "2 Días, 1 Noche",
      price: 1280000,
      priceInfo: "Por persona (Grupo 6 personas)",
      description: "Situada en el corazón del departamento de Córdoba, pasando por ella el majestuoso río Sinú, Montería es una ciudad vibrante y llena de encanto. Conocida como la Perla del Sinú, ofrece una mezcla única de naturaleza, cultura, gastronomía y modernidad que la convierte en un destino imperdible.",
      itinerary: itinerarioMonteria,
      services: serviciosMonteria
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF3E8] via-white to-[#FFE4CC]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://lh3.googleusercontent.com/a/ACg8ocLolP-oDXrcJRUDaixu8hEJLoPstVHIA4lCPvE7x49PkcIfTC8=s288-c-no" 
                alt="GoTours Logo" 
                className="w-10 h-10 rounded-full"
              />
              <span className="text-2xl font-bold text-secondary">GoTours</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-secondary hover:text-primary">{t('nav.home')}</Link>
              <Link to="/tours" className="text-secondary hover:text-primary">{t('nav.tours')}</Link>
              <Link to="/about" className="text-secondary hover:text-primary">{t('nav.about')}</Link>
              <Link to="/contact" className="text-secondary hover:text-primary">{t('nav.contact')}</Link>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <Link to="/reserva" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
                {t('nav.book')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-12 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-4">
              {t('tours.title')}
            </h1>
            <p className="text-xl text-secondary-light">
              {t('tours.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-8">
            {tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-6 border-b border-gray-100 pb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-semibold mb-2">{tour.name}</h2>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Clock className="w-5 h-5" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                      <MapPin className="w-5 h-5" />
                      <span>{tour.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                      ${tour.price.toLocaleString()}
                    </div>
                    <div className="text-secondary-light">{tour.priceInfo}</div>
                    <TourBookingButton 
                      tourData={tour} 
                      className="mt-4 btn-primary"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  {tour.recommendations && (
                    <div className="bg-primary-light/30 rounded-xl p-6">
                      <h3 className="text-xl font-serif font-semibold mb-3">Recomendaciones</h3>
                      <p className="text-secondary-light">
                        {tour.recommendations}
                      </p>
                    </div>
                  )}

                  {tour.description && (
                    <div className="bg-primary-light/30 rounded-xl p-6">
                      <h3 className="text-xl font-serif font-semibold mb-3">Descripción</h3>
                      <p className="text-secondary-light">
                        {tour.description}
                      </p>
                    </div>
                  )}

                  {tour.services && (
                    <div className="bg-primary-light/30 rounded-xl p-6">
                      <h3 className="text-xl font-serif font-semibold mb-3">Incluye</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tour.services.map((item, index) => (
                          <div key={index} className="flex flex-col">
                            <span className="font-medium">{item.servicio}</span>
                            {item.detalle && <span className="text-sm text-secondary-light">{item.detalle}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tour.itinerary && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-serif font-semibold mb-4">Itinerario</h3>
                      {tour.itinerary.map((item, index) => (
                        <div 
                          key={index} 
                          className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="w-32 font-medium text-primary">{item.hora}</div>
                          <div className="flex-1">
                            <div>{item.actividad}</div>
                            {item.lugar && <div className="text-sm text-secondary-light">{item.lugar}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tours;
