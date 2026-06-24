import { HeroSection } from "@/components/home/HeroSection";
import { ImageCarousel } from "@/components/home/ImageCarousel";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsSection } from "@/components/home/StatsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactForm } from "@/components/home/ContactForm";
import { SocialConnect } from "@/components/home/SocialConnect";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImageCarousel />
      <AboutSection />
      <StatsSection />
      <Testimonials />
      <ContactForm />
      <SocialConnect />
    </>
  );
}
