export type Faq = { q: string; a: string };

export type ProgramCategory = "program" | "asset" | "advisory";

export type Program = {
  slug: string;
  category: ProgramCategory;
  shortName: string; // for nav/cards
  name: string; // H1
  metaTitle: string;
  metaDescription: string;
  hook: string; // hero subhead
  intro: string; // problem/context paragraph
  idealFor: string[]; // qualifier bullets
  coveragesTitle?: string; // section heading override (default "What we structure")
  coverages: { title: string; body: string }[];
  faqs: Faq[];
  searchTerms: string[]; // the high-intent terms this page targets
};

export const PROGRAMS: Program[] = [
  {
    slug: "multifamily-apartment-insurance",
    category: "program",
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
    category: "program",
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
    category: "program",
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
    category: "program",
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

  /* ─── Asset classes ─── */
  {
    slug: "office-building-insurance",
    category: "asset",
    shortName: "Office",
    name: "Office Building Insurance",
    metaTitle: "Office Building Insurance Broker | Property, Liability & Portfolio Programs",
    metaDescription:
      "Insurance for office buildings and portfolios — property, general liability, and umbrella for owners, REITs, and funds. Vacancy, tenant build-out, and lender compliance handled. $50k+ premiums.",
    hook: "Property, liability, and umbrella for office towers, suburban buildings, and portfolios.",
    intro:
      "Office has its own underwriting story right now — rising vacancy, tenant-improvement exposure, and carriers reading the same headlines you do. Quality assets get penalized for the sector's reputation unless the risk is presented well. We position the account — occupancy, life-safety, capital improvements, and tenancy — and market it so a well-run office building isn't priced like a distressed one.",
    idealFor: [
      "Single-asset towers and suburban office portfolios",
      "Owners, REITs, and funds",
      "Partially vacant or repositioning assets",
      "Deals with lender and joint-venture insurance requirements",
    ],
    coverages: [
      { title: "Property", body: "Building, rents, and tenant-improvement exposure with defensible insurance-to-value." },
      { title: "General liability", body: "Premises liability for common areas, garages, and visitor exposure." },
      { title: "Umbrella / excess", body: "Excess towers sized to lender and contractual requirements." },
      { title: "Vacancy & repositioning", body: "Vacant-building and builders risk solutions for assets under renovation or lease-up." },
    ],
    faqs: [
      { q: "Does vacancy raise my office premium?", a: "It can — vacant or partially vacant space changes the property and liability picture and can trigger vacancy provisions. We present occupancy and security accurately and place the risk with markets that underwrite repositioning office, rather than declining it outright." },
      { q: "Can you cover a building under renovation?", a: "Yes. Major tenant build-outs or repositioning are typically handled with a builders risk or course-of-construction layer alongside the property program, structured so there's no gap between owner and contractor coverage." },
      { q: "How large of an office portfolio do you handle?", a: "We focus on accounts with roughly $50,000+ in annual premium, from a single tower to multi-state office portfolios." },
    ],
    searchTerms: ["office building insurance broker", "office property insurance", "commercial office insurance portfolio"],
  },
  {
    slug: "retail-shopping-center-insurance",
    category: "asset",
    shortName: "Retail & Shopping Centers",
    name: "Retail & Shopping Center Insurance",
    metaTitle: "Shopping Center & Retail Property Insurance Broker | Strip & Power Centers",
    metaDescription:
      "Insurance for shopping centers, strip malls, and retail portfolios — property, general liability with broad tenant exposure, and umbrella. CAM/COI tracking and lender compliance. $50k+ premiums.",
    hook: "Property and liability for strip centers, power centers, and multi-tenant retail portfolios.",
    intro:
      "Multi-tenant retail concentrates liability — common areas, parking lots, and a constantly changing tenant mix — on top of property and catastrophe exposure. The program has to handle premises liability, certificate-of-insurance tracking on tenants, and lender requirements without leaving the owner exposed in the gaps. That's the program we build and market.",
    idealFor: [
      "Strip, neighborhood, and power centers",
      "Multi-tenant and mixed retail portfolios",
      "Owners managing tenant COI and CAM insurance compliance",
      "CAT-exposed retail (wind/hail/coastal)",
    ],
    coverages: [
      { title: "Property", body: "Building and rents with CAT structuring for wind, hail, and coastal exposure." },
      { title: "Premises liability", body: "Slip-and-fall, parking-lot, and common-area exposure built for multi-tenant retail." },
      { title: "Umbrella / excess", body: "Excess limits for high-traffic centers and lender requirements." },
      { title: "Tenant insurance tracking", body: "COI/CAM compliance so tenant coverage gaps don't fall back on the owner." },
    ],
    faqs: [
      { q: "Who's liable for parking-lot injuries at my center?", a: "As the owner you carry premises liability for common areas including parking lots, even where tenants operate. We structure the GL and umbrella for that exposure and help enforce tenant insurance requirements so risk is shared correctly." },
      { q: "Do you track tenant certificates of insurance?", a: "Yes. We help set the tenant insurance requirements in your leases and track certificates so an uninsured tenant loss doesn't become your loss." },
      { q: "How large of a retail portfolio do you handle?", a: "Accounts with roughly $50,000+ in annual premium, from a single center to multi-state retail portfolios." },
    ],
    searchTerms: ["shopping center insurance", "retail property insurance broker", "strip mall insurance"],
  },
  {
    slug: "industrial-warehouse-insurance",
    category: "asset",
    shortName: "Industrial & Warehouse",
    name: "Industrial & Warehouse Insurance",
    metaTitle: "Industrial & Warehouse Insurance Broker | Logistics, Distribution & Flex",
    metaDescription:
      "Property and liability for warehouses, distribution centers, and industrial/flex portfolios. High-TIV buildings, sprinkler/protection scrutiny, NNN lessor's risk, and CAT capacity. $50k+ premiums.",
    hook: "Property and liability for distribution centers, logistics, flex, and industrial portfolios.",
    intro:
      "Industrial is the asset class everyone wants — but big-box distribution puts a lot of insured value under one roof, with sprinkler and protection scrutiny and tenant-operation liability to match. Placing high-TIV industrial well means getting the property capacity, the protection story, and the lease structure right. We do, and we market it accordingly.",
    idealFor: [
      "Distribution, fulfillment, and logistics centers",
      "Flex and light-industrial portfolios",
      "Single-tenant NNN industrial (lessor's risk)",
      "High-TIV single buildings",
    ],
    coverages: [
      { title: "Property (high TIV)", body: "Large sprinklered buildings with protection-class and valuation done right to hold capacity." },
      { title: "General liability", body: "Premises and tenant-operations liability for logistics and industrial use." },
      { title: "Lessor's risk / NNN", body: "Owner programs for single-tenant net-leased industrial." },
      { title: "Umbrella / excess", body: "Excess towers for fleet, tenant, and contractual exposure." },
    ],
    faqs: [
      { q: "Can you place a high-TIV single distribution building?", a: "Yes. A single big-box can carry $100M+ of insured value; we assemble the property capacity — single carrier or layered — with the sprinkler and protection details that let underwriters say yes." },
      { q: "Do you write lessor's risk only (NNN) industrial?", a: "We do. For single-tenant net-leased industrial we structure an owner program that coordinates with the tenant's coverage and your lender's requirements." },
      { q: "What size accounts do you take?", a: "Roughly $50,000+ in annual premium, from one building to a multi-state industrial portfolio." },
    ],
    searchTerms: ["warehouse insurance broker", "industrial property insurance", "distribution center insurance", "lessors risk NNN insurance"],
  },
  {
    slug: "hospitality-hotel-insurance",
    category: "asset",
    shortName: "Hospitality & Hotels",
    name: "Hospitality & Hotel Insurance",
    metaTitle: "Hotel & Hospitality Insurance Broker | Property, Liquor & Guest Liability",
    metaDescription:
      "Insurance for hotels, resorts, and hospitality portfolios — property (incl. coastal/CAT), guest and premises liability, liquor liability, and umbrella. Flagged and independent. $50k+ premiums.",
    hook: "Property, guest liability, liquor, and umbrella for hotels, resorts, and hospitality portfolios.",
    intro:
      "Hotels combine high-value property with heavy foot traffic, food and beverage, pools, and — frequently — coastal catastrophe exposure, all under brand or flag standards that dictate coverage. The program has to satisfy the franchise agreement and place the CAT property at the same time. We build hospitality programs that do both.",
    idealFor: [
      "Flagged and independent hotels",
      "Resorts and coastal properties",
      "Portfolios and hotel management companies",
      "Assets with food & beverage and liquor exposure",
    ],
    coverages: [
      { title: "Property (incl. wind/named storm)", body: "High-value property with coastal and CAT capacity where the standard market pulls back." },
      { title: "Guest & premises liability", body: "Liability for guests, pools, amenities, and common areas." },
      { title: "Liquor liability", body: "Coverage for on-site bars, restaurants, and events." },
      { title: "Umbrella & brand-required limits", body: "Excess towers sized to franchise and lender requirements." },
    ],
    faqs: [
      { q: "Can you meet my franchise / brand insurance requirements?", a: "Yes. Flags specify limits, additional insureds, and coverage terms; we build the program to satisfy the brand standard and provide compliant evidence of insurance, while still marketing for competitive pricing." },
      { q: "My resort is coastal — can you place the property?", a: "Usually. Coastal and named-storm hospitality goes to surplus-lines and London capacity, often in layers. We assemble the capacity and engineer the wind deductible so the limit stays adequate." },
      { q: "Do you handle liquor liability for hotel F&B?", a: "Yes — on-site bars, restaurants, banquets, and events are covered through liquor liability coordinated with the GL and umbrella." },
    ],
    searchTerms: ["hotel insurance broker", "hospitality insurance", "resort property insurance", "hotel liquor liability"],
  },
  {
    slug: "student-senior-housing-insurance",
    category: "asset",
    shortName: "Student & Senior Housing",
    name: "Student & Senior Housing Insurance",
    metaTitle: "Student Housing & Senior Living Insurance Broker | Habitational Specialty",
    metaDescription:
      "Specialty habitational insurance for student housing and senior living / assisted living — property, general liability, professional liability, abuse & molestation, and umbrella. $50k+ premiums.",
    hook: "Specialty habitational property and liability for student housing and senior living portfolios.",
    intro:
      "Student and senior housing are habitational sub-classes with liability profiles all their own — turnover, life-safety, and seasonal vacancy in student housing; resident care, professional, and abuse & molestation exposure in senior living. These accounts belong with specialty markets that understand the care and occupancy model, not a generic apartment carrier.",
    idealFor: [
      "Purpose-built and off-campus student housing",
      "Assisted living, memory care, and senior living",
      "Operators, developers, and funds",
      "Accounts needing professional and abuse & molestation coverage",
    ],
    coverages: [
      { title: "Habitational property", body: "Building and rents with realistic valuation and CAT structuring." },
      { title: "General liability", body: "Premises liability tuned to student or senior occupancy." },
      { title: "Professional & resident care", body: "Professional liability for senior living and care operations." },
      { title: "Abuse & molestation + umbrella", body: "A&M coverage and excess towers for these higher-sensitivity classes." },
    ],
    faqs: [
      { q: "Do you cover senior living professional liability?", a: "Yes. Senior and assisted living carries resident-care (professional) exposure beyond ordinary premises liability; we place professional liability coordinated with the GL, A&M, and umbrella through specialty senior-care markets." },
      { q: "Is abuse & molestation coverage included?", a: "It's essential in these classes and we place it explicitly — often with its own limit — rather than leaving it to a buried sublimit or exclusion." },
      { q: "How is student housing summer vacancy handled?", a: "We present the seasonal occupancy pattern accurately so the property program is priced for the real risk and doesn't trip vacancy provisions during breaks." },
    ],
    searchTerms: ["student housing insurance", "senior living insurance broker", "assisted living insurance", "habitational specialty insurance"],
  },

  /* ─── Advisory ─── */
  {
    slug: "real-estate-risk-management",
    category: "advisory",
    shortName: "Risk Management",
    name: "Real Estate Risk Management & Total Cost of Risk",
    metaTitle: "Real Estate Risk Management | Total Cost of Risk Advisory for Owners & CFOs",
    metaDescription:
      "Beyond placement — total cost of risk (TCOR) strategy for real estate owners, funds, and CFOs. Valuation, deductibles, retentions, captives, claims advocacy, and renewal strategy. $50k+ programs.",
    hook: "Total cost of risk strategy for owners, funds, and CFOs — not just a policy.",
    coveragesTitle: "What we bring to the table",
    intro:
      "For a real estate portfolio, premium is only part of the cost of risk. Deductibles, retained losses, valuation accuracy, claims handling, and the capital tied up in risk all move the real number. We work as your outsourced risk function — modeling total cost of risk, advising on retentions and captives, and advocating on claims — so insurance becomes a managed line item instead of an annual surprise.",
    idealFor: [
      "CFOs and risk managers at owner/operator platforms",
      "Funds and multi-entity ownership structures",
      "Portfolios weighing higher retentions or a captive",
      "Accounts that want real claims advocacy",
    ],
    coverages: [
      { title: "Total cost of risk modeling", body: "Premium, retained losses, deductibles, and cost of capital in one defensible picture." },
      { title: "Deductible & retention strategy", body: "Where to retain, where to transfer, and what it does to cash flow." },
      { title: "Captive & alternative risk", body: "Evaluation of group or single-parent captives and parametric structures." },
      { title: "Claims advocacy", body: "We manage and push claims so recoveries match the coverage you bought." },
    ],
    faqs: [
      { q: "What is total cost of risk?", a: "TCOR is the full cost of carrying risk — premiums plus retained/uninsured losses, deductibles, risk-control spend, and the cost of capital tied up in it. Optimizing TCOR, not just premium, is how sophisticated owners actually lower the number over time." },
      { q: "Should our portfolio consider a captive?", a: "Sometimes. When you have enough predictable, retainable risk, a captive can recapture underwriting profit and smooth volatility. We model whether the economics work for your portfolio before recommending one." },
      { q: "Do you handle claims for us?", a: "Yes. Claims advocacy is core to the work — we manage the process and press the carrier so the recovery reflects the coverage you paid for." },
    ],
    searchTerms: ["real estate risk management", "total cost of risk", "real estate captive insurance", "outsourced risk management"],
  },
  {
    slug: "insurance-program-review",
    category: "advisory",
    shortName: "Program Review",
    name: "Insurance Program Review & Renewal Marketing",
    metaTitle: "Commercial Insurance Program Review | Renewal RFP & Second Opinion",
    metaDescription:
      "A free, confidential review of your real estate insurance program and renewal. We benchmark pricing, find coverage gaps, and run a competitive marketing/RFP so carriers compete. $50k+ premiums.",
    hook: "A free second opinion on your program — then a competitive renewal marketed to the right carriers.",
    coveragesTitle: "What the review covers",
    intro:
      "Most owners never see their program truly shopped. The incumbent agent renews it with the same carrier year after year, and pricing drifts. A program review changes that: we benchmark your pricing against the market, flag coverage gaps and valuation problems, and — when it's time — run a disciplined marketing process so carriers compete for your account. It costs nothing to look.",
    idealFor: [
      "Owners renewing in the next 60–120 days",
      "Programs that haven't been marketed in years",
      "Anyone facing a large increase or a non-renewal",
      "CFOs who want an independent benchmark",
    ],
    coverages: [
      { title: "Pricing benchmark", body: "Where your rate sits versus current market for comparable risk." },
      { title: "Coverage gap & valuation analysis", body: "Exclusions, sublimits, and insurance-to-value issues that bite at claim time." },
      { title: "Structure & deductible review", body: "Whether the program structure still fits the portfolio and balance sheet." },
      { title: "Competitive marketing (RFP)", body: "A disciplined process taking the account to the right carriers for real competition." },
    ],
    faqs: [
      { q: "Is the review really free?", a: "Yes. The review and benchmark are free and confidential. If we then market the account and you place through us, we're compensated like any broker — but there's no cost and no obligation to look." },
      { q: "When should we start before renewal?", a: "Ideally 90–120 days out. That leaves time to gather data, model the exposure, and market the account properly. We can work faster when a renewal or non-renewal forces it." },
      { q: "Will this disrupt our current agent relationship?", a: "Not unless you want it to. Many owners use the review purely as a benchmark. If we find material savings or better coverage, you decide whether to make a change — on your timeline." },
    ],
    searchTerms: ["commercial insurance program review", "insurance renewal RFP", "second opinion commercial insurance", "insurance broker of record"],
  },
];

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

export function programsByCategory(category: ProgramCategory): Program[] {
  return PROGRAMS.filter((p) => p.category === category);
}
