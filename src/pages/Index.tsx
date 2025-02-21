
import { useState } from "react";
import { MapPin, Calendar, Search, Star, ArrowRight, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [searchDestination, setSearchDestination] = useState("");
  
  const featuredDestinations = [
    { id: 1, name: "Santorini", image: "/lovable-uploads/fa3d9fa4-1d9f-4338-82c5-c601322cb83f.png", price: "1,299" },
    { id: 2, name: "Maldivas", image: "/lovable-uploads/fa3d9fa4-1d9f-4338-82c5-c601322cb83f.png", price: "1,599" },
    { id: 3, name: "París", image: "/lovable-uploads/fa3d9fa4-1d9f-4338-82c5-c601322cb83f.png", price: "999" },
    { id: 4, name: "Bali", image: "/lovable-uploads/fa3d9fa4-1d9f-4338-82c5-c601322cb83f.png", price: "1,099" },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">TourVibes</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="nav-link">Inicio</a>
              <a href="#" className="nav-link">Tours</a>
              <a href="#" className="nav-link">Sobre Nosotros</a>
              <a href="#" className="nav-link">Contacto</a>
            </div>
            <button className="btn-primary">Reserva Ahora</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="container mx-auto px-4 relative h-full flex items-center">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Descubre Tu Próxima Aventura
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90 mb-8"
            >
              Explora destinos únicos y crea memorias inolvidables
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-4 rounded-2xl shadow-lg flex flex-wrap md:flex-nowrap gap-4"
            >
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <MapPin className="text-primary" size={20} />
                  <input
                    type="text"
                    placeholder="¿A dónde quieres ir?"
                    className="w-full outline-none"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px] border-l border-gray-200 pl-4">
                <div className="flex items-center gap-2">
                  <Calendar className="text-primary" size={20} />
                  <input
                    type="text"
                    placeholder="¿Cuándo?"
                    className="w-full outline-none"
                  />
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

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Destinos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card group"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-sm font-medium">
                    ${destination.price}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
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
    </div>
  );
};

export default Index;
