import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Footer from "../components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Contact = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE29F] via-white to-[#FFA99F]">
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

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-secondary">
              Contacto
            </h1>
            <p className="text-xl text-secondary-light max-w-2xl mx-auto">
              Estamos aquí para ayudarte a planear tu próxima aventura
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">
                  Información de Contacto
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Dirección</p>
                      <p className="text-secondary-light">Calle Principal #123, Montería, Córdoba</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-secondary-light">+57 (123) 456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-secondary-light">info@gotour.com.co</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Horario de Atención</p>
                      <p className="text-secondary-light">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                      <p className="text-secondary-light">Sábados: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">
                  Envíanos un Mensaje
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-1">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Asunto de tu mensaje"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
