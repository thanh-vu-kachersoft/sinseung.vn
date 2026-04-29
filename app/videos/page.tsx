"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://magenta-stork-113658.hostingersite.com";

const videoList = [
  {
    id: 1,
    title: "Sinseung Blades Factory",
    image: `${WP_URL}/wp-content/uploads/2026/04/Sinseung-Blades-factory-448-303-1.jpeg`,
    videoUrl: "https://www.youtube.com/embed/fF0C_VvEOTo?si=WXvXbpU1z4LDpMqn",
  },
  {
    id: 2,
    title: "Garden Tools",
    image: `${WP_URL}/wp-content/uploads/2026/04/Garden-Tools1-1.jpg`,
    videoUrl: "https://www.youtube.com/embed/2EHm5oAkoHw?si=44-WbvmHYX3DyuXH",
  },
  {
    id: 3,
    title: "Pruning Shears",
    image: `${WP_URL}/wp-content/uploads/2026/04/Pruning-Shears.jpg`,
    videoUrl: "https://www.youtube.com/embed/2EHm5oAkoHw?si=ed_5D1p2lqxDMbdG",
  },
  {
    id: 4,
    title: "Company videos",
    image: `${WP_URL}/wp-content/uploads/2026/04/Korean-Factory-448-303-1.jpeg`,
    videoUrl: "https://www.youtube.com/embed/zWnb9aCzkCU?si=AM2N0fVSaaAxs_6R",
  },
  {
    id: 5,
    title: "Blades and cutters2",
    image: `${WP_URL}/wp-content/uploads/2026/04/Blades-and-cutters-1.jpg`,
    videoUrl: "https://www.youtube.com/embed/URbaOGLEQS8?si=3m4i7gBbpLPubYN-",
  },
];

export default function VideosPage() {
  const { t, translateDynamic } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="bg-[var(--background)] min-h-screen pb-20">
      {/* Banner */}
      <section className="relative w-full">
        <div className="relative w-full h-[250px] md:h-auto md:aspect-[1920/450] overflow-hidden flex items-center justify-center">
          <Image
            src={`${WP_URL}/wp-content/uploads/2026/04/Video-2.jpg`}
            alt="Video Banner"
            fill
            className="object-cover brightness-75"
            priority
          />
          <h1
            className="relative z-10 text-[#C8102E] text-5xl md:text-6xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {t("Header", "video")}
          </h1>
        </div>

        {/* Banner Menu */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="max-w-[1400px] mx-auto w-full">
            <ul
              className="flex flex-wrap md:flex-nowrap"
              style={{
                display: "none",
              }}
            >
              <li className="flex-1 min-w-[200px]">
                <NextLink
                  href="/videos"
                  className="block text-center text-[#F5F5F0] py-[23px] text-[20px] font-medium transition-all duration-[600ms] outline-none bg-[#C8102E]"
                >
                  {t("Header", "video")}
                </NextLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-[90rem] mx-auto px-[20px]">
        <div className="py-[40px] flex items-center gap-2 text-[18px] text-[#494949]">
          <NextLink
            href="/"
            className="flex items-center gap-2 transition-all duration-400 hover:text-[#cf2e2e]"
            style={{
              paddingLeft: "25px",
              backgroundImage: `url(${WP_URL}/wp-content/uploads/2026/04/home-icon.png)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left center",
              backgroundSize: "18px",
            }}
          >
            {t("Header", "home")}
          </NextLink>
          <span>&gt;</span>
          <span className="font-medium text-[#333]">
            {t("Header", "video")}
          </span>
        </div>
      </div>

      {/* Video Grid */}
      <section className="max-w-[90rem] mx-auto px-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {videoList.map((video) => (
            <div key={video.id} className="flex flex-col items-center">
              <div
                className="w-full bg-white shadow-lg overflow-hidden cursor-pointer group"
                onClick={() => setActiveVideo(video.videoUrl)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                    <div className="w-12 h-12 bg-[#C8102E]/90 rounded-full flex items-center justify-center shadow-md">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>

                {/* Title Bar */}
                <div className="bg-[#C8102E] py-4 px-6 text-center">
                  <h3 className="text-white text-[18px] font-medium uppercase tracking-wide truncate">
                    {translateDynamic(video.title)}
                  </h3>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4 w-full justify-center">
                <a
                  href="https://zalo.me/1149657744507910410"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 max-w-[140px] flex items-center justify-center gap-2 border border-[#C8102E] py-1.5 rounded-lg text-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-300 outline-none"
                >
                  <img
                    src={`${WP_URL}/wp-content/uploads/2026/04/chat-icon.png`}
                    className="w-4 h-4 object-contain"
                    alt="Chat"
                  />
                  <span className="text-[14px] font-medium">
                    {t("Products", "chatNow")}
                  </span>
                </a>
                <a
                  href="https://m.me/phuthaitechnology?text=Xin%20ch%C3%A0o%21%20T%C3%B4i%20c%E1%BA%A7n%20h%E1%BB%97%20tr%E1%BB%A3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 max-w-[140px] flex items-center justify-center gap-2 border border-[#C8102E] py-1.5 rounded-lg text-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-300 outline-none"
                >
                  <img
                    src={`${WP_URL}/wp-content/uploads/2026/04/msg-icon.png`}
                    className="w-4 h-4 object-contain"
                    alt="Message"
                  />
                  <span className="text-[14px] font-medium">
                    {t("Products", "message")}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-[1000px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white hover:text-[#C8102E] transition-colors text-4xl leading-none"
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
    </div>
  );
}
