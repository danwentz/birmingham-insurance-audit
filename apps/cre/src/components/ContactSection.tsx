import { LeadForm } from "@/components/LeadForm";
import { PREMIUM_FLOOR } from "@/lib/site";

export function ContactSection({
  source,
  heading = "Request a confidential renewal review",
  sub,
}: {
  source: string;
  heading?: string;
  sub?: string;
}) {
  return (
    <section id="contact" className="bg-ink px-5 py-20 text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{heading}</h2>
          <p className="mt-4 max-w-md text-lg text-paper/80">
            {sub ??
              `Send us your current program or renewal date. We'll review the structure, pricing, and coverage and tell you where it can be improved. Built for accounts with ${PREMIUM_FLOOR}+ in annual premium.`}
          </p>
          <ul className="mt-6 space-y-2 text-paper/80">
            <li>— A second set of expert eyes on your program, free.</li>
            <li>— Marketed to the carriers that actually want your risk.</li>
            <li>— No obligation, fully confidential.</li>
          </ul>
        </div>
        <div className="rounded-xl bg-paper-card p-6 shadow-xl sm:p-8">
          <LeadForm source={source} />
        </div>
      </div>
    </section>
  );
}
