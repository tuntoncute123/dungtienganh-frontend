"use client";

import React, { useState, useEffect } from "react";
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
  Space,
  Tag
} from "antd";
import FlashcardHeaderActions from "./FlashcardHeaderActions";
import FlashcardKnowledgeCard from "./FlashcardKnowledgeCard";
import FlashcardFilters from "./FlashcardFilters";
import FlashcardDeckCard from "./FlashcardDeckCard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const syncFlashcardCount = async (count: number) => {
  const token = localStorage.getItem("teacherdung_token");
  if (!token) return;
  try {
    await fetch(`${API_BASE_URL}/api/users/flashcard-count`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ count })
    });
  } catch (e) {
    console.error("Lỗi khi đồng bộ số lượng flashcard:", e);
  }
};

export default function FlashcardPageContent() {
  const { message } = App.useApp();
  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourceType, setSourceType] = useState<"system" | "custom">("system");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  // LocalStorage states
  const [favoriteDeckIds, setFavoriteDeckIds] = useState<string[]>([]);
  const [deckProgress, setDeckProgress] = useState<Record<string, string[]>>({});

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isStudyOpen, setIsStudyOpen] = useState(false);
  const [studyDeck, setStudyDeck] = useState<any | null>(null);
  const [studyCards, setStudyCards] = useState<Array<{ front: string; back: string }>>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quick Practice Quiz Modal State
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [practiceDeck, setPracticeDeck] = useState<any | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Array<{
    question: string;
    answer: string;
    options: string[];
  }>>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Info Modal State
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [infoDeck, setInfoDeck] = useState<any | null>(null);

  const [form] = Form.useForm();

  // Load from LocalStorage & Sync
  useEffect(() => {
    const favs = localStorage.getItem("fc_favorites");
    if (favs) {
      try {
        setFavoriteDeckIds(JSON.parse(favs));
      } catch (e) {}
    }

    const prog = localStorage.getItem("fc_progress");
    if (prog) {
      try {
        const parsed = JSON.parse(prog);
        setDeckProgress(parsed);
        const total = Object.values(parsed).reduce((acc: number, curr: any) => acc + (curr?.length || 0), 0);
        syncFlashcardCount(total);
      } catch (e) {}
    }
  }, []);

  const fetchDecks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/flashcards`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setDecks(data);
        } else {
          setDecks([]);
        }
      } else {
        setDecks([]);
      }
    } catch (e) {
      console.error("Lỗi khi tải bộ thẻ:", e);
      setDecks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  // Filtered decks list
  const filteredDecks = decks.filter(deck => {
    const matchesCategory = selectedCategory === "favorites"
      ? favoriteDeckIds.includes(deck.id)
      : (selectedCategory ? deck.category === selectedCategory : true);

    const matchesSource = selectedCategory === "favorites" ? true : (deck.type === sourceType);
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
  const handleOpenStudy = (deck: any) => {
    const deckCards = deck.cards || [];
    setStudyDeck(deck);
    setStudyCards(deckCards);
    setActiveCardIndex(0);
    setIsFlipped(false);
    setIsStudyOpen(true);
  };

  // Mark card as Mastered / Not Mastered
  const handleMarkCardMastery = (deckId: string, cardFront: string, mastered: boolean) => {
    const currentMastered = deckProgress[deckId] || [];
    let updatedMastered: string[];
    if (mastered) {
      if (!currentMastered.includes(cardFront)) {
        updatedMastered = [...currentMastered, cardFront];
      } else {
        updatedMastered = currentMastered;
      }
    } else {
      updatedMastered = currentMastered.filter(front => front !== cardFront);
    }

    const updated = {
      ...deckProgress,
      [deckId]: updatedMastered
    };
    setDeckProgress(updated);
    localStorage.setItem("fc_progress", JSON.stringify(updated));

    // Đồng bộ số lượng lên server
    const total = Object.values(updated).reduce((acc: number, curr: any) => acc + (curr?.length || 0), 0);
    syncFlashcardCount(total);

    if (mastered) {
      message.success("Đã thuộc thẻ! Tiến độ đã được cập nhật.");
    } else {
      message.info("Đã đánh dấu chưa thuộc.");
    }

    // Auto advance to next card with slight delay
    if (activeCardIndex < studyCards.length - 1) {
      setTimeout(() => {
        setActiveCardIndex(prev => prev + 1);
        setIsFlipped(false);
      }, 300);
    }
  };

  // Open deck for quick practice (Quiz)
  const handleOpenPractice = (deck: any) => {
    const cards = deck.cards || [];
    if (cards.length === 0) {
      message.warning("Bộ thẻ này chưa có thẻ từ vựng nào để luyện tập!");
      return;
    }

    const allBacks = cards.map((c: any) => c.back);
    
    // Tự động gom thêm đáp án nhiễu từ các bộ thẻ khác có trong cơ sở dữ liệu để chống mock cứng
    const allDatabaseBacks: string[] = [];
    decks.forEach((d: any) => {
      if (d.cards) {
        d.cards.forEach((c: any) => {
          if (c.back) allDatabaseBacks.push(c.back);
        });
      }
    });

    const fallbackOptions = ["Tích lũy, gom góp lại", "Đa dạng sinh học", "Sự bảo tồn", "Mơ hồ, nước đôi", "Tỉ mỉ, kỹ càng", "Dễ như ăn bánh"];

    const questions = cards.map((card: any) => {
      const correctAnswer = card.back;
      let distractors = allBacks.filter((b: string) => b !== correctAnswer);
      
      if (distractors.length < 3) {
        distractors = [...distractors, ...allDatabaseBacks.filter((b: string) => b !== correctAnswer)];
      }
      if (distractors.length < 3) {
        distractors = [...distractors, ...fallbackOptions.filter(fo => fo !== correctAnswer)];
      }

      distractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());

      return {
        question: card.front,
        answer: correctAnswer,
        options
      };
    });

    setPracticeDeck(deck);
    setQuizQuestions(questions.sort(() => 0.5 - Math.random()));
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setIsPracticeOpen(true);
  };

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    const correct = option === quizQuestions[currentQuizIndex].answer;
    if (correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuizIndex < quizQuestions.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setQuizFinished(true);
      }
    }, 1500);
  };

  // Open deck details (Info)
  const handleOpenInfo = (deck: any) => {
    setInfoDeck(deck);
    setIsInfoOpen(true);
  };

  // Toggle favorite status
  const handleToggleFavorite = (deckId: string) => {
    let updated: string[];
    if (favoriteDeckIds.includes(deckId)) {
      updated = favoriteDeckIds.filter(id => id !== deckId);
      message.success("Đã bỏ bộ thẻ khỏi mục yêu thích!");
    } else {
      updated = [...favoriteDeckIds, deckId];
      message.success("Đã lưu bộ thẻ vào mục yêu thích!");
    }
    setFavoriteDeckIds(updated);
    localStorage.setItem("fc_favorites", JSON.stringify(updated));
  };

  // Reset Progress
  const handleResetProgress = (deckId: string) => {
    Modal.confirm({
      title: "Làm mới tiến độ học tập",
      content: "Bạn có chắc chắn muốn làm mới tiến độ học của bộ thẻ này? Trạng thái thuộc bài của các từ sẽ quay về ban đầu.",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        const updated = { ...deckProgress };
        delete updated[deckId];
        setDeckProgress(updated);
        localStorage.setItem("fc_progress", JSON.stringify(updated));

        // Đồng bộ lên server
        const total = Object.values(updated).reduce((acc: number, curr: any) => acc + (curr?.length || 0), 0);
        syncFlashcardCount(total);

        message.success("Đã đặt lại tiến độ bộ thẻ!");
      }
    });
  };

  // Handle deck creation
  const handleCreateDeck = async (values: any) => {
    const categoryLabels: Record<string, string> = {
      vocabulary: "Từ vựng",
      idiom: "Thành ngữ",
      phrasal_verb: "Cụm động từ",
      collocation: "Kết hợp từ",
      grammar: "Ngữ pháp",
      mixed: "Tổng hợp"
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/flashcards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: values.category,
          categoryLabel: categoryLabels[values.category] || "Tổng hợp",
          title: values.title,
          isLocked: false,
          type: "custom",
          cards: []
        }),
      });

      if (res.ok) {
        message.success("Tạo bộ thẻ mới thành công!");
        setIsCreateOpen(false);
        form.resetFields();
        fetchDecks();
        setSourceType("custom");
      } else {
        const err = await res.json();
        message.error(err.error || "Không thể tạo bộ thẻ");
      }
    } catch (e) {
      message.error("Lỗi kết nối");
    }
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
                  {paginatedDecks.map(deck => {
                    const totalCards = deck.cards?.length || deck.cardCount || 1;
                    const masteredCount = deckProgress[deck.id]?.length || 0;
                    const progressPercent = Math.min(100, Math.round((masteredCount / totalCards) * 100));

                    return (
                      <Col xs={12} sm={12} lg={12} xl={8} key={deck.id}>
                        <FlashcardDeckCard 
                          deck={deck} 
                          onStudy={handleOpenStudy}
                          onPractice={handleOpenPractice}
                          onInfo={handleOpenInfo}
                          onToggleFavorite={handleToggleFavorite}
                          onResetProgress={handleResetProgress}
                          isFavorite={favoriteDeckIds.includes(deck.id)}
                          progress={progressPercent}
                        />
                      </Col>
                    );
                  })}
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
          initialValues={{ category: "vocabulary", cardCount: 5 }}
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

            {/* Mastery evaluation buttons */}
            {isFlipped && studyDeck && (
              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
                <Button 
                  danger 
                  style={{ height: 40, borderRadius: 8, fontWeight: 600 }}
                  onClick={() => handleMarkCardMastery(studyDeck.id, studyCards[activeCardIndex].front, false)}
                >
                  Chưa thuộc ❌
                </Button>
                <Button 
                  type="primary" 
                  style={{ backgroundColor: "#22c55e", borderColor: "#22c55e", height: 40, borderRadius: 8, fontWeight: 600 }}
                  onClick={() => handleMarkCardMastery(studyDeck.id, studyCards[activeCardIndex].front, true)}
                >
                  Đã thuộc bài ✅
                </Button>
              </div>
            )}

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
                ghost
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

      {/* QUICK PRACTICE (QUIZ) MODAL */}
      <Modal
        title={practiceDeck ? `Luyện tập nhanh: ${practiceDeck.title}` : "Luyện tập Flashcard"}
        open={isPracticeOpen}
        onCancel={() => setIsPracticeOpen(false)}
        footer={null}
        width={550}
        centered
        destroyOnHidden
      >
        {quizQuestions.length > 0 && !quizFinished ? (
          <div style={{ padding: "12px 0" }}>
            {/* Progress indicator */}
            <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: 13, marginBottom: 16 }}>
              <span>Câu hỏi {currentQuizIndex + 1} / {quizQuestions.length}</span>
              <span>Điểm số: {score}</span>
            </div>

            {/* Question Card */}
            <div 
              style={{ 
                background: "#f8fafc", 
                border: "2px solid #e2e8f0", 
                borderRadius: 12, 
                padding: "24px 16px", 
                textAlign: "center", 
                marginBottom: 24 
              }}
            >
              <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Từ vựng cần dịch:</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: 0 }}>{quizQuestions[currentQuizIndex].question}</h2>
            </div>

            {/* Options grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {quizQuestions[currentQuizIndex].options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === quizQuestions[currentQuizIndex].answer;
                
                let btnType: "default" | "primary" = "default";
                let btnStyle: React.CSSProperties = {
                  height: "auto",
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: "15px",
                  whiteSpace: "normal",
                  borderRadius: "8px"
                };

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle.borderColor = "#22c55e";
                    btnStyle.backgroundColor = "#f0fdf4";
                    btnStyle.color = "#15803d";
                    btnStyle.fontWeight = 600;
                  } else if (isSelected) {
                    btnStyle.borderColor = "#ef4444";
                    btnStyle.backgroundColor = "#fef2f2";
                    btnStyle.color = "#b91c1c";
                  }
                } else if (isSelected) {
                  btnType = "primary";
                }

                return (
                  <Button 
                    key={idx} 
                    type={btnType}
                    style={btnStyle}
                    onClick={() => handleSelectOption(opt)}
                    disabled={isAnswered}
                  >
                    <span style={{ fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </Button>
                );
              })}
            </div>
          </div>
        ) : quizFinished ? (
          <div style={{ padding: "24px 0", textAlign: "center" }}>
            <div style={{ fontSize: 60, marginBottom: 12 }}>{score === quizQuestions.length ? "🏆" : "🎉"}</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Hoàn thành luyện tập!</h2>
            <p style={{ fontSize: 16, color: "#475569", marginBottom: 24 }}>Bạn đạt được <strong>{score} / {quizQuestions.length}</strong> câu trả lời chính xác.</p>
            <div style={{ width: "100%", height: 8, backgroundColor: "#e2e8f0", borderRadius: 4, overflow: "hidden", marginBottom: 24 }}>
              <div 
                style={{ 
                  width: `${(score / quizQuestions.length) * 100}%`, 
                  height: "100%", 
                  backgroundColor: score === quizQuestions.length ? "#22c55e" : "#35a873" 
                }}
              ></div>
            </div>
            <Button type="primary" size="large" onClick={() => setIsPracticeOpen(false)}>Quay lại</Button>
          </div>
        ) : null}
      </Modal>

      {/* DECK INFO MODAL */}
      <Modal
        title={infoDeck ? `Danh sách từ vựng: ${infoDeck.title}` : "Chi tiết bộ thẻ"}
        open={isInfoOpen}
        onCancel={() => setIsInfoOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsInfoOpen(false)}>Đóng</Button>
        ]}
        width={600}
        centered
        destroyOnHidden
      >
        {infoDeck && (
          <div style={{ padding: "12px 0" }}>
            <div style={{ marginBottom: 16 }}>
              <strong>Danh mục:</strong> <Tag color="blue">{infoDeck.categoryLabel || infoDeck.category}</Tag>
              <strong style={{ marginLeft: 16 }}>Tổng số từ:</strong> {infoDeck.cards?.length || infoDeck.cardCount || 0} từ
            </div>
            <div style={{ maxHeight: 350, overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: 8 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 16px", fontWeight: 700, color: "#475569" }}>Thuật ngữ / Từ vựng</th>
                    <th style={{ padding: "10px 16px", fontWeight: 700, color: "#475569" }}>Nghĩa tiếng Việt</th>
                  </tr>
                </thead>
                <tbody>
                  {(infoDeck.cards || []).map((card: any, idx: number) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0f172a" }}>{card.front}</td>
                      <td style={{ padding: "12px 16px", color: "#334155" }}>{card.back}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
