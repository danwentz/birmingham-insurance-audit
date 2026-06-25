import { LeadForm } from "@/components/LeadForm";
import { PREMIUM_FLOOR } from "@/lib/site";

export function ContactSection({
  source,
  heading = "Request a confidential quote",
  sub,
}: {
  source: string;
  heading?: string;
  sub?: string;
}) {
  return (
    <section id="contact" className="gold-rule-top bg-midnight px-5 py-20 text-champagne">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Get started
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-md text-lg text-slate">
            {sub ??
              `Send us your current program or renewal date. We'll review the structure, pricing, and coverage and tell you where it can be improved. Built for accounts with ${PREMIUM_FLOOR}+ in annual premium.`}
          </p>
          <ul className="mt-6 space-y-2 text-slate">
            <li className="border-l-2 border-gold pl-3">A second set of expert eyes on your program, free.</li>
            <li className="border-l-2 border-gold pl-3">Marketed to the carriers that actually want your risk.</li>
            <li className="border-l-2 border-gold pl-3">No obligation, fully confidential.</li>
          </ul>
        </div>
        <div className="gold-rule-top overflow-hidden rounded-md bg-white p-6 shadow-2xl sm:p-8">
          <LeadForm source={source} />
        </div>
      </div>
    </section>
  );
}
