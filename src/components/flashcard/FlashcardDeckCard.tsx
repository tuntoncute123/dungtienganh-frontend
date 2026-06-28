"use client";

import React from "react";
import { Button, Tooltip, App } from "antd";
import { LockOutlined, BookOutlined } from "@ant-design/icons";

export interface FlashcardDeck {
  id: string;
  category: 'vocabulary' | 'idiom' | 'phrasal_verb' | 'collocation' | 'grammar' | 'mixed';
  categoryLabel: string;
  title: string;
  cardCount: number;
  isLocked?: boolean;
  type: 'system' | 'custom';
}

interface FlashcardDeckCardProps {
  deck: FlashcardDeck;
  onStudy: (deck: FlashcardDeck) => void;
}

// Map category to styling colors
const categoryConfig = {
  vocabulary: { color: "#4285f4", bg: "#e8f0fe" },
  idiom: { color: "#ea4335", bg: "#fce8e6" },
  phrasal_verb: { color: "#ff2d57", bg: "#ffebee" },
  collocation: { color: "#34a853", bg: "#e6f4ea" },
  grammar: { color: "#f9ab00", bg: "#fef7e0" },
  mixed: { color: "#f28500", bg: "#fff3e0" }
};

export default function FlashcardDeckCard({ deck, onStudy }: FlashcardDeckCardProps) {
  const { message } = App.useApp();
  const config = categoryConfig[deck.category] || categoryConfig.vocabulary;

  const handleActionClick = (actionName: string) => {
    if (deck.isLocked) {
      message.warning("Đây là bộ thẻ độc quyền, bạn cần nâng cấp tài khoản để học!");
      return;
    }
    message.success(`Đang mở chức năng ${actionName} cho bộ thẻ: ${deck.title}`);
  };

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
        {deck.categoryLabel}
      </div>

      {/* Title */}
      <h3 className="fc-deck-title" title={deck.title}>
        {deck.title}
      </h3>

      {/* Card count info */}
      <div className="fc-deck-info">
        <span className="fc-deck-info-icon">📇</span>
        <span className="fc-deck-info-text">{deck.cardCount} thẻ</span>
      </div>

      {/* Footer Actions */}
      <div className="fc-deck-footer">
        <Tooltip title="Đánh dấu yêu thích">
          <Button 
            type="text" 
            shape="circle" 
            className="fc-footer-btn active"
            onClick={() => handleActionClick("yêu thích")}
          >
            ★
          </Button>
        </Tooltip>
        <Tooltip title="Luyện tập nhanh">
          <Button 
            type="text" 
            shape="circle" 
            className="fc-footer-btn"
            onClick={() => handleActionClick("luyện tập")}
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
            onClick={() => handleActionClick("làm mới")}
          >
            🔄
          </Button>
        </Tooltip>
        <Tooltip title="Xem thông tin chi tiết">
          <Button 
            type="text" 
            shape="circle" 
            className="fc-footer-btn"
            onClick={() => handleActionClick("chi tiết")}
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
