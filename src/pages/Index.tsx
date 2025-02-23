import { useState, useEffect } from "react";
import { MapPin, Calendar, Search, Star, ArrowRight, Users, Globe, Shield, Mountain, Clock, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const Index = () => {
  const [searchDestination, setSearchDestination] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
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
    name: "Santorini",
    image: "/lovable-uploads/fa3d9fa4-1d9f-4338-82c5-c601322cb83f.png",
    price: "1,299"
  }, {
    id: 2,
    name: "Maldivas",
    image: "/lovable-uploads/fa3d9fa4-1d9f-4338-82c5-c601322cb83f.png",
    price: "1,599"
  }, {
    id: 3,
    name: "París",
    image: "/lovable-uploads/fa3d9fa4-1d9f-4338-82c5-c601322cb83f.png",
    price: "999"
  }, {
    id: 4,
    name: "Bali",
    image: "/lovable-uploads/fa3d9fa4-1d9f-4338-82c5-c601322cb83f.png",
    price: "1,099"
  }];
  const destinations = [{
    title: "Ciénaga de Bañó",
    description: "Un espectacular humedal a solo 20 minutos de Lorica, hogar de diversas especies de aves y la tortuga de río. Ideal para el ecoturismo y la observación de fauna.",
    image: "https://www.eluniversal.com.co/binrepository/1050x700/0c0/0d0/none/13704/NLKI/whatsapp-image-2020-11-27-at-10-52_4766141_20201127111225.jpg"
  }, {
    title: "San Antero",
    description: "Pintoresco municipio costero a 45 minutos de Lorica, famoso por su Festival del Burro y sus hermosas playas. Disfruta de la gastronomía local y el ambiente caribeño.",
    image: "https://www.elheraldo.co/sites/default/files/articulo/2020/04/09/san_antero.jpg"
  }, {
    title: "San Bernardo del Viento",
    description: "A solo 40 minutos de Lorica, este municipio ofrece hermosas playas, manglares y la desembocadura del río Sinú. Perfecto para actividades acuáticas y pesca artesanal.",
    image: "https://www.elheraldo.co/sites/default/files/articulo/2021/01/16/playa_3.jpg"
  }, {
    title: "Cotocá Arriba",
    description: "Corregimiento histórico a 15 minutos de Lorica, conocido por su artesanía en caña flecha y su rica tradición cultural sinuana. Visita sus talleres artesanales.",
    image: "https://www.larazon.co/wp-content/uploads/2020/08/Cotoca%CC%81-Arriba.jpg"
  }, {
    title: "Momil",
    description: "A 20 minutos de Lorica, esta población es reconocida por sus sitios arqueológicos zenúes y la Ciénaga Grande. Un destino perfecto para los amantes de la historia.",
    image: "https://www.eluniversal.com.co/binrepository/1200x800/0c0/0d0/none/13704/WEHH/parque-momil_4343246_20200119114158.jpg"
  }, {
    title: "Purísima",
    description: "Municipio ribereño a 10 minutos de Lorica, famoso por sus dulces típicos y artesanías. Disfruta de sus festivales culturales y la vida tranquila junto al río Sinú.",
    image: "https://www.elheraldo.co/sites/default/files/articulo/2020/07/24/purisima.jpeg"
  }];
  return <div className="min-h-screen">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent backdrop-blur-md"}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="https://lh3.googleusercontent.com/a/ACg8ocLolP-oDXrcJRUDaixu8hEJLoPstVHIA4lCPvE7x49PkcIfTC8=s288-c-no" alt="GoTours Logo" className="w-10 h-10 rounded-full" />
              <span className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? "text-secondary" : "text-white"}`}>GoTours</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "nav-link"}`}>Inicio</Link>
              <Link to="/tours" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "nav-link"}`}>Tours</Link>
              <Link to="#" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "nav-link"}`}>Sobre Nosotros</Link>
              <Link to="#" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "nav-link"}`}>Contacto</Link>
            </div>
            <button className="btn-primary">Reserva Ahora</button>
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
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-sm font-medium text-primary">
                    ${destination.price}
                  </div>
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