
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./AuthModal";

export function BookButton() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setShowAuthModal(true)}
        className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
      >
        Reservar
      </Button>
      <AuthModal isOpen={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
}
