import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.birminghaminsuranceaudit.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Insurance Audit Help in Alabama | Dispute a Workers' Comp Audit Bill",
    template: "%s | Birmingham Commercial Insurance Audit Solutions",
  },
  description:
    "Surprise workers' comp or general liability audit bill? Get a free review before you pay it. Wrong class codes and double-counted payroll inflate audit bills. Licensed, Alabama-based.",
  keywords: [
    "insurance audit help Alabama",
    "workers comp audit dispute",
    "dispute workers comp audit Alabama",
    "commercial insurance audit Birmingham",
    "premium audit help",
    "general liability audit Alabama",
    "surprise insurance audit bill",
    "workers comp class code error",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/ico-pre.ico",
  },
  openGraph: {
    title:
      "Surprise Insurance Audit Bill? Get a Free Review Before You Pay It",
    description:
      "An audit bill is the carrier's math, and math gets checked. Free, confidential review for Alabama business owners facing a workers' comp or GL premium audit.",
    url: SITE_URL,
    siteName: "Birmingham Commercial Insurance Audit Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Surprise Insurance Audit Bill? Get a Free Review Before You Pay It",
    description:
      "Free, confidential review for Alabama business owners facing a workers' comp or general liability premium audit.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-767L7J1KT0"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-767L7J1KT0');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
