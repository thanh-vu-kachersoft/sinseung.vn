"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://magenta-stork-113658.hostingersite.com";

export default function ContactUsPage() {
  const { t, language } = useLanguage();
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
        alert(errorData.details || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Banner */}
      <section className="relative w-full">
        <div className="relative w-full h-[250px] md:h-auto md:aspect-[1920/450] overflow-hidden flex items-center justify-center">
          <Image
            src="https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/contact-us-customer-support-hotline-260nw-1389529316.webp"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <h1
            className="relative z-10 text-[#C8102E] text-5xl md:text-6xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {t("Header", "contact")}
          </h1>
        </div>
      </section>

      {/* Crumbs Box */}
      <div className="max-w-[90rem] mx-auto px-[20px]">
        <div className="py-[40px] flex items-center gap-2 text-[18px] text-[#494949]">
          <NextLink
            href="/"
            className="flex items-center gap-2 transition-all duration-400 hover:text-[#C8102E] home"
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
            {t("Header", "contact")}
          </span>
        </div>
      </div>

      {/* Address Cards */}
      <section className="max-w-[90rem] mx-auto px-[20px] pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Southern Branch */}
          <div className="bg-white p-8 shadow-sm rounded-sm border-t-4 border-[#C8102E] flex flex-col h-full">
            <h3 className="text-xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
              <span className="text-[#C8102E]">❖</span> {t("Contact", "south")}
            </h3>
            <div className="space-y-4 text-[#666] leading-relaxed">
              <p className="flex items-start gap-2">
                <span className="mt-1.5 text-[#C8102E]">‣</span>
                76/55 Nguyen Son, Phu Tho Hoa, Ho Chi Minh City
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-1.5 text-[#C8102E]">‣</span>
                226 Truong Vinh Ky, Tan Son Nhi, Ho Chi Minh City
              </p>
            </div>
          </div>

          {/* Central Branch */}
          <div className="bg-white p-8 shadow-sm rounded-sm border-t-4 border-[#C8102E] flex flex-col h-full">
            <h3 className="text-xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
              <span className="text-[#C8102E]">❖</span>{" "}
              {t("Contact", "central")}
            </h3>
            <div className="space-y-4 text-[#666] leading-relaxed">
              <p className="flex items-start gap-2">
                <span className="mt-1.5 text-[#C8102E]">‣</span>
                120 Dien Bien Phu, Nam Phuoc, Da Nang City
              </p>
            </div>
          </div>

          {/* Northern Branch */}
          <div className="bg-white p-8 shadow-sm rounded-sm border-t-4 border-[#C8102E] flex flex-col h-full">
            <h3 className="text-xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
              <span className="text-[#C8102E]">❖</span> {t("Contact", "north")}
            </h3>
            <div className="space-y-4 text-[#666] leading-relaxed">
              <p className="flex items-start gap-2">
                <span className="mt-1.5 text-[#C8102E]">‣</span>
                Phòng 701 Tầng 7, Số 9 Ngõ 25 Đường Bùi Huy Bích, Hoàng Mai, Hà
                Nội
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Message Board */}
      <section className="bg-white py-20" style={{ paddingTop: "30px" }}>
        <div className="max-w-[90rem] mx-auto px-[20px]">
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-bold text-[#333] uppercase">
              {t("Contact", "formTitle")}
            </h2>
          </div>
          <div className="max-w-[100%] mx-auto">
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 p-10 text-center rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  {t("Contact", "successTitle")}
                </h3>
                <p className="text-green-700 mb-8">
                  {t("Contact", "successDesc")}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#C8102E] font-bold hover:underline"
                >
                  {t("Contact", "sendAnother")}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <input
                  type="text"
                  placeholder={t("Contact", "name")}
                  required
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#C8102E] outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder={t("Contact", "email")}
                  required
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#C8102E] outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder={t("Contact", "country")}
                  required
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#C8102E] outline-none"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder={t("Contact", "phone")}
                  className="w-full border border-gray-300 p-[10px] rounded-sm focus:border-[#C8102E] outline-none"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder={t("Contact", "company")}
                  className="w-full md:col-span-2 border border-gray-300 p-[10px] rounded-sm focus:border-[#C8102E] outline-none"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
                <textarea
                  placeholder={t("Contact", "message")}
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
                    className="bg-[#C8102E] text-white px-16 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-[#A50D26] transition-all shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting
                      ? t("Contact", "sending")
                      : t("Contact", "submit")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section
        className="w-full h-[500px] relative mb-[80px]"
        style={{ padding: "20px" }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.349635749712!2d106.63412707573616!3d10.784511559043743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ebec2291999%3A0xc3f982361ec05332!2zMjI2IFRyxrDGoW5nIFZpbmggS8O9LCBUw6JuIFPGoW4gTmjhu7ksIFTDom4gUGjDuiwgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1714100000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
      </section>
    </div>
  );
}
