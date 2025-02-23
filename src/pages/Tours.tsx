
import { Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Tours = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Patrimonio Mágico Sinuano
            </h1>
            <p className="text-xl text-secondary-light">
              "Una experiencia de saberes y sabores"
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Detalles del Tour</h2>
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
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Recomendaciones</h3>
                <p className="text-secondary-light">
                  Usar ropa liviana y cómoda, gorra o sombreros de sol, protector solar, 
                  zapatos cómodos, buena disposición.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Día 1</h3>
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
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-32 font-medium text-primary">{item.hora}</div>
                      <div className="flex-1">{item.actividad}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
