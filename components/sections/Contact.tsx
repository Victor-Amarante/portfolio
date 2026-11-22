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
          <span className="section-label">Let&apos;s build something intelligent</span>
          <h2 className="contact-title">
            Have a hard AI problem
            <br />
            <span className="text-gradient">worth solving?</span>
          </h2>
          <p className="contact-sub">
            I&apos;m open to senior and staff-level applied AI engineering roles and select
            collaborations. If you&apos;re building agentic systems, retrieval infrastructure, or
            anything at the frontier — let&apos;s talk.
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
