import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import ConversionTracker from "./ConversionTracker";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-midnight px-6 text-center text-champagne">
      <ConversionTracker />
      <h1 className="font-display text-4xl font-bold tracking-tight text-white">
        Thank you — request received
      </h1>
      <p className="mt-4 max-w-md text-lg text-slate">
        A specialist will review your account and reach out within one business day.
      </p>
      <p className="mt-2 text-slate">
        Need to talk sooner? Call{" "}
        <a href={PHONE_HREF} className="font-semibold text-gold hover:underline">
          {PHONE_DISPLAY}
        </a>
        .
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-sm bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-obsidian transition-colors hover:bg-gold-dark"
      >
        Back to home
      </Link>
    </main>
  );
}
