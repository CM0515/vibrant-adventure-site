
import { Facebook, Instagram, Twitter, Home, Map, Info, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div>
            <h4 className="font-serif text-xl mb-4">Contacto</h4>
            <address className="not-italic">
              <p className="mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Dirección: Calle Principal Cll 4 KR 22, Lorica, Córdoba
              </p>
              <p className="mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email: <a href="mailto:info@gotour.com.co" className="hover:text-primary transition-colors">info@gotour.com.co</a>
              </p>
              <p className="mb-2 flex items-center gap-2">
                <Phone size={16} />
                Tel: <a href="tel:+573215101331" className="hover:text-primary transition-colors">+57 321 5101331</a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} />
                Sede: Calle Principal #123, Montería, Córdoba
              </p>
            </address>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">Enlaces Rápidos</h4>
            <nav aria-label="Enlaces del pie de página">
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Home size={16} />
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/tours" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Map size={16} />
                    Tours
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Info size={16} />
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Mail size={16} />
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com/gotours" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Facebook" className="hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/gotours" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Instagram" className="hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/gotours" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Twitter" className="hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">PQRS</h4>
            <p className="mb-4">¿Tienes una petición, queja, reclamo o sugerencia?</p>
            <Link 
              to="/pqrs" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <MessageCircle size={16} />
              Enviar PQRS
            </Link>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">Boletín Informativo</h4>
            <p className="mb-4">Suscríbete para recibir noticias y ofertas especiales</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                aria-label="Tu correo electrónico"
                className="flex-1 px-4 py-2 rounded-lg text-secondary font-sans" 
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary-hover px-6 py-2 rounded-lg transition-colors font-sans"
                aria-label="Suscribirse al boletín"
              >
                Suscribirse
              </button>
            </form>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">Aceptamos</h4>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="public/lovable-uploads/ab018bb5-edff-41ba-98c4-1b75ea387447.png" 
                alt="Métodos de pago aceptados" 
                className="col-span-2 w-full max-w-[200px]"
              />
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm font-sans">
          <p>© {new Date().getFullYear()} Patrimonio Mágico Sinuano. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>;
};

export default Footer;
