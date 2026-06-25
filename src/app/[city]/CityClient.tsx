"use client";

import Link from "next/link";
import {
  Phone,
  ShieldCheck,
  Clock,
  FileSearch,
  Scale,
  CheckCircle2,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import {
  BRAND,
  BRAND_DARK,
  PHONE_DISPLAY,
  PHONE_HREF,
  YEARS_EXPERIENCE,
} from "@/lib/site";
import { LeadForm, trackCall } from "@/components/LeadForm";
import type { City } from "@/lib/cities";

export default function CityClient({ city }: { city: City }) {
  const source = `${city.name} page`;

  return (
    <main className="flex flex-col scroll-smooth">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/">
            <img
              src="/BCIAS-Logo.png"
              alt="Birmingham Commercial Insurance Audit Solutions"
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={PHONE_HREF}
              onClick={trackCall}
              className="hidden sm:inline-flex items-center gap-2 font-semibold text-gray-800 hover:text-[#1f6d79]"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <a
              href="#help"
              style={{ backgroundColor: BRAND }}
              className="text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90"
            >
              Get Help
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-slate-50 pt-12 pb-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f6d79] bg-[#2A8E9E]/10 px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4" /> Serving {city.name} &amp; {city.county}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {city.name} Insurance Audit Help — Surprised by a Big Premium Bill?
            </h1>
            <p className="mt-5 text-lg text-gray-700">
              If your insurer says you owe thousands more after a workers&apos; comp or
              general liability audit, <strong>don&apos;t pay it before you talk to us.</strong>{" "}
              We help {city.name}-area business owners review, dispute, and reduce
              inflated audit bills.
            </p>

            <ul className="mt-6 space-y-2 text-gray-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#2A8E9E] mt-0.5 shrink-0" />
                You don&apos;t have to just write the check — you have options.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#2A8E9E] mt-0.5 shrink-0" />
                We explain your audit in plain English — no jargon, no judgment.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#2A8E9E] mt-0.5 shrink-0" />
                Free review. No obligation. Local help for {city.region}.
              </li>
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#help"
                style={{ backgroundColor: BRAND }}
                className="inline-flex justify-center items-center text-white font-semibold px-6 py-3 rounded-md hover:opacity-90"
              >
                Get My Free Audit Review
              </a>
              <a
                href={PHONE_HREF}
                onClick={trackCall}
                style={{ borderColor: BRAND, color: BRAND_DARK }}
                className="inline-flex justify-center items-center gap-2 border-2 font-semibold px-6 py-3 rounded-md hover:bg-white"
              >
                <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div id="help" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">
              Free {city.name} Audit Review
            </h2>
            <p className="mt-1 text-gray-600 text-sm">
              Tell us what happened. We&apos;ll review your situation and lay out your
              options — at no cost.
            </p>
            <div className="mt-5">
              <LeadForm source={source} />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white border-y border-gray-100 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <ShieldCheck className="h-6 w-6 mx-auto text-[#2A8E9E]" />
            <p className="mt-2 text-sm font-semibold text-gray-800">Licensed & Local</p>
            <p className="text-xs text-gray-500">Alabama-based advisors</p>
          </div>
          <div>
            <Clock className="h-6 w-6 mx-auto text-[#2A8E9E]" />
            <p className="mt-2 text-sm font-semibold text-gray-800">{YEARS_EXPERIENCE} Years Experience</p>
            <p className="text-xs text-gray-500">Commercial insurance audits</p>
          </div>
          <div>
            <FileSearch className="h-6 w-6 mx-auto text-[#2A8E9E]" />
            <p className="mt-2 text-sm font-semibold text-gray-800">Free Audit Review</p>
            <p className="text-xs text-gray-500">No cost, no obligation</p>
          </div>
          <div>
            <Scale className="h-6 w-6 mx-auto text-[#2A8E9E]" />
            <p className="mt-2 text-sm font-semibold text-gray-800">Dispute & Reduce</p>
            <p className="text-xs text-gray-500">Contest inaccurate charges</p>
          </div>
        </div>
      </section>

      {/* PROBLEM / EMPATHY */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <AlertTriangle className="h-8 w-8 mx-auto text-[#2A8E9E]" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Surprise Audit Bills Hit {city.name} Businesses Every Year
          </h2>
          <p className="mt-4 text-lg text-gray-700">{city.blurb}</p>
          <p className="mt-4 text-lg text-gray-700">
            Take a breath. A surprise audit bill is <strong>not</strong> automatically a
            final bill. Insurers make mistakes — wrong job classifications, payroll
            counted twice, subcontractors miscategorized, ineligible figures included.
            Those mistakes are exactly what we look for.
          </p>
        </div>
      </section>

      {/* HOW WE HELP */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">How We Help {city.name} Owners</h2>
          <p className="mt-2 text-gray-600">A simple, no-pressure process built for stressed business owners.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-50 p-6 rounded-xl border border-gray-100">
              <span className="text-sm font-bold text-[#2A8E9E]">Step 1</span>
              <h3 className="mt-1 font-semibold text-lg">We Review Your Audit — Free</h3>
              <p className="mt-2 text-gray-600">
                Send us the audit letter or worksheet. We&apos;ll go through it line by
                line and tell you, in plain English, what it says and whether it looks
                accurate.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-gray-100">
              <span className="text-sm font-bold text-[#2A8E9E]">Step 2</span>
              <h3 className="mt-1 font-semibold text-lg">We Find the Errors</h3>
              <p className="mt-2 text-gray-600">
                Misclassified employees, double-counted payroll, ineligible
                subcontractor costs, and bad estimates can all inflate your bill. We
                identify what can be challenged.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-gray-100">
              <span className="text-sm font-bold text-[#2A8E9E]">Step 3</span>
              <h3 className="mt-1 font-semibold text-lg">We Help You Dispute & Plan</h3>
              <p className="mt-2 text-gray-600">
                We help you contest inaccurate charges with the right documentation and
                map out your options — including how to handle what you legitimately owe.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <a
              href="#help"
              style={{ backgroundColor: BRAND }}
              className="inline-block text-white font-semibold px-6 py-3 rounded-md hover:opacity-90"
            >
              Start My Free Review
            </a>
          </div>
        </div>
      </section>

      {/* NEARBY AREAS */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Serving {city.name} &amp; Surrounding {city.region}
          </h2>
          <p className="mt-3 text-gray-600">
            Local help with commercial insurance and premium audits for businesses in:
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {[city.name, ...city.nearby].map((place) => (
              <span
                key={place}
                className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full"
              >
                {place}
              </span>
            ))}
            <span className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full">
              & surrounding areas
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            {city.name} Insurance Audit FAQs
          </h2>
          <div className="space-y-4">
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                I just got a huge audit bill. Do I really have to pay all of it?
              </summary>
              <p className="mt-2 text-gray-600">
                Not necessarily. An audit bill is the insurer&apos;s calculation — and
                calculations can be wrong. If your business was misclassified, your
                payroll was overstated, or ineligible figures were included, those
                amounts can often be disputed and reduced. Before you pay a lump sum,
                have someone review exactly how the number was reached.
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                Do you help businesses in {city.name}?
              </summary>
              <p className="mt-2 text-gray-600">
                Yes. We work with business owners in {city.name}, {city.county}, and the
                surrounding {city.region} on workers&apos; compensation and general
                liability premium audits — reviewing, disputing, and reducing inflated
                bills.
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                Why didn&apos;t my agent warn me this was coming?
              </summary>
              <p className="mt-2 text-gray-600">
                Most commercial policies include an annual audit right in the contract,
                but it&apos;s often glossed over at sale. That&apos;s why so many owners
                feel blindsided. It doesn&apos;t mean you did anything wrong — it means
                you need someone in your corner now.
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                How much does your help cost?
              </summary>
              <p className="mt-2 text-gray-600">
                The initial review is free with no obligation. We&apos;ll look at your
                audit, explain what we see, and lay out your options. If we can help
                further, we&apos;ll be upfront about that before you commit to anything.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ backgroundColor: BRAND }} className="py-16 px-4 text-center text-white">
        <h2 className="text-3xl font-bold">
          {city.name}: Don&apos;t Pay That Audit Bill Until You Talk to Us
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-white/90">
          A few minutes today could save you thousands. Get your free, confidential
          audit review — no cost, no obligation.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="#help"
            className="inline-block bg-white font-semibold px-6 py-3 rounded-md hover:bg-gray-100"
            style={{ color: BRAND_DARK }}
          >
            Get My Free Audit Review
          </a>
          <a
            href={PHONE_HREF}
            onClick={trackCall}
            className="inline-flex justify-center items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10"
          >
            <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center text-sm">
          <img
            src="/BCIAS-Logo.png"
            alt="Birmingham Commercial Insurance Audit Solutions"
            className="h-10 w-auto mx-auto mb-4 brightness-0 invert opacity-90"
          />
          <p>
            <a href={PHONE_HREF} onClick={trackCall} className="font-semibold text-white hover:underline">
              {PHONE_DISPLAY}
            </a>
          </p>
          <p className="mt-2 max-w-2xl mx-auto text-gray-400">
            Helping {city.name} and {city.region} business owners understand, dispute,
            and resolve commercial insurance premium audits.
          </p>
          <p className="mt-4">
            <Link href="/" className="text-gray-300 hover:underline">
              ← Back to home
            </Link>
          </p>
          <p className="mt-4 text-gray-500">
            &copy; {new Date().getFullYear()} Birmingham Commercial Insurance Audit
            Solutions. All rights reserved. Not legal advice.
          </p>
        </div>
      </footer>

      {/* STICKY MOBILE BAR */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 grid grid-cols-2 gap-px">
        <a
          href={PHONE_HREF}
          onClick={trackCall}
          className="flex items-center justify-center gap-2 py-3 font-semibold text-gray-800"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href="#help"
          style={{ backgroundColor: BRAND }}
          className="flex items-center justify-center py-3 font-semibold text-white"
        >
          Get Free Review
        </a>
      </div>
      <div className="sm:hidden h-14" />
    </main>
  );
}
