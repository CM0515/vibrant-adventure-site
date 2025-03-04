
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./AuthModal";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { ChevronDown, LogOut, Settings, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function BookButton() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get the current user session on component mount
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getSession();
    
    // Set up authentication state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setUser(session?.user || null);
      }
    );
    
    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleReservationClick = () => {
    if (user) {
      // If user is logged in, proceed with reservation
      console.log("User is logged in, proceed with reservation");
      // Add your reservation logic here
    } else {
      // If not logged in, show auth modal
      setShowAuthModal(true);
    }
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión");
    }
  };
  
  return (
    <>
      {!loading && (
        user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className="bg-accent hover:bg-accent/90 text-white"
              >
                <UserCircle className="mr-1" />
                {user.email?.split('@')[0]}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuItem onClick={handleReservationClick}>
                Reservar ahora
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            onClick={handleReservationClick}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Reservar
          </Button>
        )
      )}
      <AuthModal isOpen={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
}
