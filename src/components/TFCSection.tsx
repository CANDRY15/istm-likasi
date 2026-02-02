import { Button } from "@/components/ui/button";
import { GraduationCap, Upload, Search, Award, TrendingUp, Users } from "lucide-react";

const TFCSection = () => {
  const recentTFC = [
    {
      title: "Étude de la prévalence du paludisme chez les enfants de 0 à 5 ans à Likasi",
      author: "Jean-Pierre Mukendi",
      department: "Sciences Infirmières",
      year: "2024",
      grade: "Distinction",
    },
    {
      title: "Analyse des facteurs de risque cardiovasculaire dans la population urbaine",
      author: "Marie Kabila",
      department: "Techniques de Laboratoire",
      year: "2024",
      grade: "Grande Distinction",
    },
    {
      title: "Évaluation de la qualité des soins prénataux dans les centres de santé",
      author: "Patrick Mutombo",
      department: "Sage-Femme",
      year: "2024",
      grade: "Distinction",
    },
  ];

  return (
    <section id="tfc" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              Travaux de Fin de Cycle
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Publiez et consultez les{" "}
              <span className="text-gradient-gold">TFC</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Notre plateforme permet aux étudiants de soumettre leurs travaux de fin de cycle 
              en format électronique. Ces travaux sont ensuite validés et publiés pour servir 
              de référence aux générations futures.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Soumission Facile</h4>
                  <p className="text-sm text-muted-foreground">Déposez votre TFC en quelques clics</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Recherche Avancée</h4>
                  <p className="text-sm text-muted-foreground">Trouvez rapidement ce que vous cherchez</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Validation Académique</h4>
                  <p className="text-sm text-muted-foreground">Chaque TFC est vérifié et validé</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Visibilité Accrue</h4>
                  <p className="text-sm text-muted-foreground">Partagez vos recherches avec tous</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="gold" size="lg">
                <Upload className="w-5 h-5" />
                Soumettre mon TFC
              </Button>
              <Button variant="outline" size="lg">
                Consulter les TFC
              </Button>
            </div>
          </div>

          {/* Right Content - Recent TFCs */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-semibold text-foreground">
                TFC Récemment Publiés
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                1,200+ TFC
              </div>
            </div>

            <div className="space-y-4">
              {recentTFC.map((tfc, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-secondary/30 transition-all cursor-pointer group"
                >
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {tfc.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Par {tfc.author}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {tfc.department}
                    </span>
                    <span className="px-2 py-1 bg-secondary text-muted-foreground text-xs rounded-full">
                      {tfc.year}
                    </span>
                    <span className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs rounded-full">
                      {tfc.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-4">
              Voir tous les TFC
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TFCSection;
