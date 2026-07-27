"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const menuItems = [
  { label: "WORKS", href: "/" },
  { label: "PROJECT", href: "/project" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

// 스크롤이 이 값(px)을 넘으면 헤더 배경을 흰색으로 전환
const SCROLL_THRESHOLD = 80;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    // 새로고침 시 이미 스크롤된 상태로 진입할 수도 있으니 초기 1회 실행
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 모바일(md 미만)에서는 히어로 영역이 짧거나 없어서 투명 헤더가
    // 빈 검은 그라데이션으로만 보이는 문제가 있어, 처음부터 흰 배경으로 시작시킴
    const mql = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => setIsMobile(mql.matches);
    updateIsMobile();
    mql.addEventListener("change", updateIsMobile);
    return () => mql.removeEventListener("change", updateIsMobile);
  }, []);

  // 모바일이면 항상 "스크롤된 것처럼" 흰 배경/검정 글씨로 표시
  const showColored = scrolled || isMobile;

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
              className="flex items-center gap-3 text-xs tracking-[0.25em]"
              style={{ fontFamily: "'AritaSansLTN', sans-serif", fontWeight: 500 }}
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

          <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-6 md:gap-4 md:px-10">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-[7vw] uppercase leading-[1.1] tracking-tight transition-opacity hover:opacity-60 sm:text-4xl md:text-6xl"
                style={{ fontFamily: "'AritaSansLTN', sans-serif", fontWeight: 600 }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="h-16 md:h-20" />
        </div>
      </div>

      {/* 상단 고정 헤더 - 모든 페이지에 공통으로 노출
          최상단(scrolled=false)에서는 기존처럼 투명 + 그라데이션 + 흰 글씨
          스크롤 시(scrolled=true)에는 흰 배경 + blur + 검정 글씨로 전환하여
          어떤 색의 섹션이 헤더 뒤로 지나가도 가독성을 보장함 */}
      <header
        className={`fixed inset-x-0 top-0 z-30 flex min-h-16 items-center justify-between px-6 transition-colors duration-300 ease-in-out md:min-h-20 md:px-10 ${
          menuOpen
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100 delay-200"
        } ${
          showColored
            ? "bg-white/90 text-black shadow-sm backdrop-blur-md"
            : "bg-transparent text-white"
        }`}
        // 노치/다이나믹 아일랜드가 있는 기기에서 헤더가 안전영역을 침범하지 않도록
        // 상단 padding에 safe-area-inset-top을 더해줌 (h-16/h-20에 추가되는 여백)
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {/* 최상단 전용 그라데이션 - 스크롤되면 서서히 사라지고 위 배경이 대신함 */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-black/70 via-black/30 to-transparent transition-opacity duration-300 md:h-32 ${
            showColored ? "opacity-0" : "opacity-100"
          }`}
        />

        <div className="flex items-center gap-5 md:gap-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-3 text-sm font-semibold tracking-[0.25em] md:text-base"
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={`block h-[3px] w-8 transition-colors duration-300 md:w-9 ${
                  showColored ? "bg-black" : "bg-white"
                }`}
              />
              <span
                className={`block h-[3px] w-8 transition-colors duration-300 md:w-9 ${
                  showColored ? "bg-black" : "bg-white"
                }`}
              />
              <span
                className={`block h-[3px] w-8 transition-colors duration-300 md:w-9 ${
                  showColored ? "bg-black" : "bg-white"
                }`}
              />
            </span>
          </button>

          <Link href="/">
            <img
              src="/logo_right.png"
              alt="DOHO logo"
              className="h-8 w-auto object-contain md:h-10"
            />
          </Link>
        </div>
      </header>
    </>
  );
}