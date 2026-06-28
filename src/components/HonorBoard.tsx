"use client";

import React, { useState } from "react";

/* ── Data ──────────────────────────────────── */

const STATS = [
  { value: 1, label: "Thủ khoa Toàn Quốc", color: "#f59e0b", bg: "#fef3c7" },
  { value: 15, label: "Thủ khoa Tỉnh / Thành phố", color: "#0071f9", bg: "#e1effe" },
  { value: 10, label: "Á khoa Tỉnh / Thành phố", color: "#7c3aed", bg: "#ede9fe" },
  { value: 27, label: "Điểm 10 Tuyệt đối", color: "#059669", bg: "#d1fae5" },
  { value: "2.348+", label: "Điểm 9.0 – 9.8", color: "#e20d2c", bg: "#fee2e2" },
];

const DATA = [
  { stt: 1, name: "Nguyễn Hà Nhi", achievement: "Thủ khoa toàn quốc năm 2024", isTopKhoa: true },
  { stt: 2, name: "Nguyễn Thị Mỹ Duyên", achievement: "Thủ khoa khối D01 tỉnh Hà Nam" },
  { stt: 3, name: "Trương Hà My", achievement: "Thủ khoa tốt nghiệp tỉnh Tuyên Quang" },
  { stt: 4, name: "Trần Tiến Lực", achievement: "Thủ khoa khối D07 tỉnh Phú Thọ" },
  { stt: 5, name: "Bùi Minh Nguyệt", achievement: "Thủ khoa khối D07 tỉnh Quảng Ngãi" },
  { stt: 6, name: "Phạm Ngọc Quỳnh Như", achievement: "Thủ khoa khối D tỉnh Đồng Nai" },
  { stt: 7, name: "Trần Yến Hương", achievement: "Thủ khoa khối D01 tỉnh Sóc Trăng" },
  { stt: 8, name: "Văn Thị Ánh Ngọc", achievement: "Thủ khoa khối D01 tỉnh Quảng Trị" },
  { stt: 9, name: "Thái Bình Trà Giang", achievement: "Thủ khoa khối D07 tỉnh Quảng Ngãi" },
  { stt: 10, name: "Chu Phạm Minh Thư", achievement: "Thủ khoa khối D78 tỉnh Bắc Kạn" },
  { stt: 11, name: "Nguyễn Mai Thu Hương", achievement: "Thủ khoa khối D01 tỉnh Phú Thọ" },
  { stt: 12, name: "Đào Xuân Danh", achievement: "Thủ khoa khối A01 tỉnh Hà Tĩnh" },
  { stt: 13, name: "Nguyễn Hồng Hạnh", achievement: "Thủ khoa khối D01 tỉnh Lạng Sơn" },
  { stt: 14, name: "Nguyễn Tiến Dũng", achievement: "Thủ khoa tốt nghiệp tỉnh Yên Bái" },
  { stt: 15, name: "Lê Đức Thịnh", achievement: "Thủ khoa khối D07 tỉnh Khánh Hòa" },
  { stt: 16, name: "Phạm Nguyên Khang", achievement: "Thủ khoa khối A01 tỉnh Sóc Trăng" },
  { stt: 17, name: "Nguyễn Minh Anh", achievement: "Á khoa khối D07 Thành phố Hà Nội" },
  { stt: 18, name: "Phan Thủy Tiên", achievement: "Á khoa khối A01 tỉnh An Giang" },
  { stt: 19, name: "Trần Hoàng Hải", achievement: "Á khoa khối A01 tỉnh Hà Tĩnh" },
  { stt: 20, name: "Nguyễn Thị Diệu Lan", achievement: "Á khoa khối D07 tỉnh Yên Bái" },
  { stt: 21, name: "Nguyễn Thị Thu Huyền", achievement: "Á khoa khối D07 tỉnh Quảng Trị" },
  { stt: 22, name: "Tiêu Đặng Kim Phụng", achievement: "Á khoa tốt nghiệp tỉnh Đắk Nông" },
  { stt: 23, name: "Vương Đình Thắng", achievement: "Á khoa khối A01 tỉnh Bắc Ninh" },
  { stt: 24, name: "Hồ Phạm Nhật Quyên", achievement: "Á khoa khối D07 tỉnh Quảng Bình" },
  { stt: 25, name: "Hà Hiền Phương", achievement: "Á khoa khối D01 tỉnh Tây Ninh" },
  { stt: 26, name: "Nguyễn Thị Hải Châu", achievement: "Á khoa khối D01 tỉnh Khánh Hòa" },
];

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

/* ── Component ─────────────────────────────── */

export default function HonorBoard() {
  const [showAll, setShowAll] = useState(false);
  const visibleData = showAll ? DATA : DATA.slice(0, 10);

  return (
    <section className="honor-section">
      {/* ── Header ── */}
      <div className="honor-header">
        <div className="honor-crown">👑</div>
        <div>
          <h2 className="honor-title">VINH DANH BẢNG VÀNG MÙA THI 2024</h2>
          <p className="honor-subtitle">Team Cô Mai Phương</p>
        </div>
      </div>

      {/* ── Statistics ── */}
      <div className="honor-stats">
        {STATS.map((stat) => (
          <div key={stat.label} className="honor-stat-card" style={{ borderColor: stat.color }}>
            <div className="honor-stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="honor-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Table (desktop) / Cards (mobile) ── */}
      <div className="honor-table-wrap">
        {/* Desktop table */}
        <table className="honor-table">
          <thead>
            <tr>
              <th className="honor-th" style={{ width: 56 }}>STT</th>
              <th className="honor-th">Họ và tên</th>
              <th className="honor-th">Thành tích xuất sắc mùa thi 2024</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row) => (
              <tr
                key={row.stt}
                className={`honor-tr${row.isTopKhoa ? " honor-tr-top" : ""}`}
              >
                <td className="honor-td honor-td-stt">
                  {MEDALS[row.stt] ? (
                    <span className="honor-medal">{MEDALS[row.stt]}</span>
                  ) : (
                    <span className="honor-stt-num">{row.stt}</span>
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
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="honor-cards">
          {visibleData.map((row) => (
            <div
              key={row.stt}
              className={`honor-card${row.isTopKhoa ? " honor-card-top" : ""}`}
            >
              <div className="honor-card-header">
                <span className="honor-card-stt">
                  {MEDALS[row.stt] ?? `#${row.stt}`}
                </span>
                {row.isTopKhoa && (
                  <span className="honor-badge-national">⭐ Thủ khoa Toàn Quốc</span>
                )}
              </div>
              <div className="honor-card-name">{row.name}</div>
              <div className="honor-card-achievement">{row.achievement}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Show more / less ── */}
      {DATA.length > 10 && (
        <button
          className="honor-show-more"
          onClick={() => setShowAll((p) => !p)}
        >
          {showAll ? "Thu gọn ▲" : `Xem thêm ${DATA.length - 10} người ▼`}
        </button>
      )}
    </section>
  );
}
