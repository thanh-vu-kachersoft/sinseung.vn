export default function PruningShears() {
  const products = [
    {
      id: "SGS-001",
      name: "Professional Pruning Shears",
      description: "High-quality pruning shears for professional landscapers",
      bladeType: "Bypass",
      material: "Carbon Steel",
      features: ["Precision cutting", "Comfort grip", "Lock mechanism", "Replaceable parts"]
    },
    {
      id: "SGS-002", 
      name: "Heavy Duty Pruning Shears",
      description: "Heavy-duty pruning shears for tough branches",
      bladeType: "Anvil",
      material: "Forged Steel",
      features: ["Heavy-duty construction", "Power grip", "Shock absorber", "Durable design"]
    },
    {
      id: "SGS-003",
      name: "Lightweight Pruning Shears",
      description: "Lightweight pruning shears for extended use",
      bladeType: "Bypass",
      material: "Aluminum Alloy",
      features: ["Lightweight design", "Ergonomic handles", "Sharp blades", "Easy maintenance"]
    },
    {
      id: "SGS-004",
      name: "Floral Pruning Shears",
      description: "Precision pruning shears for delicate floral work",
      bladeType: "Bypass",
      material: "Stainless Steel",
      features: ["Fine cutting", "Delicate work", "Rust resistant", "Precision blades"]
    }
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">Pruning Shears</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Our professional pruning shears are designed for precision cutting and plant health. 
            With sharp blades and ergonomic designs, these tools make pruning tasks efficient 
            and comfortable for both professional landscapers and home gardeners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Pruning Excellence</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Tree Pruning", "Shrub Maintenance", "Floral Arrangement", "Bonsai Care", "Garden Maintenance", "Landscaping", "Horticulture", "Plant Health"].map((app) => (
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
          <span className="text-gray-500">Blade Type:</span>
          <span className="font-medium">{product.bladeType}</span>
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
