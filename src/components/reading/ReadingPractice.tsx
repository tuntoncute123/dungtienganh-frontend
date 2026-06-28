"use client";

import React, { useState, useEffect, useRef } from "react";
import { Select, Modal, Input, App, Segmented } from "antd";
import { ClockCircleOutlined, BookOutlined, QuestionCircleOutlined, ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons";
import styles from "./reading.module.css";
import Link from "next/link";

interface Answers14To18 {
  14?: string;
  15?: string;
  16?: string;
  17?: string;
  18?: string;
}

interface Answers19To23 {
  19?: string;
  20?: string;
  21?: string;
  22?: string;
  23?: string;
}

interface Answers24To26 {
  24?: string;
  25?: string;
  26?: string;
}

export default function ReadingPractice() {
  const { message } = App.useApp();
  // States for answers
  const [answers14To18, setAnswers14To18] = useState<Answers14To18>({});
  const [answers19To23, setAnswers19To23] = useState<Answers19To23>({});
  const [answers24To26, setAnswers24To26] = useState<Answers24To26>({});

  // Active tab on mobile: "passage" or "questions"
  const [mobileActiveTab, setMobileActiveTab] = useState<string>("passage");

  // Timer state
  const [seconds, setSeconds] = useState<number>(19); // Start at 19 seconds like the mockup
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Tools panel active state
  const [activeTool, setActiveTool] = useState<string | null>("Highlight");

  // Submission modal state
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Split pane dragging states
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState<number>(48); // default to 48%
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isDesktopState, setIsDesktopState] = useState<boolean>(true);

  useEffect(() => {
    const checkResize = () => {
      setIsDesktopState(window.innerWidth >= 992);
    };
    checkResize();
    window.addEventListener("resize", checkResize);
    return () => window.removeEventListener("resize", checkResize);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newLeftWidthPx = e.clientX - rect.left;
    const newPercentage = (newLeftWidthPx / rect.width) * 100;
    
    // Constrain percentage between 25% and 75%
    if (newPercentage >= 25 && newPercentage <= 75) {
      setLeftWidth(newPercentage);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore
    }
  };

  // Timer count up logic
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format seconds to HH:MM:SS or MM:SS
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (num: number) => String(num).padStart(2, "0");
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  // Check if a question is answered
  const isQuestionAnswered = (qNum: number): boolean => {
    if (qNum >= 14 && qNum <= 18) {
      return !!answers14To18[qNum as keyof Answers14To18];
    }
    if (qNum >= 19 && qNum <= 23) {
      return !!answers19To23[qNum as keyof Answers19To23];
    }
    if (qNum >= 24 && qNum <= 26) {
      const val = answers24To26[qNum as keyof Answers24To26];
      return !!(val && val.trim());
    }
    return false;
  };

  // Check how many questions are answered out of 13 (Q14-Q26)
  const answeredCount = Array.from({ length: 13 }, (_, i) => 14 + i).filter(isQuestionAnswered).length;

  const handleRadioChange = (qNum: number, pLetter: string) => {
    setAnswers14To18((prev) => ({
      ...prev,
      [qNum]: pLetter,
    }));
  };

  const handleSelectChange = (qNum: number, value: string) => {
    setAnswers19To23((prev) => ({
      ...prev,
      [qNum]: value,
    }));
  };

  const handleTextInputChange = (qNum: number, value: string) => {
    setAnswers24To26((prev) => ({
      ...prev,
      [qNum]: value,
    }));
  };

  const handleToolClick = (toolName: string) => {
    setActiveTool(toolName === activeTool ? null : toolName);
    message.info(`Đã chọn công cụ: ${toolName}. Nhấn phím tắt tương ứng hoặc thao tác trên văn bản.`);
  };

  const handleFinish = () => {
    setShowSubmitModal(true);
  };

  const submitAnswers = () => {
    setIsSubmitted(true);
    setShowSubmitModal(false);
    message.success("Nộp bài thi thành công!");
  };

  // Keyboard shortcut listener for tools (H, N, T)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputActive = activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA");
      if (isInputActive) return; // Ignore if user is typing

      const key = e.key.toLowerCase();
      if (key === "h") {
        setActiveTool("Highlight");
        message.info("Đã chọn công cụ: Highlight (Phím H)");
      } else if (key === "n") {
        setActiveTool("Notes");
        message.info("Đã chọn công cụ: Notes (Phím N)");
      } else if (key === "t") {
        setActiveTool("Tra từ vựng");
        message.info("Đã chọn công cụ: Tra từ vựng (Phím T)");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Correct answers for validation/grading
  const correctAnswers = {
    14: "G",
    15: "E",
    16: "B",
    17: "B",
    18: "C",
    19: "C",
    20: "E",
    21: "B",
    22: "D",
    23: "B",
    24: "mound", // or mounds
    25: "chimneys", // or tunnels
    26: "cement", // or concrete
  };

  return (
    <div className={styles.container}>
      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <Link href="/practice">
            <button className={styles.backBtn}>
              <ArrowLeftOutlined style={{ fontSize: 14 }} />
            </button>
          </Link>
        </div>

        <div className={styles.timer}>
          <ClockCircleOutlined />
          <span>{formatTime(seconds)}</span>
        </div>

        <div className={styles.topBarRight}>
          <button className={styles.actionBtn} onClick={() => message.info("Tính năng xem ghi chú đang được chuẩn bị.")}>
            <span>Xem note</span>
          </button>
          <button className={styles.actionBtn} onClick={() => message.info("Cài đặt giao diện và cỡ chữ.")}>
            <SettingOutlined />
            <span>Cài đặt</span>
          </button>
        </div>
      </div>

      {/* ── Mobile Tab Switcher ── */}
      <div className={styles.mobileTabs}>
        <Segmented
          block
          options={[
            { label: "Bài đọc (Passage)", value: "passage", icon: <BookOutlined /> },
            { label: "Câu hỏi (Questions)", value: "questions", icon: <QuestionCircleOutlined /> },
          ]}
          value={mobileActiveTab}
          onChange={(val) => setMobileActiveTab(val as string)}
          style={{ width: "100%", background: "#fff" }}
        />
      </div>

      {/* ── Main View Area ── */}
      <div className={styles.mainView} ref={containerRef}>
        {/* Left Pane: Passage */}
        <div
          className={`${styles.passagePane} ${
            mobileActiveTab === "passage" ? styles.passagePaneActive : ""
          }`}
          style={isDesktopState ? { flex: `0 0 ${leftWidth}%`, width: `${leftWidth}%` } : undefined}
        >
          {/* Floating Tools panel on desktop */}
          <div className={styles.toolsPanel}>
            <div
              className={`${styles.toolBox} ${activeTool === "Highlight" ? styles.toolBoxActive : ""}`}
              onClick={() => handleToolClick("Highlight")}
            >
              <img
                src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd7b4cb2bac19aaa8b1ca161cedf94768bcb0e06e.svg?generation=1782484028479505&alt=media"
                alt="Highlight"
                className={styles.toolIcon}
              />
              <span className={styles.toolLabel}>Highlight</span>
              <span className={styles.toolKey}>Phím ( H )</span>
            </div>
            <div
              className={`${styles.toolBox} ${activeTool === "Notes" ? styles.toolBoxActive : ""}`}
              onClick={() => handleToolClick("Notes")}
            >
              <img
                src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F3b28b280d312ff66a03940dac4df16a2144cd34b.svg?generation=1782484028495018&alt=media"
                alt="Notes"
                className={styles.toolIcon}
              />
              <span className={styles.toolLabel}>Notes</span>
              <span className={styles.toolKey}>Phím ( N )</span>
            </div>
            <div
              className={`${styles.toolBox} ${activeTool === "Tra từ vựng" ? styles.toolBoxActive : ""}`}
              onClick={() => handleToolClick("Tra từ vựng")}
            >
              <img
                src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F5c6c60f40ac11d234a02b045cb7ac2fc105abd63.svg?generation=1782484028496536&alt=media"
                alt="Dictionary"
                className={styles.toolIcon}
              />
              <span className={styles.toolLabel}>Tra từ vựng</span>
              <span className={styles.toolKey}>Phím ( T )</span>
            </div>
          </div>

          <div className={styles.passageContent}>
            <h1 className={styles.passageTitle}>Biomimicry</h1>

            <p className={styles.paragraph}>
              <span className={styles.paragraphLetter}>A.</span> Velcro, now commonly used instead of buttons and zippers, is probably the most famous example of ‘biomimicry’, where technologists turn to nature for inspiration. In 1948, scientist Georges de Mestral was walking through long grass when he noticed that dozens of seeds had attached themselves to his trousers. Under a microscope, de Mestral noted the hook-and-loop system the seed cases used to stick so firmly, and was inspired.
            </p>

            <p className={styles.paragraph}>
              <span className={styles.paragraphLetter}>B.</span> US biologist Janine Benyus wrote a book on the subject called Biomimicry: Innovation Inspired by Nature. Published in 1997, the book set off the current wave of technology modelled on nature. According to Benyus, our ancestors were practised in the art of biomimicry. ‘I think it’s an old impulse for humans to take their cues from other organisms,’ she says, referring to African tribes that found edible plants by observing the dining habits of chimpanzees. But lately we’ve become more focused on what we can make ourselves. Benyus thinks our drift away from nature started with the advent of agriculture: ‘When we broke free from the challenges of hunting and gathering and learnt to stock our cupboards, we fooled ourselves into believing that we didn’t need other organisms at all,’ she says.
            </p>

            <p className={styles.paragraph}>
              <span className={styles.paragraphLetter}>C.</span> The scientific, industrial, petrochemical and genetic engineering revolutions have repeatedly reinforced the idea that we are liberated from biological constraints. In recent years, however, the illusion that we are independent of nature has been shattered by the spectre of global warming and the looming end to fossil fuel supplies. Since few of us would be willing to forgo the products and services we’ve grown accustomed to – food, water, shelter, the conveniences that modern technology brings – the challenge is to meet the complex demands of civilisation within the bounds of sustainability. ‘Nature has learnt to fly, live in the depths of the ocean and craft miracle materials,’ writes Benyus. ‘Living creatures have done everything we want to do, without guzzling fossil fuel or polluting the planet. What better models could there be?’
            </p>

            <p className={styles.paragraph}>
              <span className={styles.paragraphLetter}>D.</span> There are no better models, according to Tim Finnigan, a marine engineer at the University of Sydney. In his quest to harness the world’s waves and tides for renewable energy more efficiently, Finnigan has taken his cues from aquatic life. With their streamlined bodies and stiff, high tail fins, sharks convert up to 90 per cent of their body energy into forward thrust. Inspired by such efficient hydrodynamics, but turning the theory on its head, Finnigan designed his tidal stream generator: an 18-metre-long biomimetic shark tail with a fin spanning 15 metres. ‘Rather than have a body moving through a stationary fluid, we have fluid that’s moving past a stationary body,’ says Finnigan.
            </p>

            <p className={styles.paragraph}>
              <span className={styles.paragraphLetter}>E.</span> Then there’s Finnigan’s biomimetic forest of giant seaweed. ‘As a diver I’ve looked at the way motions occur under water in the presence of waves,’ he says. ‘I see plants that move quite dramatically and yet they never seem to be pulled out, even in the most dramatic waves.’ The trouble with conventional designs, according to Finnigan, is that they’re made to stand rigidly against the power of the ocean. ‘The structures we try to build in the ocean just never end up being strong enough to survive out there,’ says Finnigan. In the manner of aquatic plants and animals, Finnigan’s designs respond to changing current or wave conditions by reorienting to maximise energy capture. And in severe weather, to avoid a battering, his wave energy generator will lie flat against the ocean floor.
            </p>

            <p className={styles.paragraph}>
              <span className={styles.paragraphLetter}>F.</span> While conventional architects were designing buildings dependent on expensive air conditioning systems, when Mick Pearce tried to do the same, he struck a problem. ‘We were building office blocks for a client in Zimbabwe and we ran out of funds. So we looked for ways to make a building without traditional air conditioning.’ One day, driving through the grasslands, he saw a large mound created by termites, the ant-like insect common in Africa. He noticed that air entering at the base of the mound was mixed with water drawn from subterranean levels by the termites, causing evaporative cooling. Pearce wanted to reproduce this principle but he needed an alternative system, and in his building massive fans were employed at the base of the structure to lower the temperature of the circulating air. Pearce’s termite-inspired cooling system cut energy use to 10 per cent of a similar air-conditioned building.
            </p>

            <p className={styles.paragraph}>
              <span className={styles.paragraphLetter}>G.</span> Photosynthesis is the process by which green plants use energy from the sun to convert water and carbon dioxide into carbohydrates and oxygen. Plants can manage it with humbling ease. But, as the 40 researchers from 11 institutes who have collaborated to form the Australian Artificial Photosynthesis Network have realised, it is very complex. However, there is one aspect working in our favour. In nature, environmental variables like temperature, carbon dioxide and light availability limit the rate of photosynthesis. In a laboratory these variables can be optimized. ‘We don’t have to cope with drought or frost. We can work with a highly controlled, specified set of conditions,’ says Tom Collings, the group’s spokesman.
            </p>
          </div>
        </div>

        {/* Separator handle for desktop */}
        <div 
          className={styles.divider}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={isDragging ? { backgroundColor: "#ebd7c3" } : undefined}
        >
          <div className={styles.dividerHandle}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ width: 2, height: 2, borderRadius: "50%", backgroundColor: "#8a8a8e" }} />
              <div style={{ width: 2, height: 2, borderRadius: "50%", backgroundColor: "#8a8a8e" }} />
              <div style={{ width: 2, height: 2, borderRadius: "50%", backgroundColor: "#8a8a8e" }} />
            </div>
          </div>
        </div>

        {/* Right Pane: Questions */}
        <div
          className={`${styles.questionsPane} ${
            mobileActiveTab === "questions" ? styles.questionsPaneActive : ""
          }`}
          style={isDesktopState ? { flex: `0 0 ${100 - leftWidth}%`, width: `${100 - leftWidth}%` } : undefined}
        >
          {/* Question Group 14-18 */}
          <div className={styles.sectionHeader}>Questions 14-18</div>
          <div className={styles.questionInstructions}>
            Reading Passage 2 has seven paragraphs, <strong className={styles.boldText}>A–G</strong>.
            <br />
            Which paragraph contains the following information?
            <br />
            <strong className={styles.boldText}>NB</strong> You may use any letter more than once.
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.questionTable}>
              <thead>
                <tr>
                  <th>Yêu cầu / Câu hỏi</th>
                  <th>A</th>
                  <th>B</th>
                  <th>C</th>
                  <th>D</th>
                  <th>E</th>
                  <th>F</th>
                  <th>G</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 14, text: "a reference to a natural process that appears simpler than it actually is" },
                  { id: 15, text: "a description of an invention that can protect itself under extreme conditions" },
                  { id: 16, text: "the reasons why humans no longer feel they are free from nature" },
                  { id: 17, text: "a reference to an animal that influenced the diet of some humans" },
                  { id: 18, text: "specific reasons why science should copy nature" },
                ].map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.questionTextCell}>
                        <span className={styles.questionNumberBadge}>{item.id}</span>
                        <p className={styles.questionText}>{item.text}</p>
                      </div>
                    </td>
                    {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                      <td
                        key={letter}
                        className={styles.radioCell}
                        onClick={() => handleRadioChange(item.id, letter)}
                      >
                        <div className={styles.radioWrapper}>
                          <input
                            type="radio"
                            name={`q-${item.id}`}
                            checked={answers14To18[item.id as keyof Answers14To18] === letter}
                            onChange={() => {}}
                          />
                          <span className={styles.customRadio} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Question Group 19-23 */}
          <div className={styles.sectionHeader}>Questions 19-23</div>
          <div className={styles.questionInstructions}>
            Look at the following statements (Questions 19-23) and the list of researchers below.
            Match each statement with the correct researcher, <strong className={styles.boldText}>A–E</strong>.
            <br />
            <strong className={styles.boldText}>NB</strong> You may use any letter more than once.
          </div>

          <div className={styles.statementsContainer}>
            {[
              { id: 19, text: "Designs often fail when they try to resist natural forces." },
              { id: 20, text: "Science has certain key advantages over nature." },
              { id: 21, text: "People have been copying nature for thousands of years." },
              { id: 22, text: "A shortage of money can inspire innovative design." },
              {
                id: 23,
                text: "The discovery that humans could produce food themselves caused them to turn away from nature.",
              },
            ].map((item) => (
              <div key={item.id} className={styles.statementRow}>
                <div className={styles.statementLeft}>
                  <span className={styles.questionNumberBadge}>{item.id}</span>
                  <Select
                    className={styles.statementSelect}
                    placeholder="--"
                    value={answers19To23[item.id as keyof Answers19To23] || undefined}
                    onChange={(val) => handleSelectChange(item.id, val)}
                    options={[
                      { value: "A", label: "A" },
                      { value: "B", label: "B" },
                      { value: "C", label: "C" },
                      { value: "D", label: "D" },
                      { value: "E", label: "E" },
                    ]}
                    size="small"
                  />
                </div>
                <p className={styles.statementText}>{item.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.researchersList}>
            <span className={styles.researcherBadge}>A. Georges de Mestral</span>
            <span className={styles.researcherBadge}>B. Janine Benyus</span>
            <span className={styles.researcherBadge}>C. Tim Finnigan</span>
            <span className={styles.researcherBadge}>D. Mick Pearce</span>
            <span className={styles.researcherBadge}>E. Tom Collings</span>
          </div>

          {/* Question Group 24-26 */}
          <div className={styles.sectionHeader}>Questions 24-26</div>
          <div className={styles.questionInstructions}>
            Complete the summary below. Choose <strong className={styles.boldText}>ONE WORD ONLY</strong> from the passage for each answer.
          </div>

          <div className={styles.summaryContainer}>
            <div className={styles.summaryTitle}>A building project in Zimbabwe</div>
            <p className={styles.summaryText}>
              Mick Pearce designed a cooling system radically different from those usually used by architects. The design of his office block can be compared to that of a termite's
              <span className={styles.inlineInputWrapper}>
                <span className={styles.inlineNumberBadge}>24</span>
                <input
                  type="text"
                  className={styles.inlineInput}
                  placeholder="..."
                  value={answers24To26[24] || ""}
                  onChange={(e) => handleTextInputChange(24, e.target.value)}
                />
              </span>
              . Termites use
              <span className={styles.inlineInputWrapper}>
                <span className={styles.inlineNumberBadge}>25</span>
                <input
                  type="text"
                  className={styles.inlineInput}
                  placeholder="..."
                  value={answers24To26[25] || ""}
                  onChange={(e) => handleTextInputChange(25, e.target.value)}
                />
              </span>
              to cool the air, but in Pearce's system this cooling effect was produced by
              <span className={styles.inlineInputWrapper}>
                <span className={styles.inlineNumberBadge}>26</span>
                <input
                  type="text"
                  className={styles.inlineInput}
                  placeholder="..."
                  value={answers24To26[26] || ""}
                  onChange={(e) => handleTextInputChange(26, e.target.value)}
                />
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom Action Bar ── */}
      <div className={styles.bottomBar}>
        <div className={styles.statusContainer}>
          <div className={styles.circleGroup}>
            {Array.from({ length: 13 }, (_, i) => 14 + i).map((qNum) => {
              const answered = isQuestionAnswered(qNum);
              return (
                <div
                  key={qNum}
                  className={`${styles.statusCircle} ${answered ? styles.statusCircleFilled : ""}`}
                  onClick={() => {
                    // Navigate to the respective question tab/view
                    setMobileActiveTab("questions");
                    message.info(`Đang chuyển tới Câu hỏi số ${qNum}`);
                  }}
                >
                  {qNum}
                </div>
              );
            })}
          </div>
        </div>

        <button
          className={`${styles.finishBtn} ${answeredCount === 0 ? styles.finishBtnDisabled : ""}`}
          disabled={answeredCount === 0}
          onClick={handleFinish}
        >
          Hoàn thành
        </button>
      </div>

      {/* ── Submit Modal ── */}
      <Modal
        title="Bạn muốn nộp bài làm?"
        open={showSubmitModal}
        onOk={submitAnswers}
        onCancel={() => setShowSubmitModal(false)}
        okText="Nộp bài"
        cancelText="Hủy"
        okButtonProps={{ style: { backgroundColor: "#13a62e", borderColor: "#13a62e" } }}
      >
        <p style={{ fontSize: 15, margin: "10px 0" }}>
          Bạn đã hoàn thành <strong>{answeredCount} / 13</strong> câu hỏi. Bạn có chắc chắn muốn nộp bài để xem kết quả?
        </p>
      </Modal>

      {/* ── Results Scoreboard ── */}
      {isSubmitted && (
        <Modal
          title="Kết quả bài làm của bạn"
          open={isSubmitted}
          onOk={() => setIsSubmitted(false)}
          okText="Xem lại"
          closable={false}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { backgroundColor: "#13a62e", borderColor: "#13a62e" } }}
        >
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 16, marginBottom: 12 }}>Số câu trả lời đúng của bạn:</div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "#13a62e",
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              {
                (() => {
                  let correct = 0;
                  // 14-18
                  Object.keys(answers14To18).forEach((key) => {
                    const k = Number(key) as keyof Answers14To18;
                    if (answers14To18[k] === correctAnswers[k]) correct++;
                  });
                  // 19-23
                  Object.keys(answers19To23).forEach((key) => {
                    const k = Number(key) as keyof Answers19To23;
                    if (answers19To23[k] === correctAnswers[k]) correct++;
                  });
                  // 24-26
                  Object.keys(answers24To26).forEach((key) => {
                    const k = Number(key) as keyof Answers24To26;
                    const val = (answers24To26[k] || "").trim().toLowerCase();
                    const correctVal = correctAnswers[k];
                    // handle mounds / tunnels / concrete alternatives
                    if (k === 24 && (val === "mound" || val === "mounds")) correct++;
                    else if (k === 25 && (val === "chimneys" || val === "tunnels" || val === "chimney")) correct++;
                    else if (k === 26 && (val === "cement" || val === "concrete")) correct++;
                  });
                  return correct;
                })()
              }{" "}
              / 13
            </div>
            <p style={{ color: "#8a8a8e", fontSize: 13 }}>
              Học tốt Tiếng Anh cùng TeacherDung. Chúc bạn đạt kết quả thật cao!
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
