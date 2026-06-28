"use client";

import React from "react";
import { Grid } from "antd";
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
        {/* Streak Badge — chỉ icon trên mobile */}
        <div className="streak-badge">
          <img src={ICONS.streak} alt="streak" style={{ width: 20, height: 24 }} />
          {!isMobile && <span className="streak-text">Khám phá streak</span>}
        </div>

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
    </header>
  );
}
