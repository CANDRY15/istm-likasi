import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import LibrarySection from "@/components/LibrarySection";
import TFCSection from "@/components/TFCSection";
import RevueSection from "@/components/RevueSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LibrarySection />
        <TFCSection />
        <RevueSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
