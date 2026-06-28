"use client";

import React from "react";

const ICONS = {
  studyPlan:
    "/assets/02674230bedb9b76851d_8ec7ecd5.svg",
  exercises:
    "/assets/86341846dcabb7986f98_e6b19f83.svg",
  lessons:
    "/assets/8f92e6e466f41d80da1e_679e8d8b.svg",
  locked:
    "/assets/8027f50dce9f743bdb00_382e2975.svg",
  mascot:
    "/assets/c4237cbf01eeccf22d2b_dc757fb0.svg",
};

interface GoalTask {
  id: string;
  icon: string;
  title: string;
  description?: string;
  actionLabel?: string;
  highlighted?: boolean;
  locked?: boolean;
}

const TASKS: GoalTask[] = [
  {
    id: "study-plan",
    icon: ICONS.studyPlan,
    title: "Khởi tạo Study Plan",
    description: "Cá nhân hóa lộ trình học dành riêng cho bạn",
    actionLabel: "Bắt đầu",
    highlighted: true,
  },
  {
    id: "exercises",
    icon: ICONS.exercises,
    title: "Hoàn thành 2 bài tập",
  },
  {
    id: "lessons",
    icon: ICONS.lessons,
    title: "Hoàn thành 1 bài học",
  },
];

export default function DailyGoalCard() {
  return (
    <div className="daily-goal-card">
      {/* Title */}
      <h2 className="daily-goal-title">🔥 Mục tiêu hôm nay</h2>

      {/* Tasks container */}
      <div className="goal-tasks-wrapper">
        {/* Mascot Bubble */}
        <div className="mascot-bubble">
          <div className="mascot-bubble-text">
            Bắt tay vào làm nhiệm vụ đầu tiên thôi Huỳnh Tấn Toàn ơi!
          </div>
          <img
            src={ICONS.mascot}
            alt="Mascot Icon"
            className="mascot-img"
          />
        </div>

        {/* Task List */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {TASKS.map((task) => (
            <div
              key={task.id}
              className={`goal-task-item${task.highlighted ? " highlighted" : ""}`}
            >
              {/* Icon */}
              <div style={{ width: 24, height: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={task.icon} alt={task.title} className="goal-task-icon" />
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <p className="goal-task-title">{task.title}</p>
                {task.description && (
                  <p className="goal-task-desc">{task.description}</p>
                )}
              </div>

              {/* Action Button */}
              {task.actionLabel && (
                <button className="goal-start-btn">
                  <span>{task.actionLabel}</span>
                </button>
              )}
            </div>
          ))}

          {/* Locked task */}
          <div className="goal-task-item">
            <div style={{ width: 24, height: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={ICONS.locked} alt="locked" className="goal-task-icon" />
            </div>
            <div style={{ flex: 1 }}>
              <p className="goal-task-locked-text">
                Hoàn thành nhiệm vụ chính để mở khóa nhiệm vụ tự chọn
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
