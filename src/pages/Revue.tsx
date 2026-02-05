import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminFloatingBar from "@/components/AdminFloatingBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, Filter, Download, Eye, Calendar, User, Send, BookOpen } from "lucide-react";

const Revue = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVolume, setSelectedVolume] = useState("all");

  const volumes = [
    { id: "all", label: "Tous les volumes" },
    { id: "vol5", label: "Volume 5 (2024)" },
    { id: "vol4", label: "Volume 4 (2023)" },
    { id: "vol3", label: "Volume 3 (2022)" },
    { id: "vol2", label: "Volume 2 (2021)" },
  ];

  const articles = [
    {
      id: 1,
      title: "Impact des conditions socio-économiques sur la santé maternelle au Katanga",
      authors: ["Prof. Mukendi Jean", "Dr. Kabongo Marie"],
      volume: "Volume 5, Numéro 2",
      date: "Juin 2024",
      abstract: "Cette étude analyse les facteurs socio-économiques influençant les soins prénataux...",
      downloads: 234,
      views: 890,
      doi: "10.1234/istm.2024.052",
    },
    {
      id: 2,
      title: "Résistance antimicrobienne dans les établissements de santé de Likasi",
      authors: ["Dr. Tshimanga Paul", "Prof. Ngoy Sophie"],
      volume: "Volume 5, Numéro 1",
      date: "Mars 2024",
      abstract: "Une analyse complète des profils de résistance aux antibiotiques...",
      downloads: 189,
      views: 756,
      doi: "10.1234/istm.2024.041",
    },
    {
      id: 3,
      title: "Prévalence de la malnutrition chez les enfants de 0 à 5 ans",
      authors: ["Prof. Kalumba Pierre"],
      volume: "Volume 4, Numéro 4",
      date: "Décembre 2023",
      abstract: "Étude transversale sur l'état nutritionnel des enfants dans la province...",
      downloads: 312,
      views: 1234,
      doi: "10.1234/istm.2023.044",
    },
    {
      id: 4,
      title: "Efficacité des programmes de vaccination contre le COVID-19",
      authors: ["Dr. Mwamba Emmanuel", "Dr. Ilunga Claire"],
      volume: "Volume 4, Numéro 3",
      date: "Septembre 2023",
      abstract: "Évaluation de la couverture vaccinale et des obstacles à la vaccination...",
      downloads: 456,
      views: 1567,
      doi: "10.1234/istm.2023.033",
    },
  ];

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
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl">
                  <Send className="w-5 h-5" />
                  Soumettre un article
                </Button>
                <div className="relative flex-1 max-w-md w-full">
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
          </div>
        </section>

        {/* Journal Info */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary font-display">150+</div>
                <div className="text-sm text-muted-foreground">Articles Publiés</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary font-display">5</div>
                <div className="text-sm text-muted-foreground">Volumes</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary font-display">45+</div>
                <div className="text-sm text-muted-foreground">Auteurs</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary font-display">10K+</div>
                <div className="text-sm text-muted-foreground">Téléchargements</div>
              </div>
            </div>
          </div>
        </section>

        {/* Volume Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              {volumes.map((vol) => (
                <Button
                  key={vol.id}
                  variant={selectedVolume === vol.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedVolume(vol.id)}
                  className="flex-shrink-0"
                >
                  {vol.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Articles Récents
              </h2>
              <span className="text-muted-foreground">
                {articles.length} articles
              </span>
            </div>

            <div className="space-y-6">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-card rounded-2xl p-6 shadow-card card-hover border border-border"
                >
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
                          {article.authors.join(", ")}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent-foreground font-medium">
                            {article.volume}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </span>
                          <span className="text-muted-foreground">
                            DOI: {article.doi}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm line-clamp-2 pl-16">
                      {article.abstract}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views} vues
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {article.downloads} téléchargements
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Lire
                        </Button>
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Voir plus d'articles
              </Button>
            </div>
          </div>
        </section>

        {/* Submit CTA */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Send className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Contribuez à notre revue
              </h2>
              <p className="text-muted-foreground mb-8">
                Partagez vos recherches avec la communauté scientifique. Notre comité éditorial examine chaque soumission.
              </p>
              <Button variant="default" size="xl">
                <Send className="w-5 h-5" />
                Soumettre un article
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AdminFloatingBar />
    </div>
  );
};

export default Revue;
