"use client";

import { useState, useEffect } from "react";
import IntroAnimation from "./components/IntroAnimation";

type FilmSection2 = {
  image: string;
  label: string;
  heading: string[];
  cta: string;
  href: string;
  credit?: string;
  releaseYear?: string;
  genre?: string;
  runtime?: string;
  synopsis?: string;
};

type Film = {
  title: string;
  year: string;
  image: string;
  section2: FilmSection2;
};

const films: Film[] = [
  {
    title: "치악산",
    year: "제공/제작 2022",
    image: "/test_1.jpg",
    section2: {
      image: "/chiaksan.jpg",
      label: "",
      heading: ["치악산 Mount CHIAK"],
      cta: "PHOTO",
      href: "#",
      credit: "제공/제작",
      releaseYear: "2023",
      genre: "공포 미스터리",
      runtime: "85분",
      synopsis:
        "산악바이크 동아리 ‘산가자’의 리더 ‘민준’(윤균상)과 팀원들은 라이딩 영상을 촬영하기 위해 치악산으로 향한다. ‘민준’의 사촌 동생, ‘현지’(김예원) 아버지의 산장에 머물게 된 이들은 40년 전 ‘현지’ 아버지가 치악산에서 실종되었다는 사실을 알게 되고 그날 밤부터 팀원 ‘양배’(연제욱), ‘수아’(배그린), ‘이삭’(이태환)을 비롯한 모두에게 정체를 알 수 없는 기이한 일들이 벌어지는데 ……",
    },
  },
  {
    title: "돌핀보이",
    year: "수입 2022",
    image: "/test-2.jpg",
    section2: {
      image: "/dolphinboy.jpg",
      label: "",
      heading: ["돌핀보이 Dolphin Boy"],
      cta: "PHOTO",
      href: "#",
      credit: "수입",
      releaseYear: "2026.06.03.",
      genre: "애니메이션",
      synopsis:
        "“우린 함께일 때 가장 강해!” 돌고래 가족의 보살핌 속에 바다의 히어로로 성장한 ‘돌핀보이’. 어느 날, 극적으로 만난 아빠가 바다를 차지하려는 악당에게 납치당하는 사건이 발생한다. 돌핀보이는 단짝 친구인 돌고래 ‘스노우볼’, 반전 매력 상어 ‘샤키’ 등 바닷속 친구들과 함께 아빠를 구하고 바다를 지키기 위해 커다란 게 몬스터가 사는 괴물섬으로 환상적인 모험을 떠난다. 바다와 인간 세계를 넘나드는 가슴 벅찬 어드벤처가 펼쳐진다!",
    },
  },
  {
    title: "나를 모르는 그녀의 세계에서",
    year: "공동제공 2025",
    image: "/test-4.jpg",
    section2: {
      image: "/unknown-world.jpg",
      label: "",
      heading: ["나를 모르는 그녀의 세계에서 My Beloved Stranger"],
      cta: "PHOTO",
      href: "#",
      credit: "공동제공",
      releaseYear: "2025.05.22.",
      genre: "멜로/로맨스",
      synopsis:
        "어느 날, 눈을 뜨자 우리가 사랑한 모든 시간이 사라졌다. 베스트셀러 작가 ‘리쿠’는 8년을 함께한 첫사랑 ‘미나미’와 모르는 사이가 되어버린 낯선 세계에서 깨어난다. 너였기에, 빛나던 우리의 세계. 너였기에, 난 사랑을 할 수 있었어... 잃고 싶지 않는 그녀를 다시 되찾기 위해 시간을 넘어 여기, 다시 시작되는 우리의 평행세계 로맨스",
    },
  },
];

const AUTO_SLIDE_INTERVAL = 3500;

// 브라우저 메모리에만 존재하는 변수라서, 진짜 새로고침(F5)을 하면 자바스크립트가
// 처음부터 다시 로드되며 자동으로 false로 초기화됨.
// 반면 "Works" 클릭처럼 사이트 내에서 페이지만 이동하는 경우(리액트 클라이언트
// 라우팅)에는 자바스크립트가 다시 로드되지 않으므로 이 값이 그대로 유지되어
// 인트로가 다시 뜨지 않음.
let introShownThisLoad = false;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [showIntro, setShowIntro] = useState(false);
  const [introChecked, setIntroChecked] = useState(false);

  useEffect(() => {
    if (!introShownThisLoad) {
      setShowIntro(true);
    }
    setIntroChecked(true);
  }, []);

  const handleIntroComplete = () => {
    introShownThisLoad = true;
    setShowIntro(false);
  };

  useEffect(() => {
    if (hoverIndex !== null) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % films.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [hoverIndex]);

  const displayIndex = hoverIndex ?? activeIndex;
  const displayImage = films[displayIndex].image;
  const selectedFilm = films[selectedIndex];

  const goToFilm = (index: number) => {
    setSelectedIndex(index);
    setActiveIndex(index);
  };

  const goToFilmAndScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    e.preventDefault();
    goToFilm(index);
    document.getElementById("shop-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full">
      {introChecked && showIntro && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      <section className="relative flex w-full flex-col justify-between overflow-hidden bg-[#141210] text-white md:h-screen">
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            background:
              "radial-gradient(120% 90% at 30% 20%, #3a332c 0%, #201c18 45%, #0f0d0b 100%)",
          }}
        />

        {/* ===================== 데스크탑 / 태블릿 (md 이상) =====================
            기존 방식 그대로: 사진이 화면을 꽉 채우고(object-cover),
            제목 리스트는 화면 하단에 고정되어 사진 위에 얹힘. */}
        <div className="pointer-events-none absolute inset-0 hidden transition-opacity duration-500 ease-out md:block">
          <img
            key={displayImage}
            src={displayImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] hidden h-[45%] bg-gradient-to-t from-black/70 via-black/25 to-transparent md:block" />

        <section className="relative z-10 mt-auto hidden px-6 pb-16 md:block md:px-10 md:pb-20">
          <ul className="flex flex-col gap-2 md:gap-3">
            {films.map((film, index) => {
              const isActive = displayIndex === index;
              return (
                <li
                  key={film.title}
                  className={`group flex items-baseline gap-3 leading-none transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <a
                    href="#"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={(e) => goToFilmAndScroll(e, index)}
                    className="font-semibold text-5xl tracking-tight hover:opacity-70 md:text-6xl"
                    style={{ fontFamily: "'AritaDotum', sans-serif" }}
                  >
                    {film.title}
                  </a>
                  <span
                    className="translate-y-[-0.6em] text-xs font-medium tracking-widest text-white/70 md:text-sm"
                    style={{ fontFamily: "'AritaDotum', sans-serif" }}
                  >
                    {film.year}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* 진행 인디케이터 */}
          <div className="mt-6 flex w-full max-w-[280px] items-center gap-2 md:mt-8">
            {films.map((film, index) => {
              const isActive = displayIndex === index;
              return (
                <button
                  key={film.title}
                  type="button"
                  onClick={() => goToFilm(index)}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  aria-label={film.title}
                  className="group relative h-4 flex-1"
                >
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-white/25 transition-colors duration-300" />
                  <span
                    className={`absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </section>

        {/* ===================== 모바일 (md 미만) =====================
            사진마다 원본 비율이 달라서 h-auto로 두면 슬라이드가 바뀔 때마다
            섹션 높이가 흔들리고, 사진이 짧을 땐 텍스트가 헤더 쪽까지
            침범하는 문제가 생김. 그래서 고정 비율(aspect-ratio) + object-cover로
            바꿔 어떤 사진이 와도 항상 같은 높이 = 항상 텍스트 공간 확보되게 함. */}
        <div className="relative w-full pt-16 md:hidden">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              key={`${displayImage}-mobile`}
              src={displayImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* 사진 하단부에만 걸리는 그라데이션 (텍스트 가독성용) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 px-4 pb-5">
              <ul className="flex flex-col gap-1.5">
                {films.map((film, index) => {
                  const isActive = displayIndex === index;
                  return (
                    <li
                      key={film.title}
                      className={`flex items-baseline gap-2 leading-none transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      <a
                        href="#"
                        onClick={(e) => goToFilmAndScroll(e, index)}
                        className="text-2xl font-semibold tracking-tight active:opacity-70"
                        style={{ fontFamily: "'AritaDotum', sans-serif" }}
                      >
                        {film.title}
                      </a>
                      <span
                        className="translate-y-[-0.4em] text-[10px] font-medium tracking-widest text-white/70"
                        style={{ fontFamily: "'AritaDotum', sans-serif" }}
                      >
                        {film.year}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* 진행 인디케이터 (모바일용, 작은 사이즈) */}
              <div className="mt-3 flex w-full max-w-[220px] items-center gap-1.5">
                {films.map((film, index) => {
                  const isActive = displayIndex === index;
                  return (
                    <button
                      key={film.title}
                      type="button"
                      onClick={() => goToFilm(index)}
                      aria-label={film.title}
                      className="group relative h-3 flex-1"
                    >
                      <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-white/25 transition-colors duration-300" />
                      <span
                        className={`absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-10 hidden animate-bounce md:block md:bottom-8 md:right-10">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="12" y1="4" x2="12" y2="20" />
            <polyline points="6 14 12 20 18 14" />
          </svg>
        </div>
      </section>

      <section id="shop-section" className="flex h-screen w-full flex-col bg-white text-black md:flex-row">
        <div className="relative h-1/2 w-full bg-[#eeeeee] md:h-full md:w-1/2">
          <div className="absolute inset-0 p-6 md:p-10">
            <img
              key={selectedFilm.section2.image}
              src={selectedFilm.section2.image}
              alt={selectedFilm.title}
              className="h-full w-full object-contain transition-opacity duration-500 ease-out"
            />
          </div>
        </div>

        <div
          className="flex h-1/2 w-full flex-col justify-between overflow-y-auto px-6 py-10 md:h-full md:w-1/2 md:px-16 md:py-16"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          <div>
            {selectedFilm.section2.label && (
              <p className="mb-4 text-xs font-bold tracking-[0.2em] text-black/50 md:mb-6">
                {selectedFilm.section2.label}
              </p>
            )}

            <h2
              className="text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
              style={{ fontFamily: "'AritaDotum', sans-serif" }}
            >
              {selectedFilm.section2.heading.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>

            {(selectedFilm.section2.credit ||
              selectedFilm.section2.releaseYear ||
              selectedFilm.section2.genre ||
              selectedFilm.section2.runtime) && (
              <p className="mt-4 flex flex-wrap items-center gap-x-2 text-sm font-medium tracking-wide text-black/60 md:text-base">
                {[
                  selectedFilm.section2.credit,
                  selectedFilm.section2.releaseYear,
                  selectedFilm.section2.genre,
                  selectedFilm.section2.runtime,
                ]
                  .filter(Boolean)
                  .map((value, i, arr) => (
                    <span key={value} className="flex items-center gap-x-2">
                      <span style={{ fontFamily: "'AritaDotum', sans-serif" }}>
                        {value}
                      </span>
                      {i < arr.length - 1 && <span>·</span>}
                    </span>
                  ))}
              </p>
            )}

            {selectedFilm.section2.synopsis && (
              <p
                className="mt-5 max-w-prose text-sm leading-relaxed text-black/80 md:mt-6 md:text-[15px]"
                style={{ fontFamily: "'AritaDotum', sans-serif" }}
              >
                {selectedFilm.section2.synopsis}
              </p>
            )}
          </div>

          <a
            href={selectedFilm.section2.href}
            className="group mt-8 flex items-center gap-4 text-sm font-bold tracking-widest"
            style={{ fontFamily: "'HelveticaCustom', sans-serif" }}
          >
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="4" y1="12" x2="20" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            </span>
            {selectedFilm.section2.cta}
          </a>
        </div>
      </section>
    </main>
  );
}