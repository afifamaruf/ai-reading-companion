import type { Metadata } from "next";
import {
  HeroSection,
  Navbar,
  FeaturesSection,
  ArchitectureSection,
  DemoSection,
  CTASection,
  Footer,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "arc.reader - AI Reading Companion",
  description:
    "Upload any EPUB. Highlight any word. Get context-aware AI explanations.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f text-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ArchitectureSection />
        <DemoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
