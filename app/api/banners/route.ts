import { NextResponse } from "next/server";

// WordPress API endpoint configuration
const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL || "https://your-wordpress-site.com/wp-json";
const BANNERS_ENDPOINT = "/wp/v2/banners"; // Custom endpoint for banners

export async function GET() {
  try {
    // Fetch banners from WordPress backend
    const response = await fetch(`${WORDPRESS_API_URL}${BANNERS_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN}`
      },
      cache: "no-store", // Disable caching for fresh data
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const wordpressBanners = await response.json();

    // Transform WordPress data to match our frontend structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedBanners = wordpressBanners.map((banner: any) => ({
      id: banner.id,
      title: banner.title?.rendered || "Untitled",
      subtitle: banner.acf?.subtitle || "",
      description: banner.acf?.description || "",
      image: banner.acf?.banner_image?.url || "/placeholder-banner.jpg",
      link: banner.acf?.link || "/products",
      alt_text:
        banner.acf?.alt_text || banner.title?.rendered || "Banner image",
    }));

    return NextResponse.json(transformedBanners);
  } catch (error) {
    console.error("Error fetching banners from WordPress:", error);

    // Return fallback banners if WordPress API fails
    const fallbackBanners = [
      {
        id: 1,
        title: "Professional PPF Blades",
        subtitle: "Window Tint Blades",
        description:
          "High-quality precision cutting solutions for professional applications",
        image:
          "https://www.sinseungok.com/wp-content/uploads/2025/08/banner1.jpg",
        link: "/cutter-blades",
        alt_text: "Professional PPF Blades",
      },
      {
        id: 2,
        title: "Industrial Cutting Tools",
        subtitle: "Heavy Duty Solutions",
        description: "Durable tools for demanding industrial applications",
        image:
          "https://www.sinseungok.com/wp-content/uploads/2025/08/banner2.jpg",
        link: "/utility-knives",
        alt_text: "Industrial Cutting Tools",
      },
      {
        id: 3,
        title: "Heat-Treated Scissors",
        subtitle: "Superior Performance",
        description:
          "Advanced heat treatment technology for exceptional durability",
        image:
          "https://www.sinseungok.com/wp-content/uploads/2025/08/banner3.jpg",
        link: "/hardware-scissors",
        alt_text: "Heat-Treated Scissors",
      },
    ];

    return NextResponse.json(fallbackBanners);
  }
}
