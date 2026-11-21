"use client";

import { useState, type CSSProperties } from "react";
import { Maximize2 } from "lucide-react";
import Lightbox from "./Lightbox";
import { TALK_ROWS, talkSrc } from "@/data/talks";

const ALL_TALKS = TALK_ROWS.flat();

/* Justified photo gallery: each figure carries its own --ar (the source
   aspect ratio) and flex-grows in proportion to it, so every row lands
   at a single height with zero cropping. */
export default function TalksGallery() {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const open = (i: number) => {
    setCurrent(i);
    setIsOpen(true);
  };
  const step = (delta: number) => setCurrent((c) => (c + delta + ALL_TALKS.length) % ALL_TALKS.length);
  let index = 0;

  return (
    <>
      {TALK_ROWS.map((row, r) => (
        <div key={r} className="talks-row">
          {row.map((talk) => {
            const i = index++;
            const [sm, lg] = talk.widths;
            return (
              <figure
                key={talk.slug}
                className={talk.wide ? "talk talk-wide" : "talk"}
                style={{ "--ar": talk.ar } as CSSProperties}
                tabIndex={0}
                role="button"
                aria-label={`Open photo — ${talk.title}`}
                onClick={() => open(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open(i);
                  }
                }}
              >
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${talkSrc(talk.slug, "sm", "webp")} ${sm}w, ${talkSrc(talk.slug, "lg", "webp")} ${lg}w`}
                    sizes={talk.sizes}
                  />
                  <img
                    src={talkSrc(talk.slug, "sm", "jpg")}
                    srcSet={`${talkSrc(talk.slug, "sm", "jpg")} ${sm}w, ${talkSrc(talk.slug, "lg", "jpg")} ${lg}w`}
                    sizes={talk.sizes}
                    alt={talk.alt}
                    loading="lazy"
                    width={talk.size[0]}
                    height={talk.size[1]}
                  />
                </picture>
                <figcaption className="talk-cap">
                  <span className="talk-kicker">{talk.kicker}</span>
                  <strong>{talk.title}</strong>
                  <p>{talk.desc}</p>
                </figcaption>
                <span className="talk-zoom" aria-hidden="true">
                  <Maximize2 />
                </span>
              </figure>
            );
          })}
        </div>
      ))}
      <Lightbox
        talks={ALL_TALKS}
        current={current}
        isOpen={isOpen}
        onStep={step}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
