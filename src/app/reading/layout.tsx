import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luyện Đọc Hiểu Tiếng Anh (Reading Practice) - DungTiengAnh",
  description: "Các bài tập luyện đọc hiểu tiếng Anh theo nhiều chủ đề từ cơ bản đến nâng cao.",
  alternates: {
    canonical: "/reading",
  },
  openGraph: {
    title: "Luyện Đọc Hiểu Tiếng Anh (Reading Practice) - DungTiengAnh",
    description: "Các bài tập luyện đọc hiểu tiếng Anh theo nhiều chủ đề từ cơ bản đến nâng cao.",
    url: "https://dungtienganh.com/reading",
  },
};

export default function ReadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
