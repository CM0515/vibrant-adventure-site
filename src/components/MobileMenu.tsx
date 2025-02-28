
import React from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileMenuProps {
  isScrolled: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isScrolled }) => {
  const { t } = useLanguage();

  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`p-2 rounded-full transition-colors ${
              isScrolled ? "text-secondary hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
          >
            <Menu size={24} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/" className="w-full flex items-center">
              {t('nav.home')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/tours" className="w-full flex items-center">
              {t('nav.tours')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/about" className="w-full flex items-center">
              {t('nav.about')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/contact" className="w-full flex items-center">
              {t('nav.contact')}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileMenu;
