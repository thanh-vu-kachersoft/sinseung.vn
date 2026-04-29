import Image from "next/image";

export default function NineMMBlades() {
  const products = [
    {
      id: "SSB-9-001",
      name: "Standard 9mm Blade",
      description: "High-quality standard 9mm snap-off blade for general purpose cutting",
      segments: 9,
      thickness: "0.38mm",
      material: "Carbon Steel",
      applications: ["Paper", "Cardboard", "Plastic film", "Vinyl"]
    },
    {
      id: "SSB-9-002", 
      name: "Heavy Duty 9mm Blade",
      description: "Reinforced 9mm blade for demanding cutting applications",
      segments: 7,
      thickness: "0.45mm",
      material: "Alloy Steel",
      applications: ["Thick cardboard", "Carpet", "Leather", "Rubber"]
    },
    {
      id: "SSB-9-003",
      name: "Fine Point 9mm Blade",
      description: "Precision 9mm blade with fine point for detailed work",
      segments: 13,
      thickness: "0.25mm",
      material: "High Carbon Steel",
      applications: ["Model making", "Crafts", "Precision cutting", "Hobby work"]
    }
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">9mm Blades</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Our 9mm cutter blades are the industry standard for utility knives and cutting tools. 
            Designed for versatility and reliability, these blades are perfect for general purpose 
            cutting applications in offices, workshops, and industrial settings.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Product Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">Quality Materials</h3>
              <ul className="space-y-2 text-gray-600">
                <li>High-grade carbon steel construction</li>
                <li>Advanced heat treatment for durability</li>
                <li>Rust-resistant coating</li>
                <li>Consistent hardness throughout blade</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">Performance Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Sharp, clean cuts every time</li>
                <li>Long-lasting cutting edge</li>
                <li>Easy snap-off mechanism</li>
                <li>Compatible with standard 9mm utility knives</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Applications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Office Work", "Packaging", "Crafts", "Industrial", "Construction", "Automotive", "Electronics", "Home Use"].map((app) => (
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
