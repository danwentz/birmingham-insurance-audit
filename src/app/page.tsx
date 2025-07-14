import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Insurance Audit Help | Birmingham, AL",
  description:
    "Get expert help with your commercial insurance audit in Birmingham. Avoid overpaying and stay compliant.",
  openGraph: {
    title: "Insurance Audit Help | Birmingham, AL",
    description:
      "Get expert help with your commercial insurance audit in Birmingham.",
    url: "https://yourdomain.com",
    siteName: "Birmingham Commercial Insurance Audit Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <HomeClient />;
}
