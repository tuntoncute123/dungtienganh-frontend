"use client";

import React, { useState } from "react";
import { 
  Row, 
  Col, 
  Pagination, 
  Modal, 
  Form, 
  Input, 
  Select, 
  InputNumber, 
  Button, 
  App,
  Empty,
  Space
} from "antd";
import FlashcardHeaderActions from "./FlashcardHeaderActions";
import FlashcardKnowledgeCard from "./FlashcardKnowledgeCard";
import FlashcardFilters from "./FlashcardFilters";
import FlashcardDeckCard, { FlashcardDeck } from "./FlashcardDeckCard";

// Mock flashcards inside decks
const mockCardsDatabase: Record<string, Array<{ front: string; back: string }>> = {
  "1": [
    { front: "Accumulate (v)", back: "Tích lũy, gom góp lại" },
    { front: "Prevalent (adj)", back: "Phổ biến, thịnh hành" },
    { front: "Compensate (v)", back: "Đền bù, bồi thường, đền đáp" },
    { front: "Simultaneous (adj)", back: "Đồng thời, cùng một lúc" },
    { front: "Inevitably (adv)", back: "Chắc chắn xảy ra, không thể tránh khỏi" }
  ],
  "2": [
    { front: "Biodiversity (n)", back: "Đa dạng sinh học" },
    { front: "Conservation (n)", back: "Sự bảo tồn" },
    { front: "Vulnerable (adj)", back: "Dễ bị tổn thương, dễ gặp nguy hiểm" },
    { front: "Deforestation (n)", back: "Nạn phá rừng" }
  ],
  "3": [
    { front: "Incorrigible (adj)", back: "Không thể sửa đổi, cứng đầu" },
    { front: "Meticulous (adj)", back: "Tỉ mỉ, kỹ càng, tỉ mẩn" },
    { front: "Ambiguous (adj)", back: "Mơ hồ, nước đôi, khó hiểu" }
  ],
  "9": [
    { front: "Piece of cake", back: "Dễ như ăn bánh, vô cùng đơn giản" },
    { front: "Break a leg", back: "Chúc may mắn (thường dùng trong nghệ thuật)" },
    { front: "Under the weather", back: "Cảm thấy hơi mệt, không được khỏe" }
  ]
};

const initialDecks: FlashcardDeck[] = [
  {
    id: "1",
    category: "vocabulary",
    categoryLabel: "Từ vựng",
    title: "KHÓA LIVE C - TỪ VỰNG ĐỌC HIỂU NÂNG CAO (P1)",
    cardCount: 45,
    isLocked: false,
    type: "system",
  },
  {
    id: "2",
    category: "vocabulary",
    categoryLabel: "Từ vựng",
    title: "TỪ VỰNG THEO CHỦ ĐỀ (P1) - KHÓA LIVE C",
    cardCount: 122,
    isLocked: false,
    type: "system",
  },
  {
    id: "3",
    category: "vocabulary",
    categoryLabel: "Từ vựng",
    title: "ĐỀ TUYỆT MẬT SỐ 3",
    cardCount: 100,
    isLocked: false,
    type: "system",
  },
  {
    id: "4",
    category: "vocabulary",
    categoryLabel: "Từ vựng",
    title: "ĐỀ TUYỆT MẬT 2",
    cardCount: 100,
    isLocked: false,
    type: "system",
  },
  {
    id: "5",
    category: "vocabulary",
    categoryLabel: "Từ vựng",
    title: "Ai",
    cardCount: 1,
    isLocked: true,
    type: "system",
  },
  {
    id: "6",
    category: "vocabulary",
    categoryLabel: "Từ vựng",
    title: "ĐỀ TUYỆT MẬT 1",
    cardCount: 100,
    isLocked: false,
    type: "system",
  },
  {
    id: "7",
    category: "vocabulary",
    categoryLabel: "Từ vựng",
    title: "ĐỀ DỰ ĐOÁN SỐ 11",
    cardCount: 100,
    isLocked: false,
    type: "system",
  },
  {
    id: "8",
    category: "vocabulary",
    categoryLabel: "Từ vựng",
    title: "ĐỀ DỰ ĐOÁN SỐ 10",
    cardCount: 100,
    isLocked: false,
    type: "system",
  },
  {
    id: "9",
    category: "idiom",
    categoryLabel: "Thành ngữ",
    title: "THÀNH NGỮ THƯỜNG GẶP TRONG ĐỀ THI THPTQG",
    cardCount: 50,
    isLocked: false,
    type: "system",
  },
  {
    id: "10",
    category: "idiom",
    categoryLabel: "Thành ngữ",
    title: "IDIOMS FOR IELTS SPEAKING BAND 7.0+",
    cardCount: 80,
    isLocked: true,
    type: "system",
  },
  {
    id: "11",
    category: "phrasal_verb",
    categoryLabel: "Cụm động từ",
    title: "100 CỤM ĐỘNG TỪ ĐI VỚI 'TAKE', 'GET', 'GO'",
    cardCount: 100,
    isLocked: false,
    type: "system",
  },
  {
    id: "12",
    category: "collocation",
    categoryLabel: "Kết hợp từ",
    title: "COLLOCATIONS CHỦ ĐỀ WORK & EDUCATION",
    cardCount: 60,
    isLocked: false,
    type: "system",
  },
  {
    id: "13",
    category: "grammar",
    categoryLabel: "Ngữ pháp",
    title: "20 CHUYÊN ĐỀ NGỮ PHÁP TRỌNG TÂM",
    cardCount: 200,
    isLocked: false,
    type: "system",
  },
  {
    id: "14",
    category: "mixed",
    categoryLabel: "Tổng hợp",
    title: "TỔNG HỢP KIẾN THỨC MÙA THI 2025",
    cardCount: 150,
    isLocked: false,
    type: "system",
  },
  // Custom user-designed decks
  {
    id: "15",
    category: "vocabulary",
    categoryLabel: "Từ vựng",
    title: "Từ vựng nâng cao Unit 1 - Tiếng Anh 12",
    cardCount: 15,
    isLocked: false,
    type: "custom",
  },
  {
    id: "16",
    category: "idiom",
    categoryLabel: "Thành ngữ",
    title: "Thành ngữ tự học mỗi ngày",
    cardCount: 8,
    isLocked: false,
    type: "custom",
  }
];

export default function FlashcardPageContent() {
  const { message } = App.useApp();
  const [decks, setDecks] = useState<FlashcardDeck[]>(initialDecks);
  const [sourceType, setSourceType] = useState<"system" | "custom">("system");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isStudyOpen, setIsStudyOpen] = useState(false);
  const [studyDeck, setStudyDeck] = useState<FlashcardDeck | null>(null);
  const [studyCards, setStudyCards] = useState<Array<{ front: string; back: string }>>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [form] = Form.useForm();

  // Filtered decks list
  const filteredDecks = decks.filter(deck => {
    const matchesSource = deck.type === sourceType;
    const matchesCategory = selectedCategory ? deck.category === selectedCategory : true;
    return matchesSource && matchesCategory;
  });

  // Paginated decks list
  const totalItems = filteredDecks.length;
  const paginatedDecks = filteredDecks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSourceChange = (type: "system" | "custom") => {
    setSourceType(type);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string | null) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  // Open deck to study
  const handleOpenStudy = (deck: FlashcardDeck) => {
    const deckCards = mockCardsDatabase[deck.id] || [
      { front: `Từ vựng mẫu 1 của bộ: ${deck.title}`, back: "Nghĩa của từ vựng mẫu 1" },
      { front: `Từ vựng mẫu 2 của bộ: ${deck.title}`, back: "Nghĩa của từ vựng mẫu 2" },
      { front: `Từ vựng mẫu 3 của bộ: ${deck.title}`, back: "Nghĩa của từ vựng mẫu 3" },
    ];
    setStudyDeck(deck);
    setStudyCards(deckCards);
    setActiveCardIndex(0);
    setIsFlipped(false);
    setIsStudyOpen(true);
  };

  // Handle deck creation
  const handleCreateDeck = (values: any) => {
    const categoryLabels: Record<string, string> = {
      vocabulary: "Từ vựng",
      idiom: "Thành ngữ",
      phrasal_verb: "Cụm động từ",
      collocation: "Kết hợp từ",
      grammar: "Ngữ pháp",
      mixed: "Tổng hợp"
    };

    const newDeck: FlashcardDeck = {
      id: Date.now().toString(),
      category: values.category,
      categoryLabel: categoryLabels[values.category] || "Tổng hợp",
      title: values.title,
      cardCount: values.cardCount || 10,
      isLocked: false,
      type: "custom"
    };

    setDecks([newDeck, ...decks]);
    setSourceType("custom"); // Switch to custom tab to view the new deck
    setSelectedCategory(null);
    setCurrentPage(1);
    setIsCreateOpen(false);
    form.resetFields();
    message.success("Tạo bộ thẻ mới thành công!");
  };

  return (
    <div className="flashcard-page-container">
      {/* 1. Header Actions */}
      <FlashcardHeaderActions />

      {/* 2. Filters & Options */}
      <FlashcardFilters 
        sourceType={sourceType}
        onSourceTypeChange={handleSourceChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onAddNewDeck={() => setIsCreateOpen(true)}
      />

      {/* 3. Main Grid layout */}
      <Row gutter={[24, 24]} className="fc-main-grid">
        {/* Left Column - Knowledge banner */}
        <Col xs={24} md={8} lg={7} xl={6}>
          <FlashcardKnowledgeCard />
        </Col>

        {/* Right Column - Decks Grid */}
        <Col xs={24} md={16} lg={17} xl={18}>
          <div className="fc-decks-wrapper">
            {paginatedDecks.length > 0 ? (
              <>
                <Row gutter={[20, 20]}>
                  {paginatedDecks.map(deck => (
                    <Col xs={24} sm={12} lg={12} xl={8} key={deck.id}>
                      <FlashcardDeckCard 
                        deck={deck} 
                        onStudy={handleOpenStudy} 
                      />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {totalItems > pageSize && (
                  <div className="fc-pagination-container">
                    <Pagination 
                      current={currentPage}
                      pageSize={pageSize}
                      total={totalItems}
                      onChange={(page) => setCurrentPage(page)}
                      showSizeChanger={false}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="fc-empty-state">
                <Empty 
                  description="Không tìm thấy bộ thẻ nào phù hợp với bộ lọc."
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* CREATE NEW DECK MODAL */}
      <Modal
        title="Tạo bộ thẻ từ vựng mới"
        open={isCreateOpen}
        onCancel={() => setIsCreateOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleCreateDeck}
          initialValues={{ category: "vocabulary", cardCount: 10 }}
        >
          <Form.Item
            name="title"
            label="Tên bộ thẻ học tập"
            rules={[{ required: true, message: "Vui lòng nhập tên bộ thẻ!" }]}
          >
            <Input placeholder="Ví dụ: 30 từ vựng Unit 1 Tiếng Anh 12..." />
          </Form.Item>

          <Form.Item
            name="category"
            label="Phân loại danh mục"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="vocabulary">Từ vựng</Select.Option>
              <Select.Option value="idiom">Thành ngữ</Select.Option>
              <Select.Option value="phrasal_verb">Cụm động từ</Select.Option>
              <Select.Option value="collocation">Kết hợp từ</Select.Option>
              <Select.Option value="grammar">Ngữ pháp</Select.Option>
              <Select.Option value="mixed">Tổng hợp</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="cardCount"
            label="Số lượng thẻ ước tính"
          >
            <InputNumber min={1} max={500} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end gap-2" style={{ marginTop: 24, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setIsCreateOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">Tạo mới</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* FLASHCARD STUDY MODAL (Interactive Flashcard Viewer) */}
      <Modal
        title={studyDeck ? `Học tập bộ thẻ: ${studyDeck.title}` : "Học tập Flashcard"}
        open={isStudyOpen}
        onCancel={() => setIsStudyOpen(false)}
        footer={null}
        width={600}
        centered
        className="fc-study-modal"
      >
        {studyCards.length > 0 && (
          <div className="fc-study-box">
            {/* Card counter */}
            <div className="fc-card-count">
              Thẻ {activeCardIndex + 1} / {studyCards.length}
            </div>

            {/* Flashcard wrapper */}
            <div 
              className={`fc-flashcard-flipper ${isFlipped ? "fc-flipped" : ""}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="fc-flashcard-front">
                <div className="fc-flashcard-word">{studyCards[activeCardIndex].front}</div>
                <div className="fc-flashcard-hint">Bấm để xem nghĩa</div>
              </div>
              <div className="fc-flashcard-back">
                <div className="fc-flashcard-meaning">{studyCards[activeCardIndex].back}</div>
                <div className="fc-flashcard-hint">Bấm để xem từ vựng</div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="fc-card-navigator" style={{ marginTop: 28, display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Button 
                disabled={activeCardIndex === 0}
                onClick={() => {
                  setActiveCardIndex(activeCardIndex - 1);
                  setIsFlipped(false);
                }}
              >
                Trước đó
              </Button>
              <Button 
                type="primary"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                Lật thẻ
              </Button>
              <Button 
                disabled={activeCardIndex === studyCards.length - 1}
                onClick={() => {
                  setActiveCardIndex(activeCardIndex + 1);
                  setIsFlipped(false);
                }}
              >
                Tiếp theo
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
