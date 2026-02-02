import { BookOpen, GraduationCap, FileText, Users, Download, Shield } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Bibliothèque Numérique",
      description: "Accédez à des milliers de documents académiques, livres électroniques et ressources pédagogiques.",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: GraduationCap,
      title: "Travaux de Fin de Cycle",
      description: "Consultez et déposez les TFC des étudiants pour partager les connaissances entre générations.",
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      icon: FileText,
      title: "Revue Scientifique",
      description: "Publiez et lisez des articles scientifiques rédigés par nos enseignants et chercheurs.",
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      icon: Download,
      title: "Téléchargement Facile",
      description: "Téléchargez les documents en format PDF pour une lecture hors-ligne.",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      icon: Users,
      title: "Communauté Académique",
      description: "Rejoignez une communauté de chercheurs, enseignants et étudiants passionnés.",
      color: "bg-rose-500/10 text-rose-600",
    },
    {
      icon: Shield,
      title: "Accès Sécurisé",
      description: "Vos travaux sont protégés et accessibles uniquement aux utilisateurs autorisés.",
      color: "bg-cyan-500/10 text-cyan-600",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nos Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-muted-foreground text-lg">
            Un portail complet pour accompagner votre parcours académique et scientifique
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 md:p-8 shadow-soft card-hover border border-border/50"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
