"use client";

import React, { useState, useEffect } from "react";
import { LikeOutlined, DislikeOutlined, SyncOutlined, SendOutlined, PictureOutlined } from "@ant-design/icons";
import { Spin, App } from "antd";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=e1effe&color=35a873&size=30&name=";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface Comment {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

function CommentItem({ comment }: { comment: Comment }) {
  const initials = comment.userName.split(" ").pop() || "U";
  const avatarUrl = comment.userAvatar || `${DEFAULT_AVATAR}${encodeURIComponent(initials)}`;
  return (
    <div className="lp-comment">
      <div className="lp-comment-thread-line" />
      {/* Avatar */}
      <div className="lp-comment-avatar-wrap">
        <img
          src={avatarUrl}
          alt={comment.userName}
          className="lp-comment-avatar"
        />
      </div>
      <div className="lp-comment-body">
        <div className="lp-comment-bubble">
          <span className="lp-comment-author">{comment.userName}</span>
          <br />
          <span>{comment.content}</span>
        </div>
        <div className="lp-comment-meta">
          <button className="lp-meta-btn"><LikeOutlined /> </button>
          <button className="lp-meta-btn"><DislikeOutlined /> </button>
          <span className="lp-meta-time">{new Date(comment.createdAt).toLocaleString("vi-VN")}</span>
          <button className="lp-meta-reply-btn">Trả lời</button>
        </div>
      </div>
    </div>
  );
}

interface DiscussionPanelProps {
  lessonId: string;
}

export default function DiscussionPanel({ lessonId }: DiscussionPanelProps) {
  const { message } = App.useApp();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/comments?lessonId=${lessonId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (e) {
      console.error("Lỗi khi fetch comments:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [lessonId]);

  const handlePostComment = async () => {
    if (!inputValue.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: "Học viên ẩn danh",
          content: inputValue,
          lessonId: lessonId,
        }),
      });

      if (res.ok) {
        setInputValue("");
        message.success("Đã đăng bình luận!");
        fetchComments();
      } else {
        message.error("Lỗi khi đăng bình luận");
      }
    } catch (err) {
      message.error("Lỗi kết nối");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lp-discussion">
      {/* Header */}
      <div className="lp-discussion-header">
        <span className="lp-discussion-title">Thảo luận</span>
        <button className="lp-discussion-refresh" aria-label="Cập nhật bình luận" onClick={fetchComments} disabled={loading}>
          <SyncOutlined spin={loading} style={{ color: "#f40c44", fontSize: 20 }} />
        </button>
      </div>

      {/* Comment input */}
      <div className="lp-comment-input-row">
        <img
          src={`${DEFAULT_AVATAR}U`}
          alt="You"
          className="lp-comment-avatar"
        />
        <div className="lp-comment-input-box">
          <textarea
            rows={2}
            placeholder="Viết bình luận..."
            className="lp-comment-textarea"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div className="lp-comment-input-actions">
          <button className="lp-input-action-btn"><PictureOutlined /></button>
          <button className="lp-input-action-btn" onClick={handlePostComment} disabled={submitting}><SendOutlined /></button>
        </div>
      </div>

      {/* Comments list */}
      <div className="lp-comments-list">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
            <Spin size="small" description="Đang tải thảo luận..." />
          </div>
        ) : comments.length === 0 ? (
          <div style={{ textAlign: "center", padding: 20, color: "#64748b" }}>Chưa có bình luận nào. Hãy gửi câu hỏi đầu tiên!</div>
        ) : (
          comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))
        )}
      </div>

      <div className="lp-see-more-row">
        <button className="lp-see-more-btn" onClick={fetchComments}>Xem thêm ›</button>
      </div>
    </div>
  );
}
