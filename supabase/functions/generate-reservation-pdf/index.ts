
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { jsPDF } from "npm:jspdf@latest";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// CORS headers for cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Interface for booking data
interface BookingData {
  id: string;
  tourName: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  childrenAges: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests: string;
  totalPrice: number;
  paymentReference: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bookingData }: { bookingData: BookingData } = await req.json();

    // Generate PDF
    const pdfBase64 = generatePDF(bookingData);

    // Send email with PDF attachment
    const emailResult = await sendEmail(bookingData, pdfBase64);

    return new Response(
      JSON.stringify({
        success: true,
        message: "PDF generated and email sent successfully",
        emailResult,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Function to generate PDF
function generatePDF(bookingData: BookingData): string {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Add company logo/header
  doc.setFontSize(20);
  doc.setTextColor(0, 128, 128); // Teal color
  doc.text("GoTours", 105, 20, { align: "center" });
  
  // Add reservation title
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Confirmación de Reserva", 105, 30, { align: "center" });
  
  // Add horizontal line
  doc.setDrawColor(0, 128, 128);
  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);
  
  // Add booking details
  doc.setFontSize(12);
  doc.text("Referencia de Reserva:", 20, 45);
  doc.text(bookingData.paymentReference, 100, 45);
  
  doc.text("Tour:", 20, 55);
  doc.text(bookingData.tourName, 100, 55);
  
  doc.text("Fechas:", 20, 65);
  doc.text(`${bookingData.startDate} - ${bookingData.endDate}`, 100, 65);
  
  doc.text("Cliente:", 20, 75);
  doc.text(bookingData.contactName, 100, 75);
  
  doc.text("Email:", 20, 85);
  doc.text(bookingData.contactEmail, 100, 85);
  
  doc.text("Teléfono:", 20, 95);
  doc.text(bookingData.contactPhone, 100, 95);
  
  // Add people details
  doc.text("Adultos:", 20, 105);
  doc.text(bookingData.adults.toString(), 100, 105);
  
  doc.text("Niños:", 20, 115);
  doc.text(bookingData.children.toString(), 100, 115);
  
  if (bookingData.childrenAges) {
    doc.text("Edades de los niños:", 20, 125);
    doc.text(bookingData.childrenAges, 100, 125);
  }
  
  if (bookingData.specialRequests) {
    doc.text("Solicitudes especiales:", 20, 135);
    doc.text(bookingData.specialRequests, 100, 135, { maxWidth: 90 });
  }
  
  // Add payment information
  doc.setLineWidth(0.5);
  doc.line(20, 150, 190, 150);
  
  doc.setFontSize(14);
  doc.text("Información de Pago", 105, 160, { align: "center" });
  
  doc.setFontSize(12);
  doc.text("Total pagado:", 20, 170);
  doc.text(`$${bookingData.totalPrice.toLocaleString()}`, 100, 170);
  
  doc.text("Estado:", 20, 180);
  doc.text("PAGADO", 100, 180);
  
  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("GoTours - Viajes y Turismo", 105, 270, { align: "center" });
  doc.text("support@gotours.com | +57 301 123 4567", 105, 275, { align: "center" });
  
  // Convert PDF to base64
  return doc.output('datauristring').split(',')[1];
}

// Function to send email with PDF attachment
async function sendEmail(bookingData: BookingData, pdfBase64: string) {
  try {
    const result = await resend.emails.send({
      from: "GoTours <reservations@gotours.com>",
      to: [bookingData.contactEmail],
      subject: `Confirmación de Reserva - ${bookingData.tourName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #008080; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">GoTours</h1>
          </div>
          
          <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
            <h2>¡Tu reserva está confirmada!</h2>
            
            <p>Estimado/a ${bookingData.contactName},</p>
            
            <p>Gracias por elegir GoTours. Nos complace confirmar tu reserva para el tour "${bookingData.tourName}".</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <h3 style="margin-top: 0;">Detalles de la Reserva:</h3>
              <p><strong>Referencia:</strong> ${bookingData.paymentReference}</p>
              <p><strong>Tour:</strong> ${bookingData.tourName}</p>
              <p><strong>Fechas:</strong> ${bookingData.startDate} - ${bookingData.endDate}</p>
              <p><strong>Personas:</strong> ${bookingData.adults} adulto(s)${bookingData.children > 0 ? `, ${bookingData.children} niño(s)` : ''}</p>
              <p><strong>Total pagado:</strong> $${bookingData.totalPrice.toLocaleString()}</p>
            </div>
            
            <p>Hemos adjuntado a este correo un PDF con todos los detalles de tu reserva. Por favor, conserva este documento como comprobante.</p>
            
            <p>Si tienes alguna pregunta o necesitas hacer cambios en tu reserva, por favor contáctanos lo antes posible.</p>
            
            <p>¡Esperamos que disfrutes tu experiencia con nosotros!</p>
            
            <p>Saludos cordiales,<br>El equipo de GoTours</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>GoTours - Viajes y Turismo<br>
            support@gotours.com | +57 301 123 4567</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Reserva-${bookingData.paymentReference}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
