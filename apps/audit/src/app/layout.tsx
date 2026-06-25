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
      "Insurance Audit Help in Alabama | Dispute a Surprise Premium Audit Bill",
    template: "%s | Birmingham Commercial Insurance Audit Solutions",
  },
  description:
    "Hit with a surprise workers' comp or general liability audit bill in central or north Alabama? Get a free, confidential review. We help business owners dispute inaccurate charges and reduce what they owe. No cost, no obligation.",
  keywords: [
    "insurance audit help Alabama",
    "workers comp audit dispute",
    "commercial insurance audit Birmingham",
    "premium audit help",
    "general liability audit Alabama",
    "surprise insurance audit bill",
    "dispute insurance audit",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/ico-pre.ico",
  },
  openGraph: {
    title:
      "Surprise Insurance Audit Bill? Get Free Help in Central & North Alabama",
    description:
      "Don't pay an inflated audit bill until you talk to us. Free, confidential review for Alabama business owners. We help dispute and reduce premium audit charges.",
    url: SITE_URL,
    siteName: "Birmingham Commercial Insurance Audit Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Surprise Insurance Audit Bill? Get Free Help in Central & North Alabama",
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
