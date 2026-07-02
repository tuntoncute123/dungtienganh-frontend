"use client";

import React, { useState, useEffect } from "react";
import { Layout, Drawer, Grid } from "antd";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import GreetingSection from "@/components/GreetingSection";
import RecentLessonsWidget from "@/components/RecentLessonsWidget";
import StoryList from "@/components/StoryList";
import HonorBoard from "@/components/HonorBoard";
import TeacherIntro from "@/components/TeacherIntro";
import Footer from "@/components/Footer";

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

            {/* In Progress Lessons Widget */}
            <RecentLessonsWidget />

            {/* Story List */}
            <StoryList />

            {/* Bảng Vàng */}
            <HonorBoard />


            <TeacherIntro />
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </Content>
    </Layout>
  );
}
