"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal, App, Tooltip } from "antd";
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
import { EXPLANATIONS } from "./explanations";
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
}

const QUESTIONS_PART5: Question[] = [
  {
    number: 1,
    text: "The free clinic was founded by a group of doctors to give _____ for various medical conditions.",
    options: { A: "treatment", B: "treat", C: "treated", D: "treating" }
  },
  {
    number: 2,
    text: "The artist sent _____ best pieces to the gallery to be reviewed by the owner.",
    options: { A: "him", B: "himself", C: "his", D: "he" }
  },
  {
    number: 3,
    text: "The figures that accompany the financial statement should be _____ to the spending category.",
    options: { A: "relevance", B: "relevantly", C: "more relevantly", D: "relevant" }
  },
  {
    number: 4,
    text: "The majority of occupants _____ live in Regal Towers are upset about the ongoing problems with their air conditioning systems.",
    options: { A: "what", B: "where", C: "they", D: "who" }
  },
  {
    number: 5,
    text: "During the peak season, it is _____ to hire additional workers for the weekend shifts.",
    options: { A: "necessitate", B: "necessarily", C: "necessary", D: "necessity" }
  },
  {
    number: 6,
    text: "The company _____ lowered its prices to outsell its competitors and attract more customers.",
    options: { A: "strategy", B: "strategically", C: "strategies", D: "strategic" }
  },
  {
    number: 7,
    text: "For optimal safety on the road, avoid _____ the view of the rear window and side-view mirrors.",
    options: { A: "obstructs", B: "obstructed", C: "obstruction", D: "obstructing" }
  },
  {
    number: 8,
    text: "The sprinklers for the lawn’s irrigation system are _____ controlled.",
    options: { A: "mechanically", B: "mechanic", C: "mechanism", D: "mechanical" }
  },
  {
    number: 9,
    text: "The governmental department used to provide financial aid, but now it offers _____ services only.",
    options: { A: "legal", B: "legalize", C: "legally", D: "legalizes" }
  },
  {
    number: 10,
    text: "Mr. Ross, _____ is repainting the interior of the lobby, was recommended by a friend of the building manager.",
    options: { A: "himself", B: "he", C: "who", D: "which" }
  },
  {
    number: 11,
    text: "The upscale boutique Jane's Closet is known for selling the most stylish _____ for young professionals.",
    options: { A: "accessorized", B: "accessorize", C: "accessorizes", D: "accessories" }
  },
  {
    number: 12,
    text: "The April edition of Fishing and More magazine looks _____ different from previous issues because of the new art editor.",
    options: { A: "completed", B: "complete", C: "completely", D: "completing" }
  },
  {
    number: 13,
    text: "Due to the high volume of foot traffic, the shop must polish its floors more _____ than usual during the peak season.",
    options: { A: "frequent", B: "frequented", C: "frequency", D: "frequently" }
  },
  {
    number: 14,
    text: "Ms. Stevenson contacted the real estate agent _____ name and phone number appeared on the advertisement.",
    options: { A: "what", B: "which", C: "whose", D: "who" }
  },
  {
    number: 15,
    text: "Thanks to his experience, Mr. Warren is _____ capable of completing the job on his own.",
    options: { A: "certainly", B: "certain", C: "certainty", D: "certify" }
  },
  {
    number: 16,
    text: "The notice indicated that a first-aid training course will be provided free of charge to _____ next month.",
    options: { A: "residents", B: "residence", C: "residential", D: "resides" }
  },
  {
    number: 17,
    text: "The chef _____ prepares the entrée for a restaurant critic often comes out to greet him or her in person.",
    options: { A: "whose", B: "what", C: "either", D: "who" }
  },
  {
    number: 18,
    text: "As long as there are no further delays, the factory will be fully _____ by June 18",
    options: { A: "operational", B: "operate", C: "operates", D: "operation" }
  },
  {
    number: 19,
    text: "The restaurant has a _____ decorated room that is perfect for hosting children's parties.",
    options: { A: "cheerful", B: "cheerfully", C: "cheerfulness", D: "cheer" }
  },
  {
    number: 20,
    text: "Despite having some problems with the sound system during the performance, the concert was an _____ experience for everyone.",
    options: { A: "enjoyable", B: "enjoyment", C: "enjoys", D: "enjoyably" }
  }
];

const QUESTIONS_PART6: Question[] = [
  { number: 21, text: "Please submit your expense reports _____ the end of the month." },
  { number: 22, text: "The committee will _____ the proposal tomorrow morning." },
  { number: 23, text: "All visitors must _____ at the front desk upon arrival." },
  { number: 24, text: "The marketing department is planning a new _____ for the product." },
  { number: 25, text: "We are pleased to announce the _____ of our new branch office." },
  { number: 26, text: "Please confirm your _____ by replying to this email." },
  { number: 27, text: "The new software is designed to _____ productivity." },
  { number: 28, text: "We apologize for any _____ this delay may cause." },
  { number: 29, text: "Employees are encouraged to share their _____ during the meeting." },
  { number: 30, text: "The contract must be signed by both _____ to be valid." },
  { number: 31, text: "Mr. Smith is _____ for managing the sales team." },
  { number: 32, text: "We look forward to _____ you in the near future." }
];

const QUESTIONS_PART7: Question[] = [
  {
    number: 33,
    text: "The manager praised the team for _____ completing the project on time.",
    options: { A: "successful", B: "successfully", C: "success", D: "succeed" }
  },
  {
    number: 34,
    text: "Ms. Davis will present her research _____ the international conference.",
    options: { A: "at", B: "on", C: "of", D: "for" }
  },
  {
    number: 35,
    text: "The company plans to _____ its operations into European markets.",
    options: { A: "expand", B: "expansion", C: "expansive", D: "expanded" }
  },
  {
    number: 36,
    text: "All employees are required to attend the safety training _____.",
    options: { A: "seminar", B: "seminate", C: "seminally", D: "seminars" }
  },
  {
    number: 37,
    text: "The new policy will become _____ starting next Monday.",
    options: { A: "effect", B: "effective", C: "effectively", D: "effectiveness" }
  },
  {
    number: 38,
    text: "Please double-check the figures before _____ the report.",
    options: { A: "submit", B: "submitted", C: "submitting", D: "submission" }
  },
  {
    number: 39,
    text: "The customer service team is committed to resolving issues _____.",
    options: { A: "prompt", B: "promptly", C: "promptness", D: "prompter" }
  },
  {
    number: 40,
    text: "Due to bad weather, the outdoor concert has been _____.",
    options: { A: "cancel", B: "canceled", C: "cancelling", D: "cancellation" }
  },
  {
    number: 41,
    text: "The brochure provides _____ information about our services.",
    options: { A: "detail", B: "detailed", C: "detailing", D: "details" }
  },
  {
    number: 42,
    text: "Ms. Carter was selected for the position because of her _____ experience.",
    options: { A: "extensive", B: "extension", C: "extensively", D: "extend" }
  },
  {
    number: 43,
    text: "We need to hire an assistant who is _____ in both English and Spanish.",
    options: { A: "fluent", B: "fluently", C: "fluency", D: "fluents" }
  },
  {
    number: 44,
    text: "The budget proposal must be approved by the board of _____.",
    options: { A: "directors", B: "direct", C: "direction", D: "directly" }
  },
  {
    number: 45,
    text: "The construction of the new office building is ahead of _____.",
    options: { A: "schedule", B: "scheduled", C: "scheduling", D: "schedules" }
  },
  {
    number: 46,
    text: "Customers can request a refund if they are not _____ with the product.",
    options: { A: "satisfy", B: "satisfied", C: "satisfying", D: "satisfaction" }
  },
  {
    number: 47,
    text: "The guest speaker gave an _____ talk on leadership.",
    options: { A: "inspire", B: "inspiring", C: "inspiration", D: "inspired" }
  },
  {
    number: 48,
    text: "We must find a way to reduce our _____ costs.",
    options: { A: "operate", B: "operating", C: "operation", D: "operational" }
  },
  {
    number: 49,
    text: "The new product has received very _____ reviews from customers.",
    options: { A: "positive", B: "positively", C: "positiveness", D: "positivity" }
  },
  {
    number: 50,
    text: "Please let us know if you need any _____ assistance.",
    options: { A: "addition", B: "additional", C: "additionally", D: "additions" }
  },
  {
    number: 51,
    text: "The office will be closed on Friday in _____ of the national holiday.",
    options: { A: "observe", B: "observance", C: "observant", D: "observes" }
  }
];

const CORRECT_ANSWERS: Record<number, string | string[]> = {
  // Part 5
  1: "A",
  2: "C",
  3: "D",
  4: "D",
  5: "C",
  6: "B",
  7: "D",
  8: "A",
  9: "A",
  10: "C",
  11: "D",
  12: "C",
  13: "D",
  14: "C",
  15: "A",
  16: "A",
  17: "D",
  18: "A",
  19: "B",
  20: "A",
  // Part 6
  21: ["by", "before"],
  22: ["review", "discuss", "evaluate", "consider", "approve"],
  23: ["register", "sign in", "report"],
  24: ["campaign", "strategy", "launch", "plan"],
  25: ["opening", "launch", "expansion", "establishment"],
  26: ["attendance", "registration", "reservation", "participation", "booking"],
  27: ["increase", "improve", "boost", "enhance", "raise"],
  28: ["inconvenience", "trouble", "difficulty", "disruption"],
  29: ["feedback", "ideas", "opinions", "thoughts", "suggestions"],
  30: ["parties", "sides", "signatories"],
  31: ["responsible", "accountable", "eligible"],
  32: ["seeing", "meeting", "serving", "welcoming", "helping", "working with"],
  // Part 7
  33: "B",
  34: "A",
  35: "A",
  36: "A",
  37: "B",
  38: "C",
  39: "B",
  40: "B",
  41: "B",
  42: "A",
  43: "A",
  44: "A",
  45: "A",
  46: "B",
  47: "B",
  48: "B",
  49: "A",
  50: "B",
  51: "B"
};

export default function ProgressTest() {
  const { message } = App.useApp();
  const router = useRouter();
  const [currentPart, setCurrentPart] = useState<5 | 6 | 7>(5);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [resultVisible, setResultVisible] = useState<boolean>(false);
  const [confirmSubmitVisible, setConfirmSubmitVisible] = useState<boolean>(false);
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});
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

  // Load draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("progress_test_draft_v2");
      if (saved) {
        setAnswers(JSON.parse(saved));
        message.info("Đã khôi phục bài làm nháp gần nhất!");
      }
    } catch (e) {
      console.error("Failed to load draft", e);
    }
  }, []);

  const getPart5AnsweredCount = () => {
    let count = 0;
    for (let i = 1; i <= 20; i++) {
      if (answers[i] && answers[i].trim() !== "") count++;
    }
    return count;
  };

  const getPart6AnsweredCount = () => {
    let count = 0;
    for (let i = 21; i <= 32; i++) {
      if (answers[i] && answers[i].trim() !== "") count++;
    }
    return count;
  };

  const getPart7AnsweredCount = () => {
    let count = 0;
    for (let i = 33; i <= 51; i++) {
      if (answers[i] && answers[i].trim() !== "") count++;
    }
    return count;
  };

  const answeredPart5 = getPart5AnsweredCount();
  const answeredPart6 = getPart6AnsweredCount();
  const answeredPart7 = getPart7AnsweredCount();

  const totalQuestions = 51;
  const totalAnsweredCount = answeredPart5 + answeredPart6 + answeredPart7;
  const progressPercent = (totalAnsweredCount / totalQuestions) * 100;

  // Locking rules
  const isPart5Unlocked = true;
  const isPart6Unlocked = isSubmitted || (answeredPart5 === 20);
  const isPart7Unlocked = isSubmitted || (isPart6Unlocked && answeredPart6 === 12);

  const handlePartClick = (partNum: 5 | 6 | 7) => {
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

    if (qNumber >= 1 && qNumber <= 20) {
      return userAns === CORRECT_ANSWERS[qNumber];
    } else if (qNumber >= 21 && qNumber <= 32) {
      const acceptable = CORRECT_ANSWERS[qNumber] as string[];
      return acceptable.includes(userAns.trim().toLowerCase());
    } else {
      return userAns === CORRECT_ANSWERS[qNumber];
    }
  };

  const doSubmit = () => {
    let correct = 0;
    for (let i = 1; i <= totalQuestions; i++) {
      if (isQuestionCorrect(i)) {
        correct++;
      }
    }

    const incorrect = totalAnsweredCount - correct;
    const unanswered = totalQuestions - totalAnsweredCount;
    const scoreVal = Math.round((correct / totalQuestions) * 100);

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
    const explanation = EXPLANATIONS[qNum];
    if (!isSubmitted || !explanation) return null;

    const isExpanded = expandedExplanations[qNum] !== false; // default is true
    const correctOpt = CORRECT_ANSWERS[qNum];

    return (
      <div 
        className={styles.explanationBox} 
        onClick={() => toggleExplanation(qNum)}
      >
        <div className={styles.explanationHeader}>
          <div className={styles.explanationHeaderLeft}>
            <span className={styles.explanationTitle}>
              <InfoCircleOutlined className={styles.infoIcon} style={{ marginRight: 8 }} />
              Giải thích đáp án
            </span>
          </div>
          <div className={styles.explanationHeaderRight}>
            {isExpanded ? <CaretUpOutlined className={styles.caretIcon} /> : <CaretDownOutlined className={styles.caretIcon} />}
          </div>
        </div>

        {isExpanded && (
          <div onClick={(e) => e.stopPropagation()}>
            <div className={styles.explanationDivider} />
            <div className={styles.explanationContent}>
              <div className={styles.stepsSection}>
                <p className={styles.stepsTitle}><strong>Trình tự làm bài</strong></p>
                <ul style={{ margin: "8px 0", paddingLeft: "20px", listStyleType: "disc" }}>
                  {explanation.steps.map((step, idx) => (
                    <li key={idx} style={{ marginBottom: "6px" }}>{step}</li>
                  ))}
                </ul>
                {explanation.note && (
                  <p className={styles.noteText} style={{ margin: "12px 0", fontStyle: "italic", color: "#4b5563" }}>
                    {explanation.note}
                  </p>
                )}
                <p className={styles.finalAnswerText} style={{ margin: "12px 0 0 0", color: "#cc4125", fontWeight: "bold" }}>
                  ⇒ {explanation.correctAnswerText}
                </p>
              </div>

              <figure className={styles.tableFigure}>
                <table className={styles.explanationTable}>
                  <tbody>
                    <tr>
                      <td colSpan={2} className={styles.tableTopHeader}>
                        <strong>Trình tự làm bài &amp; Dịch nghĩa</strong>
                      </td>
                    </tr>
                    <tr>
                      {/* Left Column - English */}
                      <td className={styles.tableLeftCol}>
                        <p style={{ fontWeight: 600, marginBottom: "8px" }}>{explanation.engSentence}</p>
                        {explanation.engOptions && Object.entries(explanation.engOptions).map(([key, val]) => {
                          const isCorrect = key === correctOpt;
                          return (
                            <p 
                              key={key} 
                              style={
                                isCorrect 
                                  ? { backgroundColor: "#ffd966", color: "#000000", fontWeight: "bold", padding: "2px 6px", borderRadius: "4px", margin: "4px 0" } 
                                  : { margin: "4px 0", color: "#374151" }
                              }
                            >
                              ({key}) {val}
                            </p>
                          );
                        })}
                      </td>

                      {/* Right Column - Vietnamese */}
                      <td className={styles.tableRightCol}>
                        <p style={{ fontWeight: 600, marginBottom: "8px" }}>{explanation.vietSentence}</p>
                        {explanation.vietOptions && Object.entries(explanation.vietOptions).map(([key, val]) => {
                          const isCorrect = key === correctOpt;
                          return (
                            <p 
                              key={key} 
                              style={
                                isCorrect 
                                  ? { backgroundColor: "#ffd966", color: "#000000", fontWeight: "bold", padding: "2px 6px", borderRadius: "4px", margin: "4px 0" } 
                                  : { margin: "4px 0", color: "#374151" }
                              }
                            >
                              ({key}) {val}
                            </p>
                          );
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </figure>
            </div>
          </div>
        )}
      </div>
    );
  };

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
  const currentQuestions =
    currentPart === 5
      ? QUESTIONS_PART5
      : currentPart === 6
      ? QUESTIONS_PART6
      : QUESTIONS_PART7;

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
              src="/logo.png"
              className={styles.logo}
            />
          </div>
        </div>

        <div className={styles.headerCenter}>
          <h3 className={styles.headerTitle}>[Reading] Progress test</h3>
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
          {/* Part 5 Info */}
          {currentPart === 5 && (
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
          {currentPart === 6 && (
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
          {currentPart === 7 && (
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
            {currentPart === 5 && <span>Questions 1 - 20</span>}
            {currentPart === 6 && <span>Questions 21 - 32</span>}
            {currentPart === 7 && <span>Questions 33 - 51</span>}
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
                const correctList = CORRECT_ANSWERS[q.number] as string[];
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
                        {beforeBlank}
                        <input
                          type="text"
                          className={inputClass}
                          value={userAns}
                          placeholder={isSubmitted ? "" : "..."}
                          onChange={(e) => handleTextChange(q.number, e.target.value)}
                          disabled={isSubmitted}
                        />
                        {afterBlank}
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
              const correctOpt = CORRECT_ANSWERS[q.number] as string;

              return (
                <div
                  key={q.number}
                  id={`question-item-${q.number}`}
                  className={styles.questionItem}
                >
                  <div className={styles.questionTextContainer}>
                    <div className={styles.questionNumberBadge}>{q.number}</div>
                    <div className={styles.questionText}>{q.text}</div>
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
                            <p className={styles.optionText} style={inlineTextStyle}>
                              {optionText}
                            </p>

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
          <button 
            className={`${styles.chevronBtn} ${currentPart > 5 ? styles.chevronBtnActive : ""}`}
            onClick={handlePrevPart}
            disabled={currentPart === 5}
          >
            <LeftOutlined />
          </button>

          <div className={styles.paginationTrack}>
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
          </div>

          <button 
            className={`${styles.chevronBtn} ${currentPart < 7 ? styles.chevronBtnActive : ""}`}
            onClick={handleNextPart}
            disabled={currentPart === 7}
          >
            <RightOutlined />
          </button>
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
