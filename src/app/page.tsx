import type { Metadata } from "next";
import { Contact } from "@/components/home/Contact";
import { Education } from "@/components/home/Education";
import { ExperienceList } from "@/components/home/ExperienceList";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { ImpactStrip } from "@/components/home/ImpactStrip";
import { Skills } from "@/components/home/Skills";
import { jsonLd, personJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd) }}
      />
      <Hero />
      <ImpactStrip />
      <FeaturedProjects />
      <Skills />
      <ExperienceList />
      <Education />
      <Contact />
    </>
  );
}
