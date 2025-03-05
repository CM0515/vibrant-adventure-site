import { useState, useEffect } from "react";
import { MapPin, Calendar, Search } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

type Location = {
  id: string;
  name: string;
  description: string;
  image_url: string;
};

type AvailableDate = {
  date: string;
  is_booked: boolean;
};

export function TourSearch() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isLoadingDates, setIsLoadingDates] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLocations() {
      try {
        const { data, error } = await supabase
          .from("locations")
          .select("*");
        
        if (error) throw error;
        setLocations(data || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
        toast.error("No se pudieron cargar las ubicaciones");
      }
    }
    
    fetchLocations();
  }, []);

  useEffect(() => {
    async function fetchAvailableDates() {
      if (!selectedLocation) return;
      
      setIsLoadingDates(true);
      try {
        const { data, error } = await supabase
          .from("reservations")
          .select("date, is_booked")
          .eq("location_id", selectedLocation)
          .eq("is_booked", false);
        
        if (error) throw error;
        
        const availableDates = (data || []).map((item: AvailableDate) => new Date(item.date));
        setAvailableDates(availableDates);
        setSelectedDate(undefined);
      } catch (error) {
        console.error("Error fetching available dates:", error);
        toast.error("No se pudieron cargar las fechas disponibles");
      } finally {
        setIsLoadingDates(false);
      }
    }
    
    fetchAvailableDates();
  }, [selectedLocation]);

  const handleSearch = () => {
    if (!selectedLocation || !selectedDate) {
      toast.error("Por favor selecciona una ubicación y una fecha");
      return;
    }

    navigate(`/tours?location=${selectedLocation}&date=${format(selectedDate, "yyyy-MM-dd")}`);
  };

  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.getFullYear() === date.getFullYear() &&
      availableDate.getMonth() === date.getMonth() &&
      availableDate.getDate() === date.getDate()
    );
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-wrap md:flex-nowrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <div className="flex items-center gap-2">
          <MapPin className="text-primary shrink-0" size={20} />
          <Select
            value={selectedLocation}
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger className="border-0 ring-0 shadow-none focus:ring-0 focus-visible:ring-0 px-0 bg-white">
              <SelectValue placeholder="¿A dónde quieres ir?" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {locations.map(location => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 min-w-[200px] border-l border-gray-200 pl-4">
        <div className="flex items-center gap-2">
          <Calendar className="text-primary shrink-0" size={20} />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-0 ring-0 shadow-none focus:ring-0 focus-visible:ring-0 px-0 bg-white",
                  !selectedDate && "text-muted-foreground"
                )}
                disabled={!selectedLocation || isLoadingDates}
              >
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>{isLoadingDates ? "Cargando fechas..." : "¿Cuándo?"}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  
                  return date < today || !isDateAvailable(date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button
        onClick={handleSearch}
        className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap"
        disabled={!selectedLocation || !selectedDate}
      >
        <Search size={20} className="mr-2" />
        Buscar
      </Button>
    </div>
  );
}
