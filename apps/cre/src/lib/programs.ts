export type Faq = { q: string; a: string };

export type ProgramCategory = "program" | "asset" | "advisory";

export type Tool = { href: string; label: string; cta: string; blurb: string; kind?: "guide" };

type Program = {
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
  heroImage?: string; // 16:9 hero photo in /public; falls back to the "CRE" watermark
  coverages: { title: string; body: string }[];
  faqs: Faq[];
  searchTerms: string[]; // the high-intent terms this page targets
  tools?: Tool[]; // free calculators for this class
};

const MULTIFAMILY_CALC: Tool = {
  href: "/multifamily-insurance-calculator",
  label: "Multifamily Insurance Impact Calculator",
  cta: "Run your numbers",
  blurb:
    "Free, no email required: see what your premium is doing to NOI, value at your cap rate, DSCR, and cost per unit — plus the deductible and valuation exposures sitting behind the premium.",
};

const WIND_CALC: Tool = {
  href: "/wind-deductible-calculator",
  label: "Wind & Hail Deductible Calculator",
  cta: "Run your schedule",
  blurb:
    "Free, no email required: a percentage deductible applies to each affected location's insured value, so one storm applies several. Size what you actually retain, per location, per storm, and per season — and what a buy-down is worth against it.",
};

const HOTEL_CALC: Tool = {
  href: "/hotel-insurance-calculator",
  label: "Hotel Insurance Impact Calculator",
  cta: "Run your numbers",
  blurb:
    "Free, no email required: insurance is a fixed charge, so it never touches GOP — it comes out of EBITDA and capitalizes. See the premium per available room against your RevPAR, the ADR move a renewal implies, DSCR headroom, break-even occupancy, and whether business income funds a peak-season closure.",
};

const HOTEL_PORTFOLIO_GUIDE: Tool = {
  href: "/hotel-portfolio-insurance",
  label: "Hotel Portfolio Insurance Guide",
  cta: "Read the guide",
  blurb:
    "Own three or more hotels? Blanket vs. scheduled limits, catastrophe aggregates across locations, brand and lender requirements, and a portfolio review checklist.",
  kind: "guide",
};

const COINSURANCE_CALC: Tool = {
  href: "/coinsurance-penalty-calculator",
  label: "Coinsurance Penalty Calculator",
  cta: "Run your numbers",
  blurb:
    "Free, no email required: a coinsurance clause cuts every claim, not just a total loss, when the limit trails replacement cost. See the exact payout on your loss, the penalty across loss sizes, and what it takes to cure the gap — plus the margin clause that replaces it on blanket programs.",
};

export const PROGRAMS: Program[] = [
  {
    slug: "multifamily-apartment-insurance",
    category: "program",
    shortName: "Multifamily & Apartment",
    name: "Multifamily & Apartment (Habitational) Insurance",
    metaTitle: "Multifamily & Apartment Insurance Broker | ACREInsure",
    metaDescription:
      "Habitational property, GL, and umbrella for apartment portfolios from 50 to 10,000+ units. We fix non-renewals, re-rates, and deductible shock. $50k+ premiums.",
    hook: "Habitational property, liability, and umbrella for owners and operators of 50 to 10,000+ units.",
    heroImage: "/IMG_3543.JPG",
    intro:
      "No property class got repriced harder than multifamily. Premiums rose more than 75% between 2019 and 2024, carriers pulled capacity, and most standard markets quit writing apartment general liability altogether. So renewals now show up with a percentage wind/hail deductible you never agreed to and an assault-and-battery sublimit buried in the forms. If your program has been non-renewed, re-rated, or quietly rolled over with the same carrier every year, you are probably overpaying. We rebuild it from scratch and take it to the habitational markets that still want the business.",
    idealFor: [
      "Apartment communities and garden/mid-rise portfolios (50+ units)",
      "Owner-operators, syndicators, and multifamily funds",
      "Student housing, senior living, and affordable/LIHTC portfolios",
      "Accounts facing non-renewal, large rate increases, or wind/hail deductible shock",
    ],
    coverages: [
      { title: "Habitational property", body: "Building, business personal property, and loss of rents, valued so a coinsurance clause can't cut your claim check." },
      { title: "General liability", body: "Premises liability built for apartments: assault and battery, animal liability, habitability. The exposures standard forms now exclude or cap." },
      { title: "Real estate umbrella / excess", body: "Layered excess towers to $100M+ when the portfolio or the lender requires it." },
      { title: "Catastrophe & deductible solutions", body: "Wind/hail and named-storm structures, deductible buy-downs, and parametric or captive options where the standard market has walked." },
    ],
    faqs: [
      {
        q: "Why did my apartment insurance premium jump so much?",
        a: "Because the whole class got repriced. Between 2019 and 2024 carriers absorbed heavy catastrophe losses, capacity left habitational, and even clean accounts took large increases plus new wind/hail deductibles and exclusions. Here's the part that matters now: plenty of owners are still paying that hard-market rate when better terms exist. A full remarketing usually proves it.",
      },
      {
        q: "Can you help if my carrier non-renewed me?",
        a: "Yes. Non-renewals are routine in this class, and they almost never mean the property is uninsurable. They mean the account needs to go to specialist habitational and surplus-lines markets, presented well enough that an underwriter can say yes. We market it broadly and structure it to get there.",
      },
      {
        q: "How large of a portfolio do you handle?",
        a: "We work on accounts with roughly $50,000 and up in annual premium. That runs from a single large community to portfolios of 10,000+ units across several states.",
      },
    ],
    tools: [MULTIFAMILY_CALC, WIND_CALC, COINSURANCE_CALC],
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
    metaTitle: "Real Estate Portfolio Insurance & Master Programs | ACREInsure",
    metaDescription:
      "Master and schedule property programs for real estate portfolios with $100M to $2B+ in total insured value. Layered placements, agreed value, lender compliance.",
    hook: "Master property and schedule programs for portfolios with $100M to $2B+ in total insured value.",
    heroImage: "/Portfolio.JPG",
    intro:
      "Once a portfolio crosses into nine figures of insured value, a policy per building stops making sense. The right structure is a master program: every asset on the schedule of values under blanket limits, with agreed valuation, capacity layered and shared across carriers, and lender compliance handled once instead of loan by loan. We design these placements, take them to domestic and London markets, and run the renewal as the strategic event it is. Not a fire drill in the last two weeks of the term.",
    idealFor: [
      "Owners and funds with multi-property, multi-state schedules",
      "Portfolios with $100M+ total insured value",
      "Accounts needing blanket limits, agreed value, and shared/layered structures",
      "Sponsors with lender insurance requirements and complex SOV management",
    ],
    coverages: [
      { title: "Master / schedule property", body: "Blanket building and rents limits across the SOV, agreed valuation, and catastrophe exposure that has been modeled rather than guessed at." },
      { title: "Layered & shared placements", body: "Quota-share and excess towers across domestic, E&S, and London capacity when one carrier shouldn't hold the whole limit." },
      { title: "Insurance-to-value strategy", body: "Roughly three-quarters of commercial properties are underinsured by 40% or more. We build valuations that survive a coinsurance or margin-clause test at claim time." },
      { title: "Lender & loan compliance", body: "Evidence of insurance, waiver and endorsement management, and SOV reconciliation so closings and servicer audits don't stall." },
    ],
    faqs: [
      {
        q: "What is a master or schedule insurance program?",
        a: "One property program covering every asset on your schedule of values (SOV) under blanket limits, instead of a separate policy per building. Total cost of risk drops and lender compliance gets simpler. Just as important at renewal: you become one large account a carrier wants to keep, not forty small ones it barely notices.",
      },
      {
        q: "What TIV do you work with?",
        a: "Middle market and up: roughly $100M to $2B+ in total insured value. Past a certain size, no single carrier will (or should) hold the whole limit, so we build layered and shared structures instead.",
      },
      {
        q: "Can you handle multi-state and CAT-exposed schedules?",
        a: "Yes. We model the catastrophe exposure on your SOV first, then place the program with the mix of carriers and capacity the modeling supports, including coastal wind, hail-belt, and quake-exposed locations.",
      },
    ],
    tools: [WIND_CALC, COINSURANCE_CALC, HOTEL_PORTFOLIO_GUIDE],
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
    metaTitle: "Coastal & Catastrophe Property Insurance Broker | ACREInsure",
    metaDescription:
      "Wind, named storm, hail, flood, and quake capacity for hard-to-place commercial property. E&S and London placements, layered limits, deductible buy-downs.",
    hook: "Capacity for the hard-to-place risk: coastal wind, named storm, hail belt, flood, and quake.",
    heroImage: "/Coastal.JPG",
    intro:
      "Catastrophe-exposed property is where the standard market still says no. Near the Gulf, most standard carriers won't write windstorm at all, so the coverage moves to E&S and London markets and named-storm deductibles start around 5% of insured value. On a $20M building, that's the first $1 million out of your pocket before the carrier pays a dime. Placing this well takes real market access and a willingness to build the program in layers. Find the capacity, engineer the deductible, keep the limit adequate and the lender satisfied. That's the job.",
    idealFor: [
      "Coastal and Gulf Coast property (wind / named storm exposed)",
      "Hail-belt, wildfire, and earthquake-exposed assets",
      "Accounts hit with capacity shortfalls, sublimits, or huge CAT deductibles",
      "Portfolios needing layered or excess CAT limits",
    ],
    coverages: [
      { title: "Wind & named storm", body: "Primary and excess wind, including named-storm placements through E&S markets and Lloyd's syndicates." },
      { title: "Hail, wildfire & quake", body: "Specialty capacity for hail-belt, wildfire, and earthquake-exposed locations that standard markets have sublimited or declined." },
      { title: "Deductible engineering", body: "Percentage-deductible buy-downs and structures that keep one storm from wrecking a year of cash flow." },
      { title: "Parametric & captive options", body: "Alternative risk transfer for when traditional capacity is scarce or priced past the point of sense." },
    ],
    faqs: [
      {
        q: "My coastal property is hard to insure. Can you place it?",
        a: "Usually, yes. CAT-exposed property is rarely uninsurable. It just has to go to surplus-lines and London markets, often in layers, and it has to be presented by someone those markets know. We assemble the capacity and structure the deductibles so the limit is adequate and the cost is survivable.",
      },
      {
        q: "Can you reduce my wind/hail deductible?",
        a: "Often. Deductible buy-downs and program restructuring can both move it. We model the trade-off between premium saved and risk retained so you can see what the structure does to your balance sheet before you commit.",
      },
      {
        q: "Do you use parametric or captive solutions?",
        a: "When they make sense, which is not always. Parametric covers and captives can be the cheapest way to finance catastrophe risk in a distressed market, and a waste of money outside one. We'll show you the math either way.",
      },
    ],
    tools: [WIND_CALC, COINSURANCE_CALC],
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
    metaTitle: "Builders Risk & OCIP Insurance Broker | ACREInsure",
    metaDescription:
      "Builders risk and OCIP wrap-up programs for commercial developments from $25M to $100M+. GL, excess, and workers' comp under one owner-controlled master.",
    hook: "Builders risk and wrap-up (OCIP) programs for ground-up and value-add projects from $25M to $100M+.",
    heroImage: "/Construction.JPG",
    intro:
      "On a big development, insurance structure is one of the few budget lines you can actually move. Builders risk covers the course of construction on any project. On larger jobs, an owner-controlled insurance program (an OCIP, or wrap-up) also pulls general liability, excess, and workers' comp under one owner-controlled master, which strips the duplicated insurance markup out of every trade's bid and closes the gaps between contractors' policies. It also puts you, not your GC, in control of claims and limits. We design the program up front and administer it all the way through substantial completion.",
    idealFor: [
      "Ground-up and major value-add developments",
      "Projects with $25M+ hard construction cost (OCIP territory)",
      "Owners and developers wanting control of limits, claims, and safety",
      "Deals with lender and equity insurance requirements",
    ],
    coverages: [
      { title: "Builders risk", body: "Course-of-construction property including soft costs, delay in completion, and catastrophe perils on exposed sites." },
      { title: "Owner-controlled program (OCIP)", body: "GL, excess, and workers' comp for every enrolled trade on the project, controlled by the owner instead of scattered across subcontractors." },
      { title: "Excess / umbrella towers", body: "Project-specific excess limits built to what the loan documents and contracts require." },
      { title: "Program administration", body: "Enrollment, payroll audits, and closeout, managed until the last certificate clears." },
    ],
    faqs: [
      {
        q: "OCIP or builders risk: which do I need?",
        a: "Builders risk, always: it covers the course-of-construction property on virtually every project. The OCIP question is about size. Once hard cost clears roughly $25M, consolidating GL, excess, and workers' comp under the owner starts paying for itself in stripped-out markup and claim control. We model both and show you the break-even.",
      },
      {
        q: "How big does a project need to be for a wrap-up?",
        a: "Rule of thumb: GL-only wrap-ups start earning their keep around $25M of hard construction cost, and full OCIPs are common on $50M-$100M+ projects. Below that, a well-structured builders risk plus contractor-placed coverage usually wins on cost.",
      },
      {
        q: "Can you coordinate with our lender and equity requirements?",
        a: "Yes. Limits, additional insureds, waivers, evidence of coverage: we build the program to the loan and joint-venture requirements from day one and keep it compliant through completion, so insurance is never the reason a draw or a closing stalls.",
      },
    ],
    tools: [COINSURANCE_CALC],
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
    metaTitle: "Office Building Insurance Broker | ACREInsure",
    metaDescription:
      "Property, liability, and umbrella for office towers and portfolios. Vacancy, repositioning, tenant build-outs, and lender requirements handled. $50k+ premiums.",
    hook: "Property, liability, and umbrella for office towers, suburban buildings, and portfolios.",
    heroImage: "/Office.JPG",
    intro:
      "Office is getting underwritten by headline right now. Carriers read the same return-to-office stories you do, and a well-run building can get priced like a distressed one just for sharing the sector. That's a presentation problem, and presentation problems can be fixed. We put the occupancy, the life-safety record, the capital improvements, and the tenancy in front of underwriters properly, then market the account so the price reflects your building rather than the sector's reputation.",
    idealFor: [
      "Single-asset towers and suburban office portfolios",
      "Owners, REITs, and funds",
      "Partially vacant or repositioning assets",
      "Deals with lender and joint-venture insurance requirements",
    ],
    coverages: [
      { title: "Property", body: "Building, rents, and tenant-improvement exposure with a valuation you can defend at claim time." },
      { title: "General liability", body: "Premises liability for lobbies, common areas, garages, and everyone who walks through them." },
      { title: "Umbrella / excess", body: "Excess towers sized to what your lender and your leases demand." },
      { title: "Vacancy & repositioning", body: "Vacant-building and builders risk solutions for assets in renovation or lease-up." },
    ],
    faqs: [
      { q: "Does vacancy raise my office premium?", a: "It can. Vacant or partially vacant space changes both the property and the liability picture, and most policies carry vacancy provisions that quietly cut coverage once occupancy drops far enough. We present occupancy and security accurately and place the account with markets that underwrite repositioning office instead of reflexively declining it." },
      { q: "Can you cover a building under renovation?", a: "Yes. A major tenant build-out or repositioning typically gets a builders risk or course-of-construction layer alongside the property program, structured so nothing falls in the gap between your coverage and the contractor's." },
      { q: "How large of an office portfolio do you handle?", a: "Accounts from roughly $50,000 in annual premium and up, whether that's one tower or a multi-state office portfolio." },
    ],
    tools: [COINSURANCE_CALC],
    searchTerms: ["office building insurance broker", "office property insurance", "commercial office insurance portfolio"],
  },
  {
    slug: "retail-shopping-center-insurance",
    category: "asset",
    shortName: "Retail & Shopping Centers",
    name: "Retail & Shopping Center Insurance",
    metaTitle: "Shopping Center & Retail Property Insurance | ACREInsure",
    metaDescription:
      "Property and liability for strip centers, power centers, and retail portfolios. Parking-lot premises risk, tenant COI tracking, CAT structure. $50k+ premiums.",
    hook: "Property and liability for strip centers, power centers, and multi-tenant retail portfolios.",
    heroImage: "/Retail.JPG",
    intro:
      "A multi-tenant center concentrates liability in exactly the places you control: the parking lot, the sidewalks, the common areas. Tenants turn over; the slip-and-fall exposure stays yours. So the program has to carry that premises risk, keep tenant certificates of insurance current so their gaps never become your loss, and still satisfy the lender. If the center sits in wind or hail territory, the property side needs real CAT structure on top. We build all of that into one program and then make carriers compete for it.",
    idealFor: [
      "Strip, neighborhood, and power centers",
      "Multi-tenant and mixed retail portfolios",
      "Owners managing tenant COI and CAM insurance compliance",
      "CAT-exposed retail (wind/hail/coastal)",
    ],
    coverages: [
      { title: "Property", body: "Building and rents with catastrophe structure for wind, hail, and coastal exposure." },
      { title: "Premises liability", body: "Slip-and-fall, parking-lot, and common-area exposure, underwritten for how multi-tenant retail actually operates." },
      { title: "Umbrella / excess", body: "Excess limits for high-traffic centers and lender requirements." },
      { title: "Tenant insurance tracking", body: "COI and CAM compliance so an uninsured tenant's loss doesn't land on the owner." },
    ],
    faqs: [
      { q: "Who's liable for parking-lot injuries at my center?", a: "You are, mostly. The owner carries premises liability for common areas, and the parking lot counts even when it's a tenant's customers using it. We structure the GL and umbrella around that reality and help you enforce tenant insurance requirements so the risk gets shared the way the lease says it should." },
      { q: "Do you track tenant certificates of insurance?", a: "Yes. We help set the insurance requirements in your leases, then track the certificates against them. An expired COI you discover after a loss is the most expensive piece of paper in real estate." },
      { q: "How large of a retail portfolio do you handle?", a: "Roughly $50,000+ in annual premium, from one center to a multi-state retail portfolio." },
    ],
    tools: [WIND_CALC, COINSURANCE_CALC],
    searchTerms: ["shopping center insurance", "retail property insurance broker", "strip mall insurance"],
  },
  {
    slug: "industrial-warehouse-insurance",
    category: "asset",
    shortName: "Industrial & Warehouse",
    name: "Industrial & Warehouse Insurance",
    metaTitle: "Warehouse & Industrial Insurance Broker | ACREInsure",
    metaDescription:
      "Property and liability for warehouses, distribution centers, and industrial/flex portfolios. High-TIV placements, sprinkler scrutiny, NNN lessor's risk. $50k+.",
    hook: "Property and liability for distribution centers, logistics, flex, and industrial portfolios.",
    heroImage: "/Industrial.JPG",
    intro:
      "Industrial is the asset class everyone wants to own, and underwriters still read it hard. A single big-box distribution building can put $100M of insured value under one roof, which means the sprinkler design, the protection class, and what's actually stored inside get scrutinized before anyone offers a limit. Get those details right in the submission and capacity shows up. Get them wrong and you're buying layers at a worse price. We get them right.",
    idealFor: [
      "Distribution, fulfillment, and logistics centers",
      "Flex and light-industrial portfolios",
      "Single-tenant NNN industrial (lessor's risk)",
      "High-TIV single buildings",
    ],
    coverages: [
      { title: "Property (high TIV)", body: "Large sprinklered buildings with the protection and valuation detail that lets a carrier hold real capacity." },
      { title: "General liability", body: "Premises and tenant-operations liability for logistics and industrial use." },
      { title: "Lessor's risk / NNN", body: "Owner programs for single-tenant net-leased industrial, coordinated with the tenant's coverage." },
      { title: "Umbrella / excess", body: "Excess towers for fleet, tenant, and contractual exposure." },
    ],
    faqs: [
      { q: "Can you place a high-TIV single distribution building?", a: "Yes. A single big-box can carry $100M+ of insured value, and whether one carrier takes it or we layer it comes down to the sprinkler and protection story in the submission. We build that story properly so underwriters can say yes at a number that works." },
      { q: "Do you write lessor's risk only (NNN) industrial?", a: "We do. For single-tenant net-leased industrial we structure an owner's program that lines up with the tenant's coverage and the lender's requirements, without paying twice for the same risk." },
      { q: "What size accounts do you take?", a: "Roughly $50,000 and up in annual premium, from one building to a multi-state industrial portfolio." },
    ],
    tools: [COINSURANCE_CALC],
    searchTerms: ["warehouse insurance broker", "industrial property insurance", "distribution center insurance", "lessors risk NNN insurance"],
  },
  {
    slug: "hospitality-hotel-insurance",
    category: "asset",
    shortName: "Hospitality & Hotels",
    name: "Hospitality & Hotel Insurance",
    metaTitle: "Hotel & Hospitality Insurance Broker | ACREInsure",
    metaDescription:
      "Property, guest liability, liquor, and umbrella for hotels and resorts, flagged or independent. Coastal CAT capacity and brand-standard compliance. $50k+.",
    hook: "Property, guest liability, liquor, and umbrella for hotels, resorts, and hospitality portfolios.",
    heroImage: "/Hotel.JPG",
    intro:
      "A hotel is high-value property with a crowd inside it: pools, bars, banquets, and guests who sue. Premises liability verdicts against hotels now routinely clear $10 million, and a clean claims history won't protect you in the wrong venue or brand tier. Put the property on the coast and you're also placing named-storm coverage in a market that keeps shrinking, all while the flag dictates limits and terms in the franchise agreement. The program has to do everything at once. We build hospitality programs that do.",
    idealFor: [
      "Flagged and independent hotels",
      "Resorts and coastal properties",
      "Portfolios and hotel management companies",
      "Assets with food & beverage and liquor exposure",
    ],
    coverages: [
      { title: "Property (incl. wind/named storm)", body: "High-value property with coastal and CAT capacity where the standard market has pulled back." },
      { title: "Guest & premises liability", body: "Liability for guests, pools, amenities, and common areas, sized for what hospitality verdicts cost now." },
      { title: "Liquor liability", body: "Coverage for on-site bars, restaurants, banquets, and events." },
      { title: "Umbrella & brand-required limits", body: "Excess towers built to franchise and lender requirements." },
    ],
    faqs: [
      { q: "Can you meet my franchise / brand insurance requirements?", a: "Yes. Flags spell out limits, additional insureds, and coverage terms, and the evidence of insurance has to match or you hear about it. We build the program to the brand standard first, then market it for price. Compliance and competitiveness aren't in conflict when the account is presented well." },
      { q: "My resort is coastal. Can you place the property?", a: "Usually. Coastal and named-storm hospitality goes to surplus-lines and London capacity, often in layers, and the wind deductible is where the real negotiation happens. We assemble the capacity and structure the deductible so the limit stays adequate without gutting your cash position after a storm." },
      { q: "Do you handle liquor liability for hotel F&B?", a: "Yes. Bars, restaurants, banquets, and events all run through liquor liability coordinated with the GL and umbrella, so a claim doesn't fall between policies." },
    ],
    tools: [HOTEL_CALC, WIND_CALC, COINSURANCE_CALC, HOTEL_PORTFOLIO_GUIDE],
    searchTerms: ["hotel insurance broker", "hospitality insurance", "resort property insurance", "hotel liquor liability"],
  },
  {
    slug: "student-senior-housing-insurance",
    category: "asset",
    shortName: "Student & Senior Housing",
    name: "Student & Senior Housing Insurance",
    metaTitle: "Student Housing & Senior Living Insurance | ACREInsure",
    metaDescription:
      "Specialty habitational coverage for student housing and senior living: property, GL, professional liability, abuse & molestation, umbrella. $50k+ premiums.",
    heroImage: "/student.JPG",
    hook: "Specialty habitational property and liability for student housing and senior living portfolios.",
    intro:
      "Student and senior housing look like apartments on paper and underwrite like nothing else. Student housing turns over every August, sits half-empty through the summer, and lives on life-safety compliance. Senior living adds resident care, professional liability, and abuse & molestation exposure that a generic apartment carrier wants no part of. These accounts belong with specialty markets that understand the occupancy model. That's where we take them.",
    idealFor: [
      "Purpose-built and off-campus student housing",
      "Assisted living, memory care, and senior living",
      "Operators, developers, and funds",
      "Accounts needing professional and abuse & molestation coverage",
    ],
    coverages: [
      { title: "Habitational property", body: "Building and rents with realistic valuation and catastrophe structure." },
      { title: "General liability", body: "Premises liability tuned to student or senior occupancy, not a generic apartment form." },
      { title: "Professional & resident care", body: "Professional liability for senior living and care operations." },
      { title: "Abuse & molestation + umbrella", body: "A&M coverage placed explicitly, with excess towers for these higher-sensitivity classes." },
    ],
    faqs: [
      { q: "Do you cover senior living professional liability?", a: "Yes. Senior and assisted living carries resident-care exposure that ordinary premises liability was never built for. We place professional liability through specialty senior-care markets and coordinate it with the GL, the A&M coverage, and the umbrella so the policies respond together instead of pointing at each other." },
      { q: "Is abuse & molestation coverage included?", a: "It has to be, and we place it explicitly, often with its own limit. A&M left to a buried sublimit or a silent exclusion is one of the most expensive discoveries a housing owner can make after a claim." },
      { q: "How is student housing summer vacancy handled?", a: "By telling the truth about it up front. We present the seasonal occupancy pattern accurately so the program is priced for the real risk and a vacancy provision doesn't void coverage over winter break." },
    ],
    tools: [MULTIFAMILY_CALC, COINSURANCE_CALC],
    searchTerms: ["student housing insurance", "senior living insurance broker", "assisted living insurance", "habitational specialty insurance"],
  },
  {
    slug: "self-storage-insurance",
    category: "asset",
    shortName: "Self-Storage",
    name: "Self-Storage Facility Insurance",
    metaTitle: "Self-Storage Insurance Broker for Multi-Location Operators | ACREInsure",
    metaDescription:
      "Property, customer goods legal liability, and umbrella for multi-location self-storage operators. Coastal wind capacity, truck rental exposure. $50k+ premiums.",
    hook: "Master property, customer goods liability, and umbrella for self-storage operators with multiple locations and 400+ units.",
    heroImage: "/SelfStorage.jpg",
    intro:
      "Self-storage gets sold as the simple asset class: metal buildings, no plumbing, no tenants sleeping there. Then you grow. Now it's eight locations in three states, two of them inside a wind zone, a truck rental counter at half of them, and thousands of units full of property you don't own and can't inspect. Most operators at that size are still insured the way they were at one location, with a package policy per facility and a general liability form that excludes the customer's goods outright. We rebuild it as one program, priced as the account it has become.",
    idealFor: [
      "Operators and owners with multiple locations or 400+ units",
      "Coastal and wind-exposed facilities across the Gulf and Southeast",
      "Facilities with truck rental, boat/RV parking, or retail sales on site",
      "Portfolios growing by acquisition, development, or conversion",
    ],
    coverages: [
      { title: "Master property & business income", body: "Every location on one schedule under blanket limits, with loss of rents and a wind deductible that applies the way you think it does. New acquisitions get added mid-term without starting over." },
      { title: "Customer goods legal liability", body: "Standard GL excludes property in your care, custody, or control, which describes every unit you rent. This covers it, along with sale and disposal liability for the lien sale that gets challenged." },
      { title: "Truck rental & auto exposure", body: "Hired and non-owned auto, and the gap between what the rental company's dealer agreement covers and what lands on you when a customer wrecks a box truck in your lot." },
      { title: "Umbrella, crime & cyber", body: "Excess limits over GL, auto, and customer goods. Crime for the cash and the managers who handle it. Cyber for the gate system, the autopay cards, and the tenant data behind both." },
    ],
    faqs: [
      {
        q: "Does my general liability policy cover my customers' stored property?",
        a: "Almost never. GL forms exclude property in your care, custody, or control, and an underwriter will argue that a locked unit on your premises qualifies. Customer goods legal liability fills that hole. It responds when you're legally responsible for the damage: a roof leak you knew about, a break-in through a gate that had been broken for a month. Pair it with sale and disposal coverage, because a wrongful lien sale claim is the one most operators eventually see.",
      },
      {
        q: "We rent trucks at several locations. Doesn't the rental company insure that?",
        a: "They insure their trucks. Your exposure as the dealer is a different question, and the answer is in a dealer agreement most operators signed without reading the insurance section. Your employee hands over keys to an unfit driver, or moves a truck across the lot and hits a customer. Those claims come to you. We read the agreement, then close the gap with hired and non-owned auto and an umbrella that sits over it.",
      },
      {
        q: "Can you place our coastal locations?",
        a: "Usually, and they shouldn't be placed alone. Gulf wind goes to surplus-lines and London capacity, where named-storm deductibles start around 5% of insured value. On a schedule, the inland locations help carry the coastal ones, and the deductible can be negotiated per location instead of across the whole program. One storm shouldn't trigger a deductible on buildings it never touched.",
      },
      {
        q: "How large of an operator do you work with?",
        a: "Accounts with roughly $50,000 and up in annual premium. In self-storage that usually means several locations, or one or two large facilities with coastal exposure. If you're a single inland facility under 400 units, a standard package policy is probably the right answer and we'll tell you so.",
      },
    ],
    tools: [WIND_CALC, COINSURANCE_CALC],
    searchTerms: [
      "self storage insurance broker",
      "self-storage facility insurance",
      "customer goods legal liability",
      "multi-location self storage insurance program",
    ],
  },

  /* ─── Advisory ─── */
  {
    slug: "real-estate-risk-management",
    category: "advisory",
    shortName: "Risk Management",
    name: "Real Estate Risk Management & Total Cost of Risk",
    metaTitle: "Real Estate Risk Management & TCOR Advisory | ACREInsure",
    metaDescription:
      "Total cost of risk advisory for real estate owners, funds, and CFOs. Retention strategy, captive analysis, valuation, claims advocacy. $50k+ programs.",
    hook: "Total cost of risk strategy for owners, funds, and CFOs. Not just a policy.",
    coveragesTitle: "What we bring to the table",
    intro:
      "Premium is the number on the invoice. It is not your cost of risk. Deductibles, retained losses, valuation accuracy, claims outcomes, and the capital sitting against all of it move the real figure, usually more than rate does. We work as an outsourced risk function for owners and CFOs, which means modeling total cost of risk instead of quoting a renewal, setting retentions on purpose instead of by default, and pressing claims until the recovery matches the coverage you paid for.",
    idealFor: [
      "CFOs and risk managers at owner/operator platforms",
      "Funds and multi-entity ownership structures",
      "Portfolios weighing higher retentions or a captive",
      "Accounts that want real claims advocacy",
    ],
    coverages: [
      { title: "Total cost of risk modeling", body: "Premium, retained losses, deductibles, and cost of capital in one number you can defend to a board." },
      { title: "Deductible & retention strategy", body: "Where to retain, where to transfer, and what each choice does to cash flow." },
      { title: "Captive & alternative risk", body: "Group and single-parent captive evaluation, plus parametric structures where they beat the traditional market." },
      { title: "Claims advocacy", body: "We manage and push claims so recoveries match the coverage you bought." },
    ],
    faqs: [
      { q: "What is total cost of risk?", a: "TCOR is everything carrying risk actually costs you: premiums, retained and uninsured losses, deductibles, risk-control spend, and the capital tied up behind it. Owners who manage that whole number are the ones whose insurance cost falls over time. Chasing premium alone mostly just moves cost around." },
      { q: "Should our portfolio consider a captive?", a: "Sometimes. With enough predictable, retainable risk, a captive recaptures underwriting profit and smooths volatility. Without it, a captive is an expensive hobby. We model your portfolio's economics honestly before recommending one either way." },
      { q: "Do you handle claims for us?", a: "Yes, and it's core to the work. We manage the claim process and press the carrier so the recovery reflects the coverage you paid for, not the first number the adjuster offers." },
    ],
    tools: [COINSURANCE_CALC],
    searchTerms: ["real estate risk management", "total cost of risk", "real estate captive insurance", "outsourced risk management"],
  },
  {
    slug: "insurance-program-review",
    category: "advisory",
    shortName: "Program Review",
    name: "Insurance Program Review & Renewal Marketing",
    metaTitle: "Free Commercial Insurance Program Review | ACREInsure",
    metaDescription:
      "A free, confidential review of your CRE insurance program: pricing benchmark, coverage gaps, valuation check, then a real competitive renewal. $50k+ premiums.",
    hook: "A free second opinion on your program, then a competitive renewal marketed to the right carriers.",
    coveragesTitle: "What the review covers",
    intro:
      "Most insurance programs are never actually shopped. The incumbent agent renews with the same carrier, the rate drifts a few points a year, and nobody reads the forms until there's a claim. A review changes that. We benchmark your pricing against where comparable risk is placing today, flag the exclusions and valuation problems that bite at claim time, and when you're ready, run a disciplined marketing process so carriers have to compete for the account. It costs nothing to look.",
    idealFor: [
      "Owners renewing in the next 60-120 days",
      "Programs that haven't been marketed in years",
      "Anyone facing a large increase or a non-renewal",
      "CFOs who want an independent benchmark",
    ],
    coverages: [
      { title: "Pricing benchmark", body: "Where your rate sits against the current market for comparable risk, in numbers rather than adjectives." },
      { title: "Coverage gap & valuation analysis", body: "The exclusions, sublimits, and insurance-to-value problems that only show up at claim time." },
      { title: "Structure & deductible review", body: "Whether the program still fits the portfolio and the balance sheet, or just fits last year's renewal." },
      { title: "Competitive marketing (RFP)", body: "A disciplined process that takes the account to the right carriers and makes them compete." },
    ],
    faqs: [
      { q: "Is the review really free?", a: "Yes. The review and the benchmark cost nothing and stay confidential. If we later market the account and you place coverage through us, we're compensated the way any broker is. There's no fee and no obligation attached to looking." },
      { q: "When should we start before renewal?", a: "Ideally 90 to 120 days out. That's enough time to gather data, model the exposure, and market the account properly instead of begging carriers for extensions. We can move faster when a non-renewal forces the issue; we'd just rather not have to." },
      { q: "Will this disrupt our current agent relationship?", a: "Not unless you want it to. Plenty of owners use the review purely as a benchmark. If we find material savings or better coverage, the decision and the timing stay yours." },
    ],
    tools: [COINSURANCE_CALC],
    searchTerms: ["commercial insurance program review", "insurance renewal RFP", "second opinion commercial insurance", "insurance broker of record"],
  },
];

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

export function programsByCategory(category: ProgramCategory): Program[] {
  return PROGRAMS.filter((p) => p.category === category);
}
