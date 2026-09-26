import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import PhoneClickTracker from "@/components/PhoneClickTracker";
import FirstTouchTracker from "@/components/FirstTouchTracker";
import { BRAND_NAME, DOMAIN, GA_ID } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dmmono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: "Commercial Real Estate Insurance Broker | ACREInsure",
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Broker for large CRE accounts: multifamily, high-TIV portfolios, coastal CAT property, and builders risk/OCIP. Based in Birmingham, Alabama. $50k+ premiums.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Commercial Real Estate Insurance Broker | ACREInsure",
    description:
      "Broker for large CRE accounts: multifamily, high-TIV portfolios, coastal CAT property, and builders risk/OCIP. Based in Birmingham, Alabama. $50k+ premiums.",
    url: DOMAIN,
    siteName: BRAND_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Real Estate Insurance Broker | ACREInsure",
    description:
      "Broker for large CRE accounts: multifamily, high-TIV portfolios, coastal CAT property, and builders risk/OCIP. Based in Birmingham, Alabama. $50k+ premiums.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} font-body`}>
        {GA_ID && !GA_ID.includes("X") && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <PhoneClickTracker />
        <FirstTouchTracker />
        {children}
      </body>
    </html>
  );
}
