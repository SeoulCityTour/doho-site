"use client";

export default function About() {
  return (
    <main className="flex min-h-screen w-full flex-col justify-center bg-[#141210] px-6 py-10 text-white md:px-10 md:py-16">
      <section className="flex max-w-2xl flex-col items-start gap-6">

        <h1
          className="text-[7vw] font-extrabold uppercase leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ fontFamily: "'AritaDotum', sans-serif" }}
        >
          회사소개
        </h1>

        <p
          className="max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
          style={{ fontFamily: "'AritaDotum', sans-serif" }}
        >
          도호 엔터테인먼트는 2021년 설립되어 영화제작, 투자, 수입업 등을
          하고 있습니다.
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              설립일
            </p>
            <p
              className="mt-2 text-xl font-bold tracking-tight sm:text-2xl"
              style={{ fontFamily: "'AritaDotum', sans-serif" }}
            >
              2021년
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              대표자
            </p>
            <p
              className="mt-2 text-xl font-bold tracking-tight sm:text-2xl"
              style={{ fontFamily: "'AritaDotum', sans-serif" }}
            >
              박도영
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}