"use client";

import React from "react";
import {
  PlayCircleOutlined,
  RollbackOutlined,
  FastForwardOutlined,
  SoundOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";

const PLAY_ICON = "/assets/5f41ca666790ad7191b8_d40728ed.svg";

interface VideoPlayerProps {
  title: string;
  remainingViews: number;
  totalViews: number;
  duration: string;
  quizPoints: { label: string; percent: number }[];
}

export default function VideoPlayer({
  title,
  remainingViews,
  totalViews,
  duration,
  quizPoints,
}: VideoPlayerProps) {
  return (
    <div className="lp-card">
      {/* Title */}
      <h2 className="lp-video-title">
        <span>{title}</span>
        <span className="lp-star-icon">⭐</span>
      </h2>

      {/* Views counter */}
      <div className="lp-views-row">
        <span className="lp-views-icon">👁️</span>
        <span className="lp-views-text">
          Còn: <span className="lp-views-count">{remainingViews}&nbsp;/{totalViews}</span> lượt xem
        </span>
      </div>

      {/* Video area */}
      <div className="lp-video-wrap">
        {/* Play button overlay */}
        <div className="lp-video-overlay">
          <div className="lp-play-btn">
            <img src={PLAY_ICON} alt="Play" style={{ width: 80, height: 80 }} />
          </div>
          {/* Wave gradient at bottom */}
          <div className="lp-video-wave" />
        </div>

        {/* Thumbnail / video */}
        <div className="lp-video-inner">
          <div className="lp-video-bg" />
        </div>

        {/* Progress bar */}
        <div className="lp-progress-wrap">
          <div className="lp-progress-track">
            <div className="lp-progress-fill" style={{ width: "0%" }} />
            <div className="lp-progress-bg" />
            {quizPoints.map((q) => (
              <div
                key={q.label}
                className="lp-quiz-dot"
                style={{ left: `${q.percent}%` }}
                aria-label={q.label}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="lp-controls">
          <div className="lp-controls-left">
            <button className="lp-ctrl-btn" aria-label="Phát">
              <PlayCircleOutlined style={{ fontSize: 22, color: "white" }} />
            </button>
            <button className="lp-ctrl-btn lp-ctrl-btn-optional" aria-label="Tua lại 10s">
              <RollbackOutlined style={{ fontSize: 22, color: "white" }} />
            </button>
            <button className="lp-ctrl-btn lp-ctrl-btn-optional" aria-label="Tua tiếp 10s">
              <FastForwardOutlined style={{ fontSize: 22, color: "white" }} />
            </button>
            <button className="lp-ctrl-btn" aria-label="Tắt tiếng">
              <SoundOutlined style={{ fontSize: 22, color: "white" }} />
            </button>
            <span className="lp-time">00:00 / {duration}</span>
          </div>
          <div className="lp-controls-right">
            <span className="lp-speed">1 x</span>
            <button className="lp-ctrl-btn" aria-label="Toàn màn hình">
              <FullscreenOutlined style={{ fontSize: 22, color: "white" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Quiz marker row */}
      <div className="lp-quiz-row">
        {quizPoints.map((q) => (
          <div key={q.label} className="lp-quiz-icon" aria-label={q.label} style={{ display: "flex", alignItems: "center" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="16" fill="#FFA800" />
              <g clipPath="url(#clip0_333_2150)">
                <path d="M19.352 8H12.648C9.736 8 8 9.736 8 12.648V19.352C8 22.264 9.736 24 12.648 24H19.352C22.264 24 24 22.264 24 19.352V12.648C24 9.736 22.264 8 19.352 8ZM14.376 18.32L12.576 20.12C12.456 20.24 12.304 20.296 12.152 20.296C12 20.296 11.84 20.24 11.728 20.12L11.128 19.52C10.888 19.288 10.888 18.904 11.128 18.672C11.36 18.44 11.736 18.44 11.976 18.672L12.152 18.848L13.528 17.472C13.76 17.24 14.136 17.24 14.376 17.472C14.608 17.704 14.608 18.088 14.376 18.32ZM14.376 12.72L12.576 14.52C12.456 14.64 12.304 14.696 12.152 14.696C12 14.696 11.84 14.64 11.728 14.52L11.128 13.92C10.888 13.688 10.888 13.304 11.128 13.072C11.36 12.84 11.736 12.84 11.976 13.072L12.152 13.248L13.528 11.872C13.76 11.64 14.136 11.64 14.376 11.872C14.608 12.104 14.608 12.488 14.376 12.72ZM20.448 19.696H16.248C15.92 19.696 15.648 19.424 15.648 19.096C15.648 18.768 15.92 18.496 16.248 18.496H20.448C20.6071 18.496 20.7597 18.5592 20.8722 18.6717C20.9848 18.7842 21.048 18.9369 21.048 19.096C21.048 19.2551 20.9848 19.4077 20.8722 19.5202C20.7597 19.6328 20.6071 19.696 20.448 19.696ZM20.448 14.096H16.248C15.92 14.096 15.648 13.824 15.648 13.496C15.648 13.168 15.92 12.896 16.248 12.896H20.448C20.6071 12.896 20.7597 12.9592 20.8722 13.0717C20.9848 13.1843 21.048 13.3369 21.048 13.496C21.048 13.6551 20.9848 13.8077 20.8722 13.9203C20.7597 14.0328 20.6071 14.096 20.448 14.096Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_333_2150">
                  <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                </clipPath>
              </defs>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
