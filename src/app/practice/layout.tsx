import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luyện Tập Trắc Nghiệm Tiếng Anh Online - TeacherDung",
  description: "Trình luyện tập trắc nghiệm ngữ pháp, từ vựng tiếng Anh chuyên sâu.",
  alternates: {
    canonical: "/practice",
  },
  openGraph: {
    title: "Luyện Tập Trắc Nghiệm Tiếng Anh Online - TeacherDung",
    description: "Trình luyện tập trắc nghiệm ngữ pháp, từ vựng tiếng Anh chuyên sâu.",
    url: "https://dungtienganh.com/practice",
  },
};

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
