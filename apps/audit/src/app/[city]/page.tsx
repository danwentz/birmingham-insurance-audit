import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCity } from "@/lib/cities";
import { DOMAIN, PHONE_E164, BUSINESS_NAME } from "@/lib/site";
import CityClient from "./CityClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  const title = `${city.name} Insurance Audit Help | Dispute a Workers' Comp Audit Bill`;
  const description = `Surprise workers' comp or GL audit bill in ${city.name}? Get a free review before you pay it. We help ${city.county} owners dispute wrong class codes and inflated payroll.`;

  return {
    title,
    description,
    alternates: { canonical: `/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `${DOMAIN}/${city.slug}`,
      siteName: BUSINESS_NAME,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "InsuranceAgency"],
        "@id": `${DOMAIN}/${city.slug}#business`,
        name: BUSINESS_NAME,
        description: `Help for ${city.name}, ${city.county} business owners facing commercial insurance premium audits. We review surprise workers' compensation and general liability audit bills and help dispute the ones built on wrong class codes or inflated payroll.`,
        url: `${DOMAIN}/${city.slug}`,
        telephone: PHONE_E164,
        areaServed: [`${city.name}, AL`, ...city.nearby.map((n) => `${n}, AL`), city.region],
        address: {
          "@type": "PostalAddress",
          addressLocality: city.name,
          addressRegion: "AL",
          addressCountry: "US",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "I just got a huge audit bill. Do I really have to pay all of it?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Not necessarily. An audit bill is the carrier's calculation, and the inputs are wrong more often than you'd think. Wrong class codes, overstated payroll, and sub costs picked up as wages can all be disputed with the right records.",
            },
          },
          {
            "@type": "Question",
            name: `Do you help businesses in ${city.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes. We work with owners in ${city.name}, ${city.county}, and across ${city.region} on workers' compensation and general liability premium audits. Send the letter and we'll tell you whether the number holds up.`,
            },
          },
          {
            "@type": "Question",
            name: "How much does your help cost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The first review costs nothing and commits you to nothing. We read the audit, tell you what we see, and lay out the options before you decide anything.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityClient city={city} />
    </>
  );
}
