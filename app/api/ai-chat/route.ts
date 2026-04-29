import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDPt_wks3b3gACM3mwRCrnJmLrxPorXQj8";
const genAI = new GoogleGenerativeAI(API_KEY);

const memoryCache: Record<string, { answer: string; timestamp: number }> = {};

const SINSEUNG_PRODUCTS = [
  {
    name: "S301 9mm snap off blades",
    keywords: ["s301", "dao rọc giấy", "lưỡi dao 9mm", "thép sk2", "dao"],
    link: "/products/s301-9mm-snap-off-blades",
  },
  {
    name: "S103 9mm snap off blades",
    keywords: ["s103", "dao rọc giấy", "9mm", "dao"],
    link: "/products/s103-9mm-snap-off-blades",
  },
  {
    name: "SB2000 Rope Cutter",
    keywords: ["sb2000", "cắt dây", "rope cutter", "máy cắt dây"],
    link: "/products/sb2000-rope-cutter",
  },
  {
    name: "Hardware Scissors",
    keywords: ["kéo", "scissors", "hardware"],
    link: "/products?category=27",
  },
  {
    name: "Garden Shears",
    keywords: ["kéo tỉa cành", "làm vườn", "garden"],
    link: "/products?category=28",
  },
  {
    name: "Utility Knives",
    keywords: ["dao đa năng", "cutter", "knife", "dao"],
    link: "/products?category=18",
  },
];

const PARTNER_SITE = "https://phuthaitech.com.vn/";

function searchLocal(query: string) {
  const q = query.toLowerCase();
  return SINSEUNG_PRODUCTS.filter(
    (p) =>
      p.keywords.some((k) => q.includes(k) || k.includes(q)) ||
      p.name.toLowerCase().includes(q),
  );
}

export async function POST(request: Request) {
  try {
    const { message, history, language } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "No message" }, { status: 400 });
    }

    // 1. Check Cache
    const cacheKey = `${language}-${message.toLowerCase().trim()}`;
    if (memoryCache[cacheKey]) {
      if (Date.now() - memoryCache[cacheKey].timestamp < 24 * 60 * 60 * 1000) {
        return NextResponse.json({
          reply: memoryCache[cacheKey].answer,
          isFastResponse: true,
        });
      }
    }

    try {
      // 2. Setup Gemini (Using gemini-1.5-flash for better speed and stability)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemPrompt = `
        BẠN LÀ AI: Bạn là Chuyên gia Tư vấn Bán hàng cao cấp của Sinseung Việt Nam (sinseungok.com).
        NGÔN NGỮ PHẢI DÙNG: Bạn phải tự động nhận diện ngôn ngữ mà người dùng đang sử dụng để nhắn tin và BẮT BUỘC trả lời lại bằng chính ngôn ngữ đó (Ví dụ: Khách chat tiếng Việt -> Trả lời tiếng Việt, Khách chat tiếng Anh -> Trả lời tiếng Anh, Khách chat tiếng Hàn -> Trả lời tiếng Hàn).

        DỮ LIỆU SẢN PHẨM TẠI ĐÂY (Ưu tiên giới thiệu): ${JSON.stringify(
          SINSEUNG_PRODUCTS,
        )}

        HƯỚNG DẪN TÌM KIẾM & TRẢ LỜI:
        1. ƯU TIÊN TRƯỚC: Bạn phải ưu tiên kiểm tra xem sản phẩm khách hỏi có trong danh sách dữ liệu động từ web Sinseung ở trên hay không. Nếu có, hãy tư vấn nhiệt tình và cung cấp link chuẩn định dạng [Tên sản phẩm](Link).
        2. GỌI TÌM KIẾM PHỤ: Chỉ khi khách hỏi về sản phẩm HOÀN TOÀN KHÔNG CÓ trên web Sinseung (ví dụ: búa nhựa, máy CNC, thiết bị đo, mũi khoan...), bạn mới hướng dẫn tìm trên website đối tác:
           - Cung cấp link cụ thể theo định dạng: [Xem sản phẩm này tại Phú Thái Technology](${PARTNER_SITE}?s=${encodeURIComponent(
             message,
           )})
        3. Ghi nhớ tên khách hàng và bối cảnh trò chuyện.
        4. Luôn kết thúc bằng việc mời khách liên hệ sales@phuthaitech.com hoặc để lại tin nhắn tại Message Board.
        5. BẮT BUỘC sử dụng cấu trúc [Mô tả](URL) cho tất cả các liên kết để hệ thống hiển thị nút bấm màu đỏ trên giao diện.
      `;

      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: systemPrompt }] },
          {
            role: "model",
            parts: [
              {
                text: "Tôi đã sẵn sàng. Tôi sẽ hỗ trợ khách hàng bằng ngôn ngữ được yêu cầu và cung cấp link sản phẩm từ Sinseung hoặc Phú Thái Technology một cách thông minh nhất.",
              },
            ],
          },
          ...history.map((h: { role: string; content: string }) => ({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.content }],
          })),
        ],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      // 3. Save to Cache
      memoryCache[cacheKey] = {
        answer: text,
        timestamp: Date.now(),
      };

      return NextResponse.json({ reply: text });
    } catch (apiError: unknown) {
      console.error("Gemini API Error:", apiError);

      // SEARCH FALLBACK KHI API BỊ LỖI QUOTA HOẶC MẠNG
      const localResults = searchLocal(message);
      let fallbackReply = "";

      if (language === "vi") {
        if (localResults.length > 0) {
          fallbackReply = `Dựa trên yêu cầu của bạn, tôi tìm thấy các sản phẩm phù hợp sau: \n\n`;
          localResults.forEach((p) => {
            fallbackReply += `- [${p.name}](${p.link})\n`;
          });
          fallbackReply += `\nBạn cần thêm thông tin chi tiết về sản phẩm nào không?`;
        } else {
          fallbackReply = `Hệ thống AI đang quá tải. Tuy nhiên, tôi nhận thấy sản phẩm này có thể không có trên Sinseung. Bạn vui lòng [Xem sản phẩm tại Phú Thái Technology](${PARTNER_SITE}?s=${encodeURIComponent(
            message,
          )}) hoặc liên hệ sales@phuthaitech.com.vn để được hỗ trợ nhanh nhất.`;
        }
      } else if (language === "ko") {
        if (localResults.length > 0) {
          fallbackReply = `요청하신 조건에 맞는 제품을 찾았습니다: \n\n`;
          localResults.forEach((p) => {
            fallbackReply += `- [${p.name}](${p.link})\n`;
          });
        } else {
          fallbackReply = `AI 시스템이 현재 바쁩니다. 이 제품은 Sinseung에 없을 수 있습니다. [Phu Thai Technology에서 보기](${PARTNER_SITE}?s=${encodeURIComponent(
            message,
          )}) 또는 sales@phuthaitech.com.vn 으로 문의해 주세요.`;
        }
      } else {
        if (localResults.length > 0) {
          fallbackReply = `I found some products matching your request: \n\n`;
          localResults.forEach((p) => {
            fallbackReply += `- [${p.name}](${p.link})\n`;
          });
        } else {
          fallbackReply = `AI system is busy. This product might not be on Sinseung. Please [Check products at Phu Thai Technology](${PARTNER_SITE}?s=${encodeURIComponent(
            message,
          )}) or email us at sales@phuthaitech.com.vn`;
        }
      }

      return NextResponse.json({
        reply: fallbackReply,
        isFallback: true,
      });
    }
  } catch (error: unknown) {
    console.error("Fatal AI Chat Error:", error);
    return NextResponse.json({
      reply:
        "Xin lỗi, trợ lý AI đang cập nhật dữ liệu. Bạn có thể xem [Danh sách sản phẩm](/products) hoặc gửi email về sales@phuthaitech.com.vn để được hỗ trợ ngay.",
    });
  }
}
