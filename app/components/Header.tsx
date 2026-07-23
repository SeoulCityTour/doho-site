"use client";

import { useState } from "react";

const menuItems = [
  { label: "WORKS", href: "/" },
  { label: "PROJECT", href: "/project" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 배경 딤 처리 - 흰 패널이 슬라이드되는 동안에도 뒤 콘텐츠가 비치지 않도록
          슬라이드보다 먼저/빠르게 어둡게 깔아줌 */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-out ${
          menuOpen
            ? "opacity-60 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* 전체화면 메뉴 오버레이 - 패널 자체는 슬라이드, 안의 텍스트는 따로 페이드인/아웃 시켜서
          슬라이드 경계에서 텍스트가 콘텐츠와 겹쳐 보이는 현상을 방지함 */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-white text-black transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`flex h-full flex-col transition-opacity duration-200 ease-out ${
            menuOpen ? "opacity-100 delay-300" : "opacity-0 delay-0"
          }`}
        >
          <header className="flex items-center px-6 pt-6 md:px-10 md:pt-8">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
              CLOSE
            </button>
          </header>

          <nav className="flex flex-1 flex-col items-start justify-center gap-4 px-6 md:px-10">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[9vw] font-extrabold uppercase leading-[1.05] tracking-tight transition-opacity hover:opacity-60 sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'AritaDotum', sans-serif" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="h-16 md:h-20" />
        </div>
      </div>

      {/* 상단 고정 헤더 - 모든 페이지에 공통으로 노출 */}
      {/* 뒤에 어떤 콘텐츠(흰 섹션 등)가 오더라도 흰 글씨가 묻히지 않도록
          헤더 뒤에 어두운 그라데이션 배경을 깔아줌 */}
      <header
        className={`fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-6 text-white transition-opacity duration-300 ease-in-out md:px-10 md:pt-8 ${
          menuOpen
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100 delay-200"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-black/70 via-black/30 to-transparent md:h-32" />

        <div className="flex items-center gap-5 md:gap-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-3 text-sm font-semibold tracking-[0.25em] md:text-base"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-[3px] w-8 bg-white md:w-9" />
              <span className="block h-[3px] w-8 bg-white md:w-9" />
              <span className="block h-[3px] w-8 bg-white md:w-9" />
            </span>
          </button>

          <img
            src="/logo_right.png"
            alt="DOHO logo"
            className="h-8 w-auto object-contain md:h-10"
          />
        </div>
      </header>
    </>
  );
}