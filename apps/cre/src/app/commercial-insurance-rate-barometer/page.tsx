import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { BarometerDisclaimer } from "@/components/Disclaimers";
import { BarometerApp } from "@/components/barometer/BarometerApp";
import { SubscribeForm } from "@/components/SubscribeForm";
import { DOMAIN, BRAND_NAME } from "@/lib/site";
import { fit, nextQ, type LineKey, type BarometerData } from "@/lib/barometer";
import DATA_JSON from "@/data/rate-barometer.json";
import { HeroBackground, CALCULATOR_HERO } from "@/components/HeroBackground";

const DATA = DATA_JSON as BarometerData;

const TITLE = "Commercial Insurance Rate Barometer";
const DESCRIPTION =
  "A data-driven forecast for commercial property, general liability, and umbrella and excess renewal rate changes, built from cat bond spreads, catastrophe losses, construction costs, storm activity, E&S growth, jury verdicts, and casualty reserve development.";
const PATH = "/commercial-insurance-rate-barometer";

function quarterStartMonth(q: string): string {
  const y = q.slice(0, 4);
  const qn = Number(q.slice(5));
  return `${y}-${String((qn - 1) * 3 + 1).padStart(2, "0")}`;
}
function quarterEndMonth(q: string): string {
  const y = q.slice(0, 4);
  const qn = Number(q.slice(5));
  return `${y}-${String(qn * 3).padStart(2, "0")}`;
}

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${BRAND_NAME}` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${DOMAIN}${PATH}`,
    siteName: BRAND_NAME,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SOURCES = [
  "CIAB Commercial P&C Market Survey",
  "Artemis quarterly ILS reports",
  "Munich Re NatCatSERVICE",
  "NOAA NCEI Storm Events Database",
  "WSIA stamping office reports",
  "BLS (PPI and CPI) via FRED",
  "Marathon Strategies",
  "The Hartford and CNA SEC filings (10-Q/10-K)",
];

export default function RateBarometerPage() {
  // Server component: the fit runs once at build time, so the forecasts,
  // gauges and driver table below are static, crawlable HTML. The client
  // component only handles line selection, chart hover and the data toggle.
  const fits: Record<LineKey, ReturnType<typeof fit>> = {
    property: fit(DATA, "property"),
    gl: fit(DATA, "gl"),
    umb: fit(DATA, "umb"),
  };

  const lastQ = DATA.quarters[DATA.quarters.length - 1];
  const firstQ = DATA.quarters[0];
  const q1 = nextQ(lastQ, 1);
  const q2 = nextQ(lastQ, 2);
  const subtitle = `Data through ${lastQ}. Forecasts for ${q1} and ${q2}.`;
  const temporalCoverage = `${quarterStartMonth(firstQ)}/${quarterEndMonth(lastQ)}`;

  const dataset = {
    "@type": "Dataset",
    "@id": `${DOMAIN}${PATH}#dataset`,
    name: TITLE,
    description: DESCRIPTION,
    url: `${DOMAIN}${PATH}`,
    license: "https://www.acreinsure.com/terms",
    creator: {
      "@type": "Person",
      name: "Dan Wentz",
      url: `${DOMAIN}/about`,
    },
    temporalCoverage,
    isBasedOn: SOURCES.map((name) => ({ "@type": "CreativeWork", name })),
    variableMeasured: [
      "Commercial property renewal rate change (%)",
      "General liability renewal rate change (%)",
      "Umbrella and excess renewal rate change (%)",
      "Cat bond spread over expected loss (%)",
      "Insured catastrophe losses vs. 10-year average (%)",
      "Construction input prices, year over year (%)",
      "U.S. hail and tornado reports, year over year (%)",
      "E&S premium growth, year over year (%)",
      "Nuclear verdicts, trailing year (count)",
      "Medical care CPI, year over year (%)",
      "Casualty reserve charges, trailing year ($bn)",
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      dataset,
      {
        "@type": "BreadcrumbList",
        "@id": `${DOMAIN}${PATH}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
          { "@type": "ListItem", position: 2, name: TITLE, item: `${DOMAIN}${PATH}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden bg-midnight px-5 pt-14 pb-12 text-champagne">
          <HeroBackground src={CALCULATOR_HERO} dim="opacity-55" />
          <div className="relative mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Free tool</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Commercial Insurance Rate Barometer
            </h1>
            <p className="mt-5 max-w-2xl font-mono text-sm text-slate sm:text-base">{subtitle}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              Where commercial property, general liability, and umbrella and excess renewal rates
              are headed next quarter, forecast from the catastrophe, construction, legal, and
              claims data that move pricing.
            </p>
          </div>
        </section>

        <section className="bg-ivory px-5 py-14">
          <div className="mx-auto max-w-6xl">
            <BarometerApp data={DATA} fits={fits} defaultLine="property" />
          </div>
        </section>

        <section className="bg-white px-5 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <h2 className="font-display text-xl font-semibold tracking-tight text-obsidian">
                How this works
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate">
                <p>
                  Each driver is scored against its own history since 2019, weighted by line, and
                  combined into a pressure index. Next quarter&apos;s CIAB renewal rate change is
                  estimated from that index and the current quarter&apos;s CIAB rate; ranges are 80%
                  intervals.
                </p>
                <p>
                  Sources: CIAB Commercial P&amp;C Market Survey, Artemis, Munich Re NatCatSERVICE,
                  NOAA Storm Events, WSIA stamping offices, BLS via FRED, Marathon Strategies, and The
                  Hartford and CNA SEC filings.
                </p>
              </div>
              <BarometerDisclaimer />
            </div>
          </div>
        </section>

        <section className="bg-ivory px-5 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Stay current</p>
              <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-obsidian">
                Get the next rate read by email
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate">
                Quarterly. One email. Unsubscribe anytime.
              </p>
              <div className="mt-5">
                <SubscribeForm variant="barometer" source="rate barometer page" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
