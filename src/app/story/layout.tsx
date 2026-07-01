import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đọc Truyện Chêm Tiếng Anh - Học Từ Vựng Tự Nhiên - TeacherDung",
  description: "Phương pháp học từ vựng tiếng Anh qua truyện chêm thông minh, ghi nhớ từ vựng dễ dàng theo ngữ cảnh.",
  alternates: {
    canonical: "/story",
  },
  openGraph: {
    title: "Đọc Truyện Chêm Tiếng Anh - Học Từ Vựng Tự Nhiên - TeacherDung",
    description: "Phương pháp học từ vựng tiếng Anh qua truyện chêm thông minh, ghi nhớ từ vựng dễ dàng theo ngữ cảnh.",
    url: "https://dungtienganh.com/story",
  },
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
