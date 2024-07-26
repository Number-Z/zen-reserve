import FormProvider from "@/app/components/common/FormProvider";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "SAUNPING 予約サイト",
  description: "SAUNPING 予約サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  );
}
