"use client";

import { useState, useEffect } from "react";

type FilmSection2 = {
  image: string;
  label: string;
  heading: string[];
  cta: string;
  href: string;
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
      releaseYear: "2025.05.22.",
      genre: "멜로/로맨스",
      synopsis:
        "어느 날, 눈을 뜨자 우리가 사랑한 모든 시간이 사라졌다. 베스트셀러 작가 ‘리쿠’는 8년을 함께한 첫사랑 ‘미나미’와 모르는 사이가 되어버린 낯선 세계에서 깨어난다. 너였기에, 빛나던 우리의 세계. 너였기에, 난 사랑을 할 수 있었어... 잃고 싶지 않는 그녀를 다시 되찾기 위해 시간을 넘어 여기, 다시 시작되는 우리의 평행세계 로맨스",
    },
  },
];

const AUTO_SLIDE_INTERVAL = 3500;
const INTRO_DURATION = 1800; // 인트로 화면이 자동으로 사라지기까지 걸리는 시간(ms)

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [showIntro, setShowIntro] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [introFrame, setIntroFrame] = useState(0);
  const [introPlay, setIntroPlay] = useState(false);

  // 새로고침 시 히드레이션/이미지 디코딩이 한번에 몰려 메인 스레드가 멈칫하면
  // CSS 애니메이션(벽시계 기준)이 이미 지나가버려 순간이동처럼 보이는 문제 방지.
  // 브라우저가 한 번 그리고 안정된 다음 프레임에 애니메이션을 시작시킴.
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setIntroPlay(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, []);

  useEffect(() => {
    if (!showIntro) return;
    const id = setInterval(() => setIntroFrame((f) => f + 1), 40); // 25fps
    return () => clearInterval(id);
  }, [showIntro]);

  const formatTimecode = (frames: number) => {
    const totalSeconds = Math.floor(frames / 25);
    const ff = frames % 25;
    const mm = Math.floor(totalSeconds / 60);
    const ss = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `00:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
  };

  useEffect(() => {
    if (!introPlay) return;
    const leaveTimer = setTimeout(() => setIntroLeaving(true), INTRO_DURATION);
    const removeTimer = setTimeout(
      () => setShowIntro(false),
      INTRO_DURATION + 650
    );
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, [introPlay]);

  const handleSkipIntro = () => {
    setIntroLeaving(true);
    setTimeout(() => setShowIntro(false), 650);
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
      {showIntro && (
        <div
          onClick={handleSkipIntro}
          className={`fixed inset-0 z-[100] flex cursor-pointer flex-col bg-black text-white transition-all duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            introLeaving
              ? "pointer-events-none scale-105 opacity-0 blur-sm"
              : "scale-100 opacity-100 blur-0"
          }`}
        >
          {/* shutter flash - 찰칵 */}
          <div
            className="pointer-events-none absolute inset-0 bg-white"
            style={{
              opacity: 0,
              animation: introPlay
                ? `shutter-flash 350ms 240ms ease-out both`
                : "none",
            }}
          />

          {/* outer frame corners */}
          <div className="absolute left-4 top-4 h-14 w-14 border-l-2 border-t-2 border-white/70 sm:left-8 sm:top-8 sm:h-20 sm:w-20" />
          <div className="absolute right-4 top-4 h-14 w-14 border-r-2 border-t-2 border-white/70 sm:right-8 sm:top-8 sm:h-20 sm:w-20" />
          <div className="absolute bottom-4 left-4 h-14 w-14 border-b-2 border-l-2 border-white/70 sm:bottom-8 sm:left-8 sm:h-20 sm:w-20" />
          <div className="absolute bottom-4 right-4 h-14 w-14 border-b-2 border-r-2 border-white/70 sm:bottom-8 sm:right-8 sm:h-20 sm:w-20" />

          {/* top-left REC */}
          <div className="absolute left-8 top-8 flex items-center gap-2 sm:left-14 sm:top-12">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-600 sm:h-3 sm:w-3" />
            <span className="text-sm font-bold tracking-widest sm:text-base">
              REC
            </span>
          </div>

          {/* top-right HD / 4K / 25FPS / battery */}
          <div className="absolute right-8 top-8 flex items-center gap-2 text-[10px] font-bold tracking-wider sm:right-14 sm:top-12 sm:text-xs">
            <span className="border border-white/70 px-1.5 py-0.5">HD</span>
            <span className="border border-white/70 px-1.5 py-0.5">4K</span>
            <span>25FPS</span>
            <span className="ml-1 flex items-center gap-1">
              <span className="relative h-3 w-6 border border-white/70 sm:h-3.5 sm:w-7">
                <span className="absolute inset-y-[1.5px] left-[1.5px] right-[3px] bg-green-500" />
              </span>
              99%
            </span>
          </div>

          {/* center focus marker + logo */}
          <div className="relative flex flex-1 items-center justify-center">
            <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
              <div
                className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-white/70 sm:h-9 sm:w-9"
                style={{
                  opacity: 0,
                  animation: introPlay ? `bracket-snap 240ms ease-out both` : "none",
                }}
              />
              <div
                className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-white/70 sm:h-9 sm:w-9"
                style={{
                  opacity: 0,
                  animation: introPlay ? `bracket-snap 240ms ease-out both` : "none",
                }}
              />
              <div
                className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-white/70 sm:h-9 sm:w-9"
                style={{
                  opacity: 0,
                  animation: introPlay ? `bracket-snap 240ms ease-out both` : "none",
                }}
              />
              <div
                className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-white/70 sm:h-9 sm:w-9"
                style={{
                  opacity: 0,
                  animation: introPlay ? `bracket-snap 240ms ease-out both` : "none",
                }}
              />

              <span
                className="absolute text-xl font-light text-white/70 sm:text-2xl"
                style={{
                  animation: introPlay
                    ? `crosshair-snap 240ms ease-out forwards`
                    : "none",
                }}
              >
                +
              </span>

              <div
                className="relative flex flex-col items-center justify-center gap-2 px-4 text-center"
                style={{
                  opacity: 0,
                  animation: introPlay
                    ? `logo-snap 300ms 240ms cubic-bezier(0.22,1,0.36,1) both`
                    : "none",
                }}
              >
                <div
                  className="text-3xl font-extrabold tracking-[0.05em] text-white sm:text-4xl"
                  style={{
                    fontFamily: "'AritaDotum', sans-serif",
                    display: "inline-block",
                    animation: introPlay
                      ? `doho-emphasis 550ms 540ms ease-out both`
                      : "none",
                  }}
                >
                  DOHO
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/90 sm:text-sm">
                  Path to a Wider, Immersive World.
                </div>
              </div>
            </div>
          </div>

          {/* bottom timecode */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center sm:bottom-12">
            <span className="text-xs font-bold tabular-nums tracking-[0.2em] sm:text-sm">
              {formatTimecode(introFrame)}
            </span>
            <div className="mt-2 h-[2px] w-28 overflow-hidden bg-white/15 sm:w-32">
              <div
                className="h-full bg-white"
                style={{
                  width: introPlay ? undefined : "0%",
                  animation: introPlay
                    ? `intro-bar ${INTRO_DURATION}ms linear forwards`
                    : "none",
                }}
              />
            </div>
            <span className="mt-2 block text-[9px] tracking-[0.3em] text-white/40">
              CLICK TO SKIP
            </span>
          </div>

          {/* bottom-right menu */}
          <div className="absolute bottom-8 right-8 flex items-center gap-1.5 text-xs font-bold tracking-widest sm:bottom-12 sm:right-14">
            MENU
            <span className="flex flex-col gap-[3px]">
              <span className="block h-[2px] w-4 bg-white" />
              <span className="block h-[2px] w-4 bg-white" />
              <span className="block h-[2px] w-4 bg-white" />
            </span>
          </div>

          <style jsx>{`
            @keyframes intro-bar {
              from {
                width: 0%;
              }
              to {
                width: 100%;
              }
            }

            @keyframes shutter-flash {
              0% {
                opacity: 0;
              }
              12% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }

            @keyframes logo-snap {
              0% {
                transform: scale(1.25);
                opacity: 0;
              }
              55% {
                transform: scale(0.95);
                opacity: 1;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }

            @keyframes doho-emphasis {
              0% {
                transform: scale(1);
                text-shadow: 0 0 0 rgba(255, 255, 255, 0);
              }
              45% {
                transform: scale(1.16);
                text-shadow: 0 0 22px rgba(255, 255, 255, 0.9),
                  0 0 46px rgba(255, 255, 255, 0.45);
              }
              100% {
                transform: scale(1);
                text-shadow: 0 0 0 rgba(255, 255, 255, 0);
              }
            }

            @keyframes crosshair-snap {
              0% {
                opacity: 1;
                transform: scale(1);
              }
              70% {
                opacity: 1;
                transform: scale(1);
              }
              100% {
                opacity: 0;
                transform: scale(1.3);
              }
            }

            @keyframes bracket-snap {
              0% {
                transform: scale(1.6);
                opacity: 0;
              }
              60% {
                transform: scale(0.95);
                opacity: 1;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </div>
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
                  <span className="translate-y-[-0.6em] text-xs font-medium tracking-widest text-white/70 md:text-sm">
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
                      <span className="translate-y-[-0.4em] text-[10px] font-medium tracking-widest text-white/70">
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

            {(selectedFilm.section2.releaseYear ||
              selectedFilm.section2.genre ||
              selectedFilm.section2.runtime) && (
              <p className="mt-4 flex flex-wrap items-center gap-x-2 text-sm font-medium tracking-wide text-black/60 md:text-base">
                {[
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