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
const getCategories = (t: any) => [
  { name: t("Header", "cat_blades"), id: "23" },
  { name: t("Header", "cat_knives"), id: "18" },
  { name: t("Header", "cat_scissors"), id: "27" },
  { name: t("Header", "cat_garden"), id: "28" },
];

interface PaginationData {
  total: number;
  totalPages: number;
  currentPage: number;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const { t, language, translateDynamic } = useLanguage();
  const categories = useMemo(() => getCategories(t), [t]);
  const page = parseInt(searchParams.get("page") || "1");
  const categoryId = searchParams.get("category");
  const activeCategory = categories.find((cat) => cat.id === categoryId);

  const [products, setProducts] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const categoryParam = categoryId ? `&category=${categoryId}` : "";
        const langParam = `&lang=${language}`;
        const res = await fetch(
          `/api/products?page=${page}&per_page=12${categoryParam}${langParam}`,
        );
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [page, categoryId, language]);

  return (
    <div className="bg-background min-h-screen">
      {/* Phần 1: Inner Banner */}
      <section className="relative w-full">
        <div className="relative w-full h-62.5 md:h-auto md:aspect-1920/450 overflow-hidden flex items-center justify-center">
          <Image
            src={`${WP_URL}/wp-content/uploads/2026/04/Products1.jpg`}
            alt="Products"
            fill
            className="object-cover"
            priority
          />
          <h1
            className="relative z-10 text-[#C8102E] text-5xl md:text-6xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {t("Header", "products")}
          </h1>
        </div>

        {/* Banner Menu */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="max-w-[1400px] mx-auto w-full">
            <ul className="flex flex-wrap md:flex-nowrap">
              {categories.map((cat, index) => (
                <li key={cat.name} className="flex-1 min-w-[200px]">
                  <NextLink
                    href={`/products?category=${cat.id}`}
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
      <div className="max-w-360 mx-auto px-5">
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
                href="/products"
                className="transition-all duration-400 hover:text-[#cf2e2e]"
              >
                {t("Header", "products")}
              </NextLink>
              <span>&gt;</span>
              <span className="font-medium">{activeCategory.name}</span>
            </>
          ) : (
            <span className="font-medium">{t("Header", "products")}</span>
          )}
        </div>
      </div>

      {/* Phần 3: Product List */}
      <section className="max-w-360 mx-auto px-5 pb-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C8102E]"></div>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-[2%] gap-y-12.5">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="group bg-white shadow-[5px_5px_10px_0_#eaeaea] overflow-hidden"
                >
                  <NextLink
                    href={product.link}
                    className="block overflow-hidden aspect-15/8 relative"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition-all duration-[600ms] scale-100 group-hover:scale-110"
                    />
                  </NextLink>

                  <div className="p-[20px_25px_25px]">
                    <NextLink
                      href={product.link}
                      className="block text-[18px] font-medium text-[#333] mb-[50px] overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-[600ms] hover:text-[#cf2e2e]"
                    >
                      {translateDynamic(product.name)}
                    </NextLink>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <a
                          href="https://zalo.me/1149657744507910410"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 group/link"
                        >
                          <img
                            src={`${WP_URL}/wp-content/uploads/2026/04/chat-icon.png`}
                            alt="Chat"
                            className="w-4 h-4 object-contain"
                          />
                          <span className="text-[#C8102E] text-[14px] font-medium underline group-hover/link:no-underline transition-all duration-300">
                            {t("Products", "chatNow")}
                          </span>
                        </a>
                        <a
                          href="https://m.me/phuthaitechnology?text=Xin%20ch%C3%A0o%21%20T%C3%B4i%20c%E1%BA%A7n%20h%E1%BB%97%20tr%E1%BB%A3"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 group/link"
                        >
                          <img
                            src={`${WP_URL}/wp-content/uploads/2026/04/msg-icon.png`}
                            alt="Message"
                            className="w-4 h-4 object-contain"
                          />
                          <span className="text-[#C8102E] text-[14px] font-medium underline group-hover/link:no-underline transition-all duration-300">
                            {t("Products", "message")}
                          </span>
                        </a>
                      </div>

                      <NextLink
                        href={product.link}
                        className="w-33.75 h-7.5 border-2 border-[#C8102E] rounded-[15px] leading-6.5 text-center font-medium text-[#C8102E] text-[14px] transition-all duration-600 hover:bg-[#C8102E] hover:text-white"
                      >
                        {t("Products", "learnMore")}
                      </NextLink>
                    </div>
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
                      href={`/products?page=${p}${categoryId ? `&category=${categoryId}` : ""}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-md border text-lg transition-all ${
                        p === pagination.currentPage
                          ? "bg-[#C8102E] border-[#C8102E] text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:border-[#C8102E] hover:text-[#C8102E]"
                      }`}
                    >
                      {p}
                    </NextLink>
                  ))}
                  {pagination.currentPage < pagination.totalPages && (
                    <NextLink
                      href={`/products?page=${pagination.currentPage + 1}${categoryId ? `&category=${categoryId}` : ""}`}
                      className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:border-[#C8102E] hover:text-[#C8102E]"
                    >
                      &gt;
                    </NextLink>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-background min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C8102E]"></div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
