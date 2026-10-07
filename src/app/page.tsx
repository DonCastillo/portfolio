import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { Education } from "@/components/home/Education";
import { ExperienceList } from "@/components/home/ExperienceList";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { ImpactStrip } from "@/components/home/ImpactStrip";
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
      <ExperienceList />
      <Education />
      <ClosingCta />
    </>
  );
}
