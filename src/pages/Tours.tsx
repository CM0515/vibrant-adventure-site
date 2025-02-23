import { Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

const Tours = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itinerarioNaturaleza = [
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

  const itinerarioDia1 = [
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

  const itinerarioMonteria = [
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

  return (
    <div className="min-h-screen">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent backdrop-blur-md"
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://lh3.googleusercontent.com/a/ACg8ocLolP-oDXrcJRUDaixu8hEJLoPstVHIA4lCPvE7x49PkcIfTC8=s288-c-no" 
                alt="GoTours Logo" 
                className="w-10 h-10 rounded-full"
              />
              <span className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-secondary" : "text-white"
              }`}>GoTours</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors duration-300 ${
                isScrolled ? "text-secondary hover:text-primary" : "nav-link"
              }`}>Inicio</Link>
              <Link to="/tours" className={`transition-colors duration-300 ${
                isScrolled ? "text-secondary hover:text-primary" : "nav-link"
              }`}>Tours</Link>
              <Link to="/about" className={`transition-colors duration-300 ${
                isScrolled ? "text-secondary hover:text-primary" : "nav-link"
              }`}>Sobre Nosotros</Link>
              <Link to="/contact" className={`transition-colors duration-300 ${
                isScrolled ? "text-secondary hover:text-primary" : "nav-link"
              }`}>Contacto</Link>
            </div>
            <Link to="/reserva" className="btn-primary">Reserva Ahora</Link>
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
              Nuestros Tours
            </h1>
            <p className="text-xl text-secondary-light">
              Experiencias únicas en el corazón del Sinú
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Tour 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-6 border-b border-gray-100 pb-6">
                <div>
                  <h2 className="text-2xl font-serif font-semibold mb-2">Detalles del Tour</h2>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Clock className="w-5 h-5" />
                    <span>2 Noches, 3 Días</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="w-5 h-5" />
                    <span>Córdoba - "El otro caribe, el caribe de los sentidos"</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-1">
                    $1.670.000
                  </div>
                  <div className="text-secondary-light">Por persona (Grupo 5 personas)</div>
                  <button className="mt-4 btn-primary">
                    Reservar Ahora
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-primary-light/30 rounded-xl p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Recomendaciones</h3>
                  <p className="text-secondary-light">
                    Usar ropa liviana y cómoda, gorra o sombreros de sol, protector solar, 
                    zapatos cómodos, buena disposición.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-semibold mb-4">Día 1</h3>
                  <div className="space-y-4">
                    {itinerarioDia1.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="w-32 font-medium text-primary">{item.hora}</div>
                        <div className="flex-1">{item.actividad}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tour 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-6 border-b border-gray-100 pb-6">
                <div>
                  <h2 className="text-2xl font-serif font-semibold mb-2">Naturaleza y Patrimonio</h2>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Clock className="w-5 h-5" />
                    <span>1 Día completo</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="w-5 h-5" />
                    <span>Santa Cruz de Lorica - Río Sinú</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-1">
                    $365.000
                  </div>
                  <div className="text-secondary-light">Por persona (Grupo 6 personas)</div>
                  <button className="mt-4 btn-primary">
                    Reservar Ahora
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-primary-light/30 rounded-xl p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Incluye</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviciosIncluidos.map((item, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="font-medium">{item.servicio}</span>
                        {item.detalle && <span className="text-sm text-secondary-light">{item.detalle}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-semibold mb-4">Itinerario</h3>
                  {itinerarioNaturaleza.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="w-32 font-medium text-primary">{item.hora}</div>
                      <div className="flex-1">{item.actividad}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary/5 rounded-xl p-6">
                  <p className="text-secondary-light">
                    Santa Cruz de Lorica – Río Sinú: El pueblo patrimonio con huellas Sirio-Libanesas en el Golfo de 
                    Morrosquillo es el escenario perfecto para vivir una experiencia turística inolvidable. Navegar por el 
                    majestuoso río Sinú y adentrarse en la Ciénaga de Bañó para observar y disfrutar de la variedad de aves, 
                    participar del programa 'Tortugas del Sinú' para conservar la hermosa Tortuga de Rio, endémica de 
                    Colombia en compañía de comunidades ribereñas de pescadores, llegar a descubrir la arquitectura y 
                    riqueza artesanal de Lorica acompañado de muestras folklóricas, una gastronomía rica y con sabor caribe 
                    entre chichas y bocachicos, es una experiencia que pondrá a prueba todos tus sentidos.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tour 3 - Montería */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-6 border-b border-gray-100 pb-6">
                <div>
                  <h2 className="text-2xl font-serif font-semibold mb-2">TRADICIÓN GANADERA, CULTURA Y NATURALEZA EN "LA PERLA DEL SINÚ"</h2>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Clock className="w-5 h-5" />
                    <span>2 Días, 1 Noche</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="w-5 h-5" />
                    <span>Montería - "Donde la tradición ganadera y la naturaleza elevan tus sentidos"</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-1">
                    $1.280.000
                  </div>
                  <div className="text-secondary-light">Por persona (Grupo 6 personas)</div>
                  <button className="mt-4 btn-primary">
                    Reservar Ahora
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-primary-light/30 rounded-xl p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Descripción</h3>
                  <p className="text-secondary-light">
                    Situada en el corazón del departamento de Córdoba, pasando por ella el majestuoso río Sinú, Montería es 
                    una ciudad vibrante y llena de encanto. Conocida como la Perla del Sinú, ofrece una mezcla única de 
                    naturaleza, cultura, gastronomía y modernidad que la convierte en un destino imperdible.
                  </p>
                </div>

                <div className="bg-primary-light/30 rounded-xl p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Incluye</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviciosMonteria.map((item, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="font-medium">{item.servicio}</span>
                        {item.detalle && <span className="text-sm text-secondary-light">{item.detalle}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-semibold mb-4">Itinerario</h3>
                  {itinerarioMonteria.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="w-32 font-medium text-primary">{item.hora}</div>
                      <div className="flex-1">
                        <div>{item.actividad}</div>
                        <div className="text-sm text-secondary-light">{item.lugar}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tours;
