import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thi Thử Tiếng Anh Online - Đề Thi Thử TOEIC & THPTQG - TeacherDung",
  description: "Tham gia thi thử tiếng Anh online với các đề thi chuẩn cấu trúc, có chấm điểm và đáp án chi tiết.",
  alternates: {
    canonical: "/mock-test",
  },
  openGraph: {
    title: "Thi Thử Tiếng Anh Online - Đề Thi Thử TOEIC & THPTQG - TeacherDung",
    description: "Tham gia thi thử tiếng Anh online với các đề thi chuẩn cấu trúc, có chấm điểm và đáp án chi tiết.",
    url: "https://dungtienganh.com/mock-test",
  },
};

export default function MockTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
