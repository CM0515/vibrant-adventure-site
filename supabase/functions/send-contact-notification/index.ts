
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: ContactData = await req.json();
    
    const emailResponse = await resend.emails.send({
      from: "GoTours Contact <info@gotour.com.co>",
      to: [contactData.email],
      subject: `Confirmación de contacto - ${contactData.subject}`,
      html: `
        <h1>Hemos recibido tu mensaje</h1>
        <p>Hola ${contactData.name},</p>
        <p>Gracias por contactarnos. Hemos recibido tu mensaje correctamente y nos pondremos en contacto contigo lo antes posible.</p>
        <h2>Detalles de tu mensaje:</h2>
        <p><strong>Asunto:</strong> ${contactData.subject}</p>
        <p><strong>Mensaje:</strong> ${contactData.message}</p>
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
    console.error("Error in send-contact-notification function:", error);
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
