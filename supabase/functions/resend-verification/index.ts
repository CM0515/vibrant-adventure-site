
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

    // Get user by email to check if exists - using profiles table instead
    const { data: userProfiles, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', (await supabase.auth.admin.listUsers({ search: email })).data.users[0]?.id)
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

    // Alternative approach: directly check auth.users through admin API
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers({
      search: email
    });

    if (authError || !authData.users.length) {
      console.error("Error al buscar usuario en auth:", authError || "Usuario no encontrado");
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    // Use magiclink/otp for email verification
    const { error } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
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
