"use client";

export default function Contact() {
  const email = "jureumgyeol@gmail.com";
  const address = "서울특별시 종로구 인사동 194-4 하나로빌딩 507호";
  const mapSrc =
    "https://www.google.com/maps?q=" +
    encodeURIComponent(address) +
    "&output=embed";

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#141210] px-6 py-10 text-white md:px-10 md:py-16">
      <section className="flex flex-1 flex-col items-start justify-center gap-10 py-16">
        <div className="flex -translate-y-4 flex-col items-start gap-4 md:translate-y-0">
          <h1
            className="text-[5vw] font-extrabold uppercase leading-[1.1] tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'AritaDotum', sans-serif" }}
          >
            문의하기
          </h1>

          <a
            href={`mailto:${email}`}
            className="group flex items-center gap-3 text-base tracking-tight text-white/90 transition-colors hover:text-white sm:text-lg md:text-xl"
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            {email}
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="4" y1="12" x2="20" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            </span>
          </a>

          <p
            className="mt-2 max-w-xs text-sm leading-relaxed text-white/60"
            style={{ fontFamily: "'AritaDotum', sans-serif" }}
          >
            {address}
          </p>
        </div>

        <div className="h-64 w-full overflow-hidden rounded-sm border border-white/10 sm:h-80 md:h-[360px] md:w-[440px]">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="DOHO 위치"
          />
        </div>
      </section>
    </main>
  );
}