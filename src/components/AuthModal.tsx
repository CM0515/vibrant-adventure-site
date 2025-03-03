import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Check,
  Eye,
  EyeOff,
  Facebook,
  Flag,
  Info,
  Mail,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PASSWORD_REQUIREMENTS = [
  { id: "uppercase", label: "Al menos una mayúscula", regex: /[A-Z]/ },
  { id: "lowercase", label: "Al menos una minúscula", regex: /[a-z]/ },
  { id: "number", label: "Al menos un número", regex: /[0-9]/ },
  {
    id: "special",
    label: "Al menos un carácter especial",
    regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
  },
  { id: "length", label: "Mínimo 8 caracteres", regex: /.{8,}/ },
];

const COUNTRY_CODES = [
  { code: "+57", name: "Colombia", short: "CO" },
  { code: "+1", name: "Estados Unidos", short: "US" },
  { code: "+52", name: "México", short: "MX" },
  { code: "+34", name: "España", short: "ES" },
  { code: "+54", name: "Argentina", short: "AR" },
  { code: "+56", name: "Chile", short: "CL" },
  { code: "+51", name: "Perú", short: "PE" },
  { code: "+593", name: "Ecuador", short: "EC" },
  { code: "+58", name: "Venezuela", short: "VE" },
  { code: "+591", name: "Bolivia", short: "BO" },
  { code: "+595", name: "Paraguay", short: "PY" },
  { code: "+598", name: "Uruguay", short: "UY" },
  { code: "+506", name: "Costa Rica", short: "CR" },
  { code: "+503", name: "El Salvador", short: "SV" },
  { code: "+502", name: "Guatemala", short: "GT" },
  { code: "+504", name: "Honduras", short: "HN" },
  { code: "+505", name: "Nicaragua", short: "NI" },
  { code: "+507", name: "Panamá", short: "PA" },
  { code: "+1", name: "Puerto Rico", short: "PR" },
  { code: "+1", name: "República Dominicana", short: "DO" },
];

export function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+57");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState("");
  const [showVerificationInfo, setShowVerificationInfo] = useState(false);
  const { toast } = useToast();

  const checkPasswordRequirement = (requirement: { regex: RegExp }) => {
    return requirement.regex.test(password);
  };

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterError("");

    const passesAllRequirements = PASSWORD_REQUIREMENTS.every(req => 
      checkPasswordRequirement(req)
    );
    
    if (!passesAllRequirements) {
      setRegisterError("La contraseña no cumple con todos los requisitos");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;
    const phoneNumber = `${countryCode}${formData.get("phoneNumber") as string}`;

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone_number: phoneNumber,
          },
        },
      });

      if (error) {
        setRegisterError(error.message);
        toast({
          variant: "destructive",
          title: "Error al registrarse",
          description: error.message,
        });
      } else {
        toast({
          variant: "success",
          title: "Registro exitoso",
          description: "Por favor verifica tu correo electrónico",
        });
        onOpenChange(false);
      }
    } catch (error) {
      setRegisterError("Error inesperado. Inténtalo más tarde.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error inesperado. Inténtalo más tarde.",
      });
      console.error("Error en registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    setShowVerificationInfo(false);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      console.log("Iniciando sesión con:", { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Respuesta de auth:", { data, error });

      if (error) {
        setLoginError(error.message);
        
        // Improved detection of unconfirmed email errors
        if (error.message.toLowerCase().includes("email not confirmed") || 
            error.message.toLowerCase().includes("correo no confirmado") ||
            error.message.toLowerCase().includes("email no verificado")) {
          setEmailToVerify(email);
          setShowVerificationInfo(true);
        }
        
        toast({
          variant: "destructive",
          title: "Error al iniciar sesión",
          description: error.message,
        });
      } else {
        toast({
          variant: "success",
          title: "¡Bienvenido de vuelta!",
          description: "Has iniciado sesión correctamente",
        });
        onOpenChange(false);
      }
    } catch (error) {
      setLoginError("Error inesperado. Inténtalo más tarde.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error inesperado. Inténtalo más tarde.",
      });
      console.error("Error en inicio de sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerificationEmail = async () => {
    if (!emailToVerify) return;
    
    setIsResendingEmail(true);
    try {
      // Call our improved edge function
      const response = await supabase.functions.invoke("resend-verification", {
        body: { email: emailToVerify },
      });
      
      console.log("Respuesta de resend-verification:", response);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      toast({
        variant: "success",
        title: "Correo enviado",
        description: "El correo de verificación ha sido reenviado exitosamente",
      });
      
    } catch (error) {
      console.error("Error al reenviar correo de verificación:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo reenviar el correo de verificación",
      });
    } finally {
      setIsResendingEmail(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error al iniciar sesión con Google",
          description: error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error inesperado al iniciar sesión con Google",
      });
      console.error("Error en inicio de sesión con Google:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error al iniciar sesión con Facebook",
          description: error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error inesperado al iniciar sesión con Facebook",
      });
      console.error("Error en inicio de sesión con Facebook:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cuenta GoTours</DialogTitle>
          <DialogDescription>
            Inicia sesión o regístrate para continuar con tu reserva
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input
                  id="email-login"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  value={emailToVerify}
                  onChange={(e) => setEmailToVerify(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-login">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password-login"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              {loginError && (
                <div className="text-destructive text-sm">{loginError}</div>
              )}
              
              {showVerificationInfo && (
                <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-amber-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">Verificación pendiente</h3>
                      <div className="mt-2 text-sm text-amber-700">
                        <p>
                          Tu correo electrónico no ha sido verificado. Haz clic en el enlace que te enviamos o solicita uno nuevo.
                        </p>
                        <Button
                          type="button" 
                          variant="outline"
                          className="mt-2 w-full border-amber-300 hover:border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-700"
                          onClick={handleResendVerificationEmail}
                          disabled={isResendingEmail}
                        >
                          {isResendingEmail ? "Enviando..." : "Reenviar correo de verificación"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Número de Teléfono</Label>
                <div className="flex gap-2">
                  <Select
                    value={countryCode}
                    onValueChange={setCountryCode}
                  >
                    <SelectTrigger className="w-[110px] bg-background border-input">
                      <SelectValue placeholder="Código" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-input max-h-60">
                      {COUNTRY_CODES.map((country) => (
                        <SelectItem 
                          key={`${country.code}-${country.name}`} 
                          value={country.code}
                          className="flex items-center"
                        >
                          <div className="flex items-center gap-2">
                            <Flag className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{country.code}</span>
                            <span className="text-muted-foreground text-xs">
                              {country.short}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="3001234567"
                    className="flex-1"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-register">Email</Label>
                <Input
                  id="email-register"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-register">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password-register"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <p className="font-medium text-muted-foreground flex items-center">
                    <Info className="h-3 w-3 mr-1" /> La contraseña debe cumplir con:
                  </p>
                  <ul className="space-y-1">
                    {PASSWORD_REQUIREMENTS.map((requirement) => (
                      <li
                        key={requirement.id}
                        className="flex items-center"
                      >
                        {checkPasswordRequirement(requirement) ? (
                          <Check className="h-3 w-3 mr-1 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 mr-1 text-red-500" />
                        )}
                        <span
                          className={
                            checkPasswordRequirement(requirement)
                              ? "text-green-600"
                              : "text-muted-foreground"
                          }
                        >
                          {requirement.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-medium text-muted-foreground mt-2">
                    Ejemplo: "Gotours2024!"
                  </p>
                </div>
              </div>
              {registerError && (
                <div className="text-destructive text-sm">{registerError}</div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Registrando..." : "Registrarse"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              O continúa con
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            onClick={handleFacebookSignIn}
            className="w-full"
          >
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
