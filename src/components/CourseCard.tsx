import React from "react";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  image: string;
  studiedUnits: number;
  totalUnits: number;
  studiedLessons: number;
  totalLessons: number;
  exerciseIcon: string;
}

export default function CourseCard({
  title,
  image,
  studiedUnits,
  totalUnits,
  studiedLessons,
  totalLessons,
  exerciseIcon,
}: CourseCardProps) {
  return (
    <Link href="/lesson" style={{ textDecoration: "none", color: "inherit" }}>
      <div className="course-card">
        {/* Thumbnail */}
        <figure style={{ margin: 0, position: "relative", width: "100%", height: 143 }}>
          <img
            src={image}
            alt={title}
            className="course-thumbnail"
          />
        </figure>

        {/* Body */}
        <div className="course-body">
          <h4 className="course-title">{title}</h4>

          <div className="course-meta">
            <div className="course-units">
              Đã học {studiedUnits}/{totalUnits} <span>Units</span>
            </div>
            <div className="course-exercises">
              <img src={exerciseIcon} alt="exercises" style={{ width: 20, height: 20 }} />
              <span>{studiedLessons}/{totalLessons}</span>
            </div>
          </div>

          <div style={{ marginTop: 8 }} />
        </div>
      </div>
    </Link>
  );
}
