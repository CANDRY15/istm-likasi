import { MapPin, Phone, Mail, Clock, Users, Award, Building } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { icon: Users, value: "3,500+", label: "Étudiants" },
    { icon: Award, value: "50+", label: "Années d'excellence" },
    { icon: Building, value: "6", label: "Départements" },
  ];

  return (
    <section id="apropos" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Info */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Building className="w-4 h-4" />
              À Propos
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Institut Supérieur des Techniques Médicales de Likasi
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              L'ISTM Likasi est une institution d'enseignement supérieur de renom, 
              dédiée à la formation des professionnels de la santé en République 
              Démocratique du Congo. Depuis plus de 50 ans, nous formons des 
              infirmiers, laborantins, sages-femmes et autres professionnels médicaux.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Notre mission est de fournir une éducation de qualité, alliant théorie 
              et pratique, pour préparer nos étudiants à relever les défis sanitaires 
              de notre communauté et au-delà.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-secondary/50 rounded-xl">
                  <stat.icon className="w-6 h-6 mx-auto text-primary mb-2" />
                  <div className="text-2xl font-bold text-foreground font-display">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Contact Card */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Contactez-nous
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Adresse</h4>
                  <p className="text-muted-foreground">
                    Avenue de l'Université, Commune de Kikula<br />
                    Likasi, Haut-Katanga, RDC
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Téléphone</h4>
                  <p className="text-muted-foreground">
                    +243 XXX XXX XXX
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Email</h4>
                  <p className="text-muted-foreground">
                    contact@istmlikasi.ac.cd
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Heures d'ouverture</h4>
                  <p className="text-muted-foreground">
                    Lundi - Vendredi: 7h30 - 16h00<br />
                    Samedi: 8h00 - 12h00
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 h-48 bg-secondary rounded-xl flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Carte interactive</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
