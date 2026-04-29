import Link from "next/link";

export default function CompanyNews() {
  const news = [
    {
      id: "company-001",
      title: "SINSEUNG Achieves ISO 9001:2025 Certification",
      date: "2025/10/15",
      excerpt:
        "SINSEUNG Tools Corporation has successfully achieved ISO 9001:2025 certification, demonstrating our commitment to quality management and customer satisfaction.",
      href: "/news/company-news/iso-certification",
    },
    {
      id: "company-002",
      title: "New Manufacturing Facility Opens in Qingdao",
      date: "2025/08/30",
      excerpt:
        "Our new state-of-the-art manufacturing facility in Qingdao, China has officially opened, doubling our production capacity and improving delivery times.",
      href: "/news/company-news/qingdao-facility",
    },
    {
      id: "company-003",
      title: "SINSEUNG Celebrates 25th Anniversary",
      date: "2025/07/01",
      excerpt:
        "SINSEUNG Tools Corporation celebrates 25 years of excellence in the cutting tools industry, marking a quarter century of innovation and quality.",
      href: "/news/company-news/25th-anniversary",
    },
    {
      id: "company-004",
      title: "Partnership with Leading Hardware Distributor",
      date: "2025/05/20",
      excerpt:
        "SINSEUNG announces strategic partnership with Global Hardware Distributors to expand our market reach and improve customer service.",
      href: "/news/company-news/distributor-partnership",
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">
          Company News
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Follow SINSEUNG&apos;s corporate journey through our company news.
            Learn about our milestones, achievements, expansions, and the
            strategic initiatives that drive our growth and success in the
            cutting tools industry.
          </p>
        </div>

        <div className="space-y-8">
          {news.map((item) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-16 bg-purple-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
            Company Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
              <p className="text-gray-600">Years in Business</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
              <p className="text-gray-600">Countries Served</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">100+</div>
              <p className="text-gray-600">Product Varieties</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NewsItem({ item }: { item: any }) {
  return (
    <div className="border-b border-gray-200 pb-8">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-500">{item.date}</span>
        <span className="text-sm text-purple-600 font-medium">
          Company News
        </span>
      </div>
      <h3 className="text-2xl font-semibold text-zinc-900 mb-4">
        <Link href={item.href} className="hover:text-red-600 transition-colors">
          {item.title}
        </Link>
      </h3>
      <p className="text-gray-600 mb-4 text-lg">{item.excerpt}</p>
      <Link
        href={item.href}
        className="text-red-600 hover:underline font-medium"
      >
        Read more
      </Link>
    </div>
  );
}
