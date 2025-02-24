import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              <Link to="/" className="text-secondary hover:text-primary">Inicio</Link>
              <Link to="/tours" className="text-secondary hover:text-primary">Tours</Link>
              <Link to="/about" className="text-secondary hover:text-primary">Sobre Nosotros</Link>
              <Link to="/contact" className="text-secondary hover:text-primary">Contacto</Link>
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Sobre Nosotros
            </h1>
            <p className="text-xl text-secondary-light max-w-2xl mx-auto">
              Descubre nuestra pasión por compartir la riqueza cultural y natural de Córdoba
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">
                Nuestra Misión
              </h2>
              <p className="text-secondary-light leading-relaxed">
                En Patrimonio Mágico Sinuano, nos dedicamos a crear experiencias turísticas 
                únicas y memorables que celebran la rica herencia cultural y natural de 
                Córdoba. Nos comprometemos a promover un turismo sostenible que beneficie 
                a las comunidades locales mientras preservamos nuestras tradiciones y 
                recursos naturales para las generaciones futuras.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">
                Nuestra Visión
              </h2>
              <p className="text-secondary-light leading-relaxed">
                Aspiramos a ser líderes en el turismo experiencial en Córdoba, reconocidos 
                por nuestra excelencia en el servicio, compromiso con la sostenibilidad y 
                capacidad para crear conexiones significativas entre visitantes y nuestra 
                cultura local. Buscamos posicionar a Córdoba como un destino turístico 
                de clase mundial que preserve y celebre su patrimonio único.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-serif font-semibold mb-4 text-primary text-center">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Autenticidad</h3>
                <p className="text-secondary-light">
                  Preservamos y compartimos las tradiciones genuinas de nuestra región
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Sostenibilidad</h3>
                <p className="text-secondary-light">
                  Protegemos nuestro entorno natural y cultural para el futuro
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Comunidad</h3>
                <p className="text-secondary-light">
                  Trabajamos junto a las comunidades locales para un desarrollo inclusivo
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
