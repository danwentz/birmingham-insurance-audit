import HomeClient from "./HomeClient";

const SITE_URL = "https://www.birminghaminsuranceaudit.com";
const PHONE = "+1-205-999-4884";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "InsuranceAgency"],
      "@id": `${SITE_URL}/#business`,
      name: "Birmingham Commercial Insurance Audit Solutions",
      description:
        "Help for business owners facing commercial insurance premium audits in central and north Alabama. We review, dispute, and reduce surprise workers' compensation and general liability audit bills.",
      url: SITE_URL,
      telephone: PHONE,
      areaServed: [
        "Birmingham, AL",
        "Hoover, AL",
        "Huntsville, AL",
        "Tuscaloosa, AL",
        "Decatur, AL",
        "Gadsden, AL",
        "Cullman, AL",
        "Anniston, AL",
        "Central Alabama",
        "North Alabama",
      ],
      address: {
        "@type": "PostalAddress",
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
            text: "Not necessarily. An audit bill is the insurer's calculation, and calculations can be wrong. If your business was misclassified, your payroll was overstated, or ineligible figures were included, those amounts can often be disputed and reduced. Before you pay a lump sum, have someone review exactly how the number was reached.",
          },
        },
        {
          "@type": "Question",
          name: "What is a commercial insurance audit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It's a review by your insurer to verify the information used to set your premium — payroll, sales, job classifications, or square footage. If your actual figures came in higher than estimated, they bill you the difference. If lower, you may be owed a refund.",
          },
        },
        {
          "@type": "Question",
          name: "Why didn't my agent warn me this was coming?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most commercial policies include an annual audit in the contract, but it's often glossed over at sale, which is why so many owners feel blindsided. It doesn't mean you did anything wrong — it means you need someone in your corner now.",
          },
        },
        {
          "@type": "Question",
          name: "Can an audit result actually be disputed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. If errors are found in how your insurer classified your business, calculated your payroll, or included ineligible figures, you can dispute or appeal the results. We help you review the auditor's findings and present corrections and supporting documentation.",
          },
        },
        {
          "@type": "Question",
          name: "How much does your help cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The initial review is free with no obligation. We'll look at your audit, explain what we see, and lay out your options. If we can help further, we'll be upfront about that before you commit to anything.",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
