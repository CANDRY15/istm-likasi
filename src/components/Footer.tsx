import { BookOpen, GraduationCap, FileText, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Bibliothèque", href: "#bibliotheque" },
    { label: "Travaux de Fin Cycle", href: "#tfc" },
    { label: "Revue Scientifique", href: "#revue" },
    { label: "À Propos", href: "#apropos" },
  ];

  const departments = [
    "Sciences Infirmières",
    "Techniques de Laboratoire",
    "Sage-Femme",
    "Santé Publique",
    "Pharmacie",
    "Kinésithérapie",
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <span className="font-display font-bold text-xl">IS</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">ISTM Likasi</h3>
                <p className="text-sm text-primary-foreground/70">Portail Académique</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              Former les professionnels de santé de demain avec excellence et dévouement.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <BookOpen className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <GraduationCap className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Départements</h4>
            <ul className="space-y-2">
              {departments.map((dept, index) => (
                <li key={index}>
                  <span className="text-primary-foreground/70 text-sm">{dept}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary-foreground/70" />
                <span className="text-primary-foreground/70 text-sm">
                  Likasi, Haut-Katanga, RDC
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary-foreground/70" />
                <span className="text-primary-foreground/70 text-sm">
                  +243 XXX XXX XXX
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary-foreground/70" />
                <span className="text-primary-foreground/70 text-sm">
                  contact@istmlikasi.ac.cd
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© {currentYear} ISTM Likasi. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
