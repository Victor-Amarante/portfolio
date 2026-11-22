import { Mail, Phone } from "lucide-react";
import Reveal from "../Reveal";
import CvMenu from "../CvMenu";
import SiteWave from "../canvas/SiteWave";
import { GitHubIcon, LinkedInIcon } from "../BrandIcons";
import { CONTACT } from "@/data/contact";

export default function Contact() {
  return (
    <section id="contact">
      <SiteWave />
      <div className="container contact-inner">
        <Reveal className="reveal">
          <span className="section-label">Get in touch</span>
          <h2 className="contact-title">
            Let&apos;s build reliable
            <br />
            <span className="text-gradient">AI-powered software.</span>
          </h2>
          <p className="contact-sub">
            I&apos;m always open to conversations about software architecture, backend engineering,
            distributed systems and applied AI — particularly projects that connect technical depth
            with real product impact.
          </p>
          <div className="contact-actions">
            <a href={`mailto:${CONTACT.email}`} className="btn btn-primary">
              <Mail />
              {CONTACT.email}
            </a>
            <CvMenu label="Download résumé" large buttonClass="btn btn-secondary" />
          </div>
          <div className="contact-socials">
            <a href={CONTACT.linkedin} target="_blank" rel="noopener" className="social-link">
              <LinkedInIcon size={17} />
              LinkedIn
            </a>
            <a href={CONTACT.github} target="_blank" rel="noopener" className="social-link">
              <GitHubIcon size={17} />
              GitHub
            </a>
            <a href={`tel:${CONTACT.phone}`} className="social-link">
              <Phone />
              {CONTACT.phoneLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
