"use client";

import React from "react";

const ICONS = {
  bgPattern:
    "/assets/9bbe6aeec7617c1a3653_0d5eb2c9.svg",
  // LR Level icons
  lrEntry:
    "/assets/77c326a365bbdc9fb358_83b36b36.svg",
  lrPredicted:
    "/assets/280443f906d7ff8fa86c_2f45f67f.svg",
  lrTarget:
    "/assets/26920625fc5a70c6a52b_6632a3f8.svg",
  // SW Level icons
  swEntry:
    "/assets/b84dc2845bd75ac4e0b1_309a2e1e.svg",
  swPredicted:
    "/assets/af302f6b9b88d5ffae24_06b1443a.svg",
  swTarget:
    "/assets/637dd9fdf24f0c145c73_aad2b5ca.svg",
  // Summary icons
  totalTime:
    "/assets/06fe3ec35e510f8767fc_17d7f3a3.svg",
  totalCups:
    "/assets/f3f09118b8ee262033a2_1583183c.svg",
  totalTests:
    "/assets/d380841009a1b02130e2_619dce7e.svg",
  totalLessons:
    "/assets/03480a2a9d748e96bab7_c5f082f9.svg",
};

interface LevelRowProps {
  label: string;
  entryIcon: string;
  predictedIcon: string;
  targetIcon: string;
  entryValue: string | number;
  predictedValue: string | number;
  targetValue: string | number;
  predictedColor?: string;
}

function LevelRow({
  label,
  entryIcon,
  predictedIcon,
  targetIcon,
  entryValue,
  predictedValue,
  targetValue,
  predictedColor = "#374151",
}: LevelRowProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p className="level-label">{label}</p>
      <div className="level-row">
        {/* Entry */}
        <div className="level-col">
          <div className="level-connector">
            <img src={entryIcon} alt="entry" className="level-dot-icon" />
            <div className="dashed-line" />
          </div>
          <p className="level-sublabel">Entry</p>
          <p className="level-value">{entryValue}</p>
        </div>

        {/* Predicted */}
        <div className="level-col center">
          <div className="level-connector" style={{ justifyContent: "center" }}>
            <div className="dashed-line" />
            <img src={predictedIcon} alt="predicted" className="level-dot-icon" />
            <div className="dashed-line" />
          </div>
          <p className="level-sublabel">Predicted</p>
          <p className="level-value" style={{ color: predictedColor }}>
            {predictedValue}
          </p>
        </div>

        {/* Target */}
        <div className="level-col end">
          <div className="level-connector" style={{ justifyContent: "flex-end" }}>
            <div className="dashed-line" />
            <img src={targetIcon} alt="target" className="level-dot-icon-lg" />
          </div>
          <p className="level-sublabel" style={{ textAlign: "right" }}>Target</p>
          <p className="level-value" style={{ textAlign: "right" }}>{targetValue}</p>
        </div>
      </div>
    </div>
  );
}

const SUMMARY_STATS = [
  { icon: ICONS.totalTime, label: "Tổng thời lượng", value: "8 hours", color: "#0071f9" },
  { icon: ICONS.totalCups, label: "Tổng số cúp đã đạt", value: "13", color: "#f49000" },
  { icon: ICONS.totalTests, label: "Tổng số bài test", value: "0", color: "#e20d2c" },
  { icon: ICONS.totalLessons, label: "Tổng số bài học", value: "3", color: "#00b135" },
];

export default function LearningProfile() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <p className="section-title">Learning Profile</p>
        <p className="section-link">Xem tất cả</p>
      </div>

      <div
        className="profile-card"
        style={{
          backgroundImage: `linear-gradient(0deg, #ffffff 50%, #f3f8ff 100%), url(${ICONS.bgPattern})`,
          backgroundSize: "auto, contain",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center, right",
        }}
      >
        <p className="profile-section-title">Trình độ TOEIC của bạn</p>

        {/* LR Level */}
        <div className="level-section">
          <LevelRow
            label="Listening - Reading Level"
            entryIcon={ICONS.lrEntry}
            predictedIcon={ICONS.lrPredicted}
            targetIcon={ICONS.lrTarget}
            entryValue="-"
            predictedValue="-"
            targetValue="-"
          />

          {/* SW Level */}
          <LevelRow
            label="Speaking - Writing Level"
            entryIcon={ICONS.swEntry}
            predictedIcon={ICONS.swPredicted}
            targetIcon={ICONS.swTarget}
            entryValue={10}
            predictedValue={10}
            targetValue={300}
            predictedColor="#0071f9"
          />
        </div>

        {/* Learning Summary */}
        <p className="summary-title">Learning summary</p>

        {SUMMARY_STATS.map((stat) => (
          <div key={stat.label} className="summary-item">
            <img src={stat.icon} alt={stat.label} className="summary-icon" />
            <span className="summary-label">{stat.label}</span>
            <span className="summary-value" style={{ color: stat.color }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
