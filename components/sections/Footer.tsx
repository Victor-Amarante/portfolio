import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../BrandIcons";
import Year from "../Year";
import { CONTACT } from "@/data/contact";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#hero" className="nav-logo">
            Victor<span>Amarante</span>
          </a>
          <p>
            Senior Applied AI Engineer — LLMs &amp; agentic systems, RAG/GraphRAG and LLMOps, from
            research to production scale.
          </p>
        </div>
        <div className="footer-right">
          <div className="footer-socials">
            <a className="fsocial" href={CONTACT.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
              <LinkedInIcon size={16} />
            </a>
            <a className="fsocial" href={CONTACT.github} target="_blank" rel="noopener" aria-label="GitHub">
              <GitHubIcon size={16} />
            </a>
            <a className="fsocial" href={`mailto:${CONTACT.email}`} aria-label="Email">
              <Mail />
            </a>
          </div>
          <span className="footer-copy">
            © <Year buildYear={new Date().getFullYear()} /> Victor Amarante
          </span>
        </div>
      </div>
    </footer>
  );
}
