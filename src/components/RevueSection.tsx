import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Calendar, User, BookMarked } from "lucide-react";

const RevueSection = () => {
  const articles = [
    {
      title: "L'impact de la nutrition sur la santé maternelle et infantile en milieu rural congolais",
      authors: "Prof. Kalombo M., Dr. Ngoy P.",
      date: "Janvier 2024",
      category: "Santé Publique",
      abstract: "Cette étude examine les effets de la malnutrition sur les issues de grossesse...",
    },
    {
      title: "Nouvelles approches thérapeutiques dans le traitement de la tuberculose multirésistante",
      authors: "Dr. Kabamba L., Prof. Mwanza K.",
      date: "Décembre 2023",
      category: "Médecine",
      abstract: "Une revue systématique des traitements innovants contre la TB-MDR...",
    },
    {
      title: "Évaluation de la qualité des services de laboratoire dans les hôpitaux de référence",
      authors: "Dr. Tshilombo A.",
      date: "Novembre 2023",
      category: "Laboratoire",
      abstract: "Analyse comparative des pratiques de laboratoire et recommandations...",
    },
  ];

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

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article, index) => (
            <article
              key={index}
              className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50 card-hover group"
            >
              {/* Header */}
              <div className="h-3 bg-gradient-to-r from-primary to-primary/60" />
              
              <div className="p-6">
                {/* Category */}
                <span className="inline-block px-3 py-1 bg-secondary text-sm text-muted-foreground rounded-full mb-4">
                  {article.category}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                {/* Abstract */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {article.abstract}
                </p>

                {/* Meta */}
                <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="truncate">{article.authors}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button variant="ghost" size="sm" className="w-full group/btn">
                  Lire l'article
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 md:p-8 bg-card rounded-2xl shadow-soft border border-border/50">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookMarked className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                Vous êtes chercheur ou enseignant ?
              </h3>
              <p className="text-muted-foreground text-sm">
                Soumettez votre article pour publication dans notre revue
              </p>
            </div>
            <Button variant="default" size="lg" className="sm:ml-4">
              Soumettre un article
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevueSection;
