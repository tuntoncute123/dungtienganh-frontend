"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Spin } from "antd";
import { useTracking } from "@/hooks/useTracking";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Tự động quét và đẩy toàn bộ dữ liệu bài tập/bài thi/flashcard cũ còn sót trong localStorage lên Database
const syncLocalHistoryToDatabase = async () => {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem("teacherdung_token");
  if (!token) return;

  try {
    // 1. Quét và đồng bộ tất cả bài tập/đề thi đã hoàn thành trong localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("practice_completed_")) {
        const practiceId = key.replace("practice_completed_", "");
        if (!practiceId) continue;
        try {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            fetch(`${API_BASE_URL}/api/user-progress`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                practiceId,
                type: "exercise",
                score: parsed.score || 0,
                correct: parsed.correct || 0,
                total: parsed.total || 0,
                answers: parsed.answers || {},
              }),
            }).catch(() => {});
          }
        } catch (e) {}
      }
    }

    // 2. Đồng bộ tiến độ Flashcard trong localStorage
    const prog = localStorage.getItem("fc_progress");
    const favs = localStorage.getItem("fc_favorites");
    if (prog || favs) {
      try {
        const flashcardProgress = prog ? JSON.parse(prog) : {};
        const flashcardFavorites = favs ? JSON.parse(favs) : [];
        const count = Object.values(flashcardProgress).reduce(
          (acc: number, curr: any) => acc + (curr?.length || 0),
          0
        );
        fetch(`${API_BASE_URL}/api/user-progress/flashcard`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            flashcardProgress,
            flashcardFavorites,
            flashcardCount: count,
          }),
        }).catch(() => {});
      } catch (e) {}
    }
  } catch (err) {
    console.error("Lỗi khi tự động đồng bộ dữ liệu local lên server:", err);
  }
};

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const { trackActivity } = useTracking();

  useEffect(() => {
    if (authorized) {
      // Khi đã xác thực, tự động backup dữ liệu local còn lại lên PostgreSQL
      syncLocalHistoryToDatabase();
    }
    if (authorized && pathname) {
      trackActivity("page_view", pathname);
    }
  }, [authorized, pathname, trackActivity]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("teacherdung_token");
      const userStr = localStorage.getItem("teacherdung_user");

      // Trang không yêu cầu đăng nhập
      const isLoginPage = pathname === "/login";

      if (!token || !userStr) {
        if (!isLoginPage) {
          setAuthorized(false);
          router.push("/login");
        } else {
          setAuthorized(true);
        }
        return;
      }

      try {
        const user = JSON.parse(userStr);

        if (isLoginPage) {
          // Nếu đã đăng nhập mà truy cập trang login, redirect đi
          if (user.role === "admin") {
            router.push("/admin");
          } else {
            router.push("/");
          }
          setAuthorized(false);
        } else if (pathname.startsWith("/admin") && user.role !== "admin") {
          // Học sinh cố truy cập trang Admin
          router.push("/");
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
      } catch (e) {
        localStorage.removeItem("teacherdung_token");
        localStorage.removeItem("teacherdung_user");
        if (!isLoginPage) {
          router.push("/login");
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (!authorized && pathname !== "/login") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f5f7fa" }}>
        <Spin size="large" description="Đang xác thực tài khoản..." />
      </div>
    );
  }

  return <>{children}</>;
}
