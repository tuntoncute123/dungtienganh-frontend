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
  const downloadFile = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    documents.forEach((doc) => {
      downloadFile(doc.url, doc.name);
    });
  };

  return (
    <div className="lp-docs-section">
      <div className="lp-docs-header">
        <span className="lp-docs-title">Tài liệu đi kèm buổi học:</span>
        {documents.length > 0 && (
          <button className="lp-docs-download-all" onClick={downloadAll}>
            Tải về
          </button>
        )}
      </div>
      {documents.map((doc) => (
        <div key={doc.name} className="lp-doc-item">
          <a href={doc.url} className="lp-doc-link" target="_blank" rel="noreferrer">
            {doc.name}
          </a>
          <button 
            className="lp-doc-dl-btn" 
            aria-label="Tải xuống" 
            onClick={() => downloadFile(doc.url, doc.name)}
          >
            <DownloadOutlined style={{ fontSize: 18, color: "#566681" }} />
          </button>
        </div>
      ))}
    </div>
  );
}

