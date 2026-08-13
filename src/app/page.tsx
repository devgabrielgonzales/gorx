import { LaserHero } from "@/components/laser-focus-crypto-hero-section";
import FeatureTabs from "@/components/sections/FeatureTabs";
import StackMarquee from "@/components/sections/StackMarquee";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import HowItWorks from "@/components/sections/HowItWorks";
import Skills from "@/components/sections/Skills";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <LaserHero />
      <section className="max-w-container mx-auto border-x border-t border-[#1f1f1f]">
        <FeatureTabs />
      </section>
      <StackMarquee />
      <Projects />
      <About />
      <Stats />
      <HowItWorks />
      <Skills />
      <Process />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
