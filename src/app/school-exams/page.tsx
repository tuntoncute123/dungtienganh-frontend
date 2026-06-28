"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Grid, Drawer } from "antd";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";

const { Content } = Layout;
const { useBreakpoint } = Grid;

/* ── Data Interfaces ─────────────────────────── */

interface SchoolExam {
  id: string;
  title: string;
  source: string;         // Trường / Sở phát hành
  province: string;       // Tỉnh/thành
  year: number;
  timeLimit: string;
  questionsCount: number;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  thumbnail: string;
  isHot: boolean;
  hotIcon?: string;
  region: "all" | "mien-bac" | "mien-trung" | "mien-nam";
  href: string;
  disabled?: boolean;
}

const SCHOOL_EXAMS_DATA: SchoolExam[] = [
  {
    id: "so-ha-noi-2026",
    title: "Đề thi thử Tốt nghiệp THPT 2026 - Sở GD&ĐT Hà Nội (Lần 1)",
    source: "Sở GD&ĐT Hà Nội",
    province: "Hà Nội",
    year: 2026,
    timeLimit: "60 phút",
    questionsCount: 50,
    difficulty: "Khó",
    thumbnail: "/assets/1775031204-303-thuml_e0f5cdc2.jpg",
    isHot: true,
    hotIcon: "/assets/hotB9F-tCZm_3b836ae8.png",
    region: "mien-bac",
    href: "#",
    disabled: true,
  },
  {
    id: "thpt-chuyen-ha-noi-amsterdam-2026",
    title: "Đề thi thử Tốt nghiệp THPT 2026 - THPT Chuyên Hà Nội - Amsterdam",
    source: "THPT Chuyên HN-Amsterdam",
    province: "Hà Nội",
    year: 2026,
    timeLimit: "60 phút",
    questionsCount: 50,
    difficulty: "Khó",
    thumbnail: "/assets/1782387428-1-khoa-he_21a6149e.jpg",
    isHot: true,
    hotIcon: "/assets/hotB9F-tCZm_3b836ae8.png",
    region: "mien-bac",
    href: "#",
    disabled: true,
  },
  {
    id: "so-hai-phong-2026",
    title: "Đề thi thử Tốt nghiệp THPT 2026 - Sở GD&ĐT Hải Phòng",
    source: "Sở GD&ĐT Hải Phòng",
    province: "Hải Phòng",
    year: 2026,
    timeLimit: "60 phút",
    questionsCount: 50,
    difficulty: "Trung bình",
    thumbnail: "/assets/1782388127-1_f3a86a69.jpg",
    isHot: false,
    region: "mien-bac",
    href: "#",
    disabled: true,
  },
  {
    id: "so-nghe-an-2026",
    title: "Đề thi thử Tốt nghiệp THPT 2026 - Sở GD&ĐT Nghệ An (Lần 1)",
    source: "Sở GD&ĐT Nghệ An",
    province: "Nghệ An",
    year: 2026,
    timeLimit: "60 phút",
    questionsCount: 50,
    difficulty: "Trung bình",
    thumbnail: "/assets/1775702977-94-thuml-_08f07fd3.jpg",
    isHot: false,
    region: "mien-trung",
    href: "#",
    disabled: true,
  },
  {
    id: "thpt-chuyen-vinh-nghe-an-2026",
    title: "Đề thi thử Tốt nghiệp THPT 2026 - THPT Chuyên Đại học Vinh",
    source: "THPT Chuyên Đại học Vinh",
    province: "Nghệ An",
    year: 2026,
    timeLimit: "60 phút",
    questionsCount: 50,
    difficulty: "Khó",
    thumbnail: "/assets/1782387742-1-khoa-ng_d576dea6.jpg",
    isHot: false,
    region: "mien-trung",
    href: "#",
    disabled: true,
  },
  {
    id: "so-da-nang-2026",
    title: "Đề thi thử Tốt nghiệp THPT 2026 - Sở GD&ĐT Đà Nẵng",
    source: "Sở GD&ĐT Đà Nẵng",
    province: "Đà Nẵng",
    year: 2026,
    timeLimit: "60 phút",
    questionsCount: 50,
    difficulty: "Trung bình",
    thumbnail: "/assets/1782388335-2_0b3817c6.jpg",
    isHot: true,
    hotIcon: "/assets/hotB9F-tCZm_3b836ae8.png",
    region: "mien-trung",
    href: "#",
    disabled: true,
  },
  {
    id: "so-ho-chi-minh-2026",
    title: "Đề thi thử Tốt nghiệp THPT 2026 - Sở GD&ĐT TP. Hồ Chí Minh (Lần 1)",
    source: "Sở GD&ĐT TP. HCM",
    province: "TP. HCM",
    year: 2026,
    timeLimit: "60 phút",
    questionsCount: 50,
    difficulty: "Khó",
    thumbnail: "/assets/1782388373-2_9d3976ca.png",
    isHot: true,
    hotIcon: "/assets/hotB9F-tCZm_3b836ae8.png",
    region: "mien-nam",
    href: "#",
    disabled: true,
  },
  {
    id: "thpt-nguyen-thuong-hien-2026",
    title: "Đề thi thử Tốt nghiệp THPT 2026 - THPT Nguyễn Thượng Hiền (TP.HCM)",
    source: "THPT Nguyễn Thượng Hiền",
    province: "TP. HCM",
    year: 2026,
    timeLimit: "60 phút",
    questionsCount: 50,
    difficulty: "Trung bình",
    thumbnail: "/assets/1782388290-1_6121c985.png",
    isHot: false,
    region: "mien-nam",
    href: "#",
    disabled: true,
  },
  {
    id: "so-can-tho-2026",
    title: "Đề thi thử Tốt nghiệp THPT 2026 - Sở GD&ĐT Cần Thơ",
    source: "Sở GD&ĐT Cần Thơ",
    province: "Cần Thơ",
    year: 2026,
    timeLimit: "60 phút",
    questionsCount: 50,
    difficulty: "Dễ",
    thumbnail: "/assets/1774865665-303-thuml_503b7a47.jpg",
    isHot: false,
    region: "mien-nam",
    href: "#",
    disabled: true,
  },
];

const REGION_TABS = [
  { key: "all", label: "Tất cả" },
  { key: "mien-bac", label: "Miền Bắc" },
  { key: "mien-trung", label: "Miền Trung" },
  { key: "mien-nam", label: "Miền Nam" },
];

const REGION_COLOR_MAP: Record<string, { bg: string; color: string }> = {
  "mien-bac": { bg: "#e6f4ff", color: "#0071f9" },
  "mien-trung": { bg: "#fff7e6", color: "#d46b08" },
  "mien-nam": { bg: "#f6ffed", color: "#389e0d" },
};

/* ── Main Component ────────────────────────── */

export default function SchoolExamsPage() {
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

  const filteredExams = SCHOOL_EXAMS_DATA.filter((exam) => {
    const matchesTab = activeTab === "all" || exam.region === activeTab;
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.province.toLowerCase().includes(searchQuery.toLowerCase());
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
          <AppSidebar activeKey="school-exams" />
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
        <AppSidebar activeKey="school-exams" />
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
                        {REGION_TABS.map((tab) => (
                          <span
                            key={tab.key}
                            className={`tab-item${activeTab === tab.key ? " active" : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                          >
                            {tab.label}
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
                            placeholder="Tìm kiếm theo tên đề, trường, tỉnh thành ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cards Grid */}
                  <div className="list-test__content">
                    {filteredExams.length > 0 ? (
                      <div className="list-category__course">
                        {filteredExams.map((exam) => {
                          const isHovered = hoveredCardId === exam.id;
                          const regionColors = REGION_COLOR_MAP[exam.region] ?? { bg: "#f3f4f6", color: "#6b7280" };
                          return (
                            <a
                              key={exam.id}
                              href={exam.href}
                              className="card-course"
                              style={exam.disabled ? { cursor: "not-allowed" } : undefined}
                              onMouseEnter={() => setHoveredCardId(exam.id)}
                              onMouseLeave={() => setHoveredCardId(null)}
                              onClick={(e) => {
                                if (exam.disabled) e.preventDefault();
                              }}
                            >
                              {/* Hot badge */}
                              {exam.isHot && exam.hotIcon && (
                                <img className="icon-hot" src={exam.hotIcon} alt="Hot" />
                              )}

                              {/* Year badge overlay */}
                              <div
                                style={{
                                  position: "absolute",
                                  top: 10,
                                  left: 10,
                                  zIndex: 5,
                                  background: "rgba(0,0,0,0.55)",
                                  color: "#fff",
                                  fontSize: 11,
                                  fontWeight: 700,
                                  padding: "3px 9px",
                                  borderRadius: 6,
                                  letterSpacing: "0.5px",
                                }}
                              >
                                {exam.year}
                              </div>

                              {/* Thumbnail */}
                              <div className="card-course__thumb">
                                <div
                                  className="card-course__thumb-bg"
                                  style={
                                    exam.disabled && isHovered
                                      ? { filter: "grayscale(100%) blur(1px)", transition: "filter 0.2s" }
                                      : undefined
                                  }
                                >
                                  <img
                                    className="card-course__thumb-img"
                                    src={exam.thumbnail}
                                    alt={exam.title}
                                    style={exam.disabled ? { opacity: 0.75 } : undefined}
                                  />
                                </div>
                              </div>

                              {/* Content */}
                              <div className="card-course__content">
                                <h3 className="card-course__title" title={exam.title}>
                                  {exam.title}
                                </h3>

                                <div className="card-course__teacher">
                                  <span className="card-course__teacher-name">
                                    <span className="item-teacher">
                                      Nguồn: <strong>{exam.source}</strong>
                                    </span>
                                  </span>
                                  <div className="card-course__options">
                                    <span
                                      style={{
                                        fontSize: "11px",
                                        background: regionColors.bg,
                                        color: regionColors.color,
                                        padding: "2px 8px",
                                        borderRadius: "4px",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {exam.province}
                                    </span>
                                  </div>
                                </div>

                                {/* Metadata */}
                                <div className="card-course__info-group">
                                  {/* Time limit */}
                                  <span className="card-course__lesson-info" title="Thời gian làm bài">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10" />
                                      <polyline points="12 6 12 12 16 14" />
                                    </svg>{" "}
                                    {exam.timeLimit}
                                  </span>
                                  {/* Questions count */}
                                  <span className="card-course__lesson-info" title="Số câu hỏi">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                      <polyline points="14 2 14 8 20 8" />
                                      <line x1="16" y1="13" x2="8" y2="13" />
                                      <line x1="16" y1="17" x2="8" y2="17" />
                                    </svg>{" "}
                                    {exam.questionsCount} câu
                                  </span>
                                  {/* Difficulty */}
                                  <span className="card-course__lesson-info" title="Độ khó">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>{" "}
                                    {exam.difficulty}
                                  </span>
                                </div>
                              </div>

                              {/* Footer CTA */}
                              <div className="card-course__footer">
                                <div className="card-course__price-sale">
                                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#13a62e" }}>
                                    Miễn phí
                                  </span>
                                </div>
                                <button
                                  className={`btn card-course__cta${exam.disabled ? " disabled" : ""}`}
                                  style={
                                    exam.disabled
                                      ? {
                                          background: isHovered ? "#d1d1d6" : "#e5e5ea",
                                          color: isHovered ? "#515154" : "#8a8a8e",
                                          cursor: "not-allowed",
                                        }
                                      : undefined
                                  }
                                  onClick={(e) => {
                                    if (exam.disabled) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    } else {
                                      router.push(exam.href);
                                    }
                                  }}
                                >
                                  {exam.disabled && isHovered ? "Sắp ra mắt" : "Luyện tập ngay"}
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
                        <p>Không tìm thấy đề thi nào phù hợp.</p>
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
