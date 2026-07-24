import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-16 bg-white px-6 py-16 text-black md:gap-24 md:px-10 md:py-24">
      <div>
        <div className="mb-4 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="relative h-12 w-40 sm:h-14 sm:w-48 md:h-20 md:w-56">
            <Image
              src="/logo3.png"
              alt="도호 엔터테인먼트"
              fill
              sizes="(max-width: 768px) 160px, 224px"
              className="object-contain object-left"
            />
          </div>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 md:gap-x-10">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-black/60 transition-colors hover:text-black"
                  style={{
                    fontFamily:
                      "'HelveticaCustom', Helvetica, Arial, sans-serif",
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
            이 사이트는 아리따 돋움(AritaDotum), Helvetica 폰트를 사용하고 있습니다.
          </span>
        </div>
      </div>
    </footer>
  );
}