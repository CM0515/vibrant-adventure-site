
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReservationModal } from "@/components/ReservationModal";

// Define a more comprehensive tour data type that includes optional fields
export interface TourData {
  id: string;
  name: string;
  price: number;
  duration: string;
  location: string;
  priceInfo?: string;
  description?: string | null;
  itinerary?: Array<{
    hora: string;
    actividad: string;
    lugar?: string;
  }> | null;
  services?: Array<{
    servicio: string;
    detalle: string;
  }> | null;
  recommendations?: string | null;
}

interface TourBookingButtonProps {
  tourData: TourData;
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
