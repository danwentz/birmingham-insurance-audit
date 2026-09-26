import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms for using ACREInsure: licensing and where we place business, no coverage until bound, and educational content.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="September 25, 2026">
      <p>
        By using this website (acreinsure.com), you agree to these terms. If you don&apos;t agree,
        please don&apos;t use the site.
      </p>

      <h2>Who we are</h2>
      <p>
        ACREInsure is a marketing name used by Dan Wentz, a licensed insurance producer and risk
        consultant with USI Insurance Services LLC in Birmingham, Alabama. ACREInsure is not an
        insurance company or a separate insurance agency, and no insurance is sold, bound, or placed
        under this name. All insurance business is transacted through USI Insurance Services LLC.
      </p>

      <h2>Licensing and where we do business</h2>
      <p>
        We place business only through insurance producers who are properly licensed in each
        jurisdiction where we operate. Dan Wentz may not be licensed in every state mentioned on this
        site. When a property is located in a state where he isn&apos;t licensed, the business is
        handled by or with a producer licensed in that state, or we decline it.
      </p>
      <p>
        <strong>
          We do not solicit, negotiate, or place insurance for risks located in California.
        </strong>
      </p>
      <p>
        Nothing on this site is an offer to sell insurance, or a solicitation to buy it, in any
        jurisdiction where that would be unlawful.
      </p>

      <h2>No coverage until bound</h2>
      <p>
        Requesting a quote, submitting a form, or talking with us doesn&apos;t bind or change any
        insurance. All coverage is subject to underwriting and insurer approval. Coverage takes
        effect only when the insurer, or someone it authorizes, confirms it in writing. The terms of
        the policy actually issued control.
      </p>

      <h2>Educational content, not advice</h2>
      <p>
        Our guides, articles, and checklists are general information only. They aren&apos;t legal,
        tax, accounting, lending, or coverage advice, and they may not reflect the latest changes in
        law, lender requirements, or market conditions. Using this site doesn&apos;t create a
        producer–client relationship. That relationship begins only when we agree in writing to work
        on your account.
      </p>

      <h2>Calculators</h2>
      <p>
        Our calculators produce illustrative estimates based only on the numbers you enter. They
        aren&apos;t quotes, rate indications, or coverage recommendations, and you shouldn&apos;t
        make insurance, lending, or investment decisions based on them alone.
      </p>

      <h2>Surplus lines insurance</h2>
      <p>
        Some risks are placed with surplus lines (non-admitted) insurers. These insurers aren&apos;t
        licensed in Alabama, and their policies aren&apos;t protected by the Alabama Insurance
        Guaranty Association if the insurer becomes insolvent.
      </p>

      <h2>Your use of the site</h2>
      <p>
        Please send only accurate information, and don&apos;t misuse the site. That includes
        submitting spam, trying to get around our security, or scraping content in bulk.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The text, design, calculators, and graphics on this site belong to Dan Wentz or are used
        with permission. You may share links and quote brief excerpts with attribution. Please
        don&apos;t republish substantial portions without written permission. Other names and marks
        mentioned on the site belong to their owners.
      </p>

      <h2>Links to other sites</h2>
      <p>
        We link to other websites for reference. We don&apos;t control them and aren&apos;t
        responsible for their content or privacy practices.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The site and its content are provided &ldquo;as is.&rdquo; We work to keep them accurate, but
        we don&apos;t guarantee that they are complete, current, or error-free, or that the site
        will always be available.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent the law allows, neither Dan Wentz nor USI Insurance Services is liable
        for any indirect, incidental, or consequential damages arising from your use of this site or
        reliance on its content. This doesn&apos;t limit any duty owed to you under a written
        engagement or an insurance policy we place for you.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by Alabama law. Any dispute about them or this site will be decided
        in the state or federal courts located in Jefferson County, Alabama.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. If we do, we&apos;ll post the new version here and update the
        date at the top.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>. See also our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
