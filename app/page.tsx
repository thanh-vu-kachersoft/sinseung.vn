"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://magenta-stork-113658.hostingersite.com";

export default function Home() {
  const { t, language, translateDynamic } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dynamicNews, setDynamicNews] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [dynamicProducts, setDynamicProducts] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/posts?per_page=4&lang=${language}`);
        const data = await res.json();
        if (data.posts) setDynamicNews(data.posts);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    }

    async function fetchProducts() {
      try {
        // Lấy 4 sản phẩm tiêu biểu cho trang chủ
        const res = await fetch(`/api/products?per_page=4&lang=${language}`);
        const data = await res.json();
        if (data.products) setDynamicProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }

    fetchNews();
    fetchProducts();
  }, [language]);
  const banners = useMemo(
    () => [
      {
        id: 1,
        image: `${WP_URL}/wp-content/uploads/2026/04/banner1.jpg`,
        title: t("Banner", "b1_title"),
        subtitle: t("Banner", "b1_sub"),
        link: "/cutter-blades",
        description: t("Banner", "b1_desc"),
        alt_text: t("Banner", "b1_title"),
      },
      {
        id: 2,
        image: `${WP_URL}/wp-content/uploads/2026/04/banner2.jpg`,
        title: t("Banner", "b2_title"),
        subtitle: t("Banner", "b2_sub"),
        link: "/utility-knives",
        description: t("Banner", "b2_desc"),
        alt_text: t("Banner", "b2_title"),
      },
      {
        id: 3,
        image: `${WP_URL}/wp-content/uploads/2026/04/banner3.jpg`,
        title: t("Banner", "b3_title"),
        subtitle: t("Banner", "b3_sub"),
        link: "/hardware-scissors",
        description: t("Banner", "b3_desc"),
        alt_text: t("Banner", "b3_title"),
      },
      {
        id: 4,
        image: `${WP_URL}/wp-content/uploads/2026/04/banner4.jpg`,
        title: t("Banner", "b4_title"),
        subtitle: t("Banner", "b4_sub"),
        link: "/garden-shears-and-tools",
        description: t("Banner", "b4_desc"),
        alt_text: t("Banner", "b4_title"),
      },
      {
        id: 5,
        image: `${WP_URL}/wp-content/uploads/2026/04/banner5.jpg`,
        title: t("Banner", "b5_title"),
        subtitle: t("Banner", "b5_sub"),
        link: "/cutter-blades/special-shaped-blades",
        description: t("Banner", "b5_desc"),
        alt_text: t("Banner", "b5_title"),
      },
      {
        id: 6,
        image: `${WP_URL}/wp-content/uploads/2026/04/banner6-1.jpg`,
        title: t("Banner", "b6_title"),
        subtitle: t("Banner", "b6_sub"),
        link: "/products",
        description: t("Banner", "b6_desc"),
        alt_text: t("Banner", "b6_title"),
      },
    ],
    [t],
  );

  const videos = useMemo(
    () => [
      {
        id: 1,
        image: `${WP_URL}/wp-content/uploads/2026/04/Sinseung-Blades-factory-448-303.jpeg`,
        url: "https://www.youtube.com/embed/fF0C_VvEOTo?si=WXvXbpU1z4LDpMqn",
      },
      {
        id: 2,
        image: `${WP_URL}/wp-content/uploads/2026/04/Blades-and-cutters.jpg`,
        url: "https://www.youtube.com/embed/URbaOGLEQS8?si=3m4i7gBbpLPubYN-",
      },
      {
        id: 3,
        image: `${WP_URL}/wp-content/uploads/2026/04/Korean-Factory-448-303.jpeg`,
        url: "https://www.youtube.com/embed/zWnb9aCzkCU?si=AM2N0fVSaaAxs_6R",
      },
      {
        id: 4,
        image: `${WP_URL}/wp-content/uploads/2026/04/Garden-Tools1.jpg`,
        url: "https://www.youtube.com/embed/2EHm5oAkoHw?si=44-WbvmHYX3DyuXH",
      },
    ],
    [],
  );

  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [banners.length, currentSlide]);

  const goToSlide = (index: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentSlide(index);
  };

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="bg-background" style={{paddingBottom: "30px"}}>
      {/* Dynamic Banner Carousel */}
      <section className="relative w-full overflow-hidden bg-gray-900">
        <div className="relative w-full h-[60vh] md:h-auto md:aspect-1920/955 max-h-[90vh]">
          {banners.map((banner, index) => (
            <Link
              href={banner.link}
              key={banner.id}
              className={`absolute inset-0 block transition-opacity duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={banner.image}
                alt={banner.alt_text || banner.title}
                fill
                className="object-cover"
                priority={true}
                sizes="100vw"
                quality={85}
              />
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-360 px-8 md:px-24 mt-8 md:mt-0">
                  <div className="max-w-4xl" style={{ display: "none" }}>
                    <h2
                      className="text-[2rem] md:text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-tight text-[#C8102E] mb-2 drop-shadow-md md:drop-shadow-none"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {banner.title}
                    </h2>
                    <p
                      className="text-[1.25rem] md:text-[clamp(1.5rem,4vw,3.5rem)] font-bold text-[#333] leading-tight drop-shadow-md md:drop-shadow-none bg-white/50 md:bg-transparent inline-block px-2 md:px-0 rounded-md md:rounded-none"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {banner.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all z-20 cursor-pointer"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all z-20 cursor-pointer"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
            {banners.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={(e) => goToSlide(index, e)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all cursor-pointer ${
                  index === currentSlide
                    ? "bg-white"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-[5rem]">
        <h2 className="text-[2.5rem] font-bold text-[#333] mb-[3rem] text-center uppercase tracking-wider">
          {t("Header", "products")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {dynamicProducts.length > 0 ? (
            dynamicProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={translateDynamic(product.name)}
                href={product.link}
                image={product.image}
              />
            ))
          ) : (
            <>
              <ProductCard
                title={t("Products", "cat_blades") + " (9mm)"}
                href="/cutter-blades/9mm-blades"
                image={`${WP_URL}/wp-content/uploads/2026/04/lQDPKc2ZC2jvbS3NAljNA4SwoyOPW5nVu8cIXZS0yelSAQ_900_600.jpg`}
              />
              <ProductCard
                title={t("Products", "cat_blades") + " (18mm)"}
                href="/cutter-blades/18mm-blades"
                image={`${WP_URL}/wp-content/uploads/2026/04/lQDPKc2ZC2jvbS3NAljNA4SwoyOPW5nVu8cIXZS0yelSAQ_900_600.jpg`}
              />
              <ProductCard
                title={t("Products", "cat_scissors")}
                href="/hardware-scissors"
                image={`${WP_URL}/wp-content/uploads/2026/04/SB101-2.jpg`}
              />
              <ProductCard
                title={t("Products", "cat_garden")}
                href="/garden-shears-and-tools/pruning-shears"
                image={`${WP_URL}/wp-content/uploads/2026/04/SB900-10.jpg`}
              />
            </>
          )}
        </div>
      </section>

      {/* Videos Section */}
      <section
        className="relative py-[3rem] md:py-[5rem] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${WP_URL}/wp-content/uploads/2026/04/NEWS1.jpg)`,
        }}
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[0.75rem] pb-[2rem] md:pb-[5rem] relative z-10">
          <h2
            className="text-[2rem] md:text-[2.5rem] font-bold text-white mb-[2rem] md:mb-[3rem] text-center uppercase tracking-wider"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
          >
            {t("Header", "video")}
          </h2>

          <div
            className="relative w-full mx-auto h-[250px] md:h-[400px] flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {videos.map((video, index) => {
              let position = (index - currentVideoSlide) % videos.length;
              if (position < 0) position += videos.length;

              if (position > 1 && position < videos.length - 1) {
                position = 2; // Hidden items
              } else if (position === videos.length - 1) {
                position = -1; // Left item
              }

              const isCenter = position === 0;
              const isLeft = position === -1;
              const isRight = position === 1;
              const isHidden = Math.abs(position) > 1;

              // Coverflow effect math based on original CSS
              const translateX = position * 75; // Spacing between slides
              const translateZ = -Math.abs(position) * 220; // Depth as per original CSS
              const rotateY = -position * 40; // Rotation angle as per original CSS

              const transform = `translate3d(${translateX}%, 0px, ${translateZ}px) rotateX(0deg) rotateY(${rotateY}deg)`;
              const zIndex = 30 - Math.abs(position);
              const opacity = isHidden ? 0 : 1;

              return (
                <div
                  key={video.id}
                  className="absolute w-[60%] md:w-[42%] h-full transition-all duration-[600ms] ease-in-out cursor-pointer group"
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    pointerEvents: isHidden ? "none" : "auto",
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => {
                    if (isCenter) {
                      setActiveVideo(video.url);
                    } else if (isLeft) {
                      setCurrentVideoSlide(
                        (prev) => (prev - 1 + videos.length) % videos.length,
                      );
                    } else if (isRight) {
                      setCurrentVideoSlide(
                        (prev) => (prev + 1) % videos.length,
                      );
                    }
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={video.image}
                      alt="Video thumbnail"
                      fill
                      sizes="(max-width: 768px) 100vw, 42vw"
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
                        isCenter ? "bg-black/10 group-hover:bg-black/20" : ""
                      }`}
                    >
                      {isCenter && (
                        <div className="w-16 h-16 bg-[#C8102E]/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              className="absolute left-0 top-1/2 -mt-[80px] w-[24px] h-[160px] bg-[rgba(0,0,0,0.68)] hover:bg-[#fb2c36] transition-all duration-[600ms] flex items-center justify-center z-40 text-white cursor-pointer outline-none"
              onClick={() =>
                setCurrentVideoSlide(
                  (prev) => (prev - 1 + videos.length) % videos.length,
                )
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute right-0 top-1/2 -mt-[80px] w-[24px] h-[160px] bg-[rgba(0,0,0,0.68)] hover:bg-[#fb2c36] transition-all duration-[600ms] flex items-center justify-center z-40 text-white cursor-pointer outline-none"
              onClick={() =>
                setCurrentVideoSlide((prev) => (prev + 1) % videos.length)
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-[1000px]">
            <button
              className="absolute -top-12 right-0 text-white hover:text-[#C8102E] z-50 text-4xl"
              onClick={() => setActiveVideo(null)}
            >
              &times;
            </button>
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={`${activeVideo}&autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Application Section */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-[3rem] md:pt-[5rem] pb-[3rem] md:pb-[5rem] bg-[var(--background)]">
        <h2
          className="text-[2rem] md:text-[2.5rem] font-bold text-[#333] mb-[2rem] md:mb-[4rem] text-center uppercase tracking-wider"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
        >
          {t("Header", "application")}
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-0">
          {/* Left List */}
          <div className="w-full md:w-[30.8%]">
            <ul>
              <li className="group">
                <div className="w-full md:w-[100%] bg-[#C8102E] text-white p-6 md:p-[25px_40px_30px] shadow-[4px_4px_20px_0_rgba(0,0,0,0.2)] transition-all duration-[600ms] cursor-pointer">
                  <Link
                    href="/application/the-competitive-edge-of-sinseungs-heat-treated-scissors"
                    className="block"
                  >
                    <b
                      className="text-[1.25rem] md:text-[1.5rem] font-medium block leading-tight"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        paddingBottom: "1.5rem",
                      }}
                    >
                      {t("Application", "post1_title")}
                    </b>
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Preview */}
          <div className="w-full md:w-[64.375%] ml-auto relative mt-12 md:mt-0">
            {/* Image Box */}
            <div className="w-full md:w-[52.3%] relative z-10 aspect-471/314 overflow-hidden">
              <Link
                href="/application/the-competitive-edge-of-sinseungs-heat-treated-scissors"
                className="block w-full h-full"
              >
                <Image
                  src={`${WP_URL}/wp-content/uploads/2026/04/SINSEUNG-heat-treatment-1.jpg`}
                  alt="SINSEUNG heat treatment"
                  fill
                  className="object-cover"
                />
              </Link>
            </div>

            {/* Text Box with Red Border */}
            <div className="w-full md:w-[70%] border-[0.375rem] border-[#C8102E] bg-white box-border md:mt-[-250px] md:float-right p-6 md:p-[40px_20px_40px_26%] relative z-0 md:z-auto">
              <Link
                href="/application/the-competitive-edge-of-sinseungs-heat-treated-scissors"
                className="text-[1.25rem] md:text-[24px] font-medium text-[#666] hover:text-[#C8102E] transition-colors duration-[600ms] block leading-tight mb-3 md:mb-5"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {t("Application", "post1_title")}
              </Link>
              <div className="h-[6rem] md:h-[9.375rem] overflow-hidden text-[#888] text-sm md:text-base leading-relaxed md:leading-[1.5625rem]">
                {/* Description space */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section
        className="relative py-[3rem] md:py-[80px] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${WP_URL}/wp-content/uploads/2026/04/NEWS1.jpg)`,
        }}
      >
        <div className="mx-auto w-full max-w-[1440px] relative z-10">
          <h2
            className="text-[2rem] md:text-[40px] font-bold text-white mb-8 md:mb-12 text-center uppercase tracking-wider"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
          >
            {t("Header", "news")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 px-4 md:px-0">
            {dynamicNews.length > 0 ? (
              <>
                {/* Row 1 */}
                <Link
                  href="/news/exhibition-news/exhibition-record-vietoffice"
                  className="aspect-[360/278] relative overflow-hidden bg-white group block"
                >
                  <Image
                    src={`${WP_URL}/wp-content/uploads/2026/04/The-Three-Chairmen-Met-And-Communicated1.jpg`}
                    alt="Exhibition Record- VIETOFFICE"
                    fill
                    className="absolute left-0 top-0 w-full h-full object-cover transition-all duration-[600ms] group-hover:scale-110"
                  />
                </Link>
                <NewsCard
                  title={translateDynamic("Exhibition Record- VIETOFFICE")}
                  date="2025/06/24"
                  href="/news/exhibition-news/exhibition-record-vietoffice"
                />
                <Link
                  href="/news/exhibition-news/sinseung-at-2025-china-international-hardware-show"
                  className="aspect-[360/278] relative overflow-hidden bg-[var(--background)] group block"
                >
                  <Image
                    src={`${WP_URL}/wp-content/uploads/2026/04/THE-138TH-CANTON-FAIR-360-278.jpeg`}
                    alt="Sinseung at 2025 China International Hardware Show"
                    fill
                    className="absolute left-0 top-0 w-full h-full object-cover transition-all duration-[600ms] group-hover:scale-110"
                  />
                </Link>
                <NewsCard
                  title={translateDynamic(
                    "Sinseung at 2025 China International Hardware Show",
                  )}
                  date="2025/11/24"
                  href="/news/exhibition-news/sinseung-at-2025-china-international-hardware-show"
                />

                {/* Row 2 */}
                <NewsCard
                  title={translateDynamic(
                    "The Three Chairmen Met And Communicated",
                  )}
                  date="2025/06/24"
                  href="/news/exhibition-news/the-three-chairmen-met-and-communicated"
                />
                <Link
                  href="/news/exhibition-news/the-three-chairmen-met-and-communicated"
                  className="aspect-[360/278] relative overflow-hidden bg-[var(--background)] group block"
                >
                  <Image
                    src={`${WP_URL}/wp-content/uploads/2026/04/Exhibition-Record-VIETOFFICE1.jpg`}
                    alt="The Three Chairmen Met And Communicated"
                    fill
                    className="absolute left-0 top-0 w-full h-full object-cover transition-all duration-[600ms] group-hover:scale-110"
                  />
                </Link>
                <NewsCard
                  title={translateDynamic("Sinseung at The 138th Canton Fair")}
                  date="2025/11/24"
                  href="/news/exhibition-news/sinseung-at-the-138th-canton-fair"
                />
                <Link
                  href="/news/exhibition-news/sinseung-at-the-138th-canton-fair"
                  className="aspect-[360/278] relative overflow-hidden bg-[var(--background)] group block"
                >
                  <Image
                    src={`${WP_URL}/wp-content/uploads/2026/04/2025-CHINA-INTERNATIONAL-HARDWARE-SHOW-360-278.jpeg`}
                    alt="Sinseung at The 138th Canton Fair"
                    fill
                    className="absolute left-0 top-0 w-full h-full object-cover transition-all duration-[600ms] group-hover:scale-110"
                  />
                </Link>
              </>
            ) : (
              <div className="col-span-4 py-[5rem] text-center text-white">
                Loading news...
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({
  title,
  href,
  image,
}: {
  title: string;
  href: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col w-full items-start outline-none bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="relative overflow-hidden w-full aspect-15/8 mb-6">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute left-0 top-0 w-full h-full object-contain scale-100 group-hover:scale-110 transition-transform duration-600"
        />
      </div>
      <h3
        className="text-[1.125rem] font-medium text-[#333] text-center overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-[600ms] group-hover:text-[#C8102E] m-0 p-0 w-full"
        style={{ fontFamily: "inherit" }}
      >
        {title}
      </h3>
    </Link>
  );
}

function NewsCard({
  title,
  date,
  href,
}: {
  title: string;
  date: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative bg-[var(--background)] md:h-full flex flex-col gap-4 md:justify-between p-6 md:p-8 overflow-hidden shadow-sm md:shadow-none"
    >
      <div
        className="text-[1.25rem] md:text-[1.5rem] font-medium text-[#666] leading-[1.6rem] md:leading-[1.875rem] h-[3.2rem] md:h-[3.75rem] overflow-hidden text-ellipsis transition-all duration-[600ms] group-hover:text-[#C8102E] block"
        style={{
          fontFamily: "inherit",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {title}
      </div>
      <div className="text-[0.875rem] text-[#999]">{date}</div>
    </Link>
  );
}
