"use client";

import React, { useState } from "react";
import {
  HomeOutlined,
  ReadOutlined,
  FileTextOutlined,
  BankOutlined,
  ThunderboltOutlined,
  BookOutlined,
  UserOutlined,
  RocketOutlined,
} from "@ant-design/icons";

import Link from "next/link";

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    key: "home",
    label: "Trang chủ",
    icon: <HomeOutlined />,
  },
  {
    key: "my-courses",
    label: "Khóa học của tôi",
    icon: <ReadOutlined />,
  },
  {
    key: "practice",
    label: "Luyện đề",
    icon: <FileTextOutlined />,
  },
  {
    key: "school-exams",
    label: "Đề Trường - Sở",
    icon: <BankOutlined />,
  },
  {
    key: "flashcard",
    label: "Flash Card",
    icon: <ThunderboltOutlined />,
  },
  {
    key: "reading",
    label: "Luyện Reading",
    icon: <BookOutlined />,
  },
  {
    key: "profile",
    label: "Hồ sơ cá nhân",
    icon: <UserOutlined />,
  },
];

interface AppSidebarProps {
  activeKey?: string;
}

function ReadingSidebarItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/reading"
      onClick={(e) => {
        e.preventDefault();
      }}
      style={{ textDecoration: "none", color: "inherit", cursor: "not-allowed" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`nav-item${isActive ? " active" : ""}`}
        style={{
          cursor: "not-allowed",
          color: hovered ? "#8a8a8e" : undefined,
          backgroundColor: hovered ? "#f4f4f5" : undefined,
        }}
      >
        <span className="nav-item-icon">{item.icon}</span>
        <span className="nav-item-label">
          {hovered ? "Sắp ra mắt" : item.label}
        </span>
      </div>
    </Link>
  );
}

export default function AppSidebar({ activeKey = "home" }: AppSidebarProps) {
  return (
    <nav className="sidebar-nav">
      {/* Navigation Items */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeKey;
          
          if (item.key === "reading") {
            return (
              <ReadingSidebarItem key={item.key} item={item} isActive={isActive} />
            );
          }

          const href = item.key === "home" ? "/" : `/${item.key}`;
          return (
            <Link
              key={item.key}
              href={href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className={`nav-item${isActive ? " active" : ""}`}>
                <span className="nav-item-icon">{item.icon}</span>
                <span className="nav-item-label">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA Button — Thi thử Ngay */}
      <Link href="/mock-test" className="sidebar-cta-btn" style={{ textDecoration: "none" }}>
        <RocketOutlined style={{ fontSize: 16 }} />
        <span>Thi thử Ngay</span>
      </Link>
    </nav>
  );
}
