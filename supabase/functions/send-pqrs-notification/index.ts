
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
      to: ["info@gotour.com.co"],
      subject: `Nueva PQRS: ${pqrsData.tipo} de ${pqrsData.nombre}`,
      html: `
        <h1>Nueva PQRS Recibida</h1>
        <p><strong>Tipo:</strong> ${pqrsData.tipo}</p>
        <p><strong>Nombre:</strong> ${pqrsData.nombre}</p>
        <p><strong>Email:</strong> ${pqrsData.email}</p>
        <p><strong>Teléfono:</strong> ${pqrsData.telefono}</p>
        <h2>Mensaje:</h2>
        <p>${pqrsData.mensaje}</p>
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
