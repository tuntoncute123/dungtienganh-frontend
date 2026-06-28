"use client";

import React from "react";
import { DownloadOutlined } from "@ant-design/icons";

interface Document {
  name: string;
  url: string;
}

interface LessonDocumentsProps {
  documents: Document[];
}

export default function LessonDocuments({ documents }: LessonDocumentsProps) {
  return (
    <div className="lp-docs-section">
      <div className="lp-docs-header">
        <span className="lp-docs-title">Tài liệu đi kèm buổi học:</span>
        <button className="lp-docs-download-all">Tải về</button>
      </div>
      {documents.map((doc) => (
        <div key={doc.name} className="lp-doc-item">
          <a href={doc.url} className="lp-doc-link" target="_blank" rel="noreferrer">
            {doc.name}
          </a>
          <button className="lp-doc-dl-btn" aria-label="Tải xuống">
            <DownloadOutlined style={{ fontSize: 18, color: "#566681" }} />
          </button>
        </div>
      ))}
    </div>
  );
}
