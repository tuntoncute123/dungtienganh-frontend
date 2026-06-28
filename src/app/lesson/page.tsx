"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Layout, Grid, Drawer, Breadcrumb, Spin } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import VideoPlayer from "@/components/lesson/VideoPlayer";
import LessonDocuments from "@/components/lesson/LessonDocuments";
import DiscussionPanel from "@/components/lesson/DiscussionPanel";
import LessonPlaylist from "@/components/lesson/LessonPlaylist";
import ViewModeSelector from "@/components/lesson/ViewModeSelector";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const QUIZ_POINTS = [
  { label: "Quiz 1 41:26", percent: 74.4 },
  { label: "Quiz 2 43:39", percent: 78.4 },
  { label: "Quiz 3 49:43", percent: 89.3 },
];

const DOCUMENTS = [
  {
    name: "[ Cô Vũ Mai Phương ] Từ loại (Lý thuyết - Buổi 1)_ Danh từ.pdf",
    url: "#",
  },
];

const HOMEWORK_TASKS = ["EZ Vocab"];

function LessonPageContent() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const screens = useBreakpoint();
  const isDesktop = !!screens.lg;

  const searchParams = useSearchParams();
  const router = useRouter();
  const lessonId = searchParams.get("id") || "1";

  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/lessons?id=${lessonId}`);
        if (res.ok) {
          const data = await res.json();
          setLesson(data);
        } else {
          // If not found, fallback to list and load the first one
          const listRes = await fetch(`${API_BASE_URL}/api/lessons`);
          if (listRes.ok) {
            const listData = await listRes.json();
            if (listData.length > 0) {
              setLesson(listData[0]);
            }
          }
        }
      } catch (e) {
        console.error("Lỗi khi tải bài học:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [lessonId]);

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
                { title: <Link href="/my-courses" style={{ color: "inherit" }}>Ngữ pháp Ứng dụng (2027)</Link> },
                { title: <span style={{ color: "inherit" }}>CHUYÊN ĐỀ 01: TỪ LOẠI | LÝ THUYẾT TRỌNG TÂM VÀ ỨNG DỤNG</span> },
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
            {/* ── LEFT: Video + docs + homework ── */}
            <div className="lp-left-col">
              {/* Video Player */}
              <VideoPlayer
                title={lesson.title}
                remainingViews={10}
                totalViews={10}
                duration={lesson.duration}
                quizPoints={QUIZ_POINTS}
              />

              {/* Homework */}
              <div className="lp-homework-bar">
                <span className="lp-homework-label">Nhiệm vụ sau buổi học:</span>
                <div className="lp-homework-tasks" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {lesson.exerciseId && (
                    <Link href={`/progress-test?id=${lesson.exerciseId}`}>
                      <button className="lp-homework-task-btn" style={{ background: "#0071f9", color: "#ffffff", borderColor: "#0071f9", fontWeight: "600" }}>
                        📝&nbsp;&nbsp;Làm bài tập ôn luyện đính kèm
                      </button>
                    </Link>
                  )}
                  {HOMEWORK_TASKS.map((task) => (
                    <button key={task} className="lp-homework-task-btn">
                      📖&nbsp;&nbsp;{task}
                    </button>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="lp-card" style={{ marginTop: 12 }}>
                <LessonDocuments documents={DOCUMENTS} />
              </div>
            </div>

            {/* ── RIGHT: View selector + Discussion + Playlist ── */}
            <div className={`lp-right-col${isDesktop ? " lp-right-sticky" : ""}`}>
              <div className="lp-card" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                {/* View mode tabs */}
                <ViewModeSelector />

                {/* Discussion */}
                <DiscussionPanel lessonId={lesson.id} />
              </div>

              {/* Playlist */}
              <LessonPlaylist currentLessonId={lesson.id} />
            </div>
          </div>
        </div>
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
