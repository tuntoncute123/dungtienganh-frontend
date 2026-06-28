"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Grid, Drawer, Input } from "antd";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";

const { Content } = Layout;
const { useBreakpoint } = Grid;

/* ── Course Data Interface ────────────────── */

interface Course {
  id: string;
  href: string;
  title: string;
  is_hot: boolean;
  hot_icon: string;
  thumbnail: string;
  teachers: string[];
  options: ("video" | "livestream")[];
  videos: string;
  exercises: string;
  exams: string;
  price_main?: string;
  price_sale?: string;
  sale_tag?: string;
  grade: "8" | "9" | "10" | "11" | "12";
}

const COURSES_DATA: Course[] = [
  {
    id: "toan-9-he-2k12",
    href: "/courses/toan-9-khoa-he-2k12-63",
    title: "TOÁN 9 | KHÓA HÈ 2K12",
    is_hot: true,
    hot_icon: "/assets/hotB9F-tCZm_3b836ae8.png",
    thumbnail: "/assets/1780979822-khoa-he_db3bba6c.jpg",
    teachers: ["Trung Anh Siêu Nhân"],
    options: ["video", "livestream"],
    videos: "18 Video",
    exercises: "0 Bài tập",
    exams: "4 Bài thi",
    price_main: "300.000",
    price_sale: "400.000",
    sale_tag: "25%",
    grade: "9",
  },
  {
    id: "toan-12-l-nen-tang",
    href: "/courses/toan-12-khoa-l-nen-tang-12-2027-27",
    title: "TOÁN 12 | KHOÁ [L] NỀN TẢNG 12 2027",
    is_hot: true,
    hot_icon: "/assets/hotB9F-tCZm_3b836ae8.png",
    thumbnail: "/assets/1775702977-94-thuml-_08f07fd3.jpg",
    teachers: ["Anh Giáo Kid"],
    options: ["video", "livestream"],
    videos: "38 Video",
    exercises: "5 Bài tập",
    exams: "5 Bài thi",
    grade: "12",
  },
  {
    id: "toan-12-f-he-thong",
    href: "/courses/toan-12-khoa-f-he-thong-nen-tang-11-2027-23",
    title: "TOÁN 12 | KHOÁ [F] HỆ THỐNG NỀN TẢNG 11 2027",
    is_hot: true,
    hot_icon: "/assets/hotB9F-tCZm_3b836ae8.png",
    thumbnail: "/assets/1775031204-303-thuml_e0f5cdc2.jpg",
    teachers: ["Anh Giáo Kid"],
    options: ["video", "livestream"],
    videos: "21 Video",
    exercises: "8 Bài tập",
    exams: "0 Bài thi",
    grade: "12",
  },
  {
    id: "500-cau-chong-sai-ngu",
    href: "/courses/500-cau-chong-sai-ngu-kinh-dien-toan-vat-ly-tieng-anh-50",
    title: "500 CÂU CHỐNG SAI NGU KINH ĐIỂN | TOÁN - VẬT LÝ - TIẾNG ANH",
    is_hot: true,
    hot_icon: "/assets/hotB9F-tCZm_3b836ae8.png",
    thumbnail: "/assets/1774865665-303-thuml_503b7a47.jpg",
    teachers: ["Anh Giáo Kid", "Tổ Vật Lý", "Tổ Tiếng Anh"],
    options: ["video", "livestream"],
    videos: "25 Video",
    exercises: "25 Bài tập",
    exams: "0 Bài thi",
    grade: "12",
  },
  {
    id: "tieng-anh-10-hk2",
    href: "/courses/tieng-anh-10-khoa-hoc-ki-2-hs-2k11-78",
    title: "TIẾNG ANH 10 | KHOÁ HỌC KÌ 2 - HS 2K11",
    is_hot: false,
    hot_icon: "",
    thumbnail: "/assets/1782388373-2_9d3976ca.png",
    teachers: [],
    options: [],
    videos: "0 Video",
    exercises: "0 Bài tập",
    exams: "0 Bài thi",
    grade: "10",
  },
  {
    id: "tieng-anh-11-hk2",
    href: "/courses/tieng-anh-11-khoa-hoc-ki-2-hs-2k10-77",
    title: "TIẾNG ANH 11 | KHOÁ HỌC KÌ 2 - HS 2K10",
    is_hot: false,
    hot_icon: "",
    thumbnail: "/assets/1782388335-2_0b3817c6.jpg",
    teachers: [],
    options: [],
    videos: "0 Video",
    exercises: "0 Bài tập",
    exams: "0 Bài thi",
    grade: "11",
  },
  {
    id: "tieng-anh-10-hk1",
    href: "/courses/tieng-anh-10-khoa-hoc-ki-1-hs-2k11-76",
    title: "TIẾNG ANH 10 | KHOÁ HỌC KÌ 1 - HS 2K11",
    is_hot: false,
    hot_icon: "",
    thumbnail: "/assets/1782388290-1_6121c985.png",
    teachers: [],
    options: [],
    videos: "0 Video",
    exercises: "0 Bài tập",
    exams: "0 Bài thi",
    grade: "10",
  },
  {
    id: "tieng-anh-11-hk1",
    href: "/courses/tieng-anh-11-khoa-hoc-ki-1-hs-2k10-75",
    title: "TIẾNG ANH 11 | KHOÁ HỌC KÌ 1 - HS 2K10",
    is_hot: false,
    hot_icon: "",
    thumbnail: "/assets/1782388127-1_f3a86a69.jpg",
    teachers: [],
    options: [],
    videos: "0 Video",
    exercises: "0 Bài tập",
    exams: "0 Bài thi",
    grade: "11",
  },
  {
    id: "tieng-anh-9-he-2k12",
    href: "/courses/tieng-anh-9-khoa-he-2k12-74",
    title: "TIẾNG ANH 9 | KHÓA HÈ 2K12",
    is_hot: false,
    hot_icon: "",
    thumbnail: "/assets/1782387428-1-khoa-he_21a6149e.jpg",
    teachers: ["Tổ Tiếng Anh"],
    options: [],
    videos: "12 Video",
    exercises: "0 Bài tập",
    exams: "0 Bài thi",
    grade: "9",
  },
  {
    id: "tieng-anh-9-ngu-phap",
    href: "/courses/tieng-anh-9-khoa-ngu-phap-toan-dien-73",
    title: "TIẾNG ANH 9 | KHÓA NGỮ PHÁP TOÀN DIỆN",
    is_hot: false,
    hot_icon: "",
    thumbnail: "/assets/1782387742-1-khoa-ng_d576dea6.jpg",
    teachers: ["Tổ Tiếng Anh"],
    options: [],
    videos: "0 Video",
    exercises: "0 Bài tập",
    exams: "0 Bài thi",
    grade: "9",
  },
];

const GRADES = [
  { key: "all", label: "Tất cả" },
  { key: "8", label: "Lớp 8" },
  { key: "9", label: "Lớp 9" },
  { key: "10", label: "Lớp 10" },
  { key: "11", label: "Lớp 11" },
  { key: "12", label: "Lớp 12" },
];

/* ── Main Component ────────────────────────── */

export default function MyCoursesPage() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesTab = activeTab === "all" || course.grade === activeTab;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teachers.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
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
          <AppSidebar activeKey="my-courses" />
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
        <AppSidebar activeKey="my-courses" />
      </Drawer>

      {/* Main Content */}
      <Content className="app-content">
        <div className="main-scroll">
          <div className="list-category">
            <div className="container">
              <div className="list-test">
                <div className="list-test__container">
                  {/* Header Area: Tabs Navigation & Search Bar */}
                  <div className="list-test__header">
                    <div className="list-test__header-title">
                      <nav className="tabs-navigation">
                        {GRADES.map((grade) => (
                          <span
                            key={grade.key}
                            className={`tab-item${activeTab === grade.key ? " active" : ""}`}
                            onClick={() => setActiveTab(grade.key)}
                          >
                            {grade.label}
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
                            placeholder="Nhập từ khóa tìm kiếm ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course Cards Content Area */}
                  <div className="list-test__content">
                    {filteredCourses.length > 0 ? (
                      <div className="list-category__course">
                        {filteredCourses.map((course) => (
                          <a
                            key={course.id}
                            href={course.href}
                            className="card-course"
                          >
                            {/* Hot Tag badge */}
                            {course.is_hot && (
                              <img
                                loading="lazy"
                                className="icon-hot"
                                src={course.hot_icon}
                                alt="Hot"
                              />
                            )}

                            {/* Thumbnail Area */}
                            <div className="card-course__thumb">
                              <div className="card-course__thumb-bg">
                                <img
                                  loading="lazy"
                                  className="card-course__thumb-img"
                                  src={course.thumbnail}
                                  alt={course.title}
                                />
                              </div>
                            </div>

                            {/* Content Details */}
                            <div className="card-course__content">
                              <h3 className="card-course__title" title={course.title}>
                                {course.title}
                              </h3>

                              <div className="card-course__teacher">
                                <span className="card-course__teacher-name">
                                  {course.teachers.length > 0 ? (
                                    <span className="item-teacher">
                                      Giáo viên:{" "}
                                      {course.teachers.map((t, idx) => (
                                        <span key={t}>
                                          {idx > 0 && ", "}
                                          <span>{t}</span>
                                        </span>
                                      ))}
                                    </span>
                                  ) : (
                                    <span className="item-teacher">Giáo viên: Đang cập nhật</span>
                                  )}
                                </span>

                                {/* Options (Video/Livestream logo icons) */}
                                {course.options.length > 0 && (
                                  <div className="card-course__options">
                                    {course.options.includes("video") && (
                                      <img
                                        src="/assets/1766474256-video_0360702d.png"
                                        alt="Video"
                                      />
                                    )}
                                    {course.options.includes("livestream") && (
                                      <img
                                        src="/assets/1766474256-livestrea_3449e942.png"
                                        alt="Livestream"
                                      />
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Lesson stats */}
                              <div className="card-course__info-group">
                                <span className="card-course__lesson-info">
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
                                    <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
                                    <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                                  </svg>{" "}
                                  {course.videos}
                                </span>
                                <span className="card-course__lesson-info">
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
                                    <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
                                    <path d="M13 8l2 0" />
                                    <path d="M13 12l2 0" />
                                  </svg>{" "}
                                  {course.exercises}
                                </span>
                                <span className="card-course__lesson-info">
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
                                    <rect x="3" y="4" width="18" height="16" rx="2" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>{" "}
                                  {course.exams}
                                </span>
                              </div>
                            </div>

                            {/* Footer: Price details & CTA */}
                            <div className="card-course__footer">
                              <div className="card-course__price-sale">
                                {course.price_main && (
                                  <div className="card-course__price">
                                    <div className="price-main">{course.price_main}đ</div>
                                    {course.price_sale && (
                                      <div className="price-sale">{course.price_sale}đ</div>
                                    )}
                                  </div>
                                )}
                                {course.sale_tag && (
                                  <span className="el-tag el-tag--danger el-tag--small el-tag--dark">
                                    <span className="el-tag__content">{course.sale_tag}</span>
                                  </span>
                                )}
                              </div>
                              <button 
                                className="btn card-course__cta"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  router.push("/lesson");
                                }}
                              >
                                Học thử ngay
                              </button>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-courses-state">
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
                        <p>Không tìm thấy khóa học nào phù hợp.</p>
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

