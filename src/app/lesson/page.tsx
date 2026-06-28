"use client";

import React, { useState } from "react";
import { Layout, Grid, Drawer, Breadcrumb } from "antd";
import { MenuOutlined, HomeOutlined } from "@ant-design/icons";
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

export default function LessonPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const screens = useBreakpoint();
  const isDesktop = !!screens.lg;

  const handleMenuClick = () => {
    if (isDesktop) {
      setSidebarPinned((prev) => !prev);
    } else {
      setDrawerOpen(true);
    }
  };

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
                { title: <Link href="/lesson" style={{ color: "inherit" }}>CHUYÊN ĐỀ 01: TỪ LOẠI | LÝ THUYẾT TRỌNG TÂM VÀ ỨNG DỤNG</Link> },
                {
                  title: (
                    <span style={{ color: "#f40c44" }}>Từ loại (Lý thuyết - Buổi 1)</span>
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
                title="Từ loại (Lý thuyết - Buổi 1)"
                remainingViews={10}
                totalViews={10}
                duration="55:40"
                quizPoints={QUIZ_POINTS}
              />

              {/* Homework */}
              <div className="lp-homework-bar">
                <span className="lp-homework-label">Nhiệm vụ sau buổi học:</span>
                <div className="lp-homework-tasks">
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
                <DiscussionPanel />
              </div>

              {/* Playlist */}
              <LessonPlaylist />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
