
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./AuthModal";

export function BookButton() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowAuthModal(true)}>
        Reservar
      </Button>
      <AuthModal isOpen={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
}
