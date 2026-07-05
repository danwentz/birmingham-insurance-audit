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
        "Help for Alabama business owners facing commercial insurance premium audits. We review surprise workers' compensation and general liability audit bills and help dispute the ones built on wrong class codes or inflated payroll.",
      url: SITE_URL,
      telephone: PHONE,
      areaServed: [
        "Birmingham, AL",
        "Hoover, AL",
        "Huntsville, AL",
        "Tuscaloosa, AL",
        "Montgomery, AL",
        "Mobile, AL",
        "Decatur, AL",
        "Florence, AL",
        "Auburn, AL",
        "Opelika, AL",
        "Dothan, AL",
        "Gadsden, AL",
        "Cullman, AL",
        "Anniston, AL",
        "Alabama",
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
            text: "Not necessarily. An audit bill is the carrier's calculation, and the inputs are wrong more often than you'd think. Wrong class codes, overstated payroll, and sub costs picked up as wages can all be disputed with the right records. Find out how they got the number before you pay it.",
          },
        },
        {
          "@type": "Question",
          name: "What is a commercial insurance audit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "At the end of your policy term, the carrier checks the real numbers behind your premium: payroll, sales, class codes, sometimes square footage. If the actuals came in higher than the estimate, you owe the difference. Lower, and they owe you. The catch is that the checking is done by a person on a deadline, and people on deadlines make mistakes.",
          },
        },
        {
          "@type": "Question",
          name: "Why didn't my agent warn me this was coming?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The audit clause sits in nearly every workers' comp and general liability policy, but plenty of agents never walk their clients through it at sale. So the first time most owners hear the word 'audit' is when the bill lands. That's not on you. It does mean you want someone reading the fine print now.",
          },
        },
        {
          "@type": "Question",
          name: "Can an audit result actually be disputed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Carriers have dispute processes for exactly this. If the auditor used the wrong classification, counted payroll that shouldn't be there, or estimated your numbers instead of using real ones, you can challenge the result with corrected records. We help you figure out what to send and how to present it.",
          },
        },
        {
          "@type": "Question",
          name: "How much does your help cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The first review costs nothing and commits you to nothing. We read the audit, tell you what we see, and lay out the options. If there's more we can do from there, we'll price it plainly before you decide anything.",
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
