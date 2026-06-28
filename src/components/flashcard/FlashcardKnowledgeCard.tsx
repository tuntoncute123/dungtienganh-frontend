"use client";

import React from "react";

export default function FlashcardKnowledgeCard() {
  return (
    <div className="flashcard-knowledge-card">
      <div className="fk-card-inner">
        <h2 className="fk-card-title">BỘ THẺ TRI THỨC</h2>
        <div className="fk-card-dashed-box">
          <img 
            src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6cf0bd9c343a8ec4f006e74f25796036089f1d98.svg?generation=1782408998617955&alt=media" 
            alt="Flashcard Deck Icon"
            className="fk-card-icon"
          />
        </div>
        <p className="fk-card-description">
          Lựa chọn bộ từ vựng mà bạn muốn để bắt đầu học tập
        </p>
      </div>
    </div>
  );
}
