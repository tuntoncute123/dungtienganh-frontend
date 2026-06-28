"use client";

import React from "react";
import Link from "next/link";

const ICONS = {
  lessonBadgeBg:
    "/assets/fa884ee92db134183260_4a0d4c89.svg",
  clock:
    "/assets/104e133ef77f1d166a92_c4ea4133.svg",
  bookmark1:
    "/assets/e95b1f81a0aea33c65a6_8f689d79.svg",
  bookmark2:
    "/assets/55dac0cacdf0206ea837_49d0ee7f.svg",
  bookmark3:
    "/assets/b2379debc5377b824eaf_41058be2.svg",
};

export default function RecentLessonCard() {
  return (
    <Link href="/lesson" style={{ textDecoration: "none", color: "inherit" }}>
      <div className="lesson-card">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          {/* Lesson Number Badge */}
          <div className="lesson-number-badge">
            <div className="lesson-number-badge-inner">
              <div style={{ position: "relative" }}>
                <img src={ICONS.lessonBadgeBg} alt="" style={{ width: 52, height: 60, display: "block" }} />
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="lesson-number-text">06</div>
                  <div className="lesson-label">LESSON</div>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Info */}
          <div style={{ flex: 1, minWidth: 0, marginTop: -6 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <h5 className="lesson-title" style={{ flex: 1, minWidth: 0 }}>
                [Listening] Part 3 - Làm quen với dạng câu hỏi hội thoại
              </h5>
              {/* Bookmark Icons */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                {[ICONS.bookmark1, ICONS.bookmark2, ICONS.bookmark3].map((icon, i) => (
                  <img key={i} src={icon} alt="" style={{ width: 18, height: 18 }} />
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {/* Progress */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#6b7280", fontSize: 14, flexWrap: "wrap" }}>
                <span>0/ Section</span>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <img src={ICONS.clock} alt="clock" style={{ width: 18, height: 18 }} />
                  <span>0/6</span>
                </div>
              </div>

              {/* Continue */}
              <div className="lesson-continue-btn">
                <span>Tiếp tục học</span>
                <span>›</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
