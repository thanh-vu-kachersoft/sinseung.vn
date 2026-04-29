"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1B2A4A] text-[#F5F5F0] py-16 mt-auto border-t border-white/5">
      <div className="mx-auto w-full max-w-[90rem] px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 text-[1rem] items-start">
          {/* Column 1 & 2: Logo & Contact Info */}
          <div className="space-y-6 lg:col-span-2">
            {/* Logo Container with aligned border */}
            <div className="border-b border-white/10 pb-4 w-full max-w-[400px]">
              <div className="h-[2rem] flex items-center">
                <Image
                  src="https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/Logo-trang.png"
                  alt="Sinseung Tools Corporation"
                  width={220}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[#F5F5F0]/70 text-sm italic">
                Bạn cần tư vấn? Gọi chúng tôi ngay!
              </span>
              <span className="text-[#C8102E] text-xl font-bold">
                028-6267-3001
              </span>
              <span className="text-[#F5F5F0]/80 text-[14px] mt-1">
                Email:{" "}
                <a
                  href="mailto:sales@phuthaitech.com.vn"
                  className="hover:text-[#C8102E] transition-colors"
                >
                  sales@phuthaitech.com.vn
                </a>
              </span>
            </div>

            <div className="text-[#F5F5F0]/80 space-y-4 leading-relaxed text-sm">
              <div>
                <span className="font-bold text-[#F5F5F0] block mb-1">
                  ❖ Miền Nam:
                </span>
                <p className="pl-3">
                  ‣ 76/55 Nguyen Son, Phu Tho Hoa, Ho Chi Minh City
                </p>
                <p className="pl-3">
                  ‣ 226 Truong Vinh Ky, Tan Son Nhi, Ho Chi Minh City
                </p>
              </div>
              <div>
                <span className="font-bold text-[#F5F5F0] block mb-1">
                  ❖ Miền Trung:
                </span>
                <p className="pl-3">
                  ‣ 120 Dien Bien Phu, Nam Phuoc, Da Nang City
                </p>
              </div>
              <div>
                <span className="font-bold text-[#F5F5F0] block mb-1">
                  ❖ Miền Bắc:
                </span>
                <p className="pl-3">
                  ‣ Phòng 701 Tầng 7, Số 9 Ngõ 25 Đường Bùi Huy Bích, Hoàng Mai,
                  Hà Nội
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <SocialIcon
                href="https://www.facebook.com/phuthaitechnology/"
                type="facebook"
              />
              <SocialIcon
                href="https://www.twitter.com/phuthaitech/"
                type="twitter"
              />
              <SocialIcon
                href="https://www.instagram.com/phuthaitech/"
                type="instagram"
              />
              <SocialIcon
                href="https://pinterest.com/phuthaitech"
                type="pinterest"
              />
              <SocialIcon
                href="https://www.youtube.com/channel/UCdLpZEELkHW0QYr-6RJPsPg"
                type="youtube"
              />
            </div>
          </div>

          {/* Column 3: Products */}
          <div className="flex flex-col">
            <div className="border-b border-white/10 pb-4 mb-6">
              <h3 className="text-xl font-bold h-[2rem] flex items-center">
                {t("Header", "products")}
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products?category=23"
                  className="text-[#F5F5F0]/80 hover:text-[#C8102E] transition-colors"
                >
                  {t("Header", "cat_blades")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=18"
                  className="text-[#F5F5F0]/80 hover:text-[#C8102E] transition-colors"
                >
                  {t("Header", "cat_knives")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=27"
                  className="text-[#F5F5F0]/80 hover:text-[#C8102E] transition-colors"
                >
                  {t("Header", "cat_scissors")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=28"
                  className="text-[#F5F5F0]/80 hover:text-[#C8102E] transition-colors"
                >
                  {t("Header", "cat_garden")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Application */}
          <div className="flex flex-col">
            <div className="border-b border-white/10 pb-4 mb-6">
              <h3 className="text-xl font-bold h-[2rem] flex items-center">
                {t("Header", "application")}
              </h3>
            </div>
            <ul className="space-y-3 text-[#F5F5F0]/80">
              <li className="leading-tight">
                <Link
                  href="/application/the-competitive-edge-of-sinseungs-heat-treated-scissors"
                  className="hover:text-[#C8102E] transition-colors"
                >
                  The Competitive Edge of Sinseung’s Heat-Treated Scissors
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: News */}
          <div className="flex flex-col">
            <div className="border-b border-white/10 pb-4 mb-6">
              <h3 className="text-xl font-bold h-[2rem] flex items-center">
                {t("Header", "news")}
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/news/exhibition-news"
                  className="text-[#F5F5F0]/80 hover:text-[#C8102E] transition-colors"
                >
                  {t("Header", "news_exhibition")}
                </Link>
              </li>
              <li>
                <Link
                  href="/news/products-news"
                  className="text-[#F5F5F0]/80 hover:text-[#C8102E] transition-colors"
                >
                  {t("Header", "news_products")}
                </Link>
              </li>
              <li>
                <Link
                  href="/news/company-news"
                  className="text-[#F5F5F0]/80 hover:text-[#C8102E] transition-colors"
                >
                  {t("Header", "news_company")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: About */}
          <div className="flex flex-col">
            <div className="border-b border-white/10 pb-4 mb-6">
              <h3 className="text-xl font-bold h-[2rem] flex items-center">
                {t("Header", "about")}
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-[#F5F5F0]/80 hover:text-[#C8102E] transition-colors"
                >
                  {t("Header", "about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-[#F5F5F0]/80 hover:text-[#C8102E] transition-colors"
                >
                  {t("Header", "contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-16 pt-8 pb-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#F5F5F0]/60">
          <p className="text-[0.9rem]">
            <a
              href="https://phuthaitech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8102E] transition-colors"
            >
              PHÚ THÁI Engineering Technology
            </a>{" "}
            &copy; {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, type }: { href: string; type: string }) {
  const icons: any = {
    facebook: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
    twitter: (
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    ),
    instagram: (
      <path d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c3.403 0 6.162 2.759 6.162 6.162s-2.759 6.162-6.162 6.162-6.162-2.759-6.162-6.162 2.759-6.162 6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    ),
    pinterest: (
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.718-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.396 2.966 7.396 6.93 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.999 5.368 18.631 0 12.017 0z" />
    ),
    youtube: (
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F0] shadow-sm border border-black/5 text-[#1B2A4A] hover:bg-[#C8102E] hover:text-[#F5F5F0] transition-all duration-300 group outline-none"
    >
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        {icons[type]}
      </svg>
    </a>
  );
}
