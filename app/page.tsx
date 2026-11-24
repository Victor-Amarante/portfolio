import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Now from "@/components/sections/Now";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import Philosophy from "@/components/sections/Philosophy";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
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
        <Now />
        <About />
        <Expertise />
        <Philosophy />
        <Experience />
        <Projects />
        <Speaking />
        <Consensus />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
