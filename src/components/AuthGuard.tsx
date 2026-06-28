"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Spin } from "antd";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

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
        localStorage.clear();
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
        <Spin size="large" tip="Đang xác thực tài khoản..." />
      </div>
    );
  }

  return <>{children}</>;
}
