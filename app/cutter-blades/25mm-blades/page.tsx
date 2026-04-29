export default function TwentyFiveMMBlades() {
  const products = [
    {
      id: "SSB-25-001",
      name: "Extra Wide 25mm Blade",
      description:
        "Ultra-heavy duty 25mm blade for the toughest cutting applications",
      segments: 7,
      thickness: "0.60mm",
      material: "High Carbon Alloy",
      applications: [
        "Heavy industry",
        "Construction",
        "Demolition",
        "Metal cutting",
      ],
    },
    {
      id: "SSB-25-002",
      name: "Industrial 25mm Blade",
      description: "Professional grade 25mm blade for industrial manufacturing",
      segments: 5,
      thickness: "0.70mm",
      material: "Tool Steel",
      applications: [
        "Manufacturing",
        "Fabrication",
        "Heavy materials",
        "Industrial cutting",
      ],
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">
          25mm Blades
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Our 25mm cutter blades represent the pinnacle of heavy-duty cutting
            technology. Designed for the most demanding industrial applications,
            these extra-wide blades provide unmatched strength and cutting power
            for tough materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="bg-red-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
            Heavy Duty Applications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Heavy Industry",
              "Construction",
              "Demolition",
              "Metal Fabrication",
              "Shipbuilding",
              "Mining",
              "Oil & Gas",
              "Power Generation",
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
function ProductCard({ product }: { product: any }) {
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
    </div>
  );
}
