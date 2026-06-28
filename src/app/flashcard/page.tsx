"use client";

import React, { useState } from "react";
import { Layout, Grid, Drawer } from "antd";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import FlashcardPageContent from "@/components/flashcard/FlashcardPageContent";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export default function FlashcardPage() {
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
    <Layout className="app-layout">
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
          <AppSidebar activeKey="flashcard" />
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
        <AppSidebar activeKey="flashcard" />
      </Drawer>

      {/* ── Main Content ── */}
      <Content className="app-content">
        <div className="main-scroll">
          <div className="content-wrapper" style={{ padding: "20px" }}>
            <FlashcardPageContent />
          </div>
        </div>
      </Content>
    </Layout>
  );
}
