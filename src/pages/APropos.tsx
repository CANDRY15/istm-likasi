import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminFloatingBar from "@/components/AdminFloatingBar";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, BookOpen, Award, MapPin, Phone, Mail, Clock, Target, Heart, Lightbulb } from "lucide-react";

const APropos = () => {
  const stats = [
    { icon: Users, value: "2,500+", label: "Étudiants" },
    { icon: GraduationCap, value: "50+", label: "Enseignants" },
    { icon: BookOpen, value: "6", label: "Départements" },
    { icon: Award, value: "40+", label: "Années d'Excellence" },
  ];

  const departments = [
    {
      name: "Sciences Infirmières",
      description: "Formation complète en soins infirmiers et prise en charge des patients.",
    },
    {
      name: "Techniques de Laboratoire",
      description: "Maîtrise des analyses biomédicales et des techniques de diagnostic.",
    },
    {
      name: "Sage-Femme",
      description: "Spécialisation en santé maternelle et obstétrique.",
    },
    {
      name: "Santé Publique",
      description: "Gestion des programmes de santé communautaire et épidémiologie.",
    },
    {
      name: "Pharmacie",
      description: "Formation en sciences pharmaceutiques et gestion des médicaments.",
    },
    {
      name: "Kinésithérapie",
      description: "Rééducation fonctionnelle et thérapies physiques.",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans la formation et la recherche.",
    },
    {
      icon: Heart,
      title: "Humanisme",
      description: "Placer l'humain au centre de nos actions et formations.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Adopter les nouvelles technologies et méthodes pédagogiques.",
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
                <Users className="w-4 h-4" />
                À Propos de Nous
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                ISTM Likasi
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Institut Supérieur des Techniques Médicales de Likasi - Former les professionnels de santé de demain.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-3">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground font-display">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Notre Mission
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Former des professionnels de santé compétents, éthiques et engagés, 
                    capables de répondre aux défis sanitaires de notre communauté et de contribuer 
                    à l'amélioration de la santé publique en République Démocratique du Congo.
                  </p>
                </div>

                <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
                    <Lightbulb className="w-7 h-7 text-accent" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Notre Vision
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Devenir une institution de référence en Afrique centrale pour la formation 
                    en sciences de la santé, reconnue pour la qualité de ses programmes, 
                    l'excellence de sa recherche et l'impact positif de ses diplômés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Nos Valeurs
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les principes qui guident notre action quotidienne.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-card text-center card-hover border border-border"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Nos Départements
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Six filières de formation pour répondre aux besoins du secteur de la santé.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-card card-hover border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {dept.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Contactez-nous
                </h2>
                <p className="text-muted-foreground">
                  Nous sommes à votre disposition pour toute information.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card rounded-2xl p-6 text-center shadow-card border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
                  <p className="text-muted-foreground text-sm">
                    Likasi, Haut-Katanga, RDC
                  </p>
                </div>

                <div className="bg-card rounded-2xl p-6 text-center shadow-card border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
                  <p className="text-muted-foreground text-sm">
                    +243 XXX XXX XXX
                  </p>
                </div>

                <div className="bg-card rounded-2xl p-6 text-center shadow-card border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground text-sm">
                    contact@istmlikasi.ac.cd
                  </p>
                </div>

                <div className="bg-card rounded-2xl p-6 text-center shadow-card border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Horaires</h3>
                  <p className="text-muted-foreground text-sm">
                    Lun - Ven: 8h - 17h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AdminFloatingBar />
    </div>
  );
};

export default APropos;
