"use client";

import React from "react";
import { Row, Col } from "antd";
import CourseCard from "./CourseCard";

const COURSES = [
  {
    id: "toeic-lr-800",
    title: "TOEIC LR 800+",
    image:
      "/assets/eb7c1e039aa05154d1e8_4ef10dbd.jpg",
    studiedUnits: 2,
    totalUnits: 32,
    studiedLessons: 1,
    totalLessons: 64,
    exerciseIcon:
      "/assets/d973cbfe6435a0d1a31b_2a72ccfc.svg",
  },
  {
    id: "toeic-lr-600",
    title: "TOEIC LR 600+",
    image:
      "/assets/30b48594c71f47ba5acf_4ec9df40.jpg",
    studiedUnits: 2,
    totalUnits: 43,
    studiedLessons: 3,
    totalLessons: 86,
    exerciseIcon:
      "/assets/2d184cc465f831481c5d_5695e792.svg",
  },
  {
    id: "toeic-vocab",
    title: "Từ Vựng TOEIC Chuyên Sâu",
    image:
      "/assets/0aab811d48fbe42a4be7_d3286638.jpg",
    studiedUnits: 2,
    totalUnits: 19,
    studiedLessons: 5,
    totalLessons: 38,
    exerciseIcon:
      "/assets/95de878b39077b8c2891_2a95e11f.svg",
  },
];

export default function MyCoursesSection() {
  return (
    <div>
      <div className="section-header">
        <p className="section-title">Khoá học của tôi</p>
        <p className="section-link">Xem tất cả</p>
      </div>

      {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <Row gutter={[20, 20]}>
        {COURSES.map((course) => (
          <Col key={course.id} xs={24} sm={12} lg={8}>
            <CourseCard
              title={course.title}
              image={course.image}
              studiedUnits={course.studiedUnits}
              totalUnits={course.totalUnits}
              studiedLessons={course.studiedLessons}
              totalLessons={course.totalLessons}
              exerciseIcon={course.exerciseIcon}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
