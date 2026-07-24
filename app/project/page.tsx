"use client";

import { useRef, useState } from "react";

type InfoField = {
  label: string;
  value: string;
};

type Project = {
  id: string;
  statusEn: string;
  statusKo: string;
  titleKo: string;
  titleEn: string;
  fields: InfoField[];
  images: string[];
};

const projects: Project[] = [
  {
    id: "uncle",
    statusEn: "IN POST PRODUCTION",
    statusKo: "후반작업중",
    titleKo: "엉클",
    titleEn: "Uncle",
    fields: [
      { label: "감독", value: "김형협" },
      { label: "출연", value: "고수, 김해숙" },
    ],
    images: ["/un.png", "/un2.png"],
  },
  {
    id: "project-2",
    statusEn: "OPERATRON",
    statusKo: "",
    titleKo: "융복합 사업레이블",
    titleEn: "",
    fields: [
      { label: "사업", value: "핀테크" },
      { label: "분야", value: "보험대리점" },
    ],
    images: [],
  },
];

const DRAG_THRESHOLD = 60; // 이 정도 픽셀 이상 드래그해야 다음/이전으로 전환

export default function ProjectPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1); // 1: 다음으로(왼쪽으로 슬라이드), -1: 이전으로(오른쪽으로 슬라이드)
  const selected = projects[selectedIndex];

  const dragStartX = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const goTo = (index: number) => {
    // 마지막에서 다음으로 가면 처음으로, 처음에서 이전으로 가면 마지막으로 순환
    const wrapped = (index + projects.length) % projects.length;
    setDirection(wrapped > selectedIndex ? 1 : wrapped < selectedIndex ? -1 : direction);
    setSelectedIndex(wrapped);
  };

  const goNext = () => {
    setDirection(1);
    goTo(selectedIndex + 1);
  };

  const goPrev = () => {
    setDirection(-1);
    goTo(selectedIndex - 1);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    setDragOffset(e.clientX - dragStartX.current);
  };

  const handlePointerUp = () => {
    if (dragStartX.current === null) return;

    if (dragOffset > DRAG_THRESHOLD) {
      setDirection(-1);
      goTo(selectedIndex - 1); // 오른쪽으로 드래그 -> 이전 프로젝트
    } else if (dragOffset < -DRAG_THRESHOLD) {
      setDirection(1);
      goTo(selectedIndex + 1); // 왼쪽으로 드래그 -> 다음 프로젝트
    }

    dragStartX.current = null;
    setDragOffset(0);
  };

  return (
    <main className="w-full">
      {/* 상단 배너 */}
      <section className="relative flex h-[220px] w-full flex-col justify-end overflow-hidden bg-[#141210] px-6 pb-8 text-white md:h-[280px] md:px-10 md:pb-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 30% 20%, #3a332c 0%, #201c18 45%, #0f0d0b 100%)",
          }}
        />

        {/* 상태/인디케이터 콘텐츠 - 이 영역 전체가 드래그 가능 (화살표는 아래 정보 섹션으로 이동) */}
        <div
          className="relative z-10 cursor-grab touch-pan-y select-none active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            key={`banner-${selected.id}`}
            className={direction === 1 ? "slide-in-right" : "slide-in-left"}
          >
            <p className="flex flex-wrap items-baseline gap-2 text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
              <span style={{ fontFamily: "'HelveticaCustom', sans-serif" }}>
                {selected.statusEn}
              </span>
              <span style={{ fontFamily: "'AritaDotum', sans-serif" }}>
                {selected.statusKo}
              </span>
            </p>
          </div>

          {/* 프로젝트 인디케이터 - 드래그로도, 화살표로도 넘어감 */}
          <div className="mt-5 flex w-full max-w-[280px] items-center gap-2">
            {projects.map((project, index) => {
              const isActive = selectedIndex === index;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`${project.titleKo} ${project.titleEn}`}
                  className="group relative h-4 flex-1"
                >
                  {/* 배경 트랙 */}
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-white/25 transition-colors duration-300" />
                  {/* 활성 하이라이트 - 왼쪽에서부터 차오르는 wipe 애니메이션 */}
                  <span
                    className={`absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 상세 정보 */}
      <section
        className="relative w-full overflow-hidden bg-white px-14 py-10 text-black sm:px-16 md:px-24 md:py-14"
        style={{ fontFamily: "'AritaDotum', sans-serif" }}
      >
        {/* 왼쪽 화살표 - 섹션 상단에서 고정된 픽셀 위치 (이미지 유무로 섹션 높이가 달라져도 흔들리지 않음) */}
        {projects.length > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="이전 프로젝트"
            className="absolute left-2 top-24 z-20 flex items-center justify-center rounded-full p-1.5 text-black/40 transition hover:bg-black/5 hover:text-black md:left-4 md:top-28"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M16 2L7 12l9 10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* 오른쪽 화살표 - 섹션 상단에서 고정된 픽셀 위치 (이미지 유무로 섹션 높이가 달라져도 흔들리지 않음) */}
        {projects.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="다음 프로젝트"
            className="absolute right-2 top-24 z-20 flex items-center justify-center rounded-full p-1.5 text-black/40 transition hover:bg-black/5 hover:text-black md:right-4 md:top-28"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M8 2l9 10-9 10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* 슬라이드 애니메이션이 적용되는 콘텐츠 영역 */}
        <div
          key={`detail-${selected.id}`}
          className={direction === 1 ? "slide-in-right" : "slide-in-left"}
        >
          {/* 타이틀 - 위쪽 */}
          <h1 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">
            <span style={{ fontFamily: "'AritaDotum', sans-serif" }}>
              {selected.titleKo}
            </span>{" "}
            <span style={{ fontFamily: "'AritaDotum', sans-serif" }}>
              {selected.titleEn}
            </span>
          </h1>

          {/* 상세 필드 - 프로젝트마다 다른 항목(감독/출연 또는 사업레이블/사업/분야) */}
          <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:gap-20">
            {selected.fields.map((field) => (
              <div key={field.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                  {field.label}
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  {field.value}
                </p>
              </div>
            ))}
          </div>

          {/* 이미지 - 나란히 */}
          {selected.images.length > 0 && (
            <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6">
              {selected.images.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={`${selected.titleKo} ${selected.titleEn}`}
                  className="w-full object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(28px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-28px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .slide-in-right {
          animation: slideInRight 750ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .slide-in-left {
          animation: slideInLeft 750ms cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </main>
  );
}