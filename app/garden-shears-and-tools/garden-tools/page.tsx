export default function GardenTools() {
  const products = [
    {
      id: "SGT-001",
      name: "Garden Tool Set",
      description: "Complete garden tool set for all gardening needs",
      pieces: "6 Piece",
      material: "Stainless Steel",
      features: ["Complete set", "Storage case", "Ergonomic handles", "Rust resistant"]
    },
    {
      id: "SGT-002", 
      name: "Professional Garden Tools",
      description: "Professional-grade garden tools for landscapers",
      pieces: "8 Piece",
      material: "Carbon Steel",
      features: ["Professional grade", "Heavy duty", "Comfort grip", "Durable construction"]
    },
    {
      id: "SGT-003",
      name: "Compact Garden Tools",
      description: "Compact garden tools for small spaces and container gardening",
      pieces: "4 Piece",
      material: "Aluminum Alloy",
      features: ["Compact size", "Lightweight", "Easy storage", "Precision tools"]
    },
    {
      id: "SGT-004",
      name: "Specialty Garden Tools",
      description: "Specialized tools for specific gardening tasks",
      pieces: "5 Piece",
      material: "Mixed Materials",
      features: ["Specialized design", "Multi-purpose", "Quality construction", "Versatile use"]
    }
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">Garden Tools</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Our comprehensive range of garden tools includes everything you need for successful 
            gardening. From basic hand tools to specialized equipment, each tool is designed 
            for durability, comfort, and optimal performance in garden applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Garden Tool Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Hand Tools", "Digging Tools", "Cutting Tools", "Rakes", "Weeding Tools", "Planting Tools", "Watering Equipment", "Garden Maintenance"].map((category) => (
              <div key={category} className="bg-white rounded p-3 text-center">
                <span className="text-sm font-medium text-gray-700">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Product Image</span>
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 mb-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Model:</span>
          <span className="font-medium">{product.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Pieces:</span>
          <span className="font-medium">{product.pieces}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Material:</span>
          <span className="font-medium">{product.material}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Features:</p>
        <div className="flex flex-wrap gap-1">
          {product.features.map((feature: string) => (
            <span key={feature} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
