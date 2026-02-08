import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminFloatingBar from "@/components/AdminFloatingBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, GraduationCap, Filter, Calendar, User, FileText, Eye } from "lucide-react";
import { useTFCs } from "@/hooks/useContent";
import { useTrackView } from "@/hooks/useTrackView";

const TFC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const { data: tfcs = [], isLoading } = useTFCs();

  const departments = [
    { id: "all", label: "Tous" },
    { id: "Sciences Infirmières", label: "Sciences Infirmières" },
    { id: "Techniques de Laboratoire", label: "Techniques de Laboratoire" },
    { id: "Sage-Femme", label: "Sage-Femme" },
    { id: "Santé Publique", label: "Santé Publique" },
    { id: "Pharmacie", label: "Pharmacie" },
    { id: "Kinésithérapie", label: "Kinésithérapie" },
  ];

  const filteredTFCs = tfcs.filter((tfc) => {
    const matchesSearch =
      !searchQuery ||
      tfc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tfc.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDepartment === "all" || tfc.department === selectedDepartment;
    return matchesSearch && matchesDept;
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
                <GraduationCap className="w-4 h-4" />
                Travaux de Fin de Cycle
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                Dépôt Électronique des TFC
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Consultez les travaux de recherche de nos étudiants.
              </p>
              <div className="relative max-w-md mx-auto">
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
                {filteredTFCs.length} travaux trouvés
              </span>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-pulse text-primary font-display text-lg">Chargement...</div>
              </div>
            ) : filteredTFCs.length === 0 ? (
              <div className="text-center py-16">
                <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Aucun TFC disponible
                </h3>
                <p className="text-muted-foreground">
                  Les travaux de fin de cycle seront publiés prochainement.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTFCs.map((tfc) => (
                  <TFCCard key={tfc.id} tfc={tfc} />
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

const TFCCard = ({ tfc }: { tfc: any }) => {
  useTrackView("tfc", tfc.id);

  return (
    <article className="bg-card rounded-2xl p-6 shadow-card card-hover border border-border">
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
            {tfc.supervisor && (
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                {tfc.supervisor}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {tfc.year}
            </span>
            <span className="flex items-center gap-1 text-primary">
              <Eye className="w-4 h-4" />
              {tfc.views} vue{tfc.views !== 1 ? "s" : ""}
            </span>
          </div>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {tfc.department}
          </span>
          {tfc.abstract && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{tfc.abstract}</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default TFC;
