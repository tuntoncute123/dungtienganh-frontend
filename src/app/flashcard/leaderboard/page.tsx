"use client";

import React, { useState, useEffect } from "react";
import { Layout, Grid, Drawer, Spin, Card, Avatar, Space, Button, App } from "antd";
import { ArrowLeftOutlined, TrophyOutlined, ThunderboltOutlined } from "@ant-design/icons";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";

const { Content } = Layout;
const { useBreakpoint } = Grid;

interface LeaderboardUser {
  id: string;
  name: string;
  username: string;
  flashcardCount: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function FlashcardLeaderboardPage() {
  const { message } = App.useApp();
  const screens = useBreakpoint();
  const isDesktop = !!screens.lg;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentUserProgress, setCurrentUserProgress] = useState(0);

  const handleMenuClick = () => {
    if (isDesktop) {
      setSidebarPinned((prev) => !prev);
    } else {
      setDrawerOpen(true);
    }
  };

  useEffect(() => {
    // 1. Lấy thông tin user hiện tại từ localStorage
    const userStr = localStorage.getItem("teacherdung_user");
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {}
    }

    // 2. Tính số lượng từ đã thuộc từ LocalStorage
    const prog = localStorage.getItem("fc_progress");
    if (prog) {
      try {
        const parsed = JSON.parse(prog);
        const total = Object.values(parsed).reduce((acc: number, curr: any) => acc + (curr?.length || 0), 0);
        setCurrentUserProgress(total);
      } catch (e) {}
    }

    // 3. Tải bảng xếp hạng từ backend API
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/flashcard-leaderboard`);
        if (res.ok) {
          const data = await res.json();
          setLeaderboardData(data);
        } else {
          setLeaderboardData([]);
        }
      } catch (err) {
        console.error("Lỗi khi tải bảng xếp hạng flashcard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Tìm thứ hạng của user hiện tại trong bảng xếp hạng
  const getUserRank = () => {
    if (!currentUser || leaderboardData.length === 0) return null;
    const index = leaderboardData.findIndex(u => u.username === currentUser.username || u.id === currentUser.id);
    return index !== -1 ? index + 1 : null;
  };

  const userRank = getUserRank();

  // Phân chia dữ liệu: Top 3 và phần còn lại
  const top1 = leaderboardData[0];
  const top2 = leaderboardData[1];
  const top3 = leaderboardData[2];
  const remainingList = leaderboardData.slice(3);

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
          <div className="content-wrapper" style={{ padding: "20px", maxWidth: 900, margin: "0 auto" }}>
            
            {/* Header section with back button */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <Space>
                <Link href="/flashcard">
                  <Button type="primary" icon={<ArrowLeftOutlined />} style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", border: "none", borderRadius: 8, fontWeight: 600 }}>
                    Quay lại Flashcards
                  </Button>
                </Link>
                <h1 style={{ margin: 0, fontSize: isDesktop ? 22 : 18, fontWeight: 800, color: "#1e293b", display: "flex", alignItems: "center", gap: 8 }}>
                  <TrophyOutlined style={{ color: "#fbbf24" }} />
                  Bảng Xếp Hạng Từ Vựng
                </h1>
              </Space>
              
              <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
                Cập nhật: <span style={{ color: "#22c55e", fontWeight: 700 }}>Thời gian thực</span>
              </div>
            </div>

            {/* Current user performance banner */}
            {currentUser && (
              <Card 
                style={{ 
                  borderRadius: 16, 
                  background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)", 
                  border: "none", 
                  marginBottom: 28,
                  boxShadow: "0 4px 15px rgba(186, 230, 253, 0.3)"
                }}
                styles={{ body: { padding: "16px 24px" } }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                  <Space size={16}>
                    <Avatar 
                      size={48} 
                      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser.name || "User"}`}
                      style={{ backgroundColor: "#38bdf8", border: "2px solid #fff" }}
                    />
                    <div>
                      <div style={{ fontSize: 13, color: "#0369a1", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>Thành tích của bạn</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: "#0c4a6e" }}>{currentUser.name || currentUser.username}</div>
                    </div>
                  </Space>
                  
                  <div style={{ display: "flex", gap: isDesktop ? 40 : 20 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 12, color: "#0369a1", fontWeight: 500 }}>Đã thuộc bài</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#0284c7", display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                        <ThunderboltOutlined style={{ color: "#f59e0b" }} />
                        {currentUserProgress} <span style={{ fontSize: 13, fontWeight: 600, color: "#0369a1" }}>từ</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 12, color: "#0369a1", fontWeight: 500 }}>Thứ hạng</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#0284c7" }}>
                        {userRank ? `#${userRank}` : "Nằm ngoài Top 20"}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {loading ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <Spin size="large" tip="Đang tải bảng xếp hạng..." />
              </div>
            ) : leaderboardData.length === 0 ? (
              <Card style={{ textAlign: "center", padding: "40px 0", borderRadius: 16 }}>
                <TrophyOutlined style={{ fontSize: 48, color: "#cbd5e1", marginBottom: 16 }} />
                <h3 style={{ margin: 0, color: "#64748b" }}>Chưa có dữ liệu bảng xếp hạng.</h3>
                <p style={{ color: "#94a3b8", marginTop: 8 }}>Hãy là người đầu tiên học thuộc từ vựng để dẫn đầu!</p>
              </Card>
            ) : (
              <>
                {/* ── TOP 3 Podium Layout ── */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: isDesktop ? 24 : 12, marginBottom: 40, marginTop: 12, paddingBottom: 16, borderBottom: "1px solid #f1f5f9" }}>
                  
                  {/* Top 2 (Silver) */}
                  {top2 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: 160 }}>
                      <div style={{ position: "relative", marginBottom: 12 }}>
                        <Avatar 
                          size={isDesktop ? 70 : 55} 
                          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${top2.name}`}
                          style={{ border: "3px solid #cbd5e1", backgroundColor: "#e2e8f0" }}
                        />
                        <span style={{ position: "absolute", bottom: -6, right: "calc(50% - 12px)", background: "#cbd5e1", color: "#475569", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, border: "2px solid #fff" }}>2</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", textAlign: "center", width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={top2.name}>{top2.name}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginTop: 2 }}>{top2.flashcardCount} từ</div>
                      <div style={{ width: "100%", height: isDesktop ? 80 : 60, background: "linear-gradient(to top, #f1f5f9, #cbd5e1)", borderRadius: "8px 8px 0 0", marginTop: 12, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <span style={{ fontSize: 24 }}>🥈</span>
                      </div>
                    </div>
                  )}

                  {/* Top 1 (Gold) */}
                  {top1 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: 180, zIndex: 2 }}>
                      <div style={{ position: "relative", marginBottom: 12 }}>
                        <div style={{ position: "absolute", top: -20, left: "calc(50% - 16px)", fontSize: 24, animation: "bounce 2s infinite" }}>👑</div>
                        <Avatar 
                          size={isDesktop ? 90 : 70} 
                          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${top1.name}`}
                          style={{ border: "4px solid #fbbf24", backgroundColor: "#fffbeb", boxShadow: "0 8px 20px rgba(251, 191, 36, 0.25)" }}
                        />
                        <span style={{ position: "absolute", bottom: -6, right: "calc(50% - 12px)", background: "#fbbf24", color: "#78350f", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, border: "2px solid #fff" }}>1</span>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "#1e293b", textAlign: "center", width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={top1.name}>{top1.name}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#b45309", marginTop: 2 }}>{top1.flashcardCount} từ thuộc</div>
                      <div style={{ width: "100%", height: isDesktop ? 110 : 85, background: "linear-gradient(to top, #fef3c7, #fde68a)", borderRadius: "8px 8px 0 0", marginTop: 12, display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 4px 15px rgba(251, 191, 36, 0.15)" }}>
                        <span style={{ fontSize: 32 }}>🥇</span>
                      </div>
                    </div>
                  )}

                  {/* Top 3 (Bronze) */}
                  {top3 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: 160 }}>
                      <div style={{ position: "relative", marginBottom: 12 }}>
                        <Avatar 
                          size={isDesktop ? 70 : 55} 
                          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${top3.name}`}
                          style={{ border: "3px solid #b45309", backgroundColor: "#fff7ed" }}
                        />
                        <span style={{ position: "absolute", bottom: -6, right: "calc(50% - 12px)", background: "#b45309", color: "#fff", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, border: "2px solid #fff" }}>3</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", textAlign: "center", width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={top3.name}>{top3.name}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginTop: 2 }}>{top3.flashcardCount} từ</div>
                      <div style={{ width: "100%", height: isDesktop ? 70 : 50, background: "linear-gradient(to top, #ffedd5, #fed7aa)", borderRadius: "8px 8px 0 0", marginTop: 12, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <span style={{ fontSize: 24 }}>🥉</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Remaining Rankings List ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {remainingList.map((row, idx) => {
                    const rank = idx + 4;
                    const isSelf = currentUser && (row.username === currentUser.username || row.id === currentUser.id);

                    return (
                      <div
                        key={row.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 18px",
                          borderRadius: 12,
                          background: isSelf ? "#f0fdf4" : "#ffffff",
                          border: isSelf ? "2.5px solid #22c55e" : "1px solid #e2e8f0",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.02)"
                        }}
                        className="leaderboard-item-hover"
                      >
                        <Space size={16}>
                          {/* Rank number */}
                          <span style={{ width: 24, fontSize: 14, fontWeight: 800, color: isSelf ? "#15803d" : "#64748b", textAlign: "center" }}>
                            #{rank}
                          </span>
                          
                          {/* Avatar */}
                          <Avatar 
                            size={40} 
                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${row.name}`}
                            style={{ backgroundColor: isSelf ? "#bbf7d0" : "#f1f5f9" }}
                          />
                          
                          {/* Name */}
                          <div>
                            <span style={{ fontWeight: 700, color: isSelf ? "#15803d" : "#0f172a", fontSize: 14 }}>
                              {row.name}
                            </span>
                            {isSelf && (
                              <span style={{ marginLeft: 8, fontSize: 11, background: "#22c55e", color: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>Bạn</span>
                            )}
                          </div>
                        </Space>

                        {/* Flashcards Count */}
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <ThunderboltOutlined style={{ color: "#f59e0b" }} />
                          <span style={{ fontWeight: 800, color: "#1e293b", fontSize: 14 }}>
                            {row.flashcardCount} <span style={{ fontSize: 12, fontWeight: 500, color: "#64748b" }}>từ thuộc</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

          </div>
          <Footer />
        </div>
      </Content>
    </Layout>
  );
}
