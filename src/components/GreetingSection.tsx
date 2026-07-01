"use client";

import React, { useEffect, useState } from "react";

const AVATAR =
  "/assets/fb250dbf83b979e24f4f_79779ecd.jpg";

export default function GreetingSection() {
  const [name, setName] = useState("Học sinh");

  useEffect(() => {
    const userStr = localStorage.getItem("teacherdung_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name || user.username) {
          setName(user.name || user.username);
        }
      } catch (e) {}
    }
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
