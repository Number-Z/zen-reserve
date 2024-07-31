import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "株式会社ZEN 管理画面",
  description: "株式会社ZEN 管理画面",
  icons: {
    icon: ["/favicons/favicon.ico?v=4"],
    apple: ["/favicons/apple-touch-icon.png?v=4"],
    shortcut: ["/favicons/apple-touch-icon.png"],
  },
  manifest: "/favicons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
