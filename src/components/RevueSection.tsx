import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Calendar, User, BookMarked, Eye, ChevronRight } from "lucide-react";
import { useArticles } from "@/hooks/useContent";

const RevueSection = () => {
  const { data: articles = [], isLoading } = useArticles();
  const displayArticles = articles.slice(0, 3);

  return (
    <section id="revue" className="py-20 md:py-28 bg-primary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            Revue Scientifique
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Publications Scientifiques ISTM
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez les recherches et publications de notre communauté académique
          </p>
        </div>

        {/* Articles */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50 animate-pulse">
                <div className="h-3 bg-primary/20" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-5 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : displayArticles.length === 0 ? (
          <div className="text-center py-12 mb-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Les articles scientifiques seront publiés prochainement.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayArticles.map((article) => (
              <article
                key={article.id}
                className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50 card-hover group"
              >
                {/* Header accent */}
                <div className="h-1.5 bg-gradient-to-r from-primary to-primary/60" />

                <div className="p-6">
                  {/* Volume badge */}
                  {article.volume && (
                    <span className="inline-block px-3 py-1 bg-secondary text-sm text-muted-foreground rounded-full mb-4">
                      {article.volume}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  {/* Abstract */}
                  {article.abstract && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {article.abstract}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="truncate">{article.authors}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <Eye className="w-3.5 h-3.5" />
                        <span className="text-xs">{article.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to="/revue">
                    <Button variant="ghost" size="sm" className="w-full group/btn">
                      Lire l'article
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 md:p-8 bg-card rounded-2xl shadow-soft border border-border/50">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookMarked className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                Explorer la revue complète
              </h3>
              <p className="text-muted-foreground text-sm">
                {articles.length} articles publiés en accès libre
              </p>
            </div>
            <Link to="/revue">
              <Button variant="default" size="lg" className="sm:ml-4">
                Accéder à la revue
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevueSection;
