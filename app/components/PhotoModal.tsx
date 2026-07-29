"use client";

import { useEffect, useState } from "react";

type PhotoModalProps = {
  photos: string[];
  title: string;
  onClose: () => void;
};

export default function PhotoModal({ photos, title, onClose }: PhotoModalProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((prev) => (prev + 1) % photos.length);
      if (e.key === "ArrowLeft") setIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", handleKeyDown);

    // 모달 열려있는 동안 배경 스크롤 막기
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [photos.length, onClose]);

  if (photos.length === 0) return null;

  const goPrev = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);
  const goNext = () => setIndex((prev) => (prev + 1) % photos.length);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/95" onClick={onClose}>
      {/* header */}
      <div
        className="flex items-center justify-between px-6 py-4 text-white md:px-10 md:py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-baseline gap-3"
          style={{ fontFamily: "'AritaDotumKR', sans-serif", fontWeight: 300 }}
        >
          <h3 className="text-sm tracking-widest md:text-base">{title}</h3>
          <span className="text-xs tracking-widest text-white/50">
            {index + 1} / {photos.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="rounded-full p-2 text-white/70 transition hover:text-white"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>
      </div>

      {/* main image */}
      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-16 md:pb-10">
        {/* 고정 크기 무대: 사진 비율(가로/세로)이 달라도 항상 같은 틀 안에서만 크기가 바뀌도록 고정 */}
        <div className="relative flex h-full w-full max-w-5xl items-center justify-center">
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="이전 사진"
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-white/60 transition hover:text-white md:-left-10"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 4 7 12 15 20" />
              </svg>
            </button>
          )}

          <img
            key={photos[index]}
            src={photos[index]}
            alt={`${title} 사진 ${index + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="다음 사진"
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-white/60 transition hover:text-white md:-right-10"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 4 17 12 9 20" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* thumbnails */}
      {photos.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto px-6 pb-6 md:justify-center md:px-10"
          onClick={(e) => e.stopPropagation()}
        >
          {photos.map((photo, i) => (
            <button
              key={photo}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-14 w-20 flex-shrink-0 overflow-hidden border transition md:h-16 md:w-24 ${
                i === index ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img src={photo} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}