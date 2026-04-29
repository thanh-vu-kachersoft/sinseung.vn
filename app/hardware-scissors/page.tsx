export default function HardwareScissors() {
  const products = [
    {
      id: "SSS-001",
      name: "Professional Hardware Scissors",
      description: "Heavy-duty scissors for hardware and industrial applications",
      material: "Heat-Treated Steel",
      length: "8 inch",
      features: ["Heat-treated blades", "Ergonomic handles", "Rivet construction", "Precision cutting"]
    },
    {
      id: "SSS-002", 
      name: "Industrial Heavy Duty Scissors",
      description: "Extra-heavy duty scissors for demanding industrial tasks",
      material: "Alloy Steel",
      length: "10 inch",
      features: ["Heavy-duty construction", "Comfort grip", "Durable design", "Industrial grade"]
    },
    {
      id: "SSS-003",
      name: "Electrician's Scissors",
      description: "Specialized scissors for electrical work and cable cutting",
      material: "Stainless Steel",
      length: "7 inch",
      features: ["Stripping notch", "Insulated handles", "Precision blades", "Safety design"]
    },
    {
      id: "SSS-004",
      name: "Multi-Purpose Hardware Scissors",
      description: "Versatile scissors for various hardware applications",
      material: "Carbon Steel",
      length: "9 inch",
      features: ["Multi-purpose design", "Sharp blades", "Comfortable grip", "Durable construction"]
    }
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">Hardware Scissors</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            SINSEUNG hardware scissors are engineered with advanced heat treatment technology 
            for superior durability and cutting performance. Our scissors are designed for 
            professional use in hardware, electrical, and industrial applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Heat Treatment Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">Advanced Process</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Precision heat treatment for optimal hardness</li>
                <li>Controlled cooling process for durability</li>
                <li>Consistent edge retention</li>
                <li>Corrosion resistance enhancement</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">Performance Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Extended blade life</li>
                <li>Superior cutting performance</li>
                <li>Reduced maintenance requirements</li>
                <li>Professional grade reliability</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Applications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Electrical Work", "Hardware Installation", "Industrial Cutting", "Construction", "DIY Projects", "Craft Work", "Packaging", "General Purpose"].map((app) => (
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
          <span className="text-gray-500">Material:</span>
          <span className="font-medium">{product.material}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Length:</span>
          <span className="font-medium">{product.length}</span>
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
