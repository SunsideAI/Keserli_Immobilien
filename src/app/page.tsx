import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import BewertungSection from "@/components/sections/BewertungSection";
import FeaturedProperty from "@/components/sections/FeaturedProperty";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import KaeuferdatenbankCTA from "@/components/sections/KaeuferdatenbankCTA";
import PromiseSection from "@/components/sections/PromiseSection";
import UeberHomefinSection from "@/components/sections/UeberHomefinSection";
import RatgeberSection from "@/components/sections/RatgeberSection";
import PricingSection from "@/components/sections/PricingSection";
import MapContactSection from "@/components/sections/MapContactSection";
import FAQSection from "@/components/sections/FAQSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <BewertungSection />
      <FeaturedProperty />
      <TestimonialsSection />
      <KaeuferdatenbankCTA />
      <PromiseSection />
      <UeberHomefinSection />
      <RatgeberSection />
      <PricingSection />
      <MapContactSection />
      <FAQSection />
    </>
  );
}
