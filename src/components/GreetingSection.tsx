"use client";

import React, { useEffect, useState } from "react";

const AVATAR =
  "/assets/fb250dbf83b979e24f4f_79779ecd.jpg";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function GreetingSection() {
  const [name, setName] = useState("Học sinh");

  useEffect(() => {
    // 1. Get immediately from localStorage for instant display
    const userStr = localStorage.getItem("teacherdung_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name || user.username) {
          setName(user.name || user.username);
        }
      } catch (e) {}
    }

    // 2. Fetch latest profile from backend to verify & sync
    const fetchLatestProfile = async () => {
      try {
        const token = localStorage.getItem("teacherdung_token");
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && (data.name || data.username)) {
            setName(data.name || data.username);
            localStorage.setItem("teacherdung_user", JSON.stringify(data));
          }
        }
      } catch (e) {
        console.error("Failed to fetch profile in GreetingSection:", e);
      }
    };

    fetchLatestProfile();
  }, []);

  return (
    <div className="greeting-section">
      <img
        src={AVATAR}
        alt="avatar"
        className="greeting-avatar"
      />
      <div>
        <p className="greeting-name">Xin chào, {name}</p>
        <p className="greeting-sub">Cùng Cô Dung tiến bộ mỗi ngày nào!</p>
      </div>
    </div>
  );
}
