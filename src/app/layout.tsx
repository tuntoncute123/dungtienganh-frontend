import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App } from "antd";
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dungtienganh.com"),
  title: "TeacherDung - Học tiếng Anh cùng cô Dung",
  description: "Nền tảng học tiếng Anh với lộ trình cá nhân hóa, luyện TOEIC chuyên sâu cùng Cô Dung.",
  keywords: [
    "học tiếng anh",
    "cô Dung",
    "luyện thi toeic",
    "toeic cô Dung",
    "tiếng anh thpt quốc gia",
    "tiếng anh online",
    "luyện thi đại học",
    "ngữ pháp tiếng anh",
    "học từ vựng"
  ],
  authors: [{ name: "TeacherDung", url: "https://dungtienganh.com" }],
  creator: "TeacherDung",
  publisher: "TeacherDung",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://dungtienganh.com",
    title: "TeacherDung - Học tiếng Anh cùng cô Dung",
    description: "Nền tảng học tiếng Anh với lộ trình cá nhân hóa, luyện TOEIC chuyên sâu cùng Cô Dung.",
    siteName: "TeacherDung",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "TeacherDung Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeacherDung - Học tiếng Anh cùng cô Dung",
    description: "Nền tảng học tiếng Anh với lộ trình cá nhân hóa, luyện TOEIC chuyên sâu cùng Cô Dung.",
    images: ["/logo.png"],
  },
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
                colorPrimary: "#35a873",
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
                  itemSelectedBg: "#e6f6ec",
                  itemSelectedColor: "#35a873",
                  itemHeight: 56,
                },
              },
            }}
          >
            <App>
              <AuthGuard>
                {children}
              </AuthGuard>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
