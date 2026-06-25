export type Faq = { q: string; a: string };

export type Program = {
  slug: string;
  shortName: string; // for nav/cards
  name: string; // H1
  metaTitle: string;
  metaDescription: string;
  hook: string; // hero subhead
  intro: string; // problem/context paragraph
  idealFor: string[]; // qualifier bullets
  coverages: { title: string; body: string }[];
  faqs: Faq[];
  searchTerms: string[]; // the high-intent terms this page targets
};

export const PROGRAMS: Program[] = [
  {
    slug: "multifamily-apartment-insurance",
    shortName: "Multifamily & Apartment",
    name: "Multifamily & Apartment (Habitational) Insurance",
    metaTitle:
      "Multifamily & Apartment Insurance Broker | Habitational Property & Liability",
    metaDescription:
      "Specialist broker for multifamily and apartment portfolios. Habitational property, general liability, and umbrella for owners and operators facing carrier non-renewals and steep premium hikes. $50k+ premiums.",
    hook: "Habitational property, liability, and umbrella for owners and operators of 50 to 10,000+ units.",
    intro:
      "Multifamily has been the hardest-hit class in property insurance — premiums climbed more than 75% from 2019 to 2024, carriers pulled capacity, and renewals arrived with surprise deductibles and exclusions. If your habitational program is being non-renewed, re-rated, or simply isn't being marketed aggressively, you are likely overpaying. We rebuild the program from the ground up and take it to the markets that still want quality habitational risk.",
    idealFor: [
      "Apartment communities and garden/mid-rise portfolios (50+ units)",
      "Owner-operators, syndicators, and multifamily funds",
      "Student housing, senior living, and affordable/LIHTC portfolios",
      "Accounts facing non-renewal, large rate increases, or wind/hail deductible shock",
    ],
    coverages: [
      { title: "Habitational property", body: "Building, BPP, and loss of rents with realistic insurance-to-value and deductible structuring." },
      { title: "General liability", body: "Premises liability built for habitational exposures — assault & battery, animal, and habitability." },
      { title: "Real estate umbrella / excess", body: "Layered excess towers up to $100M+ for portfolios and lender requirements." },
      { title: "Catastrophe & deductible solutions", body: "Wind/hail, named storm, and parametric or captive options where the standard market is distressed." },
    ],
    faqs: [
      {
        q: "Why did my apartment insurance premium jump so much?",
        a: "Habitational property was repriced hard between 2019 and 2024 as carriers absorbed catastrophe losses and pulled capacity. Even clean accounts saw large increases, higher wind/hail deductibles, and new exclusions. The fix is a fully remarketed program — many owners are paying yesterday's hard-market rate when better terms now exist.",
      },
      {
        q: "Can you help if my carrier non-renewed me?",
        a: "Yes. Non-renewals are common in this class and rarely mean the risk is uninsurable — it usually means the program needs to go to specialist habitational and surplus-lines markets. We market the account broadly and structure it to be insurable on better terms.",
      },
      {
        q: "How large of a portfolio do you handle?",
        a: "We focus on accounts with roughly $50,000+ in annual premium — from a single large community to portfolios of 10,000+ units across multiple states.",
      },
    ],
    searchTerms: [
      "multifamily insurance broker",
      "apartment building insurance",
      "habitational insurance program",
      "apartment complex insurance non-renewal",
    ],
  },
  {
    slug: "real-estate-portfolio-insurance",
    shortName: "Portfolio & High-TIV",
    name: "Real Estate Portfolio & High-TIV Master Programs",
    metaTitle:
      "Real Estate Portfolio Insurance | High-TIV Master Property Programs Broker",
    metaDescription:
      "Master property and schedule programs for real estate portfolios with $100M–$2B+ in total insured value (TIV). Layered and shared placements, lender compliance, and total-cost-of-risk strategy.",
    hook: "Master property and schedule programs for portfolios with $100M to $2B+ in total insured value.",
    intro:
      "Once a real estate portfolio crosses into nine figures of TIV, single-carrier policies stop making sense. The right structure is a master or schedule program — layered and shared across carriers, with blanket limits, agreed valuation, and clean lender compliance. We design and broker these placements, market them to domestic and London capacity, and manage the renewal as a strategic event rather than a fire drill.",
    idealFor: [
      "Owners and funds with multi-property, multi-state schedules",
      "Portfolios with $100M+ total insured value",
      "Accounts needing blanket limits, agreed value, and shared/layered structures",
      "Sponsors with lender insurance requirements and complex SOV management",
    ],
    coverages: [
      { title: "Master / schedule property", body: "Blanket building and rents limits across the SOV with agreed valuation and modeled CAT." },
      { title: "Layered & shared placements", body: "Quota-share and excess towers across domestic, E&S, and London markets for capacity." },
      { title: "Insurance-to-value strategy", body: "Defensible valuations to avoid coinsurance and margin-clause penalties at claim time." },
      { title: "Lender & loan compliance", body: "Evidence of insurance, waiver/endorsement management, and SOV reconciliation for lenders." },
    ],
    faqs: [
      {
        q: "What is a master or schedule insurance program?",
        a: "It's a single property program that covers every asset on your schedule of values (SOV) under blanket limits, instead of a separate policy per building. For portfolios it lowers total cost of risk, simplifies lender compliance, and gives you leverage with carriers at renewal.",
      },
      {
        q: "What TIV do you work with?",
        a: "We structure programs across the middle market and up — roughly $100M to $2B+ in total insured value — using layered and shared placements when a single carrier won't or shouldn't hold the whole limit.",
      },
      {
        q: "Can you handle multi-state and CAT-exposed schedules?",
        a: "Yes. We model the catastrophe exposure on your SOV and place the program with the right mix of carriers and capacity, including coastal, wind/hail, and quake-exposed locations.",
      },
    ],
    searchTerms: [
      "real estate portfolio insurance",
      "master property insurance program",
      "high TIV property insurance broker",
      "schedule of values property program",
    ],
  },
  {
    slug: "catastrophe-coastal-property-insurance",
    shortName: "CAT / Coastal Property",
    name: "Catastrophe, Coastal & Wind/Hail Property Insurance",
    metaTitle:
      "Catastrophe & Coastal Property Insurance Broker | Wind, Hail & Named Storm",
    metaDescription:
      "Capacity for hard-to-place CAT property: coastal wind, named storm, hail-belt, flood, and quake. Layered programs, E&S and London markets, parametric and captive options for distressed accounts.",
    hook: "Capacity for the hard-to-place risk — coastal wind, named storm, hail belt, flood, and quake.",
    intro:
      "Catastrophe-exposed property is where the standard market still says no. Gulf Coast wind, Florida named-storm, hail-belt, wildfire, and quake accounts face capacity shortfalls, big deductibles, and sublimits. Placing these takes access to surplus-lines and London capacity and a willingness to build the program in layers. That's the work we do — finding the capacity, structuring the deductibles, and keeping the limit adequate and lender-compliant.",
    idealFor: [
      "Coastal and Gulf Coast property (wind / named storm exposed)",
      "Hail-belt, wildfire, and earthquake-exposed assets",
      "Accounts hit with capacity shortfalls, sublimits, or huge CAT deductibles",
      "Portfolios needing layered or excess CAT limits",
    ],
    coverages: [
      { title: "Wind & named storm", body: "Primary and excess wind, including named-storm placements via E&S and Lloyd's syndicates." },
      { title: "Hail, wildfire & quake", body: "Specialty capacity for hail-belt, wildfire, and earthquake-exposed locations." },
      { title: "Deductible engineering", body: "Percentage-deductible buy-downs and structures that protect cash flow after a loss." },
      { title: "Parametric & captive options", body: "Alternative risk transfer where traditional capacity is scarce or uneconomic." },
    ],
    faqs: [
      {
        q: "My coastal property is hard to insure — can you place it?",
        a: "Usually, yes. CAT-exposed property typically isn't uninsurable; it just has to go to surplus-lines and London markets and often be built in layers. We assemble the capacity and engineer the deductibles so the limit is adequate and the cost is manageable.",
      },
      {
        q: "Can you reduce my wind/hail deductible?",
        a: "Often we can improve it through deductible buy-downs or by restructuring the program. We'll model the trade-off between premium and retained risk so the structure fits your balance sheet.",
      },
      {
        q: "Do you use parametric or captive solutions?",
        a: "When the traditional market is distressed, parametric covers and captive structures can be the most economical way to finance catastrophe risk. We'll tell you when they make sense and when they don't.",
      },
    ],
    searchTerms: [
      "catastrophe property insurance broker",
      "coastal commercial property insurance",
      "wind and hail insurance commercial",
      "named storm property coverage",
    ],
  },
  {
    slug: "builders-risk-ocip",
    shortName: "Builders Risk / OCIP",
    name: "Builders Risk & Owner-Controlled Insurance Programs (OCIP)",
    metaTitle:
      "Builders Risk & OCIP Insurance Broker | Wrap-Up Programs for Large Projects",
    metaDescription:
      "Builders risk and owner-controlled insurance programs (OCIP / wrap-ups) for large commercial developments. Project values from $25M to $100M+. Coordinated property, GL, excess, and workers' comp.",
    hook: "Builders risk and wrap-up (OCIP) programs for ground-up and value-add projects from $25M to $100M+.",
    intro:
      "On a large development, the way you structure insurance materially changes the budget. A coordinated builders risk policy — and on larger jobs an owner-controlled insurance program (OCIP / wrap-up) that pulls GL, excess, and workers' comp under one owner-controlled master — reduces duplicated markup, closes coverage gaps between trades, and gives the owner control of claims and limits. We design the program, market it, and administer it through completion.",
    idealFor: [
      "Ground-up and major value-add developments",
      "Projects with $25M+ hard construction cost (OCIP territory)",
      "Owners and developers wanting control of limits, claims, and safety",
      "Deals with lender and equity insurance requirements",
    ],
    coverages: [
      { title: "Builders risk", body: "Course-of-construction property including soft costs, delay in completion, and CAT perils." },
      { title: "Owner-controlled program (OCIP)", body: "Owner-controlled GL, excess, and workers' comp across all enrolled trades on the project." },
      { title: "Excess / umbrella towers", body: "Project-specific excess limits structured to lender and contract requirements." },
      { title: "Program administration", body: "Enrollment, payroll audit, and closeout managed through substantial completion." },
    ],
    faqs: [
      {
        q: "OCIP or builders risk — which do I need?",
        a: "Builders risk covers the course-of-construction property on virtually every project. An OCIP (wrap-up) makes sense on larger jobs — generally $25M+ hard cost — where consolidating GL, excess, and workers' comp under the owner reduces markup and gives you control of claims and safety. We model both and recommend the right fit.",
      },
      {
        q: "How big does a project need to be for a wrap-up?",
        a: "As a rule of thumb, GL-only wrap-ups start to pay off around $25M of hard construction cost, and full OCIPs are common on $50M–$100M+ projects. Below that, a well-structured builders risk plus contractor-placed coverage is usually more efficient.",
      },
      {
        q: "Can you coordinate with our lender and equity requirements?",
        a: "Yes. We build the program to satisfy loan and joint-venture insurance requirements — limits, additional insureds, waivers, and evidence of coverage — and keep it compliant through completion.",
      },
    ],
    searchTerms: [
      "builders risk insurance broker",
      "owner controlled insurance program OCIP",
      "wrap up insurance construction",
      "large construction project insurance",
    ],
  },
];

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}
