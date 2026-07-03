"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Progress, Spin } from "antd";
import { PlayCircleOutlined, RightOutlined } from "@ant-design/icons";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface InProgressLesson {
  lessonId: string;
  currentTime: number;
  duration: number;
  progressPercent: number;
  timestamp: string;
  title: string;
  thumbnail: string | null;
  courseTitle: string;
  courseId: string;
}

export default function RecentLessonsWidget() {
  const [lessons, setLessons] = useState<InProgressLesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInProgress = async () => {
      try {
        const token = localStorage.getItem("teacherdung_token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/tracking/recent-in-progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setLessons(data);
        }
      } catch (err) {
        console.error("Failed to load in-progress lessons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInProgress();
  }, []);

  if (loading) {
    return null; // Silent loading, doesn't jump UI
  }

  if (lessons.length === 0) {
    return null; // Hide completely if nothing is in progress
  }

  return (
    <div className="recent-lessons-widget" style={{ marginTop: 24, marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1c2a4c", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>📖</span> Bài học đang học của bạn
        </h3>
        <span style={{ fontSize: 13, color: "#35a873", fontWeight: 600 }}>Tiếp tục học dở dang</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {lessons.map((lesson) => {
          const mins = Math.floor(lesson.currentTime / 60);
          const secs = Math.floor(lesson.currentTime % 60).toString().padStart(2, "0");

          return (
            <Link
              key={lesson.lessonId}
              href={`/lesson?id=${lesson.lessonId}&courseId=${lesson.courseId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="lesson-card"
                style={{
                  padding: "16px 20px",
                  borderRadius: 16,
                  border: "1px solid rgba(53, 168, 115, 0.08)",
                  background: "linear-gradient(135deg, #ffffff 0%, #fbfdff 100%)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 250 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#35a873",
                          background: "rgba(53, 168, 115, 0.06)",
                          padding: "2px 8px",
                          borderRadius: 8,
                        }}
                      >
                        {lesson.courseTitle || "Khóa học"}
                      </span>
                      <span style={{ fontSize: 12, color: "#64748b" }}>
                        Vừa xem lúc {new Date(lesson.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h4 style={{ fontSize: 15, fontWeight: 700, color: "#1c2a4c", margin: "0 0 8px 0" }}>
                      {lesson.title}
                    </h4>

                    {/* Progress details */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ flex: 1, maxWidth: 200 }}>
                        <Progress
                          percent={lesson.progressPercent}
                          size="small"
                          strokeColor="#35a873"
                          trailColor="#f1f5f9"
                          showInfo={false}
                        />
                      </div>
                      <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
                        Đã xem {lesson.progressPercent}% ({mins}:{secs})
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#35a873",
                      color: "#ffffff",
                      padding: "8px 18px",
                      borderRadius: 24,
                      fontWeight: 600,
                      fontSize: 14,
                      boxShadow: "0 4px 12px rgba(53, 168, 115, 0.2)",
                    }}
                  >
                    <PlayCircleOutlined style={{ fontSize: 18 }} />
                    <span>Học tiếp</span>
                    <RightOutlined style={{ fontSize: 11 }} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
