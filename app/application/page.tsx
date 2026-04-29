"use client";

import NextLink from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://magenta-stork-113658.hostingersite.com";

const applicationPosts = [
  {
    id: 1,
    title: "The Competitive Edge of Sinseung’s Heat-Treated Scissors",
    image: `${WP_URL}/wp-content/uploads/2026/04/SINSEUNG-heat-treatment-1.jpg`,
    href: "/application/the-competitive-edge-of-sinseungs-heat-treated-scissors",
  },
];

export default function ApplicationPage() {
  const { t, translateDynamic } = useLanguage();

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Phần 1: Inner Banner */}
      <section className="relative w-full">
        <div className="relative w-full h-[250px] md:h-auto md:aspect-[1920/450] overflow-hidden flex items-center justify-center">
          <Image
            src={`${WP_URL}/wp-content/uploads/2026/04/Application.jpg`}
            alt="Application"
            fill
            className="object-cover"
            priority
          />
          <h1
            className="relative z-10 text-[#C8102E] text-5xl md:text-6xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {t("Header", "application")}
          </h1>
        </div>

        {/* Banner Menu */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="max-w-[1400px] mx-auto w-full">
            <ul
              className="flex flex-wrap md:flex-nowrap"
              style={{ display: "none" }}
            >
              <li className="flex-1 min-w-[200px]">
                <NextLink
                  href="/application"
                  className="block text-center text-[#F5F5F0] py-[23px] text-[20px] font-medium transition-all duration-[600ms] outline-none bg-[#C8102E]"
                >
                  {t("Header", "application")}
                </NextLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Phần 2: Crumbs Box */}
      <div className="max-w-[1440px] mx-auto px-[20px]">
        <div className="py-[40px] flex items-center gap-2 text-[18px] text-[#494949]">
          <NextLink
            href="/"
            className="flex items-center gap-2 transition-all duration-400 hover:text-[#cf2e2e]"
          >
            <div
              className="w-[18px] h-[18px] bg-no-repeat bg-left center"
              style={{
                backgroundImage: `url(${WP_URL}/wp-content/uploads/2026/04/home-icon.png)`,
                backgroundSize: "contain",
              }}
            />
            {t("Header", "home")}
          </NextLink>
          <span>&gt;</span>
          <span className="font-medium">{t("Header", "application")}</span>
        </div>
      </div>

      {/* Phần 3: Application List */}
      <section className="max-w-[1440px] mx-auto px-[20px] pb-[80px] appliction-box">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 app-list">
          {applicationPosts.map((post) => (
            <li
              key={post.id}
              className="group bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden flex flex-col md:flex-row h-auto md:h-[200px]"
            >
              {/* Image Column */}
              <NextLink
                href={post.href}
                className="w-full md:w-[42%] h-[150px] md:h-full relative overflow-hidden block p-4"
              >
                <div className="relative w-full h-full border border-gray-200 bg-white">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-contain p-2 transition-all duration-[600ms] group-hover:scale-110"
                  />
                </div>
              </NextLink>

              {/* Text Content Column */}
              <div className="w-full md:w-[58%] p-6 md:p-8 flex flex-col justify-between text-box">
                <div className="md:mt-1">
                  <NextLink
                    href={post.href}
                    className="text-[20px] md:text-[24px] font-medium text-[#333] leading-tight line-clamp-1 hover:text-[#cf2e2e] transition-colors duration-300"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {translateDynamic(post.title)}
                  </NextLink>
                </div>

                <div className="flex items-center justify-between md:mb-1 bt-box">
                  <div className="l">
                    <a
                      href="https://zalo.me/1149657744507910410"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 group/msg"
                    >
                      <img
                        src={`${WP_URL}/wp-content/uploads/2026/04/msg-icon.png`}
                        alt="Message"
                        className="w-4 h-4 object-contain"
                      />
                      <span
                        className="text-[#C8102E] font-medium hover:underline transition-all duration-300"
                        style={{ fontSize: "12px" }}
                      >
                        {t("Products", "message")}
                      </span>
                    </a>
                  </div>

                  <NextLink
                    href={post.href}
                    className="m w-[103px] h-[30px] border border-[#C8102E] rounded-[15px] leading-[28px] text-center font-medium text-[#C8102E] text-[13px] transition-all duration-[600ms] hover:bg-[#C8102E] hover:text-white"
                  >
                    {t("Products", "learnMore")}
                  </NextLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
