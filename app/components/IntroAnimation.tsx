"use client";

import { useEffect, useState } from "react";

const INTRO_DURATION = 1800; // 인트로 화면이 자동으로 사라지기까지 걸리는 시간(ms)

type IntroAnimationProps = {
  onComplete: () => void;
};

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
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
    const id = setInterval(() => setIntroFrame((f) => f + 1), 40); // 25fps
    return () => clearInterval(id);
  }, []);

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
    const removeTimer = setTimeout(onComplete, INTRO_DURATION + 650);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, [introPlay, onComplete]);

  const handleSkipIntro = () => {
    setIntroLeaving(true);
    setTimeout(onComplete, 650);
  };

  return (
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
                fontFamily: "'HelveticaCustom', sans-serif",
                display: "inline-block",
                animation: introPlay
                  ? `doho-emphasis 550ms 540ms ease-out both`
                  : "none",
              }}
            >
              DOHO
            </div>
            <div
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/90 sm:text-sm"
              style={{ fontFamily: "'HelveticaCustom', sans-serif" }}
            >
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
  );
}