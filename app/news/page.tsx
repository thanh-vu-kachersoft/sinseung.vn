"use client";

import NextLink from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://magenta-stork-113658.hostingersite.com";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNewsCategories = (t: any) => [
  { name: t("Header", "news_exhibition"), id: "32" },
  { name: t("Header", "news_products"), id: "31" },
  { name: t("Header", "news_company"), id: "33" },
];

interface PaginationData {
  total: number;
  totalPages: number;
  currentPage: number;
}

function NewsContent() {
  const searchParams = useSearchParams();
  const { t, language, translateDynamic } = useLanguage();
  const categories = useMemo(() => getNewsCategories(t), [t]);

  const page = parseInt(searchParams.get("page") || "1");
  const categoryId = searchParams.get("category");
  const activeCategory = categories.find((cat) => cat.id === categoryId);

  const [posts, setPosts] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const categoryParam = categoryId ? `&category=${categoryId}` : "";
        const langParam = `&lang=${language}`;
        const res = await fetch(
          `/api/posts?page=${page}&per_page=10${categoryParam}${langParam}`,
        );
        const data = await res.json();
        if (data.posts) {
          setPosts(data.posts);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [page, categoryId, language]);

  return (
    <div className="bg-background min-h-screen">
      {/* Phần 1: Inner Banner */}
      <section className="relative w-full">
        <div className="relative w-full h-62.5 md:h-auto md:aspect-1920/450 overflow-hidden flex items-center justify-center">
          <Image
            src={`${WP_URL}/wp-content/uploads/2026/04/NEWS1.jpg`}
            alt="News"
            fill
            className="object-cover"
            priority
          />
          <h1
            className="relative z-10 text-[#C8102E] text-5xl md:text-6xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {t("Header", "news")}
          </h1>
        </div>

        {/* Banner Menu */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="max-w-[1400px] mx-auto w-full">
            <ul className="flex flex-wrap md:flex-nowrap">
              {categories.map((cat, index) => (
                <li key={cat.id} className="flex-1 min-w-[200px]">
                  <NextLink
                    href={`/news?category=${cat.id}`}
                    className={`block text-center text-[#F5F5F0] py-[23px] text-[20px] font-medium transition-all duration-[600ms] outline-none ${
                      index > 0 ? "border-l border-[#F5F5F0]" : ""
                    } ${
                      categoryId === cat.id
                        ? "bg-[#C8102E]"
                        : "bg-[#1B2A4A] hover:bg-[#C8102E]"
                    }`}
                  >
                    {cat.name}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Phần 2: Crumbs Box */}
      {/* Crumbs Box */}
      <div className="max-w-[1440px] mx-auto px-5">
        <div className="py-10 flex items-center gap-2 text-[18px] text-[#494949]">
          <NextLink
            href="/"
            className="flex items-center gap-2 transition-all duration-400 hover:text-[#cf2e2e]"
          >
            <div
              className="w-4.5 h-4.5 bg-no-repeat bg-left center"
              style={{
                backgroundImage: `url(${WP_URL}/wp-content/uploads/2026/04/home-icon.png)`,
                backgroundSize: "contain",
              }}
            />
            {t("Header", "home")}
          </NextLink>
          <span>&gt;</span>
          {activeCategory ? (
            <>
              <NextLink
                href="/news"
                className="transition-all duration-400 hover:text-[#cf2e2e]"
              >
                {t("Header", "news")}
              </NextLink>
              <span>&gt;</span>
              <span className="font-medium text-[#333]">
                {activeCategory.name}
              </span>
            </>
          ) : (
            <span className="font-medium text-[#333]">
              {t("Header", "news")}
            </span>
          )}
        </div>
      </div>

      {/* Phần 3: News List */}
      <section className="max-w-[1440px] mx-auto px-[20px] pb-[80px]">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C8102E]"></div>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {posts.map((post) => (
                <li key={post.id} className="group flex flex-col h-full">
                  {/* Image: Top */}
                  <NextLink
                    href={post.link}
                    className="w-full aspect-[16/9] relative overflow-hidden mb-6 block bg-white shadow-sm border border-black/5"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="absolute left-0 top-0 w-full h-full object-contain transition-all duration-[600ms] group-hover:scale-105"
                    />
                  </NextLink>

                  {/* Title & Excerpt: Middle */}
                  <div className="flex-grow">
                    <NextLink
                      href={post.link}
                      className="text-[24px] font-bold text-[#333] mb-4 hover:text-[#cf2e2e] transition-colors line-clamp-2 leading-tight block"
                    >
                      {translateDynamic(post.title)}
                    </NextLink>

                    <div
                      className="text-[#666] text-[16px] leading-relaxed mb-6 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: translateDynamic(
                          post.excerpt.replace(/<[^>]*>?/gm, ""),
                        ),
                      }}
                    />
                  </div>

                  {/* Date: Bottom Left */}
                  <div className="text-[#999] text-[14px] font-medium pt-4 border-t border-black/5">
                    {post.date}
                  </div>
                </li>
              ))}
            </ul>

            {/* Phân trang */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-20 flex justify-center">
                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  ).map((p) => (
                    <NextLink
                      key={p}
                      href={`/news?page=${p}${categoryId ? `&category=${categoryId}` : ""}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-md border text-lg transition-all ${
                        p === pagination.currentPage
                          ? "bg-[#e83428] border-[#e83428] text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:border-[#e83428] hover:text-[#e83428]"
                      }`}
                    >
                      {p}
                    </NextLink>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[var(--background)] min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e83428]"></div>
        </div>
      }
    >
      <NewsContent />
    </Suspense>
  );
}
