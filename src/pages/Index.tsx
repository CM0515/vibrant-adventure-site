import { useState, useEffect } from "react";
import { MapPin, Calendar, Search, Star, ArrowRight, Users, Globe, Shield, Mountain, Clock, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import LanguageSelector from "../components/LanguageSelector";
import { useLanguage } from "../contexts/LanguageContext";

const Index = () => {
  const [searchDestination, setSearchDestination] = useState("");
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

  const featuredDestinations = [{
    id: 1,
    name: "El Carito",
    image: "/lovable-uploads/f2dc979b-e5cb-4583-a0c4-68a70296638a.png",
  }, {
    id: 2,
    name: "Lorica",
    image: "/lovable-uploads/530f9e82-fe6a-4bb7-981c-4945d5abd9ab.png",
  }, {
    id: 3,
    name: "Tuchín",
    image: "/lovable-uploads/755d0928-e7cb-4b51-a819-af0713643e41.png",
  }, {
    id: 4,
    name: "San Antero",
    image: "/lovable-uploads/2439d93f-1714-461c-b666-17b7cac194c5.png",
  }];

  const destinations = [{
    title: "El Carito",
    description: "Pintoresco corregimiento ubicado a orillas del río Sinú, famoso por sus hermosos paisajes y la calidez de su gente. Ideal para disfrutar de la gastronomía local y paseos en canoa.",
    image: "/lovable-uploads/f2dc979b-e5cb-4583-a0c4-68a70296638a.png"
  }, {
    title: "Santa Cruz de Lorica",
    description: "Ciudad histórica conocida como la 'Pequeña Cartagena', destaca por su arquitectura colonial, su mercado público y su rica mezcla cultural árabe-caribeña. Un destino imperdible para los amantes de la historia y la cultura.",
    image: "/lovable-uploads/530f9e82-fe6a-4bb7-981c-4945d5abd9ab.png"
  }, {
    title: "Tuchín",
    description: "Cuna del Sombrero Vueltiao y capital artesanal de Córdoba. Descubre el proceso de elaboración de este símbolo nacional y conoce la rica cultura indígena Zenú.",
    image: "/lovable-uploads/755d0928-e7cb-4b51-a819-af0713643e41.png"
  }, {
    title: "San Antero",
    description: "Municipio costero famoso por su Festival del Burro y sus hermosas playas. Disfruta del mejor pescado fresco, deportes acuáticos y espectaculares atardeceres caribeños.",
    image: "/lovable-uploads/2439d93f-1714-461c-b666-17b7cac194c5.png"
  }];

  return <div className="min-h-screen">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent backdrop-blur-md"}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src="https://lh3.googleusercontent.com/a/ACg8ocLolP-oDXrcJRUDaixu8hEJLoPstVHIA4lCPvE7x49PkcIfTC8=s288-c-no" alt="GoTours Logo" className="w-10 h-10 rounded-full" />
              <span className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? "text-secondary" : "text-white"}`}>GoTours</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "text-white hover:text-primary-light"}`}>
                {t('nav.home')}
              </Link>
              <Link to="/tours" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "text-white hover:text-primary-light"}`}>
                {t('nav.tours')}
              </Link>
              <Link to="/about" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "text-white hover:text-primary-light"}`}>
                {t('nav.about')}
              </Link>
              <Link to="/contact" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "text-white hover:text-primary-light"}`}>
                {t('nav.contact')}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <Link to="/contact" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
                {t('nav.book')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative h-screen">
        <img src="/lovable-uploads/cc5567a7-b705-423a-99ff-9f62c83ed1e8.jpg" alt="Hero background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative h-full flex items-center">
          <div className="max-w-3xl">
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="text-5xl md:text-6xl font-bold text-white mb-6">
              Descubre Tu Próxima Aventura
            </motion.h1>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="text-xl text-white/90 mb-8">
              Explora destinos únicos y crea memorias inolvidables
            </motion.p>
            
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }} className="bg-white p-4 rounded-2xl shadow-lg flex flex-wrap md:flex-nowrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <MapPin className="text-primary" size={20} />
                  <input type="text" placeholder="¿A dónde quieres ir?" className="w-full outline-none" value={searchDestination} onChange={e => setSearchDestination(e.target.value)} />
                </div>
              </div>
              <div className="flex-1 min-w-[200px] border-l border-gray-200 pl-4">
                <div className="flex items-center gap-2">
                  <Calendar className="text-primary" size={20} />
                  <input type="text" placeholder="¿Cuándo?" className="w-full outline-none" />
                </div>
              </div>
              <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
                <Search size={20} />
                Buscar
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Destinos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map(destination => <motion.div key={destination.id} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="card group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img src={destination.image} alt={destination.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <div className="flex items-center gap-1 text-primary mb-4">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <span className="text-secondary-light text-sm ml-1">(48)</span>
                </div>
                <button className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200">
                  Ver más <ArrowRight size={16} />
                </button>
              </motion.div>)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-primary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <span className="text-primary font-medium">¿Por Qué Elegirnos?</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Experiencias de Viaje Increíbles</h2>
            <p className="text-secondary-light max-w-2xl mx-auto">
              Nos dedicamos a crear experiencias únicas y memorables para nuestros viajeros, 
              con un compromiso inquebrantable con la calidad y la seguridad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="relative">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5
            }} className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img alt="Experiencia de viaje" className="w-full h-full object-cover" src="/lovable-uploads/19ea96e8-e92d-4321-b4f8-14c7509c8dd4.jpg" />
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl max-w-xs">
                <div className="flex gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">10+ Años</h3>
                    <p className="text-sm text-secondary-light">de experiencia</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Plane className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">150+ Destinos</h3>
                    <p className="text-sm text-secondary-light">alrededor del mundo</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5
            }} className="bg-white p-6 rounded-xl shadow-md flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Seguridad Primero</h3>
                  <p className="text-secondary-light">
                    Tu seguridad es nuestra prioridad. Trabajamos con los mejores proveedores y seguimos 
                    estrictos protocolos de seguridad en todos nuestros tours.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} className="bg-white p-6 rounded-xl shadow-md flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mountain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Aventuras Únicas</h3>
                  <p className="text-secondary-light">
                    Diseñamos experiencias exclusivas que combinan aventura, cultura y confort, 
                    adaptadas a tus preferencias y estilo de viaje.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5,
              delay: 0.4
            }} className="bg-white p-6 rounded-xl shadow-md flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Guías Expertos</h3>
                  <p className="text-secondary-light">
                    Nuestros guías son profesionales apasionados con amplio conocimiento local, 
                    asegurando una experiencia enriquecedora y memorable.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">15k+</div>
              <div className="text-secondary-light">Clientes Satisfechos</div>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-secondary-light">Destinos Increíbles</div>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-secondary-light">Calificación Promedio</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Explora los Alrededores de Santa Cruz de Lorica
            </h2>
            <p className="text-secondary-light max-w-2xl mx-auto">
              Descubre la magia de los destinos cercanos a Lorica, cada uno con su propia historia y encanto único
            </p>
          </motion.div>

          
        </div>
      </section>

      <Footer />
    </div>;
};

export default Index;
