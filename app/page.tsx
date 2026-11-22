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
import { CONTACT } from "@/data/contact";

// structured Person data: public title and verified links only
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Victor Amarante",
  jobTitle: "Senior Software Engineer, AI",
  url: CONTACT.site,
  sameAs: [CONTACT.linkedin, CONTACT.github],
  address: { "@type": "PostalAddress", addressLocality: "Recife", addressCountry: "BR" },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Software Architecture",
    "Backend Engineering",
    "Distributed Systems",
    "Agentic AI",
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
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
      </main>
      <Footer />
    </>
  );
}
