
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, FileText, User, Mail, Phone } from "lucide-react";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";
import { supabase } from "@/integrations/supabase/client";

interface PQRSFormData {
  tipo: string;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

const PQRS = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const sendEmailNotification = async (data: PQRSFormData) => {
    try {
      const response = await fetch(
        "https://algyqrycooinowmzxgde.supabase.co/functions/v1/send-pqrs-notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ3lxcnljb29pbm93bXp4Z2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MTYzMzIsImV4cCI6MjA1NTk5MjMzMn0.YgniDSle22uTzCqor-4R24hP70PmXm-RVtbxRku6DpM'}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar la notificación por correo");
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending email notification:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: PQRSFormData = {
      tipo: formData.get('tipo') as string,
      nombre: formData.get('nombre') as string,
      email: formData.get('email') as string,
      telefono: formData.get('telefono') as string,
      mensaje: formData.get('mensaje') as string,
    };

    try {
      // Guardar en Supabase
      const { error: supabaseError } = await supabase
        .from('pqrs')
        .insert([data]);

      if (supabaseError) throw supabaseError;

      // Enviar notificación por correo
      await sendEmailNotification(data);

      toast({
        title: "PQRS enviada con éxito",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error al enviar PQRS",
        description: "Por favor intenta nuevamente más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <Link to="/" className="text-secondary hover:text-primary">Inicio</Link>
              <Link to="/tours" className="text-secondary hover:text-primary">Tours</Link>
              <Link to="/about" className="text-secondary hover:text-primary">Sobre Nosotros</Link>
              <Link to="/contact" className="text-secondary hover:text-primary">Contacto</Link>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <Link to="/reserva" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
                Reservar
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
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-secondary">
                PQRS
              </h1>
              <p className="text-xl text-secondary-light">
                Peticiones, Quejas, Reclamos y Sugerencias
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="tipo" className="block text-sm font-medium text-secondary mb-1">
                    Tipo de Solicitud *
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="peticion">Petición</option>
                    <option value="queja">Queja</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="sugerencia">Sugerencia</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-secondary mb-1">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
                      Correo Electrónico *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-secondary mb-1">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      required
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-secondary mb-1">
                    Mensaje *
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 text-gray-400" size={16} />
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      rows={4}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Describe tu petición, queja, reclamo o sugerencia"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText size={16} />
                  {isSubmitting ? "Enviando..." : "Enviar PQRS"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PQRS;
