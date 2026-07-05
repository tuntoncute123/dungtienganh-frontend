"use client";

import React from "react";
import { PlayCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

interface LessonPlaylistProps {
  currentLessonId: string;
  lessons: any[];
  courseId?: string | null;
}

export default function LessonPlaylist({ currentLessonId, lessons = [], courseId }: LessonPlaylistProps) {
  return (
    <div className="lp-card lp-playlist">
      <ul className="lp-playlist-list">
        {lessons.length === 0 ? (
          <div style={{ padding: "20px 10px", textAlign: "center", color: "#94a3b8" }}>
            Chưa có bài học nào trong khóa này.
          </div>
        ) : (
          lessons.map((item, idx) => {
            const isActive = item.id === currentLessonId;
            const isTest = !item.videoUrl && !!item.exerciseId;
            const url = `/lesson?id=${item.id}${courseId ? `&courseId=${courseId}` : ""}`;
            return (
              <li
                key={item.id}
                className={`lp-playlist-item${isActive ? " lp-playlist-item-active" : ""}${idx < lessons.length - 1 ? " lp-playlist-item-border" : ""}`}
                style={{ cursor: "pointer", padding: 0 }}
              >
                <Link
                  href={url}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "12px 0",
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <span className="lp-playlist-icon">
                    {item.isLocked ? (
                      <span style={{ fontSize: 16, color: "#94a3b8" }}>🔒</span>
                    ) : isTest ? (
                      <ClockCircleOutlined style={{ fontSize: 18, color: isActive ? "#35a873" : "#9ca3af" }} />
                    ) : (
                      <PlayCircleOutlined style={{ fontSize: 18, color: isActive ? "#35a873" : "#9ca3af" }} />
                    )}
                  </span>
                  <span 
                    className={`lp-playlist-title${isActive ? " lp-playlist-title-active" : ""}`}
                    style={{ color: item.isLocked ? "#94a3b8" : undefined }}
                  >
                    {item.title}
                    {item.isLocked && (
                      <span style={{ fontSize: 11, color: "#ef4444", marginLeft: 8, fontWeight: 500 }}>(Khóa)</span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
