import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminFloatingBar from "@/components/AdminFloatingBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, Filter, Calendar, User, BookOpen, Eye } from "lucide-react";
import { useArticles } from "@/hooks/useContent";
import { useTrackView } from "@/hooks/useTrackView";

const Revue = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: articles = [], isLoading } = useArticles();

  const filteredArticles = articles.filter((article) => {
    if (!searchQuery) return true;
    return (
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.authors.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="bg-hero-gradient py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm mb-6">
                <FileText className="w-4 h-4" />
                Revue Scientifique
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                Revue de l'ISTM Likasi
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Publication scientifique dédiée à la recherche en sciences de la santé.
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-card text-foreground shadow-elevated"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Articles Publiés
              </h2>
              <span className="text-muted-foreground">
                {filteredArticles.length} articles
              </span>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-pulse text-primary font-display text-lg">Chargement...</div>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Aucun article disponible
                </h3>
                <p className="text-muted-foreground">
                  Les articles scientifiques seront publiés prochainement.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <AdminFloatingBar />
    </div>
  );
};

const ArticleCard = ({ article }: { article: any }) => {
  useTrackView("article", article.id);

  return (
    <article className="bg-card rounded-2xl p-6 shadow-card card-hover border border-border">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-foreground text-lg mb-2">
              {article.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
              <User className="w-4 h-4" />
              {article.authors}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {article.volume && (
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent-foreground font-medium">
                  {article.volume}
                </span>
              )}
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              {article.doi && (
                <span className="text-muted-foreground">DOI: {article.doi}</span>
              )}
              <span className="flex items-center gap-1 text-primary">
                <Eye className="w-4 h-4" />
                {article.views} vue{article.views !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
        {article.abstract && (
          <p className="text-muted-foreground text-sm line-clamp-2 pl-16">
            {article.abstract}
          </p>
        )}
      </div>
    </article>
  );
};

export default Revue;
