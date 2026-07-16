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
  title: "DungTiengAnh - Học tiếng Anh cùng cô Dung",
  description: "Học tiếng Anh cùng cô Dung - Luyện thi chuyên sâu",
  keywords: [
    "học tiếng anh",
    "cô Dung",
    "tiếng anh thpt quốc gia",
    "tiếng anh online",
    "luyện thi đại học",
    "ngữ pháp tiếng anh",
    "học từ vựng"
  ],
  authors: [{ name: "DungTiengAnh", url: "https://dungtienganh.com" }],
  creator: "DungTiengAnh",
  publisher: "DungTiengAnh",
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
    title: "DungTiengAnh - Học tiếng Anh cùng cô Dung",
    description: "Nền tảng học tiếng Anh với lộ trình cá nhân hóa, ôn thi THPT Quốc gia cùng Cô Dung.",
    siteName: "DungTiengAnh",
    images: [
      {
        url: "/logo.png?v=2",
        width: 512,
        height: 512,
        alt: "DungTiengAnh Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DungTiengAnh - Học tiếng Anh cùng cô Dung",
    description: "Học tiếng Anh cùng cô Dung - Luyện thi chuyên sâu",
    images: ["/logo.png?v=2"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
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
