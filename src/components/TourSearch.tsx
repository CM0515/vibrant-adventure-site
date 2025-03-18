import { useState, useEffect } from "react";
import { MapPin, Calendar, Search } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
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
        setDateRange([
          {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
          }
        ]);
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
    if (!selectedLocation || !dateRange[0].startDate) {
      toast.error("Por favor selecciona una ubicación y una fecha");
      return;
    }

    navigate(`/tours?location=${selectedLocation}&date=${format(dateRange[0].startDate, "yyyy-MM-dd")}`);
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable dates before today
    if (date < today) return true;
    
    // If we have available dates, only enable those
    if (availableDates.length > 0) {
      return !availableDates.some(availableDate => 
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate()
      );
    }
    
    return false;
  };
  
  const handleDateChange = (item: any) => {
    setDateRange([item.selection]);
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
                  !dateRange[0].startDate && "text-muted-foreground"
                )}
                disabled={!selectedLocation || isLoadingDates}
              >
                {dateRange[0].startDate ? (
                  dateRange[0].endDate && dateRange[0].startDate.getTime() !== dateRange[0].endDate.getTime() ? (
                    `${format(dateRange[0].startDate, "dd/MM/yyyy")} - ${format(dateRange[0].endDate, "dd/MM/yyyy")}`
                  ) : (
                    format(dateRange[0].startDate, "dd/MM/yyyy")
                  )
                ) : (
                  <span>{isLoadingDates ? "Cargando fechas..." : "¿Cuándo?"}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <DateRange
                ranges={dateRange}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                disabledDay={isDateDisabled}
                showDateDisplay={false}
                rangeColors={["#E97B00"]}
                monthDisplayFormat="MMMM yyyy"
                className="bg-white"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button
        onClick={handleSearch}
        className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap"
        disabled={!selectedLocation || !dateRange[0].startDate}
      >
        <Search size={20} className="mr-2" />
        Buscar
      </Button>
    </div>
  );
}
