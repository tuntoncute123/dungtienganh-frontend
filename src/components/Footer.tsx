"use client";

import React from "react";
import Link from "next/link";
import { Row, Col, Space } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  CompassOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
  BookOutlined
} from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <Row gutter={[32, 32]}>
          {/* Cột 1: Thương hiệu */}
          <Col xs={24} sm={24} md={12} lg={8} className="footer-brand-col">
            <div className="footer-logo-wrapper">
              <img src="/logo.png?v=2" alt="TeacherDung Logo" className="footer-logo" />
              <span className="footer-brand-name">Dung Tiếng Anh</span>
            </div>
            <p className="footer-slogan">
              Học ngữ pháp chắc – Tích lũy từ vựng nhanh – Tự tin đạt điểm cao trong các bài kiểm tra và kỳ thi tiếng Anh.            </p>
            <div className="footer-social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn facebook" title="Facebook Cô Dung">
                <FacebookOutlined />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn youtube" title="Kênh YouTube">
                <YoutubeOutlined />
              </a>
              <a href="https://www.tiktok.com/@dungtienganh4work?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="social-icon-btn tiktok" title="Kênh TikTok">
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>T</span>
              </a>
            </div>
          </Col>

          {/* Cột 2: Khám phá */}
          <Col xs={12} sm={12} md={6} lg={5}>
            <h4 className="footer-col-title">Khám Phá</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/">
                  <Space><CompassOutlined /> Trang chủ</Space>
                </Link>
              </li>
              <li>
                <Link href="/my-courses">
                  <Space><BookOutlined /> Khóa học của tôi</Space>
                </Link>
              </li>
              <li>
                <Link href="/flashcard">
                  <Space><span className="footer-bullet">⚡</span> Flashcard</Space>
                </Link>
              </li>
              <li>
                <Link href="/mock-test">
                  <Space><span className="footer-bullet">📝</span> Đề thi thử</Space>
                </Link>
              </li>
              <li>
                <Link href="/story">
                  <Space><span className="footer-bullet">📖</span> Truyện chêm</Space>
                </Link>
              </li>
            </ul>
          </Col>

          {/* Cột 3: Hỗ trợ */}
          <Col xs={12} sm={12} md={6} lg={5}>
            <h4 className="footer-col-title">Hỗ Trợ</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/guide">
                  <Space><InfoCircleOutlined /> Hướng dẫn</Space>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <Space><SafetyCertificateOutlined /> Điều khoản</Space>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <Space><SafetyCertificateOutlined /> Bảo mật</Space>
                </Link>
              </li>
            </ul>
          </Col>

          {/* Cột 4: Liên hệ */}
          <Col xs={24} sm={24} md={12} lg={6}>
            <h4 className="footer-col-title">Thông Tin Liên Hệ</h4>
            <ul className="footer-contact-list">
              <li>
                <EnvironmentOutlined className="contact-icon" />
                <span className="contact-text">
                  Lâm Đồng, Việt Nam
                </span>
              </li>
              <li>
                <PhoneOutlined className="contact-icon" />
                <span className="contact-text">
                  <a href="tel:0987654321">0987.491.605</a>
                </span>
              </li>
              <li>
                <MailOutlined className="contact-icon" />
                <span className="contact-text">
                  <a href="mailto:dungtienganh4work@gmail.com">dungtienganh4work@gmail.com</a>
                </span>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} <strong>TeacherDung</strong>. Học tiếng Anh cùng cô Dung. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
