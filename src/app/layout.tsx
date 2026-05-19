import type { Metadata, Viewport } from "next";
import { Anton, Outfit } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Budapest Boys Trip",
  description: "De officiële gids voor de Budapest boys trip 2026 🇭🇺",
  applicationName: "Budapest Boys Trip",
  appleWebApp: {
    capable: true,
    title: "Budapest",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: "Budapest Boys Trip",
    description: "De officiële gids voor de boys.",
    type: "website",
    locale: "nl_NL",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${anton.variable} ${outfit.variable} antialiased`}>
      <body className="bg-app text-ink min-h-dvh font-sans">
        <div className="fixed inset-x-0 top-0 z-[100] flex h-1 w-full">
          <span className="flex-1 bg-hu-red" />
          <span className="flex-1 bg-hu-white" />
          <span className="flex-1 bg-hu-green" />
        </div>

        <div className="mx-auto min-h-dvh max-w-[480px] relative">{children}</div>

        <div className="grain-overlay" aria-hidden="true" />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
