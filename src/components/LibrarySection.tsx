import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, FileText, Clock, Eye } from "lucide-react";

const LibrarySection = () => {
  const categories = [
    { name: "Sciences Médicales", count: 1250, color: "bg-blue-500" },
    { name: "Biologie", count: 890, color: "bg-emerald-500" },
    { name: "Chimie", count: 654, color: "bg-purple-500" },
    { name: "Pharmacie", count: 432, color: "bg-rose-500" },
    { name: "Santé Publique", count: 567, color: "bg-amber-500" },
    { name: "Nursing", count: 789, color: "bg-cyan-500" },
  ];

  const recentDocuments = [
    {
      title: "Manuel de Physiologie Humaine",
      author: "Prof. Kabongo M.",
      category: "Sciences Médicales",
      date: "2024",
      views: 234,
    },
    {
      title: "Introduction à la Microbiologie Clinique",
      author: "Dr. Mwamba K.",
      category: "Biologie",
      date: "2024",
      views: 189,
    },
    {
      title: "Guide Pratique de Soins Infirmiers",
      author: "Prof. Kasongo L.",
      category: "Nursing",
      date: "2023",
      views: 312,
    },
  ];

  return (
    <section id="bibliotheque" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Bibliothèque Numérique
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Explorer nos ressources
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Des milliers de documents académiques à votre disposition
            </p>
          </div>
          <Button variant="outline" size="lg" className="self-start md:self-auto">
            Voir tout le catalogue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Catégories
              </h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Documents Récents
                </h3>
                <a href="#" className="text-sm text-primary hover:underline">
                  Voir plus
                </a>
              </div>
              <div className="space-y-4">
                {recentDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-12 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {doc.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {doc.author}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {doc.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {doc.views} vues
                        </span>
                        <span className="px-2 py-0.5 bg-secondary rounded-full">
                          {doc.category}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LibrarySection;
