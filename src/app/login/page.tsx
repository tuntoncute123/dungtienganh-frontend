"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Nếu đã đăng nhập, chuyển hướng đi luôn
    const token = localStorage.getItem("teacherdung_token");
    const userStr = localStorage.getItem("teacherdung_user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } catch (e) {
        localStorage.clear();
      }
    }
  }, [router]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        message.success("Đăng nhập thành công! Chào mừng quay trở lại.");
        localStorage.setItem("teacherdung_token", data.token);
        localStorage.setItem("teacherdung_user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        message.error(data.message || "Tài khoản hoặc mật khẩu không chính xác.");
      }
    } catch (e) {
      message.error("Không thể kết nối đến server backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <Card className="login-card" bordered={false}>
        <div className="login-header">
          <div className="login-logo-wrap">
            <img src="/logo.png" alt="Logo" className="login-logo" />
          </div>
          <h1 className="login-title">
            TeacherDung
          </h1>
          <Text className="login-subtitle">
            Học tiếng Anh cùng cô Dung - Luyện thi TOEIC chuyên sâu
          </Text>
        </div>

        <Form
          name="login_form"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập của bạn!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nhập tài khoản học sinh hoặc admin..."
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Nhập mật khẩu..."
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 32 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
              block
            >
              Đăng nhập hệ thống
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
