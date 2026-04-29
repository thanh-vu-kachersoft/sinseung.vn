"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  {
    code: "en",
    name: "EN",
    flag: "https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg",
  },
  {
    code: "vi",
    name: "VN",
    flag: "https://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg",
  },
  {
    code: "ko",
    name: "KR",
    flag: "https://purecatamphetamine.github.io/country-flag-icons/3x2/KR.svg",
  },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang =
    languages.find((l) => l.code === language) || languages[0];
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang.code as any);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 text-white hover:text-[#E83428] transition-colors duration-300 outline-none group"
      >
        <div className="relative w-6 h-4 overflow-hidden rounded-sm shadow-sm border border-white/20">
          <Image
            src={currentLang.flag}
            alt={currentLang.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-[14px] font-bold uppercase tracking-tight">
          {currentLang.name}
        </span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black/5 transition-all duration-300 z-[100] ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 ${
                currentLang.code === lang.code
                  ? "bg-gray-100 text-[#E83428] font-bold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-[#E83428]"
              }`}
            >
              <div className="relative w-5 h-3.5 mr-3 overflow-hidden rounded-sm border border-gray-200">
                <Image
                  src={lang.flag}
                  alt={lang.name}
                  fill
                  className="object-cover"
                />
              </div>
              {lang.name === "EN"
                ? "English"
                : lang.name === "VN"
                  ? "Tiếng Việt"
                  : "한국어"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
