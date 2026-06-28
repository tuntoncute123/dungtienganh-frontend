import React from "react";
import Link from "next/link";

const ICONS = {
  testInProgress:
    "/assets/0ca39006c483793ee7d7_a737b285.svg",
  testPaper:
    "/assets/318fe0518c88e1a6bec5_72ac9699.svg",
  arrowRight:
    "/assets/2f73c49505a3006f84aa_1f7689d7.svg",
  thumbnail:
    "/assets/2a376c73587741f40134_82de242e.png",
};

export default function TestPracticeCard() {
  return (
    <Link href="/practice" style={{ textDecoration: "none", color: "inherit" }}>
      <div className="test-practice-card">
        <div className="test-info">
          <img src={ICONS.thumbnail} alt="test-set-avatar" className="test-thumbnail" />

          <div className="test-details">
            {/* In Progress Badge */}
            <div className="test-in-progress-badge">
              <img src={ICONS.testInProgress} alt="" style={{ width: 18, height: 18 }} />
              <span>Đề đang làm</span>
            </div>

            {/* Test Title */}
            <div className="test-title">[Mar 2026] Real tests Speaking &amp; Writing</div>

            {/* Bottom row */}
            <div className="test-bottom-row">
              <div style={{ display: "flex", alignItems: "flex-start", gap: 6, minWidth: 0 }}>
                <img
                  src={ICONS.testPaper}
                  alt=""
                  style={{ width: 13, height: 13, marginTop: 2, flexShrink: 0 }}
                />
                <div className="test-subtitle">Real tests Speaking Test 1</div>
              </div>

              <div className="test-continue-btn">
                <span>Tiếp tục</span>
                <img src={ICONS.arrowRight} alt="" style={{ width: 16, height: 16 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
