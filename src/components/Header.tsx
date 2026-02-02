import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, GraduationCap, FileText, Users, Search } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Bibliothèque", href: "#bibliotheque", icon: BookOpen },
    { label: "Travaux de Fin Cycle", href: "#tfc", icon: GraduationCap },
    { label: "Revue Scientifique", href: "#revue", icon: FileText },
    { label: "À Propos", href: "#apropos", icon: Users },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center shadow-soft">
              <span className="text-primary-foreground font-display font-bold text-lg md:text-xl">IS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-foreground text-lg md:text-xl leading-tight">
                ISTM Likasi
              </h1>
              <p className="text-xs text-muted-foreground">Portail Académique</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="default" size="sm" className="hidden sm:flex">
              Connexion
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 text-primary" />
                {item.label}
              </a>
            ))}
            <div className="mt-4 px-4">
              <Button variant="default" className="w-full">
                Connexion
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
