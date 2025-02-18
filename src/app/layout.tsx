import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreProvider } from "@/store/storeProvider";
import { ToastContainer } from 'react-toastify';
import LocalizeProvider from "@/components/localizeProvider";
import Header from "@/components/header";
import { WebVitals } from "@/components/webVitals";
import "./globals.css";

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
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="body"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitals />
          <LocalizeProvider>
            <StoreProvider>
              <Header />
              {children}
              <ToastContainer />
            </StoreProvider>
          </LocalizeProvider>
      </body>
    </html>
  );
}
