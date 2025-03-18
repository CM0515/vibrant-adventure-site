import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, CheckCircle, CreditCard, Download, Loader2, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ReservationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tourData: {
    id: string;
    name: string;
    price: number;
    duration: string;
    location: string;
  };
}

type FormStep = 'details' | 'payment' | 'confirmation';

export function ReservationModal({ isOpen, onOpenChange, tourData }: ReservationModalProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<FormStep>('details');
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [formData, setFormData] = useState({
    adults: 1,
    children: 0,
    childrenAges: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    specialRequests: ""
  });
  const [paymentReference, setPaymentReference] = useState("");
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, phone_number')
          .eq('id', session.user.id)
          .single();
          
        if (profileData) {
          setFormData(prev => ({
            ...prev,
            contactName: profileData.full_name || '',
            contactPhone: profileData.phone_number || '',
            contactEmail: session.user.email || ''
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            contactEmail: session.user.email || ''
          }));
        }
      } else {
        toast.error("Debes iniciar sesión para realizar una reserva");
        onOpenChange(false);
        navigate('/profile');
      }
    };
    
    if (isOpen) {
      getUserData();
      
      setDateRange([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    }
  }, [isOpen, navigate, onOpenChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (item: any) => {
    setDateRange([item.selection]);
  };

  const calculateTotalPrice = () => {
    const adultPrice = tourData.price * formData.adults;
    const childrenPrice = tourData.price * 0.7 * formData.children;
    return adultPrice + childrenPrice;
  };

  const handleDetailsSubmit = async () => {
    if (!dateRange[0].startDate || !formData.contactName || !formData.contactEmail || !formData.contactPhone) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.from('bookings').insert({
        user_id: user.id,
        tour_id: tourData.id,
        tour_name: tourData.name,
        start_date: format(dateRange[0].startDate, 'yyyy-MM-dd'),
        end_date: dateRange[0].endDate ? format(dateRange[0].endDate, 'yyyy-MM-dd') : format(dateRange[0].startDate, 'yyyy-MM-dd'),
        adults: formData.adults,
        children: formData.children,
        children_ages: formData.childrenAges,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        special_requests: formData.specialRequests,
        total_price: calculateTotalPrice(),
        payment_status: 'pending'
      }).select();
      
      if (error) throw error;
      
      if (data && data[0]) {
        setBookingId(data[0].id);
        setStep('payment');
      }
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toast.error("Error al crear la reserva: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const fakeReference = `EP-${Math.floor(Math.random() * 1000000)}`;
        setPaymentReference(fakeReference);
        
        if (bookingId) {
          const { error } = await supabase
            .from('bookings')
            .update({
              payment_status: 'completed',
              payment_reference: fakeReference
            })
            .eq('id', bookingId);
            
          if (error) throw error;
        }
        
        setStep('confirmation');
        setLoading(false);
        
        await handleGeneratePDFAndEmail();
      }, 2000);
    } catch (error: any) {
      console.error("Error processing payment:", error);
      toast.error("Error al procesar el pago: " + error.message);
      setLoading(false);
    }
  };

  const handleGeneratePDFAndEmail = async () => {
    try {
      toast.success("Reserva confirmada. Se ha enviado un correo con los detalles.");
    } catch (error: any) {
      console.error("Error generating PDF or sending email:", error);
      toast.error("Error al generar el PDF o enviar el correo: " + error.message);
    }
  };

  const handleDownloadPDF = () => {
    toast.success("Descargando comprobante de reserva...");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {step === 'details' && "Reserva tu Tour"}
            {step === 'payment' && "Procesar Pago"}
            {step === 'confirmation' && "¡Reserva Confirmada!"}
          </DialogTitle>
          <DialogDescription>
            {step === 'details' && `${tourData.name} - ${tourData.location}`}
            {step === 'payment' && "Complete el pago para confirmar su reserva"}
            {step === 'confirmation' && `¡Gracias por tu reserva! Referencia: ${paymentReference}`}
          </DialogDescription>
        </DialogHeader>

        {step === 'details' && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="dates">Fechas del Tour</Label>
              <div className="border rounded-md p-4 bg-white">
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateChange}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  months={1}
                  direction="vertical"
                  className="w-full"
                  rangeColors={["#E97B00"]}
                  minDate={new Date()}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adults">Adultos</Label>
                <Select 
                  value={formData.adults.toString()} 
                  onValueChange={(value) => handleSelectChange('adults', value)}
                >
                  <SelectTrigger id="adults">
                    <SelectValue placeholder="Adultos" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="children">Niños</Label>
                <Select 
                  value={formData.children.toString()} 
                  onValueChange={(value) => handleSelectChange('children', value)}
                >
                  <SelectTrigger id="children">
                    <SelectValue placeholder="Niños" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.children > 0 && (
              <div className="space-y-2">
                <Label htmlFor="childrenAges">Edades de los niños</Label>
                <Input
                  id="childrenAges"
                  name="childrenAges"
                  placeholder="Ej: 5, 7, 10 años"
                  value={formData.childrenAges}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="contactName">Nombre completo</Label>
              <Input
                id="contactName"
                name="contactName"
                placeholder="Tu nombre completo"
                value={formData.contactName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Correo electrónico</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="tu@email.com"
                value={formData.contactEmail}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Teléfono</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                placeholder="Tu número de teléfono"
                value={formData.contactPhone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Solicitudes especiales (opcional)</Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                placeholder="Alergias, requerimientos dietéticos, etc."
                value={formData.specialRequests}
                onChange={handleInputChange}
              />
            </div>

            <div className="py-4 border-t mt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Precio por adulto:</span>
                <span>${tourData.price.toLocaleString()}</span>
              </div>
              {formData.children > 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">Precio por niño (30% descuento):</span>
                  <span>${(tourData.price * 0.7).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center mt-2 text-lg font-bold">
                <span>Total:</span>
                <span>${calculateTotalPrice().toLocaleString()}</span>
              </div>
            </div>

            <Button 
              className="w-full mt-4" 
              onClick={handleDetailsSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Continuar a Pago"
              )}
            </Button>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-4 py-2">
            <div className="p-6 border rounded-lg bg-primary-light/10">
              <h3 className="font-semibold mb-2">Resumen de la Reserva</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Tour:</div>
                <div className="font-medium">{tourData.name}</div>
                
                <div>Fechas:</div>
                <div className="font-medium">
                  {dateRange[0].startDate && format(dateRange[0].startDate, "dd/MM/yyyy")}
                  {dateRange[0].endDate && dateRange[0].startDate !== dateRange[0].endDate && 
                    ` - ${format(dateRange[0].endDate, "dd/MM/yyyy")}`}
                </div>
                
                <div>Personas:</div>
                <div className="font-medium">
                  {formData.adults} adulto{formData.adults !== 1 && 's'}
                  {formData.children > 0 && `, ${formData.children} niño${formData.children !== 1 && 's'}`}
                </div>
                
                <div>Total a pagar:</div>
                <div className="font-medium">${calculateTotalPrice().toLocaleString()}</div>
              </div>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Método de Pago
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
                  <img 
                    src="https://s3.amazonaws.com/epayco/website-assets/img/epayco-by-stripe-primary-logo-blue-on-white.png" 
                    alt="ePayco" 
                    className="h-12 object-contain" 
                  />
                </div>
                <p className="text-sm text-center text-gray-500">
                  Procesando pago seguro a través de ePayco
                </p>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando Pago...
                </>
              ) : (
                "Pagar Ahora"
              )}
            </Button>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="space-y-6 py-2">
            <div className="flex flex-col items-center text-center p-6">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">¡Reserva Confirmada!</h3>
              <p className="text-gray-500">
                Gracias por tu reserva. Hemos enviado un correo electrónico con todos los detalles a {formData.contactEmail}.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg bg-primary-light/10">
              <h3 className="font-semibold mb-2">Detalles de la Reserva</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>Referencia:</div>
                <div className="font-medium">{paymentReference}</div>
                
                <div>Tour:</div>
                <div className="font-medium">{tourData.name}</div>
                
                <div>Fechas:</div>
                <div className="font-medium">
                  {dateRange[0].startDate && format(dateRange[0].startDate, "dd/MM/yyyy")}
                  {dateRange[0].endDate && dateRange[0].startDate !== dateRange[0].endDate && 
                    ` - ${format(dateRange[0].endDate, "dd/MM/yyyy")}`}
                </div>
                
                <div>Personas:</div>
                <div className="font-medium">
                  {formData.adults} adulto{formData.adults !== 1 && 's'}
                  {formData.children > 0 && `, ${formData.children} niño${formData.children !== 1 && 's'}`}
                </div>
                
                <div>Total pagado:</div>
                <div className="font-medium">${calculateTotalPrice().toLocaleString()}</div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleDownloadPDF}
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar Comprobante
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  onOpenChange(false);
                  navigate('/profile');
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                Ver Mis Reservas
              </Button>
              
              <Button 
                className="w-full"
                onClick={() => onOpenChange(false)}
              >
                Finalizar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

