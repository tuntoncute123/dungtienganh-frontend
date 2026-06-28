"use client";

import React, { useState } from "react";
import { Grid, Popover, Modal, Button, message } from "antd";
import Link from "next/link";

const { useBreakpoint } = Grid;

const ICONS = {
  menu: "/assets/1a44982fbf1eaacf09c8_5eae9335.svg",
  logo: "/logo.png",
  programIcon: "/assets/312127ec3e81c86b4825_e9dcfdde.svg",
  chevronDown: "/assets/1ceef3f6517e9ff843ac_d05eb16e.svg",
  streak: "/assets/8ba239a060b337b51758_3b5a2ca8.svg",
  bell: "/assets/3a3f0536d83aeaf2f911_cdc3298d.svg",
  avatar: "/assets/5d5e5c98f63a53979d76_3c61bd87.jpg",
};

interface AppHeaderProps {
  onMenuClick: () => void;
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  const screens = useBreakpoint();
  const isMobile = !screens.sm;
  const isTablet = screens.sm && !screens.lg;

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleShareStory = () => {
    setSharing(true);
    setTimeout(() => {
      setSharing(false);
      setShareModalOpen(false);
      message.success("Đăng lên Story thành công! 🌟 Chuỗi ngày học của bạn đã được hiển thị trên bảng tin.");
    }, 1500);
  };

  const streakPopoverContent = (
    <div className="streak-dropdown-container">
      {/* 3D Fire icon */}
      <div className="streak-fire-wrapper">
        <img 
          src="https://g-static-assets.prepcdn.com/learning-web-app/v20260626.0810-6b85ce86/_nuxt/692b2b15_6b85ce86_20260626.0810.png" 
          alt="fire icon" 
          className="streak-fire-img"
        />
      </div>

      <h2 className="streak-count-title">22 Ngày Liên Tiếp</h2>
      <p className="streak-sub-title">Giữ chuỗi thật lâu, hiểu biết thêm sâu</p>

      {/* Rules */}
      <div className="streak-rules-list">
        <div className="streak-rule-item">
          <div className="streak-rule-number">1</div>
          <p className="streak-rule-text">Hoàn thành ít nhất một nhiệm vụ</p>
        </div>
        <div className="streak-rule-item">
          <div className="streak-rule-number">2</div>
          <p className="streak-rule-text">Duy trì chuỗi ngày bằng việc luyện tập mỗi ngày</p>
        </div>
        <div className="streak-rule-item">
          <div className="streak-rule-number">3</div>
          <p className="streak-rule-text">Mở khóa các cột mốc mới theo tiến độ</p>
        </div>
      </div>

      {/* Badges/Milestones */}
      <div className="streak-milestones-section">
        <div className="streak-milestones-title">Cột mốc huy hiệu</div>
        <div className="streak-badges-grid">
          {/* Milestone 10: Unlocked */}
          <div className="streak-badge-card unlocked">
            <span className="streak-badge-icon">🥉</span>
            <span className="streak-badge-target">10 Ngày</span>
            <span className="streak-badge-status">Đã đạt</span>
            <span className="streak-lock-status-dot">✅</span>
          </div>

          {/* Milestone 50: Locked */}
          <div className="streak-badge-card locked">
            <span className="streak-badge-icon">🥈</span>
            <span className="streak-badge-target">50 Ngày</span>
            <span className="streak-badge-status">22/50 ngày</span>
            <span className="streak-lock-status-dot">🔒</span>
          </div>

          {/* Milestone 100: Locked */}
          <div className="streak-badge-card locked">
            <span className="streak-badge-icon">🥇</span>
            <span className="streak-badge-target">100 Ngày</span>
            <span className="streak-badge-status">22/100 ngày</span>
            <span className="streak-lock-status-dot">🔒</span>
          </div>
        </div>
      </div>

      {/* Share button */}
      <Button 
        type="primary" 
        className="streak-share-btn"
        onClick={() => {
          setPopoverOpen(false);
          setShareModalOpen(true);
        }}
      >
        Chia sẻ lên Story 🚀
      </Button>
    </div>
  );

  return (
    <header className="app-header">
      {/* Left Section */}
      <div className="header-left">
        {/* Hamburger / Menu Button */}
        <button
          className="menu-trigger-btn"
          onClick={onMenuClick}
          aria-label="Mở menu"
          style={{ flexShrink: 0 }}
        >
          <img src={ICONS.menu} alt="menu" style={{ width: 20, height: 20 }} />
        </button>

        {/* Logo */}
        <Link href="/" style={{ display: "block", marginLeft: 16, cursor: "pointer" }}>
          <div style={{ overflow: "hidden", height: 30, flexShrink: 0 }}>
            <img src={ICONS.logo} alt="logo-prep" className="logo-img" />
          </div>
        </Link>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Streak Badge with Popover */}
        <Popover
          content={streakPopoverContent}
          trigger="click"
          placement="bottomRight"
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          overlayClassName="streak-popover"
        >
          <div className="streak-badge">
            <img src={ICONS.streak} alt="streak" style={{ width: 20, height: 24 }} />
            {!isMobile && <span className="streak-text">Khám phá streak</span>}
          </div>
        </Popover>

        {/* Notification Bell */}
        <button className="notification-btn" aria-label="Thông báo">
          <img src={ICONS.bell} alt="bell" style={{ width: 16, height: 16 }} />
          <span className="notif-badge">0</span>
        </button>

        {/* Avatar */}
        <div className="avatar-btn">
          <img src={ICONS.avatar} alt="avatar Huỳnh Tấn Toàn" />
        </div>
      </div>

      {/* Share to Story Modal */}
      <Modal
        open={shareModalOpen}
        onCancel={() => setShareModalOpen(false)}
        footer={null}
        width={380}
        centered
        styles={{ body: { padding: "24px 16px" } }}
      >
        <div className="streak-share-card-modal">
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#1e293b" }}>
            Chia sẻ thành tích
          </h3>
          
          {/* Card Preview */}
          <div className="streak-share-card-preview">
            <img src={ICONS.logo} alt="logo" className="streak-share-logo" />
            <div style={{ position: "relative", zIndex: 2 }}>
              <img src={ICONS.avatar} alt="avatar" className="streak-share-avatar" />
              <h4 className="streak-share-username">Huỳnh Tấn Toàn</h4>
              <div className="streak-share-badge-tag">Huy hiệu Đồng 🥉</div>
              
              <div className="streak-share-count-number">22</div>
              <div className="streak-share-count-label">Ngày Học Liên Tiếp 🔥</div>
              
              <p className="streak-share-footer-text">
                "Giữ chuỗi thật lâu, hiểu biết thêm sâu"
              </p>
            </div>
          </div>

          <Button 
            type="primary" 
            loading={sharing}
            onClick={handleShareStory}
            style={{ 
              width: "100%", 
              height: 40, 
              borderRadius: 20, 
              fontWeight: 700, 
              background: "linear-gradient(135deg, #ff9305 0%, #ff5e00 100%)", 
              border: "none",
              boxShadow: "0 4px 10px rgba(255, 94, 0, 0.2)"
            }}
          >
            Đăng ngay lên Story
          </Button>
        </div>
      </Modal>
    </header>
  );
}
