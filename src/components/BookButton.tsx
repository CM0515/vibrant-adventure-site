
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./AuthModal";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { UserCircle } from "lucide-react";

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
  
  return (
    <>
      {!loading && (
        user ? (
          <Button 
            onClick={handleReservationClick}
            className="bg-accent hover:bg-accent/90 text-white"
          >
            <UserCircle className="mr-1" />
            Reservar ahora
          </Button>
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
