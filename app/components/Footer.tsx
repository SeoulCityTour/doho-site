import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-16 bg-white px-6 py-16 text-black md:gap-24 md:px-10 md:py-24">
      <div>
        <div className="mb-4 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="relative h-16 w-auto">
            <Image
              src="/logo3.png"
              alt="도호 엔터테인먼트"
              width={224}
              height={80}
              className="h-full w-auto object-contain"
            />
          </div>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 md:gap-x-10">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm tracking-wide text-black/60 transition-colors hover:text-black"
                  style={{
                    fontFamily: "'AritaSansLTN', Helvetica, Arial, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 h-px w-full bg-black/15" />

        <div className="flex flex-col gap-2 text-xs tracking-widest text-black/40">
          <span>© 2026 (주)도호엔터테인먼트</span>
          <span
            className="text-[10px] tracking-normal text-black/30"
            style={{ fontFamily: "'AritaDotum', sans-serif" }}
          >
            이 제작물은 아모레퍼시픽의 아리따글꼴을 사용하여 디자인 되었습니다.
          </span>
        </div>
      </div>
    </footer>
  );
}