"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal, App, Tooltip, Spin } from "antd";
import {
  ArrowLeftOutlined,
  CheckOutlined,
  QuestionCircleOutlined,
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import styles from "./quiz.module.css";

interface Question {
  number: number;
  text: string;
  options?: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer?: string | string[];
  explanation?: string;
}



const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function ProgressTest() {
  const { message } = App.useApp();
  const router = useRouter();
  const [currentPart, setCurrentPart] = useState<5 | 6 | 7>(5);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [resultVisible, setResultVisible] = useState<boolean>(false);
  const [confirmSubmitVisible, setConfirmSubmitVisible] = useState<boolean>(false);
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});

  const [examId, setExamId] = useState<string | null>(null);
  const [dynamicExam, setDynamicExam] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dynamicQuestions, setDynamicQuestions] = useState<Question[]>([]);
  const [dynamicCorrectAnswers, setDynamicCorrectAnswers] = useState<Record<number, string | string[]>>({});

  const isMultiPartTest = !dynamicExam || dynamicExam.id === "reading-progress-test";

  const [scoreData, setScoreData] = useState({
    correctCount: 0,
    incorrectCount: 0,
    unansweredCount: 51,
    score: 0
  });

  const toggleExplanation = (questionNum: number) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [questionNum]: prev[questionNum] === false ? true : false
    }));
  };

  // Load draft and dynamic exam on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      const targetId = id || "reading-progress-test";
      const isReviewMode = params.get("review") === "true";
      setExamId(targetId);

      // In review mode, restore completed answers and show submitted state
      if (isReviewMode && targetId) {
        try {
          const completedData = localStorage.getItem(`practice_completed_${targetId}`);
          if (completedData) {
            const parsed = JSON.parse(completedData);
            if (parsed.answers) {
              setAnswers(parsed.answers);
            }
            setScoreData({
              correctCount: parsed.correct ?? 0,
              incorrectCount: (parsed.total ?? 0) - (parsed.correct ?? 0),
              unansweredCount: 0,
              score: parsed.score ?? 0
            });
            setIsSubmitted(true);
            setResultVisible(true);
          }
        } catch (e) {
          console.error("Failed to restore completed data", e);
        }
      } else {
        // Normal mode: load draft
        try {
          const saved = localStorage.getItem("progress_test_draft_v2");
          if (saved) {
            setAnswers(JSON.parse(saved));
            message.info("Đã khôi phục bài làm nháp gần nhất!");
          }
        } catch (e) {
          console.error("Failed to load draft", e);
        }
      }

      if (targetId) {
        setLoading(true);
        fetch(`${API_BASE_URL}/api/exams?id=${targetId}`)
          .then((res) => {
            if (res.ok) return res.json();
            throw new Error("Exam not found");
          })
          .then((data) => {
            setDynamicExam(data);
            if (data.questions && data.questions.length > 0) {
              setDynamicQuestions(data.questions);
              const answersMap: Record<number, string | string[]> = {};
              data.questions.forEach((q: any) => {
                if (q.correctAnswer && q.correctAnswer.includes("|")) {
                  answersMap[q.number] = q.correctAnswer.split("|").map((ans: string) => ans.trim());
                } else if (q.correctAnswer && q.correctAnswer.includes(" / ")) {
                  answersMap[q.number] = q.correctAnswer.split(" / ").map((ans: string) => ans.trim());
                } else {
                  answersMap[q.number] = q.correctAnswer;
                }
              });
              setDynamicCorrectAnswers(answersMap);
            }
          })
          .catch((err) => {
            console.error("Lỗi khi tải đề thi động:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, []);

  const getPart5AnsweredCount = () => {
    if (!isMultiPartTest) {
      return Object.keys(answers).filter(k => {
        const num = parseInt(k);
        return dynamicQuestions.some(q => q.number === num) && answers[num] !== "";
      }).length;
    }
    let count = 0;
    for (let i = 1; i <= 20; i++) {
      if (answers[i] && answers[i].trim() !== "") count++;
    }
    return count;
  };

  const getPart6AnsweredCount = () => {
    if (!isMultiPartTest) return 0;
    let count = 0;
    for (let i = 21; i <= 32; i++) {
      if (answers[i] && answers[i].trim() !== "") count++;
    }
    return count;
  };

  const getPart7AnsweredCount = () => {
    if (!isMultiPartTest) return 0;
    let count = 0;
    for (let i = 33; i <= 51; i++) {
      if (answers[i] && answers[i].trim() !== "") count++;
    }
    return count;
  };

  const answeredPart5 = getPart5AnsweredCount();
  const answeredPart6 = getPart6AnsweredCount();
  const answeredPart7 = getPart7AnsweredCount();

  const totalQuestions = dynamicQuestions.length;
  const totalAnsweredCount = !isMultiPartTest ? answeredPart5 : (answeredPart5 + answeredPart6 + answeredPart7);
  const progressPercent = totalQuestions > 0 ? (totalAnsweredCount / totalQuestions) * 100 : 0;

  // Locking rules
  const isPart5Unlocked = true;
  const isPart6Unlocked = !isMultiPartTest ? false : (isSubmitted || (answeredPart5 === 20));
  const isPart7Unlocked = !isMultiPartTest ? false : (isSubmitted || (isPart6Unlocked && answeredPart6 === 12));

  const handlePartClick = (partNum: 5 | 6 | 7) => {
    if (!isMultiPartTest) return;
    if (partNum === 5) {
      setCurrentPart(5);
    } else if (partNum === 6) {
      if (isPart6Unlocked) {
        setCurrentPart(6);
      } else {
        message.warning("Bạn phải hoàn thành tất cả 20 câu hỏi của Part 5 trước!");
      }
    } else if (partNum === 7) {
      if (isPart7Unlocked) {
        setCurrentPart(7);
      } else if (!isPart6Unlocked) {
        message.warning("Bạn phải hoàn thành tất cả 20 câu hỏi của Part 5 trước!");
      } else {
        message.warning("Bạn phải hoàn thành tất cả 12 câu hỏi của Part 6 trước!");
      }
    }
  };

  const handleNextPart = () => {
    if (currentPart === 5) {
      handlePartClick(6);
    } else if (currentPart === 6) {
      handlePartClick(7);
    }
  };

  const handlePrevPart = () => {
    if (currentPart === 7) {
      setCurrentPart(6);
    } else if (currentPart === 6) {
      setCurrentPart(5);
    }
  };

  const handleOptionClick = (questionNum: number, optionKey: string) => {
    if (isSubmitted) return; // Read-only after submit
    setAnswers((prev) => ({
      ...prev,
      [questionNum]: optionKey
    }));
  };

  const handleTextChange = (questionNum: number, value: string) => {
    if (isSubmitted) return; // Read-only after submit
    setAnswers((prev) => ({
      ...prev,
      [questionNum]: value
    }));
  };

  const saveDraft = () => {
    try {
      localStorage.setItem("progress_test_draft_v2", JSON.stringify(answers));
      message.success("Đã lưu nháp bài làm thành công!");
    } catch (e) {
      message.error("Lưu nháp thất bại.");
    }
  };

  const handleBack = () => {
    if (!isSubmitted && totalAnsweredCount > 0) {
      Modal.confirm({
        title: "Xác nhận thoát",
        content: "Bạn đang làm dở bài thi. Bạn có muốn lưu nháp trước khi thoát không?",
        okText: "Lưu nháp & Thoát",
        cancelText: "Không lưu & Thoát",
        onOk: () => {
          localStorage.setItem("progress_test_draft_v2", JSON.stringify(answers));
          router.push("/practice");
        },
        onCancel: () => {
          router.push("/practice");
        }
      });
    } else {
      router.push("/practice");
    }
  };

  const checkSubmit = () => {
    if (totalAnsweredCount < totalQuestions) {
      setConfirmSubmitVisible(true);
    } else {
      doSubmit();
    }
  };

  const isQuestionCorrect = (qNumber: number) => {
    const userAns = answers[qNumber];
    if (!userAns) return false;

    const targetAnswers = dynamicCorrectAnswers;
    const correctVal = targetAnswers[qNumber];
    if (!correctVal) return false;

    if (Array.isArray(correctVal)) {
      return correctVal.map(c => c.trim().toLowerCase()).includes(userAns.trim().toLowerCase());
    }
    return userAns.trim().toLowerCase() === correctVal.trim().toLowerCase();
  };

  const doSubmit = () => {
    let correct = 0;
    dynamicQuestions.forEach(q => {
      if (isQuestionCorrect(q.number)) correct++;
    });

    const incorrect = totalAnsweredCount - correct;
    const unanswered = totalQuestions - totalAnsweredCount;
    const scoreVal = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

    setScoreData({
      correctCount: correct,
      incorrectCount: incorrect,
      unansweredCount: unanswered,
      score: scoreVal
    });

    setIsSubmitted(true);
    setConfirmSubmitVisible(false);
    setResultVisible(true);

    // Clear local storage draft upon submission
    localStorage.removeItem("progress_test_draft_v2");

    // Save completed status for this exam so practice list can detect it
    if (examId) {
      try {
        const completedKey = `practice_completed_${examId}`;
        localStorage.setItem(completedKey, JSON.stringify({
          score: scoreVal,
          correct,
          total: totalQuestions,
          completedAt: new Date().toISOString(),
          answers
        }));

        // Sync to QuestDB
        const token = localStorage.getItem("teacherdung_token");
        if (token) {
          fetch(`${API_BASE_URL}/api/tracking/practice`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              practiceId: examId,
              type: "exam",
              score: scoreVal,
              correctCount: correct,
              totalQuestions: totalQuestions
            })
          }).catch(err => console.error("Failed to sync exam result to QuestDB", err));
        }
      } catch (e) {
        console.error("Failed to save completed status", e);
      }
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setIsSubmitted(false);
    setResultVisible(false);
    setCurrentPart(5);
    message.success("Đã khởi tạo lại bài làm mới!");
  };

  const scrollToQuestion = (qNumber: number) => {
    const el = document.getElementById(`question-item-${qNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const renderExplanationBox = (qNum: number) => {
    const q = dynamicQuestions.find(item => item.number === qNum);
    if (!isSubmitted || !q || !q.explanation) return null;
    const isExpanded = expandedExplanations[qNum] !== false;
    return (
      <div className={styles.explanationBox} onClick={() => toggleExplanation(qNum)}>
        <div className={styles.explanationHeader} style={{ cursor: "pointer" }}>
          <span className={styles.explanationTitle}>
            <InfoCircleOutlined style={{ marginRight: 8 }} />
            Giải thích đáp án
          </span>
          <span>{isExpanded ? <CaretUpOutlined /> : <CaretDownOutlined />}</span>
        </div>
          {isExpanded && (
            <div onClick={(e) => e.stopPropagation()} style={{ padding: "12px", borderTop: "1px solid #e5e7eb" }}>
              <p style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: q.explanation }} />
              <p style={{ color: "#cc4125", fontWeight: "bold" }}>⇒ Đáp án đúng: {q.correctAnswer}</p>
            </div>
          )}
        </div>
      );
    }


  const handleGridItemClick = (qNumber: number) => {
    setResultVisible(false);
    let targetPart: 5 | 6 | 7 = 5;
    if (qNumber >= 21 && qNumber <= 32) targetPart = 6;
    else if (qNumber >= 33) targetPart = 7;

    setCurrentPart(targetPart);
    setTimeout(() => {
      scrollToQuestion(qNumber);
    }, 150);
  };

  // Determine current question array
  const currentQuestions = !isMultiPartTest
    ? dynamicQuestions
    : (currentPart === 5
      ? dynamicQuestions.filter(q => q.number >= 1 && q.number <= 20)
      : currentPart === 6
      ? dynamicQuestions.filter(q => q.number >= 21 && q.number <= 32)
      : dynamicQuestions.filter(q => q.number >= 33 && q.number <= 51));

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f3f4f6" }}>
        <Spin size="large" description="Đang tải dữ liệu đề thi..." />
      </div>
    );
  }

  return (
    <div className={styles.quizLayout}>
      {/* Header */}
      <div className={styles.quizHeader}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={handleBack}>
            <ArrowLeftOutlined />
          </button>
          <div className={styles.logoContainer} onClick={() => router.push("/")}>
            <img
              alt="logo-prep"
              src="/logo.png?v=2"
              className={styles.logo}
            />
          </div>
        </div>

        <div className={styles.headerCenter}>
          <h3 className={styles.headerTitle}>{dynamicExam ? dynamicExam.title : "[Reading] Progress test"}</h3>
        </div>

        <div className={styles.headerRight}>
          <button
            className={styles.draftBtn}
            onClick={saveDraft}
            disabled={isSubmitted}
            style={isSubmitted ? { opacity: 0.5, cursor: "not-allowed" } : {}}
          >
            Lưu nháp
          </button>
          <button className={styles.submitBtn} onClick={checkSubmit}>
            Gửi bài
          </button>
        </div>

        {/* Dynamic Progress Bar */}
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.quizBody}>
        <div className={styles.quizContentCard}>
          {/* Dynamic Exam Header */}
          {!isMultiPartTest && dynamicExam && (
            <div className={styles.partHeader}>
              <h4 className={styles.partTitle}>Đề thi trắc nghiệm</h4>
              <p className={styles.partDescription}>
                Đề: {dynamicExam.title} | Thời gian làm bài: {dynamicExam.duration} phút.
              </p>
              <div className={styles.divider} />
            </div>
          )}

          {/* Part 5 Info */}
          {isMultiPartTest && currentPart === 5 && (
            <div className={styles.partHeader}>
              <h4 className={styles.partTitle}>Part 5</h4>
              <p className={styles.partDescription}>
                In each question, you will be asked to review a statement that is missing a word or phrase.
                Four answer choices will be provided for each statement. Select the best answer and mark
                the corresponding letter (A), (B), (C), or (D).
              </p>
              <div className={styles.divider} />
            </div>
          )}

          {/* Part 6 Info */}
          {isMultiPartTest && currentPart === 6 && (
            <div className={styles.partHeader}>
              <h4 className={styles.partTitle}>Part 6 - Gap Filling</h4>
              <p className={styles.partDescription}>
                Read the sentences below. For each question, fill in the missing word into the blank space. 
                Type your answer directly into the input box below the sentence.
              </p>
              <div className={styles.divider} />
            </div>
          )}

          {/* Part 7 Info */}
          {isMultiPartTest && currentPart === 7 && (
            <div className={styles.partHeader}>
              <h4 className={styles.partTitle}>Part 7</h4>
              <p className={styles.partDescription}>
                In each question, you will be asked to review a statement that is missing a word or phrase.
                Four answer choices will be provided for each statement. Select the best answer and mark
                the corresponding letter (A), (B), (C), or (D).
              </p>
              <div className={styles.divider} />
            </div>
          )}

          {/* Subheader */}
          <div className={styles.questionsSubheader}>
            <span className={styles.iconWrap}>
              <QuestionCircleOutlined />
            </span>
            {!isMultiPartTest ? (
              <span>Danh sách: {totalQuestions} câu hỏi</span>
            ) : (
              <>
                {currentPart === 5 && <span>Questions 1 - 20</span>}
                {currentPart === 6 && <span>Questions 21 - 32</span>}
                {currentPart === 7 && <span>Questions 33 - 51</span>}
              </>
            )}
          </div>

          <h4 className={styles.subTitleText}>
            {currentPart === 6 
              ? "Điền từ thích hợp vào ô trống để hoàn thành các câu sau"
              : "Chọn đáp án đúng để hoàn thành các câu sau"}
          </h4>

          {/* Questions List */}
          <div className={styles.questionsList}>
            {currentQuestions.map((q) => {
              const userAns = answers[q.number] || "";

              // RENDER PART 6 (GAP FILLING)
              if (currentPart === 6) {
                const targetAnswers = dynamicCorrectAnswers;
                const correctVal = targetAnswers[q.number];
                const correctList = Array.isArray(correctVal)
                  ? correctVal
                  : (correctVal ? [correctVal] : []);
                const isCorrect = isQuestionCorrect(q.number);

                let inputClass = styles.inlineGapInput;

                if (isSubmitted) {
                  if (isCorrect) {
                    inputClass = `${styles.inlineGapInput} ${styles.inlineGapInputCorrect}`;
                  } else {
                    inputClass = `${styles.inlineGapInput} ${styles.inlineGapInputIncorrect}`;
                  }
                }

                // Split question text by the blank placeholder
                const textParts = q.text.split("_____");
                const beforeBlank = textParts[0];
                const afterBlank = textParts[1];

                return (
                  <div
                    key={q.number}
                    id={`question-item-${q.number}`}
                    className={styles.questionItem}
                  >
                    <div className={styles.questionTextContainer}>
                      <div className={styles.questionNumberBadge}>{q.number}</div>
                      <div className={styles.questionText}>
                        <span dangerouslySetInnerHTML={{ __html: beforeBlank }} />
                        <input
                          type="text"
                          className={inputClass}
                          value={userAns}
                          placeholder={isSubmitted ? "" : "..."}
                          onChange={(e) => handleTextChange(q.number, e.target.value)}
                          disabled={isSubmitted}
                        />
                        <span dangerouslySetInnerHTML={{ __html: afterBlank }} />
                      </div>
                    </div>

                    {/* Display correct answer / feedback in review mode below the text */}
                    {isSubmitted && !isCorrect && (
                      <div className={styles.correctAnswerBelowText}>
                        <CloseCircleOutlined style={{ color: "#ef4444" }} />
                        <span>
                          Đáp án đúng: <strong>{correctList.join(" / ")}</strong>
                        </span>
                      </div>
                    )}
                    {isSubmitted && isCorrect && (
                      <div className={styles.correctAnswerBelowText} style={{ color: "#10b981" }}>
                        <CheckCircleOutlined style={{ color: "#10b981" }} />
                        <span>Chính xác!</span>
                      </div>
                    )}
                    {renderExplanationBox(q.number)}
                  </div>
                );
              }

              // RENDER PART 5 & PART 7 (MULTIPLE CHOICE)
              const selectedOpt = userAns;
              const correctOpt = dynamicCorrectAnswers[q.number] as string;

              return (
                <div
                  key={q.number}
                  id={`question-item-${q.number}`}
                  className={styles.questionItem}
                >
                  <div className={styles.questionTextContainer}>
                    <div className={styles.questionNumberBadge}>{q.number}</div>
                    <div className={styles.questionText} dangerouslySetInnerHTML={{ __html: q.text }} />
                  </div>

                  <div className={styles.optionsContainer}>
                    {q.options && (Object.keys(q.options) as Array<keyof typeof q.options>).map((optKey) => {
                      const optionText = q.options![optKey];
                      const isSelected = selectedOpt === optKey;
                      const isCorrectAnswer = correctOpt === optKey;

                      // Decide options styling based on submission state
                      let cardClass = styles.optionCard;
                      if (isSubmitted) {
                        if (isCorrectAnswer) {
                          cardClass = `${styles.optionCard} ${styles.optionCardSelected}`;
                        }
                      } else if (isSelected) {
                        cardClass = `${styles.optionCard} ${styles.optionCardSelected}`;
                      }

                      // Dynamic styles for submitted state colors
                      let inlineCardStyle = {};
                      let inlineBadgeStyle = {};
                      let inlineTextStyle = {};

                      if (isSubmitted) {
                        if (isCorrectAnswer) {
                          inlineCardStyle = {
                            borderColor: "#10b981",
                            backgroundColor: "#e6f7ed"
                          };
                          inlineBadgeStyle = {
                            backgroundColor: "#10b981",
                            color: "#ffffff"
                          };
                          inlineTextStyle = {
                            color: "#059669",
                            fontWeight: "600"
                          };
                        } else if (isSelected) {
                          inlineCardStyle = {
                            borderColor: "#ef4444",
                            backgroundColor: "#fee2e2"
                          };
                          inlineBadgeStyle = {
                            backgroundColor: "#ef4444",
                            color: "#ffffff"
                          };
                          inlineTextStyle = {
                            color: "#dc2626",
                            fontWeight: "600"
                          };
                        } else {
                          inlineCardStyle = {
                            opacity: 0.6,
                            cursor: "not-allowed"
                          };
                        }
                      }

                      return (
                        <div
                          key={optKey}
                          className={cardClass}
                          style={inlineCardStyle}
                          onClick={() => handleOptionClick(q.number, optKey)}
                        >
                          <div className={styles.optionInner}>
                            <div
                              className={styles.optionLetterCircle}
                              style={inlineBadgeStyle}
                            >
                              {optKey}
                            </div>
                            <p className={styles.optionText} style={inlineTextStyle} dangerouslySetInnerHTML={{ __html: optionText }} />

                            {/* Icons for check/wrong in submitted mode */}
                            {isSubmitted && isCorrectAnswer && (
                              <CheckCircleOutlined style={{ color: "#10b981", fontSize: 18 }} />
                            )}
                            {isSubmitted && isSelected && !isCorrectAnswer && (
                              <CloseCircleOutlined style={{ color: "#ef4444", fontSize: 18 }} />
                            )}

                            {/* Basic check icon in practice mode */}
                            {!isSubmitted && isSelected && (
                              <CheckOutlined className={styles.checkIcon} />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {renderExplanationBox(q.number)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className={styles.quizFooter}>
        <div className={styles.footerLeft}>
          <Tooltip title="Danh sách câu hỏi">
            <button className={styles.footerMenuBtn} onClick={() => setResultVisible(true)}>
              <UnorderedListOutlined />
            </button>
          </Tooltip>
        </div>

        <div className={styles.footerCenter}>
          {isMultiPartTest && (
            <button 
              className={`${styles.chevronBtn} ${currentPart > 5 ? styles.chevronBtnActive : ""}`}
              onClick={handlePrevPart}
              disabled={currentPart === 5}
            >
              <LeftOutlined />
            </button>
          )}

          <div className={styles.paginationTrack}>
            {!isMultiPartTest ? (
              <div className={`${styles.paginationCard} ${styles.paginationCardActive}`}>
                <h5 className={styles.paginationCardTitle}>Đề thi trắc nghiệm</h5>
                <p className={styles.paginationCardProgress}>
                  {totalAnsweredCount}/{totalQuestions} câu đã làm
                </p>
              </div>
            ) : (
              <>
                {/* Part 5 Navigation Card */}
                <div
                  className={`${styles.paginationCard} ${currentPart === 5 ? styles.paginationCardActive : ""}`}
                  onClick={() => handlePartClick(5)}
                >
                  <h5 className={styles.paginationCardTitle}>Part 5</h5>
                  <p className={styles.paginationCardProgress}>
                    {answeredPart5}/20 Questions
                  </p>
                </div>

                {/* Part 6 Navigation Card */}
                <Tooltip title={!isPart6Unlocked ? "Cần hoàn thành 20 câu hỏi của Part 5" : "Part 6 - Gap Filling"}>
                  <div
                    className={`${styles.paginationCard} ${currentPart === 6 ? styles.paginationCardActive : ""} ${!isPart6Unlocked ? styles.paginationCardDisabled : ""}`}
                    onClick={() => handlePartClick(6)}
                  >
                    <h5 className={styles.paginationCardTitle}>Part 6</h5>
                    <p className={styles.paginationCardProgress}>
                      {answeredPart6}/12 Questions
                    </p>
                  </div>
                </Tooltip>

                {/* Part 7 Navigation Card */}
                <Tooltip title={!isPart7Unlocked ? "Cần hoàn thành 12 câu hỏi của Part 6" : "Part 7"}>
                  <div
                    className={`${styles.paginationCard} ${currentPart === 7 ? styles.paginationCardActive : ""} ${!isPart7Unlocked ? styles.paginationCardDisabled : ""}`}
                    onClick={() => handlePartClick(7)}
                  >
                    <h5 className={styles.paginationCardTitle}>Part 7</h5>
                    <p className={styles.paginationCardProgress}>
                      {answeredPart7}/19 Questions
                    </p>
                  </div>
                </Tooltip>
              </>
            )}
          </div>

          {isMultiPartTest && (
            <button 
              className={`${styles.chevronBtn} ${currentPart < 7 ? styles.chevronBtnActive : ""}`}
              onClick={handleNextPart}
              disabled={currentPart === 7}
            >
              <RightOutlined />
            </button>
          )}
        </div>
      </div>

      {/* Incomplete Submit Confirmation Modal */}
      <Modal
        title="Nộp bài chưa hoàn thành?"
        open={confirmSubmitVisible}
        onOk={doSubmit}
        onCancel={() => setConfirmSubmitVisible(false)}
        okText="Nộp bài"
        cancelText="Làm tiếp"
        okButtonProps={{ type: "primary" }}
      >
        <p style={{ fontSize: 15, margin: "16px 0" }}>
          Bạn mới trả lời <strong>{totalAnsweredCount}/{totalQuestions}</strong> câu hỏi. Bạn có chắc chắn muốn nộp bài thi
          ngay bây giờ không?
        </p>
      </Modal>

      {/* Grading Results Modal / Questions list */}
      <Modal
        open={resultVisible}
        footer={null}
        closable={true}
        onCancel={() => setResultVisible(false)}
        width={560}
        centered
        styles={{ body: { padding: "24px" } }}
      >
        <div className={styles.resultModalContent}>
          {isSubmitted ? (
            <>
              <div className={styles.scoreCircle}>
                <span className={styles.scoreNumber}>{scoreData.score}</span>
                <span className={styles.scoreLabel}>Điểm số</span>
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px 0" }}>
                Kết quả bài kiểm tra
              </h3>
              <p style={{ color: "#6b7280", margin: "0 0 16px 0" }}>
                Cảm ơn bạn đã hoàn thành [Reading] Progress test!
              </p>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={`${styles.statVal} ${styles.statsCorrect}`}>
                    {scoreData.correctCount}
                  </span>
                  <span className={styles.statLabel}>Đúng</span>
                </div>
                <div className={styles.statItem}>
                  <span className={`${styles.statVal} ${styles.statsIncorrect}`}>
                    {scoreData.incorrectCount}
                  </span>
                  <span className={styles.statLabel}>Sai</span>
                </div>
                <div className={styles.statItem}>
                  <span className={`${styles.statVal} ${styles.statsUnanswered}`}>
                    {scoreData.unansweredCount}
                  </span>
                  <span className={styles.statLabel}>Chưa làm</span>
                </div>
              </div>
            </>
          ) : (
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 20px 0", alignSelf: "flex-start" }}>
              Bảng theo dõi câu hỏi ({totalAnsweredCount}/{totalQuestions})
            </h3>
          )}

          <span className={styles.questionGridTitle}>Bảng chi tiết câu hỏi</span>
          <div 
            className={styles.questionsGrid} 
            style={{ 
              gridTemplateColumns: "repeat(6, 1fr)",
              maxHeight: "220px" 
            }}
          >
            {Array.from({ length: totalQuestions }, (_, index) => {
              const qNumber = index + 1;
              const userAns = answers[qNumber];
              
              // Decide styling for each grid item
              let gridClass = styles.gridUnanswered;
              if (isSubmitted) {
                gridClass = isQuestionCorrect(qNumber) ? styles.gridCorrect : styles.gridIncorrect;
              } else if (userAns && userAns.trim() !== "") {
                gridClass = styles.gridCorrect; // Green/Blue indicating answered in practice mode
              }

              // Check if clicking this question's part is allowed (unlocked)
              let isTargetPartUnlocked = true;
              if (!isSubmitted) {
                if (qNumber >= 21 && qNumber <= 32) isTargetPartUnlocked = isPart6Unlocked;
                if (qNumber >= 33) isTargetPartUnlocked = isPart7Unlocked;
              }

              return (
                <div
                  key={qNumber}
                  className={`${styles.gridItem} ${gridClass}`}
                  onClick={() => {
                    if (isTargetPartUnlocked) {
                      handleGridItemClick(qNumber);
                    } else {
                      message.warning("Phần này đang khóa. Vui lòng hoàn thành các câu hỏi trước!");
                    }
                  }}
                  style={{ 
                    cursor: isTargetPartUnlocked ? "pointer" : "not-allowed",
                    opacity: isTargetPartUnlocked ? 1 : 0.4
                  }}
                  title={
                    isSubmitted 
                      ? `Câu ${qNumber}: Click để xem lại`
                      : !isTargetPartUnlocked 
                      ? `Câu ${qNumber}: Đang bị khóa` 
                      : `Câu ${qNumber}: Click để đi tới`
                  }
                >
                  {qNumber}
                </div>
              );
            })}
          </div>

          <div className={styles.modalActions}>
            {isSubmitted ? (
              <>
                <button className={styles.modalBtnSecondary} onClick={handleRetake}>
                  Làm lại
                </button>
                <button
                  className={styles.modalBtnSecondary}
                  onClick={() => setResultVisible(false)}
                >
                  Xem chi tiết
                </button>
                <button
                  className={styles.modalBtnPrimary}
                  onClick={() => router.push("/practice")}
                >
                  Thoát
                </button>
              </>
            ) : (
              <button
                className={styles.modalBtnPrimary}
                style={{ width: "100%" }}
                onClick={() => setResultVisible(false)}
              >
                Đóng
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
