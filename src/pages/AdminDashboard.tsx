import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  Settings,
  TrendingUp,
  Search,
  LogOut,
  Shield,
  BarChart3,
  Eye,
  Download,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";

type TabType = "overview" | "users" | "tfc" | "library" | "revue" | "settings";

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabType) || "overview";
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth", { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-display text-xl">Chargement...</div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const stats = [
    { icon: Users, label: "Utilisateurs", value: "342", change: "+12%", color: "bg-primary/10 text-primary" },
    { icon: GraduationCap, label: "TFC Publiés", value: "1,245", change: "+8%", color: "bg-accent/20 text-accent-foreground" },
    { icon: BookOpen, label: "Livres", value: "5,120", change: "+3%", color: "bg-destructive/10 text-destructive" },
    { icon: FileText, label: "Articles Revue", value: "156", change: "+15%", color: "bg-primary/10 text-primary" },
  ];

  const recentUsers = [
    { name: "Jean Mukendi", email: "jean@istm.cd", role: "Étudiant", date: "05 Fév 2026" },
    { name: "Marie Kabila", email: "marie@istm.cd", role: "Enseignant", date: "04 Fév 2026" },
    { name: "Patrick Mutombo", email: "patrick@istm.cd", role: "Étudiant", date: "03 Fév 2026" },
    { name: "Sophie Tshimanga", email: "sophie@istm.cd", role: "Chercheur", date: "02 Fév 2026" },
  ];

  const recentTFCs = [
    { title: "Évaluation de la prise en charge des patients diabétiques", author: "Kabongo Mwamba Jean", dept: "Sciences Infirmières", status: "Publié" },
    { title: "Analyse bactériologique des eaux de puits", author: "Tshimanga Sophie", dept: "Techniques de Laboratoire", status: "En attente" },
    { title: "Facteurs de risque de l'accouchement prématuré", author: "Mwanza Claire", dept: "Sage-Femme", status: "Publié" },
    { title: "Prévalence du paludisme chez les enfants", author: "Ilunga Pierre", dept: "Santé Publique", status: "En révision" },
  ];

  const sidebarItems: { icon: typeof LayoutDashboard; label: string; tab: TabType }[] = [
    { icon: LayoutDashboard, label: "Vue d'ensemble", tab: "overview" },
    { icon: Users, label: "Utilisateurs", tab: "users" },
    { icon: GraduationCap, label: "TFC", tab: "tfc" },
    { icon: BookOpen, label: "Bibliothèque", tab: "library" },
    { icon: FileText, label: "Revue", tab: "revue" },
    { icon: Settings, label: "Paramètres", tab: "settings" },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <div className="flex pt-16 md:pt-20">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border min-h-[calc(100vh-5rem)] p-4">
          <div className="flex items-center gap-2 px-3 py-2 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-foreground">Admin Panel</span>
          </div>

          <nav className="space-y-1 flex-1">
            {sidebarItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <Button variant="ghost" className="justify-start text-destructive hover:text-destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </aside>

        {/* Mobile tab bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex justify-around py-2">
          {sidebarItems.slice(0, 5).map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs ${
                activeTab === item.tab ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="truncate max-w-[60px]">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 pb-20 lg:pb-8 overflow-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {sidebarItems.find((i) => i.tab === activeTab)?.label}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Bienvenue, {user.email}
              </p>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-card rounded-xl p-5 border border-border shadow-soft">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-primary flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-foreground font-display">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground">Utilisateurs Récents</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("users")}>
                      Voir tout
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {recentUsers.map((u, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{u.name}</div>
                            <div className="text-xs text-muted-foreground">{u.email}</div>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">{u.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent TFCs */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground">TFC Récents</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("tfc")}>
                      Voir tout
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {recentTFCs.map((tfc, i) => (
                      <div key={i} className="p-3 rounded-lg hover:bg-secondary transition-colors">
                        <div className="text-sm font-medium text-foreground line-clamp-1">{tfc.title}</div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{tfc.author}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            tfc.status === "Publié" ? "bg-primary/10 text-primary" :
                            tfc.status === "En attente" ? "bg-accent/20 text-accent-foreground" :
                            "bg-destructive/10 text-destructive"
                          }`}>
                            {tfc.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats Chart Placeholder */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">Statistiques du mois</h3>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center py-8">
                  <div>
                    <div className="text-3xl font-bold text-primary font-display">89</div>
                    <div className="text-sm text-muted-foreground mt-1">Nouveaux TFC</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent-foreground font-display">2,340</div>
                    <div className="text-sm text-muted-foreground mt-1">Téléchargements</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-destructive font-display">56</div>
                    <div className="text-sm text-muted-foreground mt-1">Nouveaux inscrits</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Gestion des comptes utilisateurs</p>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Ajouter
                </Button>
              </div>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Nom</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rôle</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((u, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                {u.name.charAt(0)}
                              </div>
                              <span className="text-sm font-medium text-foreground">{u.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{u.email}</td>
                          <td className="p-4">
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{u.role}</span>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{u.date}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TFC Tab */}
          {activeTab === "tfc" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Gestion des travaux de fin de cycle</p>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Ajouter un TFC
                </Button>
              </div>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Titre</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Auteur</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Département</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Statut</th>
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTFCs.map((tfc, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30">
                          <td className="p-4 max-w-xs">
                            <span className="text-sm font-medium text-foreground line-clamp-1">{tfc.title}</span>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{tfc.author}</td>
                          <td className="p-4">
                            <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">{tfc.dept}</span>
                          </td>
                          <td className="p-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              tfc.status === "Publié" ? "bg-primary/10 text-primary" :
                              tfc.status === "En attente" ? "bg-accent/20 text-accent-foreground" :
                              "bg-destructive/10 text-destructive"
                            }`}>
                              {tfc.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Library Tab */}
          {activeTab === "library" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Gestion de la bibliothèque numérique</p>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Ajouter un livre
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Anatomie Humaine", author: "Dr. Mukendi", category: "Sciences Médicales", downloads: 234 },
                  { title: "Soins Infirmiers", author: "Prof. Kalumba", category: "Sciences Infirmières", downloads: 189 },
                  { title: "Microbiologie Médicale", author: "Dr. Ngoy", category: "Laboratoire", downloads: 156 },
                  { title: "Pharmacologie", author: "Prof. Tshilumba", category: "Pharmacie", downloads: 312 },
                  { title: "Santé Communautaire", author: "Dr. Kabwe", category: "Santé Publique", downloads: 98 },
                  { title: "Kinésiologie", author: "Dr. Mbuyi", category: "Kinésithérapie", downloads: 145 },
                ].map((book, i) => (
                  <div key={i} className="bg-card rounded-xl border border-border p-5 hover:shadow-card transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-3 h-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    </div>
                    <h4 className="font-medium text-foreground text-sm mb-1">{book.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{book.category}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Download className="w-3 h-3" /> {book.downloads}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Revue Tab */}
          {activeTab === "revue" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Gestion de la revue scientifique</p>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Nouvel article
                </Button>
              </div>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Titre</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Auteur</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Volume</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Statut</th>
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { title: "Impact du changement climatique sur les maladies tropicales", author: "Dr. Mukendi", volume: "Vol. 12, No. 3", status: "Publié" },
                        { title: "Nouvelles approches en kinésithérapie respiratoire", author: "Prof. Mbuyi", volume: "Vol. 12, No. 2", status: "En révision" },
                        { title: "Étude épidémiologique de la tuberculose", author: "Dr. Kabwe", volume: "Vol. 12, No. 1", status: "Publié" },
                      ].map((article, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30">
                          <td className="p-4 max-w-xs">
                            <span className="text-sm font-medium text-foreground line-clamp-1">{article.title}</span>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{article.author}</td>
                          <td className="p-4 text-sm text-muted-foreground">{article.volume}</td>
                          <td className="p-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              article.status === "Publié" ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground"
                            }`}>
                              {article.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-2xl">
              <p className="text-muted-foreground">Paramètres du site</p>
              <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground">Nom du site</label>
                  <Input defaultValue="ISTM Likasi - Portail Académique" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email de contact</label>
                  <Input defaultValue="contact@istm-likasi.cd" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Description du site</label>
                  <Input defaultValue="Portail académique de l'Institut Supérieur des Techniques Médicales de Likasi" className="mt-1" />
                </div>
                <Button>Sauvegarder les paramètres</Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
