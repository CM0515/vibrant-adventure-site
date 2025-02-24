import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-serif text-xl mb-4">Contáctanos</h4>
            <p className="mb-2">Email: info@gotours.com.co</p>
            <p className="mb-2">Tel: +57 321 5101331</p>
            <p>Dirección: Calle Principal #123, Montería, Córdoba</p>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <Link to="#" className="hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link to="#" className="hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link to="#" className="hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">Boletín Informativo</h4>
            <p className="mb-4">Suscríbete para recibir noticias y ofertas especiales</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Tu correo electrónico" className="flex-1 px-4 py-2 rounded-lg text-secondary" />
              <button type="submit" className="bg-primary hover:bg-primary-hover px-6 py-2 rounded-lg transition-colors">
                Suscribirse
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">
          <p>© 2024 Patrimonio Mágico Sinuano. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;