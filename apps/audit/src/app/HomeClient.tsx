"use client";

import { useState } from "react";
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
import { BRAND, BRAND_DARK, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { LeadForm, trackCall } from "@/components/LeadForm";
import Link from "next/link";
import { CITIES } from "@/lib/cities";

export default function HomeClient() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex flex-col scroll-smooth">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <img
            src="/BCIAS-Logo.png"
            alt="Birmingham Commercial Insurance Audit Solutions"
            className="h-10 w-auto"
          />
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
              style={{ backgroundColor: BRAND_DARK }}
              className="text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition active:scale-[0.98]"
            >
              Get Help
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-slate-50 pt-12 pb-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: message */}
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f6d79] bg-[#2A8E9E]/10 px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4" /> Serving Business Owners Across Alabama
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Got a Surprise Insurance Audit Bill? Don&apos;t Pay It Yet.
            </h1>
            <p className="mt-5 text-lg text-gray-700">
              Your workers&apos; comp or general liability policy got audited, and now
              the carrier says you owe thousands more than you planned for.{" "}
              <strong>Before you write that check, let somebody read the audit.</strong>{" "}
              A lot of these bills are built on the wrong class codes or payroll that
              got counted twice. We review them for Alabama business owners and help
              dispute the ones that are wrong.
            </p>

            <ul className="mt-6 space-y-2 text-gray-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#2A8E9E] mt-0.5 shrink-0" />
                An audit bill is the carrier&apos;s math. Math gets checked.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#2A8E9E] mt-0.5 shrink-0" />
                We explain what happened in plain English. No jargon, no judgment.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#2A8E9E] mt-0.5 shrink-0" />
                The review is free. If the bill is right, we&apos;ll tell you that too.
              </li>
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#help"
                style={{ backgroundColor: BRAND_DARK }}
                className="inline-flex justify-center items-center text-white font-semibold px-6 py-3 rounded-md hover:opacity-90 transition active:scale-[0.98]"
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

          {/* Right: form card */}
          <div id="help" className="bg-white rounded-xl shadow-lg shadow-slate-200/60 p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">
              Get a Free, Confidential Audit Review
            </h2>
            <p className="mt-1 text-gray-600 text-sm">
              Tell us what happened, and send the letter if you have it. We&apos;ll lay
              out your options at no cost.
            </p>
            <div className="mt-5">
              <LeadForm />
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
            <p className="mt-2 text-sm font-semibold text-gray-800">Same-Day Response</p>
            <p className="text-xs text-gray-500">Usually within one business day</p>
          </div>
          <div>
            <FileSearch className="h-6 w-6 mx-auto text-[#2A8E9E]" />
            <p className="mt-2 text-sm font-semibold text-gray-800">Free Audit Review</p>
            <p className="text-xs text-gray-500">No cost to have us look</p>
          </div>
          <div>
            <Scale className="h-6 w-6 mx-auto text-[#2A8E9E]" />
            <p className="mt-2 text-sm font-semibold text-gray-800">We Check the Math</p>
            <p className="text-xs text-gray-500">Class codes, payroll, subs</p>
          </div>
        </div>
      </section>

      {/* THE PROBLEM / EMPATHY */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <AlertTriangle className="h-8 w-8 mx-auto text-[#2A8E9E]" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            That &quot;Additional Premium Due&quot; Letter Is a Calculation, Not a Verdict
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Here&apos;s what actually happened. When your policy started, the premium
            was an estimate: your best guess at payroll, the carrier&apos;s guess at
            what your people do all day. The audit is where they true it up. It&apos;s
            also where things go sideways.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            We&apos;ve seen office managers rated as if they swing hammers. Sub costs
            charged as payroll because a certificate of insurance never made it into
            the file. Estimated audits that inflate payroll because a worksheet went
            unanswered. Every one of those makes the number bigger, and every one of
            them can be challenged.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            The class code piece alone is real money. Workers&apos; comp rates for
            carpentry work can run $15 or more per $100 of payroll in Alabama.
            Clerical staff rate closer to 15 cents. Put one $50,000 office salary in
            the wrong bucket and that line reads $7,500 instead of $75.
          </p>
          <p className="mt-4 text-lg font-semibold text-gray-800">
            So is your bill wrong? Maybe not. But you won&apos;t know until someone
            reads it.
          </p>
        </div>
      </section>

      {/* HOW WE HELP */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">How We Help You</h2>
          <p className="mt-2 text-gray-600">Three steps. No pressure at any of them.</p>
          <div className="mt-10 max-w-3xl mx-auto text-left divide-y divide-gray-200">
            <div className="flex gap-6 py-8 pt-0">
              <span className="text-4xl font-bold tabular-nums text-[#2A8E9E] w-10 shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-lg">Send Us the Letter</h3>
                <p className="mt-2 text-gray-600">
                  The audit statement, the worksheet, even a photo of the bill. We go
                  through it line by line and tell you what the carrier did: which
                  class codes they used, whose payroll they counted, and where the
                  number came from.
                </p>
              </div>
            </div>
            <div className="flex gap-6 py-8">
              <span className="text-4xl font-bold tabular-nums text-[#2A8E9E] w-10 shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-lg">We Look for the Usual Suspects</h3>
                <p className="mt-2 text-gray-600">
                  Misclassified employees. Payroll counted twice. Sub costs picked up
                  because a certificate of insurance was missing. Overtime charged at
                  full freight. After enough audits, the errors show up fast.
                </p>
              </div>
            </div>
            <div className="flex gap-6 py-8 pb-0">
              <span className="text-4xl font-bold tabular-nums text-[#2A8E9E] w-10 shrink-0">3</span>
              <div>
                <h3 className="font-semibold text-lg">You Dispute With Documentation</h3>
                <p className="mt-2 text-gray-600">
                  Carriers don&apos;t reverse an audit because you&apos;re upset. They
                  reverse it when you hand them corrected payroll records,
                  certificates, and the right class code argument. We help you build
                  that package, and we&apos;re straight with you about anything you
                  legitimately owe.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <a
              href="#help"
              style={{ backgroundColor: BRAND_DARK }}
              className="inline-block text-white font-semibold px-6 py-3 rounded-md hover:opacity-90 transition active:scale-[0.98]"
            >
              Start My Free Review
            </a>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Who We Help
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Contractors and the trades get audited hardest, because class codes and sub
            costs give an auditor the most room to get it wrong. We also work with
            staffing, trucking, manufacturing, and restaurant owners across Alabama
            facing:
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              "Workers' compensation premium audits",
              "General liability premium audits",
              "A large \"additional premium due\" bill after an audit",
              "An audit you didn't know was coming",
              "Charges you believe are wrong or unfair",
              "An audit estimate based on the wrong job classifications",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 py-1">
                <CheckCircle2 className="h-5 w-5 text-[#2A8E9E] mt-0.5 shrink-0" />
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            <details className="py-5">
              <summary className="font-semibold cursor-pointer">
                I just got a huge audit bill. Do I really have to pay all of it?
              </summary>
              <p className="mt-2 text-gray-600">
                Not necessarily. An audit bill is the carrier&apos;s calculation, and
                the inputs are wrong more often than you&apos;d think. Wrong class
                codes. Overstated payroll. Sub costs picked up as wages. Any of those
                can be disputed with the right records. Find out how they got the
                number before you pay it.
              </p>
            </details>

            <details className="py-5">
              <summary className="font-semibold cursor-pointer">
                What is a commercial insurance audit?
              </summary>
              <p className="mt-2 text-gray-600">
                At the end of your policy term, the carrier checks the real numbers
                behind your premium: payroll, sales, class codes, sometimes square
                footage. If the actuals came in higher than the estimate, you owe the
                difference. Lower, and they owe you. The catch is that the checking is
                done by a person on a deadline, and people on deadlines make mistakes.
              </p>
            </details>

            <details className="py-5">
              <summary className="font-semibold cursor-pointer">
                Why didn&apos;t my agent warn me this was coming?
              </summary>
              <p className="mt-2 text-gray-600">
                The audit clause sits in nearly every workers&apos; comp and general
                liability policy, but plenty of agents never walk their clients through
                it at sale. So the first time most owners hear the word
                &quot;audit&quot; is when the bill lands. That&apos;s not on you. It
                does mean you want someone reading the fine print now.
              </p>
            </details>

            <details className="py-5">
              <summary className="font-semibold cursor-pointer">
                Can an audit result actually be disputed?
              </summary>
              <p className="mt-2 text-gray-600">
                Yes. Carriers have dispute processes for exactly this. If the auditor
                used the wrong classification, counted payroll that shouldn&apos;t be
                there, or estimated your numbers instead of using real ones, you can
                challenge the result with corrected records. We help you figure out
                what to send and how to present it.
              </p>
            </details>

            <details className="py-5">
              <summary className="font-semibold cursor-pointer">
                How much does your help cost?
              </summary>
              <p className="mt-2 text-gray-600">
                The first review costs nothing and commits you to nothing. We read the
                audit, tell you what we see, and lay out the options. If there&apos;s
                more we can do from there, we&apos;ll price it plainly before you
                decide anything.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* AREAS WE SERVE (SEO + internal links) */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Insurance Audit Help Across Alabama
          </h2>
          <p className="mt-3 text-gray-600">
            We work with owners statewide, from the Shoals to the Wiregrass. Find your
            area:
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full hover:border-[#2A8E9E] hover:text-[#1f6d79] transition"
              >
                {city.name}
              </Link>
            ))}
            <span className="text-sm bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full">
              & surrounding areas
            </span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ backgroundColor: BRAND }} className="py-16 px-4 text-center text-white">
        <h2 className="text-3xl font-bold">Don&apos;t Pay That Audit Bill Until Someone Reads It</h2>
        <p className="mt-3 max-w-xl mx-auto text-white/90">
          Send the letter over. If the bill is right, we&apos;ll tell you, and
          you&apos;ve lost nothing. If it&apos;s wrong, you&apos;ll be glad you
          didn&apos;t pay it.
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
            Birmingham Commercial Insurance Audit Solutions helps Alabama business
            owners dispute inaccurate premium audit bills and settle the rest on fair
            terms.
          </p>
          <p className="mt-4 text-gray-500">
            &copy; {new Date().getFullYear()} Birmingham Commercial Insurance Audit
            Solutions. All rights reserved. Not legal advice.
          </p>
        </div>
      </footer>

      {/* STICKY MOBILE CALL/CTA BAR */}
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
          style={{ backgroundColor: BRAND_DARK }}
          className="flex items-center justify-center py-3 font-semibold text-white"
        >
          Get Free Review
        </a>
      </div>
      {/* spacer so sticky bar doesn't cover footer on mobile */}
      <div className="sm:hidden h-14" />

      {/* legacy modal (kept available) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Request Insurance Audit Help</h2>
            <LeadForm />
          </div>
        </div>
      )}
    </main>
  );
}
