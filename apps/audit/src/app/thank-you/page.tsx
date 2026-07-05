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
      <h1 className="text-3xl font-bold text-gray-900">Got It. Your Request Is In.</h1>
      <p className="mt-4 max-w-md text-gray-700">
        A local advisor will read through what you sent and reach out, usually the
        same business day. Have the audit letter handy when we talk.
      </p>
      <p className="mt-2 max-w-md text-gray-600">
        If it&apos;s urgent, call us now at{" "}
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
