import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
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
    default:
      "Commercial Real Estate Insurance Broker | Large Portfolios & Hard-to-Place Property",
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "A commercial real estate insurance broker for large accounts — multifamily, high-TIV portfolios, catastrophe property, and builders risk/OCIP. Alabama-based, placing deals nationwide. $50k+ premiums.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Commercial Real Estate Insurance Broker | Large Portfolios & Hard-to-Place Property",
    description:
      "Specialist brokerage for institutional real estate: multifamily, high-TIV master programs, catastrophe property, and OCIP/builders risk.",
    url: DOMAIN,
    siteName: BRAND_NAME,
    locale: "en_US",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
