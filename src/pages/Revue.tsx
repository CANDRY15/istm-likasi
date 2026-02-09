import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminFloatingBar from "@/components/AdminFloatingBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  FileText,
  Calendar,
  User,
  Eye,
  Download,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Library,
  Mail,
  Globe,
  Award,
  Hash,
  Filter,
} from "lucide-react";
import { useArticles } from "@/hooks/useContent";
import { useTrackView } from "@/hooks/useTrackView";
import logoIstm from "@/assets/logo-istm.png";

const Revue = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVolume, setSelectedVolume] = useState<string | null>(null);
  const { data: articles = [], isLoading } = useArticles();

  // Extract unique volumes for sidebar navigation
  const volumes = useMemo(() => {
    const volumeSet = new Map<string, number>();
    articles.forEach((a) => {
      const vol = a.volume || "Non classé";
      volumeSet.set(vol, (volumeSet.get(vol) || 0) + 1);
    });
    return Array.from(volumeSet.entries()).map(([name, count]) => ({ name, count }));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.abstract || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.doi || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesVolume =
        !selectedVolume ||
        (selectedVolume === "Non classé" ? !article.volume : article.volume === selectedVolume);

      return matchesSearch && matchesVolume;
    });
  }, [articles, searchQuery, selectedVolume]);

  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
  const totalDownloads = articles.reduce((sum, a) => sum + (a.downloads || 0), 0);

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Journal Banner — inspired by ScienceDirect journal headers */}
        <section className="bg-hero-gradient">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                <img src={logoIstm} alt="ISTM" className="w-14 h-14 md:w-16 md:h-16 object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-xs font-medium">
                    <Award className="w-3 h-3" />
                    Revue Scientifique
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-xs font-medium">
                    Open Access
                  </span>
                </div>
                <h1 className="font-display text-2xl md:text-4xl font-bold text-primary-foreground mb-2">
                  Revue Scientifique de l'ISTM Likasi
                </h1>
                <p className="text-primary-foreground/80 text-sm md:text-base max-w-2xl">
                  Publication académique multidisciplinaire dédiée à la recherche en sciences de la santé,
                  technologies médicales et sciences infirmières.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journal metrics bar */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-6 py-3 overflow-x-auto text-sm">
              <div className="flex items-center gap-2 text-muted-foreground whitespace-nowrap">
                <FileText className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">{articles.length}</span> articles publiés
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground whitespace-nowrap">
                <Eye className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">{totalViews}</span> consultations
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground whitespace-nowrap">
                <Download className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">{totalDownloads}</span> téléchargements
              </div>
              {volumes.length > 0 && (
                <>
                  <div className="w-px h-4 bg-border" />
                  <div className="flex items-center gap-2 text-muted-foreground whitespace-nowrap">
                    <Library className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{volumes.length}</span> volumes
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main content: Sidebar + Articles */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar — Journal Info */}
            <aside className="lg:w-72 flex-shrink-0 space-y-6">
              {/* Search */}
              <div className="bg-card rounded-xl border border-border p-4">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                  Rechercher dans la revue
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Titre, auteur, DOI..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 text-sm"
                  />
                </div>
              </div>

              {/* Volumes navigation */}
              {volumes.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-4">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Library className="w-3.5 h-3.5" />
                    Volumes & Numéros
                  </h3>
                  <nav className="space-y-1">
                    <button
                      onClick={() => setSelectedVolume(null)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        !selectedVolume
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span>Tous les articles</span>
                      <span className={`text-xs ${!selectedVolume ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {articles.length}
                      </span>
                    </button>
                    {volumes.map((vol) => (
                      <button
                        key={vol.name}
                        onClick={() => setSelectedVolume(vol.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedVolume === vol.name
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        <span className="truncate">{vol.name}</span>
                        <span className={`text-xs flex-shrink-0 ${selectedVolume === vol.name ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {vol.count}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              {/* Journal Info */}
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  À propos de la revue
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Éditeur</span>
                    <p className="font-medium text-foreground">ISTM Likasi</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Domaines</span>
                    <p className="font-medium text-foreground">Sciences de la Santé, Technologies Médicales</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fréquence</span>
                    <p className="font-medium text-foreground">Semestrielle</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Langue</span>
                    <p className="font-medium text-foreground">Français</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Accès</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                        <Globe className="w-3 h-3" /> Open Access
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  Contact éditorial
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Pour soumettre un article ou pour toute question éditoriale.
                </p>
                <Button variant="outline" size="sm" className="w-full text-sm">
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  Contacter la rédaction
                </Button>
              </div>
            </aside>

            {/* Articles List */}
            <div className="flex-1 min-w-0">
              {/* Results header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {selectedVolume ? selectedVolume : "Tous les articles"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} trouvé{filteredArticles.length !== 1 ? "s" : ""}
                    {searchQuery && ` pour "${searchQuery}"`}
                  </p>
                </div>
                {selectedVolume && (
                  <Button variant="outline" size="sm" onClick={() => setSelectedVolume(null)}>
                    <Filter className="w-3.5 h-3.5 mr-1.5" />
                    Réinitialiser
                  </Button>
                )}
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-card rounded-xl border border-border p-6 animate-pulse">
                      <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                      <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                      <div className="h-3 bg-muted rounded w-full" />
                    </div>
                  ))}
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-16 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
                    <FileText className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {searchQuery ? "Aucun résultat" : "Aucun article publié"}
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    {searchQuery
                      ? "Essayez avec d'autres termes de recherche."
                      : "Les articles scientifiques seront publiés prochainement par l'équipe éditoriale."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AdminFloatingBar />
    </div>
  );
};

/* ——— Article Card inspired by ScienceDirect ——— */
interface ArticleType {
  id: string;
  title: string;
  authors: string;
  volume: string | null;
  date: string;
  abstract: string | null;
  doi: string | null;
  views: number;
  downloads: number;
  file_url: string | null;
}

const ArticleCard = ({ article }: { article: ArticleType }) => {
  const [expanded, setExpanded] = useState(false);
  useTrackView("article", article.id);

  return (
    <article className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-card transition-shadow group">
      {/* Top color accent — like ScienceDirect article type indicator */}
      <div className="h-1 bg-primary" />

      <div className="p-5 md:p-6">
        {/* Article type & volume badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <FileText className="w-3 h-3" />
            Article de recherche
          </span>
          {article.volume && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs font-medium">
              <Hash className="w-3 h-3" />
              {article.volume}
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs font-medium">
            Open Access
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
          {article.title}
        </h3>

        {/* Authors */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <User className="w-4 h-4 flex-shrink-0 text-primary/60" />
          <span>{article.authors}</span>
        </div>

        {/* Abstract with expand/collapse */}
        {article.abstract && (
          <div className="mb-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors mb-2"
            >
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {expanded ? "Masquer le résumé" : "Afficher le résumé"}
            </button>
            {expanded && (
              <div className="pl-5 border-l-2 border-primary/20 animate-fade-in">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.abstract}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Metadata row — ScienceDirect style */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-3 border-t border-border">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
          {article.doi && (
            <a
              href={`https://doi.org/${article.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              DOI: {article.doi}
            </a>
          )}
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            {article.views} consultation{article.views !== 1 ? "s" : ""}
          </span>
          {article.downloads > 0 && (
            <span className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              {article.downloads} téléchargement{article.downloads !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default Revue;
