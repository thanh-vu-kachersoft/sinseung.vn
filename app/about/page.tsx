"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { useEffect, useState, useRef } from "react";
import NextLink from "next/link";

const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://magenta-stork-113658.hostingersite.com";

const SLIDE_DURATION = 3000;

const brandLogos = [
  {
    name: "Facom",
    src: "https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/facom_460x170-300x111-1.png",
  },
  {
    name: "Garant",
    src: "https://phuthaitech.com/wp-content/uploads/2024/02/garant_460x170-1-300x111.png",
  },
  {
    name: "Holex",
    src: "https://phuthaitech.com/wp-content/uploads/2024/02/holex_460x170-1-300x111.png",
  },
  {
    name: "Kyocera",
    src: "https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/kyocera_460x170-1-300x111-1.png",
  },
  {
    name: "PBSwiss",
    src: "https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/pbswiss_460x170-300x111-1.png",
  },
  {
    name: "Wera",
    src: "https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/wera_460x170-300x111-1.png",
  },
  {
    name: "Snap-on",
    src: "https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/snapon_logo_460x170.png",
  },
  {
    name: "Wilton",
    src: "https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/Wilton_460x170.png",
  },
  {
    name: "Carmex",
    src: "https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/carmex_9b357229-3744-4d30-9278-6ecfd5c6f420_460x170-1-300x111-1.png",
  },
  {
    name: "Brand Logo 3",
    src: "https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/Brand_Logo_3_3076a09f-200a-45be-a842-03372fdf728c_460x170-300x111-1.png",
  },
];

// Hook for count up effect
function useCountUp(
  end: number,
  duration: number = 2000,
  startTrigger: boolean = false,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, startTrigger]);

  return count;
}

export default function AboutPage() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Carousel state
  const [logoIndex, setLogoIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(3); // 3 logos on Mobile
      } else if (window.innerWidth < 1024) {
        setItemsToShow(5); // 5 logos on Tablet
      } else {
        setItemsToShow(7); // 7 logos on Desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clone logos for seamless looping
  const extendedLogos = [...brandLogos, ...brandLogos.slice(0, itemsToShow)];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % brandLogos.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection observer for counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background min-h-screen pb-20 font-inherit">
      {/* Page Header */}
      <section className="relative w-full">
        <div className="relative w-full h-62.5 md:h-auto md:aspect-1920/450 overflow-hidden flex items-center justify-center">
          <Image
            src={`${WP_URL}/wp-content/uploads/2026/04/about1.jpg`}
            alt="About Banner"
            fill
            className="object-cover brightness-50"
            priority
          />
          <h1
            className="relative z-10 text-white text-5xl md:text-6xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "Poppins, sans-serif", color: "#C8102E" }}
          >
            {t("Header", "about")}
          </h1>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-285 mx-auto px-4 md:px-0">
        <div
          className="py-5 md:py-10 flex items-center gap-2 text-[15px] md:text-[18px] text-black"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <NextLink
            href="/"
            className="flex items-center gap-2 transition-all duration-400 hover:text-[#C8102E] font-normal"
          >
            <div
              className="w-3.75 h-3.75 md:w-4.5 md:h-4.5 bg-no-repeat bg-left center"
              style={{
                backgroundImage: `url(${WP_URL}/wp-content/uploads/2026/04/home-icon.png)`,
                backgroundSize: "contain",
              }}
            />
            {t("Header", "home")}
          </NextLink>
          <span>&gt;</span>
          <span className="font-normal">{t("Header", "about")}</span>
        </div>
      </div>

      <div className="max-w-360 mx-auto px-4">
        <div className="max-w-280 mx-auto space-y-12 md:space-y-16">
          {/* Journey Section */}
          <article className="space-y-4 md:space-y-8">
            <h2 className="text-[2rem] md:text-[2.5rem] leading-tight text-[#333] flex flex-col md:block">
              <span className="text-[#1B2A4A] font-bold underline decoration-2 underline-offset-8 md:mr-3 inline-block pb-2 md:pb-0">
                {t("About", "journey_tit")}
              </span>
              <span className="font-light">{t("About", "journey_sub")}</span>
            </h2>
            <p className="text-[1rem] md:text-[1.125rem] leading-relaxed text-gray-600 text-justify">
              {t("About", "journey_desc")}
            </p>
          </article>

          {/* Mission Section */}
          <article className="space-y-4 md:space-y-8">
            <h2 className="text-[2rem] md:text-[2.5rem] leading-tight text-[#333] flex flex-col md:block">
              <span className="text-[#1B2A4A] font-bold underline decoration-2 underline-offset-8 md:mr-3 inline-block pb-2 md:pb-0">
                {t("About", "mission_tit")}
              </span>
              <span className="font-light">{t("About", "mission_sub")}</span>
            </h2>
            <p className="text-[1rem] md:text-[1.125rem] leading-relaxed text-gray-600 text-justify">
              {t("About", "mission_desc")}
            </p>
          </article>

          {/* Brand Carousel Section (Stepped 7-item loop) */}
          <div className="relative group/carousel overflow-hidden mt-8! mb-8!">
            {/* Nav Arrows Decoration (No blur/gradient) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <svg
                className="w-8 h-8 text-black/10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <svg
                className="w-8 h-8 text-black/10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            <div
              className="mx-auto overflow-hidden"
              style={{
                marginLeft: "30px",
                marginRight: "30px",
                width: "calc(100% - 60px)",
              }}
            >
              <div
                className="flex transition-transform duration-1000 ease-in-out items-center"
                style={{
                  transform: `translate3d(-${logoIndex * (100 / itemsToShow)}%, 0, 0)`,
                  height: "60px",
                }}
              >
                {extendedLogos.map((brand, idx) => (
                  <div
                    key={`${brand.name}-${idx}`}
                    className="shrink-0 flex items-center justify-center px-2 md:px-6"
                    style={{ width: `${100 / itemsToShow}%` }}
                  >
                    <div className="relative w-full h-8.75 md:h-11.25 max-w-25 md:max-w-30">
                      <Image
                        src={brand.src}
                        alt={brand.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strength Section */}
          <article className="space-y-4 md:space-y-8">
            <h2 className="text-[2rem] md:text-[2.5rem] leading-tight text-[#333] flex flex-col md:block">
              <span className="text-[#1B2A4A] font-bold underline decoration-2 underline-offset-8 md:mr-3 inline-block pb-2 md:pb-0">
                {t("About", "strength_tit")}
              </span>
              <span className="font-light">{t("About", "strength_sub")}</span>
            </h2>
            <p className="text-[1rem] md:text-[1.125rem] leading-relaxed text-gray-600 text-justify">
              {t("About", "strength_desc")}
            </p>
          </article>

          {/* Stats Counters */}
          <section
            ref={sectionRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-8 m-0!"
          >
            <div className="text-center space-y-2">
              <p className="text-[0.875rem] md:text-base text-gray-500 font-medium uppercase tracking-widest">
                {t("About", "in_stock")}
              </p>
              <p className="text-5xl md:text-6xl font-bold text-[#333]">
                <Counter end={3000} startTrigger={isVisible} />
                <span className="text-[#C8102E]">+</span>
              </p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-[0.875rem] md:text-base text-gray-500 font-medium uppercase tracking-widest">
                {t("About", "happy_clients")}
              </p>
              <p className="text-5xl md:text-6xl font-bold text-[#333]">
                <Counter end={100} startTrigger={isVisible} />
                <span className="text-[#C8102E]">+</span>
              </p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-[0.875rem] md:text-base text-gray-500 font-medium uppercase tracking-widest">
                {t("About", "successful_tasks")}
              </p>
              <p className="text-5xl md:text-6xl font-bold text-[#333]">
                <Counter end={99} startTrigger={isVisible} />
                <span className="text-[#C8102E]">%</span>
              </p>
            </div>
          </section>

          {/* Why Clients Choose Us Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center pt-8 md:pt-10">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#333] uppercase leading-tight md:leading-none">
                {t("About", "why_clients")}
              </h2>
              <div className="space-y-4 md:space-y-6 text-[1rem] md:text-[1.1rem] text-gray-600 leading-relaxed text-justify">
                <p>{t("About", "why_clients_desc")}</p>
              </div>
              <div className="pt-6">
                <a
                  href="mailto:sales@phuthaitech.com"
                  className="inline-flex items-center gap-3 text-[#1B2A4A] font-bold text-lg hover:text-[#C8102E] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  sales@phuthaitech.com
                </a>
              </div>
            </div>

            <div className="space-y-10">
              <ProgressBar
                label="Unmatched Quality and Selection"
                value={95}
                startTrigger={isVisible}
              />
              <ProgressBar
                label="Expertise and Reliability"
                value={90}
                startTrigger={isVisible}
              />
              <ProgressBar
                label="Cutting-Edge Innovation"
                value={85}
                startTrigger={isVisible}
              />
              <ProgressBar
                label="Customer-Centric Approach"
                value={90}
                startTrigger={isVisible}
              />
              <ProgressBar
                label="Commitment to Excellence"
                value={90}
                startTrigger={isVisible}
              />
            </div>
          </section>

          {/* Values, Team, Commitment */}
          <div className="space-y-12 md:space-y-16">
            <article className="space-y-4 md:space-y-8">
              <h2 className="text-[2rem] md:text-[2.5rem] leading-tight text-[#333] flex flex-col md:block">
                <span className="text-[#1B2A4A] font-bold underline decoration-2 underline-offset-8 md:mr-3 inline-block pb-2 md:pb-0">
                  {t("About", "values_tit")}
                </span>
                <span className="font-light">{t("About", "values_sub")}</span>
              </h2>
              <p className="text-[1rem] md:text-[1.125rem] leading-relaxed text-gray-600 text-justify">
                {t("About", "values_desc")}
              </p>
            </article>

            <article className="space-y-4 md:space-y-8">
              <h2 className="text-[2rem] md:text-[2.5rem] leading-tight text-[#333] flex flex-col md:block">
                <span className="text-[#1B2A4A] font-bold underline decoration-2 underline-offset-8 md:mr-3 inline-block pb-2 md:pb-0">
                  {t("About", "team_tit")}
                </span>
                <span className="font-light">{t("About", "team_sub")}</span>
              </h2>
              <p className="text-[1rem] md:text-[1.125rem] leading-relaxed text-gray-600 text-justify">
                {t("About", "team_desc")}
              </p>
            </article>

            <article className="space-y-4 md:space-y-8">
              <h2 className="text-[2rem] md:text-[2.5rem] leading-tight text-[#333] flex flex-col md:block">
                <span className="text-[#1B2A4A] font-bold underline decoration-2 underline-offset-8 md:mr-3 inline-block pb-2 md:pb-0">
                  {t("About", "commitment_tit")}
                </span>
                <span className="font-light">
                  {t("About", "commitment_sub")}
                </span>
              </h2>
              <p className="text-[1rem] md:text-[1.125rem] leading-relaxed text-gray-600 text-justify">
                {t("About", "commitment_desc")}
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

// Counter Component
function Counter({
  end,
  startTrigger,
}: {
  end: number;
  startTrigger: boolean;
}) {
  const count = useCountUp(end, 2000, startTrigger);
  return <>{count.toLocaleString()}</>;
}

// Progress Bar Component
function ProgressBar({
  label,
  value,
  startTrigger,
}: {
  label: string;
  value: number;
  startTrigger: boolean;
}) {
  const count = useCountUp(value, 2000, startTrigger);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-[1.1rem] font-bold text-[#333]">{label}</span>
        <span className="text-[1.1rem] font-bold text-[#333]">{count}%</span>
      </div>
      <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#C8102E] transition-all duration-1000 ease-out"
          style={{ width: startTrigger ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}
