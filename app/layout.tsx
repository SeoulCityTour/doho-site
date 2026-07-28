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
  description:
    "영화 제작·투자·수입 전문 콘텐츠 기업 도호엔터테인먼트. 치악산, 돌핀보이 등을 제작·제공했습니다.",
  openGraph: {
    title: "도호엔터테인먼트",
    description:
      "영화 제작·투자·수입 전문 콘텐츠 기업 도호엔터테인먼트. 치악산, 돌핀보이 등을 제작·제공했습니다.",
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
  // icons 필드는 삭제했습니다.
  // app/favicon.ico 파일이 있으면 Next.js가 자동으로 <link rel="icon"> 태그를 생성해줍니다.
  // 여기서 다시 선언하면 중복 태그가 생겨 구글봇이 대표 파비콘을 혼동할 수 있어요.
  // 더 큰 사이즈(192x192, 512x512)를 추가하고 싶으면 app/icon.png 파일을 추가하세요.
  // 그러면 Next.js가 그것도 자동으로 인식해서 처리해줍니다.
  verification: {
    google: "slVdoUcubm5rSjqGiff9XOo03hHR3pYUMC1kxBoCrhI",
    other: {
      "naver-site-verification": ["50bb6c72b4fe16a39e882a776454c7a9495fbefb"],
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