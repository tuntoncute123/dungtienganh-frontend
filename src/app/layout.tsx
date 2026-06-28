import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App } from "antd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TeacherDung - Học tiếng Anh cùng cô Dung",
  description: "Nền tảng học tiếng Anh với lộ trình cá nhân hóa, luyện TOEIC chuyên sâu cùng Cô Dung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#0071f9",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                borderRadius: 12,
              },
              components: {
                Layout: {
                  headerBg: "#ffffff",
                  siderBg: "#ffffff",
                  bodyBg: "#f5f7fa",
                  headerHeight: 64,
                },
                Menu: {
                  itemBorderRadius: 16,
                  itemSelectedBg: "#edf7ff",
                  itemSelectedColor: "#0071f9",
                  itemHeight: 56,
                },
              },
            }}
          >
            <App>
              {children}
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
