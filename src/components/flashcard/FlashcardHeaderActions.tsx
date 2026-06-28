"use client";

import React, { useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { 
  ArrowLeftOutlined, 
  BookOutlined, 
  TrophyOutlined, 
  SoundOutlined,
  SoundFilled
} from "@ant-design/icons";
import Link from "next/link";

export default function FlashcardHeaderActions() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="flashcard-header-actions">
      <Space size={12} wrap className="fc-action-left">
        <Link href="/">
          <Button 
            type="primary" 
            icon={<ArrowLeftOutlined />} 
            className="fc-btn fc-btn-yellow"
          >
            Quay trở lại
          </Button>
        </Link>
        <Link href="/lesson">
          <Button 
            type="primary" 
            icon={<BookOutlined />} 
            className="fc-btn fc-btn-yellow"
          >
            Trở lại trang học tập
          </Button>
        </Link>
        <Link href="/practice">
          <Button 
            type="primary" 
            icon={<TrophyOutlined />} 
            className="fc-btn fc-btn-yellow"
          >
            Bảng xếp hạng
          </Button>
        </Link>
      </Space>
      <div className="fc-action-right">
        <Tooltip title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}>
          <Button 
            type="primary" 
            shape="circle" 
            icon={soundEnabled ? <SoundFilled /> : <SoundOutlined />} 
            className="fc-btn-sound"
            onClick={() => setSoundEnabled(!soundEnabled)}
          />
        </Tooltip>
      </div>
    </div>
  );
}
