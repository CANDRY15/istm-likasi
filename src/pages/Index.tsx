import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, GraduationCap, FileText, Users, ArrowRight, Award, Globe, Clock } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { icon: BookOpen, value: "5,000+", label: "Documents" },
    { icon: GraduationCap, value: "1,200+", label: "TFC Publiés" },
    { icon: FileText, value: "150+", label: "Articles Revue" },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Bibliothèque Numérique",
      description: "Accédez à des milliers de ressources académiques, livres et documents de référence.",
      link: "/bibliotheque",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: GraduationCap,
      title: "Travaux de Fin de Cycle",
      description: "Consultez et déposez les TFC des étudiants de tous les départements.",
      link: "/tfc",
      color: "bg-accent/20 text-accent-foreground",
    },
    {
      icon: FileText,
      title: "Revue Scientifique",
      description: "Découvrez nos publications scientifiques et contribuez à la recherche.",
      link: "/revue",
      color: "bg-destructive/10 text-destructive",
    },
  ];

  const highlights = [
    {
      icon: Award,
      title: "Excellence Académique",
      description: "Plus de 40 ans d'expérience dans la formation en sciences de la santé.",
    },
    {
      icon: Globe,
      title: "Accès Universel",
      description: "Plateforme accessible 24h/24 depuis n'importe où dans le monde.",
    },
    {
      icon: Clock,
      title: "Ressources Actualisées",
      description: "Contenu régulièrement mis à jour avec les dernières publications.",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden pt-24 md:pt-28">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm mb-6 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Bienvenue au Portail Académique
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
                Institut Supérieur des{" "}
                <span className="text-gradient-gold">Techniques Médicales</span>
                {" "}de Likasi
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Accédez à notre bibliothèque numérique, consultez les travaux de fin de cycle 
                et découvrez notre revue scientifique.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher un document, TFC, article..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-12 pr-36 rounded-2xl bg-card text-foreground placeholder:text-muted-foreground shadow-elevated focus:outline-none focus:ring-2 focus:ring-accent font-body text-base"
                  />
                  <Button
                    variant="gold"
                    size="lg"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    Rechercher
                  </Button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <Link to="/tfc">
                  <Button variant="hero" size="xl">
                    <GraduationCap className="w-5 h-5" />
                    Déposer un TFC
                  </Button>
                </Link>
                <Link to="/bibliotheque">
                  <Button variant="heroOutline" size="xl">
                    <BookOpen className="w-5 h-5" />
                    Explorer la Bibliothèque
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-foreground/10 backdrop-blur-sm mb-2">
                      <stat.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-primary-foreground font-display">
                      {stat.value}
                    </div>
                    <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="hsl(var(--background))"
              />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4">
                Explorez Notre Portail
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trois espaces dédiés pour répondre à tous vos besoins académiques.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  to={feature.link}
                  className="group bg-card rounded-2xl p-8 shadow-card card-hover border border-border"
                >
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                    Explorer <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {highlights.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Users className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4">
                Rejoignez Notre Communauté
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Étudiants, enseignants et chercheurs, créez votre compte pour accéder à toutes les fonctionnalités du portail.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="default" size="xl">
                  Créer un compte
                </Button>
                <Link to="/apropos">
                  <Button variant="outline" size="xl">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
