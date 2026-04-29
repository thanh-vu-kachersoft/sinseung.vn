"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type LanguageCode = "en" | "vi" | "ko";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (section: string, key: string) => string;
  translateDynamic: (text: string) => string;
  fontSizeScale: number; // Hệ số điều chỉnh font size cho từng ngôn ngữ
}

const translations: Record<LanguageCode, any> = {
  en: {
    scale: 1,
    Header: {
      home: "Home",
      products: "Products",
      application: "Application",
      news: "News",
      video: "Video",
      about: "About",
      contact: "Contact Us",
      search: "Search...",
      cat_blades: "Cutter Blades",
      cat_blades_9mm: "9mm Blades",
      cat_blades_18mm: "18mm Blades",
      cat_blades_25mm: "25mm Blades",
      cat_blades_special: "Special Shaped Blades",
      cat_knives: "Utility Knives",
      cat_knives_9mm: "9mm Cutters",
      cat_knives_18mm: "18mm Cutters",
      cat_knives_25mm: "25mm Cutters",
      cat_scissors: "Hardware Scissors",
      cat_garden: "Garden Shears and Tools",
      cat_garden_pruning: "Pruning Shears",
      cat_garden_tools: "Garden Tools",
      news_exhibition: "Exhibition News",
      news_products: "Products News",
      news_company: "Company News",
      view_all: "View all",
    },
    Banner: {
      b1_title: "Professional PPF Blades",
      b1_sub: "Window Tint Blades",
      b1_desc:
        "High-quality precision cutting solutions for professional applications",
      b2_title: "Sinseung Cutters",
      b2_sub: "Precise and easy cutting!",
      b2_desc: "Professional grade cutting tools for all industries",
      b3_title: "Heat-Treated Scissors",
      b3_sub: "Advanced Durability",
      b3_desc: "Engineered for excellence in every task",
      b4_title: "Garden Tools",
      b4_sub: "Professional Landscaping",
      b4_desc: "Durability for the great outdoors",
      b5_title: "Special Purpose Blades",
      b5_sub: "Custom Cutting Solutions",
      b5_desc: "Precision for specialized industrial needs",
      b6_title: "Full Product Range",
      b6_sub: "Korean Craftsmanship",
      b6_desc: "Over 60 years of cutting tool heritage",
      learnMore: "Learn More+",
    },
    Products: {
      title: "Products",
      learnMore: "Learn more",
      chatNow: "Chat Now",
      message: "Message",
      categories: "Categories",
      cat_blades: "Cutter Blades",
      cat_knives: "Utility Knives",
      cat_scissors: "Hardware Scissors",
      cat_garden: "Garden Shears and Tools",
      related: "Related Products",
    },
    Application: {
      title: "Application",
      post1_title: "The Competitive Edge of Sinseung’s Heat-Treated Scissors",
    },
    News: {
      title: "News",
      latest: "Latest News",
      readMore: "Read more",
      archive: "Archive",
      related: "Related News",
      n1: "Exhibition Record- VIETOFFICE",
      n2: "Sinseung at 2025 China International Hardware Show",
      n3: "The Three Chairmen Met And Communicated",
      n4: "Sinseung at The 138th Canton Fair",
    },
    About: {
      journey_tit: "Our Journey:",
      journey_sub: "Forging a Legacy of Quality",
      journey_desc:
        "Founded in the heart of Vietnam, Phu Thai has grown from a modest enterprise into a trusted leader in the hand and cutting tools market. Our history is marked by a relentless pursuit of excellence and a commitment to being the exclusive distributor for renowned brands like Snap On, Knipex, and Milwaukee. Our journey is a testament to our dedication to quality and the trust we‘ve built with our customers. With a headquarter in Ho Chi Minh City and additional offices in Da Nang and Hanoi, we have established a robust presence to serve our clients across Vietnam.",
      mission_tit: "Our Mission:",
      mission_sub: "Precision in Every Hand",
      mission_desc:
        "At Phu Thai, we believe that every craft deserves the finest tools. Our mission is to empower professionals across various industries with high-quality hand and cutting tools that enhance precision, efficiency, and safety. We are dedicated to solving the challenges faced by craftsmen and technicians by providing them with tools that are not just instruments but extensions of their expertise.",
      strength_tit: "Our Strength:",
      strength_sub: "Innovation and Availability",
      strength_desc:
        "What sets Phu Thai apart is our unparalleled range of over 3000 products, ensuring that we always have the right tool for the job. Our inventory is refreshed bi-weekly, guaranteeing that the latest and most effective tools are readily available to our customers. We pride ourselves on being at the forefront of innovation, continuously expanding our offerings to meet the evolving needs of the industries we serve.",
      values_tit: "Our Values:",
      values_sub: "Efficiency Meets Innovation",
      values_desc:
        "Our core values are rooted in efficiency and innovation. We’ve embraced advanced technology, including AI, to streamline our operations and enhance the customer experience. This integration of cutting-edge solutions reflects our forward-thinking approach and our promise to deliver not just tools, but also a competitive edge to our customers.",
      team_tit: "Our Team:",
      team_sub: "Experts at Your Service",
      team_desc:
        "The Phu Thai family is composed of seasoned professionals, each bringing their unique skills and passion to the table. From our knowledgeable sales team to our skilled technicians, we work together to ensure that every interaction with Phu Thai exceeds expectations. Our team’s expertise is the foundation upon which we build our reputation for excellence.",
      commitment_tit: "Our Commitment:",
      commitment_sub: "Customer-Centric Solutions",
      commitment_desc:
        "Understanding the diverse needs of our customers, Phu Thai offers a flexible payment system, especially for those undertaking long-term projects. Our approach is tailored to provide support and solutions that align with the specific requirements of each customer, demonstrating our unwavering commitment to their success.",
      why_clients: "why clients choose our services",
      why_clients_desc:
        "Professionals in various industries choose Phu Thai for our extensive selection of over 3000 premium hand and cutting tools, our dedication to staying at the forefront of product technology and machinery, and our adaptable, customer-focused approach. As the exclusive distributor of leading brands, we ensure each tool meets the highest standards of quality and reliability, while our commitment to continuous knowledge upgrade for our team ensures expert advice and tailored services for every unique project, ensuring client satisfaction and success.",
      in_stock: "In-Stock Products",
      happy_clients: "Happy Clients",
      successful_tasks: "Successful Tasks",
    },
    Contact: {
      title: "Contact Us",
      getInTouch: "Get in Touch",
      south: "Miền Nam",
      central: "Miền Trung",
      north: "Miền Bắc",
      formTitle: "Message Board",
      name: "Name*",
      email: "E-mail*",
      country: "Country / Region*",
      phone: "Phone Number",
      company: "Company Name",
      message: "Leave a message",
      submit: "Submit",
      sending: "Sending...",
      successTitle: "Sent Successfully!",
      successDesc:
        "Thank you for your message. We will get back to you shortly.",
      sendAnother: "Send another message",
      advice: "Need advice? Call us now!",
    },
    Search: {
      title: "Search Results",
      resultsFor: "Search results for",
      noResults: "No products found matching your search query.",
      placeholder: "Search...",
    },
    Footer: {
      address:
        "Address: 796, Agok-ri, Whegwan-eup, Chilgok-gun, Kyungbuk, South Korea",
      sales: "Sales Company",
      tel: "Tel",
      quickLinks: "Quick Links",
      followUs: "Follow Us",
      rights: "PHÚ THÁI Engineering Technology. All Rights Reserved.",
    },
  },
  vi: {
    scale: 0.95,
    Header: {
      home: "Trang chủ",
      products: "Sản phẩm",
      application: "Ứng dụng",
      news: "Tin tức",
      video: "Video",
      about: "Giới thiệu",
      contact: "Liên hệ",
      search: "Tìm kiếm...",
      cat_blades: "Lưỡi dao cắt",
      cat_blades_9mm: "Lưỡi dao 9mm",
      cat_blades_18mm: "Lưỡi dao 18mm",
      cat_blades_25mm: "Lưỡi dao 25mm",
      cat_blades_special: "Lưỡi dao đặc thù",
      cat_knives: "Dao đa năng",
      cat_knives_9mm: "Dao cắt 9mm",
      cat_knives_18mm: "Dao cắt 18mm",
      cat_knives_25mm: "Dao cắt 25mm",
      cat_scissors: "Kéo kỹ thuật",
      cat_garden: "Dụng cụ làm vườn",
      cat_garden_pruning: "Kéo cắt cành",
      cat_garden_tools: "Dụng cụ vườn",
      news_exhibition: "Tin triển lãm",
      news_products: "Tin sản phẩm",
      news_company: "Tin công ty",
      view_all: "Xem tất cả",
    },
    Banner: {
      b1_title: "Lưỡi PPF Chuyên Nghiệp",
      b1_sub: "Lưỡi Cắt Phim Cách Nhiệt",
      b1_desc: "Giải pháp cắt chính xác cao cấp cho các dán phim chuyên nghiệp",
      b2_title: "Dao Cắt Sinseung",
      b2_sub: "Cắt chính xác và dễ dàng!",
      b2_desc: "Dụng cụ cắt chuyên nghiệp cho mọi ngành công nghiệp",
      b3_title: "Kéo Nhiệt Luyện",
      b3_sub: "Độ Bền Vượt Trội",
      b3_desc: "Công nghệ tiên tiến cho hiệu suất tối ưu",
      b4_title: "Dụng Cụ Làm Vườn",
      b4_sub: "Chăm Sóc Cảnh Quan",
      b4_desc: "Bền bỉ và sắc bén cho mọi khu vườn",
      b5_title: "Lưỡi Dao Đặc Thù",
      b5_sub: "Giải Pháp Tùy Chỉnh",
      b5_desc: "Độ chính xác cao cho các nhu cầu chuyên biệt",
      b6_title: "Danh Mục Toàn Diện",
      b6_sub: "Di Sản Hàn Quốc",
      b6_desc: "Hơn 60 năm kinh nghiệm trong ngành công cụ",
      learnMore: "Tìm Hiểu Thêm+",
    },
    Products: {
      title: "SẢN PHẨM",
      learnMore: "Chi tiết",
      chatNow: "Zalo ngay",
      message: "Nhắn tin",
      categories: "Danh mục",
      cat_blades: "Lưỡi dao cắt",
      cat_knives: "Dao đa năng",
      cat_scissors: "Kéo kỹ thuật",
      cat_garden: "Dụng cụ làm vườn",
      related: "Sản phẩm liên quan",
    },
    Application: {
      title: "ỨNG DỤNG",
      post1_title: "Lợi Thế Cạnh Tranh Của Kéo Nhiệt Luyện Sinseung",
    },
    News: {
      title: "TIN TỨC",
      latest: "Tin mới nhất",
      readMore: "Xem thêm",
      archive: "Lưu trữ",
      related: "Tin tức liên quan",
      n1: "Ghi chép Triển lãm VIETOFFICE",
      n2: "Sinseung tại Triển lãm Cơ khí Quốc tế Trung Quốc 2025",
      n3: "Ba vị Chủ tịch Gặp gỡ và Trao đổi",
      n4: "Sinseung tại Hội chợ Quảng Châu lần thứ 138",
    },
    About: {
      journey_tit: "Hành trình của chúng tôi:",
      journey_sub: "Tạo dựng di sản chất lượng",
      journey_desc:
        "Được thành lập tại trung tâm Việt Nam, Phú Thái đã phát triển từ một doanh nghiệp khiêm tốn thành một đơn vị dẫn đầu tin cậy trong thị trường công cụ cầm tay và dụng cụ cắt. Lịch sử của chúng tôi được ghi dấu bởi sự theo đuổi không ngừng nghỉ sự xuất sắc và cam kết trở thành nhà phân phối độc quyền cho các thương hiệu nổi tiếng như Snap On, Knipex và Milwaukee. Hành trình của chúng tôi là minh chứng cho sự tận tâm với chất lượng và sự tin tưởng mà chúng tôi đã xây dựng với khách hàng. Với trụ sở chính tại Thành phố Hồ Chí Minh và các văn phòng bổ sung tại Đà Nẵng và Hà Nội, chúng tôi đã thiết lập một sự hiện diện mạnh mẽ để phục vụ khách hàng trên khắp Việt Nam.",
      mission_tit: "Sứ mệnh của chúng tôi:",
      mission_sub: "Độ chính xác trong mọi tầm tay",
      mission_desc:
        "Tại Phú Thái, chúng tôi tin rằng mọi nghề thủ công đều xứng đáng với những công cụ tốt nhất. Sứ mệnh của chúng tôi là trao quyền cho các chuyên gia trong nhiều ngành công nghiệp khác nhau với các công cụ cầm tay và cắt chất lượng cao giúp tăng cường độ chính xác, hiệu quả và an toàn. Chúng tôi tận tâm giải quyết các thách thức mà các thợ thủ công và kỹ thuật viên phải đối mặt bằng cách cung cấp cho họ những công cụ không chỉ là nhạc cụ mà còn là phần mở rộng của chuyên môn của họ.",
      strength_tit: "Thế mạnh của chúng tôi:",
      strength_sub: "Đổi mới và Sẵn có",
      strength_desc:
        "Điều làm nên sự khác biệt của Phú Thái là danh mục sản phẩm vô song với hơn 3000 sản phẩm, đảm bảo rằng chúng tôi luôn có công cụ phù hợp cho công việc. Kho hàng của chúng tôi được làm mới hai tuần một lần, đảm bảo rằng các công cụ mới nhất và hiệu quả nhất luôn sẵn sàng phục vụ khách hàng. Chúng tôi tự hào về việc luôn đi đầu trong đổi mới, liên tục mở rộng các dịch vụ của mình để đáp ứng nhu cầu ngày càng tăng của các ngành công nghiệp mà chúng tôi phục vụ.",
      values_tit: "Giá trị của chúng tôi:",
      values_sub: "Hiệu quả song hành cùng Đổi mới",
      values_desc:
        "Các giá trị cốt lõi của chúng tôi bắt nguồn từ hiệu quả và đổi mới. Chúng tôi đã áp dụng công nghệ tiên tiến, bao gồm cả AI, để hợp lý hóa hoạt động và nâng cao trải nghiệm khách hàng. Sự tích hợp của các giải pháp tiên tiến này phản ánh cách tiếp cận tư duy tiến bộ và lời hứa của chúng tôi là không chỉ cung cấp công cụ mà còn mang lại lợi thế cạnh tranh cho khách hàng.",
      team_tit: "Đội ngũ của chúng tôi:",
      team_sub: "Chuyên gia phục vụ bạn",
      team_desc:
        "Gia đình Phú Thái bao gồm những chuyên gia dày dạn kinh nghiệm, mỗi người đều mang đến những kỹ năng độc đáo và niềm đam mê của mình. Từ đội ngũ bán hàng am hiểu đến các kỹ thuật viên lành nghề của chúng tôi, chúng tôi làm việc cùng nhau để đảm bảo rằng mọi tương tác với Phú Thái đều vượt xa mong đợi. Chuyên môn của đội ngũ chúng tôi là nền tảng mà chúng tôi xây dựng danh tiếng về sự xuất sắc.",
      commitment_tit: "Cam kết của chúng tôi:",
      commitment_sub: "Giải pháp lấy khách hàng làm trung tâm",
      commitment_desc:
        "Hiểu được nhu cầu đa dạng của khách hàng, Phú Thái cung cấp hệ thống thanh toán linh hoạt, đặc biệt đối với những người đang thực hiện các dự án dài hạn. Cách tiếp cận của chúng tôi được thiết kế để cung cấp hỗ trợ và các giải pháp phù hợp với yêu cầu cụ thể của từng khách hàng, thể hiện cam kết kiên định của chúng tôi đối với thành công của họ.",
      why_clients: "Tại sao khách hàng chọn dịch vụ của chúng tôi",
      why_clients_desc:
        "Các chuyên gia trong nhiều ngành công nghiệp lựa chọn Phú Thái vì danh mục phong phú hơn 3000 công cụ cầm tay và cắt cao cấp, sự tận tâm của chúng tôi trong việc đi đầu về công nghệ sản phẩm và máy móc, và cách tiếp cận linh hoạt, tập trung vào khách hàng. Là nhà phân phối độc quyền của các thương hiệu hàng đầu, chúng tôi đảm bảo mỗi công cụ đều đáp ứng các tiêu chuẩn cao nhất về chất lượng và độ tin cậy, trong khi cam kết liên tục nâng cấp kiến thức cho đội ngũ của mình đảm bảo lời khuyên chuyên gia và dịch vụ phù hợp cho từng dự án độc đáo, đảm bảo sự hài lòng và thành công của khách hàng.",
      in_stock: "Sản phẩm có sẵn",
      happy_clients: "Khách hàng hài lòng",
      successful_tasks: "Nhiệm vụ thành công",
    },
    Contact: {
      title: "Liên hệ",
      getInTouch: "Kết nối với chúng tôi",
      south: "Miền Nam",
      central: "Miền Trung",
      north: "Miền Bắc",
      formTitle: "Bảng tin nhắn",
      name: "Họ và tên*",
      email: "Email*",
      country: "Quốc gia / Khu vực*",
      phone: "Số điện thoại",
      company: "Tên công ty",
      message: "Để lại lời nhắn",
      submit: "Gửi ngay",
      sending: "Đang gửi...",
      successTitle: "Gửi thành công!",
      successDesc:
        "Cảm ơn bạn đã quan tâm. Chúng tôi sẽ phản hồi sớm nhất có thể.",
      sendAnother: "Gửi tin nhắn khác",
      advice: "Bạn cần tư vấn? Gọi chúng tôi ngay!",
    },
    Search: {
      title: "Kết quả tìm kiếm",
      resultsFor: "Kết quả tìm kiếm cho",
      noResults: "Không tìm thấy sản phẩm nào khớp với từ khóa của bạn.",
      placeholder: "Tìm kiếm...",
    },
    Footer: {
      address:
        "Địa chỉ: 796, Agok-ri, Whegwan-eup, Chilgok-gun, Kyungbuk, Hàn Quốc",
      sales: "Văn phòng kinh doanh",
      tel: "SĐT",
      quickLinks: "Liên kết nhanh",
      followUs: "Kết nối với chúng tôi",
      rights: "CÔNG TY TNHH KỸ THUẬT PHÚ THÁI. Bảo lưu mọi quyền.",
    },
  },
  ko: {
    scale: 1.05,
    Header: {
      home: "홈",
      products: "제품소개",
      application: "용도안내",
      news: "새소식",
      video: "동영상",
      about: "회사소개",
      contact: "고객문의",
      search: "검색...",
      cat_blades: "커터 칼날",
      cat_knives: "다용도 칼",
      cat_scissors: "산업용 가위",
      cat_garden: "원예 도구",
      news_exhibition: "전시 뉴스",
      news_products: "제품 뉴스",
      news_company: "회사 뉴스",
      view_all: "전체보기",
    },
    Banner: {
      b1_title: "전문가용 PPF 칼날",
      b1_sub: "윈도우 틴팅 전용 칼날",
      b1_desc: "전문 작업자를 위한 고정밀 절단 솔루션",
      b2_title: "신승 커터",
      b2_sub: "정밀하고 쉬운 절단!",
      b2_desc: "모든 산업을 위한 전문가급 절단 도구",
      b3_title: "열처리 가위",
      b3_sub: "뛰어난 내구성",
      b3_desc: "최고의 성능을 위한 첨단 기술",
      b4_title: "원예 도구",
      b4_sub: "전문 조경 도구",
      b4_desc: "아름다운 정원을 위한 견고함",
      b5_title: "특수 칼날",
      b5_sub: "맞춤형 절단 솔루션",
      b5_desc: "특수 산업 분야를 위한 정밀함",
      b6_title: "전체 제품 라인업",
      b6_sub: "한국의 장인 정신",
      b6_desc: "60년 이상의 절단 도구 유산",
      learnMore: "자세히 보기+",
    },
    Products: {
      title: "제품소개",
      learnMore: "상세보기",
      chatNow: "상담하기",
      message: "메시지",
      categories: "카테고리",
      cat_blades: "커터 칼날",
      cat_knives: "다용도 칼",
      cat_scissors: "산업용 가위",
      cat_garden: "원예 도구",
      related: "관련 제품",
    },
    Application: {
      title: "제품 활용",
      post1_title: "신승 열처리 가위의 경쟁 우위",
    },
    News: {
      title: "뉴스 및 보도",
      latest: "최신 뉴스",
      readMore: "자세히 보기",
      archive: "아카이브",
      related: "관련 뉴스",
      n1: "VIETOFFICE 전시회 기록",
      n2: "2025 중국 국제 하드웨어 쇼 참가",
      n3: "회장단 회의 및 소통",
      n4: "제138회 칸톤 페어 참가",
    },
    About: {
      journey_tit: "우리의 여정:",
      journey_sub: "품질의 유산을 구축하다",
      journey_desc:
        "베트남의 중심부에서 설립된 푸타이는 작은 기업에서 수공구 및 절단 도구 시장의 신뢰받는 리더로 성장했습니다. 우리의 역사는 우수성에 대한 끊임없는 추구와 Snap On, Knipex, Milwaukee와 같은 유명 브랜드 của 독점 유통업체가 되겠다는 약속으로 특징지어집니다. 우리의 여정은 품질에 대한 헌신과 고객과 쌓아온 신뢰의 증거입니다. 호치민 시에 본사를 두고 다낭과 하노이에 추가 사무소를 두어 베트남 전역의 고객에게 서비스를 제공할 수 있는 강력한 입지를 구축했습니다.",
      mission_tit: "우리의 사명:",
      mission_sub: "모든 손 안의 정밀함",
      mission_desc:
        "푸타이에서는 모든 공예품이 최고의 도구를 가질 자격이 있다고 믿습니다. 우리의 사명은 정밀성, 효율성 및 안전성을 향상시키는 고품질 수공구 및 절단 도구를 통해 다양한 산업 분야의 전문가들에게 힘을 실어주는 것입니다. 우리는 장인과 기술자가 직면한 과제를 해결하기 위해 도구가 단순한 도구가 아니라 전문 지식의 연장선이 될 수 있도록 최선을 다하고 있습니다.",
      strength_tit: "우리의 강점:",
      strength_sub: "혁신과 가용성",
      strength_desc:
        "푸타이의 차별점은 3,000개 이상의 타의 추종을 불허하는 제품군으로, 항상 작업에 적합한 도구를 확보하고 있다는 점입니다. 인벤토리는 격주로 갱신되어 최신의 가장 효과적인 도구를 고객이 즉시 사용할 수 있도록 보장합니다. 우리는 혁신의 최전선에 서서 우리가 봉사하는 산업의 진화하는 요구를 충족시키기 위해 지속적으로 제품을 확장하는 것에 자부심을 느낍니다.",
      values_tit: "우리의 가치:",
      values_sub: "효율성과 혁신의 만남",
      values_desc:
        "우리의 핵심 가치는 효율성과 혁신에 뿌리를 두고 있습니다. 우리는 운영을 간소화하고 고객 경험을 향상시키기 위해 AI를 포함한 고급 기술을 수용했습니다. 이러한 최첨단 솔루션의 통합은 우리의 미래 지향적인 접근 방식과 고객에게 도구뿐만 아니라 경쟁 우위를 제공하겠다는 약속을 반영합니다.",
      team_tit: "우리 팀:",
      team_sub: "당신을 위한 전문가",
      team_desc:
        "푸타이 가족은 각자의 고유한 기술과 열정을 가진 노련한 전문가들로 구성되어 있습니다. 지식 기반 영업 팀에서 숙련된 기술자에 이르기까지, 우리는 푸타이와의 모든 상호 작용이 기대치를 초과하도록 함께 노력합니다. 우리 팀의 전문 지식은 우리가 우수성에 대한 명성을 쌓는 토대입니다.",
      commitment_tit: "우리의 약속:",
      commitment_sub: "고객 중심 솔루션",
      commitment_desc:
        "고객의 다양한 요구 사항을 이해하고 있는 푸타이는 특히 장기 프로젝트를 수행하는 고객을 위해 유연한 결제 시스템을 제공합니다. 우리의 접근 방식은 각 고객의 특정 요구 사항에 부합하는 지원과 솔루션을 제공하도록 맞춤화되어 고객의 성공에 대한 확고한 의지를 보여줍니다.",
      why_clients: "고객이 우리의 서비스를 선택하는 이유",
      why_clients_desc:
        "다양한 산업 분야의 전문가들이 3,000개 이상의 프리미엄 수공구 및 절단 도구 선택, 제품 기술 및 기계의 최전선에 머물기 위한 노력, 고객 중심의 유연한 접근 방식 때문에 푸타이를 선택합니다. 선도적인 브랜드의 독점 유통업체로서 우리는 각 도구가 최고의 품질 및 신뢰성 표준을 충족하도록 보장하며, 팀의 지속적인 지식 업그레이드에 대한 노력은 모든 고유한 프로젝트에 대한 전문가의 조언과 맞춤형 서비스를 보장하여 고객 만족과 성공을 이끌어냅니다.",
      in_stock: "재고 보유 제품",
      happy_clients: "행복한 고객",
      successful_tasks: "성공적인 작업",
    },
    Contact: {
      title: "문의하기",
      getInTouch: "연락처",
      south: "남부 지사",
      central: "중부 지사",
      north: "북부 지사",
      formTitle: "메시지 보드",
      name: "이름*",
      email: "이메일*",
      country: "국가 / 지역*",
      phone: "전화번호",
      company: "회사명",
      message: "메시지 남기기",
      submit: "제출",
      sending: "전송 중...",
      successTitle: "성공적으로 전송되었습니다!",
      successDesc: "문의해 주셔서 감사합니다. 가능한 한 빨리 연락드리겠습니다.",
      sendAnother: "다른 메시지 보내기",
      advice: "상담이 필요하신가요? 지금 전화하세요!",
    },
    Search: {
      title: "검색 결과",
      resultsFor: "검색 결과",
      noResults: "검색어와 일치하는 제품을 찾을 수 없습니다.",
      placeholder: "검색...",
    },
    Footer: {
      address: "주소: 경상북도 칠곡군 왜관읍 아곡리 796, 대한민국",
      sales: "판매 법인",
      tel: "전화",
      quickLinks: "빠른 링크",
      followUs: "팔로우 하기",
      rights: "푸타이 엔지니어링 테크놀로지. All Rights Reserved.",
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as LanguageCode;
    if (savedLang && ["en", "vi", "ko"].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = (section: string, key: string): string => {
    return translations[language]?.[section]?.[key] || key;
  };

  const translateDynamic = (text: string): string => {
    if (!text || language === "en") return text;

    const dynamicMapping: Record<string, Record<string, string>> = {
      vi: {
        "S301 9mm snap off blades": "Lưỡi dao S301 9mm",
        "S103 9mm snap off blades": "Lưỡi dao S103 9mm",
        "S102 9mm snap off blades": "Lưỡi dao S102 9mm",
        "S104 9mm snap off blades": "Lưỡi dao S104 9mm",
        "S104 9mm wondow films blades": "Lưỡi dao dán phim S104",
        "S303 9mm black snap off blades": "Lưỡi dao đen S303 9mm",
        "L202 18mm snap off blades": "Lưỡi dao L202 18mm",
        "L203 18mm snap off blades": "Lưỡi dao L203 18mm",
        "L206 18mm snap off blades": "Lưỡi dao L206 18mm",
        "XL401 25mm snap off blades": "Lưỡi dao XL401 25mm",
        "SB2000 Rope Cutter": "Máy cắt dây thừng SB2000",
        "SB501 Sickle": "Liềm phát bụi SB501",
        "SB802W Hedge Shears": "Kéo tỉa hàng rào SB802W",
        "HTH002 Hedge Shears": "Kéo tỉa hàng rào HTH002",
        "HTH001 Hedge Shears": "Kéo tỉa hàng rào HTH001",
        "HTL027 Lopper": "Kéo cắt cành HTL027",
        "HTL017 Lopper": "Kéo cắt cành HTL017",
        "SB705A Lopper": "Kéo cắt cành SB705A",
        "SB702A Hedge Shears": "Kéo tỉa hàng rào SB702A",
        "AK1100 Hedge Shears": "Kéo tỉa hàng rào AK1100",
        "HTP008 Pruning Shears": "Kéo tỉa cành HTP008",
        "HTP013 Pruning Shears": "Kéo tỉa cành HTP013",
        "HTP003 Pruning Shears": "Kéo tỉa cành HTP003",
        "HTP001 Pruning Shears": "Kéo tỉa cành HTP001",
        "SB320 Flower Scissors": "Kéo tỉa hoa SB320",
        "SB308 Fruit Picker Scissors-Bended Blades":
          "Kéo hái quả lưỡi cong SB308",
        "SB307 Garden Scissors (Bended Blades)": "Kéo làm vườn lưỡi cong SB307",
        "SB201 Hardware Scissors": "Kéo kỹ thuật SB201",
        "SB205 Hardware Scissors": "Kéo kỹ thuật SB205",
        "SB204 Hardware Scissors": "Kéo kỹ thuật SB204",
        "XL803 25mm cutter": "Dao cắt XL803 25mm",
        "L701 18mm cutters": "Dao cắt L701 18mm",
        "L702 18mm Cutters": "Dao cắt L702 18mm",
        "L703 18mm cutters": "Dao cắt L703 18mm",
        "L704 18mm cutters": "Dao cắt L704 18mm",
        "A5 Kitchen Scissors": "Kéo nhà bếp A5",
        "S501 9mm Cutter": "Dao cắt S501 9mm",
        "S502 9mm Cutter": "Dao cắt S502 9mm",
        "S503 9mm Cutter": "Dao cắt S503 9mm",
        "S504 9mm Cutter": "Dao cắt S504 9mm",
        "S505 9mm Cutter": "Dao cắt S505 9mm",
        "S506 9mm Cutter": "Dao cắt S506 9mm",
        "SB400 Peeling Scissors": "Kéo lột vỏ SB400",
        "G8 Hardware Scissors": "Kéo kỹ thuật G8",
        "HTP006 Pruning Shears": "Kéo tỉa cành HTP006",
        "HTP009 Pruning Shears": "Kéo tỉa cành HTP009",
        "HTP007 Pruning Shears": "Kéo tỉa cành HTP007",
        "A1 Kitchen Scissors": "Kéo nhà bếp A1",
        "SB403 Fishnet Scissors": "Kéo cắt lưới cá SB403",
        "SB708 Pruning Shears": "Kéo tỉa cành SB708",
        "SB900 Pruning Shears": "Kéo tỉa cành SB900",
        "SB303 Hardware Scissors": "Kéo kỹ thuật SB303",
        "SB203 Hardware Scissors": "Kéo kỹ thuật SB203",
        "P4 Hardware Scissors": "Kéo kỹ thuật P4",
        "P3 Hardware Scissors": "Kéo kỹ thuật P3",
        "G1T Hardware Scissors": "Kéo kỹ thuật G1T",
        "SB101 Hardware Scissors": "Kéo kỹ thuật SB101",
        "Exhibition Record- VIETOFFICE": "Ghi chép Triển lãm VIETOFFICE",
        "Sinseung at 2025 China International Hardware Show":
          "Sinseung tại Triển lãm Cơ khí Quốc tế Trung Quốc 2025",
        "The Three Chairmen Met And Communicated":
          "Ba vị Chủ tịch Gặp gỡ và Trao đổi",
        "Sinseung at The 138th Canton Fair":
          "Sinseung tại Hội chợ Quảng Châu lần thứ 138",
        "Exhibition News": "Tin tức Triển lãm",
        "Products News": "Tin tức Sản phẩm",
        "Company News": "Tin tức Công ty",
        "Latest News": "Tin tức mới nhất",
        "THE 35th CHINA(BEIJING) INTERNATIONAL WALLCOVERINGS &#038; HOME FURNISHINGS EXHIBITION":
          "Triển lãm Quốc tế về Giấy dán tường & Nội thất lần thứ 35 tại Bắc Kinh, Trung Quốc",
        "The 34th CIAACE Exhibition In Beijing":
          "Triển lãm CIAACE lần thứ 34 tại Bắc Kinh",
        "The 24th Shenzhen AutoEcosystems Expo":
          "Hội chợ Hệ sinh thái Ô tô Thâm Quyến lần thứ 24",
        "Singapore Office Expo Asia 2024":
          "Triển lãm Thiết bị Văn phòng Châu Á tại Singapore 2024",
        "Paperworld MiddleEast 2024 SINSEUNG":
          "Sinseung tại triển lãm Paperworld Trung Đông 2024",
        "MOSBUILD 2024 Exhibition": "Triển lãm Xây dựng MOSBUILD 2024",
        "Mitex2024 SINSEUNG": "Sinseung tại hội chợ công cụ cơ khí Mitex 2024",
        "ISOT exhibition in Tokyo, July of 2024":
          "Triển lãm ISOT tại Tokyo, tháng 7 năm 2024",
        "Product Specification": "Thông số kỹ thuật sản phẩm",
        Specification: "Thông số",
        Material: "Chất liệu",
        "Read more": "Xem thêm",
        "A significant meeting between three industry chairmen took place to discuss future collaborations and market strategies.":
          "Một cuộc gặp gỡ quan trọng giữa ba vị chủ tịch ngành đã diễn ra để thảo luận về các chiến lược thị trường và hợp tác trong tương lai.",
        "Our successful participation in VIETOFFICE exhibition showcased our latest product innovations to the Vietnamese market.":
          "Sự tham gia thành công của chúng tôi tại triển lãm VIETOFFICE đã giới thiệu những đổi mới sản phẩm mới nhất của chúng tôi tới thị trường Việt Nam.",
        "Sinseung Tools made a strong impression at the 138th Canton Fair with our comprehensive product range.":
          "Sinseung Tools đã tạo ấn tượng mạnh mẽ tại Hội chợ Quảng Châu lần thứ 138 với dòng sản phẩm toàn diện của chúng tôi.",
        "Showcasing our latest hardware innovations at the prestigious China International Hardware Show.":
          "Trưng bày những đổi mới cơ khí mới nhất của chúng tôi tại Triển lãm Cơ khí Quốc tế Trung Quốc uy tín.",
      },
      ko: {
        "S301 9mm snap off blades": "S301 9mm 커터 날",
        "S103 9mm snap off blades": "S103 9mm 커터 날",
        "S102 9mm snap off blades": "S102 9mm 커터 날",
        "SB2000 Rope Cutter": "SB2000 로프 커터",
        "The Three Chairmen Met And Communicated": "회장단 회의 및 소통",
        "Exhibition Record- VIETOFFICE": "VIETOFFICE 전시회 기록",
        "Sinseung at The 138th Canton Fair": "제138회 칸톤 페어 참가",
        "Exhibition News": "전시 뉴스",
        "Products News": "제품 뉴스",
        "Company News": "회사 뉴스",
        "Latest News": "최신 뉴스",
        "Product Specification": "제품 사양",
        Specification: "사양",
        Material: "재질",
        "Read more": "더 읽어보기",
        "A significant meeting between three industry chairmen took place to discuss future collaborations and market strategies.":
          "미래 협력 및 시장 전략을 논의하기 위해 세 명의 업계 회장이 모인 중요한 회의가 열렸습니다.",
        "Our successful participation in VIETOFFICE exhibition showcased our latest product innovations to the Vietnamese market.":
          "VIETOFFICE 전시회에서의 성공적인 참가는 베트남 시장에 최신 제품 혁신을 선보였습니다.",
        "Sinseung Tools made a strong impression at the 138th Canton Fair with our comprehensive product range.":
          "신승 툴즈는 포괄적인 제품 라인업으로 제138회 칸톤 페어에서 강한 인상을 남겼습니다.",
        "Showcasing our latest hardware innovations at the prestigious China International Hardware Show.":
          "권위 있는 중국 국제 하드웨어 쇼에서 최신 하드웨어 혁신을 선보입니다.",
      },
    };

    return dynamicMapping[language]?.[text] || text;
  };

  const fontSizeScale = translations[language]?.scale || 1;

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, fontSizeScale, translateDynamic }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
