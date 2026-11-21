import { asset } from "@/lib/asset";

// The PDFs live in public/assets/curriculum/. Every résumé link on the site
// (both .cv-menu dropdowns and the mobile-nav pair) reads from this list.
export const RESUMES = [
  {
    code: "EN",
    language: "English",
    mobileLabel: "Résumé · EN",
    href: asset("assets/curriculum/CV_VictorAmarante_EN.pdf"),
  },
  {
    code: "PT",
    language: "Português (BR)",
    mobileLabel: "Currículo · PT",
    href: asset("assets/curriculum/CV_VictorAmarante_PTBR.pdf"),
  },
];
