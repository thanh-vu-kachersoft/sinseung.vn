"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/lib/LanguageContext";
import MobileMenu from "./mobile/MobileMenu";

type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

const LOGO_SRC =
  "https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/2026-04-24-10.29.25.jpg";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const nav = useMemo<NavItem[]>(
    () => [
      { label: t("Header", "home"), href: "/" },
      {
        label: t("Header", "products"),
        href: "/products",
        children: [
          {
            label: t("Header", "cat_blades"),
            href: "/cutter-blades",
            children: [
              {
                label: t("Header", "cat_blades_9mm"),
                href: "/cutter-blades/9mm-blades",
              },
              {
                label: t("Header", "cat_blades_18mm"),
                href: "/cutter-blades/18mm-blades",
              },
              {
                label: t("Header", "cat_blades_25mm"),
                href: "/cutter-blades/25mm-blades",
              },
              {
                label: t("Header", "cat_blades_special"),
                href: "/cutter-blades/special-shaped-blades",
              },
            ],
          },
          {
            label: t("Header", "cat_knives"),
            href: "/utility-knives",
            children: [
              {
                label: t("Header", "cat_knives_9mm"),
                href: "/utility-knives/9mm-cutters",
              },
              {
                label: t("Header", "cat_knives_18mm"),
                href: "/utility-knives/18mm-cutters",
              },
              {
                label: t("Header", "cat_knives_25mm"),
                href: "/utility-knives/25mm-cutters",
              },
            ],
          },
          { label: t("Header", "cat_scissors"), href: "/hardware-scissors" },
          {
            label: t("Header", "cat_garden"),
            href: "/garden-shears-and-tools",
            children: [
              {
                label: t("Header", "cat_garden_pruning"),
                href: "/garden-shears-and-tools/pruning-shears",
              },
              {
                label: t("Header", "cat_garden_tools"),
                href: "/garden-shears-and-tools/garden-tools",
              },
            ],
          },
        ],
      },
      { label: t("Header", "application"), href: "/application" },
      {
        label: t("Header", "news"),
        href: "/news",
        children: [
          {
            label: t("Header", "news_exhibition"),
            href: "/news/exhibition-news",
          },
          { label: t("Header", "news_products"), href: "/news/products-news" },
          { label: t("Header", "news_company"), href: "/news/company-news" },
        ],
      },
      { label: t("Header", "video"), href: "/videos" },
      { label: t("Header", "about"), href: "/about" },
      { label: t("Header", "contact"), href: "/contact-us" },
    ],
    [t],
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-[#1B2A4A] shadow-md`}
      >
        <div className="mx-auto flex min-h-14 w-full max-w-[90rem] items-center gap-4 px-4">
          <Link href="/" className="flex items-center gap-3 py-5">
            <Image
              src={LOGO_SRC}
              alt="Logo"
              width={250}
              height={56}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden flex-1 justify-end md:flex">
            <ul className="flex items-center text-[1.25rem] font-bold text-[#F5F5F0]">
              {nav.map((item) => (
                <DesktopNavItem
                  key={item.href}
                  item={item}
                  active={isActive(pathname, item.href)}
                />
              ))}
            </ul>
          </nav>

          <div className="hidden items-center md:flex px-1 py-5 gap-4">
            <SearchBox />
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            className="ml-auto inline-flex h-10 items-center justify-center rounded-md border border-white/20 px-4 text-sm font-semibold text-white md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            Menu
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={mobileOpen} setIsOpen={setMobileOpen} nav={nav} />
      </header>
      {/* Spacer div để đẩy nội dung bên dưới Header xuống, áp dụng cho tất cả các trang */}
      <div className="h-[6rem]" />
    </>
  );
}

function SearchBox() {
  const { t } = useLanguage();
  return (
    <form action="/search" method="get" className="relative">
      <input
        name="q"
        placeholder={t("Header", "search")}
        className="h-7 w-44 rounded-full bg-white/95 pl-9 pr-3 text-[14px] text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-red-500"
      />
      <button
        type="submit"
        className="absolute left-1 top-1/2 -translate-y-1/2 inline-flex h-5 w-7 items-center justify-center text-red-600"
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

function DesktopNavItem({ item, active }: { item: NavItem; active: boolean }) {
  const { t } = useLanguage();
  const hasChildren = Boolean(item.children?.length);
  const [activeChildHref, setActiveChildHref] = useState<string>(
    item.children?.[0]?.href ?? "",
  );

  const activeChild = item.children?.find((c) => c.href === activeChildHref);
  const rightColumnItems = activeChild?.children ?? [];

  return (
    <li className="relative group px-4">
      <Link
        href={item.href}
        className={[
          "inline-flex h-9 items-center rounded-md transform transition-all duration-300 hover:scale-105 hover:text-[#C8102E]",
          active ? "text-[#C8102E]" : "text-[#F5F5F0]",
        ].join(" ")}
      >
        {item.label}
      </Link>

      {hasChildren && (
        <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
          <div className="w-[42.5rem] overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5">
            <div className="grid grid-cols-[1fr_1fr]">
              <div className="p-8">
                <ul className="flex flex-col gap-6">
                  {item.children!.map((child) => {
                    const isChildActive = child.href === activeChildHref;
                    return (
                      <li
                        key={child.href}
                        className={[
                          "menu-underline relative pb-4",
                          isChildActive ? "is-active" : "",
                        ].join(" ")}
                      >
                        <Link
                          href={child.href}
                          onMouseEnter={() => setActiveChildHref(child.href)}
                          className={[
                            "inline-flex items-center text-lg font-semibold transition-colors duration-200",
                            isChildActive ? "text-[#C8102E]" : "text-zinc-900",
                            "hover:text-[#C8102E]",
                          ].join(" ")}
                        >
                          {child.label}
                        </Link>
                        <span className="pointer-events-none absolute inset-x-0 bottom-0 border-b border-dashed border-zinc-200/50" />
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="border-l border-zinc-200/80 p-8">
                <ul className="flex flex-col">
                  {rightColumnItems.length > 0 ? (
                    rightColumnItems.map((child) => (
                      <li
                        key={child.href}
                        className="border-b border-dashed border-zinc-200/50"
                      >
                        <Link
                          href={child.href}
                          className="block py-4 text-lg font-semibold text-zinc-900 hover:text-[#C8102E]"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm">
                      <Link
                        href={activeChild?.href ?? item.href}
                        className="inline-flex items-center font-semibold text-zinc-900 hover:text-[#C8102E] text-[1.125rem]"
                      >
                        {t("Header", "view_all")}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
