"use client";

import React from "react";
import { Button, Space } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";

interface FlashcardFiltersProps {
  sourceType: "system" | "custom";
  onSourceTypeChange: (type: "system" | "custom") => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onAddNewDeck: () => void;
}

const categories = [
  { key: null, label: "Tất cả", color: "#64748b" },
  { key: "vocabulary", label: "Từ vựng", color: "#4285f4" },
  { key: "idiom", label: "Thành ngữ", color: "#ea4335" },
  { key: "phrasal_verb", label: "Cụm động từ", color: "#ff2d57" },
  { key: "collocation", label: "Kết hợp từ", color: "#34a853" },
  { key: "grammar", label: "Ngữ pháp", color: "#f9ab00" },
  { key: "mixed", label: "Tổng hợp", color: "#f28500" },
];

export default function FlashcardFilters({
  sourceType,
  onSourceTypeChange,
  selectedCategory,
  onCategoryChange,
  onAddNewDeck,
}: FlashcardFiltersProps) {
  return (
    <div className="flashcard-filters-container">
      {/* Top filters: System/Custom and Add button */}
      <div className="fc-filters-row-top">
        <Space size={12} wrap className="fc-source-selectors">
          <Button
            type={sourceType === "system" ? "primary" : "default"}
            className={`fc-source-btn ${
              sourceType === "system" ? "fc-source-btn-system-active" : ""
            }`}
            onClick={() => onSourceTypeChange("system")}
          >
            Bộ thẻ từ hệ thống
          </Button>
          <Button
            type={sourceType === "custom" ? "default" : "text"}
            className={`fc-source-btn fc-source-btn-custom ${
              sourceType === "custom" ? "fc-source-btn-custom-active" : ""
            }`}
            onClick={() => onSourceTypeChange("custom")}
          >
            Bộ thẻ tự thiết kế
          </Button>
        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="fc-btn-add-deck"
          onClick={onAddNewDeck}
        >
          Thêm bộ thẻ mới
        </Button>
      </div>

      {/* Category filters */}
      <div className="fc-filters-row-categories">
        <Space size={10} wrap className="fc-category-tags">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key || "all"}
                onClick={() => onCategoryChange(cat.key)}
                className={`fc-category-filter-tag ${
                  isActive ? "fc-cat-active" : ""
                }`}
                style={{
                  border: `2px solid ${cat.color}`,
                  color: isActive ? "#fff" : cat.color,
                  backgroundColor: isActive ? cat.color : "transparent",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </Space>
      </div>
    </div>
  );
}
