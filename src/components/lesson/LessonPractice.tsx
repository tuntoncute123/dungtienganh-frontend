"use client";

import React, { forwardRef, useState, useEffect } from "react";
import { Spin, message, Modal } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  UndoOutlined,
  FormOutlined,
  CheckOutlined,
  CaretUpOutlined,
  CaretDownOutlined
} from "@ant-design/icons";
import styles from "./LessonPractice.module.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface Question {
  id: string;
  number: number;
  text: string;
  options: any; // e.g. { A: "...", B: "..." }
  correctAnswer: string;
  explanation?: string | null;
}

interface Exam {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
}

export interface LessonPracticeProps {
  exerciseId: string;
}

const LessonPractice = forwardRef<HTMLDivElement, LessonPracticeProps>(({ exerciseId }, ref) => {
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreData, setScoreData] = useState({
    correctCount: 0,
    incorrectCount: 0,
    score: 0
  });
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});

  // Fetch Exam Data
  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/exams?id=${exerciseId}`);
        if (res.ok) {
          const data = await res.json();
          setExam(data);
          
          // Restore completed state or draft state
          const completedKey = `practice_completed_${exerciseId}`;
          const draftKey = `practice_draft_${exerciseId}`;
          const completedData = localStorage.getItem(completedKey);
          
          if (completedData) {
            const parsed = JSON.parse(completedData);
            if (parsed.answers) setAnswers(parsed.answers);
            setScoreData({
              correctCount: parsed.correct ?? 0,
              incorrectCount: (parsed.total ?? 0) - (parsed.correct ?? 0),
              score: parsed.score ?? 0
            });
            setIsSubmitted(true);
          } else {
            const draftData = localStorage.getItem(draftKey);
            if (draftData) {
              setAnswers(JSON.parse(draftData));
            }
          }
        } else {
          console.error("Không tìm thấy đề thi ôn tập");
        }
      } catch (err) {
        console.error("Lỗi khi tải bài tập ôn tập:", err);
      } finally {
        setLoading(false);
      }
    };

    if (exerciseId) {
      fetchExam();
    } else {
      setLoading(false);
    }
  }, [exerciseId]);

  if (loading) {
    return (
      <div className={styles.practiceCard} ref={ref}>
        <div className={styles.loaderContainer}>
          <Spin size="large" />
          <span style={{ color: "#64748b", fontWeight: 500 }}>Đang tải bài tập ôn luyện...</span>
        </div>
      </div>
    );
  }

  if (!exam || !exam.questions || exam.questions.length === 0) {
    return (
      <div className={styles.practiceCard} ref={ref}>
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748b" }}>
          <InfoCircleOutlined style={{ fontSize: 32, marginBottom: 12, color: "#94a3b8" }} />
          <p style={{ fontWeight: 500, fontSize: 15, margin: 0 }}>Chưa có câu hỏi hoặc đề thi ôn tập cho bài học này.</p>
        </div>
      </div>
    );
  }

  const questions = exam.questions.sort((a, b) => a.number - b.number);
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).filter(k => answers[Number(k)] && answers[Number(k)].trim() !== "").length;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const handleOptionClick = (questionNum: number, optionKey: string) => {
    if (isSubmitted) return;
    const newAnswers = {
      ...answers,
      [questionNum]: optionKey
    };
    setAnswers(newAnswers);
    localStorage.setItem(`practice_draft_${exerciseId}`, JSON.stringify(newAnswers));
  };

  const handleTextChange = (questionNum: number, value: string) => {
    if (isSubmitted) return;
    const newAnswers = {
      ...answers,
      [questionNum]: value
    };
    setAnswers(newAnswers);
    localStorage.setItem(`practice_draft_${exerciseId}`, JSON.stringify(newAnswers));
  };

  const isQuestionCorrect = (q: Question) => {
    const userAns = answers[q.number];
    if (!userAns) return false;

    const correctVal = q.correctAnswer;
    if (!correctVal) return false;

    if (correctVal.includes(" / ")) {
      const correctList = correctVal.split(" / ").map(ans => ans.trim().toLowerCase());
      return correctList.includes(userAns.trim().toLowerCase());
    }
    return userAns.trim().toLowerCase() === correctVal.trim().toLowerCase();
  };

  const checkSubmit = () => {
    if (answeredCount < totalQuestions) {
      Modal.confirm({
        title: "Nộp bài chưa hoàn thành?",
        content: `Bạn mới trả lời ${answeredCount}/${totalQuestions} câu hỏi. Bạn có chắc chắn muốn nộp bài thi ôn luyện ngay bây giờ không?`,
        okText: "Nộp bài",
        cancelText: "Làm tiếp",
        okButtonProps: { type: "primary" },
        onOk: doSubmit
      });
    } else {
      doSubmit();
    }
  };

  const doSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      if (isQuestionCorrect(q)) correct++;
    });

    const incorrect = totalQuestions - correct;
    const scoreVal = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

    const newScoreData = {
      correctCount: correct,
      incorrectCount: incorrect,
      score: scoreVal
    };

    setScoreData(newScoreData);
    setIsSubmitted(true);

    // Save completed status
    localStorage.setItem(`practice_completed_${exerciseId}`, JSON.stringify({
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
          practiceId: exerciseId,
          type: "exercise",
          score: scoreVal,
          correctCount: correct,
          totalQuestions: totalQuestions
        })
      }).catch(err => console.error("Failed to sync exercise result to QuestDB", err));
    }

    // Clear draft
    localStorage.removeItem(`practice_draft_${exerciseId}`);
    message.success("Nộp bài luyện tập thành công!");
  };

  const handleRetake = () => {
    Modal.confirm({
      title: "Xác nhận làm lại?",
      content: "Bạn có chắc chắn muốn xóa kết quả cũ và làm lại bài luyện tập này không?",
      okText: "Làm lại",
      cancelText: "Hủy",
      okButtonProps: { type: "primary", danger: true },
      onOk: () => {
        setAnswers({});
        setIsSubmitted(false);
        setScoreData({ correctCount: 0, incorrectCount: 0, score: 0 });
        setExpandedExplanations({});
        localStorage.removeItem(`practice_completed_${exerciseId}`);
        localStorage.removeItem(`practice_draft_${exerciseId}`);
        message.success("Đã thiết lập lại bài luyện tập!");
      }
    });
  };

  const toggleExplanation = (questionNum: number) => {
    setExpandedExplanations(prev => ({
      ...prev,
      [questionNum]: !prev[questionNum]
    }));
  };

  return (
    <div className={styles.practiceCard} ref={ref}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div>
          <h3 className={styles.title}>
            <FormOutlined style={{ color: "#0071f9" }} />
            {exam.title}
          </h3>
          <p className={styles.subtitle}>Thời gian đề xuất: {exam.duration} phút</p>
        </div>
      </div>

      {/* Progress or Score */}
      {isSubmitted ? (
        <div className={styles.resultBox}>
          <div className={styles.resultInfo}>
            <h4 className={styles.resultTitle}>🎉 Kết quả luyện tập</h4>
            <p className={styles.resultStats}>
              Đúng: <strong>{scoreData.correctCount}</strong> | Sai: <strong>{scoreData.incorrectCount}</strong> | Tổng số: <strong>{totalQuestions}</strong> câu
            </p>
          </div>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreNumber}>{scoreData.score}</span>
            <span className={styles.scoreLabel}>Điểm số</span>
          </div>
        </div>
      ) : (
        <div className={styles.progressContainer}>
          <div className={styles.progressLabel}>
            <span>Tiến độ làm bài</span>
            <span>{answeredCount}/{totalQuestions} câu hỏi</span>
          </div>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      )}

      {/* Questions list */}
      <div className={styles.questionsList}>
        {questions.map((q) => {
          const userAns = answers[q.number] || "";
          const hasOptions = q.options && (q.options.A || q.options.B || q.options.C || q.options.D);
          const isCorrect = isQuestionCorrect(q);

          return (
            <div key={q.id} className={styles.questionItem}>
              {/* Question Text */}
              <div className={styles.questionHeader}>
                <div className={styles.questionNumber}>{q.number}</div>
                {!hasOptions && q.text.includes("_____") ? (
                  // Inline fill-in-the-blanks (Part 6)
                  <p className={styles.questionText}>
                    <span dangerouslySetInnerHTML={{ __html: q.text.split("_____")[0] }} />
                    <input
                      type="text"
                      className={`${styles.gapInput} ${
                        isSubmitted
                          ? isCorrect
                            ? styles.gapInputCorrect
                            : styles.gapInputIncorrect
                          : ""
                      }`}
                      value={userAns}
                      disabled={isSubmitted}
                      placeholder={isSubmitted ? "" : "..."}
                      onChange={(e) => handleTextChange(q.number, e.target.value)}
                    />
                    <span dangerouslySetInnerHTML={{ __html: q.text.split("_____")[1] }} />
                  </p>
                ) : (
                  <p className={styles.questionText} dangerouslySetInnerHTML={{ __html: q.text }} />
                )}
              </div>

              {/* Options (Multiple Choice) */}
              {hasOptions && (
                <div className={styles.optionsGrid}>
                  {(Object.keys(q.options) as string[]).map((optKey) => {
                    const optionText = q.options[optKey];
                    const isSelected = userAns === optKey;
                    const isCorrectAnswer = q.correctAnswer === optKey;

                    let cardClass = styles.optionCard;
                    if (isSubmitted) {
                      cardClass += ` ${styles.optionDisabled}`;
                      if (isCorrectAnswer) {
                        cardClass += ` ${styles.optionCorrect}`;
                      } else if (isSelected) {
                        cardClass += ` ${styles.optionIncorrect}`;
                      } else {
                        cardClass += ` ${styles.optionMuted}`;
                      }
                    } else if (isSelected) {
                      cardClass += ` ${styles.optionSelected}`;
                    }

                    return (
                      <div
                        key={optKey}
                        className={cardClass}
                        onClick={() => handleOptionClick(q.number, optKey)}
                      >
                        <div className={styles.optionInner}>
                          <div className={styles.optionLetter}>{optKey}</div>
                          <span className={styles.optionText} dangerouslySetInnerHTML={{ __html: optionText }} />
                        </div>
                        {isSubmitted && isCorrectAnswer && (
                          <CheckCircleOutlined style={{ color: "#10b981", fontSize: 16 }} />
                        )}
                        {isSubmitted && isSelected && !isCorrectAnswer && (
                          <CloseCircleOutlined style={{ color: "#ef4444", fontSize: 16 }} />
                        )}
                        {!isSubmitted && isSelected && (
                          <CheckOutlined style={{ color: "#0071f9", fontSize: 14 }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Input Box below for Gap Filling without _____ placeholder */}
              {!hasOptions && !q.text.includes("_____") && (
                <div className={styles.gapInputContainer}>
                  <input
                    type="text"
                    className={`${styles.gapInput} ${
                      isSubmitted
                        ? isCorrect
                          ? styles.gapInputCorrect
                          : styles.gapInputIncorrect
                        : ""
                    }`}
                    value={userAns}
                    disabled={isSubmitted}
                    placeholder={isSubmitted ? "" : "Nhập câu trả lời..."}
                    onChange={(e) => handleTextChange(q.number, e.target.value)}
                  />
                </div>
              )}

              {/* Feedback feedback label below Gap Filling */}
              {isSubmitted && !hasOptions && (
                <div className={styles.feedbackLabel}>
                  {isCorrect ? (
                    <span className={styles.feedbackCorrect}>
                      <CheckCircleOutlined /> Trả lời chính xác!
                    </span>
                  ) : (
                    <span className={styles.feedbackIncorrect}>
                      <CloseCircleOutlined /> Đáp án đúng: <strong>{q.correctAnswer}</strong>
                    </span>
                  )}
                </div>
              )}

              {/* Explanation Accordion */}
              {isSubmitted && q.explanation && (
                <div className={styles.explanationBox}>
                  <div
                    className={styles.explanationHeader}
                    onClick={() => toggleExplanation(q.number)}
                  >
                    <span className={styles.explanationTitle}>
                      <InfoCircleOutlined />
                      Xem giải thích chi tiết
                    </span>
                    {expandedExplanations[q.number] ? <CaretUpOutlined /> : <CaretDownOutlined />}
                  </div>
                  {expandedExplanations[q.number] && (
                    <div className={styles.explanationContent}>
                      <p style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: q.explanation }} />
                      <p className={styles.correctAnswerText}>⇒ Đáp án đúng: {q.correctAnswer}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className={styles.actionsRow}>
        {isSubmitted ? (
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleRetake}>
            <UndoOutlined /> Làm lại bài
          </button>
        ) : (
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={checkSubmit}
            disabled={answeredCount === 0}
          >
            Nộp bài làm
          </button>
        )}
      </div>
    </div>
  );
});

LessonPractice.displayName = "LessonPractice";

export default LessonPractice;
