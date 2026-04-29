export default function TwentyFiveMMCutters() {
  const products = [
    {
      id: "SSK-25-001",
      name: "Heavy Duty 25mm Utility Knife",
      description:
        "Extra-heavy duty 25mm utility knife for the toughest cutting tasks",
      material: "Steel Handle",
      features: [
        "Maximum durability",
        "Heavy-duty construction",
        "Safety lock",
        "Comfort grip",
      ],
    },
    {
      id: "SSK-25-002",
      name: "Industrial 25mm Knife",
      description:
        "Professional industrial 25mm utility knife for manufacturing",
      material: "Reinforced Steel",
      features: [
        "Industrial grade",
        "Quick blade change",
        "Ergonomic design",
        "Heavy materials",
      ],
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">
          25mm Cutters
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600">
            Our 25mm utility knives are built for the most demanding cutting
            applications. Designed for heavy industry and construction where
            maximum cutting power is required.
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
