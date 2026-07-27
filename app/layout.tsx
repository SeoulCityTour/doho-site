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
    images: [`${baseUrl}/logo_m.png`],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [`${baseUrl}/logo_m.png`],
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "도호엔터테인먼트",
  legalName: "도호엔터테인먼트",
  url: baseUrl,
  logo: `${baseUrl}/logo_m.png`,
  foundingDate: "2021",
  founder: {
    "@type": "Person",
    name: "박도영",
  },
  description:
    "도호 엔터테인먼트는 2021년 설립되어 영화 제작, 투자 및 수입 등의 콘텐츠 사업과 종합보험대리점업을 진행하고 있습니다.",
  department: [
    {
      "@type": "Organization",
      name: "미디어 영화사업부",
      description: "영화 제작, 투자 및 수입",
    },
    {
      "@type": "Organization",
      name: "보험대리점 사업부",
      description: "종합보험대리점 (GA) 및 TPA",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}