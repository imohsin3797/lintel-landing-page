import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lintel | AI-Powered Construction Document Analysis",
  description:
    "AI-powered risk detection for construction documents. Lintel scans drawings, specs, and schedules to catch contradictions and compliance risks before they hit the field.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <a
          href="https://slides.trylintel.com"
          aria-label="Open Lintel pitch slides"
          className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5b731] shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5b731]"
        >
          <span className="rounded-lg bg-[#1a2238] p-1">
            <Image
              src="/Lintel_Logo.png"
              alt="Lintel logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </span>
        </a>
      </body>
    </html>
  );
}
