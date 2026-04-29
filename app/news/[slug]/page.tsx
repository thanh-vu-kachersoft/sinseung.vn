"use client";

import { useEffect, useState, use, Suspense } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://magenta-stork-113658.hostingersite.com";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface PostDetail {
  id: number;
  title: string;
  date: string;
  content: string;
  headings: Heading[];
  categories: { name: string; slug: string; id: number }[];
}

interface RelatedPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  link: string;
}

function NewsDetailContent({ slug }: { slug: string }) {
  const { t, language, translateDynamic } = useLanguage();

  const [post, setPost] = useState<PostDetail | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    whatsapp: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    async function fetchPostData() {
      setLoading(true);
      try {
        // Fetch current post
        const res = await fetch(
          `${WP_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed&lang=${language}`,
        );
        const data = await res.json();

        if (data && data.length > 0) {
          const p = data[0];
          const rawContent = p.content?.rendered || "";

          // Automatically extract headings and inject IDs
          const extractedHeadings: Heading[] = [];
          let hIndex = 0;
          const processedContent = rawContent.replace(
            /<h([1-6])(.*?)>(.*?)<\/h\1>/gi,
            (match: string, level: string, attrs: string, text: string) => {
              const cleanText = text.replace(/<[^>]*>?/gm, "").trim();
              if (!cleanText) return match;

              // Extract existing ID if present to avoid mismatch
              const idMatch = attrs.match(/id=["'](.*?)["']/);
              const id = idMatch ? idMatch[1] : `heading-${hIndex++}`;

              extractedHeadings.push({
                id,
                text: cleanText,
                level: parseInt(level),
              });

              // If ID already exists in HTML, keep it, otherwise inject generated one
              if (idMatch) {
                return match;
              }
              return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
            },
          );

          setPost({
            id: p.id,
            title: translateDynamic(p.title?.rendered),
            date: new Date(p.date).toISOString().split("T")[0],
            content: processedContent,
            headings: extractedHeadings,
            categories: p._embedded?.["wp:term"]?.[0] || [],
          });

          // Fetch related posts
          const catId = p.categories?.[0];
          if (catId) {
            const relRes = await fetch(
              `${WP_URL}/wp-json/wp/v2/posts?categories=${catId}&per_page=3&exclude=${p.id}&_embed&lang=${language}`,
            );
            const relData = await relRes.json();
            if (Array.isArray(relData)) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const transformed = relData.map((rp: any) => {
                const content = rp.content?.rendered || "";
                const imgMatch = content.match(/<img [^>]*src="([^"]+)"/);
                return {
                  id: rp.id,
                  title: rp.title?.rendered,
                  date: new Date(rp.date)
                    .toLocaleDateString("zh-Hans-CN")
                    .replace(/\//g, "/"),
                  excerpt:
                    rp.excerpt?.rendered
                      ?.replace(/<[^>]*>?/gm, "")
                      .substring(0, 120) + "...",
                  image: imgMatch
                    ? imgMatch[1]
                    : rp._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
                  link: `/news/${rp.slug}`,
                };
              });
              setRelatedPosts(transformed);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch news detail:", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchPostData();
  }, [slug, language, translateDynamic]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e83428]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-background min-h-screen py-20 text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <NextLink
          href="/news"
          className="text-[#e83428] underline mt-4 inline-block"
        >
          Back to News
        </NextLink>
      </div>
    );
  }

  const activeCategory = post.categories?.[0];

  return (
    <div className="bg-background min-h-screen">
      {/* Banner */}
      <section className="relative w-full">
        <div className="relative w-full h-62.5 md:h-auto md:aspect-1920/450 overflow-hidden flex items-center justify-center">
          <Image
            src={`${WP_URL}/wp-content/uploads/2026/04/NEWS1.jpg`}
            alt="News"
            fill
            className="object-cover brightness-75"
            priority
          />
          <h1 className="relative z-10 text-white text-5xl md:text-6xl font-bold uppercase tracking-wide">
            {t("Header", "news")}
          </h1>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-360 mx-auto px-5">
        <div className="py-10 flex items-center gap-2 text-[18px] text-[#494949]">
          <NextLink
            href="/"
            className="flex items-center gap-2 transition-all duration-400 hover:text-[#cf2e2e] home"
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
          <NextLink href="/news" className="hover:text-[#cf2e2e]">
            {t("Header", "news")}
          </NextLink>
          {activeCategory && (
            <>
              <span>&gt;</span>
              <NextLink
                href={`/news?category=${activeCategory.id}`}
                className="hover:text-[#cf2e2e]"
              >
                {translateDynamic(activeCategory.name)}
              </NextLink>
            </>
          )}
          <span>&gt;</span>
          <span className="text-[#333] line-clamp-1 truncate max-w-75">
            {post.title}
          </span>
        </div>
      </div>

      <div className="news-dis-box pb-20">
        <div className="news-tit text-center mb-16">
          <div className="max-w-360 mx-auto px-4">
            <h1 className="text-[32px] md:text-[40px] font-bold text-[#333] mb-4 leading-tight">
              {post.title}
            </h1>
            <span className="text-gray-500 text-lg">{post.date}</span>
          </div>
        </div>

        <div className="max-w-360 mx-auto px-4">
          <div className="bg-background p-8 md:p-16 shadow-sm">
            {/* Table of Contents */}
            {post.headings.length > 0 && (
              <div className="headings-navigation bg-gray-50 border-l-4 border-[#e83428] p-8 mb-12 shadow-sm">
                <h4 className="text-[20px] font-bold mb-6 text-[#333] uppercase tracking-wide">
                  Table of Contents
                </h4>
                <ul className="space-y-3">
                  {post.headings.map((heading) => (
                    <li
                      key={heading.id}
                      style={{ paddingLeft: `${(heading.level - 1) * 1.5}rem` }}
                      className="transition-all hover:translate-x-1"
                    >
                      <button
                        onClick={() => scrollToHeading(heading.id)}
                        className="text-[#666] hover:text-[#cf2e2e] transition-colors duration-300 flex items-start gap-2 text-[16px] text-left"
                      >
                        <span className="text-[#cf2e2e] opacity-50">•</span>
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className="editor-content prose prose-lg max-w-none prose-img:mx-auto prose-img:rounded-sm text-[#444] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>

      {/* Related News */}
      <section className="related-news py-20 bg-gray-50/50">
        <div className="max-w-360 mx-auto px-4">
          <div className="related-tit mb-12 text-center">
            <h6 className="text-[36px] font-bold text-[#333] uppercase">
              Related News
            </h6>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rp) => (
              <div
                key={rp.id}
                className="group bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <NextLink
                  href={rp.link}
                  className="block aspect-video relative overflow-hidden"
                >
                  <Image
                    src={
                      rp.image ||
                      `${WP_URL}/wp-content/uploads/2026/04/Exhibition-Record-VIETOFFICE1.jpg`
                    }
                    alt={rp.title}
                    fill
                    className="object-contain p-2 transition-all duration-500 group-hover:scale-105"
                  />
                </NextLink>
                <div className="p-6">
                  <NextLink
                    href={rp.link}
                    className="text-xl font-bold text-[#333] hover:text-[#cf2e2e] transition-colors line-clamp-2 mb-3"
                  >
                    {translateDynamic(rp.title)}
                  </NextLink>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {rp.excerpt}
                  </p>
                  <span className="text-gray-400 text-xs">{rp.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message Board */}
      <section id="Message" className="py-20 bg-background">
        <div className="max-w-360 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-bold text-[#333] uppercase italic">
              Message Board
            </h2>
          </div>
          <div className="max-w-full mx-auto">
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 p-10 text-center rounded-lg">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  {language === "vi" ? "Gửi thành công!" : "Sent Successfully!"}
                </h3>
                <p className="text-green-700">Thank you for your message.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-[#e83428] font-bold hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <input
                  type="text"
                  placeholder="Name*"
                  required
                  className="w-full border border-gray-300 p-2.5 rounded-sm focus:border-[#e83428] outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="E-mail*"
                  required
                  className="w-full border border-gray-300 p-2.5 rounded-sm focus:border-[#e83428] outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Country / Region*"
                  required
                  className="w-full border border-gray-300 p-2.5 rounded-sm focus:border-[#e83428] outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 p-2.5 rounded-sm focus:border-[#e83428] outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full md:col-span-2 border border-gray-300 p-2.5 rounded-sm focus:border-[#e83428] outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
                <textarea
                  placeholder="Leave a message"
                  rows={6}
                  required
                  className="w-full md:col-span-2 border border-gray-300 p-2.5 rounded-sm focus:border-[#e83428] outline-none resize-none"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
                <div className="md:col-span-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#e83428] text-white px-16 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-[#cf2e2e] transition-all shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SingleNewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <Suspense
      fallback={
        <div className="bg-background min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e83428]"></div>
        </div>
      }
    >
      <NewsDetailContent slug={slug} />
    </Suspense>
  );
}
