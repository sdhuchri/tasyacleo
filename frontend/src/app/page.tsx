import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import OurStory from "@/components/OurStory";
import GalleryPreview from "@/components/GalleryPreview";
import AIFeaturesSection from "@/components/AIFeaturesSection";
import CountdownSection from "@/components/CountdownSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <OurStory />
      <GalleryPreview />
      <AIFeaturesSection />
      <CountdownSection />
    </>
  );
}
