"use client";

import React from "react";

export default function StudyPlanCard() {
  return (
    <div className="study-plan-empty">
      <p style={{ color: "#727e90", lineHeight: "20px" }}>
        Ôi! Bạn chưa có kế hoạch học tập nào cho chương trình này rồi. Hãy
        cùng Cô Dung xây dựng Study Plan riêng của bạn ngay nào!
      </p>
      <button className="study-plan-cta-btn">
        <span>Khởi tạo</span>
        <span style={{ fontSize: 14 }}>›</span>
      </button>
    </div>
  );
}
