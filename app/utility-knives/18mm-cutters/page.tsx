export default function EighteenMMCutters() {
  const products = [
    {
      id: "SSK-18-001",
      name: "Industrial 18mm Utility Knife",
      description: "Heavy-duty 18mm utility knife for industrial applications",
      material: "Aluminum Alloy",
      features: ["Heavy-duty construction", "Quick blade change", "Comfort grip", "Safety lock"]
    },
    {
      id: "SSK-18-002", 
      name: "Professional 18mm Knife",
      description: "Professional grade 18mm utility knife for daily use",
      material: "Fiberglass Reinforced",
      features: ["Ergonomic design", "Blade storage", "Pocket clip", "Durable construction"]
    }
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">18mm Cutters</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Our 18mm utility knives provide extra cutting power for demanding applications. 
            Ideal for construction, manufacturing, and heavy-duty cutting tasks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
          <span className="text-gray-500">Handle:</span>
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
