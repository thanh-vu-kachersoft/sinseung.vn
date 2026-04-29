import Link from "next/link";
import Image from "next/image";

export default function UtilityKnives() {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">Utility Knives</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            SINSEUNG utility knives are engineered for professional performance and durability. 
            Our comprehensive range includes various sizes and styles to meet the diverse needs 
            of industrial, commercial, and professional users.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <KnifeCard
            title="9mm Cutters"
            href="/utility-knives/9mm-cutters"
            image="https://www.sinseungok.com/wp-content/uploads/2025/08/banner2.jpg"
            description="Compact 9mm utility knives for precision cutting"
          />
          <KnifeCard
            title="18mm Cutters"
            href="/utility-knives/18mm-cutters"
            image="https://www.sinseungok.com/wp-content/uploads/2025/08/banner3.jpg"
            description="Heavy-duty 18mm utility knives for industrial use"
          />
          <KnifeCard
            title="25mm Cutters"
            href="/utility-knives/25mm-cutters"
            image="https://www.sinseungok.com/wp-content/uploads/2025/08/banner4.jpg"
            description="Extra-heavy 25mm utility knives for tough materials"
          />
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Ergonomic Design</h3>
              <p className="text-gray-600">
                Comfortable grip designs reduce fatigue during extended use and provide precise control.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Safety Features</h3>
              <p className="text-gray-600">
                Built-in safety locks and blade retract mechanisms ensure user protection during operation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Durable Construction</h3>
              <p className="text-gray-600">
                High-quality materials and robust construction ensure long-lasting performance in demanding environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KnifeCard({ 
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
