import SiteWave from "@/components/canvas/SiteWave";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import GlobeSection from "@/components/sections/GlobeSection";
import Metrics from "@/components/sections/Metrics";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Speaking from "@/components/sections/Speaking";
import Consensus from "@/components/sections/Consensus";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* global animated dot-wave backdrop (hidden under hero & globe) */}
      <SiteWave />
      <Nav />
      <Hero />
      <Trust />
      <About />
      <Expertise />
      <GlobeSection />
      <Metrics />
      <Experience />
      <Projects />
      <Certifications />
      <Speaking />
      <Consensus />
      <Contact />
      <Footer />
    </>
  );
}
