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

  const title = `${city.name} Insurance Audit Help | Dispute a Surprise Premium Bill`;
  const description = `Hit with a surprise workers' comp or general liability audit bill in ${city.name}, ${city.region}? Get a free, confidential review. We help ${city.name}-area business owners dispute inaccurate charges and reduce what they owe.`;

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
        description: `Help for ${city.name}, ${city.county} business owners facing commercial insurance premium audits. We review, dispute, and reduce surprise workers' compensation and general liability audit bills.`,
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
              text: "Not necessarily. An audit bill is the insurer's calculation, and calculations can be wrong. If your business was misclassified, your payroll was overstated, or ineligible figures were included, those amounts can often be disputed and reduced.",
            },
          },
          {
            "@type": "Question",
            name: `Do you help businesses in ${city.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes. We work with business owners in ${city.name}, ${city.county}, and the surrounding ${city.region} on workers' compensation and general liability premium audits — reviewing, disputing, and reducing inflated bills.`,
            },
          },
          {
            "@type": "Question",
            name: "How much does your help cost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The initial review is free with no obligation. We'll look at your audit, explain what we see, and lay out your options before you commit to anything.",
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
