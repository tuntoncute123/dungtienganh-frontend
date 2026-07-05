"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { Layout, Grid, Drawer, Breadcrumb, Spin, Progress, Row, Col, Space, Button, Divider } from "antd";
import { ClockCircleOutlined, BookOutlined, DownloadOutlined, FormOutlined } from "@ant-design/icons";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import VideoPlayer from "@/components/lesson/VideoPlayer";
import LessonDocuments from "@/components/lesson/LessonDocuments";
import LessonPlaylist from "@/components/lesson/LessonPlaylist";
import ViewModeSelector from "@/components/lesson/ViewModeSelector";
import LessonPractice from "@/components/lesson/LessonPractice";
import DiscussionPanel from "@/components/lesson/DiscussionPanel";
import Footer from "@/components/Footer";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

function LessonPageContent() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const screens = useBreakpoint();
  const isDesktop = !!screens.lg;

  const searchParams = useSearchParams();
  const router = useRouter();
  const lessonId = searchParams.get("id");
  const courseId = searchParams.get("courseId");

  const [lesson, setLesson] = useState<any>(null);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState<any>(null);
  const practiceRef = useRef<HTMLDivElement>(null);

  const [showQuiz, setShowQuiz] = useState(false);
  const [examData, setExamData] = useState<any>(null);
  const [userScore, setUserScore] = useState<number>(0);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const scrollToPractice = () => {
    practiceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (courseId) {
      fetch(`${API_BASE_URL}/api/courses?id=${courseId}`)
        .then(res => res.json())
        .then(data => setCourseInfo(data))
        .catch(err => console.error("Lỗi khi tải thông tin khóa học:", err));
    }
  }, [courseId, API_BASE_URL]);

  useEffect(() => {
    setShowQuiz(false);
    if (lesson?.exerciseId) {
      fetch(`${API_BASE_URL}/api/exams?id=${lesson.exerciseId}`)
        .then(res => res.json())
        .then(data => setExamData(data))
        .catch(err => console.error("Lỗi khi tải thông tin bài thi:", err));

      const completedKey = `practice_completed_${lesson.exerciseId}`;
      const completedData = localStorage.getItem(completedKey);
      if (completedData) {
        const parsed = JSON.parse(completedData);
        setUserScore(parsed.score ?? 0);
        setHasCompleted(true);
      } else {
        setUserScore(0);
        setHasCompleted(false);
      }
    } else {
      setExamData(null);
      setUserScore(0);
      setHasCompleted(false);
    }
  }, [lesson, lessonId]);

  useEffect(() => {
    const fetchLessonAndPlaylist = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("teacherdung_token");
        const headers: any = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // 1. Fetch playlist data
        let playlistData: any[] = [];
        if (courseId) {
          const listRes = await fetch(`${API_BASE_URL}/api/lessons?playlistId=${courseId}`, { headers });
          if (listRes.ok) {
            playlistData = await listRes.json();
          }
        } else {
          const listRes = await fetch(`${API_BASE_URL}/api/lessons`, { headers });
          if (listRes.ok) {
            playlistData = await listRes.json();
          }
        }
        setPlaylist(playlistData);

        // 2. Identify the active lesson
        if (lessonId) {
          const res = await fetch(`${API_BASE_URL}/api/lessons?id=${lessonId}`, { headers });
          if (res.ok) {
            const data = await res.json();
            setLesson(data);
          } else if (playlistData.length > 0) {
            setLesson(playlistData[0]);
          } else {
            setLesson(null);
          }
        } else {
          // If no lessonId is specified, play the first lesson in the playlist
          if (playlistData.length > 0) {
            setLesson(playlistData[0]);
          } else {
            setLesson(null);
          }
        }
      } catch (e) {
        console.error("Lỗi khi tải bài học và danh sách phát:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchLessonAndPlaylist();
  }, [lessonId, courseId]);

  const handleMenuClick = () => {
    if (isDesktop) {
      setSidebarPinned((prev) => !prev);
    } else {
      setDrawerOpen(true);
    }
  };

  if (loading) {
    return (
      <Layout className="app-layout" style={{ background: "rgb(249, 245, 250)", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Spin size="large" description="Đang tải bài giảng..." />
      </Layout>
    );
  }

  if (!lesson) {
    return (
      <Layout className="app-layout" style={{ background: "rgb(249, 245, 250)", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Không tìm thấy bài học nào.</h2>
          <p>Vui lòng nạp dữ liệu mock từ trang admin hoặc đồng bộ db.</p>
          <Link href="/admin"><span style={{ color: "#f40c44", fontWeight: "bold" }}>Về trang Admin</span></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="app-layout" style={{ background: "rgb(249, 245, 250)" }}>
      {/* ── Sticky header ── */}
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

      {/* ── Main Content ── */}
      <Content className="app-content" style={{ background: "transparent" }}>
        {/* ── Breadcrumb ── */}
        <div className="lp-breadcrumb-bar">
          <div className="lp-breadcrumb-inner">
            <Breadcrumb
              separator="›"
              items={[
                { title: <Link href="/" style={{ color: "inherit" }}>Trang chủ</Link> },
                { title: <Link href="/my-courses" style={{ color: "inherit" }}>Danh mục khoá học</Link> },
                { 
                  title: (
                    <Link 
                      href={`/lesson?courseId=${courseId || ""}`} 
                      style={{ color: "inherit" }}
                    >
                      {courseInfo?.title || "Khóa học"}
                    </Link>
                  ) 
                },
                {
                  title: (
                    <span style={{ color: "#f40c44" }}>{lesson.title}</span>
                  ),
                },
              ]}
              style={{ fontSize: 13 }}
            />
          </div>
        </div>

        {/* ── Grid Container ── */}
        <div className="lp-grid-container">
          <div className={`lp-main-grid${!isDesktop ? " lp-main-grid-mobile" : ""}`}>
            {/* ── LEFT: Video + docs + homework OR Thi Online ── */}
            <div className="lp-left-col">
              {lesson.isLocked ? (
                // --- LOCKED LESSON VIEW ---
                <div 
                  className="lp-card" 
                  style={{ 
                    padding: "80px 24px", 
                    textAlign: "center", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    minHeight: 450, 
                    borderRadius: 16,
                    background: "#ffffff",
                    border: "1px solid #f1f5f9"
                  }}
                >
                  <div style={{ fontSize: 64, marginBottom: 20 }}>🔒</div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1e293b", marginBottom: 12 }}>
                    Bài giảng này đã được khóa
                  </h2>
                  <p style={{ fontSize: 16, color: "#64748b", maxWidth: 450, margin: "0 auto 24px auto", lineHeight: 1.6 }}>
                    Bạn đang ở chế độ học thử. Vui lòng đăng ký mua khóa học để mở khóa toàn bộ bài giảng chất lượng cao và học tập đầy đủ nhất.
                  </p>
                  <Button
                    type="primary"
                    size="large"
                    style={{ 
                      background: "#f40c44", 
                      borderColor: "#f40c44", 
                      height: 48, 
                      borderRadius: 24, 
                      fontWeight: 700, 
                      fontSize: 16,
                      padding: "0 32px",
                      boxShadow: "0 4px 14px rgba(244, 12, 68, 0.3)"
                    }}
                    onClick={() => window.open("https://zalo.me/0987654321", "_blank")}
                  >
                    Mua khóa học ngay
                  </Button>
                </div>
              ) : (lesson.videoUrl || !lesson.exerciseId) ? (
                // --- REGULAR VIDEO LESSON VIEW ---
                <>
                  <VideoPlayer
                    lessonId={lesson.id}
                    title={lesson.title}
                    videoUrl={lesson.videoUrl}
                    remainingViews={10}
                    totalViews={10}
                    duration={lesson.duration}
                    quizPoints={lesson.quizPoints || []}
                  />

                  {/* Homework */}
                  <div className="lp-homework-bar">
                    <span className="lp-homework-label">Nhiệm vụ sau buổi học:</span>
                    <div className="lp-homework-tasks" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {lesson.exerciseId && (
                        <button
                          onClick={scrollToPractice}
                          className="lp-homework-task-btn"
                          style={{ background: "#35a873", color: "#ffffff", borderColor: "#35a873", fontWeight: "600" }}
                        >
                          📝&nbsp;&nbsp;Làm bài tập ôn luyện đính kèm
                        </button>
                      )}
                      {(lesson.homeworkTasks || []).map((task: string) => (
                        <button key={task} className="lp-homework-task-btn">
                          📖&nbsp;&nbsp;{task}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Practice Section */}
                  {lesson.exerciseId && (
                    <LessonPractice ref={practiceRef} exerciseId={lesson.exerciseId} />
                  )}

                  {/* Documents */}
                  <div className="lp-card" style={{ marginTop: 12 }}>
                    <LessonDocuments documents={lesson.documents || []} />
                  </div>
                </>
              ) : (
                // --- THI ONLINE PAGE VIEW ---
                showQuiz ? (
                  <div>
                    {/* Back Button */}
                    <Button 
                      type="link" 
                      onClick={() => setShowQuiz(false)} 
                      style={{ padding: 0, marginBottom: 12, display: "flex", alignItems: "center", gap: 6, color: "#64748b", fontWeight: 600 }}
                    >
                      ← Quay lại trang giới thiệu
                    </Button>
                    <LessonPractice 
                      ref={practiceRef} 
                      exerciseId={lesson.exerciseId || ""} 
                    />
                  </div>
                ) : (
                  // Intro details
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <h2 className="lp-video-title" style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
                      <span>{lesson.title}</span>
                    </h2>

                    {/* Lecture Information Box */}
                    <div className="lp-card" style={{ padding: 24 }}>
                      <Row gutter={[24, 24]} align="middle">
                        {/* Circular Progress */}
                        <Col xs={24} md={10} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <Progress
                            type="circle"
                            percent={userScore}
                            strokeColor={userScore >= 60 ? "#10b981" : userScore > 0 ? "#ef4444" : "#f1f5f9"}
                            format={(percent) => (
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>Điểm của bạn</span>
                                <span style={{ fontSize: 34, fontWeight: 800, color: "#1e293b", marginTop: 4 }}>{percent}</span>
                              </div>
                            )}
                            strokeWidth={7}
                            size={180}
                          />
                          <div style={{ textAlign: "center", fontSize: 13, color: "#ef4444", fontWeight: 600, marginTop: 12 }}>
                            Bạn phải đạt trên 60% để vượt qua bài thi!
                          </div>
                        </Col>

                        {/* Stats Grid */}
                        <Col xs={24} md={14}>
                          <Row gutter={[12, 12]}>
                            <Col span={12}>
                              <div style={{ background: "#f8fafc", borderRadius: 10, padding: 12, border: "1px solid #f1f5f9" }}>
                                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Số câu hỏi</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                                  <span style={{ fontSize: 16 }}>❓</span>
                                  {examData ? examData.questions.length : 25}
                                </div>
                              </div>
                            </Col>

                            <Col span={12}>
                              <div style={{ background: "#f8fafc", borderRadius: 10, padding: 12, border: "1px solid #f1f5f9" }}>
                                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Thời gian làm bài</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginTop: 4, display: "flex", alignItems: "center", gap: 4, justifyContent: "space-between", flexWrap: "wrap" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ fontSize: 16 }}>⏱️</span>
                                    {examData ? `${examData.duration}:00` : "30:00"}
                                  </div>
                                  <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>(Tối đa)</span>
                                </div>
                              </div>
                            </Col>

                            <Col span={12}>
                              <div style={{ background: "#f8fafc", borderRadius: 10, padding: 12, border: "1px solid #f1f5f9" }}>
                                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Số lần tạm dừng</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                                  <span style={{ fontSize: 16 }}>⏸️</span>
                                  0/3
                                </div>
                              </div>
                            </Col>

                            <Col span={12}>
                              <div style={{ background: "#f8fafc", borderRadius: 10, padding: 12, border: "1px solid #f1f5f9" }}>
                                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Số lần làm bài</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                                  <span style={{ fontSize: 16 }}>🎬</span>
                                  {hasCompleted ? "1/10" : "0/10"}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Divider style={{ margin: "20px 0" }} />

                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          type="primary"
                          size="large"
                          onClick={() => {
                            setShowQuiz(true);
                            setTimeout(() => {
                              practiceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }, 100);
                          }}
                          style={{
                            background: "#f40c44",
                            borderColor: "#f40c44",
                            height: 48,
                            padding: "0 32px",
                            borderRadius: 24,
                            fontWeight: 700,
                            fontSize: 16,
                            boxShadow: "0 4px 14px rgba(244, 12, 68, 0.3)"
                          }}
                        >
                          {hasCompleted ? "Làm lại bài thi" : "Làm bài"}
                        </Button>
                      </div>
                    </div>

                    {/* More Practice Vocabulary Section */}
                    <div className="lp-card">
                      <h4 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px 0", color: "#1e293b" }}>
                        Ôn tập từ vựng trong đề
                      </h4>
                      <Space size="middle" wrap>
                        <Button 
                          style={{ 
                            height: 40, 
                            borderRadius: 20, 
                            borderColor: "#cbd5e1", 
                            fontWeight: 600, 
                            color: "#35a873", 
                            background: "#eff6ff",
                            display: "flex",
                            alignItems: "center",
                            gap: 8
                          }}
                        >
                          <span>EZ Vocab</span>
                          <span style={{ fontSize: 12, background: "#bfdbfe", padding: "2px 8px", borderRadius: 10, color: "#1e3a8a", fontWeight: 700 }}>
                            0% tiến độ
                          </span>
                        </Button>
                        <Button 
                          style={{ 
                            height: 40, 
                            borderRadius: 20, 
                            borderColor: "#cbd5e1", 
                            fontWeight: 600, 
                            color: "#475569" 
                          }}
                        >
                          Tập dịch thông minh
                        </Button>
                      </Space>
                    </div>

                    {/* Scenario Attach Documents */}
                    {lesson.documents && lesson.documents.length > 0 && (
                      <div className="lp-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                          <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#1e293b" }}>
                            Tài liệu đi kèm bài thi
                          </h4>
                          <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Tải về</span>
                        </div>
                        {lesson.documents.map((doc: any, idx: number) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", background: "#f8fafc", padding: "12px 16px", borderRadius: 8, border: "1px solid #f1f5f9", width: "100%", justifyContent: "space-between", marginBottom: idx < lesson.documents.length - 1 ? 8 : 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#35a873", cursor: "pointer", fontWeight: 500 }}>
                              <span style={{ textDecoration: "underline", fontSize: 14 }}>
                                {doc.name}
                              </span>
                            </div>
                            <Button 
                              type="text" 
                              icon={<DownloadOutlined style={{ color: "#3b82f6", fontSize: 18 }} />} 
                              style={{ padding: 0 }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Comments section */}
                    <div className="lp-card">
                      <DiscussionPanel lessonId={lesson.id} />
                    </div>
                  </div>
                )
              )}
            </div>

            {/* ── RIGHT: View selector + Playlist ── */}
            <div className={`lp-right-col${isDesktop ? " lp-right-sticky" : ""}`}>
              <div className="lp-card" style={{ marginBottom: 12 }}>
                {/* View mode tabs */}
                <ViewModeSelector />
              </div>
 
              {/* Playlist */}
              <LessonPlaylist currentLessonId={lesson.id} lessons={playlist} courseId={courseId} />
            </div>
          </div>
        </div>
        <Footer />
      </Content>
    </Layout>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={
      <Layout className="app-layout" style={{ background: "rgb(249, 245, 250)", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Spin size="large" description="Loading..." />
      </Layout>
    }>
      <LessonPageContent />
    </Suspense>
  );
}
