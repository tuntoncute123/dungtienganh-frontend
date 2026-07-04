"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  grade: "8" | "9" | "10" | "11" | "12" | "dgnl";
}

export default function HomeCoursesSection() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/courses`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mappedCourses: Course[] = data.map((c: any) => ({
              id: c.id,
              href: `/courses/${c.id}`,
              title: c.title,
              is_hot: !!c.isHot,
              hot_icon: c.hotIcon || "/assets/hotB9F-tCZm_3b836ae8.png",
              thumbnail: c.thumbnail || "/assets/1780979822-khoa-he_db3bba6c.jpg",
              teachers: Array.isArray(c.teachers) ? c.teachers : [],
              options: ["video", "livestream"],
              videos: c.videos || "0 Video",
              exercises: c.exercises || "0 Bài tập",
              exams: c.exams || "0 Bài thi",
              price_main: c.priceMain || undefined,
              price_sale: c.priceSale || undefined,
              sale_tag: c.saleTag || undefined,
              grade: c.grade as any,
            }));
            setCourses(mappedCourses);
          }
        }
      } catch (err) {
        console.error("Lỗi khi tải danh sách khóa học ở trang chủ:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="home-courses-section" style={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#35a873", fontWeight: 600 }}>Đang tải danh sách khóa học...</div>
      </section>
    );
  }

  if (courses.length === 0) return null;

  return (
    <section className="home-courses-section" style={{ marginTop: 40, marginBottom: 40 }}>
      {/* Section Header */}
      <div className="honor-header" style={{ marginBottom: 24 }}>
        <div className="honor-crown" style={{ transform: "rotate(-10deg)" }}>📚</div>
        <div>
          <h2 className="honor-title" style={{ fontSize: 24, fontWeight: 800 }}>Danh sách khóa học</h2>
          <p className="honor-subtitle">Các khóa học chất lượng từ Team Cô Dung</p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="list-category__course" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
        {courses.map((course) => (
          <a
            key={course.id}
            href={`/lesson?courseId=${course.id}`}
            className="card-course"
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            {/* Hot Tag badge */}
            {course.is_hot && (
              <div className="icon-hot-badge">HOT</div>
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
            <div className="card-course__content" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <h3 className="card-course__title" title={course.title} style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4, marginBottom: 8, height: 42, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                {course.title}
              </h3>

              <div className="card-course__teacher" style={{ marginBottom: 12 }}>
                <span className="card-course__teacher-name" style={{ fontSize: 13, color: "#64748b" }}>
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
              </div>

              {/* Lesson stats */}
              <div className="card-course__info-group" style={{ marginTop: "auto", borderTop: "1px solid #f1f5f9", paddingTop: 10, display: "flex", gap: 12 }}>
                <span className="card-course__lesson-info" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748b" }}>
                  <svg
                    width="16"
                    height="16"
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
                <span className="card-course__lesson-info" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748b" }}>
                  <svg
                    width="16"
                    height="16"
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
                <span className="card-course__lesson-info" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748b" }}>
                  <svg
                    width="16"
                    height="16"
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

            {/* Footer: Price details & 2 CTAs */}
            <div className="card-course__footer" style={{ flexDirection: "column", gap: 12, alignItems: "stretch", borderTop: "1px solid #f1f5f9", padding: "12px 16px" }}>
              <div className="card-course__price-sale" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                {course.price_sale ? (
                  <div className="card-course__price">
                    <div className="price-main" style={{ fontSize: 16, fontWeight: 800, color: "#ef4444" }}>{course.price_sale}đ</div>
                    <div className="price-sale" style={{ fontSize: 11, color: "#94a3b8", textDecoration: "line-through" }}>{course.price_main}đ</div>
                  </div>
                ) : (
                  course.price_main && (
                    <div className="card-course__price">
                      <div className="price-main" style={{ fontSize: 16, fontWeight: 800, color: "#ef4444" }}>{course.price_main}đ</div>
                    </div>
                  )
                )}
                {course.sale_tag && (
                  <span className="el-tag el-tag--danger el-tag--small el-tag--dark">
                    <span className="el-tag__content">{course.sale_tag}</span>
                  </span>
                )}
              </div>

              {/* 2 Buttons */}
              <div className="card-course__footer-double-btn" style={{ display: "flex", gap: 8, width: "100%" }}>
                <button
                  className="btn card-course__cta"
                  style={{ flex: 1, textAlign: "center", padding: "8px 0" }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(`/lesson?courseId=${course.id}`);
                  }}
                >
                  Học ngay
                </button>
                <button
                  className="btn card-course__cta btn-register"
                  style={{ flex: 1, textAlign: "center", padding: "8px 0" }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open("https://zalo.me/0987654321", "_blank");
                  }}
                >
                  Đăng ký ngay
                </button>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
