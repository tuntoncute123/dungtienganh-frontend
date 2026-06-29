"use client";

import React, { useState, useEffect } from "react";
import { PlayCircleOutlined, ClockCircleOutlined, FormOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface LessonPlaylistProps {
  currentLessonId: string;
}

export default function LessonPlaylist({ currentLessonId }: LessonPlaylistProps) {
  const router = useRouter();
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/lessons`);
        if (res.ok) {
          const data = await res.json();
          setLessons(data);
        }
      } catch (e) {
        console.error("Lỗi khi tải danh sách bài học:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, []);

  if (loading) {
    return (
      <div className="lp-card lp-playlist" style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <Spin size="small" description="Đang tải danh sách..." />
      </div>
    );
  }

  return (
    <div className="lp-card lp-playlist">
      <ul className="lp-playlist-list">
        {lessons.map((item, idx) => {
          const isActive = item.id === currentLessonId;
          const isTest = !item.videoUrl && !!item.exerciseId;
          return (
            <li
              key={item.id}
              className={`lp-playlist-item${isActive ? " lp-playlist-item-active" : ""}${idx < lessons.length - 1 ? " lp-playlist-item-border" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/lesson?id=${item.id}`)}
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
        })}
      </ul>
    </div>
  );
}
