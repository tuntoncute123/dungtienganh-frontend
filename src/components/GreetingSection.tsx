"use client";

import React from "react";

const AVATAR =
  "/assets/fb250dbf83b979e24f4f_79779ecd.jpg";

export default function GreetingSection() {
  return (
    <div className="greeting-section">
      <img
        src={AVATAR}
        alt="avatar"
        className="greeting-avatar"
      />
      <div>
        <p className="greeting-name">Xin chào, Huỳnh Tấn Toàn</p>
        <p className="greeting-sub">Cùng Cô Dung tiến bộ mỗi ngày nào!</p>
      </div>
    </div>
  );
}
