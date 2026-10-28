"use client";

import { useEffect, useRef, useState } from "react";

// 백남준 CRT 설치작품 오마주 인트로
// 1.33:1 / 1.85:1 / 2.35:1 세 개의 화면비 프레임이 흩어져 쌓여 있다가
// 하나의 2.35:1 시네마스코프 프레임으로 융합되고, 그 안에 슬로건이 떠오름

// 타임라인(ms)
const T_STACK = 100; // 프레임 3개 등장 시작
const T_FUSE = 2000; // 하나로 융합 시작
const T_LEAVE = 6000; // 인트로 퇴장 시작 (슬로건을 읽을 시간 확보)
const LEAVE_DURATION = 650;

type Props = {
  onComplete: () => void;
};

type Phase = "idle" | "stack" | "fused";

const FRAMES = [
  {
    ratio: 1.33,
    // 흩어진 상태: 너비(스테이지 대비), 중심 기준 x/y 오프셋(스테이지 너비 대비)
    stack: { w: 0.34, x: -0.25, y: -0.13 },
    delay: 0,
  },
  {
    ratio: 1.85,
    stack: { w: 0.44, x: 0.2, y: 0.12 },
    delay: 220,
  },
  {
    ratio: 2.35,
    stack: { w: 0.5, x: -0.02, y: -0.02 },
    delay: 440,
  },
];

export default function CinemaFrameIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [leaving, setLeaving] = useState(false);
  // 부모가 리렌더돼도 타이머가 다시 시작되지 않도록 콜백은 ref로 보관
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // 히드레이션 직후 한 프레임 쉬고 시작해야 트랜지션이 건너뛰어지지 않음
    const timers: ReturnType<typeof setTimeout>[] = [];
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        timers.push(setTimeout(() => setPhase("stack"), T_STACK));
        timers.push(setTimeout(() => setPhase("fused"), T_FUSE));
        timers.push(setTimeout(() => setLeaving(true), T_LEAVE));
        timers.push(setTimeout(() => onCompleteRef.current(), T_LEAVE + LEAVE_DURATION));
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleSkip = () => {
    setLeaving(true);
    setTimeout(() => onCompleteRef.current(), LEAVE_DURATION);
  };

  const fused = phase === "fused";

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col justify-between overflow-hidden bg-[#050507] text-white transition-all duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
        leaving
          ? "pointer-events-none scale-105 opacity-0 blur-sm"
          : "scale-100 opacity-100 blur-0"
      }`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {/* CRT 주사선 + 미세한 RGB 노이즈 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] opacity-80"
        style={{
          background:
            "linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.03), rgba(0,255,0,0.01), rgba(0,0,255,0.03))",
          backgroundSize: "100% 3px, 6px 100%",
        }}
      />
      {/* CRT 깜빡임 */}
      <div
        aria-hidden
        className="crt-flicker pointer-events-none absolute inset-0 z-[2] bg-white/[0.015]"
      />

      {/* 설치 스테이지 */}
      <div className="relative z-[1] flex flex-1 items-center justify-center">
        <div
          className="stage relative"
          style={{ width: "var(--W)", height: "calc(var(--W) * 0.62)" }}
        >
          {FRAMES.map((f, i) => {
            const isScope = f.ratio === 2.35;
            const w = fused ? 1 : f.stack.w;
            const ratio = fused ? 2.35 : f.ratio;
            const x = fused ? 0 : f.stack.x;
            const y = fused ? 0 : f.stack.y;
            const visible = phase !== "idle" && (!fused || isScope);

            return (
              <div
                key={f.ratio}
                className="absolute left-1/2 top-1/2 flex flex-col justify-between overflow-hidden border p-2 sm:p-3"
                style={{
                  width: `calc(var(--W) * ${w})`,
                  height: `calc(var(--W) * ${w} / ${ratio})`,
                  transform: `translate(-50%, -50%) translate(calc(var(--W) * ${x}), calc(var(--W) * ${y})) scale(${
                    phase === "idle" ? 0.92 : 1
                  })`,
                  opacity: visible ? 1 : 0,
                  zIndex: isScope ? 3 : i + 1,
                  borderColor: fused
                    ? "rgba(255,255,255,0.85)"
                    : isScope
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(255,255,255,0.45)",
                  background: fused ? "rgba(10,10,14,0.95)" : "rgba(12,12,16,0.85)",
                  boxShadow: fused
                    ? "0 0 40px rgba(255,255,255,0.2)"
                    : "0 0 15px rgba(255,255,255,0.15), inset 0 0 15px rgba(255,255,255,0.15)",
                  transition: [
                    "width 1.4s cubic-bezier(0.16,1,0.3,1)",
                    "height 1.4s cubic-bezier(0.16,1,0.3,1)",
                    "transform 1.4s cubic-bezier(0.16,1,0.3,1)",
                    "border-color 1.4s ease",
                    "background 1.4s ease",
                    "box-shadow 1.4s ease",
                    `opacity ${fused ? "0.9s" : "0.5s"} ease ${
                      phase === "stack" ? `${f.delay}ms` : "0ms"
                    }`,
                  ].join(", "),
                }}
              >
                {/* 융합 후 슬로건 (2.35:1 프레임 안) */}
                {isScope && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
                    style={{
                      opacity: fused ? 1 : 0,
                      transform: `scale(${fused ? 1 : 0.95})`,
                      transition: "opacity 1s ease 0.8s, transform 1s ease 0.8s",
                    }}
                  >
                    <p
                      className="text-[#e2e8f0]"
                      style={{
                        fontSize: "clamp(0.7rem, 2.2vw, 2rem)",
                        fontWeight: 600,
                        lineHeight: 1.45,
                        letterSpacing: "-0.02em",
                        textShadow: "0 0 10px rgba(255,255,255,0.4)",
                      }}
                    >
                      A path to wide and immersive cinema,
                      <br />
                      continuously linking the states of pathos.
                    </p>
                    <p
                      className="mt-4 whitespace-nowrap text-[5vw] uppercase tracking-[0.06em] text-white/50 sm:mt-6 sm:text-[length:min(32px,3.8vw)]"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      DOHO Entertainment
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .stage {
          --W: min(92vw, 1000px);
        }
        @media (min-width: 640px) {
          .stage {
            --W: min(80vw, 1000px);
          }
        }
        .crt-flicker {
          animation: crt-flicker 0.15s infinite;
        }
        @keyframes crt-flicker {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
