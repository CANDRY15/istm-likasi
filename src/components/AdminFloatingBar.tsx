import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Shield, Edit, Plus, Settings } from "lucide-react";

const AdminFloatingBar = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) return null;

  // Don't show on admin page itself
  if (location.pathname === "/admin") return null;

  // Map current page to admin tab
  const getAdminTab = () => {
    switch (location.pathname) {
      case "/bibliotheque":
        return "library";
      case "/tfc":
        return "tfc";
      case "/revue":
        return "revue";
      default:
        return "overview";
    }
  };

  const getPageLabel = () => {
    switch (location.pathname) {
      case "/bibliotheque":
        return "Gérer la Bibliothèque";
      case "/tfc":
        return "Gérer les TFC";
      case "/revue":
        return "Gérer la Revue";
      case "/apropos":
        return "Modifier À Propos";
      default:
        return "Tableau de bord";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <div className="bg-primary text-primary-foreground rounded-2xl shadow-elevated p-3 flex items-center gap-2 animate-fade-in">
        <Shield className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">Mode Admin</span>
        <div className="flex items-center gap-1 ml-1">
          <Link to={`/admin?tab=${getAdminTab()}`}>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 text-xs gap-1"
            >
              <Edit className="w-3 h-3" />
              {getPageLabel()}
            </Button>
          </Link>
          <Link to="/admin?tab=settings">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminFloatingBar;
