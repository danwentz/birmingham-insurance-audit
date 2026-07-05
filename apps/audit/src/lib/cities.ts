export type City = {
  slug: string;
  name: string;
  region: string; // e.g. "North Alabama"
  county: string;
  nearby: string[];
  blurb: string; // 1-2 sentences of local flavor for the intro
};

export const CITIES: City[] = [
  {
    slug: "huntsville",
    name: "Huntsville",
    region: "North Alabama",
    county: "Madison County",
    nearby: ["Madison", "Decatur", "Athens", "Meridianville", "Hampton Cove", "Owens Cross Roads"],
    blurb:
      "Huntsville is growing faster than anywhere else in Alabama, and the companies doing the building, from framing crews to the defense subcontractors around Redstone Arsenal, are exactly who premium auditors scrutinize hardest. Fast-growing payroll means the estimate your policy was priced on is already stale by audit time.",
  },
  {
    slug: "tuscaloosa",
    name: "Tuscaloosa",
    region: "West-Central Alabama",
    county: "Tuscaloosa County",
    nearby: ["Northport", "Cottondale", "Brookwood", "Moundville", "Coaling", "Vance"],
    blurb:
      "Between the Mercedes-Benz plant in Vance, its supplier network, and everything the University keeps busy, Tuscaloosa and Northport run on payroll-heavy businesses. When actual payroll beats the estimate your policy was priced on, the audit bill follows, and it isn't always calculated right.",
  },
  {
    slug: "montgomery",
    name: "Montgomery",
    region: "Central Alabama",
    county: "Montgomery County",
    nearby: ["Prattville", "Wetumpka", "Pike Road", "Millbrook", "Pratt", "Deatsville"],
    blurb:
      "Hyundai and its suppliers, state contractors, and the trucking firms working the I-65 and I-85 corridors make Montgomery payrolls complicated. Complicated payroll is where audit errors live: split class codes, missed overtime credits, subs without certificates on file.",
  },
  {
    slug: "mobile",
    name: "Mobile",
    region: "South Alabama / Gulf Coast",
    county: "Mobile County",
    nearby: ["Daphne", "Spanish Fort", "Saraland", "Theodore", "Tillmans Corner", "Prichard"],
    blurb:
      "Shipyards, port logistics, and the trades along the Gulf Coast run big, seasonal payrolls. Seasonal payroll rarely matches the estimate a premium was priced on, which is why Mobile and Baldwin County owners see so many additional-premium letters.",
  },
  {
    slug: "decatur",
    name: "Decatur",
    region: "North Alabama",
    county: "Morgan County",
    nearby: ["Hartselle", "Priceville", "Trinity", "Moulton", "Athens", "Madison"],
    blurb:
      "Decatur's riverfront plants and the contractors who serve them run the kind of mixed payrolls auditors get wrong: maintenance crews rated as new construction, office staff rated as shop floor. Those are the bills worth a second read before anyone writes a check.",
  },
  {
    slug: "florence",
    name: "Florence",
    region: "The Shoals, North Alabama",
    county: "Lauderdale County",
    nearby: ["Muscle Shoals", "Sheffield", "Tuscumbia", "Killen", "Russellville"],
    blurb:
      "The Shoals economy runs on manufacturers, healthcare practices, and construction firms, businesses where a single wrong class code can swing a premium by thousands. If your audit came back higher than the estimate, that class code is the first thing to check.",
  },
  {
    slug: "auburn",
    name: "Auburn",
    region: "East-Central Alabama",
    county: "Lee County",
    nearby: ["Opelika", "Smiths Station", "Notasulga", "Loachapoka", "Salem"],
    blurb:
      "Auburn's growth means construction, and construction is the most-audited business there is. Sub costs, certificates of insurance, and class codes give an auditor plenty of room to get it wrong. The restaurants and student-housing contractors around town see it too.",
  },
  {
    slug: "opelika",
    name: "Opelika",
    region: "East-Central Alabama",
    county: "Lee County",
    nearby: ["Auburn", "Smiths Station", "Beauregard", "Salem", "Notasulga"],
    blurb:
      "Opelika's manufacturers and logistics operators run payrolls that shift with production schedules. When the real numbers come in above the estimate your policy was priced on, the audit bill lands. Whether it was calculated correctly is a separate question.",
  },
  {
    slug: "dothan",
    name: "Dothan",
    region: "Southeast Alabama (the Wiregrass)",
    county: "Houston County",
    nearby: ["Enterprise", "Ozark", "Headland", "Midland City", "Rehobeth"],
    blurb:
      "The Wiregrass runs on agriculture, trucking, and healthcare, businesses with seasonal or high-turnover payroll. That churn is exactly what premium auditors misread, and it shows up as an additional-premium bill bigger than it should be.",
  },
  {
    slug: "gadsden",
    name: "Gadsden",
    region: "Northeast Alabama",
    county: "Etowah County",
    nearby: ["Rainbow City", "Attalla", "Southside", "Glencoe", "Hokes Bluff"],
    blurb:
      "Manufacturing and the trades carry some of the highest workers' comp rates on the books, so a classification error on a Gadsden or Etowah County audit costs more than the same mistake would in an office park. Worth checking before you pay.",
  },
  {
    slug: "anniston",
    name: "Anniston",
    region: "East Alabama",
    county: "Calhoun County",
    nearby: ["Oxford", "Jacksonville", "Weaver", "Hobson City", "Saks"],
    blurb:
      "Between the Anniston Army Depot's contractor ecosystem and the manufacturers around Oxford, Calhoun County payrolls mix defense work, logistics, and the trades. Mixed operations are where auditors misapply class codes most, and misapplied class codes inflate bills.",
  },
  {
    slug: "cullman",
    name: "Cullman",
    region: "North Alabama",
    county: "Cullman County",
    nearby: ["Hanceville", "Good Hope", "Baileyton", "Holly Pond", "Vinemont"],
    blurb:
      "Poultry, agriculture, and construction drive Cullman County, and every one of them runs the seasonal, high-turnover payroll that premium audits misjudge. If your audit assumed year-round payroll you didn't actually carry, that's disputable.",
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
