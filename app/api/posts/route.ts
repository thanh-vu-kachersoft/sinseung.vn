import { NextResponse } from "next/server";

const WP_URL = "https://magenta-stork-113658.hostingersite.com";
const PRIORITY_CATEGORY_ID = "31"; // Products News

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageStr = searchParams.get("page") || "1";
  const perPageStr = searchParams.get("per_page") || "10";
  const category = searchParams.get("category");
  const lang = searchParams.get("lang") || "en";

  const page = parseInt(pageStr);
  const perPage = parseInt(perPageStr);

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let posts: any[] = [];
    let totalItems = 0;
    let totalPages = 0;

    const langParam = lang ? `&lang=${lang}` : "";

    // 1. Nếu người dùng chọn một danh mục cụ thể, chỉ lấy bài viết của danh mục đó
    if (category) {
      const url = `${WP_URL}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&categories=${category}&_embed${langParam}`;
      const response = await fetch(url, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error(`WP API error: ${response.status}`);

      posts = await response.json();
      totalItems = parseInt(response.headers.get("X-WP-Total") || "0");
      totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "0");
    }
    // 2. Nếu là trang NEWS tổng hợp, thực hiện ưu tiên Products News (ID: 31) lên đầu
    else {
      // Lấy tổng số bài viết thuộc danh mục ưu tiên
      const priorityCountRes = await fetch(
        `${WP_URL}/wp-json/wp/v2/posts?categories=${PRIORITY_CATEGORY_ID}&per_page=1${langParam}`,
      );
      const totalPriority = parseInt(
        priorityCountRes.headers.get("X-WP-Total") || "0",
      );

      // Lấy tổng số bài viết KHÔNG thuộc danh mục ưu tiên
      const otherCountRes = await fetch(
        `${WP_URL}/wp-json/wp/v2/posts?categories_exclude=${PRIORITY_CATEGORY_ID}&per_page=1${langParam}`,
      );
      const totalOthers = parseInt(
        otherCountRes.headers.get("X-WP-Total") || "0",
      );

      totalItems = totalPriority + totalOthers;
      totalPages = Math.ceil(totalItems / perPage);

      const offsetStart = (page - 1) * perPage;

      if (offsetStart < totalPriority) {
        // Trang hiện tại có chứa bài viết ưu tiên
        const resPriority = await fetch(
          `${WP_URL}/wp-json/wp/v2/posts?categories=${PRIORITY_CATEGORY_ID}&page=${page}&per_page=${perPage}&_embed${langParam}`,
        );
        const priorityPosts = await resPriority.json();
        posts = Array.isArray(priorityPosts) ? priorityPosts : [];

        // Nếu trang chưa đủ bài viết, lấy thêm từ các danh mục khác
        if (posts.length < perPage && totalOthers > 0) {
          const needed = perPage - posts.length;
          const resOthers = await fetch(
            `${WP_URL}/wp-json/wp/v2/posts?categories_exclude=${PRIORITY_CATEGORY_ID}&page=1&per_page=${needed}&_embed${langParam}`,
          );
          const extraPosts = await resOthers.json();
          if (Array.isArray(extraPosts)) {
            posts = [...posts, ...extraPosts];
          }
        }
      } else {
        // Trang hiện tại hoàn toàn là các bài viết khác
        const otherOffset = offsetStart - totalPriority;
        const resOthers = await fetch(
          `${WP_URL}/wp-json/wp/v2/posts?categories_exclude=${PRIORITY_CATEGORY_ID}&offset=${otherOffset}&per_page=${perPage}&_embed${langParam}`,
        );
        const otherPosts = await resOthers.json();
        posts = Array.isArray(otherPosts) ? otherPosts : [];
      }
    }

    // 3. Transform dữ liệu trả về cho Frontend
    const transformedPosts = Array.isArray(posts)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        posts.map((post: any) => {
          const content = post.content?.rendered || "";

          // Trích xuất hình ảnh đầu tiên từ nội dung
          const imgRegExp = /<img [^>]*src="([^"]+)"/;
          const match = content.match(imgRegExp);
          let firstImage = match ? match[1] : null;

          if (!firstImage) {
            firstImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          }

          // Sửa lỗi đường dẫn localhost trong ảnh nếu có
          if (firstImage && firstImage.includes("localhost:3000")) {
            firstImage = firstImage.replace("http://localhost:3000", WP_URL);
          }

          // Trích xuất đoạn mô tả ngắn
          const cleanContent = content.replace(/<[^>]*>?/gm, "").trim();
          const shortExcerpt = cleanContent.substring(0, 160) + "...";

          return {
            id: post.id,
            title: post.title?.rendered || "Untitled Post",
            slug: post.slug,
            date: new Date(post.date)
              .toLocaleDateString("zh-Hans-CN")
              .replace(/\//g, "/"),
            excerpt: shortExcerpt,
            image:
              firstImage ||
              `${WP_URL}/wp-content/uploads/2026/04/Exhibition-Record-VIETOFFICE1.jpg`,
            link: `/news/${post.slug}`,
          };
        })
      : [];

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        total: totalItems,
        totalPages: totalPages,
        currentPage: page,
      },
    });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", details: err.message },
      { status: 500 },
    );
  }
}
