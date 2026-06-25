import type { Metadata } from "next";
import Link from "next/link";
import ConversionTracker from "./ConversionTracker";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <ConversionTracker />
      <h1 className="text-3xl font-bold text-gray-900">Thank You — We Got It</h1>
      <p className="mt-4 max-w-md text-gray-700">
        Your request is in. A local advisor will review your audit situation and reach
        out — usually the same business day.
      </p>
      <p className="mt-2 max-w-md text-gray-600">
        If you&apos;d like help sooner, call us at{" "}
        <a href="tel:+12059994884" className="font-semibold text-[#1f6d79] hover:underline">
          (205) 999-4884
        </a>
        .
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-white font-semibold px-6 py-3 rounded-md"
        style={{ backgroundColor: "#2A8E9E" }}
      >
        Back to Home
      </Link>
    </main>
  );
}
