"use client";

import React from "react";
import { Button, Tooltip, App } from "antd";
import { LockOutlined } from "@ant-design/icons";

interface FlashcardDeckCardProps {
  deck: any;
  onStudy: (deck: any) => void;
  onPractice: (deck: any) => void;
  onInfo: (deck: any) => void;
  onToggleFavorite: (deckId: string) => void;
  onResetProgress: (deckId: string) => void;
  isFavorite: boolean;
  progress: number; // percentage (0 - 100)
}

// Map category to styling colors
const categoryConfig = {
  vocabulary: { color: "#35a873", bg: "#e6f6ec" },
  idiom: { color: "#ea4335", bg: "#fce8e6" },
  phrasal_verb: { color: "#ff2d57", bg: "#ffebee" },
  collocation: { color: "#34a853", bg: "#e6f4ea" },
  grammar: { color: "#f9ab00", bg: "#fef7e0" },
  mixed: { color: "#f28500", bg: "#fff3e0" }
};

export default function FlashcardDeckCard({ 
  deck, 
  onStudy, 
  onPractice, 
  onInfo, 
  onToggleFavorite, 
  onResetProgress, 
  isFavorite, 
  progress 
}: FlashcardDeckCardProps) {
  const { message } = App.useApp();
  const config = categoryConfig[deck.category as keyof typeof categoryConfig] || categoryConfig.vocabulary;

  return (
    <div 
      className={`fc-deck-card ${deck.isLocked ? "fc-deck-locked" : ""}`}
      style={{ borderColor: config.color }}
    >
      {/* Category tag */}
      <div 
        className="fc-deck-badge" 
        style={{ backgroundColor: config.color, color: "#fff" }}
      >
        {deck.categoryLabel || deck.category}
      </div>

      {/* Title */}
      <h3 className="fc-deck-title" title={deck.title}>
        {deck.title}
      </h3>

      {/* Progress Bar */}
      {progress > 0 && (
        <div style={{ width: "100%", marginTop: -4, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginBottom: 3 }}>
            <span>Đã học: {progress}%</span>
          </div>
          <div style={{ width: "100%", height: "4px", backgroundColor: "#e2e8f0", borderRadius: "2px", overflow: "hidden" }}>
            <div 
              style={{ 
                width: `${progress}%`, 
                height: "100%", 
                backgroundColor: "#22c55e", 
                transition: "width 0.3s ease" 
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Card count info */}
      <div className="fc-deck-info">
        <span className="fc-deck-info-icon">📇</span>
        <span className="fc-deck-info-text">{deck.cardCount || (deck.cards ? deck.cards.length : 0)} thẻ</span>
      </div>

      {/* Footer Actions */}
      <div className="fc-deck-footer">
        <Tooltip title={isFavorite ? "Bỏ yêu thích" : "Đánh dấu yêu thích"}>
          <Button 
            type="text" 
            shape="circle" 
            className={`fc-footer-btn ${isFavorite ? "active" : ""}`}
            style={{ color: isFavorite ? "#e11d48" : undefined }}
            onClick={() => onToggleFavorite(deck.id)}
          >
            ★
          </Button>
        </Tooltip>
        <Tooltip title="Luyện tập nhanh (Trắc nghiệm)">
          <Button 
            type="text" 
            shape="circle" 
            className="fc-footer-btn"
            onClick={() => {
              if (deck.isLocked) {
                message.warning("Bộ thẻ này bị khóa!");
              } else {
                onPractice(deck);
              }
            }}
          >
            ▶
          </Button>
        </Tooltip>
        <Tooltip title="Học tập chuyên sâu">
          <Button 
            type="text" 
            shape="circle" 
            className="fc-footer-btn"
            onClick={() => {
              if (deck.isLocked) {
                message.warning("Bộ thẻ này bị khóa!");
              } else {
                onStudy(deck);
              }
            }}
          >
            📖
          </Button>
        </Tooltip>
        <Tooltip title="Làm mới tiến độ">
          <Button 
            type="text" 
            shape="circle" 
            className="fc-footer-btn"
            disabled={progress === 0}
            onClick={() => onResetProgress(deck.id)}
          >
            🔄
          </Button>
        </Tooltip>
        <Tooltip title="Xem danh sách từ vựng">
          <Button 
            type="text" 
            shape="circle" 
            className="fc-footer-btn"
            onClick={() => onInfo(deck)}
          >
            ℹ
          </Button>
        </Tooltip>
      </div>

      {/* Locked overlay for exclusive cards */}
      {deck.isLocked && (
        <div className="fc-lock-overlay">
          <Button 
            type="primary" 
            className="fc-lock-btn"
            icon={<LockOutlined />}
            onClick={() => message.warning("Bộ thẻ này dành cho tài khoản VIP!")}
          >
            Độc quyền
          </Button>
        </div>
      )}
    </div>
  );
}
