"use client";

import React from "react";
import { PlayCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface LessonPlaylistProps {
  currentLessonId: string;
  lessons: any[];
  courseId?: string | null;
}

export default function LessonPlaylist({ currentLessonId, lessons = [], courseId }: LessonPlaylistProps) {
  const router = useRouter();

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
            return (
              <li
                key={item.id}
                className={`lp-playlist-item${isActive ? " lp-playlist-item-active" : ""}${idx < lessons.length - 1 ? " lp-playlist-item-border" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/lesson?id=${item.id}${courseId ? `&courseId=${courseId}` : ""}`)}
              >
                <span className="lp-playlist-icon">
                  {isTest ? (
                    <ClockCircleOutlined style={{ fontSize: 18, color: isActive ? "#f40c44" : "#9ca3af" }} />
                  ) : (
                    <PlayCircleOutlined style={{ fontSize: 18, color: isActive ? "#f40c44" : "#9ca3af" }} />
                  )}
                </span>
                <span className={`lp-playlist-title${isActive ? " lp-playlist-title-active" : ""}`}>
                  {item.title}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
