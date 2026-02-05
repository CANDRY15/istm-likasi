import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminFloatingBar from "@/components/AdminFloatingBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, GraduationCap, Filter, Download, Eye, Calendar, User, Upload, FileText } from "lucide-react";

const TFC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = [
    { id: "all", label: "Tous" },
    { id: "nursing", label: "Sciences Infirmières" },
    { id: "laboratory", label: "Techniques de Laboratoire" },
    { id: "midwife", label: "Sage-Femme" },
    { id: "public-health", label: "Santé Publique" },
    { id: "pharmacy", label: "Pharmacie" },
    { id: "physiotherapy", label: "Kinésithérapie" },
  ];

  const tfcs = [
    {
      id: 1,
      title: "Évaluation de la prise en charge des patients diabétiques",
      author: "Kabongo Mwamba Jean",
      department: "Sciences Infirmières",
      year: "2024",
      supervisor: "Prof. Mukendi Paul",
      downloads: 89,
      views: 456,
    },
    {
      id: 2,
      title: "Analyse bactériologique des eaux de puits dans la commune de Likasi",
      author: "Tshimanga Sophie",
      department: "Techniques de Laboratoire",
      year: "2024",
      supervisor: "Dr. Ngoy Marie",
      downloads: 67,
      views: 324,
    },
    {
      id: 3,
      title: "Facteurs de risque de l'accouchement prématuré",
      author: "Mwanza Claire",
      department: "Sage-Femme",
      year: "2023",
      supervisor: "Prof. Kalumba Anne",
      downloads: 112,
      views: 578,
    },
    {
      id: 4,
      title: "Prévalence du paludisme chez les enfants de moins de 5 ans",
      author: "Ilunga Pierre",
      department: "Santé Publique",
      year: "2024",
      supervisor: "Dr. Kabwe Emmanuel",
      downloads: 145,
      views: 723,
    },
    {
      id: 5,
      title: "Étude de la résistance aux antibiotiques dans les hôpitaux de Likasi",
      author: "Mutombo Grâce",
      department: "Pharmacie",
      year: "2023",
      supervisor: "Prof. Tshilumba Joseph",
      downloads: 98,
      views: 489,
    },
    {
      id: 6,
      title: "Rééducation fonctionnelle post-AVC : étude de cas",
      author: "Kasongo David",
      department: "Kinésithérapie",
      year: "2024",
      supervisor: "Dr. Mbuyi Sarah",
      downloads: 76,
      views: 367,
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
                <GraduationCap className="w-4 h-4" />
                Travaux de Fin de Cycle
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                Dépôt Électronique des TFC
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Consultez les travaux de recherche de nos étudiants ou soumettez le vôtre.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl">
                  <Upload className="w-5 h-5" />
                  Déposer mon TFC
                </Button>
                <div className="relative flex-1 max-w-md w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher un TFC..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-card text-foreground shadow-elevated"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Departments Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              {departments.map((dept) => (
                <Button
                  key={dept.id}
                  variant={selectedDepartment === dept.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDepartment(dept.id)}
                  className="flex-shrink-0"
                >
                  {dept.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* TFC List */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                TFC Publiés
              </h2>
              <span className="text-muted-foreground">
                {tfcs.length} travaux trouvés
              </span>
            </div>

            <div className="space-y-4">
              {tfcs.map((tfc) => (
                <article
                  key={tfc.id}
                  className="bg-card rounded-2xl p-6 shadow-card card-hover border border-border"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-7 h-7 text-accent" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                        {tfc.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {tfc.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {tfc.supervisor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {tfc.year}
                        </span>
                      </div>
                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {tfc.department}
                      </span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {tfc.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {tfc.downloads}
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
                Charger plus de TFC
              </Button>
            </div>
          </div>
        </section>

        {/* Submit CTA */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Vous avez terminé votre TFC ?
              </h2>
              <p className="text-muted-foreground mb-8">
                Déposez votre travail de fin de cycle pour le rendre accessible à la communauté académique.
              </p>
              <Button variant="default" size="xl">
                <Upload className="w-5 h-5" />
                Soumettre mon travail
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

export default TFC;
