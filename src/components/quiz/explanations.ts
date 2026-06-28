export interface ExplanationData {
  steps: string[];
  note?: string;
  engSentence: string;
  vietSentence: string;
  engOptions?: Record<string, string>;
  vietOptions?: Record<string, string>;
  correctAnswerText: string;
}

export const EXPLANATIONS: Record<number, ExplanationData> = {
  // --- PART 5 (1 - 20) ---
  1: {
    steps: [
      "Xác định dạng câu hỏi: Ta thấy các đáp án là các dạng từ khác nhau của gốc từ 'treat' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Trước chỗ trống là động từ 'give' và phía sau không có thêm dấu hiệu nhận biết gì ⇒ Chỗ trống cần điền danh từ/V-ing làm tân ngữ."
    ],
    note: "Mở rộng: Cụm từ cố định 'give treatment' mang nghĩa là cung cấp sự điều trị hay điều trị cho ai đó.",
    engSentence: "The free clinic was founded by a group of doctors to give _____ for various medical conditions.",
    vietSentence: "Phòng khám miễn phí được thành lập bởi một nhóm bác sĩ để cung cấp _____ cho các tình trạng y tế khác nhau.",
    engOptions: {
      A: "treatment (N)",
      B: "treat (V)",
      C: "treated (V-ed)",
      D: "treating (V-ing)"
    },
    vietOptions: {
      A: "sự điều trị",
      B: "đãi ngộ / đối xử",
      C: "được xử lý",
      D: "đang điều trị"
    },
    correctAnswerText: "Đáp án A"
  },
  2: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các đại từ và tính từ sở hữu khác nhau của gốc 'he' ⇒ Câu hỏi về Đại từ.",
      "Sử dụng mẹo ngữ pháp: Đứng sau chỗ trống là cụm danh từ 'best pieces' ⇒ Chỗ trống cần điền tính từ sở hữu bổ nghĩa cho danh từ."
    ],
    engSentence: "The artist sent _____ best pieces to the gallery to be reviewed by the owner.",
    vietSentence: "Người nghệ sĩ đã gửi những tác phẩm tốt nhất của _____ đến phòng trưng bày để được người chủ xem xét.",
    engOptions: {
      A: "him (Pronoun tân ngữ)",
      B: "himself (Đại từ phản thân)",
      C: "his (Tính từ sở hữu / Đại từ sở hữu)",
      D: "he (Đại từ chủ ngữ)"
    },
    vietOptions: {
      A: "anh ấy (tân ngữ)",
      B: "chính anh ấy",
      C: "của anh ấy",
      D: "anh ấy (chủ ngữ)"
    },
    correctAnswerText: "Đáp án C"
  },
  3: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ khác nhau của gốc 'relevance' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng trước chỗ trống là động từ liên kết 'be' ⇒ Cần một tính từ (Adjective) để đóng vai trò làm vị ngữ."
    ],
    engSentence: "The figures that accompany the financial statement should be _____ to the spending category.",
    vietSentence: "Các số liệu đi kèm với báo cáo tài chính phải _____ với danh mục chi tiêu.",
    engOptions: {
      A: "relevance (N)",
      B: "relevantly (Adv)",
      C: "more relevantly (Adv so sánh hơn)",
      D: "relevant (Adj)"
    },
    vietOptions: {
      A: "sự liên quan",
      B: "một cách liên quan",
      C: "liên quan nhiều hơn (trạng từ)",
      D: "có liên quan / thích hợp"
    },
    correctAnswerText: "Đáp án D"
  },
  4: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các từ quan hệ và đại từ nhân xưng ⇒ Câu hỏi về Mệnh đề quan hệ.",
      "Sử dụng mẹo ngữ pháp: Danh từ đứng trước là 'occupants' (người cư ngụ - chỉ người), phía sau chỗ trống là động từ 'live' ⇒ Cần một đại từ quan hệ thay thế cho danh từ chỉ người và làm chủ ngữ."
    ],
    engSentence: "The majority of occupants _____ live in Regal Towers are upset about the ongoing problems with their air conditioning systems.",
    vietSentence: "Phần lớn những người cư ngụ _____ sống ở Regal Towers đang rất khó chịu về những vấn đề đang diễn ra với hệ thống điều hòa của họ.",
    engOptions: {
      A: "what (Cái mà - không dùng làm đại từ quan hệ)",
      B: "where (Nơi mà - trạng từ quan hệ chỉ nơi chốn)",
      C: "they (Họ - đại từ nhân xưng)",
      D: "who (Người mà - đại từ quan hệ chỉ người)"
    },
    vietOptions: {
      A: "cái gì / cái mà",
      B: "nơi mà",
      C: "họ",
      D: "những người mà"
    },
    correctAnswerText: "Đáp án D"
  },
  5: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'necessity' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Cấu trúc giả định / cấu trúc tính từ: 'It is + Adj + to-V' (Thật là... khi làm gì đó) ⇒ Chỗ trống cần điền một tính từ."
    ],
    engSentence: "During the peak season, it is _____ to hire additional workers for the weekend shifts.",
    vietSentence: "Trong mùa cao điểm, việc thuê thêm nhân công cho các ca làm việc cuối tuần là _____.",
    engOptions: {
      A: "necessitate (V)",
      B: "necessarily (Adv)",
      C: "necessary (Adj)",
      D: "necessity (N)"
    },
    vietOptions: {
      A: "bắt buộc / đòi hỏi",
      B: "nhất thiết / tất yếu",
      C: "cần thiết",
      D: "sự cần thiết / nhu yếu phẩm"
    },
    correctAnswerText: "Đáp án C"
  },
  6: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'strategy' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng giữa chủ ngữ 'The company' và động từ chính 'lowered' ⇒ Chỗ trống cần điền một trạng từ (Adverb) để bổ nghĩa cho động từ."
    ],
    engSentence: "The company _____ lowered its prices to outsell its competitors and attract more customers.",
    vietSentence: "Công ty đã giảm giá bán một cách _____ để bán chạy hơn các đối thủ cạnh tranh và thu hút nhiều khách hàng hơn.",
    engOptions: {
      A: "strategy (N)",
      B: "strategically (Adv)",
      C: "strategies (N số nhiều)",
      D: "strategic (Adj)"
    },
    vietOptions: {
      A: "chiến lược",
      B: "mang tính chiến lược",
      C: "các chiến lược",
      D: "có tính chiến lược"
    },
    correctAnswerText: "Đáp án B"
  },
  7: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng biến đổi của động từ 'obstruct' ⇒ Câu hỏi về Danh động từ / Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng trước chỗ trống là động từ 'avoid' (tránh) ⇒ Theo quy tắc ngữ pháp, sau 'avoid' cần một danh động từ dạng V-ing (avoid + V-ing)."
    ],
    engSentence: "For optimal safety on the road, avoid _____ the view of the rear window and side-view mirrors.",
    vietSentence: "Để đảm bảo an toàn tối ưu trên đường, hãy tránh _____ tầm nhìn của kính chắn gió phía sau và gương chiếu hậu hai bên.",
    engOptions: {
      A: "obstructs (V-s)",
      B: "obstructed (V-ed)",
      C: "obstruction (N)",
      D: "obstructing (V-ing)"
    },
    vietOptions: {
      A: "làm tắc nghẽn (ngôi ba số ít)",
      B: "bị cản trở (quá khứ)",
      C: "sự cản trở / tắc nghẽn",
      D: "việc cản trở / che khuất"
    },
    correctAnswerText: "Đáp án D"
  },
  8: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'mechanic' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng trước chỗ trống là động từ tobe 'are' và đứng sau là phân từ hai 'controlled' ⇒ Chỗ trống cần điền một trạng từ (Adverb) bổ nghĩa cho tính từ/phân từ trong câu bị động."
    ],
    engSentence: "The sprinklers for the lawn’s irrigation system are _____ controlled.",
    vietSentence: "Các vòi phun nước cho hệ thống tưới cỏ được điều khiển bằng _____.",
    engOptions: {
      A: "mechanically (Adv)",
      B: "mechanic (N)",
      C: "mechanism (N)",
      D: "mechanical (Adj)"
    },
    vietOptions: {
      A: "bằng cơ học / tự động bằng máy móc",
      B: "thợ máy",
      C: "cơ chế / cơ cấu",
      D: "thuộc về cơ khí / máy móc"
    },
    correctAnswerText: "Đáp án A"
  },
  9: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'legal' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng sau chỗ trống là danh từ 'services' ⇒ Chỗ trống cần điền một tính từ (Adjective) để bổ nghĩa cho danh từ đó."
    ],
    engSentence: "The governmental department used to provide financial aid, but now it offers _____ services only.",
    vietSentence: "Bộ phận chính phủ từng cung cấp hỗ trợ tài chính, nhưng hiện tại nó chỉ cung cấp các dịch vụ _____.",
    engOptions: {
      A: "legal (Adj)",
      B: "legalize (V)",
      C: "legally (Adv)",
      D: "legalizes (V-s)"
    },
    vietOptions: {
      A: "thuộc về pháp lý / hợp pháp",
      B: "hợp pháp hóa",
      C: "một cách hợp pháp",
      D: "hợp pháp hóa (ngôi ba số ít)"
    },
    correctAnswerText: "Đáp án A"
  },
  10: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các đại từ và từ quan hệ khác nhau ⇒ Mệnh đề quan hệ.",
      "Sử dụng mẹo ngữ pháp: Chủ ngữ là 'Mr. Ross' (danh từ chỉ người) và động từ phía sau là 'is repainting' ⇒ Cần đại từ quan hệ thay thế cho chủ ngữ chỉ người."
    ],
    engSentence: "Mr. Ross, _____ is repainting the interior of the lobby, was recommended by a friend of the building manager.",
    vietSentence: "Ông Ross, _____ đang sơn lại nội thất của sảnh đợi, đã được giới thiệu bởi một người bạn của người quản lý tòa nhà.",
    engOptions: {
      A: "himself (Đại từ phản thân)",
      B: "he (Đại từ nhân xưng làm chủ ngữ)",
      C: "who (Đại từ quan hệ chỉ người)",
      D: "which (Đại từ quan hệ chỉ vật)"
    },
    vietOptions: {
      A: "chính ông ấy",
      B: "ông ấy",
      C: "người mà",
      D: "cái mà"
    },
    correctAnswerText: "Đáp án C"
  },
  11: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'accessorize' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng trước chỗ trống là cụm từ chỉ mức độ so sánh cực đại 'the most stylish' (tính từ) ⇒ Chỗ trống cần điền một danh từ làm tân ngữ chính cho cụm danh từ."
    ],
    engSentence: "The upscale boutique Jane's Closet is known for selling the most stylish _____ for young professionals.",
    vietSentence: "Cửa hàng thời trang cao cấp Jane's Closet nổi tiếng với việc bán những _____ sành điệu nhất dành cho các chuyên gia trẻ tuổi.",
    engOptions: {
      A: "accessorized (V-ed/Adj)",
      B: "accessorize (V)",
      C: "accessorizes (V-s)",
      D: "accessories (N số nhiều)"
    },
    vietOptions: {
      A: "được trang trí thêm phụ kiện",
      B: "thêm phụ kiện",
      C: "thêm phụ kiện (ngôi ba số ít)",
      D: "phụ kiện thời trang"
    },
    correctAnswerText: "Đáp án D"
  },
  12: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'complete' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng sau chỗ trống là tính từ 'different' ⇒ Chỗ trống cần điền một trạng từ (Adverb) để bổ nghĩa cho tính từ."
    ],
    engSentence: "The April edition of Fishing and More magazine looks _____ different from previous issues because of the new art editor.",
    vietSentence: "Ấn bản tháng Tư của tạp chí Fishing and More trông _____ khác biệt so với các số trước đây do có biên tập viên nghệ thuật mới.",
    engOptions: {
      A: "completed (V-ed/Adj)",
      B: "complete (Adj/V)",
      C: "completely (Adv)",
      D: "completing (V-ing)"
    },
    vietOptions: {
      A: "hoàn thành",
      B: "hoàn toàn / hoàn thành",
      C: "một cách hoàn toàn / hoàn toàn",
      D: "đang hoàn thành"
    },
    correctAnswerText: "Đáp án C"
  },
  13: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'frequent' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng sau từ chỉ mức độ 'more' trong cấu trúc so sánh hơn, bổ nghĩa cho hành động 'polish' (động từ thường) ⇒ Cần điền trạng từ (Adverb)."
    ],
    engSentence: "Due to the high volume of foot traffic, the shop must polish its floors more _____ than usual during the peak season.",
    vietSentence: "Do lượng người qua lại lớn, cửa hàng phải đánh bóng sàn nhà _____ hơn bình thường trong mùa cao điểm.",
    engOptions: {
      A: "frequent (Adj)",
      B: "frequented (V-ed/Adj)",
      C: "frequency (N)",
      D: "frequently (Adv)"
    },
    vietOptions: {
      A: "thường xuyên (tính từ)",
      B: "hay ghé thăm",
      C: "tần suất",
      D: "thường xuyên (trạng từ)"
    },
    correctAnswerText: "Đáp án D"
  },
  14: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các từ quan hệ khác nhau ⇒ Đại từ quan hệ.",
      "Sử dụng mẹo ngữ pháp: Sau chỗ trống là cụm danh từ sở hữu 'name and phone number' và phía trước là 'real estate agent' (người) ⇒ Cần đại từ quan hệ sở hữu chỉ sự thuộc về."
    ],
    engSentence: "Ms. Stevenson contacted the real estate agent _____ name and phone number appeared on the advertisement.",
    vietSentence: "Cô Stevenson đã liên hệ với nhân viên môi giới bất động sản _____ tên và số điện thoại xuất hiện trên quảng cáo.",
    engOptions: {
      A: "what (Cái mà)",
      B: "which (Cái mà - thay cho vật)",
      C: "whose (Của người mà / vật mà - sở hữu)",
      D: "who (Người mà - làm chủ ngữ)"
    },
    vietOptions: {
      A: "cái gì",
      B: "cái mà",
      C: "người có... (sở hữu)",
      D: "người mà"
    },
    correctAnswerText: "Đáp án C"
  },
  15: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'certain' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng trước tính từ 'capable' và đứng sau động từ liên kết 'is' ⇒ Cần điền một trạng từ (Adverb) để bổ nghĩa cho tính từ."
    ],
    engSentence: "Thanks to his experience, Mr. Warren is _____ capable of completing the job on his own.",
    vietSentence: "Nhờ kinh nghiệm của mình, ông Warren _____ có khả năng tự mình hoàn thành công việc.",
    engOptions: {
      A: "certainly (Adv)",
      B: "certain (Adj)",
      C: "certainty (N)",
      D: "certify (V)"
    },
    vietOptions: {
      A: "chắc chắn",
      B: "chắc chắn (tính từ)",
      C: "sự chắc chắn",
      D: "chứng nhận"
    },
    correctAnswerText: "Đáp án A"
  },
  16: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'reside' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng sau giới từ 'to' và cụm trạng từ chỉ tính chất 'free of charge' ⇒ Chỗ trống cần danh từ chỉ đối tượng nhận khóa học (danh từ chỉ người số nhiều)."
    ],
    engSentence: "The notice indicated that a first-aid training course will be provided free of charge to _____ next month.",
    vietSentence: "Thông báo cho biết một khóa đào tạo sơ cứu sẽ được cung cấp miễn phí cho _____ vào tháng tới.",
    engOptions: {
      A: "residents (N số nhiều - cư dân)",
      B: "residence (N số ít - nơi cư trú)",
      C: "residential (Adj - thuộc khu dân cư)",
      D: "resides (V-s - cư trú)"
    },
    vietOptions: {
      A: "những người dân cư",
      B: "nơi cư trú / nhà ở",
      C: "thuộc về nhà ở / dân cư",
      D: "cư trú"
    },
    correctAnswerText: "Đáp án A"
  },
  17: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các đại từ quan hệ và từ nối ⇒ Mệnh đề quan hệ.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng sau danh từ chỉ người 'The chef' và đứng trước động từ 'prepares' ⇒ Cần một đại từ quan hệ thay thế làm chủ ngữ chỉ người."
    ],
    engSentence: "The chef _____ prepares the entrée for a restaurant critic often comes out to greet him or her in person.",
    vietSentence: "Người đầu bếp _____ chuẩn bị món khai vị cho một nhà phê bình nhà hàng thường ra mặt để đích thân chào hỏi vị khách đó.",
    engOptions: {
      A: "whose (Của người mà)",
      B: "what (Cái gì)",
      C: "either (Hoặc một trong hai)",
      D: "who (Người mà)"
    },
    vietOptions: {
      A: "của người mà",
      B: "cái gì",
      C: "hoặc",
      D: "người mà"
    },
    correctAnswerText: "Đáp án D"
  },
  18: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'operate' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng sau động từ liên kết 'be' (will be) và trạng từ 'fully' ⇒ Cần điền một tính từ (Adjective) chỉ trạng thái hoạt động."
    ],
    engSentence: "As long as there are no further delays, the factory will be fully _____ by June 18.",
    vietSentence: "Miễn là không có sự chậm trễ nào thêm nữa, nhà máy sẽ đi vào hoạt động _____ hoàn toàn trước ngày 18 tháng 6.",
    engOptions: {
      A: "operational (Adj - sẵn sàng hoạt động)",
      B: "operate (V - vận hành)",
      C: "operates (V-s)",
      D: "operation (N - sự vận hành)"
    },
    vietOptions: {
      A: "sẵn sàng hoạt động / đi vào vận hành",
      B: "hoạt động / vận hành",
      C: "vận hành (ngôi ba số ít)",
      D: "sự vận hành / ca mổ"
    },
    correctAnswerText: "Đáp án A"
  },
  19: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'cheerful' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng trước phân từ hai đóng vai trò tính từ 'decorated' bổ nghĩa cho danh từ 'room' ⇒ Cần một trạng từ (Adverb) đứng trước để bổ nghĩa cho tính từ đó."
    ],
    engSentence: "The restaurant has a _____ decorated room that is perfect for hosting children's parties.",
    vietSentence: "Nhà hàng có một căn phòng được trang trí _____ hoàn hảo cho việc tổ chức các bữa tiệc trẻ em.",
    engOptions: {
      A: "cheerful (Adj)",
      B: "cheerfully (Adv)",
      C: "cheerfulness (N)",
      D: "cheer (V/N)"
    },
    vietOptions: {
      A: "vui vẻ / tươi sáng",
      B: "một cách tươi vui / bắt mắt",
      C: "sự vui vẻ",
      D: "sự cổ vũ / làm cho vui"
    },
    correctAnswerText: "Đáp án B"
  },
  20: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'enjoy' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng trước danh từ 'experience' và đứng sau mạo từ 'an' ⇒ Cần điền một tính từ (Adjective) bổ nghĩa cho danh từ."
    ],
    engSentence: "Despite having some problems with the sound system during the performance, the concert was an _____ experience for everyone.",
    vietSentence: "Mặc dù gặp một số sự cố với hệ thống âm thanh trong suốt buổi biểu diễn, buổi hòa nhạc vẫn là một trải nghiệm _____ đối với mọi người.",
    engOptions: {
      A: "enjoyable (Adj)",
      B: "enjoyment (N)",
      C: "enjoys (V-s)",
      D: "enjoyably (Adv)"
    },
    vietOptions: {
      A: "thú vị / dễ chịu",
      B: "sự thích thú / tận hưởng",
      C: "tận hưởng (ngôi ba số ít)",
      D: "một cách thú vị"
    },
    correctAnswerText: "Đáp án A"
  },

  // --- PART 6 (21 - 32) ---
  21: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Cần một giới từ đi với mốc thời gian 'the end of the month' để biểu đạt nghĩa hạn chót trước cuối tháng.",
      "Mẹo từ vựng: Giới từ 'by' thường dùng để chỉ một hành động phải hoàn thành trước hoặc muộn nhất vào một thời điểm nào đó. Ngoài ra 'before' (trước) cũng phù hợp ngữ pháp."
    ],
    engSentence: "Please submit your expense reports _____ the end of the month.",
    vietSentence: "Vui lòng nộp báo cáo chi phí của bạn trước cuối tháng.",
    correctAnswerText: "Đáp án đúng là: by hoặc before"
  },
  22: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Đứng sau trợ động từ khuyết thiếu 'will' là một động từ nguyên mẫu (V-bare) làm vị ngữ chính cho chủ ngữ 'The committee' tác động lên tân ngữ 'the proposal'.",
      "Chọn từ thích hợp: Các từ phù hợp nghĩa như 'review' (xem xét/đánh giá), 'discuss' (thảo luận), 'consider' (cân nhắc), 'evaluate' (định giá) hoặc 'approve' (phê duyệt)."
    ],
    engSentence: "The committee will _____ the proposal tomorrow morning.",
    vietSentence: "Ủy ban sẽ xem xét / thảo luận về đề xuất này vào sáng mai.",
    correctAnswerText: "Đáp án đúng là: review, discuss, evaluate, consider hoặc approve"
  },
  23: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Cần động từ nguyên mẫu đứng sau động từ khuyết thiếu 'must' kết hợp giới từ 'at' để chỉ hành động của hành khách/khách khi đến một địa điểm.",
      "Cụm từ thông dụng: Cụm 'register at the front desk' (đăng ký tại quầy lễ tân) hoặc 'sign in' (ký tên đăng nhập) là các cụm từ phổ biến trong môi trường văn phòng chuyên nghiệp."
    ],
    engSentence: "All visitors must _____ at the front desk upon arrival.",
    vietSentence: "Tất cả khách viếng thăm phải đăng ký / ký tên tại quầy lễ tân khi đến nơi.",
    correctAnswerText: "Đáp án đúng là: register, sign in hoặc report"
  },
  24: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Chỗ trống đứng sau tính từ 'new' và trước giới từ 'for' ⇒ Cần một danh từ số ít làm tân ngữ cho động từ 'planning'.",
      "Chọn từ thích hợp: 'campaign' (chiến dịch tiếp thị), 'strategy' (chiến lược) hoặc 'plan' (kế hoạch) rất phù hợp với phòng tiếp thị (marketing department)."
    ],
    engSentence: "The marketing department is planning a new _____ for the product.",
    vietSentence: "Phòng tiếp thị đang lập kế hoạch cho một chiến dịch / chiến lược mới cho sản phẩm.",
    correctAnswerText: "Đáp án đúng là: campaign, strategy, launch hoặc plan"
  },
  25: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Chỗ trống đứng sau mạo từ 'the' và trước giới từ 'of' ⇒ Cần một danh từ làm trung tâm của cụm danh từ.",
      "Mẹo từ vựng: Với văn phòng chi nhánh mới ('new branch office'), các danh từ phù hợp là 'opening' (sự khai trương), 'launch' (sự ra mắt) hoặc 'expansion' (sự mở rộng)."
    ],
    engSentence: "We are pleased to announce the _____ of our new branch office.",
    vietSentence: "Chúng tôi vui mừng thông báo về sự khai trương / mở rộng của văn phòng chi nhánh mới của chúng tôi.",
    correctAnswerText: "Đáp án đúng là: opening, launch, expansion hoặc establishment"
  },
  26: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Đứng sau tính từ sở hữu 'your' cần một danh từ để làm tân ngữ cho động từ hành động 'confirm'.",
      "Chọn từ thích hợp: Người gửi yêu cầu phản hồi email để xác nhận. Do đó danh từ thích hợp nhất là 'attendance' (sự tham gia), 'registration' (sự đăng ký) hoặc 'reservation' (sự đặt chỗ)."
    ],
    engSentence: "Please confirm your _____ by replying to this email.",
    vietSentence: "Vui lòng xác nhận sự tham dự / đăng ký của bạn bằng cách phản hồi email này.",
    correctAnswerText: "Đáp án đúng là: attendance, registration, reservation, participation hoặc booking"
  },
  27: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Chỗ trống đứng sau từ chỉ mục đích 'to' ⇒ Cần một động từ nguyên thể (V-bare) tác động lên tân ngữ 'productivity' (năng suất).",
      "Chọn từ thích hợp: Phần mềm mới được thiết kế để làm tăng năng suất ⇒ các động từ thích hợp như 'increase' (tăng), 'improve' (cải thiện), 'boost' (đẩy mạnh) hoặc 'enhance' (nâng cao)."
    ],
    engSentence: "The new software is designed to _____ productivity.",
    vietSentence: "Phần mềm mới được thiết kế để tăng cường / cải thiện năng suất lao động.",
    correctAnswerText: "Đáp án đúng là: increase, improve, boost hoặc enhance"
  },
  28: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Chỗ trống đứng sau tính từ 'any' và trước mệnh đề quan hệ rút gọn 'this delay may cause' ⇒ Cần một danh từ làm tân ngữ của giới từ 'for'.",
      "Mẹo ngữ pháp & cụm từ: Cụm từ xin lỗi phổ biến trong tiếng Anh thương mại: 'apologize for any inconvenience' (xin lỗi vì bất kỳ sự bất tiện nào)."
    ],
    engSentence: "We apologize for any _____ this delay may cause.",
    vietSentence: "Chúng tôi xin lỗi vì bất kỳ sự bất tiện nào mà sự chậm trễ này có thể gây ra.",
    correctAnswerText: "Đáp án đúng là: inconvenience, trouble hoặc difficulty"
  },
  29: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Đứng sau tính từ sở hữu 'their' cần một danh từ số nhiều hoặc danh từ không đếm được làm tân ngữ cho động từ 'share'.",
      "Chọn từ thích hợp: Trong cuộc họp, nhân viên được khuyến khích chia sẻ các ý kiến, phản hồi ⇒ chọn 'feedback' (ý kiến phản hồi), 'ideas' (ý tưởng) hoặc 'opinions' (quan điểm)."
    ],
    engSentence: "Employees are encouraged to share their _____ during the meeting.",
    vietSentence: "Nhân viên được khuyến khích chia sẻ phản hồi / ý kiến đóng góp của họ trong suốt cuộc họp.",
    correctAnswerText: "Đáp án đúng là: feedback, ideas, opinions, thoughts hoặc suggestions"
  },
  30: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Chỗ trống đứng sau từ chỉ số lượng/xác định 'both' (cả hai) ⇒ Cần điền một danh từ số nhiều.",
      "Cụm từ thông dụng: Hợp đồng phải được ký bởi cả hai bên tham gia ⇒ danh từ phù hợp nhất là 'parties' (các bên ký kết) hoặc 'sides' (các bên)."
    ],
    engSentence: "The contract must be signed by both _____ to be valid.",
    vietSentence: "Hợp đồng phải được ký bởi cả hai bên để có hiệu lực pháp lý.",
    correctAnswerText: "Đáp án đúng là: parties, sides hoặc signatories"
  },
  31: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Chỗ trống đứng sau động từ liên kết 'is' và trước giới từ 'for' ⇒ Cần một tính từ (Adjective) biểu thị bổ nhiệm.",
      "Cấu trúc từ vựng: Cấu trúc tính từ đi kèm giới từ phổ biến 'be responsible for something' (chịu trách nhiệm cho cái gì)."
    ],
    engSentence: "Mr. Smith is _____ for managing the sales team.",
    vietSentence: "Ông Smith chịu trách nhiệm quản lý đội ngũ bán hàng.",
    correctAnswerText: "Đáp án đúng là: responsible hoặc accountable"
  },
  32: {
    steps: [
      "Xác định nghĩa và ngữ cảnh: Đứng sau cụm động từ 'look forward to' (mong đợi) bắt buộc phải là một danh động từ hoặc danh từ (look forward to + V-ing).",
      "Chọn từ thích hợp: Trong giao dịch khách hàng, cụm từ mong gặp lại là 'look forward to seeing you' hoặc phục vụ quý khách là 'look forward to serving you'."
    ],
    engSentence: "We look forward to _____ you in the near future.",
    vietSentence: "Chúng tôi rất mong được gặp lại / phục vụ bạn trong tương lai gần.",
    correctAnswerText: "Đáp án đúng là: seeing, meeting, serving, welcoming, hoặc helping"
  },

  // --- PART 7 (33 - 51) ---
  33: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng biến đổi của gốc 'success' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng trước danh động từ 'completing' (V-ing) ⇒ Cần điền một trạng từ (Adverb) để bổ nghĩa cho động từ đó."
    ],
    engSentence: "The manager praised the team for _____ completing the project on time.",
    vietSentence: "Người quản lý đã khen ngợi cả đội vì đã hoàn thành _____ dự án đúng hạn.",
    engOptions: {
      A: "successful (Adj)",
      B: "successfully (Adv)",
      C: "success (N)",
      D: "succeed (V)"
    },
    vietOptions: {
      A: "thành công (tính từ)",
      B: "một cách thành công / xuất sắc",
      C: "sự thành công",
      D: "đạt thành công"
    },
    correctAnswerText: "Đáp án B"
  },
  34: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các giới từ chỉ nơi chốn/mối quan hệ ⇒ Giới từ.",
      "Mẹo từ vựng: Để biểu đạt việc tham gia và trình bày nghiên cứu tại một hội nghị cụ thể 'the international conference' ⇒ Ta dùng giới từ 'at'."
    ],
    engSentence: "Ms. Davis will present her research _____ the international conference.",
    vietSentence: "Cô Davis sẽ trình bày nghiên cứu của mình _____ hội nghị quốc tế.",
    engOptions: {
      A: "at (Tại - dùng cho địa điểm/sự kiện)",
      B: "on (Trên)",
      C: "of (Của)",
      D: "for (Cho / Đối với)"
    },
    vietOptions: {
      A: "tại",
      B: "trên",
      C: "của",
      D: "dành cho"
    },
    correctAnswerText: "Đáp án A"
  },
  35: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'expand' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Cấu trúc động từ sau động từ chính: 'plan + to-V' (lên kế hoạch làm gì) ⇒ Sau 'to' cần một động từ nguyên thể (V-bare)."
    ],
    engSentence: "The company plans to _____ its operations into European markets.",
    vietSentence: "Công ty có kế hoạch _____ hoạt động kinh doanh sang thị trường châu Âu.",
    engOptions: {
      A: "expand (V - mở rộng)",
      B: "expansion (N - sự mở rộng)",
      C: "expansive (Adj - rộng lớn / cởi mở)",
      D: "expanded (V-ed/Adj)"
    },
    vietOptions: {
      A: "mở rộng",
      B: "sự mở rộng",
      C: "rộng lớn / bao la",
      D: "được mở rộng"
    },
    correctAnswerText: "Đáp án A"
  },
  36: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các từ có chung gốc từ 'seminar' hoặc cách viết khác ⇒ Từ loại / Danh từ ghép.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng sau cụm danh từ 'the safety training' ⇒ Cần điền một danh từ tạo thành cụm danh từ ghép hoàn chỉnh: 'safety training seminar' (hội thảo huấn luyện an toàn)."
    ],
    engSentence: "All employees are required to attend the safety training _____.",
    vietSentence: "Tất cả nhân viên được yêu cầu tham dự _____ đào tạo về an toàn.",
    engOptions: {
      A: "seminar (N số ít - hội thảo / chuyên đề)",
      B: "seminate (V - gieo rắc / truyền bá)",
      C: "seminally (Adv - thuộc về hạt giống / có tính sinh sản)",
      D: "seminars (N số nhiều)"
    },
    vietOptions: {
      A: "buổi hội thảo / lớp chuyên đề",
      B: "gieo rắc / phát tán",
      C: "mang tính ảnh hưởng lớn",
      D: "các buổi hội thảo"
    },
    correctAnswerText: "Đáp án A"
  },
  37: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'effect' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng sau động từ liên kết 'become' (trở nên) ⇒ Cần điền một tính từ (Adjective) để làm thành phần bổ ngữ chỉ tính chất/trạng thái."
    ],
    engSentence: "The new policy will become _____ starting next Monday.",
    vietSentence: "Chính sách mới sẽ có _____ bắt đầu từ thứ Hai tới.",
    engOptions: {
      A: "effect (N/V - hiệu ứng / làm tác động)",
      B: "effective (Adj - có hiệu lực)",
      C: "effectively (Adv - một cách hiệu quả)",
      D: "effectiveness (N - tính hiệu quả)"
    },
    vietOptions: {
      A: "hiệu ứng / tác động",
      B: "hiệu lực / hiệu quả",
      C: "một cách hiệu quả",
      D: "tính chất hiệu quả"
    },
    correctAnswerText: "Đáp án B"
  },
  38: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng biến đổi của động từ 'submit' ⇒ Câu hỏi về Từ loại / Danh động từ.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng sau giới từ 'before' (trước khi) ⇒ Cần điền một danh động từ dạng V-ing đóng vai trò tân ngữ cho giới từ."
    ],
    engSentence: "Please double-check the figures before _____ the report.",
    vietSentence: "Vui lòng kiểm tra lại các số liệu trước khi _____ báo cáo.",
    engOptions: {
      A: "submit (V nguyên thể)",
      B: "submitted (V-ed)",
      C: "submitting (V-ing)",
      D: "submission (N)"
    },
    vietOptions: {
      A: "nộp",
      B: "đã nộp",
      C: "việc nộp / gửi đi",
      D: "sự nộp / bài nộp"
    },
    correctAnswerText: "Đáp án C"
  },
  39: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'prompt' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng sau cụm động từ và tân ngữ 'resolving issues' ⇒ Cần điền một trạng từ (Adverb) bổ nghĩa cho hành động/động từ 'resolving'."
    ],
    engSentence: "The customer service team is committed to resolving issues _____.",
    vietSentence: "Nhóm dịch vụ khách hàng cam kết giải quyết các vấn đề một cách _____.",
    engOptions: {
      A: "prompt (Adj/V)",
      B: "promptly (Adv)",
      C: "promptness (N)",
      D: "prompter (N)"
    },
    vietOptions: {
      A: "nhanh chóng / gợi nhắc",
      B: "nhanh chóng / ngay lập tức",
      C: "sự nhanh chóng / tức thời",
      D: "người nhắc tuồng / thiết bị nhắc chữ"
    },
    correctAnswerText: "Đáp án B"
  },
  40: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng biến đổi của động từ 'cancel' ⇒ Câu hỏi về Thì / Câu bị động.",
      "Sử dụng mẹo ngữ pháp: Chủ ngữ 'the outdoor concert' (chỉ vật) không tự thực hiện hành động. Câu ở thể bị động hiện tại hoàn thành: 'has been + V-ed/P2' ⇒ Cần phân từ hai."
    ],
    engSentence: "Due to bad weather, the outdoor concert has been _____.",
    vietSentence: "Do thời tiết xấu, buổi hòa nhạc ngoài trời đã bị _____.",
    engOptions: {
      A: "cancel (V)",
      B: "canceled (V-ed/P2)",
      C: "cancelling (V-ing)",
      D: "cancellation (N)"
    },
    vietOptions: {
      A: "hủy",
      B: "bị hủy bỏ",
      C: "đang hủy",
      D: "sự hủy bỏ"
    },
    correctAnswerText: "Đáp án B"
  },
  41: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'detail' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng trước danh từ 'information' ⇒ Cần điền một tính từ. Phân từ hai 'detailed' hoạt động như tính từ mang nghĩa 'chi tiết/được trình bày chi tiết' bổ nghĩa cho danh từ."
    ],
    engSentence: "The brochure provides _____ information about our services.",
    vietSentence: "Sách quảng cáo cung cấp thông tin _____ về các dịch vụ của chúng tôi.",
    engOptions: {
      A: "detail (N/V)",
      B: "detailed (Adj - chi tiết / tỉ mỉ)",
      C: "detailing (V-ing)",
      D: "details (N số nhiều)"
    },
    vietOptions: {
      A: "chi tiết / đi vào chi tiết",
      B: "chi tiết / đầy đủ thông tin",
      C: "đang vẽ chi tiết",
      D: "các chi tiết"
    },
    correctAnswerText: "Đáp án B"
  },
  42: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'extend' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng sau tính từ sở hữu 'her' và đứng trước danh từ 'experience' ⇒ Cần một tính từ (Adjective) bổ nghĩa cho danh từ."
    ],
    engSentence: "Ms. Carter was selected for the position because of her _____ experience.",
    vietSentence: "Cô Carter được chọn vào vị trí này vì kinh nghiệm _____ của cô ấy.",
    engOptions: {
      A: "extensive (Adj - sâu rộng / phong phú)",
      B: "extension (N - sự gia hạn / máy nhánh)",
      C: "extensively (Adv)",
      D: "extend (V - mở rộng / kéo dài)"
    },
    vietOptions: {
      A: "sâu rộng / bao quát",
      B: "sự mở rộng / gia hạn",
      C: "một cách rộng rãi",
      D: "mở rộng / gia hạn"
    },
    correctAnswerText: "Đáp án A"
  },
  43: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'fluent' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Đứng sau động từ liên kết 'is' và trước trạng ngữ chỉ phạm vi 'in both...' ⇒ Chỗ trống cần điền một tính từ (Adjective)."
    ],
    engSentence: "We need to hire an assistant who is _____ in both English and Spanish.",
    vietSentence: "Chúng tôi cần thuê một trợ lý người _____ cả tiếng Anh và tiếng Tây Ban Nha.",
    engOptions: {
      A: "fluent (Adj)",
      B: "fluently (Adv)",
      C: "fluency (N)",
      D: "fluents (N số nhiều)"
    },
    vietOptions: {
      A: "lưu loát / trôi chảy",
      B: "một cách trôi chảy",
      C: "sự trôi chảy",
      D: "những người nói trôi chảy"
    },
    correctAnswerText: "Đáp án A"
  },
  44: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'direct' ⇒ Câu hỏi về Từ loại / Cụm từ cố định.",
      "Sử dụng mẹo ngữ pháp: Đứng sau giới từ 'of' cần điền một danh từ. Cụm danh từ ghép cố định: 'board of directors' mang nghĩa là hội đồng quản trị / ban giám đốc."
    ],
    engSentence: "The budget proposal must be approved by the board of _____.",
    vietSentence: "Đề xuất ngân sách phải được thông qua bởi Hội đồng _____.",
    engOptions: {
      A: "directors (N số nhiều - các giám đốc)",
      B: "direct (V/Adj)",
      C: "direction (N - phương hướng / chỉ dẫn)",
      D: "directly (Adv)"
    },
    vietOptions: {
      A: "các giám đốc / hội đồng quản trị",
      B: "chỉ đạo / trực tiếp",
      C: "phương hướng / sự chỉ đạo",
      D: "trực tiếp (trạng từ)"
    },
    correctAnswerText: "Đáp án A"
  },
  45: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng của danh từ/động từ 'schedule' ⇒ Giới từ / Cụm từ cố định.",
      "Sử dụng mẹo ngữ pháp: Cụm từ chỉ thời gian hoàn thành trước thời hạn kế hoạch: 'ahead of schedule' (trước lịch trình / kế hoạch)."
    ],
    engSentence: "The construction of the new office building is ahead of _____.",
    vietSentence: "Việc xây dựng tòa nhà văn phòng mới đang vượt trước _____.",
    engOptions: {
      A: "schedule (N/V)",
      B: "scheduled (V-ed/Adj)",
      C: "scheduling (V-ing/N)",
      D: "schedules (N số nhiều)"
    },
    vietOptions: {
      A: "lịch trình / tiến độ",
      B: "đã lên lịch trình",
      C: "việc lập lịch trình",
      D: "các lịch trình"
    },
    correctAnswerText: "Đáp án A"
  },
  46: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng biến đổi của động từ 'satisfy' ⇒ Câu hỏi về Từ loại / Tính từ phân từ.",
      "Sử dụng mẹo ngữ pháp: Đứng sau trạng từ phủ định 'not' và động từ 'are', trước giới từ 'with' ⇒ Cần một tính từ mô tả cảm xúc của khách hàng. Ta chọn tính từ phân từ bị động 'satisfied' (hài lòng với...)."
    ],
    engSentence: "Customers can request a refund if they are not _____ with the product.",
    vietSentence: "Khách hàng có thể yêu cầu hoàn tiền nếu họ không _____ với sản phẩm.",
    engOptions: {
      A: "satisfy (V)",
      B: "satisfied (Adj - hài lòng)",
      C: "satisfying (Adj - mang lại sự hài lòng)",
      D: "satisfaction (N - sự hài lòng)"
    },
    vietOptions: {
      A: "làm hài lòng",
      B: "hài lòng / thỏa mãn",
      C: "đầy thỏa mãn / làm vừa lòng",
      D: "sự thỏa mãn / hài lòng"
    },
    correctAnswerText: "Đáp án B"
  },
  47: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'inspire' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng sau mạo từ 'an' và đứng trước danh từ 'talk' ⇒ Cần một tính từ. Sử dụng tính từ dạng phân từ chủ động 'inspiring' (mang tính truyền cảm hứng) để bổ nghĩa cho cuộc nói chuyện."
    ],
    engSentence: "The guest speaker gave an _____ talk on leadership.",
    vietSentence: "Diễn giả khách mời đã có một bài nói chuyện _____ về khả năng lãnh đạo.",
    engOptions: {
      A: "inspire (V)",
      B: "inspiring (Adj - truyền cảm hứng)",
      C: "inspiration (N - nguồn cảm hứng)",
      D: "inspired (V-ed/Adj)"
    },
    vietOptions: {
      A: "truyền cảm hứng",
      B: "đầy truyền cảm hứng",
      C: "nguồn cảm hứng",
      D: "được truyền cảm hứng"
    },
    correctAnswerText: "Đáp án B"
  },
  48: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'operate' ⇒ Câu hỏi về Từ loại / Danh từ ghép.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng trước danh từ 'costs' ⇒ Cần điền một phân từ đóng vai trò tính từ. Cụm từ chỉ chi phí hoạt động/vận hành doanh nghiệp: 'operating costs'."
    ],
    engSentence: "We must find a way to reduce our _____ costs.",
    vietSentence: "Chúng ta phải tìm cách giảm thiểu chi phí _____ của mình.",
    engOptions: {
      A: "operate (V)",
      B: "operating (Adj/V-ing - vận hành)",
      C: "operation (N)",
      D: "operational (Adj)"
    },
    vietOptions: {
      A: "vận hành",
      B: "vận hành / hoạt động (chi phí)",
      C: "sự hoạt động",
      D: "thuộc về hoạt động"
    },
    correctAnswerText: "Đáp án B"
  },
  49: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'positive' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng sau trạng từ chỉ mức độ 'very' và đứng trước danh từ số nhiều 'reviews' ⇒ Cần điền một tính từ (Adjective) bổ nghĩa cho danh từ."
    ],
    engSentence: "The new product has received very _____ reviews from customers.",
    vietSentence: "Sản phẩm mới đã nhận được những phản hồi rất _____ từ khách hàng.",
    engOptions: {
      A: "positive (Adj)",
      B: "positively (Adv)",
      C: "positiveness (N)",
      D: "positivity (N)"
    },
    vietOptions: {
      A: "tích cực",
      B: "một cách tích cực",
      C: "tính tích cực",
      D: "sự tích cực"
    },
    correctAnswerText: "Đáp án A"
  },
  50: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'addition' ⇒ Câu hỏi về Từ loại.",
      "Sử dụng mẹo ngữ pháp: Chỗ trống đứng sau tính từ chỉ số lượng 'any' và trước danh từ 'assistance' ⇒ Cần điền tính từ (Adjective) bổ nghĩa cho danh từ đó."
    ],
    engSentence: "Please let us know if you need any _____ assistance.",
    vietSentence: "Vui lòng cho chúng tôi biết nếu bạn cần bất kỳ sự hỗ trợ _____ nào.",
    engOptions: {
      A: "addition (N)",
      B: "additional (Adj - thêm vào / bổ sung)",
      C: "additionally (Adv)",
      D: "additions (N số nhiều)"
    },
    vietOptions: {
      A: "phần thêm vào",
      B: "bổ sung / thêm vào",
      C: "ngoài ra / thêm vào đó",
      D: "các phần thêm"
    },
    correctAnswerText: "Đáp án B"
  },
  51: {
    steps: [
      "Xác định dạng câu hỏi: Các đáp án là các dạng từ của gốc 'observe' ⇒ Câu hỏi về Cụm từ cố định.",
      "Sử dụng mẹo ngữ pháp: Cụm từ chỉ hành động kỷ niệm/nghỉ lễ: 'in observance of something' (để kỷ niệm / tuân theo ngày lễ)."
    ],
    engSentence: "The office will be closed on Friday in _____ of the national holiday.",
    vietSentence: "Văn phòng sẽ đóng cửa vào thứ Sáu để _____ ngày lễ quốc gia.",
    engOptions: {
      A: "observe (V)",
      B: "observance (N - sự tuân thủ / kỷ niệm lễ)",
      C: "observant (Adj - tinh mắt / tuân thủ)",
      D: "observes (V-s)"
    },
    vietOptions: {
      A: "quan sát / tuân theo",
      B: "sự kỷ niệm / tuân thủ lễ",
      C: "tinh ý / biết quan sát",
      D: "quan sát (ngôi ba số ít)"
    },
    correctAnswerText: "Đáp án B"
  }
};
