
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReservationModal } from "@/components/ReservationModal";

interface TourBookingButtonProps {
  tourData: {
    id: string;
    name: string;
    price: number;
    duration: string;
    location: string;
  };
  className?: string;
}

export function TourBookingButton({ tourData, className }: TourBookingButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        Reservar Ahora
      </Button>

      <ReservationModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        tourData={tourData}
      />
    </>
  );
}
