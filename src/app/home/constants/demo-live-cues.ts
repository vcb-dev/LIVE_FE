import type { LiveCue } from "../types/live-cue"

/** ponytail: demo timeline until LiveSession generate exists. */
export const DEMO_SESSION_NAME = "Live tối 28/08"

export const DEMO_LIVE_CUES: LiveCue[] = [
  {
    id: "1",
    type: "OPENING",
    title: "Bước vào khung hình, vẫy tay chào",
    durationSec: 30,
    emotionName: "Vui",
  },
  {
    id: "2",
    type: "PRODUCT_SPEC",
    title: "Đọc thông số — Nhẫn kim cương SP001",
    durationSec: 45,
    productName: "SP001 — Nhẫn kim cương",
    emotionName: "Tập trung",
  },
  {
    id: "3",
    type: "STORY",
    title: "Câu chuyện cặp đôi và chiếc nhẫn",
    durationSec: 60,
    productName: "SP001 — Nhẫn kim cương",
    emotionName: "Vui",
  },
  {
    id: "4",
    type: "CTA",
    title: "Kéo xem sản phẩm bên trái",
    durationSec: 25,
    groupName: "Tương tác",
    emotionName: "Hồi hộp",
  },
  {
    id: "5",
    type: "GAME",
    title: "Đoán giá sản phẩm tiếp theo",
    durationSec: 40,
    emotionName: "Ngạc nhiên",
  },
  {
    id: "6",
    type: "MEANING",
    title: "Ý nghĩa món quà cho mẹ",
    durationSec: 50,
    productName: "SP014 — Dây chuyền vàng",
    emotionName: "Tập trung",
  },
  {
    id: "7",
    type: "CTA",
    title: "Nhắc mã giảm giá còn 10 phút",
    durationSec: 20,
    groupName: "Chốt đơn",
    emotionName: "Gấp gáp",
  },
  {
    id: "8",
    type: "CLOSING",
    title: "Cảm ơn, hẹn buổi live tiếp theo",
    durationSec: 25,
    emotionName: "Vui",
  },
]
