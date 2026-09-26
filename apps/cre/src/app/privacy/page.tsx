import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { PHONE_DISPLAY, PHONE_HREF, PRIVACY_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ACREInsure collects, uses, retains, and protects information. We don't sell or share your information.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="September 25, 2026">
      <h2>Who we are</h2>
      <p>
        This website (acreinsure.com, &ldquo;ACREInsure&rdquo;) is operated by Dan Wentz, a licensed
        insurance producer and risk consultant with USI Insurance Services LLC in Birmingham,
        Alabama. ACREInsure is a marketing name, not a separate company. In this policy,
        &ldquo;we&rdquo; and &ldquo;us&rdquo; mean Dan Wentz.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>We don&apos;t sell your information, and we don&apos;t share it for advertising.</li>
        <li>
          We use what you send us only to evaluate your request and, if you want us to, place
          insurance in jurisdictions where we&apos;re properly licensed.
        </li>
        <li>
          We don&apos;t pass your information to other agents, lead buyers, or marketers.
        </li>
        <li>You can ask us to delete your information at any time.</li>
      </ul>

      <h2>What we collect</h2>
      <p>
        <strong>Information you give us.</strong> When you request a quote, we collect your name,
        company, work email, phone number, asset type, premium range, and anything you type in the
        details box.
      </p>
      <p>
        <strong>Please don&apos;t send sensitive information through the website.</strong> That
        includes Social Security numbers, bank or payment details, and loss runs. If we need
        documents, we&apos;ll arrange a secure way to send them.
      </p>
      <p>
        <strong>Information collected automatically.</strong> Like most websites, this one records
        basic technical information:
      </p>
      <ul>
        <li>
          <strong>Google Analytics</strong> records the pages you visit, your approximate location,
          your device and browser type, the site that referred you, and the full page address.
        </li>
        <li>
          <strong>Our calculators</strong> run in your browser, and we don&apos;t store what you
          enter on our servers. Your inputs do appear in the page address so results can be shared,
          which means Google Analytics may record them.
        </li>
        <li>
          <strong>Cloudflare Turnstile</strong> checks browser and device signals, including your IP
          address, to block spam on our quote form.
        </li>
        <li>
          <strong>Our hosting provider</strong> keeps standard server logs, such as IP address and
          request time, for security and reliability.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your request and follow up about it.</li>
        <li>
          To evaluate and place insurance for you, only in jurisdictions where we&apos;re properly
          licensed.
        </li>
        <li>To understand how the site is used and improve it.</li>
        <li>To prevent spam and abuse.</li>
        <li>To meet legal, regulatory, and record-keeping obligations.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We don&apos;t sell personal information, and we don&apos;t share it for cross-context
        behavioral advertising. Your information is shared only as needed for these purposes:
      </p>
      <ul>
        <li>
          <strong>USI Insurance Services</strong>, the agency through which any insurance is placed.
          USI handles client information under its own privacy notice.
        </li>
        <li>
          <strong>Insurance companies and wholesale brokers</strong>, only when you ask us to market
          your account, and only the information they need to quote it.
        </li>
        <li>
          <strong>Service providers</strong> that host this site, store form submissions, provide
          analytics, and block spam. They may use the information only to provide those services
          to us.
        </li>
        <li>
          <strong>Regulators, courts, or law enforcement</strong>, when the law requires it.
        </li>
      </ul>

      <h2>How long we keep it</h2>
      <ul>
        <li>
          <strong>Inquiries that don&apos;t become clients:</strong> deleted within 24 months of our
          last contact with you, or sooner if you ask.
        </li>
        <li>
          <strong>Clients and placed business:</strong> kept as long as state insurance
          record-keeping laws and USI&apos;s record-retention policies require.
        </li>
        <li>
          <strong>Analytics data:</strong> kept no longer than 14 months.
        </li>
        <li>
          <strong>Security and server logs:</strong> kept for short periods, then deleted.
        </li>
      </ul>

      <h2>How we protect it</h2>
      <p>
        The site runs over encrypted HTTPS. Access to form submissions is limited to Dan Wentz and
        the service providers named above. No system is perfectly secure. If a breach affects your
        personal information, we&apos;ll notify you as the Alabama Data Breach Notification Act and
        other applicable laws require.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can ask us to show you, correct, or delete the information we hold about you, or to stop
        contacting you. If we email you, every email includes a way to unsubscribe. To opt out of
        Google Analytics on any website, you can use{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">
          Google&apos;s opt-out browser add-on
        </a>
        .
      </p>
      <p>
        <strong>California and other state residents.</strong> Depending on where you live, state
        privacy laws may give you the right to know what personal information we collect and how we
        use it, to delete or correct it, and to opt out of its sale or sharing. We don&apos;t sell or
        share personal information, and we treat a Global Privacy Control browser signal as an
        opt-out request. We won&apos;t treat you differently for using any of these rights. We may
        need to confirm your identity before acting on a request, and you may use an authorized
        agent to make one.
      </p>

      <h2>Children</h2>
      <p>
        This site is for business owners and professionals. It isn&apos;t directed to children under
        16, and we don&apos;t knowingly collect their information.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we&apos;ll post the new version here and update the date at the
        top.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy requests or questions, email{" "}
        <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> or call{" "}
        <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>. See also
        our <Link href="/terms">Terms of Use</Link>.
      </p>
    </LegalPage>
  );
}
