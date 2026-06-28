"use client";

import React from "react";
import {
  PlayCircleOutlined,
  FormOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

type ItemType = "video" | "quiz";

interface LessonItem {
  id: string;
  title: string;
  type: ItemType;
  active?: boolean;
}

const LESSON_ITEMS: LessonItem[] = [
  { id: "1", title: "Từ loại (Lý thuyết - Buổi 1)", type: "video", active: true },
  { id: "2", title: "Thi Online: Danh từ", type: "quiz" },
  { id: "3", title: "Từ loại (Lý thuyết - Buổi 2)", type: "video" },
  { id: "4", title: "Thi online: Tính từ", type: "quiz" },
  { id: "5", title: "Từ loại (Lý thuyết - Buổi 3)", type: "video" },
  { id: "6", title: "Thi online: Trạng từ", type: "quiz" },
];

export default function LessonPlaylist() {
  return (
    <div className="lp-card lp-playlist">
      <ul className="lp-playlist-list">
        {LESSON_ITEMS.map((item, idx) => (
          <li
            key={item.id}
            className={`lp-playlist-item${item.active ? " lp-playlist-item-active" : ""}${idx < LESSON_ITEMS.length - 1 ? " lp-playlist-item-border" : ""}`}
          >
            <span className="lp-playlist-icon">
              {item.type === "video" ? (
                <PlayCircleOutlined style={{ fontSize: 18, color: item.active ? "#f40c44" : "#9ca3af" }} />
              ) : (
                <FormOutlined style={{ fontSize: 18, color: "#9ca3af" }} />
              )}
            </span>
            <span className={`lp-playlist-title${item.active ? " lp-playlist-title-active" : ""}`}>
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
