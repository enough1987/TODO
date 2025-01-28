import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreProvider } from "@/store/storeProvider";

import "./globals.css";
import LocalizeProvider from "@/components/localizeProvider";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "TODO app",
  description: "TODO app with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="body"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocalizeProvider>
          <StoreProvider>
            <Header />
            {children}
          </StoreProvider>
        </LocalizeProvider>
      </body>
    </html>
  );
}
