import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTFCs, useDeleteTFC, useLibraryDocs, useDeleteLibraryDoc, useArticles, useDeleteArticle } from "@/hooks/useContent";
import Header from "@/components/Header";
import TFCForm from "@/components/admin/TFCForm";
import LibraryForm from "@/components/admin/LibraryForm";
import ArticleForm from "@/components/admin/ArticleForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  FileText,
  Settings,
  Search,
  LogOut,
  Shield,
  Plus,
  Trash2,
  Pencil,
  Eye,
} from "lucide-react";

type TabType = "overview" | "tfc" | "library" | "revue" | "settings";

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabType) || "overview";
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  // Form visibility & edit state
  const [showTFCForm, setShowTFCForm] = useState(false);
  const [editingTFC, setEditingTFC] = useState<any>(null);
  const [showLibraryForm, setShowLibraryForm] = useState(false);
  const [editingLibrary, setEditingLibrary] = useState<any>(null);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  const { data: tfcs = [], isLoading: loadingTFCs } = useTFCs();
  const { data: libraryDocs = [], isLoading: loadingLibrary } = useLibraryDocs();
  const { data: articles = [], isLoading: loadingArticles } = useArticles();
  const deleteTFC = useDeleteTFC();
  const deleteLibraryDoc = useDeleteLibraryDoc();
  const deleteArticle = useDeleteArticle();

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
    { icon: GraduationCap, label: "TFC Publiés", value: tfcs.length.toString(), color: "bg-accent/20 text-accent-foreground" },
    { icon: BookOpen, label: "Documents Bibliothèque", value: libraryDocs.length.toString(), color: "bg-primary/10 text-primary" },
    { icon: FileText, label: "Articles Revue", value: articles.length.toString(), color: "bg-destructive/10 text-destructive" },
    { icon: Eye, label: "Vues Totales", value: (tfcs.reduce((s, t) => s + (t.views || 0), 0) + articles.reduce((s, a) => s + (a.views || 0), 0)).toString(), color: "bg-secondary text-foreground" },
  ];

  const sidebarItems: { icon: typeof LayoutDashboard; label: string; tab: TabType }[] = [
    { icon: LayoutDashboard, label: "Vue d'ensemble", tab: "overview" },
    { icon: GraduationCap, label: "TFC", tab: "tfc" },
    { icon: BookOpen, label: "Bibliothèque", tab: "library" },
    { icon: FileText, label: "Revue", tab: "revue" },
    { icon: Settings, label: "Paramètres", tab: "settings" },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const openEditTFC = (tfc: any) => {
    setEditingTFC(tfc);
    setShowTFCForm(true);
  };

  const closeTFCForm = () => {
    setShowTFCForm(false);
    setEditingTFC(null);
  };

  const openEditLibrary = (doc: any) => {
    setEditingLibrary(doc);
    setShowLibraryForm(true);
  };

  const closeLibraryForm = () => {
    setShowLibraryForm(false);
    setEditingLibrary(null);
  };

  const openEditArticle = (article: any) => {
    setEditingArticle(article);
    setShowArticleForm(true);
  };

  const closeArticleForm = () => {
    setShowArticleForm(false);
    setEditingArticle(null);
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
          {sidebarItems.map((item) => (
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
              <p className="text-muted-foreground text-sm mt-1">Bienvenue, {user.email}</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-card rounded-xl p-5 border border-border shadow-soft">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground font-display">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent TFCs */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground">TFC Récents</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("tfc")}>Voir tout</Button>
                  </div>
                  {loadingTFCs ? (
                    <p className="text-muted-foreground text-sm">Chargement...</p>
                  ) : tfcs.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Aucun TFC publié.</p>
                  ) : (
                    <div className="space-y-3">
                      {tfcs.slice(0, 4).map((tfc) => (
                        <div key={tfc.id} className="p-3 rounded-lg hover:bg-secondary transition-colors">
                          <div className="text-sm font-medium text-foreground line-clamp-1">{tfc.title}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">{tfc.author}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Eye className="w-3 h-3" /> {tfc.views}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tfc.department}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Articles */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground">Articles Récents</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("revue")}>Voir tout</Button>
                  </div>
                  {loadingArticles ? (
                    <p className="text-muted-foreground text-sm">Chargement...</p>
                  ) : articles.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Aucun article publié.</p>
                  ) : (
                    <div className="space-y-3">
                      {articles.slice(0, 4).map((article) => (
                        <div key={article.id} className="p-3 rounded-lg hover:bg-secondary transition-colors">
                          <div className="text-sm font-medium text-foreground line-clamp-1">{article.title}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">{article.authors}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Eye className="w-3 h-3" /> {article.views}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TFC Tab */}
          {activeTab === "tfc" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Gestion des travaux de fin de cycle</p>
                <Button size="sm" onClick={() => { setEditingTFC(null); setShowTFCForm(true); }}>
                  <Plus className="w-4 h-4 mr-1" /> Publier un TFC
                </Button>
              </div>

              {showTFCForm && <TFCForm onClose={closeTFCForm} editData={editingTFC} />}

              {loadingTFCs ? (
                <p className="text-muted-foreground">Chargement...</p>
              ) : tfcs.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-12 text-center">
                  <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-foreground mb-2">Aucun TFC publié</h3>
                  <p className="text-muted-foreground text-sm mb-4">Cliquez sur "Publier un TFC" pour ajouter le premier.</p>
                  <Button onClick={() => { setEditingTFC(null); setShowTFCForm(true); }}>
                    <Plus className="w-4 h-4 mr-1" /> Publier un TFC
                  </Button>
                </div>
              ) : (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-secondary/50">
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Titre</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Auteur</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Département</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Année</th>
                          <th className="text-center p-4 text-sm font-medium text-muted-foreground">Vues</th>
                          <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tfcs.map((tfc) => (
                          <tr key={tfc.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                            <td className="p-4 max-w-xs">
                              <span className="text-sm font-medium text-foreground line-clamp-1">{tfc.title}</span>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">{tfc.author}</td>
                            <td className="p-4">
                              <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">{tfc.department}</span>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">{tfc.year}</td>
                            <td className="p-4 text-sm text-muted-foreground text-center">{tfc.views}</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-primary"
                                  onClick={() => openEditTFC(tfc)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                  onClick={() => deleteTFC.mutate(tfc.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Library Tab */}
          {activeTab === "library" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Gestion de la bibliothèque numérique</p>
                <Button size="sm" onClick={() => { setEditingLibrary(null); setShowLibraryForm(true); }}>
                  <Plus className="w-4 h-4 mr-1" /> Ajouter un document
                </Button>
              </div>

              {showLibraryForm && <LibraryForm onClose={closeLibraryForm} editData={editingLibrary} />}

              {loadingLibrary ? (
                <p className="text-muted-foreground">Chargement...</p>
              ) : libraryDocs.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-12 text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-foreground mb-2">Aucun document</h3>
                  <p className="text-muted-foreground text-sm mb-4">Ajoutez des documents à la bibliothèque.</p>
                  <Button onClick={() => { setEditingLibrary(null); setShowLibraryForm(true); }}>
                    <Plus className="w-4 h-4 mr-1" /> Ajouter un document
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {libraryDocs.map((doc) => (
                    <div key={doc.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-card transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-primary"
                            onClick={() => openEditLibrary(doc)}
                          >
                            <Pencil className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => deleteLibraryDoc.mutate(doc.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <h4 className="font-medium text-foreground text-sm mb-1">{doc.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{doc.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{doc.category}</span>
                        <span className="text-xs text-muted-foreground">{doc.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Revue Tab */}
          {activeTab === "revue" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Gestion de la revue scientifique</p>
                <Button size="sm" onClick={() => { setEditingArticle(null); setShowArticleForm(true); }}>
                  <Plus className="w-4 h-4 mr-1" /> Publier un article
                </Button>
              </div>

              {showArticleForm && <ArticleForm onClose={closeArticleForm} editData={editingArticle} />}

              {loadingArticles ? (
                <p className="text-muted-foreground">Chargement...</p>
              ) : articles.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-foreground mb-2">Aucun article</h3>
                  <p className="text-muted-foreground text-sm mb-4">Publiez votre premier article scientifique.</p>
                  <Button onClick={() => { setEditingArticle(null); setShowArticleForm(true); }}>
                    <Plus className="w-4 h-4 mr-1" /> Publier un article
                  </Button>
                </div>
              ) : (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-secondary/50">
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Titre</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Auteurs</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Volume</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                          <th className="text-center p-4 text-sm font-medium text-muted-foreground">Vues</th>
                          <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articles.map((article) => (
                          <tr key={article.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                            <td className="p-4 max-w-xs">
                              <span className="text-sm font-medium text-foreground line-clamp-1">{article.title}</span>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">{article.authors}</td>
                            <td className="p-4 text-sm text-muted-foreground">{article.volume || "-"}</td>
                            <td className="p-4 text-sm text-muted-foreground">{article.date}</td>
                            <td className="p-4 text-sm text-muted-foreground text-center">{article.views}</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-primary"
                                  onClick={() => openEditArticle(article)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                  onClick={() => deleteArticle.mutate(article.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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
