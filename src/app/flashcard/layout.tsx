import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Từ Vựng Tiếng Anh Qua Flashcard - DungTiengAnh",
  description: "Học từ vựng tiếng Anh thông minh qua flashcard sinh động, nhớ lâu, học mọi lúc mọi nơi.",
  alternates: {
    canonical: "/flashcard",
  },
  openGraph: {
    title: "Học Từ Vựng Tiếng Anh Qua Flashcard - DungTiengAnh",
    description: "Học từ vựng tiếng Anh thông minh qua flashcard sinh động, nhớ lâu, học mọi lúc mọi nơi.",
    url: "https://dungtienganh.com/flashcard",
  },
};

export default function FlashcardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
