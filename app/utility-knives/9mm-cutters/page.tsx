export default function NineMMCutters() {
  const products = [
    {
      id: "SSK-9-001",
      name: "Standard 9mm Utility Knife",
      description: "Lightweight 9mm utility knife for general purpose cutting",
      material: "Plastic Handle",
      features: [
        "Retractable blade",
        "Blade storage",
        "Pocket clip",
        "Safety lock",
      ],
    },
    {
      id: "SSK-9-002",
      name: "Professional 9mm Knife",
      description: "Heavy-duty 9mm utility knife for professional use",
      material: "Aluminum Handle",
      features: [
        "Metal construction",
        "Quick blade change",
        "Ergonomic grip",
        "Blade lock",
      ],
    },
    {
      id: "SSK-9-003",
      name: "Folding 9mm Knife",
      description: "Compact folding 9mm utility knife for portability",
      material: "Stainless Steel",
      features: [
        "Folding design",
        "Safety lock",
        "Keychain attachment",
        "Compact size",
      ],
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">
          9mm Cutters
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Our 9mm utility knives are designed for precision cutting and
            portability. Perfect for office work, light industrial applications,
            and everyday cutting tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
          <span className="text-gray-500">Handle:</span>
          <span className="font-medium">{product.material}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Features:</p>
        <div className="flex flex-wrap gap-1">
          {product.features.map((feature: string) => (
            <span
              key={feature}
              className="text-xs bg-gray-100 px-2 py-1 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
