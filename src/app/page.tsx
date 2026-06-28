"use client";

import React, { useState, useEffect } from "react";
import { Layout, Drawer, Grid } from "antd";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import GreetingSection from "@/components/GreetingSection";
import DailyGoalCard from "@/components/DailyGoalCard";
import RecentLessonCard from "@/components/RecentLessonCard";
import StudyPlanCard from "@/components/StudyPlanCard";
import MyCoursesSection from "@/components/MyCoursesSection";
import TestPracticeCard from "@/components/TestPracticeCard";
import LearningProfile from "@/components/LearningProfile";
import StoryList from "@/components/StoryList";
import HonorBoard from "@/components/HonorBoard";
import TeacherIntro from "@/components/TeacherIntro";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const screens = useBreakpoint();
  const isDesktop = !!screens.lg;

  // Đóng drawer khi chuyển lên desktop
  useEffect(() => {
    if (isDesktop) setDrawerOpen(false);
  }, [isDesktop]);

  const handleMenuClick = () => {
    if (isDesktop) {
      setSidebarPinned((prev) => !prev);
    } else {
      setDrawerOpen(true);
    }
  };

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
          <AppSidebar />
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
        <AppSidebar />
      </Drawer>

      {/* Main Content */}
      <Content className="app-content">
        <div className="main-scroll">
          <div className="content-wrapper">
            {/* Greeting */}
            <GreetingSection />

            {/* Story List */}
            <StoryList />

            {/* Bảng Vàng */}
            <HonorBoard />

            {/* Two-column layout dùng Ant Design breakpoint */}
            <div className="page-columns">
              {/* Left Column */}
              <div className="page-col-main">
                <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                  {/* Daily Goal */}
                  <DailyGoalCard />

                  {/* Recent Lesson */}
                  <div>
                    <p className="section-title" style={{ marginBottom: 20 }}>
                      Bài học gần nhất
                    </p>
                    <RecentLessonCard />
                  </div>

                  {/* Study Plan */}
                  <div>
                    <p className="section-title" style={{ marginBottom: 20 }}>
                      Study Plan
                    </p>
                    <StudyPlanCard />
                  </div>

                  {/* My Courses */}
                  <MyCoursesSection />

                  {/* Test Practice */}
                  <div>
                    <div className="section-header">
                      <p className="section-title">Test Practice</p>
                      <p className="section-link">Xem tất cả</p>
                    </div>
                    <TestPracticeCard />
                  </div>
                </div>
              </div>

              {/* Right Column — Learning Profile */}
              <div className="page-col-side">
                <LearningProfile />
              </div>
            </div>

            {/* Giới thiệu giáo viên */}
            <TeacherIntro />
          </div>
        </div>
      </Content>
    </Layout>
  );
}
