"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/lib/LanguageContext";

type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

function MobileSearchBox() {
  const { t } = useLanguage();
  return (
    <form action="/search" method="get" className="relative flex-1">
      <input
        name="q"
        placeholder={t("Header", "search")}
        className="h-10 w-full rounded-full bg-white/95 pl-10 pr-4 text-[14px] text-zinc-900 outline-none focus:ring-2 focus:ring-[#C8102E] transition-all"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center text-[#C8102E]"
        aria-label="Search"
      >
        <svg viewBox="0 0 1024 1024" width="16" height="16">
          <path
            d="M948.5 901.2L783.2 735.8c26.3-31.1 47.6-65.7 63.5-103.4 21.2-50 31.9-103.1 31.9-157.8s-10.7-107.8-31.9-157.8c-20.4-48.3-49.7-91.6-86.9-128.9s-80.6-66.5-128.9-86.9c-50-21.2-103.1-31.9-157.8-31.9S365.3 79.8 315.3 101c-48.3 20.4-91.6 49.7-128.9 86.9-37.3 37.2-66.5 80.6-86.9 128.9-21.2 50-31.9 103.1-31.9 157.8s10.7 107.8 31.9 157.8c20.4 48.3 49.7 91.6 86.9 128.9 37.2 37.3 80.6 66.5 128.9 86.9 50 21.2 103.1 31.9 157.8 31.9 54.7 0 107.8-10.7 157.8-31.9 39.2-16.6 75.2-39 107.3-66.8l165 165.1c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3zM714.6 716.1c-64.5 64.5-150.3 100-241.5 100s-177-35.5-241.5-100-100-150.2-100-241.5c0-91.2 35.5-177 100-241.5s150.3-100 241.5-100 177 35.5 241.5 100 100 150.3 100 241.5-35.5 177-100 241.5z"
            fill="currentColor"
          />
        </svg>
      </button>
    </form>
  );
}

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(item.children?.length);

  return (
    <li className="rounded-lg border border-[#F5F5F0]/10 overflow-hidden bg-white/5">
      <div className="flex items-stretch">
        <Link
          href={item.href}
          className="flex flex-1 items-center px-4 py-3.5 text-[15px] font-medium text-[#F5F5F0] hover:text-[#C8102E] transition-colors"
          onClick={onNavigate}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            type="button"
            className="px-4 text-[18px] font-medium text-[#F5F5F0]/80 hover:text-[#C8102E] transition-colors border-l border-[#F5F5F0]/10"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "−" : "+"}
          </button>
        )}
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden bg-[#1B2A4A] ${
          open
            ? "max-h-[500px] border-t border-[#F5F5F0]/10 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {hasChildren && (
          <ul className="p-2 space-y-1">
            {item.children!.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="block rounded-md px-4 py-2.5 text-[14px] text-[#F5F5F0]/90 hover:bg-[#C8102E] hover:text-white transition-colors"
                  onClick={onNavigate}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default function MobileMenu({
  isOpen,
  setIsOpen,
  nav,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  nav: NavItem[];
}) {
  return (
    <div
      className={`md:hidden absolute top-full left-0 w-full bg-[#1B2A4A] border-t border-white/10 shadow-2xl z-40 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen
          ? "max-h-[85vh] opacity-100 visible overflow-y-auto"
          : "max-h-0 opacity-0 invisible"
      }`}
    >
      <div className="px-5 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="w-full flex-1">
            <MobileSearchBox />
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            <LanguageSwitcher />
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {nav.map((item) => (
            <MobileNavItem
              key={item.href}
              item={item}
              onNavigate={() => setIsOpen(false)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
