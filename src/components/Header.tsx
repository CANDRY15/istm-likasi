import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logoIstm from "@/assets/logo-istm.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Bibliothèque", href: "/bibliotheque" },
    { label: "Travaux de Fin Cycle", href: "/tfc" },
    { label: "Revue Scientifique", href: "/revue" },
    { label: "À Propos", href: "/apropos" },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logoIstm} 
              alt="ISTM Likasi" 
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-foreground text-lg md:text-xl leading-tight">
                ISTM Likasi
              </h1>
              <p className="text-xs text-muted-foreground">Portail Académique</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user && isAdmin ? (
              <div className="flex items-center gap-2">
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="hidden sm:flex gap-1">
                    <Shield className="w-4 h-4" />
                    Admin
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:flex gap-1">
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </Button>
              </div>
            ) : !user ? (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="hidden sm:flex gap-1">
                  <LogIn className="w-4 h-4" />
                  Connexion
                </Button>
              </Link>
            ) : null}
            
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
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user && isAdmin ? (
              <div className="mt-4 px-4 space-y-2">
                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <Shield className="w-4 h-4" />
                    Tableau de bord Admin
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full gap-2" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </Button>
              </div>
            ) : !user ? (
              <div className="mt-4 px-4">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <LogIn className="w-4 h-4" />
                    Connexion Admin
                  </Button>
                </Link>
              </div>
            ) : null}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
