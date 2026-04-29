"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://magenta-stork-113658.hostingersite.com";

interface ProductDetail {
  id: number;
  name: string;
  content: string;
  image: string;
  categories: { name: string; slug: string; id: number }[];
  sku?: string;
}

export default function SingleProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t, language, translateDynamic } = useLanguage();
  const [product, setProduct] = useState<ProductDetail | null>(null);
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
    async function fetchProductDetail() {
      setLoading(true);
      try {
        const response = await fetch(
          `${WP_URL}/wp-json/wp/v2/product?slug=${slug}&_embed&lang=${language}`,
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const p = data[0];
          let imgUrl = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
          if (imgUrl.includes("localhost:3000")) {
            imgUrl = imgUrl.replace("http://localhost:3000", WP_URL);
          } else if (imgUrl && !imgUrl.startsWith("http")) {
            imgUrl = `${WP_URL}${imgUrl}`;
          }

          setProduct({
            id: p.id,
            name: translateDynamic(p.title?.rendered),
            content: p.content?.rendered || "",
            image: imgUrl,
            categories: p._embedded?.["wp:term"]?.[0] || [],
            sku: p.slug.toUpperCase(),
          });
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchProductDetail();
  }, [slug, language, translateDynamic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          country: "",
          whatsapp: "",
          company: "",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const relatedProducts = [
    {
      id: "s102",
      name: "S102 9mm snap off blades",
      image: `${WP_URL}/wp-content/uploads/2026/04/S102-9mm-snap-off-blades.1-300x200.jpg`,
      link: "/cutter-blades/9mm-blades/s102-9mm-snap-off-blades/",
    },
    {
      id: "s103",
      name: "S103 9mm snap off blades",
      image: `${WP_URL}/wp-content/uploads/2026/04/S103-9mm-snap-off-blades.1-300x200.jpg`,
      link: "/cutter-blades/9mm-blades/s103-9mm-snap-off-blades/",
    },
    {
      id: "s301",
      name: "S301 9mm snap off blades",
      image: `${WP_URL}/wp-content/uploads/2026/04/S301-9mm-snap-off-blades.1-300x200.jpg`,
      link: "/cutter-blades/9mm-blades/s301-9mm-snap-off-blades/",
    },
  ];

  if (loading) {
    return (
      <div className="bg-[var(--background)] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e83428]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[var(--background)] min-h-screen py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <NextLink
          href="/products"
          className="text-[#e83428] underline mt-4 inline-block"
        >
          Back to Products
        </NextLink>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Inner Banner */}
      <section className="relative w-full">
        <div className="relative w-full h-[250px] md:h-auto md:aspect-[1920/450] overflow-hidden flex items-center justify-center">
          <Image
            src={`${WP_URL}/wp-content/uploads/2026/04/Products1.jpg`}
            alt="Products"
            fill
            className="object-cover"
            priority
          />
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
          <NextLink href="/products" className="hover:text-[#cf2e2e]">
            {t("Header", "products")}
          </NextLink>
          {product.categories.map((cat) => (
            <span key={cat.id} className="flex items-center gap-2">
              <span>&gt;</span>
              <NextLink
                href={`/products?category=${cat.id}`}
                className="hover:text-[#cf2e2e]"
              >
                {translateDynamic(cat.name)}
              </NextLink>
            </span>
          ))}
          <span>&gt;</span>
          <span className="font-medium text-[#333] line-clamp-1">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product Top Detail */}
      <section className="pb-10 md:pb-20">
        <div className="max-w-[90rem] mx-auto px-[20px]">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
            {/* Image Box */}
            <div
              className="w-full lg:w-1/2 border border-gray-100 flex items-center justify-center p-4 md:p-8 aspect-square md:aspect-[4/3] relative mt-1 md:mt-[9px]"
              style={{ backgroundColor: "#ffffff" }}
            >
              <Image
                src={
                  product.image && product.image.startsWith("http")
                    ? product.image.replace("http://localhost:3000", WP_URL)
                    : `${WP_URL}/wp-content/uploads/2026/04/lQDPKc2ZC2jvbS3NAljNA4SwoyOPW5nVu8cIXZS0yelSAQ_900_600.jpg`
                }
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Tips Box */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-[24px] md:text-[32px] font-bold text-[#333] mb-4 md:mb-6 leading-tight">
                {product.name}
              </h1>
              <div className="text-[#666] text-[15px] md:text-[16px] leading-relaxed space-y-4 mb-8 md:mb-10">
                <p className="font-bold text-[#333]">*High-Quality Material</p>
                <p>
                  Built from tough high carbon steel box cutter blades, the 9mm
                  snap blades hold up well and stay sharp over time. They handle
                  everyday home jobs or heavy industrial work without letting
                  you down.
                </p>
                <p className="font-bold text-[#333]">
                  *Sharp Cutting Performance
                </p>
                <p>
                  Every sharp cutter blade gets a fine grind for smooth slices
                  through paper, cardboard, plastic, rubber, and similar stuff.
                  Those keen edges cut down on drag and speed up your tasks.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mt-6 md:mt-8 w-full max-w-[560px]">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://zalo.me/1149657744507910410"
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-3 border-2 border-[#e83428] py-3 rounded-xl text-[#e83428] hover:bg-[#e83428] hover:text-white transition-all duration-300 group outline-none"
                  >
                    <img
                      src={`${WP_URL}/wp-content/uploads/2026/04/chat-icon.png`}
                      className="w-6 h-6 object-contain group-hover:brightness-0 group-hover:invert transition-all"
                      alt="Chat"
                    />
                    <span className="text-[18px] font-medium">
                      {t("Products", "chatNow")}
                    </span>
                  </a>
                  <a
                    href="mailto:sales@phuthaitech.com.vn"
                    className="flex-1 flex items-center justify-center gap-3 border-2 border-[#e83428] py-3 rounded-xl text-[#e83428] hover:bg-[#e83428] hover:text-white transition-all duration-300 group outline-none"
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
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-[18px] font-medium">Email</span>
                  </a>
                </div>
                <a
                  href="#Message"
                  className="w-full flex items-center justify-center gap-3 border-2 border-[#e83428] py-3 rounded-xl text-[#e83428] hover:bg-[#e83428] hover:text-white transition-all duration-300 group outline-none"
                >
                  <img
                    src={`${WP_URL}/wp-content/uploads/2026/04/msg-icon.png`}
                    className="w-6 h-6 object-contain group-hover:brightness-0 group-hover:invert transition-all"
                    alt="Message"
                  />
                  <span className="text-[18px] font-medium">
                    {t("Products", "message")}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Content / Specs / Features */}
      <section className="bg-[var(--background)] py-10 md:py-16">
        <div className="max-w-[90rem] mx-auto px-[20px]">
          <div className="prose prose-base md:prose-lg max-w-none prose-table:border prose-table:border-gray-200 prose-td:border prose-td:border-gray-200 prose-th:bg-gray-50 prose-th:p-2 md:prose-th:p-4 prose-td:p-2 md:prose-td:p-4 prose-td:text-center prose-img:mx-auto overflow-x-auto">
            {/* Header Section for Specification */}
            <div className="text-center mb-10 md:mb-16">
              <h2
                className="inline-block text-[20px] md:text-[24px] font-medium text-[#333] m-0"
                style={{
                  padding: "10px 0 10px 35px",
                  background: `url(${WP_URL}/wp-content/uploads/2026/04/dis-tit-bg.png) left center no-repeat`,
                }}
              >
                Product Specification
              </h2>
            </div>

            {/* Main Content from WordPress */}
            <div
              dangerouslySetInnerHTML={{ __html: product.content }}
              className="product-html-content"
            />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section
        className="relative py-24 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${WP_URL}/wp-content/uploads/2026/04/prodis-bg.jpg)`,
        }}
      >
        <div className="max-w-[90rem] mx-auto px-[20px] relative z-10">
          <div className="text-center mb-16">
            <h2
              className="inline-block text-[24px] font-medium text-[#333] m-0"
              style={{
                padding: "10px 0 10px 35px",
                background: `url(${WP_URL}/wp-content/uploads/2026/04/dis-tit-bg.png) left center no-repeat`,
              }}
            >
              Feature
            </h2>
          </div>
          <div className="max-w-[1000px] mx-auto">
            <div className="text-[#555] text-[18px] leading-relaxed text-center font-medium">
              <p>
                This premium 9mm snap off blades set is crafted from high carbon
                steel, delivering sharp and precise cuts for arts, graphics,
                crafts, and hobby projects. The blades are same sharp at every
                segments,when one segments becomes dull, just snap off, then you
                can get a fresh sharp one. Compatible with most standard
                cutters, the PPF blades are reliable, durable, and ideal for
                detailed cutting tasks,like cutting car film. Experience
                professional-quality performance with every use of these sharp
                cutter blade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="related-product bg-gray-50 py-10 md:py-[60px]">
        <div className="max-w-[90rem] mx-auto px-[20px]">
          <div className="hc-tit mb-8 md:mb-12">
            <h6 className="text-[24px] md:text-[36px] font-bold text-center uppercase text-[#333]">
              {language === "vi"
                ? "Sản phẩm liên quan"
                : language === "ko"
                  ? "관련 제품"
                  : "Related Products"}
            </h6>
          </div>

          <div className="product-list min-h-[360px] pb-[30px]">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[2%] md:gap-y-[50px]">
              {relatedProducts.map((product) => (
                <li
                  key={product.id}
                  className="group bg-white shadow-[5px_5px_10px_0_#eaeaea] overflow-hidden rounded-md"
                >
                  <NextLink
                    href={product.link}
                    className="block overflow-hidden aspect-[15/8] relative"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-[600ms] scale-100 group-hover:scale-110"
                    />
                  </NextLink>

                  <div className="p-5 md:p-[20px_25px_25px]">
                    <NextLink
                      href={product.link}
                      className="block text-[16px] md:text-[18px] font-medium text-[#333] mb-[20px] md:mb-[30px] overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-[600ms] hover:text-[#cf2e2e]"
                    >
                      {translateDynamic(product.name)}
                    </NextLink>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-3">
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
                          <span className="text-[#e83428] text-[14px] font-medium underline group-hover/link:no-underline transition-all duration-300">
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
                          <span className="text-[#e83428] text-[14px] font-medium underline group-hover/link:no-underline transition-all duration-300">
                            {t("Products", "message")}
                          </span>
                        </a>
                      </div>

                      <NextLink
                        href={product.link}
                        className="w-auto px-4 h-[30px] border-2 border-[#C8102E] rounded-[15px] leading-[26px] text-center font-medium text-[#C8102E] text-[13px] md:text-[14px] transition-all duration-[600ms] hover:bg-[#C8102E] hover:text-white whitespace-nowrap"
                      >
                        {t("Products", "learnMore")}
                      </NextLink>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Message Board Section */}
      <section id="Message" className="py-10 md:py-20 bg-[var(--background)]">
        <div className="max-w-[90rem] mx-auto px-[20px]">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#333] uppercase">
              Message Board
            </h2>
          </div>

          <div className="max-w-[1000px] mx-auto">
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 p-10 text-center rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  {language === "vi"
                    ? "Gửi thành công!"
                    : "Message Sent Successfully!"}
                </h3>
                <p className="text-green-700 mb-8">
                  {language === "vi"
                    ? "Cảm ơn bạn đã quan tâm. Chúng tôi sẽ phản hồi sớm nhất có thể."
                    : "Thank you for your inquiry. We will get back to you as soon as possible."}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#e83428] font-bold hover:underline"
                >
                  {language === "vi"
                    ? "Gửi tin nhắn khác"
                    : "Send another message"}
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
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#e83428] outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="E-mail*"
                  required
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#e83428] outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Country / Region*"
                  required
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#e83428] outline-none"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#e83428] outline-none"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full md:col-span-2 border border-gray-300 p-[10px] rounded-sm focus:border-[#e83428] outline-none"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
                <textarea
                  placeholder="Leave a message"
                  rows={6}
                  required
                  className="w-full md:col-span-2 border border-gray-300 p-[10px] rounded-sm focus:border-[#e83428] outline-none resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
                <div className="md:col-span-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-[#e83428] text-white px-12 py-3 rounded-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-[#cf2e2e]"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .product-html-content table {
          width: 100% !important;
          border-collapse: collapse;
          margin: 2rem 0;
        }
        .product-html-content td,
        .product-html-content th {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: center;
        }
        .product-html-content th {
          background-color: #f8f8f8;
          font-weight: bold;
        }
        .product-html-content img {
          display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: 100%;
          height: auto;
        }
        /* Ẩn các tiêu đề và đường kẻ mặc định từ WordPress để tránh trùng lặp */
        .product-html-content h6,
        .product-html-content hr,
        .product-html-content .hc-small-tit {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
