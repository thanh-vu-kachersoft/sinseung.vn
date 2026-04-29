import Image from "next/image";

export default function EighteenMMBlades() {
  const products = [
    {
      id: "SSB-18-001",
      name: "Heavy Duty 18mm Blade",
      description:
        "Industrial-grade 18mm blade for heavy-duty cutting applications",
      segments: 9,
      thickness: "0.50mm",
      material: "Alloy Steel",
      applications: [
        "Industrial cutting",
        "Heavy materials",
        "Construction",
        "Manufacturing",
      ],
    },
    {
      id: "SSB-18-002",
      name: "Premium 18mm Blade",
      description: "Premium quality 18mm blade with extended durability",
      segments: 7,
      thickness: "0.60mm",
      material: "High Carbon Alloy",
      applications: [
        "Thick plastics",
        "Carpet",
        "Rubber",
        "Composite materials",
      ],
    },
    {
      id: "SSB-18-003",
      name: "Serrated 18mm Blade",
      description: "Serrated edge 18mm blade for tough cutting tasks",
      segments: 8,
      thickness: "0.55mm",
      material: "Stainless Steel",
      applications: ["Rope", "Fabric", "Leather", "Textiles"],
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">
          18mm Blades
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Our 18mm cutter blades are designed for heavy-duty industrial
            applications. With increased width and thickness, these blades
            provide superior strength and durability for cutting through tough
            materials in demanding work environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6">
            Industrial Grade Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">
                Enhanced Durability
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>50% thicker than standard 9mm blades</li>
                <li>Reinforced alloy steel construction</li>
                <li>Advanced heat treatment process</li>
                <li>Corrosion-resistant coating</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">
                Heavy Duty Performance
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Cuts through thick materials with ease</li>
                <li>Longer blade life in tough conditions</li>
                <li>Reduced blade breakage</li>
                <li>Consistent cutting performance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
            Industrial Applications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Manufacturing",
              "Construction",
              "Automotive",
              "Shipbuilding",
              "Aerospace",
              "Packaging",
              "Textiles",
              "Metalworking",
            ].map((app) => (
              <div key={app} className="bg-white rounded p-3 text-center">
                <span className="text-sm font-medium text-gray-700">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProductItem({ product }: { product: any }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Product Image</span>
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 mb-2">
        {product.name}
      </h3>
      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Model:</span>
          <span className="font-medium">{product.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Segments:</span>
          <span className="font-medium">{product.segments}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Thickness:</span>
          <span className="font-medium">{product.thickness}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Material:</span>
          <span className="font-medium">{product.material}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Applications:</p>
        <div className="flex flex-wrap gap-1">
          {product.applications.map((app: string) => (
            <span key={app} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {app}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
