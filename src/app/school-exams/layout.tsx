import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luyện Đề Thi Thử Tiếng Anh THPT Quốc Gia - TeacherDung",
  description: "Tổng hợp các đề thi thử Tiếng Anh THPT Quốc gia từ các trường THPT Chuyên và Sở GD&ĐT trên cả nước có giải chi tiết.",
  alternates: {
    canonical: "/school-exams",
  },
  openGraph: {
    title: "Luyện Đề Thi Thử Tiếng Anh THPT Quốc Gia - TeacherDung",
    description: "Tổng hợp các đề thi thử Tiếng Anh THPT Quốc gia từ các trường THPT Chuyên và Sở GD&ĐT trên cả nước có giải chi tiết.",
    url: "https://dungtienganh.com/school-exams",
  },
};

export default function SchoolExamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
