
import { Clock, MapPin, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

  return (
    <div className="min-h-screen">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent backdrop-blur-md"
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="https://lh3.googleusercontent.com/a/ACg8ocLolP-oDXrcJRUDaixu8hEJLoPstVHIA4lCPvE7x49PkcIfTC8=s288-c-no" 
                alt="GoTours Logo" 
                className="w-10 h-10 rounded-full"
              />
              <span className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-secondary" : "text-white"
              }`}>GoTours</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors duration-300 ${
                isScrolled ? "text-secondary hover:text-primary" : "nav-link"
              }`}>Inicio</Link>
              <Link to="/tours" className={`transition-colors duration-300 ${
                isScrolled ? "text-secondary hover:text-primary" : "nav-link"
              }`}>Tours</Link>
              <Link to="#" className={`transition-colors duration-300 ${
                isScrolled ? "text-secondary hover:text-primary" : "nav-link"
              }`}>Sobre Nosotros</Link>
              <Link to="#" className={`transition-colors duration-300 ${
                isScrolled ? "text-secondary hover:text-primary" : "nav-link"
              }`}>Contacto</Link>
            </div>
            <button className="btn-primary">Reserva Ahora</button>
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
              Patrimonio Mágico Sinuano
            </h1>
            <p className="text-xl text-secondary-light">
              "Una experiencia de saberes y sabores"
            </p>
          </motion.div>

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
                  {[
                    { hora: "8:00 - 8:30 am", actividad: "Bienvenida en el aeropuerto y entrega de un delantal de cocina vueltioo marcado." },
                    { hora: "8:30 - 9:30 am", actividad: "Traslado aeropuerto de Montería a Santa Cruz de Lorica" },
                    { hora: "9:30 -10:30 am", actividad: "Recibimiento con muestra folklórica y desayuno tradicional en el mercado público" },
                    { hora: "10:30 - 11:00 am", actividad: "Instalación en hotel Onoma" },
                    { hora: "11:00 - 1:00 pm", actividad: 'Visita dentro artesanal Marcial Alegría, Experiencia "Pintando el Pensamiento"' },
                    { hora: "1:00 - 3:00 pm", actividad: "Almuerzo tradicional sinuano en el restaurante La Mula" },
                    { hora: "3:00 - 4:00 pm", actividad: "Tiempo de descanso" },
                    { hora: "4:00 - 6:30 pm", actividad: "City tour cultural en el centro histórico de Santa Cruz de Lorica (Historia, literatura, arquitectura, entrada a iglesia)" },
                    { hora: "6:30 - 8:00 pm", actividad: "Cena romántica en Las Delicias de la abuela" },
                    { hora: "8:00 - 9:00 pm", actividad: 'Coctel y tertulia "Viaje en la memoria histórica del Sinú"' }
                  ].map((item, index) => (
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
        </div>
      </section>

      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-serif text-xl mb-4">Contáctanos</h4>
              <p className="mb-2">Email: info@patrimoniomágico.com</p>
              <p className="mb-2">Tel: +57 (123) 456-7890</p>
              <p>Dirección: Calle Principal #123, Montería, Córdoba</p>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-4">Boletín Informativo</h4>
              <p className="mb-4">Suscríbete para recibir noticias y ofertas especiales</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-2 rounded-lg text-secondary"
                />
                <button className="bg-primary hover:bg-primary-hover px-6 py-2 rounded-lg transition-colors">
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">
            <p>© 2024 Patrimonio Mágico Sinuano. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Tours;
