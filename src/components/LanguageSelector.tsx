
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary" size="default" className="bg-white text-primary hover:bg-white/90">
          <Globe className="h-4 w-4" />
          {language === 'es' ? 'ES' : 'EN'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage('es')}
          className={language === 'es' ? 'bg-primary/10' : ''}
        >
          Español
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'bg-primary/10' : ''}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
