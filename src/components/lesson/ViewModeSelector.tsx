"use client";

import React, { useState } from "react";
import {
  FullscreenOutlined,
  ExpandOutlined,
  CompressOutlined,
} from "@ant-design/icons";

const MODES = [
  { key: "fullscreen", label: "Toàn màn hình", icon: <FullscreenOutlined /> },
  { key: "large", label: "Video lớn", icon: <ExpandOutlined /> },
  { key: "default", label: "Mặc định", icon: <CompressOutlined /> },
  { key: "small", label: "Video nhỏ", icon: <CompressOutlined /> },
];

export default function ViewModeSelector() {
  const [active, setActive] = useState("default");
  return (
    <div className="lp-viewmode-bar">
      <span className="lp-viewmode-label">Chế độ xem:</span>
      {MODES.map((m) => (
        <button
          key={m.key}
          className={`lp-viewmode-btn${active === m.key ? " lp-viewmode-btn-active" : ""}`}
          aria-label={m.label}
          onClick={() => setActive(m.key)}
          title={m.label}
        >
          {m.icon}
        </button>
      ))}
    </div>
  );
}
