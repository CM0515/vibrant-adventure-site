
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "El correo electrónico es requerido" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    console.log(`Reenviando correo de verificación a: ${email}`);

    // Get user by email to check if exists
    const { data: users, error: userError } = await supabase
      .from('auth.users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (userError) {
      console.error("Error al buscar usuario:", userError);
      return new Response(
        JSON.stringify({ error: "Error al buscar usuario" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    if (!users) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    // Fix: use email confirmation type instead of signup
    const { error } = await supabase.auth.admin.generateLink({
      type: 'email_change',
      email,
      newEmail: email,
      options: {
        redirectTo: `${req.headers.get("origin") || "http://localhost:3000"}`
      }
    });

    if (error) {
      console.error("Error al reenviar correo:", error);
      return new Response(
        JSON.stringify({ error: "Error al reenviar el correo de verificación" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Correo de verificación reenviado exitosamente" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  } catch (error) {
    console.error("Error en función resend-verification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
});
