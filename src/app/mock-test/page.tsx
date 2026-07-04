"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout, Grid, Drawer, Spin } from "antd";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";

const { Content } = Layout;
const { useBreakpoint } = Grid;

interface MockTest {
  id: string;
  title: string;
  skill: string;
  timeLimit: string;
  questionsCount: number;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  thumbnail: string;
  isHot: boolean;
  hotIcon?: string;
  category: string; // grade
  href: string;
  disabled?: boolean;
}

const CATEGORIES = [
  { key: "all", label: "Tất cả" },
  { key: "8", label: "Lớp 8" },
  { key: "9", label: "Lớp 9" },
  { key: "10", label: "Lớp 10" },
  { key: "11", label: "Lớp 11" },
  { key: "12", label: "Lớp 12" },
  { key: "dgnl", label: "ĐGNL" },
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function MockTestPage() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  
  const [tests, setTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [allowedExams, setAllowedExams] = useState<string[]>([]);
  const [role, setRole] = useState<string>("student");
  const [completedTests, setCompletedTests] = useState<Record<string, { score: number; correct: number; total: number }>>({});

  const screens = useBreakpoint();
  const isDesktop = !!screens.lg;

  useEffect(() => {
    const userStr = localStorage.getItem("teacherdung_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setAllowedExams(user.allowedExams || []);
        setRole(user.role || "student");
      } catch (e) {}
    }
  }, []);

  const fetchMockTests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/exams?category=mock-test`);
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map((item: any, idx: number) => ({
          id: item.id,
          title: item.title,
          skill: item.skill || "Full Test",
          timeLimit: `${item.duration} phút`,
          questionsCount: item.cardCount || (item.questions ? item.questions.length : 0),
          difficulty: item.difficulty || "Trung bình",
          thumbnail: item.thumbnail || "/assets/1782388373-2_9d3976ca.png",
          isHot: idx % 2 === 0,
          hotIcon: "/assets/hotB9F-tCZm_3b836ae8.png",
          category: item.grade || "all",
          href: `/progress-test?id=${item.id}`,
          disabled: false
        }));
        setTests(formatted);

        // Check localStorage for completed tests
        const completedMap: Record<string, { score: number; correct: number; total: number }> = {};
        data.forEach((item: any) => {
          try {
            const saved = localStorage.getItem(`practice_completed_${item.id}`);
            if (saved) {
              const parsed = JSON.parse(saved);
              completedMap[item.id] = {
                score: parsed.score,
                correct: parsed.correct,
                total: parsed.total
              };
            }
          } catch (e) {}
        });
        setCompletedTests(completedMap);
      }
    } catch (e) {
      console.error("Lỗi khi tải đề thi thử:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleRetakeTest = (e: React.MouseEvent, href: string, testId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.removeItem(`practice_completed_${testId}`);
    } catch (err) {}
    setCompletedTests((prev) => {
      const updated = { ...prev };
      delete updated[testId];
      return updated;
    });
    router.push(href);
  };

  useEffect(() => {
    fetchMockTests();
  }, []);

  const handleMenuClick = () => {
    if (isDesktop) {
      setSidebarPinned((prev) => !prev);
    } else {
      setDrawerOpen(true);
    }
  };

  // Filter logic
  const filteredTests = tests.filter((test) => {
    if (role === "student" && !allowedExams.includes(test.id)) {
      return false;
    }
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
          <AppSidebar activeKey="" />
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
        <AppSidebar activeKey="" />
      </Drawer>

      {/* Main Content */}
      <Content className="app-content">
        <h1 className="sr-only">Thi Thử Tiếng Anh Online - TeacherDung</h1>
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
                            placeholder="Tìm kiếm đề thi thử ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cards Content Area */}
                  <div className="list-test__content">
                    {loading ? (
                      <div style={{ display: "flex", justifyContent: "center", padding: "40px 0", width: "100%" }}>
                        <Spin size="large" description="Đang tải danh sách đề thi thử..." />
                      </div>
                    ) : filteredTests.length > 0 ? (
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
                              {test.isHot && (
                                <div className="icon-hot-badge">HOT</div>
                              )}

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
                                        background: "#e6f6ec",
                                        color: "#35a873",
                                        padding: "2px 8px",
                                        borderRadius: "4px",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      {test.category === "dgnl" ? "ĐGNL" : `Lớp ${test.category}`}
                                    </span>
                                  </div>
                                </div>

                                <div className="card-course__info-group">
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

                              <div className="card-course__footer">
                                <div className="card-course__price-sale">
                                  {completedTests[test.id] ? (
                                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#35a873" }}>
                                      Điểm: {completedTests[test.id].score}% ({completedTests[test.id].correct}/{completedTests[test.id].total} câu)
                                    </span>
                                  ) : (
                                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#13a62e" }}>
                                      Miễn phí
                                    </span>
                                  )}
                                </div>
                                {completedTests[test.id] ? (
                                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                    <button
                                      className="btn card-course__cta"
                                      style={{ background: "#6b7280", color: "#fff", fontSize: "12px", padding: "6px 10px", flexShrink: 0 }}
                                      onClick={(e) => handleRetakeTest(e, test.href, test.id)}
                                    >
                                      Làm lại
                                    </button>
                                    <button
                                      className="btn card-course__cta"
                                      style={{ background: "#f59e0b", color: "#fff", fontSize: "12px", padding: "6px 10px", flexShrink: 0 }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        router.push(`${test.href}&review=true`);
                                      }}
                                    >
                                      Xem chi tiết
                                    </button>
                                  </div>
                                ) : (
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
                                    Làm bài thi
                                  </button>
                                )}
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
                        <p>Không tìm thấy đề thi thử nào phù hợp.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Content>
    </Layout>
  );
}
