export default function SpecialShapedBlades() {
  const products = [
    {
      id: "SSB-SS-001",
      name: "Hook Blade",
      description:
        "Curved hook blade for cutting roofing materials and shingles",
      segments: 5,
      material: "Carbon Steel",
      applications: ["Roofing", "Carpet", "Linoleum", "Vinyl flooring"],
    },
    {
      id: "SSB-SS-002",
      name: "Serrated Blade",
      description: "Serrated edge blade for cutting fabrics and textiles",
      segments: 8,
      material: "Stainless Steel",
      applications: ["Textiles", "Rope", "Webbing", "Leather"],
    },
    {
      id: "SSB-SS-003",
      name: "Scoring Blade",
      description: "Specialized blade for scoring and scoring applications",
      segments: 10,
      material: "High Carbon Steel",
      applications: [
        "Glass scoring",
        "Tile scoring",
        "Acrylic",
        "Plastic sheets",
      ],
    },
    {
      id: "SSB-SS-004",
      name: "Concave Blade",
      description: "Concave cutting edge for specialized cutting tasks",
      segments: 6,
      material: "Alloy Steel",
      applications: [
        "Pipe cutting",
        "Hose cutting",
        "Tubing",
        "Specialized industrial",
      ],
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">
          Special Shaped Blades
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Our special shaped blades are engineered for specific cutting
            applications where standard blades may not provide optimal
            performance. Each specialized design addresses unique cutting
            challenges across various industries and materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="bg-purple-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
            Specialized Applications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Roofing",
              "Textiles",
              "Glass Work",
              "Plumbing",
              "Flooring",
              "Crafts",
              "Automotive",
              "Marine",
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
