import Link from "next/link";
import Image from "next/image";

export default function GardenShearsAndTools() {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">Garden Shears and Tools</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            SINSEUNG garden shears and tools are designed for professional landscapers and 
            gardening enthusiasts. Our products combine durability, precision, and ergonomic 
            design to make gardening tasks easier and more efficient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ToolCard
            title="Pruning Shears"
            href="/garden-shears-and-tools/pruning-shears"
            image="https://www.sinseungok.com/wp-content/uploads/2025/06/banner22-1.jpg"
            description="Professional pruning shears for precise cutting"
          />
          <ToolCard
            title="Garden Tools"
            href="/garden-shears-and-tools/garden-tools"
            image="https://www.sinseungok.com/wp-content/uploads/2025/06/banner11-2.jpg"
            description="Comprehensive range of garden tools and equipment"
          />
        </div>
        
        <div className="bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Gardening Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Sharp Blades</h3>
              <p className="text-gray-600">
                Precision-ground blades ensure clean cuts that promote plant health and reduce damage.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Ergonomic Design</h3>
              <p className="text-gray-600">
                Comfortable handles reduce fatigue during extended gardening sessions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Durable Construction</h3>
              <p className="text-gray-600">
                Weather-resistant materials ensure long-lasting performance in outdoor conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ 
  title, 
  href, 
  image, 
  description 
}: { 
  title: string; 
  href: string; 
  image: string; 
  description: string; 
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
        <div className="relative h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-[#E83428] transition-colors mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
