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
      "From aerospace and defense contractors to the trades, construction, and staffing firms powering the Rocket City, Huntsville businesses get hit with workers' comp and general liability audits every year.",
  },
  {
    slug: "tuscaloosa",
    name: "Tuscaloosa",
    region: "West-Central Alabama",
    county: "Tuscaloosa County",
    nearby: ["Northport", "Cottondale", "Brookwood", "Moundville", "Coaling", "Vance"],
    blurb:
      "Contractors, restaurants, auto suppliers, and service businesses across Tuscaloosa and Northport are common targets for premium audits — often with bills no one saw coming.",
  },
  {
    slug: "montgomery",
    name: "Montgomery",
    region: "Central Alabama",
    county: "Montgomery County",
    nearby: ["Prattville", "Wetumpka", "Pike Road", "Millbrook", "Pratt", "Deatsville"],
    blurb:
      "Montgomery-area contractors, manufacturers, healthcare practices, and trucking companies regularly face workers' comp and liability audits that inflate their premiums.",
  },
  {
    slug: "mobile",
    name: "Mobile",
    region: "South Alabama / Gulf Coast",
    county: "Mobile County",
    nearby: ["Daphne", "Spanish Fort", "Saraland", "Theodore", "Tillmans Corner", "Prichard"],
    blurb:
      "From shipbuilding and logistics to construction and hospitality along the Gulf Coast, Mobile and Baldwin County businesses see large surprise audit bills more often than most realize.",
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
