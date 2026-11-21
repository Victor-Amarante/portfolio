/* ─────────────────────────────────────────────────────────
   CONSENSUS — testimonials
   ══ EDIT HERE: paste each recommendation as an object.
      name       → who wrote it
      relation   → how you worked together (role · company)
      text       → what they wrote about you
      translated → true adds the "Translated from Portuguese" chip
   ───────────────────────────────────────────────────────── */
export type Testimonial = {
  name: string;
  relation: string;
  text: string;
  translated?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Eric Barreto",
    relation: "Colleague · Amigo Tech",
    text: `“I had the pleasure of working with Victor Amarante at Amigo Tech, and I can confidently say he is an outstanding professional with a rare combination of technical depth, strategic thinking, and strong leadership skills. Victor has a deep knowledge of AI and understands very well how to apply it to real business problems, turning complex ideas into practical and impactful solutions. Beyond his technical expertise, he also stands out for his excellent ability to manage people, priorities, and activities with clarity and organization. He is the kind of professional who brings direction to the team, supports people around him, and ensures that projects move forward with quality and purpose. His communication, ownership, and ability to connect technical decisions with business impact make him a valuable asset to any company. I truly enjoyed working with Victor and would be happy to work with him again. Any team would be fortunate to have him.”`,
  },
  {
    name: "Robério Filho",
    relation: "Studied together · RAG project",
    text: `“I studied alongside Victor and worked with him on several university projects, and he's one of the people I learn the most from. He's my go-to whenever I have a question about AI — he has a deep, genuinely current understanding of the field and an unusual talent for explaining complex concepts simply. We built a RAG project together for one of our courses, and his grasp of how to design and reason about AI systems stood out the whole way through. Beyond the technical side, he's a reliable, thoughtful collaborator who raises the quality of any project he joins. Any team working with AI would be lucky to have him.”`,
  },
  {
    name: "Mateus Ataide",
    relation: "University & Amigo Tech",
    text: `“I had the pleasure of working with Victor, both at the university and at Amigo Tech, and he is an exceptional professional, extremely methodical and always well-prepared in every situation. He has a deep understanding of LLMs, always teaching me a great deal about the subject and demonstrating his talent for mentoring those around him. I would love to work with him again in the future, he's a wonderful person to work with.”`,
  },
  {
    name: "Marina Lima de Oliveira",
    relation: "Colleague · Analytics",
    translated: true,
    text: `“Victor is a brilliant and highly intelligent professional. His mind is geared toward processes and automation, always improving how everyone performs their work. As a person, Victor is incredible — always willing to help, to teach and to learn new things. It was a pleasure working with him 💖”`,
  },
  {
    name: "Danielle Rodrigues",
    relation: "Victor's direct manager",
    translated: true,
    text: `“Victor is always very studious, shares his opinion, and looks to help everyone on the team. He always tries to understand the workflow in order to suggest improvements that boost productivity.”`,
  },
  {
    name: "Lays Giselle",
    relation: "Colleague · Automation & Data",
    translated: true,
    text: `“Victor is deeply engaged, and his energy when talking about automation is contagious to everyone who hears him. Nothing is impossible for him. Super proactive and full of great ideas. Keep it up! 🚀”`,
  },
];
