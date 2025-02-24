
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PQRSData {
  tipo: string;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const pqrsData: PQRSData = await req.json();
    
    const emailResponse = await resend.emails.send({
      from: "GoTours PQRS <info@gotour.com.co>",
      to: [pqrsData.email],
      subject: `Confirmación de tu PQRS - GoTours`,
      html: `
        <h1>Hemos recibido tu PQRS</h1>
        <p>Hola ${pqrsData.nombre},</p>
        <p>Hemos recibido tu ${pqrsData.tipo} correctamente. Nos pondremos en contacto contigo lo antes posible.</p>
        <h2>Detalles de tu solicitud:</h2>
        <p><strong>Tipo:</strong> ${pqrsData.tipo}</p>
        <p><strong>Mensaje:</strong> ${pqrsData.mensaje}</p>
        <br/>
        <p>Si tienes alguna pregunta adicional, no dudes en contactarnos.</p>
        <p>Saludos cordiales,<br>Equipo GoTours</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error in send-pqrs-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
