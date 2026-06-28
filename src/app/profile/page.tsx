"use client";

import React, { useState } from "react";
import { Layout, Grid, Drawer } from "antd";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import styles from "@/components/profile/profile.module.css";

const { Content } = Layout;
const { useBreakpoint } = Grid;

// Custom Circular Progress SVG Component
interface CircularProgressProps {
  percent: number;
  color: string;
  size?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percent, color, size = 42 }) => {
  const radius = size * 0.38;
  const strokeWidth = size * 0.08;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="rgba(163, 172, 194, 0.12)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.35s ease" }}
      />
      <text
        x="50%"
        y="50%"
        fill="#1c2a4c"
        fontSize={size * 0.22}
        fontWeight="800"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ transform: `rotate(90deg) translate(0px, 0.5px)`, transformOrigin: "center" }}
      >
        {percent}%
      </text>
    </svg>
  );
};

// SVG Line Charts
const WeekChart: React.FC = () => (
  <svg width="100%" height="240" viewBox="0 0 800 240" preserveAspectRatio="none" style={{ overflow: "visible" }}>
    {/* Grid lines */}
    <line x1="50" y1="30" x2="750" y2="30" stroke="#f3f4f6" strokeWidth="1" />
    <line x1="50" y1="70" x2="750" y2="70" stroke="#f3f4f6" strokeWidth="1" />
    <line x1="50" y1="110" x2="750" y2="110" stroke="#f3f4f6" strokeWidth="1" />
    <line x1="50" y1="150" x2="750" y2="150" stroke="#f3f4f6" strokeWidth="1" />
    <line x1="50" y1="190" x2="750" y2="190" stroke="#e5e7eb" strokeWidth="1.5" />

    {/* Y Axis labels */}
    <text x="35" y="34" fill="#a3acc2" fontSize="11" textAnchor="end">100%</text>
    <text x="35" y="74" fill="#a3acc2" fontSize="11" textAnchor="end">80%</text>
    <text x="35" y="114" fill="#a3acc2" fontSize="11" textAnchor="end">60%</text>
    <text x="35" y="154" fill="#a3acc2" fontSize="11" textAnchor="end">40%</text>
    <text x="35" y="194" fill="#a3acc2" fontSize="11" textAnchor="end">20%</text>

    {/* X Axis labels */}
    <text x="70" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T2</text>
    <text x="180" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T3</text>
    <text x="290" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T4</text>
    <text x="400" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T5</text>
    <text x="510" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T6</text>
    <text x="620" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T7</text>
    <text x="730" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">CN</text>

    {/* Curves */}
    {/* Flashcard (Green) */}
    <path
      d="M 70 150 L 180 160 L 290 120 L 400 90 L 510 70 L 620 50 L 730 40"
      fill="none"
      stroke="rgb(34, 197, 94)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Lý thuyết (Orange) */}
    <path
      d="M 70 190 L 180 180 L 290 170 L 400 150 L 510 120 L 620 100 L 730 80"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Bài tập (Blue) */}
    <path
      d="M 70 110 L 180 100 L 290 90 L 400 80 L 510 60 L 620 50 L 730 50"
      fill="none"
      stroke="rgb(59, 130, 246)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Kiểm tra (Purple) */}
    <path
      d="M 70 170 L 180 150 L 290 160 L 400 130 L 510 110 L 620 90 L 730 76"
      fill="none"
      stroke="rgb(139, 92, 246)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Data point circles for CN */}
    <circle cx="730" cy="40" r="5" fill="rgb(34, 197, 94)" stroke="#fff" strokeWidth="2" />
    <circle cx="730" cy="80" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
    <circle cx="730" cy="50" r="5" fill="rgb(59, 130, 246)" stroke="#fff" strokeWidth="2" />
    <circle cx="730" cy="76" r="5" fill="rgb(139, 92, 246)" stroke="#fff" strokeWidth="2" />
  </svg>
);

const MonthChart: React.FC = () => (
  <svg width="100%" height="240" viewBox="0 0 800 240" preserveAspectRatio="none" style={{ overflow: "visible" }}>
    {/* Grid lines */}
    <line x1="50" y1="30" x2="750" y2="30" stroke="#f3f4f6" strokeWidth="1" />
    <line x1="50" y1="70" x2="750" y2="70" stroke="#f3f4f6" strokeWidth="1" />
    <line x1="50" y1="110" x2="750" y2="110" stroke="#f3f4f6" strokeWidth="1" />
    <line x1="50" y1="150" x2="750" y2="150" stroke="#f3f4f6" strokeWidth="1" />
    <line x1="50" y1="190" x2="750" y2="190" stroke="#e5e7eb" strokeWidth="1.5" />

    {/* Y Axis labels */}
    <text x="35" y="34" fill="#a3acc2" fontSize="11" textAnchor="end">100%</text>
    <text x="35" y="74" fill="#a3acc2" fontSize="11" textAnchor="end">80%</text>
    <text x="35" y="114" fill="#a3acc2" fontSize="11" textAnchor="end">60%</text>
    <text x="35" y="154" fill="#a3acc2" fontSize="11" textAnchor="end">40%</text>
    <text x="35" y="194" fill="#a3acc2" fontSize="11" textAnchor="end">20%</text>

    {/* X Axis labels */}
    <text x="137.5" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">Tuần 1</text>
    <text x="312.5" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">Tuần 2</text>
    <text x="487.5" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">Tuần 3</text>
    <text x="662.5" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">Tuần 4</text>

    {/* Curves */}
    {/* Flashcard (Green) */}
    <path
      d="M 137.5 150 L 312.5 120 L 487.5 80 L 662.5 50"
      fill="none"
      stroke="rgb(34, 197, 94)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Lý thuyết (Orange) */}
    <path
      d="M 137.5 180 L 312.5 160 L 487.5 110 L 662.5 82"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Bài tập (Blue) */}
    <path
      d="M 137.5 120 L 312.5 100 L 487.5 70 L 662.5 46"
      fill="none"
      stroke="rgb(59, 130, 246)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Kiểm tra (Purple) */}
    <path
      d="M 137.5 160 L 312.5 140 L 487.5 90 L 662.5 70"
      fill="none"
      stroke="rgb(139, 92, 246)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Data points for Week 4 */}
    <circle cx="662.5" cy="50" r="5" fill="rgb(34, 197, 94)" stroke="#fff" strokeWidth="2" />
    <circle cx="662.5" cy="82" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
    <circle cx="662.5" cy="46" r="5" fill="rgb(59, 130, 246)" stroke="#fff" strokeWidth="2" />
    <circle cx="662.5" cy="70" r="5" fill="rgb(139, 92, 246)" stroke="#fff" strokeWidth="2" />
  </svg>
);

export default function ProfilePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const screens = useBreakpoint();
  const isDesktop = !!screens.lg;

  // State selectors
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("week");
  const [progressView, setProgressView] = useState<"week" | "month">("week");
  const [historyTab, setHistoryTab] = useState<"quiz" | "flashcard" | "test">("quiz");

  const handleMenuClick = () => {
    if (isDesktop) {
      setSidebarPinned((prev) => !prev);
    } else {
      setDrawerOpen(true);
    }
  };

  // Stats data mapping based on selected timeframe
  const getStats = (tf: "week" | "month" | "all") => {
    switch (tf) {
      case "month":
        return {
          timeframeLabel: "Tháng này",

          // Flashcard
          flashcardVal: "240",
          flashcardTotal: "300",
          flashcardPercent: 80,
          flashcardAccuracy: 88,
          flashcardNew: "+ 110 từ mới",

          // Lý thuyết
          theoryVal: "18",
          theoryTotal: "24",
          theoryPercent: 75,
          theoryAccuracy: 82,
          theoryNew: "+ 12 video mới",

          // Bài tập
          hwVal: "38",
          hwTotal: "45",
          hwPercent: 84,
          hwAccuracy: 92,
          hwAvgScore: "8.7 điểm TB",

          // Kiểm tra
          testVal: "8.5",
          testMax: "10",
          testAttempts: "12 lần thi",
          testPercent: 85,

          // Giữ chuỗi
          streakVal: "22",
          streakMax: "22",
          streakProgress: "22/30 ngày tháng này",
          streakPercent: 73,
        };
      case "all":
        return {
          timeframeLabel: "Tổng",

          // Flashcard
          flashcardVal: "850",
          flashcardTotal: "1000",
          flashcardPercent: 85,
          flashcardAccuracy: 90,
          flashcardNew: "+ 850 từ thuộc",

          // Lý thuyết
          theoryVal: "94",
          theoryTotal: "120",
          theoryPercent: 78,
          theoryAccuracy: 85,
          theoryNew: "+ 94 video",

          // Bài tập
          hwVal: "182",
          hwTotal: "200",
          hwPercent: 91,
          hwAccuracy: 94,
          hwAvgScore: "8.9 điểm TB",

          // Kiểm tra
          testVal: "8.8",
          testMax: "10",
          testAttempts: "45 lần thi",
          testPercent: 88,

          // Giữ chuỗi
          streakVal: "58",
          streakMax: "58",
          streakProgress: "58/94 ngày học",
          streakPercent: 62,
        };
      case "week":
      default:
        return {
          timeframeLabel: "Tuần này",

          // Flashcard
          flashcardVal: "120",
          flashcardTotal: "300",
          flashcardPercent: 40,
          flashcardAccuracy: 85,
          flashcardNew: "+ 25 từ mới",

          // Lý thuyết
          theoryVal: "6",
          theoryTotal: "24",
          theoryPercent: 25,
          theoryAccuracy: 75,
          theoryNew: "+ 3 video mới",

          // Bài tập
          hwVal: "12",
          hwTotal: "15",
          hwPercent: 80,
          hwAccuracy: 90,
          hwAvgScore: "8.5 điểm TB",

          // Kiểm tra
          testVal: "8.2",
          testMax: "10",
          testAttempts: "3 lần thi",
          testPercent: 82,

          // Giữ chuỗi
          streakVal: "5",
          streakMax: "15",
          streakProgress: "5/6 ngày tuần này",
          streakPercent: 83,
        };
    }
  };

  const stats = getStats(timeframe);

  // Heatmap generation
  const heatmapCells = [
    0, 1, 3, 2, 0, 4, 1, // Tuần 1
    2, 0, 1, 3, 4, 0, 2, // Tuần 2
    0, 2, 4, 1, 3, 0, 1, // Tuần 3
    3, 1, 0, 2, 4, 3, 0, // Tuần 4
    1, 4, 2, 0, 1, 3, 2, // Tuần 5
    0, 2, 3, 4, 1, 0, 3, // Tuần 6
    2, 1, 0, 3, 4, 2, 0, // Tuần 7
    0, 3, 4, 1, 2, 0, 1, // Tuần 8
    2, 0, 1, 3, 4, 2, 0, // Tuần 9
    1, 2, 0, 4, 3, 1, 2, // Tuần 10
    0, 3, 4, 1, 2, 0, 3, // Tuần 11
    1, 2, 0, 3, 4, 1, 2, // Tuần 12
    0, 1, 3, 2, 0, 4, 2, // Tuần 13
    1, 2, 0, 3, 4, 0, 0, // Tuần 14
  ];

  const totalTrackedDays = 94;
  const activeDaysCount = heatmapCells.filter(level => level > 0).slice(0, totalTrackedDays).length;
  const activePercentage = Math.round((activeDaysCount / totalTrackedDays) * 100);

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
          <AppSidebar activeKey="profile" />
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
        <AppSidebar activeKey="profile" />
      </Drawer>

      {/* ── Main Content ── */}
      <Content className="app-content">
        <div className="main-scroll">
          <div className={styles.profileContainer}>

            {/* Header section with title and timeframe toggles */}
            <div className={styles.sectionHeader} style={{ padding: "0 40px" }}>
              <div className={styles.headerTitleWrapper}>
                <h1 className={styles.headerTitle}>
                  <span className={styles.headerIcon}>
                    <img
                      src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F824224ad4e901f82afd54697b35bda2f87f77fe5.svg?generation=1782490146257559&alt=media"
                      alt="Portfolio Icon"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </span>
                  Hồ sơ học tập
                </h1>
                <p className={styles.headerSubtitle}>{stats.timeframeLabel}</p>
              </div>
              <div className={styles.toggleWrapper}>
                <button
                  onClick={() => setTimeframe("week")}
                  className={`${styles.toggleBtn} ${timeframe === "week" ? styles.toggleBtnActive : ""}`}
                >
                  Tuần này
                </button>
                <button
                  onClick={() => setTimeframe("month")}
                  className={`${styles.toggleBtn} ${timeframe === "month" ? styles.toggleBtnActive : ""}`}
                >
                  Tháng này
                </button>
                <button
                  onClick={() => setTimeframe("all")}
                  className={`${styles.toggleBtn} ${timeframe === "all" ? styles.toggleBtnActive : ""}`}
                >
                  Tổng
                </button>
              </div>
            </div>

            {/* Main dashboard content */}
            <div style={{ padding: "0 40px" }}>



              {/* Stats Cards Grid (5 metrics) */}
              <div className={styles.statsGrid}>

                {/* 1. Flashcard Card */}
                <div
                  className={styles.statCard}
                  style={{
                    backgroundImage: "linear-gradient(to right bottom, rgb(255, 255, 255), rgba(236, 253, 245, 0.5))",
                    borderColor: "rgba(167, 243, 208, 0.6)"
                  }}
                >
                  <div className={styles.cardBgCircle} style={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrap} style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", outline: "1px solid rgba(16, 185, 129, 0.2)" }}>
                        <img
                          className={styles.cardIcon}
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa82e906a88512982e235ea24f08d1371e5c66278.svg?generation=1782490146256461&alt=media"
                          alt="Flashcard"
                        />
                      </div>
                      <span className={styles.cardTitle}>Flashcard</span>
                    </div>
                    <div className={styles.cardValueRow}>
                      <span className={styles.cardValue} style={{ color: "rgb(16, 185, 129)" }}>
                        {stats.flashcardVal}
                        <span style={{ fontSize: 16, fontWeight: "normal", color: "#a3acc2", marginLeft: 4 }}>/{stats.flashcardTotal}</span>
                      </span>
                    </div>
                    <p className={styles.cardLabel} style={{ marginTop: 4, minHeight: 20 }}>từ đã thuộc</p>
                    <div className={styles.cardSubBlock} style={{ marginTop: 12 }}>
                      <CircularProgress percent={stats.flashcardPercent} color="rgb(16, 185, 129)" />
                      <div className={styles.miniChartText}>
                        <p><span style={{ fontWeight: "bold", color: "rgb(5, 150, 105)" }}>{stats.flashcardAccuracy}%</span> chính xác</p>
                        <p style={{ marginTop: 2, fontSize: 11 }}>{stats.flashcardNew}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Lý thuyết Card */}
                <div
                  className={styles.statCard}
                  style={{
                    backgroundImage: "linear-gradient(to right bottom, rgb(255, 255, 255), rgba(255, 251, 235, 0.5))",
                    borderColor: "rgba(245, 158, 11, 0.3)"
                  }}
                >
                  <div className={styles.cardBgCircle} style={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrap} style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", outline: "1px solid rgba(245, 158, 11, 0.2)", color: "#f59e0b" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: "block" }}>
                          <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                        </svg>
                      </div>
                      <span className={styles.cardTitle}>Lý thuyết</span>
                    </div>
                    <div className={styles.cardValueRow}>
                      <span className={styles.cardValue} style={{ color: "#f59e0b" }}>
                        {stats.theoryVal}
                        <span style={{ fontSize: 16, fontWeight: "normal", color: "#a3acc2", marginLeft: 4 }}>/{stats.theoryTotal}</span>
                      </span>
                    </div>
                    <p className={styles.cardLabel} style={{ marginTop: 4, minHeight: 20 }}>video đã xem</p>
                    <div className={styles.cardSubBlock} style={{ marginTop: 12 }}>
                      <CircularProgress percent={stats.theoryPercent} color="#f59e0b" />
                      <div className={styles.miniChartText}>
                        <p><span style={{ fontWeight: "bold", color: "#d97706" }}>{stats.theoryAccuracy}%</span> hoàn thành</p>
                        <p style={{ marginTop: 2, fontSize: 11 }}>{stats.theoryNew}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Bài tập Card */}
                <div
                  className={styles.statCard}
                  style={{
                    backgroundImage: "linear-gradient(to right bottom, rgb(255, 255, 255), rgba(138, 180, 248, 0.1))",
                    borderColor: "rgba(138, 180, 248, 0.4)"
                  }}
                >
                  <div className={styles.cardBgCircle} style={{ backgroundColor: "rgba(66, 133, 244, 0.05)" }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrap} style={{ backgroundColor: "rgba(66, 133, 244, 0.1)", outline: "1px solid rgba(66, 133, 244, 0.2)", color: "rgb(66, 133, 244)" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: "block" }}>
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                      </div>
                      <span className={styles.cardTitle}>Bài tập</span>
                    </div>
                    <div className={styles.cardValueRow}>
                      <span className={styles.cardValue} style={{ color: "rgb(66, 133, 244)" }}>
                        {stats.hwVal}
                        <span style={{ fontSize: 16, fontWeight: "normal", color: "#a3acc2", marginLeft: 4 }}>/{stats.hwTotal}</span>
                      </span>
                    </div>
                    <p className={styles.cardLabel} style={{ marginTop: 4, minHeight: 20 }}>bài tập đã làm</p>
                    <div className={styles.cardSubBlock} style={{ marginTop: 12 }}>
                      <CircularProgress percent={stats.hwPercent} color="rgb(66, 133, 244)" />
                      <div className={styles.miniChartText}>
                        <p><span style={{ fontWeight: "bold", color: "rgb(26, 86, 219)" }}>{stats.hwAccuracy}%</span> đúng hạn</p>
                        <p style={{ marginTop: 2, fontSize: 11 }}>{stats.hwAvgScore}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Kiểm tra Card */}
                <div
                  className={styles.statCard}
                  style={{
                    backgroundImage: "linear-gradient(to right bottom, rgb(255, 255, 255), rgba(245, 243, 255, 0.5))",
                    borderColor: "rgba(221, 214, 254, 0.6)"
                  }}
                >
                  <div className={styles.cardBgCircle} style={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrap} style={{ backgroundColor: "rgba(139, 92, 246, 0.1)", outline: "1px solid rgba(139, 92, 246, 0.2)" }}>
                        <img
                          className={styles.cardIcon}
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fee0df2cb7a67b753b9de85b630b3f5ea567a17e5.svg?generation=1782490146283126&alt=media"
                          alt="Test"
                        />
                      </div>
                      <span className={styles.cardTitle}>Kiểm tra</span>
                    </div>
                    <div className={styles.cardValueRow}>
                      <span className={styles.cardValue} style={{ color: "rgb(139, 92, 246)" }}>
                        {stats.testVal}
                        <span style={{ fontSize: 16, fontWeight: "normal", color: "#a3acc2", marginLeft: 4 }}>/{stats.testMax}</span>
                      </span>
                    </div>
                    <p className={styles.cardLabel} style={{ marginTop: 4, minHeight: 20 }}>điểm trung bình</p>
                    <div className={styles.cardSubBlock} style={{ marginTop: 12 }}>
                      <CircularProgress percent={stats.testPercent} color="rgb(139, 92, 246)" />
                      <div className={styles.miniChartText}>
                        <p><span style={{ fontWeight: "bold", color: "rgb(109, 40, 217)" }}>{stats.testAttempts}</span></p>
                        <p style={{ marginTop: 2, fontSize: 11 }}>Cao nhất: <span style={{ fontWeight: "bold", color: "rgb(139, 92, 246)" }}>{stats.testVal}</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Giữ chuỗi Card */}
                <div
                  className={styles.statCard}
                  style={{
                    backgroundImage: "linear-gradient(to right bottom, rgb(255, 255, 255), rgba(255, 247, 237, 0.6))",
                    borderColor: "rgba(242, 133, 0, 0.3)"
                  }}
                >
                  <div className={styles.cardBgCircle} style={{ backgroundColor: "rgba(242, 133, 0, 0.05)" }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrap} style={{ backgroundColor: "rgba(242, 133, 0, 0.1)", outline: "1px solid rgba(242, 133, 0, 0.2)" }}>
                        <img
                          className={styles.cardIcon}
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fcbf19fd8a42b770b4815394d8533242753856c7b.svg?generation=1782490146287234&alt=media"
                          alt="Streak"
                        />
                      </div>
                      <span className={styles.cardTitle}>Giữ chuỗi</span>
                    </div>
                    <div className={styles.cardValueRow} style={{ alignItems: "center", gap: 6 }}>
                      <div style={{ width: 28, height: 28 }}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc50fd3641da93f6252e941b5221653334b77025e.svg?generation=1782490146314135&alt=media"
                          alt="Streak Flame"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                      <span className={styles.cardValue} style={{ color: "rgb(242, 133, 0)" }}>{stats.streakVal}</span>
                    </div>
                    <p className={styles.cardLabel} style={{ marginTop: 4, minHeight: 20 }}>chuỗi ngày học</p>
                    <div className={styles.cardSubBlock} style={{ marginTop: 12 }}>
                      <CircularProgress percent={stats.streakPercent} color="rgb(242, 133, 0)" />
                      <div className={styles.miniChartText}>
                        <p>Dài nhất: <span style={{ fontWeight: "bold", color: "rgb(28, 42, 76)" }}>{stats.streakMax}</span> ngày</p>
                        <p style={{ marginTop: 2, fontSize: 11 }}>{stats.streakProgress}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Custom Dashboard - Target & Exam Schedule */}
              <div id="dashboard" className={styles.dashboardWrapper}><div className={styles.dashboardHeader}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><path fill="#80D48F" fillRule="evenodd" d="M.5 10.926v.149c0 2.175 0 3.91.183 5.27.189 1.405.589 2.559 1.501 3.47.913.913 2.066 1.313 3.47 1.502A.306.306 0 0 0 6 21.011V10c0-.471 0-.707-.146-.854C5.707 9 5.47 9 5 9H1.496c-.467 0-.701 0-.848.146-.146.146-.147.379-.147.845zm21-.935c-.002-.466-.002-.699-.148-.845C21.205 9 20.972 9 20.504 9H9c-.471 0-.707 0-.854.146C8 9.293 8 9.53 8 10v2c0 .471 0 .707.146.854C8.293 13 8.53 13 9 13h11.504c.467 0 .701 0 .848-.146.146-.146.146-.379.147-.844l.001-.936V9.991m-.147 6.063c.054-.48.08-.72-.069-.887-.148-.167-.4-.167-.903-.167H9c-.471 0-.707 0-.854.146C8 15.293 8 15.53 8 16v4.503c0 .461 0 .692.145.838.144.146.373.149.83.153q.909.007 1.95.006h.15c2.175 0 3.91 0 5.27-.183 1.405-.189 2.559-.589 3.47-1.501.913-.912 1.313-2.066 1.502-3.47q.02-.144.036-.292" clipRule="evenodd"></path><path fill="#13A62E" fillRule="evenodd" d="M.646 5.946c-.054.48-.08.72.069.887s.4.167.903.167H20.38c.503 0 .755 0 .904-.167.149-.166.122-.406.068-.887q-.016-.148-.036-.291c-.188-1.405-.589-2.558-1.501-3.47S17.749.871 16.345.682C14.985.5 13.25.5 11.074.5h-.15c-2.175 0-3.91 0-5.27.183-1.405.189-2.558.589-3.47 1.501C1.27 3.097.87 4.25.681 5.654q-.02.144-.036.292" clipRule="evenodd"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="68" height="24" fill="none" viewBox="0 0 68 24"><path fill="#F99D1C" d="M9.564 20.732V14.76s-.103-2.384 1.983-4.01c2.085-1.628 2.832-2.769 2.832-2.769s-1.854 1.871-4.532 3.101-4.415 2.576-4.415 4.959v4.702h4.132z"></path><path fill="#F15F22" d="M5.445 13.505s.013-1.025 3.965-2.831S17.417 5.356 16.903 0c0 0-.58 4.51-5.099 7.765-4.518 3.255-5.342 3.319-5.342 3.319s.154-2.281 2.523-3.896 3.09-2.486 3.296-2.908c0 0-.786.781-2.897 1.883s-4.364 3.344-3.94 7.342"></path><path fill="#F15F22" d="M9.77 8.919c-.579.397-1.068.704-1.467.96a.95.95 0 0 1-.438-.807c0-.525.425-.96.966-.96.463 0 .862.358.94.807M11.716 7.559c-.013.013-.026.013-.039.026-.605.435-1.133.807-1.61 1.127a1.063 1.063 0 0 1 .618-1.935c.49 0 .902.32 1.03.782M13.634 5.868c-.45.487-.978.973-1.583 1.435a1.11 1.11 0 0 1-.567-.961c0-.615.502-1.115 1.12-1.115.464-.013.85.256 1.03.64M14.945 4.19c-.296.448-.63.91-1.03 1.358a.936.936 0 0 1-.733-.91c0-.512.425-.935.94-.935.36 0 .669.192.823.487M16.08 2.025c-.206.5-.464 1.051-.811 1.64a.95.95 0 0 1-.709-.91c0-.512.425-.935.94-.935a1 1 0 0 1 .58.205"></path><path fill="#F99D1C" d="M0 1.36h4.66S6.888 2.82 7.97 6.6c0 0-2.137 1.358-2.42 2.973 0 0-2.485-6.304-5.549-8.214M20.057 16.273a5.1 5.1 0 0 1-.31 1.807 4 4 0 0 1-.888 1.422c-.386.398-.85.705-1.39.91-.54.218-1.146.32-1.815.32-.67 0-1.262-.102-1.803-.32a4.25 4.25 0 0 1-1.39-.922 4.1 4.1 0 0 1-.888-1.41 5 5 0 0 1-.31-1.806c0-.667.104-1.269.31-1.82a4 4 0 0 1 .875-1.41c.386-.397.85-.691 1.39-.91.541-.217 1.146-.32 1.803-.32.67 0 1.274.103 1.815.32.54.219 1.004.526 1.39.91.387.398.683.872.889 1.41.219.564.322 1.166.322 1.82m-2.215 0c0-.896-.193-1.588-.592-2.088s-.927-.743-1.596-.743c-.425 0-.811.115-1.133.333-.335.218-.58.55-.76.986s-.27.936-.27 1.525c0 .577.09 1.077.257 1.5.18.422.425.755.747.986s.708.346 1.146.346c.67 0 1.197-.256 1.596-.756.412-.512.605-1.204.605-2.088M27.524 19.502v-.281a4.3 4.3 0 0 1-.837.832c-.296.231-.605.398-.953.5-.347.116-.734.167-1.184.167a3.1 3.1 0 0 1-1.43-.333 2.4 2.4 0 0 1-.978-.91c-.27-.462-.412-1.14-.412-2.012v-4.344c0-.435.104-.768.297-.986s.463-.32.785-.32c.335 0 .605.115.81.333.207.217.31.55.31.986v3.511c0 .513.039.935.129 1.281q.135.52.463.808c.219.192.528.294.914.294.373 0 .721-.115 1.056-.333.322-.218.566-.512.72-.858.13-.308.181-.987.181-2.038v-2.665c0-.435.103-.756.309-.986a1.06 1.06 0 0 1 .798-.333c.322 0 .592.102.786.32.193.218.296.55.296.986v6.356c0 .423-.09.73-.284.935a.97.97 0 0 1-.733.308.96.96 0 0 1-.747-.32c-.206-.206-.296-.513-.296-.898"></path><path fill="#F15F22" d="M33.82 13.045v.27c.412-.513.85-.885 1.287-1.115.45-.244.953-.36 1.52-.36.682 0 1.3.18 1.866.526s1.017.859 1.352 1.525q.502.999.502 2.383c0 .68-.09 1.294-.283 1.858s-.45 1.038-.785 1.423c-.335.384-.734.679-1.185.884q-.675.307-1.468.307c-.63 0-1.158-.128-1.583-.371a4.5 4.5 0 0 1-1.223-1.115v3.293c0 .96-.348 1.448-1.056 1.448-.412 0-.695-.128-.824-.372-.128-.243-.206-.615-.206-1.089v-9.469c0-.423.09-.73.27-.935s.438-.308.747-.308c.31 0 .567.103.76.32.206.206.309.5.309.897m4.313 3.19c0-.576-.09-1.075-.27-1.485q-.27-.615-.734-.961a1.8 1.8 0 0 0-1.043-.334c-.605 0-1.12.244-1.532.718s-.631 1.179-.631 2.101q0 1.307.618 2.038t1.545.73c.36 0 .708-.103 1.017-.32s.566-.526.746-.949c.194-.422.284-.935.284-1.537M47.686 19.502q-.792.615-1.545.922a4.4 4.4 0 0 1-1.674.308 3.3 3.3 0 0 1-1.493-.334 2.43 2.43 0 0 1-.992-.91 2.35 2.35 0 0 1-.347-1.242q0-.903.58-1.538c.385-.423.9-.704 1.57-.845.141-.026.489-.103 1.043-.218q.83-.173 1.428-.308c.4-.09.825-.205 1.288-.346q-.039-.865-.348-1.268c-.206-.27-.63-.41-1.287-.41-.554 0-.978.077-1.262.23a1.9 1.9 0 0 0-.72.705q-.31.462-.425.615-.117.154-.541.154a.97.97 0 0 1-.644-.23.76.76 0 0 1-.27-.603c0-.384.141-.756.412-1.127.27-.36.708-.667 1.287-.897.58-.231 1.3-.36 2.176-.36q1.448 0 2.279.347c.553.23.94.59 1.171 1.076q.348.73.348 1.96v1.308c0 .358-.013.755-.013 1.191 0 .41.064.846.206 1.294.141.449.206.73.206.859 0 .23-.103.435-.322.615s-.45.282-.721.282c-.232 0-.45-.103-.67-.32-.244-.206-.476-.513-.72-.91m-.142-3.178c-.322.115-.798.243-1.403.371-.618.129-1.043.231-1.275.295a1.85 1.85 0 0 0-.682.359c-.219.18-.322.436-.322.756 0 .333.129.615.373.846.258.23.58.346.992.346.437 0 .836-.09 1.21-.282q.56-.288.81-.73c.194-.334.297-.885.297-1.64zM59.04 17.876c0 .602-.154 1.128-.437 1.55-.297.436-.734.756-1.314.987-.579.218-1.287.333-2.111.333-.785 0-1.468-.115-2.034-.359-.566-.243-.978-.538-1.249-.91-.27-.358-.399-.73-.399-1.088a.84.84 0 0 1 .258-.616.9.9 0 0 1 .656-.256c.232 0 .412.052.528.167.129.115.245.269.36.474.232.397.502.679.811.871s.747.295 1.288.295c.438 0 .798-.103 1.081-.295s.425-.423.425-.666c0-.384-.142-.666-.438-.846s-.772-.346-1.454-.512c-.76-.192-1.378-.385-1.854-.59s-.863-.474-1.146-.82c-.283-.333-.425-.756-.425-1.243 0-.435.129-.858.4-1.242.257-.398.656-.705 1.17-.936.516-.23 1.134-.346 1.868-.346.566 0 1.081.064 1.532.18.45.115.836.281 1.133.474.308.192.54.422.695.653.154.244.244.474.244.705a.8.8 0 0 1-.257.615c-.168.166-.412.243-.721.243a.9.9 0 0 1-.58-.192 4 4 0 0 1-.54-.576 1.9 1.9 0 0 0-.592-.513c-.232-.128-.528-.192-.914-.192-.4 0-.734.09-.992.256-.257.167-.399.384-.399.628 0 .23.103.423.296.564.193.153.45.269.786.371.321.103.785.218 1.351.359.683.167 1.236.359 1.674.59s.76.5.991.82c.193.294.31.653.31 1.063M68 17.876c0 .602-.155 1.128-.439 1.55-.296.436-.733.756-1.313.987-.579.218-1.287.333-2.111.333-.785 0-1.468-.115-2.034-.359-.567-.243-.979-.538-1.249-.91-.27-.358-.399-.73-.399-1.088a.84.84 0 0 1 .258-.616.9.9 0 0 1 .656-.256c.232 0 .412.052.528.167.129.115.245.269.36.474.232.397.503.679.812.871.308.192.746.295 1.287.295.438 0 .798-.103 1.081-.295.284-.192.425-.423.425-.666 0-.384-.141-.666-.438-.846-.296-.18-.772-.346-1.454-.512-.76-.192-1.378-.385-1.854-.59s-.863-.474-1.146-.82c-.283-.333-.425-.756-.425-1.243 0-.435.129-.858.4-1.242.257-.398.656-.705 1.17-.936.516-.23 1.134-.346 1.867-.346.567 0 1.082.064 1.532.18.451.115.837.281 1.133.474.31.192.541.422.696.653.154.244.244.474.244.705a.8.8 0 0 1-.257.615c-.168.166-.412.243-.721.243a.9.9 0 0 1-.58-.192 4 4 0 0 1-.54-.576 1.9 1.9 0 0 0-.592-.513c-.232-.128-.528-.192-.915-.192-.398 0-.733.09-.99.256-.258.167-.4.384-.4.628 0 .23.103.423.296.564.193.153.45.269.786.371.321.103.785.218 1.351.359.683.167 1.236.359 1.674.59s.76.5.991.82c.193.294.31.653.31 1.063"></path><path fill="#121212" d="M31.695 9.137c.026.09.065.167.103.243.052.077.103.141.168.205a.6.6 0 0 0 .218.141.58.58 0 0 0 .528-.025c.013 0 .026-.013.026-.013.026-.013.026-.051.013-.077s-.051-.026-.077-.013a.1.1 0 0 1-.052.026h.013c-.038.026-.09.038-.129.051h.013c-.038.013-.09.013-.128.013h.012a.5.5 0 0 1-.141-.026h.013c-.052-.012-.103-.05-.155-.077 0 0 .013 0 .013.013a1 1 0 0 1-.167-.14s0 .012.012.012a.7.7 0 0 1-.128-.192v.013a.7.7 0 0 1-.065-.18.03.03 0 0 0-.025-.025c-.013 0-.026-.013-.039 0-.013 0-.026.013-.026.025v.026"></path><path fill="#121212" d="M31.774 9.1c-.013 0-.026.014-.026.014-.052.012-.103.012-.155-.026-.026-.026-.038-.051-.025-.077.025-.051.077-.09.128-.077.039.013.065.051.065.103 0-.039-.026-.09.012-.103.04-.013.052.026.065.064 0 .026-.026.051-.039.077-.013 0-.026.013-.026.026"></path><path fill="#121212" d="M31.747 9.048c-.013.013-.026.013-.039.013h.013-.038.012c-.012 0-.025 0-.038-.013h.013c-.013 0-.026-.013-.039-.013 0 0 .013 0 .013.013-.013 0-.013-.013-.026-.013 0 0 0 .013.013.013l-.013-.013v.013c0-.013 0-.013-.013-.025v.012-.025.013c0-.013.013-.013.013-.026 0 0 0 .013-.013.013l.026-.026s-.013 0-.013.013c.013-.013.013-.013.026-.013h-.013c.013 0 .013-.013.026-.013h-.013.026-.013.026-.013s.012 0 .012.013c0 0-.012 0-.012-.013l.012.013s0-.013-.012-.013c0 0 .012.013.012.026v-.013c0 .013.013.026.013.026v-.013.026c0 .012.013.025.013.038.013.013.013.013.026.013s.026 0 .026-.013c.013-.013.025-.013.025-.026v-.09s0 .014-.012.014c0 0-.013 0-.013.012h.013-.013.013-.013.013-.013.013-.013.013s-.013 0-.013-.012l.013.012s0-.012-.013-.012c0 0 0 .012.013.012V8.96c0 .012 0 .012.012.025v-.013.026-.013.026-.013c0 .013-.012.026-.012.026s0-.013.012-.013za.1.1 0 0 0-.026.052c0 .012.013.025.013.038a.08.08 0 0 0 .077 0c.013-.013.026-.026.026-.038.013-.013.026-.026.026-.039.013-.026.013-.038.013-.064 0-.013 0-.026-.013-.038 0-.013-.013-.026-.026-.039a.1.1 0 0 0-.064-.025c-.039 0-.078.038-.09.076v.09-.013h.102V9.01c0-.013 0-.013-.012-.026 0-.013-.013-.025-.026-.038l-.039-.039c-.025-.012-.051-.012-.077-.012s-.051.012-.077.025a.1.1 0 0 0-.052.051c-.013.013-.025.026-.025.052v.05c.012.052.064.09.115.103a.08.08 0 0 0 .078 0 .12.12 0 0 0 .09-.038c.013 0 .013-.026.025-.026 0-.012 0-.025-.012-.038.025-.026-.013-.039-.026-.026"></path><path fill="#121212" d="M31.721 8.855c-.013 0-.013-.013-.013-.013zc-.039-.039-.052-.077-.077-.116-.013-.013-.026-.038-.039-.051-.026-.026-.051-.051-.077-.051s-.052 0-.064.025c-.013.013-.026.052-.013.077v-.013c0 .026.012.039.025.064a.2.2 0 0 0 .039.052c.026.025.052.051.09.077.013.012.039.025.052.038 0 0 .012 0 .012.013h.026c.013 0 .026 0 .026-.013.013-.013.026-.026.026-.038s.013-.026 0-.039zc-.026-.013-.039-.013-.052-.013a.03.03 0 0 0-.025.025v.013s0-.013.013-.013c0 0 .012 0 .012-.012h.065a1 1 0 0 1-.129-.103s0 .013.013.013a.2.2 0 0 1-.039-.051v.012c-.012-.012-.012-.038-.012-.05v.038s0 .012-.013.012c0 0-.013 0-.013.013h-.039.013-.013.013s-.013 0-.013-.013c.013.013.026.013.039.026 0 0 0-.013-.013-.013.026.026.039.064.051.09a.23.23 0 0 0 .065.09.08.08 0 0 0 .077 0c.026-.013.026-.039 0-.064"></path><path fill="#121212" d="M31.798 8.868c0-.064-.013-.128-.013-.205v.013-.039.013-.013s0 .013-.012.013c0 0-.013 0-.013.013h.013-.013.013-.013.013-.013.013-.013.013s-.013 0-.013-.013c0 0 0-.013-.013-.013v-.012c0 .012.013.025.013.038V8.65v.051-.012c0 .05-.026.102-.039.153l.039-.038h.013-.013c-.013 0-.026 0-.039.013s-.013.025-.026.025c0 .013 0 .026.013.039l.026.025h.051000000000000004c.013 0 .013-.012.026-.012 0-.013.013-.013.013-.026.013-.038.026-.077.026-.115a.26.26 0 0 0 0-.141c0-.013-.013-.026-.026-.039-.013-.012-.026-.012-.039-.012-.025 0-.051 0-.064.012s-.026.026-.026.039v.10200000000000001c0 .052.013.09.013.141 0 .013.013.026.013.039.013.012.026.012.039.012s.025-.012.038-.012c0 0 0-.013.013-.013-.013.013-.013 0-.013-.013M37.964 8.19a.6.6 0 0 1 .013.154v.05-.012a.8.8 0 0 1-.025.18c0 .012-.013.038-.013.05V8.6a1 1 0 0 1-.065.154c-.013.013-.013.025-.026.038 0 0 0-.013.013-.013a.4.4 0 0 1-.115.128s.012 0 .012-.012c-.038.025-.077.064-.116.077h.013a.2.2 0 0 1-.128.038h.012c-.051.013-.09.013-.141.013h.013-.052c-.013 0-.026 0-.038.013s-.013.025-.026.025c0 .013 0 .026.013.039.013.012.013.025.026.025.09.013.193 0 .283-.025a.5.5 0 0 0 .219-.141.84.84 0 0 0 .231-.474 1 1 0 0 0 0-.27V8.19c0-.013-.013-.026-.013-.039-.012-.012-.025-.012-.038-.012s-.026.012-.039.012c-.013.013-.013.026-.013.039"></path><path fill="#121212" d="M37.978 8.174h.038c.052 0 .103-.038.129-.09a.1.1 0 0 0 0-.089c-.039-.038-.103-.051-.142-.013-.038.026-.038.077-.013.116-.013-.026-.013-.09-.064-.09-.039 0-.039.051-.026.077.013.025.039.038.065.05-.013.027 0 .04.012.04"></path><path fill="#121212" d="M37.965 8.227c.051 0 .103 0 .154-.038.026-.013.04-.039.052-.064.013-.026.026-.052.026-.077 0-.013 0-.026-.013-.039s-.013-.038-.026-.038l-.077-.039a.15.15 0 0 0-.155.052c-.038.038-.038.102-.013.153.026-.012.065-.025.09-.05v.012c0-.013-.012-.026-.012-.026 0-.013-.013-.025-.013-.038l-.039-.039c-.026-.012-.051-.012-.064 0-.026 0-.039.026-.052.039s-.013.038-.013.051 0 .026.013.039c0 .025.013.038.026.05a.2.2 0 0 0 .052.04c.025 0 .038 0 .064.012h.026a.03.03 0 0 0 .026-.026c0-.012.012-.025 0-.038a.03.03 0 0 0-.026-.026c-.026-.012-.039-.012-.065-.025 0 0 .013 0 .013.013-.013 0-.013-.013-.026-.013 0 0 0 .013.013.013l-.013-.013v.013c0-.013 0-.013-.012-.026v.013-.026.013-.013s0 .013-.013.013c0 0-.013 0-.013.013h-.026.013s-.013 0-.013-.013l.013.013s0-.013-.013-.013c0 0 0 .013.013.013v-.013c0 .013.013.026.013.026 0 .012.013.025.013.038s.026.026.026.026h.038c.026-.013.039-.039.026-.064 0-.013-.013-.013-.013-.026v.013-.039.013-.026.013s0-.013.013-.013c0 0 0 .013-.013.013l.013-.013s-.013 0-.013.013c.013 0 .013-.013.026-.013h-.013c.013 0 .013-.012.026-.012h-.013.026-.013.025-.013c.013 0 .026.012.04.012 0 0-.014 0-.014-.012l.013.012s0-.012-.013-.012c0 0 0 .012.013.012v-.012s0 .012.013.025V8.06v.026-.013.026-.013c0 .013-.013.026-.013.026s0-.013.013-.013l-.026.026s.013 0 .013-.013c-.013.013-.026.013-.038.025h.012c-.013 0-.025.013-.038.013h.013-.052.013-.013c-.013 0-.026 0-.038.013s-.013.026-.026.026c0 .012 0 .025.013.038.038-.013.051 0 .064 0"></path><path fill="#121212" d="M38.015 7.984c.013-.026.013-.052.026-.077V7.83v.013c0-.026 0-.052.013-.077v.013c0-.013.013-.026.013-.039 0 0 0 .013-.013.013l.013-.013s-.013 0-.013.013h.013-.013.013-.039s-.013 0-.013-.013c0 0 0-.013-.013-.013v-.025.025-.013.052-.013c0 .026 0 .038-.012.064v-.013c-.013.051-.04.09-.065.128.013-.013.039-.013.052-.025h.013-.013s.013 0 .013.012l-.013-.012a.08.08 0 0 0-.077 0 .08.08 0 0 0 0 .077c.012.012.025.012.038.025h.039c.013 0 .013-.013.025-.025.013-.026.04-.065.052-.09l.039-.115V7.74c0-.013 0-.026-.013-.038v.012c0-.025-.026-.064-.052-.064s-.064.013-.077.039a.2.2 0 0 0-.039.115v.064-.013c0 .026 0 .052-.012.077V7.92s0 .013-.013.013c0 .013-.013.026 0 .039 0 .013.013.025.025.025.065.026.09.013.103-.012"></path><path fill="#121212" d="M37.939 7.945q.02 0 0 0a1 1 0 0 1-.039-.102c-.013-.026-.013-.039-.026-.064s-.026-.051-.051-.064a.11.11 0 0 0-.09 0c-.013.013-.026.025-.026.038-.013.013-.013.026 0 .051 0 .052.026.09.051.129.026.038.052.064.078.102.013.013.013.013.025.013h.039c.013 0 .026-.013.026-.013l.026-.026c0-.038 0-.05-.013-.064l-.026-.025c-.013 0-.026 0-.039.013 0 0-.013 0-.013.012h.013-.013c.026 0 .039.013.065.013-.039-.038-.078-.077-.103-.128v.013c-.013-.013-.013-.026-.013-.051v.012-.025.025s0 .013-.013.013c0 0-.013 0-.013.013h.013-.013.013-.013.013-.013.013-.013.013s-.013 0-.013-.013c0 0 0-.013-.013-.013.013.013.013.026.026.039V7.83c.013.026.026.064.039.09.013.038.025.064.038.102 0 .013.026.013.026.026.013 0 .026 0 .039-.013l.025-.026v-.012c-.012-.039-.012-.052-.025-.052M36.613 11.29c.077.102.244.346.322.448.025.026.038.052.064.09l.026.026c.013 0 .026 0 .038-.013l.026-.026c.013-.013 0-.025-.013-.038-.077-.103-.244-.346-.322-.449-.025-.025-.038-.064-.064-.09-.013-.012-.026-.012-.026-.025-.013 0-.026 0-.038.013s-.026.038-.013.064"></path><path fill="#121212" d="M37.05 11.79c.027 0 .04-.012.052-.012l.013-.013c.026-.013.039-.038.064-.038h.091c.012 0 .025.012.038.025 0 0 .013.013.013.026s0 .012.013.025c0 .013-.013.026-.026.026-.013.012-.013.012-.026.012h-.09c-.025 0-.051-.012-.064-.012h-.013c-.038 0-.051 0-.064-.039q0 .02 0 0"></path><path fill="#121212" d="M37.025 11.842h.039c.012 0 .012 0 .025-.013.013 0 .026-.013.026-.026 0 0-.013 0-.013.013h.013-.013c.013 0 .013 0 .026-.013 0 0 .013 0 .013-.013.013 0 .013-.013.026-.013 0 0-.013 0-.013.013.013 0 .013-.013.025-.013h-.012c.012 0 .012 0 .025-.012h-.013.026-.013.052-.013c.013 0 .013 0 .026.012h-.013c.013 0 .013.013.026.013 0 0-.013 0-.013-.013l.013.013s0-.013-.013-.013c0 .013.013.013.013.026v-.013l-.013.013s0-.013.013-.013l-.013.013s.013 0 .013-.013l-.013.013h.013-.04.014c-.026 0-.065 0-.09-.013h.013c-.013 0-.026-.013-.052-.013-.013 0-.026-.012-.026-.012h.013s-.013 0-.013-.013c0 0 .013 0 .013.013l-.013-.013s0 .013.013.013v-.013.013c0-.013-.013-.026-.026-.039s-.025-.013-.038-.013-.026.013-.039.026-.013.026-.013.038c.013.039.013.052.039.065 0 .012.013.025.026.025s.025.013.038.013a.4.4 0 0 0 .13.013c.025 0 .05 0 .076-.013s.052-.026.065-.051c0-.013.013-.013.013-.026v-.038c0-.013 0-.026-.013-.039a.1.1 0 0 0-.052-.051c-.013 0-.026-.013-.038-.013h-.078c-.013 0-.025 0-.038.013h.013c-.04.013-.065.038-.103.064.012 0 .012-.013.025-.013-.013 0-.025.013-.038.013 0 0-.013 0-.013.013 0 0 .013 0 .013-.013h.013-.013.013-.04c-.012 0-.025.013-.025.026v.038c.013.026.013.038.026.038M34.812 11.686c.026.128.052.244.077.372 0 .038.013.064.013.102 0 .013.013.026.013.039.013.012.026.012.039.012s.025-.012.038-.012c.013-.013.013-.026.013-.039-.013-.128-.038-.243-.064-.371-.013-.039-.013-.077-.026-.103 0-.013-.013-.026-.013-.038-.013-.013-.026-.013-.038-.013s-.026.013-.04.013c-.012 0-.025.012-.012.038"></path><path fill="#121212" d="M34.942 12.162c-.013.013-.039.013-.052.013h-.103c-.012 0-.012 0-.025.013s-.013.013-.026.013c-.013.012-.026.012-.026.025-.013.013-.013.026-.013.039v.025c0 .013 0 .013.013.026s.026.013.039.013h.038c.013-.013.039-.013.052-.026.013 0 .013-.013.026-.026l.051-.05.013-.014c0-.012.013-.025.013-.05"></path><path fill="#121212" d="M34.903 12.122c.013-.013.013 0 0 0q.02-.02 0 0h.013-.052.013-.09c-.013 0-.026.013-.039.013h.013l-.077.038s.013 0 .013-.012a.1.1 0 0 0-.052.05c-.013.014-.026.04-.013.065 0 .025.013.051.013.064a.07.07 0 0 0 .064.038c.026 0 .052 0 .078-.012.013-.013.026-.013.038-.026a.6.6 0 0 0 .09-.077c.013-.013.026-.038.04-.051.012-.026.025-.051.012-.077 0-.013-.013-.026-.026-.026s-.026-.013-.038 0a.07.07 0 0 0-.039.064v.013-.013.013-.013c0 .013 0 .013-.013.013l-.013.013s0-.013.013-.013c-.013.026-.038.051-.064.077 0 0 .013 0 .013-.013-.026.013-.039.026-.065.039h.013s-.013 0-.013-.013c0 0 .013 0 .013.013 0 0 0 .012.013.012 0-.012 0-.012-.013-.025v.013c0-.013.013-.013.013-.026 0 0 0 .013-.013.013 0 0 .013 0 .013-.013.013 0 .013-.013.013-.013s-.013 0-.013.013c.013-.013.013-.013.026-.013h-.013c.013 0 .013-.013.026-.013h-.013.103c.026 0 .038-.012.051-.025s.013-.026.013-.039c0-.012 0-.025-.013-.038.013-.039-.013-.039-.038-.013"></path><path fill="#F99D1C" d="M35.48 5.1c-.142 0-1.57-.039-2.446 1.166-.914 1.255-.747 3.152.142 4.267.128.166 1.107 1.255 2.407 1.101.116-.012 1.068-.153 1.519-.884.206-.345.245-.717.258-.858.025-.333-.013-.602-.09-.987-.065-.371-.117-.474-.168-.833-.026-.153-.039-.346-.026-.576.013-.487.052-1-.103-1.474-.231-.666-.824-.897-1.493-.922"></path><path fill="#fff" d="M32.814 7.431q-.039 0-.039-.038v-.09c.013-.077.039-.14.065-.218.025-.064.051-.14.09-.205.026-.064.064-.128.09-.179.013-.026.039-.064.051-.09l.026-.038.013-.026.013-.025c.013-.013.013-.026.026-.039s.013-.025.026-.038c.025-.026.038-.039.064-.039s.051.013.051.039v.038c0 .013-.012.026-.025.039-.103.153-.18.32-.258.5-.038.089-.064.179-.09.256 0 .012-.013.025-.013.05-.013.014-.013.026-.026.04-.013.012-.013.025-.025.038s-.026.025-.039.025"></path><path fill="#fff" d="M32.814 7.42c-.013 0-.025 0-.025-.013s-.013-.026-.013-.038v-.103c0-.026.013-.038.013-.064l.012-.026c0-.012 0-.025.013-.025l.026-.064.026-.064c.038-.077.064-.154.103-.231l.013-.026c0-.012.013-.012.013-.025l.025-.052.026-.05c.013-.014.026-.04.039-.052l.013-.013.013-.013c.012-.012.012-.025.025-.038s.013-.026.026-.039c.013-.012.026-.025.039-.025.025-.013.051 0 .051.025v.052c0 .013-.013.025-.026.051-.09.14-.167.295-.231.448-.039.09-.065.18-.09.27-.013.012-.04.102-.09.115-.014 0-.014.038 0 .038.025 0 .038-.025.064-.038.013-.013.013-.026.026-.039.012-.012.012-.025.025-.038s.013-.039.013-.051c0-.013.013-.039.013-.052v-.012l.013-.013.013-.039c0-.012.013-.025.013-.038l.013-.039c.038-.102.077-.192.128-.294l.013-.039.013-.038.013-.039.013-.038c0-.013.013-.026.026-.038s.012-.026.025-.039c.013-.025.026-.038.039-.064 0 0 0-.013.013-.013v-.051c0-.026-.013-.038-.026-.051-.039-.026-.09.013-.129.077-.051.077-.103.166-.154.256s-.09.18-.129.269l-.039.077a.2.2 0 0 0-.025.077c-.013.051-.039.102-.039.166v.052c0 .012 0 .025.013.038.013.026.026.038.051.038.013 0 .013-.025 0-.025M32.737 7.703c.051 0 .064.039.064.051 0 .064-.026.116-.026.18 0 .051 0 .115-.012.166 0 .026.012.052-.026.064-.052.013-.09 0-.09-.038a.8.8 0 0 1 0-.243c0-.039.013-.077.013-.129 0-.025.025-.05.077-.05"></path><path fill="#fff" d="M32.737 7.702c.051 0 .039.039.039.064 0 .039-.013.064-.013.103-.013.064-.013.14-.013.205v.038c0 .013 0 .026-.013.039s-.039.013-.064 0-.026-.026-.026-.039v-.218c0-.038 0-.076.013-.128.013-.025.026-.064.077-.064.013 0 .013-.013 0-.013a.11.11 0 0 0-.09.052c-.013.013-.013.038-.013.051 0 .026 0 .051-.013.077v.269q.02.039.077.038c.052 0 .065-.025.065-.05 0-.078 0-.167.013-.244.012-.039.025-.09.012-.128 0-.026-.025-.052-.077-.052.013-.013.013 0 .026 0"></path><path fill="#121212" d="M34.153 8.636v-.103.013c0-.038.013-.09.026-.128v.013l.038-.077s0 .013-.012.013c.012-.013.012-.026.025-.039 0 0-.013 0-.013.013.013 0 .013-.013.026-.013h-.013.026-.013.039-.013c.013 0 .026.013.026.013s-.013 0-.013-.013c.026.013.038.026.064.052l-.013-.013c.026.026.039.051.052.077 0 0 0-.013-.013-.013a.7.7 0 0 1 .051.154c0 .013 0 .013.013.025 0 .013.013.013.013.026.013.013.026.013.052.013.012 0 .038-.013.038-.026.013-.013.013-.025.013-.051-.013-.039-.013-.077-.026-.115-.013-.026-.025-.064-.038-.09a.4.4 0 0 0-.116-.141c-.013-.013-.013-.013-.026-.013s-.026-.013-.038-.013-.04-.012-.052-.012c-.013 0-.039 0-.051.012-.013 0-.026.013-.052.026l-.026.026-.013.012c-.012.013-.025.026-.025.052-.013.025-.026.064-.039.09-.013.063-.013.14-.013.204 0 .013.013.039.026.039.013.013.026.013.051.013.013.038.039.012.039-.026M35.428 8.534v-.102.013c0-.039.013-.09.026-.128v.012l.039-.076s0 .012-.013.012c.013-.012.013-.025.026-.038 0 0-.013 0-.013.013.013 0 .013-.013.026-.013h-.013.025-.012.038-.013c.013 0 .026.013.026.013s-.013 0-.013-.013c.026.013.039.026.064.051l-.012-.013c.025.026.038.052.051.077 0 0 0-.013-.013-.013.026.052.039.103.052.154 0 .013 0 .013.013.026 0 .013.012.013.012.025.013.013.026.013.052.013.013 0 .039-.013.039-.025.013-.013.013-.026.013-.052-.013-.038-.013-.077-.026-.115-.013-.026-.026-.064-.039-.09a.4.4 0 0 0-.116-.14c-.013-.013-.013-.013-.026-.013s-.025-.013-.038-.013-.039-.013-.052-.013-.038 0-.051.013c-.013 0-.026.013-.052.025l-.025.026-.013.013c-.013.013-.026.025-.026.051-.013.026-.026.064-.039.09-.013.064-.013.14-.013.205 0 .013.013.038.026.038.013.013.026.013.052.013.013.038.038.013.038-.026M34.746 8.523c0 .013.013.038.013.051.013.013.013.026.026.052.026.025.051.05.077.064a.1.1 0 0 0 .064.012c.013 0 .039 0 .052-.012s.038-.013.051-.039c.013-.013.026-.025.026-.038.013-.026.026-.064.039-.09 0-.013 0-.026-.013-.038s-.026-.013-.026-.026c-.013 0-.026 0-.039.013l-.025.025c0 .013 0 .026-.013.039v-.013c0 .013-.013.026-.026.038 0 0 0-.012.013-.012 0 .012-.013.012-.026.025 0 0 .013 0 .013-.013-.013 0-.013.013-.026.013h.013c-.013 0-.013 0-.026.013h.013-.025.012-.025.013c-.013 0-.026-.013-.026-.013s.013 0 .013.013c-.013-.013-.026-.013-.026-.026 0 0 0 .013.013.013-.013-.013-.013-.025-.026-.038v.013c-.013-.013-.013-.026-.013-.039v.013c0-.013 0-.026-.013-.038s-.025-.013-.038-.013-.026.013-.039.013z"></path><path fill="#FD3535" d="M34.565 8.907c.013.077-.039.154-.103.205a.37.37 0 0 1-.348.025c-.09-.05-.128-.205-.051-.281.09-.116.296-.129.425-.052a.11.11 0 0 1 .077.103M35.313 8.842c0 .025.012.051.025.077a.31.31 0 0 0 .245.128c.09 0 .18-.026.232-.103.051-.077.051-.192-.013-.256-.116-.115-.425-.09-.477.077-.013.038-.013.064-.013.077"></path><path fill="#F99D1C" d="M34.23 8.856c-.025.051-.064.103-.09.167 0 .012 0 .025.014.038.012 0 .025 0 .038-.013.026-.051.065-.102.09-.166 0-.013 0-.026-.013-.039s-.038 0-.038.013M34.399 8.843c-.026.051-.065.102-.09.166 0 .013 0 .026.013.039.012 0 .025 0 .038-.013.026-.051.065-.102.09-.166 0-.013 0-.026-.013-.039-.012 0-.025 0-.038.013M35.518 8.74c-.026.05-.065.102-.09.166 0 .013 0 .026.013.038.012 0 .025 0 .038-.012.026-.052.065-.103.09-.167 0-.013 0-.026-.013-.038-.012 0-.025 0-.038.012M35.698 8.728c-.026.05-.065.102-.09.166 0 .013 0 .026.012.039.013 0 .026 0 .039-.013.026-.051.064-.103.09-.167 0-.013 0-.025-.013-.038-.026 0-.038 0-.038.013"></path><path fill="#fff" d="m36.278 5.42.077.04c.013.012.026.012.039.025h.012l.013.013a1 1 0 0 1 .116.102l.026.026.013.013a.3.3 0 0 1 .051.064c.026.038.065.077.09.128 0 .013.013.026.013.038 0 0 0 .013.013.013v.013a.3.3 0 0 0 .039.064c.026.051.038.103.051.141.013.026.013.051.026.077 0 .013.013.026.013.038v.026a.6.6 0 0 1 .026.154c.012.102.012.205.012.32v.039c0 .012.013.025.013.025.013 0 .013.013.026.013.026 0 .039-.026.039-.038 0-.103 0-.218-.013-.32s-.026-.219-.065-.321a1.17 1.17 0 0 0-.566-.743c-.013-.013-.026-.013-.039-.013-.012-.013-.038 0-.051.013 0 .025 0 .05.026.05M35.351 11.533l.296-.038a2 2 0 0 0 .296-.064c.09-.026.193-.064.284-.103s.18-.09.27-.14c.09-.052.167-.103.232-.167.077-.065.141-.141.206-.218a1 1 0 0 0 .167-.27c.052-.115.103-.23.129-.345.026-.116.038-.244.051-.372s0-.243 0-.371c0-.026 0-.065-.013-.09 0-.026-.025-.039-.038-.039-.026 0-.039.026-.039.039.013.115.013.243.013.359v.179c0 .064-.013.115-.026.18-.013.063-.026.115-.038.179 0 .013-.013.025-.013.038v.013c0 .013 0 .013-.013.026-.013.025-.026.064-.039.09a1 1 0 0 1-.077.14c-.013.026-.026.039-.039.064v.013l-.013.013c-.012.013-.012.026-.025.026a1.6 1.6 0 0 1-.193.217l-.013.013-.026.026c-.013.013-.039.026-.051.051-.04.026-.078.051-.116.09a1 1 0 0 1-.13.077c-.012 0-.025.013-.025.013s-.013 0-.013.012h-.013c-.025.013-.038.026-.064.026-.09.038-.18.077-.27.103-.052.012-.09.025-.142.038-.026 0-.051.013-.064.013s-.026 0-.039.013h-.026c-.09.025-.193.038-.296.05-.026 0-.051 0-.077.014-.026 0-.039.025-.039.038-.013.051 0 .064.026.064M36.755 7.28a.5.5 0 0 0-.142.063.3.3 0 0 0-.103.116c-.309.487-.206 1.179.232 1.537.039.026.09.052.129.064a.25.25 0 0 0 .128-.038.3.3 0 0 0 .052-.103.4.4 0 0 0-.026-.115c-.154-.423-.219-.884-.154-1.333.012-.064.012-.14-.052-.179-.038-.013-.051-.013-.064-.013M33.137 10.25q.115.193.27.347c.103.102.206.205.309.294.116.09.232.167.36.244q.194.115.387.192c.128.051.27.103.412.141.013 0 .038.013.051.013.026 0 .039-.013.039-.026 0-.025-.013-.038-.026-.038-.039-.013-.064-.026-.103-.026-.013 0-.039-.013-.051-.013-.013 0-.013 0-.026-.012h-.026c-.064-.026-.129-.052-.206-.077-.129-.052-.258-.116-.386-.18-.065-.038-.129-.077-.18-.115 0 0-.013 0-.013-.013-.013 0-.013-.013-.026-.013-.013-.012-.026-.025-.039-.025-.025-.026-.064-.039-.09-.064a3 3 0 0 1-.322-.282l-.038-.039-.013-.012c0-.013-.013-.013-.013-.026-.026-.026-.051-.051-.064-.077-.039-.051-.09-.115-.13-.18-.012-.012-.012-.025-.025-.038s-.038-.025-.051-.013c-.013 0-.013.026 0 .039"></path><path fill="#121212" d="M35.48 5.037c-.116 0-.232 0-.348.013a3.3 3.3 0 0 0-.708.154c-.296.102-.58.243-.837.423-.296.217-.54.5-.734.807a3.545 3.545 0 0 0-.476 1.999c.013.346.077.692.18 1.025.103.32.245.628.438.91.103.153.219.281.348.41.167.166.347.307.54.448.258.166.528.307.824.397s.618.116.927.077a3 3 0 0 0 .54-.14 2.1 2.1 0 0 0 .773-.475c.27-.27.412-.615.477-.987q.038-.23.038-.46c0-.206-.038-.398-.077-.603l-.116-.577a7 7 0 0 1-.09-.5c-.038-.435.013-.884-.013-1.32-.025-.384-.103-.794-.373-1.101-.206-.244-.502-.385-.811-.449-.18-.025-.335-.05-.502-.05-.039 0-.065.038-.065.063 0 .039.039.051.065.064.309.013.618.064.888.218s.463.41.554.705c.128.435.09.897.09 1.345 0 .192 0 .397.026.59.025.166.051.346.09.512.038.18.077.372.115.564.04.192.065.397.065.59 0 .32-.065.653-.206.935-.142.294-.386.512-.67.679a2.5 2.5 0 0 1-.67.243h-.038c-.013 0-.038 0-.051.013-.026 0-.052.013-.065.013a2 2 0 0 1-.463.013 2.5 2.5 0 0 1-.888-.27 3.2 3.2 0 0 1-.644-.435c-.077-.064-.142-.128-.219-.205l-.077-.077-.013-.013-.013-.013-.026-.025a3 3 0 0 1-.437-.692 3.4 3.4 0 0 1-.284-.948 4.5 4.5 0 0 1-.038-1.013c.038-.333.116-.666.244-.973.13-.32.322-.628.567-.884a2.7 2.7 0 0 1 1.377-.782c.065-.013.116-.026.168-.038a2.4 2.4 0 0 1 .528-.052h.115c.04 0 .065-.038.065-.064-.026-.051-.052-.064-.09-.064"></path><path fill="#fff" d="M34.14 10.854c-.052 0-.09-.039-.103-.09-.013-.038.012-.09.051-.102.077-.013.154.064.129.14-.013.026-.052.052-.078.052M34.539 10.637a.1.1 0 0 1-.065-.026c-.038-.038-.038-.09 0-.128.026-.038.078-.025.103 0 .026.026.052.064.026.116 0 .012-.039.038-.064.038M35.968 6.114a.1.1 0 0 1-.064-.026c-.039-.038-.039-.09 0-.128.026-.039.077-.026.103 0s.052.064.026.115c0 .026-.039.039-.065.039M34.771 11.111c-.09.039-.154-.064-.129-.128.026-.051.103-.077.142-.025.013.025.026.05.026.09.013.012-.013.05-.039.063M36.444 6.022c-.038.025-.077.012-.103-.026-.025-.026-.038-.077-.013-.103.026-.05.103-.076.142-.025a.2.2 0 0 1 .026.09c0 .025-.026.064-.052.064M36.845 10.213c-.039.026-.078.013-.103-.026-.026-.025-.039-.077-.013-.102.026-.051.103-.077.142-.026a.2.2 0 0 1 .025.09c0 .026-.026.051-.051.064M35.841 5.56a.14.14 0 0 1-.103-.012c-.026-.013-.026-.051 0-.077.026-.038.116-.05.155-.012.012.025.025.038.012.063 0 .013-.025.039-.064.039M36.188 8.304c.012.09.038.18.064.27 0 .012.026.025.051.025.026-.013.026-.026.026-.051a1 1 0 0 1-.051-.18v.013c0-.026-.013-.051-.013-.077s-.026-.038-.039-.038c-.026 0-.038.025-.038.038M36.355 8.816c.026.038.038.077.064.103s.039.064.065.09c.051.05.102.102.154.14.026.013.052.039.09.051a.24.24 0 0 0 .103.026h.09c.039-.013.065-.013.103-.038a.3.3 0 0 0 .129-.129c0-.012 0-.012.013-.025v-.026c0-.013-.013-.013-.013-.025-.013-.013-.039 0-.051.012 0 .013-.013.026-.026.039l-.013.013-.013.012-.013.013-.013.013c-.013.013-.026.013-.038.026h.013c-.026.013-.052.025-.078.025h.013c-.026 0-.051.013-.077 0h.013c-.026 0-.052 0-.078-.012h.013c-.025-.013-.064-.026-.09-.039h-.013c-.012 0-.012-.013-.025-.013-.013-.013-.026-.025-.039-.025l-.039-.039-.012-.013s-.013-.012-.013-.025c-.026-.026-.039-.051-.065-.09l-.077-.115c0-.013-.013-.013-.026-.013h-.026c-.012 0-.012.013-.012.026-.026.025-.013.038-.013.038"></path></svg><p className={styles.dashboardHeaderTitle}>đồng hành cùng bạn</p></div>
<div className={styles.mobileLayoutWrapper}><div className={styles.targetScoreSection}><div className={styles.targetScoreFlex}><div className={`${styles.boxShadowTable} ${styles.customTargetCard}`}><div className={styles.customCardHeader}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.3346 8C11.3346 9.84095 9.84225 11.3333 8.0013 11.3333C6.16035 11.3333 4.66797 9.84095 4.66797 8C4.66797 6.15906 6.16035 4.66667 8.0013 4.66667" stroke="black" strokeLinecap="round"></path><path d="M9.33398 1.46669C8.90317 1.37924 8.45727 1.33334 8.00065 1.33334C4.31875 1.33334 1.33398 4.3181 1.33398 8C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8C14.6673 7.54338 14.6214 7.09748 14.534 6.66667" stroke="black" strokeLinecap="round"></path><path d="M11.0688 4.93125L8 8M11.0688 4.93125L10.8521 4.10086C10.688 3.47181 10.9126 2.7461 11.4324 2.2263L12.1987 1.46004C12.4027 1.25601 12.7186 1.30646 12.783 1.55338L13.1273 2.87275L14.4466 3.21699C14.6935 3.28141 14.744 3.59728 14.54 3.80131L13.7737 4.56757C13.2539 5.08737 12.5282 5.31204 11.8991 5.14791L11.0688 4.93125Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg> <p className={styles.cardHeaderTitle}>Mục tiêu của bạn</p></div><div className={styles.customCardBody}><div className={styles.scoreHighlightBlock}><p className={styles.scoreLabel}>Overall score</p><div className={styles.scoreValueWrapper}><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.scoreValueText}>_</p></div></div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff6d3a" className="mb-[10px] w-[23px]"><path d="M3.26538 21.9613L3.28499 21.2115H3.28498L3.26538 21.9613ZM2.03608 20.5662L2.78381 20.6244L2.03608 20.5662ZM4.78943 13.9445L4.2383 13.4358L4.78943 13.9445ZM2.06308 20.2197L1.31534 20.1614H1.31534L2.06308 20.2197ZM10.7506 19.1543L10.2303 18.6141L10.7506 19.1543ZM3.54536 21.9686L3.52576 22.7183H3.52576L3.54536 21.9686ZM21.6159 5.38093L22.2781 5.02866L21.6159 5.38093ZM20.1543 10.097L19.634 9.55682L20.1543 10.097ZM21.5703 8.5507L20.9187 8.17934L21.5703 8.5507ZM18.6904 2.39232L18.3263 3.04804L18.6904 2.39232ZM14.0737 3.88545L14.6248 4.39413L14.0737 3.88545ZM15.5874 2.43893L15.204 1.79431V1.79431L15.5874 2.43893ZM14.0337 3.97305C13.7408 3.68015 13.2659 3.68015 12.973 3.97305C12.6802 4.26594 12.6802 4.74081 12.973 5.03371L14.0337 3.97305ZM19.0854 11.1461C19.3783 11.439 19.8532 11.439 20.1461 11.1461C20.439 10.8532 20.439 10.3783 20.1461 10.0854L19.0854 11.1461ZM14 21.25C13.5858 21.25 13.25 21.5858 13.25 22C13.25 22.4142 13.5858 22.75 14 22.75V21.25ZM22 22.75C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25V22.75ZM19.634 9.55682L10.2303 18.6141L11.2709 19.6945L20.6746 10.6372L19.634 9.55682ZM5.34056 14.4532L14.6248 4.39413L13.5226 3.37677L4.2383 13.4358L5.34056 14.4532ZM3.56497 21.2188L3.28499 21.2115L3.24577 22.711L3.52576 22.7183L3.56497 21.2188ZM2.78381 20.6244L2.81081 20.2779L1.31534 20.1614L1.28835 20.5079L2.78381 20.6244ZM3.28498 21.2115C3.12547 21.2073 2.99912 21.204 2.89063 21.1983C2.78169 21.1926 2.7103 21.1854 2.66125 21.1772C2.56902 21.1618 2.63793 21.1566 2.7063 21.2342L1.58088 22.2259C1.83132 22.5101 2.14789 22.6123 2.41442 22.6568C2.65767 22.6974 2.95477 22.7034 3.24577 22.711L3.28498 21.2115ZM1.28835 20.5079C1.26514 20.8057 1.24028 21.1043 1.25407 21.3517C1.26897 21.6191 1.33267 21.9442 1.58088 22.2259L2.7063 21.2342C2.77242 21.3092 2.7575 21.3715 2.75175 21.2682C2.74487 21.1448 2.7573 20.9648 2.78381 20.6244L1.28835 20.5079ZM4.2383 13.4358C3.06241 14.7098 2.3488 15.4688 1.93583 16.4194L3.31159 17.0171C3.60008 16.3531 4.09646 15.8011 5.34056 14.4532L4.2383 13.4358ZM2.81081 20.2779C2.95467 18.4314 3.02254 17.6824 3.31159 17.0171L1.93583 16.4194C1.52341 17.3686 1.45135 18.4157 1.31534 20.1614L2.81081 20.2779ZM10.2303 18.6141C8.6878 20.0998 8.05899 20.6868 7.2952 20.9851L7.84093 22.3823C8.94901 21.9495 9.81795 21.0939 11.2709 19.6945L10.2303 18.6141ZM3.52576 22.7183C5.52172 22.7705 6.73118 22.8158 7.84093 22.3823L7.2952 20.9851C6.53307 21.2828 5.68469 21.2743 3.56497 21.2188L3.52576 22.7183ZM19.7091 4.31741C20.5143 5.13994 20.7985 5.4413 20.9538 5.73319L22.2781 5.02866C21.9958 4.49815 21.512 4.01486 20.781 3.26811L19.7091 4.31741ZM20.6746 10.6372C21.4267 9.91278 21.9244 9.44408 22.2219 8.92206L20.9187 8.17934C20.7552 8.46624 20.4626 8.75877 19.634 9.55682L20.6746 10.6372ZM20.9538 5.73319C21.361 6.49847 21.3475 7.42702 20.9187 8.17934L22.2219 8.92206C22.9056 7.72256 22.9267 6.24777 22.2781 5.02866L20.9538 5.73319ZM20.781 3.26811C20.051 2.52241 19.5767 2.02656 19.0544 1.7366L18.3263 3.04804C18.6091 3.20504 18.9029 3.49383 19.7091 4.31741L20.781 3.26811ZM14.6248 4.39413C15.4069 3.54677 15.6924 3.24909 15.9708 3.08354L15.204 1.79431C14.6905 2.09971 14.2308 2.6094 13.5226 3.37677L14.6248 4.39413ZM19.0544 1.7366C17.8496 1.06772 16.3886 1.0898 15.204 1.79431L15.9708 3.08354C16.6969 2.65172 17.5886 2.63846 18.3263 3.04804L19.0544 1.7366ZM12.973 5.03371L19.0854 11.1461L20.1461 10.0854L14.0337 3.97305L12.973 5.03371ZM14 22.75H22V21.25H14V22.75Z" fill="#ff6d3a" fillOpacity="1"></path></svg></div></div><div className={styles.skillsGrid}><div className={styles.skillBlock}><p className={styles.scoreLabel}>Reading</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>_</p></div></div></div><div className={styles.skillBlock}><p className={styles.scoreLabel}>Listening</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>_</p></div></div></div><div className={styles.skillBlock}><p className={styles.scoreLabel}>Writing</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>_</p></div></div></div><div className={styles.skillBlock}><p className={styles.scoreLabel}>Speaking</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>_</p></div></div></div></div></div></div><div className={`${styles.boxShadowTable} ${styles.customExamCard}`}><div className={styles.customCardHeader}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M6.33203 8.66667H9.66536M4.33203 8.66667H4.33802M7.66536 11.3333H4.33203M9.66536 11.3333H9.65938" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11 1.33334V2.66667M3 1.33334V2.66667" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M0.666016 8.16216C0.666016 5.25729 0.666016 3.80486 1.50076 2.90243C2.33551 2 3.67901 2 6.36602 2H7.63268C10.3197 2 11.6632 2 12.4979 2.90243C13.3327 3.80486 13.3327 5.25729 13.3327 8.16216V8.5045C13.3327 11.4094 13.3327 12.8618 12.4979 13.7642C11.6632 14.6667 10.3197 14.6667 7.63268 14.6667H6.36602C3.67901 14.6667 2.33551 14.6667 1.50076 13.7642C0.666016 12.8618 0.666016 11.4094 0.666016 8.5045V8.16216Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1 5.33334H13" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg> <p className={styles.cardHeaderTitle}>Lịch thi</p></div><div className={styles.examCardBody}><div className={styles.examDateBlock}><div className="h-full"><p className={styles.examSublabel}>Ngày dự thi</p><div className={styles.examValueWrapper}><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.cardHeaderTitle}>_ / _ / _</p></div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><path d="M3.26538 21.9613L3.28499 21.2115H3.28498L3.26538 21.9613ZM2.03608 20.5662L2.78381 20.6244L2.03608 20.5662ZM4.78943 13.9445L4.2383 13.4358L4.78943 13.9445ZM2.06308 20.2197L1.31534 20.1614H1.31534L2.06308 20.2197ZM10.7506 19.1543L10.2303 18.6141L10.7506 19.1543ZM3.54536 21.9686L3.52576 22.7183H3.52576L3.54536 21.9686ZM21.6159 5.38093L22.2781 5.02866L21.6159 5.38093ZM20.1543 10.097L19.634 9.55682L20.1543 10.097ZM21.5703 8.5507L20.9187 8.17934L21.5703 8.5507ZM18.6904 2.39232L18.3263 3.04804L18.6904 2.39232ZM14.0737 3.88545L14.6248 4.39413L14.0737 3.88545ZM15.5874 2.43893L15.204 1.79431V1.79431L15.5874 2.43893ZM14.0337 3.97305C13.7408 3.68015 13.2659 3.68015 12.973 3.97305C12.6802 4.26594 12.6802 4.74081 12.973 5.03371L14.0337 3.97305ZM19.0854 11.1461C19.3783 11.439 19.8532 11.439 20.1461 11.1461C20.439 10.8532 20.439 10.3783 20.1461 10.0854L19.0854 11.1461ZM14 21.25C13.5858 21.25 13.25 21.5858 13.25 22C13.25 22.4142 13.5858 22.75 14 22.75V21.25ZM22 22.75C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25V22.75ZM19.634 9.55682L10.2303 18.6141L11.2709 19.6945L20.6746 10.6372L19.634 9.55682ZM5.34056 14.4532L14.6248 4.39413L13.5226 3.37677L4.2383 13.4358L5.34056 14.4532ZM3.56497 21.2188L3.28499 21.2115L3.24577 22.711L3.52576 22.7183L3.56497 21.2188ZM2.78381 20.6244L2.81081 20.2779L1.31534 20.1614L1.28835 20.5079L2.78381 20.6244ZM3.28498 21.2115C3.12547 21.2073 2.99912 21.204 2.89063 21.1983C2.78169 21.1926 2.7103 21.1854 2.66125 21.1772C2.56902 21.1618 2.63793 21.1566 2.7063 21.2342L1.58088 22.2259C1.83132 22.5101 2.14789 22.6123 2.41442 22.6568C2.65767 22.6974 2.95477 22.7034 3.24577 22.711L3.28498 21.2115ZM1.28835 20.5079C1.26514 20.8057 1.24028 21.1043 1.25407 21.3517C1.26897 21.6191 1.33267 21.9442 1.58088 22.2259L2.7063 21.2342C2.77242 21.3092 2.7575 21.3715 2.75175 21.2682C2.74487 21.1448 2.7573 20.9648 2.78381 20.6244L1.28835 20.5079ZM4.2383 13.4358C3.06241 14.7098 2.3488 15.4688 1.93583 16.4194L3.31159 17.0171C3.60008 16.3531 4.09646 15.8011 5.34056 14.4532L4.2383 13.4358ZM2.81081 20.2779C2.95467 18.4314 3.02254 17.6824 3.31159 17.0171L1.93583 16.4194C1.52341 17.3686 1.45135 18.4157 1.31534 20.1614L2.81081 20.2779ZM10.2303 18.6141C8.6878 20.0998 8.05899 20.6868 7.2952 20.9851L7.84093 22.3823C8.94901 21.9495 9.81795 21.0939 11.2709 19.6945L10.2303 18.6141ZM3.52576 22.7183C5.52172 22.7705 6.73118 22.8158 7.84093 22.3823L7.2952 20.9851C6.53307 21.2828 5.68469 21.2743 3.56497 21.2188L3.52576 22.7183ZM19.7091 4.31741C20.5143 5.13994 20.7985 5.4413 20.9538 5.73319L22.2781 5.02866C21.9958 4.49815 21.512 4.01486 20.781 3.26811L19.7091 4.31741ZM20.6746 10.6372C21.4267 9.91278 21.9244 9.44408 22.2219 8.92206L20.9187 8.17934C20.7552 8.46624 20.4626 8.75877 19.634 9.55682L20.6746 10.6372ZM20.9538 5.73319C21.361 6.49847 21.3475 7.42702 20.9187 8.17934L22.2219 8.92206C22.9056 7.72256 22.9267 6.24777 22.2781 5.02866L20.9538 5.73319ZM20.781 3.26811C20.051 2.52241 19.5767 2.02656 19.0544 1.7366L18.3263 3.04804C18.6091 3.20504 18.9029 3.49383 19.7091 4.31741L20.781 3.26811ZM14.6248 4.39413C15.4069 3.54677 15.6924 3.24909 15.9708 3.08354L15.204 1.79431C14.6905 2.09971 14.2308 2.6094 13.5226 3.37677L14.6248 4.39413ZM19.0544 1.7366C17.8496 1.06772 16.3886 1.0898 15.204 1.79431L15.9708 3.08354C16.6969 2.65172 17.5886 2.63846 18.3263 3.04804L19.0544 1.7366ZM12.973 5.03371L19.0854 11.1461L20.1461 10.0854L14.0337 3.97305L12.973 5.03371ZM14 22.75H22V21.25H14V22.75Z" fill="#3C3C43" fillOpacity="1"></path></svg></div></div></div><div className={styles.daysLeftBlock}><div className="h-full"><p className={styles.examSublabel}>Số ngày còn lại</p><div className={styles.examValueWrapper}><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={`${styles.examValueText} ${styles.flexCenter}`}>_ ngày</p></div></div></div></div></div></div></div></div></div>
<div className={styles.desktopLayoutWrapper}><div className={styles.targetScoreSection}><div className={styles.targetScoreFlex}><div className={`${styles.boxShadowTable} ${styles.customTargetCard}`}><div className={styles.customCardHeader}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.3346 8C11.3346 9.84095 9.84225 11.3333 8.0013 11.3333C6.16035 11.3333 4.66797 9.84095 4.66797 8C4.66797 6.15906 6.16035 4.66667 8.0013 4.66667" stroke="black" strokeLinecap="round"></path><path d="M9.33398 1.46669C8.90317 1.37924 8.45727 1.33334 8.00065 1.33334C4.31875 1.33334 1.33398 4.3181 1.33398 8C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8C14.6673 7.54338 14.6214 7.09748 14.534 6.66667" stroke="black" strokeLinecap="round"></path><path d="M11.0688 4.93125L8 8M11.0688 4.93125L10.8521 4.10086C10.688 3.47181 10.9126 2.7461 11.4324 2.2263L12.1987 1.46004C12.4027 1.25601 12.7186 1.30646 12.783 1.55338L13.1273 2.87275L14.4466 3.21699C14.6935 3.28141 14.744 3.59728 14.54 3.80131L13.7737 4.56757C13.2539 5.08737 12.5282 5.31204 11.8991 5.14791L11.0688 4.93125Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg> <p className={styles.cardHeaderTitle}>Mục tiêu của bạn</p></div><div className={styles.customCardBody}><div className={styles.scoreHighlightBlock}><p className={styles.scoreLabel}>Overall score</p><div className={styles.scoreValueWrapper}><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.scoreValueText}>_</p></div></div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff6d3a" className="mb-[10px] w-[23px]"><path d="M3.26538 21.9613L3.28499 21.2115H3.28498L3.26538 21.9613ZM2.03608 20.5662L2.78381 20.6244L2.03608 20.5662ZM4.78943 13.9445L4.2383 13.4358L4.78943 13.9445ZM2.06308 20.2197L1.31534 20.1614H1.31534L2.06308 20.2197ZM10.7506 19.1543L10.2303 18.6141L10.7506 19.1543ZM3.54536 21.9686L3.52576 22.7183H3.52576L3.54536 21.9686ZM21.6159 5.38093L22.2781 5.02866L21.6159 5.38093ZM20.1543 10.097L19.634 9.55682L20.1543 10.097ZM21.5703 8.5507L20.9187 8.17934L21.5703 8.5507ZM18.6904 2.39232L18.3263 3.04804L18.6904 2.39232ZM14.0737 3.88545L14.6248 4.39413L14.0737 3.88545ZM15.5874 2.43893L15.204 1.79431V1.79431L15.5874 2.43893ZM14.0337 3.97305C13.7408 3.68015 13.2659 3.68015 12.973 3.97305C12.6802 4.26594 12.6802 4.74081 12.973 5.03371L14.0337 3.97305ZM19.0854 11.1461C19.3783 11.439 19.8532 11.439 20.1461 11.1461C20.439 10.8532 20.439 10.3783 20.1461 10.0854L19.0854 11.1461ZM14 21.25C13.5858 21.25 13.25 21.5858 13.25 22C13.25 22.4142 13.5858 22.75 14 22.75V21.25ZM22 22.75C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25V22.75ZM19.634 9.55682L10.2303 18.6141L11.2709 19.6945L20.6746 10.6372L19.634 9.55682ZM5.34056 14.4532L14.6248 4.39413L13.5226 3.37677L4.2383 13.4358L5.34056 14.4532ZM3.56497 21.2188L3.28499 21.2115L3.24577 22.711L3.52576 22.7183L3.56497 21.2188ZM2.78381 20.6244L2.81081 20.2779L1.31534 20.1614L1.28835 20.5079L2.78381 20.6244ZM3.28498 21.2115C3.12547 21.2073 2.99912 21.204 2.89063 21.1983C2.78169 21.1926 2.7103 21.1854 2.66125 21.1772C2.56902 21.1618 2.63793 21.1566 2.7063 21.2342L1.58088 22.2259C1.83132 22.5101 2.14789 22.6123 2.41442 22.6568C2.65767 22.6974 2.95477 22.7034 3.24577 22.711L3.28498 21.2115ZM1.28835 20.5079C1.26514 20.8057 1.24028 21.1043 1.25407 21.3517C1.26897 21.6191 1.33267 21.9442 1.58088 22.2259L2.7063 21.2342C2.77242 21.3092 2.7575 21.3715 2.75175 21.2682C2.74487 21.1448 2.7573 20.9648 2.78381 20.6244L1.28835 20.5079ZM4.2383 13.4358C3.06241 14.7098 2.3488 15.4688 1.93583 16.4194L3.31159 17.0171C3.60008 16.3531 4.09646 15.8011 5.34056 14.4532L4.2383 13.4358ZM2.81081 20.2779C2.95467 18.4314 3.02254 17.6824 3.31159 17.0171L1.93583 16.4194C1.52341 17.3686 1.45135 18.4157 1.31534 20.1614L2.81081 20.2779ZM10.2303 18.6141C8.6878 20.0998 8.05899 20.6868 7.2952 20.9851L7.84093 22.3823C8.94901 21.9495 9.81795 21.0939 11.2709 19.6945L10.2303 18.6141ZM3.52576 22.7183C5.52172 22.7705 6.73118 22.8158 7.84093 22.3823L7.2952 20.9851C6.53307 21.2828 5.68469 21.2743 3.56497 21.2188L3.52576 22.7183ZM19.7091 4.31741C20.5143 5.13994 20.7985 5.4413 20.9538 5.73319L22.2781 5.02866C21.9958 4.49815 21.512 4.01486 20.781 3.26811L19.7091 4.31741ZM20.6746 10.6372C21.4267 9.91278 21.9244 9.44408 22.2219 8.92206L20.9187 8.17934C20.7552 8.46624 20.4626 8.75877 19.634 9.55682L20.6746 10.6372ZM20.9538 5.73319C21.361 6.49847 21.3475 7.42702 20.9187 8.17934L22.2219 8.92206C22.9056 7.72256 22.9267 6.24777 22.2781 5.02866L20.9538 5.73319ZM20.781 3.26811C20.051 2.52241 19.5767 2.02656 19.0544 1.7366L18.3263 3.04804C18.6091 3.20504 18.9029 3.49383 19.7091 4.31741L20.781 3.26811ZM14.6248 4.39413C15.4069 3.54677 15.6924 3.24909 15.9708 3.08354L15.204 1.79431C14.6905 2.09971 14.2308 2.6094 13.5226 3.37677L14.6248 4.39413ZM19.0544 1.7366C17.8496 1.06772 16.3886 1.0898 15.204 1.79431L15.9708 3.08354C16.6969 2.65172 17.5886 2.63846 18.3263 3.04804L19.0544 1.7366ZM12.973 5.03371L19.0854 11.1461L20.1461 10.0854L14.0337 3.97305L12.973 5.03371ZM14 22.75H22V21.25H14V22.75Z" fill="#ff6d3a" fillOpacity="1"></path></svg></div></div><div className={styles.skillsGrid}><div className={styles.skillBlock}><p className={styles.scoreLabel}>Reading</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>_</p></div></div></div><div className={styles.skillBlock}><p className={styles.scoreLabel}>Listening</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>_</p></div></div></div><div className={styles.skillBlock}><p className={styles.scoreLabel}>Writing</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>_</p></div></div></div><div className={styles.skillBlock}><p className={styles.scoreLabel}>Speaking</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>_</p></div></div></div></div></div></div><div className={`${styles.boxShadowTable} ${styles.customExamCard}`}><div className={styles.customCardHeader}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M6.33203 8.66667H9.66536M4.33203 8.66667H4.33802M7.66536 11.3333H4.33203M9.66536 11.3333H9.65938" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11 1.33334V2.66667M3 1.33334V2.66667" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M0.666016 8.16216C0.666016 5.25729 0.666016 3.80486 1.50076 2.90243C2.33551 2 3.67901 2 6.36602 2H7.63268C10.3197 2 11.6632 2 12.4979 2.90243C13.3327 3.80486 13.3327 5.25729 13.3327 8.16216V8.5045C13.3327 11.4094 13.3327 12.8618 12.4979 13.7642C11.6632 14.6667 10.3197 14.6667 7.63268 14.6667H6.36602C3.67901 14.6667 2.33551 14.6667 1.50076 13.7642C0.666016 12.8618 0.666016 11.4094 0.666016 8.5045V8.16216Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1 5.33334H13" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg> <p className={styles.cardHeaderTitle}>Lịch thi</p></div><div className={styles.examCardBody}><div className={styles.examDateBlock}><div className="h-full"><p className={styles.examSublabel}>Ngày dự thi</p><div className={styles.examValueWrapper}><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.cardHeaderTitle}>_ / _ / _</p></div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]"><path d="M3.26538 21.9613L3.28499 21.2115H3.28498L3.26538 21.9613ZM2.03608 20.5662L2.78381 20.6244L2.03608 20.5662ZM4.78943 13.9445L4.2383 13.4358L4.78943 13.9445ZM2.06308 20.2197L1.31534 20.1614H1.31534L2.06308 20.2197ZM10.7506 19.1543L10.2303 18.6141L10.7506 19.1543ZM3.54536 21.9686L3.52576 22.7183H3.52576L3.54536 21.9686ZM21.6159 5.38093L22.2781 5.02866L21.6159 5.38093ZM20.1543 10.097L19.634 9.55682L20.1543 10.097ZM21.5703 8.5507L20.9187 8.17934L21.5703 8.5507ZM18.6904 2.39232L18.3263 3.04804L18.6904 2.39232ZM14.0737 3.88545L14.6248 4.39413L14.0737 3.88545ZM15.5874 2.43893L15.204 1.79431V1.79431L15.5874 2.43893ZM14.0337 3.97305C13.7408 3.68015 13.2659 3.68015 12.973 3.97305C12.6802 4.26594 12.6802 4.74081 12.973 5.03371L14.0337 3.97305ZM19.0854 11.1461C19.3783 11.439 19.8532 11.439 20.1461 11.1461C20.439 10.8532 20.439 10.3783 20.1461 10.0854L19.0854 11.1461ZM14 21.25C13.5858 21.25 13.25 21.5858 13.25 22C13.25 22.4142 13.5858 22.75 14 22.75V21.25ZM22 22.75C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25V22.75ZM19.634 9.55682L10.2303 18.6141L11.2709 19.6945L20.6746 10.6372L19.634 9.55682ZM5.34056 14.4532L14.6248 4.39413L13.5226 3.37677L4.2383 13.4358L5.34056 14.4532ZM3.56497 21.2188L3.28499 21.2115L3.24577 22.711L3.52576 22.7183L3.56497 21.2188ZM2.78381 20.6244L2.81081 20.2779L1.31534 20.1614L1.28835 20.5079L2.78381 20.6244ZM3.28498 21.2115C3.12547 21.2073 2.99912 21.204 2.89063 21.1983C2.78169 21.1926 2.7103 21.1854 2.66125 21.1772C2.56902 21.1618 2.63793 21.1566 2.7063 21.2342L1.58088 22.2259C1.83132 22.5101 2.14789 22.6123 2.41442 22.6568C2.65767 22.6974 2.95477 22.7034 3.24577 22.711L3.28498 21.2115ZM1.28835 20.5079C1.26514 20.8057 1.24028 21.1043 1.25407 21.3517C1.26897 21.6191 1.33267 21.9442 1.58088 22.2259L2.7063 21.2342C2.77242 21.3092 2.7575 21.3715 2.75175 21.2682C2.74487 21.1448 2.7573 20.9648 2.78381 20.6244L1.28835 20.5079ZM4.2383 13.4358C3.06241 14.7098 2.3488 15.4688 1.93583 16.4194L3.31159 17.0171C3.60008 16.3531 4.09646 15.8011 5.34056 14.4532L4.2383 13.4358ZM2.81081 20.2779C2.95467 18.4314 3.02254 17.6824 3.31159 17.0171L1.93583 16.4194C1.52341 17.3686 1.45135 18.4157 1.31534 20.1614L2.81081 20.2779ZM10.2303 18.6141C8.6878 20.0998 8.05899 20.6868 7.2952 20.9851L7.84093 22.3823C8.94901 21.9495 9.81795 21.0939 11.2709 19.6945L10.2303 18.6141ZM3.52576 22.7183C5.52172 22.7705 6.73118 22.8158 7.84093 22.3823L7.2952 20.9851C6.53307 21.2828 5.68469 21.2743 3.56497 21.2188L3.52576 22.7183ZM19.7091 4.31741C20.5143 5.13994 20.7985 5.4413 20.9538 5.73319L22.2781 5.02866C21.9958 4.49815 21.512 4.01486 20.781 3.26811L19.7091 4.31741ZM20.6746 10.6372C21.4267 9.91278 21.9244 9.44408 22.2219 8.92206L20.9187 8.17934C20.7552 8.46624 20.4626 8.75877 19.634 9.55682L20.6746 10.6372ZM20.9538 5.73319C21.361 6.49847 21.3475 7.42702 20.9187 8.17934L22.2219 8.92206C22.9056 7.72256 22.9267 6.24777 22.2781 5.02866L20.9538 5.73319ZM20.781 3.26811C20.051 2.52241 19.5767 2.02656 19.0544 1.7366L18.3263 3.04804C18.6091 3.20504 18.9029 3.49383 19.7091 4.31741L20.781 3.26811ZM14.6248 4.39413C15.4069 3.54677 15.6924 3.24909 15.9708 3.08354L15.204 1.79431C14.6905 2.09971 14.2308 2.6094 13.5226 3.37677L14.6248 4.39413ZM19.0544 1.7366C17.8496 1.06772 16.3886 1.0898 15.204 1.79431L15.9708 3.08354C16.6969 2.65172 17.5886 2.63846 18.3263 3.04804L19.0544 1.7366ZM12.973 5.03371L19.0854 11.1461L20.1461 10.0854L14.0337 3.97305L12.973 5.03371ZM14 22.75H22V21.25H14V22.75Z" fill="#3C3C43" fillOpacity="1"></path></svg></div></div></div><div className={styles.daysLeftBlock}><div className="h-full"><p className={styles.examSublabel}>Số ngày còn lại</p><div className={styles.examValueWrapper}><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={`${styles.examValueText} ${styles.flexCenter}`}>_ ngày</p></div></div></div></div></div></div></div></div></div>

              <div className={styles.diligenceStatsRow}><div className={styles.diligenceHalf}><div className={styles.hFull}><div className={styles.calendarCard}><div className={styles.calendarCardHeader}><div className={styles.calendarHeaderLeft}><div className={styles.calendarHeaderFlex}><p className={styles.calendarTitle}>Biểu đồ “chăm chỉ” của bạn</p><div className={styles.calendarIndicatorWrapper}><div className={styles.calendarIndicator}><div className={styles.indicatorDot}></div><p className={styles.caption2}>Có nộp bài</p></div></div></div><p className={styles.caption2Light}>Bấm vào ngày/tuần để xem thống kê chi tiết số bài đã làm</p></div></div><div className={styles.flexItemsStart}><div className={styles.wFull}><div className={styles.flexJustifyBetweenStart}><div className={styles.flexJustifyEndGap5}><div className={styles.calendarWrap}><div className={styles.calendarBody} id="scrollableDiv" style={{overflow: "auto", display: "flex", flexDirection: "column-reverse"}}><div className={styles.infiniteScrollOuter}><div className={styles.infiniteScrollInner} style={{height: "auto", overflow: "auto"}}><div style={{position: "relative"}}><div style={{position: "absolute", left: 0, right: 0, top: -32}}><div className={styles.textCenterMt8}>Loading...</div></div></div><div id="2026-04" className=""><div className={styles.monthCalendar}><div className={styles.calendarTable}><div className={styles.monthTitle}>Tháng 04 / 2026</div><div className={styles.weekDayHeader}><div className={styles.defaultBoxWeek}></div><div className={styles.itemWeekDay}>T2</div><div className={styles.itemWeekDay}>T3</div><div className={styles.itemWeekDay}>T4</div><div className={styles.itemWeekDay}>T5</div><div className={styles.itemWeekDay}>T6</div><div className={styles.itemWeekDay}>T7</div><div className={styles.itemWeekDay}>CN</div></div><div className={styles.calendarWeekRow} id="2026-03-30"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 1</span></div><div className={styles.dayItem}><span className={styles.opacity0}>30</span></div><div className={styles.dayItem}><span className={styles.opacity0}>31</span></div><div className={styles.dayItem}><span className={styles.opacity1}>1</span></div><div className={styles.dayItem}><span className={styles.opacity1}>2</span></div><div className={styles.dayItem}><span className={styles.opacity1}>3</span></div><div className={styles.dayItem}><span className={styles.opacity1}>4</span></div><div className={styles.dayItem}><span className={styles.opacity1}>5</span></div></div><div className={styles.calendarWeekRow} id="2026-04-06"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 2</span></div><div className={styles.dayItem}><span className={styles.opacity1}>6</span></div><div className={styles.dayItem}><span className={styles.opacity1}>7</span></div><div className={styles.dayItem}><span className={styles.opacity1}>8</span></div><div className={styles.dayItem}><span className={styles.opacity1}>9</span></div><div className={styles.dayItem}><span className={styles.opacity1}>10</span></div><div className={styles.dayItem}><span className={styles.opacity1}>11</span></div><div className={styles.dayItem}><span className={styles.opacity1}>12</span></div></div><div className={styles.calendarWeekRow} id="2026-04-13"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 3</span></div><div className={styles.dayItem}><span className={styles.opacity1}>13</span></div><div className={styles.dayItem}><span className={styles.opacity1}>14</span></div><div className={styles.dayItem}><span className={styles.opacity1}>15</span></div><div className={styles.dayItem}><span className={styles.opacity1}>16</span></div><div className={styles.dayItem}><span className={styles.opacity1}>17</span></div><div className={styles.dayItem}><span className={styles.opacity1}>18</span></div><div className={styles.dayItem}><span className={styles.opacity1}>19</span></div></div><div className={styles.calendarWeekRow} id="2026-04-20"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 4</span></div><div className={styles.dayItem}><span className={styles.opacity1}>20</span></div><div className={styles.dayItem}><span className={styles.opacity1}>21</span></div><div className={styles.dayItem}><span className={styles.opacity1}>22</span></div><div className={styles.dayItem}><span className={styles.opacity1}>23</span></div><div className={styles.dayItem}><span className={styles.opacity1}>24</span></div><div className={styles.dayItem}><span className={styles.opacity1}>25</span></div><div className={styles.dayItem}><span className={styles.opacity1}>26</span></div></div><div className={styles.calendarWeekRow} id="2026-04-27"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 5</span></div><div className={styles.dayItem}><span className={styles.opacity1}>27</span></div><div className={styles.dayItem}><span className={styles.opacity1}>28</span></div><div className={styles.dayItem}><span className={styles.opacity1}>29</span></div><div className={styles.dayItem}><span className={styles.opacity1}>30</span></div><div className={styles.dayItem}><span className={styles.opacity0}>1</span></div><div className={styles.dayItem}><span className={styles.opacity0}>2</span></div><div className={styles.dayItem}><span className={styles.opacity0}>3</span></div></div></div></div></div><div id="2026-05" className=""><div className={styles.monthCalendar}><div className={styles.calendarTable}><div className={styles.monthTitle}>Tháng 05 / 2026</div><div className={styles.weekDayHeader}><div className={styles.defaultBoxWeek}></div><div className={styles.itemWeekDay}>T2</div><div className={styles.itemWeekDay}>T3</div><div className={styles.itemWeekDay}>T4</div><div className={styles.itemWeekDay}>T5</div><div className={styles.itemWeekDay}>T6</div><div className={styles.itemWeekDay}>T7</div><div className={styles.itemWeekDay}>CN</div></div><div className={styles.calendarWeekRow} id="2026-04-27"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 1</span></div><div className={styles.dayItem}><span className={styles.opacity0}>27</span></div><div className={styles.dayItem}><span className={styles.opacity0}>28</span></div><div className={styles.dayItem}><span className={styles.opacity0}>29</span></div><div className={styles.dayItem}><span className={styles.opacity0}>30</span></div><div className={styles.dayItem}><span className={styles.opacity1}>1</span></div><div className={styles.dayItem}><span className={styles.opacity1}>2</span></div><div className={styles.dayItem}><span className={styles.opacity1}>3</span></div></div><div className={styles.calendarWeekRow} id="2026-05-04"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 2</span></div><div className={styles.dayItem}><span className={styles.opacity1}>4</span></div><div className={styles.dayItem}><span className={styles.opacity1}>5</span></div><div className={styles.dayItem}><span className={styles.opacity1}>6</span></div><div className={styles.dayItem}><span className={styles.opacity1}>7</span></div><div className={styles.dayItem}><span className={styles.opacity1}>8</span></div><div className={styles.dayItem}><span className={styles.opacity1}>9</span></div><div className={styles.dayItem}><span className={styles.opacity1}>10</span></div></div><div className={styles.calendarWeekRow} id="2026-05-11"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 3</span></div><div className={styles.dayItem}><span className={styles.opacity1}>11</span></div><div className={styles.dayItem}><span className={styles.opacity1}>12</span></div><div className={styles.dayItem}><span className={styles.opacity1}>13</span></div><div className={styles.dayItem}><span className={styles.opacity1}>14</span></div><div className={styles.dayItem}><span className={styles.opacity1}>15</span></div><div className={styles.dayItem}><span className={styles.opacity1}>16</span></div><div className={styles.dayItem}><span className={styles.opacity1}>17</span></div></div><div className={styles.calendarWeekRow} id="2026-05-18"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 4</span></div><div className={styles.dayItem}><span className={styles.opacity1}>18</span></div><div className={styles.dayItem}><span className={styles.opacity1}>19</span></div><div className={styles.dayItem}><span className={styles.opacity1}>20</span></div><div className={styles.dayItem}><span className={styles.opacity1}>21</span></div><div className={styles.dayItem}><span className={styles.opacity1}>22</span></div><div className={styles.dayItem}><span className={styles.opacity1}>23</span></div><div className={styles.dayItem}><span className={styles.opacity1}>24</span></div></div><div className={styles.calendarWeekRow} id="2026-05-25"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 5</span></div><div className={styles.dayItem}><span className={styles.opacity1}>25</span></div><div className={styles.dayItem}><span className={styles.opacity1}>26</span></div><div className={styles.dayItem}><span className={styles.opacity1}>27</span></div><div className={styles.dayItem}><span className={styles.opacity1}>28</span></div><div className={styles.dayItem}><span className={styles.opacity1}>29</span></div><div className={styles.dayItem}><span className={styles.opacity1}>30</span></div><div className={styles.dayItem}><span className={styles.opacity1}>31</span></div></div></div></div></div><div id="2026-06" className=""><div className={styles.monthCalendar}><div className={styles.calendarTable}><div className={styles.monthTitle}>Tháng 06 / 2026</div><div className={styles.weekDayHeader}><div className={styles.defaultBoxWeek}></div><div className={styles.itemWeekDay}>T2</div><div className={styles.itemWeekDay}>T3</div><div className={styles.itemWeekDay}>T4</div><div className={styles.itemWeekDay}>T5</div><div className={styles.itemWeekDay}>T6</div><div className={styles.itemWeekDay}>T7</div><div className={styles.itemWeekDay}>CN</div></div><div className={styles.calendarWeekRow} id="2026-06-01"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 1</span></div><div className={styles.dayItem}><span className={styles.opacity1}>1</span></div><div className={styles.dayItem}><span className={styles.opacity1}>2</span></div><div className={styles.dayItem}><span className={styles.opacity1}>3</span></div><div className={styles.dayItem}><span className={styles.opacity1}>4</span></div><div className={styles.dayItem}><span className={styles.opacity1}>5</span></div><div className={styles.dayItem}><span className={styles.opacity1}>6</span></div><div className={styles.dayItem}><span className={styles.opacity1}>7</span></div></div><div className={styles.calendarWeekRow} id="2026-06-08"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 2</span></div><div className={styles.dayItem}><span className={styles.opacity1}>8</span></div><div className={styles.dayItem}><span className={styles.opacity1}>9</span></div><div className={styles.dayItem}><span className={styles.opacity1}>10</span></div><div className={styles.dayItem}><span className={styles.opacity1}>11</span></div><div className={styles.dayItem}><span className={styles.opacity1}>12</span></div><div className={styles.dayItem}><span className={styles.opacity1}>13</span></div><div className={styles.dayItem}><span className={styles.opacity1}>14</span></div></div><div className={styles.calendarWeekRow} id="2026-06-15"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 3</span></div><div className={styles.dayItem}><span className={styles.opacity1}>15</span></div><div className={styles.dayItem}><span className={styles.opacity1}>16</span></div><div className={styles.dayItem}><span className={styles.opacity1}>17</span></div><div className={styles.dayItem}><span className={styles.opacity1}>18</span></div><div className={styles.dayItem}><span className={styles.opacity1}>19</span></div><div className={styles.dayItem}><span className={styles.opacity1}>20</span></div><div className={styles.dayItem}><span className={styles.opacity1}>21</span></div></div><div className={styles.calendarWeekRow} id="2026-06-22"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 4</span></div><div className={`${styles.dayItem} ${styles.weekItemActive}`} style={{position: "relative"}}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#f59e0b" viewBox="0 0 24 24" style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 1}}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><span className={styles.opacity1} style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, color: "#1c2a4c", fontWeight: 700, fontSize: "12px"}}>22</span></div><div className={`${styles.dayItem} ${styles.weekItemActive}`} style={{position: "relative"}}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#f59e0b" viewBox="0 0 24 24" style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 1}}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><span className={styles.opacity1} style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, color: "#1c2a4c", fontWeight: 700, fontSize: "12px"}}>23</span></div><div className={`${styles.dayItem} ${styles.weekItemActive}`} style={{position: "relative"}}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#f59e0b" viewBox="0 0 24 24" style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 1}}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><span className={styles.opacity1} style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, color: "#1c2a4c", fontWeight: 700, fontSize: "12px"}}>24</span></div><div className={`${styles.dayItem} ${styles.weekItemActive}`} style={{position: "relative"}}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#f59e0b" viewBox="0 0 24 24" style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 1}}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><span className={styles.opacity1} style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, color: "#1c2a4c", fontWeight: 700, fontSize: "12px"}}>25</span></div><div className={`${styles.dayItem} ${styles.weekItemActive}`} style={{position: "relative"}}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#f59e0b" viewBox="0 0 24 24" style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 1}}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><span className={styles.opacity1} style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, color: "#1c2a4c", fontWeight: 700, fontSize: "12px"}}>26</span></div><div className={`${styles.dayItem} ${styles.weekItemActive} ${styles.currentDay}`} style={{position: "relative"}}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#f59e0b" viewBox="0 0 24 24" style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 1}}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><span className={styles.opacity1} style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, color: "#1c2a4c", fontWeight: 700, fontSize: "12px"}}>27</span></div><div className={`${styles.dayItem} ${styles.weekItemActive}`} style={{position: "relative"}}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#f59e0b" viewBox="0 0 24 24" style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 1}}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><span className={styles.opacity1} style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, color: "#1c2a4c", fontWeight: 700, fontSize: "12px"}}>28</span></div></div><div className={styles.calendarWeekRow} id="2026-06-29"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 5</span></div><div className={styles.dayItem}><span className={styles.opacity1}>29</span></div><div className={styles.dayItem}><span className={styles.opacity1}>30</span></div><div className={styles.dayItem}><span className={styles.opacity0}>1</span></div><div className={styles.dayItem}><span className={styles.opacity0}>2</span></div><div className={styles.dayItem}><span className={styles.opacity0}>3</span></div><div className={styles.dayItem}><span className={styles.opacity0}>4</span></div><div className={styles.dayItem}><span className={styles.opacity0}>5</span></div></div></div></div></div><div id="2026-07" className=""><div className={styles.monthCalendar}><div className={styles.calendarTable}><div className={styles.monthTitle}>Tháng 07 / 2026</div><div className={styles.weekDayHeader}><div className={styles.defaultBoxWeek}></div><div className={styles.itemWeekDay}>T2</div><div className={styles.itemWeekDay}>T3</div><div className={styles.itemWeekDay}>T4</div><div className={styles.itemWeekDay}>T5</div><div className={styles.itemWeekDay}>T6</div><div className={styles.itemWeekDay}>T7</div><div className={styles.itemWeekDay}>CN</div></div><div className={styles.calendarWeekRow} id="2026-06-29"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 1</span></div><div className={styles.dayItem}><span className={styles.opacity0}>29</span></div><div className={styles.dayItem}><span className={styles.opacity0}>30</span></div><div className={styles.dayItem}><span className={styles.opacity1}>1</span></div><div className={styles.dayItem}><span className={styles.opacity1}>2</span></div><div className={styles.dayItem}><span className={styles.opacity1}>3</span></div><div className={styles.dayItem}><span className={styles.opacity1}>4</span></div><div className={styles.dayItem}><span className={styles.opacity1}>5</span></div></div><div className={styles.calendarWeekRow} id="2026-07-06"><div className={styles.weekItem}><span className={styles.body03Bold}>Tuần 2</span></div><div className={styles.dayItem}><span className={styles.opacity1}>6</span></div><div className={styles.dayItem}><span className={styles.opacity1}>7</span></div><div className={styles.dayItem}><span className={styles.opacity1}>8</span></div><div className={styles.dayItem}><span className={styles.opacity1}>9</span></div><div className={styles.dayItem}><span className={styles.opacity1}>10</span></div><div className={styles.dayItem}><span className={styles.opacity1}>11</span></div><div className={styles.dayItem}><span className={styles.opacity1}>12</span></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div><div className={styles.statsHalf}><div className={styles.flexGap16}><div className={styles.statsCard}><div className={styles.statsCardHeader}><p className={styles.calendarTitle}>Thống kê số bài đã làm trong tuần</p></div><div className=""><div className={`${styles.gridTable} ${styles.bgHeader}`}><p className={styles.statsCellHeader}>Ngày</p><p className={styles.statsCellHeader}>Reading</p><p className={styles.statsCellHeader}>Listening</p><p className={styles.statsCellHeader}>Writing</p><p className={styles.statsCellHeader}>Speaking</p><p className={styles.statsCellHeader}>Thời gian học</p></div><div className={styles.gridTable}><div className={styles.statsCellData}>22/06/2026</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>0m</div></div><div className={styles.gridTable}><div className={styles.statsCellData}>23/06/2026</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>0m</div></div><div className={styles.gridTable}><div className={styles.statsCellData}>24/06/2026</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>0m</div></div><div className={styles.gridTable}><div className={styles.statsCellData}>25/06/2026</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>0m</div></div><div className={styles.gridTable}><div className={styles.statsCellData}>26/06/2026</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>15m</div></div><div className={styles.gridTable}><div className={styles.statsCellData}>27/06/2026</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>0m</div></div><div className={styles.gridTable}><div className={styles.statsCellData}>28/06/2026</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>-</div><div className={styles.statsCellData}>0m</div></div><div className={`${styles.gridTable} ${styles.borderFooter}`}><p className={styles.statsCellFooter}>Tổng cộng</p><p className={styles.statsCellFooter} id="reading-all">0</p><p className={styles.statsCellFooter} id="listening-all">0</p><p className={styles.statsCellFooter} id="writing-all">0</p><p className={styles.statsCellFooter} id="speaking-all">0</p><p className={`${styles.statsCellFooter} ${styles.borderNone}`} id="leaned-all">15m</p></div></div></div></div></div></div>

</div>


              {/* Progress Trends Panel (Biểu đồ tiến bộ) */}
              <div className={styles.panelContainer}>
                <div className={styles.panelHeader}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>
                      <img
                        src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ffdef2a8c87b16406d124ddcd401ebfe908f9bf82.svg?generation=1782490146338983&alt=media"
                        alt="Progress trends"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </span>
                    Xu hướng tiến bộ (Biểu đồ tiến bộ)
                  </h3>
                  <div className={styles.panelToggle}>
                    <button
                      onClick={() => setProgressView("week")}
                      className={`${styles.panelToggleBtn} ${progressView === "week" ? styles.panelToggleBtnActive : ""}`}
                    >
                      Theo tuần
                    </button>
                    <button
                      onClick={() => setProgressView("month")}
                      className={`${styles.panelToggleBtn} ${progressView === "month" ? styles.panelToggleBtnActive : ""}`}
                    >
                      Theo tháng
                    </button>
                  </div>
                </div>
                <div className={styles.chartBody} style={{ padding: "30px 40px 10px 40px", height: "auto" }}>
                  <div style={{ width: "100%" }}>

                    {/* Render live SVG line chart */}
                    {progressView === "week" ? <WeekChart /> : <MonthChart />}

                    {/* Legend block below the chart */}
                    <div style={{ marginTop: 16, fontSize: 12, padding: "8px 0" }}>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
                        <li style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ display: "inline-block", width: 12, height: 4, backgroundColor: "rgb(34, 197, 94)", borderRadius: 2 }} />
                          <span style={{ color: "#3d4863", fontWeight: 500 }}>Flashcard</span>
                        </li>
                        <li style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ display: "inline-block", width: 12, height: 4, backgroundColor: "#f59e0b", borderRadius: 2 }} />
                          <span style={{ color: "#3d4863", fontWeight: 500 }}>Lý thuyết</span>
                        </li>
                        <li style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ display: "inline-block", width: 12, height: 4, backgroundColor: "rgb(59, 130, 246)", borderRadius: 2 }} />
                          <span style={{ color: "#3d4863", fontWeight: 500 }}>Bài tập</span>
                        </li>
                        <li style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ display: "inline-block", width: 12, height: 4, backgroundColor: "rgb(139, 92, 246)", borderRadius: 2 }} />
                          <span style={{ color: "#3d4863", fontWeight: 500 }}>Kiểm tra</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>

              {/* Activity Heat Map Section (Bạn đã chăm chỉ ra sao) */}
              <div className={styles.panelContainer} style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>
                      <img
                        src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F795e06cdf98395cdc7b1cb67370a5ae9f27bad08.svg?generation=1782490146449102&alt=media"
                        alt="Hoạt động học tập"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </span>
                    Bạn đã chăm chỉ ra sao? (Hoạt động học tập)
                    <span className={styles.panelTitleSpan}>— Năm 2026</span>
                  </h3>
                  <div className={styles.activityHeaderStats}>
                    <span>Hoạt động <strong>{activeDaysCount}</strong>/ {totalTrackedDays} ngày</span>
                    <span className={styles.activityBadge}>{activePercentage} %</span>
                  </div>
                </div>

                <div className={styles.heatMapScroll}>
                  <div className={styles.heatMapContainer}>
                    {/* Months header label row */}
                    <div className={styles.monthsLabelRow}>
                      <span className={styles.monthLabel} style={{ left: 44 }}>Thg 4</span>
                      <span className={styles.monthLabel} style={{ left: 108 }}>Thg 5</span>
                      <span className={styles.monthLabel} style={{ left: 172 }}>Thg 6</span>
                    </div>

                    {/* Heatmap structure with filled activity data */}
                    <div className={styles.heatMapGridRow}>
                      <div className={styles.daysColumn}>
                        <div className={styles.dayLabel}>T2</div>
                        <div className={styles.dayLabel}>T4</div>
                        <div className={styles.dayLabel}>T6</div>
                        <div className={styles.dayLabel}>CN</div>
                      </div>

                      <div className={styles.weeksContainer}>
                        {Array.from({ length: 14 }).map((_, wIndex) => (
                          <div key={wIndex} className={styles.weekColumn}>
                            {Array.from({ length: 7 }).map((_, dIndex) => {
                              const cellIndex = wIndex * 7 + dIndex;
                              const activityLevel = heatmapCells[cellIndex] || 0;
                              let cellClass = styles.cellL0;

                              if (activityLevel === 1) cellClass = styles.cellL1;
                              else if (activityLevel === 2) cellClass = styles.cellL2;
                              else if (activityLevel === 3) cellClass = styles.cellL3;
                              else if (activityLevel === 4) cellClass = styles.cellL4;

                              // If it's the last column, only render 5 cells to match App.tsx design constraints
                              if (wIndex === 13 && (dIndex === 0 || dIndex === 5 || dIndex === 6)) {
                                return <div key={dIndex} className={styles.cell} style={{ backgroundColor: "transparent" }} />;
                              }
                              return <div key={dIndex} className={`${styles.cell} ${cellClass}`} />;
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.heatMapLegend}>
                  <span>Ít</span>
                  <div className={`${styles.legendBox} ${styles.cellL0}`} />
                  <div className={`${styles.legendBox} ${styles.cellL1}`} />
                  <div className={`${styles.legendBox} ${styles.cellL2}`} />
                  <div className={`${styles.legendBox} ${styles.cellL3}`} />
                  <div className={`${styles.legendBox} ${styles.cellL4}`} />
                  <span>Nhiều</span>
                </div>
              </div>

              {/* Two Column Details Grid: Cần luyện tập thêm & Từ vựng */}
              <div className={styles.detailsGrid}>

                {/* Cần luyện tập thêm (Điểm yếu) */}
                <div className={styles.detailsCard}>
                  <div className={styles.detailsTitleRow}>
                    <div className={styles.detailsIcon}>
                      <img
                        src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F763cb4c9254469015ffb480e1d973b6ab26f5bf0.svg?generation=1782490146460049&alt=media"
                        alt="Điểm yếu"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <span>Cần luyện tập thêm (Điểm yếu)</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
                    <div style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 12, backgroundColor: "#f9fafb" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontWeight: 600, fontSize: 13, color: "#1c2a4c" }}>Thì hiện tại hoàn thành (Present Perfect)</span>
                        <span style={{ fontWeight: "bold", fontSize: 13, color: "#ef4444" }}>42% chính xác</span>
                      </div>
                      <div className={styles.cardProgressTrack} style={{ height: 6, marginTop: 4 }}>
                        <div className={styles.cardProgressBar} style={{ width: "42%", backgroundColor: "#ef4444" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                        <button style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>Luyện tập ngay</button>
                      </div>
                    </div>

                    <div style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 12, backgroundColor: "#f9fafb" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontWeight: 600, fontSize: 13, color: "#1c2a4c" }}>Phrasal Verbs with 'Take' & 'Get'</span>
                        <span style={{ fontWeight: "bold", fontSize: 13, color: "#f59e0b" }}>55% chính xác</span>
                      </div>
                      <div className={styles.cardProgressTrack} style={{ height: 6, marginTop: 4 }}>
                        <div className={styles.cardProgressBar} style={{ width: "55%", backgroundColor: "#f59e0b" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                        <button style={{ backgroundColor: "#f59e0b", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>Luyện tập ngay</button>
                      </div>
                    </div>

                    <div style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 12, backgroundColor: "#f9fafb" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontWeight: 600, fontSize: 13, color: "#1c2a4c" }}>Câu điều kiện loại 3 & Hỗn hợp</span>
                        <span style={{ fontWeight: "bold", fontSize: 13, color: "#f59e0b" }}>58% chính xác</span>
                      </div>
                      <div className={styles.cardProgressTrack} style={{ height: 6, marginTop: 4 }}>
                        <div className={styles.cardProgressBar} style={{ width: "58%", backgroundColor: "#f59e0b" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                        <button style={{ backgroundColor: "#f59e0b", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>Luyện tập ngay</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Từ vựng */}
                <div className={styles.detailsCard}>
                  <div className={styles.detailsTitleRow}>
                    <div className={styles.detailsIcon}>
                      <img
                        src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ffd81ae03ab31a36a96a82a31799e540361508849.svg?generation=1782490146472628&alt=media"
                        alt="Từ vựng"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <span>Từ vựng</span>
                    <span className={styles.detailsTitleSpan}>Tổng hệ thống: 19561 từ</span>
                  </div>

                  <div>
                    <div className={styles.vocabStatRow}>
                      <span className={styles.vocabBigNumber}>850</span>
                      <span className={styles.vocabLabelText}>
                        <strong>/ 19561</strong> từ đã bắt đầu học
                      </span>
                      <span className={styles.vocabPercentage}>4.3 %</span>
                    </div>

                    <div className={styles.cardProgressTrack}>
                      <div
                        className={styles.cardProgressBar}
                        style={{
                          width: "4.3%",
                          backgroundImage: "linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129))"
                        }}
                      />
                    </div>

                    <div className={styles.vocabGreenPanel}>
                      <div className={styles.vocabGreenIcon}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0aa6414df27126c4f446e86e9c2fce9f80285e52.svg?generation=1782490146482383&alt=media"
                          alt="Green Check"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                      <span className={styles.vocabGreenText}>
                        Trong đó <strong>240</strong> từ đã thuộc
                      </span>
                    </div>
                  </div>

                  <div className={styles.vocabGridList}>
                    <div className={styles.vocabGridItem}>
                      <div className={styles.vocabGridIconWrap}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fedd36aac750d4c2b10a666c0fadc7309f90b56fa.svg?generation=1782490146473279&alt=media"
                          alt="Gray Book"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                      <div>
                        <p className={styles.vocabGridValue}>18711</p>
                        <p className={styles.vocabGridLabel}>Chưa học</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Study History Section */}
              <div className={styles.panelContainer}>
                <div className={styles.panelHeader}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>
                      <img
                        src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F936a7ff83cbc23e56ec666597825d459466b1dfe.svg?generation=1782490146853459&alt=media"
                        alt="Lịch sử"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </span>
                    Lịch sử học tập
                  </h3>
                  <div className={styles.historyTabs}>
                    <button
                      onClick={() => setHistoryTab("quiz")}
                      className={`${styles.historyTabBtn} ${historyTab === "quiz" ? styles.historyTabBtnActive : ""}`}
                    >
                      <span className={styles.historyTabIcon}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F5ada226ec04ce5b8e5f78bc5d4dc032075937bfa.svg?generation=1782490146586580&alt=media"
                          alt="Quiz"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </span>
                      Quiz
                    </button>
                    <button
                      onClick={() => setHistoryTab("flashcard")}
                      className={`${styles.historyTabBtn} ${historyTab === "flashcard" ? styles.historyTabBtnActive : ""}`}
                    >
                      <span className={styles.historyTabIcon}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fe4c04ca899d9a60b190cefa5296a3e60b60c47c8.svg?generation=1782490146599805&alt=media"
                          alt="Flashcard"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </span>
                      Flashcard
                    </button>
                    <button
                      onClick={() => setHistoryTab("test")}
                      className={`${styles.historyTabBtn} ${historyTab === "test" ? styles.historyTabBtnActive : ""}`}
                    >
                      <span className={styles.historyTabIcon}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff343a758417b2a46afc098b661b6d4eebbebc9d5.svg?generation=1782490146588043&alt=media"
                          alt="Test"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </span>
                      Kiểm tra
                    </button>
                  </div>
                </div>

                {/* History table mock */}
                <div style={{ minHeight: 200, padding: 20 }}>
                  {historyTab === "quiz" && (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #e5e7eb", color: "#a3acc2" }}>
                            <th style={{ padding: "12px 8px" }}>Bài Quiz</th>
                            <th style={{ padding: "12px 8px" }}>Thời gian</th>
                            <th style={{ padding: "12px 8px" }}>Số câu đúng</th>
                            <th style={{ padding: "12px 8px" }}>Tỷ lệ</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <td style={{ padding: "12px 8px", fontWeight: 600, color: "#1c2a4c" }}>Quiz: Thì hiện tại đơn</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>2 giờ trước</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>9/10 câu</td>
                            <td style={{ padding: "12px 8px", fontWeight: "bold", color: "#10b981" }}>90%</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <td style={{ padding: "12px 8px", fontWeight: 600, color: "#1c2a4c" }}>Quiz: Động từ khuyết thiếu</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>Hôm qua</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>8/10 câu</td>
                            <td style={{ padding: "12px 8px", fontWeight: "bold", color: "#10b981" }}>80%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {historyTab === "flashcard" && (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #e5e7eb", color: "#a3acc2" }}>
                            <th style={{ padding: "12px 8px" }}>Chủ đề từ vựng</th>
                            <th style={{ padding: "12px 8px" }}>Thời gian</th>
                            <th style={{ padding: "12px 8px" }}>Số từ đã học</th>
                            <th style={{ padding: "12px 8px" }}>Đánh giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <td style={{ padding: "12px 8px", fontWeight: 600, color: "#1c2a4c" }}>Academic Vocabulary - Unit 1</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>3 giờ trước</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>20 từ</td>
                            <td style={{ padding: "12px 8px", fontWeight: "bold", color: "#10b981" }}>Đạt mục tiêu</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <td style={{ padding: "12px 8px", fontWeight: 600, color: "#1c2a4c" }}>IELTS Topic: Environment</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>3 ngày trước</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>15 từ</td>
                            <td style={{ padding: "12px 8px", fontWeight: "bold", color: "#10b981" }}>Đạt mục tiêu</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {historyTab === "test" && (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #e5e7eb", color: "#a3acc2" }}>
                            <th style={{ padding: "12px 8px" }}>Đề kiểm tra</th>
                            <th style={{ padding: "12px 8px" }}>Ngày thi</th>
                            <th style={{ padding: "12px 8px" }}>Thời gian làm bài</th>
                            <th style={{ padding: "12px 8px" }}>Kết quả</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <td style={{ padding: "12px 8px", fontWeight: 600, color: "#1c2a4c" }}>Đề thi thử THPT Quốc gia 2026 - Lần 1</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>25/06/2026</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>58 phút</td>
                            <td style={{ padding: "12px 8px", fontWeight: "bold", color: "rgb(139, 92, 246)" }}>8.2 / 10</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <td style={{ padding: "12px 8px", fontWeight: 600, color: "#1c2a4c" }}>Mini Test 5: Reading Comprehension</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>20/06/2026</td>
                            <td style={{ padding: "12px 8px", color: "#6b7280" }}>30 phút</td>
                            <td style={{ padding: "12px 8px", fontWeight: "bold", color: "rgb(139, 92, 246)" }}>9.5 / 10</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

            </div>



          </div>
        </div>
      </Content>
    </Layout>
  );
}
