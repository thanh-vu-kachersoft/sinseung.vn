"use client";

import NextLink from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://magenta-stork-113658.hostingersite.com";

export default function ApplicationDetailPage() {
  const { t, language, translateDynamic } = useLanguage();
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
        const errorData = await res.json();
        const errorMsg =
          errorData && errorData.details
            ? "Error: " + errorData.details
            : "Something went wrong. Please try again later.";
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please check your connection.");
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

  const pageTitle = "The Competitive Edge of Sinseung’s Heat-Treated Scissors";

  return (
    <div className="bg-white min-h-screen pb-20">
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
            className="relative z-10 text-white text-5xl md:text-6xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {t("Header", "application")}
          </h1>
        </div>
      </section>

      {/* Phần 2: Crumbs Box */}
      <div className="max-w-[90rem] mx-auto px-[20px] crumbs-box">
        <div className="py-[40px] flex items-center gap-2 text-[18px] text-[#494949]">
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
          <NextLink
            href="/application"
            className="transition-all duration-400 hover:text-[#cf2e2e]"
          >
            {t("Header", "application")}
          </NextLink>
          <span>&gt;</span>
          <span className="font-medium text-[#333] line-clamp-1">
            {translateDynamic(pageTitle)}
          </span>
        </div>
      </div>

      {/* Phần 3: Application Content */}
      <section className="app-dis-box bg-[#eee]">
        <div className="max-w-[90rem] mx-auto px-[20px] pb-[20px]">
          <div className="app-dis-content">
            <div className="tit max-w-[1060px] mx-auto mb-[80px]">
              <h1 className="text-[36px] font-medium text-center text-[#333] leading-tight pt-10">
                {translateDynamic(pageTitle)}
              </h1>
            </div>

            <div className="content">
              <div className="text-box w-full p-8 md:p-[50px_60px] bg-white border-box shadow-[0_0_20px_rgba(0,0,0,0.05)]">
                <div className="prose prose-lg max-w-none text-[#555] leading-relaxed">
                  <div className="text-center md:text-left">
                    <Image
                      src={`${WP_URL}/wp-content/uploads/2026/04/SINSEUNG-heat-treatment-1.jpg`}
                      alt="SINSEUNG heat treatment"
                      width={432}
                      height={261}
                      className="inline-block"
                    />
                  </div>

                  <p className="mb-6">
                    Sinseung Tools’ heat treatment process involves quenching
                    the <strong>entire blade</strong> of scissors, sickles, and
                    knives in a furnace, ensuring{" "}
                    <strong>uniform hardness</strong> throughout. This allows
                    the <strong>full blade</strong> to be sharpened repeatedly,{" "}
                    <strong>maximizing usability and lifespan</strong>.
                  </p>
                  <p className="">
                    In contrast, most competitors only apply{" "}
                    <strong>localized heat treatment</strong> (red area in Fig.
                    2) to the blade tip. This creates{" "}
                    <strong>uneven hardness</strong>, preventing resharpening of
                    the blade body once the edge wears out—
                    <strong>shortening product life</strong>. Untreated sections
                    are also prone to <strong>shrinkage and warping</strong>,
                    further reducing durability.
                  </p>

                  <div className="text-center md:text-left">
                    <Image
                      src={`${WP_URL}/wp-content/uploads/2026/04/Others-heat-treatment-300x216-1.jpg`}
                      alt="Others heat treatment"
                      width={419}
                      height={302}
                      className="inline-block"
                    />
                  </div>

                  <p className="mb-6">
                    Most competitors only heat-treat the{" "}
                    <strong>blade tip</strong> (red area), causing{" "}
                    <strong>uneven hardness</strong>. This makes resharpening
                    difficult once the edge wears out,{" "}
                    <strong>shortening the tool’s life</strong>. Untreated
                    sections also risk <strong>shrinkage and warping</strong>.
                  </p>
                  <p>
                    Backed by decades of expertise,{" "}
                    <strong>Sinseung Tools</strong> ensures{" "}
                    <strong>long-lasting quality</strong> you can trust. We
                    remain committed to delivering superior performance through{" "}
                    <strong>innovative heat-treatment technology</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phần 4: Related Products */}
      <section className="related-product bg-gray-50 py-[60px]">
        <div className="max-w-[90rem] mx-auto px-[20px]">
          <div className="hc-tit mb-12">
            <h6 className="text-[28px] md:text-[36px] font-bold text-center uppercase text-[#333]">
              {language === "vi"
                ? "Sản phẩm liên quan"
                : language === "ko"
                  ? "관련 제품"
                  : "Related Products"}
            </h6>
          </div>

          <div className="product-list min-h-[360px] pb-[30px]">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-[2%] gap-y-[50px]">
              {relatedProducts.map((product) => (
                <li
                  key={product.id}
                  className="group bg-white shadow-[5px_5px_10px_0_#eaeaea] overflow-hidden"
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

                  <div className="p-[20px_25px_25px]">
                    <NextLink
                      href={product.link}
                      className="block text-[18px] font-medium text-[#333] mb-[30px] overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-[600ms] hover:text-[#cf2e2e]"
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
                        className="w-[135px] h-[30px] border-2 border-[#C8102E] rounded-[15px] leading-[26px] text-center font-medium text-[#C8102E] text-[14px] transition-all duration-[600ms] hover:bg-[#C8102E] hover:text-white"
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

      {/* Phần 5: Message Board */}
      <section className="index-msg py-[80px] bg-white">
        <div className="max-w-[90rem] mx-auto px-[20px]">
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-bold text-[#333] uppercase">
              Message Board
            </h2>
          </div>
          <div className="max-w-[100%] mx-auto bg-white p-2">
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
                  className="text-[#C8102E] font-bold hover:underline"
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
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#C8102E] outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="E-mail*"
                  required
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#C8102E] outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Country / Region*"
                  required
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#C8102E] outline-none"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#C8102E] outline-none"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full md:col-span-2 border border-gray-300 p-[10px] rounded-sm focus:border-[#C8102E] outline-none"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
                <textarea
                  placeholder="Leave a message"
                  rows={6}
                  required
                  className="w-full md:col-span-2 border border-gray-300 p-[10px] rounded-sm focus:border-[#C8102E] outline-none resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
                <div className="md:col-span-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-[#C8102E] text-white px-12 py-3 rounded-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg ${
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
    </div>
  );
}
