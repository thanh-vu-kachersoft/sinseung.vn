import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const openSansCondensed = Open_Sans({
  weight: ["400", "700"],
  variable: "--font-open-sans-condensed",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Sinseung VIET NAM",
  description: "Sinseung VIET NAM - High Quality Precision Cutting Tools",
  openGraph: {
    title: "Sinseung VIET NAM",
    description: "Sinseung VIET NAM - High Quality Precision Cutting Tools",
    url: "https://sinseung.vn",
    siteName: "Sinseung VIET NAM",
    images: [
      {
        url: "https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/2026-04-24-10.29.25.jpg",
        width: 1200,
        height: 630,
        alt: "Sinseung VIET NAM Logo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${openSansCondensed.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="icon"
          href="https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/2026-04-24-10.29.25.jpg"
        />
      </head>
      <body
        className={`min-h-full flex flex-col bg-[var(--background)] ${poppins.className}`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
        </Providers>
      </body>
    </html>
  );
}
