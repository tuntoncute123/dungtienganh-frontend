import { Metadata } from "next";
import ProgressTest from "@/components/quiz/ProgressTest";

export const metadata: Metadata = {
  title: "Luyện trắc nghiệm - Reading Progress Test | TeacherDung",
  description: "Trình luyện thi trắc nghiệm tiếng Anh phần Part 5 Reading với 20 câu hỏi ngữ pháp và từ vựng chi tiết, giao diện trực quan và phản hồi tức thì.",
};

export default function ProgressTestPage() {
  return <ProgressTest />;
}
