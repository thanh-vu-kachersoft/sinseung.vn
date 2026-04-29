import Link from "next/link";

export default function ExhibitionNews() {
  const news = [
    {
      id: "exhibition-001",
      title: "The Three Chairmen Met And Communicated",
      date: "2025/06/24",
      excerpt:
        "A significant meeting between three industry chairmen took place to discuss future collaborations and market strategies for the cutting tools industry.",
      href: "/news/exhibition-news/the-three-chairmen-met-and-communicated",
    },
    {
      id: "exhibition-002",
      title: "Exhibition Record- VIETOFFICE",
      date: "2025/06/24",
      excerpt:
        "Our successful participation in VIETOFFICE exhibition showcased our latest product innovations to the Vietnamese market and established new business partnerships.",
      href: "/news/exhibition-news/exhibition-record-vietoffice",
    },
    {
      id: "exhibition-003",
      title: "Sinseung at The 138th Canton Fair",
      date: "2025/11/24",
      excerpt:
        "Sinseung Tools made a strong impression at the 138th Canton Fair with our comprehensive product range and attracted significant international interest.",
      href: "/news/exhibition-news/sinseung-at-the-138th-canton-fair",
    },
    {
      id: "exhibition-004",
      title: "Sinseung at 2025 China International Hardware Show",
      date: "2025/11/24",
      excerpt:
        "Showcasing our latest hardware innovations at the prestigious China International Hardware Show, receiving positive feedback from industry professionals.",
      href: "/news/exhibition-news/sinseung-at-2025-china-international-hardware-show",
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">
          Exhibition News
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Stay updated with SINSEUNG&apos;s participation in major industry
            exhibitions and trade shows around the world. Our exhibition news
            covers our latest product launches, business partnerships, and
            industry networking events.
          </p>
        </div>

        <div className="space-y-8">
          {news.map((item) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
            Upcoming Exhibitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                International Hardware Fair 2026
              </h3>
              <p className="text-gray-600 mb-2">March 15-18, 2026</p>
              <p className="text-gray-600 mb-4">Cologne, Germany</p>
              <p className="text-sm text-gray-600">
                Visit us at Hall 10, Booth A-42 to see our latest innovations.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                Hardware & Tools Asia 2026
              </h3>
              <p className="text-gray-600 mb-2">May 20-23, 2026</p>
              <p className="text-gray-600 mb-4">Bangkok, Thailand</p>
              <p className="text-sm text-gray-600">
                Showcasing our complete range of cutting tools and hardware
                solutions.
              </p>
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
        <span className="text-sm text-blue-600 font-medium">
          Exhibition News
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
