import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập hệ thống - DungTiengAnh",
  description: "Đăng nhập vào tài khoản học sinh hoặc quản trị viên trên hệ thống học tiếng Anh DungTiengAnh.",
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Đăng nhập hệ thống - DungTiengAnh",
    description: "Đăng nhập vào tài khoản học sinh hoặc quản trị viên trên hệ thống học tiếng Anh DungTiengAnh.",
    url: "https://dungtienganh.com/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
