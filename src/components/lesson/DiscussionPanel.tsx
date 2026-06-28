"use client";

import React, { useState } from "react";
import { LikeOutlined, DislikeOutlined, SyncOutlined, SendOutlined, PictureOutlined } from "@ant-design/icons";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=e1effe&color=0071f9&size=30&name=";

interface Reply {
  id: string;
  author: string;
  content: string;
  time: string;
  isTA?: boolean; // Teaching Assistant
}

interface Comment {
  id: string;
  author: string;
  content: string;
  time: string;
  likes: number;
  replies: number;
  replyList: Reply[];
}

const COMMENTS: Comment[] = [
  {
    id: "1",
    author: "Nguyễn Bảo Trâm",
    content: "Làm sao để biết đó là danh từ vậy ạ, chẳng hạn như mechanic cô giảng ở trên cô nói là danh từ. Nhưng em không biết làm sao để phân biệt đó là danh từ ạ",
    time: "22:20 - 25/06/2026",
    likes: 0,
    replies: 3,
    replyList: [
      { id: "1-1", author: "Huy HQ - Trợ giảng cô Mai Phương", content: "Em nên tra từ điển em nhé vì danh từ nó không tuân theo những nguyên tắc viết chính tả nhất định nha em", time: "22:23 - 25/06/2026", isTA: true },
      { id: "1-2", author: "Nguyễn Bảo Trâm", content: "Là mình có nhất thiết phải học để biết đó là danh từ không ạ. Trong thi đh có ra không ạ", time: "22:24 - 25/06/2026" },
      { id: "1-3", author: "Mai Chi - Trợ giảng Cô Mai Phương", content: "em cần học để biết em nhé, có thể sẽ ra nè", time: "22:25 - 25/06/2026", isTA: true },
    ],
  },
  {
    id: "2",
    author: "Hoàng Thị Thu Thùy",
    content: "heritage vs heritage sites khác nhau như thế nào vậy ạ",
    time: "00:42 - 25/06/2026",
    likes: 1,
    replies: 1,
    replyList: [
      { id: "2-1", author: "Minh Long - Trợ giảng cô Mai Phương", content: "heritage = di sản nói chung. Có thể là văn hóa truyền thống phong tục ngôn ngữ công trình lịch sử nghệ thuật. heritage site = địa điểm di sản. Là một nơi chốn cụ thể được công nhận vì giá trị lịch sử văn hóa hoặc thiên nhiên. Mỹ Sơn Sanctuary is a famous heritage site.", time: "09:11 - 25/06/2026", isTA: true },
    ],
  },
  {
    id: "3",
    author: "Minh Hà",
    content: "ở 31:34 thì collection đổi thành complex được không ạ",
    time: "18:07 - 24/06/2026",
    likes: 0,
    replies: 1,
    replyList: [
      { id: "3-1", author: "Minh Long - Trợ giảng cô Mai Phương", content: "cũng được em nè", time: "18:11 - 24/06/2026", isTA: true },
    ],
  },
  {
    id: "4",
    author: "Huỳnh Thị Ngọc Trâm",
    content: "tại sao trong tài liệu là attendance mà trên bài quiz là attendee ạ",
    time: "13:06 - 24/06/2026",
    likes: 0,
    replies: 1,
    replyList: [
      { id: "4-1", author: "Thế Khải - Trợ giảng cô Mai Phương", content: "Em hỏi ở phút thứ bao nhiêu em nhỉ? Để anh check và trả lời kĩ hơn cho em nhé.", time: "13:08 - 24/06/2026", isTA: true },
    ],
  },
  {
    id: "5",
    author: "Đỗ Viết Hoàn",
    content: "sao phải giới hạn lần học ạ lúc mà muốn xem lại thì phải làm sao ạ",
    time: "11:49 - 23/06/2026",
    likes: 0,
    replies: 1,
    replyList: [
      { id: "5-1", author: "Thế Khải - Trợ giảng cô Mai Phương", content: "em phải xem hết đầy đủ thời lượng của video mới tính là 1 lần em nè, 10 lần là đủ cho mình ôn và xem lại em nhé", time: "11:51 - 23/06/2026", isTA: true },
    ],
  },
];

function CommentItem({ comment }: { comment: Comment }) {
  const [expanded, setExpanded] = useState(true);
  const initials = comment.author.split(" ").pop() || "U";
  return (
    <div className="lp-comment">
      <div className="lp-comment-thread-line" />
      {/* Avatar */}
      <div className="lp-comment-avatar-wrap">
        <img
          src={`${DEFAULT_AVATAR}${encodeURIComponent(initials)}`}
          alt={comment.author}
          className="lp-comment-avatar"
        />
      </div>
      <div className="lp-comment-body">
        <div className="lp-comment-bubble">
          <span className="lp-comment-author">{comment.author}</span>
          <br />
          <span>{comment.content}</span>
        </div>
        <div className="lp-comment-meta">
          <button className="lp-meta-btn"><LikeOutlined /> {comment.likes > 0 ? comment.likes : ""}</button>
          <button className="lp-meta-btn"><DislikeOutlined /> {comment.replies > 0 ? comment.replies : ""}</button>
          <span className="lp-meta-time">{comment.time}</span>
          <button className="lp-meta-reply-btn">Trả lời</button>
        </div>

        {/* Replies */}
        {expanded && comment.replyList.map((reply) => (
          <div key={reply.id} className="lp-reply">
            <div className="lp-reply-corner" />
            <div className="lp-reply-line" />
            <div className="lp-comment-avatar-wrap">
              <img
                src={`${DEFAULT_AVATAR}${encodeURIComponent(reply.author.split(" ").pop() || "T")}`}
                alt={reply.author}
                className="lp-comment-avatar"
              />
            </div>
            <div className="lp-comment-body">
              <div className={`lp-comment-bubble${reply.isTA ? " lp-comment-bubble-ta" : ""}`}>
                <span className={`lp-comment-author${reply.isTA ? " lp-ta-name" : ""}`}>{reply.author}</span>
                <br />
                <span>{reply.content}</span>
              </div>
              <div className="lp-comment-meta">
                <span className="lp-meta-time">{reply.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DiscussionPanel() {
  return (
    <div className="lp-discussion">
      {/* Header */}
      <div className="lp-discussion-header">
        <span className="lp-discussion-title">Thảo luận</span>
        <button className="lp-discussion-refresh" aria-label="Cập nhật bình luận">
          <SyncOutlined style={{ color: "#f40c44", fontSize: 20 }} />
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
          />
        </div>
        <div className="lp-comment-input-actions">
          <button className="lp-input-action-btn"><PictureOutlined /></button>
          <button className="lp-input-action-btn"><SendOutlined /></button>
        </div>
      </div>

      {/* Comments list */}
      <div className="lp-comments-list">
        {COMMENTS.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </div>

      <div className="lp-see-more-row">
        <button className="lp-see-more-btn">Xem thêm ›</button>
      </div>
    </div>
  );
}
