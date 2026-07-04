"use client";

import React, { useState, useEffect } from "react";

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function HonorBoard() {
  const [showAll, setShowAll] = useState(false);
  const [stats, setStats] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHonors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/honors`);
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats || []);
          setStudents(data.students || []);
        }
      } catch (err) {
        console.error("Lỗi khi tải bảng vinh danh:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHonors();
  }, []);

  const visibleData = showAll ? students : students.slice(0, 10);

  if (loading) {
    return (
      <section className="honor-section" style={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#35a873", fontWeight: 600 }}>Đang tải bảng vinh danh...</div>
      </section>
    );
  }

  return (
    <section className="honor-section">
      {/* ── Header ── */}
      <div className="honor-header">
        <div className="honor-crown">👑</div>
        <div>
          <h2 className="honor-title">Bảng vinh danh mùa thi</h2>
          <p className="honor-subtitle">Team Cô Dung</p>
        </div>
      </div>

      {/* ── Statistics ── */}
      <div className="honor-stats">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="honor-stat-card"
            style={{ 
              borderColor: "#bbf7d0", 
              backgroundColor: "#f0fdf4",
              borderWidth: "2px",
              borderStyle: "solid"
            }}
          >
            <div className="honor-stat-value" style={{ color: "#15803d" }}>
              {stat.value}
            </div>
            <div className="honor-stat-label" style={{ color: "#16a34a" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Table (desktop) / Cards (mobile) ── */}
      <div className={`honor-table-wrap ${showAll ? "show-all" : "show-limit"}`}>
        {/* Desktop table */}
        <table className="honor-table">
          <thead>
            <tr>
              <th className="honor-th" style={{ width: 56 }}>STT</th>
              <th className="honor-th">Họ và tên</th>
              <th className="honor-th">Thành tích xuất sắc</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row, idx) => {
              const displayStt = idx + 1;
              return (
                <tr
                  key={row.id}
                  className={`honor-tr${row.isTopKhoa ? " honor-tr-top" : ""}`}
                >
                  <td className="honor-td honor-td-stt">
                    {MEDALS[displayStt] ? (
                      <span className="honor-medal">{MEDALS[displayStt]}</span>
                    ) : (
                      <span className="honor-stt-num">{displayStt}</span>
                    )}
                  </td>
                  <td className="honor-td honor-td-name">
                    {row.isTopKhoa && (
                      <span className="honor-badge-national">⭐ Toàn Quốc</span>
                    )}
                    <span className={row.isTopKhoa ? "honor-name-top" : ""}>{row.name}</span>
                  </td>
                  <td className="honor-td honor-td-achievement">{row.achievement}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="honor-cards">
          {visibleData.map((row, idx) => {
            const displayStt = idx + 1;
            return (
              <div
                key={row.id}
                className={`honor-card${row.isTopKhoa ? " honor-card-top" : ""}`}
              >
                <div className="honor-card-header">
                  <span className="honor-card-stt">
                    {MEDALS[displayStt] ?? `#${displayStt}`}
                  </span>
                  {row.isTopKhoa && (
                    <span className="honor-badge-national">⭐ Thủ khoa Toàn Quốc</span>
                  )}
                </div>
                <div className="honor-card-name">{row.name}</div>
                <div className="honor-card-achievement">{row.achievement}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Show more / less ── */}
      {students.length > 10 && (
        <button
          className="honor-show-more"
          onClick={() => setShowAll((p) => !p)}
        >
          {showAll ? (
            "Thu gọn ▲"
          ) : (
            <>
              <span className="show-more-desktop">Xem thêm {students.length - 10} người ▼</span>
              <span className="show-more-mobile">Xem thêm {students.length - 5} người ▼</span>
            </>
          )}
        </button>
      )}
    </section>
  );
}
