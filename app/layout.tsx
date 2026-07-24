import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dohoent.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "도호엔터테인먼트",
    template: "%s | 도호엔터테인먼트",
  },
  description: "영화 제공/제작/수입사 도호엔터테인먼트입니다.",
  openGraph: {
    title: "도호엔터테인먼트",
    description: "영화 제공/제작/수입사 도호엔터테인먼트입니다.",
    url: baseUrl,
    siteName: "도호엔터테인먼트",
    images: [`${baseUrl}/logo3.png`],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [`${baseUrl}/logo3.png`],
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "여기에_구글_인증코드_붙여넣기",
    other: {
      "naver-site-verification": ["여기에_네이버_인증코드_붙여넣기"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}