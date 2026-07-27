"use client";

export default function About() {
  const businessUnits = [
    {
      label: "미디어 영화사업부",
      detail: "영화 제작, 투자 및 수입",
    },
    {
      label: "보험대리점 사업부",
      detail: "종합보험대리점 (GA) 및 TPA",
    },
  ];

  return (
    <main className="flex min-h-screen w-full flex-col justify-center bg-[#141210] px-6 py-10 text-white md:px-10 md:py-16">
      <section className="flex max-w-2xl flex-col items-start gap-6">

        <h1
          className="text-3xl uppercase leading-[1.1] tracking-tight sm:text-4xl md:text-[2.75rem] lg:text-5xl"
          style={{ fontFamily: "'AritaDotumKR', sans-serif", fontWeight: 500 }}
        >
          회사 소개
        </h1>

        <p
          className="max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
          style={{ fontFamily: "'AritaBuriKR', sans-serif", fontWeight: 300 }}
        >
          도호 엔터테인먼트는 2021년 설립되어 영화 제작, 투자 및 수입 등의
          <br />
          콘텐츠 사업과 종합보험대리점업을 진행하고 있습니다.
        </p>

        <div className="mt-2 flex flex-col gap-3">
          {businessUnits.map((unit) => (
            <p
              key={unit.label}
              className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base"
              style={{ fontFamily: "'AritaBuriKR', sans-serif", fontWeight: 300 }}
            >
              <span
                className="text-white"
                style={{ fontWeight: 500 }}
              >
                {unit.label}
              </span>
              <span className="mx-2 text-white/30">l</span>
              {unit.detail}
            </p>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              설립일
            </p>
            <p
              className="mt-2 text-xl tracking-tight sm:text-2xl"
              style={{ fontFamily: "'AritaBuriKR', sans-serif", fontWeight: 300 }}
            >
              2021년
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              대표자
            </p>
            <p
              className="mt-2 text-xl tracking-tight sm:text-2xl"
              style={{ fontFamily: "'AritaBuriKR', sans-serif", fontWeight: 300 }}
            >
              박도영
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}