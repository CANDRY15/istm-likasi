import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminFloatingBar from "@/components/AdminFloatingBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Filter, Download, Eye, Calendar, User } from "lucide-react";

const Bibliotheque = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "Tous" },
    { id: "medical", label: "Sciences Médicales" },
    { id: "nursing", label: "Sciences Infirmières" },
    { id: "pharmacy", label: "Pharmacie" },
    { id: "laboratory", label: "Laboratoire" },
    { id: "public-health", label: "Santé Publique" },
  ];

  const documents = [
    {
      id: 1,
      title: "Introduction à l'Anatomie Humaine",
      author: "Prof. Mukendi Jean",
      category: "Sciences Médicales",
      year: "2024",
      downloads: 245,
      views: 1250,
    },
    {
      id: 2,
      title: "Manuel de Soins Infirmiers",
      author: "Dr. Kabongo Marie",
      category: "Sciences Infirmières",
      year: "2024",
      downloads: 189,
      views: 890,
    },
    {
      id: 3,
      title: "Pharmacologie Générale",
      author: "Prof. Tshimanga Paul",
      category: "Pharmacie",
      year: "2023",
      downloads: 312,
      views: 1567,
    },
    {
      id: 4,
      title: "Techniques de Laboratoire Médical",
      author: "Dr. Mwamba Sophie",
      category: "Laboratoire",
      year: "2024",
      downloads: 156,
      views: 678,
    },
    {
      id: 5,
      title: "Épidémiologie et Santé Publique",
      author: "Prof. Kalumba Pierre",
      category: "Santé Publique",
      year: "2023",
      downloads: 278,
      views: 1123,
    },
    {
      id: 6,
      title: "Physiologie Médicale Avancée",
      author: "Dr. Ngoy Emmanuel",
      category: "Sciences Médicales",
      year: "2024",
      downloads: 198,
      views: 945,
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
                <BookOpen className="w-4 h-4" />
                Bibliothèque Numérique
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                Explorez Notre Collection
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Accédez à des milliers de ressources académiques, livres et documents de référence.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un document, un auteur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card text-foreground shadow-elevated"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="flex-shrink-0"
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Documents Disponibles
              </h2>
              <span className="text-muted-foreground">
                {documents.length} documents trouvés
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <article
                  key={doc.id}
                  className="bg-card rounded-2xl p-6 shadow-card card-hover border border-border"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-2">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {doc.author}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {doc.year}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
                      {doc.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {doc.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {doc.downloads}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Charger plus de documents
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

export default Bibliotheque;
