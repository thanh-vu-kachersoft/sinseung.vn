import { NextResponse } from "next/server";

const WP_URL = "https://magenta-stork-113658.hostingersite.com";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const per_page = searchParams.get("per_page") || "12";
  const category = searchParams.get("category");
  const lang = searchParams.get("lang");
  const search = searchParams.get("search");

  try {
    let url = `${WP_URL}/wp-json/wp/v2/product?page=${page}&per_page=${per_page}&_embed`;
    if (category) {
      url += `&product_cat=${category}`;
    }
    if (lang) {
      url += `&lang=${lang}`;
    }
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const totalPages = response.headers.get("X-WP-TotalPages") || "1";
    const totalItems = response.headers.get("X-WP-Total") || "0";
    const products = await response.json();

    const transformedProducts = products.map((product: any) => ({
      id: product.id,
      name: product.title?.rendered || "Untitled Product",
      slug: product.slug,
      image:
        product._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        `${WP_URL}/wp-content/uploads/2026/04/lQDPKc2ZC2jvbS3NAljNA4SwoyOPW5nVu8cIXZS0yelSAQ_900_600.jpg`,
      link: `/products/${product.slug}`,
    }));

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        total: parseInt(totalItems),
        totalPages: parseInt(totalPages),
        currentPage: parseInt(page),
      },
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 },
    );
  }
}
