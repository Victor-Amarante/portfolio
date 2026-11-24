import Reveal from "../Reveal";
import TalksGallery from "../TalksGallery";

// Photos and captions live in data/talks.ts.
export default function Speaking() {
  return (
    <section className="section" id="speaking">
      <div className="container">
        <Reveal className="section-header reveal">
          <span className="section-label">Beyond the code</span>
          <h2>
            Teaching what I build.
          </h2>
          <p>
            Lectures, workshops and hands-on labs — universities, corporate training rooms and the
            academic league I co-founded. Explaining a system is the fastest way to find out how
            well you understand it.
          </p>
        </Reveal>

        <Reveal className="talks-gallery reveal">
          <TalksGallery />
        </Reveal>
      </div>
    </section>
  );
}
