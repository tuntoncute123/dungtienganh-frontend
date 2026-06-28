"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Grid, Drawer } from "antd";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";

const { Content } = Layout;
const { useBreakpoint } = Grid;

/* ── Practice Test Data Interface ────────────────── */

interface PracticeTest {
  id: string;
  title: string;
  skill: string;
  timeLimit: string;
  questionsCount: number;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  thumbnail: string;
  isHot: boolean;
  hotIcon?: string;
  category: "all" | "ielts" | "toeic" | "thpt";
  href: string;
  disabled?: boolean;
}

const PRACTICE_TESTS_DATA: PracticeTest[] = [
  {
    id: "ielts-reading-biomimicry",
    title: "IELTS Academic Reading: Biomimicry (Passage 2)",
    skill: "Reading",
    timeLimit: "20 phút",
    questionsCount: 13,
    difficulty: "Trung bình",
    thumbnail: "/assets/1782387428-1-khoa-he_21a6149e.jpg",
    isHot: true,
    hotIcon: "/assets/hotB9F-tCZm_3b836ae8.png",
    category: "ielts",
    href: "#",
    disabled: true,
  },
  {
    id: "ielts-listening-test-1",
    title: "IELTS Listening Academic Mock Test - Test 1",
    skill: "Listening",
    timeLimit: "30 phút",
    questionsCount: 40,
    difficulty: "Trung bình",
    thumbnail: "/assets/1782388127-1_f3a86a69.jpg",
    isHot: false,
    category: "ielts",
    href: "#",
    disabled: true,
  },
  {
    id: "toeic-reading-part-5",
    title: "Luyện đề thi TOEIC Reading: Part 5 & Part 6 (Chuyên đề 01)",
    skill: "Reading",
    timeLimit: "45 phút",
    questionsCount: 46,
    difficulty: "Khó",
    thumbnail: "/assets/1782388373-2_9d3976ca.png",
    isHot: true,
    hotIcon: "/assets/hotB9F-tCZm_3b836ae8.png",
    category: "toeic",
    href: "/progress-test",
    disabled: false,
  },
  {
    id: "thpt-tieng-anh-2026",
    title: "Đề thi thử Tốt nghiệp THPT Quốc gia 2026 - Môn Tiếng Anh (Đề số 1)",
    skill: "Tổng hợp",
    timeLimit: "60 phút",
    questionsCount: 50,
    difficulty: "Khó",
    thumbnail: "/assets/1775702977-94-thuml-_08f07fd3.jpg",
    isHot: false,
    category: "thpt",
    href: "#",
    disabled: true,
  },
];

const CATEGORIES = [
  { key: "all", label: "Tất cả" },
  { key: "ielts", label: "IELTS" },
  { key: "toeic", label: "TOEIC" },
  { key: "thpt", label: "THPT Quốc gia" },
];

/* ── Main Component ────────────────────────── */

export default function PracticePage() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const screens = useBreakpoint();
  const isDesktop = !!screens.lg;

  const handleMenuClick = () => {
    if (isDesktop) {
      setSidebarPinned((prev) => !prev);
    } else {
      setDrawerOpen(true);
    }
  };

  // Filter logic
  const filteredTests = PRACTICE_TESTS_DATA.filter((test) => {
    const matchesTab = activeTab === "all" || test.category === activeTab;
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.skill.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <Layout className="app-layout">
      {/* Fixed Header */}
      <AppHeader onMenuClick={handleMenuClick} />

      {/* Hover trigger strip — desktop only */}
      {isDesktop && <div className="sider-hover-trigger" />}

      {/* Desktop Sidebar */}
      {isDesktop && (
        <div
          className={`app-sider${sidebarPinned ? " sider-pinned" : ""}`}
          style={{ width: 240 }}
        >
          <AppSidebar activeKey="practice" />
        </div>
      )}

      {/* Mobile/Tablet Drawer Sidebar */}
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="default"
        styles={{ body: { padding: 0 } }}
        style={{ top: 64 }}
        title={null}
        closable={false}
      >
        <AppSidebar activeKey="practice" />
      </Drawer>

      {/* Main Content */}
      <Content className="app-content">
        <div className="main-scroll">
          <div className="list-category">
            <div className="container">
              <div className="list-test">
                <div className="list-test__container">
                  {/* Header Area: Tabs & Search Bar */}
                  <div className="list-test__header">
                    <div className="list-test__header-title">
                      <nav className="tabs-navigation">
                        {CATEGORIES.map((cat) => (
                          <span
                            key={cat.key}
                            className={`tab-item${activeTab === cat.key ? " active" : ""}`}
                            onClick={() => setActiveTab(cat.key)}
                          >
                            {cat.label}
                          </span>
                        ))}
                      </nav>
                    </div>

                    <div className="list-test__header-search">
                      <div className="el-input el-input--large el-input--prefix input-search">
                        <div className="el-input__wrapper">
                          <span className="el-input__prefix">
                            <span className="el-input__prefix-inner">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1024 1024"
                                width="20"
                                height="20"
                                fill="currentColor"
                                style={{ color: "#a8abb2" }}
                              >
                                <path d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704" />
                              </svg>
                            </span>
                          </span>
                          <input
                            className="el-input__inner"
                            type="text"
                            placeholder="Tìm kiếm đề luyện tập ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Practice Cards Content Area */}
                  <div className="list-test__content">
                    {filteredTests.length > 0 ? (
                      <div className="list-category__course">
                        {filteredTests.map((test) => {
                          const isHovered = hoveredCardId === test.id;
                          return (
                            <a
                              key={test.id}
                              href={test.href}
                              className="card-course"
                              style={test.disabled ? { cursor: "not-allowed" } : undefined}
                              onMouseEnter={() => setHoveredCardId(test.id)}
                              onMouseLeave={() => setHoveredCardId(null)}
                              onClick={(e) => {
                                if (test.disabled) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              {/* Hot Tag badge */}
                              {test.isHot && test.hotIcon && (
                                <img
                                  className="icon-hot"
                                  src={test.hotIcon}
                                  alt="Hot"
                                />
                              )}

                              {/* Thumbnail Area */}
                              <div className="card-course__thumb">
                                <div className="card-course__thumb-bg" style={test.disabled && isHovered ? { filter: "grayscale(100%) blur(1px)", transition: "filter 0.2s" } : undefined}>
                                  <img
                                    className="card-course__thumb-img"
                                    src={test.thumbnail}
                                    alt={test.title}
                                    style={test.disabled ? { opacity: 0.7 } : undefined}
                                  />
                                </div>
                              </div>

                              {/* Content Details */}
                              <div className="card-course__content">
                                <h3 className="card-course__title" title={test.title}>
                                  {test.title}
                                </h3>

                                <div className="card-course__teacher">
                                  <span className="card-course__teacher-name">
                                    <span className="item-teacher">
                                      Kỹ năng: <strong>{test.skill}</strong>
                                    </span>
                                  </span>
                                  <div className="card-course__options">
                                    <span
                                      style={{
                                        fontSize: "11px",
                                        background: test.category === "ielts" ? "#edf7ff" : test.category === "toeic" ? "#fff2e8" : "#f6ffed",
                                        color: test.category === "ielts" ? "#0071f9" : test.category === "toeic" ? "#d4380d" : "#389e0d",
                                        padding: "2px 8px",
                                        borderRadius: "4px",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      {test.category}
                                    </span>
                                  </div>
                                </div>

                                {/* Test Metadata stats */}
                                <div className="card-course__info-group">
                                  {/* Time limit */}
                                  <span className="card-course__lesson-info" title="Thời gian làm bài">
                                    <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <circle cx="12" cy="12" r="10" />
                                      <polyline points="12 6 12 12 16 14" />
                                    </svg>{" "}
                                    {test.timeLimit}
                                  </span>
                                  {/* Questions count */}
                                  <span className="card-course__lesson-info" title="Số lượng câu hỏi">
                                    <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                      <polyline points="14 2 14 8 20 8" />
                                      <line x1="16" y1="13" x2="8" y2="13" />
                                      <line x1="16" y1="17" x2="8" y2="17" />
                                    </svg>{" "}
                                    {test.questionsCount} câu
                                  </span>
                                  {/* Difficulty */}
                                  <span className="card-course__lesson-info" title="Mức độ khó">
                                    <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>{" "}
                                    {test.difficulty}
                                  </span>
                                </div>
                              </div>

                              {/* Footer: Price (Empty/Free) & CTA */}
                              <div className="card-course__footer">
                                <div className="card-course__price-sale">
                                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#13a62e" }}>
                                    Miễn phí
                                  </span>
                                </div>
                                <button
                                  className={`btn card-course__cta${test.disabled ? " disabled" : ""}`}
                                  style={test.disabled ? { background: isHovered ? "#d1d1d6" : "#e5e5ea", color: isHovered ? "#515154" : "#8a8a8e", cursor: "not-allowed" } : undefined}
                                  onClick={(e) => {
                                    if (test.disabled) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    } else {
                                      router.push(test.href);
                                    }
                                  }}
                                >
                                  {test.disabled && isHovered ? "Sắp ra mắt" : "Luyện tập ngay"}
                                </button>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="empty-courses-state" style={{ padding: "80px 0" }}>
                        <svg
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ color: "#cbd5e1", marginBottom: 16 }}
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        <p>Không tìm thấy đề luyện tập nào phù hợp.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

