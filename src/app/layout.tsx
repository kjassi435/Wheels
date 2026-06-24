import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Welcome on Wheels — Premium Mobile Food Carts & EV Solutions",
  description:
    "India's leading manufacturer of premium mobile food carts, food vans, electric vehicles, and kiosks. Crafted for entrepreneurs who refuse to settle.",
  keywords:
    "food carts, mobile carts, food vans, electric carts, kiosks, ice cream carts, Jaipur",
  openGraph: {
    title: "Welcome on Wheels — Premium Mobile Food Carts & EV Solutions",
    description: "Take your business anywhere with India's finest mobile business solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
