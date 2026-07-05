"use client";

import React, { useState, useEffect } from "react";
import { Grid, Popover, Modal, Button, App } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { useBreakpoint } = Grid;

const ICONS = {
  menu: "/assets/1a44982fbf1eaacf09c8_5eae9335.svg",
  logo: "/logo.png?v=2",
  programIcon: "/assets/312127ec3e81c86b4825_e9dcfdde.svg",
  chevronDown: "/assets/1ceef3f6517e9ff843ac_d05eb16e.svg",
  streak: "/assets/8ba239a060b337b51758_3b5a2ca8.svg",
  bell: "/assets/3a3f0536d83aeaf2f911_cdc3298d.svg",
  avatar: "/assets/green_avatar.png",
};

interface AppHeaderProps {
  onMenuClick: () => void;
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  const { message } = App.useApp();
  const screens = useBreakpoint();
  const router = useRouter();
  const isMobile = !screens.sm;
  const isTablet = screens.sm && !screens.lg;

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sharing, setSharing] = useState(false);

  const [userName, setUserName] = useState("Học sinh");
  const [role, setRole] = useState("student");

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifPopoverOpen, setNotifPopoverOpen] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);
  const [streakCount, setStreakCount] = useState<number>(0);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const fetchStreak = async () => {
    const token = localStorage.getItem("teacherdung_token");
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/streak`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setStreakCount(data.streakCount || 0);
      }
    } catch (e) {
      console.error("Error fetching streak:", e);
    }
  };

  const fetchNotifications = async () => {
    const token = localStorage.getItem("teacherdung_token");
    if (!token) return;
    setNotifLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/notifications`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.list || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (e) {
      console.error("Error fetching notifications:", e);
    } finally {
      setNotifLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchStreak();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const token = localStorage.getItem("teacherdung_token");
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/notifications/read?id=${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNotif = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const token = localStorage.getItem("teacherdung_token");
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/notifications?id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const deleted = notifications.find(n => n.id === id);
        setNotifications(prev => prev.filter(n => n.id !== id));
        if (deleted && !deleted.isRead) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
        message.success("Đã xóa thông báo");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTagColor = (type: string) => {
    switch (type) {
      case "success": return "#22c55e";
      case "warning": return "#eab308";
      case "alert": return "#ef4444";
      default: return "#3b82f6";
    }
  };

  const notificationPopoverContent = (
    <div style={{ width: 320, padding: "4px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 8px 8px 8px", borderBottom: "1px solid #f1f5f9" }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>Thông báo ({unreadCount} chưa đọc)</span>
        <Button type="link" size="small" style={{ padding: 0, fontSize: 11 }} onClick={fetchNotifications}>Làm mới</Button>
      </div>

      <div style={{ maxHeight: 300, overflowY: "auto", marginTop: 8 }}>
        {notifLoading && notifications.length === 0 ? (
          <div style={{ padding: "24px 0", textAlign: "center", color: "#64748b" }}>Đang tải...</div>
        ) : notifications.length === 0 ? (
          <div style={{ padding: "24px 0", textAlign: "center", color: "#64748b" }}>Bạn không có thông báo nào.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              style={{
                padding: "10px 8px",
                borderBottom: "1px solid #f8fafc",
                backgroundColor: n.isRead ? "transparent" : "#f0f7ff",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onClick={(e) => !n.isRead && handleMarkAsRead(n.id, e as any)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingRight: 24 }}>
                <span style={{
                  fontWeight: n.isRead ? 600 : 800,
                  fontSize: 12,
                  color: n.isRead ? "#475569" : "#0f172a"
                }}>
                  <span style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: getTagColor(n.type),
                    marginRight: 6,
                    verticalAlign: "middle"
                  }} />
                  {n.title}
                </span>

                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 8,
                    color: "#94a3b8",
                    cursor: "pointer",
                    fontSize: 12,
                    lineHeight: "12px"
                  }}
                  onClick={(e) => handleDeleteNotif(n.id, e)}
                  title="Xóa thông báo"
                >
                  ✕
                </span>
              </div>

              <div style={{ fontSize: 11, color: "#475569", paddingLeft: 12 }}>
                {n.content}
              </div>

              <div style={{ fontSize: 10, color: "#94a3b8", paddingLeft: 12 }}>
                {new Date(n.createdAt).toLocaleDateString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  useEffect(() => {
    const userStr = localStorage.getItem("teacherdung_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || user.username);
        setRole(user.role);
      } catch (e) { }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    message.success("Đăng xuất thành công!");
    router.push("/login");
  };

  const avatarMenu = (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 150 }}>
      <div style={{ fontWeight: 700, color: "#0f172a" }}>{userName}</div>
      <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>
        {role === "admin" ? "Giáo viên (Admin)" : "Học sinh"}
      </div>
      <hr style={{ border: 0, borderTop: "1px solid #f1f5f9", margin: "4px 0" }} />
      {role === "admin" && (
        <Link href="/admin">
          <Button type="link" size="small" style={{ padding: 0, textAlign: "left", width: "100%", color: "#35a873" }}>
            Trang quản trị
          </Button>
        </Link>
      )}
      <Button type="primary" danger size="small" onClick={handleLogout} style={{ marginTop: 4 }} block>
        Đăng xuất
      </Button>
    </div>
  );

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

      <h2 className="streak-count-title">{streakCount} Ngày Liên Tiếp</h2>
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
          {/* Milestone 10: Unlocked if streakCount >= 10 */}
          <div className={`streak-badge-card ${streakCount >= 10 ? "unlocked" : "locked"}`}>
            <span className="streak-badge-icon">🥉</span>
            <span className="streak-badge-target">10 Ngày</span>
            <span className="streak-badge-status">
              {streakCount >= 10 ? "Đã đạt" : `${streakCount}/10 ngày`}
            </span>
            <span className="streak-lock-status-dot">{streakCount >= 10 ? "✅" : "🔒"}</span>
          </div>

          {/* Milestone 50: Unlocked if streakCount >= 50 */}
          <div className={`streak-badge-card ${streakCount >= 50 ? "unlocked" : "locked"}`}>
            <span className="streak-badge-icon">🥈</span>
            <span className="streak-badge-target">50 Ngày</span>
            <span className="streak-badge-status">
              {streakCount >= 50 ? "Đã đạt" : `${streakCount}/50 ngày`}
            </span>
            <span className="streak-lock-status-dot">{streakCount >= 50 ? "✅" : "🔒"}</span>
          </div>

          {/* Milestone 100: Unlocked if streakCount >= 100 */}
          <div className={`streak-badge-card ${streakCount >= 100 ? "unlocked" : "locked"}`}>
            <span className="streak-badge-icon">🥇</span>
            <span className="streak-badge-target">100 Ngày</span>
            <span className="streak-badge-status">
              {streakCount >= 100 ? "Đã đạt" : `${streakCount}/100 ngày`}
            </span>
            <span className="streak-lock-status-dot">{streakCount >= 100 ? "✅" : "🔒"}</span>
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
        <Link href="/" style={{ display: "block", marginLeft: 16, cursor: "pointer", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", height: 64, overflow: "hidden", flexShrink: 0 }}>
            <img src={ICONS.logo} alt="logo-prep" className="logo-img" style={{ height: 54, objectFit: "contain" }} />
          </div>
        </Link>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Streak Badge with Popover */}
        <Popover
          content={streakPopoverContent}
          trigger="click"
          placement={isMobile ? "bottom" : "bottomRight"}
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          overlayClassName="streak-popover"
        >
          <div className="streak-badge">
            <img src={ICONS.streak} alt="streak" style={{ width: 20, height: 24 }} />
            {!isMobile && <span className="streak-text">Khám phá streak</span>}
          </div>
        </Popover>

        {/* Notification Bell with Popover */}
        <Popover
          content={notificationPopoverContent}
          trigger="click"
          placement="bottomRight"
          open={notifPopoverOpen}
          onOpenChange={(open) => {
            setNotifPopoverOpen(open);
            if (open) fetchNotifications();
          }}
          overlayClassName="notification-popover"
        >
          <button className="notification-btn" aria-label="Thông báo">
            <img src={ICONS.bell} alt="bell" style={{ width: 16, height: 16 }} />
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </button>
        </Popover>

        {/* Avatar with Dropdown */}
        <Popover
          content={avatarMenu}
          trigger="click"
          placement="bottomRight"
        >
          <div className="avatar-btn" style={{ cursor: "pointer" }}>
            <img src={ICONS.avatar} alt="avatar" />
          </div>
        </Popover>
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
              <h4 className="streak-share-username">{userName}</h4>
              <div className="streak-share-badge-tag">
                {streakCount >= 100 ? "Huy hiệu Vàng 🥇" : streakCount >= 50 ? "Huy hiệu Bạc 🥈" : "Huy hiệu Đồng 🥉"}
              </div>

              <div className="streak-share-count-number">{streakCount}</div>
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
