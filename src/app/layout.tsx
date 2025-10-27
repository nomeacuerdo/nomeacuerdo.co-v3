import type { Metadata } from "next";
import Script from 'next/script';
import { Geist_Mono, Monda, PT_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const monda = Monda({
  variable: "--font-monda",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  weight: "400",
  variable: "--font-pt-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nomeacuerdo.co",
  description: "Welcome! My name is Nicolás Arteaga :-)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" strategy="beforeInteractive" crossOrigin="anonymous"></Script>
      </head>
      <body
        className={`${monda.variable} ${ptSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
