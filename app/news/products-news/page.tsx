import Link from "next/link";

export default function ProductsNews() {
  const news = [
    {
      id: "product-001",
      title: "New Heat-Treated Scissors Line Launch",
      date: "2025/11/15",
      excerpt: "SINSEUNG introduces our new line of heat-treated scissors with superior durability and cutting performance, setting new industry standards.",
      href: "/news/products-news/new-heat-treated-scissors"
    },
    {
      id: "product-002",
      title: "Advanced 25mm Heavy Duty Blades Released",
      date: "2025/10/28",
      excerpt: "Our new 25mm heavy-duty blades feature enhanced cutting power for industrial applications, with improved blade life and precision.",
      href: "/news/products-news/advanced-25mm-blades"
    },
    {
      id: "product-003",
      title: "Ergonomic Garden Tools Collection",
      date: "2025/09/20",
      excerpt: "Launch of our new ergonomic garden tools collection designed for professional landscapers with enhanced comfort and durability.",
      href: "/news/products-news/ergonomic-garden-tools"
    },
    {
      id: "product-004",
      title: "Precision Utility Knives Series",
      date: "2025/08/12",
      excerpt: "Introduction of our precision utility knives series featuring advanced blade retention systems and safety features.",
      href: "/news/products-news/precision-utility-knives"
    }
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">Products News</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Discover the latest product innovations and releases from SINSEUNG. Our products news 
            covers new cutting tools, technological advancements, and improvements to our existing 
            product lines that serve various industries and applications.
          </p>
        </div>
        
        <div className="space-y-8">
          {news.map((item) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="mt-16 bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Product Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/cutter-blades" className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-zinc-900">Cutter Blades</h3>
              <p className="text-sm text-gray-600 mt-1">9mm, 18mm, 25mm & Special</p>
            </Link>
            <Link href="/utility-knives" className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-zinc-900">Utility Knives</h3>
              <p className="text-sm text-gray-600 mt-1">Professional & Industrial</p>
            </Link>
            <Link href="/hardware-scissors" className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-zinc-900">Hardware Scissors</h3>
              <p className="text-sm text-gray-600 mt-1">Heat-Treated & Durable</p>
            </Link>
            <Link href="/garden-shears-and-tools" className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-zinc-900">Garden Tools</h3>
              <p className="text-sm text-gray-600 mt-1">Professional Landscaping</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsItem({ item }: { item: any }) {
  return (
    <div className="border-b border-gray-200 pb-8">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-500">{item.date}</span>
        <span className="text-sm text-green-600 font-medium">Products News</span>
      </div>
      <h3 className="text-2xl font-semibold text-zinc-900 mb-4">
        <Link href={item.href} className="hover:text-red-600 transition-colors">
          {item.title}
        </Link>
      </h3>
      <p className="text-gray-600 mb-4 text-lg">{item.excerpt}</p>
      <Link href={item.href} className="text-red-600 hover:underline font-medium">
        Read more
      </Link>
    </div>
  );
}
