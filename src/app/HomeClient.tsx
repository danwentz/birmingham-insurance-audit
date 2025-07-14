"use client";

import { useState } from "react";

export default function HomeClient() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex flex-col">

      {/* HERO */}
      <section className="bg-slate-50 py-20 px-4 text-center">
        <img
  src="/BCIAS-Logo.png"
  alt="Birmingham Commercial Insurance Audit Solutions Logo"
  className="mx-auto mt-4 mb-4 w-50" />
    
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Surprised by an Insurance Audit?
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
          Get expert help to avoid overpaying and stay compliant — serving
          Birmingham businesses with trusted guidance.
        </p>

        <button
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: "#2A8E9E" }}
          className="mt-8 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Get Help
        </button>
      </section>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50" style={{ backgroundColor: "#F1F5F9" }}>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Request Insurance Audit Help</h2>
            <form
              action="https://formsubmit.co/88e98acda98937d69e8fea30fa6274a4"
              method="POST"
              className="space-y-3"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="border rounded px-4 py-2 w-full"
              />
              <input
                type="text"
                name="business"
                placeholder="Business Name"
                required
                className="border rounded px-4 py-2 w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="border rounded px-4 py-2 w-full"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                required
                className="border rounded px-4 py-2 w-full"
              />  <textarea rows={5}
              name="Problem"
              placeholder="How can we help you?"
              required
              className="border rounded px-4 py-2 w-full"
            />
              <button
              style={{ backgroundColor: "#2A8E9E" }}
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FEATURES */}
      <section className="py-20 bg-white px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">How We Help</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-slate-50 p-6 rounded shadow">
            <h3 className="font-semibold">Free Consultation</h3>
            <p className="mt-2 text-gray-600">
              We review your audit at no cost.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded shadow">
            <h3 className="font-semibold">Local Expertise</h3>
            <p className="mt-2 text-gray-600">
              Serving Birmingham businesses.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded shadow">
            <h3 className="font-semibold">Dispute Guidance</h3>
            <p className="mt-2 text-gray-600">
              We help you contest inaccurate charges.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-100 py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <details className="border rounded p-4 bg-white">
            <summary className="font-semibold cursor-pointer">
              What is a commercial insurance audit?
            </summary>
            <p className="mt-2 text-gray-600">
              A commercial insurance audit is a review by your insurer to
              verify that the information used to calculate your premium —
              such as payroll, sales, or square footage — is accurate. If your
              actual figures are higher than estimated, you may owe additional
              premium. If they’re lower, you might get a refund.
            </p>
          </details>

          <details className="border rounded p-4 bg-white">
            <summary className="font-semibold cursor-pointer">
              Why do businesses get surprise audits?
            </summary>
            <p className="mt-2 text-gray-600">
              Businesses often call audits “surprise” because they’re not
              expecting them, but most commercial policies include an annual
              audit in the contract. If your insurer doesn’t have up‑to‑date
              records, they’ll initiate an audit to reconcile estimates with
              actual figures.
            </p>
          </details>

          <details className="border rounded p-4 bg-white">
            <summary className="font-semibold cursor-pointer">
              How can Birmingham businesses prepare?
            </summary>
            <p className="mt-2 text-gray-600">
              ✅ Keep accurate payroll and sales records throughout the year.{" "}
              <br />
              ✅ Understand what your policy includes and what counts toward
              premium. <br />
              ✅ Set aside funds in case your audit reveals additional premium
              is owed. <br />
              ✅ Work with a local advisor who can guide you before and during
              the audit.
            </p>
          </details>

          <details className="border rounded p-4 bg-white">
            <summary className="font-semibold cursor-pointer">
              Can you negotiate an audit outcome?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes — to an extent. If errors are found in how your insurer
              classified your business, calculated your payroll, or included
              ineligible figures, you can dispute or appeal the audit results.
              A knowledgeable advisor can help you review the auditor’s
              findings and present corrections or supporting documentation.
            </p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className=" py-16 text-center">
        <h2 className="text-3xl font-bold">Ready to Resolve Your Audit?</h2>
        <p className="mt-2">Talk to a local expert today — no obligation.</p>
        <button
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: "#2A8E9E" }}
          className="mt-4 inline-block text-white px-6 py-3 rounded hover:bg-gray-100"
        >
          Get Started
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#2A8E9E" }} className=" text-white py-8 text-center text-sm">
        
        &copy; {new Date().getFullYear()} Birmingham Commercial Insurance Audit Solutions. All rights
        reserved.
      </footer>
    </main>
  );
}
