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
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <ConversionTracker />
      <h1 className="font-serif text-4xl font-semibold text-ink">Thank you — request received</h1>
      <p className="mt-4 max-w-md text-lg text-ink-soft">
        A specialist will review your account and reach out within one business day.
      </p>
      <p className="mt-2 text-ink-soft">
        Need to talk sooner? Call{" "}
        <a href={PHONE_HREF} className="font-semibold text-accent hover:underline">
          {PHONE_DISPLAY}
        </a>
        .
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
      >
        Back to home
      </Link>
    </main>
  );
}
