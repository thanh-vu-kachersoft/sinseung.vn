import Link from "next/link";
import Image from "next/image";

export default function CutterBlades() {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">
          Cutter Blades
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            SINSEUNG offers a comprehensive range of high-quality cutter blades
            designed for precision cutting in various industrial and commercial
            applications. Our blades are manufactured using advanced heat
            treatment technology to ensure exceptional durability and sharpness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <BladeCard
            title="9mm Blades"
            href="/cutter-blades/9mm-blades"
            image="https://www.sinseungok.com/wp-content/uploads/2025/08/banner11.jpg"
            description="Standard 9mm snap-off blades for utility knives"
          />
          <BladeCard
            title="18mm Blades"
            href="/cutter-blades/18mm-blades"
            image="https://www.sinseungok.com/wp-content/uploads/2025/08/banner22.jpg"
            description="Heavy-duty 18mm blades for industrial cutting"
          />
          <BladeCard
            title="25mm Blades"
            href="/cutter-blades/25mm-blades"
            image="https://www.sinseungok.com/wp-content/uploads/2025/08/banner33.jpg"
            description="Extra-wide 25mm blades for heavy-duty applications"
          />
          <BladeCard
            title="Special Shaped Blades"
            href="/cutter-blades/special-shaped-blades"
            image="https://www.sinseungok.com/wp-content/uploads/2025/08/banner44.jpg"
            description="Custom shaped blades for specialized applications"
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                Heat-Treated Steel
              </h3>
              <p className="text-gray-600">
                Our blades undergo advanced heat treatment processes for
                superior hardness and durability.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                Precision Cutting
              </h3>
              <p className="text-gray-600">
                Engineered for clean, precise cuts across various materials
                including paper, plastic, and thin metal.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                Snap-Off Design
              </h3>
              <p className="text-gray-600">
                Convenient snap-off segments provide fresh cutting edges,
                extending blade life and value.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6">
            Technical Specifications
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blade Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Width
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thickness
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Segments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    9mm Standard
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    9mm
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0.38mm
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    7-9
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    General purpose
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    18mm Heavy Duty
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    18mm
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0.50mm
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    7-9
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Industrial cutting
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    25mm Extra Wide
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    25mm
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0.60mm
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5-7
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Heavy materials
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function BladeCard({
  title,
  href,
  image,
  description,
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
          <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-[#C8102E] transition-colors mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
